import React, { Component } from 'react';

class Footer extends Component {
    render(){
        return (
            <footer className={"footer" + (this.props.transparent !== undefined ? " footer-transparent":"")}>
                <div className={"container" + (this.props.fluid !== undefined ? "-fluid":"")}>
                    <nav className="pull-left">
                        <ul>
                            
                        </ul>
                    </nav>
                    
                </div>
            </footer>
        );
    }
}
export default Footer;
