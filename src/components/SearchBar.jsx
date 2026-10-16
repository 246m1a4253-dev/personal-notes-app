export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="search"
      type="search"
      placeholder="Search by title or content"
      aria-label="Search notes"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
