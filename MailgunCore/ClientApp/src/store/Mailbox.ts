import { Reducer } from 'redux';
import { AppThunkAction } from './';

export interface Mailbox {
    mailbox: Mail[];
    isLoading: boolean;
}

export interface Mail {
    id: number;
    sender: string;
    recipient: string;
    mailSubject: string;
    bodyHtml: string;
    mailDate: string;
}

enum MailboxActionType {
    Request = "REQUEST_MAIL",
    Receive = "RECEIVE_MAIL"
}
interface RequestMailAction {
    type: MailboxActionType.Request;
}
interface ReceiveMailAction {
    type: MailboxActionType.Receive;
    mailbox: Mail[];
}
type MailboxAction = RequestMailAction | ReceiveMailAction;

export const actionCreators = {
    requestMail: (): AppThunkAction<MailboxAction> => (dispatch) => {
        dispatch({ type: MailboxActionType.Request } as RequestMailAction);
        fetch(`api/Mail`)
            .then(response => response.json() as Promise<Mail[]>)
            .then(data => {
                dispatch({ type: MailboxActionType.Receive, mailbox: data } as ReceiveMailAction);
            });
    }
}

const initialState: Mailbox = {
    mailbox: [
        { id: 1, sender: "steve@cratemail.org", recipient: "jane@cratemail.org", mailSubject: "First meeting for Cratemail group", bodyHtml: "Please forward the documentation to Bill", mailDate: "06/06/18 10:15am" },
        { id: 2, sender: "jane@cratemail.org", recipient: "steve@cratemail.org", mailSubject: "RE: First meeting for Cratemail group", bodyHtml: "Will forward the info", mailDate: "06/06/18 11:15pm" },
        { id: 3, sender: "jane@cratemail.org", recipient: "bill@cratemail.org", mailSubject: "FW: First meeting for Cratemail group", bodyHtml: "Sending you the documentation from Steve", mailDate: "06/07/18 6:55pm" },
        { id: 4, sender: "bob@cratemail.org", recipient: "alice@cratemail.org", mailSubject: "Report for First Quarter", bodyHtml: "Please review the report when you get a chance", mailDate: "06/07/18 8:30pm" },
        { id: 5, sender: "alice@cratemail.org", recipient: "steve@cratemail.org", mailSubject: "FW: Report for First Quarter", bodyHtml: "Need to make changes to the report", mailDate: "06/09/18 5:15am" }
    ],
    isLoading: false
}

export const reducer: Reducer<Mailbox, MailboxAction> = (state = initialState, action) => {
    switch (action.type) {
        case MailboxActionType.Request:
            return {
                ...state,
                isLoading: true
            }
        case MailboxActionType.Receive:
            return {
                ...state,
                mailbox: action.mailbox,
                isLoading: false
            }
        default:
            break;
    }
    return state;
}