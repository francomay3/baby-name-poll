import { Spin } from "antd";

const Loading = () => {
  return (
    <Spin
      tip="Cargado..."
      size="large"
      style={{
        marginTop: "50%",
      }}
    >
      <div className="content" />
    </Spin>
  );
};

export default Loading;
