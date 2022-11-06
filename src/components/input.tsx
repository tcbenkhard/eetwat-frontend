import './input.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {

}

const Input = (props: InputProps) => {
    return (
        <input {...props} className={'input'}/>
    )
}

export default Input;