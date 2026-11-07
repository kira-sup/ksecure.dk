# Home Lab: six practical demos

Personal learning projects with synthetic sample data. These are not paid client case studies. Created with AI assistance; understand and test the code before adapting it for real work.

## Quick start
Extract the complete bundle. Open START_HERE.html in your browser to explore the original website concepts. For the four automation scenarios, install Python 3.10 or newer, open a terminal in the extracted folder and run:

`py run_demo.py`

On Linux or macOS, use python3 instead of py. No extra Python packages, subscriptions or API keys are needed. Results appear in a timestamped folder inside runs/. Open inventory/report.html and backups/report.html there. Sample input files stay unchanged.

## 01. File organiser
Copies mixed files into categories such as Documents, Scripts and Tables. Nested folders are included; symbolic links are skipped. Different files with the same name receive numbered suffixes. Already copied identical files are skipped on a repeat run. Identical content under different names is not deduplicated.

Preview: `py tools/sort_files.py samples/downloads output-downloads`

Copy: `py tools/sort_files.py samples/downloads output-downloads --apply`

Original files are preserved. Copies are verified with SHA-256. The terminal prints a JSON log; append > downloads-log.json to save it. Use separate, non-nested source and destination folders. Run one instance at a time in trusted local folders. Interrupted runs can leave partial copies, so inspect the output before retrying.

## 02. Network configuration archive
Groups exported configuration files by device and month. It does not connect to equipment, export configurations or restore them.

Preview: `py tools/sort_files.py samples/configs output-configs --mode configs`

Copy: `py tools/sort_files.py samples/configs output-configs --mode configs --apply`

Supported names include sw01_2026-11-07.cfg and rb01_2026-11-07.rsc. Extensions: .cfg, .conf and .rsc. Device names use letters, numbers and hyphens. Invalid dates or unmatched filenames are skipped with a reason. A valid export becomes sw01/2026-11/sw01_2026-11-07.cfg. The sample contains three accepted exports and two skipped files. Sample configurations are text illustrations, not configurations to install on real hardware. Keep real secrets out of public repositories.

## 03. Inventory cleaner
Normalises hostnames and roles, validates IPv4/IPv6 addresses and positive RAM values, removes exact normalised duplicates and flags IP or hostname conflicts.

`py tools/tables.py inventory samples/inventory.csv output-inventory`

Required columns: hostname, ip, role, ram_gb. Outputs: clean.csv, issues.csv, summary.json and report.html. The bundled sample has 8 input rows, 5 accepted records and 4 review notes. Accepted rows total 20 GB of RAM. This sum includes host and guest entries and does not represent available physical memory. IP conflicts are flagged but retained for review; issue count is not the number of rejected rows.

## 04. Backup report
Summarises exported jobs and identifies virtual machines whose latest recorded run failed.

`py tools/tables.py backups samples/backups.csv output-backups`

Required columns: job_id, vm, started_at, status, duration_min, size_gb. Status must be success or failed. Timestamps must be ISO 8601 text with a timezone, such as 2026-11-07T02:00:00+00:00. Duration and size must be finite, non-negative numbers.

The sample has 6 valid runs, 4 successes, 2 failures and a 66.7% success rate. Successful runs total 18 GB of exported size_gb values. The latest recorded job for dc-01 failed. A duplicate job ID and invalid date appear in issues.csv. Latest means latest timestamp, not last row; equal timestamps keep the first record. VM names are case-sensitive. Duplicate job IDs are excluded after the first accepted record.

This is an export summary, not backup monitoring or a restore test. It cannot detect missing VMs, check backup age or prove recoverability. Success rate is per job, not per VM. Exported size totals do not account for deduplication or actual storage use.

## Excel and CSV support
Input formats: UTF-8 CSV with comma, semicolon or tab separators, and simple .xlsx files with values on the first sheet. Row one must contain column headers, with no title rows or merged cells. Input formulas are rejected. Store dates as ISO 8601 text rather than numeric Excel dates.

Unsupported: .xls, .xlsm, encrypted workbooks and XLSX files exceeding 20 MB uncompressed. Records are loaded into memory; these demos are intended for small tables. Outputs are CSV with a UTF-8 BOM, JSON and HTML, not formatted XLSX. If a CSV opens in one Excel column, use Data > From Text/CSV and choose comma. Formula-like strings are escaped with an apostrophe.

Existing report output folders are not overwritten. Choose a new folder name for each run, or use run_demo.py to generate timestamped folders.

## 05. Home lab website
Open web/lab.html. A dark, responsive portfolio concept with project filters, a sample lab illustration and report links. Uses HTML, CSS and JavaScript without a build process. The topology is illustrative and status indicators are decorative, not live monitoring. Replace personal information only with details you can demonstrate.

## 06. IT service website
Open web/support.html. A light service-page concept with a process overview, expandable questions and a downloadable enquiry checklist. It is a fictional service: no real contact details, booking, payment collection or customer reviews are configured. Add real details and an agreed scope before adapting it for an actual business.

## Verification and troubleshooting
Run: `py -m unittest discover -s tests -v`

Nine checks cover copying, collisions, repeat runs, dry-run behaviour, nested destination rejection, configuration filtering, report totals, invalid numbers, CSV escaping and minimal XLSX reading. Checks ran in Linux. Windows execution and desktop Excel need local verification.

If py is unavailable, confirm Python is installed and try python or python3. For missing columns, compare the headers with this guide. For an existing output directory, choose another name. For XLSX formulas, create a separate values-only copy. Keep your original inputs when diagnosing a failed run.

## Files and portfolio use
Tools live in tools/, inputs in samples/, and recorded sample outputs in examples/. Original website demos live in web/. run_demo.py runs the four script scenarios; tests/ contains behaviour checks.

Present projects as: problem, sample input, command, output and limitations. Describe them honestly as personal learning projects made with AI assistance. Do not invent clients, testimonials or certifications. Test the examples on your own computer and understand a change before offering similar work to someone else.
