import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class RedirectGuard implements CanActivate {


    canActivate(): boolean {
        //verificar se o usuário está autenticado
        const usuario = sessionStorage.getItem('usuario');
        if(usuario != null) {
            location.href = '/clientes/dashboard';
            return false;
        }
        else {
            return true;
        }
    }
}


