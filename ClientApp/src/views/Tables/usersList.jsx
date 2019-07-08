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
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

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
                if (res.status > 399 && res.status < 500 && res.status!=404) {
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

    remove(e){
        let token = reactLocalStorage.getObject('userInfo').token

        console.log(e.target.attributes['id'].value)
        fetch("https://localhost:5001/api/users/"+ e.target.attributes['id'].value, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
            .then(res => {
                console.log(res)
                if (res.status > 399 && res.status < 500) {
                    this.props.history.push('/login')
                }else if(res.status ==204 ) {
                    MySwal.fire({
    
                        onOpen: () => {
    
                          MySwal.clickConfirm()
                        }
                      }).then(() => {
                        
                        return MySwal.fire(<p>User successfully removed.</p>)
                        
                      })
    
                }
                else {
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
    renderTableData() {
        return this.state.users.map((user, index) => {
            const { id, username, email , role} = user //destructuring
            let idT = id;
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{username}</td>
                    <td>{role}</td>
                    <td>{email}</td>
                    <td className="text-left">
                        {/* <a  onClick={alert('alert')}>
                            edit
                        </a> */}
                        <Link to={{ pathname: '/users/edit', state: { id: id} }}>
                            <a className="btn btn-simple btn-warning btn-icon edit">edit</a>
                        </Link>
                    </td>
                    <td className="text-left">
                    
                            <a id={id} onClick={this.remove} className="btn btn-simple btn-warning btn-icon edit">remove</a>
                        
                        
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
                                                <th>ID</th>

                                                {
                                                    users_thArray.map((prop, key) => {
                                                        return (
                                                            <th key={key}>{prop}</th>
                                                        );
                                                    })
                                                }
                                                <th>Edit</th>
                                                <th>Remove</th>

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
