import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { dbService } from "fbase";

const Nweet = ({ nweetObj, userObj }) => {
  const docRef = doc(dbService, "nwitter", nweetObj.id);
  const [isEdit, setisEdit] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick = async () => {
    const isConfirm = window.confirm("삭제하시겠습니까?");
    if (isConfirm) {
      await deleteDoc(docRef);
    }
  };

  const toggleisEdit = () => {
    console.log(`변경전 : ${isEdit}`);
    setisEdit((prev) => !prev);
    console.log(`변경후 : ${isEdit}`);
  };

  const onChange = (event) => {
    setNewNweet(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateDoc(docRef, { text: newNweet });
    } catch (e) {
      console.log("에러발생 ", e);
    }
    setisEdit(false);
  };

  return isEdit ? (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Edit your nweet"
          required
          value={newNweet}
          onChange={onChange}
          maxLength={120}
        />
        <input type="submit" value="Edit" />
      </form>
      <button onClick={toggleisEdit}>Cancel</button>
    </>
  ) : (
    <div>
      {
        <div>
          <h4>{nweetObj.text}</h4>
          {nweetObj.fileUrl && (
            <img src={nweetObj.fileUrl} width="50px" height="50px" />
          )}
          {new Date(nweetObj.createdAt).toLocaleString()}
          <button onClick={onDeleteClick}>Delete Nweet</button>
          <button onClick={toggleisEdit}>Edit Nweet</button>
        </div>
      }
    </div>
  );
};

export default Nweet;
