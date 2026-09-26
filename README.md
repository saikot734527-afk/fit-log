# 🏋️ FitLog — Train With Intent. Log Every Set.

> **FitLog** is a dark, no-nonsense gym companion and workout library application designed to help fitness enthusiasts track daily exercises, lock in today's lifts, and monitor training metrics.

---

## ⚡ Key Features (5+)

1. **🔝 Interactive Navbar & Dynamic Status Badges**:
   - Real-time filled accent badge for **Today's Plan** (`#ccff00`) and outlined badge for **Saved Lifts**.
   - Displays live counters synced across all pages.

2. **🏋️ Comprehensive 3x4 Workout Library**:
   - Fetches exercise data dynamically from the Fitlog Cloudflare API.
   - Shows thumbnail illustrations, category pills, equipment lines, duration (min), calories burned (kcal), and community star ratings.

3. **📊 Live Metrics Summary & 5-Lift Daily Cap**:
   - The **My Plan** page computes real-time aggregates for total exercises, duration minutes, and total calorie expenditure.
   - Enforces a strict 5-lift cap per day to promote intent-focused training.

4. **⚡ Complete Workout Detail Page & CTA Actions**:
   - Two-column responsive layout with high-resolution visual previews, key specs table (equipment, difficulty, sets, reps, duration, calories, rating), and numbered step-by-step instructions.
   - Instant "Add to today's plan" and "Save for later" actions with interactive state feedback.

5. **🔍 Interactive Sorting, Filtering & Local Storage Persistence**:
   - Sort workout library by **Duration**, **Calories**, or **Rating**.
   - Search lifts by name or muscle group tag.
   - All plan items, completion statuses ("Mark as Done"), and saved exercises survive browser reloads via `localStorage`.

6. **📱 Fully Responsive & Custom 404 Page**:
   - Mobile, tablet, and desktop optimized grid and navigation layouts.
   - Custom styled 404 page for unknown routes.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Library**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, Google Fonts (Oswald & Inter)
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **API**: Cloudflare Workers JSON REST API (`https://api.abcz.workers.dev/api/fitlog`)

---

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/saikot734527-afk/fit-log.git
   cd fit-log
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser.

---

## 📝 License

Designed & built for FitLog Assignment. Train hard, log honest.
