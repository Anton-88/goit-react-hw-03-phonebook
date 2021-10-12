import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { Component } from "react";
import { ContactForm } from "./components/ContactForm/ContactForm";
import { Filter } from "./components/Filter/Filter";
import { ContactList } from "./components/ContactList/ContactList";
import styles from "./App.css";

const DEFAULT_STATE = {
  contacts: [
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ],
  filter: "",
};

class App extends Component {
  state = { ...DEFAULT_STATE };

  componentDidMount() {
    const localStorageData = JSON.parse(localStorage.getItem("contacts"));

    if (localStorageData !== null) {
      this.setState({ contacts: localStorageData });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContact = (newContact) => {
    if (
      this.state.contacts
        .map((contact) => contact.name)
        .includes(newContact.name)
    ) {
      alert(`${newContact.name} is in your contacts list already`);
    } else {
      this.setState((prevState) => {
        return {
          contacts: [...prevState.contacts, newContact],
        };
      });
    }
  };

  filterChange = (e) => {
    this.setState({ filter: e.target.value });
  };

  filteredItems = () => {
    const tempContacts = this.state.filter.toLowerCase();
    return this.state.contacts.filter((e) =>
      e.name.toLowerCase().includes(tempContacts)
    );
  };

  deleteItem = (itemId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((item) => item.id !== itemId),
    }));
  };

  render() {
    const { filter, contacts } = this.state;
    const { addContact, filterChange, filteredItems, deleteItem } = this;
    return (
      <>
        <h1>PhoneBook</h1>
        <ContactForm addContact={addContact} contacts={contacts} />
        <h2>Contacts</h2>
        <div>
          <Filter value={filter} onFilterChange={filterChange} />
          <ContactList state={filteredItems()} onListChange={deleteItem} />
        </div>
      </>
    );
  }
}

export default App;
