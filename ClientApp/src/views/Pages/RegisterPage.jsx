import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormControl, FormGroup
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';

import Button from 'elements/CustomButton/CustomButton.jsx';

class RegisterPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            cardHidden: true
        }
    }
    componentDidMount(){
        setTimeout(function() { this.setState({cardHidden: false}); }.bind(this), 10);
    }
    render(){
        return (
            <Grid>
                <Row>
                    <Col md={8} mdOffset={2}>
                        <div className="header-text">
                            <h2>Legace Gateway</h2>
                            <hr />
                        </div>
                    </Col>
                    <Col md={4} mdOffset={4}>
                        <form>
                            <Card
                                plain
                                hidden={this.state.cardHidden}
                                content={
                                    <div>
                                        <FormGroup>
                                            <FormControl
                                                type="text"
                                                placeholder="Your First Name"
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormControl
                                                type="text"
                                                placeholder="Your Last Name"
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormControl
                                                type="text"
                                                placeholder="Company"
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormControl
                                                type="email"
                                                placeholder="Enter Email"
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormControl
                                                type="password"
                                                placeholder="Password"
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormControl
                                                type="password"
                                                placeholder="Password Confirmation"
                                            />
                                        </FormGroup>
                                    </div>
                                }
                                ftTextCenter
                                legend={
                                    <Button wd fill neutral>
                                        Create Account
                                    </Button>
                                }
                            />
                        </form>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default RegisterPage;
