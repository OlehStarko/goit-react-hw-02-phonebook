import css from '../css/phonebook.module.css';

const ContactItem = ({ contact, onDeleteContact }) => {
  return (
    <li className={css.contact__item}>
      <span className={css.contact__name}>{contact.name}: </span>
      <a className={css.contact__phone} href={`tel:${contact.number}`}>
        {contact.number}
      </a>
      <button
        className={css.delete__button}
        type="button"
        onClick={() => onDeleteContact(contact.id)}
      >
        Delete
      </button>
    </li>
  );
};

export default ContactItem;
