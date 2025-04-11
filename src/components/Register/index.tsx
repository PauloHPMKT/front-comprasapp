import { BaseInput } from "../BaseInput";

export function Register() {
  return (
    <form>
      <p className="text-[14px] mb-6 font-semibold text-center px-8">Insira aqui alguns dados para criar sua lista de compras</p>
      <BaseInput
        placeholder="Como você quer ser chamado?"
      />
      <BaseInput
        placeholder="Insira seu e-mail"
      />
      <BaseInput
        placeholder="Senha"
        type="password"
      />
      <BaseInput
        placeholder="Confirme sua senha"
        type="password"
      />
      <div className="flex flex-col gap-4 justify-center items-center">
        <button
          className="bg-red-600 text-white w-full h-11 p-2 rounded-3xl"
          type="submit"
        >
          Entrar
        </button>
      </div>
    </form>
  )
}