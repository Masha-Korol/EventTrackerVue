export function authHeader() {
    // return authorization header with basic auth credentials
    let user = localStorage.getItem('user');

    if (user) {
        return {'Authorization': `Basic ${user}`};
    } else {
        return {};
    }
}

export function getAuthHeader() {
    // return authorization header with basic auth credentials
    let user = localStorage.getItem('user');

    if (user) {
        return `Basic ${user}`;
    } else {
        return '';
    }
}

export function handleAxiosError(e) {
    console.log(`Error: ${JSON.stringify(e)}`);
    if (e.response && (e.response.status === 401 || e.response.status === 403)) {
        localStorage.removeItem('user');
        location.reload();
    }
}

export function authenticateUser(userName, password) {
    const credentials = window.btoa(userName + ':' + password);
    localStorage.setItem('user', JSON.stringify(credentials));
}
