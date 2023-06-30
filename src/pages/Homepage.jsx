import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          You travel the world.
          <br />
          TravelTrace keeps track of your adventures.
        </h1>
        <h2>
          A captivating world map showcasing the path of your footsteps, etching
          unforgettable memories and allowing you to share your remarkable
          global odyssey with friends.
        </h2>
        <Link to="/TravelTrace/login" className="cta">
          Start tracking now
        </Link>
      </section>
    </main>
  );
}
