const giftService = require('../services/gift-service')

export async function getAllGifts(req: any, res: any, next: any) {
    try {
        const giftData = await giftService.giftAll();
        return res.json(giftData);
    } catch (e) {
        next(e);
    }
}

export async function getGiftById(req: any, res: any, next: any) {
    try {
        const giftUnique = await giftService.getGiftById(+req.params.id);
        if (giftUnique) {
            return res.json(giftUnique)
        } else {
            throw new Error('Не найден')
        }
    } catch (e) {
        next(e);
    }
}

