import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AnimeItem() {
  const { id } = useParams();
  console.log(id);

  const [anime, setAnime] = React.useState({});
  const [characters, setCharacters] = React.useState([]);
  const [showMore, useShowMore] = React.useState(false);

  const getAnime = async (anime) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`)
    const data = await response.json()
    setAnime(data.data)
    console.log(data.data)
  }

  useEffect(() => {
    getAnime(id)
  }, [])

  return <div>AnimeItem</div>;
}

export default AnimeItem;
