import { useState } from 'react';
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import Add from "./Add.jsx"


const App = () => {
    const [apitrue, setApiTrue] = useState(false);

    const handleSuccess = (credentialResponse) => {
        console.log(credentialResponse);
        setApiTrue(true);
    };

    const handleError = () => {
        console.log('Login Failed');
    };

    return (
        <>
            {!apitrue && (
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleError}
                />
            )}
            {apitrue && (
                <>
                    {/* Components to render when API is true */}
                    <Add/>
                    {/* Add more components here */}
                </>
            )}
        </>
    );
};

export default App;
