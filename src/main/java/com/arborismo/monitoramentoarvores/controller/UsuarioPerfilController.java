package com.arborismo.monitoramentoarvores.controller;

import com.arborismo.monitoramentoarvores.dto.UsuarioPerfilResponseDTO;
import com.arborismo.monitoramentoarvores.dto.EmpresaPerfilResponseDTO;
import com.arborismo.monitoramentoarvores.model.Usuario;
import com.arborismo.monitoramentoarvores.model.Empresa;
import com.arborismo.monitoramentoarvores.repository.UsuarioRepository;
import com.arborismo.monitoramentoarvores.repository.EmpresaRepository;
import com.arborismo.monitoramentoarvores.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.arborismo.monitoramentoarvores.dto.UsuarioUpdateDTO;
import com.arborismo.monitoramentoarvores.service.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioPerfilController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EmpresaRepository empresaRepository;


    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/perfil")
    public ResponseEntity<?> obterPerfil(Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Long id = userDetails.getId();
        String tipo = userDetails.getTipoUsuario();

        if (tipo.equals("PF")) {
            Usuario usuario = usuarioRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

            UsuarioPerfilResponseDTO dto = new UsuarioPerfilResponseDTO();
            dto.setId(usuario.getId());
            dto.setNomeCompleto(usuario.getNomeCompleto());
            dto.setCpf(usuario.getCpf());
            dto.setEmail(usuario.getEmail());
            dto.setTelefone(usuario.getTelefone());
            dto.setDataNascimento(usuario.getDataNascimento() != null ? usuario.getDataNascimento().toString() : null);

            dto.setCep(usuario.getCep());
            dto.setEstado(usuario.getEstado());
            dto.setCidade(usuario.getCidade());
            dto.setBairro(usuario.getBairro());
            dto.setRua(usuario.getRua());
            dto.setNumero(usuario.getNumero());
            dto.setComplemento(usuario.getComplemento());

            return ResponseEntity.ok(dto);

        } else { // PJ

            Empresa empresa = empresaRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Empresa não encontrada."));

            EmpresaPerfilResponseDTO dto = new EmpresaPerfilResponseDTO();
            dto.setId(empresa.getId());
            dto.setRazaoSocial(empresa.getRazaoSocial());
            dto.setNomeFantasia(empresa.getNomeFantasia());
            dto.setCnpj(empresa.getCnpj());
            dto.setEmailCorporativo(empresa.getEmailCorporativo());
            dto.setTelefone(empresa.getTelefone());

            dto.setCep(empresa.getCep());
            dto.setEstado(empresa.getEstado());
            dto.setCidade(empresa.getCidade());
            dto.setBairro(empresa.getBairro());
            dto.setRua(empresa.getRua());
            dto.setNumero(empresa.getNumero());
            dto.setComplemento(empresa.getComplemento());

            dto.setNomeContato(empresa.getNomeContato());
            dto.setCargoContato(empresa.getCargoContato());

            return ResponseEntity.ok(dto);
        }
    }

    @PutMapping("/perfil")
    public ResponseEntity<?> atualizarPerfil(@RequestBody UsuarioUpdateDTO dto, Authentication authentication) {
        try {
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            Long id = userDetails.getId();

            usuarioService.atualizarPerfil(id, dto);

            return ResponseEntity.ok("Perfil atualizado com sucesso!");

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
