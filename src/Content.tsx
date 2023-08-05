import { useSelector } from 'react-redux';
import { RootState } from './store/store';

export function Content() {
    const permission = useSelector((state: RootState) => state.user.permission);
    if (permission === undefined) {
        return null;
    }
    return permission.includes('admin') ? (
        <p className="mt-4 text-1 text-center"> Some important stuff that only admin can do</p>
    ) : (
        <p className="mt-4 text-1 text-center"> Insufficient permissions</p>
    );
}
