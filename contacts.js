const { v4 } = require("uuid");
const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.join("db", "contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const readContactsJson = await fs.readFile(contactsPath);
    const contacts = JSON.parse(readContactsJson);
    // console.table(contacts);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
}
// listContacts();

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const getContact = contacts.find((contact) => {
      const id = Number(contact.id);
      return id === contactId;
    });

    return getContact;
  } catch (error) {
    console.log(error.message);
  }
}

// console.log(getContactById(2));

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const removeContact = contacts.filter((contact) => {
      const id = Number(contact.id);
      return id !== contactId;
    });
    console.log(removeContact);
    return removeContact;
  } catch (error) {
    console.log(error.message);
  }
}

console.log(removeContact(6));

async function addContact(data) {
  try {
    const contacts = await listContacts();
    const newContact = { ...data, id: v4() };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
