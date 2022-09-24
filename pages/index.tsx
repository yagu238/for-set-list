import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
  liff,
  liffError
}) => {
  const [userName, setUserName] = useState('not isLoggedIn');
  
  useEffect(() => {
    liff?.getProfile().then(value => {
      setUserName(value.displayName);
    });
  }, [liff]);

  return (
    <div>
      <Head>
        <title>LIFF App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>for set list</h1>
        {liff && <p>LIFF init succeeded. </p>}
        {liff && <p>Welcome: {userName}</p>}
        {liffError && (
          <>
            <p>LIFF init failed.</p>
            <p>
              <code>{liffError}</code>
            </p>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
