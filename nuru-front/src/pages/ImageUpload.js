import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router';
import './ImageUpload.css';


const ImageUpload = ({location}) => {

    const [selectedImages, setSelectedImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const cookies = new Cookies();
    const history = useHistory();
    const [imageCount, setImageCount] = useState();
    useEffect(()=>{
    }, [selectedImages, previewImages])

    useEffect(()=> {
        if (previewImages.length === imageCount && imageCount !== 0){
            var root = document.getElementById('imageContainer');
            for (let i = 0; i < imageCount; i++){
                var container = document.createElement('div');
                container.setAttribute("className", "imageBox");
                var x = document.createElement('img');
                x.setAttribute("src", previewImages[i]);
                x.setAttribute("alt", "img unloaded");
                x.setAttribute("className", "previewImage")
                x.setAttribute("style", 
                    "border: 2px solid;max-width: 350px; max-height:350px; min-width: 350px; min-height:350px; border: solid 1.5px black;"
                )
                container.appendChild(x);
                root.appendChild(container);                
            }
        }
    }, [imageCount, previewImages])

    const readFileAndDisplay = (file) => {
        const root = document.getElementById('imageContainer');
        let reader = new FileReader();
        var fileURLS;
        reader.readAsDataURL(file);
        console.log(imageCount)
        reader.onload = () => {
            fileURLS = reader.result;
            setPreviewImages(previewImages =>[...previewImages, fileURLS]);
        };
    }

    const handleImageChange = (event) => {
        setImageCount(0)
        const fileArr = event.target.files;
        setSelectedImages(fileArr);
        setImageCount(fileArr.length)
        setPreviewImages([])
        // let fileURLS = [];
        if (fileArr.length > 5){
            alert("이미지는 한 번에 5개 까지만 업로드 가능합니다!");
            return;
        }
        if (fileArr.length === 0){
            return;
        }
        const root = document.getElementById('imageContainer');
        while(root.childElementCount > 0) {
            root.removeChild(root.firstChild);
        }
        for(let i = 0; i < fileArr.length; i++) {
            readFileAndDisplay(fileArr[i])
        }
        
    };
    const gameStart = () =>{
        if (selectedImages.length === 0) alert("이미지가 선택되지 않았습니다!");
        for (let i = 0; i < selectedImages.length; i++){
            const formData = new FormData();
            formData.append('userImage', selectedImages[i]);
            const mytoken = cookies.get('token')
            console.log(mytoken)
            axios.post('/imageupload', formData, {
                headers: {
                    "Content-Type": 'multipart/form-data',
                    "Authorization": mytoken
                }
            }).then(res=>{
                console.log(res);
                if (res['status'] === 200){
                    if (i === selectedImages.length - 1){
                        console.log(previewImages);
                        history.push({
                            pathname: "/game/gamescene",
                            state: {previewImages: previewImages}
                        })
                    }
                }
            }).catch(e=>{
                alert("이미지 업로드를 실패했습니다.");
            })
        }
    }

    const getMyImages = () => {
        const mytoken = cookies.get('token')
        console.log(mytoken)
        axios.get('/getimages', {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": mytoken
            }
        }).then(res=>res['data']).then(res=>res['list']).then(list=>{
            console.log(list);
        })
    }

    return <>
        <div id="container">
            <div className='gameImage' id="imageContainer">
            </div>
            <div id="inputLabels">
                <label className='inputLabel' id='firstLabel' htmlFor='submit'>새 이미지 업로드</label>
                <label className='inputLabel' id='secondLabel' htmlFor='load'>이전 이미지 로드</label>
            </div>
            <input id='submit' type='file' className="hide" accept='image/*' multiple name='file' onChange={handleImageChange}/>
            <button onClick={getMyImages} className="hide" id='load'>이전 이미지 로드</button>
            <button onClick={gameStart} id='gameStart'>선택된 이미지들로<br/>게임 진행</button>
        </div>
    </>
}

export default ImageUpload;


