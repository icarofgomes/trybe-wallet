import React, { Component } from 'react';

class InputField extends Component {
  render() {
    const { field, type, value, handleChange } = this.props;
    return (
      <div className="flex justify-between mr-2">
        <div className="capitalize font-bold md:mr-2">{ field }</div>
        <div className="w-36">
          <label
            className="flex justify-end"
            htmlFor={ field }>
            <input
              className="bg-gray-200 text-black mb-1 w-full rounded"
              type={ type }
              id={ field }
              value={ value }
              onChange={ handleChange }
            />
          </label>
        </div>
      </div>     
    )
  }
}

export default InputField;
