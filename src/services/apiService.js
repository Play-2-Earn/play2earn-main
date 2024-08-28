import axios from 'axios';

const API_URL = 'http://localhost:5002/api/audio-transcription';

// Fetch all audio transcription tasks
export const fetchAllTasks = async () => {
    try {
        const response = await axios.get(API_URL);
        const tasks = response.data.map(task => ({
            ...task,
            audio_url: `${API_URL}/audio/${task.filename}`,  // Construct the audio URL
        }));
        return tasks;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};


// Create a new audio transcription task
export const createTask = async (taskData) => {
    try {
        const response = await axios.post(`${API_URL}/create`, taskData);
        return response.data;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};

// Submit transcription for a specific task
export const submitTranscription = async (taskId, transcription) => {
    try {
        const response = await axios.post(`${API_URL}/${taskId}/submit`, { transcription });
        return response.data;
    } catch (error) {
        console.error('Error submitting transcription:', error);
        throw error;
    }
};

// Delete a specific audio transcription task
export const deleteTask = async (taskId) => {
    try {
        const response = await axios.delete(`${API_URL}/${taskId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};

// Bulk delete audio transcription tasks
export const bulkDeleteTasks = async (taskIds) => {
    try {
        const response = await axios.post(`${API_URL}/bulk-delete`, { ids: taskIds });
        return response.data;
    } catch (error) {
        console.error('Error bulk deleting tasks:', error);
        throw error;
    }
};
