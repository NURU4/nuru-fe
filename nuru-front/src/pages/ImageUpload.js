import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router';
import './ImageUpload.css';


const ImageUpload = ({location}) => {

    const [selectedImage, setSelectedImage] = useState(null);
    const cookies = new Cookies();
    //const [isChanged, setChange] = useState(0);
    const history = useHistory();
    const [imageSrc, setImage] = useState("https://s3-ap-northeast-2.amazonaws.com/nuruimages/uploaded-image");
    const [counter, setCount] = useState(0);

    const Anchor = (props) =>{
        history.push("/");
    }

    useEffect(()=> {
        console.log('a')
        handleImageUpload()
    }, [selectedImage])

    useEffect(() => {
        setCount(-1);
        setCount(counter+1);
    }, [])
    useEffect(()=>{
        console.log('imagemodified')
    }, [imageSrc])

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
            /*
            history.push({
                pathname:'/game/image-upload/confirm'
            });
            */
        }).catch(err=>{
            console.log(err);
            //alert("이미지를 불러올 수 없습니다.");
        })
        const modified = cookies.get('gameImage');
        /*
        history.push({
            pathname:'/game/image-upload'
        });
        */
        setCount(counter+1);
        setImage("https://s3-ap-northeast-2.amazonaws.com/nuruimages/uploaded-image" + "?" + Date.now())
        if (counter !== 0) alert('이미지가 업로드되었습니다.');
    }
    return <>
        <div id="container">
            <img id="gameImage" src={imageSrc} alt="img unloaded"/>
            <div id="inputLabels">
                <label className='inputLabel' id='firstLabel' htmlFor='submit'>새 이미지 업로드</label>
                <a href="https://www.naver.com" className='inputLabel' id='secondLabel'>이전 이미지 로드</a>
            </div>
            <input id='submit' type='file' accept='image/*' name='file' onChange={handleImageChange}/>
        </div>
    </>
}
//                
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