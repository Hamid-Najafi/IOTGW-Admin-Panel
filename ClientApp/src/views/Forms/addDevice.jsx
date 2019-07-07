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


  
class addDevice extends Component {
    constructor(props) {
        super(props);
        this.vForm = this.refs.vForm;
        this.state = {
            name: null,
            description: null,
            gatewayid:null,
            type: null

        }
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
            "name": event.target.elements.name.value,
            "type": event.target.elements.type.value,
            "gatewayId":event.target.elements.gatewayid.value,
            "config": "string",
            "description": event.target.elements.description.value
        }
        fetch("https://localhost:5001/api/Nodes", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,

            },
            body: JSON.stringify(temp)
        }).then((response) => {
            console.log(response)
            if (response.status == 201) {
                response.json()
                MySwal.fire({
                    onOpen: () => {
                
                      MySwal.clickConfirm()
                    }
                  }).then(() => {
                    return MySwal.fire(<p>Device successfully added.</p>)
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
                                        <legend>Add Device</legend>
                                    }
                                    content={
                                        <div>
                                            <FormGroup controlId="name">
                                                <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                    Device Name
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
                                            
                                            <FormGroup controlId="type">
                                            <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                    Device Name
                                                </Col>
                                                <Col sm={6}>
                                                <FormControl    
                                                    inputRef={ (ref) => this.state.name=ref }
                                                    componentClass="select" placeholder="Type">
                                                    <option value="wifi">WiFi</option>
                                                    <option value="zigbee">Zigbee</option>
                                                    <option value="lora">Lora</option>
                                                    <option value="bluetooth">Bluetooth</option>
                                                </FormControl>
                                                </Col>
                                                </FormGroup>

                                            {/* <FormGroup controlId="type">
                                                <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                    Device Type
                                                </Col>
                                                <Col sm={6}>
                                                    <FormControl

                                                        type="drowdown"
                                                        placeholder="type"
                                                        inputRef={(ref) => {
                                                            this.state.type = ref
                                                        }}
                                                    />
                                                </Col>
                                            </FormGroup> */}
                                            <FormGroup controlId="gatewayid">
                                                <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                    Gateway Id
                                                </Col>
                                                <Col sm={6}>
                                                    <FormControl

                                                        type="number"
                                                        placeholder="Gateway Id"
                                                        inputRef={(ref) => {
                                                            this.state.gatewayid = ref
                                                        }}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup controlId="description">
                                                <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                    Description
                                                </Col>
                                                <Col sm={6}>
                                                    <FormControl

                                                        type="text"
                                                        placeholder="description"
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
                                        <Button fill bsStyle="info" type="submit" >Add Device</Button>
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

export default addDevice;
