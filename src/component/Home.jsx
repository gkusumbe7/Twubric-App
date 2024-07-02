import { TiDelete } from "react-icons/ti";
import { FaTwitter } from "react-icons/fa";
import { useState ,useEffect } from "react";
import axios from "axios";
export default function Home(){
    const api = "https://gist.githubusercontent.com/pandemonia/21703a6a303e0487a73b2610c8db41ab/raw/82e3ef99cde5b6e313922a5ccce7f38e17f790ac/twubric.json";
    const [data , setData ] = useState([]);
    const [errormsg , setErrorMsg ] = useState("");
    
    useEffect(()=>{
        axios.get(api)
        .then(res=>{setData(res.data)})
        .catch((error)=>console.log(error));
        
    },[]);
    console.log(data);
    
    const convertTimestampToDate = (timestamp)=>{
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString();
    }

    const userDelete = (index)=>{
        const updateData = data.filter((_,i)=>i != index)
        setData(updateData)
    }
    return(
        <>
        <nav className="bg-black w-full fixed top-0 ">
                <h1 className="text-2xl text-center lg:text-left text-yellow-300 p-2 font-bold">TWUBRIC APP</h1>
        </nav>
        <section className="text-yellow-50 mt-2 w-full fixed top-10">
            <div className="flex flex-col ">
                <h1 className="font-bold text-black">Joined Twitter between</h1>
                <section className="flex gap-2 text-black text-sm p-1">
                <label htmlFor="startDate" className="font-semibold">Start Date</label>
                <input type="date" name="startDate" id="startDate"  />
                <label htmlFor="endDate" className="font-semibold">End Date</label>
                <input type="date" name="endDate" id="endDate" />
                </section>
            </div>
        </section>
        <div className=" md:flex md:flex-col  md:mx-28 lg:mx-32 mt-28">
        
        <section className="p-1 md:p-5 items-center gap-5 font-semibold text-blue-400 flex flex-wrap" >
            {data.map((data , index )=>(
            <section className="bg-black border py-5 rounded-md shadow-md flex flex-col gap-1 items-center" key={index}>
                <div className="flex gap-48 ">
                    <p className="text-2xl hover:text-3xl w-5"><FaTwitter/></p>
                    
                    <button className="text-3xl" onClick={()=> userDelete(index)}><TiDelete/></button>
                </div>
                <div className="flex flex-col items-center">
                    <img src={data.image} alt="img" className="rounded-full shadow-xl p-1 bg-black hover:bg-white"/>
                    <p className="font-semibold text-xl my-1 text-center">{data.fullname}</p>
                    <p className="text-center text-gray-400 text-sm">@{data.username}</p>
                    <p className="text-md text-center">{data.twubric.total}</p>
                </div>

                <div className="flex items-center gap-12 p-4 text-gray-100">
                    <div className=" flex flex-col items-center ">
                         <p className="text-md text-center">{data.twubric.friends}</p>
                         <label className="text-center">Friends</label>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <p className="text-md text-center">{data.twubric.influence}</p>
                        <label className="text-center">Influence</label>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <p className="text-md text-center">{data.twubric.chirpiness}</p>
                        <label className="text-center">Chirpiness</label>
                    </div>
                    
                </div>
                  <div className="flex gap-1 text-gray-400 text-sm font-normal">
                        <label className="text-right">Joining Date:</label>
                        <p className="">{convertTimestampToDate(data.join_date)}</p>
                    </div>
                    
            </section>
        ))}
        </section>    
        </div>
        </>
    );
}

// fullname
// : 
// "Sample User One"
// image
// : 
// "https://randomuser.me/api/portraits/men/1.jpg"
// join_date
// : 
// 1358899200
// twubric
// : 
// chirpiness
// : 
// 1.5
// friends
// : 
// 1
// influence
// : 
// 1
// total
// : 
// 3.5
// [[Prototype]]
// : 
// Object
// uid
// : 
// 1
// username
// : 
// "sampleuser1"