import Link from "next/link";
import styles from "./index.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>Fashion Store</div>
        <nav className={styles["nav-links"]}>
          <Link href="/">Home</Link>
          <Link href="/dashboard">dashboard</Link>
          <Link href="/settings">Setting</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}