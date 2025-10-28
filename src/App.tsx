import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import Layout from "./layouts/clientLayout";
import routes from "./routes/routes";
import { Toaster } from "react-hot-toast";
import DemoNotice from "./components/layouts/DemoNotice";

function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}

function App() {
  return (
    <Router>
      <Layout>
        <Toaster position="bottom-right" />
        {/* Popup on launch */}
        <DemoNotice />
        <AppRoutes />
      </Layout>
    </Router>
  );
}

export default App;
