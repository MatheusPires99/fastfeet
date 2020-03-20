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
          <Link to="/orders">ENCOMENDAS</Link>
          <Link to="/deliverymans">ENTREGADORES</Link>
          <Link to="/recipients">DESTINATÁRIOS</Link>
          <Link to="/problems">PROBLEMAS</Link>
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
