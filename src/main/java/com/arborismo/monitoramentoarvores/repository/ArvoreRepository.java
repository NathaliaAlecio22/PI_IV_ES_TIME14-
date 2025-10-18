package com.arborismo.monitoramentoarvores.repository;

import com.arborismo.monitoramentoarvores.model.Arvore;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArvoreRepository extends JpaRepository<Arvore, Long> {

    // Método para buscar a árvore pelo número da plaqueta/QR Code
    Arvore findByNumeroPlaqueta(String numeroPlaqueta);

    // Método para buscar todas as árvores de um projeto específico
    List<Arvore> findAllByProjetoId(Long projetoId);
}