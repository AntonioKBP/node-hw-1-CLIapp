const path = require("path");

const fs = require("fs").promises;

const contactsPath = path.join("db", "contacts.json");

// TODO: задокументировать каждую функцию
function listContacts() {
  // ...твой код
}

function getContactById(contactId) {
  // ...твой код
}

function removeContact(contactId) {
  // ...твой код
}

function addContact(name, email, phone) {
  //   ...твой код
}

const readFile = async () => {
  try {
    const readContactsJson = await fs.readFile(contactsPath);

    const json = JSON.parse(readContactsJson);
    console.log(json);

    return json;
  } catch (error) {
    console.log(error.message);
  }
};

readFile();

const writeFile = async (value) => {
  const readContactsJson = await fs.writeFile(
    contactsPath,
    JSON.stringify(value)
  );

  const json = JSON.parse(readContactsJson);

  return json;
};

module.exports = {
  readFile,
  writeFile,
};
