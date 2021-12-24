/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { checkIsActive } from "../../../../_helpers";

export function HeaderMenu({ layoutProps }) {
    const location = useLocation();
    const getMenuItemActive = (url) => {
        return checkIsActive(location, url) ? "menu-item-active" : "";
    }

    return <div
        id="kt_header_menu"
        className={`header-menu header-menu-left header-menu-mobile ${layoutProps.ktMenuClasses}`}
        {...layoutProps.headerMenuAttributes}
    >
        {/*begin::Header Nav*/}
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
            {/*begin::1 Level*/}
            <li className={`menu-item menu-item-rel ${getMenuItemActive('/sites')}`}>
                <NavLink className="menu-link" to="/sites">
                    <span className="menu-text">Sites</span>
                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                </NavLink>
            </li>

            <li className={`menu-item menu-item-rel ${getMenuItemActive('/builds')}`}>
                <NavLink className="menu-link" to="/builds">
                    <span className="menu-text">Builds</span>
                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                </NavLink>
            </li>

            <li className={`menu-item menu-item-rel ${getMenuItemActive('/plugins')}`}>
                <NavLink className="menu-link" to="/plugins">
                    <span className="menu-text">Plugins</span>
                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                </NavLink>
            </li>

            <li className={`menu-item menu-item-rel ${getMenuItemActive('/domains')}`}>
                <NavLink className="menu-link" to="/domains">
                    <span className="menu-text">Domains</span>
                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                </NavLink>
            </li>

            <li className={`menu-item menu-item-rel ${getMenuItemActive('/members')}`}>
                <NavLink className="menu-link" to="/members">
                    <span className="menu-text">Members</span>
                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                </NavLink>
            </li>

            <li className={`menu-item menu-item-rel ${getMenuItemActive('/auditLog')}`}>
                <NavLink className="menu-link" to="/auditLog">
                    <span className="menu-text">Audit Log</span>
                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                </NavLink>
            </li>

            <li className={`menu-item menu-item-rel ${getMenuItemActive('/billing')}`}>
                <NavLink className="menu-link" to="/billing">
                    <span className="menu-text">Billing</span>
                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                </NavLink>
            </li>

            <li className={`menu-item menu-item-rel ${getMenuItemActive('/teamSettings')}`}>
                <NavLink className="menu-link" to="/teamSettings">
                    <span className="menu-text">Team Settings</span>
                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                </NavLink>
            </li>
        </ul>
        {/*end::Header Nav*/}
    </div>;
}
