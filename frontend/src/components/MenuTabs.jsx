export default function MenuTabs() {
  return (
    <div className="flex items-center border-b border-slate-900/10 p-4 xl:hidden">
      <button type="button" className="text-slate-800 hover:text-slate-600">
        <span className="sr-only">Navigation</span>
        <svg
          className="size-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        >
          <path d="M560-564v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-600q-38 0-73 9.5T560-564Zm0 220v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-380q-38 0-73 9t-67 27Zm0-110v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-490q-38 0-73 9.5T560-454ZM260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59ZM280-494Z" />
        </svg>
      </button>
      <ol className="ml-4 flex min-w-0 gap-6 whitespace-nowrap text-sm leading-6">
        <li className="flex items-center">
          Menu
          <svg
            width="3"
            height="6"
            aria-hidden="true"
            className="ml-3 overflow-visible text-slate-400"
          >
            <path
              d="M0 0L3 3L0 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>
          </svg>
        </li>
        <li className="truncate font-semibold text-slate-900">Food</li>
        <li className="truncate text-slate-900">Drink</li>
        <li className="truncate text-slate-900">Desert</li>
      </ol>
    </div>
  );
}