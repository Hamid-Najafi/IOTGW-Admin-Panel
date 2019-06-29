import React, { Component } from 'react';
import {
    Grid, Row, Col
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import FormInputs from 'components/FormInputs/FormInputs.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import { userInfo } from 'variables/Variables.jsx';

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: []
        };
    }
    
    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/todos/1")
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
                                                    placeholder: "Company",
                                                    defaultValue: userInfo.company,
                                                    disabled: false
                                                },
                                                {
                                                    label: "Username",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Username",
                                                    defaultValue: userInfo.user_name
                                                },
                                                {
                                                    label: "Email address",
                                                    type: "email",
                                                    bsClass: "form-control",
                                                    placeholder: "Email",
                                                    defaultValue: userInfo.email
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
                                                    placeholder: "First name",
                                                    defaultValue: userInfo.firstName
                                                },
                                                {
                                                    label: "Last name",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Last name",
                                                    defaultValue: userInfo.lastName
                                                },
                                                {
                                                    label: "Adress",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Home Adress",
                                                    defaultValue: userInfo.address
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
                                                    placeholder: "City",
                                                    defaultValue: userInfo.city
                                                },
                                                {
                                                    label: "Country",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Country",
                                                    defaultValue: userInfo.country
                                                },
                                                {
                                                    label: "Postal Code",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "ZIP Code",
                                                    defaultValue: userInfo.zipCode
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
