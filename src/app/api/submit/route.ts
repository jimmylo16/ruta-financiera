import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
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

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

    const row = [
      new Date().toISOString(),
      fmt(answers['tiene_tarjeta']),
      fmt(answers['uso_principal'], 'N/A'),
      fmt(answers['paga_total'], 'N/A'),
      fmt(answers['paga_minimo'], 'N/A'),
      fmt(answers['avances'], 'N/A'),
      fmt(answers['atrasado'], 'N/A'),
      fmt(answers['sabe_interes']),
      fmt(answers['control_gastos']),
      fmt(answers['compra_sin_poder']),
      score,
      profileTitle,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'A1',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [row] },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[submit] Error:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
