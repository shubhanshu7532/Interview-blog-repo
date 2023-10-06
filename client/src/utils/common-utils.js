

export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
}

export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
}

export const setAccessToken = (accessToken) => {
    localStorage.setItem('accessToken', `Bearer ${accessToken}`);
}

export const setRefreshToken = (refreshToken) => {
    localStorage.setItem('refreshToken', `Bearer ${refreshToken}`);
}

export const getType = (value, body) => {
    if (value.params) {
        return { params: body }
    } else if (value.query) {
        if (typeof body === 'object') {
            return { query: body._id }
        } else {
            return { query: body }
        }
    }
    return {};
}