import NoteCard from './NoteCard'

export default function NotesList({ notes, hasNotes, onEdit, onDelete }) {
  if (notes.length === 0) {
    return (
      <p className="empty">
        {hasNotes
          ? 'No notes match your search. Try a different word.'
          : 'No notes yet. Select "Add note" to write your first one.'}
      </p>
    )
  }
  return (
    <div className="grid">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
