import sys,unittest,tempfile
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from tools.sort_files import run
from tools.tables import inventory,backups,read_rows,safe
R=Path(__file__).resolve().parents[1]
class ToolsTest(unittest.TestCase):
 def test_copy_collision_dry_and_repeat(self):
  with tempfile.TemporaryDirectory() as tmp:
   a=Path(tmp)/'in';b=Path(tmp)/'out';(a/'sub').mkdir(parents=True)
   (a/'x.txt').write_text('one');(a/'sub/x.txt').write_text('two')
   run(a,b);self.assertFalse(b.exists())
   run(a,b,apply=True);self.assertEqual(len(list(b.rglob('*.txt'))),2)
   self.assertEqual(sorted(p.read_text() for p in b.rglob('*.txt')),['one','two'])
   self.assertTrue((a/'x.txt').exists())
   run(a,b,apply=True);self.assertEqual(len(list(b.rglob('*.txt'))),2)
 def test_nested_rejected(self):
  with tempfile.TemporaryDirectory() as tmp:
   with self.assertRaises(ValueError):run(tmp,Path(tmp)/'out')
 def test_configs(self):
  rows=run(R/'samples/configs',R/'unused','configs');self.assertEqual(sum(r['status']=='PLAN COPY' for r in rows),3)
 def test_inventory(self):
  clean,issues,s=inventory(read_rows(R/'samples/inventory.csv'));self.assertEqual(s['accepted_rows'],5);self.assertEqual(s['ram_gb'],20);self.assertEqual(len(issues),4)
 def test_backups(self):
  clean,issues,s=backups(read_rows(R/'samples/backups.csv'));self.assertEqual(s['valid_runs'],6);self.assertEqual(s['success_rate_percent'],66.7);self.assertEqual(s['latest_failed_vms'],'dc-01');self.assertEqual(s['successful_gb'],18.0)
 def test_csv_injection(self):self.assertEqual(safe(' =1+1'),"' =1+1")
 def test_nonfinite_ram(self):
  clean,issues,s=inventory([dict(hostname='a',ip='10.0.0.1',role='test',ram_gb='nan')]);self.assertEqual(len(clean),0)
if __name__=='__main__':unittest.main()
