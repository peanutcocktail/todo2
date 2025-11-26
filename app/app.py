import json
import os
import uuid
from pathlib import Path
from typing import Dict, List

from flask import Flask, jsonify, render_template, request


BASE_DIR = Path(__file__).parent
DATA_DIR = BASE_DIR / "data"
DATA_FILE = DATA_DIR / "todos.json"


def load_todos() -> List[Dict]:
    if DATA_FILE.exists():
        try:
            return json.loads(DATA_FILE.read_text())
        except json.JSONDecodeError:
            return []
    return []


def save_todos(todos: List[Dict]) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    DATA_FILE.write_text(json.dumps(todos, indent=2))


app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/todos", methods=["GET"])
def get_todos():
    return jsonify({"todos": load_todos()})


@app.route("/api/todos", methods=["POST"])
def add_todo():
    payload = request.get_json(force=True, silent=True) or {}
    title = (payload.get("title") or "").strip()
    if not title:
        return jsonify({"error": "Title is required"}), 400

    todos = load_todos()
    todo = {"id": uuid.uuid4().hex, "title": title, "done": False}
    todos.append(todo)
    save_todos(todos)
    return jsonify(todo), 201


@app.route("/api/todos/<todo_id>", methods=["PATCH"])
def update_todo(todo_id: str):
    payload = request.get_json(force=True, silent=True) or {}
    todos = load_todos()
    for todo in todos:
        if todo["id"] == todo_id:
            if "title" in payload:
                new_title = (payload.get("title") or "").strip()
                if not new_title:
                    return jsonify({"error": "Title cannot be empty"}), 400
                todo["title"] = new_title
            if "done" in payload:
                todo["done"] = bool(payload.get("done"))
            save_todos(todos)
            return jsonify(todo)
    return jsonify({"error": "Todo not found"}), 404


@app.route("/api/todos/<todo_id>", methods=["DELETE"])
def delete_todo(todo_id: str):
    todos = load_todos()
    filtered = [todo for todo in todos if todo["id"] != todo_id]
    if len(filtered) == len(todos):
        return jsonify({"error": "Todo not found"}), 404
    save_todos(filtered)
    return "", 204


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "0") or 5000)
    app.run(host="127.0.0.1", port=port, debug=False)
