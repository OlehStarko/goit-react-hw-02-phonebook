import React, { Component } from 'react';
import Container from '../components/Container/Container';
import ContactForm from '../components/ContactForm/ContactForm';
import Filter from '../components/Filter/Filter';
import ContactList from '../components/ContactList/ContactList';
import css from './css/phonebook.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Doctor Who', number: '459-12-56' },
      { id: 'id-2', name: 'Rose Tyler', number: '443-89-12' },
      { id: 'id-3', name: 'Martha Jones', number: '645-17-79' },
      { id: 'id-4', name: 'Donna Noble', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  addContact = data => {
    const normalizedName = data.name.toLowerCase();
    const uniqId = Date.now().toString();

    const newContact = {
      id: uniqId,
      name: normalizedName,
      number: data.number,
    };

    const duplicateName = this.state.contacts.find(
      contact => contact.name === newContact.name
    );

    if (duplicateName) {
      alert(`${newContact.name} is already on contacts`);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = id => {
    const answer = window.confirm('Want to delete?');

    if (answer) {
      this.setState(prevState => ({
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      }));
    }
  };

  render() {
    const { filter } = this.state;
    const filteredResults = this.filterContacts();

    return (
      <Container>
        <h1 className={css.form__title}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2 className={css.form__title}>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />

        <ContactList
          contacts={filteredResults}
          onDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}

export default App;
