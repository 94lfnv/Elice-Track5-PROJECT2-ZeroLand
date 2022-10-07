import React, { useContext } from "react"

function Header() {
    return (
        <ul class="flex">
            <li class="mr-6">
                <a class="text-blue-500 hover:text-blue-800" href="#">Login</a>
            </li>
            <li class="mr-6">
                <a class="text-blue-500 hover:text-blue-800" href="#">Sign Up</a>
            </li>
        </ul>
      );
    
}

export default Header;