import { NextResponse } from 'next/server';

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const { email } = body;

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Email requis'
        },
        {
          status: 400
        }
      );
    }

    console.log(
      'NEW NEWSLETTER:',
      email
    );

    return NextResponse.json({
      success: true,
      message:
        'Inscription réussie'
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message:
          'Erreur serveur'
      },
      {
        status: 500
      }
    );
  }
}
