import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Edit = () => {
  const [title, setTitle] = useState('');
  const [error, showError] = useState(false);
  const [validationError, setValidationError] = useState(false);  
  const [success, setSuccess] = useState(false);
  const [description, setDescription] = useState('');
  const [director, setDirector] = useState('');
  const [rating, setRating] = useState('');
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  useEffect(() => {
    axios.get(`http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/${id}`)
      .then(res => {
        setTitle(res.data.title)
        setDescription(res.data.description)
        setDirector(res.data.director)
        setRating(res.data.rating)

      })
  }, [])
  const postMovie = (e) => {
    e.preventDefault();
    const validateTitle = /^(?=.{1,20}$).*/
    const validateDescription = /^(?=.{1,100}$).*/
    const validateDirector = /^(?=.{1,20}$).*/
    if (title.match(validateTitle) && description.match(validateDescription) && director.match(validateDirector) && rating) {

      axios.put(`http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/${id}`, {
        title,
        description,
        director,
        rating,
      })
        .then(function () {
          setSuccess(true);
          showError(false)
          setValidationError(false)
        })
        .catch(function () {
          showError(true);
        });
    } else {
      setValidationError(true)
    }
  }

  return (
    <div className="container">
      {success && <div className="success" onClick={() => setSuccess(false)}>You have successfully added a new movie</div>}
      {error && <div className="error" onClick={() => showError(false)}>Something went wrong</div>}
      {validationError && <div className="error" onClick={() => showError(false)}>Please enter a valid information</div>}
      <Link to="/" className="home">Home</Link>
      <form className='p-5' onSubmit={(e) => postMovie(e)}>

        <div className="container-add">
          <h1>Edit : </h1>
          <input onChange={(e) => setTitle(e.target.value)} value={title} className="form-control" placeholder="Title..." />
          <textarea onChange={(e) => setDescription(e.target.value)} className="form-control" value={description} placeholder="Description..." />
          <input onChange={(e) => setDirector(e.target.value)} className="form-control" value={director} placeholder="Director..." />
        </div>
        <label htmlFor="rating">Set rating</label>
        <input onChange={(e) => setRating(e.target.value)} name='rating' type="radio" value="1" checked={rating === '1'} /><label htmlFor="rating">1</label>
        <input onChange={(e) => setRating(e.target.value)} name='rating' type="radio" value="2" checked={rating === '2'} /><label htmlFor="rating">2</label>
        <input onChange={(e) => setRating(e.target.value)} name='rating' type="radio" value="3" checked={rating === '3'} /><label htmlFor="rating">3</label>
        <input onChange={(e) => setRating(e.target.value)} name='rating' type="radio" value="4" checked={rating === '4'} /><label htmlFor="rating">4</label>
        <input onChange={(e) => setRating(e.target.value)} name='rating' type="radio" value="5" checked={rating === '5'} /><label htmlFor="rating">5</label>
        <br></br>
        <button className='btn btn-primary d-block' type="submit">Submit</button>
      </form>
    </div>
  )
}
export default Edit