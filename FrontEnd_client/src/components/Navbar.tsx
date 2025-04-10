import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Ambulance, Info, Shield, Activity } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-full bg-white/90 backdrop-blur-sm shadow-sm fixed top-0 left-0 z-50 px-4 sm:px-6">
      <div className="h-16 max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <div className="flex items-center justify-center relative">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-md transition-all duration-300 group-hover:shadow-blue-200/50 group-hover:shadow-lg">
              <Shield
                className="w-6 h-6 absolute opacity-50"
                strokeWidth={1.5}
              />
              <Activity className="w-5 h-5 animate-pulse" strokeWidth={2} />
            </div>
            <div className="w-3 h-3 rounded-full bg-red-500 absolute -top-0.5 -right-0.5 border-2 border-white shadow-sm animate-pulse" />
          </div>
          <div className="ml-3 flex flex-col items-start">
            <span className="text-lg font-bold text-gray-800 tracking-tight group-hover:text-blue-600 transition-colors">
              ByteForce
            </span>
            <span className="text-xs text-gray-500 -mt-1">
              Emergency Response
            </span>
          </div>
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/about">
                <NavigationMenuLink
                  className={
                    navigationMenuTriggerStyle() +
                    (location.pathname === "/about"
                      ? " bg-accent text-accent-foreground"
                      : "")
                  }
                >
                  <Info className="w-4 h-4 mr-2" />
                  Giới Thiệu
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/report">
                <NavigationMenuLink
                  className={
                    navigationMenuTriggerStyle() +
                    (location.pathname === "/report"
                      ? " bg-accent text-accent-foreground"
                      : "")
                  }
                >
                  <Ambulance className="w-4 h-4 mr-2" />
                  Báo Cáo Khẩn Cấp
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/dashBoard">
                <NavigationMenuLink
                  className={
                    navigationMenuTriggerStyle() +
                    (location.pathname === "/report"
                      ? " bg-accent text-accent-foreground"
                      : "")
                  }
                >
                  <Ambulance className="w-4 h-4 mr-2" />
                  DashBoard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default Navbar;
