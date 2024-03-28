import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { useParams, Link } from "react-router-dom";
import { Sidebar } from "flowbite-react";

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

  useEffect(() => {
    getAnime(id)
    getCharacters(id)
  }, []);

  return (
    <FullAnime>
      <AnimeDetails className="details">
      <div className="image">
        <img src={images?.jpg.large_image_url} alt=""></img>
      </div>
        <div className="anime-details">
          <h1>{title}</h1>
          <p>
            <p>
              Japanese Title: <span>{title_japanese}</span>
            </p>
          </p>
          <p>
            <p>
              Rating: <span>{rating}</span>
            </p>
          </p>
          <p>
            <p>
              Aired: <span>{aired?.string}</span>
            </p>
          </p>
          <p>
            <p>
              Status: <span>{status}</span>
            </p>
          </p>
          <p>
            <p>
              Type: <span>{type}</span>
            </p>
          </p>
          <p>
            <p>
              Episodes: <span>{episodes}</span>
            </p>
          </p>
          <p>
            <p>
              Season: <span>{season}</span>
            </p>
          </p>
          <p>
            <p>
              Duration: <span>{duration}</span>
            </p>
          </p>
        </div>
      </AnimeDetails>
      <Description className="description">
        {synopsis && (showMore ? synopsis : synopsis.substring(0, 450) + "...")}
        <button
          onClick={() => {
            setShowMore(!showMore);
          }}
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      </Description>
      <AnimeCharacters>
        <h3 className="charactersTitle">Characters</h3>
        <div className="charactersGrid">
          {characters?.map((character, index) => {
            const { role } = character;
            const { images, name, mal_id } = character.character;
            return (
              <Link to={`/character/${mal_id}`} key={index}>
                <div className="character">
                  <img src={images?.jpg.image_url} alt="" />
                  <h4>{name}</h4>
                  <p>{role}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </AnimeCharacters>
      
    </FullAnime>
  );
}

const FullAnime = styled.div `
  padding: 5rem 7em;

  img {
    border-radius: 20px;
    width: 290px;
    height: 400px;
    object-fit: cover;
    border: 3px solid #be92f6;
  }
`

const AnimeDetails = styled.div `
      display: flex;
      justify-content: space-between;
      h1 {
        font-size: 24;
        color: #be92f6;
      }
      p {
        color: #be92f6;
        font-size: 16px;
      }
      span {
        color: white;
      }

      .anime-details {
        background-color: #242126;
        padding: 15px;
        border-radius: 20px;
      }
`

const Description = styled.div `

  padding: 1rem;
  color: white;
  background-color: #242126;
  padding: 15px;
  border-radius: 20px;
  margin: 5rem 0;
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
  .charactersTitle{
    font-size: 24px;
    color: #BE92F6
  }
  .charactersGrid {
    display: grid;
    grid-template-columns: repeat(8, 0.5fr);
    grid-gap: 40px;



    a, a:visited, a:link { 
      width: 100px;
      text-decoration: none
    }
  }
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
    }
  }
`

export default AnimeItem;
