import React from "react";
// import logo from "../../assets/Logo.png";
import Logo from '../Logo/Logo';
import SideNavLinks from ".././SideNavLinks/SideNavLinks";

export default function RecoverySideNavBar() {
  return (
    <aside>
      <aside className="h-full w-64 bg-gray-900 text-white hidden md:block">
        <div className="p-8 flex items-center justify-center">
          {/* <img
            src={logo}
            alt="Logo"
            className="h-32 w-auto mt-5 mx-auto rounded-full"
          /> */}
          <Logo/>
        </div>
        <nav className="mt-8">
          <ul className="space-y-5 font-bold text-xl text-center">
            <li className="px-4 py-3 hover:bg-gray-700 hover:duration-300">
              <SideNavLinks
                linkName="DASHBOARD"
                url="/adminUserManagement"
                className=""
              />
            </li>
            <li className="px-4 py-3 hover:bg-gray-700 hover:duration-300">
              <SideNavLinks
            linkName="TOUR PACKAGE"
                url="/adminTourPackageManagement" 
              />
            </li>
            <li className="px-4 py-3 hover:bg-gray-700 hover:duration-300">
              <SideNavLinks linkName="HOTELS" url="/adminHotelManagement" />
            </li>
            <li className="px-4 py-3 hover:bg-gray-700 hover:duration-300">
              <SideNavLinks linkName="TOUR GIDE" url="/adminTourGuideManagement" />
            </li>
            <li className="px-4 py-3 hover:bg-gray-700 hover:duration-300">
              <SideNavLinks linkName="TRANSPORT" url="/adminTransportManagement" />
            </li>
          </ul>
        </nav>
      </aside>
    </aside>
  );
}
