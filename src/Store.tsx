import React from 'react';

interface state {
    episodes: Array<any>
    favorites: Array<any>
}

export interface action {
    type: string
    payload: any
}

const initialState:state = {
    episodes: [],
    favorites: []
}

//Store has the initial state from above. 
export const Store = React.createContext<state | any>(initialState)

//reducer
//get data from fetch and populate the Store
function reducer(state:state, action:action): state {
    switch (action.type){
        case 'FETCH_DATA':
            return {...state, episodes: action.payload}
        case 'ADD_FAV':
            return {...state, favorites: [...state.favorites, action.payload]}
        default:
            return state
    }
}
//use Hooks to communicate with index
export function StoreProvider(props: any): JSX.Element{
    const [state, dispatch] = React.useReducer(reducer, initialState)
    return <Store.Provider value={{state, dispatch}}>{props.children}</Store.Provider>
}
