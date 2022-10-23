import './login-modal.scss';

interface LoginModalProps {
    onLoginClicked: (username: string, password: string) => void,
    onCancelClicked: () => void,
    visible: boolean
}

const LoginModal = (props: LoginModalProps) => {
    return (
        <div className="modal" style={{visibility: props.visible ? "visible" : "hidden"}}>
            <div className="modal-container">
                <h1>Inloggen</h1>
                <form onSubmit={(e) => e.preventDefault()} className={'login-form'}>
                    <input type={"text"} placeholder={'Gebruikersnaam'}/>
                    <input type={"password"} placeholder={'Password'}/>
                    <div className="modal-container-buttons">
                        <button onClick={() => props.onLoginClicked('username', 'password')}>Inloggen</button>
                        <button onClick={props.onCancelClicked}>Annuleren</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginModal;