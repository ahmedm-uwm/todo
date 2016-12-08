import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from 'aurelia-auth';
import { Todo } from '../resources/data/todo';
import { Users } from '../resources/data/users';

@inject(Router, AuthService, Todo, Users)
export class Wall {
    constructor(router, auth, todo, users) {
        this.router = router;
        this.auth = auth;
        this.todo = todo;
        this.users = users;
        this.message = 'Todo';

        this.hideCompleted = false;
    }

    logout() {
        sessionStorage.removeItem('user');
        this.auth.logout();
    }


}
