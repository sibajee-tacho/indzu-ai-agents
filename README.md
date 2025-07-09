# Workflow Automation Demo

This repository contains a minimal MERN stack application inspired by the n8n workflow engine.

## Structure

- **server** – Express and MongoDB API implementing basic workflow CRUD, credential management and execution logs.
- **client** – React UI with simple login, dashboard and workflow editor.

Both folders contain independent `package.json` files so you can install dependencies separately.

## Running

1. Start MongoDB locally (or provide a `MONGO_URL` environment variable).
2. From the `server` directory, run `npm install` then `npm start`.
3. From the `client` directory, run `npm install` then `npm start` to launch the React app.

Authentication expects tokens from an external account service; update the URLs in the login component accordingly.
