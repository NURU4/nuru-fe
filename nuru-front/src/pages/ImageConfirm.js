import axios from 'axios';
import { useState } from 'react';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router';
import './ImageConfirm.css';

const ImageConfirm = () => {
    const history = useHistory();
    const cookies = new Cookies();
    let imageUrl = cookies.get('gameImage')
    //console.log(location.props.imageUrl)
    console.log(imageUrl);
    return <div id="imageBox">
        <img id="gameImage" src={imageUrl['imageUrl'] + "?" + Date.now()} alt="img unloaded"/>
    </div>
}

export default ImageConfirm;