import { useState } from "react";
import {
    HiArrowRightOnRectangle,
    HiOutlineMoon,
    HiOutlineSun,
    HiOutlineUser,
  } from "react-icons/hi2";
  import "./header.scss"

const Header = () => {
    const [isDarkMode, setIsDarkMOde] = useState(true);
  return (
    <header className="StyledHeader bg-gray-200">

    <ul className="StyledHeaderMenu">
      <li>
        <button className="ButtonIcon">
          <HiOutlineUser />
        </button>
      </li>
      <li>
        {/* <ModeToggle /> */}
        <button
          className="ButtonIcon"
          onClick={() => setIsDarkMOde(!isDarkMode)}
        >
          {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
        </button>
      </li>

      <li>
        <button className="ButtonIcon">
          <HiArrowRightOnRectangle />
        </button>
      </li>
    </ul>

    {/* SHOW REJECT DIALOG */}
    {/* <AlertDialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want to logout?
          </AlertDialogTitle>
          
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              toast({
                description: "Logout Successful",
              });
            }}
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog> */}
  </header>
  )
}

export default Header