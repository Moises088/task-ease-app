import React from "react";
import { AuthContext } from "../contexts/auth.context";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { RepositoryContext } from "../contexts/repository.context";
import Splash from "../components/global/splash";

const Routes = async () => {
    const { load } = React.useContext(RepositoryContext)

    if (load) return <Splash />

    const { isLogged } = React.useContext(AuthContext);

    return isLogged ? <AppRoutes /> : <AuthRoutes />
}

export default Routes;