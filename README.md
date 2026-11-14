# ShowCase – Frontend Product Showcase Platform

> **Task: Free Web Development Internship – Data Alcott Systems – Task ID WD-SW-003 (Product Showcase Platform)**  
> **Author / Student:** Paras Mishra ([@parasmishra334](https://github.com/parasmishra334))  
> **Repository:** [https://github.com/parasmishra334/product-showcase-platform](https://github.com/parasmishra334/product-showcase-platform)  
> **Live Site Demo:** [https://parasmishra334.github.io/product-showcase-platform/](https://parasmishra334.github.io/product-showcase-platform/)  

---

## 📖 1. Project Overview

**ShowCase** is an enterprise-grade, responsive product catalog and showcase web platform crafted with semantic HTML5, modern CSS3, and vanilla JavaScript (ES6+). It enables modern hardware, electronics, fashion, smart living, and gaming manufacturers to exhibit their products through multi-image carousels, dynamic multi-faceted filters, side-by-side specification matrices, verified customer reviews, and interactive 360&deg; finish previews.

The entire application runs **client-side** without requiring any backend server, Node.js process, or SQL database. All catalog products, customer inquiries, verified reviews, wishlists, and comparison states persist seamlessly across browser sessions via `localStorage`.

---

## ✨ 2. Key Features

### 🏛️ Navigation & Mega-Menu
- **Sticky Blur Header:** Semi-transparent topbar with `backdrop-filter: blur(12px)`.
- **Dynamic Mega-Menu:** Multi-column dropdown under "Categories" showing all 6 parent categories (Electronics, Fashion, Books, Home & Living, Sports & Outdoors, Gaming) with their respective subcategories and icons.
- **Real-Time Badges:** Live count indicators for items currently saved in Wishlist and Comparison queue.
- **Mobile Drawer:** Smooth sliding hamburger navigation menu with full touch support.

### 🛍️ Product Catalog & Advanced Search
- **Instant Search:** Keyword search across titles, descriptions, brands, and tags with keyboard shortcut (`Ctrl + K`).
- **Multi-Faceted Sidebar Filters:**
  - Category radio selection with item count pills.
  - Brand checkboxes with item count pills.
  - Price range slider ($20 to $1,500) with live dollar readout.
  - Minimum star rating filters (4.5★+, 4.0★+, All).
  - Stock availability filters (🟢 In Stock, 🟡 Limited Stock, 🔴 Out of Stock).
- **Dual View Layout:** Instant toggle between Grid View and Horizontal List View.
- **Smart Sorting:** Sort by Featured first, Price (Low &rarr; High), Price (High &rarr; Low), Rating, and Name (A &rarr; Z).
- **Active Filter Chips:** Removable chips for every active filter with a one-click "Clear All" button.

### 🔍 Product Detail & Multi-Image Carousel
- **Breadcrumb Trail:** Seamless navigation hierarchy (`Home > Catalog > Category > Product`).
- **Interactive Carousel:** Previous/next controls, image thumbnail strip, and gradient placeholders.
- **Hardware Specifications:** Detailed key-value specifications table.
- **Verified Customer Reviews:** Average star score, star breakdown progress bars (5★ through 1★), and an interactive review submission form with 5 clickable stars.
- **Social Sharing:** Quick modal to copy product URL, share directly to WhatsApp, or post to X (Twitter).
- **Related Recommendations:** Contextual recommendations matching the active category.
- **Recently Viewed:** Automatically records viewed products and displays them on the Home and Detail pages.

### ⚖️ Side-by-Side Product Comparison
- Compare up to 3 products simultaneously in a responsive matrix table.
- Automatic highlighting of the **Lowest / Best Price** (green badge) and **Highest Rating** (purple crown badge).
- Compares image, title, brand, price, rating, stock status, bulleted highlights, and technical specifications.

### 🎨 Interactive 360&deg; Product Demo
- Real-time physical color and finish switcher (Cosmic Purple, Obsidian Titanium, Ocean Blue, Rose Gold, Emerald).
- Interactive 3D tilt animation and radial glow effect.
- Embedded video walkthrough player and feature callout chips.

### 🛡️ Administrator Control Deck
- Protected section accessible only to users with the `admin` role (`admin@showcase.com` / `admin123`).
- **Telemetry KPI Cards:** Displays total catalog products, categories, reviews, inquiries, and wishlist additions.
- **Catalog CRUD:** Modal form to Add, Edit, or Delete products with immediate live catalog updates.
- **Pure CSS Analytics:** Bar chart of products per category and top-rated leaderboard.
- **Inquiry Management:** Review customer inquiries and update status from Pending to Answered.
- **Review Moderation:** View and delete inappropriate reviews.
- **Export Capabilities:** One-click **Export to CSV** and print-ready **Catalog PDF Export** (`window.print()`).

### 🌓 Dark Mode & Accessibility
- Clean light mode and high-contrast dark mode with purple accents.
- Preference saved in `localStorage` and automatically restored.
- ARIA labels, semantic landmark tags, and keyboard-friendly focus rings.

---

## 🎨 3. Design System & Palette

| Token | Hex Value | Usage |
| :--- | :--- | :--- |
| **Primary Purple** | `#7C3AED` | Primary brand accent, primary buttons, active links |
| **Purple Hover** | `#6D28D9` | Button hover states, dark purple accents |
| **Light Purple** | `#EDE7FF` | Chip backgrounds, badge surfaces, subtle borders |
| **Surface (Light)** | `#FFFFFF` | Card backgrounds, modals, navbar in light mode |
| **Surface (Dark)** | `#111827` | Card backgrounds, modals, navbar in dark mode |
| **Body (Dark)** | `#0B0F19` | Main background in dark mode |
| **Typography** | `'Poppins'` & `'Inter'` | Modern, friendly, and clean sans-serif pairing |

---

## 📁 4. Folder Structure

```
product-showcase-platform/
├── index.html           # SPA shell with hash-based section containers
├── style.css            # Purple-accent design system, dark mode & responsive media queries
├── data.js              # Categories, brands, 17 products, reviews & localStorage layer
├── script.js            # Router, catalog filters, wishlist, compare, demo & admin logic
├── README.md            # Comprehensive project documentation
└── docs/
    ├── PROJECT_REPORT.md        # 2-Page internship project report (Word/PDF ready)
    ├── SUBMISSION_CHECKLIST.md  # Video and submission steps checklist
    └── screenshots/             # Application viewport captures
```

---

## 🚀 5. How to Run Locally

Because this project is built entirely with client-side web standards, **no server, build tool, or installation is required**:

1. Clone or download the repository:
   ```bash
   git clone https://github.com/parasmishra334/product-showcase-platform.git
   cd product-showcase-platform
   ```
2. Double-click **`index.html`** to open it directly in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).
3. Alternatively, if you prefer using a local development server:
   ```bash
   python -m http.server 8080
   # Open http://localhost:8080 in your browser
   ```

---

## 🔑 6. Demo Login Credentials

The platform includes simulated authentication with two pre-configured accounts (and 1-click quick login buttons on the `#login` page):

| Role | Email | Password | Access Privileges |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@showcase.com` | `admin123` | Full access to Admin Control Deck, Product CRUD, Reviews Moderation, Analytics, CSV/PDF Export |
| **Standard User** | `user@showcase.com` | `user123` | Wishlist, Comparison, Write Verified Reviews, Submit Product Inquiries |

---

## 📸 7. Application Screenshots Gallery

| Screen | Description |
| :--- | :--- |
| **Homepage** | Hero banner with floating badges, live telemetry metrics, categories strip, and featured gear |
| **Mega-Menu** | Multi-column dropdown under "Categories" displaying subcategories with icons |
| **Product Catalog** | Live search, price slider, brand & category filters, rating selector, and product cards |
| **List View** | Horizontal catalog layout for high-density reading |
| **Product Detail** | Multi-image carousel with thumbnails, technical specifications table, and verified reviews |
| **Comparison Matrix** | Side-by-side comparison table highlighting Lowest Price and Highest Rating |
| **Wishlist** | Saved items grid with live counter badges and empty-state handling |
| **Interactive 360 Demo** | Real-time physical color and finish switcher with embedded video walkthrough |
| **Admin Control Deck** | KPI metrics, product management table with modal CRUD, and pure CSS bar charts |
| **Mobile View (375px)** | Clean, responsive single-column layout with sliding hamburger navigation drawer |

---

## 💡 8. Key Learning Outcomes

1. **Vanilla Single-Page Applications:** Designed an efficient hash-based router (`window.location.hash`) handling dynamic parameters (`#product-detail?id=...`, `#catalog?category=...`).
2. **State Management & Persistence:** Handled normalized relational data in JavaScript arrays and persisted state using browser `localStorage`.
3. **Advanced CSS Grid & Flexbox:** Created complex layouts including mega-menus, side-by-side comparison tables, and analytics bar charts without third-party frameworks.
4. **Data Visualization with Pure CSS:** Developed proportional bar charts and leaderboard indicators without heavy external graphing dependencies.
5. **Robust Form Validation & XSS Prevention:** Implemented input sanitization (`escapeHtml`) and friendly error feedback.

---

## 📄 9. Project Deliverables & Submission Info

- **Internship:** Free Web Development Internship – Data Alcott Systems
- **Task ID:** WD-SW-003 (Product Showcase Platform)
- **Student Name:** Paras Mishra
- **GitHub Repository:** [https://github.com/parasmishra334/product-showcase-platform](https://github.com/parasmishra334/product-showcase-platform)
- **Live Demo Link:** [https://parasmishra334.github.io/product-showcase-platform/](https://parasmishra334.github.io/product-showcase-platform/)
- **Project Report:** See [`docs/PROJECT_REPORT.md`](docs/PROJECT_REPORT.md)
- **Submission Checklist:** See [`docs/SUBMISSION_CHECKLIST.md`](docs/SUBMISSION_CHECKLIST.md)
