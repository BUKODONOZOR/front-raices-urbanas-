export const login = async (email: string, password: string) => {
    try {
        const response = await fetch('http://localhost:8080/RaicesUrbanas/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText}`);
        }

        // Asumiendo que el backend devuelve un token de autenticación.
        const data = await response.json();
        // Guarda el token en el localStorage o sessionStorage
        localStorage.setItem('authToken', data.token);
        return data;
    } catch (error) {
        throw new Error(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

export const register = async (userName: string, email: string, password: string, roleName: string) => {
    console.log("Datos a enviar: ", { userName, email, password, roleName }); // Verifica que el rol no sea nulo
    const response = await fetch('http://localhost:8080/RaicesUrbanas/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, email, password, roleName }),
    });

    const responseBody = await response.text();
    console.log("Respuesta del servidor:", responseBody);

    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${responseBody}`);
    }

    return JSON.parse(responseBody);
};