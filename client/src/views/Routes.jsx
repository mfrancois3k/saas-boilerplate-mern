import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import AuthRoute from "../components/AuthRoute";

// components
import Header from "../components/header";
import Loading from "../components/Loading";

// views
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Feautures from "./Feautures";
import Settings from "./Settings";

// firebase
import { useSelector, useDispatch } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import { getUser } from "../feautures/user/userSlice";

function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) return <Loading />;
  return children;
}

const Routes = () => {
  const dispatch = useDispatch();
  const { isEmpty } = useSelector((state) => state.firebase.auth);

  useEffect(() => {
    if (!isEmpty) {
      dispatch(getUser());
    }
  }, [dispatch, isEmpty]);

  return (
    <AuthIsLoaded>
      <Header />
      <Route path="/" exact component={Home} />
      <AuthRoute path="/login" exact component={Login} />
      <AuthRoute path="/signup" component={Signup} />
      <PrivateRoute path="/dashboard" exact component={Dashboard} />
      <PrivateRoute path="/feautures" exact component={Feautures} />
      <PrivateRoute path="/settings" exact component={Settings} />
    </AuthIsLoaded>
  );
};

export default Routes;
