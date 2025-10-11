import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-700 shadow-lg">
      <Container>
        <nav className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-2">
            {/* <Logo width="60px" /> */}
            <span className="text-xl font-semibold text-white tracking-wide">
              My<span className="bg-gradient-to-r from-indigo-400 to-pink-500 text-transparent bg-clip-text">Blog</span>
            </span>
          </Link>

          <ul className="flex items-center space-x-6">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-500 px-5 py-2 rounded-full transition-all duration-300"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
