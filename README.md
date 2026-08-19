# AI Work Companion

Build a professional, modern web application called "AI Workplace Productivity Assistant". Use a clean SaaS aesthetic with a dark sidebar navigation and a light grey background for the main content area. 

The app must function as a single-page dashboard with the following features:

1. Sidebar Navigation:

- Include links for: Dashboard Overview, Email Generator, Meeting Summarizer, Task Planner, and Settings.

- Responsive design: Collapse into a hamburger menu on mobile screens.

2. Feature 1: Smart Email Generator

- UI Layout: Two-column layout. Left column has inputs; right column shows the generated output.

- Inputs: A textarea for "Core Message/Context", a dropdown for "Select Tone" (Formal, Friendly, Persuasive), and a input for "Recipient Name".

- Action: A button that says "Generate Draft".

- Output: A card displaying the generated email text. The text must be inside an editable textarea so the user can modify it. Include a "Copy to Clipboard" button.

3. Feature 2: Meeting Notes Summarizer

- UI Layout: Top section for input, bottom section for organized outputs.

- Inputs: A large text area for "Paste Meeting Transcript/Notes".

- Action: A button that says "Summarize & Extract".

- Output: Three clean cards or tabs labeled: "Executive Summary", "Action Items & Deadlines", and "Key Decisions Made". Fill these with realistic bullet points when simulated.

4. Feature 3: AI Task Planner & Scheduler

- UI Layout: Grid system. Left side is the planner tool; right side is a visual Kanban board or daily schedule view.

- Inputs: A text field for "Enter Tasks/To-Do List" and a dropdown for "Time Horizon" (Daily, Weekly).

- Action: A button that says "Optimize Schedule".

- Output: A beautifully organized list of tasks categorized into "High Priority", "Medium Priority", and "Low Priority", automatically mapped onto a calendar layout or Kanban columns.

5. Global Requirements:

- At the bottom of every page or in a sticky footer, include an alert banner labeled "Responsible AI Disclaimer: This tool uses AI to assist your workflow. Please review and verify all generated content before sending or implementing."

- Use modern UI components (like Shadcn UI style), smooth transitions between tabs, and professional typography.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://task-and-talk-ai.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/bcb24c6d-9e05-43cc-82fe-b6affeabe37d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
