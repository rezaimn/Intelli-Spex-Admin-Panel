import {UserModel} from './user.model';
import {TokenModel} from './token.model';

export class SigninResultModel {
    user: UserModel;
    token: TokenModel;
    chat_token: string;
}
