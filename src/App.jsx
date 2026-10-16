import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import NotesList from './components/NotesList'
import NoteForm from './components/NoteForm'
import ConfirmDialog from './components/ConfirmDialog'

const STORAGE_KEY = 'personal-notes-v1'

const newId = () =>
  crypto.randomUUID
    ? crypto.randomUUID()
    : String(Date.now()) + Math.random().toString(16).slice(2)

// Runs once, so saved notes are read before the first save below.
function loadNotes() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

export default function App() {
  const [notes, setNotes] = useState(loadNotes)
  const [query, setQuery] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
    } catch {
      /* storage full or blocked: the app still works for this session */
    }
  }, [notes])

  const visibleNotes = useMemo(() => {
    const q = query.trim().toLowerCase()
    return notes
      .filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q)
      )
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  }, [notes, query])

  const openCreate = () => {
    setEditingNote(null)
    setFormOpen(true)
  }
  const openEdit = (note) => {
    setEditingNote(note)
    setFormOpen(true)
  }
  const closeForm = () => {
    setFormOpen(false)
    setEditingNote(null)
  }

  // CREATE or UPDATE, matched by id (never by array position)
  const saveNote = ({ title, content }) => {
    const now = new Date().toISOString()
    if (editingNote) {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === editingNote.id ? { ...n, title, content, updatedAt: now } : n
        )
      )
    } else {
      setNotes((prev) => [
        { id: newId(), title, content, createdAt: now, updatedAt: now },
        ...prev,
      ])
    }
    closeForm()
  }

  // DELETE
  const confirmDelete = () => {
    setNotes((prev) => prev.filter((n) => n.id !== deleteId))
    setDeleteId(null)
  }

  return (
    <div className="app">
      <Header total={notes.length} onAdd={openCreate} />
      <SearchBar value={query} onChange={setQuery} />
      <NotesList
        notes={visibleNotes}
        hasNotes={notes.length > 0}
        onEdit={openEdit}
        onDelete={setDeleteId}
      />
      {formOpen && (
        <NoteForm note={editingNote} onSave={saveNote} onCancel={closeForm} />
      )}
      {deleteId && (
        <ConfirmDialog
          title="Delete this note?"
          message="This can't be undone."
          onConfirm={confirmDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  )
}
