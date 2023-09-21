import {useState} from 'react';
import Deck from "@/components/deck";
import Modal from "@/components/modal";

export default function Register() {
    const [modalVisible, setModalVisible] = useState(false);

    const openModalPopup = () => {
        setModalVisible(true);
    }

    return (<>
        <button onClick={() => {openModalPopup()}}>open</button>
        <Deck decks={[{}]} type="register"></Deck>
        <Modal visible={modalVisible} closeModalHandler={setModalVisible}></Modal>
    </>)
}
