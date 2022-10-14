import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/shared/Layout";
import AddCake from "./pages/AddCake";
import AllCakes from "./pages/AllCakes";
import EditCake from "./pages/EditCake";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllCakes />}></Route>
        <Route path="/add-cake" element={<AddCake />}></Route>
        <Route path="/edit-cake/:id" element={<EditCake />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
