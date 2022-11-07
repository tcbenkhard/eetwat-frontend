import './input.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    postfix?: string
}

const Input = (props: InputProps) => {
    return (
        <div className = 'input-group'>
            <input {...props} className={'input'}/>
            {props.postfix ? props.postfix : ''}
        </div>
    )
}

export default Input;