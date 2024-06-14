import React, {useState, useEffect} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button, Container} from "@material-ui/core";
import {TextField, Typography} from "@material-ui/core";
import {Formik, useFormik, Form} from 'formik';
import * as yup from 'yup';
import {IGift} from '../../models/actionsType'
import {IActions} from "../../models/actionsType";
import {SelectGift} from '../../components/selectGift';
import {ConfirmationDialog} from '../confirmationDialog'
import {countDay} from '../../helpers'
import {useCreateActionMutation, useUpdateActionMutation} from '../../store/api'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: 600,
            flexGrow: 1,
            minWidth: 500,
            transform: 'translateZ(5)',
            // The position fixed scoping doesn't work in IE 11.
            // Disable this demo to preserve the others.
            '@media all and (-ms-high-contrast: none)': {
                display: 'none',
            },
        },
        modal: {
            display: 'flex',
            padding: theme.spacing(1),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
        },
        paper: {
            width: 700,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            borderRadius: 14,
           boxShadow: theme.shadows[8],
            padding: theme.spacing(2, 4, 3),
        },
      /*  btn: {
            '&:disabled': { display: 'none' }
        }*/

    }),
);

interface IActionModal{
    setShowModal: (arg:boolean) => void,
    gifts: IGift[],
    oldAction?: IActions,
    editAction: boolean
}


export const ActionModal = (props: IActionModal) => {

    var newAction = {} as IActions;
    const {setShowModal, gifts, oldAction, editAction} = props;


    const classes = useStyles();
    const rootRef = React.useRef<HTMLDivElement>(null);

    const [createAction, {data, error}] = useCreateActionMutation();
    const [updateAction, {data: updData, error: updError}] = useUpdateActionMutation();

    const [gift, setGift] = useState<string[]>([]);
    const [action, setAction] = useState<IActions>({} as IActions);
    const handleGift = (item: string[]) => {
        setGift(item);
    }
    const [showDialog, setDialog] = useState(false)
    const handleDialog = () => {
        setDialog(true)
    }

    const [showConfirmationDialog, setConfirmDialog] = useState(false)
    const [saveAction, setSaveAction] = useState(false)
    const handleChangeInput = () => {
       formik.setFieldValue("newGift", gift[1])
    };

    useEffect( () => {
        handleChangeInput();
    }, [gift]);


    useEffect( () => {
        if(editAction){
            gift[0] = oldAction!.gift!.id.toString()
            gift[1] = oldAction!.gift!.name
            gift[2] = oldAction!.gift!.amount.toString()
            gift[3] = oldAction!.gift!.gift_value.toString()
            gift[4] = oldAction!.gift!.end_date_gift.toString()
        }
    }, [editAction])

    var rg =  /^(?:\d\,?)+$/;

    const validSchema = yup.object().shape({
        nameAction: yup.string()
            .min(5)
            .max(40)
            .required("Поле является обязательным. Введите наименование акции"),
        newGift: yup.string()
            .required("Поле является обязательным. Выберите из списка подарок"),
        valueGift: yup.number()
            .required("Error")
            .positive()
            .nonNullable()
            .test("valueGift", (value) => {
                const val = value <= Number(gift[2]);
                return val === true
            })
            .integer(),

        taking_a_gift: yup.number()
            .required("Не менее двух дней до сгорания подарка")
            .positive()
            .test('taking_a_gift', "Не менее двух дней до сгорания подарка", (value) => {
                const diffDay = countDay(gift[4], value);
                const val = diffDay >= 2;
                return val === true;
            })
            .integer(),
        receiving_a_gift: yup.number()
            .required("Не менее двух дней до сгорания подарка")
            .positive()
            .integer()
            .test('receiving_a_gift', "Не менее двух дней до сгорания подарка",(value) => {
                const diffDay = countDay(gift[4], value);
                const val = diffDay >= 2;
                return val === true;
            }),
        description: yup.string()
            .max(500)
            .required("Поле является обязательным"),
        card_numbers: yup.string()
            .max(5000)
            .matches(rg, "Только числа")
            .required("Поле является обязательным"),
    });
    const initValuesFormik = () => {
        if( Object.keys(oldAction!).length !== 0){

            return {
                actionId: oldAction!.id,
                nameAction: oldAction!.name_action,
                newGift: oldAction!.gift!.name!,
                valueGift: oldAction!.number_of_gifts,
                taking_a_gift: oldAction!.taking_a_gift,
                receiving_a_gift: oldAction!.receiving_a_gift,
                description: oldAction!.description,
                card_numbers: oldAction!.card_numbers
            }
        } else {
            return {
                nameAction: "",
                newGift: "",
                valueGift: 1,
                taking_a_gift: 1,
                receiving_a_gift: 1,
                description: "",
                card_numbers: ""
            }
        }
    }

    const formik = useFormik({
        initialValues: initValuesFormik() ,
        validationSchema: validSchema,
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: true,


        onSubmit: (values, {resetForm}) => {
            if (formik.isValid) {
                if (!editAction) {
                    newAction.createdAt = new Date();
                }else {
                    newAction.id = oldAction!.id;
                    newAction.createdAt = oldAction!.createdAt;
                }
                newAction.name_action = formik.values.nameAction;
                newAction.updatedAt = new Date();
                newAction.number_of_gifts = formik.values.valueGift;
                newAction.receiving_a_gift = formik.values.receiving_a_gift;
                newAction.taking_a_gift = formik.values.taking_a_gift;
                newAction.description = formik.values.description;
                newAction.card_numbers = formik.values.card_numbers;
                newAction.giftId = Number(gift[0]);

                setAction(newAction);
                setConfirmDialog(true);
            }
        },
    });

    useEffect( () => {
        if(saveAction){
            if(!editAction){
                createAction(action);
            }else {
                updateAction(action);
            }
            setTimeout( ()=> {
                setShowModal(false);
            }, 200);
        }
    }, [action, saveAction, editAction])


    return (
        <div className={classes.root} ref={rootRef}>
            <Modal
                 disablePortal
                 disableEnforceFocus
                disableAutoFocus
                open
                aria-labelledby="server-modal-title"
                aria-describedby="server-modal-description"
                className={classes.modal}
                container={() => rootRef.current}
            >
                <div className={classes.paper}>

                        {
                            editAction ? <h3>Редактировать акцию</h3> : <h3>Новая акция</h3>
                        }

                        <form onSubmit={formik.handleSubmit}>
                            <Typography>Название рассылки</Typography>
                            <TextField id="outlined-basic"
                                       name={'nameAction'}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={formik.values.nameAction}
                                       error={formik.touched.nameAction && Boolean(formik.errors.nameAction)}
                                       helperText={formik.touched.nameAction&&formik.errors.nameAction}
                                       variant={'outlined'}
                                       placeholder={'Введите наименование рассылки'}
                                       style={{width: 500, marginBottom:20}} type={'text'} autoFocus/>

                            <Typography>Выбор подарка</Typography>
                            <TextField onClick={handleDialog}
                                       name={'newGift'}
                                       onChange={ handleChangeInput }
                                       onBlur={formik.handleBlur}
                                       value={  formik.values.newGift}
                                       error={formik.touched.newGift && Boolean(formik.errors.newGift)}
                                       helperText={formik.touched.newGift&&formik.errors.newGift}
                                       variant={'outlined'}
                                       style={{width: 500, marginBottom:20}}
                                       placeholder={"Кликните для выбора подарка из списка"}

                                       />
                            <div>
                                {
                                   showDialog&& <SelectGift gifts={gifts} onChangeGift={handleGift} setDialog = {setDialog} />
                                }

                            </div>

                            <Typography>Количество подарков</Typography>
                            <TextField id="outlined-basic"
                                       name={'valueGift'}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={formik.values.valueGift}
                                       error={formik.touched.valueGift && Boolean(formik.errors.valueGift)}
                                       helperText={formik.touched.valueGift&&formik.errors.valueGift}
                                       variant={'outlined'}
                                       placeholder={'Введите количество подарков'}
                                       style={{width: 500, marginBottom:20}} type={"number"}/>

                            <Typography>Количество дней на взятие подарка</Typography>
                            <TextField id="outlined-basic"
                                       name={'taking_a_gift'}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={formik.values.taking_a_gift}
                                       error={formik.touched.taking_a_gift&&Boolean(formik.errors.taking_a_gift)}
                                       helperText={formik.touched.taking_a_gift&&formik.errors.taking_a_gift}
                                       variant={'outlined'}
                                       placeholder={'Введите кол-во дней на взятие подарка'}
                                       style={{width: 500, marginBottom:20}} type={'number'}/>

                            <Typography>Количество дней на получение подарка</Typography>
                            <TextField id="outlined-basic"
                                       name={'receiving_a_gift'}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={formik.values.receiving_a_gift}
                                       error={formik.touched.receiving_a_gift&&Boolean(formik.errors.receiving_a_gift)}
                                       helperText={formik.touched.receiving_a_gift&&formik.errors.receiving_a_gift}
                                       variant={'outlined'}
                                       placeholder={'Введите кол-во дней на получение подарка'}
                                       style={{width: 500, marginBottom:20}} type={'number'}/>

                            <Typography>Описание акции</Typography>
                            <TextField id="outlined-basic"
                                       name={'description'}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={formik.values.description}
                                       error={formik.touched.description&&Boolean(formik.errors.description)}
                                       helperText={formik.touched.description&&formik.errors.description}
                                       variant={'outlined'}
                                       placeholder={'Опишите акцию'}
                                       style={{width: 500, marginBottom:20}} type={'text'}/>

                            <Typography>Номера карт</Typography>
                            <TextField id="outlined-basic"
                                       name={'card_numbers'}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={formik.values.card_numbers}
                                       error={formik.touched.card_numbers&&Boolean(formik.errors.card_numbers)}
                                       helperText={formik.touched.card_numbers&&formik.errors.card_numbers}
                                       variant={'outlined'}
                                       placeholder={'Введите номера карт'}
                                       style={{width: 500}}/>
                            <Container style={{marginTop:20}}>
                                <Button variant={'contained'} color={'primary'} onClick={() => setShowModal(false)} style={{marginRight: 20}}>Close</Button>
                                <Button variant={'contained'} color={'primary'} disabled={!formik.isValid} type={'submit'} >Записать</Button>
                            </Container>

                        </form>

                </div>
            </Modal>
            {
                showConfirmationDialog && <ConfirmationDialog setConfirmDialog={setConfirmDialog}
                                                              setSaveAction={setSaveAction}/>
            }

        </div>
    );
}
