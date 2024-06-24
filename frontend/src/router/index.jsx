import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../pages/Main';
import Auth from '../pages/Auth';
import Profile from '../pages/Profile';
import CreatePrompt from '../pages/CreatePrompt';
import UpdatePrompt from '../pages/UpdatePrompt';
import Admin from '../pages/Admin';
import UpdateProfile from '../pages/UpdateProfile';

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/create-prompt" element={<CreatePrompt />} />
                <Route path="/update-prompt/:id" element={<UpdatePrompt />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/update-profile" element={<UpdateProfile />} />
            </Routes>
        </>
    );
};

export default Router;
