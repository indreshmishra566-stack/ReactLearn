import { useState, useRef, useEffect } from "react";
import { chapters } from "./data/chapters";
import { useProgress } from "./hooks/useProgress";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import ChapterView from "./components/ChapterView";
import "./App.css";

function chapterIdFromPath() {
  const match = window.location.pathname.match(/^\/chapter\/([^/]+)$/);
  return match ? decodeURIComponent(match[1]) : null;
}

function getInitialChapterId() {
  const id = chapterIdFromPath();
  return chapters.some((chapter) => chapter.id === id) ? id : chapters[0].id;
}

export default function App() {
  const [activeId, setActiveId] = useState(getInitialChapterId);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const {
    progress,
    markDone,
    markUndone,
    toggleExercise,
    answerQuiz,
    completedCount,
    percentage,
  } = useProgress(chapters);
  const contentRef = useRef(null);

  const activeIndex = chapters.findIndex((c) => c.id === activeId);
  const chapter = chapters[activeIndex];

  const goTo = (id) => {
    setActiveId(id);
    if (window.innerWidth <= 768) setSidebarOpen(false);
  };

  const goPrev = () => {
    if (activeIndex > 0) setActiveId(chapters[activeIndex - 1].id);
  };

  const goNext = () => {
    if (activeIndex < chapters.length - 1)
      setActiveId(chapters[activeIndex + 1].id);
  };

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [activeId]);

  useEffect(() => {
    const nextPath = `/chapter/${activeId}`;
    if (window.location.pathname !== nextPath) {
      window.history.pushState(null, "", nextPath);
    }
  }, [activeId]);

  useEffect(() => {
    const syncFromUrl = () => {
      const id = chapterIdFromPath();
      if (chapters.some((item) => item.id === id)) setActiveId(id);
    };

    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  return (
    <div className="app">
      <Sidebar
        chapters={chapters}
        activeId={activeId}
        onSelect={goTo}
        progress={progress}
        completedCount={completedCount}
        percentage={percentage}
        sidebarOpen={sidebarOpen}
      />
      <div className="main-area" ref={contentRef}>
        <Topbar
          chapter={chapter}
          chapterIndex={activeIndex}
          total={chapters.length}
          onToggleSidebar={() => setSidebarOpen((s) => !s)}
        />
        <div className="content-scroll">
          <ChapterView
            chapter={chapter}
            chapterIndex={activeIndex}
            total={chapters.length}
            onPrev={goPrev}
            onNext={goNext}
            isDone={!!progress.completed[activeId]}
            exerciseProgress={progress.exercises[activeId] || {}}
            quizAnswers={progress.quizAnswers[activeId] || {}}
            onMarkDone={() => markDone(activeId)}
            onMarkUndone={() => markUndone(activeId)}
            onToggleExercise={(taskIndex) => toggleExercise(activeId, taskIndex)}
            onAnswerQuiz={(questionIndex, optionIndex) =>
              answerQuiz(activeId, questionIndex, optionIndex)
            }
          />
        </div>
      </div>
    </div>
  );
}
