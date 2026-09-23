# GovtExam AI - Next-Gen Web OS for Government Exam Aspirants 🇮🇳

> A high-performance, ₹0-cost, modern Web OS platform engineered for over 50+ million students aspiring for Indian government jobs (SSC, UPSC, Railways, Banking, Defence, Postal, Police).

---

## ⚡ The Problem It Solves

Every year, millions of Indian students spend hours downloading and deciphering 50 to 80-page government gazette PDFs just to find out if their **10th percentage, 12th stream, degree, or appearing status** makes them eligible.

**GovtExam AI replaces that frustration with a 10-second instant eligibility engine:**
1. **Live Notification Feed (Page 1)**: All currently active government recruitment notifications with live vacancy counts, 7th CPC salary scales, multi-tier exam formats, and **bold red application deadlines**.
2. **Smart Eligibility Cockpit (Page 2)**:
   - **Option 1**: 10th Board percentage slider (e.g. 50%, 65%, 85%) -> instantly pulls eligible jobs (Postal GDS, SSC MTS, Railway Group D, Army Agniveer).
   - **Option 2**: 12th percentage + stream selection (Science PCM, Science PCB, Commerce, Arts) -> pulls SSC CHSL, UPSC NDA, Railway Clerk, Delhi Police.
   - **Option 3**: Degree list (B.Tech, B.Sc, B.Com, B.A., BCA, MBBS, etc.) + **"In which year are you currently studying"** (1st, 2nd, 3rd, Final Year Appearing, or Graduate) -> automatically checks if final year students are allowed (e.g. UPSC CSE, CDS, SBI PO allow final year appearing!).
   - **Demographic Relaxation**: Auto-calculates central age relaxation for General, OBC (+3 yrs), and SC/ST (+5 yrs).

---

## 🛠️ Tech Stack (₹0 Budget, Production Ready)

| Layer | Technology | Cost |
| :--- | :--- | :--- |
| **Framework** | Next.js 15 (App Router, React 19, TypeScript) | ₹0 |
| **Styling** | Tailwind CSS + Liquid Glass / Glassmorphism + Authentic Colors | ₹0 |
| **Icons** | Lucide React | ₹0 |
| **Data Layer** | Static Pre-Rendered JSON (`src/data/jobs.ts`) | ₹0 (No DB server fees) |
| **Hosting** | Vercel Hobby Tier or Cloudflare Pages | ₹0 Forever |
| **SEO & AEO** | Google `JobPosting` JSON-LD + `llms.txt` + `sitemap.xml` + `robots.txt` | ₹0 |

---

## 🚀 How to Run Locally

```bash
# 1. Clone repository & install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open your browser
http://localhost:3000
```

---

## 🌐 How to Deploy for ₹0 on Vercel

1. Push this folder to a new **GitHub repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of GovtExam AI"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/govtexam-ai.git
   git push -u origin main
   ```
2. Go to **[vercel.com](https://vercel.com)** and sign in with GitHub.
3. Click **"Add New Project"** and select `govtexam-ai`.
4. Click **Deploy**. Within 60 seconds, your site is live worldwide with free automated SSL, CDN edge caching, and zero maintenance!

---

## 🤖 AEO & Search Engine Discovery

- **Google Jobs**: Every single job page at `/jobs/[slug]` embeds Google's official `JobPosting` schema in JSON-LD.
- **AI Answer Engines**: Pre-configured `public/llms.txt` and `/llms.txt` endpoint enables Perplexity, ChatGPT, Claude, and Gemini to index and cite your job listings.
- **Dynamic XML Sitemap**: Generated automatically at `/sitemap.xml`.
