# Tick Shield Advisor - Comparison Tool

A minimal, focused React application that provides an interactive comparison tool for tick-related interventions and solutions. Users can filter and rank different solutions based on effectiveness, environmental impact, and cost.

## Features

- **Interactive Comparison Tool**: Browse and compare all tick-related interventions
- **Smart Filtering**: Adjust weights for effectiveness, eco-friendliness, and affordability
- **Category Filtering**: Filter solutions by personal protection, landscaping, wildlife management, or other categories
- **Detailed Information**: Expand each solution to view comprehensive details
- **Multi-language Support**: English and French interface
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **TailwindCSS** - Styling
- **shadcn/ui** - UI components
- **React Router** - Routing
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 16+ or Bun

### Installation

```bash
# Install dependencies
npm install
# or
bun install
```

### Development

```bash
npm run dev
# Server runs on http://localhost:5173
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment to Vercel

### Option 1: Using Vercel CLI

```bash
npm i -g vercel
vercel
```

### Option 2: GitHub Integration

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will auto-detect the Vite configuration
5. Deploy with default settings

### Environment Variables

No environment variables are required for this project.

## Project Structure

```
src/
├── components/
│   ├── ComparisonTool.tsx    # Main comparison tool component
│   ├── FilterPanel.tsx        # Filter controls
│   ├── InterventionCard.tsx   # Solution card component
│   └── ui/                    # shadcn UI components
├── contexts/
│   └── LanguageContext.tsx    # Language switching (EN/FR)
├── data/
│   └── interventions.ts       # Solution data
├── pages/
│   └── Index.tsx              # Main page
└── App.tsx                    # Main app component
```

## How It Works

1. The comparison tool loads all available interventions from `data/interventions.ts`
2. Users adjust three sliders to set weights for:
   - **Effectiveness**: How effective the solution is
   - **Eco-Friendly**: Environmental safety
   - **Affordability**: Cost considerations
3. Solutions are ranked based on the weighted score
4. Users can filter by category to see specific types of solutions
5. Each solution can be expanded to view detailed information

## License

Private project
