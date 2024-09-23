'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation'; // Importa useRouter
import styles from './login.module.css';
import { login, register } from '@/api/auth';

const Login: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [role, setRole] = useState<string>('comprador');
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<'success' | 'error'>('success');
    const router = useRouter(); // Inicializa useRouter

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRole(event.target.value);
    };

    const handleRegisterClick = () => {
        if (containerRef.current) {
            containerRef.current.classList.add(styles.active);
        }
    };

    const handleLoginClick = () => {
        if (containerRef.current) {
            containerRef.current.classList.remove(styles.active);
        }
    };

    const handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const name = (form.elements.namedItem('name') as HTMLInputElement).value;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;

        try {
            console.log('Datos a registrar:', { name, email, password, role });
            const newUser = await register(name, email, password, role);
            setMessage("Registro exitoso");
            setMessageType('success');
            form.reset();
            
            // Realizar la animación de cambio a login después del registro
            handleLoginClick();
        } catch (error: unknown) {
            if (error instanceof Error) {
                setMessage(error.message || "Ocurrió un error inesperado");
            } else {
                setMessage("Ocurrió un error inesperado");
            }
            setMessageType('error');
        } finally {
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;

        try {
            console.log('Datos para iniciar sesión:', { email, password });
            const user = await login(email, password);
            setMessage("Login exitoso");
            setMessageType('success');
            form.reset();

            // Redireccionar a /home después del login exitoso
            router.push('/home');
        } catch (error: unknown) {
            if (error instanceof Error) {
                setMessage(error.message || "Ocurrió un error inesperado");
            } else {
                setMessage("Ocurrió un error inesperado");
            }
            setMessageType('error');
        } finally {
            setTimeout(() => setMessage(null), 3000);
        }
    };

    return (
        <div className={styles.background}>
            <div className={styles.container} ref={containerRef}>
                <div className={`${styles['form-container']} ${styles['sign-up']}`}>
                    <form onSubmit={handleRegisterSubmit}>
                        <h1>Create Account</h1>
                        <span>Use su correo para registrarse.</span>
                        <input type="text" name="name" placeholder="Nombre" required />
                        <input type="email" name="email" placeholder="Email" required />
                        <input type="password" name="password" placeholder="Contraseña" required />
                        <select value={role} onChange={handleRoleChange}>
                            <option value="comprador">Comprador</option>
                            <option value="vendedor">Vendedor</option>
                        </select>
                        <button type="submit">Sign Up</button>
                    </form>
                </div>

                <div className={`${styles['form-container']} ${styles['sign-in']}`}>
                    <form onSubmit={handleLoginSubmit}>
                        <h1>Sign In</h1>
                        <input type="email" name="email" placeholder="Email" required />
                        <input type="password" name="password" placeholder="Contraseña" required />
                        <button type="submit">Sign In</button>
                    </form>
                </div>

                <div className={styles['toggle-container']}>
                    <div className={styles.toggle}>
                        <div className={`${styles['toggle-panel']} ${styles['toggle-left']}`}>
                            <h2>Bienvenido de nuevo!</h2>
                            <p>Introduzca sus datos personales para utilizar todas las funciones del sitio</p>
                            <button className={styles.hidden} onClick={handleLoginClick}>Sign In</button>
                        </div>
                        <div className={`${styles['toggle-panel']} ${styles['toggle-right']}`}>
                            <h2>Sea Bienvenido</h2>
                            <p>Regístrese con sus datos personales para utilizar todas las funciones del sitio.</p>
                            <button className={styles.hidden} onClick={handleRegisterClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
            {message && (
                <div className={`${styles.alert} ${styles[messageType]}`}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default Login;