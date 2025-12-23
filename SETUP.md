# Quick Setup Guide

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Configure EmailJS (Optional but Recommended)

1. Go to [EmailJS](https://www.emailjs.com/) and create a free account
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{phone}}`
   - `{{message}}`
4. Copy your Service ID, Template ID, and Public Key
5. Create `.env.local` file:
```bash
cp .env.example .env.local
```
6. Add your EmailJS credentials to `.env.local`

## Step 3: Add Restaurant Images

### Required Images:

**Hero Section** (3 images, recommended: 1920x1080px):
- `public/images/hero-1.jpg`
- `public/images/hero-2.jpg`
- `public/images/hero-3.jpg`

**About Section** (4 images, recommended: 800x600px):
- `public/images/about-1.jpg`
- `public/images/about-2.jpg`
- `public/images/about-3.jpg`
- `public/images/about-4.jpg`

**Menu Items** (18 images, recommended: 600x400px):
- `public/images/menu/paneer-tikka.jpg`
- `public/images/menu/dal-makhani.jpg`
- `public/images/menu/butter-naan.jpg`
- `public/images/menu/paneer-butter-masala.jpg`
- `public/images/menu/aloo-gobi.jpg`
- `public/images/menu/biryani.jpg`
- `public/images/menu/veg-manchurian.jpg`
- `public/images/menu/hakka-noodles.jpg`
- `public/images/menu/spring-rolls.jpg`
- `public/images/menu/schezwan-rice.jpg`
- `public/images/menu/gobi-manchurian.jpg`
- `public/images/menu/chilli-paneer.jpg`
- `public/images/menu/sarson-da-saag.jpg`
- `public/images/menu/makki-di-roti.jpg`
- `public/images/menu/rajma-chawal.jpg`
- `public/images/menu/chole-bhature.jpg`
- `public/images/menu/amritsari-kulcha.jpg`
- `public/images/menu/lassi.jpg`

**Gallery** (12+ images, recommended: 1200x800px):
- `public/images/gallery/gallery-1.jpg` through `gallery-12.jpg` (or more)

### Quick Tip:
You can use placeholder images temporarily:
- Visit [Unsplash](https://unsplash.com/) for free food/restaurant photos
- Use [Placeholder.com](https://placeholder.com/) for temporary placeholders

## Step 4: Update Restaurant Information

1. **Phone Number**: Update in:
   - `components/Hero.tsx` (line with phone number)
   - `components/Contact.tsx` (contact info section)
   - `components/Footer.tsx` (contact section)

2. **Google Maps**: Update the embed URL in `components/Contact.tsx`:
   - Get your restaurant's Google Maps embed code
   - Replace the `src` URL in the iframe

3. **Address**: Update in `components/Contact.tsx` and `components/About.tsx`

4. **Opening Hours**: Update in `components/About.tsx` and `components/Footer.tsx`

5. **Social Media Links**: Update in `components/Footer.tsx`

## Step 5: Customize Menu

Edit `data/menu.json` to add/remove/modify menu items:
- Add new categories
- Update dish names, descriptions, prices
- Add new dishes

## Step 6: Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Step 7: Build for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables from `.env.local`
4. Deploy!

### Netlify
1. Push to GitHub
2. Import project in Netlify
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add environment variables
6. Deploy!

## Troubleshooting

### Images not showing?
- Make sure images are in the `public/images/` directory
- Check file names match exactly (case-sensitive)
- Verify image file extensions (.jpg, .jpeg, .png)

### Contact form not working?
- Verify EmailJS credentials in `.env.local`
- Check browser console for errors
- Ensure EmailJS template variables match the form data

### Build errors?
- Run `npm install` again
- Clear `.next` folder: `rm -rf .next`
- Check Node.js version (requires 18+)

