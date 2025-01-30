import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { config } from '../../configurations/environment';


@Component({
  selector: 'app-cadastro-cliente',
  imports: [
    CommonModule, //recursos básicos do angular
    FormsModule, //biblioteca para formulários
    ReactiveFormsModule //biblioteca para formulários
  ],
  templateUrl: './cadastro-cliente.component.html',
  styleUrl: './cadastro-cliente.component.css'
})
export class CadastroClienteComponent {

/*
Atributo para capturar a mensangem retornada pela API
*/
mensagem: string = '';


/*
Método construtor para declarar o objeto HttpClient
*/
constructor(private httpClient: HttpClient) { }



  /*
    Declarar e construir o formulário
  */
  form = new FormGroup({
    nome : new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(150)]),
    email : new FormControl('', [Validators.required, Validators.email]),
    cpf : new FormControl('', [Validators.required, Validators.pattern(/^\d{11}$/)]),
    categoria : new FormControl('', [Validators.required]),
  });


  /*
    Função auxiliar que será utilizada para verificar se os campos do formulário
    estão preenchidos de forma errada e então exibir mensagem de erro na página
  */
  get f() {
    return this.form.controls;
  }


  /*
    Função para capturar o evento de SUBMIT do formulário
  */
  onSubmit() {
    //Fazendo uma requisão POST para a API
    this.httpClient.post(config.apiClientes + 'api/clientes', this.form.value)
      .subscribe({//aguardando o retorno da API
        next: (data: any) => { //capturando os dados que a API devolveu
          this.mensagem = data.mensagem; //capturando a mensagem da API
          this.form.reset(); //limpando os campos do formul
        }
      });


  }


}




