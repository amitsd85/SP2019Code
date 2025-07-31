import * as React from 'react';

export interface ITextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  isNumeric?: boolean;
}

export class TextFieldControl extends React.Component<ITextFieldProps,{}> {
  private _onChange = (event: React.FormEvent<HTMLInputElement>): void => {
    // const newValue = event.target.value;
    // if (!this.props.isNumeric || /^[0-9]{0,4}$/.test(newValue)) {
    //   this.props.onChange(newValue);
    // }
    const newValue = (event.target as HTMLInputElement).value;
    if (!this.props.isNumeric || /^[0-9]{0,4}$/.test(newValue)) {
      this.props.onChange(newValue);
    }
  };

  public render(): JSX.Element {
    const { label, value } = this.props;
    const inputId = `textfield-${label.replace(/\s+/g, '-')}`;

    return (
      <div>
        <label htmlFor={inputId}>{label}</label>
        <input
          id={inputId}
          type="text"
          value={value}
          onChange={this._onChange}
        />
      </div>
    );
  }
}
