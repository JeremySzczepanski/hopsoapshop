import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Result } from '../model/result';
import { Users } from '../model/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user: Users;
  userSubject = new Subject<Users>();
  isAuth = false;


  constructor(  private http: HttpClient) { }

  emitUser(): void{
    this.userSubject.next(this.user);     //this.user sera l'utilisateur connecté
  }

  authentifier(newUser: Users){
    return new Promise(
      (resolve,reject)=>{
        const url = `${environment.API + 'authentifier.php?' + environment.API_KEY}` + '&email=' + newUser.email + '&password=' + newUser.password;
        this.http.get(url).subscribe(
        (data: Result)=>{			                      // Result qu'on a deja défini donc qu'il faudra juste importer.
           if(data.status == 200){
          this.user = data.result;	                // Si tout est ok, on va mettre l'objet qu'on a reçu dans "user: Users;" (ca va stocker les données de l'utilisateur)
          this.isAuth = true;
          this.emitUser();		                      // Comme la valeur de user: Users; change, on va emettre les données
          resolve(data.result);
           }else{				                            // Si autre code que 200 on affiche le message d'erreur dans la console.
          //console.log(data.result);
          reject(data.message);
           }
        },(error)=>{
          console.log('error : ' + error);	        // si au lieu d'avoir une donnée "data: Result" on a une erreur qui s'est déclenchée, on l'affiche dans la console
          reject(false);
        }
        )
      }
    )
  }


	createUser(newUser: Users){
      return new Promise(
        (resolve,reject)=>{
          const url = `${environment.API + 'createUsers.php?' + environment.API_KEY}` +
                    '&email=' + newUser.email + '&password=' + newUser.password + '&sexe=' +
                    newUser.sexe + '&firstname=' + newUser.firstname + '&lastname=' +
                    newUser.lastname + '&dateBirth=' + newUser.dateBirth + '&pseudo=' + newUser.pseudo;

          this.http.get(url).subscribe(

            (data: Result)=>{
              if(data.status == 200){
                this.user = data.result;
                this.isAuth = true;
                this.emitUser();
                resolve(data.result);
              }else{
                  reject(data.message);
              }
            },
            (error)=>{
                  reject(error);
            }
          )
        }
      )
  }


  logout(): void{
    this.user = null;
    this.isAuth = false;
    this.userSubject = new Subject<Users>();
  }








}
