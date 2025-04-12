import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { CreateUserModel } from "../core/models/create-user";
import { makeCreateUserUseCase } from "../services/main/factories/create-user";

export const useCreateUser = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<CreateUserModel.Params>();

  const mutation = useMutation({
    mutationFn: makeCreateUserUseCase().execute.bind(makeCreateUserUseCase()),
    onSuccess: () => reset(),
    onError: (error) => {
      console.error("Error creating user:", error);
    },
  });

  const onSubmit = async (data: CreateUserModel.Params) => {
    await mutation.mutateAsync(data);
  };

  return {
    register,
    handleSubmit,
    isSubmitting,
    onSubmit,
    errors
  }
}