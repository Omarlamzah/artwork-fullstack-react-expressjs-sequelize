import React from 'react';
import "./css.css"

const Checkbox = (props) => {
    return (
        <div className="toggler">
    <input onChange={(e)=>{props.onChange(e)}} id="toggler-1" name="toggler-1" type="checkbox" />
    <label for="toggler-1">
        <svg className="toggler-on" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
            <polyline className="path check" points="100.2,40.2 51.5,88.8 29.8,67.5"></polyline>
        </svg>
        <svg className="toggler-off" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
            <line className="path line" x1="34.4" y1="34.4" x2="95.8" y2="95.8"></line>
            <line className="path line" x1="95.8" y1="34.4" x2="34.4" y2="95.8"></line>
        </svg>
    </label>
</div>
    );
}

export default Checkbox;
