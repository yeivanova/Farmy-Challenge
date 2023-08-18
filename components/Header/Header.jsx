import React from 'react';
import Logo from '../../images/logo.svg';
import Link from "next/link";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo_link}>
        <Logo className={styles.logo_image} />
      </Link>
    </header>
  )
}

export default Header;