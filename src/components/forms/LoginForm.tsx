"use client";

import { AuthContext } from '@/context/AuthContext';
import { LoginModel } from '@/models/LoginModel';
import { Login } from '@/services/SessionManagerService';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';

export const LoginForm: React.FC = () => {

    const { isAuthenticated, setAuthenticated } = useContext(AuthContext);
  const router = useRouter();

    const [formState, setFormState] = useState<LoginModel>({
        email: '',
        password: ''
    });

    const [error, setError] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const { email, password } = formState;

        // Lógica simple de validación
        if (email === '' || password === '') {
            setFormState(prevState => ({
                ...prevState
            }));

            setError("Ambos campos son obligatorios");

        } else {
            setFormState(prevState => ({
                ...prevState
            }));

            setError("");

            Login(formState)
                .then(response => {
                    setAuthenticated(response);
                    localStorage.setItem('isAuthenticated', `${response}`);
                    if (!response) {
                        localStorage.removeItem('isAuthenticated');
                        setAuthenticated(false);
                    }else{
                        router.push('/profile')
                    }
                });
        }
    };

    if (isAuthenticated) {
        return null; // O un spinner/cargando si esperas datos de autenticación
    }

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2>Iniciar sesión</h2>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email" style={{ display: 'block' }}>Nombre de usuario</label>
                    <input
                        type="text"
                        id="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password" style={{ display: 'block' }}>Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={formState.password}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '4px', backgroundColor: '#4CAF50', color: '#fff', border: 'none' }}>
                    Iniciar sesión
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
