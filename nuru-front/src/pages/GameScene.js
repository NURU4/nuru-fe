import { useEffect } from "react";
import { useHistory } from 'react-router';
import './GameScene.css';

const GameScene = (props) => {
    const history = useHistory()
    useEffect(()=>{
        const images = history.location.state.previewImages
        console.log(images)
        let img = document.createElement("img")
        img.setAttribute("src", images[0])
        let r = document.getElementById("1")
        r.appendChild(img)
    })
    return <div id="gameBlock">
        <div id="backGround">
            <div className="imageContainer" id="1">
                
            </div>
        </div>
        <div id="sideBar">
            d
        </div>
        
    </div>
}

export default GameScene