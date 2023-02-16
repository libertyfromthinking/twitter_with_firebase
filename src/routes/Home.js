import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");
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
      console.log("onSubmit error", error);
    }
    setNweet("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const uploadedImage = files[0];
    const reader = new FileReader();

    reader.readAsDataURL(uploadedImage);
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      console.log(result);
      // console.log(result)
      setAttachment(result);
    };
  };

  useEffect(() => {
    const q = query(nweetCollectionRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshots) => {
      const nweetArr = snapshots.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setNweets(nweetArr);
    });
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          value={nweet}
          placeholder="What's in your mind?"
          maxLength={120}
        />
        <input type="file" onChange={onFileChange} accept="image/*" />
        <input type="submit" value="Nweet" />
        <div>
          <img
            src={attachment}
            width="50px"
            height="50px"
            alt="uploadedImage"
          />
        </div>
      </form>
      {nweets.map((nweet) => (
        <Nweet nweetObj={nweet} userObj={userObj} />
      ))}
    </div>
  );
};

export default Home;
