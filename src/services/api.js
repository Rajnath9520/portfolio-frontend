import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL ;


const api = axios.create({
  baseURL: API_URL,
  timeout: 0, 
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {

    if (error.response) {

      const { status, data } = error.response;
      
      if (status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem("user");
        window.location.href = '/login';
      }
      
      if (status === 403) {
        console.error('Access forbidden:', data.error);
      }
      
      if (status === 404) {
        console.error('Resource not found:', data.error);
      }
      
      if (status === 429) {
        console.error('Rate limit exceeded:', data.error);
      }
      
      return Promise.reject(data);
    } else if (error.request) {
      return Promise.reject({
        success: false,
        error: 'Network error. Please check your connection.',
      });
    } else {
      return Promise.reject({
        success: false,
        error: error.message || 'An unexpected error occurred',
      });
    }
  }
);



const postWithContentType = (url, data) => {
  const isFormData = data instanceof FormData;
  return api.post(url, data, {
    headers: {
      'Content-Type': isFormData
        ? 'multipart/form-data'
        : 'application/json',
    },
  });
};

const putWithContentType = (url, data) => {
  const isFormData = data instanceof FormData;
  return api.put(url, data, {
    headers: {
      'Content-Type': isFormData
        ? 'multipart/form-data'
        : 'application/json',
    },
  });
};

export const achievementsAPI = {
  getAll: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `/achievements?${queryString}` : '/achievements';
      return await api.get(url);
    } catch (error) {
      throw error;
    }
  },

  getById: async (id) => {
    try {
      return await api.get(`/achievements/${id}`);
    } catch (error) {
      throw error;
    }
  },

  getFeatured: async (limit = 6) => {
    try {
      return await api.get(`/achievements?featured=true&limit=${limit}`);
    } catch (error) {
      throw error;
    }
  },

  getByCategory: async (category, limit) => {
    try {
      const params = { category };
      if (limit) params.limit = limit;
      return await achievementsAPI.getAll(params);
    } catch (error) {
      throw error;
    }
  },

  create: async (achievementData) => {
    try {
      return await postWithContentType('/achievements', achievementData);
    } catch (error) {
      throw error;
    }
  },

  update: async (id, achievementData) => {
    try {
      return await putWithContentType(`/achievements/${id}`, achievementData);
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      return await api.delete(`/achievements/${id}`);
    } catch (error) {
      throw error;
    }
  },
};



export const projectsAPI = {
  getAll: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `/projects?${queryString}` : '/projects';
      return await api.get(url);
    } catch (error) {
      throw error;
    }
  },

  // Get single project by ID
  getById: async (id) => {
    try {
      return await api.get(`/projects/${id}`);
    } catch (error) {
      throw error;
    }
  },

  // Get featured projects
  getFeatured: async (limit = 6) => {
    try {
      return await api.get(`/projects?featured=true&limit=${limit}`);
    } catch (error) {
      throw error;
    }
  },

  // Get projects by category
  getByCategory: async (category, limit) => {
    try {
      const params = { category };
      if (limit) params.limit = limit;
      return await projectsAPI.getAll(params);
    } catch (error) {
      throw error;
    }
  },


  create: async (projectData) => {
    try {
      return await postWithContentType('/projects', projectData);
    } catch (error) {
      throw error;
    }
  },


  update: async (id, projectData) => {
    try {
      return await putWithContentType(`/projects/${id}`, projectData);
    } catch (error) {
      throw error;
    }
  },


  delete: async (id) => {
    try {
      return await api.delete(`/projects/${id}`);
    } catch (error) {
      throw error;
    }
  },
};



export const contactAPI = {
  send: async (formData) => {
    try {
      return await api.post('/contact', formData);
    } catch (error) {
      throw error;
    }
  },
};

export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.success && response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      return response;
    } catch (error) {
      throw error;
    }
  },


  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },


  isAdmin: () => {
    const user = authAPI.getCurrentUser();
    return user && user.role === 'admin';
  },
};


export const checkHealth = async () => {
  try {
    return await api.get('/health');
  } catch (error) {
    throw error;
  }
};

export default api;