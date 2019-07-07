import React, { Component } from 'react';
import {
    Table,
    Grid, Row, Col
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import {
    gateway_thArray,
    gateway_tdArray
} from 'variables/Variables.jsx';
import { Link } from 'react-router-dom';
import {reactLocalStorage} from 'reactjs-localstorage';

class gatewayList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gateways:[]
        };
    }
    componentWillMount() {

        let token  = reactLocalStorage.getObject('userInfo').token
        

        fetch("https://localhost:5001/api/Gateway" , {
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
                        gateways: result
                    });


                },
            )
    }

    renderTableData() {
        return this.state.gateways.map((gw, index) => {
            const { id, name, description } = gw //destructuring
            var s = "/gateways/"+ id
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{description}</td>
                    <td className="text-left">
                        <Link to={s}>
                            <a href={s} className="btn btn-simple btn-warning btn-icon edit">edit</a>
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
                                        {this.renderTableData()}

                                        </tbody>
                                    </Table>
                                }
                                legend={
                                    <Link to="/gateways/add" >
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
