import { useState } from "react";

export default function Sidebar({ categories, setCategory }) {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdownId) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };

  const selectedCategory = (category) => {
    setCategory(category);
    setActiveDropdown(null);
  };

  return (
    <div className="fixed top-24 hidden w-56 rounded-md bg-white px-2 py-4 shadow xl:block [&_svg]:size-6 [&_svg]:shrink-0 [&_svg]:fill-gray-800">
      <aside className="lg:text-sm lg:leading-6">
        <ul>
          <li>
            <button
              className="group flex w-full items-center gap-4 rounded-md px-4 py-2 hover:bg-slate-100"
              onClick={() => toggleDropdown("dropdown-1")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M560-564v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-600q-38 0-73 9.5T560-564Zm0 220v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-380q-38 0-73 9t-67 27Zm0-110v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-490q-38 0-73 9.5T560-454ZM260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59ZM280-494Z" />
              </svg>
              <div className="flex w-full items-center justify-between">
                <span>Menu</span>
                <svg
                  className={`ease transition duration-200 ${activeDropdown === "dropdown-1" ? "rotate-180" : ""}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                >
                  <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                </svg>
              </div>
            </button>
            <div
              className={`ml-7 border-l pl-4 ${activeDropdown === "dropdown-1" ? "block" : "hidden"}`}
            >
              <ul>
                <li>
                  <button
                    className="w-full rounded-md py-2 pl-3 text-left hover:bg-slate-100"
                    onClick={() => selectedCategory({})}
                  >
                    All
                  </button>
                </li>
                {categories &&
                  categories.map((cat) => (
                    <li key={cat._id}>
                      <button
                        className="w-full rounded-md py-2 pl-3 text-left hover:bg-slate-100"
                        onClick={() =>
                          selectedCategory({ category: { query: cat.name } })
                        }
                      >
                        {cat.name}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </li>

          {/* <li>
            <a
              href="#"
              className="group flex w-full items-center gap-4 rounded-md px-4 py-2 hover:bg-slate-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M560-564v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-600q-38 0-73 9.5T560-564Zm0 220v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-380q-38 0-73 9t-67 27Zm0-110v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-490q-38 0-73 9.5T560-454ZM260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59ZM280-494Z" />
              </svg>
              <span>Dashboard</span>
            </a>
          </li> */}
        </ul>
      </aside>
    </div>
  );
}
