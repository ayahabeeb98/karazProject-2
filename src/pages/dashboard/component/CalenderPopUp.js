import React from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

const CalenderPopUp = ({modal,toggle,handleChange,children}) => {
    return (

        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} className="text-center">
                Select a range of date
            </ModalHeader>
            <ModalBody className="mx-auto calenderModal">
                {children}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle} outline>Cancel</Button>{' '}
                <Button color="primary" onClick={handleChange}>Apply</Button>
            </ModalFooter>
        </Modal>
    )
};


export default CalenderPopUp;
