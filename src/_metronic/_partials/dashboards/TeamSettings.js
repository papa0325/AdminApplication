import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { TeamSettingsDetail } from './TeamSettingsDetail';
import { TeamMember } from './TeamMember';

export function TeamSettings() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/teamSettings/detail" component={TeamSettingsDetail} />
                <Route path="/teamSettings/teammember" component={TeamMember} />
            </Switch>
        </BrowserRouter>
    );
}