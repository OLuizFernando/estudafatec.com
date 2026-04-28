import retry from "async-retry";
import { faker } from "@faker-js/faker";

import postgres from "infra/postgres";
import mongo from "infra/mongo";
import migrator from "models/migrator";
import user from "models/user";
import session from "models/session";
import activation from "models/activation";
import webserver from "infra/webserver";

const emailHttpUrl = `http://${process.env.EMAIL_HTTP_HOST}:${process.env.EMAIL_HTTP_PORT}`;

async function waitForAllServices() {
  await waitForWebServer();
  await waitForEmailServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
    });

    async function fetchStatusPage() {
      const response = await fetch(`${webserver.origin}/api/status`);

      if (response.status !== 200) {
        throw Error();
      }
    }
  }

  async function waitForEmailServer() {
    return retry(fetchEmailPage, {
      retries: 100,
    });

    async function fetchEmailPage() {
      const response = await fetch(emailHttpUrl);

      if (response.status !== 200) {
        throw Error();
      }
    }
  }
}

async function clearDatabase() {
  await postgres.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
}

async function runPendingMigrations() {
  await migrator.runPendingMigrations();
}

async function clearQuestions() {
  await mongo.deleteMany({});
  await mongo.closeDb();
}

async function populateQuestions() {
  await mongo.insertMany([
    {
      prova_id: "2024-1",
      ano: 2024,
      semestre: 1,
      numero: 1,
      disciplina: "Raciocínio Lógico",
      textos: [
        "SE A REALIDADE VIRTUAL É ENTENDIDA COMO A CAPACIDADE DE CRIAR AMBIENTES QUE NÃO EXISTEM NA NATUREZA, ENTÃO ELA FOI UMA CRIAÇÃO DO PALEOLÍTICO, um exemplo são as pinturas rupestres.",
        "Entretanto, por volta de 3 500 a.C., surgiu a forma mais poderosa de realidade virtual: a escrita, que transformava o registro oral em algo concreto, capaz de durar para sempre.",
        "Ao considerar a frase destacada em maiúsculo no texto, é correto afirmar que o conectivo lógico utilizado",
      ],
      imagens: null,
      alternativas: [
        {
          letra: "a",
          texto:
            "apresenta uma oposição de ideias entre duas proposições, e representa a operação de negação.",
          imagem: null,
          correta: false,
        },
        {
          letra: "b",
          texto:
            "“soma” as ideias apresentadas por duas proposições, e representa a operação de conjunção.",
          imagem: null,
          correta: false,
        },
        {
          letra: "c",
          texto:
            "une proposições cujas ideias nunca poderiam ocorrer simultaneamente, e representa a operação de disjunção.",
          imagem: null,
          correta: false,
        },
        {
          letra: "d",
          texto:
            "subordina a ocorrência da segunda proposição à concretização da primeira proposição, e representa a operação condicional.",
          imagem: null,
          correta: true,
        },
        {
          letra: "e",
          texto:
            "estabelece a equivalência entre as ideias presentes em ambas as proposições, e representa a operação bicondicional.",
          imagem: null,
          correta: false,
        },
      ],
    },
    {
      prova_id: "2025-1",
      ano: 2025,
      semestre: 1,
      numero: 1,
      disciplina: "Português",
      textos: [
        "A Finlândia, reconhecida por suas paisagens naturais intocadas e seu compromisso com a educação e o bem-estar social, agora se destaca como o país mais sustentável do mundo. Este título é o resultado de políticas conscientes e inovadoras que priorizam a sustentabilidade em diversos setores. Desde a gestão eficiente de resíduos até o investimento em energias renováveis, a Finlândia tem trilhado um caminho consistente em direção a um futuro verde, mostrando que é possível combinar crescimento econômico com responsabilidade ambiental.",
        "O equilíbrio entre o desenvolvimento econômico e a proteção ecológica é evidente nas ações cotidianas da população finlandesa. A sociedade é encorajada a adotar uma postura sustentável em todas as atividades, desde o consumo consciente até a mobilidade urbana. As cidades finlandesas são planejadas para serem amigáveis ao meio ambiente, com investimentos em transporte público eficiente e rotas de ciclismo seguras, incentivando assim um estilo de vida sustentável entre os cidadãos.",
        "A liderança finlandesa em sustentabilidade também se reflete em seu papel no cenário internacional. O país não apenas cumpre, mas supera frequentemente as metas globais para a redução de emissões e a preservação da biodiversidade. Suas práticas sustentáveis servem como modelo para outros países que buscam um caminho semelhante, provando que a Finlândia é um exemplo palpável de que a sustentabilidade e o progresso podem andar de mãos dadas.",
        "Os dois elementos conectores enumerados no excerto a seguir são tipificados como",
        "“Este título é o resultado de políticas conscientes e inovadoras QUE¹ priorizam a sustentabilidade em diversos setores. Desde a estão eficiente de resíduos até o investimento em energias renováveis, a Finlândia tem trilhado um caminho consistente em direção a um futuro verde, mostrando QUE² é possível combinar crescimento econômico com responsabilidade ambiental.”",
      ],
      imagens: null,
      alternativas: [
        {
          letra: "a",
          texto: "1 e 2 são pronomes relativos.",
          imagem: null,
          correta: false,
        },
        {
          letra: "b",
          texto: "1 e 2 são conjunções integrantes.",
          imagem: null,
          correta: false,
        },
        {
          letra: "c",
          texto: "1 é pronome relativo e 2 é conjunção integrante.",
          imagem: null,
          correta: true,
        },
        {
          letra: "d",
          texto: "1 é conjunção integrante e 2 é pronome relativo.",
          imagem: null,
          correta: false,
        },
        {
          letra: "e",
          texto: "1 é conjunção subordinativa e 2 é pronome relativo.",
          imagem: null,
          correta: false,
        },
      ],
    },
  ]);
  await mongo.closeDb();
}

async function createUser(userObject) {
  return await user.create({
    name: userObject?.name || faker.person.fullName(),
    email: userObject?.email || faker.internet.email(),
    password: userObject?.password || "password",
  });
}

async function activateUser(inactiveUser) {
  const activatedUser = await activation.activateUserById(inactiveUser.id);
  return activatedUser;
}

async function createSession(userObject) {
  return await session.create(userObject.id);
}

async function deleteAllEmails() {
  await fetch(`${emailHttpUrl}/messages`, {
    method: "DELETE",
  });
}

async function getLastEmail() {
  const emailListResponse = await fetch(`${emailHttpUrl}/messages`);

  const emailListBody = await emailListResponse.json();
  const lastEmailItem = emailListBody.pop();

  if (!lastEmailItem) {
    return null;
  }

  const emailTextResponse = await fetch(
    `${emailHttpUrl}/messages/${lastEmailItem.id}.plain`,
  );
  const emailTextBody = await emailTextResponse.text();

  lastEmailItem.text = emailTextBody;
  return lastEmailItem;
}

function extractUUID(text) {
  const match = text.match(/[0-9a-fA-F-]{36}/);
  return match ? match[0] : null;
}

async function addFeaturesToUser(userObject, features) {
  const updatedUser = await user.addFeatures(userObject.id, features);
  return updatedUser;
}

const orchestrator = {
  waitForAllServices,
  clearDatabase,
  runPendingMigrations,
  clearQuestions,
  populateQuestions,
  createUser,
  activateUser,
  createSession,
  deleteAllEmails,
  getLastEmail,
  extractUUID,
  addFeaturesToUser,
};

export default orchestrator;
