package com.arborismo.monitoramentoarvores.repository;

import com.arborismo.monitoramentoarvores.model.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {

    //Método essencial para o Login: buscar a empresa pelo CNPJ
    Empresa findByCnpj(String cnpj);

    //Método útil: buscar a empresa pelo e-mail
    Empresa findByEmailCorporativo(String emailCorporativo);
}