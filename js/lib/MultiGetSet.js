var MultiGetSet = function(opt){

    var getType = function(o) {
      return ({}).toString.call(o).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
    };

    if(!opt.public || !opt.private)
        return opt.public;

    if(opt.handler && opt.handler.init)
        opt.handler.init(opt);

    if(!opt.handler || !opt.handler.setter){
        opt.public.set = function(paramName, newValue){
            opt.private[paramName] = newValue;
        };
    }else{
        opt.public.set = function(paramName, newValue){
            return opt.handler.setter({
                public: opt.public,
                private: opt.private,
                paramName: paramName,
                newValue: newValue,
                caller: arguments.callee.caller
            });
        };
    }


    if(!opt.handler || !opt.handler.getter){
        opt.public.get = function(paramName){
            return opt.private[paramName];
        };
    }else{
        opt.public.get = function(paramName){
            return opt.handler.getter({
                public: opt.public,
                private: opt.private,
                paramName: paramName,
                caller: arguments.callee.caller
            });
        };
    }



    if(!opt.handler || !opt.handler.adder){
        opt.public.add = function(paramName, newValue){
            if(getType(opt.private[paramName])==="array")
                opt.private[paramName].push(newValue);
        };
    }else{
        opt.public.add = function(paramName, newValue){
            if(getType(opt.private[paramName])==="array")
                return opt.handler.adder({
                    public: opt.public,
                    private: opt.private,
                    paramName: paramName,
                    newValue: newValue,
                    caller: arguments.callee.caller
                });
        };
    }

    return opt.public;
};