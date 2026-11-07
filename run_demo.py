"""Run all four tools on bundled samples; open START_HERE.html for the websites."""
import json
from datetime import datetime
from pathlib import Path
from tools.sort_files import run
from tools.tables import process
root=Path(__file__).resolve().parent
out=root/'runs'/datetime.now().strftime('%Y%m%d-%H%M%S-%f');out.mkdir(parents=True)
for mode,folder in [('downloads','downloads'),('configs','configs')]:
    records=run(root/'samples'/folder,out/folder,mode,True)
    (out/(mode+'-log.json')).write_text(json.dumps(records,indent=2),encoding='utf-8')
for mode in ['inventory','backups']:print(mode,process(root/'samples'/(mode+'.csv'),out/mode,mode))
print('Finished. Originals unchanged. Results:',out)
