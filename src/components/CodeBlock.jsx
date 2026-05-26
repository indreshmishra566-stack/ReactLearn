import { useState } from "react";

function highlightCode(line) {
  return line
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\/\/.*/g, (m) => `<span class="c-comment">${m}</span>`)
    .replace(/(["'`])(.*?)\1/g, (m) => `<span class="c-string">${m}</span>`)
    .replace(
      /\b(import|export|from|const|let|var|function|return|if|else|new|class|extends|default|true|false|null|undefined|async|await|=&gt;|typeof|throw|try|catch)\b/g,
      (m) => `<span class="c-kw">${m}</span>`
    )
    .replace(
      /\b(useState|useEffect|useRef|useCallback|useMemo|useContext|useReducer|React|ReactDOM|memo|lazy|Suspense)\b/g,
      (m) => `<span class="c-fn">${m}</span>`
    );
}

export default function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div className="code-block">
      <div className="code-topbar">
        <div className="code-dots" aria-hidden="true">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <button
          className={`copy-btn ${copied ? "copied" : ""}`}
          onClick={handleCopy}
          aria-label="Copy code example"
        >
          {copied ? "✓ Copied!" : "Copy"}
        </button>
      </div>
      <div className="code-scroll">
        <pre>
          {lines.map((line, i) => (
            <div key={i} className="code-line">
              <span className="line-num">{i + 1}</span>
              <span
                className="line-content"
                dangerouslySetInnerHTML={{ __html: highlightCode(line) }}
              />
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
