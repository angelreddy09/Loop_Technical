# Asana-like Demo App - Playwright Data-Driven Framework

This repository contains a Playwright + TypeScript test framework for the assessment.
The suite is data-driven: all board scenarios are stored in `test-data/task-scenarios.json`, and one reusable test dynamically validates every scenario.

## Tech stack

- TypeScript
- Playwright Test
- JSON-based test data
- Page Object Model
- GitHub Actions CI
- HTML, JUnit, screenshot, video, and trace reporting

## Demo app

```text
https://create-asana-like-pr-39y5.bolt.host/
```

## Credentials

```text
Username: admin
Password: password123
```

## Project structure

```text
.
├── .github/workflows/playwright.yml
├── pages
│   ├── board.page.ts
│   └── login.page.ts
├── test-data
│   ├── task-scenarios.json
│   └── users.json
├── tests
│   └── asana-board.spec.ts
├── utils
│   └── locator-utils.ts
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Install

```bash
npm install
npx playwright install chromium
```

## Run tests

```bash
npm test
```

## Run headed mode

```bash
npm run test:headed
```

## Debug

```bash
npm run test:debug
```

## View report

```bash
npm run report
```

## How the data-driven design works

Each test scenario is stored as JSON:

```json
{
  "id": "TC-001",
  "projectName": "Web Application",
  "taskTitle": "Implement user authentication",
  "columnName": "To Do",
  "tags": ["Feature", "High Priority"]
}
```

The spec file loops through this JSON and runs the same reusable validation flow for each scenario:

1. Sign in to the demo app using Username `admin` and Password `password123`.
2. Navigate to the requested project.
3. Find the expected column.
4. Verify the task title is present in that column.
5. Verify all expected tags are present on the task card.

## Video walkthrough outline

Use this 2-3 minute script for the Google Form submission:

1. "This is a Playwright TypeScript framework built specifically for the assessment requirement. I used TypeScript because the instructions require JS/TS."
2. "The framework is data-driven. All six test cases are stored in `test-data/task-scenarios.json`, so adding a new test case only requires adding a new JSON object instead of duplicating test code."
3. "I separated responsibilities using Page Object Model. `login.page.ts` handles username/password sign-in authentication, and `board.page.ts` handles project navigation and task validation."
4. "The main spec file loops over the JSON data and dynamically creates one Playwright test per scenario. This improves scalability and maintainability."
5. "The assertions verify the task is in the expected column and confirm all required tags. The framework also captures screenshots, videos, and traces on failure, which helps with debugging."
6. "The project includes GitHub Actions CI, so the tests can run automatically on every push or pull request."
7. "To run locally, use `npm install`, `npx playwright install chromium`, and `npm test`."

## Notes

The locators prefer accessible text, roles, and resilient fallback selectors. If the demo app changes its DOM significantly, update the page object locator candidates only, while the test data and test flow remain unchanged.


## Sign in button note

The login page uses a `Sign in` button. The login page object intentionally targets the accessible button name `Sign in` first, then falls back to `button[type="submit"]` only as a backup selector.
