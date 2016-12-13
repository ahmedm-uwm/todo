import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from 'aurelia-auth';
import { Todos } from '../resources/data/todos';
import { Users } from '../resources/data/users';

@inject(Router, AuthService, Todos, Users)
export class Wall {
    constructor(router, auth, todos, users) {
        this.router = router;
        this.auth = auth;
        this.todos = todos;
        this.users = users;
        this.message = 'Todo';

        this.hideCompleted = false;
    }

    logout() {
        sessionStorage.removeItem('user');
        this.auth.logout();
    }


}
