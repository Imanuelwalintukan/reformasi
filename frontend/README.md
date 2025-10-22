# POT & GERABAH - E-commerce Pottery Store

A colorful and vibrant e-commerce website built with React for showcasing and selling beautiful pottery and ceramic items.

## Features

- **Modern UI/UX**: Colorful design using an earthy, warm color palette (#B77466, #FFE1AF, #E2B59A, #957C62)
- **Responsive Design**: Works on all device sizes from mobile to desktop
- **Product Showcase**: Displays a collection of pottery and ceramic items with images, descriptions, and prices
- **Google Authentication**: Secure login using Google OAuth2
- **Multi-page Navigation**: 
  - Home page with hero section and featured products
  - Products page with full product catalog
  - About page with company information
  - Contact page with contact form
  - Shopping cart functionality
- **Interactive Elements**: Hover effects, smooth scrolling, and animated transitions

## Tech Stack

- **Frontend**: React.js
- **Routing**: React Router DOM
- **Styling**: CSS with custom gradients and animations
- **Project Structure**:
  - `src/components`: Reusable UI components
  - `src/pages`: Page components for different routes
  - `src/products.js`: Product data management

## Project Structure

```
frontend/
├── public/
│   ├── images/           # Product images
│   └── index.html
├── src/
│   ├── components/       # Reusable components
│   │   ├── Header.js     # Navigation header
│   │   ├── Hero.js       # Hero section
│   │   ├── ProductCard.js # Individual product card
│   │   └── Footer.js     # Footer component
│   ├── pages/            # Page components
│   │   ├── HomePage.js   # Home page
│   │   ├── ProductsPage.js # Products catalog
│   │   ├── AboutPage.js  # About page
│   │   ├── ContactPage.js # Contact page
│   │   └── CartPage.js   # Shopping cart
│   ├── products.js       # Product data
│   ├── App.js            # Main App component
│   ├── App.css           # Main styles
│   └── index.js          # Entry point
├── package.json
└── README.md
```

## Color Palette

The website uses a warm, earthy color scheme:
- **Primary**: #B77466 (Warm brown)
- **Secondary**: #E2B59A (Warm rose)
- **Accent**: #957C62 (Rich brown)
- **Background highlight**: #FFE1AF (Light tan)

## Components

### Header
- Logo with POT & GERABAH branding
- Navigation links to all pages (Home, Products, About, Contact, Cart)

### Hero Section
- Prominent banner with call-to-action button
- Links to products section

### Product Card
- Displays product image, name, price, and description
- "Add to Cart" button

### Footer
- Copyright information
- Social media links

## Pages

### Home Page
- Features the hero section
- Displays featured products grid

### Products Page
- Complete product catalog
- Responsive grid layout

### About Page
- Company information
- Mission and values

### Contact Page
- Contact information
- Contact form

### Cart Page
- Shopping cart summary
- Checkout functionality

## Installation

1. Clone the repository
2. Navigate to the frontend directory
3. Install dependencies:
```bash
npm install
```
4. Set up Google OAuth2 credentials:
   - Go to Google Cloud Console (https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google+ API
   - Create credentials (OAuth2 Client ID) for a web application
   - Add `http://localhost:3000` to Authorized JavaScript origins
   - Add `http://localhost:3000/callback` to Authorized redirect URIs (if needed)
   - Copy the Client ID
5. Create a `.env` file in the frontend directory with your Client ID:
```
REACT_APP_GOOGLE_CLIENT_ID=your_actual_client_id_here
```
6. Start the development server:
```bash
npm start
```

## Usage

The application will start on `http://localhost:3000`. You can navigate through the different pages using the header navigation to explore products, learn about the company, and contact information.

## Future Enhancements

- Product filtering and search functionality
- User authentication
- Payment integration
- Product reviews and ratings
- Wishlist functionality

## License

This project is created for educational purposes.