import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-menu-principal',
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent {


  //atributos
  autenticado: boolean = false;
  nomeUsuario: string = '';
  emailUsuario: string = '';


  //método executado quando o componente é aberto
  ngOnInit() {
    //verificar se o usuário está autenticado
    const usuario = sessionStorage.getItem('usuario');
    if(usuario != null) {
      this.autenticado = true;
      this.nomeUsuario = JSON.parse(usuario).nome;
      this.emailUsuario = JSON.parse(usuario).email;
    }
  }


  //método para deslogar o usuário
  logout() {
    if(confirm('Deseja realmente sair do sistema?')) {
      //apagar os dados gravados na session storage
      sessionStorage.removeItem('usuario');
      //redirecionar para a página raiz do projeto (autenticação)
      location.href = '/';
    }
  }


}




