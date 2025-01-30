import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { config } from '../../configurations/environment';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-criar-usuario',
  imports: [
    RouterLink,
    CommonModule, //biblioteca de componentes comuns do angular
    FormsModule, //biblioteca de formulários
    ReactiveFormsModule //biblioteca de formulários
  ],
  templateUrl: './criar-usuario.component.html',
  styleUrl: './criar-usuario.component.css'
})
export class CriarUsuarioComponent {


  //atributos
  mensagemSucesso: string = '';
  mensagemErro: string = '';


  //método construtor inicializando o httpClient
  constructor(
    private httpClient: HttpClient,
    private spinnerService: NgxSpinnerService
  ) { }


  //criando a estrutura do formulário
  form = new FormGroup({
    nome : new FormControl('', [Validators.required, Validators.minLength(8)]),
    email : new FormControl('', [Validators.required, Validators.email]),
    senha : new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    senhaConfirmacao : new FormControl('', [Validators.required])
  });


  //função auxiliar para exibir os erros de validação na página
  get f() {
    return this.form.controls;
  }


  //função para capturar o submit do formulário
  onSubmit() {


    //limpar as mensagens
    this.mensagemSucesso = '';
    this.mensagemErro = '';


    //verificar se as senhas estão diferentes
    if(this.form.value.senha != this.form.value.senhaConfirmacao) {
      this.mensagemErro = 'As senhas não conferem!';
      return;
    }


    this.spinnerService.show(); //exibir o spinner


    this.httpClient.post(config.apiUsuarios + "api/usuarios/criar", this.form.value)
      .subscribe({
        next: (data: any) => { //capturando a resposta de sucesso da API
          this.mensagemSucesso = 'Parabéns! ' + data.nome + ', sua conta foi criada com sucesso.';
          this.form.reset(); //limpar o formulário
        },
        error: (e) => { //capturando a resposta de erro da API
          this.mensagemErro = e.error.message;
        }
      })
      .add(() => {
        this.spinnerService.hide(); //esconder o spinner
      });
  }
}




