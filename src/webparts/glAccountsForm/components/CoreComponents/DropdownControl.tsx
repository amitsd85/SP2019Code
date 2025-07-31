import * as React from 'react';

export interface IDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export class DropdownControl extends React.Component<IDropdownProps,""> {
  constructor(props: IDropdownProps) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }

  private _onChange(event: any) {
    const selectedValue = event.target.value;
    this.props.onChange(selectedValue);
  }

  public render(): React.ReactElement<IDropdownProps> {
    const { label, options, value } = this.props;
    const selectId = `dropdown-${label.replace(/\s+/g, '-')}`;

    return (
      <div>
        <label htmlFor={selectId}>{label}</label>
        <select id={selectId} value={value} onChange={this._onChange}>
          <option value="">Select</option>
          {options.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default DropdownControl;
