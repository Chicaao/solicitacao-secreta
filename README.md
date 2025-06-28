# Solicitação Secreta (Secret Request)

![Foundry Version](https://img.shields.io/badge/Foundry-v11%20|%20v12-orange)
![D&D 5e](https://img.shields.io/badge/System-D&D_5e-red)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Um módulo simples para o Foundry VTT que permite ao Mestre solicitar uma rolagem de perícia de um jogador de forma que o resultado seja visível apenas para o Mestre.

## Funcionalidades

- Adiciona um novo ícone ao HUD do token (visível apenas para o Mestre).
- Permite que o Mestre selecione qualquer perícia do sistema D&D 5e para solicitar.
- Abre um diálogo de rolagem na tela do jogador alvo.
- Garante que a rolagem resultante seja "cega", aparecendo no chat apenas para o Mestre.

## Como Usar

1.  Como Mestre, clique com o botão direito no token de um personagem de jogador.
2.  No HUD (menu do token), clique no ícone de espião (<i class="fas fa-user-secret"></i>).
3.  Uma janela aparecerá com uma lista de todas as perícias. Clique na perícia desejada.
4.  O jogador receberá um prompt para rolar aquela perícia.
5.  O resultado aparecerá como uma rolagem cega no chat, visível apenas para você.

## Instalação

1.  No menu de Configuração do Foundry VTT, vá para a aba "Add-on Modules".
2.  Clique no botão "Install Module".
3.  Cole a seguinte URL no campo "Manifest URL" e clique em "Install":
    `URL_DO_SEU_MODULE.JSON_NO_GITHUB` (quando você o publicar)

## Licença

Este projeto é licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
