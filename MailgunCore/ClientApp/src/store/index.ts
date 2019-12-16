import * as MailboxStore from './Mailbox';

export interface ApplicationState {
    mailbox: MailboxStore.Mailbox;
}

export const reducers = {
    mailbox: MailboxStore.reducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
