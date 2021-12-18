import { AddItemComponent, AddSectionComponent, SettingsComponent, PageComponent, SectionComponent, ItemComponent, HeaderComponent, WelcomeComponent } from './component';
import { ConfigurationService, MainService, SocketService } from './service';

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
    WelcomeComponent
];

export const providers = [
    MainService,
    SocketService,
    ConfigurationService
]