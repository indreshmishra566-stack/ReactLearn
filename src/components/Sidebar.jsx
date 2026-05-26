import { useRef, useState } from "react";

function searchableText(chapter) {
  return [
    chapter.title,
    ...(chapter.tags || []),
    ...chapter.sections.flatMap((section) => [
      section.heading,
      section.content,
      section.code,
      ...(section.commands || []).flatMap((command) => [command.cmd, command.desc]),
      ...(section.questions || []).flatMap((question) => [
        question.prompt,
        ...(question.options || []),
        question.explain,
      ]),
      ...(section.tasks || []),
      ...(section.steps || []),
    ]),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export default function Sidebar({
  chapters,
  activeId,
  onSelect,
  progress,
  completedCount,
  percentage,
  onResetProgress,
  onExportProgress,
  onImportProgress,
  sidebarOpen,
}) {
  const [search, setSearch] = useState("");
  const [backupMessage, setBackupMessage] = useState("");
  const importInputRef = useRef(null);
  const query = search.trim().toLowerCase();

  const filtered = query
    ? chapters.filter((chapter) => searchableText(chapter).includes(query))
    : chapters;
  const nextChapter =
    chapters.find((chapter) => !progress.completed[chapter.id]) || chapters[chapters.length - 1];

  const handleExport = () => {
    const backup = onExportProgress();
    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `react-learn-progress-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setBackupMessage("Backup exported");
  };

  const handleImport = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      onImportProgress(text);
      setBackupMessage("Backup imported");
    } catch {
      setBackupMessage("Import failed");
    } finally {
      event.target.value = "";
    }
  };

  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
      {/* Brand */}
      <div className="sidebar-brand">
        <span className="brand-icon">⚛️</span>
        <div>
          <div className="brand-name">React Learn</div>
          <div className="brand-sub">Complete Guide</div>
        </div>
      </div>

      {/* Progress */}
      <div className="progress-card">
        <div className="progress-row">
          <span className="progress-label">Your Progress</span>
          <span className="progress-count">
            {completedCount}/{chapters.length}
          </span>
        </div>
        <div className="progress-bar-bg">
          <div
            className="progress-bar-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="progress-pct">{percentage}% complete</div>
        <div className="progress-actions">
          <button className="progress-action" onClick={() => onSelect(nextChapter.id)}>
            Continue
          </button>
          <button className="progress-action danger" onClick={onResetProgress}>
            Reset
          </button>
        </div>
        <div className="backup-actions" aria-live="polite">
          <button className="progress-action" onClick={handleExport}>
            Export
          </button>
          <button
            className="progress-action"
            onClick={() => importInputRef.current?.click()}
          >
            Import
          </button>
          <input
            ref={importInputRef}
            className="visually-hidden"
            type="file"
            accept="application/json,.json"
            onChange={handleImport}
            aria-label="Import progress backup"
          />
        </div>
        {backupMessage && <div className="backup-message">{backupMessage}</div>}
      </div>

      {/* Search */}
      <div className="search-wrap">
        <input
          className="search-input"
          placeholder="Search titles, code, commands..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Chapters */}
      <nav className="chapter-nav">
        {filtered.map((ch) => (
          <button
            key={ch.id}
            className={`chapter-btn ${activeId === ch.id ? "active" : ""}`}
            style={{
              "--ch-color": ch.color,
            }}
            onClick={() => {
              onSelect(ch.id);
              setSearch("");
            }}
            aria-current={activeId === ch.id ? "page" : undefined}
          >
            <span className="ch-num">
              {String(chapters.findIndex((chapter) => chapter.id === ch.id) + 1).padStart(2, "0")}
            </span>
            <span className="ch-icon">{ch.icon}</span>
            <span className="ch-main">
              <span className="ch-title">{ch.title}</span>
              <span className="ch-tags">
                {(ch.tags || []).slice(0, 3).map((tag) => (
                  <span key={tag} className="ch-tag">{tag}</span>
                ))}
              </span>
            </span>
            {progress.completed[ch.id] && <span className="ch-done">✓</span>}
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="no-results">No chapters found.</div>
        )}
      </nav>
    </aside>
  );
}
