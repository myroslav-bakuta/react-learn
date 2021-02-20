import React, { useState } from 'react'
import PropTypes from 'prop-types'

function useInputValue(defaultValue = '') {
    const [value, setValue] = useState(defaultValue)

    return {
        bind: {
            value,
            onChange: (event) => setValue(event.target.value),
        },
        clear: () => setValue(''),
        value: () => value,
    }
}

function AddToDo({ onCreat }) {
    const input = useInputValue('')

    function submitHandler(event) {
        event.preventDefault()

        if (input.value().trim()) {
            onCreat(input.value())
            input.clear()
            // setValue('')
        }
    }

    return (
        <form style={{ marginBottom: '1rem' }} onSubmit={submitHandler}>
            <input {...input.bind} />
            <button type="submit">Add ToDo</button>
        </form>
    )
}

AddToDo.propTypes = {
    onCreat: PropTypes.func.isRequired,
}

export default AddToDo
