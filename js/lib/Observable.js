var Observable = {


    clone: function(o){
        if(o == null || typeof(o) != 'object')
            return o;

        var temp = o.constructor(); // changed

        for(var key in o)
            temp[key] = Observable.clone(o[key]);
        return temp;
    },

    init: function(opt){
        opt.public.listeners = {};

        opt.public.listen = function(paramName, callback){
            if(Object.prototype.toString.call(paramName) === '[object Array]')
                for(var p in paramName){
                    opt.public.listenOne(paramName[p], callback);
                }
            else
                opt.public.listenOne(paramName, callback);
        };

        opt.public.listenOne = function(paramName, callback){
            if(!opt.public.listeners[paramName])
                opt.public.listeners[paramName] = [];
            opt.public.listeners[paramName].push(callback);
        };
    },

    setter: function(opt){
        if(opt.private[opt.paramName] == opt.newValue)
            return;

        opt.oldValue = Observable.clone(opt.private[opt.paramName]);

        opt.private[opt.paramName] = opt.newValue;

        for(var listener in opt.public.listeners[opt.paramName]){
            if(opt.caller != opt.public.listeners[opt.paramName][listener])
                opt.public.listeners[opt.paramName][listener](opt);
        }
    },

    adder: function(opt){
        if(opt.private[opt.paramName] == opt.newValue || !opt.private[opt.paramName].push)
            return;

        opt.oldValue = Observable.clone(opt.private[opt.paramName]);

        opt.private[opt.paramName].push(opt.newValue);
        opt.newValue = opt.private[opt.paramName];

        for(var listener in opt.public.listeners[opt.paramName]){
            if(opt.caller != opt.public.listeners[opt.paramName][listener])
                opt.public.listeners[opt.paramName][listener](opt);
        }
    }
};