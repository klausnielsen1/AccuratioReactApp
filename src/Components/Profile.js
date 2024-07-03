import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();
    const [iframe, setIframe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isAuthenticated && user) {
            // Realiza la solicitud al servidor Express para obtener el iframe
            fetch(`http://localhost:3002/iframe/${user.sub}`)
                .then(response => response.json())
                .then(data => {
                    if (data.iframe) {
                        setIframe(data.iframe);
                    } else {
                        // No se encontró el iframe, intenta crear el usuario
                        fetch(`http://localhost:3002/adduser`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                username: user.name,
                                sub: user.sub
                            })
                        })
                        .then(response => response.json())
                        .then(newUser => {
                            console.log('Usuario creado:', newUser);
                            setError('Iframe no encontrado, usuario creado en la base de datos.');
                        })
                        .catch(err => {
                            console.error('Error al crear el usuario:', err);
                            setError('Error al crear el usuario');
                        });
                    }
                })
                .catch(err => {
                    console.error('Error al obtener el iframe:', err);
                    setError('Error al obtener el iframe');
                })
                .finally(() => setLoading(false));
        }
    }, [isAuthenticated, user]);

    return (
        isAuthenticated ? (
            <article>
                {user?.picture && <img src={user.picture} alt={user?.name} />}
                <h2>{user?.name}</h2>
                <ul>
                    {Object.keys(user).map((objKey, i) => <li key={i}>{objKey}: {user[objKey]}</li>)}
                </ul>
                {loading ? (
                    <p>Cargando iframe...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : iframe ? (
                    <div dangerouslySetInnerHTML={{ __html: iframe }} />
                ) : null}
            </article>
        ) : (
            <p>No estás autenticado</p>
        )
    );
};

export default Profile;

