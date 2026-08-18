<div align="center">

# ✅ ToDo List — Deadlines & Live Countdowns

**A clean, deadline-driven To-Do List app built with pure vanilla JavaScript** ⚡

Third Project for the **IEEE Computer Society (Zagazig) 2025 Front-End Track** 🎓

🌐 **[Live Demo](https://ieee-cs-25-frontend-third-project-t.vercel.app/)**

[![GitHub](https://img.shields.io/badge/GitHub-omniyanasser-181717?logo=github)](https://github.com/omniyanasser)

</div>

---

Add tasks with a deadline, watch a **live countdown** tick down for each one, and manage everything with friendly confirmation dialogs — all persisted in your browser with `localStorage`. No frameworks, no build step, no dependencies to install. 🚀

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| 🌐 Markup | HTML5 |
| 🎨 Styling | CSS3 (custom green theme) + [Chewy](https://fonts.google.com/specimen/Chewy) Google Font |
| ⚡ Logic | Vanilla JavaScript (ES6) — zero frameworks |
| 🔔 Dialogs | [SweetAlert2 v11](https://sweetalert2.github.io) (via CDN) |
| 💾 Storage | Browser `localStorage` |
| 🚀 Hosting | [Vercel](https://vercel.com) (static site) |

---

## ✨ Key Features

- ➕ **Add tasks with deadlines** — title + `datetime-local` picker, with validation that blocks empty tasks, missing deadlines, and past dates
- ⏳ **Live countdown badges** — every task shows `"N days left"`, `"Today!"`, or `"Expired"`, auto-refreshing every minute
- 📅 **Auto-sorted by deadline** — the most urgent tasks always rise to the top
- ✏️ **Edit tasks** — confirmation dialog loads the task back into the form for updating
- 🗑️ **Delete tasks** — "Are you sure?" confirmation before anything is removed
- ✔️ **Mark as done** — strikethrough styling + green checkmark, with a guard against re-completing
- 💾 **localStorage persistence** — your tasks survive page refreshes and browser restarts
- 🍬 **SweetAlert2 everywhere** — polished success, warning, and confirmation popups for every action
- 📱 **Responsive two-panel layout** — welcome panel + task card container

---

## ⚙️ Installation & Setup

### 📋 Prerequisites

- Any modern web browser 🌐 (internet connection needed for the SweetAlert2 CDN and Google Fonts)

### 🚀 Getting Started

**1. Clone the repository**

```bash
git clone https://github.com/omniyanasser/IEEE-CS-25-Frontend-ThirdProject-public.git
cd IEEE-CS-25-Frontend-ThirdProject-public
```

**2. Open the app** — no build step required! 🎉

```bash
# Just open it directly
start index.html          # Windows
open index.html           # macOS

# ...or serve it locally
npx serve .
# or use the VS Code "Live Server" extension
```

---

## 📁 Project Structure

```
├── index.html      # 📄 Markup — form, task list, two-panel layout
├── main.js         # ⚡ All app logic — add/edit/delete/done, countdowns, localStorage
├── style.css       # 🎨 Styling — green theme, task cards
├── *.svg / *.png   # 🖼️ Icons (edit, delete, done) + logo
└── memes.gif       # 😄 Decorative welcome panel animation
```

### 🧠 How It Works

Tasks are stored as JSON in `localStorage` under the key `"task"`:

```js
{
  id: Date.now(),
  myTitle: "Finish IEEE task",
  createdAt: "8/19/2026",
  deadline: "2026-08-25T18:00",
  completed: false
}
```

On every render the list is re-sorted by deadline, and a `setInterval` updates each countdown badge every 60 seconds. ⏱️

---

<div align="center">

**Omniya Nasser** — IEEE Computer Society, Zagazig Student Branch 🎓

[GitHub](https://github.com/omniyanasser) · [LinkedIn](https://www.linkedin.com/in/omniya-nasser-060584248)

Made with 💚 and vanilla JavaScript

</div>
