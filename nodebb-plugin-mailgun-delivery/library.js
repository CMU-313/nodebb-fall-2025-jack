'use strict'

// require('dotenv').config();

const Mailgun = require('mailgun.js')
const FormData = require('form-data')

if (process.env.NODE_ENV !== 'production') {
  try {
    require('dotenv').config()
    console.log('[mailgun-plugin] Loaded .env for local development')
  } catch (err) {
    console.warn('[mailgun-plugin] dotenv not installed, skipping')
  }
}

/**
 * Env you must set:
 *   MAILGUN_API_KEY     -> Private API key (NOT the SMTP password)
 *   MAILGUN_DOMAIN      -> e.g. "mg.yourdomain.com"
 */
function mkClient () {
  const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY ?? 'test-api-key'
  const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN ?? 'mailgun.org'
  console.log('[mailgun-plugin] Using MAILGUN_DOMAIN:', MAILGUN_DOMAIN)

  if (!MAILGUN_API_KEY) throw new Error('MAILGUN_API_KEY is missing')
  if (!MAILGUN_DOMAIN) throw new Error('MAILGUN_DOMAIN is missing')

  const mg = new Mailgun(FormData).client({
    username: 'api',
    key: MAILGUN_API_KEY,
    url: 'https://api.mailgun.net'
  })

  return { mg, domain: MAILGUN_DOMAIN }
}

/**
 * Hook: static:email.send
 * NodeBB will pass `data` with:
 *   to, from, from_name, subject, html, text (plaintext), headers, etc.
 * If this hook resolves, NodeBB will NOT use the SMTP/sendmail fallback.
 */
exports.sendViaMailgun = async function sendViaMailgun (data) {
  console.log('[mailgun-plugin] sendViaMailgun called with:', data.subject)
  const { mg, domain } = mkClient()

  // Build Mailgun API payload
  const payload = {
    from: data.from_name ? `"${data.from_name}" <${data.from}>` : data.from,
    to: data.to, // can be string or array
    subject: data.subject,
    html: data.html,
    text: data.text // NodeBB sets data.text from data.plaintext
  }

  // Pass NodeBB headers through to Mailgun (List-Unsubscribe, etc.)
  if (data.headers) {
    for (const [k, v] of Object.entries(data.headers)) {
      payload[`h:${k}`] = v
    }
  }

  // (Optional) attachments if you later add them on NodeBB side:
  // payload.attachment = [...]

  // Send via Mailgun HTTP API
  const result = await mg.messages.create(domain, payload)

  // Returning / resolving here tells NodeBB sending succeeded.
  // If have error, Emailer will surface the error to the ACP test UI/logs.
  return result
}
