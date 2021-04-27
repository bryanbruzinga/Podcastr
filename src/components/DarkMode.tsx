import React from 'react'

export function DarkMode () {

    function handleModoEscuro(theme: string) {
        const html = document.querySelector('html')
        html.dataset.theme = `theme-${theme}`
    }

    return (
        <button onClick={() => handleModoEscuro('dark')}>Modo Escuro</button>
    )
}

export default DarkMode
