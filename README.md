# 🧠 SegmentIQ — Customer Segmentation Intelligence Platform

> End-to-end customer segmentation project using K-Means clustering (Python + scikit-learn) with a fully interactive analytics dashboard. Built for GitHub portfolio showcase.

![Customers](https://github.com/SriKrishna021/customer_seg_/blob/main/deshboard_1.png)
![Clusters](https://github.com/SriKrishna021/customer_seg_/blob/main/dashboard_2.png)
![Charts](https://github.com/SriKrishna021/customer_seg_/blob/main/dashboard_2%20(2).png)
![Python](https://github.com/SriKrishna021/customer_seg_/blob/main/dashboard_3%20(2).png)

---

## 🚀 Quick Start

### Option A — Just the Dashboard (no Python needed)
```bash
# Open index.html in any browser — zero setup required!
# Or serve locally:
python -m http.server 8000
# Visit: http://localhost:8000
```

### Option B — Run Full Python Clustering Pipeline
```bash
pip install pandas scikit-learn matplotlib seaborn
python python/segment.py
# Outputs: data/customers_segmented.csv + data/segmentation_report.png
```

---

## 📁 Project Structure

```
customer-segmentation/
├── index.html                    ← Interactive dashboard (standalone)
├── generate_data.js              ← Node.js script to regenerate dataset
├── README.md
├── data/
│   ├── customers.csv             ← 1100-row raw customer dataset
│   ├── customers_segmented.csv   ← Clustered output (from Python)
│   └── segmentation_report.png  ← Static chart report (from Python)
└── python/
    └── segment.py                ← Full K-Means pipeline + 8 charts
```

---

## 🎯 The 4 Customer Segments

| Segment | Icon | Profile | Strategy |
|---------|------|---------|----------|
| **Premium Loyalists** | 💎 | High income, selective buyers, low discount sensitivity | VIP programs, early access, luxury bundles |
| **Loyal Regulars** | 🌟 | Frequent purchasers, high satisfaction, consistent | Loyalty rewards, subscription perks |
| **Budget Seekers** | 🏷 | Price-sensitive, discount-driven, young demographic | Flash sales, coupon campaigns, value packs |
| **At-Risk Customers** | ⚠️ | Declining activity, long recency, low satisfaction | Win-back emails, personalized offers, surveys |

---

## 📊 Dashboard Features

### 7 Interactive Charts
| Chart | Type | Insight |
|-------|------|---------|
| Cluster Map | Bubble (PCA 2D) | Visual separation of segments in feature space |
| Segment Distribution | Doughnut | Proportional size of each segment |
| Spend / Income / AOV | Bar | Financial comparison across segments |
| Recency vs Frequency | Scatter | RFM positioning by segment |
| Channel Preferences | Grouped Bar | Where each segment shops |
| Discount vs Satisfaction | Scatter | Price sensitivity correlation |
| Category Preferences | Grouped Bar | Top product categories per segment |

### Filters & Slicers
- City, Gender, Occupation, Preferred Channel, Segment
- Click any **segment card** to instantly filter all charts & table
- Reset all with one click

### Data Table
- All 1,100 customers, fully searchable & sortable
- Paginated (20 rows/page)
- Export filtered view as CSV

---

## 🗃 Dataset Schema

**File:** `data/customers.csv` — **1,100 rows | 25 columns**

| Column | Type | Description |
|--------|------|-------------|
| Customer ID | String | CUST-00001 → CUST-01100 |
| Age | Integer | 18–75 |
| Gender | String | Male / Female / Other |
| City | String | 15 Indian cities |
| Education | String | High School → PhD |
| Occupation | String | 12 job types |
| Annual Income (₹) | Float | ₹10K – ₹5L |
| Join Date | Date | 2020–2023 |
| Total Spend (₹) | Float | Lifetime spend |
| Purchase Frequency | Integer | Purchases per year |
| Recency (days) | Integer | Days since last purchase |
| Avg Order Value (₹) | Float | Average transaction size |
| Satisfaction Score | Float | 1.0 – 5.0 |
| Online Purchase Ratio | Float | 0 (offline) → 1 (fully online) |
| Discount Sensitivity | Float | 0 (ignores discounts) → 1 (highly price-sensitive) |
| Loyalty Score | Integer | 0 – 1000 |
| Sessions per Month | Integer | App/website sessions |
| Cart Abandonment Rate | Float | 0 → 1 |
| Preferred Channel | String | Mobile App / Website / In-Store / … |
| Payment Method | String | UPI / Credit Card / Cash / … |
| Top Category 1 & 2 | String | Favourite product categories |
| Returns Count | Integer | Items returned |
| Referrals Made | Integer | Friends referred |
| Archetype | String | Ground truth label (for validation) |

---

## 🐍 Python Pipeline Details (`python/segment.py`)

```
1. Load data          → pandas read_csv
2. Feature selection  → 12 behavioral + demographic features
3. Standardize        → StandardScaler (zero mean, unit variance)
4. Find optimal K     → Elbow + Silhouette score sweep (K=2 to 9)
5. Cluster            → KMeans(n_clusters=4, n_init=10)
6. Label segments     → Sorted by Loyalty Score
7. PCA projection     → 2D visualization
8. Export             → customers_segmented.csv
9. Plot 8 charts      → segmentation_report.png
```

**Key Results:**
- Silhouette Score: **0.451** (good separation)
- Best K: **4 clusters**
- Algorithm: **K-Means (scikit-learn)**

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| Clustering | Python, scikit-learn KMeans |
| Data Processing | pandas, numpy |
| Static Charts | matplotlib, seaborn |
| Interactive Dashboard | Vanilla HTML/CSS/JS |
| Chart Library | Chart.js 4.4 |
| CSV Parsing | PapaParse 5.4 |
| Dataset Generation | Node.js |
| Fonts | Google Fonts (DM Sans + Playfair Display) |

---

## 🚀 Deploy on GitHub Pages

```bash
git init
git add .
git commit -m "feat: Customer Segmentation Dashboard"
git remote add origin https://github.com/YOUR_USERNAME/customer-segmentation.git
git push -u origin main

# Settings → Pages → main / root → Save
# Live at: https://YOUR_USERNAME.github.io/customer-segmentation
```

---

## 📈 Business Insights

From the clustering analysis:

- **Premium Loyalists** (≈25%): Highest AOV, low churn risk → invest in VIP retention
- **Loyal Regulars** (≈26%): Highest frequency → subscription model candidates
- **Budget Seekers** (≈25%): Most discount-responsive → time-limited deals work best
- **At-Risk Customers** (≈24%): High recency → re-engagement campaign is critical

---

## 📄 License

MIT — free to use, modify, distribute.

---

## 👨‍💻 Author

Customer Segmentation & Analytics Project — B.Tech CSE, 2024–2028 | Design Thinking & Innovation

⭐ **Star this repo if it helped you!**
