import { useState, useEffect } from "react";
import {
  buildProgressBackup,
  countCompleted,
  normalizeProgress,
  parseProgressBackup,
  PROGRESS_STORAGE_KEY,
} from "../utils/progress";

export function useProgress(chapters) {
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_STORAGE_KEY);
      return saved ? normalizeProgress(JSON.parse(saved)) : normalizeProgress();
    } catch {
      return normalizeProgress();
    }
  });

  useEffect(() => {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const markDone = (id) =>
    setProgress((p) => ({
      ...p,
      completed: { ...p.completed, [id]: true },
    }));

  const markUndone = (id) => {
    setProgress((p) => {
      const completed = { ...p.completed };
      delete completed[id];
      return { ...p, completed };
    });
  };

  const toggleExercise = (chapterId, taskIndex) => {
    setProgress((p) => {
      const chapterExercises = { ...(p.exercises[chapterId] || {}) };
      if (chapterExercises[taskIndex]) {
        delete chapterExercises[taskIndex];
      } else {
        chapterExercises[taskIndex] = true;
      }

      return {
        ...p,
        exercises: {
          ...p.exercises,
          [chapterId]: chapterExercises,
        },
      };
    });
  };

  const answerQuiz = (chapterId, questionIndex, optionIndex) => {
    setProgress((p) => ({
      ...p,
      quizAnswers: {
        ...p.quizAnswers,
        [chapterId]: {
          ...(p.quizAnswers[chapterId] || {}),
          [questionIndex]: optionIndex,
        },
      },
    }));
  };

  const resetProgress = () => setProgress(normalizeProgress());

  const exportProgress = () => buildProgressBackup(progress);
  const importProgress = (text) => {
    const imported = parseProgressBackup(text);
    setProgress(imported);
  };

  const completedCount = countCompleted(progress.completed);
  const percentage = Math.round((completedCount / chapters.length) * 100);

  return {
    progress,
    markDone,
    markUndone,
    toggleExercise,
    answerQuiz,
    resetProgress,
    exportProgress,
    importProgress,
    completedCount,
    percentage,
  };
}
