import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";

export default function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/TravelTrace/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/TravelTrace/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/TravelTrace/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
