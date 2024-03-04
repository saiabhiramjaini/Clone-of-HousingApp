import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function AdminUploadProperty() {
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [price, setPrice] = useState(0);
    const [dimensions, setDimensions] = useState("");
    const [realtorEmail, setRealtorEmail] = useState("");
    const [realtorMobile, setRealtorMobile] = useState("");

    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        transformFile(file);
      };
    
    const transformFile = (file)=>{
      const reader = new FileReader()
      if(file){
        reader.readAsDataURL(file)
        reader.onloadend = ()=>{
          setImage(reader.result);
        }
      }else{
        setImage("");
      }
    }

    axios.defaults.withCredentials = true;
    const handleUpload = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5001/properties/uploadProperty',{
                image,
                title,
                description,
                location,
                city,
                state,
                price,
                dimensions,
                realtorEmail,
                realtorMobile
            })
            alert(response.data.msg)
        }catch(e){
            console.log(e);
        }
    };

    return (
        <>
            <h1>Upload Property</h1>
            <label htmlFor="image">Upload property images</label>
            <input type="file" onChange={handleImageChange} />
            <br /><br />
            <label htmlFor="title">Title</label>
            <br />
            <input type="text" onChange={(e) => setTitle(e.target.value)} />
            <br /><br />
            <label htmlFor="description">Description</label>
            <br />
            <textarea onChange={(e) => setDescription(e.target.value)} />
            <br /><br />
            <label htmlFor="location">Location</label>
            <br />
            <input type="text"  onChange={(e) => setLocation(e.target.value)} />
            <br /><br />
            <label htmlFor="city">City</label>
            <br />
            <input type="text"  onChange={(e) => setCity(e.target.value)} />
            <br /><br />
            <label htmlFor="state">State</label>
            <br />
            <input type="text"  onChange={(e) => setState(e.target.value)} />
            <br /><br />
            <label htmlFor="price">Price</label>
            <br />
            <input type="number"  onChange={(e) => setPrice(e.target.value)} />
            <br /><br />
            <label htmlFor="dimensions">Dimensions</label>
            <br />
            <input type="text" onChange={(e) => setDimensions(e.target.value)} />
            <br /><br />
            <label htmlFor="realtorEmail">Realtor Email</label>
            <br />
            <input type="email" onChange={(e) => setRealtorEmail(e.target.value)} />
            <br /><br />
            <label htmlFor="realtorMobile">Realtor Mobile</label>
            <br />
            <input type="text" onChange={(e) => setRealtorMobile(e.target.value)} />
            <br /><br />
            <button onClick={handleUpload}>Upload</button>
        </>
    );
}

export default AdminUploadProperty;
