// /*
//  * This file is subject to the terms and conditions defined in
//  * file 'LICENSE-EMBEDDING.txt', which is part of this source code package.
//  */

// import "regenerator-runtime/runtime";

// // Use of classList.add and .remove in Background and FitViewPort Hocs requires
// // this polyfill so that those work in older browsers
// import "classlist-polyfill";

// import "number-to-locale-string";

// // This is conditionally aliased in the webpack config.
// // If EE isn't enabled, it loads an empty file.
// // Should be imported before any other metabase import
// import "ee-overrides"; // eslint-disable-line import/no-unresolved, import/no-duplicates

// // If enabled this monkeypatches `t` and `jt` to return blacked out
// // strings/elements to assist in finding untranslated strings.
// import "metabase/lib/i18n-debug";

// // set the locale before loading anything else
// import "metabase/lib/i18n";

// // NOTE: why do we need to load this here?
// import "metabase/lib/colors";

// // NOTE: this loads all builtin plugins
// import "metabase/plugins/builtin";

// // router
// import { useRouterHistory } from "react-router";
// import { createHistory } from "history";

// import { refreshSiteSettings } from "metabase/redux/settings";
// import { initializeEmbedding } from "metabase/lib/embed";
// import api from "metabase/lib/api";
// import MetabaseSettings from "metabase/lib/settings";
// import registerVisualizations from "metabase/visualizations/register";
// import { PLUGIN_APP_INIT_FUCTIONS } from "metabase/plugins";

// import { getStore } from "./store";

// // remove trailing slash
// const BASENAME = window.MetabaseRoot.replace(/\/+$/, "");

// api.basename = BASENAME;

// // eslint-disable-next-line react-hooks/rules-of-hooks
// const browserHistory = useRouterHistory(createHistory)({
//   basename: BASENAME,
// });

// function _init(reducers, callback) {
//   const store = getStore(reducers, browserHistory);

//   let root;

//   registerVisualizations();

//   initializeEmbedding(store);

//   store.dispatch(refreshSiteSettings());

//   PLUGIN_APP_INIT_FUCTIONS.forEach(init => init({ root }));

//   window.Metabase = window.Metabase || {};
//   window.Metabase.store = store;
//   window.Metabase.settings = MetabaseSettings;

//   if (callback) {
//     callback(store);
//   }
// }

// export function init(...args) {
//   if (document.readyState !== "loading") {
//     _init(...args);
//   } else {
//     document.addEventListener("DOMContentLoaded", () => _init(...args));
//   }
// }

import { init } from "./app";

import reducersPublic from "./reducers-public";

import Visualization from "./visualizations/components/Visualization";

const getRoutes = () => {
  return;
};

export const initApp = callback => {
  init(reducersPublic, getRoutes, callback);
};

export { Visualization };
