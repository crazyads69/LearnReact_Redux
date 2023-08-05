import { authenticate } from './api/authenticate';
import { authorize } from './api/authorize';
import { useAppContext } from './AppContext';

export function Header() {
    const { user, loading, dispatch } = useAppContext();
    async function handleSignIn() {
        dispatch({ type: 'authenticate' });
        const authenticatedUser = await authenticate();
        dispatch({ type: 'authenticated', user: authenticatedUser });
        if (authenticatedUser !== undefined) {
            dispatch({ type: 'authorize' });
            const authorizedPermission = await authorize(authenticatedUser.id);
            dispatch({ type: 'authorized', permission: authorizedPermission });
        }
    }
    return (
        <header className="flex justify-between items-center border-b-2 border-gray-100 py-6">
            {user ? (
                <span className="ml-auto font-bold">{user.name} has signed in</span>
            ) : (
                <button
                    onClick={handleSignIn}
                    className="whitespace-nowrap inline-flex items-center justify-center ml-auto px-4 py-2 w-36 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    disabled={loading}>
                    {loading ? '...' : 'Sign in'}
                </button>
            )}
        </header>
    );
}
