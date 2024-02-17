import { Data } from "../hooks/useDatabase";
import ReactWordcloud, { Options } from "react-wordcloud";
import styled from "styled-components";
import { Card, Divider, Space, Typography } from "antd";
import { CrownFilled, FireFilled, StarFilled } from "@ant-design/icons";

const { Title } = Typography;

const RankingCard = styled(Card)<{ index: number }>`
  background-color: ${(props) => {
    if (props.index === 0) return "#ecba29";
    if (props.index === 1) return "#bfbfbf";
    if (props.index === 2) return "#cd823f";
    return "#fff7ed";
  }};
  color: ${(props) => {
    if (props.index < 3) return "white";
    return "black";
  }};

  font-size: 1.2rem;
  .name {
    margin-block: auto;
    color: ${(props) => {
      if (props.index < 3) return "white";
      return "black";
    }};
    order: -1;
    font-weight: ${(props) => (props.index === 0 ? "bold" : "normal")};
  }
  .icon {
    order: 1;
    font-size: 2.4rem;
  }
  .ant-card-body {
    justify-content: space-between;
    display: flex;
    align-items: center;

    padding-block: 0.7rem;
  }
`;

const options: Partial<Options> = {
  fontSizes: [15, 80],
  rotations: 2,
  rotationAngles: [0, 90],
  padding: 5,
};

const getTotalValueByName: (data: Data, name: string) => number = (
  data,
  name
) => {
  if (!data) {
    return 0;
  }
  const values = Object.values(data.names[name].votes)
    .map((vote) => vote.value)
    .filter((value) => value > 0);
  return values.reduce((acc, value) => acc + value, 0);
};

const Ranking = ({ data }: { data: Data }) => {
  if (!data) return null;
  const names = Object.keys(data.names)
    .map((name) => {
      return {
        text: name,
        value: getTotalValueByName(data, name),
      };
    })
    .sort((a, b) => b.value - a.value);

  const topNames = names.slice(0, 6);

  return (
    <div>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <Title
          style={{
            textAlign: "center",
          }}
        >
          Ranking de nombres 🥁
        </Title>

        {topNames.map((name, index) => (
          <RankingCard key={index} index={index}>
            <Title level={4} className="name">
              {name.text} <br />
              {name.value}
            </Title>
            <div className="icon">
              {index === 0 && <CrownFilled />}
              {index === 1 && <FireFilled />}
              {index === 2 && <StarFilled />}
            </div>
          </RankingCard>
        ))}
        <Divider />
        <ReactWordcloud options={options} words={names} />
      </Space>
    </div>
  );
};

export default Ranking;
