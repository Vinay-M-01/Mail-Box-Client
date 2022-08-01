
import { Redirect, Route} from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm";

function App() {
  return (
    <div>
      <Route path="/Login">
        <AuthForm/>
      </Route>

      <Route path="*">
        <Redirect to="/Login"/>
      </Route>

      <Route path="/Welcome">
        <h1>You have Logged in </h1>
      </Route>
    </div>
  );
}

export default App;
