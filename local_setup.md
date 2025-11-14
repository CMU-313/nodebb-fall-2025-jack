# INSTRUCTIONS FOR DEPLOYING TRANSLATION SERVICES LOCALLY 

## Fork Repositories
- Fork llm-experiment-microservice-jack repo: https://github.com/CMU-313/llm-experiment-microservice-jack
- Fork nodebb-fall-2025-jack repo: https://github.com/CMU-313/nodebb-fall-2025-jack

Clone the llm-experiment-microservice-jack repo and open it in a DevContainer.

---

## STEP 1: In llm-experiment-microservice-jack repo

1. Run:
   ```bash
   uv init
   uv add -r requirements.txt
   ```

2. Install Ollama:
   ```bash
   curl -fsSL https://ollama.com/install.sh | sh
   ```

3. Restart your terminal and verify:
   ```bash
   ollama --version
   ```

4. Start the Ollama background server (keep this window open):
   ```bash
   ollama serve
   ```

5. In a new terminal, pull the model and start Flask:
   ```bash
   ollama pull qwen3:0.6b
   uv run flask run
   ```

6. Test your translator service by visiting:
   ```
   http://127.0.0.1:5000/?content=Dies%20ist%20eine%20Nachricht%20auf%20Deutsch
   ```

Expected output:
```json
{"is_english": false, "translated_content": "This is a German message"}
```

### LEAVE BOTH THE FLASK SERVER AND OLLAMA RUNNING

---

Clone nodebb-fall-2025-jack and open it in a DevContainer.

## STEP 2: In nodebb-fall-2025-jack repo

1. Set the environment variable:
   - If **not** inside a DevContainer:
     ```bash
     export TRANSLATOR_API_BASE="http://127.0.0.1:5000"
     ```
   - If **inside** a DevContainer:
     ```bash
     export TRANSLATOR_API_BASE="http://host.docker.internal:5000"
     ```

2. Build NodeBB:
   ```bash
   ./nodebb build
   ```

3. Start NodeBB:
   ```bash
   ./nodebb start
   ```

---

## Verification Steps

- Create a **new post** (old posts won’t have `isEnglish` fields) with non-English content such as:
  ```
  นี่คือข้อความภาษาไทย
  ```

- If your microservice is running, you will see a **blue button** labeled:
  > “Click here to view the translated message.”

- Clicking the button toggles visibility of the translated text.



### Expected Results

- Posts with `isEnglish: true` → translation button still shows up
- Posts with `isEnglish: false` → button appears and shows the translated message when clicked

<img width="888" height="191" alt="image" src="https://github.com/user-attachments/assets/9d226a1c-8e49-480c-87cd-692f73e552c7" />
<img width="914" height="164" alt="image" src="https://github.com/user-attachments/assets/09216998-bd4b-4eb3-8a09-02ec4be39cbf" />
<img width="3024" height="1567" alt="image" src="https://github.com/user-attachments/assets/7209f5b4-7214-4c6a-9031-7dfa604e4533" />


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

**Check 6: Check if you set the right environment**
```bash
#if not in devcontainer: http://127.0.0.1:5000, else : http://host.docker.internal:5000
echo $TRANSLATOR_API_BASE
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
