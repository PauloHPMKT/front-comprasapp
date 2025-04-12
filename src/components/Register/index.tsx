
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { BaseInput } from "../BaseInput";
import { CreateUserModel } from "../../core/models/create-user";
import { ErrorComponent } from "../Error";

interface RegisterProps {
  createUser: () => {
    register: UseFormRegister<CreateUserModel.Params>;
    handleSubmit: UseFormHandleSubmit<CreateUserModel.Params>;
    isSubmitting: boolean;
    errors: FieldErrors<CreateUserModel.Params>;
    onSubmit: (data: CreateUserModel.Params) => Promise<void>;
  };
}

export function Register({ createUser }: RegisterProps) {
  const {
    register,
    handleSubmit,
    isSubmitting,
    onSubmit,
    errors
  } = createUser()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="text-[14px] mb-6 font-semibold text-center px-8">
        Insira aqui alguns dados para criar sua lista de compras
      </p>
      <BaseInput
        hasError={errors.name}
        placeholder="Nome completo"
        {...register('name', {
          required: 'Nome é obrigatório',
          minLength: {
            value: 3,
            message: 'Nome deve ter pelo menos 3 caracteres',
          },
        })}
      />
      {errors.name && <ErrorComponent message={errors.name.message} /> }

      <BaseInput
        hasError={errors.email}
        placeholder="Insira seu e-mail"
        type="email"
        {...register('email', {
          required: 'E-mail é obrigatório',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'E-mail inválido',
          },
        })}
      />
      {errors.email && <ErrorComponent message={errors.email.message} /> }

      <BaseInput
        hasError={errors.password}
        placeholder="Senha"
        type="password"
        {...register('password', {
          required: 'Senha é obrigatória',
          minLength: {
            value: 3,
            message: 'Senha deve ter pelo menos 3 caracteres',
          },
        })}
      />
      {errors.password && <ErrorComponent message={errors.password.message} /> }

      <BaseInput
        hasError={errors.passwordConfirmation}
        placeholder="Confirme sua senha"
        type="password"
        {...register('passwordConfirmation', {
          required: 'Confirmação de senha é obrigatória',
        })}
      />
      {errors.passwordConfirmation && <ErrorComponent message={errors.passwordConfirmation.message} /> }

      <div className="flex flex-col gap-4 justify-center items-center">
        <button
          className="bg-red-600 text-white w-full h-11 p-2 mt-4 rounded-3xl"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Criando...' : 'Criar conta'}
        </button>
      </div>
    </form>
  )
}