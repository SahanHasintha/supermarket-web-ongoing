# Wynnum Mini Supermarket

A modern React application built with TypeScript and Tailwind CSS for Wynnum Mini Supermarket.

## Features

- 🎨 Beautiful, modern UI with Tailwind CSS
- 📱 Fully responsive design
- ⚡ Fast development with Vite
- 🔷 TypeScript for type safety
- 🎯 Parallelogram-shaped navigation boxes

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
├── src/
│   ├── components/
│   │   └── Welcome.tsx    # Welcome page component
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles with Tailwind
├── index.html             # HTML template
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## Customization

### Changing the Background Image

The Welcome page uses a default supermarket image from Unsplash. To use your own image:

1. Add your image to the `public` folder
2. Update the `backgroundImage` URL in `src/components/Welcome.tsx`:

```tsx
style={{
  backgroundImage: `url('/your-image.jpg')`,
}}
```

### Styling

The project uses Tailwind CSS for styling. You can customize:
- Colors in `tailwind.config.js`
- Component styles in individual `.tsx` files
- Global styles in `src/index.css`

## Future Pages

The following pages will be created:
- Home page
- About page
- Services page

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## License

This project is private and proprietary.

# supermarket-web
# supermarket-web
