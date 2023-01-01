import React from 'react'

function inputField({ title, onChange }) {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        {title}
      </label>
      <div className="mt-1">
        <input
          type="text"
          name="name"
          id="name"
          onChange={onChange}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder="John Doe"
        />
      </div>
    </div>
  )
}

export default inputField
