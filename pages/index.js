import React, { useState, useEffect, useReducer, useCallback } from 'react'
import { reducer } from '../helpers/reducer'
import { randomUniqueNumber } from '../helpers/utils'
import { fetchMostUsedExercise, fetchSearch, fetchBreak, saveRequet } from '../helpers/request'

import { Layout } from '../components/layout'
import { Break } from '../components/break'
import SearchBar from '../components/input'
import WorkoutName from '../components/input'
import { Workout } from '../components/workout'
import { Duration } from '../components/duration'
import { Exercises } from '../components/exercises'
import { SearchResults } from "../components/searchResults"


//DEBOUNCE
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}
//TRACK WORKOUT OBJECT
const useSave = (workout) => {
    const [save, setSave] = useState({ duration: 0, record: {} })

    useEffect(() => {
        const randomNum = randomUniqueNumber()
        const sum = workout.program.reduce((prev, cur) => prev + (parseInt(cur.fields['Duration (seconds)'] )|| 0) + (parseInt(cur.fields['Rest Between (seconds)'] )|| 0), 0)
        console.log(sum)
        const exercises = [...workout.program.map((w, i) => `${randomNum + i} - ${w.fields.Name}`)]
        setSave(prevSave => ({
            ...prevSave, duration: sum / 60, record: {
                "fields": {
                    "Name": workout.name,
                    "Duration": sum / 60,
                    "Exercises": exercises
                },
            }
        }))
    }, [workout])
    return save;
}
//MAIN COMPONENT
const Home = props => {

    const [state, dispatch] = useReducer(reducer, {
        workout: { program: [], name: '' },
        search: { input: '', isSearching: false, results: [] },
        _break: {},
        error: null,
        success:false,
    });
    const [_break, setBreak] = useState(false)
    const savedRecords = useSave(state.workout)
    const debouncedSearchTerm = useDebounce(state.search.input, 500)

    useEffect(() => {
        let isSubscribed = true
        if (debouncedSearchTerm.length > 3) {
            fetchSearch(debouncedSearchTerm).then((res) => {
                if (res.error) dispatch({ type: 'ERROR', payload: res.error })
                else dispatch({ type: 'SAVE_SEARCH_RESULTS', payload: [...res] })
            })
        }
        if (!_break) {
            fetchBreak().then(res => {
                if (isSubscribed) {
                    if (res.error) dispatch({ type: 'ERROR', payload: res.error })
                    else dispatch({ type: 'SAVE_BREAK', payload: { ...res[0] } })
                    setBreak(true)
                }
            })
        }
        return () => isSubscribed = false;
    }, [debouncedSearchTerm]);

    const makeRequest = useCallback(async () => {
        await saveRequet(savedRecords.record).then((res) => {
            if (res.error) dispatch({ type: 'ERROR', payload: res.error })
            else dispatch({ type: 'SUCCESS' })
        })
    }, [savedRecords.record]);

    

    if (props.res.error) {
        return (
            <Layout title={'workout-app'} description={'workout-app'} keywords={'workout'}>
                <section className={'container'}>
                    <div className={'p-37'}>
                        <h1 className={'bold'}>{'Customize '}<span className={'light'}>{' your workout'}</span></h1>
                        <div className={'d-flex error'}><p>{'Error Fetch Exercises: ' + props.res.error}</p></div>
                    </div>
                </section>
            </Layout>
        )
    }
    return (
        <Layout title={'workout-app'} description={'workout-app'} keywords={'workout'}>
            <section className={'container'} >
                <div className={'p-37'}>
                    <h1 className={'bold'}>{'Customize '}<span className={'light'}>{' your workout'}</span></h1>
                    {state.error && <div className={'d-flex error'}><p>{'Error: ' + state.error}</p></div>}
                    {state.success &&  <div className={'d-flex success'}><p>{'Your workout set was successfully saved'}</p></div> }
                </div>
                <div className={'d-flex justify-content-between align-items-center'}>
                    <WorkoutName type={'text'}
                        name={'workout'}
                        value={state.workout.name}
                        className={'workout-name'}
                        placeholder={'Workout name '}
                        onChangeHandler={(e) => dispatch({ type: 'ADD_WORKOUT_NAME', payload: e.target.value })} />
                    {state.workout.program.length > 0 &&
                        <Duration time={savedRecords.duration} save={makeRequest} />
                    }
                </div>
                <div className={'d-flex flex-wrap'}>
                    <div className={'content left'}>
                        <SearchBar type={'text'}
                            name={'search'}
                            value={state.search.input}
                            className={'search-bar'}
                            placeholder={'Search: '}
                            onChangeHandler={(e) => dispatch({ type: 'SEARCH_INPUT', payload: e.target.value })} />
                        {state.search.isSearching &&
                            <div>{'Searching ...'}</div>
                        }
                        {state.search.results.length > 0 &&
                            <SearchResults results={state.search.results}
                                onClick={(e, exercise) => dispatch({ type: 'ADD_EXERCISE', payload: exercise })}
                            />
                        }
                        <Break onClick={() => dispatch({ type: 'ADD_EXERCISE', payload: state._break })} />
                        <Exercises exercises={props.res} onClick={(exercise) => dispatch({ type: 'ADD_EXERCISE', payload: exercise })} />
                    </div>
                    <div className={`fade ${state.workout.program.length > 0 ? 'show' : ''}`}>
                        {state.workout.program.length > 0 &&
                            <div className={`content right`}>
                                <Workout
                                    onSortEnd={({ oldIndex, newIndex }) => dispatch({ type: 'DRAGGING_HANDLER', payload: { oldIndex: oldIndex, newIndex: newIndex } })}
                                    addBreak={(i) => dispatch({ type: 'ADD_BREAK', payload: i })}
                                    workout={state.workout.program}
                                    remove={(i) => { dispatch({ type: 'DELETE_EXERCISE', payload: i }) }} />
                            </div>
                        }
                    </div>
                </div>
            </section>
        </Layout>
    )
}
//FETCH DATA AT THE BUILD TIME NEXT.JS
export async function getStaticProps() {
    const res = await fetchMostUsedExercise()
    return { props: { res } }
}

export default Home