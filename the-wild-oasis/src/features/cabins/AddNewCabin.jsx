import React from 'react';

import Button from "../../ui/Button.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";
import Modal from "../../ui/Modal.jsx";
import CabinTable from "./CabinTable.jsx";


function AddNewCabin() {
    return (<div>
            <Modal>
                <Modal.Open opens="cabin-form">
                    <Button>Add new cabin</Button>
                </Modal.Open>
                <Modal.Window name="cabin-form">
                    <CreateCabinForm />
                </Modal.Window>
            </Modal>
    </div>)
}

// function AddNewCabin() {
//     const [isOpenModal, setIsOpenModal] = useState(false);
//    
//     return (
//         <div>
//             <Button onClick={() => setIsOpenModal(show => !show)}>Add New Cabin</Button>
//             {isOpenModal && <Modal onClose={() => setIsOpenModal(false)}>
//                 <CreateCabinForm onCloseModal={() => setIsOpenModal(false)}/>
//             </Modal>}
//         </div>
//     );
// }

export default AddNewCabin;