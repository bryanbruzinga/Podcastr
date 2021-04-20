import React from 'react';

export default function Home({episodes}) {

  return (
    <div>
      <h1>index</h1>
      <p>{JSON.stringify(episodes)}</p>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()
  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  }
//Server Side Rendering method, just change the function name to getServerSideProps and remove revalidate, perfect for when u need to constantly update your data through next layer, so when the user blocks javascript from working, it does the request independently
}
