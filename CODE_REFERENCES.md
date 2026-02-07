# 🔗 IMAGE REFERENCE MAP - Code Update Guide

## Files to Update (21 image references total)

### 1. **constants.ts** - PRODUCT & SOCIAL DATA
**Lines to update: 12-100** (All image URLs in arrays)

#### SIGNATURE_PRODUCTS (lines 12-31)
```javascript
// Product 1 - ONYX STEALTH SNAPBACK
image: '/assets/images/products/onyx-stealth-main.jpg'
hoverImage: '/assets/images/products/onyx-stealth-hover.jpg'

// Product 2 - URBAN NOMAD TRUCKER
image: '/assets/images/products/urban-nomad-main.jpg'
hoverImage: '/assets/images/products/urban-nomad-hover.jpg'

// Product 3 - CHARCOAL MERINO WOOL
image: '/assets/images/products/charcoal-merino-main.jpg'
hoverImage: '/assets/images/products/charcoal-merino-hover.jpg'
```

#### ALL_PRODUCTS Additional (lines 35-47)
```javascript
// Product 4 - MIDNIGHT BEANIE
image: '/assets/images/products/midnight-beanie-main.jpg'
hoverImage: '/assets/images/products/midnight-beanie-hover.jpg'

// Product 5 - STREET BUCKET CAP
image: '/assets/images/products/street-bucket-main.jpg'
hoverImage: '/assets/images/products/street-bucket-hover.jpg'

// Product 6 - VINTAGE CORDUROY
image: '/assets/images/products/vintage-corduroy-main.jpg'
hoverImage: '/assets/images/products/vintage-corduroy-hover.jpg'
```

#### HOT_DEALS (lines 50-65)
```javascript
// Bundle 1 - STARTER PACK
image: '/assets/images/bundles/starter-pack.jpg'

// Bundle 2 - CORE COLLECTION
image: '/assets/images/bundles/core-collection.jpg'
```

#### SOCIAL_POSTS (lines 68-75)
```javascript
{ id: 's1', username: '@marcus_urban', image: '/assets/images/social/marcus-urban.jpg' },
{ id: 's2', username: '@lea.fits', image: '/assets/images/social/lea-fits.jpg' },
{ id: 's3', username: '@dre_styles', image: '/assets/images/social/dre-styles.jpg' },
{ id: 's4', username: '@street_shutter', image: '/assets/images/social/street-shutter.jpg' },
{ id: 's5', username: '@calabar_fan', image: '/assets/images/social/calabar-fan.jpg' },
{ id: 's6', username: '@vibe_check', image: '/assets/images/social/vibe-check.jpg' },
```

---

### 2. **components/Hero.tsx** - HERO BACKGROUND
**Line 21** - Background image

```javascript
// OLD: https://images.unsplash.com/photo-1575435462410-6c7031910629?auto=format&fit=crop&q=80&w=2560
// NEW:
src="/assets/images/hero/hero-background.jpg"
```

---

### 3. **components/QualitySpotlight.tsx** - FEATURE IMAGE
**Line 11** - Craftsmanship detail image

```javascript
// OLD: https://images.unsplash.com/photo-1521335629791-ce4aec67dd15?auto=format&fit=crop&q=80&w=1200
// NEW:
src="/assets/images/features/craftsmanship-detail.jpg"
```

---

### 4. **components/Footer.tsx** - PAYMENT LOGOS
**Lines 53-56** - Payment method icons

```javascript
// OLD: https://upload.wikimedia.org/wikipedia/commons/...
// NEW (if using custom SVGs):
<img src="/assets/images/payments/paypal.svg" alt="Paypal" className="h-4" />
<img src="/assets/images/payments/visa.svg" alt="Visa" className="h-3" />
<img src="/assets/images/payments/mastercard.svg" alt="Mastercard" className="h-6" />
<img src="/assets/images/payments/apple-pay.svg" alt="Apple Pay" className="h-4" />
```

*Note: Payment logos can remain on CDN if not replacing*

---

### 5. **components/SignatureCollection.tsx** - ALSO HAS PAYMENT LOGOS
**Bottom section** - Same as Footer (optional update)

```javascript
// If updating, replace the 4 payment logo URLs with:
/assets/images/payments/paypal.svg
/assets/images/payments/visa.svg
/assets/images/payments/mastercard.svg
/assets/images/payments/apple-pay.svg
```

---

## 📊 SUMMARY

| File | Component | Images | Type |
|------|-----------|--------|------|
| constants.ts | Product Data | 12 | Products (main + hover) |
| constants.ts | Bundle Data | 2 | Promotions |
| constants.ts | Social Data | 6 | User posts |
| Hero.tsx | Hero Section | 1 | Background |
| QualitySpotlight.tsx | Feature Section | 1 | Detail shot |
| Footer.tsx | Payment Icons | 4 | Logos (optional) |
| SignatureCollection.tsx | Modal Footer | 4 | Logos (optional) |
| **TOTAL** | | **30** | |

---

## 🎯 UPDATE SEQUENCE (After you provide images)

1. **constants.ts** - Update all 20 image URLs (products, bundles, social)
2. **Hero.tsx** - Update hero background (1 URL)
3. **QualitySpotlight.tsx** - Update feature image (1 URL)
4. **Footer.tsx** - Update payment logos (4 URLs, optional)
5. **SignatureCollection.tsx** - Update modal logos (4 URLs, optional)

---

## ✅ HOW I'LL AUTOMATE THIS

Once you provide images:
1. I'll use `multi_replace_string_in_file` to update all 20+ references simultaneously
2. Verify all paths resolve correctly
3. Test responsive image loading
4. Optimize Tailwind classes for images
5. Add proper alt text everywhere
6. Run full site review

---

**Status**: Ready to integrate! 🚀
