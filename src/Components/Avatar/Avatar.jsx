import React from 'react';
import "./Avatar.css";

const Avatar = ({src,displayName}) => {
    return (

        <div className={'avatar'}>
            <img src={src} alt=""/>
        </div>

    );
};

export default Avatar;
