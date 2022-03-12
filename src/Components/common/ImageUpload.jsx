import React from 'react';

const ImageUpload = ({onClick, fileName, src}) => {

    return (
        <div onClick={onClick}>
            {!src && <button onClick={onClick}>Choose Image</button>}
            <img src={src} alt={'name'}/>
            <p>{fileName}</p>

        </div>
    );
};

export default ImageUpload;