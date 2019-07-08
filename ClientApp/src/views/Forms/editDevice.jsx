import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl, Form
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import {reactLocalStorage} from 'reactjs-localstorage';

import Button from 'elements/CustomButton/CustomButton.jsx';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

class editDevice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            device:{"name":"","description":"", "type":"", "config":""}
        };
        this.handleConfig = this.handleConfig.bind(this)
        this.handleName = this.handleName.bind(this)
        this.handleDescription = this.handleDescription.bind(this)
        this.edit = this.edit.bind(this)

    }
    componentDidMount() {

    
        let token  = reactLocalStorage.getObject('userInfo').token;
        if (token== null) {
            this.props.history.push('/login')
        }

        if (this.props.location.state === undefined) this.props.history.push('/nodes')
        else {
            var targetId =this.props.location.state.id;
            console.log(targetId)
            fetch("https://localhost:5001/api/Nodes/" + targetId , {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                        'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
            .then(res => 
            {
                console.log(res)
                if(res.status>399 && res.status<500) {
                    this.props.history.push('/login')
                }
                return res.json()
            })
            .then(
                (result) => {
                    this.setState({
                        device: result
                    });

                },
            )
        }
        


    }
    handleName(event){
        let d = this.state.device;
        d.name = event.target.value
        this.setState({device: d});
    }
    handleDescription(event){
        let d = this.state.device;
        d.description = event.target.value
        this.setState({device: d});
    } 
    handleConfig(event) {
        console.log(this.state.device.config)
        let d = this.state.device;
        d.config = event.target.value
        console.log(d.config)
        this.setState({device: d});
        
    }

    edit() {
        let token  = reactLocalStorage.getObject('userInfo').token
        
        if (this.props.location.state === undefined) this.props.history.push('/nodes')
        else {
            var targetId =this.props.location.state.id;
            console.log(this.state.device.config)
            fetch("https://localhost:5001/api/Nodes/" + targetId , {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                            'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
                body:  JSON.stringify(this.state.device)
            })
                .then(res => {
                    return res.json()
                    // console.log(res.تسخد)
                    // if(res.status == 204){
                    //     MySwal.fire({
                    //         onOpen: () => {
                        
                    //         MySwal.clickConfirm()
                    //         }
                    //     }).then(() => {
                    //         return MySwal.fire(<p>Device successfully updated.</p>)
                    //     })
                    // }else {
                    //     MySwal.fire({
                    //         onOpen: () => {
                        
                    //         MySwal.clickConfirm()
                    //         }
                    //     }).then(() => {
                    //         return MySwal.fire(<p>Sorry, Something wrong happened.</p>)
                    //     })
                    // }
                }).then ((r)=>{
                    console.log(r)
                })
        }    
        }

    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>


                        <Col md={12}>
                            <Card
                                title={<legend>Device Information</legend>}

                                content={
                                    <form onSubmit={this.handleSubmit}>
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
                                                        onChange={this.handleName}
                                                        value={this.state.device.name}
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
                                                        value={this.state.device.description}
                                                        onChange={this.handleDescription}

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
                                                        value={this.state.device.type}
                                                        defaultValue="WiFi"
                                                        type="text"
                                                        disabled="true"
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </fieldset>

                                        <fieldset>
                                            <legend>Device configuration</legend>
                                            

                                            <FormGroup controlId="config">
                                                
                                                <Col sm={12}>
                            
                                            <textarea inputRef={(ref) => {
                                                            this.state.config = ref
                                                        }} value={this.state.device.config} onChange={this.handleConfig} />

                                                    
                                                </Col>
                                            </FormGroup>
                                            
                                        </fieldset>
                                        <Col ftTextCentermd={2} mdOffset={5}>

                                            <Button
                                                bsStyle="info"
                                                ftTextCenter
                                                fill
                                                wd
                                                onClick ={this.edit}
                                                type="submit"
                                            >
                                                Update Configuration
                                        </Button>
                                        {/* <input type="submit" value="Submit" /> */}

                                        </Col>
                                    </Form>
                                    </form>
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
