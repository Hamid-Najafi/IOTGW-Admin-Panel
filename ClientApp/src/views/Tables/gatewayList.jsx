import React, { Component } from 'react';
import {
    Table,
    Grid, Row, Col
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import addGateway from 'views/Forms/addGateway.jsx';
import {
    gateway_thArray,
    gateway_tdArray
} from 'variables/Variables.jsx';
import { Link } from 'react-router-dom';

class gatewayList extends Component {
    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Gateway list"
                                tableFullWidth
                                content={
                                    <Table striped hover responsive>
                                        <thead>
                                            <tr>
                                                <th>#</th>

                                                {
                                                    gateway_thArray.map((prop, key) => {
                                                        return (
                                                            <th key={key}>{prop}</th>
                                                        );
                                                    })
                                                }
                                                <th>Edit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                gateway_tdArray.map((prop, key) => {
                                                    return (

                                                        <tr key={key}>
                                                            <td>
                                                                {key + 1}
                                                            </td>
                                                            {
                                                                prop.map((prop, key) => {
                                                                    return (


                                                                        <td key={key}>
                                                                            {prop}
                                                                        </td>

                                                                    );
                                                                })
                                                            }
                                                            <td className="text-left">
                                                                <a className="btn btn-simple btn-warning btn-icon edit"><i className="fa fa-edit"></i></a>
                                                            </td>
                                                        </tr>

                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                }
                                legend={
                                    <Link to="/gateway/add" >
                                        <Button bsStyle="info" fill wd>
                                            Add Gateway
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

export default gatewayList;
