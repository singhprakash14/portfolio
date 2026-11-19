# Auto deploy — GitHub Pages + Vercel

`main` pe push → dono workflows chalenge.

## 1) GitHub Pages

Free GitHub pe Pages **sirf public repos** pe chalta hai (private = Enterprise/upgrade).

1. Repo → **Settings → General → Danger Zone → Change repository visibility → Public**
2. **Settings → Pages → Source: GitHub Actions**
3. Re-run **Deploy GitHub Pages** (ya `main` pe push)
4. Site: https://singhprakash14.github.io/portfolio/

Workflow: `.github/workflows/deploy-github-pages.yml`  
Build base: `/portfolio/` (project Pages path)

Private rakhna ho to Pages workflow skip karo — site Vercel pe chalegi.

## 2) Vercel

1. https://vercel.com/account/tokens → create token
2. Repo → **Settings → Secrets and variables → Actions** → add:

| Secret | Value |
|--------|--------|
| `VERCEL_TOKEN` | token from step 1 |
| `VERCEL_ORG_ID` | `1snhS55EwNyphEKD588hERPF` |
| `VERCEL_PROJECT_ID` | `prj_zsZQmPL5yD4SnviKg5mgwjaR0YoF` |

Workflow: `.github/workflows/deploy-vercel.yml`

**Note:** Agar Vercel dashboard pe GitHub auto-deploy already on hai, Action se double deploy hoga — ek hi rakhna (ya Git integration off, ya yeh workflow delete).

## Manual

```bash
# GitHub Pages (force push gh-pages — optional; Actions preferred)
npm run deploy:gh

# Vercel
vercel --prod
```
