import { useReducer } from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { User, authenticate } from './api/authenticate';
import { authorize } from './api/authorize';

type State = {
    user: undefined | User;
    permission: undefined | string[];
    loading: boolean;
};

const initialState: State = {
    user: undefined,
    permission: undefined,
    loading: false,
};

type Action =
    | { type: 'authenticate' }
    | { type: 'authenticated'; user: User | undefined }
    | { type: 'authorize' }
    | { type: 'authorized'; permission: string[] };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'authenticate':
            return { ...state, loading: true };
        case 'authenticated':
            return { ...state, user: action.user, loading: false };
        case 'authorize':
            return { ...state, loading: true };
        case 'authorized':
            return { ...state, permission: action.permission, loading: false };
        default:
            return state;
    }
}

function App() {
    const [{ user, permission, loading }, dispatch] = useReducer(reducer, initialState);
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
        <div className="max-w-7xl mx-auto px-4">
            <Header user={user} onSignIn={handleSignIn} loading={loading} />
            <Main user={user} permission={permission} />
        </div>
    );
}

export default App;
