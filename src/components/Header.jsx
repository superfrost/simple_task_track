import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({ title, showAddTask, showHideAddTask}) => {
    const location = useLocation()
    
    return (
        <header className="header">
            <h1>{title}</h1>
            {location.pathname === '/' && <Button
                color={showAddTask ? 'red' : 'green'}
                text={showAddTask ? "Hide" : "Show"}
                onClick={showHideAddTask}
            />}
        </header>
    );
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header
