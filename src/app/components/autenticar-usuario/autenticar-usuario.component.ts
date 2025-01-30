import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { config } from '../../configurations/environment';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-autenticar-usuario',
  imports: [
    RouterLink,
    CommonModule, //importando o módulo de diretivas do Angular
    FormsModule, //importando a biblioteca de formulários
    ReactiveFormsModule //importando a biblioteca de formulários
  ],
  templateUrl: './autenticar-usuario.component.html',
  styleUrl: './autenticar-usuario.component.css'
})
export class AutenticarUsuarioComponent {


  //atributo
  mensagemErro: string = '';


  //construtor
  constructor(private httpClient: HttpClient,
     private spinnerService: NgxSpinnerService
    ) { }


  //criando um formulário
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8)])
  });


  get f() {
    return this.form.controls;
  }


  //função para capturar o SUBMIT do formulário
  onSubmit() {
    //exibir o spinner
    this.spinnerService.show();
    //enviar os dados do formulário para o servidor
    this.httpClient.post(config.apiUsuarios + 'api/usuarios/autenticar', this.form.value)
      .subscribe({
        next: (data: any) => {
          //armazenar os dados em uma sessão do navegador
          sessionStorage.setItem('usuario', JSON.stringify(data));
          //redirecionar para a página de dashboard
          location.href = '/clientes/dashboard';
        },
        error: (e) => {
          this.mensagemErro = e.error.message;
        }
      }).add(() => {
        //esconder o spinner
        this.spinnerService.hide();
      });
  }


}





