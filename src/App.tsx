import { Outlet } from "react-router";
import CommonLayout from "./layout/CommonLayout";

function App() {
  return (
    <div className="font-mono">
      <CommonLayout>
        <Outlet />
      </CommonLayout>
    </div>
  );
}

export default App;
