import React, {Component} from "react";
import {Link} from 'react-router-dom'
import {getMovies} from "../services/fakeMovieService";
import {getGenres} from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import {paginate} from "./common/paginate";
import ListGroup from "./common/ListGroup";
import MoviesTable from "./common/MoviesTable";
import SearchBox from "./common/SearchBox";
import _ from 'lodash'

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        selectedGenre: null,
        searchQuery: "",
        sortColumn: {path: 'title', order: 'asc'}
    };

    componentDidMount() {
        const genres = [{_id: "", name: "All Movies"}, ...getGenres()];
        this.setState({
            movies: getMovies(),
            genres: genres
        });
    }

    handleDelete = movie => {
        const moviess = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies: moviess});
    };

    handleLiked = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movie[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies: movies});
    };

    handlePageChange = page => {
        this.setState({currentPage: page});
    };

    handleGenreSelect = genre => {
        this.setState({selectedGenre: genre, searchQuery: "", currentPage: 1});
    };


    handleSearch = query => {
        this.setState({
            searchQuery: query, selectedGenre: null, currentPage: 1
        })
    }

    handleSort = sortColumn => {
        this.setState({
            sortColumn: sortColumn
        })

    };

    getPageData = () => {
        const {pageSize, currentPage, selectedGenre, sortColumn, searchQuery, movies: allMovies} = this.state;
        let filteredMovie = allMovies;
        if (searchQuery)
            filteredMovie = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));

        else if (selectedGenre && selectedGenre._id)
            filteredMovie = allMovies.filter(m => m.genre._id === selectedGenre._id);
        const sorted = _.orderBy(filteredMovie, sortColumn.path, sortColumn.order);

        const movies = paginate(sorted, currentPage, pageSize);

        return {totalCount: filteredMovie.length, data: movies}
    }

    render() {
        const {length: count} = this.state.movies;
        const {pageSize, currentPage, sortColumn,} = this.state;

        if (count === 0) return <p>There are no movie in the database.</p>;

        const {totalCount, data: movies} = this.getPageData();

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

                    <Link to="/movies/new" className="btn btn-primary" style={{marginBottom: 20}}>
                        New Movie
                    </Link>
                    <p>There are {totalCount} movie in the database.</p>

                    <SearchBox value={this.state.searchQuery} onChange={this.handleSearch}/>


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
