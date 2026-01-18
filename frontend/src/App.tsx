import "./index.css";
import { Route, Switch } from "wouter";

import CompanySearch from "./components/CompanySearch"
import Layout from "./layout";

export function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route component={CompanySearch} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
