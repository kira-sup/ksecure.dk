"""Clean inventory or summarize backup runs from CSV / .xlsx. Python 3.10+, no packages."""
import argparse,csv,html,ipaddress,json,math,zipfile
from collections import Counter
from datetime import datetime
from pathlib import Path
import xml.etree.ElementTree as ET

def read_rows(path):
    path=Path(path)
    if path.suffix.lower()=='.xlsx':
        ns={'m':'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
        with zipfile.ZipFile(path) as z:
            if sum(i.file_size for i in z.infolist())>20_000_000: raise ValueError('Workbook too large for this demo (20 MB uncompressed)')
            strings=[]
            if 'xl/sharedStrings.xml' in z.namelist():
                strings=[''.join(si.itertext()) for si in ET.fromstring(z.read('xl/sharedStrings.xml')).findall('m:si',ns)]
            wb=ET.fromstring(z.read('xl/workbook.xml'));sheet=wb.find('m:sheets/m:sheet',ns)
            rid=sheet.attrib['{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id']
            rels=ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))
            target=next(r.attrib['Target'] for r in rels if r.attrib['Id']==rid)
            member=target.lstrip('/') if target.startswith('/') else 'xl/'+target
            rows=[]
            for row in ET.fromstring(z.read(member)).findall('m:sheetData/m:row',ns):
                cells={}
                for c in row.findall('m:c',ns):
                    if c.find('m:f',ns) is not None: raise ValueError('Input formulas unsupported; paste values first')
                    letters=''.join(x for x in c.attrib['r'] if x.isalpha());col=0
                    for x in letters: col=col*26+ord(x.upper())-64
                    v=c.find('m:v',ns);value='' if v is None else (v.text or '')
                    if c.attrib.get('t')=='s':value=strings[int(value)]
                    elif c.attrib.get('t')=='inlineStr':value=''.join(c.find('m:is',ns).itertext())
                    cells[col-1]=value
                if cells: rows.append([cells.get(i,'') for i in range(max(cells)+1)])
        if not rows:raise ValueError('Empty workbook')
        header=[x.strip().lower() for x in rows[0]]
        return [dict(zip(header,row+['']*max(0,len(header)-len(row)))) for row in rows[1:]]
    with path.open(encoding='utf-8-sig',newline='') as f:
        sample=f.read(4096);f.seek(0)
        try: dialect=csv.Sniffer().sniff(sample,delimiters=',;\t')
        except csv.Error:dialect=csv.excel
        return [{str(k).strip().lower():str(v or '').strip() for k,v in row.items() if k is not None} for row in csv.DictReader(f,dialect=dialect)]

def require(rows,keys):
    if not rows:raise ValueError('No data rows')
    missing=set(keys)-set(rows[0])
    if missing:raise ValueError('Missing columns: '+', '.join(sorted(missing)))

def inventory(rows):
    require(rows,['hostname','ip','role','ram_gb']);clean=[];issues=[];seen=set();ips={};hosts={}
    for n,row in enumerate(rows,2):
        item={k:row[k].strip() for k in ['hostname','ip','role','ram_gb']};item['hostname']=item['hostname'].lower();item['role']=item['role'].lower()
        try:
            if not item['hostname']:raise ValueError('Missing hostname')
            item['ip']=str(ipaddress.ip_address(item['ip']))
            ram=float(item['ram_gb'].replace(',','.'))
            if not math.isfinite(ram) or ram<=0:raise ValueError('RAM must be positive')
            item['ram_gb']=str(ram)
        except ValueError as e: issues.append({'row':n,'issue':str(e)});continue
        key=tuple(item.values())
        if key in seen:issues.append({'row':n,'issue':'Exact normalized duplicate removed'});continue
        seen.add(key)
        if item['ip'] in ips: issues.append({'row':n,'issue':'IP conflict with row '+str(ips[item['ip']])})
        if item['hostname'] in hosts:issues.append({'row':n,'issue':'Hostname conflict with row '+str(hosts[item['hostname']])})
        ips[item['ip']]=n;hosts[item['hostname']]=n;clean.append(item)
    return clean,issues,{'input_rows':len(rows),'accepted_rows':len(clean),'issues':len(issues),'ram_gb':sum(float(r['ram_gb']) for r in clean)}

def backups(rows):
    require(rows,['job_id','vm','started_at','status','duration_min','size_gb']);clean=[];issues=[];seen=set()
    for n,row in enumerate(rows,2):
        try:
            item={k:row[k].strip() for k in ['job_id','vm','started_at','status','duration_min','size_gb']}
            if not item['job_id'] or not item['vm']:raise ValueError('Missing job ID or VM')
            if item['job_id'] in seen:raise ValueError('Duplicate job ID excluded')
            dt=datetime.fromisoformat(item['started_at'])
            if dt.tzinfo is None:raise ValueError('Timestamp must include timezone, e.g. +00:00')
            item['status']=item['status'].lower()
            if item['status'] not in ['success','failed']:raise ValueError('Unknown status')
            for k in ['duration_min','size_gb']:
                v=float(item[k].replace(',','.'))
                if not math.isfinite(v) or v<0:raise ValueError('Invalid '+k)
                item[k]=v
            seen.add(item['job_id']);clean.append(item)
        except ValueError as e:issues.append({'row':n,'issue':str(e)})
    counts=Counter(r['status'] for r in clean); latest={}
    for r in clean:
        if r['vm'] not in latest or datetime.fromisoformat(r['started_at'])>datetime.fromisoformat(latest[r['vm']]['started_at']):latest[r['vm']]=r
    summary={'valid_runs':len(clean),'successful_runs':counts['success'],'failed_runs':counts['failed'],
       'success_rate_percent':round(100*counts['success']/len(clean),1) if clean else None,
       'successful_gb':round(sum(r['size_gb'] for r in clean if r['status']=='success'),2),
       'latest_failed_vms':', '.join(sorted(k for k,v in latest.items() if v['status']=='failed')) or 'None',
       'rejected_rows':len(issues)}
    return clean,issues,summary

def safe(value):
    text=str(value)
    return "'"+text if text.lstrip().startswith(('=','+','-','@')) else text

def write_csv(path,rows,fields):
    with path.open('x',encoding='utf-8-sig',newline='') as f:
        w=csv.DictWriter(f,fieldnames=fields);w.writeheader();w.writerows({k:safe(r.get(k,'')) for k in fields} for r in rows)

def process(source,out,mode):
    rows=read_rows(source);clean,issues,summary=(inventory if mode=='inventory' else backups)(rows)
    out=Path(out);out.mkdir(parents=True,exist_ok=False)
    fields=['hostname','ip','role','ram_gb'] if mode=='inventory' else ['job_id','vm','started_at','status','duration_min','size_gb']
    write_csv(out/'clean.csv',clean,fields);write_csv(out/'issues.csv',issues,['row','issue'])
    (out/'summary.json').write_text(json.dumps(summary,indent=2),encoding='utf-8')
    h=html.escape
    table=lambda rs,ks:'<table><tr>'+''.join('<th>'+h(k)+'</th>' for k in ks)+'</tr>'+''.join('<tr>'+''.join('<td>'+h(str(r.get(k,'')))+'</td>' for k in ks)+'</tr>' for r in rs)+'</table>'
    (out/'report.html').write_text('<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Home Lab report</title><style>body{font:16px system-ui;background:#edf2f4;color:#183448;margin:5vw}table{border-collapse:collapse;background:white;display:block;overflow:auto}td,th{padding:12px;border:1px solid #ccd7de;text-align:left}h1{font-size:38px}</style><h1>'+h(mode.title())+' report</h1><p>Generated from supplied data. Bundled examples are synthetic home-lab data.</p>'+table([summary],list(summary))+'<h2>Accepted records</h2>'+table(clean,fields)+'<h2>Issues to review</h2>'+table(issues,['row','issue'])+'</html>',encoding='utf-8')
    return summary

if __name__=='__main__':
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('mode',choices=['inventory','backups']);p.add_argument('source');p.add_argument('output')
    a=p.parse_args()
    try:print(json.dumps(process(a.source,a.output,a.mode),indent=2))
    except (ValueError,OSError,KeyError,zipfile.BadZipFile,ET.ParseError) as e:p.exit(2,f'Error: {e}\n')
