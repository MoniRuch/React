import '../App.css';
import Header from "./Header";
import Main from "./Main";
import {useEffect, useReducer} from "react";
import Loader from "./Loader";
import Error from "./Error";
import LandingPage from "./LandingPage";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import ResultScreen from "./ResultScreen";
import Timer from "./Timer";

const SECS_PER_QUESTION = 30

const initialState = {
    questions: [],
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    highestScore: 0,
    secondsRemaining: null
}

function reducer(state, action) {
    switch (action.type){
        case 'dataReceived' : return {...state, questions: action.payload, status: 'ready'}
        case 'dataFailed' : return {...state, status: 'error'}
        case 'start': return {...state, status: 'active', secondsRemaining: state.questions.length * SECS_PER_QUESTION}
        case 'newAnswer': const question = state.questions.at(state.index)
            return {
            ...state,
            answer: action.payload,
            points: action.payload === question.correctOption ? state.points + question.points : state.points
        }
        case 'nextQuestion': return {...state, index: state.index + 1, answer: null}
        case 'finished': return {...state, status: 'finished', answer: null, highestScore: state.points > state.highestScore ? state.points : state.highestScore}
        case 'restart': return {...initialState, questions: state.questions, status: 'ready', highestScore: state.highestScore}
        case 'tick': return {...state, secondsRemaining: state.secondsRemaining = state.secondsRemaining - 1, status: state.secondsRemaining === 0 ? 'finished' : state.status}
        default: throw new Error('Unknown action');
    }
}

function App() {
    const [{questions, status, index, answer, points, highestScore, secondsRemaining}, dispatch] = useReducer(reducer, initialState);
    const numQuestions = questions.length;
    const maxPoints = questions.reduce((prev,cur) => prev + cur.points,0)

    useEffect(() => {
        fetch('http://localhost:8000/questions')
            .then(res => res.json())
            .then(data => dispatch({type: 'dataReceived', payload: data}))
            .catch(() => dispatch({type: 'dataFailed'}))
    },[])
    
    
  return (
    <div className="app">
      <Header />
        <Main>
            {status === 'loading' && <Loader />}
            {status === 'error' && <Error />}
            {status === 'ready' && <LandingPage numQuestions={numQuestions} dispatch={dispatch}/>}
            {status === 'active' && <>
                <Progress numQuestions={numQuestions} points={points} index={index} maxPoints={maxPoints} answer={answer}/>
                <Question question={questions[index]} answer={answer} dispatch={dispatch}/>
                
                <footer>
                    <Timer secondsRemaining={secondsRemaining} dispatch={dispatch}/>
                    <NextButton dispatch={dispatch} index={index} numQuestions={numQuestions} answer={answer}/>
                </footer>
            </>}
            {status === 'finished' && <ResultScreen points={points} maxPoints={maxPoints} highestScore={highestScore} dispatch={dispatch}/> }
        </Main>
        
    </div>
  );
}

export default App;
