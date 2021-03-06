// Initial values for McCool Math app state

const INITIAL_TIMER_STATE = {
    time: null,
    runTimer: false
};

const INITIAL_PROB_STATE = {
    latex: null, 
    problemType: null, 
    args: null,
    userAnswer: null,
    correctAnswer: null, 
    status: null,
    previousUserAnswers: []
};

const INITIAL_SCORE_STATE = {
    correct: 0, 
    attempts: 0
};

const INITIAL_SETTING_STATE = {
    editingMode: false,
    mode: 'practice',
    timerType: null,
    timerStart: null,
    warningLength: null,
    goalNumProblems: null
}

export {INITIAL_TIMER_STATE, INITIAL_PROB_STATE, INITIAL_SCORE_STATE, INITIAL_SETTING_STATE};