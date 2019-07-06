import React, { Component } from 'react';
import {
    Grid, Row, Col
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import FormInputs from 'components/FormInputs/FormInputs.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: []
        };
    }
    
    componentDidMount() {
        fetch("https://localhost:5001/api/Users/1")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                user: result
              });
              console.log(this.state.user)
            },
        )
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
                                                    placeholder: this.state.user.companyName,
                                                    disabled: false
                                                },
                                                {
                                                    label: "Username",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: this.state.user.username,
                                                },
                                                {
                                                    label: "Email address",
                                                    type: "email",
                                                    bsClass: "form-control",
                                                    placeholder:  this.state.user.email,
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
                                                    placeholder: this.state.user.firstName,
                                                },
                                                {
                                                    label: "Last name",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: this.state.user.lastName

                                                },
                                                {
                                                    label: "Adress",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: this.state.user.address,
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
                                                    placeholder: this.state.user.city,
                                                },
                                                {
                                                    label: "Country",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: this.state.user.country,
                                                },
                                                {
                                                    label: "Postal Code",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: this.state.user.postalCode,
                                                }
                                            ]}
                                        />

                                        <Col ftTextCentermd={2} mdOffset={5}>

                                        <Button
                                            bsStyle="info"
                                            ftTextCenter
                                            fill
                                            wd
                                            type="submit"
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
