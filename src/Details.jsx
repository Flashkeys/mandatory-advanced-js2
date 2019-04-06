import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Details = () => {
    const [details, setDetails] = useState({})
    useEffect(() => {
        axios.get(`http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/${id}`)
            .then(res => {
                setDetails(res.data)
            })
    }, [])

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    return (
        <div className="details">
            <div className="details-content">
                <Link to="/" className="home">Home</Link>
                <h1>Details : </h1>
                <h3>Title : {details.title}</h3>
                <p>Description : {details.description}</p>
                <p>Director : {details.director}</p>
                <p>{details.rating} / 5</p>
            </div>
        </div>
    )
}
export default Details