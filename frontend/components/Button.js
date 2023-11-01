import { useMemo } from "react";
import clsx from "clsx";
import Image from "next/image";
export default function Button({
  color = "orange",
  onClick = () => {},
  isSubmit = " ",
  className,
  text,
  icon = null,
}) {
  const btnColor = useMemo(() => {
    if (color === "orange")
      return `bg-[#FBB91C] text-black border-[3px] border-solid border-black rounded-[30px] font-mplus font-bold hover:bg-[#DBA31E] active:bg-[#DBA31E]`;

    if (color === "green")
      return `bg-[#18EF61] text-white rounded-[5px] font-mplus font-bold hover:bg-[#12B64A] active:bg-[#12B64A]`;

    if (color === "blue")
      return `rounded-[5px] font-mplus font-bold text-white bg-[#1820EF] hover:bg-[#1218BD] active:bg-[#1820EF] active:border-7 active:border-solid active:border-[#1218BE]`;

    if (color === "red")
      return `rounded-[10px] bg-[#FD4D3E] hover:bg-[#CD32C2F] active:bg-[#CD32C2F] font-mplus font-bold text-white`;
  }, [color]);

  return (
    <button onClick={onClick} className={clsx(btnColor, className)}>
      {icon && <Image src={icon} className="" width={23} height={12} />}
      {""}
      {text}
    </button>
  );
}
