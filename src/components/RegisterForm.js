import React from 'react';
import Form from './common/Form';
import Joi from 'joi-browser';



class RegisterForm extends Form {
    state = {
        data: { username: "", password: "", name: "" },
        errors: {}
    }

    schema = {
        username: Joi.string()
            .required()
            .email()
            .label("User name"),
        password: Joi.string()
            .required()
            .min(5)
            .label("Password"),
        name: Joi.string()
            .required()
            .label("Password")
    }

    doSubmit = () => {
        // call the server
        console.log("submitted")
    }

    render() {
        return (

            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "User name")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderInput("name", "Name")}
                    {this.renderButton("Register")}
                </form>
            </div>
        );
    }
}

export default RegisterForm;