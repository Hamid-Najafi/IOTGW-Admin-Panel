import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';
import {reactLocalStorage} from 'reactjs-localstorage';
import Card from 'components/Card/Card.jsx';

import Button from 'elements/CustomButton/CustomButton.jsx';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardHidden: true,
            username: null,
            password: null
        };
    }
 
    handleSubmit(event) {

        var temp = {
            "username": event.target.elements.username.value,
            "password": event.target.elements.password.value
        }
        fetch("https://localhost:5001/api/Users/authenticate",{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                        'Content-Type': 'application/json',
            },
            body: JSON.stringify(temp)
        }).then((response) => response.json())
        .then((responseData) => {
            console.log(responseData.result)
            if (responseData.result.token != null) {
                let tempd =  responseData.result;
                console.log(tempd)
                reactLocalStorage.setObject('userInfo',tempd)

                console.log(                reactLocalStorage.getObject('userInfo')
                )
                // this.props.history.push('/')
            } else {
                console.log("user or pass is wrong")
            }
        })
              
    }
    render() {
        return (
            <Grid>
                <Row>
                    <Col md={4} sm={6} mdOffset={4} smOffset={3}>
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <Card
                                hidden={this.state.cardHidden}
                                textCenter
                                title="Login"
                                content={
                                    <div>
                                        <FormGroup controlId="username">
                                            <ControlLabel>
                                                User Name
                                            </ControlLabel>
                                            <FormControl inputRef={(ref) => {
                                                this.state.username = ref
                                            }}
                                                placeholder="username"
                                                type="name"
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="password">
                                            <ControlLabel>
                                                Password
                                            </ControlLabel>
                                            <FormControl
                                                inputRef={(ref) => { this.state.password = ref }}
                                                placeholder="Password"
                                                type="password"

                                            />
                                        </FormGroup>

                                    </div>
                                }
                                legend={
                                    <div>
                                        <Row>
                                            <Col md={12}>
                                                <Button bsStyle="info" type="submit" fill wd>
                                                    Login
                                            </Button>
                                            </Col>
                                        </Row>

                                    </div>
                                }
                                ftTextCenter
                            />
                        </form>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default LoginPage;
