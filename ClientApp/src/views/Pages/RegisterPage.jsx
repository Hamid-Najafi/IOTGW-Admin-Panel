import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormControl, FormGroup
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import { reactLocalStorage } from 'reactjs-localstorage';

import Button from 'elements/CustomButton/CustomButton.jsx';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardHidden: true,
            username: null,
            password: null,
            email: null,
            role:null,
            passwordConfirm: null

        };
    }
    handleSubmit(event) {
        let token = reactLocalStorage.getObject('userInfo').token

        var temp = {
            "username": event.target.elements.username.value,
            "password": event.target.elements.password.value,
            "email": event.target.elements.email.value,
            "role": event.target.elements.role.value

        }
        console.log(temp)
        fetch("https://localhost:5001/api/Users", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,

            },
            body: JSON.stringify(temp)
        }).then(res => {
            console.log(res.status)

            if (res.status > 400 && res.status < 500) {
                // this.props.history.push('/login')
            }else {
                if(res.status == 201) {
                    MySwal.fire({
                        onOpen: () => {
                    
                          MySwal.clickConfirm()
                        }
                      }).then(() => {
                        return MySwal.fire(<p>User successfully added.</p>)
                      })
    
                }else {
                    MySwal.fire({
    
                        onOpen: () => {
    
                          MySwal.clickConfirm()
                        }
                      }).then(() => {
                        return MySwal.fire(<p>Sorry. Something wrong happened</p>)
                      })
    
                }
            }

            
        })

    }

    componentDidMount() {
        console.log(this.state)

    }
    render() {

    return (
        <div className="main-content">
            <Grid fluid>
                <Row>

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
                                        <FormGroup controlId="role">
                                            <FormControl
                                                type="name"
                                                placeholder="User Role"
                                                inputRef={(ref) => {
                                                    this.state.role = ref
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
        </div>
    );
    }
}

export default RegisterPage;
