import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Nuru from './Nuru';

export default function Initpage() {
    const styles={
        textAlign: "center",
        position:"absolute",
        left: "50%",  
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "150px",
        height: "50px",
        margin: "50px 50px",
        padding: "10px 20px"
    }
    return (
        <>
            <Link to="/login"></Link>
        </>
    )
}
