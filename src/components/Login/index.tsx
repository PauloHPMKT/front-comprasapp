import { BaseInput } from "../BaseInput";

export function Login() {
  return (
    <form className="mb-30">
      <BaseInput
        placeholder="Insira seu e-mail"
      />
      <BaseInput
        placeholder="Senha"
        type="password"
      />
      <div className="flex mb-11 items-start justify-between">
        <label htmlFor="remember" className="flex items-center gap-2">
          <input type="checkbox" id="remember" />
          Lembrar-me
        </label>
        <p>Esqueci minha senha</p>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center">
        <button
          className="bg-red-600 text-white w-full h-11 p-2 rounded-3xl"
          type="submit"
        >
          Entrar
        </button>
        <small>Ou</small>
        <p className="text-red-400 underline">Crie sua conta com a gente!</p>
      </div>
    </form>
  )
}