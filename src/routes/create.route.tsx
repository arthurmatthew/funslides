import { Route } from "react-router-dom";
import { NotFound } from "../pages/not-found";
import { Layout } from "../components/index/Layout";
import { CreateIndex } from "../pages/create";
import { CreateLayout } from "../components/create/CreateLayout";

export const CreateRoute = (
    <Route
        path="/create"
        element={<CreateLayout />}
        errorElement={
            <Layout>
                <NotFound />
            </Layout>
        }
    >
        <Route path="/create" element={<CreateIndex />} />
    </Route>
);
