import React from 'react';
import {Modal,HiOutlineExclamationCircle} from 'flowbite-react'
function CustomModal(props)
{
    const onClose  = props.onClose;
    const show = props.show;
    const header = props.header;
    const body = props.body;
    return(
        <Modal show={show} size="md" popup={true} onClose={onClose}>
            <Modal.Header>
                {header}
            </Modal.Header>
            <Modal.Body>
                {body}
            </Modal.Body>
        </Modal>
    )
}
export default CustomModal;