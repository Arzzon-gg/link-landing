# THE LINK - Project Handoff & Continuation Guide

**Project Name**: The Link - Forever Young  
**Repository**: CyberWeavers/Arrzon/link-prelaunch-form  
**Status**: Production-Ready (Build: `npm run build` ✓ Zero Errors)  
**Last Updated**: June 11, 2026

---

## 📋 Project Overview

**The Link** is a neon arcade entertainment venue landing page + registration/pre-launch form application. The design aesthetic is **Neon Arcade Cyberpunk** — dark, moody, high-contrast with vibrant neon gradients (pink, cyan, violet, green).

### Core Features
- **Landing Page** (`/`): 7 hero sections showcasing the venue (Hero, Features, Food, Offers, etc.)
- **Registration Form** (`/register`): Multi-step form with validation, phone field, country select, Google Sheets integration
- **API Integration**: Form submission → Google Sheets (backend: `src/app/api/submit/route.ts`)
- **Mobile Responsive**: Fully responsive design (2-column on mobile, full-width on desktop)
- **Dark Theme Only**: Single theme (no light mode)

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 15.3.1 (App Router, React 19) |
| **Styling** | Tailwind CSS 3.4.17 + custom CSS |
| **Forms** | React Hook Form + Zod validation |
| **Animation** | Framer Motion 11.11.0 |
| **Google Integration** | googleapis 144.0.0 + google-auth-library 10.6.2 |
| **UI Icons** | Lucide React 0.469.0 (inline SVGs) |
| **Type Safety** | TypeScript (strict) |
| **Fonts** | Google Fonts (Inter + Orbitron) loaded as CSS variables |

### Key Dependencies
```json
{
  "@hookform/resolvers": "^3.9.0",
  "clsx": "^2.1.1",
  "framer-motion": "^11.11.0",
  "google-auth-library": "^10.6.2",
  "googleapis": "^144.0.0",
  "react-hook-form": "^7.54.0",
  "react": "^19.0.0",
  "tailwind-merge": "^2.5.5",
  "zod": "^3.24.0"
}
```

**Critical Note**: `google-auth-library` is a peer dependency of `googleapis` and **must be installed explicitly**. If the build fails with "Module not found: Can't resolve 'google-auth-library'", run:
```bash
npm install google-auth-library
```

---

## 🎨 Design System

### Color Palette

| Semantic | Hex | Usage |
|----------|-----|-------|
| **Dark BG** | `#020209`, `#07070e`, `#08080f` | Page background, cards |
| **Violet (Primary)** | `#8b5cf6` | Accents, shadows, grid overlay |
| **Cyan (Accent 1)** | `#06b6d4` | Gradients, neon borders |
| **Pink (Accent 2)** | `#ec4899` | CTAs, hover states, shadows |
| **Neon Green** | `#39ff14` | Hero "IT'S A VIBE" gradient, highlights |
| **White (Text)** | `#ffffff` | Main text (opacity varies: 100%, 60%, 40%, 35%) |

### Fonts

Both fonts are **loaded as CSS variables** in `src/app/layout.tsx`:

| Font | Use Case | CSS Variable |
|------|----------|--------------|
| **Inter** | Body text, descriptions | `--font-inter` |
| **Orbitron** | Headlines, buttons, all-caps text | `--font-orbitron` |

**Tailwind Config**:
```ts
fontFamily: {
  sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
  orbitron: ['var(--font-orbitron)', 'sans-serif'],
}
```

### Custom CSS Classes

Located in `src/app/globals.css`:

| Class | Purpose |
|-------|---------|
| `.arcade-grid` | Animated violet grid background (8s scroll loop) |
| `.gradient-text` | Violet → Cyan gradient text effect |
| `.logo-button-text` | Orbitron uppercase with letter-spacing |
| `.plasma-frame` | (Legacy — not actively used, can be removed) |

### Responsive Breakpoints

Tailwind defaults:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px

**Design Pattern**:
- **Mobile (< 640px)**: 2-column grids, stacked text, smaller font sizes
- **Tablet (640px - 1023px)**: 3-column grids, medium text
- **Desktop (≥ 1024px)**: Full-width layouts, 5-6 column grids, large text

---

## 📁 Project Structure

```
link-prelaunch-form/
├── public/
│   └── images/
│       ├── hero.png                 (Full-bleed hero background)
│       ├── bowling.png              (Features: Bowling activity)
│       ├── 8 ball pool.png          (URL-encoded: 8%20ball%20pool.png)
│       ├── karaoke.png              (Features: Karaoke)
│       ├── arcade.png               (Features: Arcade)
│       ├── birthday.png             (Features: Birthday parties)
│       ├── playground.png           (Features: Playground — NEW)
│       ├── burger.png               (CallToAction: Secret Teta)
│       ├── fresh & healthy.png      (CallToAction: Fresh & Healthy — URL: fresh%20%26%20healthy.png)
│       ├── offer_bg.png             (Offers section background)
│       └── ZlinkLogo.png            (Brand logo)
│
├── src/
│   ├── app/
│   │   ├── layout.tsx               (Root layout + Google Fonts setup)
│   │   ├── page.tsx                 (Landing page — all 7 sections)
│   │   ├── globals.css              (Global styles + custom classes)
│   │   ├── api/
│   │   │   └── submit/
│   │   │       └── route.ts         (Form submission → Google Sheets)
│   │   └── register/
│   │       └── page.tsx             (Registration form page)
│   │
│   ├── components/
│   │   ├── ArcadeBackground.tsx     (Dark grid background effect)
│   │   ├── RegistrationForm.tsx     (Multi-step form component — Client)
│   │   ├── FormField.tsx            (Form input wrapper component)
│   │   ├── PhoneField.tsx           (International phone input)
│   │   ├── SuccessScreen.tsx        (Post-submission success message)
│   │   └── landing/
│   │       ├── Navbar.tsx           (Sticky header with mobile drawer — Client)
│   │       ├── Hero.tsx             (Full-bleed hero section)
│   │       ├── Features.tsx         (6 activity cards: Bowling, 8Ball, Karaoke, Arcade, Birthday, Playground)
│   │       ├── CallToAction.tsx     (Food cards: Secret Teta, Fresh & Healthy)
│   │       ├── FeaturesBar.tsx      (5-item trust bar with SVG icons)
│   │       ├── Offers.tsx           (Rounded card section with offer_bg.png background)
│   │       ├── Footer.tsx           (5-column footer — Server)
│   │       └── NewsletterForm.tsx   (Newsletter subscribe — Client)
│   │
│   ├── lib/
│   │   ├── sheets.ts                (Google Sheets API handler)
│   │   ├── rate-limit.ts            (Simple in-memory rate limiter)
│   │   ├── utils.ts                 (Utility functions)
│   │   └── validation.ts            (Zod schemas for form validation)
│   │
│   ├── types/
│   │   └── form.ts                  (TypeScript interfaces for form data)
│   │
│   ├── data/
│   │   └── countryCodes.ts          (List of country codes + dialing codes)
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── package.json
```

---

## 🏗 Landing Page Structure (7 Sections)

### 1. **Navbar** (`<Navbar />`)
- Fixed sticky header
- Logo + Navigation links
- "BOOK NOW" CTA button (pink rounded-full)
- Mobile hamburger menu (Client Component)
- Scroll detection for border styling

### 2. **Hero** (`<Hero />`)
- Full-viewport height (`min-h-screen`)
- Background: `hero.png` (full-bleed `<Image fill>`)
- Dark gradient overlay (responsive: `from-[#020209]/90 via-[#020209]/55 lg:via-[#020209]/30 to-transparent`)
- Left-aligned text: "MORE THAN A PLACE." + "IT'S A VIBE." (neon green→cyan→blue gradient)
- 4 SVG badges (Users, Fork+Knife, Gamepad, Star) with uppercase labels
- Two CTAs: "BOOK NOW" (pink) + "WATCH VIDEO" (transparent)

### 3. **Features** (`<Features />`)
- Title: "ENDLESS WAYS TO HAVE FUN" (green accent line dividers)
- 6-column grid on large screens (2-col mobile, 3-col tablet)
- Activity cards (each with unique neon glow color):
  1. **BOWLING** — bowling.png | Violet glow `#7c3aed`
  2. **8 BALL POOL** — 8%20ball%20pool.png | Cyan glow `#0891b2`
  3. **KARAOKE** — karaoke.png | Pink glow `#be185d`
  4. **ARCADE** — arcade.png | Fuchsia glow `#a21caf`
  5. **BIRTHDAYS** — birthday.png | Amber glow `#d97706`
  6. **PLAYGROUND** — playground.png | Green glow `#16a34a` ← NEW
- Card structure: Image area (h-48) + Text area (title + subtitle)
- Hover: `scale-105` image zoom + colored border glow + shadow
- CTA: "VIEW ALL ACTIVITIES"

### 4. **CallToAction (Food)** (`<CallToAction />`)
- 2-column grid on large screens
- Two food cards:
  1. **SECRET TETA** — burger.png | Pink accent | "DISCOVER THE MENU" button
  2. **FRESH & HEALTHY** — fresh%20%26%20healthy.png | Green accent | "EXPLORE HEALTHY" button
- Card structure: Left text (flex-1) + Right image (w-[46%])
- Image area: Gradient overlays + radial glow + `<Image fill object-cover>`

### 5. **FeaturesBar** (`<FeaturesBar />`)
- 5-column grid (2-col mobile, 3-col tablet, 5-col desktop)
- Trust bar items with inline SVG icons:
  - 🛡️ → Shield SVG | "SAFE & CLEAN"
  - 📅 → Calendar SVG | "EASY BOOKING"
  - 👥 → Users SVG | "GROUPS & PARTIES"
  - ⭐ → Star SVG | "BEST EXPERIENCES"
  - 👨‍👩‍👧 → Home SVG | "FAMILY FRIENDLY"

### 6. **Offers** (`<Offers />`)
- Rounded card (rounded-2xl) with border
- Background: offer_bg.png (`<Image fill object-cover>`)
- Dark overlay (55% opacity) + left-edge gradient fade
- Content: 3-column grid
  - Left: "WEEKDAY DEALS" + "20% OFF" (pink gradient text)
  - Center: Neon % badge (border circle with glow)
  - Right: "MORE GAMES. MORE FLAVORS. MORE MEMORIES." + "SEE OFFERS" button

### 7. **Footer** (`<Footer />` + `<NewsletterForm />`)
- 5-column footer grid (2-col mobile, responsive on tablet)
- Columns:
  1. Brand + Social links
  2. Quick links (Home, Activities, Food, Contact)
  3. Useful Info (FAQ, Privacy, Terms)
  4. Contact (Phone, Email, Address)
  5. Newsletter subscribe (Client Component with form)

---

## 🔄 Server vs Client Components

### Server Components (Default)
- `layout.tsx` — Root layout with fonts
- `page.tsx` (landing) — Wires all sections
- `Navbar.tsx` — ⚠️ **NOW CLIENT** (has scroll detection + hover state)
- `Hero.tsx` — Server
- `Features.tsx` — Server
- `CallToAction.tsx` — Server
- `FeaturesBar.tsx` — Server
- `Offers.tsx` — Server
- `Footer.tsx` — Server

### Client Components (`'use client'`)
- `Navbar.tsx` — Scroll detection, mobile menu state
- `RegistrationForm.tsx` — Form state, field interactions
- `FormField.tsx` — Input component with validation feedback
- `PhoneField.tsx` — Phone input with country select
- `SuccessScreen.tsx` — Success message animation
- `NewsletterForm.tsx` — Subscribe form state (extracted from Footer)

---

## 📦 Key Components Deep Dive

### Hero.tsx
```tsx
// Structure:
// <section min-h-screen pt-16>
//   <Image fill object-cover hero.png>
//   <div overlay gradients (responsive opacity)>
//   <div content max-w-[540px] left-aligned>
//     <h1>MORE THAN A PLACE.</h1>
//     <h1 gradient-text>IT'S A VIBE.</h1>
//     <div badges (SVG icons + labels)>
//     <div CTAs (BOOK NOW + WATCH VIDEO)>
```

**Key Classes**:
- `min-h-screen pt-16` — Full viewport with navbar offset
- `from-[#020209]/90 via-[#020209]/55 lg:via-[#020209]/30 to-transparent` — Responsive gradient overlay
- `bg-gradient-to-r from-[#39ff14] via-cyan-400 to-blue-400 bg-clip-text text-transparent` — "IT'S A VIBE" neon gradient

### Features.tsx
```tsx
// Structure:
// <section>
//   <div title "ENDLESS WAYS">
//   <div grid lg:grid-cols-6>
//     {activities.map(card with <Image>)}
//   <div CTA button>
```

**Card Structure**:
```tsx
<div className="group rounded-xl border">
  <div className="relative h-48">
    {/* Radial glow (color-specific) */}
    <Image fill object-cover group-hover:scale-105>
    {/* Bottom fade + top vignette */}
  </div>
  <div className="text-center">
    <h3>{title}</h3>
    <p>{subtitle}</p>
  </div>
</div>
```

**Neon Glow Color Mapping**:
```ts
const activities = [
  { title: 'BOWLING', glowHex: '#7c3aed', imgBg: 'bg-[#0d0020]' },
  { title: '8 BALL POOL', glowHex: '#0891b2', imgBg: 'bg-[#000e1a]' },
  { title: 'KARAOKE', glowHex: '#be185d', imgBg: 'bg-[#1a000d]' },
  { title: 'ARCADE', glowHex: '#a21caf', imgBg: 'bg-[#0a0020]' },
  { title: 'BIRTHDAYS', glowHex: '#d97706', imgBg: 'bg-[#0d0600]' },
  { title: 'PLAYGROUND', glowHex: '#16a34a', imgBg: 'bg-[#001a08]' },
];
```

### Offers.tsx
```tsx
// Structure:
// <section py-10 px-4>
//   <div max-w-7xl>
//     <div rounded-2xl border overflow-hidden>
//       <Image fill offer_bg.png>
//       <div overlays (dark + fade)>
//       <div content z-10 grid md:grid-cols-3>
//         {left} {center badge} {right}
```

**Critical**: The card is **contained** (rounded-2xl), not full-width. The image fills the card, not the viewport.

### RegistrationForm.tsx
```tsx
// Multi-step form:
// Step 1: Name, Email
// Step 2: Phone (with country code picker)
// Step 3: Age confirmation
// Step 4: Confirmation + Submit
```

**Uses**:
- `React Hook Form` for state management
- `Zod` for validation (schema in `src/lib/validation.ts`)
- `Framer Motion` for step transitions
- `PhoneField.tsx` for international phone input

### API: /api/submit/route.ts
```ts
export async function POST(req: Request) {
  // 1. Parse request body
  // 2. Validate with Zod schema
  // 3. Rate limit check (Redis or in-memory)
  // 4. Append to Google Sheets via googleapis
  // 5. Return { success: true } or error
}
```

**Environment Variables Required**:
- `GOOGLE_SHEETS_ID` — Spreadsheet ID
- `GOOGLE_CLIENT_EMAIL` — Service account email
- `GOOGLE_PRIVATE_KEY` — Service account private key (base64 encoded recommended)

---

## 🎬 How to Continue Development

### Setup
```bash
# Install dependencies
npm install

# Important: If build fails with "google-auth-library" error, run:
npm install google-auth-library

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Common Tasks

#### Adding a New Activity Card to Features
1. Add image to `public/images/`
2. Add object to `activities` array in `src/components/landing/Features.tsx`:
```ts
{
  imgSrc: '/images/new-activity.png',
  title: 'NEW ACTIVITY',
  subtitle: 'Catchy tagline.',
  glowHex: '#color-hex',
  imgBg: 'bg-[#dark-shade]',
  borderHover: 'hover:border-color-400/55',
  shadowHover: 'hover:shadow-[0_8px_40px_-4px_rgba(r,g,b,0.4)]',
}
```
3. Update grid layout if needed (currently `lg:grid-cols-6`)

#### Updating Colors
- **Primary colors**: Update `src/app/globals.css` CSS variables
- **Tailwind overrides**: Update `tailwind.config.ts` if adding new colors
- **Gradients**: Use inline `className` or `style` prop with hex values

#### Modifying Copy/Text
- **Landing**: Edit sections in `src/app/page.tsx` and component files
- **Form**: Edit `RegistrationForm.tsx` labels and validation messages
- **Footer**: Edit `Footer.tsx` and `src/data/` files

#### Adding Google Sheets Integration
The API already integrates with Google Sheets. To set up:
1. Create Google Cloud project
2. Create service account with Sheets API enabled
3. Set environment variables (see `.env.example` or ask DevOps)
4. Ensure the sheet has columns matching form fields

#### Responsive Design Adjustments
- **Mobile**: Use `sm:` breakpoint (640px)
- **Tablet**: Use `md:` breakpoint (768px)
- **Desktop**: Use `lg:` breakpoint (1024px)
- **Large desktop**: Use `xl:` breakpoint (1280px)

Example responsive grid:
```tsx
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
```

---

## 🚀 Production Deployment Checklist

- [x] Build passes: `npm run build` — ✓ Zero errors
- [x] All images optimized and in `public/images/`
- [x] Environment variables set (Google Sheets API)
- [x] Fonts loaded (Inter + Orbitron via Google Fonts)
- [x] Mobile responsive tested
- [x] Form validation working
- [x] API submission tested
- [x] Dark theme only (no light mode)
- [ ] SEO metadata updated (edit `layout.tsx` `metadata`)
- [ ] Analytics tracking added (if needed)
- [ ] Performance: Lighthouse score > 90

---

## 📝 Important Notes for Continuers

### 1. **Image Paths with Spaces**
Files like `8 ball pool.png` must be URL-encoded as `8%20ball%20pool.png` when used in `<Image src>`.

### 2. **Server vs Client Boundary**
Event handlers (onClick, scroll listeners) require `'use client'`. If a component uses hooks like `useState`, `useEffect`, or `useCallback`, it must be a Client Component.

### 3. **Neon Glow Colors**
Each card type has a unique glow color. Keep this consistent:
- Violet/Purple: #7c3aed
- Cyan/Blue: #0891b2
- Pink: #be185d, #ec4899, #dd2590
- Green: #16a34a, #39ff14
- Amber/Orange: #d97706

### 4. **Gradient Overlays**
Always layer overlays properly:
1. Background image (`fill`)
2. Dark overlay (`absolute inset-0 bg-[color]/opacity`)
3. Edge fades or vignettes
4. Content (`z-10` relative positioning)

### 5. **Form Validation**
All form validation schemas are in `src/lib/validation.ts`. Update Zod schemas if adding new form fields.

### 6. **Google Sheets API**
The rate limiter in `src/lib/rate-limit.ts` is in-memory. For production with multiple instances, replace with Redis.

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails: "google-auth-library not found" | `npm install google-auth-library` |
| Images not showing | Check `public/images/` path, use URL encoding for spaces |
| Form not submitting | Check Google Sheets env vars, check rate limiter |
| Fonts not loading | Verify `src/app/layout.tsx` has Google Fonts import |
| Responsive layout broken | Check Tailwind breakpoint syntax (sm:, md:, lg:) |
| Color not matching design | Verify hex codes in component `className` and `style` props |

---

## 📞 Contact & Questions

For questions about:
- **Design**: Refer to this document's Design System section
- **Implementation**: Check component files + inline comments
- **API**: See `src/app/api/submit/route.ts` and `src/lib/sheets.ts`
- **Form Validation**: Check `src/lib/validation.ts`

---

**Ready to continue? Pick any task above and start. Good luck! 🚀**
