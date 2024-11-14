import { useState } from "react";

export const ComboBox = ({
  name,
  data,
  value,
  disabled,
  onChange,
  setValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (item) => {
    // setSelectedItem(item);
    setIsOpen(false);
    setValue(name.toLowerCase(), item);
  };

  return (
    <div className="relative">
      <ComboBoxInput
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <ComboBoxList
        isOpen={isOpen}
        data={data}
        handleSelect={handleSelect}
        // selectedItem={selectedItem}
      />
    </div>
  );
};

const ComboBoxInput = ({
  isOpen,
  name,
  value,
  setIsOpen,
  disabled,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-between rounded-md bg-slate-100">
      <input
        type="text"
        placeholder={name}
        name={name.toLowerCase()}
        value={value}
        className={`w-full bg-transparent py-4 pl-4 focus:outline-none ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
        onChange={onChange}
        onClick={() => setIsOpen((prevState) => !prevState)}
        autoComplete="off"
        disabled={disabled}
        required
      />
      <div
        className={`ease mr-4 h-0 w-0 border-l-[5px] border-r-[5px] border-t-[6px] border-solid border-transparent border-t-gray-900 transition duration-200 ${isOpen && "rotate-180"}`}
      ></div>
    </div>
  );
};

const ComboBoxList = ({ isOpen, data, handleSelect }) => {
  return (
    <ul
      className={`absolute top-16 z-10 max-h-60 w-full overflow-y-auto rounded-md bg-white p-1 shadow ${isOpen ? "block" : "hidden"}`}
    >
      {data ? (
        data.map((item) => (
          <ComboBoxItem
            key={item.id}
            item={item}
            handleSelect={handleSelect}
            // selectedItem={selectedItem}
          />
        ))
      ) : (
        <li className="cursor-pointer rounded-md p-3 focus:outline-none">
          No Result Found!
        </li>
      )}
    </ul>
  );
};

const ComboBoxItem = ({ item, handleSelect }) => {
  return (
    <li
      className={`cursor-pointer rounded-md p-3 hover:bg-slate-100 focus:outline-none`}
      onClick={() => handleSelect(item)}
    >
      {item?.name}
    </li>
  );
};
