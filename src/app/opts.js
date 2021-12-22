const opts = {
    "integers": {
        text: "Integer Operations",
        options:[
            {name:'add', text: 'Add', paramStr: "type=add", apiParamsStr: "type=add"},
            {name:'sub', text: 'Subtract', paramStr: "type=sub", apiParamsStr: "type=sub"},
            {name:'mult', text: 'Multiply', paramStr: "type=mult", apiParamsStr: "type=mult"},
            {name:'div', text: 'Divide', paramStr: "type=div", apiParamsStr: "type=div"},
            // {name:'all', text: 'All', paramStr: "type=all"}
            {name:'all', text: 'All', paramStr: ""}

        ],
        defaultOption: "all",
        graphing: false
    }, 
    "orderofops": {
        text: "Order of Operations",
        options: [
            {name:'l1', text: 'Level 1', paramStr: "n=3", apiParamsStr: "n=3"},
            {name:'l2', text: 'Level 2', paramStr: "n=4", apiParamsStr: "n=4"},
            {name:'l3', text: 'Level 3', paramStr: "n=5", apiParamsStr: "n=5"},
        ],
        defaultOption: "l2",
        graphing: false
    },
    "lineareqn": {
        text: "Linear Equations",
        options: [
            {name:'graph', text: 'Graph Line', paramStr: "type=graph", apiParamsStr: "type=graph"},
            {name:'eqn', text: 'Write Equation', paramStr: "type=equation", apiParamsStr: "type=equation"},
        ],
        defaultOption: "graph",
        graphing: true
    }
}

export default opts;