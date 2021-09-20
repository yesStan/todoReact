import React from "react";
import { useState } from "react";
import "./App.css";
import "./index.css";
import bin from "./bin.png";
import edit from "./edit.png";

function App() {
  const [comment, setComment] = useState([]);
  console.log(comment);
  const [editUserData, setEditUserData] = useState({
    isEdit: false,
    commentIndex: null,
  });

  let myRef = React.createRef();

  const handleEditClick = (commentIndex) => {
    myRef.current.value = comment[commentIndex];
    // setComment(comment);
    setEditUserData({
      isEdit: true,
      commentIndex,
    });
  };

  const handleRemoveClick = (index) => {
    setComment(
      comment.filter((comment, commentIndex) => commentIndex !== index)
    );
  };

  let addComment = () => {
    let commentValue = myRef.current.value;
    if (editUserData.isEdit) {
      const edits = comment.slice();
      edits.splice(editUserData.commentIndex, 1, myRef.current.value);
      setComment(edits);
      setEditUserData({
        isEdit: false,
        commentIndex: null,
      });
    } else {
      if (commentValue) {
        let comments = [...comment, commentValue];
        setComment(comments);
      }
    }

    // let comments = [...comment, commentValue];
    // setComment(comments);
    myRef.current.value = "";
  };

  return (
    <>
      <div className="container">
        <h1 className="header">Todo list</h1>

        <div>
          <input ref={myRef} value={comment.commentValue}></input>
        </div>
        <button onClick={addComment}>Add item</button>
        <div>
          <ul>
            {comment.map((item, index) => (
              <li key={index.toString()}>
                {item}
                <span>
                  <button onClick={() => handleEditClick(index)}>
                    <img className="edit" src={edit} alt="edit" />
                  </button>
                </span>
                <span>
                  <button onClick={() => handleRemoveClick(index)} alt="bin">
                    <img className="trashBin" src={bin} alt="trashBin" />
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
