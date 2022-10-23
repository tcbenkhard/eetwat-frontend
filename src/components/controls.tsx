import React from "react";
import './controls.scss';

interface ControlsProps extends React.PropsWithChildren {

}

const Controls = (props: ControlsProps) => {
    return (
        <div className={'controls'}>
            {props.children}
        </div>
    )
}

export default Controls;