import React, { Component } from 'react';
import {
    Table,
    Grid, Row, Col
} from 'react-bootstrap';
import { reactLocalStorage } from 'reactjs-localstorage';

import Card from 'components/Card/Card.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import { Link } from 'react-router-dom';
import {
    devices_thArray
    
} from 'variables/Variables.jsx';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

class deviceList extends Component {



    constructor(props) {
        super(props);
        this.state = {
            devices: []
        };
    }

    componentWillMount() {

        let token = reactLocalStorage.getObject('userInfo').token

        var gwId = this.props.location.state;
        fetch("https://localhost:5001/api/Nodes" , {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            // body: JSON.stringify(temp)
        })
        .then(res => 
            {
                if(res.status>399 && res.status<500 && res.status!=404) {
                    this.props.history.push('/login')
                }
                return res.json()
            })
            .then(
                (result) => {
                    this.setState({
                        devices: result
                    });


                },
            )
    }
    remove(e){
        let token = reactLocalStorage.getObject('userInfo').token

        console.log(e.target.attributes['id'].value)
        fetch("https://localhost:5001/api/nodes/"+ e.target.attributes['id'].value, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
            .then(res => {
                console.log(res)
                if (res.status > 399 && res.status < 500) {
                    this.props.history.push('/login')
                }else if(res.status ==204 ) {
                    MySwal.fire({
    
                        onOpen: () => {
    
                          MySwal.clickConfirm()
                        }
                      }).then(() => {
                        
                        return MySwal.fire(<p>Device successfully removed.</p>)
                        
                      })
    
                }
                else {
                    MySwal.fire({
    
                        onOpen: () => {
    
                          MySwal.clickConfirm()
                        }
                      }).then(() => {
                        return MySwal.fire(<p>Sorry. Something wrong happened</p>)
                      })
    
                }
            })
            

    }

    renderTableData() {
        console.log(this.state.devices)
        if(this.state.devices != 'No Node'){
        return this.state.devices.map((device, index) => {
            const { id, name, type, description } = device //destructuring
            var s = id
            var s ="/devices/edit" 
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{type}</td>
                    <td>{description}</td>

                    {/* <td className="text-left">
                        <Link to={t}>
                            <a href={t} className="btn btn-simple btn-warning btn-icon edit">messages</a>
                        </Link>
                    </td> */}
                    <td className="text-left">
                        <Link to={{ pathname: '/devices/edit', state: { id: id} }}>
                            <a href={s} className="btn btn-simple btn-warning btn-icon edit">config</a>
                        </Link>
                        
                    </td>
                    <td className="text-left">
                    
                            <a id={id} onClick={this.remove} className="btn btn-simple btn-warning btn-icon edit">remove</a>
                        
                        
                    </td>
                </tr>
            )
        })
    }
    }


    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Devices list"
                                tableFullWidth
                                content={
                                    <Table striped hover responsive>
                                        <thead>
                                            <tr>
                                                <th>ID</th>

                                                {
                                                    devices_thArray.map((prop, key) => {
                                                        return (
                                                            <th key={key}>{prop}</th>
                                                        );
                                                    })
                                                }
                                                <th>Configure</th>
                                                <th>Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* {this.renderTableData()} */}

                                        </tbody>
                                    </Table>

                                }

                                legend={


                                    <Link to='/devices/add'>
                                        <Button bsStyle="info" fill wd>
                                            Add Device
                                        </Button>
                                    </Link>
                                }
                                ftTextCenter
                            />
                        </Col>

                    </Row>
                </Grid>
            </div>
        );
    }
}

export default deviceList;
