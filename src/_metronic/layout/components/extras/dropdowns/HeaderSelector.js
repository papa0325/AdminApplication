/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { DropdownButtonToggler, DropdownMenu4 } from "../../../../_partials/dropdowns";

export function HeaderSelector() {
  return (
    <>
      <div className="header-dropdown-container">
      <Dropdown className="dropdown-inline">
          <Dropdown.Toggle
            className="btn btn-clean btn-hover-light-primary btn-sm btn-icon"
            variant="transparent"
            id="dropdown-toggle-top"
            as={DropdownButtonToggler}
          >
            <i className="ki ki-bold-more-hor" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu dropdown-menu-sm dropdown-menu-right" style={{width: '180px'}}>
            <DropdownMenu4 />
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
}
