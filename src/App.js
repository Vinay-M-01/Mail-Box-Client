
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
    </div>
  );
}

export default App;
