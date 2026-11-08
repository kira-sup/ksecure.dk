# Project history and remembered decisions

Recorded 8 November 2026. The following is the complete 12-commit history returned for the documented main branch at baseline `4dd5c471f42034f57809305a910d8c93890773da`. Dates below are UTC as stored by Git. Commit titles describe recorded changes; they are not proof of external hosting settings.

## Timeline

| UTC date | Commit | Recorded change |
| --- | --- | --- |
| 2026-11-07T19:20:43Z | [338439a](https://github.com/kira-sup/ksecure.dk/commit/338439a9bc494cec07dab7a079174f09612b912f) | Initial commit |
| 2026-11-07T19:36:04Z | [d25cdd3](https://github.com/kira-sup/ksecure.dk/commit/d25cdd3704e6525b102f90bb171758fd9b6fba11) | Add six home lab portfolio demos, source, samples and guides |
| 2026-11-07T19:38:34Z | [bec454d](https://github.com/kira-sup/ksecure.dk/commit/bec454d0986b4b3453f6fa162872f6b385e8a5a5) | Create CNAME |
| 2026-11-07T19:57:33Z | [2ccef8f](https://github.com/kira-sup/ksecure.dk/commit/2ccef8fcaa40773f5791a4e67bd3bd756912d7a9) | Redesign KSecure with blue glass visuals and accessible project documentation |
| 2026-11-07T20:18:59Z | [655d95b](https://github.com/kira-sup/ksecure.dk/commit/655d95b01263064d4f7d5a86859259b76624b463) | Simplify homepage and introduce Kyrylo's personal IT portfolio |
| 2026-11-07T20:25:05Z | [3b6d6b9](https://github.com/kira-sup/ksecure.dk/commit/3b6d6b9c59449499ad128e446935f958259b754b) | Restore practical IT homepage without cybersecurity or infrastructure positioning |
| 2026-11-07T22:41:21Z | [ff97b2b](https://github.com/kira-sup/ksecure.dk/commit/ff97b2bd447bb3d75164e34e5d70ea3f3b947601) | Split KSecure into Home, Projects, Solutions and Info pages |
| 2026-11-07T22:50:43Z | [c0c1436](https://github.com/kira-sup/ksecure.dk/commit/c0c143657a82c1fda5a6253e419825b4df5bf8bc) | Remove Russian content and provide English-only guides and demo bundle |
| 2026-11-07T22:58:43Z | [0ede7a3](https://github.com/kira-sup/ksecure.dk/commit/0ede7a34d5ea500e2e3f5c66e4b81e2f08299709) | Focus KSecure on customer needs with broad solutions and PDF project briefs |
| 2026-11-07T23:01:52Z | [f52566e](https://github.com/kira-sup/ksecure.dk/commit/f52566e17422e44fbfeeed652c60cd9c9c0caefd) | Update CNAME |
| 2026-11-07T23:02:01Z | [49c6807](https://github.com/kira-sup/ksecure.dk/commit/49c68072821ca449e1eb04548f53faa58427e577) | Update CNAME |
| 2026-11-07T23:04:05Z | [4dd5c47](https://github.com/kira-sup/ksecure.dk/commit/4dd5c471f42034f57809305a910d8c93890773da) | Redirect old documentation URLs to PDF and add a helpful missing-page screen |

## Decisions reflected in the current tree

- The initial learning portfolio grew to six demos, source, samples and guides. The later blue visual redesign introduced much of the shared styling and optional interaction code.
- Homepage revisions moved toward a personal, practical IT presentation. The recorded restoration commit explicitly moved away from cybersecurity/infrastructure positioning; preserve the current broad practical-IT language unless deliberately revising that decision.
- Separate Home, Projects, Solutions and Info pages replaced an earlier single-page layout. Shared assets retain code for old filters and demo controls.
- The English-only commit `c0c1436` is the historical archive baseline. It contains the runnable tools, nine tests, sample inputs and outputs, original guides and a downloadable ZIP. Earlier versions remain in Git and are not flattened into this appendix.
- The customer-focused commit `0ede7a3` replaced published tool downloads and step-by-step guides with broad solutions and PDF project briefs. The current source snapshot preserves that site; archived source in this documentation does not reverse the website decision.
- Subsequent CNAME commits and the final redirect/404 commit brought the recorded baseline to `4dd5c47`. CNAME currently contains `ksecure.dk`. External DNS and Pages settings require separate inspection.
- Existing documentation URLs now lead to the PDF, with page fragments for specific project groups. Maintainer documentation therefore uses `documentation/` instead of replacing those legacy routes.

## Documentation added on 8 November 2026

The owner requested full GitHub documentation with copied source code to remember the project. This addition records architecture, operations, historical tools, two complete source snapshots and a machine-readable file manifest. It preserves all pre-existing website and PDF files except adding a documentation section to the repository README. It does not change site behavior or restore the old downloadable bundle.

All 89 text-file entries across the two snapshots were hash-verified. Binary PDF and ZIP references include immutable paths, sizes and Git blob hashes. The documentation does not claim to reproduce hosting/account state, review the PDF visually, execute the historical tests again or archive every revision.

## Recovering more history

Use `git log --all --oneline`, immutable commit links above, and `git show COMMIT:path/to/file` to inspect any earlier revision. Keep a full clone or independent Git mirror for recovery. Git source history does not back up DNS, account access, external hosting settings or private files never committed.

[Documentation home](README.md) · [Current source](SOURCE-CURRENT.md) · [Historical source](SOURCE-HISTORICAL.md)
