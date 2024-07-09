import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/** Custom Hook */
import { useFetchQuestions } from '../hooks/FetchQuestions';
import { updateResultAction } from '../redux/result_reducer';

function Questions({ onChecked }) {
    const [checked, setChecked] = useState(undefined);

    const [{ isLoading, apiData, serverError }] = useFetchQuestions();
    useSelector(state=>console.log(state))
    // Select specific parts of the state
    const question = useSelector(state => state.questions.queue[state.questions.trace]);
    const { trace } = useSelector(state => state.questions);
    const result = useSelector(state => state.result.result);
    const dispatch = useDispatch();

    useEffect(() => {
        // Update checked state to match the saved result for the current question
        if (result[trace] !== undefined) {
            setChecked(result[trace]);
        } else {
            setChecked(undefined);
        }
    }, [trace, result]);

    useEffect(() => {
        console.log({ trace, checked });
        dispatch(updateResultAction({ trace, checked }));
    }, [checked, dispatch, trace]);

    function onSelect(i) {
        onChecked(i);
        setChecked(i);
    }

    // Check if the data is still loading or if there was an error
    if (isLoading) {
        return <h3 className='text-light'>Loading...</h3>;
    }

    if (serverError) {
        return <h3 className='text-light'>{serverError || "Unknown Error"}</h3>;
    }

    if (!question) {
        return <h3 className='text-light'>No question available</h3>;
    }

    return (
        <div>
            <h2 className='text-light'>{question?.question}</h2>
            <ul key={question?.id}>
                {question?.options && question?.options.map((q, i) => (
                    <li key={i}>
                        <input
                            type='radio'
                            value={q}
                            name='options'
                            id={`q${i}-option`}
                            checked={checked === i}
                            onChange={() => onSelect(i)}
                        />
                        <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label>
                        <div className={`check ${checked === i ? 'checked' : ''}`}></div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Questions;
