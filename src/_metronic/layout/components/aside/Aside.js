import React, {useMemo} from "react";
import objectPath from "object-path";
import {AsideMenu} from "./aside-menu/AsideMenu";
import {useHtmlClassService} from "../../_core/MetronicLayout";
import {checkIsActive} from "../../../_helpers";
import {useLocation} from "react-router";

export function Aside() {
  const uiService = useHtmlClassService();
  const location = useLocation();
  const shouldRender = (urls) => {
    return urls.some(x => checkIsActive(location, x))
    ? ""
    : "d-none width-none"; 
  };
  const layoutProps = useMemo(() => {
    return {
      disableScroll:
          objectPath.get(uiService.config, "aside.menu.dropdown") === "true" ||
          false,
      asideClassesFromConfig: uiService.getClasses("aside", true),
      disableAsideSelfDisplay:
          objectPath.get(uiService.config, "aside.self.display") === false,
      headerLogo: uiService.getLogo()
    };
  }, [uiService]);

  return (
      <>
        {/* begin::Aside */}
        <div id="kt_aside"
             className={`aside aside-left ${layoutProps.asideClassesFromConfig} d-flex flex-column flex-row-auto ${shouldRender(['/billing', '/teamSettings'])}`}>
          {/* begin::Aside Menu */}
          <div id="kt_aside_menu_wrapper" className="aside-menu-wrapper flex-column-fluid">
            <AsideMenu disableScroll={layoutProps.disableScroll}/>
          </div>
          {/* end::Aside Menu */}
        </div>
        {/* end::Aside */}
      </>
  );
}
