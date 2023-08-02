import { isWithinIframe } from "metabase/lib/dom";
import { State } from "metabase-types/store";

export const getIsEmbedded = (state: State) => {
  return state.settings.values["enable-embedding"] || isWithinIframe();
};

export const getEmbedOptions = (state: State) => {
  return state.embed.options;
};
