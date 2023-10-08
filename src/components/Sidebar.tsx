import Link from "next/link";

const Sidebar = () => {
    return (
        <ul className="menu bg-base-100 w-56">
            <li>
                <Link href="/admin">
                    Admin
                </Link>
            </li>
        </ul>
    )
}

export default Sidebar;