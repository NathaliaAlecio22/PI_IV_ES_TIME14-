package com.arborismo.monitoramentoarvores.service;

import com.arborismo.monitoramentoarvores.dto.ArvoreResponseDTO;
import com.arborismo.monitoramentoarvores.dto.ProjetoCadastroDTO;
import com.arborismo.monitoramentoarvores.dto.ProjetoResponseDTO;
import com.arborismo.monitoramentoarvores.model.Projeto;
import com.arborismo.monitoramentoarvores.repository.ArvoreRepository;
import com.arborismo.monitoramentoarvores.repository.ProjetoRepository;
import com.arborismo.monitoramentoarvores.dto.ProjetoUpdateDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjetoService {

    @Autowired
    private ProjetoRepository projetoRepository;

    @Autowired
    private ArvoreRepository arvoreRepository;

    // Cadastro do projeto
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

        return converterEntidadeParaDto(projetoSalvo);
    }

    // Verificar se o usuário é o dono
    public boolean isDonoDoProjeto(Long projetoId, Long donoId, String donoTipo) {
        Optional<Projeto> projetoOpt = projetoRepository.findById(projetoId);

        if (projetoOpt.isEmpty()) {
            return false;
        }

        Projeto projeto = projetoOpt.get();

        return projeto.getDonoId().equals(donoId) && projeto.getDonoTipo().equalsIgnoreCase(donoTipo);
    }

    // Buscar projeto + lista de árvores
    public ProjetoResponseDTO buscarProjetoComArvores(Long projetoId) {

        Projeto projeto = projetoRepository.findById(projetoId)
                .orElseThrow(() -> new RuntimeException("Projeto não encontrado."));

        List<ArvoreResponseDTO> arvoresDTO = arvoreRepository.findAllByProjetoId(projetoId)
                .stream()
                .map(arvore -> new ArvoreResponseDTO(
                        arvore.getId(),
                        arvore.getNomePopular(),
                        arvore.getNomeCientifico(),
                        arvore.getLocalizacao(),
                        arvore.getAlturaMetros(),
                        arvore.getIdadeEstimadaAnos(),
                        arvore.getInclinacaoTroncoGraus(),
                        arvore.getRaizesExpostas(),
                        arvore.getFormaCopa(),
                        arvore.getPragasDoencas(),
                        arvore.getOcoTronco(),
                        arvore.getRachadurasFissuras(),
                        arvore.getDataUltimaPoda() != null ? arvore.getDataUltimaPoda().toString() : null,
                        arvore.getTipoUltimaPoda(),
                        arvore.getProximidadeRisco(),
                        arvore.getAvaliacaoRisco(),
                        arvore.getResponsavelInspecao(),
                        arvore.getObservacoesAdicionais(),
                        arvore.getSituacaoRecomendada()
                ))
                .toList();

        ProjetoResponseDTO dto = converterEntidadeParaDto(projeto);
        dto.setArvores(arvoresDTO);
        return dto;
    }

    // Conversão Entidade → DTO
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

    public List<ProjetoResponseDTO> listarProjetosDoUsuario(Long donoId, String donoTipo) {

        List<Projeto> projetos = projetoRepository.findAllByDonoIdAndDonoTipo(donoId, donoTipo);

        return projetos.stream()
                .map(this::converterEntidadeParaDto)
                .toList();
    }

    public ProjetoResponseDTO atualizarProjeto(Long id, ProjetoUpdateDTO dto, Long donoId, String donoTipo) {

        Projeto projeto = projetoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Projeto não encontrado"));

        if (!projeto.getDonoId().equals(donoId) || !projeto.getDonoTipo().equalsIgnoreCase(donoTipo)) {
            throw new RuntimeException("Você não tem permissão para atualizar este projeto.");
        }

        projeto.setNome(dto.getNome());
        projeto.setDescricao(dto.getDescricao());

        Projeto projetoAtualizado = projetoRepository.save(projeto);

        ProjetoResponseDTO dtoResponse = new ProjetoResponseDTO();
        dtoResponse.setId(projetoAtualizado.getId());
        dtoResponse.setNome(projetoAtualizado.getNome());
        dtoResponse.setDescricao(projetoAtualizado.getDescricao());
        dtoResponse.setDonoId(projetoAtualizado.getDonoId());
        dtoResponse.setDonoTipo(projetoAtualizado.getDonoTipo());
        dtoResponse.setDataCriacao(projetoAtualizado.getDataCriacao());
        dtoResponse.setArvores(
                projetoAtualizado.getArvores() != null ?
                        projetoAtualizado.getArvores().stream()
                                .map(arvore -> {
                                    ArvoreResponseDTO a = new ArvoreResponseDTO();
                                    a.setId(arvore.getId());
                                    a.setNomePopular(arvore.getNomePopular());
                                    a.setNomeCientifico(arvore.getNomeCientifico());
                                    a.setLocalizacao(arvore.getLocalizacao());
                                    return a;
                                }).toList()
                        : null
        );

        return dtoResponse;
    }


}
