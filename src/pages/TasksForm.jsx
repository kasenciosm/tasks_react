import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

function TasksForm() {

    const [task, setTask] = useState({
        title: '',
        description: ''
    })


    const [loading, setLoading] = useState(false)
    const [editing, setEditing] = useState(false)

    const navigate = useNavigate()
    const params = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        if (editing) {
            const response = await fetch(`https://tasks-node-postgres.vercel.app/tasks/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task)
            })
            const data = await response.json()
            console.log(data)
        } else {
            const res = await fetch('https://tasks-node-postgres.vercel.app/tasks', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: { 'Content-Type': 'application/json' },
            })
            const data = await res.json()
            console.log(data)
        }

        setLoading(false)
        navigate('/')
    }

    const handleChange = e => {
        setTask({ ...task, [e.target.name]: e.target.value })
    }

    const loadTask = async (id) => {
        const res = await fetch(`https://tasks-node-postgres.vercel.app/tasks/${id}`)
        const data = await res.json()
        setTask({ title: data.title, description: data.description })
        setEditing(true)
    }

    useEffect(() => {
        if (params.id) {
            loadTask(params.id)
        }
    }, [params.id])

    return (
        <>
            <div className='title__form'>
                <Link to='/' className="title__link">
                    <h1>TASKS</h1>
                </Link>
            </div>
            <h2 className='form'>
                {editing ? 'EDIT TASK' : 'CREATE TASK'}
            </h2>
            <form className='task__form'
                onSubmit={handleSubmit}>
                <div className='form__title'>
                    <label>
                        Title
                    </label>
                    <input
                        className='input__title'
                        placeholder='Add title'
                        name='title'
                        value={task.title}
                        onChange={handleChange}>

                    </input>
                </div>
                <div className='form__description'>
                    <label>
                        Description
                    </label>
                    <textarea
                        className='input__description'
                        placeholder='Description'
                        name='description'
                        value={task.description}
                        onChange={handleChange}>
                    </textarea>
                </div>
                <div>
                    <button
                        type='submit'
                        disabled={!task.title || !task.description}>
                        {loading ? <div className='spinner'></div> : 'Save'}
                    </button>
                </div>

            </form>
        </>
    )
}

export default TasksForm