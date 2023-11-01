import Link from "next/link";
export default function NavbarAdmin({ isActive }) {
  const buttons = [
    {
      label: "Data Buku",
      route: "/admin/buku",
      classes: "px-[92px] py-2.5 bg-[#7AC2A5]",
    },
    {
      label: "Data Transaksi",
      route: "/admin/transaksi",
      classes: "px-[11px] py-[46px] text-[45px] bg-[#B0ABD1]",
    },
    {
      label: "Data Kasir",
      route: "/admin/kasir",
      classes: "px-[91px] py-3 bg-[#E999B8]",
    },
  ];

  return (
    <>
      <div className="flex flex-row items-end gap-6 absolute top-[10.6%] left-[22%] leading-normal font-mplus font-bold text-[35px]">
        {buttons.map((button, index) => (
          <Link href={button.route}>
            <button
              key={index}
              className={`${button.classes} rounded-[5px] ${
                !isActive == true ? "py-[48px]" : ""
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
