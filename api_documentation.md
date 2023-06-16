### getTrips

- Método: GET
- Caminho: `/trips`
- Descrição: Este endpoint retorna uma lista de viagens disponíveis.
- Parâmetros:
  - `walkerId` (string, opcional): O ID do passeador para filtrar as viagens.
  - `zipCode` (string, opcional): O código postal para filtrar as viagens.
- Exemplo de solicitação:
  - GET /trips
  - GET /trips?walkerId=1
  - GET /trips?zipCode=12345

Exemplo de resposta bem-sucedida:

```
GET /trips?walkerId=123&startDate=2023-06-15&zipCode=12345
```
Exemplo de resposta bem-sucedida:
```json
Código de status: 200

{
  "id": "abc123",
  "walkerId": "1",
  "dogType": "SHY",
  "duration": 30,
  "slots": 2,
  "startDate": "2021-01-01",
  "dogs": ["1"],
  "addressId": "1"
},
{
  "id": "def456",
  "walkerId": "1",
  "dogType": "SHY",
  "duration": 30,
  "slots": 2,
  "startDate": "2021-01-01",
  "dogs": ["1"],
  "addressId": "1"
}
```

Possíveis códigos de resposta:
- 200: OK. A solicitação foi bem-sucedida e a lista de viagens foi retornada.
- 400: Solicitação inválida. Os parâmetros de consulta fornecidos são inválidos.
- 500: Erro interno do servidor. Ocorreu um erro interno do servidor ao processar a solicitação.

## createDog

- Método: POST
- Caminho: `/dogs`
- Descrição: Este endpoint cria um novo registro de cachorro com base nos dados fornecidos.
- Body:
  - `name` (string, obrigatório): O nome do cachorro.
  - `breed` (string, obrigatório): A raça do cachorro.
  - `size` (enum, obrigatório): O porte do cachorro (valores possíveis: TINY, SMALL, MEDIUM, BIG).
  - `birthDate` (string, obrigatório): A data de nascimento do cachorro (no formato "aaaa-mm-dd").
  - `temperament` (enum, obrigatório): O temperamento do cachorro (valores possíveis: COOL, SHY, ANGRY).
  - `tutorId` (string, obrigatório): O ID do dono do cachorro.

Exemplo de solicitação:
```json
POST /dogs
Content-Type: application/json

{
  "name": "Buddy",
  "breed": "Labrador",
  "size": "MEDIUM",
  "birthDate": "2021-01-01",
  "temperament": "SHY",
  "tutorId": "1"
}
```
Exemplo de resposta bem-sucedida:
```json
Código de status: 201

{
  "id": "abc123",
  "name": "Buddy",
  "breed": "Labrador",
  "size": "MEDIUM",
  "birthDate": "2021-01-01",
  "temperament": "SHY",
  "tutorId": "1"
}
```

Possíveis códigos de resposta:
- 201: Criado. O cachorro foi criado com sucesso.
- 400: Solicitação inválida. Campos obrigatórios estão ausentes na solicitação.
- 404: Não encontrado. O tutor com o ID especificado não foi encontrado.
- 500: Erro interno do servidor. Ocorreu um erro interno do servidor ao processar a solicitação.



## createTrip

- Método: POST
- Caminho: `/users/:userId/trips`
- Descrição: Este endpoint cria uma nova viagem com base nos dados fornecidos.
- Parâmetros:
  - `userId` (string, obrigatório): O ID do usuário (passe como parte da URL).
- Body:
  - `addressId` (string, obrigatório): O ID do endereço da viagem.
  - `dogType` (enum, obrigatório): O temperamento dos cachorros da viagem (valores possíveis: COOL, SHY, ANGRY).
  - `duration` (number, obrigatório): A duração da viagem em minutos.
  - `slots` (number, obrigatório): O número de vagas disponíveis na viagem.
  - `startDate` (string, obrigatório): A data de início da viagem (no formato "aaaa-mm-dd").
- Headers:
  - `Authorization` (string, obrigatório): O token de autenticação do usuário.
- Exemplo de solicitação:
```json
POST /users/1/trips
Content-Type: application/json
Authorization: Bearer <token>

{
  "addressId": "abc123",
  "dogType": "SHY",
  "duration": 30,
  "slots": 2,
  "startDate": "2023-06-15"
}

```
- Exemplo de resposta bem-sucedida:
```json
Código de status: 201

{
  "message": "Trip created successfully",
    "trip": {
    "id": "abc123",
    "addressId": "abc123",
    "dogType": "SHY",
    "duration": 30,
    "slots": 2,
    "startDate": "2023-06-15",
    "walkerId": "1",
    "dogs": [],
    "createdAt": "2023-06-15T10:30:00.000Z",
    "address": {
      "id": "abc123",
      "street": "Rua exemplo",
      "city": "Exemploville",
      "state": "Exemploland",
      "country": "Exemplo",
      "createdAt": "2023-06-14T14:20:00.000Z"
    }
  }
}
```
Possíveis códigos de resposta:
- 201: Criado. A viagem foi criada com sucesso.
- 400: Solicitação inválida. Campos obrigatórios estão ausentes na solicitação.
- 404: Não encontrado. O usuário ou endereço com o ID especificado não foi encontrado.
- 500: Erro interno do servidor. Ocorreu um erro interno do servidor ao processar a solicitação.
