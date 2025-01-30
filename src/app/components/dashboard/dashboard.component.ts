import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';
import { config } from '../../configurations/environment';


@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    ChartModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {


  //atributo do tipo array de objetos
  dados: any[] = [];


  //atributo para gerar o gráfico
  grafico: Chart = new Chart();


  //método construtor
  constructor(private httpClient: HttpClient) {}


  /*
    Função do angular executada no momento em que a página é aberta
  */
  ngOnInit() {
    //realizando uma requisição para consulta do dashboard na API
    this.httpClient.get(config.apiClientes + 'api/clientes/dashboard')
      .subscribe({ //aguardando o retorno da API (resposta)
        next: (data) => { //capturando os dados devolvidos pela API
         
          this.dados = data as any[]; //guardando os dados em um atributo da classe


          //montando os dados que serão exibidos no gráfico..
          let conteudo: any[] = []; //array
          this.dados.forEach(item => {
            conteudo.push([ item.nomeCategoria, item.quantidadeClientes ])
          });


          //desenhando o gráfico
          this.grafico = new Chart({
              chart: { type : 'pie' },
              title: { text : 'Quantidade de clientes por categoria.' },
              subtitle: { text: "Total de clientes separados por tipo de categoria." },
              plotOptions: {
                pie: {
                  innerSize: '50%',
                  dataLabels: { enabled: true }
                }
              },
              series: [ { data: conteudo, type: 'pie', name: 'Categorias' } ],
              legend: { enabled: false },
              credits: { enabled: false }
          });
        }
      });
  }
}




