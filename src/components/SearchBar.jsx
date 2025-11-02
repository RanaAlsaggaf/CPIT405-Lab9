export default function SearchBar({ value, onChange, onSubmit, loading }) {
    return (
        <form className="search" onSubmit={(e) => { e.preventDefault(); onSubmit?.(); }}>
            <input
                type="text"
                placeholder="Search recipes… e.g. pasta, chicken, salad"
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
            />
            <button disabled={loading} type="submit">Search</button>
        </form>
    );
}
