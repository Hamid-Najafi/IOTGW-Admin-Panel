import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl, Form
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';

import Button from 'elements/CustomButton/CustomButton.jsx';
import Radio from 'elements/CustomRadio/CustomRadio.jsx';

class editDevice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radio: "1",
            radioVariant: "1"
        };
    }
    handleRadio = event => {
        const target = event.target;
        this.setState({
            [target.name]: target.value
        });
    };
    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>


                        <Col md={12}>
                            <Card
                                title={<legend>Device Information</legend>}

                                content={
                                    <Form horizontal>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Device Name
                                                </ControlLabel>
                                                <Col sm={10}>
                                                    <FormControl
                                                        type="text"
                                                        placeholder="Name"

                                                    />
                                                </Col>
                                            </FormGroup>
                                        </fieldset>

                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Description
                                                </ControlLabel>
                                                <Col sm={10}>
                                                    <FormControl
                                                        placeholder="Description"
                                                        type="text"
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Device Type
                                                </ControlLabel>
                                                <Col sm={10}>
                                                    <FormControl
                                                        defaultValue="WiFi"
                                                        type="text"
                                                        disabled = "true"
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </fieldset>

                                        <fieldset>
                                            <legend>Device configuration</legend>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Mode
                                                </ControlLabel>

                                                <Col sm={10}>
                                                    <Radio
                                                        number="14"
                                                        option="2"
                                                        name="radioVariant"
                                                        onChange={this.handleRadio}
                                                        checked={this.state.radioVariant === "2"}
                                                        label="ST"
                                                    />
                                                    <Radio
                                                        number="15"
                                                        option="1"
                                                        name="radioVariant"
                                                        onChange={this.handleRadio}
                                                        checked={this.state.radioVariant === "1"}
                                                        label="AP"
                                                    />
                                                    <Radio
                                                        number="16"
                                                        option="3"
                                                        name="radioVariant"
                                                        onChange={this.handleRadio}
                                                        checked={this.state.radioVariant === "3"}
                                                        label="Both Power"
                                                    />
                                                    <fieldset>
                                                        <legend>ST</legend>
                                                        <FormGroup>
                                                           

                                                            <Col sm={12}>
                                                                <FormGroup>
                                                                    <ControlLabel className="col-sm-2">
                                                                        SSID
                                                                    </ControlLabel>
                                                                    <Col sm={10}>
                                                                        <FormControl
                                                                            type="text"
                                                                        />
                                                                    </Col>
                                                                </FormGroup>
                                                                <FormGroup>
                                                                    <ControlLabel className="col-sm-2">
                                                                        Password
                                                                    </ControlLabel>
                                                                    <Col sm={10}>
                                                                        <FormControl
                                                                            type="password"
                                                                        />
                                                                    </Col>
                                                                </FormGroup>
                                                            </Col>
                                                        </FormGroup>
                                                    </fieldset>

                                                    <fieldset>
                                                        <legend>AP</legend>
                                                        <FormGroup>
                                                           

                                                            <Col sm={12}>
                                                                <FormGroup>
                                                                    <ControlLabel className="col-sm-2">
                                                                        SSID
                                                                    </ControlLabel>
                                                                    <Col sm={10}>
                                                                        <FormControl
                                                                            type="text"
                                                                        />
                                                                    </Col>
                                                                </FormGroup>
                                                                <FormGroup>
                                                                    <ControlLabel className="col-sm-2">
                                                                        Password
                                                                    </ControlLabel>
                                                                    <Col sm={10}>
                                                                        <FormControl
                                                                            type="password"
                                                                        />
                                                                    </Col>
                                                                </FormGroup>
                                                                <FormGroup>
                                                                    <ControlLabel className="col-sm-2">
                                                                        Channel
                                                                    </ControlLabel>
                                                                    <Col sm={10}>
                                                                        <FormControl
                                                                            type="text"
                                                                        />
                                                                    </Col>
                                                                </FormGroup>
                                                                <FormGroup>
                                                                    <ControlLabel className="col-sm-2">
                                                                        Bandwidth
                                                                    </ControlLabel>
                                                                    <Col sm={10}>
                                                                        <FormControl
                                                                            type="text"
                                                                        />
                                                                    </Col>
                                                                </FormGroup>
                                                            </Col>
                                                        </FormGroup>
                                                    </fieldset>

                                                    
                                                </Col>
                                            </FormGroup>

                                        </fieldset>
                                        <Col ftTextCentermd={2} mdOffset={5}>

                                        <Button
                                            bsStyle="info"
                                            ftTextCenter
                                            fill
                                            wd
                                            type="submit"
                                        >
                                            Update Configuration
                                        </Button>

                                        </Col>
                                    </Form>
                                }
                            />
                        </Col>

                        <Col md={12}>
                            <Card
                                title={<legend>Device Log</legend>}

                                content={
                                    <Form horizontal>
                                        <fieldset>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <ControlLabel className="col-sm-2">
                                                        From
                                                    </ControlLabel>
                                                    <Col sm={10}>
                                                        <FormControl
                                                            type="date"
                                                            placeholder="From"

                                                        />
                                                    </Col>
                                                </FormGroup>
                                            </Col>
                                            
                                            <Col md={6}>

                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    To
                                                </ControlLabel>
                                                <Col sm={10}>
                                                    <FormControl
                                                        placeholder="To"
                                                        type="date"
                                                    />
                                                </Col>
                                            </FormGroup>
                                            </Col>

                                        </fieldset>

                                        
                                        <Col ftTextCentermd={2} mdOffset={5}>

                                        <Button
                                            bsStyle="info"
                                            ftTextCenter
                                            fill
                                            wd
                                            type="submit"
                                        >
                                            Show Log
                                        </Button>

                                        </Col>
                                    </Form>
                                }
                            />
                        </Col>

                    </Row>
                </Grid>
            </div>
        );
    }
}

export default editDevice;
