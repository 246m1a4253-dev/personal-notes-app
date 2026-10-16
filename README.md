# Personal Notes App

A React + Vite notes app with create, edit, delete and search. Notes are saved in the browser's localStorage.

## Run it
```
npm install
npm run dev
```
Open the URL shown in the terminal (usually http://localhost:5173).

## Build for deployment
```
npm run build
```
Upload the `dist/` folder to any static host (Netlify, Vercel, GitHub Pages).

## Structure
- `src/App.jsx`: state, CRUD logic, localStorage sync
- `src/components/`: Header, SearchBar, NotesList, NoteCard, NoteForm, ConfirmDialog

## Limits
Notes live only in one browser on one device. Accounts or sync would need a backend and database.
