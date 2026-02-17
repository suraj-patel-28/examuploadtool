# How to Clear Netlify Production Cache

## Method 1: Netlify Dashboard
1. Go to: https://app.netlify.com
2. Select your site
3. Site Settings → Build & Deploy → Post Processing
4. Click "Clear cache and deploy site"

## Method 2: Netlify CLI
```bash
netlify deploy --prod --clear-cache
```

## Method 3: Force Cache Bust (Already Done)
- Added ?v=2 to all CSS links ✅
- Created netlify.toml with cache headers ✅

After clearing cache, the ?v=2 will ensure fresh CSS loads.
