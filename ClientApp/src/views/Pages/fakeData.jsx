import React, { Component } from 'react';
import {
    Grid, Row, Col
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';

class fakeData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mockData: []
        };
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/todos/1")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        mockData: result
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
                                title="Fake Data from API"
                                content={
                                    <Col>

                                        <div>user ID:{this.state.mockData.userId}</div>
                                        <div>title:{this.state.mockData.title}</div>

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

export default fakeData;
