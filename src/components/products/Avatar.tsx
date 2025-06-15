import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

interface AvatarProps {
  src?: string | null | undefined;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ src, size = 50 }) => {
  if (src) {
    return (
      <Image
        src={src}
        alt="Avatar"
        className="rounded-full"
        height={size}
        width={size}
      />
    );
  }
  return <FaUserCircle />;
};

export default Avatar;
