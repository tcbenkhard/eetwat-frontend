import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import './action-button.scss';

interface ActionButtonProps {
    icon: IconProp
    onClickHandler: () => void
    active?: boolean
}

const ActionButton = ({icon, onClickHandler, active}: ActionButtonProps) => {
    return (
        <button className={'action-button'}><FontAwesomeIcon icon={icon} onClick={onClickHandler} size={'2x'} spin={active}/></button>
    );
}

export default ActionButton;