import React from 'react';
import "./css.css"

const Button3dlogin = (props) => {
    return (
        <div>
            <button type="button" className="button ml-[-50px]">
  <div className="button-top">{props.namebutton}</div>
  <div className="button-bottom"></div>
  <div className="button-base"></div>
</button>
        </div>
    );
}

export default Button3dlogin;
