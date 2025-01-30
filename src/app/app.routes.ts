import { Routes } from '@angular/router';
import { CadastroClienteComponent } from './components/cadastro-cliente/cadastro-cliente.component';
import { ConsultaClienteComponent } from './components/consulta-cliente/consulta-cliente.component';
import { EdicaoClienteComponent } from './components/edicao-cliente/edicao-cliente.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CriarUsuarioComponent } from './components/criar-usuario/criar-usuario.component';
import { AutenticarUsuarioComponent } from './components/autenticar-usuario/autenticar-usuario.component';
import { AdminGuard } from './guards/admin.guard';
import { RedirectGuard } from './guards/redirect.guard';


export const routes: Routes = [

    {
        path:"usuarios/criar",//ROTA
        component: CriarUsuarioComponent,//COMPONENTE
        canActivate: [RedirectGuard] //GUARDA DE ROTA
    },

   {
        path:"usuarios/autenticar",//ROTA
        component: AutenticarUsuarioComponent,//COMPONENTE
        canActivate: [RedirectGuard] //GUARDA DE ROTA
    },

    {
        path: "clientes/cadastro", //ROTA
        component: CadastroClienteComponent,  //COMPONENTE
        canActivate: [AdminGuard] //GUARDA DE ROTA
    },
    {
        path: "clientes/consulta", //ROTA
        component: ConsultaClienteComponent, //COMPONENTE
        canActivate: [AdminGuard] //GUARDA DE ROTA
    },
    {
        path: "clientes/edicao/:id", //ROTA
        component: EdicaoClienteComponent, //COMPONENTE
        canActivate: [AdminGuard] //GUARDA DE ROTA
    },
    {
        path: "clientes/dashboard", //ROTA
        component: DashboardComponent, //COMPONENTE
        canActivate: [AdminGuard] //GUARDA DE ROTA
    },

    {
        path: "", //PÁGINA INICIAL
        pathMatch: "full", //ROTA DEFAULT DO PROJETO
        redirectTo: "/usuarios/autenticar" //REDIRECIONAMENTO
    },


];




