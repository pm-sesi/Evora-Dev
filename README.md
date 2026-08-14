# 🏫 SISGED - Sistema de Gestão Educacional Dinâmico

> **Atividade 12 — Trabalho Final**  
> **Equipe:** Evora-Dev (Grupo 4)  
> **Instituição:** SENAI / FIEMG / SESI  

---

## 📌 Sobre o Projeto

O **SISGED** (Sistema de Gestão Educacional Dinâmico) é uma solução web desenvolvida para otimizar o gerenciamento de turmas, instrutores, salas de aula e agendamentos educacionais. 

O sistema foi construído seguindo rigorosamente o padrão arquitetural **MVC (Model-View-Controller)**, garantindo a separação de responsabilidades entre interface (HTML/CSS/JS), lógica de negócio (PHP) e persistência de dados (MySQL/PDO).

---

## 🛠️ Tecnologias Utilizadas

* **Front-end:** HTML5, CSS3 (Mobile First), JavaScript (ES6+ / Fetch API)
* **Back-end:** PHP 8+ (Programação Orientada a Objetos e Controllers)
* **Banco de Dados:** MySQL (PDO com prepared statements)
* **Servidor Local:** WAMP Server
* **Versionamento:** Git & GitHub

---

## 🏗️ Arquitetura e Estrutura de Pastas (MVC)

```
SISGED/
├── app/                          # BACK-END E REGRAS DE NEGÓCIO
│   ├── config/                   # Conexão com o Banco de Dados (database.php)
│   ├── controllers/              # Processamento de dados e validações PHP
│   └── models/                   # Consultas SQL e métodos PDO
│
├── database/                     # MODELAGEM E SCRIPTS BANCO DE DADOS
│   ├── der_mer/                  # Diagramas de Entidade e Relacionamento
│   └── schema.sql                # Script DDL de criação das tabelas
│
├── public/                       # FRONT-END (Ponto de acesso visível)
│   ├── assets/                   # Imagens e identidade visual FIEMG/SESI
│   ├── css/                      # Estilos globais e responsivos
│   ├── js/                       # Scripts de tela e requisições Fetch/AJAX
│   └── views/                    # Interfaces HTML limpas (sem PHP)
│
├── docs/                         # Documentação, Matriz RACI e Guias do Time
├── index.php                     # Roteador Principal / Entry Point
└── README.md                     # Visão geral do repositório
```
## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
* WAMP Server ou XAMPP com PHP 8.0+ e MySQL ativos.

### Passo a passo
1. Clonar o repositório:
   git clone https://github.com/pm-sesi/Evora-Dev.git

2. Posicionar na pasta do servidor web:
   Mova a pasta do projeto para C:\wamp64\www\SISGED (WAMP) ou C:\xampp\htdocs\SISGED (XAMPP).

3. Configurar o Banco de Dados:
   * Abra o phpMyAdmin (http://localhost/phpmyadmin).
   * Crie um banco de dados chamado sisged.
   * Importe o arquivo localizado em database/schema.sql.

4. Acessar o sistema:
   Abra o navegador e acesse:
   http://localhost/SISGED/public/views/login.html

---

## 📄 Documentação Técnica

Toda a documentação complementar do projeto está armazenada na pasta docs/:
* 📘 Guia de Colaboração Git & Regras de Arquitetura (docs/GUIA_COLABORACAO_GIT.md)
* 📋 Mapeamento de IDs HTML e Contrato de Equipe

---

## 📜 Licença e Créditos

Projeto desenvolvido como requisito de avaliação do curso técnico. Todos os direitos reservados à equipe Evora-Dev e instituições parceiras.
