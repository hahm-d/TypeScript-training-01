import React from 'react';
import './App.css';
import {Store, action} from './Store';

//You can explicitly describe this object’s properties using an interface declaration
export interface Episode {
  airdate: string 
  airstamp: string
  airtime: string
  id: number
  image: {medium: string, original: string}
  name: string
  number: number 
  runtime: number
  season: number
  summary: string
  url: string
}

export default function App() {

  //useContext - Hook will trigger a rerender with lastest context value.
  const {state, dispatch} = React.useContext(Store)

  //useEffect - Hook lets you perform side effects in function components
  React.useEffect(() => {
    state.episodes.length === 0 && fetchDataHandler()
  })

  const fetchDataHandler = async() => {
    const data = await fetch('https://api.tvmaze.com/singlesearch/shows?q=the-office&embed=episodes')
    const dataJSON = await data.json()
    return dispatch({
        type: 'FETCH_DATA',
        payload: dataJSON._embedded.episodes
      })
  }

 const clickHandler = (ep: Episode ): action => 
   dispatch({
     type: 'ADD_FAV',
     payload: ep
   })
 

  return(
    <>
    <header className="header">
      <h1>The Office</h1>
      <p>Pick your favorite episodes!</p>
    </header>
      <section className="episode-layout">
        {state.episodes.map((ep: Episode) => {  
          return(
            <section key={ep.id} className="episode-card">
               <img src={ep.image.medium} alt={`The Office ${ep.id}`} />
               <p>{ep.name}</p>
               <section>
                 <div>Season: {ep.season}  Number: {ep.number}</div>
                 <button type="button" onClick={() => clickHandler(ep)}>Favorite</button>
               </section>
            </section>
          )
        })}
      </section>
    </>
    )
}
