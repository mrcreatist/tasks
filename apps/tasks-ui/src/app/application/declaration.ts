import { AddItemComponent, AddSectionComponent, PageComponent, SectionComponent, ItemComponent, HeaderComponent, WelcomeComponent, BoardComponent } from './component';
import { TaskService } from './service';

export const dialogs = [
  AddItemComponent,
  AddSectionComponent
]

export const components = [
  ...dialogs,
  PageComponent,
  SectionComponent,
  ItemComponent,
  HeaderComponent,
  WelcomeComponent,
  BoardComponent
];

export const providers = [
  TaskService
]
