import React from "react";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import Splash from "../components/global/splash";
import { AuthContext } from "../contexts/auth.context";
import { ApiContext } from "../contexts/api.context";

const Routes = () => {
    const { load } = React.useContext(ApiContext)
    const { isLogged } = React.useContext(AuthContext);

    if (load) return <Splash />
    return isLogged ? <AppRoutes /> : <AuthRoutes />
}

export default Routes;