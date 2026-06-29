# BloodBridge

> A high-performance MERN stack platform engineered to streamline blood donation workflows, coordinate volunteers, and connect donors with critical medical requests across Bangladesh.

---

## 🔗 Deployments & Credentials

* **Production Live Application:** `[Insert Frontend Live URL]`
* **Client GitHub Repository:** `[Insert Client GitHub URL]`
* **Server GitHub Repository:** `[Insert Server GitHub URL]`

### Evaluation Access
* **Admin Email:** `admin@gmail.com`
* **Admin Password:** `[admin@gmail.com]`

---

## 👥 Role-Based Access Control (RBAC)

BloodBridge implements a rigorous multi-tier privilege model enforced by JSON Web Token (JWT) verification. Application layouts, sidebars, and API routes dynamically adapt based on the authenticated user's role.

### 1. Donor (Default Role)
The foundational entry tier for all newly registered platform accounts.
* **Personal Dashboard:** Features a dynamic, personalized greeting and a tabular summary displaying up to 3 of their most recent self-created blood requests.
* **Request Lifecycle Control:** Grants autonomy over their listings. Once an active request transitions to `inprogress`, options unlock to update the state to either `done` or `canceled`.
* **Request Ledger:** Accesses a dedicated `/dashboard/my-donation-requests` panel featuring comprehensive client-side pagination and real-time status filtering.
* **Protected Profile:** Uses an inline form that remains read-only until an explicit edit trigger is toggled. Systemic identifiers like email addresses remain strictly immutable.

### 2. Volunteer
The platform's operational moderation layer.
* **Global Monitoring:** Authorizes full system-wide visibility over all submitted blood donation requests across the platform.
* **Queue Management:** Permitted exclusively to filter records and update operational progress statuses (`pending` ➔ `inprogress` ➔ `done` / `canceled`) to keep the data queue current.
* **Data Restrictions:** Strictly restricted from deleting entries, viewing institutional funding logs, or modifying user database roles.

### 3. Administrator
The highest execution tier with complete governance over the platform’s database, states, and finances.
* **Analytical Overview:** Accesses high-fidelity statistical metrics tracking Total Donors, System-Wide Requests, and Aggregated Micro-Funding values.
* **User Directory:** Manages a centralized administrative table of all registered accounts, filtered by account status (`active` / `blocked`).
* **Account Moderation:** Authorizes instant actions to switch user statuses (*Block/Unblock*) or mutate permissions (*Promote to Volunteer* / *Elevate to Admin*).
* **Global Override:** Retains absolute administrative rights to forcefully update details, modify parameters, or drop inaccurate entries with confirmation checkpoints across all listings.

---

## 🚀 Key Features

* **Targeted Geo-Searching:** An optimized search workspace leveraging standard **Bangladesh Geocode** datasets, enabling public guests to filter verified donors by precise Blood Group, District, and Upazila arrays without pre-loading clutter.
* **Stateful Private Routing:** Engineered to protect user context. Page reloads across any private dashboard navigation routes will never break active validation states or drop sessions back to the login terminal.
* **Micro-Funding Infrastructure:** An interactive `/funding` checkout interface backed entirely by the **Stripe API**, processing global card payments securely and outputting public transaction records.
* **Clean Layout Systems:** Built following crisp minimalist design practices—ensuring proper whitespace alignment, balanced typography scales, uniform card layouts, and robust fluid responsive grids across mobile, tablet, and desktop viewports.

---

## 🛠️ Tech Stack & Dependencies

### Client Architecture
* **React & Vite** — Next-generation frontend environment and development tooling.
* **Tailwind CSS** — Utility-first styling framework for clean layouts.
* **TanStack Query (@tanstack/react-query)** — Asynchronous server-state synchronization and network query caching.

* **Framer Motion / AOS** — Fluid layout transitions and interface motion design.

### Backend Infrastructure
* **Node.js & Express.js** — Fast, asynchronous REST API ecosystem.
* **MongoDB & Mongoose** — Document-oriented NoSQL storage using strict schema validation models.
* **jsonwebtoken (JWT)** — Stateless server-side session tracking and cryptographically signed authorization.
* **Stripe SDK** — Secured financial checkout transaction management.

---


