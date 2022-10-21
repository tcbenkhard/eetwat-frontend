import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import './action-button.scss';

interface ActionButtonProps {
    icon: IconProp
    onClickHandler: () => void
}

const ActionButton = ({icon, onClickHandler}: ActionButtonProps) => {
    return (
        <button><FontAwesomeIcon icon={icon} onClick={onClickHandler}/></button>
    );
}

export default ActionButton;