import { useEffect, useRef, useState } from 'react'

export default function NoteForm({ note, onSave, onCancel }) {
  const [title, setTitle] = useState(note?.title ?? '')
  const [content, setContent] = useState(note?.content ?? '')
  const [error, setError] = useState('')
  const titleRef = useRef(null)

  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onCancel()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCancel])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() && !content.trim()) {
      setError('Add a title or some content before saving.')
      return
    }
    onSave({ title: title.trim(), content: content.trim() })
  }

  return (
    <div className="overlay">
      <form className="modal" onSubmit={handleSubmit}>
        <h2>{note ? 'Edit note' : 'New note'}</h2>
        <input
          ref={titleRef}
          value={title}
          maxLength={80}
          placeholder="Title"
          aria-label="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows="6"
          value={content}
          placeholder="Write your note"
          aria-label="Note content"
          onChange={(e) => setContent(e.target.value)}
        />
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <div className="row">
          <button type="submit" className="btn primary">
            {note ? 'Save changes' : 'Add note'}
          </button>
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
