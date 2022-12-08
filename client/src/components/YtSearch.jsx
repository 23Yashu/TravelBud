import React from 'react';
import { useState, useEffect } from 'react';
const YtSearch = ({getPlace}) => {
  const [videoData, setVideoData] = useState();
  const APIKey = 'AIzaSyCpGCLMhBR7m7MYVvai-fZyaDbY9qJLkfg';
  useEffect(()=>{
    if(getPlace.length>3) {
    const func = async() =>{
        fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${getPlace}vlog&type=video&key=${APIKey}`
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(getPlace)
                setVideoData(data.items)
              });
    }
    func();
}
},[getPlace])
  return (
    <>
      <br />
      <br />
      <div className="d-flex justify-content-around text-center">
      {videoData &&
        videoData.map((data, index) => (
          <div className="yvideo">
            <a href={`https://www.youtube.com/watch?v=${data.id.videoId}`} className="d-block text-dark text-decoration-none">
              <img src={data.snippet.thumbnails.high.url} alt={data.snippet.title} className="wid-300 rounded overflow-hidden"/>
              <h3 className="fs-6 mt-2">{data.snippet.title}</h3>
            </a>
          </div>
        ))}
        </div>
    </>
  );
};
export default YtSearch;