import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import './action-button.scss';

interface ActionButtonProps {
    icon: IconProp
    onClickHandler: () => void
}

const ActionButton = ({icon, onClickHandler}: ActionButtonProps) => {
    return (
        <button className={'action-button'}><FontAwesomeIcon icon={icon} onClick={onClickHandler} size={'2x'}/></button>
    );
}

export default ActionButton;