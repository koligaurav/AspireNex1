import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import data, {answers} from "../database/data";
/** redux Actions */
import * as Action from '../redux/question_reducer';
import { getServerData } from "../helper/helper";

export const useFetchQuestions = () => {
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({ isLoading: false, apiData: [], serverError: null });

    useEffect(() => {
        setGetData(prev => ({ ...prev, isLoading: true }));

        /** async function to fetch backend data */
        (async () => {
            try {
                let question = await data;
              //const q =  await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`, (data)=>data)
              //console.log(q)
                if (question.length > 0) {
                    setGetData(prev => ({ ...prev, isLoading: false }));
                    setGetData(prev => ({ ...prev, apiData: { question, answers } }));

                    /** Dispatch an action */
                    dispatch(Action.startExamAction({ question, answers }));
                } else {
                    throw new Error("No questions available");
                }
            } catch (error) {
                setGetData(prev => ({ ...prev, isLoading: false, serverError: error.message }));
            }
        })();
    }, [dispatch]);

    return [getData, setGetData];
};
/** MoveAction Dispatch function */
export const moveNextAction=()=>async(dispatch)=>{
    try{
        dispatch(Action.moveNextAction())
    } catch(error){
        console.log(error)
    }
}/**PrevAction Dispatch function */
export const movePrevAction=()=>async(dispatch)=>{
    try{
        dispatch(Action.movePrevAction())
    } catch(error){
        console.log(error)
    }
}