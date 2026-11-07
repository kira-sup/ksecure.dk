"""Minimal OOXML fixtures test the reader; these are not user workbooks."""
import sys,tempfile,unittest,zipfile
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from tools.tables import read_rows,inventory
class XlsxTest(unittest.TestCase):
 def fixture(self,path,formula=False):
  with zipfile.ZipFile(path,'w') as z:
   z.writestr('xl/workbook.xml','<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Input" sheetId="1" r:id="rId1"/></sheets></workbook>')
   z.writestr('xl/_rels/workbook.xml.rels','<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Target="worksheets/sheet1.xml"/></Relationships>')
   rows='<row r="1">'+''.join(f'<c r="{c}1" t="inlineStr"><is><t>{v}</t></is></c>' for c,v in zip('ABCD',['hostname','ip','role','ram_gb']))+'</row>'
   rows+='<row r="2">'+''.join(f'<c r="{c}2" t="inlineStr"><is><t>{v}</t></is></c>' for c,v in zip('ABC',['vm01','192.168.1.2','web']))+'<c r="D2">'+('<f>1+1</f>' if formula else '')+'<v>2</v></c></row>'
   z.writestr('xl/worksheets/sheet1.xml','<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>'+rows+'</sheetData></worksheet>')
 def test_xlsx_input(self):
  with tempfile.TemporaryDirectory() as t:
   p=Path(t)/'input.xlsx';self.fixture(p)
   self.assertEqual(inventory(read_rows(p))[2]['ram_gb'],2)
 def test_formula_rejected(self):
  with tempfile.TemporaryDirectory() as t:
   p=Path(t)/'input.xlsx';self.fixture(p,True)
   with self.assertRaises(ValueError):read_rows(p)
