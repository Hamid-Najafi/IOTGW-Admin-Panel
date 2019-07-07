import React, { Component } from 'react';
// jQuery plugin - used for DataTables.net
import $ from 'jquery';
import {
    Grid, Row, Col
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';

// DataTables.net plugin - creates a tables with actions on it
require('datatables.net-responsive');
$.DataTable = require('datatables.net-bs');




const dataTable = {
    headerRow: [ 'Name', 'Position', 'Office', 'Age', 'Date', 'Actions' ],
    footerRow: [ 'Name', 'Position', 'Office', 'Age', 'Date', 'Actions' ],
    dataRows: [
        ['Airi Satou', 'Andrew Mike', 'Develop', '2013', '99,225'],
        ['Angelica Ramos', 'John Doe', 'Design', '2012', '89,241'],
        ['Ashton Cox', 'Alex Mike', 'Design', '2010', '92,144'],
        ['Bradley Greer','Mike Monday', 'Marketing', '2013', '49,990'],
        ['Brenden Wagner', 'Paul Dickens', 'Communication', '2015', '69,201'],
        ['Brielle Williamson','Mike Monday', 'Marketing', '2013', '49,990'],
        ['Yuri Berry','Mike Monday', 'Marketing', '2013', '49,990']
    ]
};

class deviceList extends Component{
    componentDidMount() {
        // $(this.refs.main).DataTable({
        //     dom: '<"data-table-wrapper"t>',
        //     data: this.props.names,
        //     columns,
        //     ordering: false
        // });
        $("#datatables").DataTable({
            "pagingType": "full_numbers",
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            responsive: true,
            language: {
                search: "_INPUT_",
                searchPlaceholder: "Search records",
            }
        });
        var table = $('#datatables').DataTable();

        // Edit record
        table.on( 'click', '.edit', function () {
            var $tr = $(this).closest('tr');

            var data = table.row($tr).data();
            alert( 'You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.' );
        } );

        // Delete a record
        table.on( 'click', '.remove', function (e) {
            var $tr = $(this).closest('tr');
            table.row($tr).remove().draw();
            e.preventDefault();
        } );

        //Like record
        table.on( 'click', '.like', function () {
            alert('You clicked on Like button');
        });
    }
    componentWillUnmount(){
        $('.data-table-wrapper')
        .find('table')
        .DataTable()
        .destroy(true);
    }
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <h4 className="title">Device Name</h4>
                            <Card
                                title="Device in My Gateway"
                                content={
                                    <div className="fresh-datatables">
                                        <table id="datatables" ref="main" className="table table-striped table-no-bordered table-hover" cellSpacing="0" width="100%" style={{width:"100%"}}>
                                            <thead>
                                                <tr>
                                                    <th>{ dataTable.headerRow[0] }</th>
                                                    <th>{ dataTable.headerRow[1] }</th>
                                                    <th>{ dataTable.headerRow[2] }</th>
                                                    <th>{ dataTable.headerRow[3] }</th>
                                                    <th>{ dataTable.headerRow[4] }</th>
                                                    <th className="disabled-sorting text-right">{ dataTable.headerRow[5] }</th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th>{ dataTable.footerRow[0] }</th>
                                                    <th>{ dataTable.footerRow[1] }</th>
                                                    <th>{ dataTable.footerRow[2] }</th>
                                                    <th>{ dataTable.footerRow[3] }</th>
                                                    <th>{ dataTable.footerRow[4] }</th>
                                                    <th className="text-right">{ dataTable.footerRow[5] }</th>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                {
                                                    dataTable.dataRows.map((prop,key) => {
                                                        return (
                                                            <tr key={key}>
                                                                {
                                                                    prop.map((prop,key)=> {
                                                                        return (
                                                                            <td  key={key}>{prop}</td>
                                                                        );
                                                                    })
                                                                }
                                                                <td className="text-right">
                                                                    <a className="btn btn-simple btn-info btn-icon like"><i className="fa fa-heart"></i></a>
                                                                    <a className="btn btn-simple btn-warning btn-icon edit"><i className="fa fa-edit"></i></a>
                                                                    <a className="btn btn-simple btn-danger btn-icon remove"><i className="fa fa-times"></i></a>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default deviceList;
