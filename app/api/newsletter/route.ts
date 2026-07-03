import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import { supabase } from '@/lib/supabase';

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

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email });

    if (error && error.code !== '23505') {
      console.error('Newsletter insert failed:', error);

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

    await sendConfirmationEmail(email);

    return NextResponse.json({
      success: true,
      message:
        error?.code === '23505'
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
