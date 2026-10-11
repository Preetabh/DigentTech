/**
 * Centralized Email Service using Brevo HTTP API
 * Direct HTTPS calls avoid SMTP port blocking and timeouts on cloud platforms like Render.
 */

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const PRIMARY_HR_EMAIL = 'hr.digenttech@gmail.com';
const VERIFIED_FALLBACK_SENDER = 'leptopbbkup@gmail.com';

/**
 * Get configured sender information from environment variables
 */
const getSenderInfo = (useVerifiedFallback = false) => {
  const name =
    process.env.BREVO_SENDER_NAME ||
    process.env.EMAIL_FROM_NAME ||
    process.env.COMPANY_NAME ||
    'DigentTech';

  const email = useVerifiedFallback
    ? VERIFIED_FALLBACK_SENDER
    : process.env.BREVO_SENDER_EMAIL ||
      process.env.EMAIL_FROM ||
      PRIMARY_HR_EMAIL;

  return { name, email };
};

/**
 * Core function to send an email via Brevo HTTP API v3
 * Includes automatic fallback to verified sender if secondary domain is unverified.
 */
const sendBrevoEmail = async ({
  to,
  subject,
  htmlContent,
  textContent,
  replyTo,
  tags = ['contact-inquiry'],
}) => {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    throw new Error('BREVO_API_KEY is not configured in environment variables');
  }

  // Format recipient list
  let recipients = [];
  if (typeof to === 'string') {
    recipients = [{ email: to }];
  } else if (Array.isArray(to)) {
    recipients = to.map((item) =>
      typeof item === 'string' ? { email: item } : item
    );
  } else if (to && typeof to === 'object') {
    recipients = [to];
  } else {
    throw new Error('Invalid recipient "to" specified for email');
  }

  const doSend = async (senderInfo) => {
    const payload = {
      sender: senderInfo,
      to: recipients,
      subject,
      htmlContent,
      textContent: textContent || htmlContent.replace(/<[^>]*>?/gm, ''),
      tags,
    };

    if (replyTo && replyTo.email) {
      payload.replyTo = replyTo;
    } else {
      payload.replyTo = {
        name: 'DigentTech HR',
        email: process.env.EMAIL_FROM || PRIMARY_HR_EMAIL,
      };
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(BREVO_API_URL, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'api-key': apiKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const errorMsg = data.message || data.error || `HTTP ${response.status}`;
        throw new Error(errorMsg);
      }

      return {
        success: true,
        messageId: data.messageId,
      };
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        throw new Error('Brevo API request timed out after 15 seconds');
      }
      throw err;
    }
  };

  try {
    return await doSend(getSenderInfo(false));
  } catch (initialErr) {
    // If the sender address was rejected due to verification, automatically retry with account verified sender
    const msg = initialErr.message.toLowerCase();
    if (msg.includes('sender') || msg.includes('unverified') || msg.includes('not allowed')) {
      console.warn(`Brevo sender rejected (${initialErr.message}). Retrying with verified sender fallback...`);
      return await doSend(getSenderInfo(true));
    }
    throw initialErr;
  }
};

/**
 * Send new project inquiry notification to admin / HR team
 */
const sendContactNotificationToAdmin = async ({
  name,
  email,
  service,
  budget,
  message,
  inquiryId,
}) => {
  const companyName = process.env.COMPANY_NAME || 'DigentTech';
  const hrEmail =
    process.env.BREVO_SENDER_EMAIL ||
    process.env.EMAIL_FROM ||
    PRIMARY_HR_EMAIL;

  const subject = `[New Project Inquiry] ${service || 'General'} - ${name}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Project Inquiry</title>
      <style>
        body { margin: 0; padding: 0; background-color: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f3f4f6; }
        .wrapper { width: 100%; max-width: 620px; margin: 30px auto; background: #111827; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
        .header { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 32px 30px; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .badge { display: inline-block; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #38bdf8; background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 999px; margin-bottom: 12px; }
        h1 { margin: 0 0 8px 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em; }
        .subtitle { margin: 0; color: #94a3b8; font-size: 14px; }
        .content { padding: 30px; }
        .card { background: #1a2234; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06); padding: 20px; margin-bottom: 24px; }
        .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.04); font-size: 14px; }
        .row:last-child { border-bottom: none; }
        .label { color: #94a3b8; font-weight: 500; }
        .value { color: #f8fafc; font-weight: 600; text-align: right; }
        .message-box { background: #0f172a; border-left: 3px solid #38bdf8; border-radius: 6px; padding: 18px; margin: 20px 0; }
        .message-title { font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; margin-bottom: 8px; font-weight: 600; }
        .message-body { font-size: 14px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap; margin: 0; }
        .btn { display: inline-block; background: #38bdf8; color: #0b0f19 !important; font-weight: 700; font-size: 14px; text-decoration: none; padding: 12px 24px; border-radius: 8px; margin-top: 10px; }
        .footer { padding: 20px 30px; background: #0c121e; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid rgba(255,255,255,0.06); }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <div class="badge">Inquiry Received</div>
          <h1>New Project Inquiry</h1>
          <p class="subtitle">A client submitted an inquiry through the ${companyName} website.</p>
        </div>
        <div class="content">
          <div class="card">
            <div class="row">
              <span class="label">Client Name:</span>
              <span class="value">${name}</span>
            </div>
            <div class="row">
              <span class="label">Email Address:</span>
              <span class="value"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></span>
            </div>
            <div class="row">
              <span class="label">Service Requested:</span>
              <span class="value">${service || 'Not specified'}</span>
            </div>
            <div class="row">
              <span class="label">Estimated Budget:</span>
              <span class="value">${budget || 'Flexible / Discussion'}</span>
            </div>
            ${inquiryId ? `<div class="row"><span class="label">Reference ID:</span><span class="value">${inquiryId}</span></div>` : ''}
          </div>

          <div class="message-box">
            <div class="message-title">Project Brief / Message</div>
            <p class="message-body">${message}</p>
          </div>

          <a href="mailto:${email}?subject=${encodeURIComponent(`Re: Your inquiry with ${companyName}`)}" class="btn">
            Reply to ${name} &rarr;
          </a>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} ${companyName} Centralized Brevo Mailer. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `
New Project Inquiry Received
----------------------------
Client Name: ${name}
Email Address: ${email}
Service: ${service || 'General'}
Budget: ${budget || 'Flexible'}
${inquiryId ? `Inquiry ID: ${inquiryId}\n` : ''}
Message:
${message}

Reply to this inquiry directly at: ${email}
  `.trim();

  return sendBrevoEmail({
    to: hrEmail,
    subject,
    htmlContent,
    textContent,
    replyTo: { name, email },
    tags: ['admin-notification', 'contact-inquiry'],
  });
};

/**
 * Send auto-acknowledgment / confirmation email to client
 */
const sendContactAutoReply = async ({ name, email, service }) => {
  const companyName = process.env.COMPANY_NAME || 'DigentTech';
  const hrEmail =
    process.env.BREVO_SENDER_EMAIL ||
    process.env.EMAIL_FROM ||
    PRIMARY_HR_EMAIL;

  const subject = `We received your inquiry - ${companyName}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Contacting Us</title>
      <style>
        body { margin: 0; padding: 0; background-color: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f3f4f6; }
        .wrapper { width: 100%; max-width: 600px; margin: 30px auto; background: #111827; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); overflow: hidden; }
        .header { background: #162033; padding: 32px 30px; border-bottom: 1px solid rgba(255,255,255,0.08); }
        h1 { margin: 0 0 10px 0; font-size: 22px; color: #ffffff; }
        .subtitle { margin: 0; color: #94a3b8; font-size: 15px; }
        .content { padding: 30px; font-size: 15px; line-height: 1.6; color: #cbd5e1; }
        .highlight { color: #38bdf8; font-weight: 600; }
        .steps { background: #182234; border-radius: 8px; padding: 20px; margin: 20px 0; border: 1px solid rgba(255,255,255,0.05); }
        .step { margin-bottom: 12px; }
        .step:last-child { margin-bottom: 0; }
        .footer { padding: 20px 30px; background: #0c121e; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid rgba(255,255,255,0.06); }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <h1>Thank you for reaching out, ${name}!</h1>
          <p class="subtitle">Your project brief has been received by the ${companyName} team.</p>
        </div>
        <div class="content">
          <p>Hi ${name},</p>
          <p>
            Thanks for considering <span class="highlight">${companyName}</span> for your 
            <span class="highlight">${service || 'upcoming digital project'}</span>.
          </p>
          <p>
            We have received your project details and our design and engineering team is reviewing them.
          </p>
          <div class="steps">
            <div class="step"><strong>1. Review:</strong> We analyze your requirements and objectives.</div>
            <div class="step"><strong>2. Next Steps:</strong> An engineer or technical lead will reach out to you within 24 hours.</div>
            <div class="step"><strong>3. Proposal:</strong> We'll outline scope, architectural direction, and timelines.</div>
          </div>
          <p>
            If you have any immediate additions or attachments to share, simply reply directly to this email.
          </p>
          <p style="margin-top: 25px;">
            Warm regards,<br>
            <strong>The ${companyName} Team</strong><br>
            <span style="font-size: 13px; color: #94a3b8;">${hrEmail}</span>
          </p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} ${companyName}. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `
Hello ${name},

Thank you for contacting ${companyName} regarding ${service || 'your upcoming digital project'}.

We have successfully received your project details. Our team is currently reviewing your brief and will respond within 24 hours with next steps and a discussion schedule.

If you have any additional notes, feel free to reply directly to this email: ${hrEmail}

Best regards,
The ${companyName} Team
${hrEmail}
  `.trim();

  return sendBrevoEmail({
    to: { name, email },
    subject,
    htmlContent,
    textContent,
    replyTo: { name: 'DigentTech HR', email: hrEmail },
    tags: ['client-autoreply', 'contact-inquiry'],
  });
};

module.exports = {
  sendBrevoEmail,
  sendContactNotificationToAdmin,
  sendContactAutoReply,
  getSenderInfo,
};
