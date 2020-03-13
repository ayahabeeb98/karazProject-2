import React from 'react';
import { Table } from 'reactstrap';

export default function UsersData(props){
    return (
        <div>
            <h3 className="mainHeading mb-4 ">Users Data</h3>
            <Table className="border mb-0 bg-white" light>
                <thead>
                <tr className="text-center">
                    <th className="border">#</th>
                    <th>User Name</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Sign Up Type</th>
                    <th>Device</th>
                    <th>Acquisition</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr className="text-center">
                    <th scope="row" className="border">1</th>
                    <td>Mark</td>
                    <td>Gaza</td>
                    <td>8/3/2020</td>
                    <td>Google</td>
                    <td>Web</td>
                    <td>Instagram</td>
                    <td>#</td>
                </tr>
                <tr className="text-center">
                    <th scope="row" className="border">2</th>
                    <td>Jacob</td>
                    <td>Gaza</td>
                    <td>8/3/2020</td>
                    <td>Google</td>
                    <td>Mobile</td>
                    <td>Facebook</td>
                    <td>#</td>
                </tr>
                <tr className="text-center">
                    <th className="border">3</th>
                    <td>Larry</td>
                    <td>Gaza</td>
                    <td>8/3/2020</td>
                    <td>Google</td>
                    <td>Web</td>
                    <td>Facebook</td>
                    <td>#</td>
                </tr>
                </tbody>
            </Table>
        </div>
    );
};