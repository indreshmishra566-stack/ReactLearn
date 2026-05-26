import CodeBlock from "./CodeBlock";
import CommandTable from "./CommandTable";
import TheoryBlock from "./TheoryBlock";

function QuizBlock({ questions, answers, onAnswer }) {
  const answeredCount = questions.filter((_, index) => answers[index] !== undefined).length;
  const correctCount = questions.filter(
    (question, index) => answers[index] === question.answer
  ).length;

  return (
    <div className="quiz-block">
      <div className="quiz-score" aria-live="polite">
        Score: {correctCount}/{questions.length} correct - {answeredCount}/{questions.length} answered
      </div>
      {questions.map((question, index) => (
        <details className="quiz-item" key={question.prompt} open={answers[index] !== undefined}>
          <summary>
            <span className="quiz-number">{index + 1}</span>
            {question.prompt}
          </summary>
          <div className="quiz-options">
            {question.options.map((option, optionIndex) => (
              <button
                type="button"
                className={[
                  "quiz-option",
                  answers[index] === optionIndex ? "selected" : "",
                  answers[index] !== undefined && optionIndex === question.answer ? "correct" : "",
                  answers[index] === optionIndex && optionIndex !== question.answer ? "incorrect" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                key={option}
                onClick={() => onAnswer(index, optionIndex)}
                aria-pressed={answers[index] === optionIndex}
              >
                <span>{String.fromCharCode(65 + optionIndex)}</span>
                {option}
              </button>
            ))}
          </div>
          {answers[index] !== undefined && (
            <p className="quiz-explain">
              {answers[index] === question.answer ? "Correct. " : "Review this one. "}
              {question.explain}
            </p>
          )}
        </details>
      ))}
    </div>
  );
}

function ExerciseBlock({ tasks, progress, onToggle }) {
  const doneCount = tasks.filter((_, index) => progress[index]).length;

  return (
    <div className="exercise-list">
      <div className="exercise-score" aria-live="polite">
        {doneCount}/{tasks.length} practice tasks checked
      </div>
      {tasks.map((task, index) => (
        <label className="exercise-item" key={task}>
          <input
            type="checkbox"
            checked={!!progress[index]}
            onChange={() => onToggle(index)}
          />
          <span className="exercise-index">{index + 1}</span>
          <span>{task}</span>
        </label>
      ))}
    </div>
  );
}

function ProjectBlock({ steps }) {
  return (
    <div className="project-steps">
      {steps.map((step, index) => (
        <div className="project-step" key={step}>
          <span>{index + 1}</span>
          <p>{step}</p>
        </div>
      ))}
    </div>
  );
}

function sectionLabel(type) {
  if (type === "commands") return "Commands";
  if (type === "code") return "Code";
  if (type === "quiz") return "Quiz";
  if (type === "exercise") return "Exercise";
  if (type === "project") return "Project";
  return "Theory";
}

export default function ChapterView({
  chapter,
  chapterIndex,
  total,
  onPrev,
  onNext,
  isDone,
  exerciseProgress,
  quizAnswers,
  onMarkDone,
  onMarkUndone,
  onToggleExercise,
  onAnswerQuiz,
}) {
  return (
    <main className="chapter-view">
      {/* Chapter Hero */}
      <div
        className="chapter-hero"
        style={{ "--ch-color": chapter.color }}
      >
        <div className="hero-icon">{chapter.icon}</div>
        <div>
          <h1 className="hero-title">{chapter.title}</h1>
          <p className="hero-sub">
            Chapter {chapterIndex + 1} of {total}
          </p>
          <div className="hero-tags">
            {(chapter.tags || []).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Sections */}
      {chapter.sections.map((section, i) => (
        <div key={i} className="section-card" style={{ "--ch-color": chapter.color }}>
          <div className="section-header">
            <div className="section-accent" />
            <h2 className="section-title">{section.heading}</h2>
            <span className={`section-badge badge-${section.type}`}>
              {sectionLabel(section.type)}
            </span>
          </div>

          {section.type === "theory" && <TheoryBlock content={section.content} />}
          {section.type === "code" && <CodeBlock code={section.code} />}
          {section.type === "commands" && (
            <CommandTable commands={section.commands} />
          )}
          {section.type === "quiz" && (
            <QuizBlock
              questions={section.questions}
              answers={quizAnswers}
              onAnswer={onAnswerQuiz}
            />
          )}
          {section.type === "exercise" && (
            <ExerciseBlock
              tasks={section.tasks}
              progress={exerciseProgress}
              onToggle={onToggleExercise}
            />
          )}
          {section.type === "project" && <ProjectBlock steps={section.steps} />}
        </div>
      ))}

      {/* Navigation + Complete */}
      <div className="chapter-footer">
        <button
          className="nav-btn prev-btn"
          onClick={onPrev}
          disabled={chapterIndex === 0}
        >
          ← Previous
        </button>

        <div className="complete-area">
          {isDone ? (
            <button className="done-badge" onClick={onMarkUndone}>
              Chapter Completed
            </button>
          ) : (
            <button
              className="complete-btn"
              style={{ "--ch-color": chapter.color }}
              onClick={onMarkDone}
            >
              Mark as Complete ✓
            </button>
          )}
        </div>

        <button
          className="nav-btn next-btn"
          style={{ "--ch-color": chapter.color }}
          onClick={onNext}
          disabled={chapterIndex === total - 1}
        >
          Next →
        </button>
      </div>
    </main>
  );
}
