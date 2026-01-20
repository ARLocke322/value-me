import "./index.css";
import { Route, Switch } from "wouter";

import CompanySearch from "./components/CompanySearch"
import Company from "./components/Company"
import Layout from "./layout";

export function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/:ticker" component={Company} />
        <Route component={CompanySearch} />
      </Switch>
    </Layout>
  );
}

export default App;
