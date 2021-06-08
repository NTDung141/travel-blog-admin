import './App.css';
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Menu from './Components/Menu/Menu';
import Routes from "./Routes/Routes";

function App() {

    const showContentMenu = (routes) => {
        var result = null;
        if (routes.length > 0) {
            result = routes.map((item, index) => {
                return (
                    <Route key={index} exact={item.exact} path={item.path} component={item.main} />
                )
            })
        }
        return result;
    }

    return (
        < Router >
            <div className="menu">
                {/* Menu */}
                <Menu />
            </div>

            <div className="content">
                {/* Content */}
                <Switch>
                    {showContentMenu(Routes)}
                </Switch>

            </div>
        </Router >
    );
}

export default App;
