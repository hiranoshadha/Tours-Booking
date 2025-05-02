import { useState } from "react"; // Importing icons
import SideNavbar from "./../../../../components/AdminDashboard/Navbar";
import Header from "./../../../../components/AdminDashboard/Header";
import TGtable from "./Tguid";


export default function TourGuideManagement() {

  return (
    <div className="flex h-screen bg-gray-100">
              <SideNavbar />
              <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-6 overflow-auto">
    

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 rounded-lg">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-6">
            <input
              type="search"
              placeholder="Search"
              className="p-3 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Select Month</option>
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>August</option>
              <option>September</option>
              <option>Octomber</option>
              <option>November</option>
              <option>December</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold">John Doe</span>
            <button className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">Generate Report</button>
          </div>
        </div>

        {/* Stats and Charts */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200">
            <p className="text-gray-500">Monthly Revenue</p>
            <h2 className="text-2xl font-semibold">$124,563 <span className="text-green-500">+12.5%</span></h2>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200">
            <p className="text-gray-500">Total Bookings</p>
            <h2 className="text-2xl font-semibold">1,248 <span className="text-green-500">+8.2%</span></h2>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200">
            <p className="text-gray-500">Occupancy Rate</p>
            <h2 className="text-2xl font-semibold">84% <span className="text-red-500">-2.1%</span></h2>
          </div>
        </div>

        {/* Top Performing Hotels */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold">Top Performing Guides</h2>
          <table className="min-w-full table-auto mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4 text-left">Hotel Name</th>
                <th className="p-4 text-left">Revenue</th>
                <th className="p-4 text-left">Bookings</th>
                <th className="p-4 text-left">Occupancy</th>
                <th className="p-4 text-left">Rating</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100">
                <td className="p-4">Colombo Hotel</td>
                <td className="p-4">$45,230</td>
                <td className="p-4">324</td>
                <td className="p-4">92%</td>
                <td className="p-4">4.8</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="p-4">Mirissa Hotel</td>
                <td className="p-4">$38,460</td>
                <td className="p-4">286</td>
                <td className="p-4">88%</td>
                <td className="p-4">4.7</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="p-4">Matara Hotel</td>
                <td className="p-4">$32,780</td>
                <td className="p-4">245</td>
                <td className="p-4">85%</td>
                <td className="p-4">4.6</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Tour Guides Table */}
          <div className="flex justify-between mb-4">
            
        
            <TGtable/>
            
          </div>

        
      </div>
      </main>
    </div>
    </div>
  );
}