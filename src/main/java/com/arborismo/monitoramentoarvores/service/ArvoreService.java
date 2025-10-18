package com.arborismo.monitoramentoarvores.service;

import com.arborismo.monitoramentoarvores.dto.ArvoreCadastroDTO;
import com.arborismo.monitoramentoarvores.model.Arvore;
import com.arborismo.monitoramentoarvores.model.Projeto;
import com.arborismo.monitoramentoarvores.repository.ArvoreRepository;
import com.arborismo.monitoramentoarvores.repository.ProjetoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ArvoreService {

    @Autowired
    private ArvoreRepository arvoreRepository;

    @Autowired
    private ProjetoRepository projetoRepository;

    @Autowired
    private ProjetoService projetoService;

    // --- C (CREATE): Método de Cadastro ---
    // NOVO: Recebe donoId e donoTipo na assinatura
    public Arvore cadastrar(ArvoreCadastroDTO dto, Long projetoId, Long donoId, String donoTipo) {

        // 1. VALIDAÇÃO DE NEGÓCIO: O PROJETO EXISTE?
        Optional<Projeto> projetoOpt = projetoRepository.findById(projetoId);
        if (projetoOpt.isEmpty()) {
            throw new RuntimeException("Projeto com ID " + projetoId + " não encontrado.");
        }

        // 2. CHECAGEM DE PROPRIEDADE: Usuário logado é o dono?
        if (!projetoService.isDonoDoProjeto(projetoId, donoId, donoTipo)) {
            throw new RuntimeException("Acesso negado. Você não é o dono ou não tem permissão para modificar este projeto.");
        }

        Projeto projeto = projetoOpt.get();

        // 3. GERAÇÃO DE ID ÚNICO (QR CODE)
        String qrCodeId = UUID.randomUUID().toString();

        // 4. CONVERSÃO DTO PARA ENTIDADE
        Arvore novaArvore = converterDtoParaEntidade(dto, projeto, qrCodeId);

        // 5. SALVAR NO BANCO
        return arvoreRepository.save(novaArvore);
    }

    // Método privado de Mapeamento (Conversão)
    private Arvore converterDtoParaEntidade(ArvoreCadastroDTO dto, Projeto projeto, String qrCodeId) {
        // ... (código inalterado) ...
        Arvore arvore = new Arvore();
        // --- RELACIONAMENTO E IDENTIFICAÇÃO ---
        arvore.setProjeto(projeto);
        arvore.setNumeroPlaqueta(qrCodeId);
        arvore.setDataInspecao(LocalDate.now());
        // --- MAPEAMENTO DOS CAMPOS DE MONITORAMENTO ---
        arvore.setNomePopular(dto.getNomePopular());
        arvore.setNomeCientifico(dto.getNomeCientifico());
        arvore.setLocalizacao(dto.getLocalizacao());
        arvore.setAlturaMetros(dto.getAlturaMetros());
        arvore.setIdadeEstimadaAnos(dto.getIdadeEstimadaAnos());
        arvore.setInclinacaoTroncoGraus(dto.getInclinacaoTroncoGraus());
        arvore.setRaizesExpostas(dto.getRaizesExpostas());
        arvore.setFormaCopa(dto.getFormaCopa());
        arvore.setPragasDoencas(dto.getPragasDoencas());
        arvore.setOcoTronco(dto.getOcoTronco());
        arvore.setRachadurasFissuras(dto.getRachadurasFissuras());
        arvore.setDataUltimaPoda(dto.getDataUltimaPoda());
        arvore.setTipoUltimaPoda(dto.getTipoUltimaPoda());
        arvore.setProximidadeRisco(dto.getProximidadeRisco());
        arvore.setAvaliacaoRisco(dto.getAvaliacaoRisco());
        arvore.setResponsavelInspecao(dto.getResponsavelInspecao());
        arvore.setObservacoesAdicionais(dto.getObservacoesAdicionais());
        arvore.setSituacaoRecomendada(dto.getSituacaoRecomendada());
        arvore.setProximaInspecao(dto.getProximaInspecao());
        return arvore;
    }

    // --- R (READ): Buscar Árvore por ID ---
    public Optional<Arvore> buscarPorId(Long arvoreId) {
        return arvoreRepository.findById(arvoreId);
    }

    // --- R (READ): Listar Árvores por Projeto ---
    public List<Arvore> listarPorProjeto(Long projetoId, Long donoId, String donoTipo) {

        // 1. CHECAGEM DE PROPRIEDADE:
        if (!projetoService.isDonoDoProjeto(projetoId, donoId, donoTipo)) {
            throw new RuntimeException("Acesso negado. Você não é o dono ou não tem permissão para listar as árvores deste projeto.");
        }

        // 2. Se a checagem passar, retorna a lista
        return arvoreRepository.findAllByProjetoId(projetoId);
    }

    // --- U (UPDATE): Atualizar Árvore ---
    // NOVO: Recebe donoId e donoTipo na assinatura
    public Arvore atualizar(Long arvoreId, ArvoreCadastroDTO dto, Long donoId, String donoTipo) {

        Optional<Arvore> arvoreOpt = arvoreRepository.findById(arvoreId);
        if (arvoreOpt.isEmpty()) {
            throw new RuntimeException("Árvore com ID " + arvoreId + " não encontrada para atualização.");
        }

        Arvore arvoreExistente = arvoreOpt.get();
        Long projetoId = arvoreExistente.getProjeto().getId(); // Pega o ID do projeto da árvore

        // CHECAGEM DE PROPRIEDADE
        if (!projetoService.isDonoDoProjeto(projetoId, donoId, donoTipo)) {
            throw new RuntimeException("Acesso negado. Você não tem permissão para modificar esta árvore.");
        }

        // Mapeamento dos campos que podem ser atualizados
        arvoreExistente.setNomePopular(dto.getNomePopular());
        arvoreExistente.setAlturaMetros(dto.getAlturaMetros());
        arvoreExistente.setAvaliacaoRisco(dto.getAvaliacaoRisco());


        return arvoreRepository.save(arvoreExistente);
    }

    // --- D (DELETE): Excluir Árvore ---
    public void excluir(Long arvoreId, Long donoId, String donoTipo) {

        Arvore arvore = arvoreRepository.findById(arvoreId)
                .orElseThrow(() -> new RuntimeException("Árvore com ID " + arvoreId + " não encontrada para exclusão."));

        // CHECAGEM DE PROPRIEDADE
        if (!projetoService.isDonoDoProjeto(arvore.getProjeto().getId(), donoId, donoTipo)) {
            throw new RuntimeException("Acesso negado. Você não tem permissão para excluir esta árvore.");
        }

        arvoreRepository.delete(arvore);
    }
}