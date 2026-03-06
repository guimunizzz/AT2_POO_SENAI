interface Ipessoa {
    mostrarDados(): string;
}

abstract class Pessoa implements Ipessoa {
    constructor(protected _nome: string, protected _email: string, protected readonly _id?: number, protected _dataCad?: Date) { }
    abstract mostrarDados(): string;
}

export class Professor extends Pessoa {
    private _disciplina: string = '';
    private _cargaHoraria: number = 0;

    constructor(_nome: string, _email: string, disciplina: string, cargaHoraria: number, _id?: number, _dataCad?: Date) {
        super(_nome, _email, _id, _dataCad);
        this.Nome = _nome;
        this.Email = _email;
        this.Disciplina = disciplina;
        this.CargaHoraria = cargaHoraria;
    }
    mostrarDados(): string {
        return `Professor: ${this._nome} | Email: ${this._email}`;
    }

    public get Id(): number | undefined {
        return this._id;
    }

    public get Nome(): string {
        return this._nome;
    }

    public get Email(): string {
        return this._email;
    }

    public get Data(): Date | undefined {
        return this._dataCad;
    }

    public get Disciplina(): string {
        return this._disciplina;
    }

    public get CargaHoraria(): number {
        return this._cargaHoraria;
    }



    public set Nome(value: string) {
        this._validarNome(value);
        this._nome = value;
    }

    public set Email(value: string) {
        this._validarEmail(value);
        this._email = value;
    }

    public set Disciplina(value: string) {
        this._validarDisciplina(value);
        this._disciplina = value;
    }

    public set CargaHoraria(value: number) {
        this._validarCargaHoraria(value);
        this._cargaHoraria = value;
    }

    public static adicionar(Nome: string, Email: string, Disciplina: string, CargaHoraria: number): Professor {
        return new Professor(Nome, Email, Disciplina, CargaHoraria);
    }

    public static editar(Nome: string, Email: string, Disciplina: string, CargaHoraria: number, id: number): Professor {
        return new Professor(Nome, Email, Disciplina, CargaHoraria, id);
    }

    private _validarNome(value: string): void {
        if (!value || value.trim().length <= 3) {
            throw new Error('Nome do aluno deve ter pelo menos 3 caracteres')
        }

        if (value.trim().length > 100) {
            throw new Error('Nome do aluno deve ter no máximo 100 caracteres')
        }
    }

    private _validarEmail(value: string): void {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!regex.test(value)) {
            throw new Error('Email invalido, siga o padrão: exemplo@gmail.com')
        }
    }

    private _validarDisciplina(value: string): void {
        if (typeof value !== 'string') {
            throw new Error('Disciplina no formato incorreto, deve ser um texto!')
        }

        if (!value || value.trim().length === 0) {
            throw new Error('Disciplina não pode estar vazia!')
        }
    }

    private _validarCargaHoraria(value: number): void {
        if (isNaN(value)) {
            throw new Error('Carga Horaria deve ser um numero, tente novamente!')
        }
    }
}