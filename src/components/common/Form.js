import React, { Component } from 'react';
import Input from './input';
import joi from 'joi-browser'

class Form extends Component {
    state = {
        data: {},
        errors: {}
    }

    validate = () => {
        const options = { abortEarly: false }
        const result = joi.validate(this.state.data, this.schema, options);
        if (!result.error)
            return null
        const errors = {};
        for (let item of result.error.details)
            errors[item.path[0]] = item.message;
        return errors;


        // const errors = {};
        // const { data } = this.state;
        // if (data.username.trim() === "")
        //     errors.username = "User name is required.";
        // if (data.password.trim() === "")
        //     errors.password = "Password is required.";
        // return Object.keys(errors).length === 0 ? null : errors;
    }

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value } //if username username : value
        const schema = { [name]: this.schema[name] }
        const { error } = joi.validate(obj, schema)
        return error ? error.details[0].message : null


        //Without joi ........... form validation manually.
        // if (input.name === 'username') {
        //     if (input.value.trim() === '')
        //         return "User name is required."
        // }
        // if (input.name === 'password') {
        //     if (input.value.trim() === '')
        //         return "Password is required."
        // }
    }


    handleSubmit = e => {
        e.preventDefault();
        //Form validation check here ...........
        const errors = this.validate();
        this.setState({
            errors: errors || {}
        });

        this.doSubmit();
    };


    handleOnChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errosMessage = this.validateProperty(input);
        if (errosMessage)
            errors[input.name] = errosMessage;
        else delete errors[input.name];

        const data = { ...this.state.data }
        data[input.name] = input.value;
        this.setState({
            data: data,
            errors: errors
        });
    };

    renderButton = (label) => {
        return <button disabled={this.validate()} className="btn btn-primary">{label}</button>
    }

    renderInput = (name, label, type = "text") => {
        const { data, errors } = this.state
        return <Input
            name={name}
            value={data[name]}
            label={label}
            type={type}
            onChange={this.handleOnChange}
            error={errors[name]}
        />
    }

}

export default Form;