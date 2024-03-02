import React from "react";
import { useState, useEffect } from "react";

import Persondata from "./Persondata.js";
function AddPerson({ addPersonData }) {
  const [firstname, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!firstname || !lastName) {
      alert("First name Last name cannot be blank");
    } else {
      addPersonData(firstname, lastName);
      setFirstname("");
      setLastName("");
    }
  };

  return (
    <div className="container my-3">
      <h3>Add a Person</h3>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            First Name
          </label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="form-control"
            id="firstname"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">
            last name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="form-control"
            id="lastName"
          />
        </div>
        <button type="submit" className="btn btn-sm btn-success">
          Add Person
        </button>
      </form>
    </div>
  );
}

function PersonShow({ persondataView, onDelete }) {
  const editPerson = (index) => {};

  return (
    <tr key={persondataView.id}>
      <th scope="row">{persondataView.id}</th>
      <td>{persondataView.firstname}</td>
      <td>{persondataView.lastName}</td>
      <td>
        <div>
          <button
            type="button"
            onClick={() => editPerson(persondataView.id)}
            className="btn btn-primary"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => {
              onDelete(persondataView);
            }}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(Persondata);
  }, []);
  const onDelete = (persondataView) => {
    console.log("I am ondelete of todo", persondataView);
    // Deleting this way in react does not work
    // let index = todos.indexOf(todo);
    // todos.splice(index, 1);

    setData(
      data.filter((e) => {
        return e !== persondataView;
      }),
    );
  };

  const addPersonData = (firstname, lastName) => {
    let sno;
    if (data.length === 0) {
      sno = 0;
    } else {
      sno = data[data.length - 1].id + 1;
    }
    const myPerson = {
      id: sno,
      firstname: firstname,
      lastName: lastName,
    };
    setData([...data, myPerson]);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <AddPerson addPersonData={addPersonData} />
          {console.log(data)}
          <table className="table table-responsive">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((persondataView) => (
                <PersonShow
                  key={persondataView.id}
                  persondataView={persondataView}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
