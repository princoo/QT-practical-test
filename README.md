# 1. QT Backend setup

A Node.js backend service with Express, Prisma, and RSA encryption for secure user management.

## Prerequisites

- Node.js (v16 or higher)
- NPM

## Getting Started

1. **Clone the repository**
```bash
git clone <repository-url>
cd QT-practical-test/backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
From the same directory, Create a `.env` file:
```env
DATABASE_URL="file:./dev.db"
```

4. **Database Setup**
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev
```

5. **Generate RSA Keys**
The application will automatically generate RSA keys on first startup in the `src/keys` directory.

6. **Start the server**
```bash
# Development mode
npm run dev
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js         # Database configuration
│   ├── controllers/
│   │   └── userController.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   ├── user.js
│   │   └── validation.js
│   ├── routes/
│   │   └── index.js
│   ├── utils/
│   │   ├── crypto.js     # Cryptographic operations
│   │   └── schemas/
│   │       └── userSchema.js
│   └── app.js           # Main application file
├── prisma/
│   └── schema.prisma    # Database schema
└── package.json
```

## API Endpoints

- `GET /` - Health check
- `GET /users/weekly` - Get users grouped by week
- `GET /users/export` - Export protobuf users data
- `POST /user` - Create new user
- `PATCH /user/:id` - Update user
- `DELETE /user/:id` - Delete user
- `GET /.well-known/jwks.json` - Get JWKS public keys

## Security Features

- RSA key pair generation for secure signatures
- Email hashing
- JWKS endpoint for public key distribution
- Input validation
- Error handling middleware

## Error Handling

The application uses a centralized error handling middleware. All errors are properly formatted and returned with appropriate HTTP status codes.

# 2. QT Frontend setup

Modern dashboard interface built with Next.js 15, TypeScript, and Tailwind CSS.

## Prerequisites

- Node.js (v18 or higher)
- NPM 
- Backend service running

## Quick Start

1. **Clone and Install**

```bash
cd QT-practical-test/frontend
npm install
```

2. **Environment Setup**
From the same directory, Create a `.env.local` file:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

3. **Start Development Server**
```bash
npm run dev
```

## Project Structure
```
frontend/
├── src/
│   ├── app/
│   │   ├── page.tsx        # Dashboard page
│   │   └── layout.tsx      # Root layout
│   │   └── error.tsx      # handling any unhandled error
│   ├── components/         # Reusable UI components
│   │   ├── cards/         # Dashboard card components
│   │   └── ui/            # Common UI elements
│   ├── lib/
│   │   ├── constant/      # Constants and config
│   │   └── utils/         # Helper functions
│   ├── types/             # TypeScript definitions
│   └── styles/            # Global styles
├── public/                # Static assets
└── tailwind.config.js     # Tailwind configuration
```

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Run production server
```

## Features

- Dynamic dashboard cards
- Modern UI with Tailwind CSS
- Server-side rendering
- Suspense boundaries for loading states
- TypeScript for type safety

## Styling

- Tailwind CSS for utility-first styling
- Custom theme configuration

## State Management

- React Hooks for local state
- RTK Querry for client side fetching
- Suspense for loading states

## Best Practices

- Use TypeScript for all components
- Handle errors gracefully
- Keep components modular
- Follow Next.js conventions

<img width="1875" height="868" alt="image" src="https://github.com/user-attachments/assets/5c349296-d222-427c-b6d7-652bd5858f9d" />
