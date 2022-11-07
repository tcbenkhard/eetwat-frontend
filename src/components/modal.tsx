import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import './modal.scss';

interface ModalProps extends React.PropsWithChildren {
    visible: boolean
    close: () => void
}

const Modal = (props: ModalProps) => {
    return (
        <div className={`modal-container ${props.visible ? 'modal-container-open' : ''}`}>
            <div className={`modal ${props.visible ? 'modal-open' : ''}`}>
                <div className={'modal-exit'}><FontAwesomeIcon icon={faTimes} onClick={props.close}/></div>
                {props.children}
            </div>
        </div>
    )
}

export default Modal;