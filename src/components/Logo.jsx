import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/">
      <img src="/icon.png" alt="globe icon" className={styles.icon} />
      <img
        src="/traveltrace.png"
        alt="TravelTrace logo"
        className={styles.logo}
      />
    </Link>
  );
}

export default Logo;
