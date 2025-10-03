import email from "infra/email";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.deleteAllEmails();
});

describe("email", () => {
  test("send()", async () => {
    await email.send({
      from: "EstudaFatec <from@estudafatec.com>",
      to: "to@estudafatec.com",
      subject: "Subject Test",
      text: "Body test.",
    });
    await email.send({
      from: "EstudaFatec <from@estudafatec.com>",
      to: "to@estudafatec.com",
      subject: "Last Email",
      text: "Last email sent.",
    });

    const lastEmail = await orchestrator.getLastEmail();

    expect(lastEmail.sender).toBe("<from@estudafatec.com>");
    expect(lastEmail.recipients[0]).toBe("<to@estudafatec.com>");
    expect(lastEmail.subject).toBe("Last Email");
    expect(lastEmail.text).toBe("Last email sent.\n");
  });
});
