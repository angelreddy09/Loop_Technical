import { Locator } from '@playwright/test';

export async function firstVisibleLocator(
  locators: Locator[],
  timeoutMs = 3_000
): Promise<Locator> {
  for (const locator of locators) {
    const candidate = locator.first();

    try {
      await candidate.waitFor({ state: 'visible', timeout: timeoutMs });
      return candidate;
    } catch {
      // Try the next locator candidate. This keeps page objects resilient
      // when labels/placeholders/classes change slightly in the demo app.
    }
  }

  throw new Error('No visible locator found from the provided locator candidates.');
}

export async function fillFirstVisible(
  locators: Locator[],
  value: string,
  timeoutMs = 3_000
): Promise<void> {
  const locator = await firstVisibleLocator(locators, timeoutMs);
  await locator.fill(value);
}

export async function clickFirstVisible(
  locators: Locator[],
  timeoutMs = 3_000
): Promise<void> {
  const locator = await firstVisibleLocator(locators, timeoutMs);
  await locator.click();
}

export function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function xpathLiteral(value: string): string {
  if (!value.includes("'")) {
    return `'${value}'`;
  }

  if (!value.includes('"')) {
    return `"${value}"`;
  }

  return `concat('${value.replace(/'/g, `', "'", '`)}')`;
}
