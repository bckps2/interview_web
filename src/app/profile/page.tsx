"use client"

import ProtectedRoute from '@/context/ProtectedRoute';
import { UserProfileModel } from '@/models/UserProfileModel';
import { GetAccount } from '@/services/AccountManagerService';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

export default function UserProfilePage() {

    const [loading, setLoading] = useState<boolean>(true);
    const [userProfile, setUserProfile] = useState<UserProfileModel | null>(null);

    useEffect(() => {
        GetAccount()
            .then((result: UserProfileModel) => {
                setUserProfile(result);
            })
            .catch((error: any) => {
                if (error.message === '401') {
                    redirect('/login');
                }
            }).finally(() => {
                setLoading(false);
            });
    }, [redirect, setUserProfile, setLoading]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userProfile) {
        return null; // No mostramos nada si no hay perfil
    }

    return (
        <ProtectedRoute>
            <div id="home" className="subBody">
                <h1>Bienvenido, {userProfile.email}</h1>
                <h2>Herramienta diseñada para hacer un seguimiento de las entrevistas</h2>
                <p>Utilízala sabiamente. ¡Buena suerte!</p>
            </div>
        </ProtectedRoute>
    );
}
