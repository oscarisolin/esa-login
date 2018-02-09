import { debug } from '@ember/debug';

export default function(db, request) {
    debug(request);
    let response = {
        access_token: 'this.token.man'
    };
    return response;
}