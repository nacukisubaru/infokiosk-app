/*REACT*/
import React from 'react';
import { Link } from "react-router-dom";

/*MUI*/
import { Container } from '@mui/material';

export default function MapPage() {
    return (
        <Container>
            <nav>
                <ul>
                    <li>
                        <Link to="/ui-kit">UI-Kit</Link>
                    </li>
                    <li>
                        <Link to="/greeting">Приветственный экран</Link>
                    </li>
                    <li>
                        <Link to="/mainpage">Главная страница</Link>
                    </li>
                    <li>
                        <Link to="/excursion">Список экскурсий</Link>
                    </li>
                    <li>
                        <Link to="/payment">Страница оплаты</Link>
                    </li>
                    <li>
                        <Link to="/reservation-success">Страница успешного бронирования</Link>
                    </li>
                </ul>
            </nav>
        </Container>
    )
}