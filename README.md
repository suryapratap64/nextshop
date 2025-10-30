# 🛍️ NextShop — E-Commerce Product Catalog (Next.js Assignment)

**Author:** Surya Pratap Singh  
**Date:** October 2025  
**Stack:** Next.js (App Router + TypeScript + Tailwind CSS)  
**Database:** MongoDB (Mongoose) or JSON fallback  
**Run Command:** `npm install && npm run dev`

---

## 📘 Project Overview

NextShop is a small e-commerce product catalog built with Next.js to demonstrate different rendering methods and backend API integration.  
Users can browse and view product details, and admins can manage inventory through a simple client-side admin panel.

---

## ⚙️ Core Requirements & Rendering Strategies

| Page | Route | Rendering Type | Description |
|------|--------|----------------|--------------|
| 🏠 **Home Page** | `/` | **SSG (Static Site Generation)** | Displays product catalog generated at build time. Includes client-side search/filtering. |
| 📦 **Product Detail Page** | `/products/[slug]` | **ISR (Incremental Static Regeneration)** | Displays single product details with revalidation every 60 seconds. |
| 📊 **Inventory Dashboard** | `/dashboard` | **SSR (Server-Side Rendering)** | Displays live stock data fetched directly from MongoDB on each request. |
| 🧑‍💼 **Admin Panel** | `/admin` | **CSR (Client-Side Rendering)** | Interactive product creation and update form handled via API routes. |
| 💡 **Recommendations (Bonus)** | `/recommendations` | **Server Components** | Demonstrates hybrid rendering using React Server Components. |

---

## 🗂️ Project Structure

app/
├── layout.tsx
├── page.tsx # Home (SSG)
├── products/
│ └── [slug]/page.tsx # Product details (ISR)
├── dashboard/page.tsx # Inventory dashboard (SSR)
├── admin/page.tsx # Admin panel (CSR)
└── recommendations/page.tsx # Bonus: Server Components

components/
├── ProductCard.tsx
├── ProductForm.tsx
├── FilteredProducts.tsx
├── Header.tsx
└── Footer.tsx

app/api/products/
├── route.ts # GET, POST (App Router APIs)
└── [id]/route.ts # PUT for product update

lib/
├── db.ts # MongoDB connection
└── products.ts # Mongoose model

data/
└── products.json # Mock data (fallback)

public/
└── image.png # Default product image

yaml
Copy code

---

## ⚙️ Setup Instructions

### 1. Clone and install
```bash
git clone <repo-url>
cd nextshop
npm install
2. Create environment file
bash
Copy code
cp .env.example .env.local
Example .env.local:

ini
Copy code
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/nextshop
ADMIN_KEY=secret123
NEXT_PUBLIC_ADMIN_KEY=secret123
3. Run the app
bash
Copy code
npm run dev
Visit http://localhost:3000

🧩 API Endpoints
Method	Endpoint	Description
GET	/api/products	Fetch all products
GET	/api/products/[slug]	Fetch single product
POST	/api/products	Add new product (admin protected)
PUT	/api/products/[id]	Update existing product (admin protected)

Example Product Object
json
Copy code
{
  "name": "Wireless Headphones",
  "slug": "wireless-headphones",
  "description": "High-quality Bluetooth headphones with deep bass.",
  "price": 2499,
  "category": "Electronics",
  "inventory": 15,
  "lastUpdated": "2025-10-30T12:00:00.000Z"
}
🧠 Rendering Rationale
Home (SSG): Frequent traffic, minimal updates → build once for performance.

Product Detail (ISR): Data changes (price, stock) occasionally → revalidate every 60s.

Dashboard (SSR): Admin-only, needs real-time data → fetch fresh each request.

Admin Panel (CSR): Form-heavy UI → client-side fetching + state management.

Recommendations (Server Components): Server fetch for performance, client-side buttons for interactivity.

🔄 Data Flow
Home statically loads products from MongoDB via getStaticProps.

Each Product Detail page prebuilds (ISR) and fetches directly from DB using findOne().

Dashboard fetches live data server-side on every request.

Admin Panel makes API calls (POST, PUT) with ADMIN_KEY header for protected operations.

After adding/updating products, data automatically revalidates (ISR).

🧰 Mongoose Product Schema
ts
Copy code
{
  name: String,
  slug: { type: String, unique: true },
  description: String,
  price: Number,
  category: String,
  inventory: Number,
  image: String,
  lastUpdated: { type: Date, default: Date.now }
}
📊 Dashboard Features
Total Products Count

Low Stock (inventory < 5)

Out-of-Stock Alerts

Recent Updates

Auto-refresh using SSR rendering

🧑‍💻 Admin Panel
Add or update products from /admin
Form fields:

Product Name

Unique Slug

Price

Inventory

Category

Product Description

Data is submitted via POST /api/products or PUT /api/products/[id] with admin key verification.

🧱 Environment Config
next.config.js

js
Copy code
module.exports = {
  images: {
    domains: ["images.unsplash.com", "i.dell.com"],
  },
};
📸 Screenshots (add before submission)
screenshots/home.png — Home page

screenshots/product-detail.png — Product detail

screenshots/dashboard.png — Inventory dashboard

screenshots/admin.png — Admin panel

🚀 Deployment
Deploy easily on Vercel:

bash
Copy code
vercel --prod
Set environment variables in Vercel dashboard:

MONGODB_URI

ADMIN_KEY

NEXT_PUBLIC_ADMIN_KEY

🧩 Bonus & Extras
✅ TypeScript support

✅ Tailwind dark theme

✅ ISR revalidation (60s)

✅ MongoDB + Mongoose

✅ Client-side search & filtering

🔒 Simple key-based admin auth

🖥️ Deployed on Vercel

📋 Challenges & Solutions
Challenge	Solution
Serializing Mongoose docs	Used .lean() and _id.toString()
next/image domain errors	Configured allowed domains in next.config.js
Link not clickable	Used pointer-events-none on overlays
Admin protection	Added ADMIN_KEY header validation
Data freshness	SSR/ISR based on page role

✅ Submission Checklist
 Home (SSG)

 Product Detail (ISR)

 Dashboard (SSR)

 Admin (CSR)

 MongoDB Integration

 API Endpoints (GET, POST, PUT)

 README Report

 Screenshots

 (Optional) Vercel Deployment

📧 Author: Surya Pratap Singh
GitHub: [your-github-profile-link]
Date: October 30, 2025