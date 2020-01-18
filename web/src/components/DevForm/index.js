import React, { useState, useEffect } from 'react';

function DevForm({ onSubmit }) {

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

    async function handleSubmit(event) {
        event.preventDefault();

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        });

        setGithubUserName('');
        setTechs('');
    }

    return (
        <form onSubmit={handleSubmit}>
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
    );
};

export default DevForm;