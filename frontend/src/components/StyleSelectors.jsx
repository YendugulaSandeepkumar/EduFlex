export default function StyleSelector({ setStyle }) {
  return (
    <div>
      <h4>Select Learning Style</h4>
      {["V","A","R","K"].map(s => (
        <button key={s} onClick={() => setStyle(s)}>
          {s}
        </button>
      ))}
    </div>
  );
}
