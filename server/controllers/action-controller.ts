const actionService = require('../services/action-service');

export async function getActionsAll(req:any, res:any, next:any) {
    try{
        var page = req.query.page;
        if(page === ""){
            page = 1;
        }else {
            page = +req.query.page;
        }
        const data = await actionService.getActionsAllPagination(page);
        return res.json(data);
    }catch (e) {
        next(e);
    }
}

export async function createAction(req:any, res:any, next:any) {
    try{
        const action = req.body;
        const data = await actionService.createAction(action);
        return res.json(data)
    }catch (e) {
        next(e)
    }
}

export async function getActionById(req:any, res:any, next:any) {
    try{
        const id = req.params.id;
        const data = await actionService.getActionById(+id);
        return res.json(data)
    }catch (e) {
        next(e)
    }
}

export async function deleteAction(req:any, res:any, next:any) {
    try{
        const id = req.params.id;
        const data = await actionService.deleteAction(+id);
        return res.json(data);
    }catch (e) {
        next(e);
    }
}

export async function updateAction(req:any,res:any,next:any) {
    try{
        const action = req.body;
        const data = await actionService.updateAction(action);
        return res.json(data)
    }catch (e) {
        next(e);
    }
}

export async function searchAction(req:any, res:any, next:any) {
    try{
        const search = req.query.name;
        const page = +req.query.page;
        const data = await actionService.searchAction(search, page);
        return res.json(data);
    }catch (e) {
        next(e);
    }
}
