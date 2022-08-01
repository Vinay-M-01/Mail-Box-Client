
import { Redirect, Route} from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm";
import Welcome from "./components/Pages/Welcome";

function App() {
  return (
    <div>
      <Route path="/Login">
        <AuthForm/>
      </Route>

      <Route path="/" exact>
        <Redirect to="/Login"/>
      </Route>

      <Route path="/Welcome">
        <Welcome/>
      </Route>
    </div>
  );
}

export default App;
