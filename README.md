# BinderHub Decommission Notice (Vue)

This project is a Vue 3 + Vite static app that catches old BinderHub URLs and presents two options:

- Continue on `https://mybinder.org`
- Continue on `https://binderhub.rc.nectar.org.au`

The app preserves the incoming path and query string so launch details are not lost.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown by Vite, usually `http://localhost:5173`.

## Test a legacy BinderHub path locally

With Vite running, open a deep route such as:

```text
http://localhost:5173/v2/gh/Australian-Text-Analytics-Platform/quotation-tool.git/a10e91e3735c777f6711f157921d547b714f8f3a?labpath=quote_extractor_notebook.ipynb
```

Because this app uses Vue Router history mode, Vite dev server serves the SPA with fallback support and the page reads that full path/query.

## Build for production

```bash
npm run build
npm run preview
```

## Router fallback on static hosts

- Netlify: `public/_redirects` is included with `/* /index.html 200`.
- Generic static hosts: ensure unknown routes are rewritten to `index.html`.


## This page uses Nectar as a DNS 

the SOA is atap-binder.cloud.edu.au.

My custom domain is

notice-test.atap-binder.cloud.edu.au 

# 1. Create CNAME record pointing to your GitHub Pages
```bash
openstack recordset create \
  --type CNAME \
  --record language-research-technology.github.io \
  <<zoneID>> \
  notice-test.atap-binder.cloud.edu.au
```

# 2. Create TXT record for GitHub verification
# First, get the verification value from GitHub, then run:
```bash
openstack recordset create \
  --type TXT \
  --record '"_github-pages-challenge-Language-Research-Technology=<<textCode>>"' \
  <<zoneID>> \
  notice-test
```

To get the verification code:

Go to your repo → Settings → Pages
Enter notice-test.atap-binder.cloud.edu.au in the "Custom domain" field
GitHub will display the TXT record value (something like _github-pages-challenge-Language-Research-Technology=xxxxx)
Copy that and use it in the TXT command above