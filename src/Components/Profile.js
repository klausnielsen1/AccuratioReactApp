import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();
    const [dashboards, setDashboards] = useState([]); // Estado para almacenar los dashboards
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isAuthenticated && user) {
            // Realiza la solicitud al servidor Express para obtener los dashboards
            fetch(`http://localhost:3002/dashboards/${user.sub}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        setDashboards(data); // Almacena los dashboards en el estado
                    } else {
                        setError('No se encontraron dashboards para el usuario proporcionado.');
                    }
                })
                .catch(err => {
                    console.error('Error al obtener los dashboards:', err);
                    setError('Error al obtener los dashboards');
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
                    <p>Cargando dashboards...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : dashboards.length > 0 ? (
                    <div>
                        {dashboards.map((dashboard, index) => (
                            <div key={index}>
                                <div dangerouslySetInnerHTML={{ __html: dashboard.iframe }} />
                            </div>
                        ))}
                    </div>
                ) : null}
            </article>
        ) : (
            <p>No estás autenticado</p>
        )
    );
};

export default Profile;



