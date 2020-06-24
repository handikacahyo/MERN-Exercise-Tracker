import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Exercise(props) {
  return (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0, 10)}</td>
      <td>
        <Link to={"/edit/" + props.exercise._id}>Edit </Link> |
        <a
          href="#"
          onClick={() => {
            props.delete(props.exercise._id);
          }}
        >
          {" "}
          Delete
        </a>
      </td>
    </tr>
  );
}

function ExercisesList() {
  const [state, setState] = useState({
    exercises: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/")
      .then((response) => {
        setState({
          exercises: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      console.log("axios get data value is unmounted !");
    };
  }, []);

  function deleteExercise(id) {
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then((res) => console.log(res.data));

    setState({
      exercises: state.exercises.filter(
        (exercisesListDB) => exercisesListDB._id !== id
      ),
    });
  }

  function exercisesList(props) {
    return (
      <Exercise exercise={props} delete={deleteExercise} key={props._id} />
    );
  }

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{state.exercises.map(exercisesList)}</tbody>
      </table>
    </div>
  );
}

export default ExercisesList;
