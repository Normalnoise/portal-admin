# Nebula Block Admin Portal

A Vue 3 implementation of the Nebula Block admin interface, featuring user management, resource monitoring, and detailed analytics.

![Nebula Block Admin Interface](https://via.placeholder.com/800x400?text=Nebula+Block+Admin)

## Features

- Overview dashboard with comprehensive user data
- Detailed user information pages
- Resource usage monitoring
- Financial tracking
- Login and geographic data
- Responsive design

## Prerequisites

- Node.js (v14.0 or later)
- npm (v7.0 or later)

## Installation

### Option 1: Clone the Repository

```bash
# Clone the repository
git clone https://your-repository-url/nebula-block/portal-admin.git

# Navigate to project directory
cd portal-admin

# Install dependencies
npm install
```

### Option 2: Download as ZIP

1. Download the source code as a ZIP file
2. Extract the ZIP file
3. Navigate to the extracted directory in terminal
4. Run `npm install` to install dependencies

## Development Server

To run the application in development mode:

```bash
npm run dev
```

This will start the development server at `http://localhost:5173/` (or another available port). The application will automatically reload if you change any of the source files.

## Building for Production

```bash
# Build the application
npm run build
```

This will create a `dist` directory with optimized production build.

## Deployment

### Option 1: Static Hosting (Recommended)

The built application is a static site that can be deployed on any static hosting service:

1. Build the application: `npm run build`
2. Upload the contents of the `dist` directory to your static hosting provider
   - Netlify
   - Vercel
   - GitHub Pages
   - AWS S3
   - Any HTTP server

### Option 2: Docker Deployment

1. Build Docker image:

```bash
docker build -t nebula-block-admin .
```

2. Run Docker container:

```bash
docker run -p 8080:80 nebula-block-admin
```

This will serve the application at `http://localhost:8080`.

### Option 3: Server Deployment

If deploying to a server with Nginx:

1. Build the application: `npm run build`
2. Copy the `dist` directory to your server
3. Configure Nginx:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Environment Configuration

Create a `.env` file in the project root for environment variables:

```
VITE_API_URL=https://api.example.com
```

## Project Structure

```
portal-admin/
├── public/           # Public static assets
├── src/              # Application source code
│   ├── assets/       # Assets (CSS, images)
│   ├── components/   # Vue components
│   ├── main.js       # Application entry point
│   └── App.vue       # Main App component
├── index.html        # HTML entry point
├── vite.config.js    # Vite configuration
├── package.json      # Dependencies and scripts
└── README.md         # This file
```

## Customization

To customize the application:

1. Main CSS styles are located in `src/assets/main.css`
2. Component styles are found within each Vue component file
3. Main layout is defined in `src/App.vue`

## Troubleshooting

### Common Issues

- **Blank page in production**: Ensure your server is configured to handle client-side routing
- **Missing assets**: Check that all paths in the `index.html` are correct for your hosting environment
- **API connectivity issues**: Verify your API endpoint configuration in environment variables

## License

[MIT License](LICENSE) 