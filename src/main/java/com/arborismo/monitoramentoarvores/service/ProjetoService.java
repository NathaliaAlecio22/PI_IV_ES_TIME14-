package com.arborismo.monitoramentoarvores.service;

import com.arborismo.monitoramentoarvores.dto.ProjetoCadastroDTO;
import com.arborismo.monitoramentoarvores.dto.ProjetoResponseDTO; // NOVO IMPORT
import com.arborismo.monitoramentoarvores.model.Projeto;
import com.arborismo.monitoramentoarvores.repository.ProjetoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.List;

@Service
public class ProjetoService {

    @Autowired
    private ProjetoRepository projetoRepository;

    // 1. Mudar o retorno para ProjetoResponseDTO
    public ProjetoResponseDTO cadastrar(ProjetoCadastroDTO dto, Long donoId, String donoTipo) {

        if (projetoRepository.findByNome(dto.getNome()) != null) {
            throw new RuntimeException("Já existe um projeto com este nome. Por favor, escolha outro.");
        }

        Projeto novoProjeto = new Projeto();
        novoProjeto.setNome(dto.getNome());
        novoProjeto.setDescricao(dto.getDescricao());
        novoProjeto.setDonoId(donoId);
        novoProjeto.setDonoTipo(donoTipo);

        Projeto projetoSalvo = projetoRepository.save(novoProjeto);

        // 2. Retorna o DTO de Resposta após salvar
        return converterEntidadeParaDto(projetoSalvo);
    }
    // MÉTODO: Verifica se o donoId e donoTipo correspondem ao projeto
    public boolean isDonoDoProjeto(Long projetoId, Long donoId, String donoTipo) {
        Optional<Projeto> projetoOpt = projetoRepository.findById(projetoId);

        if (projetoOpt.isEmpty()) {
            // Se o projeto não existe, ele não é o dono (pode lançar exceção ou retornar false)
            return false;
        }

        Projeto projeto = projetoOpt.get();

        // Compara o ID e o Tipo do dono logado com os dados do projeto no banco
        return projeto.getDonoId().equals(donoId) && projeto.getDonoTipo().equals(donoTipo);
    }

    // MÉTODO: Mapeamento de Entidade -> DTO de Resposta (Faz a simetria da Service!)
    private ProjetoResponseDTO converterEntidadeParaDto(Projeto projeto) {
        ProjetoResponseDTO dto = new ProjetoResponseDTO();
        dto.setId(projeto.getId());
        dto.setNome(projeto.getNome());
        dto.setDescricao(projeto.getDescricao());
        dto.setDonoId(projeto.getDonoId());
        dto.setDonoTipo(projeto.getDonoTipo());
        dto.setDataCriacao(projeto.getDataCriacao());
        return dto;
    }


}