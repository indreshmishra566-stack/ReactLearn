export default function Topbar({ chapter, chapterIndex, total, onToggleSidebar }) {
  return (
    <header className="topbar">
      <button
        className="sidebar-toggle"
        onClick={onToggleSidebar}
        aria-label="Toggle chapter sidebar"
      >
        ☰
      </button>
      <div className="topbar-info">
        <span className="topbar-icon">{chapter.icon}</span>
        <span className="topbar-title">{chapter.title}</span>
      </div>
      <div className="topbar-counter">
        {chapterIndex + 1} / {total}
      </div>
    </header>
  );
}
