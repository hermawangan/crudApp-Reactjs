import React, { useState } from "react";
import GetApi from "./GetApi";
import PostApi from "./PostApi";
import "./form.css";

function StudentDb() {
  const [click, setClick] = useState(false);

  const clickHandler = () => {
    setClick(!click);
  };

  return (
    <>
      <GetApi />
      <div className="button-add-container">
        <button onClick={clickHandler} className="button-add">
          Add Data
        </button>
      </div>
      <div className="container1">{click ? <PostApi /> : ""}</div>
    </>
  );
}

export default StudentDb;
