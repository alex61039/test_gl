import React, {useState, useEffect} from "react";
import {useGetAllActionsQuery, useLazyGetAllActionsQuery, useLazySearchActionByNameQuery} from './store/api'
import {CustomTable} from './components/actionsAll'
import {IActions, ISearch} from './models/actionsType'
import {SearchAction} from "./components/searchAction";


const App = () => {

    // Текущая страница при пагинации
    const [currentPage, setPage] = useState<number>(1);

    // Рассылки на 1 страницу
    const [action, setAction] = useState<IActions[]>([]);

    // Всего рассылок в базе
    const [count, setCount] = useState(0);

    // Поиск
    const [search, setSearch] = useState('')

    const [getActions, {data, error}] = useLazyGetAllActionsQuery();
    const [getSearchAction, {data: dataSearch, error: errorSearch}] = useLazySearchActionByNameQuery();

    const handleChangePage = (page: number) => {
        setPage(page);
    }
    const handleSearch = (str: string) => {
        setSearch(str);
    }


    useEffect(() => {
        if (search.length > 0) {
            let arg = {} as ISearch;
            arg.searchStr = search;
            arg.page = currentPage
            getSearchAction(arg);
        }
    }, [search, currentPage]);

    useEffect(() => {
        getActions(currentPage)
    }, [currentPage])

//    console.log("<<Page>>", currentPage)
  //  console.log("<<TYPE>>", typeof currentPage)
    return (
        <div >
            <h1 style={{display:'flex', flex:1, justifyContent:'center', marginBottom:20}}>тест</h1>
            <SearchAction setSearch={handleSearch}/>
            {
                search.length > 0
                ?
                    dataSearch&&dataSearch.items.length > 0
                    ?
                        dataSearch&&<CustomTable count={dataSearch!.count._all}
                                     currentPage={currentPage}
                                     actionsArray={dataSearch!.items}
                                     onChangePage={handleChangePage}/>
                        :
                        <>
                            <h3>По вашему запросу ничего не найдено . . . .</h3>
                        </>
                    :

                   data&&<CustomTable count={data.count._all}
                                         currentPage={currentPage}
                                         actionsArray={data.items}
                                         onChangePage={handleChangePage}/>
            }
        </div>
    )
}

export default App;
