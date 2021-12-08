import { useRef, useEffect, useState } from "react";




const GameImage = () => {

    const canvasRef = useRef();
    const maxWidth = 904;
    const maxHeight = 904;
    
    const test = (nativeEvent) => {
        var ctx = canvasRef.current.getContext('2d')
        ctx.beginPath();
        ctx.arc(nativeEvent.offsetX, nativeEvent.offsetY, 20, 0, Math.PI * 2);
        ctx.strokeStyle="red"
        ctx.stroke();
        ctx.closePath();
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')

        const image = new Image()
        image.src = "https://nuruimages.s3.ap-northeast-2.amazonaws.com/fileuploadtest"

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
        canvas.addEventListener("mousedown", test)

    },[]);
    return <canvas ref={canvasRef}/>;
}

export default GameImage