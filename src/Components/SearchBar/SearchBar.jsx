import React from "react";
import { useState } from "react";
import styles from "../SearchBar/SearchBar.module.css";

export default function SearchBar() {
  return (
    <div className={styles.container}>
      <input className={styles.textBox}></input>
    </div>
  );
}
