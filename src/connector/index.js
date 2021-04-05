export class Connector {
    constructor(baseUrl) {
        this._baseUrl = baseUrl || "";
        this._handleError = (e) => console.log(e);
        this._handleNetworkChange = (e) => console.log("network status changed");
        this._cache = new Map();
        window.addEventListener("online", this._handleNetworkChange);
        window.addEventListener("offline", this._handleNetworkChange);

        this.joinWithBase= this.joinWithBase.bind(this)
    }
    set baseUrl(url) {
        this._baseUrl = url;
    }

    get baseUrl() {
        return this._baseUrl;
    }

    set onError(errorHandler) {
        this._onError = errorHandler;
    }


    set onNetworkChange(handler) {
        this._handleNetworkChange = handler;

        window.removeEventListener("online", this._handleNetworkChange);
        window.removeEventListener("offline", this._handleNetworkChange);


        window.addEventListener("online", handler);
        window.addEventListener("offline", handler);
    }

    set cache(cacheWrapper) {
        this._cache = cacheWrapper;
    }

    async _sendReq(req, options) {
        const response = await fetch(req)
        if (response.ok) {
            if (options.onSuccess) {
                options.onSuccess(response)
            }
            return response.json()
        } else {
            this._handleError(options.response)
        }
    }

    async get(url, options = {}) {

        const request = new Request(this.joinWithBase(url), {
            mode: "cors"
        })

        if (!options.noCache) {
            if (this._cache.has(url)) return this._cache.get(url)
            else {
                let result = await this._sendReq(request, options);
                this._cache.set(url, result);
                return result;
            }
        } else {
            return await this._sendReq(request, options)
        }
 
    }

    async post(url, payload, options = {}) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })

        if (response.ok) {
            if (options.onSuccess) {
                options.onSuccess(response)
            }
            return response.json()
        } else {
            this._handleError(options, response)
        }
    }

    _handleError(options, response) {
        if (options.onError) {
            options.onError(response)
        } else {
            this._onError(response)
        }
    }

    joinWithBase(url) {
        return Connector.joinUrl(this._baseUrl, url);
    }

    static joinUrl(baseUrl, relativeUrl) {
        return new URL(relativeUrl, baseUrl).href;
    }
}

export default new Connector()