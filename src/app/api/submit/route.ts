import { NextRequest, NextResponse } from 'next/server';
import { Answers } from '@/types/quiz';
import { InvAnswers } from '@/types/investments';

function fmt(val: boolean | string | undefined, naLabel = 'N/A'): string {
  if (val === undefined) return naLabel;
  if (val === true) return 'Sí';
  if (val === false) return 'No';
  return String(val);
}

async function callScript(scriptUrl: string, payload: object) {
  const res = await fetch(scriptUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const responseText = await res.text();
  console.log('[submit] Apps Script status:', res.status, 'body:', responseText);
  if (!res.ok) throw new Error(`Apps Script status ${res.status}: ${responseText}`);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { quizType, profileTitle, score, userInfo } = body as {
      quizType?: string;
      profileTitle: string;
      score: number;
      userInfo?: { email: string; nit: string };
    };

    const scriptUrl = process.env.APPS_SCRIPT_URL;
    if (!scriptUrl) {
      const reason = 'APPS_SCRIPT_URL no está configurada en las variables de entorno';
      console.error('[submit]', reason);
      return NextResponse.json({ ok: false, reason }, { status: 500 });
    }

    if (quizType === 'inversiones') {
      const answers = body.answers as InvAnswers;
      const payload = {
        quizType: 'inversiones',
        timestamp: new Date().toISOString(),
        email: userInfo?.email ?? 'N/A',
        nit: userInfo?.nit ?? 'N/A',
        fondo_emergencia: answers['fondo_emergencia'] ?? 'N/A',
        depende_credito: answers['depende_credito'] ?? 'N/A',
        puede_ahorrar: answers['puede_ahorrar'] ?? 'N/A',
        sabe_invertir: answers['sabe_invertir'] ?? 'N/A',
        conoce_productos: answers['conoce_productos'] ?? 'N/A',
        conoce_rentabilidad: answers['conoce_rentabilidad'] ?? 'N/A',
        metas_claras: answers['metas_claras'] ?? 'N/A',
        invertir_futuro: answers['invertir_futuro'] ?? 'N/A',
        miedo_invertir: answers['miedo_invertir'] ?? 'N/A',
        puede_invertir_mensual: answers['puede_invertir_mensual'] ?? 'N/A',
        tiene_deudas: answers['tiene_deudas'] ?? 'N/A',
        score,
        profile: profileTitle,
      };
      await callScript(scriptUrl, payload);
    } else {
      const answers = body.answers as Answers;
      const payload = {
        quizType: 'tarjetas',
        timestamp: new Date().toISOString(),
        email: userInfo?.email ?? 'N/A',
        nit: userInfo?.nit ?? 'N/A',
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
      await callScript(scriptUrl, payload);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    console.error('[submit] Error:', reason);
    return NextResponse.json({ ok: false, reason }, { status: 500 });
  }
}
