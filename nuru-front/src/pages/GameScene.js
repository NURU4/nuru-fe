import { useEffect, useState, useRef } from "react";
import { useHistory } from 'react-router';
import './GameScene.css';
import GameImage from "./GameImage";
import userEvent from "@testing-library/user-event";

const GameScene = (props) => {
    const imageStyle = "max-width: 100%; max-height: 100%;"
    const history = useHistory();

    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)

    const [gameImages, setGameImages] = useState(history.location.state.previewImages);

    const canvasRef = useRef();
    const maxWidth = 904;
    const maxHeight = 904;
    const radius = 200
    
    const [answer, setAnswer] = useState([{id:1, x: 450, y: 450}, {id:2, x: 1, y: 1}, {id:3, x: 900, y: 900}])
    const [stageCount, setStageCount] = useState(0);
    const [selectedPixel, setSelectedPixel] = useState({x: -1, y: -1})

    const fillCanvas = (imageSrc) => {
        let canvas = canvasRef.current;
        let context = canvas.getContext('2d')
        context.clearRect(0, 0, maxWidth, maxHeight)
        var image = new Image()
        image.src = imageSrc
        setTimeout(() => {
            console.log("sleep~~");
            setSeconds(0);
            setMinutes(2);
        }, 1000);

        var imageWidth = image.width;
        var imageHeight = image.height;
        var startPoint_x = 0;
        var startPoint_y = 0;
        if (imageWidth > imageHeight) {
            if (imageWidth > maxWidth){
                imageHeight *= maxWidth / imageWidth;
                imageWidth = maxWidth
            }
            startPoint_y = (maxHeight - imageHeight) / 2
        }
        else {
            if (imageHeight > maxHeight) {
                imageWidth *= maxHeight / imageHeight;
                imageHeight = maxHeight
            }
            startPoint_x = (maxWidth - imageWidth) / 2
        }

        canvas.width = maxWidth
        canvas.height = maxHeight
        context.drawImage(image, startPoint_x, startPoint_y, imageWidth, imageHeight)

    }

    const test = (nativeEvent) => {
        setSelectedPixel({x: nativeEvent.offsetX, y: nativeEvent.offsetY})
    }

    useEffect(()=>{
        console.log("rerenderCanvas")
        let canvas = canvasRef.current;
        canvas.addEventListener("mousedown", test)
        fillCanvas(history.location.state.previewImages[0])
    }, [])

    useEffect(()=> {
        if (selectedPixel.x === -1) return
        console.log(selectedPixel)
        let canvas = canvasRef.current;
        let ctx = canvas.getContext('2d')
        let toDel = -1
        let foundAns = false
        let x = selectedPixel.x
        let y = selectedPixel.y
        for (let i = 0; i < answer.length; i++){
            let answerX = answer[i]['x']
            let answerY = answer[i]['y']
            console.log("check")
            console.log(answerX, answerY)
            if ((answerX - radius<= x && x <= answerX + radius) && (answerY - radius<= y && y <= answerY + radius)){
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.strokeStyle="red"
                ctx.stroke();
                ctx.closePath();
                toDel = answer[i]['id']
                foundAns = true
                break
            }
        }
        if (foundAns) {
            console.log('gonnaDelete', toDel)
            console.log(toDel)
            setAnswer(answer.filter((item) => (item.id !== toDel)))
        }
        else {
            alert("오답입니다 ㅎ;")
        }
    }, [selectedPixel])

    useEffect(()=> {
        if (answer.length === 0) {
            alert("모든 정답을 찾으셨습니다!");
            setAnswer([{id: 1, x: 200, y:  200}, {id: 2, x: 900, y: 900}])
            setStageCount(stageCount+1)
        }
    }, [answer])

    useEffect(()=>{
        console.log("stagecount", stageCount)
        console.log("gameImages", gameImages)
        if (stageCount !== 0){
            if(stageCount === gameImages.length){
                alert("끝났다리~ 히히~")
                return
            }
            console.log(stageCount)
            let canvas = canvasRef.current;
            const context = canvas.getContext('2d')
            fillCanvas(gameImages[stageCount])
            alert("다음 스테이지로 넘어갑니다! 히히~")
        }
    }, [stageCount])



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
                //alert("개같이 멸망!");
            }
        }, 1000);
        return () => {
            clearInterval(countdown)
        };
    }, [minutes, seconds]);



    return <div id="gameBlock">
        <div id="backGround">
            <div className="temp">
                <div className="imageContainer" id="1">
                    <canvas ref={canvasRef}/>
                </div>
            </div>
            <div className="temp">
                <div className="imageContainer" id="2">
                    이미지를 불러오는 중입니다..
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

/*
let r = document.getElementById("1")
let img = document.createElement("img")
if (r.childNodes.length === 0){
    img.setAttribute("src", history.location.state.previewImages[0])
    img.setAttribute("id", "originalImage")
    img.setAttribute("className", "gameImage")
    img.setAttribute("style", imageStyle)
    r.appendChild(img)
}
console.log(gameImages)
*/