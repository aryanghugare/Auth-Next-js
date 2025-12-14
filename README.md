
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.



# Auth-Next-js 

## Password recovery flow

A concise end-to-end flow and implementation notes for password reset:

1. User submits their email to the "forgot password" endpoint.
2. Server verifies the email exists in the database.
3. Generate a secure random token (e.g. `crypto.randomBytes(32).toString('hex')`).
4. Hash the token (e.g. SHA-256) and store the hashed token in the user's document along with an expiry timestamp (e.g. `Date.now() + 60*60*1000` for 1 hour).
   - Use model fields like `forgotPasswordToken` (hashed) and `forgotPasswordTokenExpiry` (Date).
5. Send an email containing a reset link with the plain token in the URL (e.g. `${BASE_URL}/reset-password/${token}`) using your configured mailer (nodemailer).
6. User clicks the link → the front-end sends the token to the server (or the server reads it from the route).
7. Server hashes the received token and compares it with the stored hashed token and checks that the expiry has not passed.
8. If valid, allow the user to set a new password — hash the new password and save it.
9. Invalidate the reset token fields (clear `forgotPasswordToken` and `forgotPasswordTokenExpiry`) so the link cannot be reused.

Security and implementation notes

- Never store the plain token in the database; store only a hashed version.
- Use a short expiry (typically 1 hour) and single-use tokens.
- Always send the reset link over HTTPS and validate the origin.
- Rate-limit the forgot-password endpoint to prevent abuse and email enumeration.
- Log and monitor reset requests for suspicious activity.
- Consider additional protections: IP checks, device/session verification, and optional 2FA confirmation before allowing sensitive changes.
- Use a reliable mail provider or transactional email service in production to avoid deliverability issues.

Example model fields (already present in this project): `forgotPasswordToken`, `forgotPasswordTokenExpiry`.
