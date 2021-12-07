import { useEffect, useState } from "react";
import { useHistory } from 'react-router';
import './GameScene.css';

const GameScene = (props) => {
    const imageStyle = "max-width: 100%; max-height: 100%;"
    const history = useHistory();

    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(10)

    useEffect(()=>{
        const images = history.location.state.previewImages
        let r = document.getElementById("1")
        let img = document.createElement("img")
        if (r.childNodes.length === 0){
            img.setAttribute("src", images[0])
            img.setAttribute("className", "gameImage")
            img.setAttribute("style", imageStyle)
            r.appendChild(img)
        } 
    })
    useEffect(() => {
        const countdown = setInterval(() => {
            if (parseInt(seconds) > 0) {
                setSeconds(parseInt(seconds) - 1);
            }
            if (parseInt(seconds) === 0) {
                if (parseInt(minutes) === 0) {
                    clearInterval(countdown);
                } else {
                setMinutes(parseInt(minutes) - 1);
                setSeconds(59);
                }
            }
            if (parseInt(minutes) === 0 && parseInt(seconds) === 0){
                alert("개같이 멸망!");
                history.push("/")
            }
        }, 1000);
        return () => clearInterval(countdown);
      }, [minutes, seconds]);


    return <div id="gameBlock">
        <div id="backGround">
            <div className="temp">
                <div className="imageContainer" id="1">
                    
                </div>
            </div>
            <div className="temp">
                <div className="imageContainer" id="2">
                    
                </div>
            </div>
        </div>
        <div id="underBar">
            <div id="underBarBackground">
                <div id="timerCase" className="underbarMenu" >
                    <div id="timer" className="menuContainer" >
                        <span id="timerContent" className="menuText">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
                    </div>
                </div>
                <div id="shareCase" className="underbarMenu" >
                    <div id="share" className="menuContainer" >
                        <span id="shareContent">게임 공유하기</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default GameScene