# Portfolio Builder

A modern web application that allows users to easily create professional portfolios by filling out a simple form and choosing from elegant design templates.

## Features

- **User Authentication** - Secure JWT-based authentication system
- **Customizable Templates** - Three unique portfolio designs to choose from
- **Intuitive Form Interface** - Easy-to-use form for entering your professional information
- **Responsive Design** - Looks great on desktop, tablet, and mobile devices
- **Real-time Preview** - See your portfolio come to life as you build it

## Tech Stack

This project is built with a modern JavaScript/TypeScript stack:

- **Frontend**:
  - React 18
  - TypeScript
  - TailwindCSS for styling
  - React Router for navigation
  - Zustand for state management
  - Lucide React for icons

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB for data storage
  - JWT for authentication

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository
2. Install dependencies
```bash
npm install
```
3. Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```
4. Start the development server
```bash
npm run dev
```
5. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run lint` - Lints the codebase
- `npm run preview` - Previews the production build locally

1. Build the frontend:
```bash
npm run build
```

2. Deploy the built files and server directory to your hosting provider

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



 ## Future Prospects

   1. Enhance Backend Security: Planning to deploy the backend on a more secure and scalable platform.
   2. Optimize Deployment: Currently deployed on Render's free tier, resulting in slower response times. Moving to a better hosting solution is a priority.


## Acknowledgments

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)

---
