import { expect, test, type Page } from '@playwright/test';

async function goInApp(page: Page, path: string): Promise<void> {
  await page.evaluate((target) => {
    history.pushState({}, '', target);
    window.dispatchEvent(new PopStateEvent('popstate', { state: {} }));
  }, path);
}

async function login(page: Page, email: string, password: string): Promise<void> {
  await page.goto('/iniciar-sesion');
  await page.getByLabel('Correo electrónico', { exact: true }).fill(email);
  await page.getByLabel('Contraseña', { exact: true }).fill(password);
  await page.getByRole('button', { name: 'Iniciar sesión', exact: true }).click();
  await expect(page).not.toHaveURL(/\/iniciar-sesion/);
}

test.describe('Experiencia de navegación', () => {
  test('el foco llega al título después de navegar', async ({ page }) => {
    await login(page, 'admin@electrostock.test', 'Admin2026!');
    await goInApp(page, '/administracion/inventario');
    await expect(page.locator('[data-vista="AD-03"] h1')).toBeFocused();
  });

  test('la navegación activa una transición de vista', async ({ page }) => {
    await login(page, 'admin@electrostock.test', 'Admin2026!');
    const started = await page.evaluate(
      (target) =>
        new Promise<boolean>((resolve) => {
          const original = document.startViewTransition.bind(document);
          document.startViewTransition = ((callback?: ViewTransitionUpdateCallback) => {
            resolve(true);
            return original(callback);
          }) as typeof document.startViewTransition;
          history.pushState({}, '', target);
          window.dispatchEvent(new PopStateEvent('popstate', { state: {} }));
          window.setTimeout(() => resolve(false), 3000);
        }),
      '/administracion/inventario',
    );
    expect(started).toBe(true);
  });

  test('PU-03 expone el estado de la orden en una región viva', async ({ page }) => {
    await page.goto('/seguimiento/K7M2QX9P4T');
    await expect(page.locator('[data-vista="PU-03"] [role="status"]')).toBeVisible();
  });
});

test.describe('Movimiento reducido', () => {
  test.use({ reducedMotion: 'reduce' });

  test('no deja animaciones activas al navegar', async ({ page }) => {
    await login(page, 'admin@electrostock.test', 'Admin2026!');
    await goInApp(page, '/administracion/inventario');
    await expect(page.locator('[data-vista="AD-03"]')).toBeVisible();
    await expect
      .poll(() =>
        page.evaluate(
          () =>
            document.getAnimations().filter((animation) => animation.playState === 'running')
              .length,
        ),
      )
      .toBe(0);
  });
});
