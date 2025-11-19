import { Routes } from '@angular/router';
import { BoardComponent } from './components/board/board';

export const routes: Routes = [
    {
        path: '**',
        component: BoardComponent
    }
];
