# 📚 Sistema de Gerenciamento Acadêmico - Alunos e Professores

## 📋 Sobre o Projeto

Este projeto implementa um sistema de gerenciamento acadêmico desenvolvido com **Node.js** e **TypeScript**, aplicando os princípios da **Programação Orientada a Objetos (POO)**. O sistema permite o cadastro, consulta, edição e exclusão de alunos e professores através de uma API RESTful.

---

## 🎯 Resultados Esperados Atingidos

✅ **Aplicação dos conceitos de POO** no desenvolvimento do projeto  
✅ **Estruturação de classes** com atributos, construtores e métodos  
✅ **Implementação de herança** através da classe abstrata `Pessoa`  
✅ **Utilização de interfaces** (`Ipessoa`) para garantir contratos  
✅ **Encapsulamento** com atributos privados e uso de getters/setters  
✅ **Validações** implementadas nos setters das classes  
✅ **Arquitetura em camadas** (Controller → Service → Repository → Model)

---

## 🏗️ Arquitetura do Projeto

O projeto segue uma arquitetura em camadas bem definida:

```
src/
├── server.ts                 # Ponto de entrada da aplicação
├── config/                   # Configurações
│   ├── EnvVar.ts            # Gerenciamento de variáveis de ambiente
│   └── enum/
│       └── EnvKeys.ts       # Enumeração das chaves do .env
├── controllers/              # Camada de controle (requisições HTTP)
│   ├── aluno.controller.ts
│   └── professor.controller.ts
├── services/                 # Camada de regras de negócio
│   ├── aluno.service.ts
│   └── professor.service.ts
├── repository/               # Camada de acesso a dados
│   ├── aluno.repository.ts
│   └── professor.repository.ts
├── models/                   # Modelos POO (classes e interfaces)
│   ├── aluno.model.ts
│   └── professor.model.ts
├── routes/                   # Definição de rotas
│   ├── routes.ts            # Rotas principais
│   ├── aluno.routes.ts
│   └── professor.route.ts
└── database/                 # Conexão com banco de dados
    └── connection.database.ts
```

---

## 🧩 Conceitos de POO Implementados

### 1. **Interface (`Ipessoa`)**

```typescript
interface Ipessoa {
    mostrarDados(): string;
}
```

Define um contrato que todas as classes de pessoa devem implementar.

### 2. **Classe Abstrata (`Pessoa`)**

```typescript
abstract class Pessoa implements Ipessoa {
    constructor(
        protected _nome: string, 
        protected _email: string, 
        protected readonly _id?: number, 
        protected _dataCad?: Date
    ) { }
    abstract mostrarDados(): string;
}
```

- **Abstração**: Não pode ser instanciada diretamente
- **Herança**: Serve como base para `Aluno` e `Professor`
- **Encapsulamento**: Atributos protegidos (`protected`)

### 3. **Classes Concretas**

#### **Classe Aluno**

Herda de `Pessoa` e adiciona:
- Atributos específicos: `_matricula`, `_curso`, `_mediaFinal`
- **Getters e Setters** com validações
- **Métodos estáticos**: `adicionar()` e `editar()`
- **Validações**: nome, email, matrícula, curso e média

#### **Classe Professor**

Herda de `Pessoa` e adiciona:
- Atributos específicos: `_disciplina`, `_cargaHoraria`
- **Getters e Setters** com validações
- **Métodos estáticos**: `adicionar()` e `editar()`
- **Validações**: nome, email, disciplina e carga horária

### 4. **Encapsulamento**

Todos os atributos são **privados** (`private`) ou **protegidos** (`protected`), sendo acessados através de **getters** e **setters**:

```typescript
public get Nome(): string {
    return this._nome;
}

public set Nome(value: string) {
    this._validarNome(value);
    this._nome = value;
}
```

### 5. **Validações**

Cada setter possui validações específicas:

- **Nome**: Mínimo 3 caracteres, máximo 100
- **Email**: Formato válido usando regex
- **Matrícula**: Formato específico
- **Curso**: Tipo string
- **Média Final**: Valor entre 0 e 10
- **Disciplina**: Tipo string
- **Carga Horária**: Valor positivo

---

## 🔄 Fluxo de Dados (Arquitetura em Camadas)

```
Cliente (Insomnia/Postman)
        ↓
    [Routes]
        ↓
  [Controller] ← Recebe requisições HTTP
        ↓
   [Service] ← Aplica regras de negócio e instancia modelos
        ↓
  [Repository] ← Acessa o banco de dados
        ↓
   [Database] ← MySQL
```

### **Exemplo de Fluxo: Cadastro de Aluno**

1. **Cliente** envia POST para `/alunos`
2. **Route** direciona para `AlunoController.adicionarAluno()`
3. **Controller** extrai dados do `req.body`
4. **Service** cria instância usando `Aluno.adicionar()` (validações executadas)
5. **Repository** executa INSERT no banco de dados
6. **Resposta** retorna ao cliente com status 201

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição |
|-----------|-----------|
| **Node.js** | Ambiente de execução JavaScript |
| **TypeScript** | Superset do JavaScript com tipagem estática |
| **Express** | Framework web para Node.js |
| **MySQL2** | Driver MySQL com suporte a Promises |
| **dotenv** | Gerenciamento de variáveis de ambiente |
| **ts-node** | Execução de TypeScript diretamente |
| **Nodemon** | Reinicialização automática do servidor |

---

## 🚀 Endpoints da API

### **Alunos**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/alunos` | Lista todos os alunos |
| GET | `/alunos?id=1` | Busca aluno por ID |
| POST | `/alunos` | Cadastra novo aluno |
| PATCH | `/alunos?id=1` | Atualiza aluno existente |
| DELETE | `/alunos?id=1` | Remove aluno |

#### **Exemplo de Requisição POST `/alunos`**

```json
{
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "matricula": "2024001",
  "curso": "Engenharia de Software",
  "mediaFinal": 8.5
}
```

### **Professores**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/professores` | Lista todos os professores |
| GET | `/professores?id=1` | Busca professor por ID |
| POST | `/professores` | Cadastra novo professor |
| PATCH | `/professores?id=1` | Atualiza professor existente |
| DELETE | `/professores?id=1` | Remove professor |

#### **Exemplo de Requisição POST `/professores`**

```json
{
  "nome": "Maria Santos",
  "email": "maria.santos@escola.com",
  "disciplina": "Matemática",
  "cargaHoraria": 40
}
```

---

## ⚙️ Configuração e Instalação

### **1. Pré-requisitos**

- Node.js (v16 ou superior)
- MySQL Server
- Gerenciador de pacotes (npm ou yarn)

### **2. Instalação**

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre no diretório
cd "S1_R3_R4 - AT2"

# Instale as dependências
npm install
```

### **3. Configuração do Banco de Dados**

Crie um arquivo `.env` na raiz do projeto:

```env
SERVER_PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_DATABASE=nome_do_banco
```

### **4. Criar Tabelas no MySQL**

```sql
CREATE DATABASE nome_do_banco;

USE nome_do_banco;

CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    matricula VARCHAR(50) NOT NULL,
    curso VARCHAR(100) NOT NULL,
    mediaFinal DECIMAL(3,1) NOT NULL,
    dataCad TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE professores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    disciplina VARCHAR(100) NOT NULL,
    cargaHoraria INT NOT NULL,
    dataCad TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **5. Executar o Projeto**

```bash
# Desenvolvimento com recarga automática
npx nodemon src/server.ts

# Ou compilar e executar
npx ts-node src/server.ts
```

O servidor estará disponível em `http://localhost:3000`

---

## 🧪 Testando com Insomnia/Postman

### **Teste 1: Criar Aluno**

```
POST http://localhost:3000/alunos
Content-Type: application/json

{
  "nome": "Carlos Eduardo",
  "email": "carlindopneu@email.com",
  "matricula": "202401",
  "curso": "Ciência da Computação",
  "mediaFinal": 6.7
}
```

### **Teste 2: Listar Todos os Alunos**

```
GET http://localhost:3000/alunos
```

### **Teste 3: Buscar Aluno por ID**

```
GET http://localhost:3000/alunos?id=1
```

### **Teste 4: Atualizar Aluno**

```
PATCH http://localhost:3000/alunos?id=1
Content-Type: application/json

{
  "nome": "Carlos Eduardo Santos",
  "email": "carlos.santos@email.com",
  "matricula": "202401",
  "curso": "Engenharia de Software",
  "mediaFinal": 9.5
}
```

### **Teste 5: Deletar Aluno**

```
DELETE http://localhost:3000/alunos?id=1
```

---

## 🎨 Padrões de Projeto Utilizados

### **1. Singleton Pattern**

Implementado na classe `Database`:

```typescript
private static instance: Database;

public static getInstance(): Database {
    if (!Database.instance) {
        Database.instance = new Database();
        Database.instance.createPool()
    }
    return Database.instance
}
```

Garante que apenas uma instância da conexão com o banco de dados seja criada.

### **2. Repository Pattern**

Separa a lógica de acesso a dados da lógica de negócio:

- `AlunoRepository` e `ProfessorRepository` encapsulam as queries SQL

### **3. Service Pattern**

Centraliza a lógica de negócio:

- `AlunoService` e `ProfessorService` orquestram as operações

### **4. Dependency Injection**

Injeção de dependências nos construtores:

```typescript
export class AlunoController {
    constructor(private _service = new AlunoService()) { }
}
```

---

## 📊 Diagrama UML Implementado

```
┌─────────────────┐
│   <<interface>> │
│     Ipessoa     │
├─────────────────┤
│ +mostrarDados() │
└─────────────────┘
         △
         │
         │
┌─────────────────────────────┐
│     <<abstract>>            │
│        Pessoa               │
├─────────────────────────────┤
│ #_nome: string              │
│ #_email: string             │
│ #_id?: number               │
│ #_dataCad?: Date            │
├─────────────────────────────┤
│ +mostrarDados(): string     │
└─────────────────────────────┘
         △         △
         │         │
    ┌────┘         └────┐
    │                   │
┌───────────────┐   ┌──────────────────┐
│    Aluno      │   │   Professor      │
├───────────────┤   ├──────────────────┤
│-_matricula    │   │-_disciplina      │
│-_curso        │   │-_cargaHoraria    │
│-_mediaFinal   │   └──────────────────┘
└───────────────┘
```

---

## ✅ Checklist de Implementação

- [x] Servidor Node.js com TypeScript
- [x] Aplicação de conceitos POO (herança, interface, encapsulamento)
- [x] Classes estruturadas conforme diagrama UML
- [x] Atributos, construtores e métodos implementados
- [x] Rotas RESTful (GET, POST, PATCH, DELETE)
- [x] Controllers para cada entidade
- [x] Services com regras de negócio
- [x] Repository para acesso a dados
- [x] Validações nos modelos
- [x] Conexão com banco de dados MySQL
- [x] Tratamento de erros
- [x] Testes via Insomnia/Postman
- [x] Configuração de variáveis de ambiente

---

## 🚨 Tratamento de Erros

O projeto implementa tratamento robusto de erros:

### **Validações nos Modelos**

```typescript
if (!value || value.trim().length <= 3) {
    throw new Error('Nome deve ter pelo menos 3 caracteres')
}
```

### **Validação de Email**

```typescript
const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
if (!regex.test(value)) {
    throw new Error('Email inválido')
}
```

### **Tratamento nos Controllers**

```typescript
try {
    // Operação
} catch (error: unknown) {
    if (error instanceof Error) {
        res.status(500).json({
            message: 'Ocorreu um erro no servidor',
            errorMessage: error.message
        })
    }
}
```

---

## 🔐 Boas Práticas Aplicadas

1. **Separação de Responsabilidades**: Cada camada tem uma responsabilidade específica
2. **Tipagem Forte**: TypeScript com strict mode
3. **Encapsulamento**: Atributos privados com getters/setters
4. **Validações**: Dados validados antes de persistência
5. **Variáveis de Ambiente**: Configurações sensíveis em .env
6. **Connection Pool**: Gerenciamento eficiente de conexões MySQL
7. **Código Limpo**: Nomenclatura clara e consistente
8. **Modularização**: Código dividido em módulos reutilizáveis

---

## 📝 Conclusão

Este projeto demonstra uma implementação completa e profissional de um sistema backend utilizando Node.js e TypeScript, com aplicação rigorosa dos princípios de POO. A arquitetura em camadas garante manutenibilidade e escalabilidade do código, enquanto as validações e tratamentos de erro asseguram robustez à aplicação.

### **Competências Desenvolvidas:**

- ✅ Programação Orientada a Objetos
- ✅ Desenvolvimento de APIs RESTful
- ✅ TypeScript avançado
- ✅ Arquitetura em camadas
- ✅ Banco de dados relacional (MySQL)
- ✅ Padrões de projeto (Singleton, Repository, Service)
- ✅ Validação de dados
- ✅ Tratamento de erros

---

## 👨‍💻 Autor

Desenvolvido como atividade avaliativa para o curso de Backend - 3º Semestre.

---

## 📄 Licença

ISC
