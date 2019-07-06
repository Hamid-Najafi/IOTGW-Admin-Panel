import React, { Component } from 'react';
import {
    Table,
    Grid, Row, Col
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import {
    users_thArray,
    users_tdArray
} from 'variables/Variables.jsx';
import { Link } from 'react-router-dom';

class usersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [{ id: 1, username: "ss" }]
        };
    }

    componentWillMount() {
        fetch("https://localhost:5001/api/Users")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        users: result
                    });
                },
            )
    }

    renderTableData() {
        return this.state.users.map((user, index) => {
            const { id, username, email } = user //destructuring
            var s = "" + id
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{username}</td>
                    <td>{email}</td>
                    <td className="text-left">
                        <a href={s} className="btn btn-simple btn-warning btn-icon edit">edit</a>
                    </td>
                </tr>
            )
        })
    }

    render() {
        console.log(this.state.users)

        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Users list"
                                tableFullWidth
                                content={
                                    <Table striped hover responsive>
                                        <thead>
                                            <tr>
                                                <th>#</th>

                                                {
                                                    users_thArray.map((prop, key) => {
                                                        return (
                                                            <th key={key}>{prop}</th>
                                                        );
                                                    })
                                                }
                                                <th>Edit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderTableData()}
                                        </tbody>
                                    </Table>
                                }
                                legend={
                                    <Link to="/users/add" >
                                        <Button bsStyle="info" fill wd>
                                            Add User
                                        </Button>
                                    </Link>
                                }
                                ftTextCenter
                            />
                        </Col>

                    </Row>
                </Grid>
            </div>
        );
    }
}

export default usersList;
