import React from 'react'
import DarkModeIcone from '@mui/icons-material/DarkMode'
import '../App.css'

function Header({onClick,darkMode}) {
  return (
    <div className={`header ${darkMode?'darkMode':''}`}>
        <div className='header-container'>
            <h2 className='logo'>Where in the world?</h2>
            <div className='switch_mode' onClick={onClick}>
                <DarkModeIcone />
                <h3>Dark Mode</h3>
            </div>
        </div>
    </div>
  )
}

export default Header