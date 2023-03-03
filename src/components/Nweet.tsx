import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { deleteObject, ref } from "firebase/storage";
import { CustomUser, NweetObj } from "type";

const Nweet = ({
  nweetObj,
  userObj,
  isOwner,
}: {
  nweetObj: NweetObj;
  userObj: CustomUser;
  isOwner: boolean;
}): JSX.Element => {
  const docRef = doc(dbService, "nwitter", nweetObj.id);
  const [isEdit, setisEdit] = useState<boolean>(false);
  const [newNweet, setNewNweet] = useState<string>(nweetObj.text);

  const onDeleteClick = async () => {
    const isConfirm = window.confirm("삭제하시겠습니까?");
    if (isConfirm) {
      await deleteDoc(docRef);
      console.log("오브젝트", nweetObj.fileUrl);
      await deleteObject(ref(storageService, nweetObj.fileUrl));
    }
  };

  const toggleisEdit = () => {
    setisEdit((prev) => !prev);
  };

  const onChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNewNweet(event.target.value);
  };

  const onSubmit = async (event: { preventDefault: () => void }) => {
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
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleisEdit}>Edit Nweet</button>
            </>
          )}
        </div>
      }
    </div>
  );
};

export default Nweet;
