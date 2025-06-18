# Soul - AI with Soul

A modern, elegant React frontend for AI conversations with a focus on user experience and personalization.

## 🎨 Design Features

- **Clean Minimalist Design**: White primary color with black text for maximum readability
- **Premium Typography**: Inter font family for a modern, professional look
- **Responsive Layout**: Mobile-first design that works beautifully on all devices
- **Dark Mode Support**: Seamless light/dark theme switching
- **Smooth Animations**: Framer Motion powered animations for delightful interactions

## 🚀 Key Features

### Landing Page
- Hero section with compelling messaging
- Feature showcase with icons and descriptions
- Testimonials from satisfied users
- Clean pricing section
- Responsive footer with social links

### Chat Interface
- Claude-style layout with collapsible sidebar
- Real-time message bubbles with typing indicators
- Prompt enhancement dropdowns (Tone, Format, Creativity)
- Conversation management and history
- Smooth scrolling and message animations

### Settings & Customization
- Profile management
- Theme preferences
- Prompt enhancer defaults
- Memory and data management

### Onboarding Flow
- 3-step welcome process
- Preference collection
- Personalized setup
- Smooth transitions between steps

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Lucide React** for icons
- **Context API** for state management

## 📦 Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   ├── ThemeToggle.tsx # Theme switching component
│   └── PromptDropdown.tsx # Prompt enhancement dropdowns
├── contexts/           # React contexts
│   └── ThemeContext.tsx # Theme management
├── pages/              # Main application pages
│   ├── LandingPage.tsx # Home/landing page
│   ├── ChatInterface.tsx # Main chat interface
│   ├── Settings.tsx    # User settings
│   ├── Pricing.tsx     # Pricing information
│   └── Onboarding.tsx  # User onboarding flow
├── App.tsx             # Main app component
├── index.tsx           # React entry point
└── index.css           # Global styles
```

## 🎯 Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## 🌟 Features in Detail

### Theme System
- Light mode (default): Clean white background with black text
- Dark mode: Dark gray background with white text
- Smooth transitions between themes
- Persistent theme preference storage

### Chat Interface
- **Sidebar Navigation**: Collapsible conversation list
- **Message Bubbles**: Distinct styling for user vs AI messages
- **Typing Indicators**: Animated dots when AI is responding
- **Prompt Enhancement**: Dropdowns for tone, format, and creativity
- **Responsive Design**: Mobile-optimized layout

### Animations
- Page transitions with Framer Motion
- Hover effects on interactive elements
- Message reveal animations
- Smooth theme transitions
- Loading states and micro-interactions

## 🎨 Design System

### Colors
- **Primary**: White (#FFFFFF)
- **Secondary**: Black (#000000)
- **Accent**: Blue (#3B82F6)
- **Gray Scale**: Various shades for backgrounds and text

### Typography
- **Font Family**: Inter (primary), with Satoshi and DM Sans as fallbacks
- **Font Weights**: 300, 400, 500, 600, 700
- **Responsive Sizing**: Scales appropriately across devices

### Spacing
- Consistent spacing scale using Tailwind's spacing system
- Generous whitespace for clean, readable layouts
- Proper component spacing and padding

## 🔧 Customization

The application is built with customization in mind:

1. **Colors**: Modify the color palette in `tailwind.config.js`
2. **Typography**: Update font families in the config
3. **Animations**: Customize Framer Motion animations in components
4. **Layout**: Adjust spacing and sizing using Tailwind classes

## 📱 Responsive Design

- **Mobile First**: Designed for mobile devices first
- **Breakpoints**: Responsive across all screen sizes
- **Touch Friendly**: Optimized for touch interactions
- **Collapsible Elements**: Sidebar and navigation adapt to screen size

## 🚀 Deployment

To build for production:

```bash
npm run build
```

This creates a `build` folder with optimized production files ready for deployment.

## 🤝 Contributing

This is a frontend design implementation. To contribute:

1. Follow the existing code style and patterns
2. Ensure responsive design principles
3. Test across different devices and browsers
4. Maintain accessibility standards
5. Keep animations smooth and purposeful

## 📄 License

This project is created as a design implementation for Soul AI.

---

**Built with ❤️ for the future of AI conversation**