import React, {Component} from 'react';

// this is used to create scrollbars on windows devices like the ones from apple devices
import 'perfect-scrollbar/dist/css/perfect-scrollbar.min.css';
// react component that creates notifications (like some alerts with messages)

import Sidebar from 'components/Sidebar/Sidebar.jsx';


class Dash extends Component{
    constructor(props){
        super(props);
        this.state = {
            mockData:[]
        };
    }
    componentDidMount(){
        
        fetch("https://jsonplaceholder.typicode.com/todos/1")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                mockData: result
              });
              console.log(result)
            },
        )
    }
    
    render(){
        return (
            <div className="wrapper">
                <Sidebar {...this.props} />
                <div className={"main-panel"+(this.props.location.pathname === "/maps/full-screen-maps" ? " main-panel-maps":"")} ref="mainPanel">
                    <div>data from Fake API</div>

                    <div>user ID:{this.state.mockData['userId']}</div>
                    <div>title:{this.state.mockData['title']}</div>

                </div>
            </div>
        );
    }
}

export default Dash;
