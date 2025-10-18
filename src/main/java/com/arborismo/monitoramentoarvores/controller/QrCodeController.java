package com.arborismo.monitoramentoarvores.controller;

import com.arborismo.monitoramentoarvores.service.QrCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/qr")
public class QrCodeController {

    @Autowired
    private QrCodeService qrCodeService;

    // ENDPOINT PROTEGIDO: GET /api/qr/download/{numeroPlaqueta}
    // A rota deve ser protegida para que apenas usuários logados possam baixar os QRs.
    @GetMapping("/download/{numeroPlaqueta}")
    public ResponseEntity<byte[]> downloadQrCode(@PathVariable String numeroPlaqueta) {

        try {
            // 1. Chamar o serviço para gerar o array de bytes da imagem PNG
            byte[] qrCodeImage = qrCodeService.generateQrCode(numeroPlaqueta);

            // 2. Configurar os Headers da Resposta
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_PNG);
            headers.setContentLength(qrCodeImage.length);
            headers.setContentDispositionFormData("attachment", numeroPlaqueta + ".png"); // Força o download

            // 3. Retornar o arquivo com status 200 OK
            return new ResponseEntity<>(qrCodeImage, headers, HttpStatus.OK);

        } catch (Exception e) {
            // Retorna 500 Internal Server Error se a geração falhar
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}