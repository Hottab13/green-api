import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addSenderNumber } from "../redux/authSlice";
import {
  useGetMessageMutation,
  useSendMessageMutation,
} from "../redux/sendMessageApi";
import { Input } from "./AuthorizationForm";

const Wrapper = styled.main`
  margin-top: 1rem;
  //padding: 1rem;
  display: flex;
  width: 100%;
  min-height: 100%;

  background: #ffffff;
`;
const ContactBlock = styled.div`
  min-width: 370px;
  margin: auto auto;
`;
const MessageBlock = styled.div`
  display: flex;
  flex-direction: column;
  border: solid 1px;
  width: 100%;
`;
const BtnHidden = styled.input`
  display: none;
`;
const Form = styled.form`
  display: flex;
`;
const Message = styled.div`
  height: 75%;
`;

const Textarea = styled.textarea`
  padding: 1rem;
  background: #e5e7eb;
  font-size: 1rem ;
  line-height: 1.5rem ;
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
const Number = styled.span`
  background: #e5e7eb;
  font-size: 1rem ;
  line-height: 1.5rem;
  width: 100%;
  padding: 0.3rem 0.5rem;
  border-radius: 10px;
  border: none;
  margin: 2rem auto;
`;
const Main = ({ IdInstance, apiTokenInstance, senderNumber }) => {
  const [sendMessage] = useSendMessageMutation();
  const [getMess, { data }] = useGetMessageMutation();
  useEffect(() => {
    const interval = setInterval(() => {
      getMess({
        IdInstance,
        apiTokenInstance,
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [IdInstance, apiTokenInstance, getMess]);

  const distpatch = useDispatch();
  const { register, handleSubmit, reset } = useForm({
    mode: "onBlur",
  });
  const handleSendMessage = (payload) => {
    console.log(payload)
    sendMessage({
      message: payload.message,
      senderNumber,
      IdInstance,
      apiTokenInstance,
    }).unwrap();
    reset();
  };
  const handleAddSenderNumber = (payload) => {
    distpatch(addSenderNumber(payload));
  };
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(handleAddSenderNumber)} autoComplete="off">
        <ContactBlock>
          {senderNumber ? (
            <Number>{senderNumber}</Number>
          ) : (
            <Input
              {...register("number", {
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
              placeholder="Введите номер"
            />
          )}
        </ContactBlock>
        <BtnHidden type="submit" />
      </Form>
      <MessageBlock>
        <Message>
          {data && data?.body?.messageData?.textMessageData?.textMessage ||
            "Нету новых событий!"}
        </Message>
        {senderNumber && (
          <Form onSubmit={handleSubmit(handleSendMessage)} autoComplete="off">
            <Textarea
              {...register("message", {
                required: "Обязательное поле!",
              })}
              placeholder="Введите сообщение"
            />
            <button type="submit">Отправить</button>
          </Form>
        )}
      </MessageBlock>
    </Wrapper>
  );
};
export { Main };
