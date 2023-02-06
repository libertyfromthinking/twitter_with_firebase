import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import {setDoc, doc, collection, addDoc, getDocs, query } from 'firebase/firestore';

const Home = () => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);
  const nweetCollectionRef = collection(dbService, "nwitter");

  const onSubmit = async (event) => {
    event.preventDefault();  
    try {
      await addDoc(nweetCollectionRef, {
        createdAt: Date.now(),
        nweet,
      });
    } catch (error) {
      console.log('onSubmit error', error);
    }
    setNweet('');
  }

  const onChange = (event) => {
    const { target :{value}} = event;
    setNweet(value);
  }

  const getNweets = async () => {
    const q = query(nweetCollectionRef);
    const querySnapshots = await getDocs(q)
    querySnapshots.forEach((doc) => {
      const nweetObj = {
        ...doc.data(),
        id: doc.id,
      }
      setNweets(prev => [nweetObj, ...prev]);
    })
  };

  useEffect(()=>{
    getNweets();
  },[]);
  console.log(nweets)
  return (
    <div>
      <form onSubmit={onSubmit}>
      <input type='text' onChange={onChange} value={nweet} placeholder="What's in your mind?" maxLength={120}/>
      <input type='submit' value='Nweet'/>
      </form>
      <div>
        {[...nweets].reverse().map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.nweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home;