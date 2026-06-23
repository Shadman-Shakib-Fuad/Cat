# Digital Life Lessons

A platform where users can create, store, and share meaningful life lessons, personal growth insights, and wisdom gathered over time.

## Live URL

Coming soon after deployment

## Purpose

People often learn valuable lessons but forget them over time. This platform helps preserve personal wisdom, encourages mindful reflection, and allows users to grow by exploring lessons from the community.

## Key Features

- User authentication with email/password and Google login (custom JWT)
- Free and Premium subscription tiers with Stripe one-time payment integration
- Create, edit, delete, and manage personal life lessons
- Public lesson browsing with search, filter by category/emotional tone, and sort
- Pagination on public lessons page
- Like, save to favorites, comment, and report lessons
- Premium lesson lock/blur for free users
- Admin dashboard for managing users, lessons, and reports
- Featured lessons controlled from admin dashboard
- Top contributors and most saved lessons on home page
- Dark/light theme toggle
- Framer Motion scroll animations
- Estimated reading time auto-calculation
- Social sharing (Facebook, X, LinkedIn)
- Fully responsive design for mobile, tablet, and desktop
- Weekly activity chart on user dashboard
- Platform growth chart on admin dashboard

## NPM Packages Used

### Client
- next
- react
- react-dom
- daisyui
- tailwindcss
- framer-motion
- swiper
- react-icons
- react-toastify
- recharts
- @react-oauth/google

### Server
- express
- mongoose
- dotenv
- cors
- bcryptjs
- jsonwebtoken
- stripe
- google-auth-library
- nodemon

## Environment Variables

### Client (.env.local)
- NEXT_PUBLIC_API_URL
- NEXT_PUBLIC_GOOGLE_CLIENT_ID
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

### Server (.env)
- PORT
- MONGODB_URI
- BETTER_AUTH_SECRET
- CLIENT_URL
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET