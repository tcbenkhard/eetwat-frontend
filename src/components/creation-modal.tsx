import Modal from "./modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWarning} from "@fortawesome/free-solid-svg-icons";
import Input from "./input";
import {useState} from "react";
import Form from "./form";
import TagInput from "./tag-input";

interface CreationModalProps {
    visible: boolean
    close: () => void
    error?: string
    createClicked: (request: CreateMealRequest) => void
}

export interface CreateMealRequest {
    name: string,
    durationInMinutes: number,
    tags: string[]
}

const CreationModal = (props: CreationModalProps) => {
    const [formdata, setFormdata] = useState<Partial<CreateMealRequest>>({});

    const cancelClicked = () => {
        setFormdata({})
        props.close();
    }

    return (
        <Modal visible={props.visible} close={props.close}>
            <h1>New meal</h1>
            <div style={{display: props.error ? "block" : "none"}} className="error"><FontAwesomeIcon icon={faWarning} /> {props.error}</div>
            <Form>
                <Input type={"text"} placeholder={'Meal name'} onChange={(e) => setFormdata({...formdata, name: e.target.value})} />
                <Input type={"number"} placeholder={'Duration'} postfix={'minutes'} onChange={(e) => setFormdata({...formdata, durationInMinutes: parseInt(e.target.value)})} />
                <TagInput tags={formdata.tags ?? []} setTags={(tags) => setFormdata({...formdata, tags})}/>

                <div className="modal-buttons">
                    <button type={"button"} onClick={cancelClicked}>Annuleren</button>
                    <button onClick={() => props.createClicked({...formdata as CreateMealRequest})}>Aanmaken</button>
                </div>
            </Form>
        </Modal>
    )
}

export default CreationModal;