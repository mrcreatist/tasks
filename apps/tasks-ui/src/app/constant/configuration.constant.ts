import { SortModeEnum, StorageModeEnum } from '../enum';
import { CONFIGURATION_KEYS } from './configuration-keys.constant';

export const CONFIGURATION = {
    [CONFIGURATION_KEYS.STORAGE_MODE]: StorageModeEnum.LOCAL_STORAGE,
    [CONFIGURATION_KEYS.SORT_MODE]: SortModeEnum.FREE_FALL
}