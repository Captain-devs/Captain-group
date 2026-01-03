const nodemailer = require("nodemailer");
const { BUSINESS_EMAIL } = require("./constants");


async function sendEmail({service_interest, name, email, number, message}) {
  console.log(process.env.GOOGLE_APP_PASSWORD)
  // CREATE TRANSPORTER
  const transporter = nodemailer.createTransport({
   host: 'smtp.gmail.com',
  port: 465, // Use 465 for SSL or 587 for TLS
  secure: true, // Use true for 465, false for 587
  auth: {
    user: BUSINESS_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD, // The 16-character App Password
  },
  tls:{
    rejectUnauthorized:false
  }
});

  // EMAIL OPTIONS
  const mailOptions = {
    from: `"Captain Group" ${BUSINESS_EMAIL}`,
    to: BUSINESS_EMAIL,
    replyTo: email,
    subject: `New enquiry${service_interest}`,
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>New Service Request – Captain Group</title>
</head>
<body style="margin:0; padding:0; background:#f2f4f7; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:30px 15px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; padding:25px;">
          
          <tr>
            <td>
              <h2 style="margin:0; color:#111;">🚀 Captain Hub</h2>
              <p style="margin:8px 0 20px; color:#555;">
                New service request received from your website.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:15px 0;">
              <p><strong>Name:</strong></p>
              <p style="background:#f7f7f7; padding:10px; border-radius:5px;">
                ${name}
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:15px 0;">
              <p><strong>Service Type:</strong></p>
              <p style="background:#f7f7f7; padding:10px; border-radius:5px;">
                ${service_interest}
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:15px 0;">
              <p><strong>Email Address:</strong></p>
              <p style="background:#f7f7f7; padding:10px; border-radius:5px;">
                ${email}
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:15px 0;">
              <p><strong>Phone Number:</strong></p>
              <p style="background:#f7f7f7; padding:10px; border-radius:5px;">
                ${number}
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:15px 0;">
              <p><strong>Description:</strong></p>
              <div style="background:#f7f7f7; padding:15px; border-radius:5px; color:#333;">
                ${message}
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding-top:25px;">
              <hr style="border:none; border-top:1px solid #eee;" />
              <p style="font-size:12px; color:#888; margin-top:10px;">
                This request was submitted via the Captain Hub website.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
  };

  // SEND EMAIL
  await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
