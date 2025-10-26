# TRX Tester App

A standalone Next.js application for inmate profile management and education tracking.

## Features

- **Inmate Profile Management**: View and manage inmate education profiles
- **Education Tracking**: Track courses, grades, and academic progress
- **Test Score Management**: Record and view standardized test scores
- **Review System**: Teacher reviews and feedback
- **Interview Management**: Track interviews and recommendations
- **Print Functionality**: Print transcripts, reviews, and other documents

## Technology Stack

- **Next.js 15.1.5** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Material-UI (MUI)** - Component library
- **Tailwind CSS** - Styling
- **Emotion** - CSS-in-JS

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
trx-tester-app/
├── app/
│   ├── components/          # React components
│   │   ├── LeftNav.tsx     # Navigation sidebar
│   │   ├── Profile.tsx     # Individual profile view
│   │   └── TabbedProfiles.tsx # Multi-profile tabbed interface
│   ├── types/              # TypeScript type definitions
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── postcss.config.mjs
```

## Features Overview

### Left Navigation
- Module selection (Education, Sentence Monitoring, Financial)
- Search functionality for inmates
- Recent inmates list
- Account management

### Profile Management
- **Transcript Tab**: Education information, courses, and test scores
- **Reviews Tab**: Teacher reviews and feedback
- **Interview Tab**: Interview details and recommendations
- **Exemptions Tab**: Academic exemptions
- **Tests Tab**: Complete test history

### Data Management
- Sample data included for testing
- Easy to extend with real data sources
- Type-safe interfaces for all data structures

## Development

The app uses the same dependencies and configuration as the original project, ensuring consistency and compatibility.

## License

Private project - All rights reserved.
