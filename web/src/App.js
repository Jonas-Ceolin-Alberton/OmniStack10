import React, { useState, useEffect } from 'react';
import api from './services/api';
import './Sidebar.css';
import './App.css';
import './Main.css';

function App() {
    const [devs, setDevs] = useState([]);

    const [github_username, setGithubUserName] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLatitude(latitude);
                setLongitude(longitude);
            },
            (error) => {
                console.log(error)
            },
            {
                timeout: 30000
            }
        )

    }, []);

    useEffect(() => {
        async function loadDevs() {
            const response = await api.get('/devs');
            setDevs(response.data);
        }

        loadDevs();
    }, []);


    async function handleAddDev(event) {
        event.preventDefault();

        const response = await api.post('/devs', {
            github_username,
            techs,
            longitude,
            latitude
        });

        setGithubUserName('');
        setTechs('');
        
        setDevs([...devs, response.data]);
    }

    return (
        <div id="app">
            <aside>
                <strong>Cadastrar</strong>
                <form onSubmit={handleAddDev}>
                    <div className="input-block">
                        <label htmlFor="github_username">Usuário do Gitub</label>
                        <input
                            name="github_username"
                            id="github_username"
                            value={github_username}
                            onChange={event => setGithubUserName(event.target.value)}
                            required>
                        </input>
                    </div>

                    <div className="input-block">
                        <label htmlFor="thecs">Tecnologias</label>
                        <input
                            name="thecs"
                            id="thecs"
                            value={techs}
                            onChange={event => setTechs(event.target.value)}
                            required>
                        </input>
                    </div>

                    <div className="input-group">
                        <div className="input-block">
                            <label htmlFor="latitude">Latitude</label>
                            <input
                                name="latitude"
                                id="latitude"
                                type="number"
                                value={latitude}
                                onChange={event => setLatitude(event.target.value)}
                                required>
                            </input>
                        </div>

                        <div className="input-block">
                            <label htmlFor="longitude">Longitude</label>
                            <input
                                name="longitude"
                                id="longitude"
                                type="number"
                                value={longitude}
                                onChange={event => setLongitude(event.target.value)}
                                required>
                            </input>
                        </div>
                    </div>

                    <button type="submit">Salvar</button>
                </form>
            </aside>
            <main>
                <ul>
                    {devs.map(dev => (
                        <li key={dev.id} className="dev-item">
                            <header>
                                <img src={dev.avatar_url} alt={dev.name}></img>
                                <div className="user-info">
                                    <strong>{dev.name}</strong>
                                    <span>{dev.techs.join(', ')}</span>
                                </div>
                            </header>
                            <p>{dev.bio}</p>
                            <a target="_blank" href={`https://github.com/${dev.github_username}`}>Acessar perfil no GitHub</a>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}

export default App;
