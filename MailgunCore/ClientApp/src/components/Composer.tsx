import * as React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

interface Response {
    result: boolean,
    log: string
}
interface ComposerState {
    to: string,
    cc: string,
    bcc: string,
    subject: string,
    message: string,
    sending: boolean,
    success: boolean,
    error: boolean,
    log: string
}
const initialState: ComposerState = {
    to: "",
    cc: "",
    bcc: "",
    subject: "",
    message: "",
    sending: false,
    success: false,
    error: false,
    log: ""
}
const toastSuccessStyle = { backgroundColor: '#43a047', color: '#FFF' }
const toastErrorStyle = { backgroundColor: '#e53935', color: '#FFF' }
const toastMessageStyle = { display: 'flex', alignItems: 'center' }
const toastActionIconStyle = { marginRight: 6 }
const toastExitIconStyle = { color: '#FFF' }
const toastAnchor: SnackbarOrigin = { vertical: 'bottom', horizontal: 'right' }
const resetCounter = 4000;

export default class Composer extends React.Component<any, ComposerState> {
    state = initialState;
    private setField = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            [name]: event.target.value,
        });
    };
    private sendMail = () => {
        fetch(`api/Mail`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sender: "admin@cratemail.org",
                recipient: this.state.to,
                mailSubject: this.state.subject,
                bodyPlain: this.state.message
            })
        })
        .then(response => response.json())
        .then((data: Response) => {
            if (data.result) {
                this.setState({ ...this.state, success: true });
                setTimeout(() => this.setState({ ...initialState }), resetCounter);
            } else {
                this.setState({ ...this.state, error: true, log: data.log });
            }
        });
    }
    private toastClose = () => {
        this.setState({ ...this.state, success: false, error: false });
    };
    public render() {
        return (
            <React.Fragment>
                <Grid container spacing={3} style={{ padding: 20 }}>
                    <Grid item xs={12} md={12}>
                        <TextField id="to" label="To" fullWidth
                            value={this.state.to} 
                            onChange={this.setField('to')} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField id="cc" label="CC" fullWidth
                            value={this.state.cc} 
                            onChange={this.setField('cc')} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField id="bcc" label="BCC" fullWidth
                            value={this.state.bcc} 
                            onChange={this.setField('bcc')} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField id="subject" label="Subject" fullWidth
                            value={this.state.subject} 
                            onChange={this.setField('subject')} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField id="message" label="Message" fullWidth multiline
                            value={this.state.message} 
                            onChange={this.setField('message')} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={this.sendMail}
                            variant="contained"
                            color="primary">
                            Send
                        </Button>
                    </Grid>
                </Grid>
                <Snackbar open={this.state.success}
                    onClose={this.toastClose}
                    anchorOrigin={toastAnchor}>
                    <SnackbarContent style={toastSuccessStyle}
                        message={
                            <span style={toastMessageStyle}>
                                <CheckCircleIcon style={toastActionIconStyle} />
                                <span>Message Sent!</span>
                            </span>
                        }
                        action={
                            <IconButton onClick={this.toastClose}>
                                <CloseIcon style={toastExitIconStyle} />
                            </IconButton>
                        }
                    />
                </Snackbar>
                <Snackbar open={this.state.error}
                    onClose={this.toastClose}
                    anchorOrigin={toastAnchor}>
                    <SnackbarContent style={toastErrorStyle}
                        message={
                            <span style={toastMessageStyle}>
                                <ErrorIcon style={toastActionIconStyle} />
                                Unable to Send. {this.state.log}
                            </span>
                        }
                        action={
                            <IconButton onClick={this.toastClose}>
                                <CloseIcon style={toastExitIconStyle} />
                            </IconButton>
                        }
                    />
                </Snackbar>
            </React.Fragment>
        );
    }
}