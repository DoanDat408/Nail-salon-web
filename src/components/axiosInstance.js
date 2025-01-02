// axiosInstance.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5118/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor để tự động làm mới token khi gặp lỗi 401
api.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        // Kiểm tra lỗi 401 và chưa thực hiện refresh token
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');

            // Nếu có refreshToken, gọi API để làm mới accessToken
            if (refreshToken) {
                try {
                    const response = await axios.post('http://localhost:5118/api/Auth/refresh-token', {
                        refreshToken: refreshToken,
                    });

                    // Lưu lại accessToken mới
                    const newAccessToken = response.data.accessToken;
                    localStorage.setItem('token', newAccessToken);

                    // Cập nhật Authorization header với accessToken mới
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                    // Thử lại request với token mới
                    return api(originalRequest);
                } catch (err) {
                    console.error('Failed to refresh token:', err);
                    // Nếu không làm mới được token, chuyển hướng về trang đăng nhập
                    window.location.href = '/login';
                    return Promise.reject(error);
                }
            } else {
                // Nếu không có refreshToken, chuyển hướng về trang đăng nhập
                window.location.href = '/login';
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
