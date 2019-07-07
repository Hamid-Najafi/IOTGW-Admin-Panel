import React, { Component } from 'react';
import {
    Table,
    Grid, Row, Col
} from 'react-bootstrap';
import { reactLocalStorage } from 'reactjs-localstorage';

import Card from 'components/Card/Card.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import {
    users_thArray
} from 'variables/Variables.jsx';
import { Link } from 'react-router-dom';

class usersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentWillMount() {

        let token = reactLocalStorage.getObject('userInfo').token

        fetch("https://localhost:5001/api/Users", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
            .then(res => {
                if (res.status > 399 && res.status < 500) {
                    this.props.history.push('/login')
                } else {
                    return res.json()
                }


            })
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
            let idT = id;
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{username}</td>
                    <td>{email}</td>
                    <td className="text-left">
                        {/* <a  onClick={alert('alert')}>
                            edit
                        </a> */}
                        <Link to={{ pathname: '/users/edit', state: { id: idT} }}>
                            <a className="btn btn-simple btn-warning btn-icon edit">edit</a>
                        </Link>
                    </td>
                </tr>
            )
        })
    }

    render() {

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
