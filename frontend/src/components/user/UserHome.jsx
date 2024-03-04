import { useState, useEffect } from "react";
import axios from "axios";
import UserNavbar from "./UserNavbar";

function UserHome(){
    const [properties, setProperties] = useState([]);

    axios.defaults.withCredentials = true;
    useEffect(()=>{
        const fetchProperties = async()=>{
            try{
                const response = await axios.get("http://localhost:5001/properties/getAllProperties")
                setProperties(response.data);
            }catch(e){
                console.log(e);
            }
        }
        fetchProperties();
    },[]);

    return(
        <>
        <UserNavbar/>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <h1 className="text-2xl font-semibold text-gray-900">Properties</h1>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {properties.map((property, index) => (
                    <div key={index} className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <img src={property.image} alt="Property" className="w-full h-48 object-cover"/>
                        <div className="px-4 py-4 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">{property.title}</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">{property.description}</p>
                            <ul className="mt-2 grid grid-cols-1 gap-2">
                                <li className="text-sm text-gray-600">Location: {property.location}</li>
                                <li className="text-sm text-gray-600">City: {property.city}</li>
                                <li className="text-sm text-gray-600">State: {property.state}</li>
                                <li className="text-sm text-gray-600">Price: ₹{property.price}</li>
                                <li className="text-sm text-gray-600">Dimensions: {property.dimensions}</li>
                                <li className="text-sm text-gray-600">Realtor Email: {property.realtorEmail}</li>
                                <li className="text-sm text-gray-600">Realtor Mobile: {property.realtorMobile}</li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}

export default UserHome;
