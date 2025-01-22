import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edicao-cliente',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edicao-cliente.component.html',
  styleUrl: './edicao-cliente.component.css'
})
export class EdicaoClienteComponent {


  //atributos
  mensagem : string = '';
  id : string = '';


  //método construtor
  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}


  //função executada no momento em que a página é aberta
  ngOnInit() {
   
    //capturar o id enviado na URL
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
   
    //consultar os dados do cliente através do ID
    this.httpClient.get('http://localhost:5103/api/clientes/' + this.id)
      .subscribe({ //aguardar a resposta da API
        next: (data) => { //capturando o retorno de sucesso
          //preencher o formulario com os dados do cliente
          this.form.patchValue(data);
        }
      })
  }


  //estrutura do formulario
  form = new FormGroup({
    nome : new FormControl('', [Validators.required, Validators.minLength(8)]),
    email : new FormControl('', [Validators.required, Validators.email]),
    cpf : new FormControl('', [Validators.required, Validators.pattern(/^\d{11}$/)]),
    categoria : new FormControl('', [Validators.required])
  });


  //função auxilizar para verificar se os campos
  //do formulário estão com algum erro de validação
  get f() {
    return this.form.controls;
  }


  //função para capturar o SUBMIT do formulário
  onSubmit() {
  //enviar uma requisicao PUT para a API
  this.httpClient.put('http://localhost:5103/api/clientes/' + this.id, this.form.value)
    .subscribe({ //aguardar a resposta da API
      next: (data: any) => { //capturando o retorno de sucesso
        this.mensagem = data.mensagem; //capturando a mensagem da API
      }
    });

  }


}




