# 🚀 How to Deploy ConvertsText to Cloudflare

Your codebase is pre-configured with **`wrangler.toml`**, **`src/index.js`**, **`_headers`**, and **`package.json`** for Cloudflare Workers & Pages.

Choose the deployment method that fits you best:

---

## ⚡ Method 1: Cloudflare Dashboard Direct Upload (Easiest - 1 Minute)

No command line required. Works directly from your browser with **Cloudflare Pages**:

1. Log in to your **[Cloudflare Dashboard](https://dash.cloudflare.com/)**.
2. In the left sidebar, navigate to **Compute (Workers & Pages)** ➔ **Create application** ➔ **Pages** tab.
3. Select **"Upload assets"**.
4. Name your project (e.g. `convertstext`).
5. Drag and drop the **`ConvertsText`** folder (or select all files from `c:\Users\tehze\OneDrive\Desktop\ConvertsText`).
6. Click **"Deploy site"**.
7. 🎉 Your website is immediately live on `https://convertstext.pages.dev` with global SSL, DDoS protection, and edge caching!

---

## 💻 Method 2: Deploy via Wrangler CLI (Cloudflare Workers)

If you have Node.js installed on your machine:

1. Open PowerShell or Terminal in this folder:
   ```powershell
   cd c:\Users\tehze\OneDrive\Desktop\ConvertsText
   ```
2. Log in to your Cloudflare account via Wrangler:
   ```bash
   npx wrangler login
   ```
3. Deploy the project with one command:
   ```bash
   npx wrangler deploy
   ```
4. Wrangler will upload the worker and assets, giving you your live worker URL (e.g. `https://convertstext.<your-subdomain>.workers.dev`).

---

## 🔄 Method 3: Connect via GitHub (Automatic Updates)

1. Push your folder to a private or public GitHub repository.
2. Go to **Cloudflare Dashboard** ➔ **Workers & Pages** ➔ **Create application** ➔ **Pages** ➔ **Connect to Git**.
3. Select your repository.
4. Leave build settings as:
   - **Framework preset**: `None`
   - **Build command**: *(leave blank)*
   - **Build output directory**: `/`
5. Click **"Save and Deploy"**. Every time you commit, Cloudflare will automatically re-deploy your site!

---

## 🌐 Custom Domain Setup (e.g., `convertstext.com`)

1. In your Cloudflare Pages / Workers project dashboard, click **"Custom domains"**.
2. Click **"Set up a custom domain"** and enter your domain name (e.g. `convertstext.com`).
3. Cloudflare will automatically configure the DNS records and issue a free SSL certificate.
