export default function InputText({ type, text }) {
  return (
    <>
      <input
        type="text"
        placeholder={text}
        className="input w-[528px] h-[41.5px] text-black text-[20px] placeholder:pl-[10px] pl-2.5 focus:border-[#1820EF] focus:border-2 focus:border-solid focus:outline-none hover:border-[#1820EF] hover:border-2 hover:border-solid invalid:border-[#CD3C2F] invalid:border-2 invalid:border-solid "
        required
      />
    </>
  );
}
