export default class Request {
    constructor(url, data) {
        this.url = url;
        this.data = data || {};
        this.data.token = Request.token;
    }

    execute() {
        return new Promise((resolve, reject) => {
            this.url(this.data, (error, result) => {
                setTimeout(() => {
                    if(result) {
                        resolve(this.onResponseReady(result));
                    } else {
                        reject(this.onResponseError(error));
                    }
                }, 400);
            });
        })
    }

    /**
     * Function should return result
     * @param result - server response
     */
    onResponseReady(result) {
        return result;
    }

    onResponseError(err) {
        return err;
    }
}