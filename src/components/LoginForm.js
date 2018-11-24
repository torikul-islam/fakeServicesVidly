import React, { Component } from 'react';
import Input from './common/input';



class LoginForm extends Component {
    state = {
        account: {
            username: '',
            password: ''
        },
        errors: {}
    }

    validate = () => {
        const errors = {};
        const { account } = this.state;
        if (account.username.trim() === "")
            errors.username = "User name is required.";
        if (account.password.trim() === "")
            errors.password = "Password is required.";
        return Object.keys(errors).length === 0 ? null : errors;
    }

    handleSubmit = e => {
        e.preventDefault();

        // Form validation check here ...........
        const errors = this.validate();

        this.setState({
            errors: errors || {}
        })
    }
    validateProperty = input => {
        if (input.name === 'username') {
            if (input.value.trim() === '')
                return "User name is required."
        }
        if (input.name === 'password') {
            if (input.value.trim() === '')
                return "Password is required."
        }
    }

    handleOnChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errosMessage = this.validateProperty(input);
        if (errosMessage)
            errors[input.name] = errosMessage;
        else delete errors[input.name];

        const account = { ...this.state.account }
        account[input.name] = input.value;
        this.setState({
            account: account,
            errors: errors
        })
    }

    render() {
        const { account, errors } = this.state
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <Input
                        name="username"
                        value={account.username}
                        label="User Name"
                        onChange={this.handleOnChange}
                        type="text"
                        error={errors.username}
                    />
                    <Input
                        name="password"
                        value={account.password}
                        label="Password"
                        onChange={this.handleOnChange}
                        type="password"
                        error={errors.password}
                    />
                    <button className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }
}

export default LoginForm;