import React, { Component } from 'react';
import axios from 'axios';

class MovieCard extends Component {
  state = {
    movieData: {}
  };
  
  componentDidMount() {
    axios
      .get(`https://www.omdbapi.com/?i=${this.props.movieID}&apikey=85fbecae`)
      .then(res => res.data)
      .then(res => {
        this.setState({ movieData: res })
      })
  }

  render() {

    const {
      Title,
      Released,
      Plot,
      Poster,
      imdbRating,
      Language,
      Country,
      Awards,
    } = this.state.movieData;

    return(
      <div className="movie-card-container">
        <div className="image-container">
          {
            Poster === 'N/A' ? 
              <div className="bg-no-image"></div>
              :
              <div className="bg-image" style = {{ backgroundImage: `url(${Poster})` }} ></div>
          }
        </div>
        <div className="movie-info">
          <h2>Movie Details</h2>
          <div>
            <h1>{Title}</h1>
            <small>Released Date: {Released}</small>
          </div>
          <div>
            <small>Language: {Language}</small><br />
            <small>Country: {Country}</small><br />
          </div>
          <h4>{imdbRating === 'N/A' ? ('Rating: ' + imdbRating) : ('Rating: ' + imdbRating + ' / 10')}</h4>
          <p>{Plot === 'N/A' ? '' : Plot && Plot.substr(0, 350)}</p>
          <small className="italic">{Awards === 'N/A' ? '' : Awards}</small>
        </div>
      </div>
    );
  }
}

export default MovieCard;