import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  background-color: #f0f0f0;
  width: 100%;
  min-height: 1rem;
  height: 100%;
  border-radius: 1rem;
  overflow: hidden;
`;

const ProgressInner = styled.div<{ percentage: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${({ percentage }) => percentage}%;
  background-color: #1677ff;
`;

const Progress = ({ max, value }: { max: number; value: number }) => {
  const percentage = (value / max) * 100;
  return (
    <Wrapper>
      <ProgressInner percentage={percentage} />
    </Wrapper>
  );
};

export default Progress;
