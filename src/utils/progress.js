export const PROGRESS_STORAGE_KEY = "react-learn-progress";
export const BACKUP_VERSION = 1;

export function createEmptyProgress() {
  return {
    completed: {},
    exercises: {},
    quizAnswers: {},
  };
}

export function normalizeProgress(value) {
  const empty = createEmptyProgress();

  if (!value || typeof value !== "object") return empty;

  const legacyLooksLikeCompletedMap = Object.values(value).every(
    (item) => typeof item === "boolean"
  );

  if (legacyLooksLikeCompletedMap) {
    return {
      ...empty,
      completed: value,
    };
  }

  return {
    completed: value.completed && typeof value.completed === "object" ? value.completed : {},
    exercises: value.exercises && typeof value.exercises === "object" ? value.exercises : {},
    quizAnswers:
      value.quizAnswers && typeof value.quizAnswers === "object" ? value.quizAnswers : {},
  };
}

export function buildProgressBackup(progress) {
  return {
    app: "react-learn",
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    progress: normalizeProgress(progress),
  };
}

export function parseProgressBackup(text) {
  const parsed = JSON.parse(text);
  const source = parsed?.progress || parsed;
  return normalizeProgress(source);
}

export function countCompleted(completed) {
  return Object.values(completed || {}).filter(Boolean).length;
}
