import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {


    canActivate(): boolean {
        //verificar se o usuário está autenticado
        const usuario = sessionStorage.getItem('usuario');
        if (usuario != null) {
            return true; //permitir o acesso à rota
        }
        else {
            location.href = '/'; //redirecionar para a página de login
            return false; //não permitir o acesso à rota
        }
    }

}


