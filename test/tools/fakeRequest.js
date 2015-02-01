
var fakeRequestBuilder = (data) => {
    return {
        params: data.params || {},
        body: data.body || {},
        query: data.query || {}
    };
};

class FakeRepsonse {
    constructor(done) {
        this.done = done;
    }
    json(data) {
        this.data = data;
        this.done(this);
        return this;
    }
    end() {
        this.done(this);
        return this;
    }
    status(status) {
        this.status = status;
        return this;
    }
}

var wrapperFnBuilder = (context, contextProperty) => {
    if (typeof  contextProperty == "function") {
        var originalFn = contextProperty.bind(context);
        var wrappedCall = (data) => {
            return new Promise((resolve, reject) => {
                try {
                    originalFn(fakeRequestBuilder(data), new FakeRepsonse(resolve));
                } catch (e) {
                    reject(e);
                }
            });
        };
        var wrappedFn = () => {
            return wrappedCall({});
        };
        wrappedFn.with = wrappedCall;
        return wrappedFn;
    }
    return contextProperty;
};

export const wrap = (context, fnName) => {
    var wrapper = {};
    Object.keys(context).forEach((key) => {
        Object.defineProperty(wrapper, key, {
            get() {
                return wrapperFnBuilder(context, context[key]);
            }
        });
    });
    return wrapper;
};