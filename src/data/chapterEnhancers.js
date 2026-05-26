export const chapterOrder = [
  "start-here",
  "web-foundations",
  "setup",
  "javascript",
  "first-app",
  "how-react-works",
  "jsx",
  "components",
  "props",
  "state",
  "events",
  "lists",
  "conditional",
  "effects",
  "data-fetching",
  "styling",
  "refs",
  "context",
  "router",
  "custom-hooks",
  "performance",
  "errors-debugging",
  "reading-code",
  "terminal-errors",
  "exercises-checkpoints",
  "testing",
  "project-structure",
  "deep-react-thinking",
  "state-decisions",
  "effect-patterns",
  "architecture",
  "forms-validation",
  "accessibility",
  "production-react",
  "interview-prep",
  "final-project",
  "build-deploy",
  "practice-plan",
];

export function inferTags(chapter) {
  const text = `${chapter.title} ${chapter.sections
    .map((section) => `${section.heading} ${section.content || ""} ${section.code || ""}`)
    .join(" ")}`.toLowerCase();

  const rules = [
    ["setup", ["npm", "vite", "install", "command", "terminal"]],
    ["javascript", ["javascript", "array", "object", "function", "map"]],
    ["jsx", ["jsx", "markup", "classname"]],
    ["components", ["component", "props", "children"]],
    ["state", ["state", "usestate", "reducer", "derived"]],
    ["forms", ["form", "input", "validation", "submit"]],
    ["lists", ["list", "array", "key", "map"]],
    ["effects", ["effect", "useeffect", "cleanup", "fetch", "timer"]],
    ["api", ["api", "fetch", "request", "server"]],
    ["styling", ["css", "style", "responsive", "mobile"]],
    ["routing", ["route", "router", "url", "page"]],
    ["hooks", ["hook", "useref", "usememo", "usecallback", "custom"]],
    ["debugging", ["error", "debug", "terminal", "devtools"]],
    ["testing", ["test", "vitest", "testing"]],
    ["architecture", ["architecture", "structure", "folder", "container"]],
    ["accessibility", ["accessibility", "label", "keyboard", "aria"]],
    ["production", ["deploy", "build", "production", "security", "environment"]],
    ["project", ["project", "practice", "portfolio", "interview"]],
  ];

  const tags = rules
    .filter(([, words]) => words.some((word) => text.includes(word)))
    .map(([tag]) => tag);

  return [...new Set(tags)].slice(0, 4);
}

export function makeExercise(chapter) {
  return {
    type: "exercise",
    heading: "Try It Yourself",
    tasks: [
      `Explain "${chapter.title}" out loud in three simple sentences.`,
      "Copy one code example from this chapter and change at least two values.",
      "Write down one thing that confused you, then reread only that section.",
    ],
  };
}

export function makeQuiz(chapter) {
  const tag = inferTags(chapter)[0] || "React";

  return {
    type: "quiz",
    heading: "Quick Check",
    questions: [
      {
        prompt: `What should you understand after "${chapter.title}"?`,
        options: [
          `The main idea of ${chapter.title} and when to use it`,
          "Only the exact code shown in the example",
          "Every React library in the ecosystem",
        ],
        answer: 0,
        explain: "The goal is understanding the idea first. Exact syntax gets easier with practice.",
      },
      {
        prompt: "What is the best move when the code feels confusing?",
        options: [
          "Read one small part, trace the data, and test a tiny change",
          "Delete the whole project immediately",
          "Memorize the code without changing it",
        ],
        answer: 0,
        explain: `For ${tag} topics, small experiments teach more than memorizing.`,
      },
    ],
  };
}

export function makeProjectSteps(chapter) {
  if (chapter.id !== "final-project") return null;

  return {
    type: "project",
    heading: "Build Order",
    steps: [
      "Create the static layout first: title, form, filter buttons, and empty list area.",
      "Add state for the input text and make the form add one topic.",
      "Render the topics with map and give every topic a stable id.",
      "Add complete toggles, filters, and an empty state message.",
      "Move localStorage into a custom hook after the app works.",
      "Split the app into smaller components and test it on a phone-sized screen.",
      "Run lint, build, preview, then deploy.",
    ],
  };
}

export function enhanceChapters(courseChapters) {
  return chapterOrder.map((id) => {
    const chapter = courseChapters.find((item) => item.id === id);
    const projectSteps = makeProjectSteps(chapter);

    return {
      ...chapter,
      tags: inferTags(chapter),
      sections: [
        ...chapter.sections,
        ...(projectSteps ? [projectSteps] : []),
        makeExercise(chapter),
        makeQuiz(chapter),
      ],
    };
  });
}
