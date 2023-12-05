import React, { useEffect, useState } from 'react'
import Tasks from './Tasks'
import { useNavigate } from 'react-router-dom'

function TasksList() {

    const [tasks, setTasks] = useState([])

    const navigate = useNavigate()

    const loadTasks = async () => {
        const response = await fetch('https://tasks-node-postgres.vercel.app/tasks')
        const data = await response.json()
        setTasks(data)
    }

    const handleDelete = async (id) => {
        const isDelete = confirm('¿Estas seguro que quieres eliminar esta tarea?')
        if (isDelete) {
            try {
                setTasks(prevTasks => prevTasks.map(task => {
                    if (task.id === id) {
                        return { ...task, deleted: true }
                    }
                    return task;
                }))
                const response = await fetch(`https://tasks-node-postgres.vercel.app/tasks/${id}`, {
                    method: 'DELETE'
                })

                if (response.ok) {
                    setTasks(prevTasks => prevTasks.filter(task => task.id !== id))
                } else {
                    setTasks(prevTasks => prevTasks.map(task => {
                        if (task.id === id) {
                            return { ...task, deleted: false }
                        }
                        return task;
                    }))
                    console.error('Error al eliminar la tarea en el servidor');
                }
            } catch (error) {
                console.error(error)
            }
        } else {
            return
        }

    }

    function handleToggle(id) {
        setTasks(task => task.map(task => task.id === id ? { ...task, completed: !task.completed } : task))
    }

    useEffect(() => {
        loadTasks()
    }, [])

    return (
        <>
            <Tasks />
            <section className='tasks__cards'>
                {tasks && tasks.map(task => (
                    <article
                        key={`${task.id}_${Math.random()}`}
                    >
                        <div className='tasks'
                            onClick={() => handleToggle(task.id)}
                            style={{ backgroundColor: task.completed ? 'rgba(247, 27, 27, 0.581)' : 'none', cursor: 'pointer', textDecoration: task.completed ? 'line-through' : 'none' }}>
                            <div className='task__title'>
                                <p>{task.title}</p>
                            </div>
                            <div className='task__description'>
                                <p>{task.description}</p>
                            </div>
                            <div className='buttons'>
                                <button className='button'
                                    onClick={() => navigate(`/tasks/${task.id}/edit`)}>
                                    🔨
                                </button>
                                <button className='button'
                                    onClick={() => handleDelete(task.id)}>
                                    ❌
                                </button>
                            </div>
                        </div>
                    </article>
                ))
                }
            </section>

        </>
    )
}

export default TasksList