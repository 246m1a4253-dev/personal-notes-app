const formatDate = (iso) =>
  new Date(iso).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })

export default function NoteCard({ note, onEdit, onDelete }) {
  const edited = note.updatedAt !== note.createdAt
  return (
    <article className="card note">
      <h3>{note.title || 'Untitled'}</h3>
      {note.content && <p className="note-body">{note.content}</p>}
      <p className="muted small">
        {edited ? 'Updated' : 'Created'} {formatDate(note.updatedAt)}
      </p>
      <div className="row">
        <button className="btn" onClick={() => onEdit(note)}>
          Edit
        </button>
        <button className="btn danger" onClick={() => onDelete(note.id)}>
          Delete
        </button>
      </div>
    </article>
  )
}
