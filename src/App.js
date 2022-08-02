
import { Redirect, Route} from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm";
import Welcome from "./components/Pages/Welcome";
import TextEditor from './components/Layout/TextEditor'

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

      <TextEditor/>

    </div>
  );
}

export default App;
