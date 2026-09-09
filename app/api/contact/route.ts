import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactFormSchema } from '@/lib/schemas';
import { contactRateLimit } from '@/lib/rate-limit';

const resendApiKey = process.env.RESEND_API_KEY?.trim();

const resend = resendApiKey ? new Resend(resendApiKey) : null;

const EMAIL_TARGET = 'saftanasdalihin@gmail.com';
const EMAIL_SENDER = 'onboarding@resend.dev';

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');

  return forwardedFor?.split(',')[0]?.trim() ?? 'unknown';
}

export async function POST(request: Request) {
  try {
    // ==========================================
    // 1. Rate limiting
    // ==========================================
    const ip = getClientIp(request);

    const { success, limit, remaining, reset } =
      await contactRateLimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        {
          message: 'Too many requests. Please try again later.',
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
          },
        }
      );
    }

    // ==========================================
    // 2. Parse request body
    // ==========================================
    const body = await request.json();

    // ==========================================
    // 3. Validate request shape
    // ==========================================
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: 'Invalid form data.',
          errors: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = validationResult.data;

    // ==========================================
    // 4. Validate maximum input lengths
    // ==========================================
    if (
      name.length > MAX_NAME_LENGTH ||
      email.length > MAX_EMAIL_LENGTH ||
      subject.length > MAX_SUBJECT_LENGTH ||
      message.length > MAX_MESSAGE_LENGTH
    ) {
      return NextResponse.json(
        {
          message: 'One or more fields exceed the maximum allowed length.',
        },
        { status: 400 }
      );
    }

    if (!resend) {
      console.warn(
        'RESEND_API_KEY is not configured. Skipping email delivery.'
      );

      return NextResponse.json({
        message:
          'Message received. Email delivery is currently unavailable.',
      });
    }

    // ==========================================
    // 5. Escape user input before HTML rendering
    // ==========================================
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

    // ==========================================
    // 6. Send email
    // ==========================================
    const { error } = await resend.emails.send({
      from: `Portfolio Contact <${EMAIL_SENDER}>`,
      to: [EMAIL_TARGET],
      replyTo: email,
      subject: `[PORTFOLIO] ${subject} - from ${name}`,
      html: `
        <h2>New message from Portfolio</h2>

        <p>
          <strong>Name:</strong>
          ${safeName}
        </p>

        <p>
          <strong>Email:</strong>
          ${safeEmail}
        </p>

        <p>
          <strong>Subject:</strong>
          ${safeSubject}
        </p>

        <hr>

        <p><strong>Message:</strong></p>

        <p>
          ${safeMessage}
        </p>
      `,
    });

    if (error) {
      console.error('RESEND ERROR:', error);

      return NextResponse.json(
        { message: 'Failed to send email.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message:
        'Message sent successfully! Thank you, I will reply soon.',
    });
  } catch (error) {
    console.error('API Error:', error);

    return NextResponse.json(
      {
        message: 'An error occurred on the server.',
      },
      { status: 500 }
    );
  }
}