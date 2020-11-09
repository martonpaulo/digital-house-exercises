import React, { Component } from 'react';
import axios from 'axios';
import MovieCard from '../MovieCard/MovieCard';

class MovieList extends Component {  
  state = {
    movieList: [],
    searchTerm: '',
  }

  search = event => {
    event.preventDefault();
    axios
      .get(`https://www.omdbapi.com/?apikey=85fbecae&s=${this.state.searchTerm}&plot=full`)
      .then(res => res.data)
      .then(res => {
        const movieList = res.Search.map(movie => movie.imdbID);
        this.setState({ movieList }); 
      })
      .catch(function (error) {
        console.log(error);
      })
    ;
  }

  handleChange = event => {
    this.setState({
      searchTerm: event.target.value
    });
  }

  render() {
    const { movieList } = this.state;

    return (
      <div>
        <form onSubmit={this.search}>
          <input placeholder="Search for a movie" onChange={this.handleChange}/>
          <button type="submit">Search</button>
        </form>
        {
          movieList.length > 0 ? (
            movieList.map(id => (
              <MovieCard movieID={id} key={id}></MovieCard>
            ))
          ) : (
            <center><p>Search for a movie!</p></center>
          )
        }
      </div>
    );
  }
}

export default MovieList;