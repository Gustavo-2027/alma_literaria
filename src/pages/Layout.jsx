import { Outlet } from "react-router-dom";
import useDarkModeContext from "../hooks/useDarkModeContext"


export default function Layout() {
    
    const {darkMode} = useDarkModeContext()

    return (
        <div className={`min-h-screen duration-200 transition-transform ${darkMode ? "bg-gradient-to-b from-black/90 to-black/95 text-white" : "bg-gradient-to-b from-gray-100 to-white text-gray-800"}`}>
            <Outlet/>
        </div>
    )
}