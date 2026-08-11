# RedFlint Client

Premium menswear e-commerce frontend for RedFlint, built with React, Vite, Firebase Authentication, Tailwind CSS and DaisyUI.

## Features

### Storefront
- Responsive home page and navigation
- Product listing, search and sorting
- Featured and Special Edition collections
- Product details, gallery, size selection and per-size stock display
- Guest cart using localStorage
- Registered-user cart stored through the backend
- Buy Now and normal cart checkout
- Manual bKash, Nagad and Rocket payment workflow
- Public order tracking using order number + checkout phone number
- Global WhatsApp support and order-specific WhatsApp support
- Public customer review submission
- Approved review display on product pages
- Continuously moving, draggable/swipeable customer review carousel on Home

### Authentication
- Firebase email/password registration and login
- Google sign-in
- Firebase password-reset email
- Firebase ID token exchanged for a backend-verified HttpOnly JWT session
- Customer and Admin protected routes

### Customer Dashboard
- Overview and order-value statistics
- Orders using customer-facing `RF-...` order numbers
- Protected order details
- Wishlist
- Address Book with one deterministic default address
- Account information and profile editing

### Admin Dashboard
- Product create/edit/delete
- Per-size inventory management
- Order/payment management
- Customer role/block management
- Review moderation with All / Pending / Approved / Rejected filters
- Store settings: shipping, free-shipping threshold, WhatsApp/support details and Maintenance Mode

### Maintenance Mode
When Maintenance Mode is enabled, customer-facing pages and the Customer Dashboard display the maintenance screen. The login page remains available so an administrator can sign in, and the Admin Dashboard remains usable. The backend independently rejects new order creation while maintenance is active.

## Tech Stack

- React 19
- Vite 8
- React Router 7
- Firebase Authentication
- Axios
- Tailwind CSS 4
- DaisyUI 5
- Swiper
- React Hot Toast
- React Icons
- Lucide React
- Vitest + Testing Library

## Local Setup

```bash
git clone https://github.com/Taoshif1/RedFlint-client.git
cd RedFlint-client
npm install
```

Create `.env` from `.env.example`, then run:

```bash
npm run dev
```

The default Vite development URL is normally `http://localhost:5173`.

## Environment Variables

```env
VITE_API_URL=http://localhost:3000

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

VITE_IMGBB_API_KEY=
```

`VITE_API_URL` must be the backend origin **without** `/api`. The Axios instance appends `/api` itself.

> Vite exposes `VITE_*` variables to browser code. Do not place private server credentials, MongoDB passwords or JWT secrets in client environment variables.

## Authentication Flow

```text
Firebase sign in/register
        ↓
Firebase ID token
        ↓
POST /api/auth/jwt
        ↓
Backend verifies Firebase identity
        ↓
RedFlint JWT stored in HttpOnly cookie
        ↓
Protected API requests use the cookie
```

The browser never chooses its own MongoDB role. User identity and role enforcement are handled server-side.

## Inventory / Checkout Flow

The browser shows current stock, but the backend is the final authority. Checkout can fail if another customer purchases the final unit first. The backend performs atomic inventory reservation inside a MongoDB transaction so concurrent checkouts cannot both purchase the same final stock.

A cancelled order restores its reserved inventory on the backend.

## Reviews

Reviews are intentionally simple:

```text
Name + 1–5 stars + comment
        ↓
Pending
        ↓
Admin approves / rejects
        ↓
Approved reviews become public
```

Reviews are not labeled as verified-purchase reviews.

## Main Routes

### Public
- `/`
- `/products`
- `/products/:id`
- `/special-edition`
- `/checkout`
- `/track-order`
- `/login`
- `/register`
- `/about`
- `/delivery`
- `/return`
- `/motto`
- `/contact`

### Customer
- `/dashboard`
- `/dashboard/recent-orders`
- `/dashboard/orders/:id`
- `/dashboard/wishlist`
- `/dashboard/address-book`
- `/dashboard/account`

### Admin
- `/admin`
- `/admin/orders`
- `/admin/products`
- `/admin/products/add`
- `/admin/products/:id`
- `/admin/products/:id/edit`
- `/admin/customers`
- `/admin/reviews`
- `/admin/settings`
- `/admin/profile`

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm test
npm run coverage
```

## Production Build

```bash
npm run build
```

Vercel SPA routing is configured through `vercel.json`, which rewrites application routes to `index.html` so direct URL refreshes work with React Router.

## Deployment Checklist

Before production deployment:

1. Configure all client environment variables in Vercel.
2. Set `VITE_API_URL` to the production backend origin.
3. Add the production frontend hostname to Firebase Authentication Authorized Domains.
4. Confirm the backend CORS `LIVE_CLIENT_URL` exactly matches the frontend origin.
5. Redeploy after changing Vite environment variables because they are injected at build time.
6. Test email login, Google login, password reset, cart, checkout, tracking, customer dashboard and Admin Dashboard on the live domain.

## Project Structure

```text
src/
├── assets/
├── components/
│   ├── dashboard/
│   │   ├── admin/
│   │   └── customer/
│   ├── product/
│   └── shared/
├── context/
├── firebase/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── test/
└── utils/
```

## Backend

The API is maintained separately in:

`Taoshif1/RedFlint-server`

## Notes

- Product inventory uses `{ size, stock }` objects. Legacy product size data is normalized by the UI and migrates naturally when edited/saved.
- Product prices and stock are re-read and validated by the backend during checkout.
- Payment transaction IDs are not trusted from client state beyond the submitted identifier; duplicate protection is enforced on the backend.

## Developers

- Taoshif
- Taufiqur
- Pias

Developed as the RedFlint e-commerce project.