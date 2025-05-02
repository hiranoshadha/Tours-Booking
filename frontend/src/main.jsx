import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Import Router, Routes, Route
import './App.css';
import App from './App.jsx';
import HotelManagement from './pages/Admin/AdminDashboard/AdminHotelManagement/AdminHotelDashboard.jsx';
import AdminAddHotel from './pages/Admin/AdminDashboard/AdminHotelManagement/AdminHotelAddHotel.jsx';
import AdminUpdateHotel from './pages/Admin/AdminDashboard/AdminHotelManagement/AdminHotelUpdateHotel.jsx';
import AdminTourPackage from './pages/Admin/AdminDashboard/AdminTourPackageManagement/AdminTourPackage.jsx';
import AddTourForm from './pages/Admin/AdminDashboard/AdminTourPackageManagement/AddTourForm.jsx';
import UpdateTour from './pages/Admin/AdminDashboard/AdminTourPackageManagement/UpdateTour.jsx';
import DeleteTour from './pages/Admin/AdminDashboard/AdminTourPackageManagement/DeleteTour.jsx';
import AdminTransport from './pages/Admin/AdminDashboard/AdminTransportManagement/AdminTransport.jsx';
import AdminAddvehicle from './pages/Admin/AdminDashboard/AdminTransportManagement/AdminvehicleAdd.jsx';
import AdminUpdatevehicle from './pages/Admin/AdminDashboard/AdminTransportManagement/AdminvehicleUpdate.jsx';
import AdminTourGuide from './pages/Admin/AdminDashboard/AdminTourGideManagement/AdminTour.jsx';
import GuideTable from './pages/Admin/AdminDashboard/AdminTourGideManagement/Tguid.jsx';
import UserHotel from './pages/User/Hotel/Hotel.jsx';
import TourCotationCaculation from './pages/User/TourCotationCalculation/TourCotationCaculation.jsx';
import TourPackage from './pages/User/TourPackage/TourPackage.jsx';
import TourGide from './pages/User/TourGide/TourGide.jsx';
import UserTransport from './pages/User/Transport/Transport.jsx';
import UserManagement from './pages/Admin/AdminDashboard/AdminUserManagement/UserManagement.jsx';

const AppRoutes = () => (
  <Router>
    <Routes>
      {/* Main App Route */}
      <Route path="/*" element={<App />} />

      {/*User Management Routes */}
      <Route path="/adminUserManagement" element={<UserManagement />} />


      {/* Hotel Management Routes */}
      <Route path="/adminHotelManagement" element={<HotelManagement />} />
      <Route path="/adminHotelManagement/addHotel" element={<AdminAddHotel />} />
      <Route path="/hotel-details/:hotelId" element={<AdminUpdateHotel />} />

      {/* Tour Package Management Routes */}
      <Route path="/adminTourPackageManagement" element={<AdminTourPackage />} />
      <Route path="/adminTourPackageManagement/addTour" element={<AddTourForm />} />
      <Route path="/adminTourPackageManagement/updateTour/:id" element={<UpdateTour />} />
      <Route path="/adminTourPackageManagement/deleteTour/:id" element={<DeleteTour />} />

      {/* Transport Management Routes */}
      <Route path="/adminTransportManagement" element={<AdminTransport />} />
      <Route path="/adminTransportManagement/addvehicle" element={<AdminAddvehicle />} />
      <Route path="/adminTransportManagement/updatevehicle" element={<AdminUpdatevehicle />} />

      {/* Tour Guide Management Routes */}
      <Route path="/adminTourGuideManagement" element={<AdminTourGuide />} />
      <Route path="/GuideT" element={<GuideTable />} />

      {/* User Side Routes */}
      <Route path="/userHotel" element={<UserHotel />} />
      <Route path="/TourCotationCaculation" element={<TourCotationCaculation />} />
      <Route path="/TourGide" element={<TourGide />} />
      <Route path="/TourPackage" element={<TourPackage />} />
      <Route path="/Transport" element={<UserTransport />} />

    </Routes>
  </Router>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>
);
