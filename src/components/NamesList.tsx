import { Button, Slider, Input, Divider, Typography, Space } from "antd";
import styled from "styled-components";
import { LogoutAction, Names, SetNewValue, SetNewName } from "../models";
import { useState, Fragment, useEffect } from "react";
import useScrollTopOnMount from "../hooks/useScrollTop";
import { useNavigate } from "react-router-dom";
import { routes } from "../constants";

const Logout = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const getUserValueForName = (userId: string, name: Names[keyof Names]) => {
  const vote = name.votes?.[userId];
  return vote ? vote.value : null;
};

const getSentimentColor = (value: number | null) => {
  if (!value) return "#b7b7b7";
  const min = 1;
  const max = 10;
  const minHue = 114;
  const maxHue = 0;

  const hue = ((value - min) * (minHue - maxHue)) / (max - min) + maxHue;
  return `hsl(${hue}, 90%, 50%)`;
};

const AddNameElement = styled.div`
  grid-column: 1 / span 2;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ExampleWrapper = styled(Space)`
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  & > *:nth-child(2) {
    flex: 1;
  }
  & > *:nth-child(1) {
    margin-bottom: 4px;
  }
`;

const Explanation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Smileys = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NamesList = ({
  logout,
  userId,
  names,
  setNewValue,
  setNewName,
}: {
  logout: LogoutAction;
  userId: string | null;
  names: Names | null;
  setNewValue: SetNewValue;
  setNewName: SetNewName;
}) => {
  const [exampleValue, setExampleValue] = useState<number | null>(null);
  const navigate = useNavigate();
  const [newNameInput, setNewNameInput] = useState<string>("");
  const [addingName, setAddingName] = useState<boolean>(false);
  useScrollTopOnMount();

  useEffect(() => {
    if (!userId) {
      navigate(routes.login);
    }
  }, [userId, navigate]);

  if (!userId || !names) {
    return null;
  }
  return (
    <Wrapper>
      <Typography.Title level={4}>ATENCION! 🛑</Typography.Title>
      <Typography.Text>
        Si no sos{" "}
        <Typography.Text mark strong>
          {userId}
        </Typography.Text>
        , por favor cambia de usuario. En esta app no hay contraseñas, asi que
        cualquiera puede cambiar los votos de los demas. no lo hagas...
      </Typography.Text>
      <Logout>
        <span>no sos {userId}?</span>
        <Button
          style={{
            background: "#ff930e",
          }}
          type="primary"
          onClick={logout}
        >
          Cambiar de usuario
        </Button>
      </Logout>
      <Divider />
      <Typography.Title level={4}>Como Puntuar: EJEMPLO</Typography.Title>
      <ExampleWrapper>
        <span>Lennartina</span>
        <Explanation>
          <Smileys>
            <span>😡</span>
            <span>😠</span>
            <span>😞</span>
            <span>😐</span>
            <span>😊</span>
            <span>😄</span>
            <span>😀</span>
            <span>😁</span>
            <span>😍</span>
            <span>🤩</span>
          </Smileys>
          <Slider
            styles={{
              track: {
                backgroundColor: getSentimentColor(exampleValue),
              },
            }}
            style={{ flex: 1 }}
            value={exampleValue ?? 2}
            defaultValue={exampleValue ?? 2}
            min={1}
            max={10}
            onChange={(newExampleValue) => setExampleValue(newExampleValue)}
          />
        </Explanation>
      </ExampleWrapper>
      <Typography.Title level={5} mark>
        Podes dar tu preferencia por todos los nombres!
      </Typography.Title>
      <Typography.Text>
        los mas gustados por la mayoria van a terminar primeros en el ranking!
        tambien podes agregar nuevos nombres si queres.
      </Typography.Text>
      <Divider />
      <List>
        <AddNameElement>
          {addingName ? (
            <>
              <Input
                placeholder="Lennart"
                onChange={(event) => setNewNameInput(event.target.value)}
              />
              <Button
                type="primary"
                onClick={() => {
                  setNewName(newNameInput);
                  setAddingName(false);
                }}
              >
                Agregar
              </Button>
            </>
          ) : (
            <Button
              type="primary"
              onClick={() => setAddingName(true)}
              style={{
                flex: 1,
              }}
            >
              Agregar Nuevo Nombre ✨
            </Button>
          )}
        </AddNameElement>

        {Object.entries(names).map(([nameId, name]) => {
          const value = getUserValueForName(userId, name);
          return (
            <Fragment key={nameId}>
              <span key={nameId}>{nameId}</span>
              <Slider
                styles={{
                  track: {
                    backgroundColor: getSentimentColor(value),
                  },
                }}
                value={value ?? 2}
                style={{ flex: 1 }}
                defaultValue={value ?? 2}
                min={1}
                max={10}
                onChange={(value) => setNewValue(userId, nameId, value)}
              />
            </Fragment>
          );
        })}
      </List>
    </Wrapper>
  );
};

export default NamesList;
