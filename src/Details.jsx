import React, { useEffect, useState } from "react";
import axios from "axios"
import { useSearchParams } from "react-router-dom";
export const Detai=()=>{
    let [sr]=useSearchParams()
    let ss=sr.get("fln")
    console.log(ss)
    let [fnm,setFnm]=useState([])
    useEffect(()=>{
        
            axios.get("https://api.spacexdata.com/v3/launches")
            .then((re)=>setFnm(re.data))
        
    },[])
    let kk=fnm.filter((v,i)=>{
        return v.flight_number===Number(ss) ? v:""
    })
console.log(kk)
    return(
        <>
        <h1>Details About The Mission</h1>
        <div className="row" style={{justifyContent:"center"}}>
        {kk.mission_name}
        {
            kk.map((vl,i)=>{
                return <div key={i} className="dtldv">
                    <div>
                    <h3>Mission Name: {vl.mission_name}</h3>
                    <h3>Launch Date: {vl.launch_date_utc}</h3>
                    {/* <img src={vl.links.mission_patch} width={"100px"}/> */}
                    {/* <iframe src={vl.links.video_link}  width={"100%"}/> */}
                    <h3> Rocket Name: {vl.rocket.rocket_name}</h3>
                    <h3> Rocket Id: {vl.rocket.rocket_id}</h3>
                    <h3> Rocket  Type: {vl.rocket.rocket_type}</h3>
                    <h4> Flight Number: {vl.flight_number}</h4>
                    <h3>{vl.launch_failure_details}</h3>
                    
                    <p style={{fontWeight:"700"}}><span style={{fontWeight:"700",fontSize:"19px"}}>Details:</span> {vl.details}</p>
                </div>
                </div>
            })
        }
        </div>
        </>
    )
}