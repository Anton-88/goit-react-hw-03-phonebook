import React from "react";
import { PropTypes } from "prop-types";
import styles from "./Filter.module.css";

export function Filter({ value, onFilterChange }) {
  return (
    <>
      <div className={styles.filter_container}>
        <p>Find contact by name</p>
        <input type="text" value={value} onChange={onFilterChange} />
      </div>
    </>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
