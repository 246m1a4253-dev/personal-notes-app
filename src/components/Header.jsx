export default function Header({ total, onAdd }) {
  return (
    <header className="header">
      <div>
        <h1>My Notes</h1>
        <p className="muted">
          {total} {total === 1 ? 'note' : 'notes'} saved
        </p>
      </div>
      <button className="btn primary" onClick={onAdd}>
        + Add note
      </button>
    </header>
  )
}
