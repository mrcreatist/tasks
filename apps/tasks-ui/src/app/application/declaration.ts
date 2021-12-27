import { AddItemComponent, AddSectionComponent, SettingsComponent, PageComponent, SectionComponent, ItemComponent, HeaderComponent, WelcomeComponent, BoardComponent } from './component';
import { ConfigurationService, MainService, SettingsService, SocketService } from './service';

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
    MainService,
    SocketService,
    ConfigurationService,
    SettingsService
]