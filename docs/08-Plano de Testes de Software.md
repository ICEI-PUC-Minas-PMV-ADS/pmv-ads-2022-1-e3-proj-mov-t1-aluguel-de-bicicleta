# Plano de Testes de Software


<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Especificação do Projeto</a></span>, <a href="3-Projeto de Interface.md"> Projeto de Interface</a>

Os requisitos para realização dos testes de software são:
- API publicada na Internet e apk disponível para download ou disponível para o servidor local do visual studio code 
- Navegador da Internet - Chrome, safari e Firefox
- Conectividade de Internet para acesso às plataformas (APIs)

Os testes funcionais a serem realizados no aplicativo são descritos a seguir.

<br>

|Caso de teste   | CT-001 - Sistema deve permitir que usuários se cadastrem
|------|-----------------------------------------|
|Requisitos associados | RF-001​​  Permitir que o usuário crie cadastro ​ <br/>
|Objetivo do teste | Verificar se o sistema permite que o usuário se cadastre
|Passos | <ol><li>Entrar no navegador </li> <li>Acessar o site </li> <li> Clicar em "Login" e "Ainda não tenho uma conta" </li> <li> Inserir os dados </li> <li> Realizar cadastro</li></ol>
|Critérios de Êxito | <ul><li>Aparecer mensagem de êxito ao criar o cadastro </li> <li>Dados devem ser salvos no banco de dados</li> <li> Senha deve ser cryptografada </li> <li> Deve ser gerado um identificador único para aquele usuário</li></ul>

<br>

|Caso de teste   | CT-002 - Sistema deve permitir que usuários efetuem login
|------|-----------------------------------------|
|Requisitos associados | RF-002​  Permitir que o usuário efetue login
|Objetivo do teste | Verificar se o sistema permite que usuário realize login
|Passos | <ol><li> Entrar no navegador </li><li> Clicar Login </li><li>  Digitar dados para login </li><li> Clicar em entrar</li></ol>
|Critérios de Êxito | <ul><li>Aparecer mensagem de êxito ao realizar login.</li> <li> Caso o login não seja realizado, usuário deverá ser informado</li> <li>Site deve conseguir acessar o banco de dados para permitir o login</li></ul>

<br>

|Caso de teste   | CT-003 - Sistema deve permitir que usuários efetuem logout
|------|-----------------------------------------|
|Requisitos associados | RF-003  Permitir que o usuário efetue logout​
|Objetivo do teste | Verificar se o sistema permite que usuário realize logout
|Passos | <ol><li>  Clicar em menu </li><li>  Selecionar logout </li><li> Selecionar que confirma realizar logout</li></ol>
|Critérios de Êxito | <ul><li>Voltar a página Home.</li> <li> Caso o logout não seja realizado, usuário deverá ser informado</li></ul>

<br>

|Caso de teste   | CT-004 - Sistema deve permitir que usuários vejam lista de localidades
|------|-----------------------------------------|
|Requisitos associados | RF-004​​ Permitir que o usuário visualize uma lista das localidades
|Objetivo do teste | Verficar se o sistema permite que o usuário vejam os pontos onde pode encontrar bicicletas
|Passos | <ol><li>Entrar no app</li><li>Acessar o site</li><li>Fazer login</li><li>Abrir o menu</li><li>Clicar em "Bicicletas"</li></ol>
|Critérios de Êxito | <ul><li>Usuário consegue visualizar uma lista com todos os pontos</li></ul>

<br>

|Caso de teste   | CT-005 - Sistema deve permitir que usuários realizem buscas 
|------|-----------------------------------------|
|Requisitos associados | RF-05 Permitir que o usuário filtre a lista de bikes​​
|Objetivo do teste |  Verificar se o sistema permite que o usuário realize buscas por cor, local, avaliação e modelo
|Passos | <ol><li>Entrar no app</li><li>Acessar o site</li><li>Fazer login</li><li>Clicar em "Bicicletas"</li><li>Selecionar tipos filtros desejados</li></ol>
|Critérios de Êxito | <ul><li>a lista de bicicletas mostrará apenas bicicletas que cumpram os requisitos selecionados</li></ul>

<br>

|Caso de teste   | CT-006 - Sistema deve permitir que o usuário reserve uma bike
|------|-----------------------------------------|
|Requisitos associados | RF-006​​  Permitir que o usuário reserve uma bike <br> RF-007 - Permitir que o usuário veja suas reservas​​ <br> RF-008 - Permitir que o usuário cancele sua reserva
|Objetivo do teste | Verficar se o sistema permite que o usuário reserve uma bicicleta
|Passos | <ol><li>Entrar no app</li><li>Fazer login</li><li>Abrir o menu</li><li>Clicar em "Bicicletas"</li><li>selecionar datas</li><li>clicar em uma bike</li><li>Clicar em reservar</li><li>Confirma que deseja reservar</li><li>Entrar em minhas reservas</li><li>Clicar em cancelar reserva</li><li>Confirma que deseja cancelar</li></ol>
|Critérios de Êxito | <ul><li>Uma entidade de reserva é criada no banco</li><li>A bike reservada não aparece mais para buscas dentro das mesmas datas</li><li>A reserva aparece no sessão "minhas reservas"</li><li>Ao cancelar, a reserva é removida do banco</li><li>Caso haja qualquer falha de requisição, o usuário deve ser avisado</li></ul>

<br>

|Caso de teste   | CT-007 - Sistema deve permitir que usuários avaliem bicicletas
|------|-----------------------------------------|
|Requisitos associados | RF-009  Permitir que o usuário avalie uma bike
|Objetivo do teste | Verificar se o sistema permite que o usuário avalie uma bicicleta com uma nota de 1 a 5
|Passos | <ol><li>Entrar no app</li><li>Acessar o site</li><li>Fazer login</li><li>Abrir o menu</li><li>Clicar em "minhas reservas"</li><li>Clicar na reserva desejada</li><li>avaliar a bike</li>
|Critérios de Êxito | <ul><li>a média de notas da bike é alterada</li></ul>

<br>

|Caso de teste   | CT-008 - Sistema deve permitir que gestores criem, alterem e deletem uma bicicleta
|------|-----------------------------------------|
|Requisitos associados | RF-010  Permitir que o gestor crie uma bike <br>RF-011  Permitir que o gestor edite uma bike <br>RF-012  Permitir que o gestor delete uma bike <br>
|Objetivo do teste | Verificar se o sistema permite que o gestor crie, edite e delete uma bike
|Passos | <ol><li>Entrar no app</li><li>Fazer login</li><li>Abrir o menu</li><li>Clicar em "Bicicletas"</li><li>Clicar no botão de adicionar</li><li>Preencher infos</li><li>Clicar salvar</li><li>Vizualizar bicicleta criada</li><li>Clicar no ícone de edição</li><li>Editar campo desejado do evento</li><li>Salvar</li><li>Visualizar alteração</li><li>Clicar na lixeira</li><li>Confirmar que deseja deletar</li></ol>
|Critérios de Êxito | <ul><li>Caso haja qualquer erro de preenchimento, o usuário deve ser comunicado</li><li>Deve haver uma confirmação sempre antes de salvar uma edição na bicicleta.</li><li>Caso haja qualquer falha de requisição, o usuário deve ser avisado</li><li>Bicicleta deve ser criado, editado e deletado no banco</li></ul>

<br>

|Caso de teste   | CT-009 - Sistema deve permitir que gestores criem, edite e delete um usuário
|------|-----------------------------------------|
|Requisitos associados | RF-013  	Permitir que um gestor crie cadastro para outro gestor ou usuário <br>RF-014  Permitir que o gestor edite um usuário <br> RF-015 Permitir que o gestor delete um usuário
|Objetivo do teste | Verificar se o sistema permite que o gestor crie, edite e delete um usuário
|Passos | <ol><li>Entrar no app</li><li>Fazer login</li><li>Abrir o menu</li><li>Clicar em "Usuários"</li><li>Clicar no botão de adicionar</li><li>Preencher infos</li><li>Clicar salvar</li><li>Vizualizar usuário criado</li><li>Clicar no ícone de edição</li><li>Editar campo desejado do evento</li><li>Salvar</li><li>Visualizar alteração</li><li>Clicar na lixeira</li><li>Confirmar que deseja deletar</li></ol>
|Critérios de Êxito | <ul><li>Caso haja qualquer erro de preenchimento, o usuário deve ser comunicado</li><li>Deve haver uma confirmação sempre antes de salvar uma edição na usuário.</li><li>Caso haja qualquer falha de requisição, o usuário deve ser avisado</li><li>Usuário deve ser criado, editado e deletado no banco</li></ul>

<br>

|Caso de teste   | CT-010 - Sistema deve permitir que gestores vejam lista de usuários
|------|-----------------------------------------|
|Requisitos associados | RF-016 - Permitir que o gestor veja uma lista de usuários
|Objetivo do teste | Verificar se o sistema permite que o gestor vizualise lista de usuários
|Passos | <ol><li>Entrar no app</li><li>Fazer login</li><li>Abrir o menu</li><li>Clicar em "Usuários"</li></ol>
|Critérios de Êxito | <ul><li>Gestor deve ver lista de usuários</li></ul>

<br>

|Caso de teste   | CT-011 - Sistema deve permitir que gestores vejam lista de usuários
|------|-----------------------------------------|
|Requisitos associados | RF-017 - Permitir que o gestor veja uma lista de bicicletas
|Objetivo do teste | Verificar se o sistema permite que o gestor vizualise lista de usuários
|Passos | <ol><li>Entrar no app</li><li>Fazer login</li><li>Abrir o menu</li><li>Clicar em "Bicicletas"</li></ol>
|Critérios de Êxito | <ul><li>Gestor deve ver lista de bicicletas</li></ul>


<br> 
## Ferramentas de Testes
 
- Jest
- Cypress
- Vscode test Explorer
