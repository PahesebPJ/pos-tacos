import { LoginForm } from "../components/LoginForm";
import '../styles/loginPage.css'

export default function Login() {
    return (
        <main 
            className="login__page__container"
        >
            <LoginForm />
        </main>
    );
}