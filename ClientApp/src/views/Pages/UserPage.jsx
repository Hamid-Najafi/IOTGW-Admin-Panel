import React, { Component } from 'react';
import {
    Grid, Row, Col
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import FormInputs from 'components/FormInputs/FormInputs.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import {reactLocalStorage} from 'reactjs-localstorage';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: []
        };

        this.handleEmail = this.handleEmail.bind(this)
        this.handleUsername = this.handleUsername.bind(this)
        this.handleCompanyName = this.handleCompanyName.bind(this)
        this.handleFirstName = this.handleFirstName.bind(this)
        this.handleLastName = this.handleLastName.bind(this)
        this.handleAdress = this.handleAdress.bind(this)
        this.handleCity = this.handleCity.bind(this)
        this.handleCountry = this.handleCountry.bind(this)
        this.handlePostalCode = this.handlePostalCode.bind(this)
        this.edit = this.edit.bind(this)

    }
    
    componentDidMount() {

    
        let token  = reactLocalStorage.getObject('userInfo').token;
        console.log(token)
        if (token== null) {
            this.props.history.push('/login')
        }

        let id = reactLocalStorage.getObject('userInfo').id;
        fetch("https://localhost:5001/api/Users/" + id , {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                        'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
            .then(res => 
            {
                if(res.status>399 && res.status<500) {
                    this.props.history.push('/login')
                }
                return res.json()
            })
            .then(
                (result) => {
                    this.setState({
                        user: result
                    });


                },
            )


    }
   
    handleEmail(e) {
        var usert = this.state.user;
        usert.email = e.target.value;
        this.setState({user: usert});
    }
    handleUsername(e) {
        var usert = this.state.user;
        usert.username = e.target.value;
        this.setState({user: usert});
    }
    handleCompanyName(e) {
        var usert = this.state.user;
        usert.companyName = e.target.value;
        this.setState({user: usert});
    }
    handleFirstName(e) {
        var usert = this.state.user;
        usert.firstName = e.target.value;
        this.setState({user: usert});
    }
    handleLastName(e) {
        var usert = this.state.user;
        usert.lastName = e.target.value;
        this.setState({user: usert});
    }
    handleAdress(e) {
        var usert = this.state.user;
        usert.address = e.target.value;
        this.setState({user: usert});
    }
    handleCity(e) {
        var usert = this.state.user;
        usert.city = e.target.value;
        this.setState({user: usert});
    }
    handleCountry(e) {
        var usert = this.state.user;
        usert.country = e.target.value;
        this.setState({user: usert});
    }
    handlePostalCode(e) {
        var usert = this.state.user;
        usert.postalCode = e.target.value;
        this.setState({user: usert});
    }

    edit() {
        let token  = reactLocalStorage.getObject('userInfo').token
        let id = 1;
        console.log(id)
        fetch("https://localhost:5001/api/Users/" + id , {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                        'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body:  JSON.stringify(this.state.user)
        })
            .then(res => {
                if(res.status == 204){
                    MySwal.fire({
                        onOpen: () => {
                    
                          MySwal.clickConfirm()
                        }
                      }).then(() => {
                        return MySwal.fire(<p>Info successfully updated.</p>)
                      })
                }else {
                    MySwal.fire({
                        onOpen: () => {
                    
                          MySwal.clickConfirm()
                        }
                      }).then(() => {
                        return MySwal.fire(<p>Sorry, Something wrong happened.</p>)
                      })
                }
                reactLocalStorage.setObject('userInfo',this.state.user)
            })
            
        }
    
    render() {
        return (            
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Edit Profile"
                                content={
                                    <form>
                                        <FormInputs
                                            ncols={["col-md-5", "col-md-3", "col-md-4"]}
                                            proprieties={[
                                                {
                                                    label: "Company Name",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder:"Company Name",
                                                    onChange:this.handleCompanyName,
                                                    value: this.state.user.companyName
                                                },
                                                {
                                                    label: "Username",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder:"Username",
                                                    onChange:this.handleUsername,
                                                    value: this.state.user.username,
                                                },
                                                {
                                                    label: "Email address",
                                                    type: "email",
                                                    bsClass: "form-control",
                                                    placeholder:"email",
                                                    value:  this.state.user.email,
                                                    onChange:this.handleEmail,
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols={["col-md-3", "col-md-3","col-md-6"]}
                                            proprieties={[
                                                {
                                                    label: "First name",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder:"First name",
                                                    value: this.state.user.firstName,
                                                    onChange:this.handleFirstName,
                                                },
                                                {
                                                    label: "Last name",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder:"Last name",    
                                                    value: this.state.user.lastName,
                                                    onChange:this.handleLastName,

                                                },
                                                {
                                                    label: "Adress",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder:"Adress",
                                                    value: this.state.user.address,
                                                    onChange:this.handleAdress,
                                                }
                                            ]}
                                        />
                                        
                                        <FormInputs
                                            ncols={["col-md-4", "col-md-4", "col-md-4"]}
                                            proprieties={[
                                                {
                                                    label: "City",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder:"City",
                                                    value: this.state.user.city,
                                                    onChange:this.handleCity,

                                                },
                                                {
                                                    label: "Country",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder:"Country",
                                                    value: this.state.user.country,
                                                    onChange:this.handleCountry,
                                                },
                                                {
                                                    label: "Postal Code",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder:"Postal Code",
                                                    value: this.state.user.postalCode,
                                                    onChange:this.handlePostalCode,
                                                }
                                            ]}
                                        />

                                        <Col ftTextCentermd={2} mdOffset={5}>

                                        <Button
                                            bsStyle="info"
                                            ftTextCenter
                                            fill
                                            wd
                                            onClick ={this.edit}
                                            type="button"
                                        >
                                            Update Profile
                                        </Button>

                                        </Col>

                                        <div className="clearfix"></div>
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

export default UserPage;
