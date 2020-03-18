import React from 'react';
import {Pagination, PaginationItem, PaginationLink} from "reactstrap";

export const PagePagination = ({pageNumber,currentPage,handleClick}) => {
    return (
        <Pagination aria-label="Page navigation" className="user-pagination">
            <PaginationItem>
                <PaginationLink previous onClick={()=>handleClick("prev")} className="pagination-control"/>
            </PaginationItem>
            {pageNumber.map(item => {
                return (
                    <PaginationItem key={"page " + item} className={currentPage===item ? "active" : null}>
                        <PaginationLink onClick={() => handleClick(item)}>
                            {item}
                        </PaginationLink>
                    </PaginationItem>)
            })}
            <PaginationItem>
                <PaginationLink next onClick={()=>handleClick("next")} className="pagination-control"/>
            </PaginationItem>
        </Pagination>
    )
};