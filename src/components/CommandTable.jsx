import { useState } from "react";

export default function CommandTable({ commands }) {
  const [copied, setCopied] = useState(null);

  const handleCopy = (cmd, i) => {
    navigator.clipboard.writeText(cmd);
    setCopied(i);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="cmd-table">
      {commands.map((c, i) => (
        <button
          type="button"
          key={i}
          className={`cmd-row ${i % 2 === 0 ? "even" : "odd"}`}
          onClick={() => handleCopy(c.cmd, i)}
          aria-label={`Copy command: ${c.cmd}`}
        >
          <code className="cmd-code">{c.cmd}</code>
          <span className="cmd-desc">{c.desc}</span>
          <span className={`cmd-copy ${copied === i ? "done" : ""}`}>
            {copied === i ? "✓" : "copy"}
          </span>
        </button>
      ))}
    </div>
  );
}
