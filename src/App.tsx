import { Navigate, Route, Routes } from "react-router-dom";

import GloblaLayout from "./components/layouts/GlobalLayout";
import Reservations from "./features/reservations/Reservations";

function App() {
  return (
    <Routes>
      <Route path="/" element={<GloblaLayout />}>
        <Route index element={<Reservations />} />
      </Route>
    </Routes>
  );
}

export default App;
