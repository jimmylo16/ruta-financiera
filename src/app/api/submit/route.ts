import { NextRequest, NextResponse } from 'next/server';
import { Answers } from '@/types/quiz';

function fmt(val: boolean | string | undefined, naLabel = 'N/A'): string {
  if (val === undefined) return naLabel;
  if (val === true) return 'Sí';
  if (val === false) return 'No';
  return String(val);
}

export async function POST(req: NextRequest) {
  try {
    const { answers, profileTitle, score } = (await req.json()) as {
      answers: Answers;
      profileTitle: string;
      score: number;
    };

    const scriptUrl = process.env.APPS_SCRIPT_URL;
    if (!scriptUrl) {
      const reason = 'APPS_SCRIPT_URL no está configurada en las variables de entorno';
      console.error('[submit]', reason);
      return NextResponse.json({ ok: false, reason }, { status: 500 });
    }

    const payload = {
      timestamp: new Date().toISOString(),
      tiene_tarjeta: fmt(answers['tiene_tarjeta']),
      uso_principal: fmt(answers['uso_principal'], 'N/A'),
      paga_total: fmt(answers['paga_total'], 'N/A'),
      paga_minimo: fmt(answers['paga_minimo'], 'N/A'),
      avances: fmt(answers['avances'], 'N/A'),
      atrasado: fmt(answers['atrasado'], 'N/A'),
      sabe_interes: fmt(answers['sabe_interes']),
      control_gastos: fmt(answers['control_gastos']),
      compra_sin_poder: fmt(answers['compra_sin_poder']),
      score,
      profile: profileTitle,
    };

    console.log('[submit] Enviando a Apps Script:', scriptUrl);

    const res = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const responseText = await res.text();
    console.log('[submit] Respuesta Apps Script — status:', res.status, 'body:', responseText);

    if (!res.ok) {
      const reason = `Apps Script devolvió status ${res.status}: ${responseText}`;
      console.error('[submit]', reason);
      return NextResponse.json({ ok: false, reason }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    console.error('[submit] Error inesperado:', reason);
    return NextResponse.json({ ok: false, reason }, { status: 500 });
  }
}
