import React from 'react'
import Popular from './Popular'
import { useGlobalContext } from '../Context/global'

function Homepage() {

    const {
      handleSubmit,
      search,
      searchAnime,
      handleChange,
      getPopularAnime,
      getUpcomingAnime,
      getAiringAnime,
    } = useGlobalContext();

    const [rendered, setRendered] = React.useState('popular')

    const switchComponent = () => {
        switch(rendered){
            case 'popular':
                return <Popular rendered={rendered} />
            default:
                return <Popular rendered={rendered} />
        }
    }

  return (
    <header>
        <div className='logo'>
            <h1 className='text-white'>
                {rendered === 'popular' ? 'Popular Anime' : 
                rendered === 'airing' ? 'Airing Anime' : 'Upcoming Anime'}
            </h1>
            <div className='search-container'>
                <div className='filterButton popularFilter'>
                    <button onClick={() => {
                        setRendered('popular')
                    }}>Popular</button>
                </div>
                <form action='' className='searchForm'>
                    <div className='input-control'>
                        <input type="text" placeholder='Search Anime' value={search} onChange={handleChange}></input>
                        <button type='submit'>Search</button>    
                    </div>
                </form>
                <div className='filterButton airingFilter'>
                    <button onClick={() => {
                        setRendered('airing')
                        getAiringAnime()
                    }}>Airing</button>
                </div>
                <div className='filterButton upcomingFilter'>
                    <button onClick={() => {
                        setRendered('upcoming')
                        getUpcomingAnime()
                    }}>Upcoming</button>
                </div>
            </div>
        </div> 
        {switchComponent()}
    </header>
  )
}

export default Homepage