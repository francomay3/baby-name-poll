import styled from "styled-components";

export const Texto = styled.span`
  font-size: 1.2rem;
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;

  b {
    font-weight: 700;
  }
`;

export const Titulo = styled(Texto)`
  font-size: 1.8rem;
  font-weight: 700;
`;
