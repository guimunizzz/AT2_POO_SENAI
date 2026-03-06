interface Ipessoa {
    mostrarDados(): string;
}

abstract class Pessoa implements Ipessoa {
    constructor(protected _nome: string, protected _email: string, protected readonly _id?: number, protected _dataCad?: Date) { }
    abstract mostrarDados(): string;
}

export class Aluno extends Pessoa {
    private _matricula: string = '';
    private _curso: string = '';
    private _mediaFinal: number = 0;

    constructor(_nome: string, _email: string, matricula: string, curso: string, mediaFinal: number, _id?: number, _dataCad?: Date) {
        super(_nome, _email, _id, _dataCad);
        this.Nome = _nome;
        this.Email = _email;
        this.Matricula = matricula;
        this.Curso = curso;
        this.MediaFinal = mediaFinal;
    }
    mostrarDados(): string {
        return `Aluno: ${this._nome} | Email: ${this._email}`;
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

    public get Matricula(): string {
        return this._matricula;
    }

    public get Curso(): string {
        return this._curso;
    }

    public get MediaFinal(): number {
        return this._mediaFinal;
    }

    public set Nome(value: string) {
        this._validarNome(value);
        this._nome = value;
    }

    public set Email(value: string) {
        this._validarEmail(value);
        this._email = value;
    }

    public set Matricula(value: string) {
        this._validarMatricula(value);
        this._matricula = value;
    }

    public set Curso(value: string) {
        this._validarCurso(value);
        this._curso = value;
    }

    public set MediaFinal(value: number) {
        this._validarMedia(value);
        this._mediaFinal = value;
    }


    public static adicionar(Nome: string, Email: string, Matricula: string, Curso: string, MediaFinal: number): Aluno {
        return new Aluno(Nome, Email, Matricula, Curso, MediaFinal);
    }

    public static editar(Nome: string, Email: string, Matricula: string, Curso: string, MediaFinal: number, id: number): Aluno {
        return new Aluno(Nome, Email, Matricula, Curso, MediaFinal, id);
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

    private _validarMatricula(value: string): void {
        if (typeof value !== 'string') {
            throw new Error('Matricula no formato incorreto, deve ser um texto!')
        }

        if (!value || value.trim().length === 0) {
            throw new Error('Matricula não pode estar vazia!')
        }

        if (value.length > 7) {
            throw new Error('A matricula está com mais de 7 caracteres, tente novamente!')
        }
    }

    private _validarCurso(value: string): void {
        if (typeof value !== 'string') {
            throw new Error('Curso no formato incorreto, deve ser um texto!')
        }

        if (!value || value.trim().length === 0) {
            throw new Error('Curso não pode estar vazio!')
        }
    }

    private _validarMedia(value: number): void {
        if (Number.isNaN(value)) {
            throw new Error('Média deve ser um número')
        }
        if (value > 10 || value < 0) {
            throw new Error('Média inválida, tente novamente!')
        }
    }

}