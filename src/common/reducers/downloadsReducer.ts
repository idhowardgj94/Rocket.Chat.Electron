import { ActionOf } from '../../store/rootAction';
import * as appActions from '../actions/appActions';
import {
  DOWNLOADS_CLEARED,
  DOWNLOAD_CREATED,
  DOWNLOAD_REMOVED,
  DOWNLOAD_UPDATED,
} from '../actions/downloadsActions';
import { Download } from '../types/Download';

type DownloadsAction =
  | ActionOf<typeof appActions.settingsLoaded.type>
  | ActionOf<typeof DOWNLOAD_CREATED>
  | ActionOf<typeof DOWNLOAD_UPDATED>
  | ActionOf<typeof DOWNLOADS_CLEARED>
  | ActionOf<typeof DOWNLOAD_REMOVED>;

export const downloads = (
  state: Record<Download['itemId'], Download> = {},
  action: DownloadsAction
): Record<Download['itemId'], Download> => {
  switch (action.type) {
    case appActions.settingsLoaded.type:
      return action.payload.downloads ?? {};

    case DOWNLOAD_CREATED: {
      const download = action.payload;
      return {
        ...state,
        [download.itemId]: download,
      };
    }

    case DOWNLOAD_UPDATED: {
      const newState = { ...state };
      newState[action.payload.itemId] = {
        ...newState[action.payload.itemId],
        ...action.payload,
      };
      return newState;
    }

    case DOWNLOAD_REMOVED: {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }

    case DOWNLOADS_CLEARED:
      return {};

    default:
      return state;
  }
};
