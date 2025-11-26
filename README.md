# Todo Snapshot

A minimal Flask-based todo list with a focused UI and a small JSON API. Tasks persist to `app/data/todos.json` while the server is running so you can add, complete, and remove items without extra tooling.

## Pinokio usage
- **Install:** run `install.js` to create the `env` virtual environment and install dependencies with `uv`.
- **Start:** run `start.js` to launch the server on the next open port (bound to `127.0.0.1`). The captured URL is exposed in the sidebar as “Open Todo.”
- **Update:** run `update.js` to pull the latest repo changes (if any) and refresh Python packages.
- **Reset:** run `reset.js` to remove the virtual environment and any saved todos.

## Manual run (optional)
```sh
cd app
uv pip install -r requirements.txt
PORT=5000 python app.py
```

## API
Base URL defaults to `http://127.0.0.1:<port>` (the port Pinokio assigns is shown in the UI).

- `GET /api/todos` → `{ "todos": [{ id, title, done }] }`
- `POST /api/todos` with JSON `{ "title": "Buy milk" }` → returns the created todo
- `PATCH /api/todos/<id>` with JSON `{ "title": "New text", "done": true }` → returns the updated todo
- `DELETE /api/todos/<id>` → returns `204 No Content` on success

### JavaScript
```js
const base = "http://127.0.0.1:5000";
fetch(`${base}/api/todos`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Ship launcher" })
}).then((res) => res.json()).then(console.log);
```

### Python
```python
import requests
base = "http://127.0.0.1:5000"
resp = requests.patch(f"{base}/api/todos/<todo_id>", json={"done": True})
print(resp.json())
```

### cURL
```sh
curl -X DELETE http://127.0.0.1:5000/api/todos/<todo_id>
```
