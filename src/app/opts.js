const opts = {
    "integers": {
        text: "Integer Operations",
        options:[
            {
                name:'add', 
                text: 'Add', 
                paramStr: "type=add", 
                styles: {height: "400px", problemFont: "l", workFont: "m", answerFont: "l"}
            },
            {
                name:'sub', 
                text: 'Subtract', 
                paramStr: "type=sub", 
                styles: {height: "400px", problemFont: "l", workFont: "m", answerFont: "l"}
            },
            {
                name:'mult', 
                text: 'Multiply', 
                paramStr: "type=mult", 
                styles: {height: "400px", problemFont: "l", workFont: "m", answerFont: "l"}
            },
            {
                name:'div', 
                text: 'Divide', 
                paramStr: "type=div", 
                styles: {height: "400px", problemFont: "l", workFont: "m", answerFont: "l"}
            },
            {
                name:'all', 
                text: 'All', 
                paramStr: "", 
                styles: {height: "400px", problemFont: "l", workFont: "m", answerFont: "l"}
            }
        ],
        defaultOption: "all",
        graphing: false
    }, 

    "orderofops": {
        text: "Order of Operations",
        options: [
            {
                name:'l1', 
                text: 'Level 1', 
                paramStr: "level=1", 
                styles: {height: "430px", problemFont: "m", workFont: "s", answerFont: "l"}
            },
            {
                name:'l2', 
                text: 'Level 2',
                paramStr: "level=2", 
                styles: {height: "430px", problemFont: "m", workFont: "s", answerFont: "l"}
            },
            {
                name:'l3', 
                text: 'Level 3', 
                paramStr: "level=3", 
                styles: {height: "430px", problemFont: "s", workFont: "xs", answerFont: "l"}
            }
        ],
        defaultOption: "l2",
        graphing: false
    },

    "lineareqn": {
        text: "Linear Equations",
        options: [
            {
                name:'graph', 
                text: 'Graph Line', 
                paramStr: "type=graph", 
                styles: {height: "500px", problemFont: "m-fixed", workFont: "s", answerFont: "m-fixed"}
            },
            {
                name:'eqn', 
                text: 'Write Equation', 
                paramStr: "type=equation", 
                styles: {height: "500px", problemFont: "m-fixed", workFont: "s", answerFont: "m-fixed"}
            }
        ],
        defaultOption: "graph",
        graphing: true
    }
}

export default opts;