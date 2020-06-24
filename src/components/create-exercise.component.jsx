import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateExercise() {
  const [state, setState] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });

  useEffect(() => {
    axios.get("http://localhost:5000/users/").then((response) => {
      if (response.data.length > 0) {
        setState({
          users: response.data.map((user) => user.username),
          username: response.data[0].username,
        });
      }
    });

    return () => {
      console.log("axios get input data value is unmounted !");
    };
  }, []);

  function handleOnChange(e) {
    const { name, value } = e.target;
    setState((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  function onChangeDate(date) {
    setState((prevValue) => {
      return { ...prevValue, date: date };
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    const exercise = {
      username: state.username,
      description: state.description,
      duration: state.duration,
      date: state.date,
    };

    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then((res) => console.log(res.data));

    window.location = "/";
    console.log(exercise);
  }

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={state.username}
            name="username"
            onChange={handleOnChange}
          >
            {state.users.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={state.description}
            name="description"
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={state.duration}
            name="duration"
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <DatePicker selected={state.date} onChange={onChangeDate} />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateExercise;
