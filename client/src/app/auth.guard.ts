// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        const expectedRole = next.data.role;

        // return localStorage.getUserRole().map((userRole) => {
        //   if (userRole === expectedRole) {
        //     return true;
        //   } else {
        //     // Redirect to a forbidden page or show an error message
        //     this.router.navigate(['/error']);
        //     return false;
        //   }
        // });

        var userRole = localStorage.getItem("role")
        console.log(userRole)
        console.log(expectedRole)
        if (userRole === expectedRole) {
            return true;
        } else {
            this.router.navigate(['/user-dashboard']);
            return false;
        }
    }
}
