# Windows Build Instructions for Nothing Better Health

## Prerequisites

1. **Install Node.js** (v18 or later)
   - Download from: https://nodejs.org/
   - Choose the LTS version
   - During installation, make sure to check "Automatically install the necessary tools"

2. **Install Git for Windows** (if not already installed)
   - Download from: https://git-scm.com/download/win

## Setup Instructions

### Step 1: Clone or Download the Repository

If you haven't already:
```bash
git clone https://github.com/spotcircuit/nbh.git
cd nbh
```

### Step 2: Clean Install Dependencies

Open Command Prompt or PowerShell in the project directory and run:

```bash
# Remove old dependencies and lock files
rmdir /s /q node_modules
del package-lock.json

# Install fresh dependencies
npm install
```

### Step 3: Build the Project

```bash
npm run build
```

If you encounter any issues, try:

```bash
# Clear Next.js cache
rmdir /s /q .next
npm run build
```

### Step 4: Run the Development Server

```bash
npm run dev
```

The site will be available at: http://localhost:3000

### Step 5: Production Build & Deploy

For production deployment:

```bash
npm run build
npm run start
```

## Deployment to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

Follow the prompts to deploy to Vercel.

## Common Windows Issues & Solutions

### Issue: "Scripts cannot be executed"
**Solution:** Run PowerShell as Administrator and execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Issue: Build fails with "ENOENT" errors
**Solution:** Make sure all paths use forward slashes (/) not backslashes (\)

### Issue: "Cannot find module" errors
**Solution:** 
```bash
npm cache clean --force
npm install
```

### Issue: Port 3000 already in use
**Solution:** 
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

## Environment Variables (Optional)

Create a `.env.local` file in the root directory:

```env
# Add any environment variables here
NEXT_PUBLIC_API_URL=your_api_url
```

## Project Structure

```
nbh/
├── app/              # Next.js App Router pages
├── components/       # React components
├── public/          # Static assets (images)
├── src/             # Source files
│   ├── data/        # Site data (JSON)
│   ├── lib/         # Utility functions
│   └── types/       # TypeScript types
├── package.json     # Dependencies
└── next.config.js   # Next.js configuration
```

## Build Output

After successful build, you'll find:
- `.next/` - Build output directory
- Can be deployed to any Node.js hosting service

## Support

For issues specific to this project:
- GitHub Issues: https://github.com/spotcircuit/nbh/issues

For Next.js documentation:
- https://nextjs.org/docs