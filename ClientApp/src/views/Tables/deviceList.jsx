import React, { Component } from 'react';
import {
    Table,
    Grid, Row, Col
} from 'react-bootstrap';

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
                                                <th>Configure</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                devices_tdArray.map((prop, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td>
                                                                {key + 1}
                                                            </td>
                                                            {
                                                                prop.map((prop, key) => {
                                                                    return (
                                                                        <td key={key}>{prop}</td>
                                                                    );
                                                                })
                                                            }
                                                            <td className="text-left">
                                                                <Link to='/device/edit'>
                                                                    <a className="btn btn-simple btn-warning btn-icon edit"><i className="fa fa-edit"></i></a>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>

                                }

                                legend={


                                    <Link to='/device/add'>
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
