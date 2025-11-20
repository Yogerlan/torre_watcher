import { Routes } from '@angular/router'
import { BoardComponent } from './components/board/board'

export const appRoutes: Routes = [
    {
        path: '**',
        component: BoardComponent
    }
]
