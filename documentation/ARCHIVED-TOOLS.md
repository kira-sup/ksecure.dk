# Historical automation tools and demos

**Historical reference, not the current website's installed tools.** This describes commit [`c0c143657a82c1fda5a6253e419825b4df5bf8bc`](https://github.com/kira-sup/ksecure.dk/tree/c0c143657a82c1fda5a6253e419825b4df5bf8bc), the recorded English-only bundle before the customer-facing/PDF revision. [Historical source](SOURCE-HISTORICAL.md) includes every text file from that snapshot. [Operations](OPERATIONS.md) explains how to obtain it in a separate checkout.

## Environment and directory layout

The Python scripts declare Python 3.10+ and use the standard library. No API key, subscription or third-party Python package is required. `tools/sort_files.py` handles the first two scenarios, `tools/tables.py` the two data scenarios, `run_demo.py` runs all four, `samples/` supplies synthetic input, `examples/` stores recorded output, and `tests/` contains unittest checks. `web/` supplies the two HTML website concepts. Historical README, `DEMO_GUIDE.md` and HTML guides are copied in the appendix too.

Run commands from the historical repository root. On Windows use `py`; on other systems substitute `python3` or the appropriate Python 3 command. To generate all example results:

```powershell
py run_demo.py
```

The runner creates `runs/<timestamp-with-microseconds>/`, copies and logs the download/config scenarios, generates both report folders, and prints summaries. It performs actual copies only on bundled sample folders and retains the originals. The old runner's docstring mentions `START_HERE.html`; at this snapshot that file redirects to the then-current site, so open `web/lab.html` and `web/support.html` directly when inspecting the original concepts.

## 1. File organiser

```powershell
py tools/sort_files.py samples/downloads output-downloads
py tools/sort_files.py samples/downloads output-downloads --apply
```

Without `--apply`, this is a dry run: it returns JSON plans and creates no destination directory. The source must be an existing directory; source and destination are resolved and must be separate and non-nested. Traversal includes subdirectories but skips symbolic links and files under symlink parents. Files are copied, never moved or deleted.

| Category | Extensions |
| --- | --- |
| Documents | `.pdf`, `.txt`, `.docx` |
| Images | `.png`, `.jpg`, `.jpeg` |
| Installers | `.iso`, `.exe`, `.msi` |
| Archives | `.zip`, `.7z` |
| Scripts | `.ps1`, `.py`, `.sh` |
| Tables | `.csv`, `.xlsx` |
| Network-labs | `.pkt` |
| Other | Every unmatched extension |

Extension matching is case-insensitive. Category output flattens the input directory structure. Distinct same-name files get suffixes such as `notes__1.txt`; existing same-target content is recognized by SHA-256 as `ALREADY EXISTS`. This is not global deduplication of equal content under different names. Writes use exclusive creation and hashes are checked after copying. Destination symlink parents are refused during writes.

Returned records include relative source, destination where applicable, status and SHA-256. Statuses include `PLAN COPY`, `COPIED`, `ALREADY EXISTS`, and skip reasons for configuration mode. The CLI prints JSON; redirect it if a log file is desired. Use trusted local directories and one instance at a time. The implementation can leave partial files after interruption or failure; it does not provide a transaction, rollback or complete defense against filesystem races.

## 2. Network configuration archive

```powershell
py tools/sort_files.py samples/configs output-configs --mode configs
py tools/sort_files.py samples/configs output-configs --mode configs --apply
```

This uses the same copy engine, with filename pattern `DEVICE_YYYY-MM-DD.EXT`. Device characters are letters, digits and hyphens; supported extensions are `.cfg`, `.conf` and `.rsc`, matched without case sensitivity. Dates are validated as real calendar dates. The destination is lower-case device / year-month / original filename, for example `sw01/2026-11/sw01_2026-11-07.cfg`. Invalid dates and unmatched filenames receive logged skip reasons.

The sample has three accepted exports and two skipped files. This tool only groups already exported files. It does not connect to devices, read credentials, create exports, validate configuration semantics or restore hardware. The configuration samples are text illustrations, not instructions to install them on equipment.

## Shared table reader and report writer

Both data scenarios accept UTF-8 CSV (BOM allowed) and simple `.xlsx` workbooks. CSV dialect detection samples the first 4096 characters and recognizes comma, semicolon or tab; it falls back to comma. Headers are stripped/lowercased, and expected keys are required. XLSX support reads the first workbook sheet through OOXML ZIP/XML, supports shared and inline strings and basic values, and rejects formula cells and workbooks above 20 MB declared uncompressed size. Numeric Excel dates are not converted; use timezone-bearing ISO text for timestamps.

This is a small demonstration reader, not a full Excel implementation. `.xls`, macro/encrypted workbooks, merged/title-row layouts, arbitrary workbook structures and large datasets are outside its intended use. There is no formula engine or spreadsheet formatting output. Data loads into memory. The historical source has no separate schema or exception-handling layer for every malformed OOXML edge case.

Each scenario creates a **new** output directory containing `clean.csv`, `issues.csv`, `summary.json` and `report.html`. An existing output directory is rejected. CSV outputs use UTF-8 with BOM and prefix formula-like values beginning, after leading whitespace, with `=`, `+`, `-` or `@` with an apostrophe. HTML table text is escaped with `html.escape`. These are focused protections in a demo, not a guarantee for every downstream spreadsheet workflow. Use a new output folder per run.

## 3. Device inventory

```powershell
py tools/tables.py inventory samples/inventory.csv output-inventory
```

Required columns: `hostname`, `ip`, `role`, `ram_gb`. Hostname and role become lower-case; IP addresses are parsed and normalized as IPv4/IPv6; RAM accepts a decimal comma but must be finite and strictly positive. A hostname is required. Exact normalized duplicates are removed. Conflicting IPs or hostnames are flagged while the otherwise valid rows remain in accepted output. Issue row numbers begin at 2, counting a header row.

Summary fields are `input_rows`, `accepted_rows`, `issues` and summed `ram_gb`. The bundled sample yields 8 input rows, 5 accepted rows, 4 issue records and 20.0 GB. An issue count is not a rejected-row count: a retained conflict generates an issue, and one row can generate multiple issues. The RAM sum includes sample hypervisor/guest entries and does not represent free physical RAM. The tool cannot discover devices or determine which conflicting record is correct.

## 4. Backup reporting

```powershell
py tools/tables.py backups samples/backups.csv output-backups
```

Required columns: `job_id`, `vm`, `started_at`, `status`, `duration_min`, `size_gb`. Job ID and VM are nonempty; job IDs are unique after the first accepted occurrence. Status is lowercased and must be `success` or `failed`. `started_at` must parse as an ISO timestamp containing a timezone. Duration and size accept decimal commas and must be finite and nonnegative. VM labels are case-sensitive.

Summary fields are `valid_runs`, `successful_runs`, `failed_runs`, `success_rate_percent`, `successful_gb`, `latest_failed_vms` and `rejected_rows`. Latest means the greatest timestamp per VM, not the last row; equal timestamps keep the first accepted record. Success rate is successful jobs divided by all accepted jobs, rounded to one decimal, and is null with no valid runs. Successful GB sums exported `size_gb` for successful jobs and rounds to two decimals. Latest failed VM names are sorted and comma-separated, or the string `None` when absent.

The sample has 6 valid jobs, 4 successes, 2 failures, a 66.7% success rate, 18.0 successful GB, latest failure for `dc-01` and 2 rejected rows (duplicate job ID and invalid timestamp). These values match the static report retained in current main. The tool cannot detect missing machines, assess backup freshness, check actual storage after deduplication, monitor future runs or prove recovery by restoring data.

## 5–6. Website concepts

The dark lab concept and light fictional IT service concept are standard HTML/CSS with a small inline filter in the lab page. Neither needs Python for its browser behavior. They demonstrate presentation, not live infrastructure, bookings or customer reviews. The current website retains modified versions while linking its project briefs to the PDF. See [Architecture](ARCHITECTURE.md) for current behavior.

## Existing tests and reproducibility

In the historical checkout:

```powershell
py -m unittest discover -s tests -v
```

`tests/test_tools.py` contains seven checks: copy collision/dry-run/repeat behavior, nested destinations, configuration filtering, inventory totals, backup totals, CSV formula escaping and nonfinite RAM rejection. `tests/test_xlsx.py` adds two minimal OOXML checks for reading input and rejecting a formula. There are nine test methods in total.

The preserved historical guide says the checks ran on Linux and Windows/desktop Excel still needed local verification. The present documentation pass did not rerun those tests. They do not cover every filename race, parser edge case, operating system, browser behavior or user spreadsheet. Run them and review sample outputs before adapting the archived implementation. These archived code blocks are a record of the earlier code, not a claim that it is production-ready or newly tested.
