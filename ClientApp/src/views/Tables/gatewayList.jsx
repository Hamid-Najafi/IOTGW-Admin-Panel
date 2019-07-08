import React, { Component } from 'react';
import {
    Table,
    Grid, Row, Col
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import {
    gateway_thArray
} from 'variables/Variables.jsx';
import { Link } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


class gatewayList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gateways: []
        };
    }
    componentWillMount() {

        let token = reactLocalStorage.getObject('userInfo').token
        // console.log(token)

        fetch("https://localhost:5001/api/Gateways", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            // body: JSON.stringify(temp)
        })
            .then(res => {
                if (res.status > 399 && res.status < 500 && res.status!=404) {
                    console.log(res)
                    // return res.json()
                    this.props.history.push('/login')
                }else return res.json()
            })
            .then(
                (result) => {
                    console.log('ssss')
                    this.setState({
                        gateways: result
                    });

                },
            )
    }
    remove(e){
        let token = reactLocalStorage.getObject('userInfo').token

        console.log(e.target.attributes['id'].value)
        fetch("https://localhost:5001/api/Gateways/"+ e.target.attributes['id'].value, {
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
                        
                        return MySwal.fire(<p>Gateway successfully removed.</p>)
                        
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
        if(this.state.gateways!= 'No Gateway'){
        return this.state.gateways.map((gw, index) => {
            const { id, name, description } = gw //destructuring
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{description}</td>
                    <td className="text-left">
                    <Link to={{ pathname: '/gateways/nodes', state: { id: id} }}>
                            <a className="btn btn-simple btn-warning btn-icon edit">show</a>
                        </Link>
                    </td>
                    <td className="text-left">
                    <Link to={{ pathname: '/gateways/edit', state: { id: id} }}>
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
    }


    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Gateway list"
                                tableFullWidth
                                content={
                                    <Table striped hover responsive>
                                        <thead>
                                            <tr>
                                                <th>ID</th>

                                                {
                                                    gateway_thArray.map((prop, key) => {
                                                        return (
                                                            <th key={key}>{prop}</th>
                                                        );
                                                    })
                                                }
                                                <th>Show Nodes</th>

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
                                    <Link to="/gateways/add" >
                                        <Button bsStyle="info" fill wd>
                                            Add Gateway
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

export default gatewayList;
