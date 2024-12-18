import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import Layout from "./layouts/clientLayout";
import routes from "./routes/routes";
import { Toaster } from "react-hot-toast";

function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}

function App() {
  return (
    <Router>
      <Layout>
        <Toaster position="bottom-right" />
        <AppRoutes />
      </Layout>
    </Router>
  );
}

export default App;
