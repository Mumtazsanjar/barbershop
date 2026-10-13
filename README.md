# The Gentlemen's Club — Premium Barbershop Demo

> **Portfolio demo project.** This is a fictional barbershop website built to showcase frontend development skills to potential clients. All business names, staff profiles, pricing, testimonials, and contact details are invented for demonstration purposes only.

---

## Project Overview

A fully responsive, premium-quality barbershop website built with:

- **HTML5** — semantic markup, ARIA roles, accessible heading hierarchy
- **CSS3** — custom properties design system, CSS Grid, Flexbox, smooth animations
- **Vanilla JavaScript** — no frameworks, no build step required
- **Unsplash** — high-quality demo photography (free for commercial use with attribution)

Deployable directly on **Vercel** via Git integration — no build command, no backend.

---

## Local Preview

No build step or server required for basic viewing. Open `index.html` directly in your browser, or use a local dev server for the best experience (avoids CORS issues with fonts):

### Option A — VS Code Live Server

1. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Right-click `index.html` → **Open with Live Server**

### Option B — Node.js (npx serve)

```bash
npx serve .
```

Then open `http://localhost:3000` in your browser.

### Option C — Python

```bash
# Python 3
python -m http.server 8080
```

Then open `http://localhost:8080`.

---

## Project Structure

```
/
├── index.html          # Main page — all sections
├── css/
│   └── style.css       # Complete design system & all styles
├── js/
│   └── main.js         # Navigation, animations, lazy loading
├── assets/
│   ├── images/         # Drop replacement images here
│   └── icons/          # Optional local icon files
├── favicon.svg         # TGC monogram favicon
├── robots.txt          # Search engine directives
└── README.md           # This file
```

---

## Replacing Demo Content

Before deploying for a real client, replace the following placeholder content:

### 1. Contact Details

Search for these strings in `index.html` and replace them:

| Placeholder | Replace with |
|---|---|
| `(312) 555-0100` | Real phone number |
| `+13125550100` | Real phone in E.164 format |
| `hello@your-domain.com` | Real email address |
| `123 N State Street` | Real street address |
| `Chicago, IL 60601` | Real city/state/zip |

### 2. Business Hours

Find the `<table class="hours-table">` block in `index.html` and update the days and times to match the real schedule.

### 3. Map Embed

Find the `<div class="map-placeholder">` block and replace it with a Google Maps embed:

1. Go to [maps.google.com](https://maps.google.com)
2. Search for the business address
3. Click **Share** → **Embed a map** → copy the `<iframe>` code
4. Replace the entire `<div class="map-placeholder">...</div>` with:

```html
<div style="border-radius: 12px; overflow: hidden; height: 420px;">
  <iframe
    src="YOUR_GOOGLE_MAPS_EMBED_URL"
    width="100%"
    height="100%"
    style="border:0;"
    allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
    title="The Gentlemen's Club location map"
  ></iframe>
</div>
```

### 4. Images

All images currently load from Unsplash CDN URLs. To use local images:

1. Add image files to `assets/images/`
2. In `index.html`, replace `data-src="https://images.unsplash.com/..."` with `data-src="/assets/images/your-image.jpg"`
3. Update the `alt` attribute to describe the actual image

Recommended image sizes:
- Hero background: 1920×1080px minimum
- Barber portraits: 600×800px (portrait orientation)
- Gallery images: 800×600px or 600×800px
- About section: 800×1000px (main), 400×400px (accent)

### 5. Barber Profiles

In `index.html`, find the three `<article class="barber-card">` blocks and update:
- `<h3 class="barber-name">` — real name
- `<p class="barber-title">` — real title
- `<p class="barber-bio">` — real bio
- `<img alt="...">` — descriptive alt text for the real photo
- `<ul class="barber-specialties">` — real specialties
- `data-src="..."` — real photo URL or local path
- Remove the `* All barber profiles are fictional...` disclaimer

### 6. Testimonials

Update the three `<article class="testimonial-card">` blocks with real reviews (if you have permission from clients), or remove the section entirely. Remove the `<span class="demo-badge">Sample</span>` badges and the disclaimer note once testimonials are real.

### 7. Pricing

Update each `<span class="service-price">` value and `<span class="service-duration">` value in the Services section. Remove the `* Sample pricing shown...` note at the bottom.

### 8. SEO Metadata

In `<head>` of `index.html`, update:

```html
<title>Your Business Name — Premium Barbershop | City, State</title>
<meta name="description" content="Your real business description." />
<link rel="canonical" href="https://your-actual-domain.com/" />
<meta property="og:url"   content="https://your-actual-domain.com/" />
<meta property="og:image" content="https://your-actual-domain.com/assets/images/og-image.jpg" />
```

Add a real OG image (1200×630px) at `assets/images/og-image.jpg`.

### 9. Social Links

Find the four `<a class="social-link">` links in the footer and replace `href="#"` with the real social media profile URLs. Add `target="_blank" rel="noopener noreferrer"`.

### 10. Footer Credit

Find the `Design by <a href="#">Your Name</a>` line and update with your name and portfolio URL, or remove it per the client's preference.

### 11. robots.txt

Update the `Sitemap:` URL in `robots.txt` with your actual production domain.

---

## GitHub & Vercel Deployment

### Step 1 — Push to GitHub

```bash
# From the project root
git init
git add .
git commit -m "Initial commit: The Gentlemen's Club barbershop demo"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New → Project**
3. Import your repository
4. On the configuration screen:
   - **Framework Preset:** Other
   - **Build Command:** *(leave empty)*
   - **Output Directory:** *(leave empty or set to `.`)*
   - **Install Command:** *(leave empty)*
5. Click **Deploy**

Vercel will serve `index.html` as the root automatically. No `vercel.json` config is needed.

### Custom Domain (optional)

1. In your Vercel project, go to **Settings → Domains**
2. Add your domain and follow the DNS instructions
3. Update the canonical URL and OG metadata in `index.html` to match

---

## Pre-Deployment Checklist

Run through this before handing off or going live:

### Content
- [ ] Real phone number in all `tel:` links and visible text
- [ ] Real email address in `mailto:` link and footer
- [ ] Real street address updated everywhere
- [ ] Business hours updated
- [ ] Map embed added (Google Maps iframe)
- [ ] Barber profiles updated with real names, bios, and photos
- [ ] Testimonials are real (or section removed)
- [ ] Pricing updated and disclaimer removed
- [ ] Social media links point to real profiles
- [ ] Footer credit updated or removed

### SEO
- [ ] `<title>` updated with real business name and city
- [ ] `<meta name="description">` updated
- [ ] `<link rel="canonical">` set to real production URL
- [ ] Open Graph `og:url` and `og:image` updated
- [ ] OG image file exists at the referenced path (1200×630px)
- [ ] `robots.txt` Sitemap URL updated

### Technical
- [ ] All images load correctly (no broken images)
- [ ] Mobile navigation opens and closes
- [ ] All anchor links scroll to the correct section
- [ ] "Book an Appointment" / "Call to Book" links dial or send SMS
- [ ] No console errors in browser DevTools
- [ ] Site passes basic keyboard navigation test (Tab through all interactive elements)
- [ ] Tested on Chrome, Firefox, and Safari
- [ ] Tested on a real mobile device (not just browser DevTools)

### Demo notices to remove
- [ ] Pricing note: `* Sample pricing shown for portfolio demonstration only`
- [ ] Barbers disclaimer: `* All barber profiles are fictional...`
- [ ] Testimonial `Sample` badges
- [ ] Testimonials note: `* All testimonials shown are sample content...`
- [ ] Booking disclaimer: `⚠ Demo site — (312) 555-0100 is a placeholder`
- [ ] Address italic note: `* Placeholder address — replace before deploying`
- [ ] Phone italic note: `Placeholder number`
- [ ] Email italic note: `Placeholder email`
- [ ] Footer demo notice: `⚠ Portfolio Demo — Not a Real Business`

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| iOS Safari 14+ | ✅ Full |
| Android Chrome | ✅ Full |

Uses standard CSS (`custom properties`, `Grid`, `Flexbox`, `IntersectionObserver`) with no polyfills. IE11 is not supported.

---

## Accessibility

- Semantic HTML5 landmark regions (`header`, `main`, `nav`, `section`, `footer`)
- Single `<h1>` with logical heading hierarchy
- All images have descriptive `alt` attributes
- All interactive elements are keyboard-reachable
- Visible focus styles on all focusable elements (`:focus-visible`)
- Skip-to-content link for screen reader users
- Mobile nav focus trap and Escape key support
- `aria-label`, `aria-expanded`, `aria-current` attributes throughout
- `prefers-reduced-motion` respected — animations disabled when set

---

## License & Credits

- **Photography:** [Unsplash](https://unsplash.com) — free for commercial use
- **Fonts:** [Google Fonts](https://fonts.google.com) — Playfair Display, Inter (SIL Open Font License)
- **Icons:** Custom inline SVG — no external icon library dependency

This project is a fictional portfolio demo. It does not represent or impersonate any real business.
