import React from "react";
import { useGlobalContext } from "../Context/global";

function Popular() {
    const { popularAnime, isSearch } = useGlobalContext()

    const conditionalRender = () => {
        if(!isSearch){
            return popularAnime.map((anime) => {})
        }
    }

    return (
        <div>
            .popular-anime
        </div>
    )
}

export default Popular