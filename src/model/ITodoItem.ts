export interface ITodoItem {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    subscribed: boolean;
    jobTitle: string;
    prefix: string;
    suffix: string;
    jobArea: string;
    age: number;
    keyword: string;
    address: string;
    phonenumber: string;
    city: string;
    state: string;
    country: string;
}

export default ITodoItem;
