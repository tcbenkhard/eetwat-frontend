import './login-modal.scss';
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faWarning} from '@fortawesome/free-solid-svg-icons';
import Input from "./input";

interface LoginModalProps {
    onLoginClicked: (username: string, password: string) => void,
    onCancelClicked: () => void,
    visible: boolean
    error?: string
}

const LoginModal = (props: LoginModalProps) => {
    const [formdata, setFormdata] = useState<Partial<{username: string, password: string}>>({});

    const cancelClicked = () => {
        setFormdata({});
        props.onCancelClicked();
    }

    return (
        <div className={`modal`} style={{visibility: props.visible ? "visible" : "hidden"}}>
            <div className={`modal-container ${props.visible ? 'modal-open' : ''}`}>
                <div className={'modal-container-exit'}><FontAwesomeIcon icon={faTimes} onClick={cancelClicked}/></div>
                <h1>Inloggen</h1>
                <div style={{display: props.error ? "block" : "none"}} className="error"><FontAwesomeIcon icon={faWarning} /> {props.error}</div>
                <form onSubmit={(e) => e.preventDefault()} className={'login-form'}>
                    <Input required={true} type={"text"} placeholder={'Gebruikersnaam'} onChange={(e) => setFormdata({...formdata, username: e.target.value})} value={formdata.username ?? ''}/>
                    <Input required={true} type={"password"} placeholder={'Password'} onChange={(e) => setFormdata({...formdata, password: e.target.value})} value={formdata.password ?? ''}/>
                    <div className="modal-container-buttons">
                        <button onClick={() => props.onLoginClicked(formdata.username!, formdata.password!)}>Inloggen</button>
                        <button onClick={cancelClicked}>Annuleren</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginModal;