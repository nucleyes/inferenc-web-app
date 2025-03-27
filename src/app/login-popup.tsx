"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Checkbox,
} from "@nextui-org/react";
import { z } from "zod";
import Image from "next/image";
import { signIn } from "next-auth/react";
import React, { useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import Input from "@components/Input";
import FormControl from "@/app/components/form-control";

const LoginPopUp = ({
  isOpen = false,
  onClose,
  onOpenSignUpPopUp,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenSignUpPopUp: () => void;
}) => {
  return (
    <Modal size="sm" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Log In</ModalHeader>
        <ModalBody>
          <div className="flex flex-col col-span-10 md:col-span-4 lg:col-span-3 rounded-2xl backdrop-blur-xl justify-center items-center gap-6">
            <LoginForm onOpenSignUpPopUp={onOpenSignUpPopUp} />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginPopUp;

const loginSchema = z.object({
  email: z.string().email("The email you entered appears invalid."),
  password: z.string().min(5, "Password must be at least 5 characters."),
});

type LoginForm = z.infer<typeof loginSchema>;

const LoginForm = ({
  onOpenSignUpPopUp,
}: {
  onOpenSignUpPopUp: () => void;
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const fields = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const { handleSubmit } = fields;

  const handleLogin: SubmitHandler<LoginForm> = useCallback(
    async ({ email, password }) => {
      try {
        setIsLoading(true);
        const response = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (response?.ok === false) {
          console.error("Login failed:", response.error);
        } else if (response?.ok) {
          // Successfully logged in
          window.location.reload();
        }
      } catch (error) {
        console.error("Failed to sign in", error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return (
    <FormProvider {...fields}>
      <div className="w-full flex flex-col gap-4">
        <FormControl<LoginForm> name="email">
          <Input<LoginForm>
            autoFocus
            label="Email"
            name="email"
            type="text"
            placeholder="dumbledore@hogwarts.club"
            className="w-full"
            variant="bordered"
          />
        </FormControl>
        <FormControl<LoginForm> name="password">
          <Input<LoginForm>
            name="password"
            type={isVisible ? "text" : "password"}
            label="Password"
            placeholder="Password"
            className="w-full"
            variant="bordered"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashIcon
                    width={24}
                    height={24}
                    className="text-2xl text-default-400 pointer-events-none"
                  />
                ) : (
                  <EyeIcon
                    width={24}
                    height={24}
                    className="text-2xl text-default-400 pointer-events-none"
                  />
                )}
              </button>
            }
          />
        </FormControl>
        <div className="flex justify-between items-center my-1">
          <Checkbox size="sm" defaultSelected>
            Remember me
          </Checkbox>
          <small className="cursor-pointer">Forget Password?</small>
        </div>
        <Button
          color="primary"
          size="lg"
          radius="sm"
          onClick={handleSubmit(handleLogin)}
          isLoading={isLoading}
          isDisabled={!fields.formState.isValid || isLoading}
          className="w-full disabled:cursor-not-allowed"
        >
          Log in
        </Button>
        <small className="text-center my-2 text-sm font-medium text-text/60">
          Need to create an account?{" "}
          <span
            className="text-blue-700 cursor-pointer"
            onClick={() => onOpenSignUpPopUp()}
          >
            Sign up
          </span>
        </small>
      </div>
    </FormProvider>
  );
};
