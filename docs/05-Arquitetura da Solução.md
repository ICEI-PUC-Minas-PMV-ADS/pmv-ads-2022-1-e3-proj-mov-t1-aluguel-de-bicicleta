# Arquitetura da Solução

<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>

Nesta seção apresentamos a definição da estrutura do software em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

![Arquitetura da Solução](img/02-mob-arch.png)

## Diagrama de Classes

Diagrama que ilustra as classes que compõem o sistema, bem como seus atributos, métodos e relações entre objetos.

<p align="center">
    <img src="img/diagramas/diagrama-classe.svg" width="700">
</p>

## Modelo ER

Diagrama que descreve o conjunto de entidades do sistema, seus atributos e relacionamentos.

<p align="center">
    <img src="img/diagramas/modelo-er.drawio.png" width="700">
</p>

## Esquema Relacional

Esquema que representa o relacionamento entre as tabelas que armazenam os dados necessários ao sistema.

<p align="center">
    <img src="img/diagramas/esquema-relacional.drawio.png" width="700">
</p>

## Modelo Físico

O arquivo banco.sql contendo os scripts de criação das tabelas do banco de dados foi disponibilizado pasta src\bd.

## Tecnologias Utilizadas

#### [Typescript](https://pt.wikipedia.org/wiki/TypeScript) 
TypeScript é uma linguagem de programação de código aberto desenvolvida pela Microsoft. É um superconjunto sintático estrito de JavaScript e adiciona tipagem estática opcional à linguagem.

#### [Styled Components](https://medium.com/nossa-coletividad/styled-components-padr%C3%B5es-em-produ%C3%A7%C3%A3o-4958e91d4d92)
Styled-components é uma biblioteca para React e React Native que permite que você use estilos ao nível de componente na sua aplicação. Eles são escritos em uma mistura de JavaScript com CSS.

#### [Eslint](https://oieduardorabelo.medium.com/evitando-erros-com-eslint-91b5a4bb9471)
ESLint é uma ferramenta de lint plugável para JavaScript e JSX.
Linting é o processo de aplicar regras a uma base de código e destacar padrões ou códigos problemáticos que não aderem a determinadas diretrizes de estilo.

O linting moderno de JavaScript também inclui a correção automática de problemas. E uma das ferramentas que permitem esse tipo de verificação é o ESLint, um projeto de código aberto em JavaScript que permite que os desenvolvedores descubram problemas com seu código sem a necessidade de executá-lo.

#### [Node.js](https://tecnoblog.net/410498/o-que-e-node-js-guia-para-iniciantes/)
Node.js é um ambiente de execução JavaScript que permite executar aplicações desenvolvidas com a linguagem de forma autônoma, sem depender de um navegador. Com ele, é possível criar praticamente qualquer tipo de aplicações web, desde servidores para sites estáticos e dinâmicos, até APIs e sistemas baseados em microserviços.

#### [React Native](https://reactnative.dev/)
React Native é uma biblioteca Javascript criada pelo Facebook. É usada para desenvolver aplicativos para os sistemas Android e iOS de forma nativa.

#### [Jest](https://www.devmedia.com.br/teste-unitario-com-jest/41234)
Jest é um framework de teste unitário de código aberto em JavaScript criado pelo Facebook a partir do framework Jasmine. Jest é uma das ferramentas de teste unitário mais difundidas dentro da comunidade de JavaScript.

#### [Cypress](https://medium.com/@faelbercam/um-overview-sobre-cypress-io-framework-de-automa%C3%A7%C3%A3o-de-testes-end-to-end-dc438b9ee7a1)
O Cypress.io é um framework de testes automatizados end-to-end usando JavaScript! O Cypress também opera na camada de rede, lendo e alterando o tráfego da web em tempo real. Isso permite que o Cypress não apenas modifique tudo que entra e sai do navegador, mas também altere o código que pode interferir em sua capacidade de automatizar o navegador. 

O Cypress por fim, controla todo o processo de automação de cima para baixo, o que o coloca em uma posição única de poder entender tudo o que acontece dentro e fora do navegador. Isso significa que ele é capaz de fornecer resultados mais consistentes do que qualquer outra ferramenta de testes.

#### [Vscode](https://pt.wikipedia.org/wiki/Visual_Studio_Code)
O Visual Studio Code é um editor de código-fonte desenvolvido pela Microsoft para Windows, Linux e macOS. Ele inclui suporte para depuração, controle de versionamento Git incorporado, realce de sintaxe, complementação inteligente de código, snippets e refatoração de código. Ele é customizável, permitindo que os usuários possam mudar o tema do editor, teclas de atalho e preferências. Ele é um software livre e de código aberto, apesar do download oficial estar sob uma licença proprietária.

## Hospedagem

O aplicativo Nossa Bike será hospedado na plataforma Heroku. A escolha dessa plataforma se justifica pela possibilidade de realizar o deploy de aplicações construídas com React Native de maneira gratuita, simplificada e rápida.


<!-- > **Links Úteis**:
>
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting Started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando Seu Site No Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html) -->

## Qualidade de Software

Conceituar qualidade de fato é uma tarefa complexa, mas ela pode ser vista como um método gerencial que através de procedimentos disseminados por toda a organização, busca garantir um produto final que satisfaça às expectativas dos stakeholders.

No contexto de desenvolvimento de software, qualidade pode ser entendida como um conjunto de características a serem satisfeitas, de modo que o produto de software atenda às necessidades de seus usuários. Entretanto, tal nível de satisfação nem sempre é alcançado de forma espontânea, devendo ser continuamente construído. Assim, a qualidade do produto depende fortemente do seu respectivo processo de desenvolvimento.

A norma internacional ISO/IEC 25010, que é uma atualização da ISO/IEC 9126, define oito características e 30 subcaracterísticas de qualidade para produtos de software. Com base nessas características e nas respectivas sub-características, identificamos as sub-características que melhor de relacionam com projeto de software proposto, considerando-se alguns aspectos simples de qualidade. 

| Característica de qualidade | Subcaracteristicas de qualidade escolhidas |     Justificativa     | 
|-----------------------------|--------------------------------------------|-----------------------|
| Funcionalidade | Adequação; Segurança de Acesso | Verificar os atributos do software que evidenciam a apropriação para tarefas especificadas e que evidenciam sua capacidade de evitar o acesso não autorizado a dados | 
| Usabilidade | Conformidade; Apreensibilidade | Pensar em usabilidade é fundamental para entregar uma experiência positiva e alcançar os objetivos propostos | 
| Eficiência | Comportamento em relação ao tempo | Avaliar o relacionamento entre o nível de desempenho do software e a quantidade de recursos utilizada , sob condições estabelecidas  |
| Portabilidade | Adaptabilidade; Capacidade de instalação | Testar a facilidade de instalação a capacidade do software em ser transferido de um ambiente para outro | 
| Manutenibilidade | Estabilidade; Testabilidade | Validar o software e avaliar o risco de efeitos inesperados ocasionados por modificações |



| Subcaracterística  |                      Métricas  de Qualidade de Software               |  Peso  |
|--------------------|-----------------------------------------------------------------------|--------|
| Adequação | O software corresponde ao esperado para funcionalidade proposta? | Alto
| Adequação | O software é capaz de executar completamente todas as funções propostas? | Alto |
| Segurança de Acesso | Os dados coletados no cadastro estão armazenados de forma segura?  | Alto |
| Segurança de Acesso | O software possui etapas de autorização e autenticação no momento do acesso?  | Alto |
| Conformidade | O software está em conformidade com a Lei Geral de Proteção de Dados? | Alto |
| Conformidade | O software está em conformidade com as normas, convenções e regulamentações previstas em lei para a atividade proposta? | Alto |
| Apreensibilidade | O software apresenta telas que são de uso intuitivo? | Alto |
| Apreensibilidade | O software apresenta funcionalidades que são compreendidas facilmente? | Alto |
| Comportamento em relação ao tempo | O software apresenta tempo de resposta esperado em troca de telas? | Alto |
| Comportamento em relação ao tempo | O software apresenta velocidade na execução e no processamento de suas funções? | Alto |
| Adaptabilidade | O software é capaz de executar todas as suas funções em diferentes dispositivos?  | Alto |
| Capacidade de instalação | O software pode ser instalado de maneira rápida e intuitiva? | Alto |
| Estabilidade | O software apresenta falhas? | Alto |
| Estabilidade | O software apresenta comportamento inesperado após modificações? | Alto |
| Testabilidade | O software pode ser testado após modificações?| Alto |
| Testabilidade | O software possui registro de testes antes de atualizações? | Alto |




<!-- > **Links Úteis**:
>
> - [ISO/IEC 25010:2011 - Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — System and software quality models](https://www.iso.org/standard/35733.html/)
> - [Análise sobre a ISO 9126 – NBR 13596](https://www.tiespecialistas.com.br/analise-sobre-iso-9126-nbr-13596/)
> - [Qualidade de Software - Engenharia de Software 29](https://www.devmedia.com.br/qualidade-de-software-engenharia-de-software-29/18209/) -->
