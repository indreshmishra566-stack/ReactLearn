import { enhanceChapters } from "./chapterEnhancers";

const courseChapters = [
  {
    id: "start-here",
    icon: "🧭",
    title: "Start Here",
    color: "#38bdf8",
    sections: [
      {
        type: "theory",
        heading: "How to Learn With This App",
        content: `This guide is one complete React course. It starts from the smallest ideas and keeps going until real-world React topics like architecture, accessibility, production safety, and interviews. You do not need to be a genius, fast typer, or math expert. You only need patience and practice.

React is a tool for building websites and apps. A React app is made from small pieces called **components**. Each component can show text, buttons, images, forms, lists, and other components.

Think of a React app like building with blocks:
• HTML is the shape of the block
• CSS is the color and style of the block
• JavaScript is the brain of the block
• React helps many blocks work together

When you study a chapter:
• Read the theory first
• Copy the code and change small parts
• Break the code on purpose, then fix it
• Mark the chapter complete only when you can explain it in your own words

The most important rule: do not memorize everything. Learn what each part is for.`,
      },
      {
        type: "theory",
        heading: "Words You Will See Often",
        content: `**App** means the website or program you are building.

**Component** means a reusable piece of the screen, like a button, card, navbar, or page.

**Render** means React is showing something on the screen.

**State** means information that can change, like a counter number or form text.

**Props** means information passed from one component to another.

**Event** means something the user does, like click, type, submit, hover, or press a key.

**Bug** means the code does something different from what you expected. Bugs are normal. Fixing bugs is part of coding.`,
      },
      {
        type: "code",
        heading: "The Smallest React Idea",
        code: `function Hello() {
  return <h1>Hello, learner!</h1>;
}

// This function is a component.
// It returns what should appear on the page.`,
      },
    ],
  },
  {
    id: "deep-react-thinking",
    icon: "🎓",
    title: "Deep React Thinking",
    color: "#7c3aed",
    sections: [
      {
        type: "theory",
        heading: "When to Go Deeper",
        content: `Go deeper after you can build small apps without copying every line.

You should already understand:
• Components
• JSX
• Props
• State
• Events
• Lists and keys
• Forms
• useEffect
• Routing

Deeper React is less about new magic and more about making better decisions. You learn how to structure state, prevent bugs, improve performance, test behavior, and build apps that stay understandable as they grow.`,
      },
      {
        type: "theory",
        heading: "Better React Thinking",
        content: `Early React asks: "How do I make this work?"

Strong React asks:
• Where should this state live?
• What should be a component?
• What should be a custom hook?
• What happens when loading fails?
• Can this render too often?
• Is this accessible?
• Can another developer understand this later?
• How will this app behave with real users and real data?

The goal is not to write complicated code. The goal is to write code that stays clear when the app becomes complicated.`,
      },
      {
        type: "code",
        heading: "Component Responsibility",
        code: `// Early version: one component does everything.
function Dashboard() {
  // fetch data
  // track filters
  // render header
  // render chart
  // render table
  // render errors
}

// Better version: split by responsibility.
function DashboardPage() {
  const report = useReportData();

  return (
    <DashboardLayout>
      <ReportHeader report={report} />
      <ReportFilters />
      <ReportChart data={report.chartData} />
      <ReportTable rows={report.rows} />
    </DashboardLayout>
  );
}`,
      },
    ],
  },
  {
    id: "state-decisions",
    icon: "🧮",
    title: "State Decisions",
    color: "#db2777",
    sections: [
      {
        type: "theory",
        heading: "Choosing Where State Lives",
        content: `State placement is one of the biggest React skills.

Put state:
• In a component when only that component needs it
• In a parent when multiple children need it
• In context when many distant components need it
• In the URL when users should be able to share or refresh it
• On the server when it belongs to the backend
• In a data-fetching cache when it comes from an API

Bad state placement causes prop drilling, duplicated data, confusing updates, and bugs that are hard to track.`,
      },
      {
        type: "theory",
        heading: "Derived State",
        content: `Derived state means a value can be calculated from existing data.

Do not store derived state unless you really need to.

Example: if you already have \`todos\`, you do not need separate state for \`completedCount\`. You can calculate it during render.

Storing derived values can create bugs because two pieces of state can disagree with each other.`,
      },
      {
        type: "code",
        heading: "Avoid Unnecessary State",
        code: `function TodoStats({ todos }) {
  const completedCount = todos.filter((todo) => todo.done).length;
  const remainingCount = todos.length - completedCount;

  return (
    <section>
      <p>Completed: {completedCount}</p>
      <p>Remaining: {remainingCount}</p>
    </section>
  );
}

// completedCount is derived from todos.
// It does not need its own useState.`,
      },
      {
        type: "code",
        heading: "useReducer for Complex State",
        code: `import { useReducer } from "react";

const initialState = {
  items: [],
  filter: "all",
};

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        ...state,
        items: [...state.items, action.item],
      };
    case "remove":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      };
    case "setFilter":
      return {
        ...state,
        filter: action.filter,
      };
    default:
      return state;
  }
}

export default function TodoApp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function addItem(text) {
    dispatch({
      type: "add",
      item: { id: Date.now(), text, done: false },
    });
  }

  return (
    <button onClick={() => addItem("Practice reducer")}>
      Add todo
    </button>
  );
}`,
      },
    ],
  },
  {
    id: "effect-patterns",
    icon: "🧬",
    title: "Effect Patterns",
    color: "#0891b2",
    sections: [
      {
        type: "theory",
        heading: "You Might Not Need an Effect",
        content: `Strong React developers use fewer effects, not more.

Do not use an effect when:
• You can calculate a value during render
• You are only responding to a button click
• You are copying props into state
• You are formatting display data

Use effects when React must synchronize with something outside React, like a browser API, timer, network request, or subscription.`,
      },
      {
        type: "code",
        heading: "Bad Effect vs Better Code",
        code: `// Bad: fullName is derived state.
function ProfileBad({ firstName, lastName }) {
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    setFullName(firstName + " " + lastName);
  }, [firstName, lastName]);

  return <h1>{fullName}</h1>;
}

// Better: calculate while rendering.
function ProfileGood({ firstName, lastName }) {
  const fullName = firstName + " " + lastName;
  return <h1>{fullName}</h1>;
}`,
      },
      {
        type: "code",
        heading: "Abort a Fetch Request",
        code: `import { useEffect, useState } from "react";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadUser() {
      const response = await fetch("/api/users/" + userId, {
        signal: controller.signal,
      });
      const data = await response.json();
      setUser(data);
    }

    loadUser().catch((error) => {
      if (error.name !== "AbortError") {
        console.error(error);
      }
    });

    return () => controller.abort();
  }, [userId]);

  return <pre>{JSON.stringify(user, null, 2)}</pre>;
}`,
      },
      {
        type: "theory",
        heading: "Effect Cleanup",
        content: `Cleanup runs before an effect runs again and when the component unmounts.

Cleanup prevents:
• Duplicate timers
• Old subscriptions
• Memory leaks
• Updates from old requests
• Event listeners staying active forever

If an effect starts something, ask yourself how it stops.`,
      },
    ],
  },
  {
    id: "architecture",
    icon: "🏛️",
    title: "Architecture",
    color: "#475569",
    sections: [
      {
        type: "theory",
        heading: "Feature-Based Structure",
        content: `Small apps can organize by file type. Bigger apps often organize by feature.

Instead of putting every component in one giant components folder, group related files together.

Feature-based structure helps because:
• Files that change together stay together
• Features are easier to delete or move
• Large apps are easier to navigate
• Teams can work with fewer conflicts`,
      },
      {
        type: "code",
        heading: "Feature Folder Example",
        code: `src/
  app/
    App.jsx
    router.jsx
  features/
    auth/
      LoginPage.jsx
      useAuth.js
      authApi.js
    lessons/
      LessonPage.jsx
      LessonCard.jsx
      useLessons.js
      lessonsApi.js
    progress/
      ProgressBar.jsx
      useProgress.js
  shared/
    components/
      Button.jsx
      Modal.jsx
    utils/
      formatDate.js`,
      },
      {
        type: "theory",
        heading: "Container and Presentational Components",
        content: `A container component handles data and behavior. A presentational component focuses on showing UI.

This pattern is not required everywhere, but it helps when a component is doing too much.

Container:
• Fetches data
• Owns state
• Handles events

Presentational:
• Receives props
• Renders UI
• Stays easy to test and reuse`,
      },
      {
        type: "code",
        heading: "Container and UI Split",
        code: `function UsersContainer() {
  const { users, loading, error } = useUsers();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return <UserList users={users} />;
}

function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`,
      },
    ],
  },
  {
    id: "forms-validation",
    icon: "🧾",
    title: "Forms & Validation",
    color: "#ea580c",
    sections: [
      {
        type: "theory",
        heading: "Real Forms Need More Than Inputs",
        content: `Real forms usually need:
• Field state
• Validation
• Error messages
• Disabled submit while saving
• Server error handling
• Success messages
• Reset behavior
• Accessible labels

For small forms, \`useState\` is enough. For large forms, teams often use libraries like React Hook Form and schema validators like Zod.`,
      },
      {
        type: "code",
        heading: "Manual Validation Pattern",
        code: `import { useState } from "react";

function validate(values) {
  const errors = {};

  if (!values.email.includes("@")) {
    errors.email = "Enter a valid email.";
  }

  if (values.password.length < 8) {
    errors.password = "Password needs at least 8 characters.";
  }

  return errors;
}

export default function SignupForm() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setSaving(true);
    await fakeSignup(values);
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={values.email}
        onChange={(e) => setValues({ ...values, email: e.target.value })}
      />
      {errors.email && <p>{errors.email}</p>}

      <input
        type="password"
        value={values.password}
        onChange={(e) => setValues({ ...values, password: e.target.value })}
      />
      {errors.password && <p>{errors.password}</p>}

      <button disabled={saving}>
        {saving ? "Saving..." : "Create account"}
      </button>
    </form>
  );
}`,
      },
      {
        type: "theory",
        heading: "Form Accessibility",
        content: `Every input should have a label. Error messages should be close to the field they describe.

Good form accessibility:
• Use \`label\` with \`htmlFor\`
• Use clear error text
• Do not rely only on color
• Make keyboard navigation work
• Keep submit buttons readable
• Show loading state while saving`,
      },
    ],
  },
  {
    id: "accessibility",
    icon: "♿",
    title: "Accessibility",
    color: "#16a34a",
    sections: [
      {
        type: "theory",
        heading: "Accessible Apps Help Everyone",
        content: `Accessibility means people can use your app with different bodies, devices, and situations.

This includes people who:
• Use screen readers
• Navigate with a keyboard
• Need high contrast
• Have limited movement
• Are on small screens
• Are in bright sunlight

Accessibility is not an extra decoration. It is part of building a good website.`,
      },
      {
        type: "code",
        heading: "Accessible Button and Dialog Ideas",
        code: `function IconButton({ label, onClick, children }) {
  return (
    <button type="button" aria-label={label} onClick={onClick}>
      {children}
    </button>
  );
}

function DeleteConfirm({ onCancel, onConfirm }) {
  return (
    <section role="dialog" aria-labelledby="delete-title">
      <h2 id="delete-title">Delete lesson?</h2>
      <p>This action cannot be undone.</p>
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onConfirm}>Delete</button>
    </section>
  );
}`,
      },
      {
        type: "theory",
        heading: "Accessibility Checklist",
        content: `Check these before deployment:
• Can you use the app with only the keyboard?
• Is focus visible?
• Do buttons have clear names?
• Do images have useful alt text?
• Do form inputs have labels?
• Is text readable on the background?
• Does the page use proper headings?
• Are clickable things actually buttons or links?`,
      },
    ],
  },
  {
    id: "production-react",
    icon: "🛡️",
    title: "Production React",
    color: "#0f766e",
    sections: [
      {
        type: "theory",
        heading: "Production Means Real Users",
        content: `Production code runs for real people. That means you care about more than "it works on my laptop."

Production concerns:
• Error handling
• Loading states
• Empty states
• Mobile layout
• Accessibility
• Performance
• Security
• Analytics
• Monitoring
• Clear deployment process`,
      },
      {
        type: "theory",
        heading: "Security Fundamentals",
        content: `Frontend security fundamentals:
• Never put private secrets in React code
• Validate important data on the server
• Escape or avoid unsafe HTML
• Use trusted packages
• Keep dependencies updated
• Do not store sensitive tokens carelessly

React escapes normal text by default, which helps prevent many HTML injection problems. Be careful with \`dangerouslySetInnerHTML\`; only use it with trusted or sanitized content.`,
      },
      {
        type: "commands",
        heading: "Production Checks",
        commands: [
          { cmd: "npm run lint", desc: "Find common code problems" },
          { cmd: "npm run build", desc: "Make sure the production build works" },
          { cmd: "npm run preview", desc: "Preview the built app before deploying" },
          { cmd: "npm audit", desc: "Check installed packages for known security issues" },
        ],
      },
      {
        type: "code",
        heading: "Environment Variables in Vite",
        code: `// .env
VITE_PUBLIC_API_URL=https://api.example.com

// React code
const apiUrl = import.meta.env.VITE_PUBLIC_API_URL;

// Important:
// VITE_ variables are available in browser code.
// Do not put private secrets in them.`,
      },
    ],
  },
  {
    id: "interview-prep",
    icon: "💼",
    title: "Interview Prep",
    color: "#1d4ed8",
    sections: [
      {
        type: "theory",
        heading: "React Questions You Should Answer",
        content: `For stronger learning, practice explaining ideas clearly.

Common questions:
• What is the difference between props and state?
• Why do keys matter in lists?
• What problem does context solve?
• When should you use useReducer?
• What does useEffect cleanup do?
• Why can too much context cause re-renders?
• What is controlled input?
• How do you handle loading and errors?
• How do you improve React performance?
• How do you make a component accessible?`,
      },
      {
        type: "theory",
        heading: "Portfolio Project Ideas",
        content: `Build one of these to prove real React skill:
• Admin dashboard with filters and charts
• E-commerce cart with checkout flow
• Auth UI with protected routes
• Kanban board with drag and drop
• Blog editor with preview
• API-powered search with loading and errors
• Multi-step form with validation
• Accessible modal and dropdown system
• Reusable component library
• Testing-focused todo app`,
      },
      {
        type: "code",
        heading: "Explain Code Like This",
        code: `// Good explanation:
// "This state lives in the parent because both the
// filter controls and the result list need it."

function SearchPage() {
  const [query, setQuery] = useState("");

  return (
    <>
      <SearchBox query={query} onQueryChange={setQuery} />
      <SearchResults query={query} />
    </>
  );
}`,
      },
    ],
  },
  {
    id: "web-foundations",
    icon: "🌐",
    title: "Web Foundations",
    color: "#22c55e",
    sections: [
      {
        type: "theory",
        heading: "HTML, CSS, and JavaScript",
        content: `Before React, you should know the three foundation web languages.

**HTML** creates the page structure. It says, "This is a heading. This is a paragraph. This is a button."

**CSS** styles the page. It says, "Make this blue. Put this in the center. Add space around it."

**JavaScript** makes the page interactive. It says, "When the button is clicked, change the message."

React mostly uses JavaScript, but it still creates HTML and uses CSS. React does not replace web foundations. React organizes them.`,
      },
      {
        type: "code",
        heading: "Same Button in Plain Web Code",
        code: `<!-- HTML -->
<button id="saveBtn">Save</button>
<p id="message"></p>

/* CSS */
button {
  background: royalblue;
  color: white;
}

// JavaScript
const button = document.getElementById("saveBtn");
const message = document.getElementById("message");

button.addEventListener("click", () => {
  message.textContent = "Saved!";
});`,
      },
      {
        type: "theory",
        heading: "Why React Helps",
        content: `Plain JavaScript is fine for small pages. But big apps have many buttons, forms, lists, popups, loading states, and pages.

React helps because:
• You split the screen into components
• Each component can manage its own data
• React updates the screen when data changes
• You can reuse the same component many times
• Your app becomes easier to understand as it grows`,
      },
    ],
  },
  {
    id: "setup",
    icon: "🛠️",
    title: "Setup & Commands",
    color: "#f97316",
    sections: [
      {
        type: "theory",
        heading: "What You Need Installed",
        content: `To build React apps, you need **Node.js**. Node lets your computer run JavaScript tools outside the browser.

When you install Node, you also get **npm**. npm downloads packages, which are reusable code made by other developers.

This project uses **Vite**. Vite is a development tool that starts your React app quickly and rebuilds it when you save files.

Important folders and files:
• \`src\` contains your app code
• \`public\` contains files copied directly to the site
• \`package.json\` lists scripts and dependencies
• \`node_modules\` contains installed packages
• \`dist\` is created when you build for production`,
      },
      {
        type: "commands",
        heading: "Commands You Should Know",
        commands: [
          { cmd: "node -v", desc: "Check if Node.js is installed" },
          { cmd: "npm -v", desc: "Check if npm is installed" },
          { cmd: "npm install", desc: "Install all dependencies listed in package.json" },
          { cmd: "npm run dev", desc: "Start the development server" },
          { cmd: "npm run build", desc: "Create a production-ready version" },
          { cmd: "npm run preview", desc: "Preview the production build locally" },
          { cmd: "npm run lint", desc: "Check the code for common mistakes" },
          { cmd: "npm install package-name", desc: "Install one new package" },
          { cmd: "npm uninstall package-name", desc: "Remove one package" },
        ],
      },
      {
        type: "code",
        heading: "Vite Project Structure",
        code: `my-react-app/
  index.html
  package.json
  vite.config.js
  public/
    favicon.svg
  src/
    main.jsx
    App.jsx
    App.css
    components/
      Button.jsx
      Card.jsx
    data/
      lessons.js`,
      },
    ],
  },
  {
    id: "javascript",
    icon: "🧠",
    title: "JavaScript for React",
    color: "#eab308",
    sections: [
      {
        type: "theory",
        heading: "JavaScript You Need for React",
        content: `React code is JavaScript code. You do not need to know every JavaScript feature before starting React, but these foundations matter a lot.

You should understand:
• Variables store values
• Functions store reusable actions
• Arrays store lists
• Objects store labeled data
• Conditions choose what happens
• \`.map()\` turns one list into another list
• Imports and exports share code between files

When React feels confusing, the problem is often a JavaScript concept hiding inside the React code.`,
      },
      {
        type: "code",
        heading: "JavaScript Mini Cheat Sheet",
        code: `const name = "Maya";
let score = 0;

function addOne(number) {
  return number + 1;
}

const user = {
  name: "Maya",
  age: 12,
  isLearning: true,
};

const topics = ["HTML", "CSS", "JavaScript", "React"];

const labels = topics.map((topic) => {
  return topic.toUpperCase();
});

if (score > 10) {
  console.log("Great job!");
} else {
  console.log("Keep practicing!");
}`,
      },
      {
        type: "code",
        heading: "Destructuring and Spread",
        code: `const user = {
  name: "Aarav",
  city: "Delhi",
};

const { name, city } = user;
console.log(name);
console.log(city);

const oldScores = [10, 20, 30];
const newScores = [...oldScores, 40];

const oldUser = { name: "Aarav", points: 5 };
const updatedUser = { ...oldUser, points: 6 };

// Spread copies existing values.
// It is used a lot when updating React state.`,
      },
    ],
  },
  {
    id: "first-app",
    icon: "⚛️",
    title: "Your First React App",
    color: "#06b6d4",
    sections: [
      {
        type: "theory",
        heading: "What React Does",
        content: `React lets you describe the screen using components. You tell React what the screen should look like for the current data. React figures out how to update the browser.

In a Vite React app:
• \`index.html\` contains one empty div with id \`root\`
• \`src/main.jsx\` connects React to that div
• \`App.jsx\` is usually the main component
• Other components are imported into App

React components are JavaScript functions that return JSX.`,
      },
      {
        type: "code",
        heading: "main.jsx and App.jsx",
        code: `// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// App.jsx
export default function App() {
  return (
    <main>
      <h1>My React App</h1>
      <p>I am learning one step at a time.</p>
    </main>
  );
}`,
      },
      {
        type: "theory",
        heading: "StrictMode",
        content: `\`StrictMode\` is a helper from React. It checks your components during development and warns about some unsafe patterns.

Sometimes it makes code run twice in development. That can surprise new learners. It is not your app breaking. React is helping you notice side effects.

You usually leave \`StrictMode\` on while learning and building.`,
      },
    ],
  },
  {
    id: "how-react-works",
    icon: "⚙️",
    title: "How React Works",
    color: "#0ea5e9",
    sections: [
      {
        type: "theory",
        heading: "The Big Idea",
        content: `React works like a smart screen manager.

You write components that describe what the screen should look like. React reads those components, creates a plan for the screen, and updates the browser when data changes.

The simple story:
• You write components
• Components return JSX
• JSX becomes React elements
• React builds a component tree
• State or props change
• React renders again
• React compares what changed
• React updates only the needed parts of the browser page

You do not manually update every paragraph, button, or list item. React does that work for you.`,
      },
      {
        type: "theory",
        heading: "Render, Reconcile, Commit",
        content: `React updates the screen in three important steps.

**Render** means React calls your components to find out what the UI should look like now.

**Reconcile** means React compares the new result with the previous result. It asks, "What changed?"

**Commit** means React applies the needed changes to the real browser DOM.

After that, the browser paints the pixels on the screen.

This is why React apps feel fast. React tries to do the smallest useful update instead of rebuilding the whole page every time.`,
      },
      {
        type: "code",
        heading: "What Happens When State Changes",
        code: `import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}

// 1. First render: button shows "Count: 0"
// 2. User clicks the button
// 3. setCount asks React to update state
// 4. React calls Counter again
// 5. New JSX says "Count: 1"
// 6. React updates the button text in the DOM`,
      },
      {
        type: "theory",
        heading: "Why Keys Matter to React",
        content: `When React renders a list, keys help React recognize each item.

Imagine a teacher checking attendance. If students have names, the teacher knows who moved, who left, and who joined. Without names, the teacher only sees positions in the line.

Keys are like names for list items.

Good keys help React:
• Keep the right item state
• Update lists correctly
• Avoid confusing one item with another
• Work faster when items move, appear, or disappear`,
      },
      {
        type: "code",
        heading: "Component Tree",
        code: `function App() {
  return (
    <Layout>
      <Header />
      <LessonList />
      <Footer />
    </Layout>
  );
}

// React sees a tree like this:
//
// App
//   Layout
//     Header
//     LessonList
//     Footer
//
// When state changes in LessonList,
// React can update that part of the tree.`,
      },
      {
        type: "theory",
        heading: "Important Mental Model",
        content: `Do not think: "I will change the page manually."

Think: "I will change the data, and React will update the page."

In React, the screen is a result of data.

Examples:
• If \`isOpen\` is true, show the menu
• If \`todos\` has items, show the list
• If \`loading\` is true, show loading text
• If \`error\` exists, show the error message

This mental model makes React much easier: data changes first, UI follows.`,
      },
    ],
  },
  {
    id: "jsx",
    icon: "📝",
    title: "JSX",
    color: "#a855f7",
    sections: [
      {
        type: "theory",
        heading: "JSX Means JavaScript Plus Markup",
        content: `JSX looks like HTML inside JavaScript. React uses JSX to describe what should appear on the screen.

JSX rules:
• Return one parent element
• Close every tag
• Use \`className\` instead of \`class\`
• Use \`htmlFor\` instead of \`for\`
• Put JavaScript expressions inside \`{ }\`
• Use camelCase for events like \`onClick\`

JSX is not a string. It becomes JavaScript objects that React understands.`,
      },
      {
        type: "code",
        heading: "JSX Examples",
        code: `export default function Profile() {
  const name = "Zoya";
  const age = 12;
  const isOnline = true;

  return (
    <section className="profile">
      <h1>Hello, {name}</h1>
      <p>Age: {age}</p>

      {isOnline ? (
        <p>Status: online</p>
      ) : (
        <p>Status: offline</p>
      )}

      <label htmlFor="nickname">Nickname</label>
      <input id="nickname" />
    </section>
  );
}`,
      },
      {
        type: "theory",
        heading: "Common JSX Mistakes",
        content: `Beginners often make the same JSX mistakes. That is normal.

Watch for these:
• Writing \`class\` instead of \`className\`
• Returning two sibling elements without a wrapper
• Forgetting to close \`<img />\`, \`<input />\`, or \`<br />\`
• Putting an object directly on the page
• Using \`if\` directly inside JSX instead of before the return

When JSX breaks, read the error slowly. It usually tells you the line where React got confused.`,
      },
    ],
  },
  {
    id: "components",
    icon: "🧩",
    title: "Components",
    color: "#10b981",
    sections: [
      {
        type: "theory",
        heading: "Components Are Reusable Pieces",
        content: `A component is a function that returns JSX. Components help you split a big screen into smaller pieces.

Good components are:
• Named with a capital letter
• Focused on one job
• Easy to reuse
• Easy to read
• Stored in their own file when they get bigger

Examples of components:
• \`Navbar\`
• \`Button\`
• \`ProductCard\`
• \`LoginForm\`
• \`LessonPage\`

Do not make one giant component for the whole app. Split it when it becomes hard to understand.`,
      },
      {
        type: "code",
        heading: "Breaking a Page Into Components",
        code: `function Header() {
  return <h1>Book Club</h1>;
}

function BookCard({ title, author }) {
  return (
    <article>
      <h2>{title}</h2>
      <p>Written by {author}</p>
    </article>
  );
}

export default function App() {
  return (
    <main>
      <Header />
      <BookCard title="Matilda" author="Roald Dahl" />
      <BookCard title="Wonder" author="R. J. Palacio" />
    </main>
  );
}`,
      },
      {
        type: "theory",
        heading: "Component File Pattern",
        content: `A common pattern is one component per file.

Example:
• \`src/components/Header.jsx\`
• \`src/components/BookCard.jsx\`
• \`src/pages/HomePage.jsx\`

Use \`export default\` when the file exports one main thing. Use named exports when a file exports many things.

React does not force one perfect folder structure. Choose a structure that helps humans find code quickly.`,
      },
    ],
  },
  {
    id: "props",
    icon: "📦",
    title: "Props",
    color: "#f59e0b",
    sections: [
      {
        type: "theory",
        heading: "Props Pass Information Down",
        content: `Props are values passed from a parent component to a child component.

Imagine a parent giving instructions:
• "Button, your text is Save"
• "Card, your title is React Foundations"
• "Avatar, your image is this URL"

Props are read-only. A child component should not change its props. If something needs to change, use state in the parent or child.

Props can be:
• Strings
• Numbers
• Booleans
• Arrays
• Objects
• Functions
• JSX`,
      },
      {
        type: "code",
        heading: "Props in Action",
        code: `function Badge({ text, color = "blue" }) {
  return (
    <span style={{ backgroundColor: color }}>
      {text}
    </span>
  );
}

function StudentCard({ student, onAwardPoint }) {
  return (
    <article>
      <h2>{student.name}</h2>
      <p>Points: {student.points}</p>
      <Badge text="Learner" color="green" />
      <button onClick={onAwardPoint}>Add point</button>
    </article>
  );
}

export default function App() {
  const student = { name: "Mina", points: 7 };

  return (
    <StudentCard
      student={student}
      onAwardPoint={() => alert("Point added!")}
    />
  );
}`,
      },
      {
        type: "theory",
        heading: "Children Prop",
        content: `React has a special prop called \`children\`. It means "whatever is placed between the opening and closing component tags."

This is useful for wrapper components like cards, layouts, modals, and buttons.

If you build a \`Panel\` component, you should not need a special prop for every paragraph inside it. You can use \`children\`.`,
      },
      {
        type: "code",
        heading: "Using children",
        code: `function Panel({ title, children }) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function App() {
  return (
    <Panel title="Today&apos;s Goal">
      <p>Learn props.</p>
      <button>Start</button>
    </Panel>
  );
}`,
      },
    ],
  },
  {
    id: "state",
    icon: "🔄",
    title: "State & useState",
    color: "#ec4899",
    sections: [
      {
        type: "theory",
        heading: "State Is Memory for a Component",
        content: `State is data that can change while the app is running.

Examples of state:
• A counter number
• Text typed into an input
• Whether a menu is open
• Which tab is selected
• A list of todo items

When state changes, React renders the component again with the new value.

The \`useState\` hook gives you two things:
• The current value
• A setter function that changes the value`,
      },
      {
        type: "code",
        heading: "Counter With useState",
        code: `import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <section>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Add 1
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </section>
  );
}`,
      },
      {
        type: "theory",
        heading: "Updating From the Previous Value",
        content: `Sometimes the new state depends on the old state. In that case, pass a function to the setter.

Use this pattern:
\`setCount((oldCount) => oldCount + 1)\`

This is safer when React groups multiple updates together.`,
      },
      {
        type: "code",
        heading: "Object and Array State",
        code: `const [user, setUser] = useState({
  name: "Sam",
  points: 0,
});

setUser((oldUser) => {
  return { ...oldUser, points: oldUser.points + 1 };
});

const [todos, setTodos] = useState(["Learn JSX"]);

setTodos((oldTodos) => {
  return [...oldTodos, "Practice state"];
});

// Do not directly change arrays or objects in state.
// Make a copy, then change the copy.`,
      },
    ],
  },
  {
    id: "events",
    icon: "🖱️",
    title: "Events & Forms",
    color: "#84cc16",
    sections: [
      {
        type: "theory",
        heading: "Events Are User Actions",
        content: `Events happen when the user interacts with the page.

Common events:
• \`onClick\` for clicks
• \`onChange\` for input changes
• \`onSubmit\` for form submission
• \`onKeyDown\` for keyboard presses
• \`onFocus\` when an input is selected
• \`onBlur\` when an input is left

In React, event names use camelCase. Write \`onClick\`, not \`onclick\`.`,
      },
      {
        type: "code",
        heading: "Controlled Form",
        code: `import { useState } from "react";

export default function NameForm() {
  const [name, setName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    alert("Hello " + name);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button type="submit">Say hello</button>
    </form>
  );
}`,
      },
      {
        type: "theory",
        heading: "Controlled vs Uncontrolled",
        content: `A **controlled input** gets its value from React state. React is the boss of the input.

An **uncontrolled input** stores its value in the browser DOM. You read it later using a ref.

Most forms should be controlled when the value needs to be displayed, validated, reset, or sent to an API.`,
      },
    ],
  },
  {
    id: "lists",
    icon: "📋",
    title: "Lists & Keys",
    color: "#0ea5e9",
    sections: [
      {
        type: "theory",
        heading: "Rendering Lists",
        content: `Apps show lists all the time: messages, products, lessons, comments, search results, and menu items.

In React, you usually use \`.map()\` to turn an array of data into an array of JSX.

Each item needs a **key**. A key helps React know which item is which when the list changes.

Good keys:
• Database id
• Stable slug
• Unique name if it truly never repeats

Avoid using the array index as a key when items can be added, removed, or reordered.`,
      },
      {
        type: "code",
        heading: "List Rendering",
        code: `const lessons = [
  { id: "html", title: "HTML" },
  { id: "css", title: "CSS" },
  { id: "js", title: "JavaScript" },
];

export default function LessonList() {
  return (
    <ul>
      {lessons.map((lesson) => (
        <li key={lesson.id}>
          {lesson.title}
        </li>
      ))}
    </ul>
  );
}`,
      },
      {
        type: "code",
        heading: "Add and Remove Items",
        code: `import { useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Read theory" },
    { id: 2, text: "Write code" },
  ]);

  function addTodo() {
    const nextTodo = {
      id: Date.now(),
      text: "New task",
    };
    setTodos((oldTodos) => [...oldTodos, nextTodo]);
  }

  function removeTodo(id) {
    setTodos((oldTodos) => {
      return oldTodos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <section>
      <button onClick={addTodo}>Add todo</button>
      {todos.map((todo) => (
        <p key={todo.id}>
          {todo.text}
          <button onClick={() => removeTodo(todo.id)}>Remove</button>
        </p>
      ))}
    </section>
  );
}`,
      },
    ],
  },
  {
    id: "conditional",
    icon: "🚦",
    title: "Conditional UI",
    color: "#ef4444",
    sections: [
      {
        type: "theory",
        heading: "Showing Different Things",
        content: `Conditional rendering means showing different UI depending on data.

Examples:
• If loading, show "Loading..."
• If error, show an error message
• If logged in, show the dashboard
• If logged out, show the login page
• If cart is empty, show an empty state

Use normal JavaScript before the return when the condition is big. Use ternaries or \`&&\` for small conditions inside JSX.`,
      },
      {
        type: "code",
        heading: "Three Common Patterns",
        code: `function Status({ loading, error, user }) {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong.</p>;
  }

  return (
    <section>
      {user ? (
        <h1>Welcome, {user.name}</h1>
      ) : (
        <button>Log in</button>
      )}

      {user && <p>You are signed in.</p>}
    </section>
  );
}`,
      },
      {
        type: "theory",
        heading: "Do Not Hide Important Logic",
        content: `It is possible to write very clever one-line conditions. Clever code is not always good code.

Choose code that a tired human can read.

If JSX becomes messy:
• Move logic above the return
• Create a small helper variable
• Split part of the UI into another component`,
      },
    ],
  },
  {
    id: "effects",
    icon: "🪝",
    title: "useEffect",
    color: "#14b8a6",
    sections: [
      {
        type: "theory",
        heading: "Effects Connect React to the Outside World",
        content: `\`useEffect\` runs code after React updates the screen.

Use effects for things outside React:
• Fetching data
• Setting document title
• Starting timers
• Listening to window events
• Connecting to subscriptions

Do not use \`useEffect\` for everything. If you can calculate a value during render, calculate it during render.`,
      },
      {
        type: "code",
        heading: "Effect Examples",
        code: `import { useEffect, useState } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return <p>{time.toLocaleTimeString()}</p>;
}

function PageTitle({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return <h1>{title}</h1>;
}`,
      },
      {
        type: "theory",
        heading: "Dependency Array",
        content: `The dependency array controls when an effect runs.

Patterns:
• No array means run after every render
• Empty array \`[]\` means run once after mount
• \`[userId]\` means run after mount and whenever \`userId\` changes

If your effect uses a value from the component, that value usually belongs in the dependency array.`,
      },
    ],
  },
  {
    id: "data-fetching",
    icon: "📡",
    title: "Data Fetching",
    color: "#6366f1",
    sections: [
      {
        type: "theory",
        heading: "Getting Data From an API",
        content: `Many apps get data from a server. The server might send users, videos, posts, products, scores, or messages.

A good data-fetching UI handles:
• Loading state
• Success state
• Error state
• Empty state

Never assume the request will always work. Internet connections fail. Servers fail. Good apps explain what happened.`,
      },
      {
        type: "code",
        heading: "Fetch With Loading and Error",
        code: `import { useEffect, useState } from "react";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const data = await response.json();
        setPosts(data.slice(0, 5));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;
  if (posts.length === 0) return <p>No posts found.</p>;

  return posts.map((post) => (
    <article key={post.id}>
      <h2>{post.title}</h2>
    </article>
  ));
}`,
      },
      {
        type: "theory",
        heading: "API Safety",
        content: `Do not put private secrets directly in frontend React code. Browser code is visible to users.

Safe in frontend:
• Public API URLs
• Public images
• Public feature flags

Not safe in frontend:
• Passwords
• Private API keys
• Database credentials
• Secret tokens

Secrets belong on a server, not in a React component.`,
      },
    ],
  },
  {
    id: "styling",
    icon: "🎨",
    title: "Styling React",
    color: "#d946ef",
    sections: [
      {
        type: "theory",
        heading: "Ways to Style React",
        content: `React does not force one styling method. This project uses regular CSS files.

Common styling choices:
• Plain CSS files
• CSS Modules
• Sass
• Tailwind CSS
• CSS-in-JS libraries
• Component library styles

Start with plain CSS. Learn layout, spacing, colors, typography, hover states, and responsive design before chasing fancy tools.`,
      },
      {
        type: "code",
        heading: "CSS Classes",
        code: `// Button.jsx
export default function Button({ variant = "primary", children }) {
  return (
    <button className={"btn btn-" + variant}>
      {children}
    </button>
  );
}

/* Button.css */
.btn {
  border: 0;
  border-radius: 8px;
  padding: 10px 14px;
  font-weight: 700;
}

.btn-primary {
  background: royalblue;
  color: white;
}

.btn-danger {
  background: crimson;
  color: white;
}`,
      },
      {
        type: "theory",
        heading: "Responsive Design",
        content: `Responsive design means your app works on different screen sizes.

Think about:
• Phone screens
• Tablet screens
• Laptop screens
• Long text
• Big lists
• Buttons that are easy to tap

Use CSS tools like flexbox, grid, \`max-width\`, \`min-width\`, and media queries. Always test by making the browser narrow and wide.`,
      },
    ],
  },
  {
    id: "refs",
    icon: "📌",
    title: "useRef",
    color: "#64748b",
    sections: [
      {
        type: "theory",
        heading: "Refs Remember Without Re-rendering",
        content: `\`useRef\` gives you a small container with a \`.current\` property.

Refs are useful for:
• Focusing an input
• Reading a DOM element
• Storing a timer id
• Remembering a value without causing a re-render

Changing state re-renders the component. Changing a ref does not re-render the component.`,
      },
      {
        type: "code",
        heading: "Focus an Input",
        code: `import { useRef } from "react";

export default function SearchBox() {
  const inputRef = useRef(null);

  function focusSearch() {
    inputRef.current.focus();
  }

  return (
    <section>
      <input ref={inputRef} placeholder="Search..." />
      <button onClick={focusSearch}>Focus search</button>
    </section>
  );
}`,
      },
      {
        type: "code",
        heading: "Store a Timer Id",
        code: `import { useRef } from "react";

function TimerButtons() {
  const timerRef = useRef(null);

  function start() {
    timerRef.current = setInterval(() => {
      console.log("tick");
    }, 1000);
  }

  function stop() {
    clearInterval(timerRef.current);
  }

  return (
    <>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </>
  );
}`,
      },
    ],
  },
  {
    id: "context",
    icon: "🌍",
    title: "Context",
    color: "#f43f5e",
    sections: [
      {
        type: "theory",
        heading: "Context Avoids Prop Drilling",
        content: `Prop drilling means passing props through many components that do not really need them, just to reach a child deep inside.

Context lets a parent provide a value to many children.

Use context for app-wide values like:
• Theme
• Current user
• Language
• Shopping cart

Do not put every piece of state in context. Local state should stay local when only one small part of the app needs it.`,
      },
      {
        type: "code",
        heading: "Theme Context",
        code: `import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme((oldTheme) => {
      return oldTheme === "light" ? "dark" : "light";
    });
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

function Toolbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}`,
      },
      {
        type: "theory",
        heading: "Custom Context Hook",
        content: `Many projects create a custom hook like \`useTheme\` or \`useAuth\`.

This makes components cleaner because they do not need to import both \`useContext\` and the context object.

It also gives you one place to add helpful error messages later.`,
      },
    ],
  },
  {
    id: "router",
    icon: "🗺️",
    title: "Routing",
    color: "#8b5cf6",
    sections: [
      {
        type: "theory",
        heading: "Routing Means Pages",
        content: `A React app can feel like many pages even though the browser loads one main app.

Routing lets URLs show different components:
• \`/\` shows Home
• \`/about\` shows About
• \`/products/42\` shows one product

The popular library is \`react-router-dom\`. It is not built into React. You install it separately.`,
      },
      {
        type: "commands",
        heading: "Install Router",
        commands: [
          { cmd: "npm install react-router-dom", desc: "Install React Router" },
        ],
      },
      {
        type: "code",
        heading: "Router Setup",
        code: `import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";

function Home() {
  return <h1>Home</h1>;
}

function About() {
  return <h1>About</h1>;
}

function Product() {
  const { id } = useParams();
  return <h1>Product {id}</h1>;
}

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products/:id" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}`,
      },
    ],
  },
  {
    id: "custom-hooks",
    icon: "🔁",
    title: "Custom Hooks",
    color: "#0891b2",
    sections: [
      {
        type: "theory",
        heading: "Reusable Logic",
        content: `A custom hook is a function that starts with \`use\` and uses React hooks inside.

Custom hooks are for reusing logic, not UI.

Good custom hook examples:
• \`useLocalStorage\`
• \`useWindowSize\`
• \`useFetch\`
• \`useProgress\`
• \`useDebounce\`

This project already has \`useProgress\`. It stores completed chapters in \`localStorage\`.`,
      },
      {
        type: "code",
        heading: "useLocalStorage Hook",
        code: `import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function Notes() {
  const [note, setNote] = useLocalStorage("note", "");

  return (
    <textarea
      value={note}
      onChange={(event) => setNote(event.target.value)}
    />
  );
}`,
      },
      {
        type: "theory",
        heading: "When to Make a Custom Hook",
        content: `Make a custom hook when:
• The same stateful logic appears in multiple places
• A component is becoming hard to read
• You can give the behavior a clear name

Do not create custom hooks too early. First write the feature once. If the pattern repeats, extract it.`,
      },
    ],
  },
  {
    id: "performance",
    icon: "⚡",
    title: "Performance",
    color: "#14b8a6",
    sections: [
      {
        type: "theory",
        heading: "Do Not Optimize Too Early",
        content: `React is fast enough for many apps. Beginners often worry about performance before they need to.

First, write clear code. Then optimize when you notice real slowness.

Common tools:
• \`React.memo\` skips child re-renders when props are the same
• \`useMemo\` caches expensive calculations
• \`useCallback\` caches function references
• \`React.lazy\` loads code only when needed

Optimization can make code harder to read, so use it for a reason.`,
      },
      {
        type: "code",
        heading: "useMemo and memo",
        code: `import { memo, useMemo, useState } from "react";

const ScoreList = memo(function ScoreList({ scores }) {
  return (
    <ul>
      {scores.map((score) => (
        <li key={score}>{score}</li>
      ))}
    </ul>
  );
});

export default function GameStats({ scores }) {
  const [name, setName] = useState("");

  const total = useMemo(() => {
    return scores.reduce((sum, score) => sum + score, 0);
  }, [scores]);

  return (
    <section>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <p>Total score: {total}</p>
      <ScoreList scores={scores} />
    </section>
  );
}`,
      },
      {
        type: "theory",
        heading: "Simple Performance Habits",
        content: `Good habits help before heavier optimization.

Try this:
• Keep state close to where it is used
• Avoid huge components
• Give list items stable keys
• Avoid doing slow calculations on every render
• Load big pages only when needed
• Measure before changing performance code`,
      },
    ],
  },
  {
    id: "errors-debugging",
    icon: "🧯",
    title: "Errors & Debugging",
    color: "#dc2626",
    sections: [
      {
        type: "theory",
        heading: "Debugging Is a Skill",
        content: `Debugging means finding and fixing problems. Every developer debugs, even experts.

A calm debugging process:
• Read the error message
• Find the file and line number
• Check the spelling of names
• Check imports and exports
• Check props being passed
• Use \`console.log\` to inspect values
• Undo the last change if needed

Do not panic when the screen turns blank. The error message is a clue.`,
      },
      {
        type: "code",
        heading: "Common React Errors",
        code: `// Error: Component name starts lowercase
function profile() {
  return <h1>Profile</h1>;
}

// Fix
function Profile() {
  return <h1>Profile</h1>;
}

// Error: map on undefined
function List({ items }) {
  return items.map((item) => <p>{item}</p>);
}

// Fix with default value
function SafeList({ items = [] }) {
  return items.map((item) => <p key={item}>{item}</p>);
}

// Error: forgot to return JSX
function Card() {
  <h2>Title</h2>;
}

// Fix
function BetterCard() {
  return <h2>Title</h2>;
}`,
      },
      {
        type: "theory",
        heading: "React DevTools",
        content: `React DevTools is a browser extension. It lets you inspect components, props, state, and renders.

Use it to answer:
• Which component is showing this UI?
• What props did this component receive?
• What state does this component have?
• Did this component render again?

It is one of the best tools for understanding a React app.`,
      },
    ],
  },
  {
    id: "testing",
    icon: "🧪",
    title: "Testing",
    color: "#65a30d",
    sections: [
      {
        type: "theory",
        heading: "Why Tests Exist",
        content: `Tests are code that checks your app code.

Tests help you:
• Catch bugs earlier
• Change code with more confidence
• Prove important behavior works
• Document what the app should do

React projects often use **Vitest** and **React Testing Library**. Tests should act like a user when possible: find text, click buttons, type into inputs, and check the result.`,
      },
      {
        type: "commands",
        heading: "Install Testing Tools",
        commands: [
          { cmd: "npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom", desc: "Install common React test tools" },
        ],
      },
      {
        type: "code",
        heading: "Example Test",
        code: `import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import Counter from "./Counter";

test("adds one when button is clicked", async () => {
  render(<Counter />);

  const button = screen.getByRole("button", { name: "Add 1" });
  await userEvent.click(button);

  expect(screen.getByText("Count: 1")).toBeInTheDocument();
});`,
      },
      {
        type: "theory",
        heading: "What to Test First",
        content: `Start by testing important user behavior.

Good first tests:
• A button changes text
• A form shows an error
• A list displays data
• A loading state appears
• A completed item is marked complete

Do not test every tiny implementation detail. Test what users care about.`,
      },
    ],
  },
  {
    id: "project-structure",
    icon: "🏗️",
    title: "Project Structure",
    color: "#0f766e",
    sections: [
      {
        type: "theory",
        heading: "Where Code Should Go",
        content: `As an app grows, file organization matters.

A simple structure:
• \`components\` for reusable UI
• \`pages\` for route screens
• \`hooks\` for custom hooks
• \`data\` for local data
• \`utils\` for helper functions
• \`assets\` for images and icons
• \`styles\` for shared CSS

Do not obsess over folders at the beginning. A clear small structure is better than a complicated one.`,
      },
      {
        type: "code",
        heading: "Example Folder Layout",
        code: `src/
  App.jsx
  main.jsx
  components/
    Button.jsx
    EmptyState.jsx
    Modal.jsx
  pages/
    HomePage.jsx
    LessonsPage.jsx
    NotFoundPage.jsx
  hooks/
    useLocalStorage.js
    useProgress.js
  data/
    chapters.js
  utils/
    formatDate.js
  assets/
    logo.svg`,
      },
      {
        type: "theory",
        heading: "Naming Tips",
        content: `Names should explain purpose.

Good names:
• \`LessonCard\`
• \`UserMenu\`
• \`submitForm\`
• \`completedChapters\`
• \`isSidebarOpen\`

Weak names:
• \`Thing\`
• \`data2\`
• \`handleStuff\`
• \`x\`
• \`newComponent\`

Good names make code easier before you add comments.`,
      },
    ],
  },
  {
    id: "build-deploy",
    icon: "🚀",
    title: "Build & Deploy",
    color: "#2563eb",
    sections: [
      {
        type: "theory",
        heading: "Development vs Production",
        content: `During development, Vite runs a dev server. It updates quickly when you save.

For real users, you create a production build. The build is smaller, optimized, and placed in the \`dist\` folder.

Deployment means putting that production build on the internet.

Popular places to deploy React apps:
• Vercel
• Netlify
• GitHub Pages
• Cloudflare Pages
• Your own server`,
      },
      {
        type: "commands",
        heading: "Build Commands",
        commands: [
          { cmd: "npm run lint", desc: "Check for common code mistakes before shipping" },
          { cmd: "npm run build", desc: "Create the production files in dist" },
          { cmd: "npm run preview", desc: "Preview the production build locally" },
        ],
      },
      {
        type: "theory",
        heading: "Before You Share an App",
        content: `Before deployment, check:
• The app builds without errors
• Links and buttons work
• Mobile layout is readable
• Loading and error states look okay
• No private secrets are in the frontend
• The page title and favicon are correct
• The console has no surprising errors

Shipping is part of learning. A small finished app teaches more than ten unfinished tutorials.`,
      },
    ],
  },
  {
    id: "practice-plan",
    icon: "📚",
    title: "Practice Plan",
    color: "#9333ea",
    sections: [
      {
        type: "theory",
        heading: "How to Practice",
        content: `You learn React by building. Reading helps, but building makes the ideas stick.

Practice order:
• Copy a small example exactly
• Change text and colors
• Add one new prop
• Add one new state value
• Add a list
• Add a form
• Save something in localStorage
• Build a small complete app

Small projects are not childish. They are how skills become automatic.`,
      },
      {
        type: "theory",
        heading: "Beginner Projects",
        content: `Build these without rushing:
• Counter with reset button
• Todo list
• Flashcard app
• Quiz app
• Notes app with localStorage
• Weather UI with fake data first
• Movie search using an API
• Expense tracker
• Habit tracker
• Mini learning dashboard like this project

For each project, ask: what is state, what are props, what is a component, and what events can happen?`,
      },
      {
        type: "code",
        heading: "Tiny Project Starter",
        code: `import { useState } from "react";

export default function Flashcards() {
  const cards = [
    { question: "What is JSX?", answer: "JavaScript plus markup" },
    { question: "What is state?", answer: "Data that can change" },
  ];

  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const card = cards[index];

  function nextCard() {
    setShowAnswer(false);
    setIndex((oldIndex) => {
      return (oldIndex + 1) % cards.length;
    });
  }

  return (
    <main>
      <h1>{card.question}</h1>
      {showAnswer && <p>{card.answer}</p>}
      <button onClick={() => setShowAnswer(true)}>
        Show answer
      </button>
      <button onClick={nextCard}>Next</button>
    </main>
  );
}`,
      },
      {
        type: "theory",
        heading: "You Are Ready When",
        content: `You are ready to build your own React app when you can explain these without reading:
• What a component is
• What JSX is
• How props move data
• How state changes the screen
• How events work
• How lists use keys
• Why effects exist
• How to read an error message

You do not need to know everything. You need enough to keep going and learn the next thing.`,
      },
    ],
  },
  {
    id: "reading-code",
    icon: "🔎",
    title: "How to Read React Code",
    color: "#38bdf8",
    sections: [
      {
        type: "theory",
        heading: "Read Code in a Calm Order",
        content: `Many students get stuck because they try to understand every symbol at once. Do not read React code like a paragraph. Read it like a map.

Use this order:
• Find the component name
• Find the props it receives
• Find the state values
• Find the event functions
• Find what JSX is returned
• Follow one user action from click to screen update

If a component looks scary, cover half the screen and read only one small block at a time.`,
      },
      {
        type: "code",
        heading: "Read This Step by Step",
        code: `import { useState } from "react";

function LikeButton({ startingLikes }) {
  const [likes, setLikes] = useState(startingLikes);
  const [liked, setLiked] = useState(false);

  function handleClick() {
    if (liked) {
      setLikes((oldLikes) => oldLikes - 1);
    } else {
      setLikes((oldLikes) => oldLikes + 1);
    }

    setLiked((oldLiked) => !oldLiked);
  }

  return (
    <button onClick={handleClick}>
      {liked ? "Unlike" : "Like"} ({likes})
    </button>
  );
}

// 1. Component name: LikeButton
// 2. Prop: startingLikes
// 3. State: likes and liked
// 4. Event: handleClick
// 5. UI: one button
// 6. User action: click changes liked and likes`,
      },
      {
        type: "theory",
        heading: "Trace One Click",
        content: `When a user clicks a button, ask:
• Which element was clicked?
• Which event handler runs?
• Which state setter is called?
• What is the new state?
• What JSX changes after React renders again?

This turns confusing code into a story. React apps are mostly stories about data changing and the screen updating.`,
      },
    ],
  },
  {
    id: "terminal-errors",
    icon: "🧰",
    title: "Terminal & Error Help",
    color: "#f97316",
    sections: [
      {
        type: "theory",
        heading: "Where Students Often Get Stuck",
        content: `A lot of React problems are not React problems. They are setup, terminal, spelling, or file problems.

Common stuck points:
• Running a command in the wrong folder
• Forgetting \`npm install\`
• The dev server is not running
• A package is missing
• A file path is typed wrong
• A component was not exported
• A component was not imported
• A tag is not closed
• The browser is showing an old error until you save again

When something breaks, slow down. The computer is usually telling you exactly where it got confused.`,
      },
      {
        type: "commands",
        heading: "Troubleshooting Commands",
        commands: [
          { cmd: "pwd", desc: "Show the folder you are currently inside" },
          { cmd: "ls", desc: "Show files and folders in the current folder" },
          { cmd: "npm install", desc: "Install missing project dependencies" },
          { cmd: "npm run dev", desc: "Start the development server" },
          { cmd: "npm run lint", desc: "Find common code mistakes" },
          { cmd: "npm run build", desc: "Check if the app can be built for deployment" },
          { cmd: "Ctrl + C", desc: "Stop a running terminal server" },
        ],
      },
      {
        type: "theory",
        heading: "How to Read an Error Message",
        content: `Read an error from top to bottom, but look for these four clues:
• File name
• Line number
• Error type
• The word or symbol it complains about

Example: \`App.jsx:12:5\` means the problem is probably in \`App.jsx\`, near line 12, column 5.

Do not copy random fixes without understanding them. First ask: what is the error saying is missing, wrong, or unexpected?`,
      },
      {
        type: "code",
        heading: "Error Fix Examples",
        code: `// Error: Button is not defined
// Cause: forgot to import Button
import Button from "./components/Button.jsx";

// Error: Expected corresponding JSX closing tag
// Cause: opened <section> but closed </div>
function Card() {
  return (
    <section>
      <h2>Hello</h2>
    </section>
  );
}

// Error: Cannot read properties of undefined
// Cause: trying to use data before it exists
function UserName({ user }) {
  return <p>{user?.name ?? "No user yet"}</p>;
}`,
      },
    ],
  },
  {
    id: "exercises-checkpoints",
    icon: "✅",
    title: "Exercises & Checkpoints",
    color: "#65a30d",
    sections: [
      {
        type: "theory",
        heading: "Use Checkpoints After Each Topic",
        content: `A student may read a chapter and think, "I understand," but then get stuck when writing code. Checkpoints fix that.

After each chapter, do three things:
• Say the idea in your own words
• Change the example code
• Build a tiny version without looking

If you cannot do those yet, that chapter is not failed. It just needs one more practice round.`,
      },
      {
        type: "theory",
        heading: "Checkpoint Questions",
        content: `Ask yourself:
• What is the component showing?
• What data does it need?
• Is the data a prop or state?
• What can the user click, type, or submit?
• What should change on the screen?
• Does this need an effect, or can it be calculated directly?
• What should happen if the data is empty?
• What should happen if something fails?`,
      },
      {
        type: "code",
        heading: "Exercise: Make a Score Keeper",
        code: `import { useState } from "react";

export default function ScoreKeeper() {
  const [player, setPlayer] = useState("Player 1");
  const [score, setScore] = useState(0);

  return (
    <main>
      <input
        value={player}
        onChange={(event) => setPlayer(event.target.value)}
      />

      <h1>{player}: {score}</h1>

      <button onClick={() => setScore(score + 1)}>Add point</button>
      <button onClick={() => setScore(0)}>Reset</button>
    </main>
  );
}

// Try this:
// 1. Add a second player
// 2. Add a button to subtract a point
// 3. Show "Winner!" when score reaches 10
// 4. Disable subtract when score is 0`,
      },
      {
        type: "theory",
        heading: "Mini Quiz",
        content: `Answer before moving on:
• If a value changes on screen, should it probably be state?
• If a parent sends data to a child, what is that data called?
• If you render an array, why does each item need a key?
• If a request is loading, what should the user see?
• If a form has an input, why does a label matter?

If you can answer these in simple words, you are learning correctly.`,
      },
    ],
  },
  {
    id: "final-project",
    icon: "🏁",
    title: "Final Project",
    color: "#2563eb",
    sections: [
      {
        type: "theory",
        heading: "Build One Complete App",
        content: `A complete course should end with one project that uses everything together.

Final project idea: **Study Buddy**

It should have:
• A list of study topics
• Add topic form
• Mark topic complete
• Filter all, active, and complete topics
• Save progress in localStorage
• Show empty states
• Show clear buttons and labels
• Work on mobile

This project uses components, props, state, events, forms, lists, conditional UI, custom hooks, localStorage, styling, debugging, and deployment.`,
      },
      {
        type: "code",
        heading: "Final Project Starter",
        code: `import { useEffect, useState } from "react";

function useSavedState(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default function StudyBuddy() {
  const [topics, setTopics] = useSavedState("topics", []);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  function addTopic(event) {
    event.preventDefault();
    if (text.trim() === "") return;

    setTopics([
      ...topics,
      { id: Date.now(), text: text.trim(), done: false },
    ]);
    setText("");
  }

  function toggleTopic(id) {
    setTopics(
      topics.map((topic) =>
        topic.id === id ? { ...topic, done: !topic.done } : topic
      )
    );
  }

  const visibleTopics = topics.filter((topic) => {
    if (filter === "active") return !topic.done;
    if (filter === "complete") return topic.done;
    return true;
  });

  return (
    <main>
      <h1>Study Buddy</h1>

      <form onSubmit={addTopic}>
        <label htmlFor="topic">New topic</label>
        <input
          id="topic"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button>Add</button>
      </form>

      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("active")}>Active</button>
      <button onClick={() => setFilter("complete")}>Complete</button>

      {visibleTopics.length === 0 ? (
        <p>No topics here yet.</p>
      ) : (
        visibleTopics.map((topic) => (
          <label key={topic.id}>
            <input
              type="checkbox"
              checked={topic.done}
              onChange={() => toggleTopic(topic.id)}
            />
            {topic.text}
          </label>
        ))
      )}
    </main>
  );
}`,
      },
      {
        type: "theory",
        heading: "Final Project Upgrade List",
        content: `After the starter works, improve it:
• Add delete buttons
• Add edit topic
• Add due dates
• Add search
• Add completed percentage
• Split it into smaller components
• Move localStorage logic into a hook
• Add tests for adding and completing topics
• Make the layout responsive
• Deploy it and share the link

If a student can build and explain this project, they are no longer just watching React. They are using React.`,
      },
    ],
  },
];

export const chapters = enhanceChapters(courseChapters);
