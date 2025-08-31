import email from "infra/email";

describe("email", () => {
  test("send()", async () => {
    await email.send({
      from: "EstudaFatec <from@estudafatec.com>",
      to: "to@estudafatec.com",
      subject: "Subject Test",
      text: "Body test.",
    });
  });
});
