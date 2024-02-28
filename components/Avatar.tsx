import { PersonIcon } from "@radix-ui/react-icons";
import Image from "next/image";

interface AvatarProps {
  src: string | undefined | null;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  if (src) {
    return (
      <Image
        src={src}
        alt="avatar"
        width={30}
        height={30}
        className="rounded-full "
      />
    );
  }
  return (
    <div className="flex bg-slate-100 rounded-full p-1 items-center justify-center">
      <PersonIcon className="w-5 h-5" />
    </div>
  );
};

export default Avatar;
