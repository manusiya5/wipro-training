import { useState } from "react";
function Home(){
       const[getStock,setStock]=useState(0);
       const AddStock =()=>{
            setStock(getStock+1);
       };
        const RemoveStock =()=>{
            if(getStock>0){
            setStock(getStock-1);
            }
       };
    return(
    <>
    <h1>{getStock}</h1>
    <button className="bg-amber-500 h-15 w-25 rounded-2xl" onClick={AddStock}>Add</button>
     <button className="bg-amber-500 h-15 w-25 rounded-2xl" onClick={RemoveStock} disabled={getStock==0}>Remove</button>

    {/* <button>add</button>
    <button>remove</button> */}
    </>
    );
}
export default Home;