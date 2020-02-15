export default class Request {
    constructor(url, data) {
        this.url = url;
        this.data = data || {};
        this.data.token = Request.token;
    }

    execute() {
        return new Promise((resolve, reject) => {
            let result = this.url(this.data);
            if(result) {
                resolve(this.onResponseReady(result));
            } else {
                reject(this.onResponseError("Didn't match any data"));
            }

        })
    }

    //virtual function should return result
    onResponseReady(result) {
        return result;
    }

    onResponseError(err) {
        return err;
    }
}