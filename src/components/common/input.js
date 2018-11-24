import React from 'react';

const Input = (props) => {
    return (
        <div className="form-group">
            <label htmlFor={props.name}>{props.label}</label>
            <input
                value={props.value}
                onChange={props.onChange}
                name={props.name}
                type={props.type} id={props.name} className="form-control" />
            {props.error && <div className="alert alert-danger">
                {props.error}
            </div>}
        </div>

    );
}

export default Input;