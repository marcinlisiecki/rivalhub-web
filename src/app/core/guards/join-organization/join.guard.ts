import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "@app/core/services/auth/auth.service";
import {inject} from "@angular/core";

export const joinGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService)
  const router: Router = inject(Router)

  if (authService.isAuth()) {

    return true;
  }

  sessionStorage.setItem("redirectUrl", state.url)
  router.navigateByUrl('/login').then()
  return false;
};
