import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { signIn, signOut } from "../redux/authSlice";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 15px;
  max-width: 423px;
  background: #02a66f;
`;
const InputConainer = styled.label`
  padding: 15px 5px;
  border-radius: red;
  font-size: var(--fs-md);
  font-weight: var(--fw-normal);
  letter-spacing: 0.025em;
`;
const Errors = styled.span`
  color: rgb(248, 113, 113);
  font-weight: var(--fw-bold);
  font-size: var(--fs-sm);
  line-height: 1.25rem /* 20px */;
  margin-left: 0.75rem /* 12px */;
`;
export const Input = styled.input.attrs()`
  background: #e5e7eb;
  font-size: 1rem /* 16px */;
  line-height: 1.5rem /* 24px */;
  width: 100%;
  padding: 0.3rem 0.5rem;
  border-radius: 10px;
  border: none;
  margin-bottom: 10px;
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    border-color: #02a698;
  }
`;
const Btn = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  border-radius: 9999px;
  border: none;
  letter-spacing: 0.025em;
  font-weight: 600;
  margin-left: 5px;
  cursor: pointer;
  padding: 10px;
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    border-color: #02a698;
  }
`;
const Form = styled.form``;

const AuthorizationForm = ({ isAuth }) => {
  const distpatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const handleAuth = (data) => {
    distpatch(signIn(data));
    reset();
  };
  return (
    <Wrapper>
      {isAuth ? (
        <Btn onClick={() => distpatch(signOut())}>Выйти</Btn>
      ) : (
        <Form onSubmit={handleSubmit(handleAuth)} autoComplete="off">
          <InputConainer>
            <Input
              {...register("IdInstance", {
                required: "Обязательное поле!",
                minLength: {
                  value: 10,
                  message: "Минимум 10 символов!",
                },
                maxLength: {
                  value: 20,
                  message: "Максимум 20 символов!",
                },
              })}
              type="number"
              placeholder="idInstance"
            />
            {errors.IdInstance && (
              <Errors>{errors?.IdInstance?.message || "Ошибка!"}</Errors>
            )}
          </InputConainer>
          <InputConainer>
            <Input
              {...register("apiTokenInstance", {
                required: "Обязательное поле!",
                minLength: {
                  value: 50,
                  message: "Минимум 50 символов!",
                },
                maxLength: {
                  value: 100,
                  message: "Максимум 20 символов!",
                },
              })}
              type="text"
              placeholder="apiTokenInstance"
            />
            {errors.apiTokenInstance && (
              <Errors>{errors?.apiTokenInstance?.message || "Ошибка!"}</Errors>
            )}
          </InputConainer>
          <Btn type="submit">Войти</Btn>
        </Form>
      )}
    </Wrapper>
  );
};
export { AuthorizationForm };
