import React from 'react'

function Budget({ title, name, onChange }) {
  return (
    <div>
      <label
        htmlFor="budget"
        className="block text-sm font-medium text-gray-700"
      >
        {title}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-06 flex items-center pl-3"></div>
        <input
          type="text"
          name={name}
          id={name}
          onChange={onChange}
          className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="$  0.00"
        />
        <div className="absolute inset-y-0 right-0 flex items-center"></div>
      </div>
    </div>
  )
}

export default Budget
