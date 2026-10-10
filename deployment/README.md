# Main-server hosting

- Application: `/home/raul/portfolio` on SSH alias `main-server`.
- Compose project: `raul-portfolio`; service: `web`.
- LAN origin: `http://192.168.18.10:8102`.
- Server-local origin: `http://127.0.0.1:8102`.
- Health: `/healthz`; React resume: `/resume`.

Nginx serves the compiled React output only. The container reuses the existing Nginx image pinned by digest, runs as UID 101, mounts files read-only and restarts with Docker. No application data or secrets are needed. React routes fall back to `index.html`; missing bundles and hidden files return 404.

## Build and release

Build using the repository's development instructions. The release contains `dist/`, `compose.yaml` and `deployment/nginx.conf`. Upload to a unique staging directory on `main-server`, verify the archive SHA256, then prepare `/home/raul/portfolio`.

Before updating an existing deployment, archive its `dist/`, `compose.yaml` and `deployment/` into `/home/raul/backups/portfolio/<timestamp>.tar.gz`. Preserve prior release files. Replace only this application's files and run:

```sh
ssh main-server 'cd /home/raul/portfolio && docker compose up -d --wait --wait-timeout 60'
ssh main-server 'curl -fsS http://127.0.0.1:8102/healthz'
ssh main-server 'cd /home/raul/portfolio && docker compose ps'
```

Verify `/`, `/resume`, the JavaScript/CSS bundles, images, `robots.txt` and `sitemap.xml`. Confirm `/.git/config` and missing assets return 404. Check the browser's three featured cards, “View more”, ES/EN/PT, Codex/Claude and resume navigation.

## Custom domain

The deployment prepares an HTTP origin for the existing Cloudflare tunnel. Route `www.raulabz.online` to **HTTP `192.168.18.10:8102`** (or `localhost:8102` if the connector runs on `main-server`). HTTPS is provided by the tunnel's public edge. DNS/tunnel configuration is not part of the initial origin deployment.

## Rollback

Stop only this application with `docker compose down` in `/home/raul/portfolio`. Restore the prior archive into that directory and run `docker compose up -d --wait`. For the initial release, stopping this Compose project leaves its files in place and affects no other services. Do not remove shared Docker images.
