import { FaSearch } from "react-icons/fa";

export default function SearchCompoenent ({placeHolder}) {
    return  <div className="bg-slate-600 rounded-md w-44 flex relative items-center justify-start pl-2 gap-2 py-2">
    <FaSearch size={12}/>
    <input
      type="text"
      placeholder={placeHolder}
      className="w-36 max-sm:w-full text-xs border-none outline-none ring-0 focus:ring-0 focus:outline-none bg-transparent absolute top-0 bottom-0 left-7 overflow-hidden"
    />
  </div>
}