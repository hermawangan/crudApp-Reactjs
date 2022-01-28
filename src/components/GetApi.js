import React, { useState, useEffect } from "react";
import axios from "axios";
import "./getapi.css";
import "./form.css";

function GetApi() {
  const [id, setId] = useState("");
  const [students, setStudents] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [birthDate, setBirthDate] = useState("");
  const [religion, setReligion] = useState("");
  const [click, setClick] = useState(false);

  useEffect(() => {
    axios
      .get("https://localhost:7174/api/School")
      .then((res) => {
        console.log(res);
        return setStudents(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const onChangeHandler = (e, setState) => {
    return setState(e.target.value);
  };

  const updateSubmit = (e) => {
    e.preventDefault();
    console.log(id);
    const studentData = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      age: age,
      birthDate: birthDate,
      religion: religion,
    };

    axios
      .put(`https://localhost:7174/api/School/${id}`, studentData)
      .then((res) => {
        console.log(res);
        return setStudents(res.data);
      });

    setClick(!click);
    if (!click) {
      return "";
    }
  };

  const form = () => {
    return (
      <div className="form-popup" id="my-form">
        <form onSubmit={(e) => updateSubmit(e)} className="form-container">
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
  };

  const editHandler = (id) => {
    setId(id);
    setClick(!click);
  };

  const deleteEvent = (id) => {
    console.log(id);
    const studentId = {
      id: id,
    };
    axios
      .delete(`https://localhost:7174/api/School/${id}`, {
        data: { id: id },
      })
      .then((res) => {
        setStudents({
          students: res.data,
        });
      });
  };

  return (
    <>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr className="table-row">
              <th className="table-heading">First Name</th>
              <th className="table-heading">Last Name</th>
              <th className="table-heading">Age</th>
              <th className="table-heading">Birth Date</th>
              <th className="table-heading">Religion</th>
              <th className="table-heading">Action</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {students.length
              ? students.map((student) => {
                  return (
                    <tr key={student.id} className="table--row-student">
                      <>
                        <td className="table-student">{student.firstName}</td>
                        <td className="table-student"> {student.lastName} </td>
                        <td className="table-student"> {student.age} </td>
                        <td className="table-student"> {student.birthDate} </td>
                        <td className="table-student"> {student.religion} </td>
                        <td className="button-action">
                          <button
                            className="table-student-button open-button"
                            onClick={() => {
                              editHandler(student.id);
                            }}
                          >
                            Edit
                          </button>

                          <button
                            className="table-student-button"
                            onClick={() => deleteEvent(student.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>

        <div className="container">{click ? form() : null}</div>
      </div>
    </>
  );
}

export default GetApi;
