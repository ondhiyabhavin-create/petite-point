# Petite Point Restaurant Website

A modern, responsive website for Petite Point Restaurant built with Next.js, React, and Tailwind CSS.

## Features

- 🎨 **Modern Design**: Clean, professional UI with smooth animations
- 📱 **Fully Responsive**: Works perfectly on all devices
- 🍽️ **Interactive Menu**: Browse dishes by category with search functionality
- 📸 **Photo Gallery**: Beautiful image gallery with lightbox view
- 📧 **Contact Form**: Integrated with EmailJS for form submissions
- 🗺️ **Google Maps**: Embedded map for easy location finding
- 📞 **Click-to-Call**: Direct phone and WhatsApp integration
- ⚡ **Fast Performance**: Optimized for speed and SEO

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Forms**: EmailJS
- **Deployment**: Vercel/Netlify ready

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd petite-point
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your EmailJS credentials:
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### EmailJS Setup

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your Service ID, Template ID, and Public Key
5. Add them to your `.env.local` file

### Adding Images

Replace placeholder images in the following directories:
- `public/images/hero/` - Hero section background images (hero-1.jpg, hero-2.jpg, hero-3.jpg)
- `public/images/about/` - About section images (about-1.jpg to about-4.jpg)
- `public/images/menu/` - Menu item images (see menu.json for filenames)
- `public/images/gallery/` - Gallery images (gallery-1.jpg to gallery-12.jpg)

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
petite-point/
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/
│   ├── Header.tsx           # Navigation header
│   ├── Hero.tsx             # Hero section with carousel
│   ├── About.tsx            # About section
│   ├── Menu.tsx             # Menu section with search/filter
│   ├── Gallery.tsx          # Photo gallery with lightbox
│   ├── Contact.tsx          # Contact form and map
│   └── Footer.tsx           # Footer with links and newsletter
├── data/
│   └── menu.json            # Menu data
├── public/
│   └── images/              # Image assets
└── package.json
```

## Customization

### Update Restaurant Information

1. **Phone Number**: Update in `components/Hero.tsx`, `components/Contact.tsx`, and `components/Footer.tsx`
2. **Address**: Update Google Maps embed URL in `components/Contact.tsx`
3. **Opening Hours**: Update in `components/About.tsx` and `components/Footer.tsx`
4. **Menu Items**: Edit `data/menu.json`
5. **Social Media**: Update links in `components/Footer.tsx`

### Styling

- Colors: Edit `tailwind.config.ts` to change the primary color scheme
- Fonts: Update font imports in `app/layout.tsx`
- Global styles: Modify `app/globals.css`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Import project in Netlify
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add environment variables
6. Deploy!

## SEO Optimization

- Meta tags configured in `app/layout.tsx`
- Semantic HTML structure
- Image optimization with Next.js Image component
- Fast loading times

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

## Support

For questions or issues, please contact the development team.

---

Built with ❤️ for Petite Point Restaurant

