package com.arborismo.monitoramentoarvores.comunicacao;// com.arborismo.monitoramentoarvores.comunicacao.Comunicado.java
import java.io.Serializable;

// Todos os objetos que serão enviados pelo socket devem implementar Serializable
public abstract class Comunicado implements Serializable {
    private static final long serialVersionUID = 666L;
}