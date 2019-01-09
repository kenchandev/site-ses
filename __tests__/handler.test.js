import AWS from "aws-sdk-mock";
import * as handler from "../handler";

describe("SES mock for successful operations", () => {
  beforeAll(() => {
    AWS.mock("SES", "sendEmail", (params, callback) => {
      callback(null, {
        ResponseMetadata: {
          RequestId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
        },
        MessageId:
          "xxxxxxxxxxxxxxxx-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx-xxxxxx"
      });
    });
  });

  afterEach(() => {
    AWS.restore("SES");
  });

  test("siteMailer", async () => {
    const event = {
        headers: {
          origin: "http://localhost:3000"
        },
        body: JSON.stringify({
          name: "Foo Bar",
          reply_to: "foobarqaz@mailinator.com",
          subject: "Qaz - Contact",
          message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        })
      },
      context = {};

    let response = await handler.siteMailer(event, context);

    expect(response.statusCode).toEqual(200);
  });
});
