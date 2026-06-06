# AGRON Production Deployment Checklist

## 1. Environment Configuration
- [ ] **NODE_ENV** set to `production`.
- [ ] **DATABASE_URL** uses connection pooling (e.g., PgBouncer) if on Postgres.
- [ ] **JWT_SECRET** is high-entropy (min 64 chars) and rotated quarterly.
- [ ] **CORS_ORIGIN** strictly matches the frontend domain (no wildcards).

## 2. Infrastructure & Networking
- [ ] **Load Balancer**: Ensure TLS termination is upstream.
- [ ] **Trust Proxy**: Application `trustProxy` is enabled in `app.ts`.
- [ ] **Firewall**: Database port (5432) closed to public internet; only allow App VPC.
- [ ] **Rate Limiting**: Verify Redis backing for rate limits if running multi-instance.

## 3. Database
- [ ] **Migrations**: Run `prisma migrate deploy` (NOT `dev`).
- [ ] **Seeding**: Run `prisma db seed` only on fresh installs or for static lookups.
- [ ] **Backups**: Enable Point-in-Time Recovery (PITR).
- [ ] **Audit Logs**: Verify `AuditLog` table is capturing `AUTH_LOGIN` events.

## 4. Monitoring & Logging
- [ ] **Log Aggregation**: Ship JSON logs to ELK/Datadog/CloudWatch.
- [ ] **Alerts**:
    - 5xx Error Rate > 1%
    - 401/403 Spikes (Potential Brute Force)
    - P95 Latency > 500ms
- [ ] **Health Checks**: `/api/healthz` and `/api/readyz` configured in K8s/LB.

## 5. Security
- [ ] **Headers**: Verify `Helmet` headers via `securityheaders.com` (Target: A Grade).
- [ ] **Cookies**: Ensure `Secure` and `HttpOnly` flags are active on Refresh Tokens.
- [ ] **RBAC**: Audit `Permission` table to ensure no 'wildcard' permissions exist in prod.

## 6. Disaster Recovery
- [ ] **Playbook**: Define steps for "Database Corruption" and "Secret Leak".
- [ ] **Drills**: Schedule quarterly recovery drills.
