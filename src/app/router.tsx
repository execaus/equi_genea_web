import {Route, Routes } from "react-router-dom";
import AuthPage from "../pages/auth-page/ui/AuthPage.tsx";
import WorkspacePage from "../pages/workspace/ui/WorkspacePage.tsx";
import HerdInfo from "../widgets/HerdPage/ui/HerdInfo.tsx";
import HerdList from "../widgets/HerdList/ui/HerdList.tsx";
import HorseInfo from "../widgets/HorsePage/ui/HorseInfo.tsx";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<WorkspacePage />}>
                <Route path="herd" element={<HerdList />} />
                <Route path="herd/:id" element={<HerdInfo />} />
                <Route path="horse/:id" element={<HorseInfo />} />
            </Route>
            <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
    );
};

export default AppRouter;