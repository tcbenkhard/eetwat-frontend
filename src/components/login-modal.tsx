import './login-modal.scss';
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWarning} from '@fortawesome/free-solid-svg-icons';
import Input from "./input";
import Modal from "./modal";

interface LoginModalProps {
    visible: boolean
    close: () => void
    error?: string
    loginClicked: (username: string, password: string) => void
}

const LoginModal = (props: LoginModalProps) => {
    const [formdata, setFormdata] = useState<Partial<{username: string, password: string}>>({});

    const cancelClicked = () => {
        setFormdata({});
        props.close();
    }

    return (
        <Modal visible={props.visible} close={props.close}>
            <h1>Inloggen</h1>
            <div style={{display: props.error ? "block" : "none"}} className="error"><FontAwesomeIcon icon={faWarning} /> {props.error}</div>
            <form onSubmit={(e) => e.preventDefault()} className={'login-form'}>
                <Input required={true} type={"text"} placeholder={'Gebruikersnaam'} onChange={(e) => setFormdata({...formdata, username: e.target.value})} value={formdata.username ?? ''}/>
                <Input required={true} type={"password"} placeholder={'Password'} onChange={(e) => setFormdata({...formdata, password: e.target.value})} value={formdata.password ?? ''}/>
                <div className="modal-buttons">
                    <button type={"button"} onClick={cancelClicked}>Annuleren</button>
                    <button onClick={() => props.loginClicked(formdata.username!, formdata.password!)}>Inloggen</button>
                </div>
            </form>
        </Modal>
    )
}

export default LoginModal;