import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


interface IConfirmDialog{
    setConfirmDialog: (arg:boolean) => void
    setSaveAction: (arg:boolean) => void
}
export const ConfirmationDialog = (props: IConfirmDialog) => {
    const [open, setOpen] = React.useState(false);
    const {setConfirmDialog, setSaveAction} = props


    const handleClose = () => {
        setConfirmDialog(false)
    };
    const handleSaveAction = () => {
        setSaveAction(true)
        setConfirmDialog(false)
    }

    return (
        <div>
            <Dialog
                open
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Подтвердите создание новой рассылки
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant={'outlined'} onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveAction} color="primary" autoFocus>
                        Сохранить рассылку
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
