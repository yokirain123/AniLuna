import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";
import styled from 'styled-components';

function Popup(props) {
    const { id } = useParams();
    const [characters, setCharacters] = React.useState([]);

    const getCharacters = async (anime) => {
    const response = await fetch(
        `https://api.jikan.moe/v4/anime/${anime}/characters`
    );
    const data = await response.json();
    setCharacters(data.data);
    console.log(data.data);
    };

    useEffect(() => {
    getCharacters(id);
    }, []);

    return (props.trigger) ? (

        <div className="popup absolute w-full">
            <div className="popup-inner relative justify-center flex w-full bg-[#242126] rounded-[20px]">
                <PopupButton className="absolute text-[#be92f6]" onClick={() => props.setTrigger(false)}>
                    <IoCloseCircleOutline size={30}/>
                </PopupButton>
                {props.children}
            </div>
                
        </div>

        
    )    : "";
}

const PopupButton = styled.button `
    position: absolute;
    left: 95%;
    top: 15px;
`

export default Popup;
