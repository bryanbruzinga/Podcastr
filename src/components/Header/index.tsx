import React from 'react'
import styles from './styles.module.scss'
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'
import DarkMode from '../DarkMode'

export function Header () {

    const currentDate = format(new Date(), 'EEEEEE, d MMM', {
        locale: ptBR,
    })
    return (
        <header className={styles.headerContainer}>
            <img src="/logo.svg" alt="Podcastr" />
            <p>O melhor para voce ouvir, sempre</p>
            <DarkMode />
            <span>{currentDate}</span>
        </header>
    )
}

export default Header
