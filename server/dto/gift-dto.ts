export  default  class GiftDto {
    id:number;
    name:string;
    amount:number;
    gift_value:number;
    end_date_gift:Date;
    actions?:string[]

    constructor(model:any) {
        this.id = model.id;
        this.name = model.name;
        this.amount = model.amount;
        this.gift_value = model.gift_value;
        this.end_date_gift = model.end_date_gift;
        this.actions = model.actions;
    }

}
