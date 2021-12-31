import mail from '@sendgrid/mail';

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const message = `
Name: ${body.fullName}\r\n
Email: ${body.email}\r\n
Subject: ${body.subject}
Message: ${body.message}
`;

  const data = {
    to: body.email,
    from: 'boloroyun@artgranitedoes.com',
    subject: 'Quoted Price from Art Granite',
    text: message,
    html: message.replace(/\r\n/g, '<br>'),
  };
  try {
    await mail.send(data);
    res.json({ message: 'Email has been sent' });
  } catch (err) {
    res.status(500).json({ err: 'Error sending email' });
  }
}
