import { AuthContext } from '@/context/AuthContext';
import ProtectedRoute from '@/context/ProtectedRoute';
import { UserProfileModel } from '@/models/UserProfileModel';
import { GetAccount } from '@/services/AccountManagerService';
import React, { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

export const UserProfile: React.FC = () => {

    const { setAuthenticated } = useContext(AuthContext);
    const [userProfileModel, setUserProfileModel] = useState<UserProfileModel | null>(null);

    const { isLoading } = useSWR(GetAccount, {
        onError: (err) => {
          if (err.message === '401') {
            localStorage.removeItem('isAuthenticated');
            setAuthenticated(false);
          }
        },
        onSuccess: (data: UserProfileModel) => {
            setUserProfileModel(data);
        }
      });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <ProtectedRoute>
            <div id="home" className="subBody">
                {userProfileModel!.email}
                <h1>Herramienta Diseñada para hacer un seguimiento de las entrevistas</h1>
                <h3>Utilizala sabiamente</h3>
                <p>Good Luck</p>
            </div>
        </ProtectedRoute>
    );
}

export default UserProfile;