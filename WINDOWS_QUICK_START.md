# 🚀 Windows Quick Start Guide

## Step 1: Install Dependencies

Open PowerShell or Command Prompt in the project folder and run:

```powershell
npm install
```

This will install all required packages including Next.js.

## Step 2: Build the Project

After installation completes, run:

```powershell
npm run build
```

## Step 3: Start Development Server

For development:
```powershell
npm run dev
```

For production preview:
```powershell
npm run start
```

## If You Get Errors:

### Error: "'next' is not recognized"
This means dependencies aren't installed. Run:
```powershell
npm install
```

### Error: "Cannot find module"
Clear cache and reinstall:
```powershell
npm cache clean --force
npm install
```

### Error: Build fails
Clear Next.js cache:
```powershell
rmdir /s /q .next
npm run build
```

## 🎯 That's it!

Your site will be running at: **http://localhost:3000**