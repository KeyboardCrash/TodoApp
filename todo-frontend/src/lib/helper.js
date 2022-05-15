import { toast } from 'react-toastify';

function failedToConnectAlert() {
    const notify = () => toast.error(`Failed to connect to server`, {
        toastId: 'failedToConnect'
    });
    notify();
}
export default { failedToConnectAlert };