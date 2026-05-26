import test from "node:test";
import assert from "node:assert/strict";
import { countCompleted, normalizeProgress } from "./progress.js";

test("normalizes legacy completion-only progress", () => {
  assert.deepEqual(normalizeProgress({ intro: true, forms: false }), {
    completed: { intro: true, forms: false },
    exercises: {},
    quizAnswers: {},
  });
});

test("preserves saved exercises and quiz answers", () => {
  const progress = normalizeProgress({
    completed: { intro: true },
    exercises: { intro: { 0: true } },
    quizAnswers: { intro: { 0: 2 } },
  });

  assert.equal(progress.exercises.intro[0], true);
  assert.equal(progress.quizAnswers.intro[0], 2);
});

test("counts completed chapters only", () => {
  assert.equal(countCompleted({ intro: true, forms: false, routing: true }), 2);
});
