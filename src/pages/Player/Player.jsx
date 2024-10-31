import React, { useEffect, useState } from 'react'
import './Player.css'
import black_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {
  const {id}= useParams();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: ""

  })
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOGMzYmU0MmQ2YWMwZDE4MGZlMjExMGFmNmUwOTZjNyIsIm5iZiI6MTcyOTg2ODg0Ni4xMjU1MDQsInN1YiI6IjY3MWJiMjY1NWQwZGU4OTA0MmQ5MTQwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TajWHFgPawtpTBGt5lRNsTbFTrwQmXyFdBUHcExWc7c'
    }
  };
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));
  },[])
  
  


  return (
    <div className='player'>
      <img src={black_arrow_icon} alt="" onClick={()=>{ navigate(-1)}}/>
      <iframe width='90%' height='90%' src={`https://youtube.com/embed/${apiData.key}`} title='trailer' frameborder="0"
      allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player