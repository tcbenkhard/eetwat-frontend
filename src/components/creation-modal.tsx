import Modal from "./modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWarning} from "@fortawesome/free-solid-svg-icons";

interface CreationModalProps {
    visible: boolean
    close: () => void
    error?: string
}

const CreationModal = (props: CreationModalProps) => {
    // const [formdata, setFormdata] = useState<Partial<{username: string, password: string}>>({});

    return (
        <Modal visible={props.visible} close={props.close}>
            <h1>New meal</h1>
            <div style={{display: props.error ? "block" : "none"}} className="error"><FontAwesomeIcon icon={faWarning} /> {props.error}</div>
            ... To be created
        </Modal>
    )
}

export default CreationModal;