import React from 'react';
import { useState, useEffect } from 'react';
const YtSearch = ({getPlace}) => {
  const [videoData, setVideoData] = useState();
  const APIKey = 'AIzaSyCpGCLMhBR7m7MYVvai-fZyaDbY9qJLkfg';
  useEffect(()=>{
    const func = async() =>{
        fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${getPlace ? getPlace : 'Haryana' }vlog&type=video&key=${APIKey}`
          )
            .then((response) => response.json())
            .then((data) => {
                setVideoData(data.items)
              });
    }
    func();
},[getPlace])
  return (
    <>
      <br />
      <br />
      <h4>Hey Buddy! Dont forget to checkout {getPlace ? getPlace : `Haryana` } vlogs before you travel. Here are a few for you!</h4>
      <div className="video-wrapper d-flex justify-content-around text-center card p-4 bg-dark">
      {videoData &&
        videoData.map((data, index) => (
          <div className="yvideo" key={index}>
            <a href={`https://www.youtube.com/watch?v=${data.id.videoId}`} target="_blank" rel="noopener noreferrer" className="d-block text-white text-decoration-none">
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