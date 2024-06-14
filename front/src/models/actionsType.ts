export interface IGift {
    id:number;
    name:string;
    amount:number;
    gift_value:number;
    end_date_gift:Date;
    actions?:string[];
}
export interface IActions{
    id?: number;
    createdAt:Date;
    updatedAt: Date;
    name_action: string;
    number_of_gifts: number;
    taking_a_gift: number;
    receiving_a_gift: number;
    description: string;
    card_numbers: string;
    giftId?: number;
    gift?:  IGift;
}

export interface IActionData{
    count: number;
    currentPage: number;
    onChangePage: (page: number) => void;
    actionsArray: IActions[];
}

export interface ISearch {
    searchStr: string;
    page: number
}


