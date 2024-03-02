import { Route } from "react-router-dom";
import { Index } from "../pages/index";
import { NotFound } from "../pages/not-found";
import { Layout } from "../components/index/Layout";

export const IndexRoute = (
  <Route
    path="/"
    element={<Layout />}
    errorElement={
      <Layout>
        <NotFound />
      </Layout>
    }
  >
    <Route path="/" element={<Index />} />
  </Route>
);
