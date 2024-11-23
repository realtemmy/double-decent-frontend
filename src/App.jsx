
import { Routes, Route } from "react-router-dom"

import MainLayout from "./components/MainLayout/MainLayout"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
