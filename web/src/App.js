import React, { useState, useEffect } from 'react';
import FormDeve from './components/DevForm';
import DevItem from './components/DevItem';
import api from './services/api';
import './Sidebar.css';
import './App.css';
import './Main.css';
import DevForm from './components/DevForm';

function App() {
    const [devs, setDevs] = useState([]);

    useEffect(() => {
        async function loadDevs() {
            const response = await api.get('/devs');
            setDevs(response.data);
        }

        loadDevs();
    }, []);

    async function handleAddDev(data) {
        const response = await api.post('/devs', data);
        setDevs([...devs, response.data]);
    }

    return (
        <div id="app">
            <aside>
                <strong>Cadastrar</strong>
                <DevForm onSubmit={handleAddDev} ></DevForm>
            </aside>
            <main>
                <ul>
                    {devs.map(dev => (
                        <DevItem key={dev._id} dev={dev} ></DevItem>
                    ))}
                </ul>
            </main>
        </div>
    );
}

export default App;
