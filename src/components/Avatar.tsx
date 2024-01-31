import styled from "styled-components";
import { Avatar as designSystemAvatar } from "antd";
import { User } from "../models";

const StyledAvatar = styled(designSystemAvatar)<{ color: string }>`
  background-color: ${({ color }) => color};
  cursor: pointer;
  user-select: none;
  aspect-ratio: 1;
  flex-shrink: 0;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`;

const Avatar = ({
  user,
  userId,
  onClick,
  size,
}: {
  user: User | null;
  userId?: string | null;
  onClick?: () => void;
  size?: number;
}) => {
  return (
    <StyledAvatar
      size={size}
      onClick={onClick}
      color={user?.color || "#909090"}
    >
      {userId ? userId[0] : "?"}
    </StyledAvatar>
  );
};

export default Avatar;
