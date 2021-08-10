import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";

export default function AuthRoute({ component: Component, ...options }) {
  const auth = useSelector((state) => state.firebase.auth);

  return (
    <Route
      {...options}
      render={(props) =>
        isLoaded(auth) && isEmpty(auth) ? (
          <>
            <Component {...props} />
          </>
        ) : (
          <Redirect
            to={{
              pathname: "/dashboard",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
