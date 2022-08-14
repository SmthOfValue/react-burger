import React, {FC} from 'react';
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";
import { useSelector } from '../../services/store';

interface IProtectedRouteProps extends RouteProps {
    anonymous?: boolean;
    path: string;
}

interface ILocationState {
    from?: Location;
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({ anonymous = false, ...rest }) => {
    
    const {isAuth} = useSelector(store => store.user);
    const location = useLocation<ILocationState>();
    
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