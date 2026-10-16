import { useEffect } from 'react'

export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onCancel()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCancel])

  return (
    <div className="overlay" onClick={onCancel}>
      <div
        className="modal"
        role="alertdialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{title}</h2>
        <p className="muted">{message}</p>
        <div className="row">
          <button className="btn danger solid" onClick={onConfirm}>
            Delete note
          </button>
          <button className="btn" onClick={onCancel}>
            Keep note
          </button>
        </div>
      </div>
    </div>
  )
}
