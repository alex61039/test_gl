const giftDto = require('../dto/gift-dto');
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

export  async function giftAll(){
    const data = await prisma.gift.findMany({
        where:{
            amount: {gt: 0}
        }
    });
    return data;
}

export async function getGiftById(id:number) {
    const gift = await prisma.gift.findUnique({
        where:{
            id: id
        },
        include:{
            actions:true
        }
    });
    return gift;
}
