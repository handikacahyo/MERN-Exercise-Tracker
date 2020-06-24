import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditExercise(props) {
  const [state, setState] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });

  const sourceOne = axios.get(
    "http://localhost:5000/exercises/" + props.match.params.id
  );
  const sourceTwo = axios.get("http://localhost:5000/users/");

  useEffect(() => {
    axios
      .all([sourceOne, sourceTwo])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];

          setState({
            username: responseOne.data.username,
            description: responseOne.data.description,
            duration: responseOne.data.duration,
            date: new Date(responseOne.data.date),
            users: responseTwo.data.map((user) => user.username),
          });
        })
      )
      .catch(function (error) {
        console.log(error);
      });

    return () => {
      console.log("axios get previous data value is unmounted !");
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
      .post(
        "http://localhost:5000/exercises/update/" + props.match.params.id,
        exercise
      )
      .then((res) => console.log(res.data));

    window.location = "/";
    console.log(exercise);
  }

  return (
    <div>
      <h3>Edit Exercise Log</h3>
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
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default EditExercise;
