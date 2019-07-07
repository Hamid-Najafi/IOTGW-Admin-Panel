import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormControl, FormGroup
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import {reactLocalStorage} from 'reactjs-localstorage';

import Button from 'elements/CustomButton/CustomButton.jsx';

class RegisterPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            cardHidden: true,
            username: null,
            password: null,
            email: null,
            passwordConfirm: null

        };
    }
    handleSubmit(event) {
        let token  = reactLocalStorage.getObject('userInfo').token

        var temp = {
            "username": event.target.elements.username.value,
            "password": event.target.elements.password.value,
            "email": event.target.elements.email.value,
            "role": "User"
            
        }
        console.log(temp)
        fetch("https://localhost:5001/api/Users",{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                        'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,

            },
            body: JSON.stringify(temp)
        }).then(res => 
            {
                if(res.status>399 && res.status<500) {
                    this.props.history.push('/login')
                }
                console.log(32)
                return res.json()
            })
        .then((responseData) => {
            console.log(responseData)
            if (responseData.token != null) {
                let tempd =  responseData;
                console.log(tempd)
                // reactLocalStorage.setObject('userInfo',tempd)
                // this.props.history.push('/')
            } else {
                // console.log("user or pass is wrong")
            }
        })
              
    }

    componentDidMount(){
        console.log(this.state)

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
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <Card
                                plain
                                hidden={this.state.cardHidden}
                                content={
                                    <div>
                                        <FormGroup controlId="username">
                                            <FormControl
                                            
                                                type="text"
                                                placeholder="Your User Name"
                                                inputRef={(ref) => {
                                                    this.state.username = ref
                                                }}
                                            />
                                        </FormGroup>
                                       
                                        
                                        <FormGroup controlId="email">
                                            <FormControl
                                                type="email"
                                                placeholder="Enter Email"
                                                inputRef={(ref) => {
                                                    this.state.email = ref
                                                }}
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="password">
                                            <FormControl
                                                type="password"
                                                placeholder="Password"
                                                inputRef={(ref) => {
                                                    this.state.password = ref
                                                }}
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="passwordConfirm">
                                            <FormControl
                                                type="password"
                                                placeholder="Password Confirmation"
                                                inputRef={(ref) => {
                                                    this.state.passwordConfirm = ref
                                                }}
                                            />
                                        </FormGroup>
                                    </div>
                                }
                                ftTextCenter
                                legend={
                                    <Button wd fill type="submit" neutral>
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
