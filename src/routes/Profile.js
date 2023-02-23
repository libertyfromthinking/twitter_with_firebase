import { dbService, nweetCollectionRef } from "fbase";
import { getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect } from "react";

const Profile = ({ userObj }) => {
  const getNweets = async () => {
    const q = await query(
      nweetCollectionRef,
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt"),
    );
    const nweets = await getDocs(q);

    nweets.forEach((doc) => {
      console.log(doc.data());
    });
  };

  useEffect(() => {
    getNweets();
  }, []);
  return <span>Profile</span>;
};

export default Profile;
