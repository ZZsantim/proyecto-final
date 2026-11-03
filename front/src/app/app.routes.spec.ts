import { Routes } from '@angular/router';
import { routes } from './app.routes';

function collectScreenIds(items: Routes): string[] {
  return items.flatMap((route) => {
    const id = route.data?.['screenId'] as string | undefined;
    return [...(id ? [id] : []), ...collectScreenIds(route.children ?? [])];
  });
}

describe('application routes', () => {
  it('registers each of the 26 designed screens exactly once', () => {
    const screenIds = collectScreenIds(routes);
    expect(screenIds).toHaveLength(26);
    expect(new Set(screenIds).size).toBe(26);
  });
});
