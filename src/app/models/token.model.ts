import {Payload} from './payload.model';
export class Token{
    token: string;

    parse(): Payload{
        const data: string = this.token.split('.')[1];
        const payload: string = window.atob(data);
        return JSON.parse(payload);
    }

    isValid(): boolean{
        return this.token && this.parse().exp*1000 > Date.now();
    }
}