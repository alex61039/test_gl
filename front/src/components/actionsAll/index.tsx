import React, {useState, useEffect} from "react";
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import {Box, Button, Container, TableHead} from "@material-ui/core";
import {DeleteOutline, EditOutlined} from '@material-ui/icons'
import {Pagination} from "@material-ui/lab";
import {IActions, IActionData} from '../../models/actionsType';
import {ActionModal} from '../newAction/'
import {useLazyGetAllGiftQuery, useLazyGetIdQuery, useDeleteActionMutation} from '../../store/api'


const useStyles1 = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    }),
);

const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});

const useStylesPagin = makeStyles((theme) =>
    createStyles({
        root: {
            '& > * + *': {
                marginTop: theme.spacing(1),
            },
        },
    }),
);


export const CustomTable = (props: IActionData) => {
    const act = {} as IActions;
    const {count, actionsArray, currentPage, onChangePage} = props
    const countItem = Math.ceil(count / 2)
    const classes = useStyles2();
    const [page, setPage] = React.useState(currentPage);
    //
    const [oldAction, setAction] = useState<IActions>({} as IActions)
    //
    const [editAction, setEditAction] = useState(false)
    //
    const [getAllGift, {data: dataGifts, error}] = useLazyGetAllGiftQuery();
    const [getActionById, {data: actionById, error: errorActionById}] = useLazyGetIdQuery();
    const [deleteAction, result] = useDeleteActionMutation();


    const [showModal, setShowModal] = useState(false);
    const handleShow = () => {
        setShowModal(true);
    };
    const handleUpdateAction = async (id: number) => {
        setAction({} as IActions)
        const dt = await getActionById(id);
        setAction(dt.data);
        setEditAction(true);
        handleShow();
    };


    useEffect(() => {
        getAllGift();
    }, [])


    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        onChangePage(value);
    };


    return (
        <>
            <Button onClick={handleShow} type={'button'} variant={'contained'} color={'primary'}
                    style={{marginLeft: 10, height: 35}}>Новая рассылка</Button>


            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                component={'td'}
                                align={"center"}
                                style={{minWidth: 100, fontWeight: 800}}
                            >
                                Название рассылки
                            </TableCell>
                            <TableCell
                                component={'td'}
                                align={"center"}
                                style={{minWidth: 100, fontWeight: 800}}
                            >
                                Дата рассылки
                            </TableCell>
                            <TableCell
                                component={'td'}
                                align={"center"}
                                style={{minWidth: 100, fontWeight: 800}}
                            >
                                Кол-во отправленных подарков
                            </TableCell> <TableCell
                            component={'td'}
                            align={"center"}
                            style={{minWidth: 100, fontWeight: 800}}
                        >
                            Редактировать
                        </TableCell>
                            <TableCell
                                component={'td'}
                                align={"center"}
                                style={{minWidth: 100, fontWeight: 800}}
                            >
                                Удалить
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            actionsArray && actionsArray.map((row: any) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row" style={{width: 100}}>
                                        {row.name_action}
                                    </TableCell>
                                    <TableCell style={{width: 100}} align="right">
                                        {row.updatedAt}
                                    </TableCell>
                                    <TableCell style={{width: 100}} align="right">
                                        {row.number_of_gifts}
                                    </TableCell>
                                    <TableCell style={{width: 100}} align="right">
                                        <IconButton>
                                            <EditOutlined onClick={() => handleUpdateAction(row.id)}/>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell style={{width: 100}} align="right">
                                        <IconButton>
                                            <DeleteOutline onClick={() => {
                                                deleteAction(row.id)
                                            }}/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}

                    </TableBody>

                </Table>

            </TableContainer>

            <Box style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
                <Pagination count={countItem}
                            onChange={handleChange}
                            page={page} variant={"outlined"}
                            shape={'rounded'}/>
            </Box>

            <div>
                {
                    showModal && <ActionModal setShowModal={setShowModal}
                                              gifts={dataGifts}
                                              oldAction={oldAction && oldAction}
                                              editAction={editAction}
                    />
                }
            </div>

        </>
    );
}

