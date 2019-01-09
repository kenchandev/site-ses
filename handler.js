import AWS, { SES } from "aws-sdk";
import { success, failure, invalid } from "./lib/response";

if (typeof Promise === "undefined") {
  AWS.config.setPromisesDependency(require("bluebird"));
}

function sendEmail(ses, formData) {
  const emailParams = {
    Source: `"kenchandev.com" <${process.env.REPLY_TO}>`,
    ReplyToAddresses: [process.env.REPLY_TO],
    Destination: {
      ToAddresses: [process.env.SEND_TO]
    },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: `${formData.message}\n\nName: ${formData.name}\nEmail: ${
            formData.reply_to
          }`
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: formData.subject
      }
    }
  };

  console.log("Sending E-Mail with Parameters:", emailParams);

  return ses.sendEmail(emailParams).promise();
}

export const siteMailer = async event => {
  //  Initialization inside of handler function prevents `aws-sdk-mock` error:
  //  "region not defined in config"
  const ses = new SES(),
    origin = event.headers.Origin || event.headers.origin,
    formData = JSON.parse(event.body);

  if (formData.honeypot) {
    console.log(`Invalid Request (Honeypot): ${formData}`);

    return invalid({ origin, message: "Honeypot filled in." });
  }

  try {
    let data = await sendEmail(ses, formData);

    console.log(`E-mail Sent: ${JSON.stringify(data)}`);

    return success({ origin, body: data });
  } catch (err) {
    console.error(`Error: ${err}`);

    return failure({ origin, message: err.message });
  }
};
