package com.arborismo.monitoramentoarvores.repository;

import com.arborismo.monitoramentoarvores.model.Projeto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjetoRepository extends JpaRepository<Projeto, Long> {

    // Método para validar se já existe um projeto com o mesmo nome
    Projeto findByNome(String nome);

    // Método para listar todos os projetos de um dono específico (PF ou PJ)
    // List<Projeto> findAllByDonoIdAndDonoTipo(Long donoId, String donoTipo);
}