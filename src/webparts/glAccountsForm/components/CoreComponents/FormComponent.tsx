import * as React from 'react';
import { DropdownControl } from './DropdownControl';
import { TextFieldControl } from './TextFieldControl';
import { SPService } from '../../service/spService';

export interface FormComponentState {
    formId: string;
    project: string;
    team: string;
    location: string;
    extra1: string;
    extra2: string;
    extra3: string;
    projectOptions: string[];
    teamOptions: string[];
    locationOptions: string[];
}

export class FormComponent extends React.Component<{}, FormComponentState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            formId: '',
            project: '',
            team: '',
            location: '',
            extra1: '',
            extra2: '',
            extra3: '',
            projectOptions: [],
            teamOptions: [],
            locationOptions: []
        };
    }

    componentDidMount() {
        SPService.getActiveItems("ProjectList").then((items: string[]) => {
            this.setState((prevState) => ({ ...prevState, projectOptions: items }));
        });

        SPService.getActiveItems("TeamList").then((items: string[]) => {
            this.setState((prevState) => ({ ...prevState, teamOptions: items }));
        });

        SPService.getActiveItems("LocationList").then((items: string[]) => {
            this.setState((prevState) => ({ ...prevState, locationOptions: items }));
        });
    }

    handleSearch = async () => {
        const { formId } = this.state;
        const data = await SPService.getFormById(formId);

        if (data) {
            this.setState((prevState) => ({
                ...prevState,
                project: data.Project,
                team: data.Team,
                location: data.Location,
                extra1: data.ExtraField1 || '',
                extra2: data.ExtraField2 || '',
                extra3: data.ExtraField3 || ''
            }));
        } else {
            alert("No form found with that ID.");
        }
    };

    handleSave = async () => {
        const { formId, project, team, location, extra1, extra2, extra3 } = this.state;

        if (formId.length !== 4) {
            alert("Form ID must be 4 digits.");
            return;
        }

        await SPService.saveForm({
            FormID: formId,
            Project: project,
            Team: team,
            Location: location,
            ExtraField1: extra1,
            ExtraField2: extra2,
            ExtraField3: extra3
        });

        alert("Form saved successfully!");
    };

    render() {
        const {
            formId,
            project,
            team,
            location,
            extra1,
            extra2,
            extra3,
            projectOptions,
            teamOptions,
            locationOptions
        } = this.state;

        return (
            <div>
                <TextFieldControl label="Form ID (4 digits)" value={formId} onChange={(val) => this.setState((prevState) => ({ ...prevState, formId: val }))} isNumeric />
                <button onClick={this.handleSearch}>Search</button>

                <DropdownControl label="Project" value={project} onChange={(val) => this.setState((prevState) => ({ ...prevState, project: val }))} options={projectOptions} />
                <DropdownControl label="Team" value={team} onChange={(val) => this.setState((prevState) => ({ ...prevState, team: val }))} options={teamOptions} />
                <DropdownControl label="Location" value={location} onChange={(val) => this.setState((prevState) => ({ ...prevState, location: val }))} options={locationOptions} />

                <TextFieldControl label="Extra Field 1" value={extra1} onChange={(val) => this.setState((prevState) => ({ ...prevState, extra1: val }))} />
                <TextFieldControl label="Extra Field 2" value={extra2} onChange={(val) => this.setState((prevState) => ({ ...prevState, extra2: val }))} />
                <TextFieldControl label="Extra Field 3" value={extra3} onChange={(val) => this.setState((prevState) => ({ ...prevState, extra3: val }))} />

                <button onClick={this.handleSave}>Save</button>
            </div>
        );
    }
}
