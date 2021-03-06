import { AddItemComponent, AddSectionComponent, SettingsComponent, PageComponent, SectionComponent, ItemComponent, HeaderComponent, WelcomeComponent, BoardComponent } from './component';
import { TaskService, SettingsService, SocketService, ActionService } from './service';

export const dialogs = [
    AddItemComponent,
    AddSectionComponent,
    SettingsComponent
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
    TaskService,
    SocketService,
    SettingsService,
    ActionService
]