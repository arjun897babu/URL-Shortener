# URL Shortener

*A simple URL shortening service implemented with Node.js and TypeScript.*

## Purpose

This project provides a small web service to create short, shareable URLs that redirect to longer target URLs. It's intended as an educational implementation demonstrating routing, persistence, and analytics for shortened links.

## Features

- Create shortened URLs
- Redirect short URLs to original targets
- Basic analytics collection 

## Quick Setup

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or hosted)

### Clone

```bash
git clone https://github.com/arjun897babu/URL-Shortener.git
cd URL-Shortener
```

### Install

```bash
npm install 
```

### Environment

Create a `.env` file in the project root with values similar to the example below. Adjust names if your local config references different keys.

```
# Server
PORT=3000
BASE_URL=http://localhost:3000

# Database
MONGO_URI=your_mongodb_URI

# Security / other
JWT_SECRET=your_jwt_secret_here

```

Notes:
- `PORT` is the port the server listens on.
- `BASE_URL` is used when generating full shortened links.
- `MONGO_URI` should point to your MongoDB instance.

### Run (development)

```bash
npm run dev
```

### Run (production)

```bash
npm run build
npm start
```

### Project Link :   https://roadmap.sh/projects/url-shortening-service
