const opts = {
    "integers": { 
        opts: [
            {opt:'add', text: 'Add', paramStr: "type=add"},
            {opt:'sub', text: 'Subtract', paramStr: "type=sub"},
            {opt:'mult', text: 'Multiply', paramStr: "type=mult"},
            {opt:'div', text: 'Divide', paramStr: "type=div"},
            {opt:'all', text: 'All', paramStr: ""}
        ],
        default: 'all'
    }, 
    "orderofops": { 
        opts: [
            {opt:'l1', text: 'Level 1', paramStr: "n=3"},
            {opt:'l2', text: 'Level 2', paramStr: "n=4"},
            {opt:'l3', text: 'Level 3', paramStr: "n=5"},
        ],
        default: 'l2'
    } 
}

export {opts};