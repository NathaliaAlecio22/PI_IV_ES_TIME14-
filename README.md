# 🌿Sentinela - Monitoramento de Árvores 

## Link do figma:
https://www.figma.com/design/dHOvCDxzCoLIFb2umSBl3T/Site-Sentinela---Projeto-Integrador-IV?node-id=0-1&t=bqzKl7mLI9t2G9DX-1

## 📖 Visão Geral
O **Sentinela** é um sistema **RESTful** desenvolvido em **Spring Boot** para o **monitoramento e gestão de ativos ambientais (árvores)**.  
A aplicação permite o **cadastro seguro de usuários (Pessoa Física e Jurídica)**, o **gerenciamento de projetos de arborismo (CRUD)** e a **identificação única de árvores via QR Code**.

A arquitetura foi projetada com **Persistência Poliglota**, atendendo aos requisitos de **robustez** e à **comunicação via Socket**, conforme as especificações do curso.

---

## 🛠️ Tecnologias Principais

| Categoria | Tecnologia | Justificativa |
|------------|-------------|----------------|
| **Backend Core** | Java 17 + Spring Boot 3.x | Estrutura robusta e moderna para APIs REST. |
| **Banco de Dados** | MySQL (via Spring Data JPA) | Utilizado para o core do projeto, garantindo integridade e relações entre entidades. |
| **Segurança** | Spring Security + JWT + BCrypt | Padrão da indústria para autenticação e autorização *stateless*. |
| **Funcionalidades Extras** | Google ZXing | Geração de imagens PNG de QR Code para cada árvore. |
| **Comunicação Especial** | Java Puro (Sockets) | Requisito acadêmico: módulo separado para Chatbot (Cliente-Servidor). |

---

## 🚀 Funcionalidades do MVP

### 🔐 1. Módulo de Autenticação e Segurança
- **Cadastro Unificado:** permite registro de **Pessoa Física (PF)** e **Pessoa Jurídica (PJ)**.  
- **Autenticação Segura:** login via e-mail/CNPJ, com retorno de **Token JWT**.  
- **Criptografia:** senhas armazenadas com **BCryptPasswordEncoder**.  
- **Recuperação de Senha:** fluxo completo com geração de **token UUID** e simulação de envio de e-mail.  
- **Autorização:** filtro JWT protege todas as rotas, garantindo **ownership** (PF não edita dados de PJ e vice-versa).

---

### 🌳 2. Módulo de Gerenciamento de Dados (CRUD)
- **Projetos:** criação e gerenciamento de projetos, automaticamente associados ao usuário logado.  
- **Árvores:** CRUD completo com informações **fitossanitárias detalhadas** (altura, idade, inclinação, estado, etc.).  
- **Consulta Pública:** rota `/api/arvores/scan/{plaquetaId}` permite a leitura dos dados de uma árvore via **QR Code**, sem necessidade de autenticação.

---

## ⚙️ Configuração Inicial (Para Desenvolvedores)

### 🧩 1. Pré-requisitos
Certifique-se de ter instalado:
- **JDK 17 LTS**  
- **MySQL Server** e **MySQL Workbench**  
- **IntelliJ IDEA** (ou IDE de sua preferência)

---

### 🗄️ 2. Configuração do Banco de Dados
Crie o banco de dados com o nome **exato** abaixo no MySQL Workbench:

```sql
CREATE DATABASE monitoramento_arvores_db;

O Hibernate fará automaticamente o mapeamento das tabelas:

usuarios

empresas

projetos

arvores
```

# CONFIGURAÇÕES LOCAIS DO MYSQL
spring.datasource.username=root
spring.datasource.password=SUA_SENHA_LOCAL_DO_MYSQL

# CHAVE SECRETA DO JWT (DEVE SER IGUAL PARA TODO O GRUPO)
jwt.secret=COLE_A_CHAVE_SECRETA_JWT_AQUI

### Módulo Chatbot
--Servidor de Socket em Java Puro
--Mongo DB
