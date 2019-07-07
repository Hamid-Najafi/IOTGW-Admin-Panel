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
    devices_thArray,
    devices_tdArray
} from 'variables/Variables.jsx';
// let gatewayId = 1;
// let addPageUrl = gatewayId + '/add/';
class deviceList extends Component {



    constructor(props) {
        super(props);
        this.state = {
            devices: []
        };
    }

    componentWillMount() {

        let token = reactLocalStorage.getObject('userInfo').token


        fetch("https://localhost:5001/api/gateway/Node?token=" + token, {
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
                if(res.status>399 && res.status<500) {
                    this.props.history.push('/login')
                }
                console.log(32)
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

    renderTableData() {
        return this.state.devices.map((device, index) => {
            const { id, name, type, description } = device //destructuring
            var s = id
            var s ="/devices/" +id 
            var t = "/devices/" +id +"/messages"
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{type}</td>
                    <td>{description}</td>

                    <td className="text-left">
                        <Link to={t}>
                            <a href={t} className="btn btn-simple btn-warning btn-icon edit">messages</a>
                        </Link>
                    </td>
                    <td className="text-left">
                        <Link to={s}>
                            <a href={s} className="btn btn-simple btn-warning btn-icon edit">config</a>
                        </Link>
                    </td>
                </tr>
            )
        })
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
                                                <th>#</th>

                                                {
                                                    devices_thArray.map((prop, key) => {
                                                        return (
                                                            <th key={key}>{prop}</th>
                                                        );
                                                    })
                                                }
                                                <th>Messages</th>
                                                <th>Configure</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderTableData()}

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
