const { v4 } = require("uuid");
const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.join("db", "contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const readContactsJson = await fs.readFile(contactsPath);
    const contacts = JSON.parse(readContactsJson);
    console.table(contacts);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
}
listContacts();

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const result = contacts.find((contact) => {
      const id = Number(contact.id);
      return id === contactId;
    });
    if (!result) {
      return null;
    }
    console.log(result);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

// console.log(getContactById(5));

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  const removeContact = contacts.splice(idx, 1);
  return removeContact;
}

removeContact(2);

async function addContact(data) {
  try {
    const contacts = await listContacts();
    const newContact = { ...data, id: v4() };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
}

// (tryData = {
//   name: "Anton Kovsh",
//   email: "kapacity@nonenimMauris.net",
//   phone: "(542) 451-7038",
// }),
//   addContact(tryData);

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
