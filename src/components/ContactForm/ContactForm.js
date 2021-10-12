import { Component } from "react";
import { PropTypes } from "prop-types";
import styles from "./ContactForm.module.css";
import { v4 as uuidv4 } from "uuid";

export class ContactForm extends Component {
  contactNameID = uuidv4();
  contactNumberID = uuidv4();
  state = {
    name: "",
    number: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = this.state;
    const contact = {
      id: uuidv4(),
      name,
      number,
    };
    this.props.addContact(contact);
    this.resetForm();
  };

  resetForm = () => {
    console.log("this.state :>> ", this.state);
    this.setState({ name: "", number: "" });
  };

  handleChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { name, number } = this.state;
    const {
      ContactNameID,
      contactNumberID,
      handleSubmit,
      handleChange,
      onAddContact,
    } = this;
    return (
      <form onSubmit={handleSubmit}>
        <div className={styles.contact_form_container}>
          <div className={styles.contact_form_item}>
            <label
              className={styles.contact_form_label}
              htmlFor={ContactNameID}
            >
              Contact name:
            </label>
            <input
              id={ContactNameID}
              type="text"
              name="name"
              placeholder="Enter contact name ..."
              onChange={handleChange}
              value={name}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              required
            />
          </div>
          <div className={styles.contact_form_item}>
            <label
              className={styles.contact_form_label}
              htmlFor={contactNumberID}
            >
              Contact number:
            </label>
            <input
              id={contactNumberID}
              type="tel"
              name="number"
              placeholder="Enter contact number ..."
              onChange={handleChange}
              value={number}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              required
            />
          </div>
          <button
            type="submit"
            className={styles.contact_add_btn}
            onClick={onAddContact}
            disabled={!name || number.length < 5}
          >
            Add contact
          </button>
        </div>
      </form>
    );
  }
}
