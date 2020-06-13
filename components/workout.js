import React from 'react'
import Drag from '../public/images/Drag.svg'
import Delete from '../public/images/Delete.svg'
import { sortableContainer, sortableElement, } from 'react-sortable-hoc';




const SortableItem = sortableElement(({ exercise, index, i, onRemove, addBreak, length }) => {

 
    if (exercise.fields.Name === 'Break') {
        return (
            <div className={`drag-element`}>
                <div className={'content break-container'}>
                    <div className={'d-flex align-items-center justify-content-between title'}>
                        <div className={'d-flex align-items-center'}>
                            <Drag />
                            <h3>{exercise.fields.Name}</h3>
                            <h4 className={'light'}>{exercise.fields.Duration}</h4>
                        </div>
                        <div className={'delete'} id={'remove'} onClick={() => onRemove(i)}>
                            <Delete />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className={`drag-element`}>
            <div className={'content'}>
                <div className={'d-flex align-items-center justify-content-between title'}>
                    <div className={'d-flex align-items-center'}>
                        <Drag />
                        <h3>{exercise.fields.Name}</h3>
                    </div>
                    <div className={'delete'} id={'remove'} onClick={() => onRemove(i)}>
                        <Delete />
                    </div>
                </div>
                <div className={'d-flex flex-wrap details'}>
                    <div>
                        <p>{'Sets'}</p>
                        <h2>{exercise.fields.Sets}</h2>
                    </div>
                    <div>
                        <p>{'Reps'}</p>
                        <h2>{exercise.fields.Repetition}</h2>
                    </div>
                    <div>
                        <p>{'Time'}</p>
                        <h2>{exercise.fields.Duration}</h2>
                    </div>
                    <div>
                        <p>{'Rest'}</p>
                        <h2>{exercise.fields["Rest Between"]}</h2>
                    </div>
                </div>
            </div>
            {i !== length - 1 &&
                <div className={'break'} onClick={() => addBreak(i)}>
                    <p>{'Add Break'}</p>
                </div>
            }



        </div>

    )
});

const SortableContainer = sortableContainer(({ workout, addBreak, onRemove, length }) => {
    return (
        <div className={`workout `}>

            {workout.map((exercise, i) =>
                <SortableItem key={i}
                    index={i}
                    i={i}
                    exercise={exercise}
                    addBreak={addBreak}
                    onRemove={onRemove}
                    length={length}
                    distance={1}
                />

            )}
        </div>
    )
})

export const Workout = (({ workout, remove, addBreak, onSortEnd }) => {

    return (
        <SortableContainer workout={workout}
            length={workout.length}
            onSortEnd={onSortEnd}
            addBreak={addBreak}
            onRemove={remove}
            distance={1}
        />
    )
})

