// import * as React from 'react';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';
import axios from "axios"
import React, { useEffect, useState } from "react"
import "./style.scss"
import { useNavigate } from "react-router-dom"
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const Home=()=>{
    let  [err,setErr]=useState([])
    let  [aps,setAps]=useState([])
    let  [aps2,setAps2]=useState([])
    let [pagesss,setPagesss]=useState(0)
    let [page,setPage]=useState(0)
    let [pager,setPager]=useState(1)
    let dtl=useNavigate()
    const [counts, setCounts] = React.useState(0);
    

    useEffect(()=>{
        setPagesss((pager-1)*counts);
        axios.get(`https://api.spacexdata.com/v3/launches`)
        .then((re)=>setAps2(re.data))
        
        axios.get(`https://api.spacexdata.com/v3/launches?limit=${counts}?&&offset=${pagesss}`)
        .then((re)=>setAps(re.data))
        setPage(Math.ceil(aps2.length/counts))
        console.log(page)
    },[page,counts,pagesss])
    
    const handleCh = (event)=>{
        console.log(event.target.value)
        setCounts(event.target.value)
    }
    
    const handleChange = (e,value) => {
        setPager(1)
        setPagesss((value-1)*counts);
    }

    console.log(pagesss)

    let godetls=(fn)=>{
        dtl(`/detls?fln=${fn}`)
    }
    let assend=()=>{
        let ss =aps2.sort((a,b)=> (a.mission_name.localeCompare(b.mission_name)))
        setAps([...ss])
        console.log(ss)
    }
    let numdessend=()=>{
        let numdes=aps2.sort((a,b)=> b.flight_number - a.flight_number)
        console.log(numdes)
        setAps([...numdes])
    }
    let numdassend=()=>{
        let assend=aps2.sort((a,b)=>a.flight_number-b.flight_number)
        console.log(assend)
        setAps([...assend])
    }
    let dessend=()=>{
        let dess=aps2.sort((a,b)=>(b.mission_name).localeCompare(a.mission_name))
        console.log(dess)
        setAps([...dess])
    }


        return(
            <>
            <Box sx={{ minWidth: 120,maxWidth:200 }}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Page</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            
            label="Page"
            onChange={handleCh}
            >
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            {/* <MenuItem value={55}>55</MenuItem> */}
            </Select>
        </FormControl>
    </Box>
    <div className="">
            <button style={{margin:"10px"}} onClick={assend}>Assending</button>
            <button style={{margin:"10px"}} onClick={dessend}>Dessending</button>
            <button style={{margin:"10px"}} onClick={numdessend}>NumberDecend</button>
            <button style={{margin:"10px"}} onClick={numdassend}>NumberAssend</button>
    </div>
        <div className="row">
        {
            aps.map((v,i)=>{
                return<div className="col-3" key={i}>
                    <div className="fdv">
                    <h5>{v.flight_number}</h5>
                    <h3>Mission Name: {v.mission_name}</h3>
                    <h3> Launch Year: {v.launch_year}</h3>
                    <img src={v.links.mission_patch_small} width={"70px"}/>
                    <div>
                    <a className="btns" target="block" href={v.links.wikipedia}>view</a>
                    <button className="btns" onClick={()=>godetls(v.flight_number)}>View Details</button>
                        </div>
                    </div>
                </div>
            })
        }
        </div>
        <div>
        <Stack  spacing={2}>
      {/* <Typography>Page: {page}</Typography> */}
    <Pagination count={page}  onChange={handleChange} />
    </Stack>
    </div>
        </>
    )
}