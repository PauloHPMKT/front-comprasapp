import { Outlet } from "react-router-dom";
import inLineLogo from "./assets/inline-logo.svg";

export function App() {
  return (
    <div className="py-3 px-5">
      <header className="flex justify-between">
        <div className="w-[180px]">
          <img src={inLineLogo} alt="Logo compras app" className="w-full" />
        </div>
        <span className="text-2xl bg-gray-700 rounded-full w-[40px] h-[40px] flex items-center justify-center text-white">
          H
        </span>
      </header>
      <div className="shadow-[-2px_-2px_8px_rgba(0,0,0,0.1)] bg-white rounded-lg mt-5 p-5 h-[80vh]">
        <Outlet />
      </div>
    </div>
  )
}
