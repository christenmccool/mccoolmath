const opts = {
    "integers": [
        {name:'add', text: 'Add', paramStr: "type=add", apiParamsStr: "type=add"},
        {name:'sub', text: 'Subtract', paramStr: "type=sub", apiParamsStr: "type=sub"},
        {name:'mult', text: 'Multiply', paramStr: "type=mult", apiParamsStr: "type=mult"},
        {name:'div', text: 'Divide', paramStr: "type=div", apiParamsStr: "type=div"},
        {name:'all', text: 'All', paramStr: "", default: true}
    ], 
    "orderofops": [
        {name:'l1', text: 'Level 1', paramStr: "level=1", apiParamsStr: "n=3"},
        {name:'l2', text: 'Level 2', paramStr: "level=2", apiParamsStr: "n=4", default: true},
        {name:'l3', text: 'Level 3', paramStr: "level=3", apiParamsStr: "n=5"},
    ]
}

export {opts};