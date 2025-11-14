package com.arborismo.monitoramentoarvores.comunicacao;

// com.arborismo.monitoramentoarvores.comunicacao.Mensagem.java
public class Mensagem extends Comunicado {
    private String texto;
    private static final long serialVersionUID = 777L;

    public Mensagem(String texto) {
        this.texto = texto;
    }

    public String getTexto() {
        return texto;
    }
}