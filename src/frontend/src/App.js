import { BrowserRouter as Router, Routes, Route ,Navigate } from "react-router-dom";
import Signup from "./components/Auth/Signup.jsx";
import Login from "./components/Auth/UserLogin.jsx";
import Profile from "./components/Profile/Profile.jsx"
import { Provider } from "react-redux";
import store from './Redux/store.js'
import CreateProfile from "./components/Profile/CreateProfile.jsx";
import EditProfile from "./components/Profile/EditProfile.jsx"
import DeleteProfile from "./components/Profile/DeleteProfile.jsx";
import AdminLogin from "./components/Admin/AdminLogin.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import { useSelector } from "react-redux";
import AddUser from "./components/Admin/AddUser.jsx";
import EditUser from "./components/Admin/EditUser.jsx";
import DeleteUser from "./components/Admin/DeleteUser.jsx";
//import Counter from "./components/counter.jsx";

function App() {
  const isAdminAuthenticated = useSelector(state => state.admin.isAuthenticated);

  return (
      <Provider store={store}>
     
        <Router>
        <div className="App">
          <Routes>
            {/* <Route path="/" element={<Counter/>} /> */}
            <Route path='/' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/create-profile' element={<CreateProfile/>} />
            <Route path="/edit-profile" element={<EditProfile/>}/>
            <Route path="/delete-profile" element={<DeleteProfile/ >} />
            {/* AdminRoute */}
            <Route path="/admin/login" element={<AdminLogin />} />
                <Route 
                    path="/admin/dashboard" 
                    element={isAdminAuthenticated ? <AdminDashboard /> : <Navigate to="/admin/login" />} 
                />
                 <Route 
                path="/admin/add-user" 
                element={isAdminAuthenticated ? <AddUser /> : <Navigate to="/admin/login" />} 
            />
            <Route 
                path="/admin/edit-user/:userId" 
                element={isAdminAuthenticated ? <EditUser /> : <Navigate to="/admin/login" />} 
            />
            <Route 
                path="/admin/delete-user/:userId" 
                element={isAdminAuthenticated ? <DeleteUser /> : <Navigate to="/admin/login" />} 
            />
          </Routes>
          </div>
        
        </Router>
      </Provider>
  );
   
}

export default App;
