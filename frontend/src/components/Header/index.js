import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { signOut } from "~/store/modules/auth/actions";

import logo from "~/assets/logo.svg";

import { Container, Profile } from "./styles";

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <nav>
        <Link to="/">
          <img src={logo} alt="Fastfeet" />
        </Link>
        <div>
          <Link to="/">ENCOMENDAS</Link>
          <Link to="/">ENTREGADORES</Link>
          <Link to="/">DESTINATÁRIOS</Link>
          <Link to="/">PROBLEMAS</Link>
        </div>
      </nav>

      <Profile>
        <strong>{profile.name}</strong>
        <button onClick={handleSignOut} type="submit">
          sair do sistema
        </button>
      </Profile>
    </Container>
  );
}
