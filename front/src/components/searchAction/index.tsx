import React, {useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, alpha, Theme, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import {Button} from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            marginBottom:30
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.white, 0.55),
            '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.95),
            },
            marginLeft: 0,
            width: '80%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'black',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '42ch',
                '&:focus': {
                    width: '52ch',
                },
            },
        },
    }),
);

interface ISearchAction {
    setSearch: (arg: string)=> void

}
export const SearchAction = (props: ISearchAction) => {
    const {setSearch} = props
    const [strSearch, setStrSearch] = useState('')
    const classes = useStyles();

   const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
       setStrSearch(e.target.value);
   }
   const handleClier = () => {
       setSearch("")
       setStrSearch("")
   }


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>

                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Поиск по названию рассылки …"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            value={strSearch}
                            onChange={handleOnChange}
                        />
                    </div>
                    <Button variant={'contained'}
                            style={{marginLeft:30, backgroundColor:'lightblue'}}
                            onClick={() => setSearch(strSearch)}
                            disabled={strSearch.length ===0}
                    >Найти</Button>
                    <Button variant={'contained'} color={'default'} style={{marginLeft:40}} onClick={handleClier}>Весь список</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
