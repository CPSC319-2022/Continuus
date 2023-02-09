import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Modal from 'react-modal';

type Post = {
  title: string
  content: string
}


const Home: NextPage = () => {
  const [createPostModalVisible, setCreatePostModalVisible] = useState(false);

  return (
    <>
      <Head>
        <title>Blog Application</title>
        <meta name="description" content="Blog Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button onClick={() => setCreatePostModalVisible(true)}>Create a Post</button>
      <Modal
        isOpen={createPostModalVisible}
        onRequestClose={() => setCreatePostModalVisible(false)}
        className="bg-cyan-500 absolute w-4/5 h-4/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <button 
        className="bg-gray-300 absolute right-2 top-2 w-12 h-12 rounded-full font-bold"
        onClick={() => setCreatePostModalVisible(false)}
        >X</button>
      </Modal>
    </>
  )
}

export default Home;
