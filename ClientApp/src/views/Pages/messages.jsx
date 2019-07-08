import React, { Component } from 'react';
import {
    Grid, Row, Col
} from 'react-bootstrap';
import { reactLocalStorage } from 'reactjs-localstorage';
import ReactDOM from 'react-dom'; // you used 'react-dom' as 'ReactDOM'

import Card from 'components/Card/Card.jsx';

class messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
    }

    componentDidMount() {
        let token = reactLocalStorage.getObject('userInfo').token


        fetch("https://localhost:5001/api/Messages", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            // body: JSON.stringify(temp)
        })
            .then(res => {
                if (res.status > 399 && res.status < 500) {
                    this.props.history.push('/login')
                }
                return res.json()
            })
            .then(
                (result) => {
                    this.setState({
                        messages: result
                    });


                },
            )

    }

    printMessages() {

        return (
            <div>
                {this.state.messages.map(m => <li>{JSON.stringify(m)} <br></br></li>)}
            </div>
        );
    }
    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Messages"
                                content={
                                    <Col>
                                        {
                                            this.printMessages()
                                        }


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

export default messages;
