# The Gypsy Nurse - Redesigned Website

A modern, interactive redesign of The Gypsy Nurse website featuring enhanced UI/UX, smooth animations, and responsive design.

## 🚀 Features

### Modern Design
- **Glassmorphism effects** for a contemporary look
- **Gradient accents** throughout the interface
- **Smooth animations** powered by Framer Motion
- **Responsive design** that works on all devices

### Interactive Components

#### Navigation
- Sticky header with blur effect on scroll
- Dropdown menus with smooth transitions
- Mobile-responsive hamburger menu
- Smooth scroll to sections

#### Hero Section
- Animated gradient background
- Floating job cards with parallax effect
- Advanced job search functionality
- Real-time statistics display

#### Featured Jobs
- Interactive job cards with hover effects
- Save/favorite functionality
- Detailed job information
- Smooth card animations

#### Events
- Countdown timers for upcoming events
- Interactive event cards
- Registration functionality
- Hover effects and transitions

#### Instagram Feed
- Grid layout with hover overlays
- Like and comment displays
- Direct link integration
- Image zoom effects

#### Resources
- Category-based resource cards
- Interactive hover states
- Call-to-action sections
- Testimonial display

#### Blog
- Article cards with excerpts
- Category tags
- Read time estimates
- Author information

#### Footer
- Newsletter subscription
- Social media links
- Quick navigation
- Contact information

## 🛠 Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## 📦 Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to `http://localhost:3000`

## 🎨 Design Highlights

### Color Scheme
- Primary: Purple/Magenta (#7F2860) - Main brand color
- Accent: Bright Magenta (#d946ef) - Highlights and CTAs
- Neutral: Gray scale for text and backgrounds
- Brand colors match The Gypsy Nurse theme

### Animations
- Fade in on scroll
- Hover lift effects
- Smooth transitions
- Parallax floating elements
- Scale and rotate interactions

### UX Improvements
- Intuitive navigation
- Clear call-to-actions
- Loading states
- Interactive feedback
- Mobile-first approach

## 🎯 Key Interactions

### Navigation
- Click logo to scroll to top
- Menu items smoothly scroll to sections
- Dropdowns appear on hover (desktop)
- Mobile menu slides from right

### Job Cards
- Hover to lift and add shadow
- Click heart to save job
- View Details button for more info
- Color-coded by specialty

### Event Cards
- Hover for scale effect
- Countdown badges
- Registration buttons
- Location and date display

### Instagram Grid
- Hover to reveal engagement stats
- Click for external link
- Smooth opacity transitions

### Resource Cards
- Icon animations on hover
- Color-coded categories
- Learn more links
- Gradient borders on interaction

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔧 Customization

### Colors
Edit `tailwind.config.js` to modify the color scheme:

```javascript
colors: {
  primary: { ... },
  accent: { ... }
}
```

### Animations
Modify animation timings in `tailwind.config.js`:

```javascript
animation: {
  'float': 'float 6s ease-in-out infinite',
}
```

### Content
Update component files in `/components` directory to change:
- Job listings
- Event information
- Blog posts
- Resource categories

## 🚀 Deployment

### Build for production:
```bash
npm run build
```

### Start production server:
```bash
npm start
```

## 📄 File Structure

```
gypsy-nurse-redesign/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── FeaturedJobs.tsx
│   ├── Events.tsx
│   ├── Employers.tsx
│   ├── InstagramFeed.tsx
│   ├── Resources.tsx
│   ├── Blog.tsx
│   └── Footer.tsx
├── public/
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🎉 Features Showcase

### Smooth Scroll Navigation
All navigation links use smooth scrolling for a polished experience.

### Parallax Effects
Hero section features floating cards with different animation speeds.

### Interactive State Management
Save jobs, toggle menus, and interact with various elements.

### Performance Optimized
- Lazy loading for images
- Optimized animations
- Minimal bundle size
- Fast page loads

## 📞 Support

For questions or support, contact The Gypsy Nurse team.

## 📝 License

© 2025 The Gypsy Nurse. All Rights Reserved.

---

Built with ❤️ by The Gypsy Nurse Team

