import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { config } from '../../configurations/environment';


@Component({
  selector: 'app-consulta-cliente',
  imports: [
    NgxPaginationModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './consulta-cliente.component.html',
  styleUrl: './consulta-cliente.component.css'
})
export class ConsultaClienteComponent {


  /*
    Variável para guardar os dados dos clientes
    que iremos exibir na página HTML
  */
  clientes: any[] = []; //array (lista) de objetos


  /*
    Criando um método construtor no componente
    para que possamos instanciar a classe HttpClient
  */
  constructor(private httpClient: HttpClient) { }


  /*
    Função padrão do Angular executado no momento que
    o componente é carregado / exibido no navegador
  */
  ngOnInit() : void {
    //fazendo uma requisição para consultar (GET) os clientes na API
    this.httpClient.get(config.apiClientes + 'api/clientes')
      .subscribe({ //aguardando o retorno da API
        next: (data) => { //capturando os dados que a API devolveu
          //data -> nome de variável para receber os dados da consulta
          //guardando os dados obtidos em uma variável chamada 'clientes'
          this.clientes = data as any[];
        }
      })
  }
  
  /*
    Função para capturar o evento de DELETE do cliente
  */

    onDelete(id: string){
        if(confirm('Deseja realmente excluir este cliente?')){
           this.httpClient.delete(config.apiClientes + 'api/clientes/' + id)
           .subscribe({
                next: (data: any) => {
                    alert(data.mensagem);
                    this.ngOnInit();

                }
         
              });       
       
            }
    }

    //Função para realizar a paginação dos dados na tabela.
    pagina: number = 1;
    pageChange(event: any) {
        this.pagina = event;
    }


}




