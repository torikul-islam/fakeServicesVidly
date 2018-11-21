import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "./common/paginate";
import ListGroup from "./common/ListGroup";
import MoviesTable from "./common/MoviesTable";
import _ from 'lodash'

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: "",
    sortColumn: { path: 'title', order: 'asc' }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Movies" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres: genres
    });
  }

  handleDelete = movie => {
    const moviess = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: moviess });
  };

  handleLiked = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movie[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies: movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({
      sortColumn: sortColumn
    })

  };

  getPageData = () => {
    const { pageSize, currentPage, selectedGenre, sortColumn, movies: allMovies } = this.state;
    const fileredMovie =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(fileredMovie, sortColumn.path, sortColumn.order);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: fileredMovie.length, data: movies }
  }

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, } = this.state;

    if (count === 0) return <p>There are no movie in the database.</p>;

    const { totalCount, data: movies } = this.getPageData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            textProperty="name"
            valueProperty="_id"
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>There are {totalCount} movie in the database.</p>

          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLiked}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />

          <Pagination
            itemsCount={totalCount}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
