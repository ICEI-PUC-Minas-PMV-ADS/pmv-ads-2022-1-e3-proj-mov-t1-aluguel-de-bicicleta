# Plano de Testes de Software


<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Especificação do Projeto</a></span>, <a href="3-Projeto de Interface.md"> Projeto de Interface</a>

Os requisitos para realização dos testes de software são:
- API publicada na Internet e apk disponível para download
- Emulador Android ou ios ou aparelho android ou ios 
- Conectividade de Internet para acesso às plataformas (APIs)

Os testes funcionais a serem realizados no aplicativo são descritos a seguir.

<br>

|Caso de teste   | CT-001 - Sistema deve permitir que usuários se cadastrem
|------|-----------------------------------------|
|Requisitos associados | RF-001​​  Permitir que o usuário crie cadastro ​ <br/>
|Objetivo do teste | Verificar se o sistema permite que o usuário se cadastre
|Critérios de Êxito | <ul><li>Aparecer mensagem de êxito ao criar o cadastro </li> <li>Dados devem ser salvos no banco de dados</li> <li> Senha deve ser cryptografada </li> <li> Deve ser gerado um identificador único para aquele usuário</li></ul>

<br>

|Caso de teste   | CT-002 - Sistema deve permitir que usuários efetuem login
|------|-----------------------------------------|
|Requisitos associados | RF-002​  Permitir que o usuário efetue login
|Objetivo do teste | Verificar se o sistema permite que usuário realize login
|Critérios de Êxito | <ul><li>Aparecer mensagem de êxito ao relizar login </li><li>Redirecionar usuário para menu principal em caso de sucesso.</li> <li> Caso o login não seja realizado, usuário deverá ser informado</li></ul>

<br>

|Caso de teste   | CT-003 - Sistema deve permitir que usuários efetuem logout
|------|-----------------------------------------|
|Requisitos associados | RF-003  Permitir que o usuário efetue logout​
|Objetivo do teste | Verificar se o sistema permite que usuário realize logout
|Critérios de Êxito | <ul><li>Voltar a página Home.</li> <li> Caso o logout não seja realizado, usuário deverá ser informado</li></ul>

<br>

|Caso de teste   | CT-004 - Sistema deve permitir que usuários realizem buscas 
|------|-----------------------------------------|
|Requisitos associados | RF-05 Permitir que o usuário filtre a lista de bikes​​
|Objetivo do teste |  Verificar se o sistema permite que o usuário realize buscas por cor, local, avaliação e modelo
|Critérios de Êxito | <ul><li>A lista de bicicletas mostrará apenas bicicletas que cumpram os requisitos selecionados</li></ul>

<br>

|Caso de teste   | CT-005 - Sistema deve permitir que o usuário reserve uma bike
|------|-----------------------------------------|
|Requisitos associados | RF-006​​  Permitir que o usuário reserve uma bike 
|Objetivo do teste | Verficar se o sistema permite que o usuário reserve uma bicicleta
|Critérios de Êxito | <ul><li>Uma entidade de reserva é criada no banco</li><li>A bike reservada não aparece mais para buscas dentro das mesmas datas</li><li>A reserva aparece na sessão "minhas reservas"</li><li>Caso haja qualquer falha de requisição, o usuário deve ser avisado</li></ul>

<br>

|Caso de teste   | CT-006 - Sistema deve permitir que o usuário cancele uma reserva
|------|-----------------------------------------|
|Requisitos associados | RF-008 - Permitir que o usuário cancele sua reserva
|Objetivo do teste | Verficar se o sistema permite que o usuário cancele uma reserva
|Critérios de Êxito | <ul><li>Ao cancelar, a reserva é removida do banco</li><li>A bike reservada volta a aparecer para buscas dentro das mesmas datas</li><li>A reserva não aparece na sessão "minhas reservas"</li><li>Caso haja qualquer falha de requisição, o usuário deve ser avisado</li></ul>

<br>

|Caso de teste   | CT-007 - Sistema deve permitir que o usuário visualize suas reservas
|------|-----------------------------------------|
|Requisitos associados | RF-007 - Permitir que o usuário veja suas reservas
|Objetivo do teste | Verficar se o sistema permite que o usuário visualize suas reservas
|Critérios de Êxito | <ul><li>Ao acessar a sessão "minhas reservas", deve aparecer a lista de reservas do usuário que constam no banco de dados</li><li>Caso haja qualquer falha de requisição, o usuário deve ser avisado</li></ul>

<br>

|Caso de teste   | CT-008 - Sistema deve permitir que usuários avaliem bicicletas
|------|-----------------------------------------|
|Requisitos associados | RF-009  Permitir que o usuário avalie uma bike
|Objetivo do teste | Verificar se o sistema permite que o usuário avalie uma bicicleta com uma nota de 1 a 5
|Critérios de Êxito | <ul><li>A média de notas da bike é alterada</li></ul>

<br>

|Caso de teste   | CT-009 - Sistema deve permitir que gestores criem, alterem e deletem uma bicicleta
|------|-----------------------------------------|
|Requisitos associados | RF-010  Permitir que o gestor crie uma bike <br>RF-011  Permitir que o gestor edite uma bike <br>RF-012  Permitir que o gestor delete uma bike <br>
|Objetivo do teste | Verificar se o sistema permite que o gestor crie, edite e delete uma bike
|Critérios de Êxito | <ul><li>Caso haja qualquer erro de preenchimento, o usuário deve ser comunicado</li><li>Deve haver uma confirmação sempre antes de salvar uma edição na bicicleta.</li><li>Caso haja qualquer falha de requisição, o usuário deve ser avisado</li><li>Bicicleta deve ser criado, editado e deletado no banco</li></ul>

<br>

|Caso de teste   | CT-010 - Sistema deve permitir que gestores criem, edite e delete um usuário
|------|-----------------------------------------|
|Requisitos associados | RF-013 Permitir que um gestor crie cadastro para outro gestor ou usuário <br>RF-014  Permitir que o gestor edite um usuário <br> RF-015 Permitir que o gestor delete um usuário
|Objetivo do teste | Verificar se o sistema permite que o gestor crie, edite e delete um usuário
|Critérios de Êxito | <ul><li>Caso haja qualquer erro de preenchimento, o usuário deve ser comunicado</li><li>Deve haver uma confirmação sempre antes de salvar uma edição na usuário.</li><li>Caso haja qualquer falha de requisição, o usuário deve ser avisado</li><li>Usuário deve ser criado, editado e deletado no banco</li></ul>

<br>

|Caso de teste   | CT-011 - Sistema deve permitir que gestores vejam lista de usuários
|------|-----------------------------------------|
|Requisitos associados | RF-016 - Permitir que o gestor veja uma lista de usuários
|Objetivo do teste | Verificar se o sistema permite que o gestor visualize lista de usuários
|Critérios de Êxito | <ul><li>Gestor deve ver lista de usuários</li></ul>

<br>

|Caso de teste   | CT-012 - Sistema deve permitir que gestores vejam lista de bicicletas
|------|-----------------------------------------|
|Requisitos associados | RF-017 - Permitir que o gestor veja uma lista de bicicletas
|Objetivo do teste | Verificar se o sistema permite que o gestor visualize lista de usuários
|Critérios de Êxito | <ul><li>Gestor deve ver lista de bicicletas</li></ul>

<br> 
## Técnica de Testes
Os testes serão realizados utilizando o a técnica de teste de caixa-preta, teste funcional, para validação dos requisitos. 
