function ButtonCustom({ name = "Button" }) {
  return (
    <div className="bg-[var(--primary2)] cursor-pointer p-2 rounded-lg text-[var(--secondary5)] max-w-[160px] text-center font-[500] hover:shadow-sm hover:shadow-[--primary1]">
      {name}
    </div>
  );
}

export default ButtonCustom;
