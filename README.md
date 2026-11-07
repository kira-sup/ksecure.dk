# Home Lab Portfolio

Six personal learning demos: four local automation scenarios and two static websites.
All sample records are synthetic. These are practice projects, not paid client case studies.
Created with AI assistance; source and repeatable checks are included.

**[Visit ksecure.dk](https://ksecure.dk)** · **[Documentation](https://ksecure.dk/docs/)** · **[English demo guide](DEMO_GUIDE.md)** · **[Download the runnable bundle](HomeLab_Portfolio.zip)**

After GitHub Pages is enabled, use its published URL to view the websites. GitHub's repository file view displays HTML source rather than rendering a website.

| Demo | What it does | Entry point |
| --- | --- | --- |
| Downloads organiser | Preview and copy files into categories without deleting originals | `tools/sort_files.py` |
| Network config archive | Group dated exports by device and month; verify hashes | `tools/sort_files.py --mode configs` |
| Inventory cleaner | Validate IPs/RAM, remove exact duplicates, flag conflicts | `tools/tables.py inventory` |
| Backup report | Summarise runs and identify latest recorded failures | `tools/tables.py backups` |
| Home lab portfolio | Dark website with filterable project cards | `web/lab.html` |
| Local IT service concept | Light website with FAQ and enquiry checklist | `web/support.html` |

## Run locally

Requires Python 3.10+. No external packages or API keys.

```sh
python run_demo.py
python -m unittest discover -s tests -v
```

On Windows, `py` can be used instead of `python`. Open `START_HERE.html` in a browser.
Generated output goes into a timestamped `runs/` folder; sample inputs remain unchanged.

## Excel / CSV support

The table tools accept UTF-8 CSV and simple first-sheet XLSX files containing values.
They produce CSV, JSON and HTML reports, not formatted XLSX workbooks.
Input formulas are rejected; timestamps must be ISO 8601 text with a timezone.
See the English demo guide for schemas, examples and limitations.

## GitHub Pages

This repository is a buildless static site with `index.html` at its root and `.nojekyll`.
Configure Pages to deploy from the repository branch and root folder. No custom domain or secrets are required.
The Python scripts are downloadable source: they do not execute on GitHub Pages.

## Scope and verification

Nine Python tests passed in Linux, including copying, filename collisions, repeat runs,
validation, report totals and minimal XLSX input. The two website layouts and their
filter/FAQ interactions were checked in a browser. Windows and desktop Excel still
need local verification. No live infrastructure, booking system or real business
contact is connected.

Do not add real device exports, secrets, client data or credentials to this public demo.


## Website redesign

The main website now includes a blue and white responsive layout, glass panels, reduced-motion support, a sample file organiser, project filters and search. The `docs/` directory contains six project guides, a searchable index and a getting-started guide. The original dark and light website demos remain in `web/`. `HomeLab_Portfolio.zip` remains the original runnable demo bundle. The source for the redesigned site is in `index.html`, `assets/` and `docs/`.


## Separate website pages

- `index.html`: short KSecure introduction and navigation.
- `projects.html`: all six demos with search and category filters.
- `solutions.html`: task-based routes to matching projects and the organiser preview.
- `info.html`: about KSecure, learning environment and resource links.
- `docs/`: setup and technical project guides.

Shared navigation links to pages rather than homepage section anchors. Old homepage section links redirect to the corresponding page.
