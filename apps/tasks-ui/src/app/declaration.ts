import { AddItemComponent, AddSectionComponent, HeaderComponent, PageComponent, SectionComponent, SettingsComponent } from './component';
import { ItemComponent } from './component/item/item.component';
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
    HeaderComponent
];

export const providers = [
    MainService,
    SocketService,
    ConfigurationService
];