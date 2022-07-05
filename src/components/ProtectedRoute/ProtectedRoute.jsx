import React from 'react';
import { Redirect, Route, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ anonymous = false, ...rest }) {

    const {isAuth} = useSelector(store => store.user);
    const location = useLocation();
    
    if (anonymous && isAuth) {
        return <Redirect to={ location.state?.from || '/' } />;
    }

    if (!anonymous && !isAuth) {
        return <Redirect to={{
            pathname: '/login',
            state: {from: location}
        }} />;
    }


    return <Route {...rest} />;
}