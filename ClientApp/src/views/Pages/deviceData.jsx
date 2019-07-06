import React, { Component } from 'react';
import {
    Grid, Row, Col
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';

class deviceData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/todos/1")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        data: result
                    });
                },
        )
    }

    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="deviceData"
                                content={
                                    <Col>

                                        <div>{this.state.data.title}</div>

                                    </Col>
                                }
                            />

                        </Col>

                    </Row>
                </Grid>
            </div>
        );
    }
}

export default deviceData;
