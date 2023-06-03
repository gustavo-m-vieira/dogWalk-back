# DogWalker

## Descrição

O DogWalker é um serviço de back-end para agendamento de passeios de cachorro. Ele utiliza a express e um banco de dados na AWS para armazenar as informações dos clientes e dos passeios.

## Configuração

Antes de executar o DogWalker, é necessário configurar sua chave de acesso da AWS. Siga os passos abaixo:

1. Crie uma conta na AWS, se ainda não tiver uma.
2. Acesse o Console de Gerenciamento da AWS.
3. Navegue até o serviço IAM (Identity and Access Management).
4. Crie um novo usuário ou use um usuário existente.
5. Adicione permissões de acesso ao usuário para o serviço DynamoDB.
6. Copie a chave de acesso (Access Key) e a chave secreta (Secret Key) do usuário.

## Implantação

Para implantar o banco do DogWalker na AWS usando o Serverless Framework, siga as etapas abaixo:

1. Instale o Serverless Framework globalmente em sua máquina:

   ```shell
   npm install -g serverless
   ```

2. Configure as credenciais da AWS no Serverless Framework. Abra um terminal e execute o seguinte comando:

   ```shell
   serverless config credentials --provider aws --key YOUR_ACCESS_KEY --secret YOUR_SECRET_KEY
   ```

   Substitua `YOUR_ACCESS_KEY` e `YOUR_SECRET_KEY` pelas suas chaves de acesso da AWS.

3. Navegue até o diretório raiz do projeto DogWalker.

4. Execute o seguinte comando para implantar o serviço:

   ```shell
   serverless deploy
   ```

   O Serverless Framework criará os recursos necessários na AWS e fornecerá as informações de URL de acesso à API.

## Execução

Após implantar o serviço DogWalker na AWS, siga as etapas abaixo para executá-lo:

1. Certifique-se de ter o Node.js e o npm instalados em sua máquina.

2. Navegue até o diretório raiz do projeto DogWalker.

3. Instale as dependências do projeto executando o seguinte comando:

   ```shell
   npm install
   ```

4. Baixe as variáveis de ambiente

   ```shell
   sls export-env
   ```

5. Compile o projeto:

   ```shell
   npm run build
   ```

6. Inicie o serviço DogWalker:

   ```shell
   npm run start
   ```

   O serviço DogWalker agora está em execução e pronto para receber solicitações.

## API Endpoints

O serviço DogWalker possui os seguintes endpoints da API:

🚧 Em Construção 🚧

Essa parte da página está em construção. Pedimos desculpas pelo inconveniente. Em breve, ela estará disponível com todas as informações necessárias. Agradecemos a sua compreensão.

## Contribuição

Contribuições são bem-vindas! Se você encontrar algum problema, tiver uma ideia de melhoria ou quiser adicionar uma nova funcionalidade, fique à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a licença [MIT](LICENSE).
