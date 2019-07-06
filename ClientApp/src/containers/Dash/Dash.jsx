import React, {Component} from 'react';

// this is used to create scrollbars on windows devices like the ones from apple devices
import 'perfect-scrollbar/dist/css/perfect-scrollbar.min.css';
// react component that creates notifications (like some alerts with messages)

import Sidebar from 'components/Sidebar/Sidebar.jsx';
import 'perfect-scrollbar/dist/css/perfect-scrollbar.min.css';
// react component that creates notifications (like some alerts with messages)
import NotificationSystem from 'react-notification-system';

import Header from 'components/Header/Header.jsx';
import Footer from 'components/Footer/Footer.jsx';

// dinamically create dashboard routes
import dashRoutes from 'routes/dash.jsx';

// style for notifications
import { style } from "variables/Variables.jsx";
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

class Dash extends Component{
    
    render(){
        return (
            <div className="wrapper">
                <NotificationSystem ref="notificationSystem" style={style}/>
                <Sidebar {...this.props} />
                <div className={"main-panel"+(this.props.location.pathname === "/maps/full-screen-maps" ? " main-panel-maps":"")} ref="mainPanel">
                    <Header {...this.props}/>
                        <Switch>
                            {
                                dashRoutes.map((prop,key) => {
                                    if(prop.collapse){
                                        return prop.views.map((prop,key) => {
                                            if(prop.name === "Notifications"){
                                                return (
                                                    <Route
                                                        path={prop.path}
                                                        key={key}
                                                        render={routeProps =>
                                                           <prop.component
                                                               {...routeProps}
                                                               handleClick={this.handleNotificationClick}
                                                           />}
                                                    />
                                                );
                                            } else {
                                                return (
                                                    <Route path={prop.path} component={prop.component} key={key}/>
                                                );
                                            }
                                        })
                                    } else {
                                        if(prop.redirect)
                                            return (
                                                <Redirect from={prop.path} to={prop.pathTo} key={key}/>
                                            );
                                        else
                                            return (
                                                <Route path={prop.path} component={prop.component} key={key}/>
                                            );
                                    }
                                })
                            }
                        </Switch>
                    <Footer fluid/>
                </div>
            </div>
        );
    }
}

export default Dash;
