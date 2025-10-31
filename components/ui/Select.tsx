import React from 'react';
import ChevronDownIcon from '../icons/ChevronDownIcon';

interface Option {
    value: string;
    label: string;
}

interface OptionGroup {
    label: string;
    options: Option[];
}

type SelectOptions = (Option | OptionGroup)[];

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOptions;
}

const Select: React.FC<SelectProps> = ({ label, id, options, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          {...props}
          className="w-full appearance-none bg-white px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          {options.map((opt, index) => {
            if ('options' in opt) {
              return (
                <optgroup key={index} label={opt.label}>
                  {opt.options.map((subOpt) => (
                    <option key={subOpt.value} value={subOpt.value}>
                      {subOpt.label}
                    </option>
                  ))}
                </optgroup>
              );
            }
            return (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            );
          })}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <ChevronDownIcon />
        </div>
      </div>
    </div>
  );
};

export default Select;
