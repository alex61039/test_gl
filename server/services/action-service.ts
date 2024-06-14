import ActionDto from "../dto/action-dto";

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

export async function getActionsAllPagination(currentPage: number) {
    let sk = 0;
    if (currentPage !== 1) {
        sk = currentPage * 2 - 2;
    }
    const [items, count] = await prisma.$transaction([
            prisma.action.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                take: 2,
                skip: sk
            }),
            prisma.action.count({
                select: {
                    _all: true
                }
            })
        ]
    )
    return {items, count};
}

export async function getActionById(id:number) {
    const action = await prisma.action.findUnique({
        where: {
            id: id
        },
        include:{
            gift: true
        }
    })
    return action;
}

export async function createAction(action: ActionDto) {


    const countGift = await prisma.gift.findUnique({
        where: {id: action.giftId},
        select: {
            amount: true
        }
    })
    let newCountGift = (countGift.amount - action.number_of_gifts) as number;

    const [newAction, upGift] = await prisma.$transaction([
        prisma.action.create({
            data: action
        }),
        prisma.gift.update({
            where: {id: action.giftId},
            data: {
                amount: newCountGift
            }
        })
    ])
    return {newAction, upGift};
}

export async function updateAction(action: ActionDto) {

    const gift = await prisma.gift.findUnique({
        where: {id: action.giftId}
    })
    gift.amount = action.number_of_gifts;
    const [updtAction, updtGift] = await prisma.$transaction([
        prisma.action.update({
            where: {id: action.id},
            data: action
        }),
        prisma.gift.update({
            where:{id: gift.id},
            data: gift
        })
    ])
    return {updtAction, updtGift};
}

export async function deleteAction(id:number) {
    if(id !== 0){
        const delAction = await prisma.action.delete({
            where: {  id: id   }
        })
        return delAction;
    }
}

export async function searchAction(searchText: string, page: number) {

    let sk = 0;
    if (page !== 1) {
        sk = page * 2 - 2;
    }
    const [items, count] = await prisma.$transaction([
            prisma.action.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                skip: sk,
                take: 2,
                where: {
                    name_action: {
                        contains: searchText
                    }
                }
            }),
            prisma.action.count({
                where: {
                    name_action: {
                        contains: searchText
                    }
                },
                select: {
                    _all: true
                }
            })
        ]
    )

    return {items, count};
}
