# Bilal Iftikhar - Portfolio Website

A modern, fully responsive personal portfolio website built with Next.js and Tailwind CSS, showcasing my skills, experience, and projects as a Full Stack Developer.

![Portfolio Preview](public/profile.png)

## 🚀 Live Demo

Visit the live site: [Your Domain Here]

## ✨ Features

- **Modern Design**: Inspired by contemporary web design trends with a custom blue color scheme (#3B82F6)
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Powered by Framer Motion for engaging user experience
- **SEO Optimized**: Comprehensive meta tags and semantic HTML for better search engine visibility
- **Dark Theme**: Professional dark mode design with glassmorphism effects
- **Interactive Components**: 
  - Animated navigation with scroll effects
  - Hero section with floating background elements
  - Skills showcase with tech stack icons
  - Project portfolio with detailed descriptions
  - Contact form with validation
  - Social media integration

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.1
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Font**: Inter (Google Fonts)
- **Deployment**: Vercel (recommended)

## 📋 Sections

1. **Hero/Landing**: Introduction with profile image and call-to-action buttons
2. **About Me**: Professional background, stats, and contact information
3. **Skills**: Categorized tech stack with interactive icons
4. **Projects**: Featured work including:
   - IGIVU (VR Platform)
   - AV Leads (Professional Networking)
   - PoolStore (E-commerce)
   - SevenLift (Equipment Rental)
   - Logistivo (Logistics Platform)
   - And more...
5. **Contact**: Form with email integration and social links
6. **Footer**: Quick links and additional information

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20.9.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure the build settings
4. Deploy!

Alternatively, use the Vercel CLI:
```bash
npm install -g vercel
vercel
```

## 📝 Customization

### Update Personal Information

1. **Profile Image**: Replace `/public/profile.png` with your photo
2. **Resume**: Add your resume PDF to `/public/resume.pdf`
3. **Projects**: Update the projects array in `/src/components/Projects.js`
4. **Contact Email**: Update email addresses in:
   - `/src/components/Hero.js`
   - `/src/components/About.js`
   - `/src/components/Contact.js`
   - `/src/components/Footer.js`

### Color Scheme

The primary color is defined in `/src/app/globals.css`:
```css
--primary: #3B82F6;
--primary-dark: #2563EB;
--primary-light: #60A5FA;
```

### Add New Sections

Create new components in `/src/components/` and import them in `/src/app/page.js`

## 📧 Contact Form Setup

The contact form currently uses a `mailto:` fallback. For production, consider:

1. **EmailJS**: Free email service integration
2. **Nodemailer**: Server-side email with API routes
3. **FormSubmit**: Simple form backend service
4. **SendGrid/Mailgun**: Professional email APIs

## 🔧 Project Structure

```
portfolio/
├── public/
│   ├── profile.png
│   ├── projects/
│   │   ├── igivu.png
│   │   ├── avleads.png
│   │   ├── poolstore.png
│   │   └── ...
│   └── resume.pdf
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   └── components/
│       ├── Navbar.js
│       ├── Hero.js
│       ├── About.js
│       ├── Skills.js
│       ├── Projects.js
│       ├── Contact.js
│       └── Footer.js
└── package.json
```

## 🎨 Design Features

- **Glassmorphism**: Modern glass effect on navigation
- **Gradient Text**: Eye-catching gradient headings
- **Smooth Scrolling**: Seamless navigation between sections
- **Hover Effects**: Interactive elements with smooth transitions
- **Floating Animations**: Subtle background animations
- **Custom Scrollbar**: Styled scrollbar matching the theme

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔍 SEO Features

- Comprehensive meta tags
- Open Graph tags for social sharing
- Twitter Card support
- Semantic HTML structure
- Optimized images
- Fast page load times

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Bilal Iftikhar**
- LinkedIn: [mbilaliftikhar](https://www.linkedin.com/in/mbilaliftikhar/)
- Upwork: [Profile](https://www.upwork.com/freelancers/~012e9b9487fa4f8fce)
- Email: bilaliftikhar431@gmail.com
- Location: Lahore, Pakistan

## 🙏 Acknowledgments

- Design inspiration from [ayraxs.com](https://ayraxs.com)
- Icons by [React Icons](https://react-icons.github.io/react-icons/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Fonts by [Google Fonts](https://fonts.google.com/)

---

Built with ❤️ using Next.js and Tailwind CSS
