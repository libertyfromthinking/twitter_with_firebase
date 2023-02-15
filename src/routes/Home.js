import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import Nweet from 'components/Nweet';

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);
  const nweetCollectionRef = collection(dbService, "nwitter");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(nweetCollectionRef, {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
    } catch (error) {
      console.log('onSubmit error', error);
    }
    setNweet('');
  }

  const onChange = (event) => {
    const { target: { value } } = event;
    setNweet(value);
  }

  useEffect(() => {
    const q = query(nweetCollectionRef, orderBy('createdAt', 'desc'));
    onSnapshot(q, (snapshots) => {
      const nweetArr = snapshots.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        }
      }
      );
      setNweets(nweetArr);
    });
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type='text' onChange={onChange} value={nweet} placeholder="What's in your mind?" maxLength={120} />
        <input type='submit' value='submit' />
      </form>
      {nweets.map(
        (nweet) => (<div key={nweet.id}><Nweet nweetObj={nweet} userObj={userObj} /></div>)
      )
      }
    </div>
  );
}

export default Home;