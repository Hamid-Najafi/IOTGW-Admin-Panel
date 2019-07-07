import React, { Component } from 'react';
import {
    Grid, Row, Col,
    Form, FormGroup, FormControl, ControlLabel
} from 'react-bootstrap';
import {reactLocalStorage} from 'reactjs-localstorage';

import Card from 'components/Card/Card.jsx';

import Button from 'elements/CustomButton/CustomButton.jsx';

class addGateway extends Component {
    constructor(props) {
        super(props);
        this.vForm = this.refs.vForm;
        this.state = {

            name: null,
            description: null


        }
    }

    handleSubmit(event) {
        let token = reactLocalStorage.getObject('userInfo').token

        var temp = {
            "name": event.target.elements.name.value,
            "description": event.target.elements.description.value
        }
        fetch("https://localhost:5001/api/Gateway", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,

            },
            body: JSON.stringify(temp)
        }).then((response) => {
            console.log(response)
            if(response.status ==201){
                response.json()
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
                                        <legend>Add Gateway</legend>
                                    }
                                    content={
                                        <div>
                                            <FormGroup controlId="name">
                                                <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                    Gateway Name
                                                </Col>
                                                <Col sm={6}>
                                                    <FormControl

                                                        type="text"
                                                        placeholder="Name"
                                                        inputRef={(ref) => {
                                                            this.state.name = ref
                                                        }}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup controlId="description">
                                                <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                    Gateway Description
                                                </Col>
                                                <Col sm={6}>
                                                    <FormControl

                                                        type="text"
                                                        placeholder="Description"
                                                        inputRef={(ref) => {
                                                            this.state.description = ref
                                                        }}
                                                    />
                                                </Col>
                                            </FormGroup>

                                        </div>
                                    }
                                    ftTextCenter
                                    legend={
                                        <Button fill bsStyle="info" type="submit" >Add Gateway</Button>
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

export default addGateway;
