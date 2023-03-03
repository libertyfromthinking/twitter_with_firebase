import React, { useEffect, useState } from "react";
import { dbService, storageService, nweetCollectionRef } from "fbase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import Nweet from "components/Nweet";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { CustomUser, NweetObj } from "type";

const Home = ({ userObj }: { userObj: CustomUser }): JSX.Element => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState<NweetObj[]>([]);
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    let fileUrl = "";
    if (attachment != "") {
      try {
        const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(fileRef, attachment, "data_url");
        fileUrl = await getDownloadURL(response.ref);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await addDoc(nweetCollectionRef, {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        fileUrl,
      });
    } catch (error) {
      console.log("onSubmit error", error);
    }
    setNweet("");
    setAttachment("");
  };

  const onChange = (event: { target: { value: string } }) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onFileChange = (event: { target: { files: any } }) => {
    const {
      target: { files },
    } = event;
    const uploadedImage: Blob = files[0];
    const reader = new FileReader();

    reader.readAsDataURL(uploadedImage);
    reader.onloadend = (finishedEvent) => {
      // const {
      //   currentTarget: { result },
      // } = finishedEvent;
      const { result }: { result: string | ArrayBuffer | null } = reader;
      if (typeof result === "string") {
        setAttachment(result);
      }
    };
  };

  const onClearAttachment = () => {
    setAttachment("");
  };

  useEffect(() => {
    const q = query(nweetCollectionRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshots) => {
      const nweetArr: NweetObj[] = snapshots.docs.map((doc) => {
        const nweetData: any = {
          ...doc.data(),
          creatorId: "",
        };
        return nweetData;
      });
      setNweets(nweetArr);
    });
  }, []);

  return (
    <div>
      {" "}
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
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      {nweets.map((nweet) => (
        <Nweet
          nweetObj={nweet}
          userObj={userObj}
          isOwner={nweet.creatorId === userObj.uid}
        />
      ))}
    </div>
  );
};

export default Home;
