import './form.scss'

interface FormProps extends React.PropsWithChildren, React.FormHTMLAttributes<any> {

}

const Form = (props: FormProps) => {
    return (
        <form {...props} className={'form'} onSubmit={(e) => e.preventDefault()}>

        </form>
    )
}

export default Form;