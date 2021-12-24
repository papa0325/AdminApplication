import React, {Suspense, lazy} from "react";
import {Redirect, Switch, Route} from "react-router-dom";
import {LayoutSplashScreen, ContentRoute} from "../_metronic/layout";
import {MyPage} from "./pages/MyPage";
import {DashboardPage} from "./pages/DashboardPage";
import {SitesPage} from "./pages/SitesPage";
import {BuildsPage} from "./pages/BuildsPage";
import {PluginsPage} from "./pages/PluginsPage";
import {DomainsPage} from "./pages/DomainsPage";
import {MembersPage} from "./pages/MembersPage";
import {AuditLogPage} from "./pages/AuditLogPage";
import {BillingPage} from "./pages/BillingPage";
import {TeamSettingsPage} from "./pages/TeamSettingsPage";
// import {TeamCreate} from "./pages/TeamCreate";
import { TeamSettingsDetail } from "../_metronic/_partials/dashboards/TeamSettingsDetail";
import { TeamMember } from "../_metronic/_partials/dashboards/TeamMember";

const GoogleMaterialPage = lazy(() =>
  import("./modules/GoogleMaterialExamples/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("./modules/ReactBootstrapExamples/ReactBootstrapPage")
);
const ECommercePage = lazy(() =>
  import("./modules/ECommerce/pages/eCommercePage")
);

export default function BasePage() {
    // useEffect(() => {
    //   console.log('Base page');
    // }, []) // [] - is required if you need only one call
    // https://reactjs.org/docs/hooks-reference.html#useeffect

    return (
        <Suspense fallback={<LayoutSplashScreen/>}>
            <Switch>
                {
                    /* Redirect from root URL to /dashboard. */
                    <Redirect exact from="/" to="/dashboard"/>
                }
                <ContentRoute path="/dashboard" component={DashboardPage}/>
                <ContentRoute path="/sites" component={SitesPage}/>
                <ContentRoute path="/builds" component={BuildsPage}/>
                <ContentRoute path="/plugins" component={PluginsPage}/>
                <ContentRoute path="/domains" component={DomainsPage}/>
                <ContentRoute path="/members" component={MembersPage}/>
                <ContentRoute path="/auditLog" component={AuditLogPage}/>
                <ContentRoute path="/billing" component={BillingPage}/>
                <ContentRoute exact path="/teamSettings" component={TeamSettingsPage}/>
                <ContentRoute path="/teamSettings/detail" component={TeamSettingsDetail} />
                {/* <ContentRoute path="/teamCreate" component={TeamCreate} /> */}
                <ContentRoute path="/teamSettings/teammember" component={TeamMember} />
                <ContentRoute path="/my-page" component={MyPage}/>
                <Route path="/google-material" component={GoogleMaterialPage}/>
                <Route path="/react-bootstrap" component={ReactBootstrapPage}/>
                <Route path="/e-commerce" component={ECommercePage}/>
                <Redirect to="error/error-v1"/>
            </Switch>
        </Suspense>
    );
}
