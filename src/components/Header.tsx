import { formatDateTime } from "../utils/dateUtils";

export function Header() {
  return (
    <header className="flex justify-between items-center p-6">
      <h1 className="text-xl font-semibold">Aqu Weather Forcast</h1>
      <div className="flex items-center   gap-4">
        <div className=" text-lg text-gray-100">
          {formatDateTime(new Date())}
        </div>
        {/* <button className="p-2 rounded-full hover:bg-gray-100">
          <span className="sr-only">Toggle theme</span>
          🌙
        </button> */}
      </div>
      <button className="p-2 rounded-full hover:bg-gray-100">
        <span className="sr-only">Settings</span>
        ⚙️
      </button>
    </header>
  );
}
