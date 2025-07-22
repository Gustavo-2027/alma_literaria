import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
            <Outlet/>
        </div>
    )
}