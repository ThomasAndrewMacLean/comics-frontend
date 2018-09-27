import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Header = () => (
  <header class={style.header}>
    <nav>
      <Link href='/'>Comic Store</Link>
      <Link href='/Login'>Log in</Link>
    </nav>
  </header>
);

export default Header;
