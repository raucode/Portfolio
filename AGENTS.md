# Portfolio deployment destination

Raul approved the React redesign and requested compilation/deployment to `main-server` on 2026-10-10.

- Work in this checkout. Serve only the compiled `dist/`.
- Destination: `/home/raul/portfolio`, SSH alias `main-server`.
- Docker Compose project: `raul-portfolio`; service: `web`.
- Origin: `http://192.168.18.10:8102`; local origin: `http://127.0.0.1:8102`.
- Follow `deployment/README.md` for backup, deployment, checks and rollback.
- Preserve ES/EN/PT, the three featured projects and expanded catalog, and the React resume route.
- Keep DNS/tunnel work separate from an origin deployment. Do not claim `www.raulabz.online` works until it is verified over HTTPS.
