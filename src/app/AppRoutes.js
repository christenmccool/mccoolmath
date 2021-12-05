import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Menu from './Menu';
import Skill from '../skill/Skill';
import NotFound from './NotFound';


/** Routes component for McCool Math app
 * Provides a link to each skill
 * Redirects to NotFound component if path not found
 */
const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Menu />}/>
            <Route path="/skills/:skill" element={<Skill />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
    )
}

export default AppRoutes;