"use client";

import { AuthContext } from '@/context/AuthContext';
import { LoginModel } from '@/models/LoginModel';
import { Login } from '@/services/SessionManagerService';
import { redirect, useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';

export const LoginForm: React.FC = () => {

    const { isAuthenticated, setAuthenticated } = useContext(AuthContext);

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
                .then((response: boolean) => {
                    setAuthenticated(response);
                    localStorage.setItem('isAuthenticated', response.toString());
                    if (response) {
                        redirect('/profile');
                    }
                });
        }
    };

    return (
        <Container style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <h2>Iniciar sesión</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email" style={{ marginBottom: '15px' }}>
                    <Form.Label>Nombre de usuario</Form.Label>
                    <Form.Control
                        type="text"
                        value={formState.email}
                        onChange={handleInputChange}
                        placeholder="Introduce tu nombre de usuario"
                    />
                </Form.Group>
                <Form.Group controlId="password" style={{ marginBottom: '15px' }}>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        value={formState.password}
                        onChange={handleInputChange}
                        placeholder="Introduce tu contraseña"
                    />
                </Form.Group>
                <Button type="submit" variant="success" style={{ width: '100%' }}>
                    Iniciar sesión
                </Button>
            </Form>
        </Container>
    );
};

export default LoginForm;
