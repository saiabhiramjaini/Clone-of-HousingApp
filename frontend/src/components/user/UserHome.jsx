import { useState, useEffect } from "react";
import axios from "axios";
import UserNavbar from "./UserNavbar";

function UserHome(){
    const [properties, setProperties] = useState([]);

    axios.withCredentials = true;
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
        <h1>Properties</h1>
        <br /><br />
        <ul>
            {properties.map((property,index)=>(
                <li key={index}>
                    <div>
                        <img src={property.image} alt="loading..." />
                        <br />
                        <p>Title: {property.title}</p>
                        <p>Description: {property.description}</p>
                        <p>Location: {property.location}</p>
                        <p>City: {property.city}</p>
                        <p>State: {property.state}</p>
                        <p>Price: {property.price}</p>
                        <p>Dimensions: {property.dimensions}</p>
                        <p>Realtor Email: {property.realtorEmail}</p>
                        <p>Realtor Mobile: {property.realtorMobile}</p>
                    </div>
                </li>

            ))}
        </ul>
        </>
    )
}

export default UserHome;