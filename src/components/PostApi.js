import React, { useState, useEffect } from "react";
import axios from "axios";
import "./form.css";

function PostApi() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [birthDate, setBirthDate] = useState("");
  const [religion, setReligion] = useState("");
  const [click, setClick] = useState(false);

  const onChangeHandler = (e, setState) => {
    return setState(e.target.value);
  };

  const submitEvent = (e) => {
    e.preventDefault();
    const studentData = {
      firstName: firstName,
      lastName: lastName,
      age: age,
      birthDate: birthDate,
      religion: religion,
    };

    axios
      .post(`https://localhost:7174/api/School/`, studentData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    document.querySelector(".form-popup").innerHTML = "";
  };

  const closeHandler = () => {
    document.querySelector(".form-popup").innerHTML = null;
  };

  return (
    <div className="form-popup">
      <button onClick={closeHandler}>x</button>
      <form onSubmit={submitEvent} className="form-container">
        <h2 className="form-heading">Fill the input for Change</h2>
        <div className="label-input-container">
          <label className="form-label">First Name</label>
          <input
            type="text"
            name="FirstName"
            value={firstName}
            onChange={(e) => onChangeHandler(e, setFirstName)}
            className="form-input"
          />
        </div>
        <div className="label-input-container">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            name="LastName"
            value={lastName}
            onChange={(e) => onChangeHandler(e, setLastName)}
            className="form-input"
          />
        </div>
        <div className="label-input-container">
          <label className="form-label">Age</label>
          <input
            type="text"
            name="Age"
            value={age}
            onChange={(e) => onChangeHandler(e, setAge)}
            className="form-input"
          />
        </div>
        <div className="label-input-container">
          <label className="form-label">Birth Date</label>
          <input
            type="text"
            name="BirthDate"
            value={birthDate}
            onChange={(e) => onChangeHandler(e, setBirthDate)}
            className="form-input"
          />
        </div>
        <div className="label-input-container">
          <label className="form-label">Religion</label>
          <input
            type="text"
            name="Religion"
            value={religion}
            onChange={(e) => onChangeHandler(e, setReligion)}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default PostApi;
