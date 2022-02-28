import { mail, helper } from '@sendgrid/mail';
import handler from '.';
import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage({}) });

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default handler
  .use(upload.single('attachment'))
  .post(async (req, res) => {
    const body = JSON.parse(req.body);

    const message = new helper.Mail(`
Name: ${body.fullName}\r\n
Email: ${body.email}\r\n
Phone: ${body.phone}\r\n
Subject: ${body.subject}\r\n
Text: ${body.message}\r\n
 
`),
      attachment = new helper.Attachment(),
      fileInfo = req.file;

    attachment.setFilename(fileInfo.originalname);
    attachment.setType(fileInfo.mimetype);
    attachment.setContent(fileInfo.buffer.toString('base64'));
    attachment.setDisposition('attachment');

    mail.addAttachment(attachment);

    const data = {
      to: 'boloroyun@artgranitedoes.com',
      from: 'boloroyun@artgranitedoes.com',
      subject: `New message from ${body.fullname}`,
      text: message,
      attachment: req.file,
      html: message.replace(/\r\n/g, '<br>'),
    };
    try {
      await mail.send(data);
      res.json({ message: 'Email has been sent' });
    } catch (err) {
      res.status(500).json({ err: 'Error sending email' });
    }
  });
