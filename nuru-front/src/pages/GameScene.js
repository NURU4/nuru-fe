import { useEffect, useState, useRef } from "react";
import { useHistory } from 'react-router';
import './GameScene.css';
import GameImage from "./GameImage";
import userEvent from "@testing-library/user-event";
import axios from "axios";

import good from './static/good.png'
import bad from './static/bad.png'

const GameScene = (props) => {
    const modelBase = "://833e-34-80-136-41.ngrok.io/invocations"

    const imageStyle = "max-width: 100%; max-height: 100%;"
    const history = useHistory();

    const [minutes, setMinutes] = useState()
    const [seconds, setSeconds] = useState()

    const [gameImages, setGameImages] = useState(history.location.state.previewImages);

    const canvasRef = useRef();
    const maxWidth = 904;
    const maxHeight = 904;
    const radius = 200
    
    const [gameResult, setGameResult] = useState([])

    const [answer, setAnswer] = useState([])
    const [stageCount, setStageCount] = useState(0);
    const [selectedPixel, setSelectedPixel] = useState({x: -1, y: -1})

    const [answerCount, setAnswerCount] = useState(0)
    const [totalCount, setTotalCount] = useState(0)

    const drawAnswer = () => {
        let canvas = canvasRef.current;
        let ctx = canvas.getContext('2d')
        for (let i = 0; i < answer.length; i++){
            let answerArray = answer[i].components
            let answerX = answerArray[0]
            let answerY = answerArray[1]
            let answerOffsetX = answerArray[2]
            let answerOffsetY = answerArray[3]
            ctx.beginPath();
            ctx.strokeStyle="green"
            ctx.lineWidth = 5;
            ctx.strokeRect(answerX, answerY, answerOffsetX, answerOffsetY);
            ctx.closePath();
        }

    }

    const fillCanvas = (imageSrc) => {
        let canvas = canvasRef.current
        let context = canvas.getContext('2d')
        context.clearRect(0, 0, maxWidth, maxHeight)
        var image = new Image()
        setTimeout(()=>{}, 1000)
        image.src = imageSrc
        setTimeout(()=>{}, 1000)
        var imageWidth = image.width;
        var imageHeight = image.height;
        var startPoint_x = 0;
        var startPoint_y = 0;
        if (imageWidth > imageHeight) {
            if (imageWidth > maxWidth){
                imageHeight *= maxWidth / imageWidth;
                imageWidth = maxWidth
            }   
        }
        else {
            if (imageHeight > maxHeight) {
                imageWidth *= maxHeight / imageHeight;
                imageHeight = maxHeight
            }
        }
        startPoint_y = (maxHeight - imageHeight) / 2
        startPoint_x = (maxWidth - imageWidth) / 2
        canvas.width = maxWidth
        canvas.height = maxHeight
        context.drawImage(image, startPoint_x, startPoint_y, imageWidth, imageHeight)
        setTimeout(1000)

        var modifiedImg = imageSrc.split(",")

        let URL = modelBase
        if (window.location.protocol === "https:") URL = "https" + modelBase
        else URL = "http" + modelBase
        console.log(URL)
        axios.post(URL, modifiedImg[1], {
            headers: {
                "content_type": 'image/png'
            }
        }).then(res=>{
            const answers = res.data.answers
            const answerLst = []
            for (let i = 0; i < answers.length; i++) {
                const comp = {id: i, components: answers[i]}
                answerLst.push(comp)
            }
            setAnswer(answerLst)
            setAnswerCount(0)
            setTotalCount(answerLst.length)
            return res.data.image
        }).then(imgVar=>{
            var myRoot = document.getElementById("2")
            if (myRoot.childNodes.length > 0) myRoot.removeChild( myRoot.firstChild)
            var myImg = document.createElement("img")
            myImg.setAttribute("src", modifiedImg[0] + "," +imgVar)
            myRoot.appendChild(myImg)
            setSeconds(0);
            setMinutes(2);
        })
    }

    const test = (nativeEvent) => {
        setSelectedPixel({x: nativeEvent.offsetX, y: nativeEvent.offsetY})
    }

    useEffect(()=>{
        let canvas = canvasRef.current;
        canvas.addEventListener("mousedown", test)
        fillCanvas(history.location.state.previewImages[0])
        setGameImages(history.location.state.previewImages)
    }, [])

    useEffect(()=> {
        if (selectedPixel.x === -1) return
        let canvas = canvasRef.current;
        let ctx = canvas.getContext('2d')
        let toDel = -1
        let foundAns = false
        let x = selectedPixel.x
        let y = selectedPixel.y
        for (let i = 0; i < answer.length; i++){
            let answerId = answer[i].id
            let answerArray = answer[i].components
            let answerX = answerArray[0]
            let answerY = answerArray[1]
            let answerOffsetX = answerArray[2]
            let answerOffsetY = answerArray[3]

            if ((answerX<= x && x <= answerX + answerOffsetX) && (answerY<= y && y <= answerY + answerOffsetY)){
                ctx.beginPath();
                ctx.strokeStyle="red"
                ctx.lineWidth = 3;
                ctx.strokeRect(answerX, answerY, answerOffsetX, answerOffsetY);
                ctx.closePath();
                toDel = answerId
                foundAns = true
                break
            }
        }
        var displayMenu = document.getElementById("correctioness")
        while(displayMenu.childNodes.length > 0) {
            displayMenu.removeChild(displayMenu.firstChild)
        }
        var goodOrBad = document.createElement("img")
        if (foundAns) {
            setAnswerCount(answerCount + 1)
            const toEnd = answer.length
            setAnswer(answer.filter((item) => (item.id !== toDel)))
            if (toEnd === 1){
                setStageCount(stageCount + 1)
                return
            }
            goodOrBad.setAttribute("src", good)
            goodOrBad.setAttribute("style", "width: 100px; height: 100px")
            displayMenu.appendChild(goodOrBad)
            setTimeout(()=>{displayMenu.removeChild(displayMenu.firstChild)}, 700)
        }
        else {
            goodOrBad.setAttribute("src", bad)
            goodOrBad.setAttribute("style", "width: 100px; height: 100px")
            displayMenu.appendChild(goodOrBad)
            setTimeout(()=>{if (displayMenu.childNodes.length > 0) displayMenu.removeChild(displayMenu.firstChild)}, 700)
        }
        
    }, [selectedPixel])

    useEffect(()=> {
        var txt = document.getElementById("shareContent")
        txt.textContent = String(answer.length) + " spots to find!"
    }, [answer])

    useEffect(() => {
        if (stageCount !== 0){
            setAnswerCount(0)
            setTotalCount(0)
        }
        if(gameImages.length === gameResult.length){
            alert("게임이 끝났습니다!")
            console.log(gameResult)
            history.push({
                pathname: "/game/result",
                state: {gameResult: gameResult}
            })
            return
        }
    }, [gameResult])

    useEffect(()=>{
        if (stageCount !== 0){
            if (answer.length !== 0) {
                alert("시간초과입니다! 정답을 확인하세요")
            }
            setGameResult(gameResult.concat({id: stageCount - 1, origin: totalCount, answer: answerCount}))
            var displayMenu = document.getElementById("2")
            if (stageCount !== gameImages.length){
                while(displayMenu.childNodes.length > 0) {
                    displayMenu.removeChild(displayMenu.firstChild)
                }
                fillCanvas(gameImages[stageCount])
                alert("다음 스테이지로 넘어갑니다!")
            }

        }
    }, [stageCount])

    useEffect(() => {
        if (minutes === -1 && seconds === -1) return
        const countdown = setInterval(() => {
            if (parseInt(seconds) > 0) {
                setSeconds(parseInt(seconds) - 1);
            }
            if (parseInt(seconds) === 0) {
                if (parseInt(minutes) === 0) {
                    clearInterval(countdown);
                    drawAnswer();
                    setStageCount(stageCount + 1)
                } else {
                setMinutes(parseInt(minutes) - 1);
                setSeconds(59);
                }
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
                <div id="correctioness" className="underbarMenu" >
                    
                </div>
                <div id="shareCase" className="underbarMenu" >
                    <div id="share" className="menuContainer" > 
                        <span id="shareContent"></span>
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