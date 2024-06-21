import React from 'react';

import Header from './components/Header';
import Main from './pages/Main';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import CreatePrompt from './pages/CreatePrompt';
import UpdatePrompt from './pages/UpdatePrompt';
import Admin from './pages/Admin';
import UpdateProfile from './pages/UpdateProfile';

function App() {
    return (
        <>
            <Header />

            <main className="w-full h-screen relative">
                {/* <Main /> */}
                {/* <Auth /> */}
                {/* <Profile /> */}
                {/* <CreatePrompt /> */}
                {/* <UpdatePrompt /> */}
                {/* <Admin /> */}
                {/* <UpdateProfile /> */}
            </main>
        </>
    );
}

export default App;
