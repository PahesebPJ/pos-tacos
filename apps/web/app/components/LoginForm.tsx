'use client';
import { useActionState } from 'react';
import { login } from '@/app/(withOutNavbar)/login/actions';

import '../styles/loginForm.css';
import { useFormStatus } from 'react-dom';

export const LoginForm = () => {
    const [state, loginAction] = useActionState(login, undefined);

    return (
        <form action={loginAction} className="login__form__container">
            <div className="login__form__container__title">
                <h1>Login</h1>
                <h3 className="login__form__container__subtitle">
                    Gestiona tus deliciosos productos
                </h3>
            </div>

            <label htmlFor="email" className="custom-label">
                Email
            </label>
            <input
                id="email"
                name="email"
                placeholder="Ingresa tu email"
                className="custom-input"
            />

            <label htmlFor="password" className="custom-label">
                Password
            </label>
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                className="custom-input"
            />
            {state?.errors.email && (
                <p className="error_text">{state.errors.email}</p>
            )}
            <SubmitButton />
        </form>
    );
};

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            disabled={pending}
            type="submit"
            className="login__form__button"
        >
            Login
        </button>
    );
}
