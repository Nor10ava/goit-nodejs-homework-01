const { Command } = require("commander");
const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
} = require("./contacts");
const program = new Command();
program
  .requiredOption("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contactById = await getContactById(id);
      if (contactById) {
        console.log("Contact found");
        console.log(contactById);
        return;
      }
      console.log("Contact not found");

      break;

    case "add":
      const contact = await addContact(name, email, phone);
      console.log("Add new contact");
      console.log(contact);
      break;

    case "remove":
      const contactByIdRemove = await removeContact(id);
      if (contactByIdRemove) {
        console.log("Contact removed");
        console.log(contactByIdRemove);
        return;
      }
      console.log("Contact not found");

      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv).then(() => console.log("Operation sucess"));
