/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

export const DropdownButtonToggler = React.forwardRef((props, ref) => {
  return (
    <a
      ref={ref}
      className="btn btn-hover-primary dropdown-toggle"
      onClick={e => {
        e.preventDefault();
        props.onClick(e);
      }}
    >
      Teams
    </a>
  );
});
