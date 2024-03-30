(function(global) {
    let LiteGraph = global.LiteGraph;

    class ArrayCreate {
        static title = "Array Create";

        constructor(o) {
            this.addInput("Map Function", "function");
            this.addProperty("length", 1);
            this.addOutput("Array", "array");
            this.addOutput("Length", "number");
            this.addWidget("number", "length", 1, "length", {min: 0.0, step: 10.0, precision: 0});
        }

        onPropertyChanged(name, value) {
            if (name == "length") {
                this.properties.length = value;
            }
        }

        onExecute() {
            /** @type {number} */
            let length = this.properties.length;
            length = parseInt(length);
            /** @type {ArrayFunctionBase} */
            let widget = this.getInputData(0);
            let output;
            let func;
            if(widget){
                func = widget._func;
                if(func){
                    try{
                        output = new Array(length).fill(null).map(func);
                    }catch(err){
                        widget.setError(err);
                        this.setOutputData(0, null); // clear output
                        this.setOutputData(1, null);
                        return;
                    }
                }
            }else{
                output = new Array(length);
            }
            this.setOutputData(0, output);
            this.setOutputData(1, output.length);
        }
    }

    LiteGraph.registerNodeType("Array/Create", ArrayCreate);

    class ArrayFrom {
        static title = "Array From Variable";

        constructor(o) {
            this.addInput("Map Function", "function");
            this.addProperty("variable", "");
            this.addOutput("Array", "array");
            this.addOutput("Length", "number");
            this.addWidget("text", "variable", "", "variable");
        }

        onPropertyChanged(name, value) {
            if (name == "variable") {
                this.properties.variable = value;
            }
        }

        onExecute() {
            /** @type {string} */
            let variable = this.properties.variable;
            if (!variable) {
                return;
            }
            let v = global[variable];
            if (!v) {
                return;
            }
            /** @type {ArrayFunctionBase} */
            let widget = this.getInputData(0);
            let output;
            let func;
            if(widget){
                func = widget._func;
                if(func){
                    try{
                        output = Array.from(v, func);
                    }catch(err){
                        widget.setError(err);
                        this.setOutputData(0, null); // clear output
                        this.setOutputData(1, null);
                        return;
                    }
                }
            }else{
                output = Array.from(v);
            }
            this.setOutputData(0, output);
            this.setOutputData(1, output.length);
        }
    }

    LiteGraph.registerNodeType("Array/From", ArrayFrom);
    
    class ArrayMap{
        static title = "Array Map";

        constructor(o){
            this.addInput("Array", "array");
            this.addInput("Function", "function");
            this.addOutput("Mapped Array", "array");
            this.addOutput("Length", "number");
        }

        onExecute = function(){
            /** @type {Array} */
            let array = this.getInputData(0);
            /** @type {ArrayFunctionBase} */
            let widget = this.getInputData(1);
            if (!array || !widget) {
                return;
            }
            /** @type {Function} */
            let func = widget._func
            if(!func) return;
            let output
            try{
                output = array.map(func);
            }catch(err){
                widget.setError(err);
                this.setOutputData(0, null); // clear output
                this.setOutputData(1, null);
                return;
            }
            this.setOutputData(0, output);
            this.setOutputData(1, output.length);
        }
    }

    LiteGraph.registerNodeType("Array/Map", ArrayMap);

    class ArrayFilter{
        static title = "Array Filter";

        constructor(o){
            this.addInput("Array", "array");
            this.addInput("Function", "function");
            this.addOutput("Filtered Array", "array");
            this.addOutput("Length", "number");
        }

            onExecute = function(){
            /** @type {Array} */
            let array = this.getInputData(0);
            /** @type {ArrayFunctionBase} */
            let widget = this.getInputData(1);
            if (!array || !widget) {
                return;
            }
            /** @type {Function} */
            let func = widget._func;
            if(!func) return;
            let output;
            try{
                output = array.filter(func);
            }catch(err){
                widget.setError(err);
                this.setOutputData(0, null); // clear output
                this.setOutputData(1, null);
                return;
            }
            this.setOutputData(0, output);
            this.setOutputData(1, output.length);
        }
    }

    LiteGraph.registerNodeType("Array/Filter", ArrayFilter);

    class ArrayReduce{
        static title = "Array Reduce";

        constructor(o){
            this.addInput("Array", "array");
            this.addInput("Function", "function");
            this.addInput("Initial Value", "number")
            this.addOutput("Reduced Value", "number");
        }

        onExecute = function(){
            /** @type {Array} */
            let array = this.getInputData(0);
            /** @type {ArrayFunctionBase} */
            let widget = this.getInputData(1);
            if (!array|| !widget) {
                return;
            }
            /** @type {Function} */
            let func = widget._func;
            if(!func) return;
            let initialvalue = this.getInputData(2);
            let output;
            try{
                if(initialvalue == undefined){
                    output = array.reduce(func);
                }
                else{
                    output = array.reduce(func, initialvalue);
                }
            }catch(err){
                widget.setError(err);
                this.setOutputData(0, null); // clear output
                return;
            }
            this.setOutputData(0, output);
        }
    }


    LiteGraph.registerNodeType("Array/Reduce", ArrayReduce);

    class ArraySort {
        static title = "Array Sort";

        constructor(o) {
            this.addInput("Array", "array");
            this.addInput("Function", "function");
            this.addOutput("Sorted Array", "array");
            this.addOutput("Length", "number");
        }

        onExecute() {
            /** @type {Array} */
            let array = this.getInputData(0);
            if (!array) {
                return;
            }
            /** @type {ArrayFunctionBase} */
            let widget = this.getInputData(1);
            /** @type {Function} */
            let func;
            if (!widget) {
                func = null;
            }else{
                func = widget._func;
            }
            let output;
            if (!func) {
                output = array.sort();
            }else{
                try{
                    output = array.sort(func);
                }catch(err){
                    widget.setError(err);
                    this.setOutputData(0, null); // clear output
                    this.setOutputData(1, null);
                    return;
                }
            }
            this.setOutputData(0, output);
            this.setOutputData(1, output.length);
        }
    }

    LiteGraph.registerNodeType("Array/Sort", ArraySort);

    class ArraySlice {
        static title = "Array Slice";

        constructor(o) {
            this.addInput("Array", "array");
            this.addInput("Start", "number");
            this.addInput("End", "number");
            this.addOutput("Sliced Array", "array");
            this.addOutput("Length", "number");
        }

        onExecute() {
            /** @type {Array} */
            let array = this.getInputData(0);
            /** @type {number} */
            let start = this.getInputData(1);
            /** @type {number} */
            let end = this.getInputData(2);
            if (!array){
                return;
            }
            start = parseInt(start);
            end = parseInt(end);
            if(isNaN(start)) start = undefined;
            if(isNaN(end)) end = undefined;
            let output = array.slice(start, end);
            this.setOutputData(0, output);
            this.setOutputData(1, output.length);
        }
    }

    LiteGraph.registerNodeType("Array/Slice", ArraySlice);

    class ArrayFunctionBase {
        static title = "Array Function Base";

        constructor(o){
            this.addOutput("Function", "function");
            this._func = null;
            this.setOutputData(0, this);
        }
        onExecute() {
            this.setOutputData(0, this);
        }

        setError(err){
            this.boxcolor = "red";
            console.error(err);
        }
    }

    class ArrayFunction extends ArrayFunctionBase{
        static title = "Array Function";

        constructor(o) {
            super(o);
            this.addProperty("number", 0);
            this.numberwidget = this.addWidget("number","arguments",0,"number", {min: 0.0, step: 10.0, precision: 0});
            this.addProperty("code", "return null;");
            this.codewidget = this.addWidget("string","code","return null;","code");
            this._func = new Function("return null;");
        }

        onPropertyChanged(name, value) {
            if (name == "code" || name == "number") {
                try {
                    if(!this.properties.number){
                        this._func = new Function(this.properties.code);
                    }else{
                        let args = [];
                        for(let i = 0; i < this.properties.number; i++){
                            args.push("arg" + i);
                        }
                        this._func = new Function(...args, this.properties.code);
                    }
                    this.boxcolor = null;
                } catch (err) {
                    this.boxcolor = "red";
                    console.error("Error parsing code", err);
                }
            }
        }
    }

    LiteGraph.registerNodeType("Array/Function", ArrayFunction);
})(this);