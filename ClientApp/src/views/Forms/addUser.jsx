import React, { Component } from 'react';
import {
    Grid, Row, Col,
    Form, FormGroup, FormControl, ControlLabel
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';

import {reactLocalStorage} from 'reactjs-localstorage';

import Button from 'elements/CustomButton/CustomButton.jsx';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


  
class addUser extends Component {
    constructor(props) {
        super(props);
        this.vForm = this.refs.vForm;
        this.state = {
            name: null,
            email: null,
            role:null,
            password: null,
            id:null

        }
    }
    componentWillRecieveProps(nextProps){
        this.setState({
         editUserUd:nextProps["id"]
         });
    
        }
    componentDidMount(){
        let user  = reactLocalStorage.getObject('userInfo')

        if(user.role !=="Admin"){
                this.props.history.push('/login')
        }

    }
    handleSubmit(event) {
        let token = reactLocalStorage.getObject('userInfo').token

        var temp = {
            "username": event.target.elements.name.value,
            "email": event.target.elements.email.value,
            "role": event.target.elements.role.value,
            "password": event.target.elements.password.value
        }
        fetch("https://localhost:5001/api/Users", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,

            },
            body: JSON.stringify(temp)
        }).then((response) => {
            if (response.status == 201) {
                response.json()
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

        })

    }
    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>

                        <Col md={12}>
                            <form onSubmit={(e) => this.handleSubmit(e)}>
                            <Form horizontal>
                                <Card
                                    title={
                                        <legend>Add User</legend>
                                    }
                                    content={
                                        <div>
                                            <FormGroup controlId="name">
                                                <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                    User Name
                                                </Col>
                                                <Col sm={6}>
                                                    <FormControl

                                                        type="text"
                                                        placeholder="Name"
                                                        inputRef={(ref) => {
                                                            this.state.name = ref
                                                        }}
                                                    />
                                                    {this.state.type_textError}
                                                </Col>
                                            </FormGroup>

                                            <FormGroup controlId="email">
                                                <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                    User Email
                                                </Col>
                                                <Col sm={6}>
                                                    <FormControl

                                                        type="email"
                                                        placeholder="type"
                                                        inputRef={(ref) => {
                                                            this.state.email = ref
                                                        }}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup controlId="role">
                                            <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                    User role
                                                </Col>
                                                <Col sm={6}>
                                                <FormControl    
                                                    inputRef={ (ref) => this.state.role=ref }
                                                    componentClass="select" placeholder="Type">
                                                    <option value="Admin">Admin</option>
                                                    <option value="User">User</option>
                                                    
                                                </FormControl>
                                                </Col>
                                                </FormGroup>
                                            <FormGroup controlId="password">
                                                <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                    Password
                                                </Col>
                                                <Col sm={6}>
                                                    <FormControl

                                                        type="password"
                                                        placeholder="password"
                                                        inputRef={(ref) => {
                                                            this.state.password = ref
                                                        }}
                                                    />
                                                </Col>
                                            </FormGroup>

                                        </div>
                                    }
                                    ftTextCenter
                                    legend={
                                        <Button fill bsStyle="info" type="submit" >Add User</Button>
                                    }
                                />
                            </Form>
                            </form>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default addUser;
