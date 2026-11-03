import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

interface View {
  id: string;
  path: string;
}

interface RoleRun {
  name: string;
  email: string;
  password: string;
  views: View[];
}

const PUBLIC_VIEWS: View[] = [
  { id: 'PU-01', path: '/iniciar-sesion' },
  { id: 'PU-02', path: '/crear-cuenta' },
  { id: 'PU-03', path: '/seguimiento/K7M2QX9P4T' },
];

const ROLE_RUNS: RoleRun[] = [
  {
    name: 'Cliente',
    email: 'cliente1@electrostock.test',
    password: 'Cliente2026!',
    views: [
      { id: 'CL-01', path: '/cliente/mis-citas' },
      { id: 'CL-02', path: '/cliente/agendar/vehiculo-servicio' },
      { id: 'CL-03', path: '/cliente/agendar/dia' },
      { id: 'CL-04', path: '/cliente/agendar/hora' },
      { id: 'CL-05', path: '/cliente/agendar/confirmar' },
      { id: 'CL-06', path: '/cliente/reprogramar' },
      { id: 'CL-07', path: '/cliente/registrar-vehiculo' },
      { id: 'CL-08', path: '/cliente/historial/V1' },
      { id: 'CL-09', path: '/cliente/encuesta' },
    ],
  },
  {
    name: 'Recepción',
    email: 'recepcion@electrostock.test',
    password: 'Recep2026!',
    views: [
      { id: 'SE-01', path: '/recepcion/agenda' },
      { id: 'SE-02', path: '/recepcion/ingreso' },
      { id: 'SE-03', path: '/recepcion/registrar-cliente' },
      { id: 'SE-04', path: '/recepcion/crear-orden' },
      { id: 'SE-05', path: '/recepcion/caja' },
    ],
  },
  {
    name: 'Mecánico',
    email: 'mecanico1@electrostock.test',
    password: 'Meca2026!a',
    views: [
      { id: 'ME-01', path: '/mecanico/bahia' },
      { id: 'ME-02', path: '/mecanico/orden/O1' },
      { id: 'ME-03', path: '/mecanico/expediente/V8' },
    ],
  },
  {
    name: 'Administración',
    email: 'admin@electrostock.test',
    password: 'Admin2026!',
    views: [
      { id: 'AD-01', path: '/administracion/indicadores' },
      { id: 'AD-02', path: '/administracion/asignaciones' },
      { id: 'AD-03', path: '/administracion/inventario' },
      { id: 'AD-04', path: '/administracion/catalogo' },
      { id: 'AD-05', path: '/administracion/usuarios' },
      { id: 'AD-06', path: '/administracion/bitacora' },
    ],
  },
];

async function checkView(page: Page, view: View): Promise<void> {
  await expect(page.locator(`[data-vista="${view.id}"]`)).toBeVisible();
  await expect(page.locator('.demo-banner')).toHaveCount(1);
  await expect(page.locator(`[data-vista="${view.id}"] h1`)).toHaveAttribute('tabindex', '-1');
  await expect(page).toHaveTitle(/Electrostock/);

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(overflow, `${view.id}: scroll horizontal`).toBe(false);

  const { violations } = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  const severe = violations
    .filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''))
    .map(
      (violation) =>
        `${violation.id} (${violation.nodes.length}): ${violation.nodes
          .map((node) => `${node.target.join(' ')} ${node.failureSummary ?? ''}`)
          .join('; ')}`,
    );
  expect(severe, `${view.id}: violaciones de accesibilidad`).toEqual([]);
}

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

test.describe('Vistas públicas', () => {
  for (const view of PUBLIC_VIEWS) {
    test(`${view.id} ${view.path}`, async ({ page }) => {
      await page.goto(view.path);
      await checkView(page, view);
      if (view.id === 'PU-03') {
        await expect(page.getByRole('heading', { name: 'Moto eléctrica' })).toBeVisible();
      }
    });
  }
});

test('el título de pestaña cambia de idioma junto con la interfaz', async ({ page }) => {
  await page.goto('/iniciar-sesion');
  await expect(page).toHaveTitle('Tu movilidad, en buenas manos · Electrostock');
  await page.getByRole('button', { name: 'Cambiar idioma EN' }).click();
  await expect(page).toHaveTitle('Your ride, in good hands · Electrostock');
});

test.describe('Vistas por perfil', () => {
  for (const roleRun of ROLE_RUNS) {
    test(`${roleRun.name}: todas las vistas`, async ({ page }) => {
      await login(page, roleRun.email, roleRun.password);
      for (const view of roleRun.views) {
        await goInApp(page, view.path);
        await checkView(page, view);
      }
    });
  }
});

test('el usuario inactivo recibe un error y no entra', async ({ page }) => {
  await page.goto('/iniciar-sesion');
  await page.getByLabel('Correo electrónico', { exact: true }).fill('mecanico3@electrostock.test');
  await page.getByLabel('Contraseña', { exact: true }).fill('Meca2026!c');
  await page.getByRole('button', { name: 'Iniciar sesión', exact: true }).click();
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page).toHaveURL(/\/iniciar-sesion/);
  await expect(page.getByLabel('Correo electrónico', { exact: true })).toBeFocused();
});

test('navegación móvil abre, cierra con Escape y anuncia la ruta activa', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'movil', 'La navegación colapsable solo existe en móvil.');
  await login(page, 'cliente1@electrostock.test', 'Cliente2026!');
  const openButton = page.getByRole('button', { name: 'Abrir navegación' });
  await expect(openButton).toHaveAttribute('aria-expanded', 'false');
  await openButton.click();
  await expect(page.getByRole('button', { name: 'Cerrar navegación' })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await expect(
    page.getByRole('navigation').getByRole('link', { name: 'Mis citas' }),
  ).toHaveAttribute('aria-current', 'page');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Abrir navegación' })).toHaveAttribute(
    'aria-expanded',
    'false',
  );
});

test('el diálogo de cancelación conserva el foco y lo restaura al cerrarse', async ({ page }) => {
  await login(page, 'cliente1@electrostock.test', 'Cliente2026!');
  await goInApp(page, '/cliente/mis-citas');
  const cancelButton = page.getByRole('button', { name: 'Cancelar cita' }).first();
  await cancelButton.click();
  const dialog = page.getByRole('alertdialog');
  await expect(dialog).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(cancelButton).toBeFocused();
});

test('el diálogo de transición del mecánico toma y restaura el foco', async ({ page }) => {
  await login(page, 'mecanico1@electrostock.test', 'Meca2026!a');
  await goInApp(page, '/mecanico/orden/O1');
  const transitionButton = page.getByRole('button', {
    name: 'Registrar entrega',
  });
  await transitionButton.click();
  const dialog = page.getByRole('alertdialog');
  await expect(dialog).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(transitionButton).toBeFocused();
});

test('el asistente de reserva confirma la cita y la muestra en el panel', async ({ page }) => {
  await login(page, 'cliente1@electrostock.test', 'Cliente2026!');
  await goInApp(page, '/cliente/agendar/vehiculo-servicio');
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.locator('[data-vista="CL-03"]')).toBeVisible();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.locator('[data-vista="CL-04"]')).toBeVisible();
  await page.getByRole('button', { name: /09:00/ }).click();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.locator('[data-vista="CL-05"]')).toBeVisible();
  await expect(page.getByText('05:00')).toBeVisible();
  await page.getByRole('button', { name: 'Confirmar cita' }).click();
  await expect(
    page.getByRole('status').filter({ hasText: 'Tu cita quedó confirmada' }).first(),
  ).toBeVisible();
  await goInApp(page, '/cliente/mis-citas');
  await expect(page.getByText('Cambio de batería 48V').first()).toBeVisible();
});

test('el seguimiento muestra código, estado y línea de tiempo sin datos internos', async ({
  page,
}) => {
  await page.goto('/seguimiento/K7M2QX9P4T');
  await expect(page.locator('[data-vista="PU-03"]')).toBeVisible();
  await expect(page.getByText('NIU NQi GTS')).toBeVisible();
  await expect(page.getByText('En reparación', { exact: true })).toBeVisible();
  await expect(page.getByText('Andrés Rojas')).toHaveCount(0);
  await expect(page.getByText('$')).toHaveCount(0);
});

test('la orden nueva entrega un código de seguimiento y un QR legible', async ({ page }) => {
  await login(page, 'recepcion@electrostock.test', 'Recep2026!');
  await goInApp(page, '/recepcion/crear-orden');
  await page.getByRole('button', { name: 'Crear orden' }).click();
  await expect(page.locator('.ticket-card .ticket-code')).toBeVisible();
  await expect(page.locator('.ticket-card img.ticket-qr')).toHaveAttribute(
    'src',
    /^data:image\/png;base64,/,
  );
});

test.describe('Movimiento reducido', () => {
  test.use({ reducedMotion: 'reduce' });

  test('desactiva el movimiento al navegar', async ({ page }) => {
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
