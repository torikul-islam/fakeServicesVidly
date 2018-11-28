import React from 'react';
import Form from './common/Form';
import Joi from 'joi-browser';
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from '../services/fakeMovieService';


class MovieForm extends Form {
    state = {
        data: {
            title: "",
            genreId: "",
            numberInStock: "",
            dailyRentalRate: ""
        },
        genres: [],
        errors: {}
    }

    schema = {
        _id: Joi.string(),

        title: Joi.string()
            .required()
            .label("Title"),

        genreId: Joi.string()
            .required()
            .label("Genre"),

        numberInStock: Joi.number()
            .required()
            .min(0)
            .max(100)
            .label("Number in Stock"),

        dailyRentalRate: Joi.number()
            .required()
            .min(0)
            .max(100)
            .label("Daily Rental Rate")
    }


    componentDidMount() {
        const genres = getGenres();

        this.setState({ genres });

        const movieId = this.props.match.params.id;

        if (movieId === "new") return;

        const movie = getMovie(movieId);

        // if (!movie) return this.props.history.replace("/not-found")

        // this.setState({ data: this.mapToViewModel(movie) });
    }

    // mapToViewModel = (movie) => {
    //     return {
    //         _id: movie._id,
    //         title: movie.title,
    //         genreId: movie.genre._id,
    //         numberInStock: movie.numberInStock,
    //         dailyRentalRate: movie.dailyRentalRate
    //     }
    // }

    doSubmit = () => {
        saveMovie(this.state.data);

        this.props.history.push("/movies");
    }
    render() {
        return (
            <div>
                <h1>
                    Movie Form
                </h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "Title")}
                    {this.renderInput("genreId", "Genre", this.state.genres)}
                    {this.renderInput("numberInStock", "Number in Stock", "number")}
                    {this.renderInput("dailyRentalRate", "Rate")}
                    {this.renderButton("Save")}
                </form>
            </div>
        );
    }
}

export default MovieForm;