# Hermun Enterprises — Roofing Contract API

Backend server that connects the sales rep form to SignWell for e-signature.

---

## 🚀 Deploy to Railway (5 minutes)

### Step 1 — Push to GitHub
1. Create a new repo at https://github.com/new (name it `hermun-contract-api`)
2. Run these commands in your terminal in this folder:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/hermun-contract-api.git
git push -u origin main
```

### Step 2 — Deploy on Railway
1. Go to https://railway.app and sign in with GitHub
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your `hermun-contract-api` repo
4. Railway will auto-detect Node.js and deploy it

### Step 3 — Add Environment Variables on Railway
In your Railway project → **Variables** tab, add these:

| Variable | Value |
|---|---|
| `SIGNWELL_API_KEY` | `YWNjZXNzOmU5OTczMmE2YjFkYTAxYTliZTBmZGM3NmY2MDlmMTg5` |
| `SIGNWELL_TEMPLATE_ID` | `78f0db27-0c8f-45da-b9d5-dd04f9599909` |

> ⚠️ Do NOT commit the `.env` file to GitHub — it's in `.gitignore` for security.

### Step 4 — Get your Railway URL
After deploy, Railway gives you a URL like:
`https://hermun-contract-api-production.up.railway.app`

Copy that URL and update the form's fetch call:
```javascript
const res = await fetch('https://YOUR-RAILWAY-URL.up.railway.app/send-contract', {
```

---

## API Endpoint

### POST /send-contract
Sends a roofing contract via SignWell for e-signature.

**Request body:**
```json
{
  "customerName": "Jane Smith",
  "customerEmail": "jane@email.com",
  "customerPhone": "(555) 000-0000",
  "customerAddress": "123 Main St",
  "customerCity": "El Paso",
  "customerState": "TX",
  "customerZip": "79901",
  "price": "$12,000.00",
  "coSigner": "No",
  "financedOrCash": "Financed",
  "downPayment": "$2,000.00",
  "finalPayment": "$10,000.00",
  "bank": "Wells Fargo",
  "monthlyPayment": "$250.00",
  "term": "60 months",
  "apr": "6.99%",
  "rep": "John Doe",
  "repEmail": "john@hermunenterprises.com",
  "roofingBrand": "Malarkey",
  "roofingColor": "Charcoal",
  "areaToCover": "Full roof",
  "roofingSQ": "24",
  "roofingOSB": "10",
  "fasciaLinearFt": "120",
  "soffitLinearFt": "80",
  "sidingLinearFt": "0"
}
```

**Success response:**
```json
{
  "success": true,
  "documentId": "abc123",
  "status": "pending"
}
```

---

## Local Development
```bash
npm install
npm run dev
```
Server runs at http://localhost:3000
