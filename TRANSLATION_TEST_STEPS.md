# Testing Translation Feature

## Steps to see the translation button:

### 1. Set environment variable for your translator service
```bash
export TRANSLATOR_API_BASE="https://your-translator-service-url"
```

### 2. Build NodeBB (compile templates and JavaScript)
```bash
./nodebb build
```

### 3. Restart NodeBB
```bash
./nodebb restart
```

### 4. Create a NEW post with non-English content

**Important:** Only posts created AFTER the code changes will have the `isEnglish` field. Old posts won't show the button.

Test with content like:
- "Hola mundo"
- "Bonjour le monde"  
- "こんにちは世界"

### 5. Check the post

If the translator service returns `isEnglish: false`, you should see:
- A blue button: "Click here to view the translated message."
- Clicking it shows/hides the translated content

## Troubleshooting

### Button not showing?

**Check 1: Did you build?**
```bash
./nodebb build
```

**Check 2: Is the post NEW?**
- Delete old test posts
- Create a fresh post after building

**Check 3: Check the database**
```bash
# Redis
redis-cli
HGETALL post:1  # Check if isEnglish and translatedContent exist
```

**Check 4: Check browser console**
- Open DevTools (F12)
- Look for JavaScript errors
- Check if topic.js loaded

**Check 5: Check if translator is being called**
```bash
# Look for translation logs in NodeBB output
tail -f logs/output.log
```

### Hard refresh
If templates are cached:
```bash
# Clear browser cache or hard refresh
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)
```

## Expected Flow

1. User creates post with "Hola mundo"
2. `src/posts/create.js` calls `translator.translate()`
3. Translator calls your microservice
4. Stores `isEnglish: false` and `translatedContent: "Hello world"`
5. Template checks `{{{if !posts.isEnglish }}}`
6. Button appears
7. Click → translation shows

## Debug Mode

Add console logs to check:

**In `src/posts/create.js`:**
```javascript
console.log('Translation result:', isEnglish, translatedContent);
```

**In browser console:**
```javascript
// Check if posts have the field
console.log(ajaxify.data.posts[0]);
```

