import { Button, Slider, Input, Collapse, Divider } from "antd";
import styled from "styled-components";
import { LogoutAction, Names, SetNewValue, SetNewName } from "../models";
import { useState, Fragment } from "react";

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
  const vote = name.votes[userId];
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

const NamesList = ({
  logout,
  userId,
  names,
  setNewValue,
  setNewName,
}: {
  logout: LogoutAction;
  userId: string;
  names: Names;
  setNewValue: SetNewValue;
  setNewName: SetNewName;
}) => {
  const [newNameInput, setNewNameInput] = useState<string>("");
  const [addingName, setAddingName] = useState<boolean>(false);
  return (
    <Wrapper>
      <h2>Hola {userId}</h2>
      <Logout>
        <span>no sos {userId}?</span>
        <Button type="primary" onClick={logout}>
          Cambiar de usuario
        </Button>
      </Logout>
      <Divider />
      <Collapse
        items={[
          {
            label: "Info",
            children: (
              <>
                <p>
                  Bueno. Aca podes agregar nombres y tambien ver los nombres que
                  agregaron los demas.
                </p>
                <p>
                  podes decidir cuanto te gusta cada nombre usando la manijita.
                  si el color de la barra es gris, es porque todavia no votaste
                  ese nombre.
                </p>
                <p>
                  no hace falta guardar los cambios, todo se sincroniza
                  automaticamente.
                </p>
              </>
            ),
          },
        ]}
      ></Collapse>
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
              Agregar Nombre +
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
                style={{ flex: 1 }}
                defaultValue={value ?? 5}
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
