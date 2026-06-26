import { expect, Locator, Page } from '@playwright/test';
import { clickFirstVisible, escapeRegExp, xpathLiteral } from '../utils/locator-utils';

export type TaskScenario = {
  id: string;
  projectName: string;
  taskTitle: string;
  columnName: string;
  tags: string[];
};

export class BoardPage {
  constructor(private readonly page: Page) {}

  async navigateToProject(projectName: string): Promise<void> {
    await clickFirstVisible([
      // Real accessible name is like: "Web Application Main web application development".
      this.page.getByRole('button', {
        name: new RegExp(`^\\s*${escapeRegExp(projectName)}\\b`, 'i')
      }),
      this.page.locator('nav button').filter({
        has: this.page.getByRole('heading', {
          name: new RegExp(`^\\s*${escapeRegExp(projectName)}\\s*$`, 'i')
        })
      })
    ], 10_000);

    await expect(
      this.page.getByRole('heading', {
        level: 1,
        name: new RegExp(`^\\s*${escapeRegExp(projectName)}\\s*$`, 'i')
      }),
      `Expected ${projectName} project board to be displayed.`
    ).toBeVisible({ timeout: 10_000 });
  }

  async verifyTaskScenario(scenario: TaskScenario): Promise<void> {
    await this.navigateToProject(scenario.projectName);

    const column = this.columnByName(scenario.columnName);
    await expect(
      column,
      `Expected column "${scenario.columnName}" to be visible.`
    ).toBeVisible();

    const taskCard = this.taskCardInColumn(column, scenario.taskTitle);
    await expect(
      taskCard,
      `Expected task "${scenario.taskTitle}" to be visible in "${scenario.columnName}" column.`
    ).toBeVisible();

    for (const tag of scenario.tags) {
      await expect(
        taskCard.getByText(new RegExp(`^\\s*${escapeRegExp(tag)}\\s*$`, 'i')),
        `Expected tag "${tag}" on task "${scenario.taskTitle}".`
      ).toBeVisible();
    }
  }

  private columnByName(columnName: string): Locator {
    // Column headings render as "To Do (2)", "In Progress (1)", "Done (1)".
    // The parent element is the actual column container in this demo app.
    return this.page.locator(
      `xpath=//main//h2[starts-with(normalize-space(.), ${xpathLiteral(columnName)})]/parent::*`
    );
  }

  private taskCardInColumn(column: Locator, taskTitle: string): Locator {
    // Task titles render as h3. The parent element is the task card.
    return column.locator(
      `xpath=.//h3[normalize-space(.)=${xpathLiteral(taskTitle)}]/parent::*`
    );
  }
}
