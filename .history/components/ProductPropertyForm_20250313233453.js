"use client";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { IoRemoveCircleOutline } from "react-icons/io5";

export default function ProductPropertyForm({ categoryProperties, setCurrentProperties, productProperties }) {
  const [properties, setProperties] = useState(productProperties || []);
  const [values, setValues] = useState({});

  useEffect(() => {
    setValues(categoryProperties?.reduce((acc, _, i) => ({ ...acc, [i]: "" }), {}) || {});
  }, [categoryProperties]);

  const handleChange = (index, field, value) => {
    if (field === "value") setValues((prev) => ({ ...prev, [index]: value }));
    setProperties((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };

  const removeProperty = (index, type) => {
    type === "current" ? setCurrentProperties((prev) => prev.filter((_, i) => i !== index)) :
    setProperties((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-primary w-full rounded-lg border p-4 border-slate-600">
      <h1 className="text-lg font-bold mb-2">Product Properties</h1>
      <span className="text-xs italic">*Note: Select parent category to get properties</span>

      {/* Category Properties */}
      <div className="flex flex-col gap-2 mt-2">
        {categoryProperties?.map((item, index) => (
          <div key={index} className="flex flex-col gap-2 border p-2 rounded-md border-slate-500">
            <div className="flex justify-between">
              <label>{item.part}</label>
              <button onClick={() => removeProperty(index, "current")}>
                <IoRemoveCircleOutline size={24} />
              </button>
            </div>
            <select
              className="w-full p-2 rounded-md bg-secondary text-xs"
              onChange={(e) => handleChange(index, "value", e.target.value)}
            >
              <option value="">Select</option>
              {item.values?.map((val, i) => <option key={i} value={val}>{val}</option>)}
            </select>
            {!values[index] && (
              <input
                className="w-full p-2 rounded-md bg-secondary text-xs"
                type="text"
                placeholder="Enter value..."
                onChange={(e) => handleChange(index, "value", e.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      {/* Additional Properties */}
      <div className="flex flex-col gap-2 mt-4">
        {properties?.map((item, index) => (
          <div key={index} className="flex flex-col gap-2 border p-2 rounded-md border-slate-500">
            <div className="flex justify-between">
              <label>Part {index + 1}</label>
              <button onClick={() => removeProperty(index, "custom")}>
                <IoRemoveCircleOutline size={24} />
              </button>
            </div>
            <div className="flex gap-2">
              <input
                className="w-full p-2 rounded-md bg-secondary text-xs"
                type="text"
                placeholder="Enter part..."
                value={item.part}
                onChange={(e) => handleChange(index, "part", e.target.value)}
              />
              <input
                className="w-full p-2 rounded-md bg-secondary text-xs"
                type="text"
                placeholder="Enter value..."
                value={item.value}
                onChange={(e) => handleChange(index, "value", e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => setProperties([...properties, { part: "", value: "" }])} 
        className="mt-3 flex items-center gap-1 bg-blue-600 text-primarytext px-3 py-1 rounded text-sm">
        <BiPlus /> Add Property
      </button>
    </div>
  );
}
