import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('global_auth_token');

  if(token){
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Basic ${token}`
      }
    });

    return next(cloned);
  }
  return next(req);
};
