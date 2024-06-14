import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {TextField} from "@material-ui/core";
import {IGift} from "../../models/actionsType";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import * as yup from 'yup'
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            width: 780
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 600,
        },
        table: {
            minWidth: 600,
        },
        row: {
            height: "auto",
            "&:hover": {background: 'lightgray'},
            cursor: 'pointer'
        }
    }),
);

interface ISelectGifts {
    gifts: IGift[],
    onChangeGift: (item: string[]) => void
    setDialog: (arg:boolean) => void
}


export const SelectGift = (props: ISelectGifts) => {
    const [valueGift, setValue] = useState<string[]>([])
    const {gifts, onChangeGift, setDialog} = props
    const arr: string[] = [];


    const classes = useStyles();
    //const [open, setOpen] = React.useState(false);

 /*   const handleClickOpen = () => {
        setOpen(true);
    };*/

    const handleClose = () => {
      /*  setOpen(false);*/
        setDialog(false)
    };
    const handleClick = (e: React.ChangeEvent<unknown>) => {
        e.preventDefault();
        e.stopPropagation();

        let nGift = e.currentTarget as HTMLTableRowElement
        for (var i = 0; i < nGift!.cells.length; i++) {
            let temp = nGift && nGift.cells.item(i)
            arr.push(temp!.innerText);
        }
        setValue(arr);
        onChangeGift(arr);
        handleClose();
    }


    return (
        <div>

            <FormControl>
                <Dialog open>
                    <DialogTitle>Выбор подарка</DialogTitle>
                    <DialogContent>
                        <form className={classes.container}>

                            <TableContainer component={Paper}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell align="right">Наименование</TableCell>
                                            <TableCell align="right">Кол-во</TableCell>
                                            <TableCell align="right">Стоимость</TableCell>
                                            <TableCell align="right">Дата окончания</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {gifts && gifts.map((row) => (
                                            <TableRow key={row.id} className={classes.row} onClick={handleClick}>
                                                <TableCell component="th" scope="row">
                                                    {row.id}
                                                </TableCell>
                                                <TableCell align="right">{row.name}</TableCell>
                                                <TableCell align="right">{row.amount}</TableCell>
                                                <TableCell align="right">{row.gift_value}</TableCell>
                                                <TableCell align="right">{row.end_date_gift}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <DialogActions>
                                <Button variant={'contained'} color={'default'} onClick={handleClose}>Cancel</Button>
                            </DialogActions>

                        </form>
                    </DialogContent>

                </Dialog>
            </FormControl>
        </div>
    );
}
