import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { CombinedCodeFixScope } from "typescript";
import { CustomUser, Fn } from "type";

const Profile = ({
  userObj,
  refreshUser,
}: {
  userObj: CustomUser;
  refreshUser: Fn;
}): JSX.Element => {
  const [newDisplayName, setnewDisplayName] = useState<string>("");
  const [attachment, setAttachment] = useState<string>("");
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

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let fileUrl;
    if (attachment !== "") {
      try {
        const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(fileRef, attachment, "data_url");
        fileUrl = await getDownloadURL(response.ref);
      } catch (error) {
        console.log(error);
      }
    }
    await updateProfile(authService.currentUser!, {
      displayName: newDisplayName,
      photoURL: fileUrl,
    });
    setAttachment("");
    setnewDisplayName("");
    refreshUser();
  };

  const onChange = (event: React.ChangeEvent) => {
    // const {
    //   target: { value },
    // } = event;
    const { value } = event.target as HTMLTextAreaElement;
    setnewDisplayName(value);
  };

  const onFileChange = (event: React.FormEvent) => {
    // const {
    //   target: { files },
    // } = event;
    const { files } = event.target as HTMLInputElement;
    if (files !== null) {
      const uploadedImage = files[0];
      const reader = new FileReader();

      reader.readAsDataURL(uploadedImage);
      reader.onloadend = (finishedEvent) => {
        const target = finishedEvent.currentTarget as FileReader;
        const { result } = target;
        if (typeof result === "string") setAttachment(result);
      };
    }
  };

  const onClearAttachment = () => {
    setAttachment("");
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
