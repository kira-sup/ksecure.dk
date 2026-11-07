"""Copy files into categories, or archive named network configs. Dry-run by default."""
import argparse, hashlib, json, re, shutil
from pathlib import Path

def digest(p):
    h=hashlib.sha256()
    with p.open('rb') as f:
        for block in iter(lambda:f.read(1024*1024),b''): h.update(block)
    return h.hexdigest()

def run(source, destination, mode='downloads', apply=False):
    source=Path(source).resolve(); destination=Path(destination).resolve()
    if not source.is_dir(): raise ValueError('Source must be an existing directory')
    if destination==source or source in destination.parents or destination in source.parents:
        raise ValueError('Source and destination must be separate, non-nested directories')
    groups={'.pdf':'Documents','.txt':'Documents','.docx':'Documents','.png':'Images','.jpg':'Images',
            '.jpeg':'Images','.iso':'Installers','.exe':'Installers','.msi':'Installers',
            '.zip':'Archives','.7z':'Archives','.ps1':'Scripts','.py':'Scripts','.sh':'Scripts',
            '.csv':'Tables','.xlsx':'Tables','.pkt':'Network-labs'}
    records=[]; reserved=set()
    for src in sorted(source.rglob('*')):
        if src.is_symlink() or any(p.is_symlink() for p in src.parents if p!=source): continue
        if not src.is_file(): continue
        if mode=='configs':
            m=re.fullmatch(r'([A-Za-z0-9-]+)_(\d{4}-\d{2}-\d{2})\.(cfg|conf|rsc)',src.name,re.I)
            if not m:
                records.append({'source':str(src.relative_to(source)),'status':'SKIP: naming pattern'}); continue
            from datetime import date
            try: date.fromisoformat(m[2])
            except ValueError:
                records.append({'source':str(src.relative_to(source)),'status':'SKIP: invalid date'});continue
            folder=Path(m[1].lower())/m[2][:7]
        else: folder=Path(groups.get(src.suffix.lower(),'Other'))
        sha=digest(src); target=destination/folder/src.name
        # Exclusive creation at write time prevents overwriting even if another process writes.
        if target.exists() and not target.is_symlink() and target.is_file() and digest(target)==sha:
            records.append({'source':str(src.relative_to(source)),'destination':str(target.relative_to(destination)),'status':'ALREADY EXISTS','sha256':sha}); continue
        number=1
        while target.exists() or target in reserved:
            if target.exists() and not target.is_symlink() and target.is_file() and digest(target)==sha:
                break
            target=destination/folder/f'{src.stem}__{number}{src.suffix}';number+=1
        if target.exists() and not target.is_symlink() and target.is_file() and digest(target)==sha:
            records.append({'source':str(src.relative_to(source)),'destination':str(target.relative_to(destination)),'status':'ALREADY EXISTS','sha256':sha}); continue
        reserved.add(target)
        if apply:
            target.parent.mkdir(parents=True,exist_ok=True)
            if any(p.is_symlink() for p in [target.parent,*target.parent.parents]): raise ValueError('Symlink destination refused')
            try:
                with src.open('rb') as inp,target.open('xb') as out: shutil.copyfileobj(inp,out)
                if digest(target)!=sha: raise IOError('Copy verification failed; originals unchanged')
            except Exception:
                # Do not remove a path that may belong to a concurrent writer.
                raise
        records.append({'source':str(src.relative_to(source)),'destination':str(target.relative_to(destination)),
                        'status':'COPIED' if apply else 'PLAN COPY','sha256':sha})
    return records

if __name__=='__main__':
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('source');p.add_argument('destination');p.add_argument('--mode',choices=['downloads','configs'],default='downloads')
    p.add_argument('--apply',action='store_true',help='Copy files; originals are never deleted')
    a=p.parse_args()
    try: print(json.dumps(run(a.source,a.destination,a.mode,a.apply),indent=2,ensure_ascii=False))
    except (ValueError,OSError) as e: p.exit(2,f'Error: {e}\n')
