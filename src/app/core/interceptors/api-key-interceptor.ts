import { HttpInterceptorFn } from '@angular/common/http';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedRequest = req.clone({
    setHeaders: {
      'x-api-key': '14c460ef-0cdd-4470-8c13-beb6633f62d1'
    }
  });

  return next(clonedRequest);
};
