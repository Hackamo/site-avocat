# EmailJS Setup Guide

To enable email sending from the contact form, follow these steps:

## 1. Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email

## 2. Set up Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Add a new service (Gmail, Outlook, etc.)
3. Configure your email provider settings

## 3. Create Email Template

1. Go to "Email Templates"
2. Create a new template with these variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{phone}}` - Phone number
   - `{{subject}}` - Subject
   - `{{message}}` - Message content
   - `{{to_email}}` - Your email address

Example template:

```
Subject: Nouveau message de {{from_name}} - {{subject}}

Nom: {{from_name}}
Email: {{from_email}}
Téléphone: {{phone}}

Message:
{{message}}
```

## 4. Get Your Credentials

From your EmailJS dashboard:

- **Service ID**: Found in Email Services section
- **Template ID**: Found in Email Templates section
- **Public Key**: Found in Account > General

## 5. Update the Code

In `contact.ts`, replace the placeholder values:

```typescript
const serviceId = 'your_actual_service_id'
const templateId = 'your_actual_template_id'
const publicKey = 'your_actual_public_key'
```

## 6. Test

1. Fill out the contact form
2. Submit it
3. Check your email for the message
4. Check EmailJS dashboard for delivery status

## Security Note

The public key is safe to use in frontend code, but never expose your private keys.

## Alternative: Backend Solution

For production applications, consider implementing a backend API endpoint that handles email sending to avoid exposing email service credentials in the frontend.
