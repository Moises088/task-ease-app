import React from "react";
import { AuthContext } from "../contexts/auth.context";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { ApiContext } from "../contexts/api.context";
import Splash from "../components/global/splash";

const Routes = async () => {
    const { load } = React.useContext(ApiContext)

    if (load) return <Splash />

    const { isLogged } = React.useContext(AuthContext);

    return isLogged ? <AppRoutes /> : <AuthRoutes />
}

export default Routes;