import { useSelector } from "react-redux";
import styled from "styled-components";
import { AuthorizationForm } from "./components/AuthorizationForm";
import { Main } from "./components/Main";

const Container = styled.div`
  width: 100%;
  max-width: 1240px;
  height: 100vh;
  margin: 32px auto;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  border: solid 1px;
  padding: 0 2rem;
  background: #02a66f;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
`;
const App = () => {
  const { isAuth, IdInstance, apiTokenInstance, senderNumber } = useSelector(
    (state) => state.authSlice || {}
  );
  return (
    <Container>
      <Wrapper>
        <AuthorizationForm isAuth={isAuth} />
        {isAuth && (
          <Main
            IdInstance={IdInstance}
            apiTokenInstance={apiTokenInstance}
            senderNumber={senderNumber}
          />
        )}
      </Wrapper>
    </Container>
  );
};

export default App;
