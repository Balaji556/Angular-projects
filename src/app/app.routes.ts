import { Routes } from '@angular/router';
import { LoginComponent } from './budget-planner/login/login.component';
import { DashboardComponent } from './budget-planner/dashboard/dashboard.component';
import { IncomeComponent } from './budget-planner/income/income.component';
import { ExpenseComponent } from './budget-planner/expense/expense.component';
import { TodoComponent } from './budget-planner/todo/todo.component';
import { SideNavComponent } from './budget-planner/side-nav/side-nav.component';

export const routes: Routes = [
    {path:'budget-planner',loadChildren:()=> import('./budget-planner/budget-planner.module').then(m=> m.BudgetPlannerModule)},
    {
        path:'',component:DashboardComponent
    },
    {
        path:'login',component:LoginComponent
    },
    {path:'side-nav',component:SideNavComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'income',component:IncomeComponent},
    {path:'expense',component:ExpenseComponent},
    {path:'todo',component:TodoComponent}
];
