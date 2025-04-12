import MainLogoComprasApp from "../assets/main-logo.svg";
import { useState } from "react";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import { useCreateUser } from "../hooks/useCreateUser";

export function Account() {
  const handleCreateUser = useCreateUser();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="h-screen w-full m-auto flex items-center justify-center">
      <div className="flex flex-col w-96 p-8 mb-40">
        <div className="flex items-center justify-center">
          <img
            src={MainLogoComprasApp}
            alt="Logo Compras App"
            className={`w-[250px] ${isLogin ? 'mb-8' : ''}`}
          />
        </div>
        {isLogin
          ? <Login />
          : <Register
              createUser={() => handleCreateUser}
            />
        }
        <div className="mt-8 flex flex-col gap-4 justify-center items-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-red-500 underline"
          >
            {isLogin ? "Não tem uma conta? Cadastre-se" : "Já tem uma conta? Faça login"}
          </button>
        </div>
      </div>
    </div>
  );
}
