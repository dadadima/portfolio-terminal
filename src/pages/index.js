import Terminal from "../components/Terminal";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>
        dima:$ <span className={styles.help}>type help to start</span>
      </h1>
      {/*<p>*/}
      {/*  Visit{" "}*/}
      {/*  <a href="tobefilled.com" target="_blank" rel="noreferrer">*/}
      {/*    Regular website*/}
      {/*  </a>*/}
      {/*</p>*/}
        <br/>

      <Terminal />
    </div>
  );
}
