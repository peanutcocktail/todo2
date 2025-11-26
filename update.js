module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        path: ".",
        message: [
          "git pull || true"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install -r requirements.txt"
        ]
      }
    }
  ]
}
