import React, { Component } from 'react';

class SelectField extends Component {
  render() {
    const { field, value, handleChange, array } = this.props;
    return (
      <div className="flex justify-between mr-2">
        <div className="capitalize font-bold">{ field }</div>
        <div className="w-36">
          <label
            className="flex justify-end"
            htmlFor={ field }>
            <select
              className="bg-gray-200 text-black mb-1 w-full rounded h-6"
              id={ field }
              value={ value }
              onChange={ handleChange }
            >
              { array.map((curr, i) => <option key={ i }>{ curr }</option>)}
            </select>
          </label>
        </div>
      </div>     
    )
  }
}

export default SelectField;
