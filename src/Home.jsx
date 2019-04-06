import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [results, setResult] = useState([])

  const fetchData = () => {
    axios.get("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies")
    .then(res => {
      setResult(res.data)
    })
    .catch(function (error) {
      alert('Something went wrong while fetching the movies')
      console.log(error);
    });
  }

  useEffect(() => {
    fetchData()
  }, [])

  const deleteMovie = data => {
    axios.delete(`http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/${data.id}`)
      .then(function (response) {
        fetchData()
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  if (!results.length) {
    return (
      <div>
        <h3>No movies Found</h3>
        <Link to="/Add">Add new movie</Link>
      </div>
    )
  };
  return (
    <div className="container">
    <Link to="/Add" className="add">Add</Link>
      <table className="main">
        
        <tbody>
          <tr>
            <th className="border-left">Name</th>
            <th className="border-left-right">Director</th>
            <th className="border-right">Rating</th>
          </tr>
          {results.map((data, i) =>
            <tr key={i}>
              <td>{data.title}</td>
              <td>{data.director}</td>
              <td>{data.rating}/5</td>
              <td><Link to={`/Details?id=${data.id}`}>Details</Link></td>
              <td><Link to={`/Edit?id=${data.id}`}>Edit</Link></td>
              <td><a href="##" onClick={() => { deleteMovie(data) }}>Delete</a></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default Home