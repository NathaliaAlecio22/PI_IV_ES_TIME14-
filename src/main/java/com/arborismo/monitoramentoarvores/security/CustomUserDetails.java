package com.arborismo.monitoramentoarvores.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

public class CustomUserDetails extends User {

    private final Long id;
    private final String tipoUsuario;

    public CustomUserDetails(String username, String password, Collection<? extends GrantedAuthority> authorities,
                             Long id, String tipoUsuario) {

        super(username, password, authorities);
        this.id = id;
        this.tipoUsuario = tipoUsuario;
    }

    // Getters para usar no Controller
    public Long getId() {
        return id;
    }

    public String getTipoUsuario() {
        return tipoUsuario;
    }
}