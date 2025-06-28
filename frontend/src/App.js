// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import Book from './pages/book';
import MyBookings from './components/myBookings';
import Navbar from './components/navbar';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/notFound';
import AdminDashboard from './components/adminDashboard';

// inside <Routes>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route
    path="/book"
    element={
      <PrivateRoute>
        <Book />
      </PrivateRoute>
    }
  />
  <Route
    path="/admin"
    element={
      <PrivateRoute>
        <AdminDashboard />
      </PrivateRoute>
    }
  />
  <Route
    path="/myBookings"
    element={
      <PrivateRoute>
        <MyBookings />
      </PrivateRoute>
    }
  />
  <Route path="*" element={<h2>404 Not Found</h2>} />
</Routes>

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book" element={<Book />} />
        <Route path="/myBookings" element={<MyBookings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
