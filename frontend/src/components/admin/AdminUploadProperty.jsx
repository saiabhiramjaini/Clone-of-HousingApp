import { useState } from 'react';
import axios from 'axios';
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

    const transformFile = (file) => {
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImage(reader.result);
            };
        } else {
            setImage("");
        }
    };

    axios.defaults.withCredentials = true;
    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/properties/uploadProperty', {
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
            });
            alert(response.data.msg);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-5">
            <h1 className="text-2xl font-semibold mb-5">Upload Property</h1>
            <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Upload property images</label>
                <input type="file" onChange={handleImageChange} className="block w-full text-sm text-gray-700
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} className="input input-bordered w-full mb-4" />
                <input type="text" placeholder="Location" onChange={(e) => setLocation(e.target.value)} className="input input-bordered w-full mb-4" />
                <input type="text" placeholder="City" onChange={(e) => setCity(e.target.value)} className="input input-bordered w-full mb-4" />
                <input type="text" placeholder="State" onChange={(e) => setState(e.target.value)} className="input input-bordered w-full mb-4" />
                <input type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} className="input input-bordered w-full mb-4" />
                <input type="text" placeholder="Dimensions" onChange={(e) => setDimensions(e.target.value)} className="input input-bordered w-full mb-4" />
                <input type="email" placeholder="Realtor Email" onChange={(e) => setRealtorEmail(e.target.value)} className="input input-bordered w-full mb-4" />
                <input type="text" placeholder="Realtor Mobile" onChange={(e) => setRealtorMobile(e.target.value)} className="input input-bordered w-full mb-4" />
            </div>
            <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} className="textarea textarea-bordered w-full mb-4"></textarea>
            <button onClick={handleUpload} className="btn btn-primary">Upload</button>
        </div>
    );
}

export default AdminUploadProperty;
