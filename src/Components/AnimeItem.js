import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { useParams, Link } from "react-router-dom";

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { IoMdCloseCircle } from "react-icons/io";

function AnimeItem() {
  const { id } = useParams();
  console.log(id);

  const [anime, setAnime] = React.useState({});
  const [characters, setCharacters] = React.useState([]);
  const [showMore, setShowMore] = React.useState(false);

  const {
    title,
    title_japanese,
    synopsis,
    season,
    images,
    episodes,
    score,
    scored_by,
    type,
    status,
    rating,
    source,
    aired,
    duration,
  } = anime;

  const getAnime = async (anime) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
    const data = await response.json();
    setAnime(data.data);
    console.log(data.data);
  };

  const getCharacters = async (anime) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}/characters`);
    const data = await response.json();
    setCharacters(data.data)
    console.log(data.data)
  }

  // Popup

  const characterPopup = () => (
    <Popup
      trigger={<button className="button text-white"> Open Modal </button>}
      modal
      nested
    >
      {(close) => (
        <div className="modal p-4">
          <ul className="flex justify-between items-center">
            <li>
              <div className="header text-[24px] leading-3 text-[#be92f6]"> Characters </div>
            </li>
            <li>
              <button className="close flex justify-center" onClick={close}>
                <IoMdCloseCircle size={"2.5em"} color="#be92f6" />
              </button>
            </li>
          </ul>

          <div className="content">
            <div className="mt-10 flex flex-col gap-5">
              <div className="charactersGrid grid grid-cols-8 gap-6 justify-center py-[16px]">
                {characters?.map((character, index) => {
                  const { role } = character;
                  const { images, name, mal_id, voice_actors } =
                    character.character;
                  return (
                    <Link to={`/character/${mal_id}`} key={index}>
                      <div className="character flex w-[100px] flex-col">
                        <img src={images?.jpg.image_url} alt="" />
                        <h4>{name}</h4>
                        <p>{role}</p>
                        <p>{voice_actors}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="actions">
            <Popup
              trigger={<button className="button"> Trigger </button>}
              position="top center"
              nested
            ></Popup>
            <button
              className="button"
              onClick={() => {
                console.log("modal closed ");
                close();
              }}
            >
              close modal
            </button>
          </div>
        </div>
      )}
    </Popup>
  );

  const [buttonPopup, setButtonPopup] = useState(false);

  useEffect(() => {
    getAnime(id)
    getCharacters(id)
  }, []);

  return (
    <FullAnime className="px-[7rem] py-[5rem] relative">
      <AnimeDetails className="details flex justify-between">
        <div className="image">
          <img src={images?.jpg.large_image_url} alt=""></img>
        </div>
        <div className="bg-[#242126] p-[15px] rounded-[20px]">
          <h1 className="text-[24px] text-[#be92f6]">{title}</h1>
          <p>
            Japanese Title: <span>{title_japanese}</span>
          </p>
          <p>
            Rating: <span>{rating}</span>
          </p>
          <p>
            Aired: <span>{aired?.string}</span>
          </p>
          <p>
            Status: <span>{status}</span>
          </p>
          <p>
            Type: <span>{type}</span>
          </p>
          <p>
            Episodes: <span>{episodes}</span>
          </p>
          <p>
            Season: <span>{season}</span>
          </p>
          <p>
            Duration: <span>{duration}</span>
          </p>
        </div>
      </AnimeDetails>
      <Description className="description text-white bg-[#242126] p-[15px] rounded-[20px] my-[5rem]">
        {synopsis && (showMore ? synopsis : synopsis.substring(0, 450) + "...")}
        <button
          className="ml-5"
          onClick={() => {
            setShowMore(!showMore);
          }}
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      </Description>
      <AnimeCharacters>
        <h3 className="text-[24px] text-[#be92f6]">Characters</h3>
        <characterPopup className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center " trigger={buttonPopup} setTrigger={setButtonPopup}>
          
        </characterPopup>
      </AnimeCharacters>
    </FullAnime>
  );
}

const FullAnime = styled.div `
  img {
    border-radius: 20px;
    width: 290px;
    height: 400px;
    object-fit: cover;
    border: 3px solid #be92f6;
  }
`

const AnimeDetails = styled.div `
      p {
        color: #be92f6;
        font-size: 16px;
      }
      span {
        color: white;
      }
`

const Description = styled.div `
  button {
    background-color: #242126;
    border: 0;
    color: #BE92F6;
    font-weight: bold; 
    font-size: 16px;
    font-family: 'Josefin Sans';
    cursor: pointer;
  }
`

const AnimeCharacters = styled.div `
    a, a:visited, a:link { 
      text-decoration: none
    }`
    
const 
  .character{
    border-radius: 7px;
    transition: all .4s ease-in-out;
    text-align: center;

    h4 {
      color: #BE92F6;
      margin: 5px;
    }
    p {
      color: white;
      opacity: 75%;
      margin: 0;
    }
    img{
      border: 3px solid #BE92F6;
      width: 100px;
      height: 150px;
      display: inline
    }
  }
`

export default AnimeItem;
