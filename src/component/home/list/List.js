import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropOffRecords: null
        }
    }

    getPlastics = async (v) => {
        if (v != null && v.id != null) {
            let res = await axios.get(`http://localhost:8080/metadata/findPlasticsByDropOff?id=${v.id}`, {});
            if(res.data != null){
                v.dropOffPlastics=""
                res.data.forEach(element => {
                    v.dropOffPlastics += `${element.kind}, `
                });
            }
            return v
        }
    }

    componentDidMount() {
        let dropOffs = JSON.parse(localStorage.getItem("dropOffs"));
        const records = Promise.all(dropOffs.map(v => this.getPlastics(v)));

        records.then(data => {
            const finalizedDropOffs = data.map(v => {
                if (v != null) {
                    return (
                        <tr key={v.id}>
                            <td>{v.title}</td>
                            <td>{v.streetAddress}</td>
                            <td>{v.dropOffPlastics}</td>
                        </tr>
                    );
                }
            })
            this.setState({dropOffRecords: finalizedDropOffs})
        })
        

    }

    buildTable = () => {
        if (this.state.dropOffRecords) {
            return (
                <div>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th style={{width: '40%'}}>Plastics Accepted</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.dropOffRecords}
                        </tbody>
                    </Table>
                </div>
            )
        } else {
            return (<h1>No dropoffs found.</h1>)
        }

    }
    render() {
        return (
            <div>
                {this.buildTable()}
            </div>
        );
    }
}


export default List;