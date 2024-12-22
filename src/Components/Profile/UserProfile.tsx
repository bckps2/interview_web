import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Core/Auth/AuthContext';
import { UserProfileModel } from '../../Models/UserProfileModel';
import { GetAccount } from '../../Services/AccountManagerService';

export const UserProfile: React.FC = () => {

    const { setAuthenticated } = useContext(AuthContext);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [userProfileModel, setUserProfileModel] = useState<UserProfileModel | null>(null);
    
    useEffect(() => {
        GetAccount()
            .then(response => {
                setUserProfileModel(response);
                setLoading(false);
            }).catch((error) => {
                if (error.message === '401') {
                    localStorage.removeItem('isAuthenticated');
                    setAuthenticated(false);
                }
            });
    }, [setUserProfileModel, setLoading]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div id="home" className="subBody">
            {userProfileModel!.email}
            <h1>Herramienta Diseñada para hacer un seguimiento de las entrevistas</h1>
            <h3>Utilizala sabiamente</h3>
            <p>Good Luck</p>
        </div>
    );
}

export default UserProfile;