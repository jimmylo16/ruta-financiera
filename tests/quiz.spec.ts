import { test, expect, Page } from '@playwright/test';

const BASE_URL = process.env.TEST_URL ?? 'http://localhost:3000';

// ─── helpers ────────────────────────────────────────────────────────────────

async function clickSegment(page: Page, questionText: string, option: string) {
  const row = page.locator(`[data-question="${questionText}"]`);
  await row.getByRole('button', { name: option, exact: true }).click();
}

async function selectOption(page: Page, placeholder: string, option: string) {
  await page.getByRole('combobox').filter({ hasText: placeholder }).click();
  await page.getByRole('option', { name: option }).click();
}

async function fillUserInfo(page: Page) {
  await page.getByPlaceholder('ejemplo@empresa.com').fill('test@empresa.com');
  await page.getByPlaceholder('900123456-1').fill('900123456-1');
  await page.getByRole('button', { name: 'Continuar →' }).click();
}

async function goToQuiz(page: Page, tipo: 'Tarjetas de Crédito' | 'Inversiones') {
  await page.goto(BASE_URL);
  await page.getByRole('button', { name: 'Empezar →' }).nth(tipo === 'Tarjetas de Crédito' ? 0 : 1).click();
  await fillUserInfo(page);
}

async function clickNext(page: Page, isLast: false | 'perfil' | 'resultado' = false) {
  const label =
    isLast === 'perfil' ? 'Ver mi perfil →' :
    isLast === 'resultado' ? 'Ver mi resultado →' :
    'Siguiente →';
  await page.getByRole('button', { name: label }).click();
}

// ─── Landing page ────────────────────────────────────────────────────────────

test('landing page muestra ambos quizzes', async ({ page }) => {
  await page.goto(BASE_URL);
  await expect(page.getByText('Tarjetas de Crédito')).toBeVisible();
  await expect(page.getByText('Inversiones')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Empezar →' })).toHaveCount(2);
});

test('user info: muestra form al hacer clic en Empezar y valida campos', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.getByRole('button', { name: 'Empezar →' }).first().click();
  await expect(page.getByText('Antes de empezar')).toBeVisible();

  // Sin datos → no avanza
  await page.getByRole('button', { name: 'Continuar →' }).click();
  await expect(page.getByText('El correo es requerido')).toBeVisible();
  await expect(page.getByText('El NIT es requerido')).toBeVisible();

  // Email inválido
  await page.getByPlaceholder('ejemplo@empresa.com').fill('no-es-email');
  await page.getByRole('button', { name: 'Continuar →' }).click();
  await expect(page.getByText('Ingresa un correo válido')).toBeVisible();

  // Volver regresa al landing
  await page.getByRole('button', { name: '← Volver' }).click();
  await expect(page.getByText('Selecciona el cuestionario')).toBeVisible();
});

// ─── Quiz Tarjetas ───────────────────────────────────────────────────────────

test('tarjetas: flujo completo con tarjeta → resultado Saludable', async ({ page }) => {
  await goToQuiz(page, 'Tarjetas de Crédito');

  // Sección 1 — PERFIL
  await expect(page.getByRole('heading', { name: /PERFIL/ })).toBeVisible();
  await clickSegment(page, '¿Tienes tarjeta de crédito?', 'Sí');
  // uso_principal select
  await page.locator('[role="combobox"]').click();
  await page.getByRole('option', { name: 'Compras del día a día' }).click();
  await clickNext(page);

  // Sección 2 — HÁBITOS CLAVE
  await expect(page.getByRole('heading', { name: /HÁBITOS/ })).toBeVisible();
  // paga_total select
  await page.locator('[role="combobox"]').click();
  await page.getByRole('option', { name: 'Siempre' }).click();
  await clickSegment(page, '¿Pagas solo el mínimo?', 'No');
  await clickSegment(page, '¿Has usado avances en efectivo?', 'No');
  await clickSegment(page, '¿Te has atrasado en pagos?', 'No');
  await clickNext(page);

  // Sección 3 — CONTROL FINANCIERO
  await expect(page.getByRole('heading', { name: /CONTROL/ })).toBeVisible();
  await clickSegment(page, '¿Sabes cuánto pagas de interés?', 'Sí');
  await clickSegment(page, '¿Llevas control de tus gastos?', 'Sí');
  await clickSegment(page, '¿Compras cosas que no puedes pagar inmediatamente?', 'No');
  await clickNext(page, 'perfil');

  // Resultado
  await expect(page.getByText('SALUDABLE')).toBeVisible();
  await expect(page.getByText('Buen manejo')).toBeVisible();
  await expect(page.getByText('Descargar PDF')).toBeVisible();
  await expect(page.getByText('Volver al inicio')).toBeVisible();
});

test('tarjetas: flujo sin tarjeta → resultado inmediato Sin Tarjeta', async ({ page }) => {
  await goToQuiz(page, 'Tarjetas de Crédito');

  // PERFIL — no tiene tarjeta → resultado inmediato al avanzar
  await clickSegment(page, '¿Tienes tarjeta de crédito?', 'No');
  await clickNext(page, 'perfil');

  await expect(page.getByText('SIN TARJETA', { exact: true })).toBeVisible();
  await expect(page.getByText('Sin tarjeta de crédito')).toBeVisible();
});

test('tarjetas: respuestas de riesgo → resultado Alerta', async ({ page }) => {
  await goToQuiz(page, 'Tarjetas de Crédito');

  // PERFIL
  await clickSegment(page, '¿Tienes tarjeta de crédito?', 'Sí');
  await page.locator('[role="combobox"]').click();
  await page.getByRole('option', { name: 'Avances en efectivo' }).click();
  await clickNext(page);

  // HÁBITOS
  await page.locator('[role="combobox"]').click();
  await page.getByRole('option', { name: 'Nunca' }).click();
  await clickSegment(page, '¿Pagas solo el mínimo?', 'Sí');
  await clickSegment(page, '¿Has usado avances en efectivo?', 'Sí');
  await clickSegment(page, '¿Te has atrasado en pagos?', 'Sí');
  await clickNext(page);

  // CONTROL
  await clickSegment(page, '¿Sabes cuánto pagas de interés?', 'No');
  await clickSegment(page, '¿Llevas control de tus gastos?', 'No');
  await clickSegment(page, '¿Compras cosas que no puedes pagar inmediatamente?', 'Sí');
  await clickNext(page, 'perfil');

  await expect(page.getByText('ALERTA')).toBeVisible();
  await expect(page.getByText('Alto riesgo financiero')).toBeVisible();
});

test('tarjetas: volver al inicio regresa al landing', async ({ page }) => {
  await goToQuiz(page, 'Tarjetas de Crédito');

  await clickSegment(page, '¿Tienes tarjeta de crédito?', 'Sí');
  await page.locator('[role="combobox"]').click();
  await page.getByRole('option', { name: 'Compras del día a día' }).click();
  await clickNext(page);

  await page.locator('[role="combobox"]').click();
  await page.getByRole('option', { name: 'Siempre' }).click();
  await clickSegment(page, '¿Pagas solo el mínimo?', 'No');
  await clickSegment(page, '¿Has usado avances en efectivo?', 'No');
  await clickSegment(page, '¿Te has atrasado en pagos?', 'No');
  await clickNext(page);

  await clickSegment(page, '¿Sabes cuánto pagas de interés?', 'Sí');
  await clickSegment(page, '¿Llevas control de tus gastos?', 'Sí');
  await clickSegment(page, '¿Compras cosas que no puedes pagar inmediatamente?', 'No');
  await clickNext(page, 'perfil');

  await page.getByRole('button', { name: 'Volver al inicio' }).click();
  await expect(page.getByText('Selecciona el cuestionario')).toBeVisible();
});

// ─── Quiz Inversiones ────────────────────────────────────────────────────────

test('inversiones: flujo completo → resultado Apto', async ({ page }) => {
  await goToQuiz(page, 'Inversiones');

  // Bloque 1 — BASE FINANCIERA
  await expect(page.getByRole('heading', { name: /BASE FINANCIERA/ })).toBeVisible();
  await clickSegment(page, '¿Tiene fondo de emergencia?', 'Sí');
  await clickSegment(page, '¿Depende del crédito para vivir?', 'No');
  await clickSegment(page, '¿Puede ahorrar cada mes?', 'Sí');
  await clickNext(page);

  // Bloque 2 — CONOCIMIENTO
  await expect(page.getByRole('heading', { name: /CONOCIMIENTO/ })).toBeVisible();
  await clickSegment(page, '¿Sabe qué es invertir?', 'Sí');
  await clickSegment(page, '¿Conoce productos financieros?', 'Sí');
  await clickSegment(page, '¿Conoce la rentabilidad de su dinero?', 'Sí');
  await clickNext(page);

  // Bloque 3 — COMPORTAMIENTO
  await expect(page.getByRole('heading', { name: /COMPORTAMIENTO/ })).toBeVisible();
  await clickSegment(page, '¿Tiene metas claras?', 'Sí');
  await clickSegment(page, '¿Invertiría para el futuro?', 'Sí');
  await clickSegment(page, '¿Le da miedo invertir?', 'No');
  await clickNext(page);

  // Bloque 4 — CAPACIDAD REAL
  await expect(page.getByRole('heading', { name: /CAPACIDAD REAL/ })).toBeVisible();
  await clickSegment(page, '¿Puede invertir mensualmente?', 'Sí');
  await clickSegment(page, '¿Tiene deudas actualmente?', 'No');
  await clickNext(page, 'resultado');

  // Resultado
  await expect(page.getByText('Perfil Apto para Invertir')).toBeVisible();
  await expect(page.getByText('Descargar PDF')).toBeVisible();
  await expect(page.getByText('Volver al inicio')).toBeVisible();
});

test('inversiones: respuestas débiles → No Apto', async ({ page }) => {
  await goToQuiz(page, 'Inversiones');

  await clickSegment(page, '¿Tiene fondo de emergencia?', 'No');
  await clickSegment(page, '¿Depende del crédito para vivir?', 'Sí');
  await clickSegment(page, '¿Puede ahorrar cada mes?', 'No');
  await clickNext(page);

  await clickSegment(page, '¿Sabe qué es invertir?', 'No');
  await clickSegment(page, '¿Conoce productos financieros?', 'No');
  await clickSegment(page, '¿Conoce la rentabilidad de su dinero?', 'No');
  await clickNext(page);

  await clickSegment(page, '¿Tiene metas claras?', 'No');
  await clickSegment(page, '¿Invertiría para el futuro?', 'No');
  await clickSegment(page, '¿Le da miedo invertir?', 'Sí');
  await clickNext(page);

  await clickSegment(page, '¿Puede invertir mensualmente?', 'No');
  await clickSegment(page, '¿Tiene deudas actualmente?', 'Sí');
  await clickNext(page, 'resultado');

  await expect(page.getByText('No Apto para Invertir')).toBeVisible();
});

test('inversiones: volver al inicio regresa al landing', async ({ page }) => {
  await goToQuiz(page, 'Inversiones');

  await clickSegment(page, '¿Tiene fondo de emergencia?', 'Sí');
  await clickSegment(page, '¿Depende del crédito para vivir?', 'No');
  await clickSegment(page, '¿Puede ahorrar cada mes?', 'Sí');
  await clickNext(page);

  await clickSegment(page, '¿Sabe qué es invertir?', 'Sí');
  await clickSegment(page, '¿Conoce productos financieros?', 'Sí');
  await clickSegment(page, '¿Conoce la rentabilidad de su dinero?', 'Sí');
  await clickNext(page);

  await clickSegment(page, '¿Tiene metas claras?', 'Sí');
  await clickSegment(page, '¿Invertiría para el futuro?', 'Sí');
  await clickSegment(page, '¿Le da miedo invertir?', 'No');
  await clickNext(page);

  await clickSegment(page, '¿Puede invertir mensualmente?', 'Sí');
  await clickSegment(page, '¿Tiene deudas actualmente?', 'No');
  await clickNext(page, 'resultado');

  await page.getByRole('button', { name: 'Volver al inicio' }).click();
  await expect(page.getByText('Selecciona el cuestionario')).toBeVisible();
});

// ─── API ─────────────────────────────────────────────────────────────────────

test('API /submit responde ok para tarjetas', async ({ request }) => {
  const res = await request.post(`${BASE_URL}/api/submit`, {
    data: {
      quizType: 'tarjetas',
      profileTitle: 'Test',
      score: 3,
      userInfo: { email: 'test@test.com', nit: '900123456-1' },
      answers: {
        tiene_tarjeta: true,
        uso_principal: 'Compras del día a día',
        paga_total: 'Siempre',
        paga_minimo: false,
        avances: false,
        atrasado: false,
        sabe_interes: true,
        control_gastos: true,
        compra_sin_poder: false,
      },
    },
  });
  const body = await res.json();
  // Locally APPS_SCRIPT_URL is not set → 500 with ok:false is expected.
  // In prod (TEST_URL set) → 200 with ok:true.
  if (process.env.TEST_URL) {
    expect(res.ok()).toBeTruthy();
    expect(body.ok).toBe(true);
  } else {
    expect(body).toHaveProperty('ok');
  }
});

test('API /submit responde ok para inversiones', async ({ request }) => {
  const res = await request.post(`${BASE_URL}/api/submit`, {
    data: {
      quizType: 'inversiones',
      profileTitle: 'Test',
      score: 18,
      userInfo: { email: 'test@test.com', nit: '900123456-1' },
      answers: {
        fondo_emergencia: 'Sí',
        depende_credito: 'No',
        puede_ahorrar: 'Sí',
        sabe_invertir: 'Sí',
        conoce_productos: 'Sí',
        conoce_rentabilidad: 'Sí',
        metas_claras: 'Sí',
        invertir_futuro: 'Sí',
        miedo_invertir: 'No',
        puede_invertir_mensual: 'Sí',
        tiene_deudas: 'No',
      },
    },
  });
  const body = await res.json();
  if (process.env.TEST_URL) {
    expect(res.ok()).toBeTruthy();
    expect(body.ok).toBe(true);
  } else {
    expect(body).toHaveProperty('ok');
  }
});
