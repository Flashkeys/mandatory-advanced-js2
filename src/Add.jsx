import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Add = () => {
  const [error, showError] = useState(false);
  const [success, setSuccess] = useState(false);  
  const [validationError, setValidationError] = useState(false);  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [director, setDirector] = useState('');
  const [rating, setRating] = useState('');

  const postMovie = (e) => {
    const validateTitle = /^(?=.{1,20}$).*/
    const validateDescription = /^(?=.{1,100}$).*/
    const validateDirector = /^(?=.{1,20}$).*/
    if (title.match(validateTitle) && description.match(validateDescription) && director.match(validateDirector) && rating) {
      console.log("succes");
      axios.post('http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies', {
        title,
        description,
        director,
        rating
      })
        .then(function () {
          setSuccess(true);
          showError(false)
          setValidationError(false)
        })
        .catch(function () {
          showError(true);
        });
    }
    else {
      setValidationError(true)
    }
    e.preventDefault()
  }
  return (
    <div className="container">
      {success && <div className="success" onClick={() => setSuccess(false)}>You have successfully added a new movie</div>}
      {error && <div className="error" onClick={() => showError(false)}>Something went wrong</div>}
      {validationError && <div className="error" onClick={() => showError(false)}>Please enter a valid information</div>}
      <form onSubmit={(e) => postMovie(e)}>
        <Link to="/" className="home">Home</Link>
        <div className="container-add">
          <h1>Add : </h1>
          <input onChange={(e) => setTitle(e.target.value)} value={title} className="form-control" placeholder="Title..." />
          <textarea onChange={(e) => setDescription(e.target.value)} className="form-control" value={description} placeholder="Description..." />
          <input onChange={(e) => setDirector(e.target.value)} className="form-control" value={director} placeholder="Director..." />
        </div>
        <label className="container-add" htmlFor="rating">Set rating : </label>
        <input onChange={(e) => setRating(e.target.value)} name='rating' type="radio" value="1" />1
      <input onChange={(e) => setRating(e.target.value)} name='rating' type="radio" value="2" />2
      <input onChange={(e) => setRating(e.target.value)} name='rating' type="radio" value="3" />3
      <input onChange={(e) => setRating(e.target.value)} name='rating' type="radio" value="4" />4
      <input onChange={(e) => setRating(e.target.value)} name='rating' type="radio" value="5" />5
      <br></br>
        <button type="submit">Submit</button>
      </form>
    </div>

  )
}
export default Add