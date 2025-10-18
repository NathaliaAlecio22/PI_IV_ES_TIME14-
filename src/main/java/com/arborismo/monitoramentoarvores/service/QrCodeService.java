package com.arborismo.monitoramentoarvores.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class QrCodeService {

    private static final int WIDTH = 300;
    private static final int HEIGHT = 300;

    /**
     * Gera um QR Code a partir de uma string de dados e retorna a imagem em formato PNG (array de bytes).
     * @param data A string que será codificada no QR Code (ex: o numeroPlaqueta).
     * @return Array de bytes PNG da imagem do QR Code.
     * @throws IOException Se houver erro na escrita do stream.
     */
    // QrCodeService.java (Substitua SÓ o método generateQrCode)

    String SEU_IP_LOCAL = "10.244.151.20";

    public byte[] generateQrCode(String data) throws Exception {

        // --- VALIDAÇÃO INICIAL: Evita quebra se a plaqueta for nula ---
        if (data == null || data.isEmpty()) {
            throw new IllegalArgumentException("O ID da plaqueta (data) não pode ser nulo ou vazio.");
        }

        // A URL que será codificada no QR Code
        String content ="http://" + SEU_IP_LOCAL + ":8080/api/arvores/scan/" + data;

        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()){

            // 1. Cria a Matriz de Bits do QR Code
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(content, BarcodeFormat.QR_CODE, WIDTH, HEIGHT);


            // 2. Converte a Matriz em PNG
            MatrixToImageWriter.writeToStream(bitMatrix, "PNG", baos);

            return baos.toByteArray();
        } catch (Exception e) {

            throw new IOException("Erro ao gerar QR Code: " + e.getMessage(), e);
        }
    }
}