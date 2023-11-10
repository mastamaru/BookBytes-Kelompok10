import Link from "next/link";

export default function NavbarAdmin({ className, selectedLabel }) {
  const buttons = [
    {
      label: "Data Buku",
      route: "/admin/buku",
      classes: "px-[92px] py-2.5 bg-[#7AC2A5]",
    },
    {
      label: "Data Transaksi",
      route: "/admin/transaksi",
      classes: "px-[33px] py-3  bg-[#B0ABD1]",
    },
    {
      label: "Data Kasir",
      route: "/admin/kasir",
      classes: "px-[91px] py-3 bg-[#E999B8]",
    },
  ];

  return (
    <>
      <div
        className={`flex flex-row items-end gap-6 absolute ${className} leading-normal font-mplus font-bold text-[35px]`}
      >
        {buttons.map((button, index) => (
          <Link href={button.route} key={index}>
            <button
              className={`${button.classes} rounded-[5px] ${
                selectedLabel === button.label ? "py-[48px] text-[45px]" : ""
              }`}
            >
              {button.label}
            </button>
          </Link>
        ))}
      </div>
    </>
  );
}
