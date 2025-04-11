import MainLogoComprasApp from "../assets/main-logo.svg"
import { Login } from "../components/Login";

export function Account() {
  return (
    <div className="h-screen w-full m-auto flex items-center justify-center">
      <div className="flex flex-col w-96 p-8 bg-white">
        <div className="flex items-center justify-center">
          <img
            src={MainLogoComprasApp}
            alt="Logo Compras App"
            className="w-[250px] mb-8"
          />
        </div>
        <Login />
      </div>
    </div>
  );
}
