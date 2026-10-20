const blobs = [
  { color: "#e7e5e4", size: "48vw", top: "-20%", left: "-14%", delay: "0s" },
  { color: "#f5f5f4", size: "40vw", top: "8%", left: "55%", delay: "-12s" },
  { color: "#e5e7eb", size: "34vw", top: "60%", left: "10%", delay: "-20s" },
];

export function Aurora() {
  return (
    <div className="aurora" aria-hidden>
      {blobs.map((blob) => (
        <span
          key={`${blob.color}-${blob.left}`}
          className="aurora-blob"
          style={{
            background: blob.color,
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
            animationDelay: blob.delay,
          }}
        />
      ))}
      <div className="aurora-grain" />
    </div>
  );
}
