import React, { useState } from "react";
import axios from "axios";

function CreateUser() {
  const [state, setState] = useState({
    username: "",
  });

  function handleOnChange(e) {
    const { name, value } = e.target;
    setState((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    const user = {
      username: state.username,
    };

    console.log(user);

    axios
      .post("http://localhost:5000/users/add", user)
      .then((res) => console.log(res.data));

    setState({
      username: "",
    });
  }

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={state.username}
            name="username"
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateUser;
