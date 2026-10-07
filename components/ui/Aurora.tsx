const blobs = [
  { color: "#a78bfa", size: "42vw", top: "-12%", left: "-10%", delay: "0s" },
  { color: "#38bdf8", size: "36vw", top: "18%", left: "62%", delay: "-8s" },
  { color: "#fb7185", size: "30vw", top: "62%", left: "8%", delay: "-14s" },
  { color: "#d4ff3f", size: "24vw", top: "78%", left: "70%", delay: "-20s" },
];

export function Aurora() {
  return (
    <div className="aurora" aria-hidden>
      {blobs.map((blob) => (
        <span
          key={blob.color}
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
