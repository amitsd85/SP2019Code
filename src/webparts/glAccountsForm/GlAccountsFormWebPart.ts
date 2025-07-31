import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'GlAccountsFormWebPartStrings';
import GlAccountsForm from './components/GlAccountsForm';
import { IGlAccountsFormProps } from './components/IGlAccountsFormProps';
import { sp } from '@pnp/sp';

import { setup as pnpSetup } from "@pnp/common";

export interface IGlAccountsFormWebPartProps {
  description: string;
}

export default class GlAccountsFormWebPart extends BaseClientSideWebPart<IGlAccountsFormWebPartProps> {
  
  public onInit(): Promise<void> {
    pnpSetup({ spfxContext: this.context });
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IGlAccountsFormProps> = React.createElement(
      GlAccountsForm,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  // protected get dataVersion(): Version {
  //   return Version.parse('1.0');
  // }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
