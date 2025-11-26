module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install -r requirements.txt"
        ]
      }
    },
    {
      method: "notify",
      params: {
        html: "Dependencies installed. Switch to Start to launch the Todo UI."
      }
    }
  ]
}
