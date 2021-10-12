import { PropTypes } from "prop-types";
import styles from "./ContactList.module.css";
import { v4 as uuidv4 } from "uuid";

export function ContactList({ state, onListChange }) {
  console.log("state :>> ", state);
  return (
    <ul className={styles.contact_list}>
      {state.map(({ name, number, id }) => (
        <li className={styles.contact_list_item} key={uuidv4()}>
          <p>
            {name}: {number}
          </p>
          <button
            className={styles.contact_list_button}
            type="button"
            onClick={() => onListChange(id)}
          >
            Delete number
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  state: PropTypes.arrayOf(PropTypes.any).isRequired,
  onListChange: PropTypes.func.isRequired,
};
