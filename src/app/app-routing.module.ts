import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ContactResolver } from './services/contact.resolver';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all-contacts',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadChildren: () =>
      import('./folder/folder.module').then((m) => m.FolderPageModule),
  },
  {
    path: 'all-contacts',
    loadChildren: () =>
      import('./all-contacts/all-contacts.module').then(
        (m) => m.AllContactsPageModule
      ),
  },
  // {
  //   path: "search-contacts",
  //   loadChildren: () =>
  //     import("./search-contacts/search-contacts.module").then(
  //       m => m.SearchContactsPageModule
  //     )
  // },
  {
    path: 'add-contact',
    loadChildren: () =>
      import('./add-contact/add-contact.module').then(
        (m) => m.AddContactPageModule
      ),
  },
  {
    path: 'my-settings',
    loadChildren: () =>
      import('./my-settings/my-settings.module').then(
        (m) => m.MySettingsPageModule
      ),
  },
  {
    path: 'about-dev',
    loadChildren: () =>
      import('./about-dev/about-dev.module').then((m) => m.AboutDevPageModule),
  },
  {
    path: 'contact-detail/:id',
    loadChildren: () =>
      import('./contact-detail/contact-detail.module').then(
        (m) => m.ContactDetailPageModule
      ),
    resolve: {
      contact: ContactResolver,
    },
  },
  {
    path: 'edit-contact/:id',
    loadChildren: () =>
      import('./edit-contact/edit-contact.module').then(
        (m) => m.EditContactPageModule
      ),
    resolve: {
      contact: ContactResolver,
    },
  },
  {
    path: 'test-page',
    loadChildren: () =>
      import('./test-page/test-page.module').then((m) => m.TestPagePageModule),
    canActivate: [AuthService],
  },
  {
    path: '**',
    redirectTo: 'all-contacts',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
