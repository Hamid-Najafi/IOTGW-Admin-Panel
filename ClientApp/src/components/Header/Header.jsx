import React, { Component } from 'react';

// links that appear in navbar - they are separated from this component (navbar) so that we can redner them on responsive in sidebar as well

// we import here the routes for dashboard pages (links that appear in sidebar) to set navbar's name

import dashRoutes from 'routes/dash.jsx';

class Header extends Component{
    constructor(props){
        super(props);
        this.handleMinimizeSidebar = this.handleMinimizeSidebar.bind(this);
        this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    }
    makeBrand(){
        var name;
        dashRoutes.map((prop,key) => {
            if(prop.collapse){
                 prop.views.map((prop,key) => {
                    if(prop.path === this.props.location.pathname){
                        name = prop.name;
                    }
                    return null;
                })
            } else {
                if(prop.redirect){
                    if(prop.path === this.props.location.pathname){
                        name = prop.name;
                    }
                }else{
                    if(prop.path === this.props.location.pathname){
                        name = prop.name;
                    }
                }
            }
            return null;
        })
        return name;
    }
    // function that makes the sidebar from normal to mini and vice-versa
    handleMinimizeSidebar(){
        document.body.classList.toggle('sidebar-mini');
    }
    // function for responsive that hides/shows the sidebar
    mobileSidebarToggle(e){
        document.documentElement.classList.toggle('nav-open');
    }
    render(){
        return (
            <div></div>
        );
    }
}

export default Header;
