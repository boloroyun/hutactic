import mail from '@sendgrid/mail';

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const message = `
Name: ${body.fullName}\r\n
Email: ${body.email}\r\n
Phone: ${body.phone}\r\n
Subject: ${body.subject}\r\n
Message: ${body.message}
`;

  const data = {
    to: 'boloroyun@artgranitedoes.com',
    from: 'boloroyun@artgranitedoes.com',
    subject: `New message from ${body.fullname}`,
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
