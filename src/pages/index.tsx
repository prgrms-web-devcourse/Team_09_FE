import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '~/styles/Home.module.css';
import Text from '~/components/Text';
import { getPosts } from '~/service/sampleApi';

const Home: NextPage = () => {
  const handleClick = async () => {
    const { data } = await getPosts();
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <Text size="50px">This text is sample</Text>
        <button onClick={handleClick}>click</button>
      </main>
    </div>
  );
};

export default Home;
