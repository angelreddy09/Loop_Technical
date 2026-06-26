import { test } from '@playwright/test';
import { BoardPage, TaskScenario } from '../pages/board.page';
import { LoginPage } from '../pages/login.page';
import taskScenarios from '../test-data/task-scenarios.json';
import users from '../test-data/users.json';

test.describe('Asana-like board task validation - data-driven suite', () => {
  for (const scenario of taskScenarios as TaskScenario[]) {
    test(`${scenario.id}: ${scenario.taskTitle} is in ${scenario.projectName} > ${scenario.columnName} with expected tags`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const boardPage = new BoardPage(page);

      await loginPage.login(users.admin);
      await boardPage.verifyTaskScenario(scenario);
    });
  }
});
