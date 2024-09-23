import { apiUrl } from './apiUrl';

export const login = async (email: string, password: string) => {
    try {
        const response = await fetch(`${apiUrl}/RaicesUrbanas/login`, {
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

        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        return data;
    } catch (error) {
        throw new Error(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

export const register = async (userName: string, email: string, password: string, roleName: string) => {
    const response = await fetch(`${apiUrl}/RaicesUrbanas/register`, {
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