node-psp
=============
Payment Service Provider feito com NodeJs

## Installation

```
git clone git@github.com:CamposBruno/node-psp.git
cd node-psp
yarn
```

Copie o arquivo `.env.example` para `.env` e subistitua as variaveis de ambiente conforme necessidade.

## Dependências
Neste repositório, incluí um arquivo `docker-compose.yml` que é o que eu uso para subir 2 contaires. 
`redis`
`postgresql`

Após instalar as dependências é necessário criar um banco de dados postgres e configurar as 
informações de conexão no arquivo `.env`.


## Testing
```
yarn test
```

## Migration
Para que sejam criadas as tabelas no banco de dados é necessário rodar um comando de migração. 

Esse comando executará também a população de um usuário na base de dados:

`email : 'john@doe.com'`
`password : 'pagarme'` 

Para rodar a migration e o seed execute :

````
yarn migration
````

Para remover as tabelas do banco de dados execute:
````
yarn migration:undo
````

## Running Service
Existem dois serviços a serem executados, `api`  e `payables`

Para executar a API :
```
 yarn api
```

Para executar a fila de payables :
````
yarn payables
````

## API
Para que os clientes processem transações `cash-in` eu criei uma mini api com autenticação por `JWT`.

#### Sessions
O cliente necessita de um token para interagir com a API. 
Para adiquiri-lo faça um POST em `/sessions` passando o email e a senha como parâmetros. 
Essa requisição retornará as informações do usuário juntamente com o `token`

````
curl -X POST http://localhost:3000/sessions \
  -H 'Content-Type: application/json' \
  -d '{
	"email" : "john@doe.com",
	"password" : "pagarme"
}'
````

#### Transaction
Para criar uma transação o cliente enviará um POST para `/transaction` passando as informações por parametro:
````
curl -X POST http://localhost:3000/transaction \
  -H 'Authorization: Bearer {{TOKEN}}' \
  -H 'Content-Type: application/json' \
  -d '{
	"amount": 100,
	"description": "Smartband XYZ 4.0",
	"payment_method": "credit_card",
	"card_number": "4356786656469876",
	"card_holder": "John Doe",
	"expires_at": "2029-12-01",
	"cvv": "657"
}'
````

#### Transactions List
Para listar as transações feitas por esse usuário é só executar um GET em `/transactions`
````
curl -X GET  http://localhost:3000/transactions \
  -H 'Authorization: Bearer {{TOKEN}}' 
````

#### Balances
Para visualizar os fundos do usuário é só executar um GET em `/balances`
````
curl -X GET http://localhost:3000/balances \
  -H 'Authorization: Bearer {{TOKEN}}' \
````
