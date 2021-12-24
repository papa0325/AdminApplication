/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useMemo} from "react";
import objectPath from "object-path";
import {useHtmlClassService} from "../../_core/MetronicLayout";
import {TeamDropdown} from "./dropdowns/TeamDropdown";

export function TeamLogoToggler() {
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      offcanvas: objectPath.get(uiService.config, "extras.user.layout") === "offcanvas",
    };
  }, [uiService]);

  return (<>
        {!layoutProps.offcanvas && (<TeamDropdown/>)}
      </>
  );
}
