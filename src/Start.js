import Layout from "../src/pages/Layout"
import Login from "../src/pages/Login"
import { BrowserRouter, Routes, Route } from "react-router-dom"


//实战项目 
function Start () {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>

    </BrowserRouter>
  )
}
export default Start