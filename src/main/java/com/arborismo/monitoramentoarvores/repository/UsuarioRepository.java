package com.arborismo.monitoramentoarvores.repository;

import com.arborismo.monitoramentoarvores.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Método essencial para o Login: buscar o usuário pelo email
    Usuario findByEmail(String email);

    // Método para validar duplicidade de CPF
    Usuario findByCpf(String cpf);
}