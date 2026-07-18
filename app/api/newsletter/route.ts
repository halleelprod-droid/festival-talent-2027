import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import { getDb } from '@/src/db';
import { newsletterSubscribers } from '@/src/db/schema';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function sendConfirmationEmail(email: string) {
  if (!process.env.RESEND_API_KEY) return;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'Festival Talent 2027 <onboarding@resend.dev>',
      to: email,
      subject: 'Bienvenue dans la newsletter Festival Talent 2027',
      html: '<p>Merci pour votre inscription. Vous recevrez les annonces officielles, les informations artistes, partenaires et billetterie de Festival Talent 2027.</p>',
    });
  } catch (error) {
    console.error('Resend newsletter email failed:', error);
  }
}

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const { email } = body;

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Adresse email invalide'
        },
        {
          status: 400
        }
      );
    }

    const inserted = await getDb().insert(newsletterSubscribers)
      .values({ email: email.trim().toLowerCase() })
      .onConflictDoNothing()
      .returning({ id: newsletterSubscribers.id });
    const alreadyRegistered = inserted.length === 0;

    if (!alreadyRegistered) await sendConfirmationEmail(email);

    return NextResponse.json({
      success: true,
      message:
        alreadyRegistered
          ? 'Vous êtes déjà inscrit'
          : 'Inscription réussie'
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
