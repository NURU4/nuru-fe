import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router';
import './ImageUpload.css';


const ImageUpload = ({location}) => {

    const [selectedImages, setSelectedImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const cookies = new Cookies();
    //const [isChanged, setChange] = useState(0);
    const history = useHistory();
    const [imageSrc, setImage] = useState("https://s3-ap-northeast-2.amazonaws.com/nuruimages/uploaded-image");

    useEffect(()=>{
    }, [selectedImages, previewImages])

    const handleImageChange = (event) => {
        const fileArr = event.target.files;
        let fileURLS = [];
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
        setPreviewImages([])
        for(let i = 0; i < fileArr.length; i++) {
            let file = fileArr[i];
            let reader = new FileReader();
            reader.onload = () => {
                //console.log("load" + String(i));
                fileURLS[i] = reader.result;
                //fileURLS: preview of file( preview ImageSrc )
                setPreviewImages([...fileURLS]);
            };
            reader.onloadend = () => {
                //console.log("loadend" + String(i));

                var container = document.createElement('div');
                container.setAttribute("className", "imageBox");
                var x = document.createElement('img');
                x.setAttribute("src", String(fileURLS[i]));
                x.setAttribute("alt", "img unloaded");
                x.setAttribute("style", "border: 2px solid;")
                container.appendChild(x);
                root.appendChild(container);
            }
            reader.readAsDataURL(file);
            //console.log(previewImages);
        }
        //fileArr: file informations ( send to endpoint )
        setSelectedImages(fileArr);
    };
    const gameStart = () =>{
        let done = []
        for (let i = 0; i < selectedImages.length; i++){
            const formData = new FormData();
            formData.append('token', cookies.get('token'));
            formData.append('userImage', selectedImages[i]);
            console.log(selectedImages[i])
            axios.post('/imageupload', formData, {
                'content-type': 'multipart/form-data'
            }).then(res=>{
                console.log(res);
                if (res['status'] === 200){
                    done.push(String(i+1))
                    if (i === selectedImages.length - 1){
                        console.log("all done");
                    }
                }
            }).catch(e=>{
                alert(String(i+1)+"번째 이미지 업로드를 실패했습니다.");
            })
        }
    }

    const getMyImages = () => {
        const mytoken = cookies.get('token')
        axios.get('/getimages', {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": mytoken
            }
        }).then(res=>{
            console.log(res);
        })
    }
/*
    const handleImageUpload = () => {  

        const formData = new FormData();
        formData.append('token', cookies.get('token'));
        formData.append('userImage', selectedImages);
        //await
        axios.post('/imageupload', formData, {
            'content-type': 'multipart/form-data'
        })
        .then(res=>{
            return res['data']}).catch(err=>{
            console.log(err);
        })
        .then(res=>res['image_key'])
        .then(res=>axios.post('/getimage', {'USER_IMAGE_KEY': res}, {
            'Authorization': cookies.get('token')
        })).then(res=>{
            const urlContainer = res['data']
            console.log(urlContainer);
            cookies.set('gameImage', urlContainer);
        }).catch(err=>{
            console.log(err);
        })
        const modified = cookies.get('gameImage');
        /*
        history.push({
            pathname:'/game/image-upload'
        });
        setCount(counter+1);
        setImage("https://s3-ap-northeast-2.amazonaws.com/nuruimages/uploaded-image" + "?" + Date.now())
        if (counter !== 0) alert('이미지가 업로드되었습니다.');
        
    }
    */
    return <>
        <div id="container">
            <div className='gameImage' id="imageContainer">
            </div>
            
            <div id="inputLabels">
                <label className='inputLabel' id='firstLabel' htmlFor='submit'>새 이미지 업로드</label>
                <a href="https://www.naver.com" className='inputLabel' id='secondLabel'>이전 이미지 로드</a>
            </div>
            <button onClick={gameStart} id='gameStart'>선택된 이미지들로<br/>게임 진행</button>
            <input id='submit' type='file' accept='image/*' multiple name='file' onChange={handleImageChange}/>
            <button onClick={getMyImages}>dddddddddddd</button>
        </div>
    </>
}          
export default ImageUpload;




/*
    const [selectedImage, setSelectedImage] = useState(null);
    const cookies = new Cookies();
    //const [isChanged, setChange] = useState(0);
    const history = useHistory();
    const [imageSrc, setImage] = useState();
    const [counter, setCount] = useState(0);

    useEffect(()=> {
        console.log('a')
        handleImageUpload()
    }, [selectedImage])

    useEffect(() => {
        setCount(0);
        setCount(counter+1);
    }, [])

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };
    const handleImageUpload = () => {
        console.log("rerenderstart0");
        const formData = new FormData();
        formData.append('token', cookies.get('token'));
        formData.append('userImage', selectedImage);
        //await
        axios.post('/imageupload', formData, {
            'content-type': 'multipart/form-data'
        })
        .then(res=>{
            //alert("이미지가 업로드 되었습니다.")
            return res['data']}).catch(err=>{
            console.log(err);
            //alert("이미지 업로드에 실패하였습니다.")
        })
        .then(res=>res['image_key'])
        .then(res=>axios.post('/getimage', {'USER_IMAGE_KEY': res}, {
            'Authorization': cookies.get('token')
        })).then(res=>{
            const urlContainer = res['data']
            console.log(urlContainer);
            cookies.set('gameImage', urlContainer);
            /*
            history.push({
                pathname:'/game/image-upload/confirm'
            });

        }).catch(err=>{
            console.log(err);
            //alert("이미지를 불러올 수 없습니다.");
        })
        const modified = cookies.get('gameImage');
        setImage(modified['imageUrl']);
        /*
        history.push({
            pathname:'/game/image-upload'
        });
        
        setCount(counter+1);
        if (counter !== 0) alert('이미지가 업로드되었습니다.');
        */