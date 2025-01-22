import { toast } from 'react-toastify';

function handleError(error) {
    console.log(error)
    if (error.response) {
        // Server responded with a status code outside 2xx range
        toast.error(error.response.data?.message || 'Something went wrong!');
    } else if (error.request) {
        // Request was made but no response received
        toast.error('No response from server. Please check your connection.');
    } else {
        // Other errors
        toast.error(`Error: ${error.message}`);
    }
}

function handleErrorMessage(msg)
{
    toast.error(msg);
}

function handleSuccess(msg) {
    toast.success(msg);
}

export { handleError, handleSuccess };