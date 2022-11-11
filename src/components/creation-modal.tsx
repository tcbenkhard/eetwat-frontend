import Modal from "./modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWarning} from "@fortawesome/free-solid-svg-icons";
import Input from "./input";
import {useContext, useState} from "react";
import Form from "./form";
import TagInput from "./tag-input";
import {MealClientContext} from "../client/meal-client";

interface CreationModalProps {
    visible: boolean
    close: () => void
    onSuccess: () => void
}

export interface CreateMealRequest {
    name: string,
    durationInMinutes: number,
    tags: string[]
}

const CreationModal = (props: CreationModalProps) => {
    const [formdata, setFormdata] = useState<Partial<CreateMealRequest>>({});
    const [error, setError] = useState<string>();
    const [processing, setProcessing] = useState<boolean>(false);

    const mealClient = useContext(MealClientContext);

    const cancelClicked = () => {
        setFormdata({})
        props.close();
    }

    const createClicked = (request: CreateMealRequest) => {
        setProcessing(true);
        mealClient.create(request)
            .then(() => setFormdata({name: undefined, tags: undefined, durationInMinutes: undefined}))
            .then(props.onSuccess)
            .catch(e => setError(e.message))
            .finally(() => setProcessing(false))
    }

    return (
        <Modal visible={props.visible} close={props.close}>
            <h1>New meal</h1>
            <div style={{display: error ? "block" : "none"}} className="error"><FontAwesomeIcon icon={faWarning} /> {error}</div>
            <Form>
                <Input type={"text"} placeholder={'Meal name'} value={formdata.name ?? ''} onChange={(e) => setFormdata({...formdata, name: e.target.value})} />
                <Input type={"number"} placeholder={'Duration'} postfix={'minutes'} value={formdata.durationInMinutes ?? ''} onChange={(e) => setFormdata({...formdata, durationInMinutes: parseInt(e.target.value)})} />
                <TagInput tags={formdata.tags ?? []} setTags={(tags) => setFormdata({...formdata, tags})}/>

                <div className="modal-buttons">
                    <button disabled={processing} type={"button"} onClick={cancelClicked}>Annuleren</button>
                    <button disabled={processing} onClick={() => createClicked({...formdata as CreateMealRequest})}>Aanmaken</button>
                </div>
            </Form>
        </Modal>
    )
}

export default CreationModal;