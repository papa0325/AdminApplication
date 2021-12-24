/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useCallback } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import {Avatar, Button} from "@material-ui/core";
import HeaderContext from '../../../../../context/headerContext/headerContext';

export function TeamDropdown() {

  // Use context to pass state
  const { updateHeader, dropDownHeader, team, teams } = useContext(HeaderContext);
  const updateHeaderDispatch = useCallback(updateHeader, []) 
  const dropDownDispatch = useCallback(dropDownHeader, []) 
  // update state necessary for header
  let avatar;
  if (team) {
    var name = team.name ? team.name : "My team"
    if (team.src === "") avatar = <Avatar>M</Avatar>
    else avatar = <Avatar src={team.src} />
  }
  else {
    name = "My team"
    avatar = <Avatar>M</Avatar>
  }
  let drop = []
  for (let i=0;i<teams.length;i++){
    let url = "/" + teams[i]
    drop.push(<Dropdown.Item key = {`drop${i}`} href={url}><h5>{teams[i]}</h5></Dropdown.Item>)
  }

  // restore current header each time refresh page
  useEffect(() => {
    let currentData = JSON.parse(localStorage.getItem('currentData'))
    updateHeaderDispatch(currentData)
    let mid = localStorage.getItem('teams')
    if (mid) {
      let teamnames = mid.split(',')
      dropDownDispatch(teamnames)
    }
  },[updateHeaderDispatch, dropDownDispatch])

  
  return (
      <Button drop="down" alignright="true">
          <div className={"btn btn-icon btn-hover-transparent-white d-flex align-items-center btn-lg px-md-2 w-md-auto"}>    
            <span className="text-white opacity-90 font-weight-bolder font-size-base d-none d-md-inline mr-4">
              <h3>{name}</h3>
            </span>
          </div>
          {avatar}     
      </Button>
  );
}
