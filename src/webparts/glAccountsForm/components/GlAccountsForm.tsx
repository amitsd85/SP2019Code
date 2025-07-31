import * as React from 'react';
import styles from './GlAccountsForm.module.scss';
import { IGlAccountsFormProps } from './IGlAccountsFormProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { FormComponent } from './CoreComponents/FormComponent';

export default class GlAccountsForm extends React.Component<IGlAccountsFormProps, {}> {
  public render(): React.ReactElement<IGlAccountsFormProps> {
    return (
      <div className={ styles.glAccountsForm }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              {/* <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a> */}

              <FormComponent />

            </div>
          </div>
        </div>
      </div>
    );
  }
}
