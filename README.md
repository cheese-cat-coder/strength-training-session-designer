# Strength Training Session Designer

A modern web application for building strength training workouts by filtering and selecting exercises from spreadsheets.

## Features

✨ **Smart Filtering**: Filters update dynamically based on previous selections—only see relevant options
🎯 **Direct Add**: Click the "+" button directly on any exercise to add it to your workout
📊 **Spreadsheet Support**: Load exercises from Excel (.xlsx, .xls, .csv) or Google Sheets
📋 **Pagination**: Browse through up to 2000+ exercises with 20 exercises per page
📋 **Workout Builder**: Add up to 15 exercises to your custom workout
📋 **Easy Export**: Copy your workout list to clipboard for use in other tools
🎨 **Modern Design**: Flat-style interface with LAB color scheme

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- A modern web browser

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Visit `http://localhost:3000`

### Loading Data

#### Option 1: Upload Excel File
1. Click "Choose File" button
2. Select a .xlsx, .xls, or .csv file
3. The file is parsed locally in your browser

#### Option 2: Load from Google Sheets
1. Get the shareable link to your Google Sheet (must be publicly accessible)
2. Paste the URL into the "Or paste Google Sheets URL" field
3. Press Enter to load

**Note:** Google Sheets data is fetched through a backend API to avoid CORS issues.

### Spreadsheet Requirements

Your spreadsheet must have the following columns (case-sensitive):
- `Theme` - Main category (e.g., "Upper Body", "Lower Body")
- `Sub Theme` - Subcategory (e.g., "Chest", "Legs")
- `Implement` - Equipment (e.g., "Barbell", "Dumbbell")
- `Position` - Body position (e.g., "Standing", "Lying")
- `Exercise` - The exercise name

Example:
| Theme | Sub Theme | Implement | Position | Exercise |
|-------|-----------|-----------|----------|----------|
| Upper Body | Chest | Barbell | Lying | Bench Press |
| Upper Body | Back | Dumbbell | Standing | Dumbbell Row |

## How to Use

1. **Load your exercises** via Excel upload or Google Sheets URL
2. **Use the filters** to narrow down exercises:
   - Select a Theme
   - Based on your theme, relevant Sub Themes will appear
   - Continue filtering down by Implement and Position
3. **Click the "+" button** on any exercise in the results to add it to your workout
4. **Review your workout** in the "Your Workout" section
5. **Remove exercises** using the "×" button if needed
6. **Copy your workout** to clipboard when ready

## Building for Production

### Build the application:
```bash
npm run build
npm start
```

### Deploy to Common Platforms

#### Vercel (Recommended - Zero Config)
```bash
npm i -g vercel
vercel
```

#### Netlify
```bash
npm run build
# Upload the `.next` folder to Netlify
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY .next ./next
COPY public ./public
CMD ["npm", "start"]
```

## Project Structure

```
.
├── app/
│   ├── api/
│   │   └── sheets/route.ts          # API route for Google Sheets proxy
│   ├── page.tsx                     # Main page component
│   ├── page.module.css              # Page styles
│   ├── layout.tsx                   # Root layout
│   └── globals.css                  # Global styles
├── components/
│   └── ui/
│       ├── components.tsx           # Reusable UI components
│       └── components.module.css    # Component styles
├── lib/
│   └── spreadsheet.ts               # Spreadsheet parsing & filtering logic
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## Technical Details

### Dependent Filtering
The filter system intelligently updates available options:
- When you select a Theme, only Sub Themes that exist in that Theme are shown
- When you select a Sub Theme, only Implements available for that combination are shown
- This cascades through all filter levels

### Data Handling
- File uploads are parsed client-side using the SheetJS library
- Google Sheets are fetched via a backend API (`/api/sheets`) to avoid CORS issues
- All filtering happens client-side for instant feedback
- No data is stored on any server (stateless)

### Performance
- Pagination limits DOM nodes (20 exercises per page)
- Efficient filtering algorithms
- CSS modules prevent style conflicts
- Optimized React renders with useMemo and useCallback

## Troubleshooting

### Google Sheets not loading?
- Ensure the sheet is shared publicly (anyone with the link can view)
- Check that the URL is a valid Google Sheets link
- Verify your columns match the required names exactly

### Spreadsheet parse error?
- Ensure the file has at least 2 rows (header + 1 data row)
- Check all required columns are present and spelled correctly
- Make sure there are no blank header cells

### Filters showing unexpected options?
- This is normal! The filters dynamically update based on your previous selections
- For example, not all Implements may be available for every Sub Theme

## License

MIT
