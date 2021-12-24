import React, { useReducer } from 'react';
import HeaderContext from './headerContext';
import HeaderReducer from './headerReducer';
import { UPDATE_HEADER, DROPDOWN_HEADER } from '../types';
const HeaderState = (props) => {
    const initialState = {
        name: "My team",
        src: "",
        raw: "",
        teams:[]
    }
    const [ state, dispatch ] = useReducer(HeaderReducer, initialState);

    const updateHeader = headerData => {
        dispatch({
            type: UPDATE_HEADER,
            payload: headerData
        })
    }

    const dropDownHeader = item => {
        dispatch({
            type: DROPDOWN_HEADER,
            payload: item
        })
    }
    return(
        <HeaderContext.Provider value={{
            updateHeader,
            dropDownHeader,
            team: state.team,
            teams: state.teams
        }}>
            {props.children}
        </HeaderContext.Provider>
    )
}
export default HeaderState;