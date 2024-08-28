import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../../Context/FavoritesContext";
import "./NavBar.scss";

import search_icon from "../assets/img/icons/search.svg";
import heart_icon from "../assets/img/icons/heart.svg";
import logo from "../assets/img/icons/logo-black.svg";
import menu from "../assets/img/icons/menu.svg";
import close_icon from "../assets/img/icons/close.svg";
import cart from "../assets/img/icons/cart.svg";
import Menu from "../Menu/Menu";
import Dropdown from "../Dropdown/Dropdown";
import { useCartItems } from "../../Context/CartContext";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navBar">
      <div className="navBar__logo">
        <img
          src={isMenuOpen ? close_icon : menu}
          alt="burger menu"
          className="navBar__burger-menu"
          onClick={toggleMenu}
        />
        <Link to="/">
          <img src={logo} alt="site logo" className="navBar__logo-img" />
        </Link>
      </div>
      <NavBarMenu toggleMenu={toggleMenu} />
      <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <NavBarActions toggleMenu={toggleMenu} /> {/* Передаем toggleMenu */}
    </nav>
  );
};

const NavBarMenu: React.FC<{ toggleMenu: () => void }> = ({ toggleMenu }) => {
  return (
    <ul className="navBar__menu">
      <li>
        <Dropdown toggleMenu={toggleMenu} />
      </li>
      <li>
        <Link to="/offers">Акції</Link>
      </li>
      <li className="navBar__item">
        <Link to="/about-us">Про нас</Link>
      </li>
      <li className="navBar__item">
        <Link to="/payment-and-delivery">Оплата та доставка</Link>
      </li>
      <li className="navBar__item">
        <Link to="/contacts">Контакти</Link>
      </li>
    </ul>
  );
};

const NavBarActions: React.FC<{ toggleMenu: () => void }> = ({
  toggleMenu,
}) => {
  const { favorites } = useFavorites();
  const { cartItems } = useCartItems();

  const countItems = cartItems.reduce((sum, item) => {
    const count = item.count ? item.count : 0;
    return sum + count;
  }, 0);

  const handleLinkClick = () => {
    toggleMenu();
  };

  return (
    <div className="navBar__actions">
      <Link to="#" onClick={handleLinkClick}>
        <img src={search_icon} alt="Search" />
      </Link>
      <Link
        to="/favorites"
        className="navBar__actions-favorites"
        onClick={handleLinkClick}
      >
        <img src={heart_icon} alt="Favorites" />
        {favorites.length > 0 && (
          <div className="navBar__actions-favorites-count">
            {favorites.length}
          </div>
        )}
      </Link>
      <Link to="/cart" onClick={handleLinkClick}>
        <div className="navBar__actions-cart">
          <img
            src={cart}
            alt="cart icon"
            className="navBar__actions-cart-icon"
          />
          <p className="navBar__actions-cart-text">Кошик</p>
          <div className="navBar__actions-cart-count">{countItems}</div>
        </div>
      </Link>
    </div>
  );
};

export default NavBar;
