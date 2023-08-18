import React from 'react';
import styles from "./Footer.module.scss";
import { format } from "date-fns";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {format(new Date(), "yyyy")} Mel's Kitchen</p>
    </footer>
  )
}

export default Footer;