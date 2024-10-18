import styled from "styled-components";
import { useGetUser } from "./useGetUser";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserAvatar() {
  const { user } = useGetUser();

  const { fullName, avatar } = user.user_metadata;
  console.log(user, fullName, avatar);
  return (
    <StyledUserAvatar>
      <Avatar
        src={avatar || "default-user.jpg"}
        alt={`Avatar of ${fullName || "admin"}`}
      />
      <span>{fullName || "admin"}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
