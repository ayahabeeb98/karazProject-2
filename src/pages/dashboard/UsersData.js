import React, {useEffect, useState} from 'react';
import {Table} from 'reactstrap';
import axios from 'axios';
import TableResult from "./component/TableResult";
import {PagePagination} from "./component/PagePagination";

export default function UsersData() {
    const [result, setResult] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [usersPerPage] = useState(12);
    const [loading,setLoading] = useState(false);
    const [pageNumber,setPageNumber] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios.get('https://karaz6.herokuapp.com/api/dashboard/users')
            .then(response => {
                setResult(response.data);
                setLoading(false);
                const totalPages = Math.ceil(response.data.length / usersPerPage);
                setPageNumber(Array.from({length:totalPages},(v,i)=> i+1));

            })
            .catch(error => console.log(error));
    }, []);

    const handleClick = (num) => {
        if (typeof num === "number"){
            setCurrentPage(num)
        }else if (num === 'prev'){
            if (currentPage !== 1) {
                setCurrentPage(currentPage-1)
            }
        }else{
            if (currentPage !== pageNumber.length) {
                setCurrentPage(currentPage+1)
            }
        }
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const sliceUsersArray = result.slice(indexOfFirstUser,indexOfLastUser);

    return (
        <>

            <>
                <h3 className="mainHeading mb-4 ">Users Data</h3>
                <Table className="border mb-0 bg-white" light="true">
                    <thead>
                    <tr className="text-center">
                        <th className="border">#</th>
                        <th>User Name</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Sign Up Type</th>
                        <th>Device</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        <TableResult users={sliceUsersArray} loading={loading} />
                    </tbody>
                </Table>

               <PagePagination handleClick={handleClick} currentPage={currentPage} pageNumber={pageNumber}/>
            </>

        </>
    );
};