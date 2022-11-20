import { useRef } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
   const navto= useNavigate()
   const [countdown, setcountdown] = useState(5);
   const countdownref=useRef(5)
   useEffect(() => {
    let x=setInterval(() => {
        if (countdownref.current===0){
            clearInterval(x)
            navto("/")

        }
        else{
            countdownref.current--;
            setcountdown(countdownref.current)
        }

    }, 500);   


   }, [navto]);
    return ( 
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center" ,height:"100vh"}}>
        <h1 style={{marginTop:-80}} >404 not found </h1>
        <h6>redirecting to home page in {countdown}</h6>
    </div> );
}
 
export default NotFound;