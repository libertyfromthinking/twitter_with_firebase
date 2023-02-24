import React, { useEffect, useState } from "react";
import {
  authService,
  dbService,
  nweetCollectionRef,
  storageService,
} from "fbase";
import { getDocs, orderBy, query, where } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { async } from "@firebase/util";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const Profile = ({ userObj }) => {
  const [newDisplayName, setnewDisplayName] = useState("");
  const [attachment, setAttachment] = useState("");
  const getNweets = async () => {
    const q = await query(
      nweetCollectionRef,
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt"),
    );
    const nweets = await getDocs(q);

    nweets.forEach((doc) => {
      // console.log(doc.data());
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    let fileUrl;
    if (attachment != "") {
      try {
        const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(fileRef, attachment, "data_url");
        fileUrl = await getDownloadURL(response.ref);
      } catch (error) {
        console.log(error);
      }
    }
    await updateProfile(authService.currentUser, {
      displayName: newDisplayName,
      photoURL: fileUrl,
    });
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setnewDisplayName(value);
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
      setAttachment(result);
    };
  };

  const onClearAttachment = () => {
    setAttachment(null);
  };

  useEffect(() => {
    getNweets();
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onChange} value={newDisplayName} />
        <input type="file" onChange={onFileChange} accept="image/*" />
        <input type="submit" value="submit" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
    </>
  );
};

export default Profile;
