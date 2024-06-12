import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { useParams, Link } from "react-router-dom";
import Popup from './Popup';
import { IoMdCloseCircle } from "react-icons/io";

function AnimeItem() {
  const { id } = useParams();
  const [anime, setAnime] = useState({});
  const [characters, setCharacters] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [popupTrigger, setPopupTrigger] = useState(false);

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

  const getAnime = async (animeId) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
    const data = await response.json();
    setAnime(data.data);
  };

  const getCharacters = async (animeId) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/characters`);
    const data = await response.json();
    setCharacters(data.data);
  }

  useEffect(() => {
    getAnime(id);
    getCharacters(id);
  }, [id]);

  return (
    <FullAnime className="px-[7rem] py-[5rem] relative">
      <AnimeDetails className="details flex justify-between">
        <div className="image">
          <img src={images?.jpg.large_image_url} alt="" />
        </div>
        <div className="bg-[#242126] p-[15px] rounded-[20px] w-[450px]">
          <h1 className="text-[24px] text-[#be92f6] mb-3 underline underline-offset-8 text-center">{title}</h1>
          <ul className="flex gap-3 flex-col">
            <li>
              <p>
                Japanese Title: <span>{title_japanese}</span>
              </p>
            </li>
            <li>
              <p>
                Rating: <span>{rating}</span>
              </p>
            </li>
            <li>
              <p>
                Aired: <span>{aired?.string}</span>
              </p>
            </li>
            <li>
              <p>
                Status: <span>{status}</span>
              </p>
            </li>
            <li>
              <p>
                Type: <span>{type}</span>
              </p>
            </li>
            <li>
              <p>
                Episodes: <span>{episodes}</span>
              </p>
            </li>
            <li>
              <p>
                Season: <span>{season}</span>
              </p>
            </li>
            <li>
              <p>
                Duration: <span>{duration}</span>
              </p>
            </li>
          </ul>
        </div>
      </AnimeDetails>
      <Description className="description text-white bg-[#242126] p-[15px] rounded-[20px] my-[5rem]">
        {synopsis && (showMore ? synopsis : synopsis.substring(0, 450) + "...")}
        <button className="ml-5" onClick={() => setShowMore(!showMore)}>
          {showMore ? "Show Less" : "Show More"}
        </button>
      </Description>
      <AnimeCharacters>
        <ul className="flex justify-between">
          <li>
            <h3 className="text-[24px] text-[#be92f6]">Characters</h3>
          </li>
          <li>
            <button
              className="text-white text-xl underline underline-offset-8"
              onClick={() => setPopupTrigger(true)}
            >
              Show Characters
            </button>
          </li>
        </ul>

        <div className="animeCharactersLimit mt-8">
          <CharacterListLimit>
            {characters.slice(0, 12).map((character, index) => {
              const {
                role,
                character: { images, name },
                mal_id,
              } = character;
              return (
                <Link to={`/character/${mal_id}`} key={index}>
                  <Character className="character flex w-[100px] flex-col">
                    <img src={images?.jpg.image_url} alt={name} />
                    <h4>{name}</h4>
                    <p>{role}</p>
                  </Character>
                </Link>
              );
            })}
          </CharacterListLimit>
        </div>
      </AnimeCharacters>

      <Popup
        trigger={popupTrigger}
        setTrigger={setPopupTrigger}
        characters={characters}
      >
        <h3 className="text-[24px] text-[#be92f6]">Characters</h3>
        <CharacterList>
          {characters.map((character, index) => {
            const { role } = character;
            const { images, name, mal_id } = character.character;
            return (
              <Link to={`/character/${mal_id}`} key={index}>
                <Character className="character flex w-[100px] flex-col">
                  <img src={images?.jpg.image_url} alt={name} />
                  <h4>{name}</h4>
                  <p>{role}</p>
                </Character>
              </Link>
            );
          })}
        </CharacterList>
      </Popup>
    </FullAnime>
  );
}

const FullAnime = styled.div`
  img {
    border-radius: 20px;
    width: 290px;
    height: 400px;
    object-fit: cover;
    border: 3px solid #be92f6;
  }
`;

const AnimeDetails = styled.div`
  p {
    color: #be92f6;
    font-size: 20px;
  }
  span {
    color: white;
    font-size: 18px
  }
`;

const Description = styled.div`
  button {
    background-color: #242126;
    border: 0;
    color: #BE92F6;
    font-weight: bold;
    font-size: 16px;
    font-family: 'Josefin Sans';
    cursor: pointer;
  }
`;

const AnimeCharacters = styled.div`
  a, a:visited, a:link {
    text-decoration: none;
  }
`;

const CharacterList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Character = styled.div`
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
  img {
    border: 3px solid #BE92F6;
    width: 100px;
    height: 150px;
    display: inline;
  }
`;

const CharacterListLimit = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export default AnimeItem;
