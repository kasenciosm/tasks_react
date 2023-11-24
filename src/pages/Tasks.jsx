import { Link } from "react-router-dom"

function Tasks() {
    return (
        <>
            <header className=' wrapper'>
                <nav className='header'>
                    <div className='title'>
                        <Link to='/' className="title__link">
                            <h1>TASKS</h1>
                        </Link>
                    </div>
                    <div className='add_button'>
                        <Link to='/tasks/form'>
                            <button >Add Task</button>
                        </Link>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Tasks