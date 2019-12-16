import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as MailboxStore from '../store/Mailbox';

import {
    SelectionState, IntegratedSelection,
    SortingState, IntegratedSorting,
    Sorting, Column
} from '@devexpress/dx-react-grid';
import {
    Grid, Table, TableHeaderRow, TableSelection, VirtualTable
} from '@devexpress/dx-react-grid-material-ui';

type MailboxProps = MailboxStore.Mailbox &
    typeof MailboxStore.actionCreators;

interface MailboxState {
    columns: Column[];
    selection: Array<string | number>;
    sorting: Sorting[];
    mail: MailboxStore.Mail;
}

class Mailbox extends React.Component<MailboxProps, MailboxState> {
    public state = {
        columns: [
            { name: 'sender', title: 'From' },
            { name: 'mailSubject', title: 'Subject' },
            { name: 'mailDate', title: 'Date' },
        ],
        sorting: [
            { columnName: 'mailDate', direction: 'desc' as const }
        ],
        selection: [],
        mail: {} as MailboxStore.Mail
    }
    private setSorting = (sorting: Sorting[]) => {
        this.setState({ sorting });
    }
    private setSelection = (selection: Array<string | number>) => {
        this.setState({ selection });
    }
    private setMail = (mail: MailboxStore.Mail) => {
        this.setState({ mail });
    }
    public componentDidMount() {
        this.props.requestMail();
    }
    public render() {
        return (
            <React.Fragment>
                <Grid rows={this.props.mailbox} columns={this.state.columns}>
                    <SelectionState
                        selection={this.state.selection}
                        onSelectionChange={this.setSelection}
                    />
                    <SortingState
                        sorting={this.state.sorting}
                        onSortingChange={this.setSorting}
                    />
                    <IntegratedSelection />
                    <IntegratedSorting />
                    <VirtualTable height={322} rowComponent={(props: Table.DataRowProps) => (
                        <Table.Row
                            {...props}
                            onClick={() => this.setMail(props.row)}
                            style={{ cursor: 'pointer' }}
                        />
                    )} />
                    <TableHeaderRow showSortingControls />
                    <TableSelection showSelectAll />
                </Grid>
                <div style={{ padding: 24 }}>
                    <h3>{this.state.mail.mailSubject}</h3>
                    <div dangerouslySetInnerHTML={{ __html: this.state.mail.bodyHtml }}></div>
                </div>
            </React.Fragment>
        );
    }
};

export default connect(
    (state: ApplicationState) => state.mailbox,
    MailboxStore.actionCreators
)(Mailbox as any);