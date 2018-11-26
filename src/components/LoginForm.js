import React from 'react';
import Form from './common/Form';
import joi from 'joi-browser'


class LoginForm extends Form {
    state = {
        data: {
            username: '',
            password: ''
        },
        errors: {}
    }

    schema = {
        username: joi.string().required().label("Username"),
        password: joi.string().required().label("Password")
    }





    doSubmit = () => {
        // call the server
        console.log("submitted")
    }



    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "User name")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderButton("Login")}
                </form>
            </div>
        );
    }
}

export default LoginForm;