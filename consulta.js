const { MongoClient } = require('mongodb');

async function main() {
  const uri = "mongodb://dswa5:dswa5@cluster0-shard-00-00.vvce7.mongodb.net:27017,cluster0-shard-00-01.vvce7.mongodb.net:27017,cluster0-shard-00-02.vvce7.mongodb.net:27017/ifsp?ssl=true&replicaSet=atlas-geq1me-shard-0&authSource=admin&retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  try {
    await client.connect();
    await findAllContacts(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  } 
}

main().catch(console.error);

async function findAllContacts(client) {

  const result = await client.db("ifsp").collection("contatos").findOne({});

  console.log("Aluno: Luccas Lopes");
  console.log("Servidor conectado!");
  if (result) {
    console.log("Foram encontrados os seguintes docs: ");
    console.log(result);
  } else {
    console.log(`Nada foi encontrado.`)
  }
}

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log("Databases: ");
  databasesList.databases.forEach(db => {
    console.log(`- ${db.name}`);
  })
}
