import React, { createContext, useContext, useReducer } from "react";

const GlobalContext = createContext();

// API Url
const baseUrl = "https://api.jikan.moe/v4"

// Actions
const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";

// Reducer
const reducer = (state, action) => {
    switch (action.type) { // Corrected typo here
        case LOADING:
            return { ...state, loading: true };
        case GET_POPULAR_ANIME:
            return { ...state, popularAnime: action.payload, loading: false };
        case GET_UPCOMING_ANIME:
            return { ...state, upcomingAnime: action.payload, loading: false };
        case GET_AIRING_ANIME:
            return { ...state, airingAnime: action.payload, loading: false };
        case SEARCH:
            return { ...state, searchResults: action.payload, loading: false };
        default:
            return state;
    }
};

export const GlobalContextProvider = ({children}) => {
    // Initial state
    const initialState = {
        popularAnime: [],
        upcomingAnime: [],
        airingAnime: [],
        pictures: [],
        isSearch: false,
        searchResults: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const [search, setSearch] = React.useState('')

    // Handle Change
    const handleChange = (e) => {
        setSearch(e.target.value);
        if(e.target.value === ''){
            state.isSearch = false;
        }
    }

    // Handle Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if(search){
            searchAnime(search);
        }
        else{
            state.isSearch = false;
            alert('Please enter a search term')
        }
    }


    // Fetch Popular Anime
    const getPopularAnime = async () => {
        dispatch({type: LOADING})
        const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
        const data = await response.json();
        dispatch({type: GET_POPULAR_ANIME, payload: data.data})
    }

    // Fetch Upcoming Anime
    const getUpcomingAnime = async () => {
        dispatch({type: LOADING})
        const response = await fetch(`$(baseUrl)/top/anime?filter=upcoming`);
        const data = await response.json;
        dispatch({type: GET_UPCOMING_ANIME, payload: data.data})
    }

    // Fetch Airing Anime
    const getAiringAnime = async () => {
        dispatch({type: LOADING})
        const response = await fetch(`$(baseUrl)/top/anime?filter=airing`);
        const data = await response.json;
        dispatch({type: GET_UPCOMING_ANIME, payload: data.data})
    }

    // Search Anime
    const searchAnime = async (anime) => {
        dispatch({type: LOADING})
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${anime}&order_by=popularity&sort=asc&sfw`);
        const data = await response.json;
        dispatch({type: SEARCH, payload: data.data})
    }

    // Initial Render
    React.useEffect(() => {
        getPopularAnime();
    }, [])

    return(
        <GlobalContext.Provider value={{
            ...state,
            handleChange,
            handleSubmit,
            searchAnime,
            search,
            getPopularAnime,
            getUpcomingAnime,
            getAiringAnime,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}