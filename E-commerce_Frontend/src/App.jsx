import { Routes , Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import CustomerRouters from "./Routers/CustomerRouters.jsx";
import  "./App.css";

function App() {
  return (
    <AuthProvider>
      <div>
        <Routes>
          <Route path="/*" element={<CustomerRouters />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
