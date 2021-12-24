/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import {Link} from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import {useSelector} from "react-redux";
import {DropdownTopbarItemToggler} from "../../../../_partials/dropdowns";

export function UserProfileDropdown() {
  const {user} = useSelector(state => state.auth);

  return (
      <Dropdown drop="down" alignRight>
        <Dropdown.Toggle
            as={DropdownTopbarItemToggler}
            id="dropdown-toggle-user-profile"
        >
          <div className={"btn btn-icon btn-hover-transparent-white d-flex align-items-center btn-lg px-md-2 w-md-auto"}>
            <span className="text-white opacity-70 font-weight-bold font-size-base d-none d-md-inline mr-1">Hi,</span>         
            <span className="text-white opacity-90 font-weight-bolder font-size-base d-none d-md-inline mr-4">
              {user.fullname}
            </span>
            <span className="symbol symbol-35">            
              <span className="symbol-label text-white font-size-h5 font-weight-bold bg-white-o-30">{user.fullname[0]}</span>
            </span>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu
            className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg p-0">
          
            

          <div className="navi navi-spacer-x-0 pt-5">
           
            <a className="navi-item px-8" href="/usersettings">
              <div className="navi-link">
                <div className="navi-icon mr-2">
                  <i className="flaticon2-gear"></i>
                </div>
                <div className="navi-text">
                  <div className="font-weight-bold">
                    User Settings
                  </div>
                  
                </div>
              </div>
            </a>

            
            <div className="navi-separator mt-3"></div>

            <div className="navi-footer  px-8 py-5">
              <Link to="/logout" className="btn btn-light-primary font-weight-bold">
                Sign Out
              </Link>
              
            </div>
          </div>
        </Dropdown.Menu>
      </Dropdown>
  );
}
