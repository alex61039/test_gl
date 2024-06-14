export default class ActionDto {
    id?: number;
    createdAt:Date;
    updatedAt: Date;
    name_action: string;
    number_of_gifts: number;
    taking_a_gift: number;
    receiving_a_gift: number;
    description: string;
    card_numbers: string;
    giftId?: number

    constructor(model: any) {
        this.id = model.id;
        this.createdAt = model.createdAt;
        this.updatedAt = model.createdAt;
        this.name_action = model.name_action;
        this.number_of_gifts = model.number_of_gifts;
        this.receiving_a_gift = model.receiving_a_gift;
        this.taking_a_gift = model.taking_a_gift;
        this.card_numbers = model.card_numbers;
        this.description = model.description;
        this.giftId = model.giftId

    }

}
