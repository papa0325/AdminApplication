/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import HeaderContext from '../../../context/headerContext/headerContext';
import { API_URL } from "../../../config";

export default function DropdownMenu5() {
    const { updateHeader, dropDownHeader } = useContext(HeaderContext);
    const { teams } = useContext(HeaderContext)
    const handleClick = (e) => {
        fetch(API_URL + `/team/getbyname?teamname=${e.target.textContent}`)
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('currentData', JSON.stringify(data))
                updateHeader(data)
                localStorage.setItem('teams', data.name)
                dropDownHeader([data.name])
            })
            .catch(
                err => console.log(err)
            )
    }
    let drop = []
    for (let i = 0; i < teams.length; i++) {
        let url = "/" + teams[i]
        drop.push(<li className="navi-item" key={`drop_${i}`}>
            <a href={url} className="navi-link">
                <span className="navi-icon">
                    <i className="flaticon2-drop"></i>
                </span>
                <span className="navi-text">{teams[i]}</span>
            </a>
        </li>)
    }
    drop.push(<li className="navi-separator my-3" key="drop-selector"></li>)
    drop.push(<li className="navi-item" key='drop'>
        <a href="/createTeam" className="navi-link">
            <span className="navi-icon">
                <i className="flaticon2-gear" />
            </span>
            <span className="navi-text">Create new team</span>
        </a>
    </li>
    )
    return <div className="teamlist" onClick={handleClick}>
        <ul style={{ padding: "0px" }}>
            {drop}
        </ul>
    </div>
}