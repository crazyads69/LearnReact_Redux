type Props = { permission: undefined | string[] };

export function Content({ permission }: Props) {
    if (permission === undefined) {
        return null;
    }
    return permission.includes('admin') ? (
        <p className="mt-4 text-1 text-center"> Some important stuff that only admin can do</p>
    ) : (
        <p className="mt-4 text-1 text-center"> Insufficient permissions</p>
    );
}
