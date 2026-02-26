var content = (function() {
  "use strict";var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  function defineContentScript(definition2) {
    return definition2;
  }
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  var browserPolyfill$1 = { exports: {} };
  var browserPolyfill = browserPolyfill$1.exports;
  var hasRequiredBrowserPolyfill;
  function requireBrowserPolyfill() {
    if (hasRequiredBrowserPolyfill) return browserPolyfill$1.exports;
    hasRequiredBrowserPolyfill = 1;
    (function(module, exports$1) {
      (function(global, factory) {
        {
          factory(module);
        }
      })(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : browserPolyfill, function(module2) {
        if (!(globalThis.chrome && globalThis.chrome.runtime && globalThis.chrome.runtime.id)) {
          throw new Error("This script should only be loaded in a browser extension.");
        }
        if (!(globalThis.browser && globalThis.browser.runtime && globalThis.browser.runtime.id)) {
          const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
          const wrapAPIs = (extensionAPIs) => {
            const apiMetadata = {
              "alarms": {
                "clear": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "clearAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "get": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "bookmarks": {
                "create": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getChildren": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getRecent": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getSubTree": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getTree": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "move": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeTree": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "search": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              },
              "browserAction": {
                "disable": {
                  "minArgs": 0,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "enable": {
                  "minArgs": 0,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "getBadgeBackgroundColor": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getBadgeText": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getPopup": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getTitle": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "openPopup": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "setBadgeBackgroundColor": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setBadgeText": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setIcon": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "setPopup": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setTitle": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                }
              },
              "browsingData": {
                "remove": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "removeCache": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeCookies": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeDownloads": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeFormData": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeHistory": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeLocalStorage": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removePasswords": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removePluginData": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "settings": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "commands": {
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "contextMenus": {
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              },
              "cookies": {
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAllCookieStores": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "set": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "devtools": {
                "inspectedWindow": {
                  "eval": {
                    "minArgs": 1,
                    "maxArgs": 2,
                    "singleCallbackArg": false
                  }
                },
                "panels": {
                  "create": {
                    "minArgs": 3,
                    "maxArgs": 3,
                    "singleCallbackArg": true
                  },
                  "elements": {
                    "createSidebarPane": {
                      "minArgs": 1,
                      "maxArgs": 1
                    }
                  }
                }
              },
              "downloads": {
                "cancel": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "download": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "erase": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getFileIcon": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "open": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "pause": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeFile": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "resume": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "search": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "show": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                }
              },
              "extension": {
                "isAllowedFileSchemeAccess": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "isAllowedIncognitoAccess": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "history": {
                "addUrl": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "deleteAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "deleteRange": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "deleteUrl": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getVisits": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "search": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "i18n": {
                "detectLanguage": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAcceptLanguages": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "identity": {
                "launchWebAuthFlow": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "idle": {
                "queryState": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "management": {
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getSelf": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "setEnabled": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "uninstallSelf": {
                  "minArgs": 0,
                  "maxArgs": 1
                }
              },
              "notifications": {
                "clear": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "create": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getPermissionLevel": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              },
              "pageAction": {
                "getPopup": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getTitle": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "hide": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setIcon": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "setPopup": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setTitle": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "show": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                }
              },
              "permissions": {
                "contains": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "request": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "runtime": {
                "getBackgroundPage": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getPlatformInfo": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "openOptionsPage": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "requestUpdateCheck": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "sendMessage": {
                  "minArgs": 1,
                  "maxArgs": 3
                },
                "sendNativeMessage": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "setUninstallURL": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "sessions": {
                "getDevices": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getRecentlyClosed": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "restore": {
                  "minArgs": 0,
                  "maxArgs": 1
                }
              },
              "storage": {
                "local": {
                  "clear": {
                    "minArgs": 0,
                    "maxArgs": 0
                  },
                  "get": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "getBytesInUse": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "remove": {
                    "minArgs": 1,
                    "maxArgs": 1
                  },
                  "set": {
                    "minArgs": 1,
                    "maxArgs": 1
                  }
                },
                "managed": {
                  "get": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "getBytesInUse": {
                    "minArgs": 0,
                    "maxArgs": 1
                  }
                },
                "sync": {
                  "clear": {
                    "minArgs": 0,
                    "maxArgs": 0
                  },
                  "get": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "getBytesInUse": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "remove": {
                    "minArgs": 1,
                    "maxArgs": 1
                  },
                  "set": {
                    "minArgs": 1,
                    "maxArgs": 1
                  }
                }
              },
              "tabs": {
                "captureVisibleTab": {
                  "minArgs": 0,
                  "maxArgs": 2
                },
                "create": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "detectLanguage": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "discard": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "duplicate": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "executeScript": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getCurrent": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getZoom": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getZoomSettings": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "goBack": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "goForward": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "highlight": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "insertCSS": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "move": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "query": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "reload": {
                  "minArgs": 0,
                  "maxArgs": 2
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeCSS": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "sendMessage": {
                  "minArgs": 2,
                  "maxArgs": 3
                },
                "setZoom": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "setZoomSettings": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "update": {
                  "minArgs": 1,
                  "maxArgs": 2
                }
              },
              "topSites": {
                "get": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "webNavigation": {
                "getAllFrames": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getFrame": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "webRequest": {
                "handlerBehaviorChanged": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "windows": {
                "create": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "get": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getCurrent": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getLastFocused": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              }
            };
            if (Object.keys(apiMetadata).length === 0) {
              throw new Error("api-metadata.json has not been included in browser-polyfill");
            }
            class DefaultWeakMap extends WeakMap {
              constructor(createItem, items = void 0) {
                super(items);
                this.createItem = createItem;
              }
              get(key) {
                if (!this.has(key)) {
                  this.set(key, this.createItem(key));
                }
                return super.get(key);
              }
            }
            const isThenable = (value) => {
              return value && typeof value === "object" && typeof value.then === "function";
            };
            const makeCallback = (promise, metadata) => {
              return (...callbackArgs) => {
                if (extensionAPIs.runtime.lastError) {
                  promise.reject(new Error(extensionAPIs.runtime.lastError.message));
                } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
                  promise.resolve(callbackArgs[0]);
                } else {
                  promise.resolve(callbackArgs);
                }
              };
            };
            const pluralizeArguments = (numArgs) => numArgs == 1 ? "argument" : "arguments";
            const wrapAsyncFunction = (name, metadata) => {
              return function asyncFunctionWrapper(target, ...args) {
                if (args.length < metadata.minArgs) {
                  throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
                }
                if (args.length > metadata.maxArgs) {
                  throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
                }
                return new Promise((resolve, reject) => {
                  if (metadata.fallbackToNoCallback) {
                    try {
                      target[name](...args, makeCallback({
                        resolve,
                        reject
                      }, metadata));
                    } catch (cbError) {
                      console.warn(`${name} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, cbError);
                      target[name](...args);
                      metadata.fallbackToNoCallback = false;
                      metadata.noCallback = true;
                      resolve();
                    }
                  } else if (metadata.noCallback) {
                    target[name](...args);
                    resolve();
                  } else {
                    target[name](...args, makeCallback({
                      resolve,
                      reject
                    }, metadata));
                  }
                });
              };
            };
            const wrapMethod = (target, method, wrapper) => {
              return new Proxy(method, {
                apply(targetMethod, thisObj, args) {
                  return wrapper.call(thisObj, target, ...args);
                }
              });
            };
            let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
            const wrapObject = (target, wrappers = {}, metadata = {}) => {
              let cache = /* @__PURE__ */ Object.create(null);
              let handlers = {
                has(proxyTarget2, prop) {
                  return prop in target || prop in cache;
                },
                get(proxyTarget2, prop, receiver) {
                  if (prop in cache) {
                    return cache[prop];
                  }
                  if (!(prop in target)) {
                    return void 0;
                  }
                  let value = target[prop];
                  if (typeof value === "function") {
                    if (typeof wrappers[prop] === "function") {
                      value = wrapMethod(target, target[prop], wrappers[prop]);
                    } else if (hasOwnProperty(metadata, prop)) {
                      let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                      value = wrapMethod(target, target[prop], wrapper);
                    } else {
                      value = value.bind(target);
                    }
                  } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
                    value = wrapObject(value, wrappers[prop], metadata[prop]);
                  } else if (hasOwnProperty(metadata, "*")) {
                    value = wrapObject(value, wrappers[prop], metadata["*"]);
                  } else {
                    Object.defineProperty(cache, prop, {
                      configurable: true,
                      enumerable: true,
                      get() {
                        return target[prop];
                      },
                      set(value2) {
                        target[prop] = value2;
                      }
                    });
                    return value;
                  }
                  cache[prop] = value;
                  return value;
                },
                set(proxyTarget2, prop, value, receiver) {
                  if (prop in cache) {
                    cache[prop] = value;
                  } else {
                    target[prop] = value;
                  }
                  return true;
                },
                defineProperty(proxyTarget2, prop, desc) {
                  return Reflect.defineProperty(cache, prop, desc);
                },
                deleteProperty(proxyTarget2, prop) {
                  return Reflect.deleteProperty(cache, prop);
                }
              };
              let proxyTarget = Object.create(target);
              return new Proxy(proxyTarget, handlers);
            };
            const wrapEvent = (wrapperMap) => ({
              addListener(target, listener, ...args) {
                target.addListener(wrapperMap.get(listener), ...args);
              },
              hasListener(target, listener) {
                return target.hasListener(wrapperMap.get(listener));
              },
              removeListener(target, listener) {
                target.removeListener(wrapperMap.get(listener));
              }
            });
            const onRequestFinishedWrappers = new DefaultWeakMap((listener) => {
              if (typeof listener !== "function") {
                return listener;
              }
              return function onRequestFinished(req) {
                const wrappedReq = wrapObject(req, {}, {
                  getContent: {
                    minArgs: 0,
                    maxArgs: 0
                  }
                });
                listener(wrappedReq);
              };
            });
            const onMessageWrappers = new DefaultWeakMap((listener) => {
              if (typeof listener !== "function") {
                return listener;
              }
              return function onMessage(message, sender, sendResponse) {
                let didCallSendResponse = false;
                let wrappedSendResponse;
                let sendResponsePromise = new Promise((resolve) => {
                  wrappedSendResponse = function(response) {
                    didCallSendResponse = true;
                    resolve(response);
                  };
                });
                let result2;
                try {
                  result2 = listener(message, sender, wrappedSendResponse);
                } catch (err) {
                  result2 = Promise.reject(err);
                }
                const isResultThenable = result2 !== true && isThenable(result2);
                if (result2 !== true && !isResultThenable && !didCallSendResponse) {
                  return false;
                }
                const sendPromisedResult = (promise) => {
                  promise.then((msg) => {
                    sendResponse(msg);
                  }, (error) => {
                    let message2;
                    if (error && (error instanceof Error || typeof error.message === "string")) {
                      message2 = error.message;
                    } else {
                      message2 = "An unexpected error occurred";
                    }
                    sendResponse({
                      __mozWebExtensionPolyfillReject__: true,
                      message: message2
                    });
                  }).catch((err) => {
                    console.error("Failed to send onMessage rejected reply", err);
                  });
                };
                if (isResultThenable) {
                  sendPromisedResult(result2);
                } else {
                  sendPromisedResult(sendResponsePromise);
                }
                return true;
              };
            });
            const wrappedSendMessageCallback = ({
              reject,
              resolve
            }, reply) => {
              if (extensionAPIs.runtime.lastError) {
                if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
                  resolve();
                } else {
                  reject(new Error(extensionAPIs.runtime.lastError.message));
                }
              } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
                reject(new Error(reply.message));
              } else {
                resolve(reply);
              }
            };
            const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
              if (args.length < metadata.minArgs) {
                throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
              }
              if (args.length > metadata.maxArgs) {
                throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
              }
              return new Promise((resolve, reject) => {
                const wrappedCb = wrappedSendMessageCallback.bind(null, {
                  resolve,
                  reject
                });
                args.push(wrappedCb);
                apiNamespaceObj.sendMessage(...args);
              });
            };
            const staticWrappers = {
              devtools: {
                network: {
                  onRequestFinished: wrapEvent(onRequestFinishedWrappers)
                }
              },
              runtime: {
                onMessage: wrapEvent(onMessageWrappers),
                onMessageExternal: wrapEvent(onMessageWrappers),
                sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                  minArgs: 1,
                  maxArgs: 3
                })
              },
              tabs: {
                sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                  minArgs: 2,
                  maxArgs: 3
                })
              }
            };
            const settingMetadata = {
              clear: {
                minArgs: 1,
                maxArgs: 1
              },
              get: {
                minArgs: 1,
                maxArgs: 1
              },
              set: {
                minArgs: 1,
                maxArgs: 1
              }
            };
            apiMetadata.privacy = {
              network: {
                "*": settingMetadata
              },
              services: {
                "*": settingMetadata
              },
              websites: {
                "*": settingMetadata
              }
            };
            return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
          };
          module2.exports = wrapAPIs(chrome);
        } else {
          module2.exports = globalThis.browser;
        }
      });
    })(browserPolyfill$1);
    return browserPolyfill$1.exports;
  }
  var browserPolyfillExports = requireBrowserPolyfill();
  const originalBrowser = /* @__PURE__ */ getDefaultExportFromCjs(browserPolyfillExports);
  const browser = originalBrowser;
  var FieldType = /* @__PURE__ */ ((FieldType2) => {
    FieldType2["TEXT"] = "text";
    FieldType2["EMAIL"] = "email";
    FieldType2["PHONE"] = "phone";
    FieldType2["DATE"] = "date";
    FieldType2["ADDRESS"] = "address";
    FieldType2["SSN"] = "ssn";
    FieldType2["NUMBER"] = "number";
    FieldType2["UNKNOWN"] = "unknown";
    return FieldType2;
  })(FieldType || {});
  content;
  const FIELD_PATTERNS = {
    [FieldType.EMAIL]: [/email/i, /e[-_]?mail/i, /mail/i],
    [FieldType.PHONE]: [/phone/i, /tel/i, /mobile/i, /cell/i, /fax/i],
    [FieldType.DATE]: [/date/i, /birth/i, /dob/i, /day/i, /month/i, /year/i, /expire/i, /expiry/i],
    [FieldType.ADDRESS]: [
      /address/i,
      /street/i,
      /city/i,
      /state/i,
      /zip/i,
      /postal/i,
      /country/i,
      /location/i
    ],
    [FieldType.SSN]: [/ssn/i, /social[-_]?security/i, /tax[-_]?id/i, /ein/i],
    [FieldType.NUMBER]: [/number/i, /num/i, /id/i, /account/i, /reference/i, /ref/i]
  };
  const FIELD_SELECTORS = [
    'input[type="text"]',
    'input[type="email"]',
    'input[type="tel"]',
    'input[type="date"]',
    'input[type="number"]',
    'input[type="search"]',
    'input[type="url"]',
    "input:not([type])",
    "textarea",
    "select"
  ].join(", ");
  const EXCLUDED_SELECTORS = [
    '[type="password"]',
    '[type="hidden"]',
    '[type="submit"]',
    '[type="button"]',
    '[type="reset"]',
    '[type="file"]',
    '[type="image"]',
    '[type="checkbox"]',
    '[type="radio"]',
    "[disabled]",
    "[readonly]",
    '[aria-hidden="true"]',
    ".intellifill-autocomplete",
    "[data-intellifill-processed]"
  ].join(", ");
  const EXCLUDED_CONTAINERS = ["[data-intellifill-ignore]", ".captcha", ".recaptcha"];
  function detectFieldType(element) {
    var _a;
    const inputType = (_a = element.type) == null ? void 0 : _a.toLowerCase();
    if (inputType === "email") return FieldType.EMAIL;
    if (inputType === "tel") return FieldType.PHONE;
    if (inputType === "date") return FieldType.DATE;
    if (inputType === "number") return FieldType.NUMBER;
    const fieldName = getFieldIdentifier(element);
    const normalizedName = fieldName.toLowerCase().trim();
    for (const [type, patterns] of Object.entries(FIELD_PATTERNS)) {
      for (const pattern of patterns) {
        if (pattern.test(normalizedName)) {
          return type;
        }
      }
    }
    return FieldType.TEXT;
  }
  function getFieldIdentifier(element) {
    return element.name || element.id || element.placeholder || element.getAttribute("aria-label") || element.getAttribute("autocomplete") || "";
  }
  function getFieldLabel(element) {
    var _a, _b;
    if (element.id) {
      const label = document.querySelector(`label[for="${CSS.escape(element.id)}"]`);
      if (label) return ((_a = label.textContent) == null ? void 0 : _a.trim()) || "";
    }
    const parentLabel = element.closest("label");
    if (parentLabel) {
      const clone = parentLabel.cloneNode(true);
      const inputs = clone.querySelectorAll("input, textarea, select");
      inputs.forEach((input) => input.remove());
      return ((_b = clone.textContent) == null ? void 0 : _b.trim()) || "";
    }
    const ariaLabel = element.getAttribute("aria-label");
    if (ariaLabel) return ariaLabel.trim();
    const placeholder = element.placeholder;
    if (placeholder) return placeholder.trim();
    return "";
  }
  function isElementVisible(element) {
    if (!element.offsetParent && element.style.display !== "fixed") {
      return false;
    }
    const style = window.getComputedStyle(element);
    return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
  }
  function shouldExclude(element) {
    if (element.matches(EXCLUDED_SELECTORS)) {
      return true;
    }
    for (const selector of EXCLUDED_CONTAINERS) {
      if (element.closest(selector)) {
        return true;
      }
    }
    return false;
  }
  function markAsProcessed(element) {
    element.setAttribute("data-intellifill-processed", "true");
  }
  function detectFields() {
    const fields = [];
    const elements = document.querySelectorAll(FIELD_SELECTORS);
    elements.forEach((element) => {
      if (shouldExclude(element)) return;
      if (!isElementVisible(element)) return;
      fields.push({
        element,
        name: getFieldIdentifier(element),
        label: getFieldLabel(element),
        type: detectFieldType(element),
        tagName: element.tagName.toLowerCase(),
        inputType: element.type || "text",
        value: element.value || "",
        isRequired: element.required || element.hasAttribute("required"),
        autocomplete: element.getAttribute("autocomplete") || ""
      });
    });
    return fields;
  }
  function observeDOMChanges(callback) {
    let debounceTimer = null;
    const observer = new MutationObserver((mutations) => {
      let hasNewFields = false;
      for (const mutation of mutations) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            var _a, _b;
            if (node.nodeType === Node.ELEMENT_NODE) {
              const el = node;
              const hasFields = ((_a = el.matches) == null ? void 0 : _a.call(el, FIELD_SELECTORS)) || ((_b = el.querySelector) == null ? void 0 : _b.call(el, FIELD_SELECTORS));
              if (hasFields) {
                hasNewFields = true;
              }
            }
          });
        }
      }
      if (hasNewFields) {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(callback, 200);
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    return observer;
  }
  content;
  const AUTOCOMPLETE_TO_PROFILE = {
    "given-name": "firstName",
    "additional-name": "middleName",
    "family-name": "lastName",
    name: "fullName",
    "honorific-prefix": "prefix",
    "honorific-suffix": "suffix",
    nickname: "nickname",
    email: "email",
    tel: "phone",
    "tel-national": "phone",
    "tel-local": "phone",
    "street-address": "streetAddress",
    "address-line1": "streetAddress",
    "address-line2": "streetAddress2",
    "address-level2": "city",
    "address-level1": "state",
    "postal-code": "zipCode",
    country: "country",
    "country-name": "country",
    bday: "dateOfBirth",
    "bday-day": "birthDay",
    "bday-month": "birthMonth",
    "bday-year": "birthYear",
    sex: "gender",
    organization: "company",
    "organization-title": "jobTitle",
    url: "website",
    username: "username",
    "tel-country-code": "phoneCountryCode",
    "address-level3": "district",
    "cc-name": "cardholderName",
    "cc-number": "cardNumber",
    "cc-exp": "cardExpiry",
    "cc-csc": "cardCVC"
  };
  const PROFILE_KEY_PATTERNS = {
    firstName: /\b(first[-_\s]?name|fname|given[-_\s]?name|forename|vorname|prenom|nombre)\b/i,
    middleName: /\b(middle[-_\s]?name|mname|zweiter[-_\s]?name)\b/i,
    lastName: /\b(last[-_\s]?name|lname|family[-_\s]?name|surname|nachname|nom[-_\s]?de[-_\s]?famille|apellido)\b/i,
    fullName: /\b(full[-_\s]?name|your[-_\s]?name|name|anrede)\b/i,
    username: /\b(user[-_\s]?name|screen[-_\s]?name|login[-_\s]?name|login[-_\s]?id|benutzername)\b/i,
    email: /\b(e[-_\s]?mail|email[-_\s]?address|correo)\b/i,
    phone: /\b(phone|telephone|tel|mobile|cell[-_\s]?phone|contact[-_\s]?number|telefon|handy|telefono|numero[-_\s]?de[-_\s]?telephone)\b/i,
    streetAddress: /\b(street|address[-_\s]?1|address[-_\s]?line[-_\s]?1|street[-_\s]?address|mailing[-_\s]?address|addr|strasse|straße|rue|direccion|calle)\b/i,
    streetAddress2: /\b(address[-_\s]?2|address[-_\s]?line[-_\s]?2|apt|suite|unit|zusatz)\b/i,
    city: /\b(city|town|municipality|locality|stadt|ville|ciudad|ort)\b/i,
    state: /\b(state|province|region|bundesland|departement|provincia|kanton)\b/i,
    zipCode: /\b(zip|zip[-_\s]?code|postal[-_\s]?code|postcode|plz|code[-_\s]?postal|codigo[-_\s]?postal)\b/i,
    country: /\b(country|nation|land|pays|pais)\b/i,
    dateOfBirth: /\b(date[-_\s]?of[-_\s]?birth|dob|birth[-_\s]?date|birthday|geburtsdatum|fecha[-_\s]?de[-_\s]?nacimiento)\b/i,
    birthDay: /\b(birth[-_\s]?day|day[-_\s]?of[-_\s]?birth|geburtstag)\b/i,
    birthMonth: /\b(birth[-_\s]?month|month[-_\s]?of[-_\s]?birth|geburtsmonat)\b/i,
    birthYear: /\b(birth[-_\s]?year|year[-_\s]?of[-_\s]?birth|geburtsjahr)\b/i,
    gender: /\b(gender|sex|geschlecht|sexe|genero)\b/i,
    company: /\b(company|organization|employer|business|firma|unternehmen|entreprise|empresa)\b/i,
    jobTitle: /\b(job[-_\s]?title|title|position|role|occupation|beruf|berufsbezeichnung|titulo)\b/i,
    ssn: /\b(ssn|social[-_\s]?security|tax[-_\s]?id|tin|steuer[-_\s]?id)\b/i,
    website: /\b(website|url|homepage|web[-_\s]?address|webseite)\b/i,
    driversLicense: /\b(driver'?s?[-_\s]?licen[sc]e|dl[-_\s]?number|fuehrerschein|führerschein)\b/i,
    passportNumber: /\b(passport[-_\s]?number|passport|reisepass)\b/i
  };
  const TYPE_TO_PROFILE_KEYS = {
    [FieldType.EMAIL]: ["email"],
    [FieldType.PHONE]: ["phone"],
    [FieldType.DATE]: ["dateOfBirth"],
    [FieldType.SSN]: ["ssn"],
    [FieldType.ADDRESS]: ["streetAddress", "city", "state", "zipCode", "country"]
  };
  function normalize(str) {
    return str.toLowerCase().replace(/[-_\s]+/g, "").replace(/[^a-z0-9]/g, "");
  }
  function levenshtein(a, b) {
    const rows = b.length + 1;
    const cols = a.length + 1;
    const matrix = new Array(rows * cols).fill(0);
    for (let i = 0; i < rows; i++) matrix[i * cols] = i;
    for (let j = 0; j < cols; j++) matrix[j] = j;
    for (let i = 1; i < rows; i++) {
      for (let j = 1; j < cols; j++) {
        const cost = b[i - 1] === a[j - 1] ? 0 : 1;
        matrix[i * cols + j] = Math.min(
          (matrix[(i - 1) * cols + j] ?? 0) + 1,
          (matrix[i * cols + (j - 1)] ?? 0) + 1,
          (matrix[(i - 1) * cols + (j - 1)] ?? 0) + cost
        );
      }
    }
    return matrix[b.length * cols + a.length] ?? 0;
  }
  function similarity(a, b) {
    const na = normalize(a);
    const nb = normalize(b);
    if (na === nb) return 1;
    if (na.length === 0 || nb.length === 0) return 0;
    const maxLen = Math.max(na.length, nb.length);
    return 1 - levenshtein(na, nb) / maxLen;
  }
  function buildProfileMap(fields) {
    const map = /* @__PURE__ */ new Map();
    for (const field of fields) {
      const firstValue = field.values[0];
      if (firstValue !== void 0) {
        map.set(field.key, firstValue);
      }
    }
    return map;
  }
  function getFieldTexts(field) {
    const texts = [];
    if (field.name) texts.push(field.name);
    if (field.label) texts.push(field.label);
    if (field.element.id) texts.push(field.element.id);
    if (field.element.placeholder) {
      texts.push(field.element.placeholder);
    }
    return texts;
  }
  function matchField(field, profileMap) {
    const matches = [];
    const seen = /* @__PURE__ */ new Set();
    function addMatch(profileField, confidence, method) {
      const value = profileMap.get(profileField);
      if (!value || seen.has(profileField)) return;
      seen.add(profileField);
      matches.push({ profileField, value, confidence, matchMethod: method });
    }
    if (field.autocomplete) {
      const autocompleteKey = field.autocomplete.replace(/^(shipping|billing)\s+/, "").trim();
      const profileKey = AUTOCOMPLETE_TO_PROFILE[autocompleteKey];
      if (profileKey) {
        addMatch(profileKey, 0.95, "autocomplete");
      }
    }
    const typeKeys = TYPE_TO_PROFILE_KEYS[field.type];
    if (typeKeys) {
      for (const key of typeKeys) {
        addMatch(key, 0.85, "type");
      }
    }
    const texts = getFieldTexts(field);
    for (const [profileKey, pattern] of Object.entries(PROFILE_KEY_PATTERNS)) {
      for (const text of texts) {
        if (pattern.test(text)) {
          addMatch(profileKey, 0.8, "name");
          break;
        }
      }
    }
    if (matches.length === 0) {
      for (const text of texts) {
        for (const [profileKey] of profileMap) {
          const sim = similarity(text, profileKey);
          if (sim >= 0.6) {
            addMatch(profileKey, sim * 0.64, "fuzzy");
          }
        }
      }
    }
    matches.sort((a, b) => b.confidence - a.confidence);
    return matches;
  }
  function buildFieldContext(field, index) {
    const el = field.element;
    return {
      index,
      name: field.name || "",
      label: field.label || "",
      type: field.type,
      inputType: el.type || "",
      autocomplete: field.autocomplete || "",
      placeholder: el.placeholder || ""
    };
  }
  function matchFieldsAsync(fields, profileFields) {
    const profileMap = buildProfileMap(profileFields);
    const matched = [];
    const unmatched = [];
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      const matches = matchField(field, profileMap);
      if (matches.length > 0) {
        matched.push({ field, matches });
      } else {
        unmatched.push({ field, context: buildFieldContext(field, i) });
      }
    }
    return { matched, unmatched };
  }
  content;
  function getNativeSetter(element) {
    var _a, _b;
    if (element instanceof HTMLInputElement) {
      return ((_a = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")) == null ? void 0 : _a.set) ?? null;
    }
    if (element instanceof HTMLTextAreaElement) {
      return ((_b = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")) == null ? void 0 : _b.set) ?? null;
    }
    return null;
  }
  function dispatchChangeEvents(element) {
    element.dispatchEvent(new Event("input", { bubbles: true }));
    element.dispatchEvent(new Event("change", { bubbles: true }));
    element.dispatchEvent(new Event("blur", { bubbles: true }));
  }
  function formatDateValue(value) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    const parsed = new Date(value);
    if (!isNaN(parsed.getTime())) {
      return parsed.toISOString().split("T")[0] ?? value;
    }
    return value;
  }
  function fillSelectField(element, value) {
    const normalizedValue = value.toLowerCase().trim();
    const options = Array.from(element.options);
    const byValue = options.find((opt) => opt.value.toLowerCase() === normalizedValue);
    if (byValue) {
      element.value = byValue.value;
      dispatchChangeEvents(element);
      return true;
    }
    const byText = options.find((opt) => opt.text.toLowerCase().trim() === normalizedValue);
    if (byText) {
      element.value = byText.value;
      dispatchChangeEvents(element);
      return true;
    }
    const byContains = options.find(
      (opt) => opt.text.toLowerCase().includes(normalizedValue) || normalizedValue.includes(opt.text.toLowerCase().trim())
    );
    if (byContains) {
      element.value = byContains.value;
      dispatchChangeEvents(element);
      return true;
    }
    return false;
  }
  function fillInputField(element, value) {
    var _a;
    const inputType = (_a = element.type) == null ? void 0 : _a.toLowerCase();
    const fillValue = inputType === "date" ? formatDateValue(value) : value;
    const nativeSetter = getNativeSetter(element);
    if (nativeSetter) {
      nativeSetter.call(element, fillValue);
    } else {
      element.value = fillValue;
    }
    element.focus();
    dispatchChangeEvents(element);
    return true;
  }
  function fillField(element, value) {
    try {
      if (element instanceof HTMLSelectElement) {
        return fillSelectField(element, value);
      }
      return fillInputField(element, value);
    } catch (error) {
      console.error("IntelliFill: Error filling field", error);
      return false;
    }
  }
  function fillAllFields(matchedFields) {
    var _a;
    const result2 = { filled: 0, skipped: 0, failed: 0 };
    for (const { field, matches } of matchedFields) {
      if (matches.length !== 1) {
        result2.skipped++;
        continue;
      }
      if ((_a = field.element.value) == null ? void 0 : _a.trim()) {
        result2.skipped++;
        continue;
      }
      const match = matches[0];
      if (!match) {
        result2.skipped++;
        continue;
      }
      const success = fillField(field.element, match.value);
      if (success) {
        result2.filled++;
      } else {
        result2.failed++;
      }
    }
    return result2;
  }
  content;
  const MAX_SUGGESTIONS = 5;
  content;
  const SHADOW_HOST_ID = "intellifill-autocomplete-root";
  const STYLES = `
  :host {
    all: initial;
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    z-index: 2147483647;
    pointer-events: none;
  }

  .if-badge {
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #6366f1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    pointer-events: auto;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    transition: transform 0.15s ease;
    z-index: 2147483647;
  }

  .if-badge:hover {
    transform: scale(1.15);
  }

  .if-badge svg {
    width: 10px;
    height: 10px;
    fill: white;
  }

  .if-dropdown {
    position: absolute;
    min-width: 220px;
    max-width: 360px;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    pointer-events: auto;
    overflow: hidden;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }

  .if-dropdown-header {
    padding: 6px 10px;
    font-size: 11px;
    color: #64748b;
    border-bottom: 1px solid #f1f5f9;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .if-dropdown-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 10px;
    cursor: pointer;
    font-size: 13px;
    color: #1e293b;
    transition: background 0.1s;
  }

  .if-dropdown-item:hover,
  .if-dropdown-item.if-active {
    background: #f1f5f9;
  }

  .if-dropdown-item-value {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 8px;
  }

  .if-dropdown-item-confidence {
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 4px;
    flex-shrink: 0;
  }

  .if-confidence-high {
    background: #dcfce7;
    color: #166534;
  }

  .if-confidence-medium {
    background: #fef9c3;
    color: #854d0e;
  }

  .if-confidence-low {
    background: #fee2e2;
    color: #991b1b;
  }

  .if-toast {
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: #1e293b;
    color: white;
    padding: 10px 18px;
    border-radius: 8px;
    font-size: 13px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    pointer-events: auto;
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.2s, transform 0.2s;
    z-index: 2147483647;
  }

  .if-toast.if-visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
  function createBadgeSVG() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z");
    svg.appendChild(path);
    return svg;
  }
  class AutocompleteManager {
    constructor() {
      __publicField(this, "shadowHost", null);
      __publicField(this, "shadowRoot", null);
      __publicField(this, "fieldUIMap", /* @__PURE__ */ new Map());
      __publicField(this, "focusListeners", /* @__PURE__ */ new Map());
      __publicField(this, "activeDropdown", null);
      __publicField(this, "mutationObserver", null);
      __publicField(this, "scrollHandler", null);
      __publicField(this, "repositionTimer", null);
      __publicField(this, "keydownHandler", null);
      __publicField(this, "outsideClickHandler", null);
    }
    /** Initialize the Shadow DOM container */
    init() {
      if (this.shadowHost) return;
      this.shadowHost = document.createElement("div");
      this.shadowHost.id = SHADOW_HOST_ID;
      this.shadowHost.style.cssText = "position:absolute;top:0;left:0;width:0;height:0;overflow:visible;z-index:2147483647;pointer-events:none;";
      document.body.appendChild(this.shadowHost);
      this.shadowRoot = this.shadowHost.attachShadow({ mode: "closed" });
      const styleEl = document.createElement("style");
      styleEl.textContent = STYLES;
      this.shadowRoot.appendChild(styleEl);
      this.scrollHandler = this.debounce(() => this.repositionAll(), 50);
      window.addEventListener("scroll", this.scrollHandler, true);
      window.addEventListener("resize", this.scrollHandler);
      this.mutationObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          mutation.removedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              this.cleanupRemovedElements(node);
            }
          });
        }
      });
      this.mutationObserver.observe(document.body, { childList: true, subtree: true });
    }
    /** Attach autocomplete UI to matched fields */
    attachToFields(matchedFields) {
      if (!this.shadowRoot) this.init();
      for (const matchedField of matchedFields) {
        const element = matchedField.field.element;
        if (this.fieldUIMap.has(element)) continue;
        const badge = this.createBadge(element, matchedField);
        const ui = { matchedField, badge, dropdown: null };
        this.fieldUIMap.set(element, ui);
        const focusHandler = () => this.showDropdown(element);
        element.addEventListener("focus", focusHandler);
        this.focusListeners.set(element, focusHandler);
      }
    }
    /** Remove all UI elements and listeners */
    destroy() {
      this.closeDropdown();
      for (const [element, ui] of this.fieldUIMap) {
        ui.badge.remove();
        if (ui.dropdown) ui.dropdown.remove();
        const focusHandler = this.focusListeners.get(element);
        if (focusHandler) element.removeEventListener("focus", focusHandler);
      }
      this.fieldUIMap.clear();
      this.focusListeners.clear();
      if (this.scrollHandler) {
        window.removeEventListener("scroll", this.scrollHandler, true);
        window.removeEventListener("resize", this.scrollHandler);
      }
      if (this.mutationObserver) this.mutationObserver.disconnect();
      if (this.repositionTimer) clearTimeout(this.repositionTimer);
      if (this.shadowHost) {
        this.shadowHost.remove();
        this.shadowHost = null;
        this.shadowRoot = null;
      }
    }
    /** Show a toast notification */
    showToast(message, duration = 2500) {
      if (!this.shadowRoot) return;
      const toast = document.createElement("div");
      toast.className = "if-toast";
      toast.textContent = message;
      this.shadowRoot.appendChild(toast);
      requestAnimationFrame(() => {
        toast.classList.add("if-visible");
      });
      setTimeout(() => {
        toast.classList.remove("if-visible");
        setTimeout(() => toast.remove(), 200);
      }, duration);
    }
    /** Show fill-all results as toast */
    showFillResult(result2) {
      const parts = [];
      if (result2.filled > 0) parts.push(`${result2.filled} filled`);
      if (result2.skipped > 0) parts.push(`${result2.skipped} skipped`);
      if (result2.failed > 0) parts.push(`${result2.failed} failed`);
      this.showToast(`IntelliFill: ${parts.join(", ")}`);
    }
    /** Get all currently tracked matched fields */
    getMatchedFields() {
      return Array.from(this.fieldUIMap.values()).map((ui) => ui.matchedField);
    }
    // --- Private methods ---
    createBadge(element, matchedField) {
      const badge = document.createElement("div");
      badge.className = "if-badge";
      badge.appendChild(createBadgeSVG());
      badge.title = `IntelliFill: ${matchedField.matches.length} suggestion(s)`;
      this.shadowRoot.appendChild(badge);
      this.positionBadge(badge, element);
      badge.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.toggleDropdown(element);
      });
      return badge;
    }
    positionBadge(badge, element) {
      const rect = element.getBoundingClientRect();
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      badge.style.top = `${rect.top + scrollY + (rect.height - 18) / 2}px`;
      badge.style.left = `${rect.right + scrollX - 24}px`;
    }
    toggleDropdown(element) {
      var _a;
      if (((_a = this.activeDropdown) == null ? void 0 : _a.element) === element) {
        this.closeDropdown();
      } else {
        this.showDropdown(element);
      }
    }
    showDropdown(element) {
      const ui = this.fieldUIMap.get(element);
      if (!ui || !this.shadowRoot) return;
      this.closeDropdown();
      const matches = ui.matchedField.matches.slice(0, MAX_SUGGESTIONS);
      if (matches.length === 0) return;
      const dropdown = document.createElement("div");
      dropdown.className = "if-dropdown";
      const header = document.createElement("div");
      header.className = "if-dropdown-header";
      header.textContent = "IntelliFill Suggestions";
      dropdown.appendChild(header);
      matches.forEach((match, index) => {
        const item = document.createElement("div");
        item.className = "if-dropdown-item";
        if (index === 0) item.classList.add("if-active");
        item.dataset.index = String(index);
        const valueSpan = document.createElement("span");
        valueSpan.className = "if-dropdown-item-value";
        valueSpan.textContent = match.value;
        valueSpan.title = `${match.profileField} (${match.matchMethod})`;
        item.appendChild(valueSpan);
        const confidenceSpan = document.createElement("span");
        confidenceSpan.className = "if-dropdown-item-confidence";
        const pct = Math.round(match.confidence * 100);
        confidenceSpan.textContent = `${pct}%`;
        if (match.confidence >= 0.8) {
          confidenceSpan.classList.add("if-confidence-high");
        } else if (match.confidence >= 0.6) {
          confidenceSpan.classList.add("if-confidence-medium");
        } else {
          confidenceSpan.classList.add("if-confidence-low");
        }
        item.appendChild(confidenceSpan);
        item.addEventListener("click", (e) => {
          e.stopPropagation();
          fillField(element, match.value);
          this.closeDropdown();
        });
        item.addEventListener("mouseenter", () => {
          this.setActiveItem(dropdown, index);
        });
        dropdown.appendChild(item);
      });
      this.shadowRoot.appendChild(dropdown);
      ui.dropdown = dropdown;
      this.positionDropdown(dropdown, element);
      this.activeDropdown = { element, index: 0 };
      this.keydownHandler = (e) => this.handleDropdownKeydown(e, element, dropdown);
      element.addEventListener("keydown", this.keydownHandler);
      this.outsideClickHandler = (e) => {
        if (!dropdown.contains(e.target) && e.target !== element) {
          this.closeDropdown();
        }
      };
      setTimeout(() => {
        document.addEventListener("click", this.outsideClickHandler);
      }, 0);
    }
    closeDropdown() {
      if (!this.activeDropdown) return;
      const ui = this.fieldUIMap.get(this.activeDropdown.element);
      if (ui == null ? void 0 : ui.dropdown) {
        ui.dropdown.remove();
        ui.dropdown = null;
      }
      if (this.keydownHandler) {
        this.activeDropdown.element.removeEventListener("keydown", this.keydownHandler);
        this.keydownHandler = null;
      }
      if (this.outsideClickHandler) {
        document.removeEventListener("click", this.outsideClickHandler);
        this.outsideClickHandler = null;
      }
      this.activeDropdown = null;
    }
    positionDropdown(dropdown, element) {
      const rect = element.getBoundingClientRect();
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      dropdown.style.top = `${rect.bottom + scrollY + 4}px`;
      dropdown.style.left = `${rect.left + scrollX}px`;
      dropdown.style.minWidth = `${Math.max(220, rect.width)}px`;
    }
    setActiveItem(dropdown, index) {
      const items = dropdown.querySelectorAll(".if-dropdown-item");
      items.forEach((item, i) => {
        item.classList.toggle("if-active", i === index);
      });
      if (this.activeDropdown) {
        this.activeDropdown.index = index;
      }
    }
    handleDropdownKeydown(e, element, dropdown) {
      var _a, _b, _c;
      const items = dropdown.querySelectorAll(".if-dropdown-item");
      const count = items.length;
      if (count === 0) return;
      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          const next = ((((_a = this.activeDropdown) == null ? void 0 : _a.index) ?? -1) + 1) % count;
          this.setActiveItem(dropdown, next);
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const prev = ((((_b = this.activeDropdown) == null ? void 0 : _b.index) ?? 1) - 1 + count) % count;
          this.setActiveItem(dropdown, prev);
          break;
        }
        case "Enter": {
          e.preventDefault();
          const activeIndex = ((_c = this.activeDropdown) == null ? void 0 : _c.index) ?? 0;
          const ui = this.fieldUIMap.get(element);
          if (ui) {
            const match = ui.matchedField.matches[activeIndex];
            if (match) {
              fillField(element, match.value);
              this.closeDropdown();
            }
          }
          break;
        }
        case "Escape":
          e.preventDefault();
          this.closeDropdown();
          break;
      }
    }
    repositionAll() {
      var _a;
      for (const [element, ui] of this.fieldUIMap) {
        this.positionBadge(ui.badge, element);
        if (ui.dropdown && ((_a = this.activeDropdown) == null ? void 0 : _a.element) === element) {
          this.positionDropdown(ui.dropdown, element);
        }
      }
    }
    cleanupRemovedElements(root) {
      var _a;
      for (const [element, ui] of this.fieldUIMap) {
        if (root.contains(element) || !document.body.contains(element)) {
          ui.badge.remove();
          if (ui.dropdown) ui.dropdown.remove();
          const focusHandler = this.focusListeners.get(element);
          if (focusHandler) element.removeEventListener("focus", focusHandler);
          this.focusListeners.delete(element);
          this.fieldUIMap.delete(element);
          if (((_a = this.activeDropdown) == null ? void 0 : _a.element) === element) {
            this.activeDropdown = null;
          }
        }
      }
    }
    debounce(fn, ms) {
      let timer = null;
      return () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(fn, ms);
      };
    }
  }
  content;
  let keydownListener = null;
  function setupShortcuts(handlers) {
    teardownShortcuts();
    keydownListener = (e) => {
      var _a;
      if (!e.ctrlKey || !e.shiftKey) return;
      switch (e.key.toUpperCase()) {
        case "F":
          e.preventDefault();
          handlers.onFillAll();
          break;
        case "R":
          e.preventDefault();
          handlers.onRefreshProfile();
          break;
        case "L":
          e.preventDefault();
          (_a = handlers.onInferFields) == null ? void 0 : _a.call(handlers);
          break;
      }
    };
    document.addEventListener("keydown", keydownListener);
  }
  function teardownShortcuts() {
    if (keydownListener) {
      document.removeEventListener("keydown", keydownListener);
      keydownListener = null;
    }
  }
  content;
  const definition = defineContentScript({
    matches: ["<all_urls>"],
    runAt: "document_end",
    allFrames: false,
    main() {
      console.log("IntelliFill: Content script loaded");
      let isEnabled = true;
      let userProfile = null;
      const processedFields = /* @__PURE__ */ new Set();
      let domObserver = null;
      const autocompleteManager = new AutocompleteManager();
      async function fetchProfile() {
        try {
          const response = await browser.runtime.sendMessage({
            action: "getProfile"
          });
          if (response.success && response.profile) {
            userProfile = response.profile;
            console.log("IntelliFill: Profile loaded");
            return true;
          }
          console.log("IntelliFill: No profile available");
          return false;
        } catch (error) {
          console.error("IntelliFill: Error fetching profile", error);
          return false;
        }
      }
      function handleFillAll() {
        const matchedFields = autocompleteManager.getMatchedFields();
        if (matchedFields.length === 0) {
          autocompleteManager.showToast("IntelliFill: No matched fields to fill");
          return;
        }
        const result2 = fillAllFields(matchedFields);
        autocompleteManager.showFillResult(result2);
      }
      async function handleRefreshProfile() {
        const success = await fetchProfile();
        if (success) {
          processedFields.clear();
          autocompleteManager.destroy();
          processFields();
          autocompleteManager.showToast("IntelliFill: Profile refreshed");
        }
      }
      let unmatchedFieldsCache = [];
      async function inferAndAttach(unmatchedItems) {
        if (!userProfile || unmatchedItems.length === 0) return;
        const profileKeys = userProfile.fields.map((f) => f.key);
        const profileMap = new Map(
          userProfile.fields.map((f) => [f.key, f.values[0] ?? ""])
        );
        try {
          const result2 = await browser.runtime.sendMessage({
            action: "inferFields",
            fields: unmatchedItems.map((u) => u.context),
            profileKeys
          });
          if (!result2.success || result2.mappings.length === 0) return;
          const newMatched = [];
          for (const mapping of result2.mappings) {
            const item = unmatchedItems[mapping.index];
            if (!item) continue;
            const value = profileMap.get(mapping.profileKey);
            if (!value) continue;
            const match = {
              profileField: mapping.profileKey,
              value,
              confidence: mapping.confidence,
              // Already capped at 0.9 by backend
              matchMethod: "llm"
            };
            newMatched.push({ field: item.field, matches: [match] });
          }
          if (newMatched.length > 0) {
            console.log(`IntelliFill: LLM matched ${newMatched.length} additional fields`);
            autocompleteManager.attachToFields(newMatched);
            const matchedElements = new Set(newMatched.map((m) => m.field.element));
            unmatchedFieldsCache = unmatchedFieldsCache.filter(
              (item) => !matchedElements.has(item.field.element)
            );
          }
        } catch (error) {
          console.error("IntelliFill: LLM inference failed, heuristic matching still active", error);
        }
      }
      function processFields() {
        if (!userProfile) return;
        const fields = detectFields();
        const newFields = [];
        for (const fieldData of fields) {
          if (processedFields.has(fieldData.element)) continue;
          processedFields.add(fieldData.element);
          markAsProcessed(fieldData.element);
          fieldData.element.setAttribute("data-intellifill-type", fieldData.type);
          newFields.push(fieldData);
        }
        if (newFields.length === 0) return;
        console.log(`IntelliFill: Processing ${newFields.length} new fields`);
        const { matched, unmatched } = matchFieldsAsync(newFields, userProfile.fields);
        console.log(`IntelliFill: Matched ${matched.length} fields to profile data`);
        if (matched.length > 0) {
          autocompleteManager.attachToFields(matched);
        }
        if (unmatched.length > 0) {
          console.log(`IntelliFill: ${unmatched.length} unmatched fields, requesting LLM inference`);
          unmatchedFieldsCache = [...unmatchedFieldsCache, ...unmatched];
          inferAndAttach(unmatched);
        }
      }
      async function handleInferFields() {
        if (!userProfile) {
          autocompleteManager.showToast("IntelliFill: No profile loaded");
          return;
        }
        const allFields = detectFields();
        const { unmatched } = matchFieldsAsync(allFields, userProfile.fields);
        const unmatchedItems = unmatched.map((u, i) => ({
          field: u.field,
          context: buildFieldContext(u.field, i)
        }));
        if (unmatchedItems.length === 0) {
          autocompleteManager.showToast("IntelliFill: All fields already matched");
          return;
        }
        autocompleteManager.showToast(`IntelliFill: Inferring ${unmatchedItems.length} fields...`);
        unmatchedFieldsCache = unmatchedItems;
        await inferAndAttach(unmatchedItems);
      }
      async function initialize() {
        try {
          const settings = await browser.storage.local.get(["settings"]);
          const parsed = settings.settings;
          isEnabled = (parsed == null ? void 0 : parsed.enabled) !== false;
          if (!isEnabled) {
            console.log("IntelliFill: Extension is disabled");
            return;
          }
          await fetchProfile();
          if (userProfile) {
            processFields();
            domObserver = observeDOMChanges(() => {
              console.log("IntelliFill: New fields detected");
              processFields();
            });
          }
          setupShortcuts({
            onFillAll: handleFillAll,
            onRefreshProfile: handleRefreshProfile,
            onInferFields: handleInferFields
          });
        } catch (error) {
          console.error("IntelliFill: Initialization failed", error);
        }
      }
      browser.runtime.onMessage.addListener((raw, _sender, sendResponse) => {
        const message = raw;
        switch (message.action) {
          case "refreshProfile":
            handleRefreshProfile().then(() => sendResponse({ success: true })).catch(() => sendResponse({ success: false }));
            break;
          case "toggleExtension":
            isEnabled = message.enabled;
            if (isEnabled) {
              processFields();
              setupShortcuts({
                onFillAll: handleFillAll,
                onRefreshProfile: handleRefreshProfile,
                onInferFields: handleInferFields
              });
            } else {
              processedFields.clear();
              autocompleteManager.destroy();
              teardownShortcuts();
              if (domObserver) {
                domObserver.disconnect();
                domObserver = null;
              }
            }
            sendResponse({ success: true });
            break;
          case "fillAll":
            handleFillAll();
            sendResponse({ success: true });
            break;
          case "inferFields":
            handleInferFields().then(() => sendResponse({ success: true })).catch(() => sendResponse({ success: false }));
            break;
          case "getStatus": {
            const status = {
              enabled: isEnabled,
              hasProfile: !!userProfile,
              fieldsProcessed: processedFields.size
            };
            sendResponse(status);
            break;
          }
        }
        return true;
      });
      initialize();
    }
  });
  content;
  function print$1(method, ...args) {
    if (typeof args[0] === "string") {
      const message = args.shift();
      method(`[wxt] ${message}`, ...args);
    } else {
      method("[wxt]", ...args);
    }
  }
  const logger$1 = {
    debug: (...args) => print$1(console.debug, ...args),
    log: (...args) => print$1(console.log, ...args),
    warn: (...args) => print$1(console.warn, ...args),
    error: (...args) => print$1(console.error, ...args)
  };
  const _WxtLocationChangeEvent = class _WxtLocationChangeEvent extends Event {
    constructor(newUrl, oldUrl) {
      super(_WxtLocationChangeEvent.EVENT_NAME, {});
      this.newUrl = newUrl;
      this.oldUrl = oldUrl;
    }
  };
  __publicField(_WxtLocationChangeEvent, "EVENT_NAME", getUniqueEventName("wxt:locationchange"));
  let WxtLocationChangeEvent = _WxtLocationChangeEvent;
  function getUniqueEventName(eventName) {
    var _a;
    return `${(_a = browser == null ? void 0 : browser.runtime) == null ? void 0 : _a.id}:${"content"}:${eventName}`;
  }
  function createLocationWatcher(ctx) {
    let interval;
    let oldUrl;
    return {
      /**
       * Ensure the location watcher is actively looking for URL changes. If it's already watching,
       * this is a noop.
       */
      run() {
        if (interval != null) return;
        oldUrl = new URL(location.href);
        interval = ctx.setInterval(() => {
          let newUrl = new URL(location.href);
          if (newUrl.href !== oldUrl.href) {
            window.dispatchEvent(new WxtLocationChangeEvent(newUrl, oldUrl));
            oldUrl = newUrl;
          }
        }, 1e3);
      }
    };
  }
  const _ContentScriptContext = class _ContentScriptContext {
    constructor(contentScriptName, options) {
      __publicField(this, "isTopFrame", window.self === window.top);
      __publicField(this, "abortController");
      __publicField(this, "locationWatcher", createLocationWatcher(this));
      __publicField(this, "receivedMessageIds", /* @__PURE__ */ new Set());
      this.contentScriptName = contentScriptName;
      this.options = options;
      this.abortController = new AbortController();
      if (this.isTopFrame) {
        this.listenForNewerScripts({ ignoreFirstEvent: true });
        this.stopOldScripts();
      } else {
        this.listenForNewerScripts();
      }
    }
    get signal() {
      return this.abortController.signal;
    }
    abort(reason) {
      return this.abortController.abort(reason);
    }
    get isInvalid() {
      if (browser.runtime.id == null) {
        this.notifyInvalidated();
      }
      return this.signal.aborted;
    }
    get isValid() {
      return !this.isInvalid;
    }
    /**
     * Add a listener that is called when the content script's context is invalidated.
     *
     * @returns A function to remove the listener.
     *
     * @example
     * browser.runtime.onMessage.addListener(cb);
     * const removeInvalidatedListener = ctx.onInvalidated(() => {
     *   browser.runtime.onMessage.removeListener(cb);
     * })
     * // ...
     * removeInvalidatedListener();
     */
    onInvalidated(cb) {
      this.signal.addEventListener("abort", cb);
      return () => this.signal.removeEventListener("abort", cb);
    }
    /**
     * Return a promise that never resolves. Useful if you have an async function that shouldn't run
     * after the context is expired.
     *
     * @example
     * const getValueFromStorage = async () => {
     *   if (ctx.isInvalid) return ctx.block();
     *
     *   // ...
     * }
     */
    block() {
      return new Promise(() => {
      });
    }
    /**
     * Wrapper around `window.setInterval` that automatically clears the interval when invalidated.
     */
    setInterval(handler, timeout) {
      const id = setInterval(() => {
        if (this.isValid) handler();
      }, timeout);
      this.onInvalidated(() => clearInterval(id));
      return id;
    }
    /**
     * Wrapper around `window.setTimeout` that automatically clears the interval when invalidated.
     */
    setTimeout(handler, timeout) {
      const id = setTimeout(() => {
        if (this.isValid) handler();
      }, timeout);
      this.onInvalidated(() => clearTimeout(id));
      return id;
    }
    /**
     * Wrapper around `window.requestAnimationFrame` that automatically cancels the request when
     * invalidated.
     */
    requestAnimationFrame(callback) {
      const id = requestAnimationFrame((...args) => {
        if (this.isValid) callback(...args);
      });
      this.onInvalidated(() => cancelAnimationFrame(id));
      return id;
    }
    /**
     * Wrapper around `window.requestIdleCallback` that automatically cancels the request when
     * invalidated.
     */
    requestIdleCallback(callback, options) {
      const id = requestIdleCallback((...args) => {
        if (!this.signal.aborted) callback(...args);
      }, options);
      this.onInvalidated(() => cancelIdleCallback(id));
      return id;
    }
    addEventListener(target, type, handler, options) {
      var _a;
      if (type === "wxt:locationchange") {
        if (this.isValid) this.locationWatcher.run();
      }
      (_a = target.addEventListener) == null ? void 0 : _a.call(
        target,
        type.startsWith("wxt:") ? getUniqueEventName(type) : type,
        handler,
        {
          ...options,
          signal: this.signal
        }
      );
    }
    /**
     * @internal
     * Abort the abort controller and execute all `onInvalidated` listeners.
     */
    notifyInvalidated() {
      this.abort("Content script context invalidated");
      logger$1.debug(
        `Content script "${this.contentScriptName}" context invalidated`
      );
    }
    stopOldScripts() {
      window.postMessage(
        {
          type: _ContentScriptContext.SCRIPT_STARTED_MESSAGE_TYPE,
          contentScriptName: this.contentScriptName,
          messageId: Math.random().toString(36).slice(2)
        },
        "*"
      );
    }
    verifyScriptStartedEvent(event) {
      var _a, _b, _c;
      const isScriptStartedEvent = ((_a = event.data) == null ? void 0 : _a.type) === _ContentScriptContext.SCRIPT_STARTED_MESSAGE_TYPE;
      const isSameContentScript = ((_b = event.data) == null ? void 0 : _b.contentScriptName) === this.contentScriptName;
      const isNotDuplicate = !this.receivedMessageIds.has((_c = event.data) == null ? void 0 : _c.messageId);
      return isScriptStartedEvent && isSameContentScript && isNotDuplicate;
    }
    listenForNewerScripts(options) {
      let isFirst = true;
      const cb = (event) => {
        if (this.verifyScriptStartedEvent(event)) {
          this.receivedMessageIds.add(event.data.messageId);
          const wasFirst = isFirst;
          isFirst = false;
          if (wasFirst && (options == null ? void 0 : options.ignoreFirstEvent)) return;
          this.notifyInvalidated();
        }
      };
      addEventListener("message", cb);
      this.onInvalidated(() => removeEventListener("message", cb));
    }
  };
  __publicField(_ContentScriptContext, "SCRIPT_STARTED_MESSAGE_TYPE", getUniqueEventName(
    "wxt:content-script-started"
  ));
  let ContentScriptContext = _ContentScriptContext;
  const nullKey = Symbol("null");
  let keyCounter = 0;
  class ManyKeysMap extends Map {
    constructor() {
      super();
      this._objectHashes = /* @__PURE__ */ new WeakMap();
      this._symbolHashes = /* @__PURE__ */ new Map();
      this._publicKeys = /* @__PURE__ */ new Map();
      const [pairs] = arguments;
      if (pairs === null || pairs === void 0) {
        return;
      }
      if (typeof pairs[Symbol.iterator] !== "function") {
        throw new TypeError(typeof pairs + " is not iterable (cannot read property Symbol(Symbol.iterator))");
      }
      for (const [keys, value] of pairs) {
        this.set(keys, value);
      }
    }
    _getPublicKeys(keys, create = false) {
      if (!Array.isArray(keys)) {
        throw new TypeError("The keys parameter must be an array");
      }
      const privateKey = this._getPrivateKey(keys, create);
      let publicKey;
      if (privateKey && this._publicKeys.has(privateKey)) {
        publicKey = this._publicKeys.get(privateKey);
      } else if (create) {
        publicKey = [...keys];
        this._publicKeys.set(privateKey, publicKey);
      }
      return { privateKey, publicKey };
    }
    _getPrivateKey(keys, create = false) {
      const privateKeys = [];
      for (let key of keys) {
        if (key === null) {
          key = nullKey;
        }
        const hashes = typeof key === "object" || typeof key === "function" ? "_objectHashes" : typeof key === "symbol" ? "_symbolHashes" : false;
        if (!hashes) {
          privateKeys.push(key);
        } else if (this[hashes].has(key)) {
          privateKeys.push(this[hashes].get(key));
        } else if (create) {
          const privateKey = `@@mkm-ref-${keyCounter++}@@`;
          this[hashes].set(key, privateKey);
          privateKeys.push(privateKey);
        } else {
          return false;
        }
      }
      return JSON.stringify(privateKeys);
    }
    set(keys, value) {
      const { publicKey } = this._getPublicKeys(keys, true);
      return super.set(publicKey, value);
    }
    get(keys) {
      const { publicKey } = this._getPublicKeys(keys);
      return super.get(publicKey);
    }
    has(keys) {
      const { publicKey } = this._getPublicKeys(keys);
      return super.has(publicKey);
    }
    delete(keys) {
      const { publicKey, privateKey } = this._getPublicKeys(keys);
      return Boolean(publicKey && super.delete(publicKey) && this._publicKeys.delete(privateKey));
    }
    clear() {
      super.clear();
      this._symbolHashes.clear();
      this._publicKeys.clear();
    }
    get [Symbol.toStringTag]() {
      return "ManyKeysMap";
    }
    get size() {
      return super.size;
    }
  }
  new ManyKeysMap();
  function initPlugins() {
  }
  function print(method, ...args) {
    if (typeof args[0] === "string") {
      const message = args.shift();
      method(`[wxt] ${message}`, ...args);
    } else {
      method("[wxt]", ...args);
    }
  }
  const logger = {
    debug: (...args) => print(console.debug, ...args),
    log: (...args) => print(console.log, ...args),
    warn: (...args) => print(console.warn, ...args),
    error: (...args) => print(console.error, ...args)
  };
  const result = (async () => {
    try {
      initPlugins();
      const { main, ...options } = definition;
      const ctx = new ContentScriptContext("content", options);
      return await main(ctx);
    } catch (err) {
      logger.error(
        `The content script "${"content"}" crashed on startup!`,
        err
      );
      throw err;
    }
  })();
  return result;
})();
content;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3d4dC9kaXN0L3NhbmRib3gvZGVmaW5lLWNvbnRlbnQtc2NyaXB0Lm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy93ZWJleHRlbnNpb24tcG9seWZpbGwvZGlzdC9icm93c2VyLXBvbHlmaWxsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3d4dC9kaXN0L2Jyb3dzZXIvaW5kZXgubWpzIiwiLi4vLi4vLi4vc2hhcmVkL3R5cGVzL2ZpZWxkLWRldGVjdGlvbi50cyIsIi4uLy4uLy4uL2xpYi9maWVsZC1kZXRlY3Rvci50cyIsIi4uLy4uLy4uL2xpYi9maWVsZC1tYXRjaGVyLnRzIiwiLi4vLi4vLi4vbGliL2Zvcm0tZmlsbGVyLnRzIiwiLi4vLi4vLi4vc2hhcmVkL2NvbnN0YW50cy50cyIsIi4uLy4uLy4uL2xpYi9hdXRvY29tcGxldGUtdWkudHMiLCIuLi8uLi8uLi9saWIva2V5Ym9hcmQtc2hvcnRjdXRzLnRzIiwiLi4vLi4vLi4vZW50cnlwb2ludHMvY29udGVudC50cyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy93eHQvZGlzdC9zYW5kYm94L3V0aWxzL2xvZ2dlci5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvd3h0L2Rpc3QvY2xpZW50L2NvbnRlbnQtc2NyaXB0cy9jdXN0b20tZXZlbnRzLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy93eHQvZGlzdC9jbGllbnQvY29udGVudC1zY3JpcHRzL2xvY2F0aW9uLXdhdGNoZXIubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3d4dC9kaXN0L2NsaWVudC9jb250ZW50LXNjcmlwdHMvY29udGVudC1zY3JpcHQtY29udGV4dC5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWFueS1rZXlzLW1hcC9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AMW5hdHN1L3dhaXQtZWxlbWVudC9kaXN0L2luZGV4Lm1qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gZGVmaW5lQ29udGVudFNjcmlwdChkZWZpbml0aW9uKSB7XG4gIHJldHVybiBkZWZpbml0aW9uO1xufVxuIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCIsIFtcIm1vZHVsZVwiXSwgZmFjdG9yeSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBmYWN0b3J5KG1vZHVsZSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIG1vZCA9IHtcbiAgICAgIGV4cG9ydHM6IHt9XG4gICAgfTtcbiAgICBmYWN0b3J5KG1vZCk7XG4gICAgZ2xvYmFsLmJyb3dzZXIgPSBtb2QuZXhwb3J0cztcbiAgfVxufSkodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxUaGlzIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24gKG1vZHVsZSkge1xuICAvKiB3ZWJleHRlbnNpb24tcG9seWZpbGwgLSB2MC4xMi4wIC0gVHVlIE1heSAxNCAyMDI0IDE4OjAxOjI5ICovXG4gIC8qIC0qLSBNb2RlOiBpbmRlbnQtdGFicy1tb2RlOiBuaWw7IGpzLWluZGVudC1sZXZlbDogMiAtKi0gKi9cbiAgLyogdmltOiBzZXQgc3RzPTIgc3c9MiBldCB0dz04MDogKi9cbiAgLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICAgKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gICAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIGlmICghKGdsb2JhbFRoaXMuY2hyb21lICYmIGdsb2JhbFRoaXMuY2hyb21lLnJ1bnRpbWUgJiYgZ2xvYmFsVGhpcy5jaHJvbWUucnVudGltZS5pZCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIHNjcmlwdCBzaG91bGQgb25seSBiZSBsb2FkZWQgaW4gYSBicm93c2VyIGV4dGVuc2lvbi5cIik7XG4gIH1cbiAgaWYgKCEoZ2xvYmFsVGhpcy5icm93c2VyICYmIGdsb2JhbFRoaXMuYnJvd3Nlci5ydW50aW1lICYmIGdsb2JhbFRoaXMuYnJvd3Nlci5ydW50aW1lLmlkKSkge1xuICAgIGNvbnN0IENIUk9NRV9TRU5EX01FU1NBR0VfQ0FMTEJBQ0tfTk9fUkVTUE9OU0VfTUVTU0FHRSA9IFwiVGhlIG1lc3NhZ2UgcG9ydCBjbG9zZWQgYmVmb3JlIGEgcmVzcG9uc2Ugd2FzIHJlY2VpdmVkLlwiO1xuXG4gICAgLy8gV3JhcHBpbmcgdGhlIGJ1bGsgb2YgdGhpcyBwb2x5ZmlsbCBpbiBhIG9uZS10aW1lLXVzZSBmdW5jdGlvbiBpcyBhIG1pbm9yXG4gICAgLy8gb3B0aW1pemF0aW9uIGZvciBGaXJlZm94LiBTaW5jZSBTcGlkZXJtb25rZXkgZG9lcyBub3QgZnVsbHkgcGFyc2UgdGhlXG4gICAgLy8gY29udGVudHMgb2YgYSBmdW5jdGlvbiB1bnRpbCB0aGUgZmlyc3QgdGltZSBpdCdzIGNhbGxlZCwgYW5kIHNpbmNlIGl0IHdpbGxcbiAgICAvLyBuZXZlciBhY3R1YWxseSBuZWVkIHRvIGJlIGNhbGxlZCwgdGhpcyBhbGxvd3MgdGhlIHBvbHlmaWxsIHRvIGJlIGluY2x1ZGVkXG4gICAgLy8gaW4gRmlyZWZveCBuZWFybHkgZm9yIGZyZWUuXG4gICAgY29uc3Qgd3JhcEFQSXMgPSBleHRlbnNpb25BUElzID0+IHtcbiAgICAgIC8vIE5PVEU6IGFwaU1ldGFkYXRhIGlzIGFzc29jaWF0ZWQgdG8gdGhlIGNvbnRlbnQgb2YgdGhlIGFwaS1tZXRhZGF0YS5qc29uIGZpbGVcbiAgICAgIC8vIGF0IGJ1aWxkIHRpbWUgYnkgcmVwbGFjaW5nIHRoZSBmb2xsb3dpbmcgXCJpbmNsdWRlXCIgd2l0aCB0aGUgY29udGVudCBvZiB0aGVcbiAgICAgIC8vIEpTT04gZmlsZS5cbiAgICAgIGNvbnN0IGFwaU1ldGFkYXRhID0ge1xuICAgICAgICBcImFsYXJtc1wiOiB7XG4gICAgICAgICAgXCJjbGVhclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNsZWFyQWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYm9va21hcmtzXCI6IHtcbiAgICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldENoaWxkcmVuXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UmVjZW50XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0U3ViVHJlZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFRyZWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlVHJlZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlYXJjaFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImJyb3dzZXJBY3Rpb25cIjoge1xuICAgICAgICAgIFwiZGlzYWJsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImVuYWJsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEJhZGdlQmFja2dyb3VuZENvbG9yXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QmFkZ2VUZXh0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRUaXRsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm9wZW5Qb3B1cFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEJhZGdlQmFja2dyb3VuZENvbG9yXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0QmFkZ2VUZXh0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0SWNvblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJicm93c2luZ0RhdGFcIjoge1xuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlQ2FjaGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVDb29raWVzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlRG93bmxvYWRzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlRm9ybURhdGFcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVIaXN0b3J5XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlTG9jYWxTdG9yYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlUGFzc3dvcmRzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlUGx1Z2luRGF0YVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldHRpbmdzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiY29tbWFuZHNcIjoge1xuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiY29udGV4dE1lbnVzXCI6IHtcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImNvb2tpZXNcIjoge1xuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsQ29va2llU3RvcmVzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiZGV2dG9vbHNcIjoge1xuICAgICAgICAgIFwiaW5zcGVjdGVkV2luZG93XCI6IHtcbiAgICAgICAgICAgIFwiZXZhbFwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMixcbiAgICAgICAgICAgICAgXCJzaW5nbGVDYWxsYmFja0FyZ1wiOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJwYW5lbHNcIjoge1xuICAgICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMyxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDMsXG4gICAgICAgICAgICAgIFwic2luZ2xlQ2FsbGJhY2tBcmdcIjogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZWxlbWVudHNcIjoge1xuICAgICAgICAgICAgICBcImNyZWF0ZVNpZGViYXJQYW5lXCI6IHtcbiAgICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImRvd25sb2Fkc1wiOiB7XG4gICAgICAgICAgXCJjYW5jZWxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkb3dubG9hZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImVyYXNlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0RmlsZUljb25cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJvcGVuXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicGF1c2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVGaWxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVzdW1lXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VhcmNoXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2hvd1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImV4dGVuc2lvblwiOiB7XG4gICAgICAgICAgXCJpc0FsbG93ZWRGaWxlU2NoZW1lQWNjZXNzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiaXNBbGxvd2VkSW5jb2duaXRvQWNjZXNzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiaGlzdG9yeVwiOiB7XG4gICAgICAgICAgXCJhZGRVcmxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZWxldGVBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZWxldGVSYW5nZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRlbGV0ZVVybFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFZpc2l0c1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlYXJjaFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImkxOG5cIjoge1xuICAgICAgICAgIFwiZGV0ZWN0TGFuZ3VhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBY2NlcHRMYW5ndWFnZXNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJpZGVudGl0eVwiOiB7XG4gICAgICAgICAgXCJsYXVuY2hXZWJBdXRoRmxvd1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImlkbGVcIjoge1xuICAgICAgICAgIFwicXVlcnlTdGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIm1hbmFnZW1lbnRcIjoge1xuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0U2VsZlwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEVuYWJsZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1bmluc3RhbGxTZWxmXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwibm90aWZpY2F0aW9uc1wiOiB7XG4gICAgICAgICAgXCJjbGVhclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFBlcm1pc3Npb25MZXZlbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInBhZ2VBY3Rpb25cIjoge1xuICAgICAgICAgIFwiZ2V0UG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRUaXRsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImhpZGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRJY29uXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0UG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRUaXRsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNob3dcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJwZXJtaXNzaW9uc1wiOiB7XG4gICAgICAgICAgXCJjb250YWluc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlcXVlc3RcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJydW50aW1lXCI6IHtcbiAgICAgICAgICBcImdldEJhY2tncm91bmRQYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UGxhdGZvcm1JbmZvXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwib3Blbk9wdGlvbnNQYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVxdWVzdFVwZGF0ZUNoZWNrXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VuZE1lc3NhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogM1xuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZW5kTmF0aXZlTWVzc2FnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFVuaW5zdGFsbFVSTFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInNlc3Npb25zXCI6IHtcbiAgICAgICAgICBcImdldERldmljZXNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRSZWNlbnRseUNsb3NlZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlc3RvcmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJzdG9yYWdlXCI6IHtcbiAgICAgICAgICBcImxvY2FsXCI6IHtcbiAgICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZ2V0Qnl0ZXNJblVzZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJzZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwibWFuYWdlZFwiOiB7XG4gICAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZ2V0Qnl0ZXNJblVzZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzeW5jXCI6IHtcbiAgICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZ2V0Qnl0ZXNJblVzZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJzZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwidGFic1wiOiB7XG4gICAgICAgICAgXCJjYXB0dXJlVmlzaWJsZVRhYlwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRldGVjdExhbmd1YWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGlzY2FyZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImR1cGxpY2F0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImV4ZWN1dGVTY3JpcHRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRDdXJyZW50XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0Wm9vbVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFpvb21TZXR0aW5nc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdvQmFja1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdvRm9yd2FyZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImhpZ2hsaWdodFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImluc2VydENTU1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJxdWVyeVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbG9hZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUNTU1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlbmRNZXNzYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDNcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0Wm9vbVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFpvb21TZXR0aW5nc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInRvcFNpdGVzXCI6IHtcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIndlYk5hdmlnYXRpb25cIjoge1xuICAgICAgICAgIFwiZ2V0QWxsRnJhbWVzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0RnJhbWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ3ZWJSZXF1ZXN0XCI6IHtcbiAgICAgICAgICBcImhhbmRsZXJCZWhhdmlvckNoYW5nZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ3aW5kb3dzXCI6IHtcbiAgICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEN1cnJlbnRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRMYXN0Rm9jdXNlZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgaWYgKE9iamVjdC5rZXlzKGFwaU1ldGFkYXRhKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXBpLW1ldGFkYXRhLmpzb24gaGFzIG5vdCBiZWVuIGluY2x1ZGVkIGluIGJyb3dzZXItcG9seWZpbGxcIik7XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogQSBXZWFrTWFwIHN1YmNsYXNzIHdoaWNoIGNyZWF0ZXMgYW5kIHN0b3JlcyBhIHZhbHVlIGZvciBhbnkga2V5IHdoaWNoIGRvZXNcbiAgICAgICAqIG5vdCBleGlzdCB3aGVuIGFjY2Vzc2VkLCBidXQgYmVoYXZlcyBleGFjdGx5IGFzIGFuIG9yZGluYXJ5IFdlYWtNYXBcbiAgICAgICAqIG90aGVyd2lzZS5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjcmVhdGVJdGVtXG4gICAgICAgKiAgICAgICAgQSBmdW5jdGlvbiB3aGljaCB3aWxsIGJlIGNhbGxlZCBpbiBvcmRlciB0byBjcmVhdGUgdGhlIHZhbHVlIGZvciBhbnlcbiAgICAgICAqICAgICAgICBrZXkgd2hpY2ggZG9lcyBub3QgZXhpc3QsIHRoZSBmaXJzdCB0aW1lIGl0IGlzIGFjY2Vzc2VkLiBUaGVcbiAgICAgICAqICAgICAgICBmdW5jdGlvbiByZWNlaXZlcywgYXMgaXRzIG9ubHkgYXJndW1lbnQsIHRoZSBrZXkgYmVpbmcgY3JlYXRlZC5cbiAgICAgICAqL1xuICAgICAgY2xhc3MgRGVmYXVsdFdlYWtNYXAgZXh0ZW5kcyBXZWFrTWFwIHtcbiAgICAgICAgY29uc3RydWN0b3IoY3JlYXRlSXRlbSwgaXRlbXMgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBzdXBlcihpdGVtcyk7XG4gICAgICAgICAgdGhpcy5jcmVhdGVJdGVtID0gY3JlYXRlSXRlbTtcbiAgICAgICAgfVxuICAgICAgICBnZXQoa2V5KSB7XG4gICAgICAgICAgaWYgKCF0aGlzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICB0aGlzLnNldChrZXksIHRoaXMuY3JlYXRlSXRlbShrZXkpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHN1cGVyLmdldChrZXkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBvYmplY3QgaXMgYW4gb2JqZWN0IHdpdGggYSBgdGhlbmAgbWV0aG9kLCBhbmQgY2FuXG4gICAgICAgKiB0aGVyZWZvcmUgYmUgYXNzdW1lZCB0byBiZWhhdmUgYXMgYSBQcm9taXNlLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdGhlbmFibGUuXG4gICAgICAgKi9cbiAgICAgIGNvbnN0IGlzVGhlbmFibGUgPSB2YWx1ZSA9PiB7XG4gICAgICAgIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09IFwiZnVuY3Rpb25cIjtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIGZ1bmN0aW9uIHdoaWNoLCB3aGVuIGNhbGxlZCwgd2lsbCByZXNvbHZlIG9yIHJlamVjdFxuICAgICAgICogdGhlIGdpdmVuIHByb21pc2UgYmFzZWQgb24gaG93IGl0IGlzIGNhbGxlZDpcbiAgICAgICAqXG4gICAgICAgKiAtIElmLCB3aGVuIGNhbGxlZCwgYGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcmAgY29udGFpbnMgYSBub24tbnVsbCBvYmplY3QsXG4gICAgICAgKiAgIHRoZSBwcm9taXNlIGlzIHJlamVjdGVkIHdpdGggdGhhdCB2YWx1ZS5cbiAgICAgICAqIC0gSWYgdGhlIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aXRoIGV4YWN0bHkgb25lIGFyZ3VtZW50LCB0aGUgcHJvbWlzZSBpc1xuICAgICAgICogICByZXNvbHZlZCB0byB0aGF0IHZhbHVlLlxuICAgICAgICogLSBPdGhlcndpc2UsIHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIHRvIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZVxuICAgICAgICogICBmdW5jdGlvbidzIGFyZ3VtZW50cy5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gcHJvbWlzZVxuICAgICAgICogICAgICAgIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSByZXNvbHV0aW9uIGFuZCByZWplY3Rpb24gZnVuY3Rpb25zIG9mIGFcbiAgICAgICAqICAgICAgICBwcm9taXNlLlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gcHJvbWlzZS5yZXNvbHZlXG4gICAgICAgKiAgICAgICAgVGhlIHByb21pc2UncyByZXNvbHV0aW9uIGZ1bmN0aW9uLlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gcHJvbWlzZS5yZWplY3RcbiAgICAgICAqICAgICAgICBUaGUgcHJvbWlzZSdzIHJlamVjdGlvbiBmdW5jdGlvbi5cbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtZXRhZGF0YVxuICAgICAgICogICAgICAgIE1ldGFkYXRhIGFib3V0IHRoZSB3cmFwcGVkIG1ldGhvZCB3aGljaCBoYXMgY3JlYXRlZCB0aGUgY2FsbGJhY2suXG4gICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1ldGFkYXRhLnNpbmdsZUNhbGxiYWNrQXJnXG4gICAgICAgKiAgICAgICAgV2hldGhlciBvciBub3QgdGhlIHByb21pc2UgaXMgcmVzb2x2ZWQgd2l0aCBvbmx5IHRoZSBmaXJzdFxuICAgICAgICogICAgICAgIGFyZ3VtZW50IG9mIHRoZSBjYWxsYmFjaywgYWx0ZXJuYXRpdmVseSBhbiBhcnJheSBvZiBhbGwgdGhlXG4gICAgICAgKiAgICAgICAgY2FsbGJhY2sgYXJndW1lbnRzIGlzIHJlc29sdmVkLiBCeSBkZWZhdWx0LCBpZiB0aGUgY2FsbGJhY2tcbiAgICAgICAqICAgICAgICBmdW5jdGlvbiBpcyBpbnZva2VkIHdpdGggb25seSBhIHNpbmdsZSBhcmd1bWVudCwgdGhhdCB3aWxsIGJlXG4gICAgICAgKiAgICAgICAgcmVzb2x2ZWQgdG8gdGhlIHByb21pc2UsIHdoaWxlIGFsbCBhcmd1bWVudHMgd2lsbCBiZSByZXNvbHZlZCBhc1xuICAgICAgICogICAgICAgIGFuIGFycmF5IGlmIG11bHRpcGxlIGFyZSBnaXZlbi5cbiAgICAgICAqXG4gICAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gICAgICAgKiAgICAgICAgVGhlIGdlbmVyYXRlZCBjYWxsYmFjayBmdW5jdGlvbi5cbiAgICAgICAqL1xuICAgICAgY29uc3QgbWFrZUNhbGxiYWNrID0gKHByb21pc2UsIG1ldGFkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiAoLi4uY2FsbGJhY2tBcmdzKSA9PiB7XG4gICAgICAgICAgaWYgKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgICAgIHByb21pc2UucmVqZWN0KG5ldyBFcnJvcihleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG1ldGFkYXRhLnNpbmdsZUNhbGxiYWNrQXJnIHx8IGNhbGxiYWNrQXJncy5sZW5ndGggPD0gMSAmJiBtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHByb21pc2UucmVzb2x2ZShjYWxsYmFja0FyZ3NbMF0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9taXNlLnJlc29sdmUoY2FsbGJhY2tBcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgICAgY29uc3QgcGx1cmFsaXplQXJndW1lbnRzID0gbnVtQXJncyA9PiBudW1BcmdzID09IDEgPyBcImFyZ3VtZW50XCIgOiBcImFyZ3VtZW50c1wiO1xuXG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZXMgYSB3cmFwcGVyIGZ1bmN0aW9uIGZvciBhIG1ldGhvZCB3aXRoIHRoZSBnaXZlbiBuYW1lIGFuZCBtZXRhZGF0YS5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAgICogICAgICAgIFRoZSBuYW1lIG9mIHRoZSBtZXRob2Qgd2hpY2ggaXMgYmVpbmcgd3JhcHBlZC5cbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtZXRhZGF0YVxuICAgICAgICogICAgICAgIE1ldGFkYXRhIGFib3V0IHRoZSBtZXRob2QgYmVpbmcgd3JhcHBlZC5cbiAgICAgICAqIEBwYXJhbSB7aW50ZWdlcn0gbWV0YWRhdGEubWluQXJnc1xuICAgICAgICogICAgICAgIFRoZSBtaW5pbXVtIG51bWJlciBvZiBhcmd1bWVudHMgd2hpY2ggbXVzdCBiZSBwYXNzZWQgdG8gdGhlXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24uIElmIGNhbGxlZCB3aXRoIGZld2VyIHRoYW4gdGhpcyBudW1iZXIgb2YgYXJndW1lbnRzLCB0aGVcbiAgICAgICAqICAgICAgICB3cmFwcGVyIHdpbGwgcmFpc2UgYW4gZXhjZXB0aW9uLlxuICAgICAgICogQHBhcmFtIHtpbnRlZ2VyfSBtZXRhZGF0YS5tYXhBcmdzXG4gICAgICAgKiAgICAgICAgVGhlIG1heGltdW0gbnVtYmVyIG9mIGFyZ3VtZW50cyB3aGljaCBtYXkgYmUgcGFzc2VkIHRvIHRoZVxuICAgICAgICogICAgICAgIGZ1bmN0aW9uLiBJZiBjYWxsZWQgd2l0aCBtb3JlIHRoYW4gdGhpcyBudW1iZXIgb2YgYXJndW1lbnRzLCB0aGVcbiAgICAgICAqICAgICAgICB3cmFwcGVyIHdpbGwgcmFpc2UgYW4gZXhjZXB0aW9uLlxuICAgICAgICogQHBhcmFtIHtib29sZWFufSBtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZ1xuICAgICAgICogICAgICAgIFdoZXRoZXIgb3Igbm90IHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggb25seSB0aGUgZmlyc3RcbiAgICAgICAqICAgICAgICBhcmd1bWVudCBvZiB0aGUgY2FsbGJhY2ssIGFsdGVybmF0aXZlbHkgYW4gYXJyYXkgb2YgYWxsIHRoZVxuICAgICAgICogICAgICAgIGNhbGxiYWNrIGFyZ3VtZW50cyBpcyByZXNvbHZlZC4gQnkgZGVmYXVsdCwgaWYgdGhlIGNhbGxiYWNrXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gaXMgaW52b2tlZCB3aXRoIG9ubHkgYSBzaW5nbGUgYXJndW1lbnQsIHRoYXQgd2lsbCBiZVxuICAgICAgICogICAgICAgIHJlc29sdmVkIHRvIHRoZSBwcm9taXNlLCB3aGlsZSBhbGwgYXJndW1lbnRzIHdpbGwgYmUgcmVzb2x2ZWQgYXNcbiAgICAgICAqICAgICAgICBhbiBhcnJheSBpZiBtdWx0aXBsZSBhcmUgZ2l2ZW4uXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge2Z1bmN0aW9uKG9iamVjdCwgLi4uKil9XG4gICAgICAgKiAgICAgICBUaGUgZ2VuZXJhdGVkIHdyYXBwZXIgZnVuY3Rpb24uXG4gICAgICAgKi9cbiAgICAgIGNvbnN0IHdyYXBBc3luY0Z1bmN0aW9uID0gKG5hbWUsIG1ldGFkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBhc3luY0Z1bmN0aW9uV3JhcHBlcih0YXJnZXQsIC4uLmFyZ3MpIHtcbiAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPCBtZXRhZGF0YS5taW5BcmdzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IGxlYXN0ICR7bWV0YWRhdGEubWluQXJnc30gJHtwbHVyYWxpemVBcmd1bWVudHMobWV0YWRhdGEubWluQXJncyl9IGZvciAke25hbWV9KCksIGdvdCAke2FyZ3MubGVuZ3RofWApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPiBtZXRhZGF0YS5tYXhBcmdzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IG1vc3QgJHttZXRhZGF0YS5tYXhBcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5tYXhBcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAobWV0YWRhdGEuZmFsbGJhY2tUb05vQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgLy8gVGhpcyBBUEkgbWV0aG9kIGhhcyBjdXJyZW50bHkgbm8gY2FsbGJhY2sgb24gQ2hyb21lLCBidXQgaXQgcmV0dXJuIGEgcHJvbWlzZSBvbiBGaXJlZm94LFxuICAgICAgICAgICAgICAvLyBhbmQgc28gdGhlIHBvbHlmaWxsIHdpbGwgdHJ5IHRvIGNhbGwgaXQgd2l0aCBhIGNhbGxiYWNrIGZpcnN0LCBhbmQgaXQgd2lsbCBmYWxsYmFja1xuICAgICAgICAgICAgICAvLyB0byBub3QgcGFzc2luZyB0aGUgY2FsbGJhY2sgaWYgdGhlIGZpcnN0IGNhbGwgZmFpbHMuXG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MsIG1ha2VDYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgICAgICAgcmVqZWN0XG4gICAgICAgICAgICAgICAgfSwgbWV0YWRhdGEpKTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoY2JFcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHtuYW1lfSBBUEkgbWV0aG9kIGRvZXNuJ3Qgc2VlbSB0byBzdXBwb3J0IHRoZSBjYWxsYmFjayBwYXJhbWV0ZXIsIGAgKyBcImZhbGxpbmcgYmFjayB0byBjYWxsIGl0IHdpdGhvdXQgYSBjYWxsYmFjazogXCIsIGNiRXJyb3IpO1xuICAgICAgICAgICAgICAgIHRhcmdldFtuYW1lXSguLi5hcmdzKTtcblxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgQVBJIG1ldGhvZCBtZXRhZGF0YSwgc28gdGhhdCB0aGUgbmV4dCBBUEkgY2FsbHMgd2lsbCBub3QgdHJ5IHRvXG4gICAgICAgICAgICAgICAgLy8gdXNlIHRoZSB1bnN1cHBvcnRlZCBjYWxsYmFjayBhbnltb3JlLlxuICAgICAgICAgICAgICAgIG1ldGFkYXRhLmZhbGxiYWNrVG9Ob0NhbGxiYWNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgbWV0YWRhdGEubm9DYWxsYmFjayA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1ldGFkYXRhLm5vQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MpO1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncywgbWFrZUNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgICAgICB9LCBtZXRhZGF0YSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgfTtcblxuICAgICAgLyoqXG4gICAgICAgKiBXcmFwcyBhbiBleGlzdGluZyBtZXRob2Qgb2YgdGhlIHRhcmdldCBvYmplY3QsIHNvIHRoYXQgY2FsbHMgdG8gaXQgYXJlXG4gICAgICAgKiBpbnRlcmNlcHRlZCBieSB0aGUgZ2l2ZW4gd3JhcHBlciBmdW5jdGlvbi4gVGhlIHdyYXBwZXIgZnVuY3Rpb24gcmVjZWl2ZXMsXG4gICAgICAgKiBhcyBpdHMgZmlyc3QgYXJndW1lbnQsIHRoZSBvcmlnaW5hbCBgdGFyZ2V0YCBvYmplY3QsIGZvbGxvd2VkIGJ5IGVhY2ggb2ZcbiAgICAgICAqIHRoZSBhcmd1bWVudHMgcGFzc2VkIHRvIHRoZSBvcmlnaW5hbCBtZXRob2QuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldFxuICAgICAgICogICAgICAgIFRoZSBvcmlnaW5hbCB0YXJnZXQgb2JqZWN0IHRoYXQgdGhlIHdyYXBwZWQgbWV0aG9kIGJlbG9uZ3MgdG8uXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBtZXRob2RcbiAgICAgICAqICAgICAgICBUaGUgbWV0aG9kIGJlaW5nIHdyYXBwZWQuIFRoaXMgaXMgdXNlZCBhcyB0aGUgdGFyZ2V0IG9mIHRoZSBQcm94eVxuICAgICAgICogICAgICAgIG9iamVjdCB3aGljaCBpcyBjcmVhdGVkIHRvIHdyYXAgdGhlIG1ldGhvZC5cbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHdyYXBwZXJcbiAgICAgICAqICAgICAgICBUaGUgd3JhcHBlciBmdW5jdGlvbiB3aGljaCBpcyBjYWxsZWQgaW4gcGxhY2Ugb2YgYSBkaXJlY3QgaW52b2NhdGlvblxuICAgICAgICogICAgICAgIG9mIHRoZSB3cmFwcGVkIG1ldGhvZC5cbiAgICAgICAqXG4gICAgICAgKiBAcmV0dXJucyB7UHJveHk8ZnVuY3Rpb24+fVxuICAgICAgICogICAgICAgIEEgUHJveHkgb2JqZWN0IGZvciB0aGUgZ2l2ZW4gbWV0aG9kLCB3aGljaCBpbnZva2VzIHRoZSBnaXZlbiB3cmFwcGVyXG4gICAgICAgKiAgICAgICAgbWV0aG9kIGluIGl0cyBwbGFjZS5cbiAgICAgICAqL1xuICAgICAgY29uc3Qgd3JhcE1ldGhvZCA9ICh0YXJnZXQsIG1ldGhvZCwgd3JhcHBlcikgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb3h5KG1ldGhvZCwge1xuICAgICAgICAgIGFwcGx5KHRhcmdldE1ldGhvZCwgdGhpc09iaiwgYXJncykge1xuICAgICAgICAgICAgcmV0dXJuIHdyYXBwZXIuY2FsbCh0aGlzT2JqLCB0YXJnZXQsIC4uLmFyZ3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgbGV0IGhhc093blByb3BlcnR5ID0gRnVuY3Rpb24uY2FsbC5iaW5kKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xuXG4gICAgICAvKipcbiAgICAgICAqIFdyYXBzIGFuIG9iamVjdCBpbiBhIFByb3h5IHdoaWNoIGludGVyY2VwdHMgYW5kIHdyYXBzIGNlcnRhaW4gbWV0aG9kc1xuICAgICAgICogYmFzZWQgb24gdGhlIGdpdmVuIGB3cmFwcGVyc2AgYW5kIGBtZXRhZGF0YWAgb2JqZWN0cy5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0XG4gICAgICAgKiAgICAgICAgVGhlIHRhcmdldCBvYmplY3QgdG8gd3JhcC5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gW3dyYXBwZXJzID0ge31dXG4gICAgICAgKiAgICAgICAgQW4gb2JqZWN0IHRyZWUgY29udGFpbmluZyB3cmFwcGVyIGZ1bmN0aW9ucyBmb3Igc3BlY2lhbCBjYXNlcy4gQW55XG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gcHJlc2VudCBpbiB0aGlzIG9iamVjdCB0cmVlIGlzIGNhbGxlZCBpbiBwbGFjZSBvZiB0aGVcbiAgICAgICAqICAgICAgICBtZXRob2QgaW4gdGhlIHNhbWUgbG9jYXRpb24gaW4gdGhlIGB0YXJnZXRgIG9iamVjdCB0cmVlLiBUaGVzZVxuICAgICAgICogICAgICAgIHdyYXBwZXIgbWV0aG9kcyBhcmUgaW52b2tlZCBhcyBkZXNjcmliZWQgaW4ge0BzZWUgd3JhcE1ldGhvZH0uXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IFttZXRhZGF0YSA9IHt9XVxuICAgICAgICogICAgICAgIEFuIG9iamVjdCB0cmVlIGNvbnRhaW5pbmcgbWV0YWRhdGEgdXNlZCB0byBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlXG4gICAgICAgKiAgICAgICAgUHJvbWlzZS1iYXNlZCB3cmFwcGVyIGZ1bmN0aW9ucyBmb3IgYXN5bmNocm9ub3VzLiBBbnkgZnVuY3Rpb24gaW5cbiAgICAgICAqICAgICAgICB0aGUgYHRhcmdldGAgb2JqZWN0IHRyZWUgd2hpY2ggaGFzIGEgY29ycmVzcG9uZGluZyBtZXRhZGF0YSBvYmplY3RcbiAgICAgICAqICAgICAgICBpbiB0aGUgc2FtZSBsb2NhdGlvbiBpbiB0aGUgYG1ldGFkYXRhYCB0cmVlIGlzIHJlcGxhY2VkIHdpdGggYW5cbiAgICAgICAqICAgICAgICBhdXRvbWF0aWNhbGx5LWdlbmVyYXRlZCB3cmFwcGVyIGZ1bmN0aW9uLCBhcyBkZXNjcmliZWQgaW5cbiAgICAgICAqICAgICAgICB7QHNlZSB3cmFwQXN5bmNGdW5jdGlvbn1cbiAgICAgICAqXG4gICAgICAgKiBAcmV0dXJucyB7UHJveHk8b2JqZWN0Pn1cbiAgICAgICAqL1xuICAgICAgY29uc3Qgd3JhcE9iamVjdCA9ICh0YXJnZXQsIHdyYXBwZXJzID0ge30sIG1ldGFkYXRhID0ge30pID0+IHtcbiAgICAgICAgbGV0IGNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgbGV0IGhhbmRsZXJzID0ge1xuICAgICAgICAgIGhhcyhwcm94eVRhcmdldCwgcHJvcCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3AgaW4gdGFyZ2V0IHx8IHByb3AgaW4gY2FjaGU7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBnZXQocHJveHlUYXJnZXQsIHByb3AsIHJlY2VpdmVyKSB7XG4gICAgICAgICAgICBpZiAocHJvcCBpbiBjYWNoZSkge1xuICAgICAgICAgICAgICByZXR1cm4gY2FjaGVbcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIShwcm9wIGluIHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRhcmdldFtwcm9wXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAvLyBUaGlzIGlzIGEgbWV0aG9kIG9uIHRoZSB1bmRlcmx5aW5nIG9iamVjdC4gQ2hlY2sgaWYgd2UgbmVlZCB0byBkb1xuICAgICAgICAgICAgICAvLyBhbnkgd3JhcHBpbmcuXG5cbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiB3cmFwcGVyc1twcm9wXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSBhIHNwZWNpYWwtY2FzZSB3cmFwcGVyIGZvciB0aGlzIG1ldGhvZC5cbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBNZXRob2QodGFyZ2V0LCB0YXJnZXRbcHJvcF0sIHdyYXBwZXJzW3Byb3BdKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNPd25Qcm9wZXJ0eShtZXRhZGF0YSwgcHJvcCkpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGFuIGFzeW5jIG1ldGhvZCB0aGF0IHdlIGhhdmUgbWV0YWRhdGEgZm9yLiBDcmVhdGUgYVxuICAgICAgICAgICAgICAgIC8vIFByb21pc2Ugd3JhcHBlciBmb3IgaXQuXG4gICAgICAgICAgICAgICAgbGV0IHdyYXBwZXIgPSB3cmFwQXN5bmNGdW5jdGlvbihwcm9wLCBtZXRhZGF0YVtwcm9wXSk7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwTWV0aG9kKHRhcmdldCwgdGFyZ2V0W3Byb3BdLCB3cmFwcGVyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGEgbWV0aG9kIHRoYXQgd2UgZG9uJ3Qga25vdyBvciBjYXJlIGFib3V0LiBSZXR1cm4gdGhlXG4gICAgICAgICAgICAgICAgLy8gb3JpZ2luYWwgbWV0aG9kLCBib3VuZCB0byB0aGUgdW5kZXJseWluZyBvYmplY3QuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5iaW5kKHRhcmdldCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmIChoYXNPd25Qcm9wZXJ0eSh3cmFwcGVycywgcHJvcCkgfHwgaGFzT3duUHJvcGVydHkobWV0YWRhdGEsIHByb3ApKSkge1xuICAgICAgICAgICAgICAvLyBUaGlzIGlzIGFuIG9iamVjdCB0aGF0IHdlIG5lZWQgdG8gZG8gc29tZSB3cmFwcGluZyBmb3IgdGhlIGNoaWxkcmVuXG4gICAgICAgICAgICAgIC8vIG9mLiBDcmVhdGUgYSBzdWItb2JqZWN0IHdyYXBwZXIgZm9yIGl0IHdpdGggdGhlIGFwcHJvcHJpYXRlIGNoaWxkXG4gICAgICAgICAgICAgIC8vIG1ldGFkYXRhLlxuICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBPYmplY3QodmFsdWUsIHdyYXBwZXJzW3Byb3BdLCBtZXRhZGF0YVtwcm9wXSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhhc093blByb3BlcnR5KG1ldGFkYXRhLCBcIipcIikpIHtcbiAgICAgICAgICAgICAgLy8gV3JhcCBhbGwgcHJvcGVydGllcyBpbiAqIG5hbWVzcGFjZS5cbiAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwT2JqZWN0KHZhbHVlLCB3cmFwcGVyc1twcm9wXSwgbWV0YWRhdGFbXCIqXCJdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIFdlIGRvbid0IG5lZWQgdG8gZG8gYW55IHdyYXBwaW5nIGZvciB0aGlzIHByb3BlcnR5LFxuICAgICAgICAgICAgICAvLyBzbyBqdXN0IGZvcndhcmQgYWxsIGFjY2VzcyB0byB0aGUgdW5kZXJseWluZyBvYmplY3QuXG4gICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjYWNoZSwgcHJvcCwge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXRbcHJvcF07XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgIHRhcmdldFtwcm9wXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhY2hlW3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXQocHJveHlUYXJnZXQsIHByb3AsIHZhbHVlLCByZWNlaXZlcikge1xuICAgICAgICAgICAgaWYgKHByb3AgaW4gY2FjaGUpIHtcbiAgICAgICAgICAgICAgY2FjaGVbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRhcmdldFtwcm9wXSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBkZWZpbmVQcm9wZXJ0eShwcm94eVRhcmdldCwgcHJvcCwgZGVzYykge1xuICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuZGVmaW5lUHJvcGVydHkoY2FjaGUsIHByb3AsIGRlc2MpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGVsZXRlUHJvcGVydHkocHJveHlUYXJnZXQsIHByb3ApIHtcbiAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmRlbGV0ZVByb3BlcnR5KGNhY2hlLCBwcm9wKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gUGVyIGNvbnRyYWN0IG9mIHRoZSBQcm94eSBBUEksIHRoZSBcImdldFwiIHByb3h5IGhhbmRsZXIgbXVzdCByZXR1cm4gdGhlXG4gICAgICAgIC8vIG9yaWdpbmFsIHZhbHVlIG9mIHRoZSB0YXJnZXQgaWYgdGhhdCB2YWx1ZSBpcyBkZWNsYXJlZCByZWFkLW9ubHkgYW5kXG4gICAgICAgIC8vIG5vbi1jb25maWd1cmFibGUuIEZvciB0aGlzIHJlYXNvbiwgd2UgY3JlYXRlIGFuIG9iamVjdCB3aXRoIHRoZVxuICAgICAgICAvLyBwcm90b3R5cGUgc2V0IHRvIGB0YXJnZXRgIGluc3RlYWQgb2YgdXNpbmcgYHRhcmdldGAgZGlyZWN0bHkuXG4gICAgICAgIC8vIE90aGVyd2lzZSB3ZSBjYW5ub3QgcmV0dXJuIGEgY3VzdG9tIG9iamVjdCBmb3IgQVBJcyB0aGF0XG4gICAgICAgIC8vIGFyZSBkZWNsYXJlZCByZWFkLW9ubHkgYW5kIG5vbi1jb25maWd1cmFibGUsIHN1Y2ggYXMgYGNocm9tZS5kZXZ0b29sc2AuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFRoZSBwcm94eSBoYW5kbGVycyB0aGVtc2VsdmVzIHdpbGwgc3RpbGwgdXNlIHRoZSBvcmlnaW5hbCBgdGFyZ2V0YFxuICAgICAgICAvLyBpbnN0ZWFkIG9mIHRoZSBgcHJveHlUYXJnZXRgLCBzbyB0aGF0IHRoZSBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIGFyZVxuICAgICAgICAvLyBkZXJlZmVyZW5jZWQgdmlhIHRoZSBvcmlnaW5hbCB0YXJnZXRzLlxuICAgICAgICBsZXQgcHJveHlUYXJnZXQgPSBPYmplY3QuY3JlYXRlKHRhcmdldCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJveHkocHJveHlUYXJnZXQsIGhhbmRsZXJzKTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogQ3JlYXRlcyBhIHNldCBvZiB3cmFwcGVyIGZ1bmN0aW9ucyBmb3IgYW4gZXZlbnQgb2JqZWN0LCB3aGljaCBoYW5kbGVzXG4gICAgICAgKiB3cmFwcGluZyBvZiBsaXN0ZW5lciBmdW5jdGlvbnMgdGhhdCB0aG9zZSBtZXNzYWdlcyBhcmUgcGFzc2VkLlxuICAgICAgICpcbiAgICAgICAqIEEgc2luZ2xlIHdyYXBwZXIgaXMgY3JlYXRlZCBmb3IgZWFjaCBsaXN0ZW5lciBmdW5jdGlvbiwgYW5kIHN0b3JlZCBpbiBhXG4gICAgICAgKiBtYXAuIFN1YnNlcXVlbnQgY2FsbHMgdG8gYGFkZExpc3RlbmVyYCwgYGhhc0xpc3RlbmVyYCwgb3IgYHJlbW92ZUxpc3RlbmVyYFxuICAgICAgICogcmV0cmlldmUgdGhlIG9yaWdpbmFsIHdyYXBwZXIsIHNvIHRoYXQgIGF0dGVtcHRzIHRvIHJlbW92ZSBhXG4gICAgICAgKiBwcmV2aW91c2x5LWFkZGVkIGxpc3RlbmVyIHdvcmsgYXMgZXhwZWN0ZWQuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtEZWZhdWx0V2Vha01hcDxmdW5jdGlvbiwgZnVuY3Rpb24+fSB3cmFwcGVyTWFwXG4gICAgICAgKiAgICAgICAgQSBEZWZhdWx0V2Vha01hcCBvYmplY3Qgd2hpY2ggd2lsbCBjcmVhdGUgdGhlIGFwcHJvcHJpYXRlIHdyYXBwZXJcbiAgICAgICAqICAgICAgICBmb3IgYSBnaXZlbiBsaXN0ZW5lciBmdW5jdGlvbiB3aGVuIG9uZSBkb2VzIG5vdCBleGlzdCwgYW5kIHJldHJpZXZlXG4gICAgICAgKiAgICAgICAgYW4gZXhpc3Rpbmcgb25lIHdoZW4gaXQgZG9lcy5cbiAgICAgICAqXG4gICAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxuICAgICAgICovXG4gICAgICBjb25zdCB3cmFwRXZlbnQgPSB3cmFwcGVyTWFwID0+ICh7XG4gICAgICAgIGFkZExpc3RlbmVyKHRhcmdldCwgbGlzdGVuZXIsIC4uLmFyZ3MpIHtcbiAgICAgICAgICB0YXJnZXQuYWRkTGlzdGVuZXIod3JhcHBlck1hcC5nZXQobGlzdGVuZXIpLCAuLi5hcmdzKTtcbiAgICAgICAgfSxcbiAgICAgICAgaGFzTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lcikge1xuICAgICAgICAgIHJldHVybiB0YXJnZXQuaGFzTGlzdGVuZXIod3JhcHBlck1hcC5nZXQobGlzdGVuZXIpKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lcikge1xuICAgICAgICAgIHRhcmdldC5yZW1vdmVMaXN0ZW5lcih3cmFwcGVyTWFwLmdldChsaXN0ZW5lcikpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IG9uUmVxdWVzdEZpbmlzaGVkV3JhcHBlcnMgPSBuZXcgRGVmYXVsdFdlYWtNYXAobGlzdGVuZXIgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICByZXR1cm4gbGlzdGVuZXI7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogV3JhcHMgYW4gb25SZXF1ZXN0RmluaXNoZWQgbGlzdGVuZXIgZnVuY3Rpb24gc28gdGhhdCBpdCB3aWxsIHJldHVybiBhXG4gICAgICAgICAqIGBnZXRDb250ZW50KClgIHByb3BlcnR5IHdoaWNoIHJldHVybnMgYSBgUHJvbWlzZWAgcmF0aGVyIHRoYW4gdXNpbmcgYVxuICAgICAgICAgKiBjYWxsYmFjayBBUEkuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXFcbiAgICAgICAgICogICAgICAgIFRoZSBIQVIgZW50cnkgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgbmV0d29yayByZXF1ZXN0LlxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG9uUmVxdWVzdEZpbmlzaGVkKHJlcSkge1xuICAgICAgICAgIGNvbnN0IHdyYXBwZWRSZXEgPSB3cmFwT2JqZWN0KHJlcSwge30gLyogd3JhcHBlcnMgKi8sIHtcbiAgICAgICAgICAgIGdldENvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgbWluQXJnczogMCxcbiAgICAgICAgICAgICAgbWF4QXJnczogMFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGxpc3RlbmVyKHdyYXBwZWRSZXEpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgICBjb25zdCBvbk1lc3NhZ2VXcmFwcGVycyA9IG5ldyBEZWZhdWx0V2Vha01hcChsaXN0ZW5lciA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHJldHVybiBsaXN0ZW5lcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXcmFwcyBhIG1lc3NhZ2UgbGlzdGVuZXIgZnVuY3Rpb24gc28gdGhhdCBpdCBtYXkgc2VuZCByZXNwb25zZXMgYmFzZWQgb25cbiAgICAgICAgICogaXRzIHJldHVybiB2YWx1ZSwgcmF0aGVyIHRoYW4gYnkgcmV0dXJuaW5nIGEgc2VudGluZWwgdmFsdWUgYW5kIGNhbGxpbmcgYVxuICAgICAgICAgKiBjYWxsYmFjay4gSWYgdGhlIGxpc3RlbmVyIGZ1bmN0aW9uIHJldHVybnMgYSBQcm9taXNlLCB0aGUgcmVzcG9uc2UgaXNcbiAgICAgICAgICogc2VudCB3aGVuIHRoZSBwcm9taXNlIGVpdGhlciByZXNvbHZlcyBvciByZWplY3RzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0geyp9IG1lc3NhZ2VcbiAgICAgICAgICogICAgICAgIFRoZSBtZXNzYWdlIHNlbnQgYnkgdGhlIG90aGVyIGVuZCBvZiB0aGUgY2hhbm5lbC5cbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IHNlbmRlclxuICAgICAgICAgKiAgICAgICAgRGV0YWlscyBhYm91dCB0aGUgc2VuZGVyIG9mIHRoZSBtZXNzYWdlLlxuICAgICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCopfSBzZW5kUmVzcG9uc2VcbiAgICAgICAgICogICAgICAgIEEgY2FsbGJhY2sgd2hpY2gsIHdoZW4gY2FsbGVkIHdpdGggYW4gYXJiaXRyYXJ5IGFyZ3VtZW50LCBzZW5kc1xuICAgICAgICAgKiAgICAgICAgdGhhdCB2YWx1ZSBhcyBhIHJlc3BvbnNlLlxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICogICAgICAgIFRydWUgaWYgdGhlIHdyYXBwZWQgbGlzdGVuZXIgcmV0dXJuZWQgYSBQcm9taXNlLCB3aGljaCB3aWxsIGxhdGVyXG4gICAgICAgICAqICAgICAgICB5aWVsZCBhIHJlc3BvbnNlLiBGYWxzZSBvdGhlcndpc2UuXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gb25NZXNzYWdlKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XG4gICAgICAgICAgbGV0IGRpZENhbGxTZW5kUmVzcG9uc2UgPSBmYWxzZTtcbiAgICAgICAgICBsZXQgd3JhcHBlZFNlbmRSZXNwb25zZTtcbiAgICAgICAgICBsZXQgc2VuZFJlc3BvbnNlUHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgd3JhcHBlZFNlbmRSZXNwb25zZSA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICBkaWRDYWxsU2VuZFJlc3BvbnNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGxpc3RlbmVyKG1lc3NhZ2UsIHNlbmRlciwgd3JhcHBlZFNlbmRSZXNwb25zZSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBpc1Jlc3VsdFRoZW5hYmxlID0gcmVzdWx0ICE9PSB0cnVlICYmIGlzVGhlbmFibGUocmVzdWx0KTtcblxuICAgICAgICAgIC8vIElmIHRoZSBsaXN0ZW5lciBkaWRuJ3QgcmV0dXJuZWQgdHJ1ZSBvciBhIFByb21pc2UsIG9yIGNhbGxlZFxuICAgICAgICAgIC8vIHdyYXBwZWRTZW5kUmVzcG9uc2Ugc3luY2hyb25vdXNseSwgd2UgY2FuIGV4aXQgZWFybGllclxuICAgICAgICAgIC8vIGJlY2F1c2UgdGhlcmUgd2lsbCBiZSBubyByZXNwb25zZSBzZW50IGZyb20gdGhpcyBsaXN0ZW5lci5cbiAgICAgICAgICBpZiAocmVzdWx0ICE9PSB0cnVlICYmICFpc1Jlc3VsdFRoZW5hYmxlICYmICFkaWRDYWxsU2VuZFJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQSBzbWFsbCBoZWxwZXIgdG8gc2VuZCB0aGUgbWVzc2FnZSBpZiB0aGUgcHJvbWlzZSByZXNvbHZlc1xuICAgICAgICAgIC8vIGFuZCBhbiBlcnJvciBpZiB0aGUgcHJvbWlzZSByZWplY3RzIChhIHdyYXBwZWQgc2VuZE1lc3NhZ2UgaGFzXG4gICAgICAgICAgLy8gdG8gdHJhbnNsYXRlIHRoZSBtZXNzYWdlIGludG8gYSByZXNvbHZlZCBwcm9taXNlIG9yIGEgcmVqZWN0ZWRcbiAgICAgICAgICAvLyBwcm9taXNlKS5cbiAgICAgICAgICBjb25zdCBzZW5kUHJvbWlzZWRSZXN1bHQgPSBwcm9taXNlID0+IHtcbiAgICAgICAgICAgIHByb21pc2UudGhlbihtc2cgPT4ge1xuICAgICAgICAgICAgICAvLyBzZW5kIHRoZSBtZXNzYWdlIHZhbHVlLlxuICAgICAgICAgICAgICBzZW5kUmVzcG9uc2UobXNnKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgLy8gU2VuZCBhIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhlIGVycm9yIGlmIHRoZSByZWplY3RlZCB2YWx1ZVxuICAgICAgICAgICAgICAvLyBpcyBhbiBpbnN0YW5jZSBvZiBlcnJvciwgb3IgdGhlIG9iamVjdCBpdHNlbGYgb3RoZXJ3aXNlLlxuICAgICAgICAgICAgICBsZXQgbWVzc2FnZTtcbiAgICAgICAgICAgICAgaWYgKGVycm9yICYmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yIHx8IHR5cGVvZiBlcnJvci5tZXNzYWdlID09PSBcInN0cmluZ1wiKSkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBcIkFuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJyZWRcIjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzZW5kUmVzcG9uc2Uoe1xuICAgICAgICAgICAgICAgIF9fbW96V2ViRXh0ZW5zaW9uUG9seWZpbGxSZWplY3RfXzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgLy8gUHJpbnQgYW4gZXJyb3Igb24gdGhlIGNvbnNvbGUgaWYgdW5hYmxlIHRvIHNlbmQgdGhlIHJlc3BvbnNlLlxuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHNlbmQgb25NZXNzYWdlIHJlamVjdGVkIHJlcGx5XCIsIGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLy8gSWYgdGhlIGxpc3RlbmVyIHJldHVybmVkIGEgUHJvbWlzZSwgc2VuZCB0aGUgcmVzb2x2ZWQgdmFsdWUgYXMgYVxuICAgICAgICAgIC8vIHJlc3VsdCwgb3RoZXJ3aXNlIHdhaXQgdGhlIHByb21pc2UgcmVsYXRlZCB0byB0aGUgd3JhcHBlZFNlbmRSZXNwb25zZVxuICAgICAgICAgIC8vIGNhbGxiYWNrIHRvIHJlc29sdmUgYW5kIHNlbmQgaXQgYXMgYSByZXNwb25zZS5cbiAgICAgICAgICBpZiAoaXNSZXN1bHRUaGVuYWJsZSkge1xuICAgICAgICAgICAgc2VuZFByb21pc2VkUmVzdWx0KHJlc3VsdCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbmRQcm9taXNlZFJlc3VsdChzZW5kUmVzcG9uc2VQcm9taXNlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBMZXQgQ2hyb21lIGtub3cgdGhhdCB0aGUgbGlzdGVuZXIgaXMgcmVwbHlpbmcuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHdyYXBwZWRTZW5kTWVzc2FnZUNhbGxiYWNrID0gKHtcbiAgICAgICAgcmVqZWN0LFxuICAgICAgICByZXNvbHZlXG4gICAgICB9LCByZXBseSkgPT4ge1xuICAgICAgICBpZiAoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgICAgIC8vIERldGVjdCB3aGVuIG5vbmUgb2YgdGhlIGxpc3RlbmVycyByZXBsaWVkIHRvIHRoZSBzZW5kTWVzc2FnZSBjYWxsIGFuZCByZXNvbHZlXG4gICAgICAgICAgLy8gdGhlIHByb21pc2UgdG8gdW5kZWZpbmVkIGFzIGluIEZpcmVmb3guXG4gICAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbC9pc3N1ZXMvMTMwXG4gICAgICAgICAgaWYgKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSA9PT0gQ0hST01FX1NFTkRfTUVTU0FHRV9DQUxMQkFDS19OT19SRVNQT05TRV9NRVNTQUdFKSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJlcGx5ICYmIHJlcGx5Ll9fbW96V2ViRXh0ZW5zaW9uUG9seWZpbGxSZWplY3RfXykge1xuICAgICAgICAgIC8vIENvbnZlcnQgYmFjayB0aGUgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGUgZXJyb3IgaW50b1xuICAgICAgICAgIC8vIGFuIEVycm9yIGluc3RhbmNlLlxuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IocmVwbHkubWVzc2FnZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUocmVwbHkpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29uc3Qgd3JhcHBlZFNlbmRNZXNzYWdlID0gKG5hbWUsIG1ldGFkYXRhLCBhcGlOYW1lc3BhY2VPYmosIC4uLmFyZ3MpID0+IHtcbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoIDwgbWV0YWRhdGEubWluQXJncykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgYXQgbGVhc3QgJHttZXRhZGF0YS5taW5BcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5taW5BcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID4gbWV0YWRhdGEubWF4QXJncykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgYXQgbW9zdCAke21ldGFkYXRhLm1heEFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1heEFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHdyYXBwZWRDYiA9IHdyYXBwZWRTZW5kTWVzc2FnZUNhbGxiYWNrLmJpbmQobnVsbCwge1xuICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGFyZ3MucHVzaCh3cmFwcGVkQ2IpO1xuICAgICAgICAgIGFwaU5hbWVzcGFjZU9iai5zZW5kTWVzc2FnZSguLi5hcmdzKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgY29uc3Qgc3RhdGljV3JhcHBlcnMgPSB7XG4gICAgICAgIGRldnRvb2xzOiB7XG4gICAgICAgICAgbmV0d29yazoge1xuICAgICAgICAgICAgb25SZXF1ZXN0RmluaXNoZWQ6IHdyYXBFdmVudChvblJlcXVlc3RGaW5pc2hlZFdyYXBwZXJzKVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcnVudGltZToge1xuICAgICAgICAgIG9uTWVzc2FnZTogd3JhcEV2ZW50KG9uTWVzc2FnZVdyYXBwZXJzKSxcbiAgICAgICAgICBvbk1lc3NhZ2VFeHRlcm5hbDogd3JhcEV2ZW50KG9uTWVzc2FnZVdyYXBwZXJzKSxcbiAgICAgICAgICBzZW5kTWVzc2FnZTogd3JhcHBlZFNlbmRNZXNzYWdlLmJpbmQobnVsbCwgXCJzZW5kTWVzc2FnZVwiLCB7XG4gICAgICAgICAgICBtaW5BcmdzOiAxLFxuICAgICAgICAgICAgbWF4QXJnczogM1xuICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHRhYnM6IHtcbiAgICAgICAgICBzZW5kTWVzc2FnZTogd3JhcHBlZFNlbmRNZXNzYWdlLmJpbmQobnVsbCwgXCJzZW5kTWVzc2FnZVwiLCB7XG4gICAgICAgICAgICBtaW5BcmdzOiAyLFxuICAgICAgICAgICAgbWF4QXJnczogM1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjb25zdCBzZXR0aW5nTWV0YWRhdGEgPSB7XG4gICAgICAgIGNsZWFyOiB7XG4gICAgICAgICAgbWluQXJnczogMSxcbiAgICAgICAgICBtYXhBcmdzOiAxXG4gICAgICAgIH0sXG4gICAgICAgIGdldDoge1xuICAgICAgICAgIG1pbkFyZ3M6IDEsXG4gICAgICAgICAgbWF4QXJnczogMVxuICAgICAgICB9LFxuICAgICAgICBzZXQ6IHtcbiAgICAgICAgICBtaW5BcmdzOiAxLFxuICAgICAgICAgIG1heEFyZ3M6IDFcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGFwaU1ldGFkYXRhLnByaXZhY3kgPSB7XG4gICAgICAgIG5ldHdvcms6IHtcbiAgICAgICAgICBcIipcIjogc2V0dGluZ01ldGFkYXRhXG4gICAgICAgIH0sXG4gICAgICAgIHNlcnZpY2VzOiB7XG4gICAgICAgICAgXCIqXCI6IHNldHRpbmdNZXRhZGF0YVxuICAgICAgICB9LFxuICAgICAgICB3ZWJzaXRlczoge1xuICAgICAgICAgIFwiKlwiOiBzZXR0aW5nTWV0YWRhdGFcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJldHVybiB3cmFwT2JqZWN0KGV4dGVuc2lvbkFQSXMsIHN0YXRpY1dyYXBwZXJzLCBhcGlNZXRhZGF0YSk7XG4gICAgfTtcblxuICAgIC8vIFRoZSBidWlsZCBwcm9jZXNzIGFkZHMgYSBVTUQgd3JhcHBlciBhcm91bmQgdGhpcyBmaWxlLCB3aGljaCBtYWtlcyB0aGVcbiAgICAvLyBgbW9kdWxlYCB2YXJpYWJsZSBhdmFpbGFibGUuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB3cmFwQVBJcyhjaHJvbWUpO1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZ2xvYmFsVGhpcy5icm93c2VyO1xuICB9XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJyb3dzZXItcG9seWZpbGwuanMubWFwXG4iLCJpbXBvcnQgb3JpZ2luYWxCcm93c2VyIGZyb20gXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIjtcbmV4cG9ydCBjb25zdCBicm93c2VyID0gb3JpZ2luYWxCcm93c2VyO1xuIiwiLyoqIEZpZWxkIHR5cGUgY2F0ZWdvcmllcyBmb3IgZGV0ZWN0ZWQgZm9ybSBmaWVsZHMgKi9cbmV4cG9ydCBlbnVtIEZpZWxkVHlwZSB7XG4gIFRFWFQgPSAndGV4dCcsXG4gIEVNQUlMID0gJ2VtYWlsJyxcbiAgUEhPTkUgPSAncGhvbmUnLFxuICBEQVRFID0gJ2RhdGUnLFxuICBBRERSRVNTID0gJ2FkZHJlc3MnLFxuICBTU04gPSAnc3NuJyxcbiAgTlVNQkVSID0gJ251bWJlcicsXG4gIFVOS05PV04gPSAndW5rbm93bicsXG59XG5cbi8qKiBNZXRhZGF0YSBmb3IgYSBkZXRlY3RlZCBmb3JtIGZpZWxkICovXG5leHBvcnQgaW50ZXJmYWNlIERldGVjdGVkRmllbGQge1xuICBlbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFNlbGVjdEVsZW1lbnQgfCBIVE1MVGV4dEFyZWFFbGVtZW50O1xuICBuYW1lOiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHR5cGU6IEZpZWxkVHlwZTtcbiAgdGFnTmFtZTogc3RyaW5nO1xuICBpbnB1dFR5cGU6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbiAgaXNSZXF1aXJlZDogYm9vbGVhbjtcbiAgYXV0b2NvbXBsZXRlOiBzdHJpbmc7XG59XG4iLCIvKipcbiAqIEZpZWxkIERldGVjdG9yIC0gVHlwZVNjcmlwdCBwb3J0IGZyb20gZXh0ZW5zaW9uL2xpYi9maWVsZC1kZXRlY3Rvci5qc1xuICpcbiAqIERldGVjdHMgYW5kIGNhdGVnb3JpemVzIGlucHV0IGZpZWxkcyBvbiB3ZWIgcGFnZXMuXG4gKiBQcmVzZXJ2ZXMgdGhlIHYxIGRldGVjdGlvbiBsb2dpYyB3aXRoIHByb3BlciBUeXBlU2NyaXB0IHR5cGVzLlxuICovXG5cbmltcG9ydCB7IEZpZWxkVHlwZSwgdHlwZSBEZXRlY3RlZEZpZWxkIH0gZnJvbSAnLi4vc2hhcmVkL3R5cGVzL2ZpZWxkLWRldGVjdGlvbic7XG5cbnR5cGUgRm9ybUVsZW1lbnQgPSBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFNlbGVjdEVsZW1lbnQgfCBIVE1MVGV4dEFyZWFFbGVtZW50O1xuXG4vKiogUmVnZXggcGF0dGVybnMgZm9yIGZpZWxkIHR5cGUgZGV0ZWN0aW9uLCBvcmRlcmVkIGJ5IHNwZWNpZmljaXR5ICovXG5jb25zdCBGSUVMRF9QQVRURVJOUzogUmVjb3JkPHN0cmluZywgUmVnRXhwW10+ID0ge1xuICBbRmllbGRUeXBlLkVNQUlMXTogWy9lbWFpbC9pLCAvZVstX10/bWFpbC9pLCAvbWFpbC9pXSxcbiAgW0ZpZWxkVHlwZS5QSE9ORV06IFsvcGhvbmUvaSwgL3RlbC9pLCAvbW9iaWxlL2ksIC9jZWxsL2ksIC9mYXgvaV0sXG4gIFtGaWVsZFR5cGUuREFURV06IFsvZGF0ZS9pLCAvYmlydGgvaSwgL2RvYi9pLCAvZGF5L2ksIC9tb250aC9pLCAveWVhci9pLCAvZXhwaXJlL2ksIC9leHBpcnkvaV0sXG4gIFtGaWVsZFR5cGUuQUREUkVTU106IFtcbiAgICAvYWRkcmVzcy9pLFxuICAgIC9zdHJlZXQvaSxcbiAgICAvY2l0eS9pLFxuICAgIC9zdGF0ZS9pLFxuICAgIC96aXAvaSxcbiAgICAvcG9zdGFsL2ksXG4gICAgL2NvdW50cnkvaSxcbiAgICAvbG9jYXRpb24vaSxcbiAgXSxcbiAgW0ZpZWxkVHlwZS5TU05dOiBbL3Nzbi9pLCAvc29jaWFsWy1fXT9zZWN1cml0eS9pLCAvdGF4Wy1fXT9pZC9pLCAvZWluL2ldLFxuICBbRmllbGRUeXBlLk5VTUJFUl06IFsvbnVtYmVyL2ksIC9udW0vaSwgL2lkL2ksIC9hY2NvdW50L2ksIC9yZWZlcmVuY2UvaSwgL3JlZi9pXSxcbn07XG5cbi8qKiBDU1Mgc2VsZWN0b3JzIGZvciBkZXRlY3RhYmxlIGZvcm0gZmllbGRzICovXG5jb25zdCBGSUVMRF9TRUxFQ1RPUlMgPSBbXG4gICdpbnB1dFt0eXBlPVwidGV4dFwiXScsXG4gICdpbnB1dFt0eXBlPVwiZW1haWxcIl0nLFxuICAnaW5wdXRbdHlwZT1cInRlbFwiXScsXG4gICdpbnB1dFt0eXBlPVwiZGF0ZVwiXScsXG4gICdpbnB1dFt0eXBlPVwibnVtYmVyXCJdJyxcbiAgJ2lucHV0W3R5cGU9XCJzZWFyY2hcIl0nLFxuICAnaW5wdXRbdHlwZT1cInVybFwiXScsXG4gICdpbnB1dDpub3QoW3R5cGVdKScsXG4gICd0ZXh0YXJlYScsXG4gICdzZWxlY3QnLFxuXS5qb2luKCcsICcpO1xuXG4vKiogQ1NTIHNlbGVjdG9ycyBmb3IgZWxlbWVudHMgdG8gZXhjbHVkZSAqL1xuY29uc3QgRVhDTFVERURfU0VMRUNUT1JTID0gW1xuICAnW3R5cGU9XCJwYXNzd29yZFwiXScsXG4gICdbdHlwZT1cImhpZGRlblwiXScsXG4gICdbdHlwZT1cInN1Ym1pdFwiXScsXG4gICdbdHlwZT1cImJ1dHRvblwiXScsXG4gICdbdHlwZT1cInJlc2V0XCJdJyxcbiAgJ1t0eXBlPVwiZmlsZVwiXScsXG4gICdbdHlwZT1cImltYWdlXCJdJyxcbiAgJ1t0eXBlPVwiY2hlY2tib3hcIl0nLFxuICAnW3R5cGU9XCJyYWRpb1wiXScsXG4gICdbZGlzYWJsZWRdJyxcbiAgJ1tyZWFkb25seV0nLFxuICAnW2FyaWEtaGlkZGVuPVwidHJ1ZVwiXScsXG4gICcuaW50ZWxsaWZpbGwtYXV0b2NvbXBsZXRlJyxcbiAgJ1tkYXRhLWludGVsbGlmaWxsLXByb2Nlc3NlZF0nLFxuXS5qb2luKCcsICcpO1xuXG4vKiogQ29udGFpbmVycyB0aGF0IHNob3VsZCBiZSBleGNsdWRlZCBmcm9tIGZpZWxkIGRldGVjdGlvbiAqL1xuY29uc3QgRVhDTFVERURfQ09OVEFJTkVSUyA9IFsnW2RhdGEtaW50ZWxsaWZpbGwtaWdub3JlXScsICcuY2FwdGNoYScsICcucmVjYXB0Y2hhJ107XG5cbi8qKiBEZXRlY3QgZmllbGQgdHlwZSBmcm9tIGVsZW1lbnQgYXR0cmlidXRlcyAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRldGVjdEZpZWxkVHlwZShlbGVtZW50OiBGb3JtRWxlbWVudCk6IEZpZWxkVHlwZSB7XG4gIC8vIENoZWNrIGlucHV0IHR5cGUgYXR0cmlidXRlIGZpcnN0XG4gIGNvbnN0IGlucHV0VHlwZSA9IChlbGVtZW50IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnR5cGU/LnRvTG93ZXJDYXNlKCk7XG4gIGlmIChpbnB1dFR5cGUgPT09ICdlbWFpbCcpIHJldHVybiBGaWVsZFR5cGUuRU1BSUw7XG4gIGlmIChpbnB1dFR5cGUgPT09ICd0ZWwnKSByZXR1cm4gRmllbGRUeXBlLlBIT05FO1xuICBpZiAoaW5wdXRUeXBlID09PSAnZGF0ZScpIHJldHVybiBGaWVsZFR5cGUuREFURTtcbiAgaWYgKGlucHV0VHlwZSA9PT0gJ251bWJlcicpIHJldHVybiBGaWVsZFR5cGUuTlVNQkVSO1xuXG4gIC8vIENoZWNrIG5hbWUsIGlkLCBwbGFjZWhvbGRlciwgYXJpYS1sYWJlbFxuICBjb25zdCBmaWVsZE5hbWUgPSBnZXRGaWVsZElkZW50aWZpZXIoZWxlbWVudCk7XG4gIGNvbnN0IG5vcm1hbGl6ZWROYW1lID0gZmllbGROYW1lLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuXG4gIC8vIE1hdGNoIGFnYWluc3QgcGF0dGVybnNcbiAgZm9yIChjb25zdCBbdHlwZSwgcGF0dGVybnNdIG9mIE9iamVjdC5lbnRyaWVzKEZJRUxEX1BBVFRFUk5TKSkge1xuICAgIGZvciAoY29uc3QgcGF0dGVybiBvZiBwYXR0ZXJucykge1xuICAgICAgaWYgKHBhdHRlcm4udGVzdChub3JtYWxpemVkTmFtZSkpIHtcbiAgICAgICAgcmV0dXJuIHR5cGUgYXMgRmllbGRUeXBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBGaWVsZFR5cGUuVEVYVDtcbn1cblxuLyoqIEdldCB0aGUgYmVzdCBpZGVudGlmeWluZyBzdHJpbmcgZnJvbSBhIGZvcm0gZWxlbWVudCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZpZWxkSWRlbnRpZmllcihlbGVtZW50OiBGb3JtRWxlbWVudCk6IHN0cmluZyB7XG4gIC8vIFByaW9yaXR5OiBuYW1lID4gaWQgPiBwbGFjZWhvbGRlciA+IGFyaWEtbGFiZWwgPiBhdXRvY29tcGxldGVcbiAgcmV0dXJuIChcbiAgICAoZWxlbWVudCBhcyBIVE1MSW5wdXRFbGVtZW50KS5uYW1lIHx8XG4gICAgZWxlbWVudC5pZCB8fFxuICAgIChlbGVtZW50IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnBsYWNlaG9sZGVyIHx8XG4gICAgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKSB8fFxuICAgIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdhdXRvY29tcGxldGUnKSB8fFxuICAgICcnXG4gICk7XG59XG5cbi8qKiBFeHRyYWN0IGxhYmVsIHRleHQgYXNzb2NpYXRlZCB3aXRoIGEgZm9ybSBlbGVtZW50ICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmllbGRMYWJlbChlbGVtZW50OiBGb3JtRWxlbWVudCk6IHN0cmluZyB7XG4gIC8vIFRyeSBhc3NvY2lhdGVkIGxhYmVsIGVsZW1lbnQgdmlhIGZvciBhdHRyaWJ1dGVcbiAgaWYgKGVsZW1lbnQuaWQpIHtcbiAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGxhYmVsW2Zvcj1cIiR7Q1NTLmVzY2FwZShlbGVtZW50LmlkKX1cIl1gKTtcbiAgICBpZiAobGFiZWwpIHJldHVybiBsYWJlbC50ZXh0Q29udGVudD8udHJpbSgpIHx8ICcnO1xuICB9XG5cbiAgLy8gVHJ5IHBhcmVudCBsYWJlbFxuICBjb25zdCBwYXJlbnRMYWJlbCA9IGVsZW1lbnQuY2xvc2VzdCgnbGFiZWwnKTtcbiAgaWYgKHBhcmVudExhYmVsKSB7XG4gICAgY29uc3QgY2xvbmUgPSBwYXJlbnRMYWJlbC5jbG9uZU5vZGUodHJ1ZSkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgY29uc3QgaW5wdXRzID0gY2xvbmUucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QnKTtcbiAgICBpbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IGlucHV0LnJlbW92ZSgpKTtcbiAgICByZXR1cm4gY2xvbmUudGV4dENvbnRlbnQ/LnRyaW0oKSB8fCAnJztcbiAgfVxuXG4gIC8vIFRyeSBhcmlhLWxhYmVsXG4gIGNvbnN0IGFyaWFMYWJlbCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJyk7XG4gIGlmIChhcmlhTGFiZWwpIHJldHVybiBhcmlhTGFiZWwudHJpbSgpO1xuXG4gIC8vIFRyeSBwbGFjZWhvbGRlclxuICBjb25zdCBwbGFjZWhvbGRlciA9IChlbGVtZW50IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnBsYWNlaG9sZGVyO1xuICBpZiAocGxhY2Vob2xkZXIpIHJldHVybiBwbGFjZWhvbGRlci50cmltKCk7XG5cbiAgcmV0dXJuICcnO1xufVxuXG4vKiogQ2hlY2sgaWYgYW4gZWxlbWVudCBpcyB2aXNpYmxlIGFuZCBpbnRlcmFjdGFibGUgKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0VsZW1lbnRWaXNpYmxlKGVsZW1lbnQ6IEZvcm1FbGVtZW50KTogYm9vbGVhbiB7XG4gIGlmICghZWxlbWVudC5vZmZzZXRQYXJlbnQgJiYgKGVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgIT09ICdmaXhlZCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuICByZXR1cm4gc3R5bGUuZGlzcGxheSAhPT0gJ25vbmUnICYmIHN0eWxlLnZpc2liaWxpdHkgIT09ICdoaWRkZW4nICYmIHN0eWxlLm9wYWNpdHkgIT09ICcwJztcbn1cblxuLyoqIENoZWNrIGlmIGFuIGVsZW1lbnQgc2hvdWxkIGJlIGV4Y2x1ZGVkIGZyb20gZGV0ZWN0aW9uICovXG5leHBvcnQgZnVuY3Rpb24gc2hvdWxkRXhjbHVkZShlbGVtZW50OiBGb3JtRWxlbWVudCk6IGJvb2xlYW4ge1xuICBpZiAoZWxlbWVudC5tYXRjaGVzKEVYQ0xVREVEX1NFTEVDVE9SUykpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZvciAoY29uc3Qgc2VsZWN0b3Igb2YgRVhDTFVERURfQ09OVEFJTkVSUykge1xuICAgIGlmIChlbGVtZW50LmNsb3Nlc3Qoc2VsZWN0b3IpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKiBNYXJrIGEgZmllbGQgYXMgcHJvY2Vzc2VkIGJ5IEludGVsbGlGaWxsICovXG5leHBvcnQgZnVuY3Rpb24gbWFya0FzUHJvY2Vzc2VkKGVsZW1lbnQ6IEZvcm1FbGVtZW50KTogdm9pZCB7XG4gIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWludGVsbGlmaWxsLXByb2Nlc3NlZCcsICd0cnVlJyk7XG59XG5cbi8qKiBDaGVjayBpZiBhIGZpZWxkIGhhcyBhbHJlYWR5IGJlZW4gcHJvY2Vzc2VkICovXG5leHBvcnQgZnVuY3Rpb24gaXNQcm9jZXNzZWQoZWxlbWVudDogRm9ybUVsZW1lbnQpOiBib29sZWFuIHtcbiAgcmV0dXJuIGVsZW1lbnQuaGFzQXR0cmlidXRlKCdkYXRhLWludGVsbGlmaWxsLXByb2Nlc3NlZCcpO1xufVxuXG4vKiogRGV0ZWN0IGFsbCBmb3JtIGZpZWxkcyBvbiB0aGUgcGFnZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRldGVjdEZpZWxkcygpOiBEZXRlY3RlZEZpZWxkW10ge1xuICBjb25zdCBmaWVsZHM6IERldGVjdGVkRmllbGRbXSA9IFtdO1xuICBjb25zdCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8Rm9ybUVsZW1lbnQ+KEZJRUxEX1NFTEVDVE9SUyk7XG5cbiAgZWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgIGlmIChzaG91bGRFeGNsdWRlKGVsZW1lbnQpKSByZXR1cm47XG4gICAgaWYgKCFpc0VsZW1lbnRWaXNpYmxlKGVsZW1lbnQpKSByZXR1cm47XG5cbiAgICBmaWVsZHMucHVzaCh7XG4gICAgICBlbGVtZW50LFxuICAgICAgbmFtZTogZ2V0RmllbGRJZGVudGlmaWVyKGVsZW1lbnQpLFxuICAgICAgbGFiZWw6IGdldEZpZWxkTGFiZWwoZWxlbWVudCksXG4gICAgICB0eXBlOiBkZXRlY3RGaWVsZFR5cGUoZWxlbWVudCksXG4gICAgICB0YWdOYW1lOiBlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSxcbiAgICAgIGlucHV0VHlwZTogKGVsZW1lbnQgYXMgSFRNTElucHV0RWxlbWVudCkudHlwZSB8fCAndGV4dCcsXG4gICAgICB2YWx1ZTogKGVsZW1lbnQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgfHwgJycsXG4gICAgICBpc1JlcXVpcmVkOlxuICAgICAgICAoZWxlbWVudCBhcyBIVE1MSW5wdXRFbGVtZW50KS5yZXF1aXJlZCB8fCBlbGVtZW50Lmhhc0F0dHJpYnV0ZSgncmVxdWlyZWQnKSxcbiAgICAgIGF1dG9jb21wbGV0ZTogZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2F1dG9jb21wbGV0ZScpIHx8ICcnLFxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gZmllbGRzO1xufVxuXG4vKipcbiAqIE9ic2VydmUgRE9NIGNoYW5nZXMgZm9yIGR5bmFtaWNhbGx5IGFkZGVkIGZvcm0gZmllbGRzLlxuICogQ2FsbHMgdGhlIGNhbGxiYWNrIChkZWJvdW5jZWQpIHdoZW4gbmV3IGZpZWxkcyBhcmUgZGV0ZWN0ZWQuXG4gKiBSZXR1cm5zIHRoZSBNdXRhdGlvbk9ic2VydmVyIGluc3RhbmNlIGZvciBjbGVhbnVwLlxuICovXG5leHBvcnQgZnVuY3Rpb24gb2JzZXJ2ZURPTUNoYW5nZXMoY2FsbGJhY2s6ICgpID0+IHZvaWQpOiBNdXRhdGlvbk9ic2VydmVyIHtcbiAgbGV0IGRlYm91bmNlVGltZXI6IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+IHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zKSA9PiB7XG4gICAgbGV0IGhhc05ld0ZpZWxkcyA9IGZhbHNlO1xuXG4gICAgZm9yIChjb25zdCBtdXRhdGlvbiBvZiBtdXRhdGlvbnMpIHtcbiAgICAgIGlmIChtdXRhdGlvbi50eXBlID09PSAnY2hpbGRMaXN0JyAmJiBtdXRhdGlvbi5hZGRlZE5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbXV0YXRpb24uYWRkZWROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICBjb25zdCBlbCA9IG5vZGUgYXMgRWxlbWVudDtcbiAgICAgICAgICAgIGNvbnN0IGhhc0ZpZWxkcyA9IGVsLm1hdGNoZXM/LihGSUVMRF9TRUxFQ1RPUlMpIHx8IGVsLnF1ZXJ5U2VsZWN0b3I/LihGSUVMRF9TRUxFQ1RPUlMpO1xuICAgICAgICAgICAgaWYgKGhhc0ZpZWxkcykge1xuICAgICAgICAgICAgICBoYXNOZXdGaWVsZHMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGhhc05ld0ZpZWxkcykge1xuICAgICAgLy8gRGVib3VuY2UgdG8gYmF0Y2ggcmFwaWQgRE9NIGNoYW5nZXNcbiAgICAgIGlmIChkZWJvdW5jZVRpbWVyKSBjbGVhclRpbWVvdXQoZGVib3VuY2VUaW1lcik7XG4gICAgICBkZWJvdW5jZVRpbWVyID0gc2V0VGltZW91dChjYWxsYmFjaywgMjAwKTtcbiAgICB9XG4gIH0pO1xuXG4gIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwge1xuICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICBzdWJ0cmVlOiB0cnVlLFxuICB9KTtcblxuICByZXR1cm4gb2JzZXJ2ZXI7XG59XG4iLCIvKipcbiAqIEZpZWxkIE1hdGNoZXIgLSBNYXBzIGRldGVjdGVkIGZvcm0gZmllbGRzIHRvIHVzZXIgcHJvZmlsZSBkYXRhXG4gKlxuICogTXVsdGktbGF5ZXIgbWF0Y2hpbmcgc3RyYXRlZ3k6XG4gKiAxLiBIVE1MIGF1dG9jb21wbGV0ZSBhdHRyaWJ1dGUgKGhpZ2hlc3QgY29uZmlkZW5jZSlcbiAqIDIuIElucHV0IHR5cGUgbWFwcGluZ1xuICogMy4gTmFtZS9pZC9sYWJlbCByZWdleCBwYXR0ZXJuc1xuICogNC4gRnV6enkgc3RyaW5nIHNpbWlsYXJpdHkgKGxvd2VzdCBjb25maWRlbmNlKVxuICovXG5cbmltcG9ydCB7IEZpZWxkVHlwZSwgdHlwZSBEZXRlY3RlZEZpZWxkIH0gZnJvbSAnLi4vc2hhcmVkL3R5cGVzL2ZpZWxkLWRldGVjdGlvbic7XG5pbXBvcnQgdHlwZSB7IFByb2ZpbGVGaWVsZCB9IGZyb20gJy4uL3NoYXJlZC90eXBlcy9hcGknO1xuaW1wb3J0IHR5cGUgeyBGaWVsZE1hdGNoLCBGaWVsZENvbnRleHQsIE1hdGNoZWRGaWVsZCwgTWF0Y2hNZXRob2QgfSBmcm9tICcuLi9zaGFyZWQvdHlwZXMvZmllbGQtbWF0Y2hpbmcnO1xuXG4vKiogTWFwcyBIVE1MIGF1dG9jb21wbGV0ZSBhdHRyaWJ1dGUgdmFsdWVzIHRvIHByb2ZpbGUgZmllbGQga2V5cyAqL1xuY29uc3QgQVVUT0NPTVBMRVRFX1RPX1BST0ZJTEU6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICdnaXZlbi1uYW1lJzogJ2ZpcnN0TmFtZScsXG4gICdhZGRpdGlvbmFsLW5hbWUnOiAnbWlkZGxlTmFtZScsXG4gICdmYW1pbHktbmFtZSc6ICdsYXN0TmFtZScsXG4gIG5hbWU6ICdmdWxsTmFtZScsXG4gICdob25vcmlmaWMtcHJlZml4JzogJ3ByZWZpeCcsXG4gICdob25vcmlmaWMtc3VmZml4JzogJ3N1ZmZpeCcsXG4gIG5pY2tuYW1lOiAnbmlja25hbWUnLFxuICBlbWFpbDogJ2VtYWlsJyxcbiAgdGVsOiAncGhvbmUnLFxuICAndGVsLW5hdGlvbmFsJzogJ3Bob25lJyxcbiAgJ3RlbC1sb2NhbCc6ICdwaG9uZScsXG4gICdzdHJlZXQtYWRkcmVzcyc6ICdzdHJlZXRBZGRyZXNzJyxcbiAgJ2FkZHJlc3MtbGluZTEnOiAnc3RyZWV0QWRkcmVzcycsXG4gICdhZGRyZXNzLWxpbmUyJzogJ3N0cmVldEFkZHJlc3MyJyxcbiAgJ2FkZHJlc3MtbGV2ZWwyJzogJ2NpdHknLFxuICAnYWRkcmVzcy1sZXZlbDEnOiAnc3RhdGUnLFxuICAncG9zdGFsLWNvZGUnOiAnemlwQ29kZScsXG4gIGNvdW50cnk6ICdjb3VudHJ5JyxcbiAgJ2NvdW50cnktbmFtZSc6ICdjb3VudHJ5JyxcbiAgYmRheTogJ2RhdGVPZkJpcnRoJyxcbiAgJ2JkYXktZGF5JzogJ2JpcnRoRGF5JyxcbiAgJ2JkYXktbW9udGgnOiAnYmlydGhNb250aCcsXG4gICdiZGF5LXllYXInOiAnYmlydGhZZWFyJyxcbiAgc2V4OiAnZ2VuZGVyJyxcbiAgb3JnYW5pemF0aW9uOiAnY29tcGFueScsXG4gICdvcmdhbml6YXRpb24tdGl0bGUnOiAnam9iVGl0bGUnLFxuICB1cmw6ICd3ZWJzaXRlJyxcbiAgdXNlcm5hbWU6ICd1c2VybmFtZScsXG4gICd0ZWwtY291bnRyeS1jb2RlJzogJ3Bob25lQ291bnRyeUNvZGUnLFxuICAnYWRkcmVzcy1sZXZlbDMnOiAnZGlzdHJpY3QnLFxuICAnY2MtbmFtZSc6ICdjYXJkaG9sZGVyTmFtZScsXG4gICdjYy1udW1iZXInOiAnY2FyZE51bWJlcicsXG4gICdjYy1leHAnOiAnY2FyZEV4cGlyeScsXG4gICdjYy1jc2MnOiAnY2FyZENWQycsXG59O1xuXG4vKiogTWFwcyBwcm9maWxlIGtleXMgdG8gcmVnZXggcGF0dGVybnMgdGhhdCBtYXRjaCBmaWVsZCBuYW1lcy9sYWJlbHNcbiAqIEluY2x1ZGVzIGludGVybmF0aW9uYWwgdmFyaWFudHMgZnJvbSBCaXR3YXJkZW4gKE1JVC1saWNlbnNlZCkgKi9cbmNvbnN0IFBST0ZJTEVfS0VZX1BBVFRFUk5TOiBSZWNvcmQ8c3RyaW5nLCBSZWdFeHA+ID0ge1xuICBmaXJzdE5hbWU6IC9cXGIoZmlyc3RbLV9cXHNdP25hbWV8Zm5hbWV8Z2l2ZW5bLV9cXHNdP25hbWV8Zm9yZW5hbWV8dm9ybmFtZXxwcmVub218bm9tYnJlKVxcYi9pLFxuICBtaWRkbGVOYW1lOiAvXFxiKG1pZGRsZVstX1xcc10/bmFtZXxtbmFtZXx6d2VpdGVyWy1fXFxzXT9uYW1lKVxcYi9pLFxuICBsYXN0TmFtZTogL1xcYihsYXN0Wy1fXFxzXT9uYW1lfGxuYW1lfGZhbWlseVstX1xcc10/bmFtZXxzdXJuYW1lfG5hY2huYW1lfG5vbVstX1xcc10/ZGVbLV9cXHNdP2ZhbWlsbGV8YXBlbGxpZG8pXFxiL2ksXG4gIGZ1bGxOYW1lOiAvXFxiKGZ1bGxbLV9cXHNdP25hbWV8eW91clstX1xcc10/bmFtZXxuYW1lfGFucmVkZSlcXGIvaSxcbiAgdXNlcm5hbWU6IC9cXGIodXNlclstX1xcc10/bmFtZXxzY3JlZW5bLV9cXHNdP25hbWV8bG9naW5bLV9cXHNdP25hbWV8bG9naW5bLV9cXHNdP2lkfGJlbnV0emVybmFtZSlcXGIvaSxcbiAgZW1haWw6IC9cXGIoZVstX1xcc10/bWFpbHxlbWFpbFstX1xcc10/YWRkcmVzc3xjb3JyZW8pXFxiL2ksXG4gIHBob25lOiAvXFxiKHBob25lfHRlbGVwaG9uZXx0ZWx8bW9iaWxlfGNlbGxbLV9cXHNdP3Bob25lfGNvbnRhY3RbLV9cXHNdP251bWJlcnx0ZWxlZm9ufGhhbmR5fHRlbGVmb25vfG51bWVyb1stX1xcc10/ZGVbLV9cXHNdP3RlbGVwaG9uZSlcXGIvaSxcbiAgc3RyZWV0QWRkcmVzczogL1xcYihzdHJlZXR8YWRkcmVzc1stX1xcc10/MXxhZGRyZXNzWy1fXFxzXT9saW5lWy1fXFxzXT8xfHN0cmVldFstX1xcc10/YWRkcmVzc3xtYWlsaW5nWy1fXFxzXT9hZGRyZXNzfGFkZHJ8c3RyYXNzZXxzdHJhw59lfHJ1ZXxkaXJlY2Npb258Y2FsbGUpXFxiL2ksXG4gIHN0cmVldEFkZHJlc3MyOiAvXFxiKGFkZHJlc3NbLV9cXHNdPzJ8YWRkcmVzc1stX1xcc10/bGluZVstX1xcc10/MnxhcHR8c3VpdGV8dW5pdHx6dXNhdHopXFxiL2ksXG4gIGNpdHk6IC9cXGIoY2l0eXx0b3dufG11bmljaXBhbGl0eXxsb2NhbGl0eXxzdGFkdHx2aWxsZXxjaXVkYWR8b3J0KVxcYi9pLFxuICBzdGF0ZTogL1xcYihzdGF0ZXxwcm92aW5jZXxyZWdpb258YnVuZGVzbGFuZHxkZXBhcnRlbWVudHxwcm92aW5jaWF8a2FudG9uKVxcYi9pLFxuICB6aXBDb2RlOiAvXFxiKHppcHx6aXBbLV9cXHNdP2NvZGV8cG9zdGFsWy1fXFxzXT9jb2RlfHBvc3Rjb2RlfHBsenxjb2RlWy1fXFxzXT9wb3N0YWx8Y29kaWdvWy1fXFxzXT9wb3N0YWwpXFxiL2ksXG4gIGNvdW50cnk6IC9cXGIoY291bnRyeXxuYXRpb258bGFuZHxwYXlzfHBhaXMpXFxiL2ksXG4gIGRhdGVPZkJpcnRoOiAvXFxiKGRhdGVbLV9cXHNdP29mWy1fXFxzXT9iaXJ0aHxkb2J8YmlydGhbLV9cXHNdP2RhdGV8YmlydGhkYXl8Z2VidXJ0c2RhdHVtfGZlY2hhWy1fXFxzXT9kZVstX1xcc10/bmFjaW1pZW50bylcXGIvaSxcbiAgYmlydGhEYXk6IC9cXGIoYmlydGhbLV9cXHNdP2RheXxkYXlbLV9cXHNdP29mWy1fXFxzXT9iaXJ0aHxnZWJ1cnRzdGFnKVxcYi9pLFxuICBiaXJ0aE1vbnRoOiAvXFxiKGJpcnRoWy1fXFxzXT9tb250aHxtb250aFstX1xcc10/b2ZbLV9cXHNdP2JpcnRofGdlYnVydHNtb25hdClcXGIvaSxcbiAgYmlydGhZZWFyOiAvXFxiKGJpcnRoWy1fXFxzXT95ZWFyfHllYXJbLV9cXHNdP29mWy1fXFxzXT9iaXJ0aHxnZWJ1cnRzamFocilcXGIvaSxcbiAgZ2VuZGVyOiAvXFxiKGdlbmRlcnxzZXh8Z2VzY2hsZWNodHxzZXhlfGdlbmVybylcXGIvaSxcbiAgY29tcGFueTogL1xcYihjb21wYW55fG9yZ2FuaXphdGlvbnxlbXBsb3llcnxidXNpbmVzc3xmaXJtYXx1bnRlcm5laG1lbnxlbnRyZXByaXNlfGVtcHJlc2EpXFxiL2ksXG4gIGpvYlRpdGxlOiAvXFxiKGpvYlstX1xcc10/dGl0bGV8dGl0bGV8cG9zaXRpb258cm9sZXxvY2N1cGF0aW9ufGJlcnVmfGJlcnVmc2JlemVpY2hudW5nfHRpdHVsbylcXGIvaSxcbiAgc3NuOiAvXFxiKHNzbnxzb2NpYWxbLV9cXHNdP3NlY3VyaXR5fHRheFstX1xcc10/aWR8dGlufHN0ZXVlclstX1xcc10/aWQpXFxiL2ksXG4gIHdlYnNpdGU6IC9cXGIod2Vic2l0ZXx1cmx8aG9tZXBhZ2V8d2ViWy1fXFxzXT9hZGRyZXNzfHdlYnNlaXRlKVxcYi9pLFxuICBkcml2ZXJzTGljZW5zZTogL1xcYihkcml2ZXInP3M/Wy1fXFxzXT9saWNlbltzY11lfGRsWy1fXFxzXT9udW1iZXJ8ZnVlaHJlcnNjaGVpbnxmw7xocmVyc2NoZWluKVxcYi9pLFxuICBwYXNzcG9ydE51bWJlcjogL1xcYihwYXNzcG9ydFstX1xcc10/bnVtYmVyfHBhc3Nwb3J0fHJlaXNlcGFzcylcXGIvaSxcbn07XG5cbi8qKiBNYXBzIEZpZWxkVHlwZSB0byBsaWtlbHkgcHJvZmlsZSBrZXlzIChmb3IgdHlwZS1iYXNlZCBtYXRjaGluZykgKi9cbmNvbnN0IFRZUEVfVE9fUFJPRklMRV9LRVlTOiBQYXJ0aWFsPFJlY29yZDxGaWVsZFR5cGUsIHN0cmluZ1tdPj4gPSB7XG4gIFtGaWVsZFR5cGUuRU1BSUxdOiBbJ2VtYWlsJ10sXG4gIFtGaWVsZFR5cGUuUEhPTkVdOiBbJ3Bob25lJ10sXG4gIFtGaWVsZFR5cGUuREFURV06IFsnZGF0ZU9mQmlydGgnXSxcbiAgW0ZpZWxkVHlwZS5TU05dOiBbJ3NzbiddLFxuICBbRmllbGRUeXBlLkFERFJFU1NdOiBbJ3N0cmVldEFkZHJlc3MnLCAnY2l0eScsICdzdGF0ZScsICd6aXBDb2RlJywgJ2NvdW50cnknXSxcbn07XG5cbi8qKiBOb3JtYWxpemUgYSBzdHJpbmcgZm9yIGZ1enp5IGNvbXBhcmlzb24gKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBzdHJcbiAgICAudG9Mb3dlckNhc2UoKVxuICAgIC5yZXBsYWNlKC9bLV9cXHNdKy9nLCAnJylcbiAgICAucmVwbGFjZSgvW15hLXowLTldL2csICcnKTtcbn1cblxuLyoqIFNpbXBsZSBMZXZlbnNodGVpbiBkaXN0YW5jZSAqL1xuZnVuY3Rpb24gbGV2ZW5zaHRlaW4oYTogc3RyaW5nLCBiOiBzdHJpbmcpOiBudW1iZXIge1xuICBjb25zdCByb3dzID0gYi5sZW5ndGggKyAxO1xuICBjb25zdCBjb2xzID0gYS5sZW5ndGggKyAxO1xuICBjb25zdCBtYXRyaXg6IG51bWJlcltdID0gbmV3IEFycmF5PG51bWJlcj4ocm93cyAqIGNvbHMpLmZpbGwoMCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzOyBpKyspIG1hdHJpeFtpICogY29sc10gPSBpO1xuICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbHM7IGorKykgbWF0cml4W2pdID0gajtcblxuICBmb3IgKGxldCBpID0gMTsgaSA8IHJvd3M7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAxOyBqIDwgY29sczsgaisrKSB7XG4gICAgICBjb25zdCBjb3N0ID0gYltpIC0gMV0gPT09IGFbaiAtIDFdID8gMCA6IDE7XG4gICAgICBtYXRyaXhbaSAqIGNvbHMgKyBqXSA9IE1hdGgubWluKFxuICAgICAgICAobWF0cml4WyhpIC0gMSkgKiBjb2xzICsgal0gPz8gMCkgKyAxLFxuICAgICAgICAobWF0cml4W2kgKiBjb2xzICsgKGogLSAxKV0gPz8gMCkgKyAxLFxuICAgICAgICAobWF0cml4WyhpIC0gMSkgKiBjb2xzICsgKGogLSAxKV0gPz8gMCkgKyBjb3N0LFxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1hdHJpeFtiLmxlbmd0aCAqIGNvbHMgKyBhLmxlbmd0aF0gPz8gMDtcbn1cblxuLyoqIENhbGN1bGF0ZSBzaW1pbGFyaXR5IGJldHdlZW4gdHdvIHN0cmluZ3MgKDAgdG8gMSkgKi9cbmZ1bmN0aW9uIHNpbWlsYXJpdHkoYTogc3RyaW5nLCBiOiBzdHJpbmcpOiBudW1iZXIge1xuICBjb25zdCBuYSA9IG5vcm1hbGl6ZShhKTtcbiAgY29uc3QgbmIgPSBub3JtYWxpemUoYik7XG4gIGlmIChuYSA9PT0gbmIpIHJldHVybiAxO1xuICBpZiAobmEubGVuZ3RoID09PSAwIHx8IG5iLmxlbmd0aCA9PT0gMCkgcmV0dXJuIDA7XG4gIGNvbnN0IG1heExlbiA9IE1hdGgubWF4KG5hLmxlbmd0aCwgbmIubGVuZ3RoKTtcbiAgcmV0dXJuIDEgLSBsZXZlbnNodGVpbihuYSwgbmIpIC8gbWF4TGVuO1xufVxuXG4vKiogQnVpbGQgYSBwcm9maWxlIG1hcCBmcm9tIHByb2ZpbGUgZmllbGRzIGFycmF5IChrZXkgLT4gYmVzdCB2YWx1ZSkgKi9cbmZ1bmN0aW9uIGJ1aWxkUHJvZmlsZU1hcChmaWVsZHM6IFByb2ZpbGVGaWVsZFtdKTogTWFwPHN0cmluZywgc3RyaW5nPiB7XG4gIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG4gIGZvciAoY29uc3QgZmllbGQgb2YgZmllbGRzKSB7XG4gICAgY29uc3QgZmlyc3RWYWx1ZSA9IGZpZWxkLnZhbHVlc1swXTtcbiAgICBpZiAoZmlyc3RWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBtYXAuc2V0KGZpZWxkLmtleSwgZmlyc3RWYWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBtYXA7XG59XG5cbi8qKiBHZXQgYWxsIHRleHQgaWRlbnRpZmllcnMgZm9yIGEgZmllbGQgKGZvciBtYXRjaGluZykgKi9cbmZ1bmN0aW9uIGdldEZpZWxkVGV4dHMoZmllbGQ6IERldGVjdGVkRmllbGQpOiBzdHJpbmdbXSB7XG4gIGNvbnN0IHRleHRzOiBzdHJpbmdbXSA9IFtdO1xuICBpZiAoZmllbGQubmFtZSkgdGV4dHMucHVzaChmaWVsZC5uYW1lKTtcbiAgaWYgKGZpZWxkLmxhYmVsKSB0ZXh0cy5wdXNoKGZpZWxkLmxhYmVsKTtcbiAgaWYgKGZpZWxkLmVsZW1lbnQuaWQpIHRleHRzLnB1c2goZmllbGQuZWxlbWVudC5pZCk7XG4gIGlmICgoZmllbGQuZWxlbWVudCBhcyBIVE1MSW5wdXRFbGVtZW50KS5wbGFjZWhvbGRlcikge1xuICAgIHRleHRzLnB1c2goKGZpZWxkLmVsZW1lbnQgYXMgSFRNTElucHV0RWxlbWVudCkucGxhY2Vob2xkZXIpO1xuICB9XG4gIHJldHVybiB0ZXh0cztcbn1cblxuLyoqIE1hdGNoIGEgc2luZ2xlIGZpZWxkIHRvIHByb2ZpbGUgZGF0YSwgcmV0dXJuaW5nIGFsbCBwb3NzaWJsZSBtYXRjaGVzICovXG5mdW5jdGlvbiBtYXRjaEZpZWxkKGZpZWxkOiBEZXRlY3RlZEZpZWxkLCBwcm9maWxlTWFwOiBNYXA8c3RyaW5nLCBzdHJpbmc+KTogRmllbGRNYXRjaFtdIHtcbiAgY29uc3QgbWF0Y2hlczogRmllbGRNYXRjaFtdID0gW107XG4gIGNvbnN0IHNlZW4gPSBuZXcgU2V0PHN0cmluZz4oKTtcblxuICBmdW5jdGlvbiBhZGRNYXRjaChwcm9maWxlRmllbGQ6IHN0cmluZywgY29uZmlkZW5jZTogbnVtYmVyLCBtZXRob2Q6IE1hdGNoTWV0aG9kKTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWUgPSBwcm9maWxlTWFwLmdldChwcm9maWxlRmllbGQpO1xuICAgIGlmICghdmFsdWUgfHwgc2Vlbi5oYXMocHJvZmlsZUZpZWxkKSkgcmV0dXJuO1xuICAgIHNlZW4uYWRkKHByb2ZpbGVGaWVsZCk7XG4gICAgbWF0Y2hlcy5wdXNoKHsgcHJvZmlsZUZpZWxkLCB2YWx1ZSwgY29uZmlkZW5jZSwgbWF0Y2hNZXRob2Q6IG1ldGhvZCB9KTtcbiAgfVxuXG4gIC8vIExheWVyIDE6IEF1dG9jb21wbGV0ZSBhdHRyaWJ1dGVcbiAgaWYgKGZpZWxkLmF1dG9jb21wbGV0ZSkge1xuICAgIGNvbnN0IGF1dG9jb21wbGV0ZUtleSA9IGZpZWxkLmF1dG9jb21wbGV0ZS5yZXBsYWNlKC9eKHNoaXBwaW5nfGJpbGxpbmcpXFxzKy8sICcnKS50cmltKCk7XG4gICAgY29uc3QgcHJvZmlsZUtleSA9IEFVVE9DT01QTEVURV9UT19QUk9GSUxFW2F1dG9jb21wbGV0ZUtleV07XG4gICAgaWYgKHByb2ZpbGVLZXkpIHtcbiAgICAgIGFkZE1hdGNoKHByb2ZpbGVLZXksIDAuOTUsICdhdXRvY29tcGxldGUnKTtcbiAgICB9XG4gIH1cblxuICAvLyBMYXllciAyOiBJbnB1dCB0eXBlIG1hcHBpbmdcbiAgY29uc3QgdHlwZUtleXMgPSBUWVBFX1RPX1BST0ZJTEVfS0VZU1tmaWVsZC50eXBlXTtcbiAgaWYgKHR5cGVLZXlzKSB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgdHlwZUtleXMpIHtcbiAgICAgIGFkZE1hdGNoKGtleSwgMC44NSwgJ3R5cGUnKTtcbiAgICB9XG4gIH1cblxuICAvLyBMYXllciAzOiBOYW1lL2xhYmVsIHJlZ2V4IHBhdHRlcm5zXG4gIGNvbnN0IHRleHRzID0gZ2V0RmllbGRUZXh0cyhmaWVsZCk7XG4gIGZvciAoY29uc3QgW3Byb2ZpbGVLZXksIHBhdHRlcm5dIG9mIE9iamVjdC5lbnRyaWVzKFBST0ZJTEVfS0VZX1BBVFRFUk5TKSkge1xuICAgIGZvciAoY29uc3QgdGV4dCBvZiB0ZXh0cykge1xuICAgICAgaWYgKHBhdHRlcm4udGVzdCh0ZXh0KSkge1xuICAgICAgICBhZGRNYXRjaChwcm9maWxlS2V5LCAwLjgwLCAnbmFtZScpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBMYXllciA0OiBGdXp6eSBtYXRjaGluZyAob25seSBpZiBubyBoaWdoLWNvbmZpZGVuY2UgbWF0Y2hlcylcbiAgaWYgKG1hdGNoZXMubGVuZ3RoID09PSAwKSB7XG4gICAgZm9yIChjb25zdCB0ZXh0IG9mIHRleHRzKSB7XG4gICAgICBmb3IgKGNvbnN0IFtwcm9maWxlS2V5XSBvZiBwcm9maWxlTWFwKSB7XG4gICAgICAgIGNvbnN0IHNpbSA9IHNpbWlsYXJpdHkodGV4dCwgcHJvZmlsZUtleSk7XG4gICAgICAgIGlmIChzaW0gPj0gMC42KSB7XG4gICAgICAgICAgYWRkTWF0Y2gocHJvZmlsZUtleSwgc2ltICogMC42NCwgJ2Z1enp5Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBTb3J0IGJ5IGNvbmZpZGVuY2UgZGVzY2VuZGluZ1xuICBtYXRjaGVzLnNvcnQoKGEsIGIpID0+IGIuY29uZmlkZW5jZSAtIGEuY29uZmlkZW5jZSk7XG4gIHJldHVybiBtYXRjaGVzO1xufVxuXG4vKiogTWF0Y2ggYWxsIGRldGVjdGVkIGZpZWxkcyB0byBwcm9maWxlIGRhdGEgKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXRjaEZpZWxkcyhcbiAgZmllbGRzOiBEZXRlY3RlZEZpZWxkW10sXG4gIHByb2ZpbGVGaWVsZHM6IFByb2ZpbGVGaWVsZFtdLFxuKTogTWF0Y2hlZEZpZWxkW10ge1xuICBjb25zdCBwcm9maWxlTWFwID0gYnVpbGRQcm9maWxlTWFwKHByb2ZpbGVGaWVsZHMpO1xuICBjb25zdCByZXN1bHRzOiBNYXRjaGVkRmllbGRbXSA9IFtdO1xuXG4gIGZvciAoY29uc3QgZmllbGQgb2YgZmllbGRzKSB7XG4gICAgY29uc3QgbWF0Y2hlcyA9IG1hdGNoRmllbGQoZmllbGQsIHByb2ZpbGVNYXApO1xuICAgIGlmIChtYXRjaGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJlc3VsdHMucHVzaCh7IGZpZWxkLCBtYXRjaGVzIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHRzO1xufVxuXG4vKiogQnVpbGQgRmllbGRDb250ZXh0IGZyb20gYSBEZXRlY3RlZEZpZWxkIGZvciBMTE0gaW5mZXJlbmNlICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRGaWVsZENvbnRleHQoZmllbGQ6IERldGVjdGVkRmllbGQsIGluZGV4OiBudW1iZXIpOiBGaWVsZENvbnRleHQge1xuICBjb25zdCBlbCA9IGZpZWxkLmVsZW1lbnQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgcmV0dXJuIHtcbiAgICBpbmRleCxcbiAgICBuYW1lOiBmaWVsZC5uYW1lIHx8ICcnLFxuICAgIGxhYmVsOiBmaWVsZC5sYWJlbCB8fCAnJyxcbiAgICB0eXBlOiBmaWVsZC50eXBlLFxuICAgIGlucHV0VHlwZTogZWwudHlwZSB8fCAnJyxcbiAgICBhdXRvY29tcGxldGU6IGZpZWxkLmF1dG9jb21wbGV0ZSB8fCAnJyxcbiAgICBwbGFjZWhvbGRlcjogZWwucGxhY2Vob2xkZXIgfHwgJycsXG4gIH07XG59XG5cbi8qKiBNYXRjaCBmaWVsZHMgd2l0aCBoZXVyaXN0aWNzLCByZXR1cm5pbmcgYm90aCBtYXRjaGVkIGFuZCB1bm1hdGNoZWQgZm9yIExMTSBpbmZlcmVuY2UgKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXRjaEZpZWxkc0FzeW5jKFxuICBmaWVsZHM6IERldGVjdGVkRmllbGRbXSxcbiAgcHJvZmlsZUZpZWxkczogUHJvZmlsZUZpZWxkW10sXG4pOiB7IG1hdGNoZWQ6IE1hdGNoZWRGaWVsZFtdOyB1bm1hdGNoZWQ6IHsgZmllbGQ6IERldGVjdGVkRmllbGQ7IGNvbnRleHQ6IEZpZWxkQ29udGV4dCB9W10gfSB7XG4gIGNvbnN0IHByb2ZpbGVNYXAgPSBidWlsZFByb2ZpbGVNYXAocHJvZmlsZUZpZWxkcyk7XG4gIGNvbnN0IG1hdGNoZWQ6IE1hdGNoZWRGaWVsZFtdID0gW107XG4gIGNvbnN0IHVubWF0Y2hlZDogeyBmaWVsZDogRGV0ZWN0ZWRGaWVsZDsgY29udGV4dDogRmllbGRDb250ZXh0IH1bXSA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZmllbGRzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZmllbGQgPSBmaWVsZHNbaV0hO1xuICAgIGNvbnN0IG1hdGNoZXMgPSBtYXRjaEZpZWxkKGZpZWxkLCBwcm9maWxlTWFwKTtcbiAgICBpZiAobWF0Y2hlcy5sZW5ndGggPiAwKSB7XG4gICAgICBtYXRjaGVkLnB1c2goeyBmaWVsZCwgbWF0Y2hlcyB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdW5tYXRjaGVkLnB1c2goeyBmaWVsZCwgY29udGV4dDogYnVpbGRGaWVsZENvbnRleHQoZmllbGQsIGkpIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IG1hdGNoZWQsIHVubWF0Y2hlZCB9O1xufVxuIiwiLyoqXG4gKiBGb3JtIEZpbGxlciAtIERPTSBtYW5pcHVsYXRpb24gZm9yIGZpbGxpbmcgZm9ybSBmaWVsZHNcbiAqXG4gKiBVc2VzIG5hdGl2ZSB2YWx1ZSBzZXR0ZXJzIHRvIGVuc3VyZSBSZWFjdC9WdWUvQW5ndWxhciBkZXRlY3QgY2hhbmdlcy5cbiAqIEhhbmRsZXMgaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEsIGFuZCBkYXRlIGZpZWxkcy5cbiAqL1xuXG5pbXBvcnQgdHlwZSB7IE1hdGNoZWRGaWVsZCwgRmlsbFJlc3VsdCB9IGZyb20gJy4uL3NoYXJlZC90eXBlcy9maWVsZC1tYXRjaGluZyc7XG5cbnR5cGUgRm9ybUVsZW1lbnQgPSBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFNlbGVjdEVsZW1lbnQgfCBIVE1MVGV4dEFyZWFFbGVtZW50O1xuXG4vKiogR2V0IHRoZSBuYXRpdmUgdmFsdWUgc2V0dGVyIGZvciBhbiBpbnB1dCBlbGVtZW50IChieXBhc3NlcyBmcmFtZXdvcmsgZ2V0dGVycykgKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZVNldHRlcihlbGVtZW50OiBGb3JtRWxlbWVudCk6ICgodjogc3RyaW5nKSA9PiB2b2lkKSB8IG51bGwge1xuICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihIVE1MSW5wdXRFbGVtZW50LnByb3RvdHlwZSwgJ3ZhbHVlJyk/LnNldCA/PyBudWxsO1xuICB9XG4gIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKEhUTUxUZXh0QXJlYUVsZW1lbnQucHJvdG90eXBlLCAndmFsdWUnKT8uc2V0ID8/IG51bGw7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKiBEaXNwYXRjaCBpbnB1dC9jaGFuZ2UgZXZlbnRzIHNvIGZyYW1ld29ya3MgZGV0ZWN0IHRoZSB2YWx1ZSBjaGFuZ2UgKi9cbmZ1bmN0aW9uIGRpc3BhdGNoQ2hhbmdlRXZlbnRzKGVsZW1lbnQ6IEZvcm1FbGVtZW50KTogdm9pZCB7XG4gIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2lucHV0JywgeyBidWJibGVzOiB0cnVlIH0pKTtcbiAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJywgeyBidWJibGVzOiB0cnVlIH0pKTtcbiAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnYmx1cicsIHsgYnViYmxlczogdHJ1ZSB9KSk7XG59XG5cbi8qKiBGb3JtYXQgYSBkYXRlIHN0cmluZyB0byBZWVlZLU1NLUREIGZvciBkYXRlIGlucHV0cyAqL1xuZnVuY3Rpb24gZm9ybWF0RGF0ZVZhbHVlKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAvLyBBbHJlYWR5IGluIFlZWVktTU0tREQgZm9ybWF0XG4gIGlmICgvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdCh2YWx1ZSkpIHJldHVybiB2YWx1ZTtcblxuICBjb25zdCBwYXJzZWQgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gIGlmICghaXNOYU4ocGFyc2VkLmdldFRpbWUoKSkpIHtcbiAgICByZXR1cm4gcGFyc2VkLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSA/PyB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbi8qKiBGaWxsIGEgc2VsZWN0IGVsZW1lbnQgYnkgbWF0Y2hpbmcgb3B0aW9uIHZhbHVlIG9yIHRleHQgKi9cbmZ1bmN0aW9uIGZpbGxTZWxlY3RGaWVsZChlbGVtZW50OiBIVE1MU2VsZWN0RWxlbWVudCwgdmFsdWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBjb25zdCBub3JtYWxpemVkVmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcbiAgY29uc3Qgb3B0aW9ucyA9IEFycmF5LmZyb20oZWxlbWVudC5vcHRpb25zKTtcblxuICAvLyBNYXRjaCBieSBvcHRpb24gdmFsdWUgKGV4YWN0KVxuICBjb25zdCBieVZhbHVlID0gb3B0aW9ucy5maW5kKChvcHQpID0+IG9wdC52YWx1ZS50b0xvd2VyQ2FzZSgpID09PSBub3JtYWxpemVkVmFsdWUpO1xuICBpZiAoYnlWYWx1ZSkge1xuICAgIGVsZW1lbnQudmFsdWUgPSBieVZhbHVlLnZhbHVlO1xuICAgIGRpc3BhdGNoQ2hhbmdlRXZlbnRzKGVsZW1lbnQpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gTWF0Y2ggYnkgb3B0aW9uIHRleHQgKGV4YWN0KVxuICBjb25zdCBieVRleHQgPSBvcHRpb25zLmZpbmQoKG9wdCkgPT4gb3B0LnRleHQudG9Mb3dlckNhc2UoKS50cmltKCkgPT09IG5vcm1hbGl6ZWRWYWx1ZSk7XG4gIGlmIChieVRleHQpIHtcbiAgICBlbGVtZW50LnZhbHVlID0gYnlUZXh0LnZhbHVlO1xuICAgIGRpc3BhdGNoQ2hhbmdlRXZlbnRzKGVsZW1lbnQpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gTWF0Y2ggYnkgb3B0aW9uIHRleHQgKGNvbnRhaW5zKVxuICBjb25zdCBieUNvbnRhaW5zID0gb3B0aW9ucy5maW5kKFxuICAgIChvcHQpID0+XG4gICAgICBvcHQudGV4dC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKG5vcm1hbGl6ZWRWYWx1ZSkgfHxcbiAgICAgIG5vcm1hbGl6ZWRWYWx1ZS5pbmNsdWRlcyhvcHQudGV4dC50b0xvd2VyQ2FzZSgpLnRyaW0oKSksXG4gICk7XG4gIGlmIChieUNvbnRhaW5zKSB7XG4gICAgZWxlbWVudC52YWx1ZSA9IGJ5Q29udGFpbnMudmFsdWU7XG4gICAgZGlzcGF0Y2hDaGFuZ2VFdmVudHMoZWxlbWVudCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKiBGaWxsIGEgc2luZ2xlIGlucHV0IG9yIHRleHRhcmVhIGZpZWxkIHVzaW5nIG5hdGl2ZSBzZXR0ZXIgKi9cbmZ1bmN0aW9uIGZpbGxJbnB1dEZpZWxkKGVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MVGV4dEFyZWFFbGVtZW50LCB2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGNvbnN0IGlucHV0VHlwZSA9IChlbGVtZW50IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnR5cGU/LnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGZpbGxWYWx1ZSA9IGlucHV0VHlwZSA9PT0gJ2RhdGUnID8gZm9ybWF0RGF0ZVZhbHVlKHZhbHVlKSA6IHZhbHVlO1xuXG4gIGNvbnN0IG5hdGl2ZVNldHRlciA9IGdldE5hdGl2ZVNldHRlcihlbGVtZW50KTtcbiAgaWYgKG5hdGl2ZVNldHRlcikge1xuICAgIG5hdGl2ZVNldHRlci5jYWxsKGVsZW1lbnQsIGZpbGxWYWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgZWxlbWVudC52YWx1ZSA9IGZpbGxWYWx1ZTtcbiAgfVxuXG4gIGVsZW1lbnQuZm9jdXMoKTtcbiAgZGlzcGF0Y2hDaGFuZ2VFdmVudHMoZWxlbWVudCk7XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKiogRmlsbCBhIHNpbmdsZSBmb3JtIGZpZWxkIHdpdGggYSB2YWx1ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbGxGaWVsZChlbGVtZW50OiBGb3JtRWxlbWVudCwgdmFsdWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICB0cnkge1xuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBmaWxsU2VsZWN0RmllbGQoZWxlbWVudCwgdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gZmlsbElucHV0RmllbGQoZWxlbWVudCBhcyBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFRleHRBcmVhRWxlbWVudCwgdmFsdWUpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0ludGVsbGlGaWxsOiBFcnJvciBmaWxsaW5nIGZpZWxkJywgZXJyb3IpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vKipcbiAqIEZpbGwgYWxsIG1hdGNoZWQgZmllbGRzIHRoYXQgaGF2ZSBleGFjdGx5IG9uZSBtYXRjaCAodW5hbWJpZ3VvdXMpLlxuICogRmllbGRzIHdpdGggbXVsdGlwbGUgbWF0Y2hlcyBhcmUgc2tpcHBlZCAodXNlciBzaG91bGQgc2VsZWN0IGZyb20gZHJvcGRvd24pLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmlsbEFsbEZpZWxkcyhtYXRjaGVkRmllbGRzOiBNYXRjaGVkRmllbGRbXSk6IEZpbGxSZXN1bHQge1xuICBjb25zdCByZXN1bHQ6IEZpbGxSZXN1bHQgPSB7IGZpbGxlZDogMCwgc2tpcHBlZDogMCwgZmFpbGVkOiAwIH07XG5cbiAgZm9yIChjb25zdCB7IGZpZWxkLCBtYXRjaGVzIH0gb2YgbWF0Y2hlZEZpZWxkcykge1xuICAgIC8vIFNraXAgZmllbGRzIHdpdGggbXVsdGlwbGUgbWF0Y2hlcyAtLSB1c2VyIG11c3QgY2hvb3NlXG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoICE9PSAxKSB7XG4gICAgICByZXN1bHQuc2tpcHBlZCsrO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gU2tpcCBmaWVsZHMgdGhhdCBhbHJlYWR5IGhhdmUgYSB2YWx1ZVxuICAgIGlmICgoZmllbGQuZWxlbWVudCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZT8udHJpbSgpKSB7XG4gICAgICByZXN1bHQuc2tpcHBlZCsrO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgY29uc3QgbWF0Y2ggPSBtYXRjaGVzWzBdO1xuICAgIGlmICghbWF0Y2gpIHtcbiAgICAgIHJlc3VsdC5za2lwcGVkKys7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgY29uc3Qgc3VjY2VzcyA9IGZpbGxGaWVsZChmaWVsZC5lbGVtZW50LCBtYXRjaC52YWx1ZSk7XG4gICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgIHJlc3VsdC5maWxsZWQrKztcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0LmZhaWxlZCsrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4iLCIvKiogRGVmYXVsdCBBUEkgYmFzZSBVUkwgKHByb2R1Y3Rpb24pICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9BUElfVVJMID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMi9hcGknO1xuXG4vKiogUHJvZmlsZSBjYWNoZSBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHMgKDUgbWludXRlcykgKi9cbmV4cG9ydCBjb25zdCBDQUNIRV9EVVJBVElPTl9NUyA9IDUgKiA2MCAqIDEwMDA7XG5cbi8qKiBEZWJvdW5jZSBkZWxheSBmb3IgaW5wdXQgZXZlbnRzIChtaWxsaXNlY29uZHMpICovXG5leHBvcnQgY29uc3QgREVCT1VOQ0VfREVMQVlfTVMgPSAzMDA7XG5cbi8qKiBNYXhpbXVtIGF1dG9jb21wbGV0ZSBzdWdnZXN0aW9ucyB0byBzaG93ICovXG5leHBvcnQgY29uc3QgTUFYX1NVR0dFU1RJT05TID0gNTtcblxuLyoqIFByb2ZpbGUgcmVmcmVzaCBpbnRlcnZhbCAobWludXRlcykgZm9yIGNocm9tZS5hbGFybXMgKi9cbmV4cG9ydCBjb25zdCBQUk9GSUxFX1JFRlJFU0hfTUlOVVRFUyA9IDU7XG4iLCIvKipcbiAqIEF1dG9jb21wbGV0ZSBVSSAtIFNoYWRvdyBET00gYmFzZWQgYXV0b2NvbXBsZXRlIGZvciBtYXRjaGVkIGZvcm0gZmllbGRzXG4gKlxuICogUmVuZGVycyBiYWRnZSBpbmRpY2F0b3JzIG9uIG1hdGNoZWQgZmllbGRzIGFuZCBkcm9wZG93biBtZW51c1xuICogd2l0aCBwcm9maWxlIHZhbHVlcy4gVXNlcyBTaGFkb3cgRE9NIGZvciBzdHlsZSBpc29sYXRpb24uXG4gKi9cblxuaW1wb3J0IHsgZmlsbEZpZWxkIH0gZnJvbSAnLi9mb3JtLWZpbGxlcic7XG5pbXBvcnQgeyBNQVhfU1VHR0VTVElPTlMsIERFQk9VTkNFX0RFTEFZX01TIH0gZnJvbSAnLi4vc2hhcmVkL2NvbnN0YW50cyc7XG5pbXBvcnQgdHlwZSB7IE1hdGNoZWRGaWVsZCwgRmlsbFJlc3VsdCB9IGZyb20gJy4uL3NoYXJlZC90eXBlcy9maWVsZC1tYXRjaGluZyc7XG5cbnR5cGUgRm9ybUVsZW1lbnQgPSBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFNlbGVjdEVsZW1lbnQgfCBIVE1MVGV4dEFyZWFFbGVtZW50O1xuXG5pbnRlcmZhY2UgRmllbGRVSSB7XG4gIG1hdGNoZWRGaWVsZDogTWF0Y2hlZEZpZWxkO1xuICBiYWRnZTogSFRNTEVsZW1lbnQ7XG4gIGRyb3Bkb3duOiBIVE1MRWxlbWVudCB8IG51bGw7XG59XG5cbmNvbnN0IFNIQURPV19IT1NUX0lEID0gJ2ludGVsbGlmaWxsLWF1dG9jb21wbGV0ZS1yb290JztcblxuY29uc3QgU1RZTEVTID0gYFxuICA6aG9zdCB7XG4gICAgYWxsOiBpbml0aWFsO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICB3aWR0aDogMDtcbiAgICBoZWlnaHQ6IDA7XG4gICAgei1pbmRleDogMjE0NzQ4MzY0NztcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgfVxuXG4gIC5pZi1iYWRnZSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHdpZHRoOiAxOHB4O1xuICAgIGhlaWdodDogMThweDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgYmFja2dyb3VuZDogIzYzNjZmMTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xuICAgIGJveC1zaGFkb3c6IDAgMXB4IDNweCByZ2JhKDAsMCwwLDAuMik7XG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMTVzIGVhc2U7XG4gICAgei1pbmRleDogMjE0NzQ4MzY0NztcbiAgfVxuXG4gIC5pZi1iYWRnZTpob3ZlciB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjE1KTtcbiAgfVxuXG4gIC5pZi1iYWRnZSBzdmcge1xuICAgIHdpZHRoOiAxMHB4O1xuICAgIGhlaWdodDogMTBweDtcbiAgICBmaWxsOiB3aGl0ZTtcbiAgfVxuXG4gIC5pZi1kcm9wZG93biB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIG1pbi13aWR0aDogMjIwcHg7XG4gICAgbWF4LXdpZHRoOiAzNjBweDtcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZTJlOGYwO1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICBib3gtc2hhZG93OiAwIDRweCAxNnB4IHJnYmEoMCwwLDAsMC4xMik7XG4gICAgcG9pbnRlci1ldmVudHM6IGF1dG87XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB6LWluZGV4OiAyMTQ3NDgzNjQ3O1xuICAgIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFwiU2Vnb2UgVUlcIiwgUm9ib3RvLCBzYW5zLXNlcmlmO1xuICB9XG5cbiAgLmlmLWRyb3Bkb3duLWhlYWRlciB7XG4gICAgcGFkZGluZzogNnB4IDEwcHg7XG4gICAgZm9udC1zaXplOiAxMXB4O1xuICAgIGNvbG9yOiAjNjQ3NDhiO1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjFmNWY5O1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMDVlbTtcbiAgfVxuXG4gIC5pZi1kcm9wZG93bi1pdGVtIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIHBhZGRpbmc6IDhweCAxMHB4O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBmb250LXNpemU6IDEzcHg7XG4gICAgY29sb3I6ICMxZTI5M2I7XG4gICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjFzO1xuICB9XG5cbiAgLmlmLWRyb3Bkb3duLWl0ZW06aG92ZXIsXG4gIC5pZi1kcm9wZG93bi1pdGVtLmlmLWFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZDogI2YxZjVmOTtcbiAgfVxuXG4gIC5pZi1kcm9wZG93bi1pdGVtLXZhbHVlIHtcbiAgICBmbGV4OiAxO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICBtYXJnaW4tcmlnaHQ6IDhweDtcbiAgfVxuXG4gIC5pZi1kcm9wZG93bi1pdGVtLWNvbmZpZGVuY2Uge1xuICAgIGZvbnQtc2l6ZTogMTBweDtcbiAgICBwYWRkaW5nOiAycHggNXB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBmbGV4LXNocmluazogMDtcbiAgfVxuXG4gIC5pZi1jb25maWRlbmNlLWhpZ2gge1xuICAgIGJhY2tncm91bmQ6ICNkY2ZjZTc7XG4gICAgY29sb3I6ICMxNjY1MzQ7XG4gIH1cblxuICAuaWYtY29uZmlkZW5jZS1tZWRpdW0ge1xuICAgIGJhY2tncm91bmQ6ICNmZWY5YzM7XG4gICAgY29sb3I6ICM4NTRkMGU7XG4gIH1cblxuICAuaWYtY29uZmlkZW5jZS1sb3cge1xuICAgIGJhY2tncm91bmQ6ICNmZWUyZTI7XG4gICAgY29sb3I6ICM5OTFiMWI7XG4gIH1cblxuICAuaWYtdG9hc3Qge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICBib3R0b206IDI0cHg7XG4gICAgcmlnaHQ6IDI0cHg7XG4gICAgYmFja2dyb3VuZDogIzFlMjkzYjtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgcGFkZGluZzogMTBweCAxOHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICBmb250LXNpemU6IDEzcHg7XG4gICAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgXCJTZWdvZSBVSVwiLCBSb2JvdG8sIHNhbnMtc2VyaWY7XG4gICAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsMCwwLDAuMTUpO1xuICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDhweCk7XG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzLCB0cmFuc2Zvcm0gMC4ycztcbiAgICB6LWluZGV4OiAyMTQ3NDgzNjQ3O1xuICB9XG5cbiAgLmlmLXRvYXN0LmlmLXZpc2libGUge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICB9XG5gO1xuXG5mdW5jdGlvbiBjcmVhdGVCYWRnZVNWRygpOiBTVkdTVkdFbGVtZW50IHtcbiAgY29uc3Qgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdzdmcnKTtcbiAgc3ZnLnNldEF0dHJpYnV0ZSgndmlld0JveCcsICcwIDAgMjQgMjQnKTtcbiAgY29uc3QgcGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAncGF0aCcpO1xuICBwYXRoLnNldEF0dHJpYnV0ZSgnZCcsICdNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptLTIgMTVsLTUtNSAxLjQxLTEuNDFMMTAgMTQuMTdsNy41OS03LjU5TDE5IDhsLTkgOXonKTtcbiAgc3ZnLmFwcGVuZENoaWxkKHBhdGgpO1xuICByZXR1cm4gc3ZnO1xufVxuXG5leHBvcnQgY2xhc3MgQXV0b2NvbXBsZXRlTWFuYWdlciB7XG4gIHByaXZhdGUgc2hhZG93SG9zdDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBzaGFkb3dSb290OiBTaGFkb3dSb290IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgZmllbGRVSU1hcCA9IG5ldyBNYXA8Rm9ybUVsZW1lbnQsIEZpZWxkVUk+KCk7XG4gIHByaXZhdGUgZm9jdXNMaXN0ZW5lcnMgPSBuZXcgTWFwPEZvcm1FbGVtZW50LCAoKSA9PiB2b2lkPigpO1xuICBwcml2YXRlIGFjdGl2ZURyb3Bkb3duOiB7IGVsZW1lbnQ6IEZvcm1FbGVtZW50OyBpbmRleDogbnVtYmVyIH0gfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBtdXRhdGlvbk9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgc2Nyb2xsSGFuZGxlcjogKCgpID0+IHZvaWQpIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgcmVwb3NpdGlvblRpbWVyOiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiB8IG51bGwgPSBudWxsO1xuXG4gIC8qKiBJbml0aWFsaXplIHRoZSBTaGFkb3cgRE9NIGNvbnRhaW5lciAqL1xuICBpbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNoYWRvd0hvc3QpIHJldHVybjtcblxuICAgIHRoaXMuc2hhZG93SG9zdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuc2hhZG93SG9zdC5pZCA9IFNIQURPV19IT1NUX0lEO1xuICAgIHRoaXMuc2hhZG93SG9zdC5zdHlsZS5jc3NUZXh0ID0gJ3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDt3aWR0aDowO2hlaWdodDowO292ZXJmbG93OnZpc2libGU7ei1pbmRleDoyMTQ3NDgzNjQ3O3BvaW50ZXItZXZlbnRzOm5vbmU7JztcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuc2hhZG93SG9zdCk7XG5cbiAgICB0aGlzLnNoYWRvd1Jvb3QgPSB0aGlzLnNoYWRvd0hvc3QuYXR0YWNoU2hhZG93KHsgbW9kZTogJ2Nsb3NlZCcgfSk7XG4gICAgY29uc3Qgc3R5bGVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgc3R5bGVFbC50ZXh0Q29udGVudCA9IFNUWUxFUztcbiAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoc3R5bGVFbCk7XG5cbiAgICAvLyBUcmFjayBzY3JvbGwvcmVzaXplIHRvIHJlcG9zaXRpb24gYmFkZ2VzIGFuZCBkcm9wZG93bnNcbiAgICB0aGlzLnNjcm9sbEhhbmRsZXIgPSB0aGlzLmRlYm91bmNlKCgpID0+IHRoaXMucmVwb3NpdGlvbkFsbCgpLCA1MCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsSGFuZGxlciwgdHJ1ZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuc2Nyb2xsSGFuZGxlcik7XG5cbiAgICAvLyBPYnNlcnZlIERPTSBmb3IgcmVtb3ZlZCBmaWVsZHNcbiAgICB0aGlzLm11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zKSA9PiB7XG4gICAgICBmb3IgKGNvbnN0IG11dGF0aW9uIG9mIG11dGF0aW9ucykge1xuICAgICAgICBtdXRhdGlvbi5yZW1vdmVkTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgdGhpcy5jbGVhbnVwUmVtb3ZlZEVsZW1lbnRzKG5vZGUgYXMgRWxlbWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLm11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIC8qKiBBdHRhY2ggYXV0b2NvbXBsZXRlIFVJIHRvIG1hdGNoZWQgZmllbGRzICovXG4gIGF0dGFjaFRvRmllbGRzKG1hdGNoZWRGaWVsZHM6IE1hdGNoZWRGaWVsZFtdKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnNoYWRvd1Jvb3QpIHRoaXMuaW5pdCgpO1xuXG4gICAgZm9yIChjb25zdCBtYXRjaGVkRmllbGQgb2YgbWF0Y2hlZEZpZWxkcykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IG1hdGNoZWRGaWVsZC5maWVsZC5lbGVtZW50O1xuICAgICAgaWYgKHRoaXMuZmllbGRVSU1hcC5oYXMoZWxlbWVudCkpIGNvbnRpbnVlO1xuXG4gICAgICBjb25zdCBiYWRnZSA9IHRoaXMuY3JlYXRlQmFkZ2UoZWxlbWVudCwgbWF0Y2hlZEZpZWxkKTtcbiAgICAgIGNvbnN0IHVpOiBGaWVsZFVJID0geyBtYXRjaGVkRmllbGQsIGJhZGdlLCBkcm9wZG93bjogbnVsbCB9O1xuICAgICAgdGhpcy5maWVsZFVJTWFwLnNldChlbGVtZW50LCB1aSk7XG5cbiAgICAgIC8vIFNob3cgZHJvcGRvd24gb24gZmllbGQgZm9jdXMgKHRyYWNrZWQgZm9yIGNsZWFudXApXG4gICAgICBjb25zdCBmb2N1c0hhbmRsZXIgPSAoKSA9PiB0aGlzLnNob3dEcm9wZG93bihlbGVtZW50KTtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBmb2N1c0hhbmRsZXIpO1xuICAgICAgdGhpcy5mb2N1c0xpc3RlbmVycy5zZXQoZWxlbWVudCwgZm9jdXNIYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICAvKiogUmVtb3ZlIGFsbCBVSSBlbGVtZW50cyBhbmQgbGlzdGVuZXJzICovXG4gIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG5cbiAgICBmb3IgKGNvbnN0IFtlbGVtZW50LCB1aV0gb2YgdGhpcy5maWVsZFVJTWFwKSB7XG4gICAgICB1aS5iYWRnZS5yZW1vdmUoKTtcbiAgICAgIGlmICh1aS5kcm9wZG93bikgdWkuZHJvcGRvd24ucmVtb3ZlKCk7XG4gICAgICBjb25zdCBmb2N1c0hhbmRsZXIgPSB0aGlzLmZvY3VzTGlzdGVuZXJzLmdldChlbGVtZW50KTtcbiAgICAgIGlmIChmb2N1c0hhbmRsZXIpIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBmb2N1c0hhbmRsZXIpO1xuICAgIH1cbiAgICB0aGlzLmZpZWxkVUlNYXAuY2xlYXIoKTtcbiAgICB0aGlzLmZvY3VzTGlzdGVuZXJzLmNsZWFyKCk7XG5cbiAgICBpZiAodGhpcy5zY3JvbGxIYW5kbGVyKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5zY3JvbGxIYW5kbGVyLCB0cnVlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnNjcm9sbEhhbmRsZXIpO1xuICAgIH1cbiAgICBpZiAodGhpcy5tdXRhdGlvbk9ic2VydmVyKSB0aGlzLm11dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIGlmICh0aGlzLnJlcG9zaXRpb25UaW1lcikgY2xlYXJUaW1lb3V0KHRoaXMucmVwb3NpdGlvblRpbWVyKTtcblxuICAgIGlmICh0aGlzLnNoYWRvd0hvc3QpIHtcbiAgICAgIHRoaXMuc2hhZG93SG9zdC5yZW1vdmUoKTtcbiAgICAgIHRoaXMuc2hhZG93SG9zdCA9IG51bGw7XG4gICAgICB0aGlzLnNoYWRvd1Jvb3QgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBTaG93IGEgdG9hc3Qgbm90aWZpY2F0aW9uICovXG4gIHNob3dUb2FzdChtZXNzYWdlOiBzdHJpbmcsIGR1cmF0aW9uID0gMjUwMCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zaGFkb3dSb290KSByZXR1cm47XG5cbiAgICBjb25zdCB0b2FzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRvYXN0LmNsYXNzTmFtZSA9ICdpZi10b2FzdCc7XG4gICAgdG9hc3QudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICAgIHRoaXMuc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0b2FzdCk7XG5cbiAgICAvLyBUcmlnZ2VyIGFuaW1hdGlvblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0b2FzdC5jbGFzc0xpc3QuYWRkKCdpZi12aXNpYmxlJyk7XG4gICAgfSk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRvYXN0LmNsYXNzTGlzdC5yZW1vdmUoJ2lmLXZpc2libGUnKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdG9hc3QucmVtb3ZlKCksIDIwMCk7XG4gICAgfSwgZHVyYXRpb24pO1xuICB9XG5cbiAgLyoqIFNob3cgZmlsbC1hbGwgcmVzdWx0cyBhcyB0b2FzdCAqL1xuICBzaG93RmlsbFJlc3VsdChyZXN1bHQ6IEZpbGxSZXN1bHQpOiB2b2lkIHtcbiAgICBjb25zdCBwYXJ0czogc3RyaW5nW10gPSBbXTtcbiAgICBpZiAocmVzdWx0LmZpbGxlZCA+IDApIHBhcnRzLnB1c2goYCR7cmVzdWx0LmZpbGxlZH0gZmlsbGVkYCk7XG4gICAgaWYgKHJlc3VsdC5za2lwcGVkID4gMCkgcGFydHMucHVzaChgJHtyZXN1bHQuc2tpcHBlZH0gc2tpcHBlZGApO1xuICAgIGlmIChyZXN1bHQuZmFpbGVkID4gMCkgcGFydHMucHVzaChgJHtyZXN1bHQuZmFpbGVkfSBmYWlsZWRgKTtcbiAgICB0aGlzLnNob3dUb2FzdChgSW50ZWxsaUZpbGw6ICR7cGFydHMuam9pbignLCAnKX1gKTtcbiAgfVxuXG4gIC8qKiBHZXQgYWxsIGN1cnJlbnRseSB0cmFja2VkIG1hdGNoZWQgZmllbGRzICovXG4gIGdldE1hdGNoZWRGaWVsZHMoKTogTWF0Y2hlZEZpZWxkW10ge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuZmllbGRVSU1hcC52YWx1ZXMoKSkubWFwKCh1aSkgPT4gdWkubWF0Y2hlZEZpZWxkKTtcbiAgfVxuXG4gIC8vIC0tLSBQcml2YXRlIG1ldGhvZHMgLS0tXG5cbiAgcHJpdmF0ZSBjcmVhdGVCYWRnZShlbGVtZW50OiBGb3JtRWxlbWVudCwgbWF0Y2hlZEZpZWxkOiBNYXRjaGVkRmllbGQpOiBIVE1MRWxlbWVudCB7XG4gICAgY29uc3QgYmFkZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBiYWRnZS5jbGFzc05hbWUgPSAnaWYtYmFkZ2UnO1xuICAgIGJhZGdlLmFwcGVuZENoaWxkKGNyZWF0ZUJhZGdlU1ZHKCkpO1xuICAgIGJhZGdlLnRpdGxlID0gYEludGVsbGlGaWxsOiAke21hdGNoZWRGaWVsZC5tYXRjaGVzLmxlbmd0aH0gc3VnZ2VzdGlvbihzKWA7XG4gICAgdGhpcy5zaGFkb3dSb290IS5hcHBlbmRDaGlsZChiYWRnZSk7XG5cbiAgICB0aGlzLnBvc2l0aW9uQmFkZ2UoYmFkZ2UsIGVsZW1lbnQpO1xuXG4gICAgYmFkZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMudG9nZ2xlRHJvcGRvd24oZWxlbWVudCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYmFkZ2U7XG4gIH1cblxuICBwcml2YXRlIHBvc2l0aW9uQmFkZ2UoYmFkZ2U6IEhUTUxFbGVtZW50LCBlbGVtZW50OiBGb3JtRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHNjcm9sbFggPSB3aW5kb3cuc2Nyb2xsWDtcbiAgICBjb25zdCBzY3JvbGxZID0gd2luZG93LnNjcm9sbFk7XG5cbiAgICBiYWRnZS5zdHlsZS50b3AgPSBgJHtyZWN0LnRvcCArIHNjcm9sbFkgKyAocmVjdC5oZWlnaHQgLSAxOCkgLyAyfXB4YDtcbiAgICBiYWRnZS5zdHlsZS5sZWZ0ID0gYCR7cmVjdC5yaWdodCArIHNjcm9sbFggLSAyNH1weGA7XG4gIH1cblxuICBwcml2YXRlIHRvZ2dsZURyb3Bkb3duKGVsZW1lbnQ6IEZvcm1FbGVtZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYWN0aXZlRHJvcGRvd24/LmVsZW1lbnQgPT09IGVsZW1lbnQpIHtcbiAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3dEcm9wZG93bihlbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNob3dEcm9wZG93bihlbGVtZW50OiBGb3JtRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IHVpID0gdGhpcy5maWVsZFVJTWFwLmdldChlbGVtZW50KTtcbiAgICBpZiAoIXVpIHx8ICF0aGlzLnNoYWRvd1Jvb3QpIHJldHVybjtcblxuICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xuXG4gICAgY29uc3QgbWF0Y2hlcyA9IHVpLm1hdGNoZWRGaWVsZC5tYXRjaGVzLnNsaWNlKDAsIE1BWF9TVUdHRVNUSU9OUyk7XG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICBjb25zdCBkcm9wZG93biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRyb3Bkb3duLmNsYXNzTmFtZSA9ICdpZi1kcm9wZG93bic7XG5cbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBoZWFkZXIuY2xhc3NOYW1lID0gJ2lmLWRyb3Bkb3duLWhlYWRlcic7XG4gICAgaGVhZGVyLnRleHRDb250ZW50ID0gJ0ludGVsbGlGaWxsIFN1Z2dlc3Rpb25zJztcbiAgICBkcm9wZG93bi5hcHBlbmRDaGlsZChoZWFkZXIpO1xuXG4gICAgbWF0Y2hlcy5mb3JFYWNoKChtYXRjaCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGl0ZW0uY2xhc3NOYW1lID0gJ2lmLWRyb3Bkb3duLWl0ZW0nO1xuICAgICAgaWYgKGluZGV4ID09PSAwKSBpdGVtLmNsYXNzTGlzdC5hZGQoJ2lmLWFjdGl2ZScpO1xuICAgICAgaXRlbS5kYXRhc2V0LmluZGV4ID0gU3RyaW5nKGluZGV4KTtcblxuICAgICAgY29uc3QgdmFsdWVTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgdmFsdWVTcGFuLmNsYXNzTmFtZSA9ICdpZi1kcm9wZG93bi1pdGVtLXZhbHVlJztcbiAgICAgIHZhbHVlU3Bhbi50ZXh0Q29udGVudCA9IG1hdGNoLnZhbHVlO1xuICAgICAgdmFsdWVTcGFuLnRpdGxlID0gYCR7bWF0Y2gucHJvZmlsZUZpZWxkfSAoJHttYXRjaC5tYXRjaE1ldGhvZH0pYDtcbiAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQodmFsdWVTcGFuKTtcblxuICAgICAgY29uc3QgY29uZmlkZW5jZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICBjb25maWRlbmNlU3Bhbi5jbGFzc05hbWUgPSAnaWYtZHJvcGRvd24taXRlbS1jb25maWRlbmNlJztcbiAgICAgIGNvbnN0IHBjdCA9IE1hdGgucm91bmQobWF0Y2guY29uZmlkZW5jZSAqIDEwMCk7XG4gICAgICBjb25maWRlbmNlU3Bhbi50ZXh0Q29udGVudCA9IGAke3BjdH0lYDtcbiAgICAgIGlmIChtYXRjaC5jb25maWRlbmNlID49IDAuOCkge1xuICAgICAgICBjb25maWRlbmNlU3Bhbi5jbGFzc0xpc3QuYWRkKCdpZi1jb25maWRlbmNlLWhpZ2gnKTtcbiAgICAgIH0gZWxzZSBpZiAobWF0Y2guY29uZmlkZW5jZSA+PSAwLjYpIHtcbiAgICAgICAgY29uZmlkZW5jZVNwYW4uY2xhc3NMaXN0LmFkZCgnaWYtY29uZmlkZW5jZS1tZWRpdW0nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbmZpZGVuY2VTcGFuLmNsYXNzTGlzdC5hZGQoJ2lmLWNvbmZpZGVuY2UtbG93Jyk7XG4gICAgICB9XG4gICAgICBpdGVtLmFwcGVuZENoaWxkKGNvbmZpZGVuY2VTcGFuKTtcblxuICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGZpbGxGaWVsZChlbGVtZW50LCBtYXRjaC52YWx1ZSk7XG4gICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRBY3RpdmVJdGVtKGRyb3Bkb3duLCBpbmRleCk7XG4gICAgICB9KTtcblxuICAgICAgZHJvcGRvd24uYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoZHJvcGRvd24pO1xuICAgIHVpLmRyb3Bkb3duID0gZHJvcGRvd247XG4gICAgdGhpcy5wb3NpdGlvbkRyb3Bkb3duKGRyb3Bkb3duLCBlbGVtZW50KTtcbiAgICB0aGlzLmFjdGl2ZURyb3Bkb3duID0geyBlbGVtZW50LCBpbmRleDogMCB9O1xuXG4gICAgLy8gS2V5Ym9hcmQgbmF2aWdhdGlvblxuICAgIHRoaXMua2V5ZG93bkhhbmRsZXIgPSAoZTogS2V5Ym9hcmRFdmVudCkgPT4gdGhpcy5oYW5kbGVEcm9wZG93bktleWRvd24oZSwgZWxlbWVudCwgZHJvcGRvd24pO1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMua2V5ZG93bkhhbmRsZXIgYXMgRXZlbnRMaXN0ZW5lcik7XG5cbiAgICAvLyBDbG9zZSBvbiBvdXRzaWRlIGNsaWNrXG4gICAgdGhpcy5vdXRzaWRlQ2xpY2tIYW5kbGVyID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGlmICghZHJvcGRvd24uY29udGFpbnMoZS50YXJnZXQgYXMgTm9kZSkgJiYgZS50YXJnZXQgIT09IGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vdXRzaWRlQ2xpY2tIYW5kbGVyISk7XG4gICAgfSwgMCk7XG4gIH1cblxuICBwcml2YXRlIGtleWRvd25IYW5kbGVyOiAoKGU6IEtleWJvYXJkRXZlbnQpID0+IHZvaWQpIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgb3V0c2lkZUNsaWNrSGFuZGxlcjogKChlOiBNb3VzZUV2ZW50KSA9PiB2b2lkKSB8IG51bGwgPSBudWxsO1xuXG4gIHByaXZhdGUgY2xvc2VEcm9wZG93bigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZlRHJvcGRvd24pIHJldHVybjtcblxuICAgIGNvbnN0IHVpID0gdGhpcy5maWVsZFVJTWFwLmdldCh0aGlzLmFjdGl2ZURyb3Bkb3duLmVsZW1lbnQpO1xuICAgIGlmICh1aT8uZHJvcGRvd24pIHtcbiAgICAgIHVpLmRyb3Bkb3duLnJlbW92ZSgpO1xuICAgICAgdWkuZHJvcGRvd24gPSBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmtleWRvd25IYW5kbGVyKSB7XG4gICAgICB0aGlzLmFjdGl2ZURyb3Bkb3duLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMua2V5ZG93bkhhbmRsZXIgYXMgRXZlbnRMaXN0ZW5lcik7XG4gICAgICB0aGlzLmtleWRvd25IYW5kbGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vdXRzaWRlQ2xpY2tIYW5kbGVyKSB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub3V0c2lkZUNsaWNrSGFuZGxlcik7XG4gICAgICB0aGlzLm91dHNpZGVDbGlja0hhbmRsZXIgPSBudWxsO1xuICAgIH1cblxuICAgIHRoaXMuYWN0aXZlRHJvcGRvd24gPSBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBwb3NpdGlvbkRyb3Bkb3duKGRyb3Bkb3duOiBIVE1MRWxlbWVudCwgZWxlbWVudDogRm9ybUVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBzY3JvbGxYID0gd2luZG93LnNjcm9sbFg7XG4gICAgY29uc3Qgc2Nyb2xsWSA9IHdpbmRvdy5zY3JvbGxZO1xuXG4gICAgZHJvcGRvd24uc3R5bGUudG9wID0gYCR7cmVjdC5ib3R0b20gKyBzY3JvbGxZICsgNH1weGA7XG4gICAgZHJvcGRvd24uc3R5bGUubGVmdCA9IGAke3JlY3QubGVmdCArIHNjcm9sbFh9cHhgO1xuICAgIGRyb3Bkb3duLnN0eWxlLm1pbldpZHRoID0gYCR7TWF0aC5tYXgoMjIwLCByZWN0LndpZHRoKX1weGA7XG4gIH1cblxuICBwcml2YXRlIHNldEFjdGl2ZUl0ZW0oZHJvcGRvd246IEhUTUxFbGVtZW50LCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgaXRlbXMgPSBkcm9wZG93bi5xdWVyeVNlbGVjdG9yQWxsKCcuaWYtZHJvcGRvd24taXRlbScpO1xuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcbiAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnaWYtYWN0aXZlJywgaSA9PT0gaW5kZXgpO1xuICAgIH0pO1xuICAgIGlmICh0aGlzLmFjdGl2ZURyb3Bkb3duKSB7XG4gICAgICB0aGlzLmFjdGl2ZURyb3Bkb3duLmluZGV4ID0gaW5kZXg7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVEcm9wZG93bktleWRvd24oZTogS2V5Ym9hcmRFdmVudCwgZWxlbWVudDogRm9ybUVsZW1lbnQsIGRyb3Bkb3duOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IGl0ZW1zID0gZHJvcGRvd24ucXVlcnlTZWxlY3RvckFsbCgnLmlmLWRyb3Bkb3duLWl0ZW0nKTtcbiAgICBjb25zdCBjb3VudCA9IGl0ZW1zLmxlbmd0aDtcbiAgICBpZiAoY291bnQgPT09IDApIHJldHVybjtcblxuICAgIHN3aXRjaCAoZS5rZXkpIHtcbiAgICAgIGNhc2UgJ0Fycm93RG93bic6IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBuZXh0ID0gKCh0aGlzLmFjdGl2ZURyb3Bkb3duPy5pbmRleCA/PyAtMSkgKyAxKSAlIGNvdW50O1xuICAgICAgICB0aGlzLnNldEFjdGl2ZUl0ZW0oZHJvcGRvd24sIG5leHQpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ0Fycm93VXAnOiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgcHJldiA9ICgodGhpcy5hY3RpdmVEcm9wZG93bj8uaW5kZXggPz8gMSkgLSAxICsgY291bnQpICUgY291bnQ7XG4gICAgICAgIHRoaXMuc2V0QWN0aXZlSXRlbShkcm9wZG93biwgcHJldik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnRW50ZXInOiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgYWN0aXZlSW5kZXggPSB0aGlzLmFjdGl2ZURyb3Bkb3duPy5pbmRleCA/PyAwO1xuICAgICAgICBjb25zdCB1aSA9IHRoaXMuZmllbGRVSU1hcC5nZXQoZWxlbWVudCk7XG4gICAgICAgIGlmICh1aSkge1xuICAgICAgICAgIGNvbnN0IG1hdGNoID0gdWkubWF0Y2hlZEZpZWxkLm1hdGNoZXNbYWN0aXZlSW5kZXhdO1xuICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgZmlsbEZpZWxkKGVsZW1lbnQsIG1hdGNoLnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVwb3NpdGlvbkFsbCgpOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IFtlbGVtZW50LCB1aV0gb2YgdGhpcy5maWVsZFVJTWFwKSB7XG4gICAgICB0aGlzLnBvc2l0aW9uQmFkZ2UodWkuYmFkZ2UsIGVsZW1lbnQpO1xuICAgICAgaWYgKHVpLmRyb3Bkb3duICYmIHRoaXMuYWN0aXZlRHJvcGRvd24/LmVsZW1lbnQgPT09IGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbkRyb3Bkb3duKHVpLmRyb3Bkb3duLCBlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsZWFudXBSZW1vdmVkRWxlbWVudHMocm9vdDogRWxlbWVudCk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgW2VsZW1lbnQsIHVpXSBvZiB0aGlzLmZpZWxkVUlNYXApIHtcbiAgICAgIGlmIChyb290LmNvbnRhaW5zKGVsZW1lbnQpIHx8ICFkb2N1bWVudC5ib2R5LmNvbnRhaW5zKGVsZW1lbnQpKSB7XG4gICAgICAgIHVpLmJhZGdlLnJlbW92ZSgpO1xuICAgICAgICBpZiAodWkuZHJvcGRvd24pIHVpLmRyb3Bkb3duLnJlbW92ZSgpO1xuICAgICAgICBjb25zdCBmb2N1c0hhbmRsZXIgPSB0aGlzLmZvY3VzTGlzdGVuZXJzLmdldChlbGVtZW50KTtcbiAgICAgICAgaWYgKGZvY3VzSGFuZGxlcikgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIGZvY3VzSGFuZGxlcik7XG4gICAgICAgIHRoaXMuZm9jdXNMaXN0ZW5lcnMuZGVsZXRlKGVsZW1lbnQpO1xuICAgICAgICB0aGlzLmZpZWxkVUlNYXAuZGVsZXRlKGVsZW1lbnQpO1xuICAgICAgICBpZiAodGhpcy5hY3RpdmVEcm9wZG93bj8uZWxlbWVudCA9PT0gZWxlbWVudCkge1xuICAgICAgICAgIHRoaXMuYWN0aXZlRHJvcGRvd24gPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZWJvdW5jZShmbjogKCkgPT4gdm9pZCwgbXM6IG51bWJlcik6ICgpID0+IHZvaWQge1xuICAgIGxldCB0aW1lcjogUmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD4gfCBudWxsID0gbnVsbDtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKHRpbWVyKSBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGZuLCBtcyk7XG4gICAgfTtcbiAgfVxufVxuIiwiLyoqXG4gKiBLZXlib2FyZCBTaG9ydGN1dHMgLSBHbG9iYWwgc2hvcnRjdXRzIGZvciBJbnRlbGxpRmlsbCBmb3JtIGZpbGxpbmdcbiAqXG4gKiBDdHJsK1NoaWZ0K0Y6IEZpbGwgYWxsIG1hdGNoZWQgZmllbGRzXG4gKiBDdHJsK1NoaWZ0K1I6IFJlZnJlc2ggcHJvZmlsZSBkYXRhXG4gKiBDdHJsK1NoaWZ0K0w6IEluZmVyIHVubWF0Y2hlZCBmaWVsZHMgdmlhIExMTVxuICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgU2hvcnRjdXRIYW5kbGVycyB7XG4gIG9uRmlsbEFsbDogKCkgPT4gdm9pZDtcbiAgb25SZWZyZXNoUHJvZmlsZTogKCkgPT4gdm9pZDtcbiAgb25JbmZlckZpZWxkcz86ICgpID0+IHZvaWQ7XG59XG5cbmxldCBrZXlkb3duTGlzdGVuZXI6ICgoZTogS2V5Ym9hcmRFdmVudCkgPT4gdm9pZCkgfCBudWxsID0gbnVsbDtcblxuLyoqIFJlZ2lzdGVyIGtleWJvYXJkIHNob3J0Y3V0cyAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldHVwU2hvcnRjdXRzKGhhbmRsZXJzOiBTaG9ydGN1dEhhbmRsZXJzKTogdm9pZCB7XG4gIHRlYXJkb3duU2hvcnRjdXRzKCk7XG5cbiAga2V5ZG93bkxpc3RlbmVyID0gKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICBpZiAoIWUuY3RybEtleSB8fCAhZS5zaGlmdEtleSkgcmV0dXJuO1xuXG4gICAgc3dpdGNoIChlLmtleS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBjYXNlICdGJzpcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBoYW5kbGVycy5vbkZpbGxBbGwoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdSJzpcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBoYW5kbGVycy5vblJlZnJlc2hQcm9maWxlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnTCc6XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaGFuZGxlcnMub25JbmZlckZpZWxkcz8uKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5ZG93bkxpc3RlbmVyKTtcbn1cblxuLyoqIFJlbW92ZSBrZXlib2FyZCBzaG9ydGN1dHMgKi9cbmV4cG9ydCBmdW5jdGlvbiB0ZWFyZG93blNob3J0Y3V0cygpOiB2b2lkIHtcbiAgaWYgKGtleWRvd25MaXN0ZW5lcikge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlkb3duTGlzdGVuZXIpO1xuICAgIGtleWRvd25MaXN0ZW5lciA9IG51bGw7XG4gIH1cbn1cbiIsIi8qKlxuICogSW50ZWxsaUZpbGwgQ29udGVudCBTY3JpcHRcbiAqXG4gKiBNYWluIGVudHJ5IHBvaW50IGZvciB0aGUgZXh0ZW5zaW9uIG9uIHdlYiBwYWdlcy5cbiAqIERldGVjdHMgZm9ybSBmaWVsZHMgYW5kIHByb3ZpZGVzIGF1dG9jb21wbGV0ZSBzdWdnZXN0aW9uc1xuICogdXNpbmcgcHJvZmlsZSBkYXRhIGZldGNoZWQgdGhyb3VnaCB0aGUgYmFja2dyb3VuZCBzZXJ2aWNlIHdvcmtlci5cbiAqL1xuXG5pbXBvcnQge1xuICBkZXRlY3RGaWVsZHMsXG4gIG1hcmtBc1Byb2Nlc3NlZCxcbiAgaXNQcm9jZXNzZWQsXG4gIG9ic2VydmVET01DaGFuZ2VzLFxufSBmcm9tICcuLi9saWIvZmllbGQtZGV0ZWN0b3InO1xuaW1wb3J0IHsgbWF0Y2hGaWVsZHMsIG1hdGNoRmllbGRzQXN5bmMsIGJ1aWxkRmllbGRDb250ZXh0IH0gZnJvbSAnLi4vbGliL2ZpZWxkLW1hdGNoZXInO1xuaW1wb3J0IHsgZmlsbEFsbEZpZWxkcyB9IGZyb20gJy4uL2xpYi9mb3JtLWZpbGxlcic7XG5pbXBvcnQgeyBBdXRvY29tcGxldGVNYW5hZ2VyIH0gZnJvbSAnLi4vbGliL2F1dG9jb21wbGV0ZS11aSc7XG5pbXBvcnQgeyBzZXR1cFNob3J0Y3V0cywgdGVhcmRvd25TaG9ydGN1dHMgfSBmcm9tICcuLi9saWIva2V5Ym9hcmQtc2hvcnRjdXRzJztcbmltcG9ydCB0eXBlIHsgRGV0ZWN0ZWRGaWVsZCB9IGZyb20gJy4uL3NoYXJlZC90eXBlcy9maWVsZC1kZXRlY3Rpb24nO1xuaW1wb3J0IHR5cGUgeyBVc2VyUHJvZmlsZSB9IGZyb20gJy4uL3NoYXJlZC90eXBlcy9hcGknO1xuaW1wb3J0IHR5cGUgeyBDb250ZW50TWVzc2FnZSwgQ29udGVudFN0YXR1cywgSW5mZXJGaWVsZHNSZXN1bHQgfSBmcm9tICcuLi9zaGFyZWQvdHlwZXMvbWVzc2FnZXMnO1xuaW1wb3J0IHR5cGUgeyBGaWVsZENvbnRleHQsIEZpZWxkTWF0Y2gsIE1hdGNoZWRGaWVsZCB9IGZyb20gJy4uL3NoYXJlZC90eXBlcy9maWVsZC1tYXRjaGluZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbnRlbnRTY3JpcHQoe1xuICBtYXRjaGVzOiBbJzxhbGxfdXJscz4nXSxcbiAgcnVuQXQ6ICdkb2N1bWVudF9lbmQnLFxuICBhbGxGcmFtZXM6IGZhbHNlLFxuXG4gIG1haW4oKSB7XG4gICAgY29uc29sZS5sb2coJ0ludGVsbGlGaWxsOiBDb250ZW50IHNjcmlwdCBsb2FkZWQnKTtcblxuICAgIGxldCBpc0VuYWJsZWQgPSB0cnVlO1xuICAgIGxldCB1c2VyUHJvZmlsZTogVXNlclByb2ZpbGUgfCBudWxsID0gbnVsbDtcbiAgICBjb25zdCBwcm9jZXNzZWRGaWVsZHMgPSBuZXcgU2V0PEVsZW1lbnQ+KCk7XG4gICAgbGV0IGRvbU9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyIHwgbnVsbCA9IG51bGw7XG4gICAgY29uc3QgYXV0b2NvbXBsZXRlTWFuYWdlciA9IG5ldyBBdXRvY29tcGxldGVNYW5hZ2VyKCk7XG5cbiAgICAvKiogRmV0Y2ggcHJvZmlsZSBmcm9tIGJhY2tncm91bmQgc2VydmljZSB3b3JrZXIgKi9cbiAgICBhc3luYyBmdW5jdGlvbiBmZXRjaFByb2ZpbGUoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IChhd2FpdCBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgIGFjdGlvbjogJ2dldFByb2ZpbGUnLFxuICAgICAgICB9KSkgYXMgeyBzdWNjZXNzOiBib29sZWFuOyBwcm9maWxlPzogVXNlclByb2ZpbGUgfTtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MgJiYgcmVzcG9uc2UucHJvZmlsZSkge1xuICAgICAgICAgIHVzZXJQcm9maWxlID0gcmVzcG9uc2UucHJvZmlsZTtcbiAgICAgICAgICBjb25zb2xlLmxvZygnSW50ZWxsaUZpbGw6IFByb2ZpbGUgbG9hZGVkJyk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJ0ludGVsbGlGaWxsOiBObyBwcm9maWxlIGF2YWlsYWJsZScpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdJbnRlbGxpRmlsbDogRXJyb3IgZmV0Y2hpbmcgcHJvZmlsZScsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBGaWxsIGFsbCBzaW5nbGUtbWF0Y2ggZmllbGRzIGFuZCBzaG93IHJlc3VsdCB0b2FzdCAqL1xuICAgIGZ1bmN0aW9uIGhhbmRsZUZpbGxBbGwoKTogdm9pZCB7XG4gICAgICBjb25zdCBtYXRjaGVkRmllbGRzID0gYXV0b2NvbXBsZXRlTWFuYWdlci5nZXRNYXRjaGVkRmllbGRzKCk7XG4gICAgICBpZiAobWF0Y2hlZEZpZWxkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgYXV0b2NvbXBsZXRlTWFuYWdlci5zaG93VG9hc3QoJ0ludGVsbGlGaWxsOiBObyBtYXRjaGVkIGZpZWxkcyB0byBmaWxsJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlc3VsdCA9IGZpbGxBbGxGaWVsZHMobWF0Y2hlZEZpZWxkcyk7XG4gICAgICBhdXRvY29tcGxldGVNYW5hZ2VyLnNob3dGaWxsUmVzdWx0KHJlc3VsdCk7XG4gICAgfVxuXG4gICAgLyoqIFJlZnJlc2ggcHJvZmlsZSBhbmQgcmUtcHJvY2VzcyBhbGwgZmllbGRzICovXG4gICAgYXN5bmMgZnVuY3Rpb24gaGFuZGxlUmVmcmVzaFByb2ZpbGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICBjb25zdCBzdWNjZXNzID0gYXdhaXQgZmV0Y2hQcm9maWxlKCk7XG4gICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICBwcm9jZXNzZWRGaWVsZHMuY2xlYXIoKTtcbiAgICAgICAgYXV0b2NvbXBsZXRlTWFuYWdlci5kZXN0cm95KCk7XG4gICAgICAgIHByb2Nlc3NGaWVsZHMoKTtcbiAgICAgICAgYXV0b2NvbXBsZXRlTWFuYWdlci5zaG93VG9hc3QoJ0ludGVsbGlGaWxsOiBQcm9maWxlIHJlZnJlc2hlZCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRyYWNrIHVubWF0Y2hlZCBmaWVsZHMgZm9yIExMTSBpbmZlcmVuY2VcbiAgICBsZXQgdW5tYXRjaGVkRmllbGRzQ2FjaGU6IHsgZmllbGQ6IERldGVjdGVkRmllbGQ7IGNvbnRleHQ6IEZpZWxkQ29udGV4dCB9W10gPSBbXTtcblxuICAgIC8qKiBTZW5kIHVubWF0Y2hlZCBmaWVsZHMgdG8gYmFja2dyb3VuZCBmb3IgTExNIGluZmVyZW5jZSwgdGhlbiBhdHRhY2ggVUkgKi9cbiAgICBhc3luYyBmdW5jdGlvbiBpbmZlckFuZEF0dGFjaChcbiAgICAgIHVubWF0Y2hlZEl0ZW1zOiB7IGZpZWxkOiBEZXRlY3RlZEZpZWxkOyBjb250ZXh0OiBGaWVsZENvbnRleHQgfVtdLFxuICAgICk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgaWYgKCF1c2VyUHJvZmlsZSB8fCB1bm1hdGNoZWRJdGVtcy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgICAgY29uc3QgcHJvZmlsZUtleXMgPSB1c2VyUHJvZmlsZS5maWVsZHMubWFwKChmKSA9PiBmLmtleSk7XG4gICAgICBjb25zdCBwcm9maWxlTWFwID0gbmV3IE1hcChcbiAgICAgICAgdXNlclByb2ZpbGUuZmllbGRzLm1hcCgoZikgPT4gW2Yua2V5LCBmLnZhbHVlc1swXSA/PyAnJ10pLFxuICAgICAgKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gKGF3YWl0IGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgICAgYWN0aW9uOiAnaW5mZXJGaWVsZHMnLFxuICAgICAgICAgIGZpZWxkczogdW5tYXRjaGVkSXRlbXMubWFwKCh1KSA9PiB1LmNvbnRleHQpLFxuICAgICAgICAgIHByb2ZpbGVLZXlzLFxuICAgICAgICB9KSkgYXMgSW5mZXJGaWVsZHNSZXN1bHQ7XG5cbiAgICAgICAgaWYgKCFyZXN1bHQuc3VjY2VzcyB8fCByZXN1bHQubWFwcGluZ3MubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgbmV3TWF0Y2hlZDogTWF0Y2hlZEZpZWxkW10gPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBtYXBwaW5nIG9mIHJlc3VsdC5tYXBwaW5ncykge1xuICAgICAgICAgIGNvbnN0IGl0ZW0gPSB1bm1hdGNoZWRJdGVtc1ttYXBwaW5nLmluZGV4XTtcbiAgICAgICAgICBpZiAoIWl0ZW0pIGNvbnRpbnVlO1xuXG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBwcm9maWxlTWFwLmdldChtYXBwaW5nLnByb2ZpbGVLZXkpO1xuICAgICAgICAgIGlmICghdmFsdWUpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgY29uc3QgbWF0Y2g6IEZpZWxkTWF0Y2ggPSB7XG4gICAgICAgICAgICBwcm9maWxlRmllbGQ6IG1hcHBpbmcucHJvZmlsZUtleSxcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgY29uZmlkZW5jZTogbWFwcGluZy5jb25maWRlbmNlLCAvLyBBbHJlYWR5IGNhcHBlZCBhdCAwLjkgYnkgYmFja2VuZFxuICAgICAgICAgICAgbWF0Y2hNZXRob2Q6ICdsbG0nLFxuICAgICAgICAgIH07XG4gICAgICAgICAgbmV3TWF0Y2hlZC5wdXNoKHsgZmllbGQ6IGl0ZW0uZmllbGQsIG1hdGNoZXM6IFttYXRjaF0gfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV3TWF0Y2hlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coYEludGVsbGlGaWxsOiBMTE0gbWF0Y2hlZCAke25ld01hdGNoZWQubGVuZ3RofSBhZGRpdGlvbmFsIGZpZWxkc2ApO1xuICAgICAgICAgIGF1dG9jb21wbGV0ZU1hbmFnZXIuYXR0YWNoVG9GaWVsZHMobmV3TWF0Y2hlZCk7XG4gICAgICAgICAgLy8gUmVtb3ZlIG5ld2x5IG1hdGNoZWQgZnJvbSBjYWNoZSBieSBlbGVtZW50IHJlZmVyZW5jZVxuICAgICAgICAgIGNvbnN0IG1hdGNoZWRFbGVtZW50cyA9IG5ldyBTZXQobmV3TWF0Y2hlZC5tYXAoKG0pID0+IG0uZmllbGQuZWxlbWVudCkpO1xuICAgICAgICAgIHVubWF0Y2hlZEZpZWxkc0NhY2hlID0gdW5tYXRjaGVkRmllbGRzQ2FjaGUuZmlsdGVyKFxuICAgICAgICAgICAgKGl0ZW0pID0+ICFtYXRjaGVkRWxlbWVudHMuaGFzKGl0ZW0uZmllbGQuZWxlbWVudCksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignSW50ZWxsaUZpbGw6IExMTSBpbmZlcmVuY2UgZmFpbGVkLCBoZXVyaXN0aWMgbWF0Y2hpbmcgc3RpbGwgYWN0aXZlJywgZXJyb3IpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBQcm9jZXNzIGFsbCBkZXRlY3RlZCBmb3JtIGZpZWxkcyBvbiB0aGUgcGFnZSAqL1xuICAgIGZ1bmN0aW9uIHByb2Nlc3NGaWVsZHMoKTogdm9pZCB7XG4gICAgICBpZiAoIXVzZXJQcm9maWxlKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IGZpZWxkczogRGV0ZWN0ZWRGaWVsZFtdID0gZGV0ZWN0RmllbGRzKCk7XG4gICAgICBjb25zdCBuZXdGaWVsZHM6IERldGVjdGVkRmllbGRbXSA9IFtdO1xuXG4gICAgICBmb3IgKGNvbnN0IGZpZWxkRGF0YSBvZiBmaWVsZHMpIHtcbiAgICAgICAgaWYgKHByb2Nlc3NlZEZpZWxkcy5oYXMoZmllbGREYXRhLmVsZW1lbnQpKSBjb250aW51ZTtcblxuICAgICAgICBwcm9jZXNzZWRGaWVsZHMuYWRkKGZpZWxkRGF0YS5lbGVtZW50KTtcbiAgICAgICAgbWFya0FzUHJvY2Vzc2VkKGZpZWxkRGF0YS5lbGVtZW50KTtcbiAgICAgICAgZmllbGREYXRhLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWludGVsbGlmaWxsLXR5cGUnLCBmaWVsZERhdGEudHlwZSk7XG4gICAgICAgIG5ld0ZpZWxkcy5wdXNoKGZpZWxkRGF0YSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXdGaWVsZHMubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICAgIGNvbnNvbGUubG9nKGBJbnRlbGxpRmlsbDogUHJvY2Vzc2luZyAke25ld0ZpZWxkcy5sZW5ndGh9IG5ldyBmaWVsZHNgKTtcblxuICAgICAgLy8gTWF0Y2ggZmllbGRzIHdpdGggaGV1cmlzdGljcywgY29sbGVjdGluZyB1bm1hdGNoZWQgZm9yIExMTVxuICAgICAgY29uc3QgeyBtYXRjaGVkLCB1bm1hdGNoZWQgfSA9IG1hdGNoRmllbGRzQXN5bmMobmV3RmllbGRzLCB1c2VyUHJvZmlsZS5maWVsZHMpO1xuICAgICAgY29uc29sZS5sb2coYEludGVsbGlGaWxsOiBNYXRjaGVkICR7bWF0Y2hlZC5sZW5ndGh9IGZpZWxkcyB0byBwcm9maWxlIGRhdGFgKTtcblxuICAgICAgaWYgKG1hdGNoZWQubGVuZ3RoID4gMCkge1xuICAgICAgICBhdXRvY29tcGxldGVNYW5hZ2VyLmF0dGFjaFRvRmllbGRzKG1hdGNoZWQpO1xuICAgICAgfVxuXG4gICAgICAvLyBBc3luYyBMTE0gaW5mZXJlbmNlIGZvciB1bm1hdGNoZWQgZmllbGRzIChub24tYmxvY2tpbmcpXG4gICAgICBpZiAodW5tYXRjaGVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc29sZS5sb2coYEludGVsbGlGaWxsOiAke3VubWF0Y2hlZC5sZW5ndGh9IHVubWF0Y2hlZCBmaWVsZHMsIHJlcXVlc3RpbmcgTExNIGluZmVyZW5jZWApO1xuICAgICAgICB1bm1hdGNoZWRGaWVsZHNDYWNoZSA9IFsuLi51bm1hdGNoZWRGaWVsZHNDYWNoZSwgLi4udW5tYXRjaGVkXTtcbiAgICAgICAgaW5mZXJBbmRBdHRhY2godW5tYXRjaGVkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogTWFudWFsbHkgdHJpZ2dlciBMTE0gaW5mZXJlbmNlIGZvciBhbGwgdW5tYXRjaGVkIGZpZWxkcyAoQ3RybCtTaGlmdCtJKSAqL1xuICAgIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZUluZmVyRmllbGRzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgaWYgKCF1c2VyUHJvZmlsZSkge1xuICAgICAgICBhdXRvY29tcGxldGVNYW5hZ2VyLnNob3dUb2FzdCgnSW50ZWxsaUZpbGw6IE5vIHByb2ZpbGUgbG9hZGVkJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUmVidWlsZCB1bm1hdGNoZWQgbGlzdCBmcm9tIGFsbCBwcm9jZXNzZWQgZmllbGRzXG4gICAgICBjb25zdCBhbGxGaWVsZHMgPSBkZXRlY3RGaWVsZHMoKTtcbiAgICAgIGNvbnN0IHsgdW5tYXRjaGVkIH0gPSBtYXRjaEZpZWxkc0FzeW5jKGFsbEZpZWxkcywgdXNlclByb2ZpbGUuZmllbGRzKTtcbiAgICAgIGNvbnN0IHVubWF0Y2hlZEl0ZW1zID0gdW5tYXRjaGVkLm1hcCgodSwgaSkgPT4gKHtcbiAgICAgICAgZmllbGQ6IHUuZmllbGQsXG4gICAgICAgIGNvbnRleHQ6IGJ1aWxkRmllbGRDb250ZXh0KHUuZmllbGQsIGkpLFxuICAgICAgfSkpO1xuXG4gICAgICBpZiAodW5tYXRjaGVkSXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGF1dG9jb21wbGV0ZU1hbmFnZXIuc2hvd1RvYXN0KCdJbnRlbGxpRmlsbDogQWxsIGZpZWxkcyBhbHJlYWR5IG1hdGNoZWQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhdXRvY29tcGxldGVNYW5hZ2VyLnNob3dUb2FzdChgSW50ZWxsaUZpbGw6IEluZmVycmluZyAke3VubWF0Y2hlZEl0ZW1zLmxlbmd0aH0gZmllbGRzLi4uYCk7XG4gICAgICB1bm1hdGNoZWRGaWVsZHNDYWNoZSA9IHVubWF0Y2hlZEl0ZW1zO1xuICAgICAgYXdhaXQgaW5mZXJBbmRBdHRhY2godW5tYXRjaGVkSXRlbXMpO1xuICAgIH1cblxuICAgIC8qKiBJbml0aWFsaXplIHRoZSBjb250ZW50IHNjcmlwdCAqL1xuICAgIGFzeW5jIGZ1bmN0aW9uIGluaXRpYWxpemUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBDaGVjayBleHRlbnNpb24gc2V0dGluZ3NcbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSBhd2FpdCBicm93c2VyLnN0b3JhZ2UubG9jYWwuZ2V0KFsnc2V0dGluZ3MnXSk7XG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IHNldHRpbmdzLnNldHRpbmdzIGFzIHsgZW5hYmxlZD86IGJvb2xlYW4gfSB8IHVuZGVmaW5lZDtcbiAgICAgICAgaXNFbmFibGVkID0gcGFyc2VkPy5lbmFibGVkICE9PSBmYWxzZTtcblxuICAgICAgICBpZiAoIWlzRW5hYmxlZCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdJbnRlbGxpRmlsbDogRXh0ZW5zaW9uIGlzIGRpc2FibGVkJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmV0Y2ggcHJvZmlsZVxuICAgICAgICBhd2FpdCBmZXRjaFByb2ZpbGUoKTtcblxuICAgICAgICBpZiAodXNlclByb2ZpbGUpIHtcbiAgICAgICAgICBwcm9jZXNzRmllbGRzKCk7XG4gICAgICAgICAgLy8gT2JzZXJ2ZSBmb3IgZHluYW1pY2FsbHkgYWRkZWQgZmllbGRzIChTUEFzLCBBSkFYIGZvcm1zKVxuICAgICAgICAgIGRvbU9ic2VydmVyID0gb2JzZXJ2ZURPTUNoYW5nZXMoKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0ludGVsbGlGaWxsOiBOZXcgZmllbGRzIGRldGVjdGVkJyk7XG4gICAgICAgICAgICBwcm9jZXNzRmllbGRzKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZXR1cCBrZXlib2FyZCBzaG9ydGN1dHNcbiAgICAgICAgc2V0dXBTaG9ydGN1dHMoe1xuICAgICAgICAgIG9uRmlsbEFsbDogaGFuZGxlRmlsbEFsbCxcbiAgICAgICAgICBvblJlZnJlc2hQcm9maWxlOiBoYW5kbGVSZWZyZXNoUHJvZmlsZSxcbiAgICAgICAgICBvbkluZmVyRmllbGRzOiBoYW5kbGVJbmZlckZpZWxkcyxcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdJbnRlbGxpRmlsbDogSW5pdGlhbGl6YXRpb24gZmFpbGVkJywgZXJyb3IpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIExpc3RlbiBmb3IgbWVzc2FnZXMgZnJvbSBiYWNrZ3JvdW5kIG9yIHBvcHVwXG4gICAgYnJvd3Nlci5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigocmF3LCBfc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSByYXcgYXMgQ29udGVudE1lc3NhZ2U7XG4gICAgICBzd2l0Y2ggKG1lc3NhZ2UuYWN0aW9uKSB7XG4gICAgICAgIGNhc2UgJ3JlZnJlc2hQcm9maWxlJzpcbiAgICAgICAgICBoYW5kbGVSZWZyZXNoUHJvZmlsZSgpXG4gICAgICAgICAgICAudGhlbigoKSA9PiBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiB0cnVlIH0pKVxuICAgICAgICAgICAgLmNhdGNoKCgpID0+IHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IGZhbHNlIH0pKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICd0b2dnbGVFeHRlbnNpb24nOlxuICAgICAgICAgIGlzRW5hYmxlZCA9IG1lc3NhZ2UuZW5hYmxlZDtcbiAgICAgICAgICBpZiAoaXNFbmFibGVkKSB7XG4gICAgICAgICAgICBwcm9jZXNzRmllbGRzKCk7XG4gICAgICAgICAgICBzZXR1cFNob3J0Y3V0cyh7XG4gICAgICAgICAgICAgIG9uRmlsbEFsbDogaGFuZGxlRmlsbEFsbCxcbiAgICAgICAgICAgICAgb25SZWZyZXNoUHJvZmlsZTogaGFuZGxlUmVmcmVzaFByb2ZpbGUsXG4gICAgICAgICAgICAgIG9uSW5mZXJGaWVsZHM6IGhhbmRsZUluZmVyRmllbGRzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb2Nlc3NlZEZpZWxkcy5jbGVhcigpO1xuICAgICAgICAgICAgYXV0b2NvbXBsZXRlTWFuYWdlci5kZXN0cm95KCk7XG4gICAgICAgICAgICB0ZWFyZG93blNob3J0Y3V0cygpO1xuICAgICAgICAgICAgaWYgKGRvbU9ic2VydmVyKSB7XG4gICAgICAgICAgICAgIGRvbU9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgICAgZG9tT2JzZXJ2ZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2ZpbGxBbGwnOlxuICAgICAgICAgIGhhbmRsZUZpbGxBbGwoKTtcbiAgICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2luZmVyRmllbGRzJzpcbiAgICAgICAgICBoYW5kbGVJbmZlckZpZWxkcygpXG4gICAgICAgICAgICAudGhlbigoKSA9PiBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiB0cnVlIH0pKVxuICAgICAgICAgICAgLmNhdGNoKCgpID0+IHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IGZhbHNlIH0pKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdnZXRTdGF0dXMnOiB7XG4gICAgICAgICAgY29uc3Qgc3RhdHVzOiBDb250ZW50U3RhdHVzID0ge1xuICAgICAgICAgICAgZW5hYmxlZDogaXNFbmFibGVkLFxuICAgICAgICAgICAgaGFzUHJvZmlsZTogISF1c2VyUHJvZmlsZSxcbiAgICAgICAgICAgIGZpZWxkc1Byb2Nlc3NlZDogcHJvY2Vzc2VkRmllbGRzLnNpemUsXG4gICAgICAgICAgfTtcbiAgICAgICAgICBzZW5kUmVzcG9uc2Uoc3RhdHVzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7IC8vIEtlZXAgY2hhbm5lbCBvcGVuIGZvciBhc3luYyByZXNwb25zZXNcbiAgICB9KTtcblxuICAgIC8vIFN0YXJ0IGluaXRpYWxpemF0aW9uXG4gICAgaW5pdGlhbGl6ZSgpO1xuICB9LFxufSk7XG4iLCJmdW5jdGlvbiBwcmludChtZXRob2QsIC4uLmFyZ3MpIHtcbiAgaWYgKGltcG9ydC5tZXRhLmVudi5NT0RFID09PSBcInByb2R1Y3Rpb25cIikgcmV0dXJuO1xuICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09IFwic3RyaW5nXCIpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gYXJncy5zaGlmdCgpO1xuICAgIG1ldGhvZChgW3d4dF0gJHttZXNzYWdlfWAsIC4uLmFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIG1ldGhvZChcIlt3eHRdXCIsIC4uLmFyZ3MpO1xuICB9XG59XG5leHBvcnQgY29uc3QgbG9nZ2VyID0ge1xuICBkZWJ1ZzogKC4uLmFyZ3MpID0+IHByaW50KGNvbnNvbGUuZGVidWcsIC4uLmFyZ3MpLFxuICBsb2c6ICguLi5hcmdzKSA9PiBwcmludChjb25zb2xlLmxvZywgLi4uYXJncyksXG4gIHdhcm46ICguLi5hcmdzKSA9PiBwcmludChjb25zb2xlLndhcm4sIC4uLmFyZ3MpLFxuICBlcnJvcjogKC4uLmFyZ3MpID0+IHByaW50KGNvbnNvbGUuZXJyb3IsIC4uLmFyZ3MpXG59O1xuIiwiaW1wb3J0IHsgYnJvd3NlciB9IGZyb20gXCJ3eHQvYnJvd3NlclwiO1xuZXhwb3J0IGNsYXNzIFd4dExvY2F0aW9uQ2hhbmdlRXZlbnQgZXh0ZW5kcyBFdmVudCB7XG4gIGNvbnN0cnVjdG9yKG5ld1VybCwgb2xkVXJsKSB7XG4gICAgc3VwZXIoV3h0TG9jYXRpb25DaGFuZ2VFdmVudC5FVkVOVF9OQU1FLCB7fSk7XG4gICAgdGhpcy5uZXdVcmwgPSBuZXdVcmw7XG4gICAgdGhpcy5vbGRVcmwgPSBvbGRVcmw7XG4gIH1cbiAgc3RhdGljIEVWRU5UX05BTUUgPSBnZXRVbmlxdWVFdmVudE5hbWUoXCJ3eHQ6bG9jYXRpb25jaGFuZ2VcIik7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0VW5pcXVlRXZlbnROYW1lKGV2ZW50TmFtZSkge1xuICByZXR1cm4gYCR7YnJvd3Nlcj8ucnVudGltZT8uaWR9OiR7aW1wb3J0Lm1ldGEuZW52LkVOVFJZUE9JTlR9OiR7ZXZlbnROYW1lfWA7XG59XG4iLCJpbXBvcnQgeyBXeHRMb2NhdGlvbkNoYW5nZUV2ZW50IH0gZnJvbSBcIi4vY3VzdG9tLWV2ZW50cy5tanNcIjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMb2NhdGlvbldhdGNoZXIoY3R4KSB7XG4gIGxldCBpbnRlcnZhbDtcbiAgbGV0IG9sZFVybDtcbiAgcmV0dXJuIHtcbiAgICAvKipcbiAgICAgKiBFbnN1cmUgdGhlIGxvY2F0aW9uIHdhdGNoZXIgaXMgYWN0aXZlbHkgbG9va2luZyBmb3IgVVJMIGNoYW5nZXMuIElmIGl0J3MgYWxyZWFkeSB3YXRjaGluZyxcbiAgICAgKiB0aGlzIGlzIGEgbm9vcC5cbiAgICAgKi9cbiAgICBydW4oKSB7XG4gICAgICBpZiAoaW50ZXJ2YWwgIT0gbnVsbCkgcmV0dXJuO1xuICAgICAgb2xkVXJsID0gbmV3IFVSTChsb2NhdGlvbi5ocmVmKTtcbiAgICAgIGludGVydmFsID0gY3R4LnNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgbGV0IG5ld1VybCA9IG5ldyBVUkwobG9jYXRpb24uaHJlZik7XG4gICAgICAgIGlmIChuZXdVcmwuaHJlZiAhPT0gb2xkVXJsLmhyZWYpIHtcbiAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgV3h0TG9jYXRpb25DaGFuZ2VFdmVudChuZXdVcmwsIG9sZFVybCkpO1xuICAgICAgICAgIG9sZFVybCA9IG5ld1VybDtcbiAgICAgICAgfVxuICAgICAgfSwgMWUzKTtcbiAgICB9XG4gIH07XG59XG4iLCJpbXBvcnQgeyBicm93c2VyIH0gZnJvbSBcInd4dC9icm93c2VyXCI7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tIFwiLi4vLi4vc2FuZGJveC91dGlscy9sb2dnZXIubWpzXCI7XG5pbXBvcnQgeyBnZXRVbmlxdWVFdmVudE5hbWUgfSBmcm9tIFwiLi9jdXN0b20tZXZlbnRzLm1qc1wiO1xuaW1wb3J0IHsgY3JlYXRlTG9jYXRpb25XYXRjaGVyIH0gZnJvbSBcIi4vbG9jYXRpb24td2F0Y2hlci5tanNcIjtcbmV4cG9ydCBjbGFzcyBDb250ZW50U2NyaXB0Q29udGV4dCB7XG4gIGNvbnN0cnVjdG9yKGNvbnRlbnRTY3JpcHROYW1lLCBvcHRpb25zKSB7XG4gICAgdGhpcy5jb250ZW50U2NyaXB0TmFtZSA9IGNvbnRlbnRTY3JpcHROYW1lO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5hYm9ydENvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgaWYgKHRoaXMuaXNUb3BGcmFtZSkge1xuICAgICAgdGhpcy5saXN0ZW5Gb3JOZXdlclNjcmlwdHMoeyBpZ25vcmVGaXJzdEV2ZW50OiB0cnVlIH0pO1xuICAgICAgdGhpcy5zdG9wT2xkU2NyaXB0cygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxpc3RlbkZvck5ld2VyU2NyaXB0cygpO1xuICAgIH1cbiAgfVxuICBzdGF0aWMgU0NSSVBUX1NUQVJURURfTUVTU0FHRV9UWVBFID0gZ2V0VW5pcXVlRXZlbnROYW1lKFxuICAgIFwid3h0OmNvbnRlbnQtc2NyaXB0LXN0YXJ0ZWRcIlxuICApO1xuICBpc1RvcEZyYW1lID0gd2luZG93LnNlbGYgPT09IHdpbmRvdy50b3A7XG4gIGFib3J0Q29udHJvbGxlcjtcbiAgbG9jYXRpb25XYXRjaGVyID0gY3JlYXRlTG9jYXRpb25XYXRjaGVyKHRoaXMpO1xuICByZWNlaXZlZE1lc3NhZ2VJZHMgPSAvKiBAX19QVVJFX18gKi8gbmV3IFNldCgpO1xuICBnZXQgc2lnbmFsKCkge1xuICAgIHJldHVybiB0aGlzLmFib3J0Q29udHJvbGxlci5zaWduYWw7XG4gIH1cbiAgYWJvcnQocmVhc29uKSB7XG4gICAgcmV0dXJuIHRoaXMuYWJvcnRDb250cm9sbGVyLmFib3J0KHJlYXNvbik7XG4gIH1cbiAgZ2V0IGlzSW52YWxpZCgpIHtcbiAgICBpZiAoYnJvd3Nlci5ydW50aW1lLmlkID09IG51bGwpIHtcbiAgICAgIHRoaXMubm90aWZ5SW52YWxpZGF0ZWQoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc2lnbmFsLmFib3J0ZWQ7XG4gIH1cbiAgZ2V0IGlzVmFsaWQoKSB7XG4gICAgcmV0dXJuICF0aGlzLmlzSW52YWxpZDtcbiAgfVxuICAvKipcbiAgICogQWRkIGEgbGlzdGVuZXIgdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgY29udGVudCBzY3JpcHQncyBjb250ZXh0IGlzIGludmFsaWRhdGVkLlxuICAgKlxuICAgKiBAcmV0dXJucyBBIGZ1bmN0aW9uIHRvIHJlbW92ZSB0aGUgbGlzdGVuZXIuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGJyb3dzZXIucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoY2IpO1xuICAgKiBjb25zdCByZW1vdmVJbnZhbGlkYXRlZExpc3RlbmVyID0gY3R4Lm9uSW52YWxpZGF0ZWQoKCkgPT4ge1xuICAgKiAgIGJyb3dzZXIucnVudGltZS5vbk1lc3NhZ2UucmVtb3ZlTGlzdGVuZXIoY2IpO1xuICAgKiB9KVxuICAgKiAvLyAuLi5cbiAgICogcmVtb3ZlSW52YWxpZGF0ZWRMaXN0ZW5lcigpO1xuICAgKi9cbiAgb25JbnZhbGlkYXRlZChjYikge1xuICAgIHRoaXMuc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBjYik7XG4gICAgcmV0dXJuICgpID0+IHRoaXMuc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBjYik7XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybiBhIHByb21pc2UgdGhhdCBuZXZlciByZXNvbHZlcy4gVXNlZnVsIGlmIHlvdSBoYXZlIGFuIGFzeW5jIGZ1bmN0aW9uIHRoYXQgc2hvdWxkbid0IHJ1blxuICAgKiBhZnRlciB0aGUgY29udGV4dCBpcyBleHBpcmVkLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCBnZXRWYWx1ZUZyb21TdG9yYWdlID0gYXN5bmMgKCkgPT4ge1xuICAgKiAgIGlmIChjdHguaXNJbnZhbGlkKSByZXR1cm4gY3R4LmJsb2NrKCk7XG4gICAqXG4gICAqICAgLy8gLi4uXG4gICAqIH1cbiAgICovXG4gIGJsb2NrKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgoKSA9PiB7XG4gICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIFdyYXBwZXIgYXJvdW5kIGB3aW5kb3cuc2V0SW50ZXJ2YWxgIHRoYXQgYXV0b21hdGljYWxseSBjbGVhcnMgdGhlIGludGVydmFsIHdoZW4gaW52YWxpZGF0ZWQuXG4gICAqL1xuICBzZXRJbnRlcnZhbChoYW5kbGVyLCB0aW1lb3V0KSB7XG4gICAgY29uc3QgaWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5pc1ZhbGlkKSBoYW5kbGVyKCk7XG4gICAgfSwgdGltZW91dCk7XG4gICAgdGhpcy5vbkludmFsaWRhdGVkKCgpID0+IGNsZWFySW50ZXJ2YWwoaWQpKTtcbiAgICByZXR1cm4gaWQ7XG4gIH1cbiAgLyoqXG4gICAqIFdyYXBwZXIgYXJvdW5kIGB3aW5kb3cuc2V0VGltZW91dGAgdGhhdCBhdXRvbWF0aWNhbGx5IGNsZWFycyB0aGUgaW50ZXJ2YWwgd2hlbiBpbnZhbGlkYXRlZC5cbiAgICovXG4gIHNldFRpbWVvdXQoaGFuZGxlciwgdGltZW91dCkge1xuICAgIGNvbnN0IGlkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5pc1ZhbGlkKSBoYW5kbGVyKCk7XG4gICAgfSwgdGltZW91dCk7XG4gICAgdGhpcy5vbkludmFsaWRhdGVkKCgpID0+IGNsZWFyVGltZW91dChpZCkpO1xuICAgIHJldHVybiBpZDtcbiAgfVxuICAvKipcbiAgICogV3JhcHBlciBhcm91bmQgYHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWVgIHRoYXQgYXV0b21hdGljYWxseSBjYW5jZWxzIHRoZSByZXF1ZXN0IHdoZW5cbiAgICogaW52YWxpZGF0ZWQuXG4gICAqL1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2FsbGJhY2spIHtcbiAgICBjb25zdCBpZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoLi4uYXJncykgPT4ge1xuICAgICAgaWYgKHRoaXMuaXNWYWxpZCkgY2FsbGJhY2soLi4uYXJncyk7XG4gICAgfSk7XG4gICAgdGhpcy5vbkludmFsaWRhdGVkKCgpID0+IGNhbmNlbEFuaW1hdGlvbkZyYW1lKGlkKSk7XG4gICAgcmV0dXJuIGlkO1xuICB9XG4gIC8qKlxuICAgKiBXcmFwcGVyIGFyb3VuZCBgd2luZG93LnJlcXVlc3RJZGxlQ2FsbGJhY2tgIHRoYXQgYXV0b21hdGljYWxseSBjYW5jZWxzIHRoZSByZXF1ZXN0IHdoZW5cbiAgICogaW52YWxpZGF0ZWQuXG4gICAqL1xuICByZXF1ZXN0SWRsZUNhbGxiYWNrKGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgY29uc3QgaWQgPSByZXF1ZXN0SWRsZUNhbGxiYWNrKCguLi5hcmdzKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuc2lnbmFsLmFib3J0ZWQpIGNhbGxiYWNrKC4uLmFyZ3MpO1xuICAgIH0sIG9wdGlvbnMpO1xuICAgIHRoaXMub25JbnZhbGlkYXRlZCgoKSA9PiBjYW5jZWxJZGxlQ2FsbGJhY2soaWQpKTtcbiAgICByZXR1cm4gaWQ7XG4gIH1cbiAgYWRkRXZlbnRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGhhbmRsZXIsIG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZSA9PT0gXCJ3eHQ6bG9jYXRpb25jaGFuZ2VcIikge1xuICAgICAgaWYgKHRoaXMuaXNWYWxpZCkgdGhpcy5sb2NhdGlvbldhdGNoZXIucnVuKCk7XG4gICAgfVxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyPy4oXG4gICAgICB0eXBlLnN0YXJ0c1dpdGgoXCJ3eHQ6XCIpID8gZ2V0VW5pcXVlRXZlbnROYW1lKHR5cGUpIDogdHlwZSxcbiAgICAgIGhhbmRsZXIsXG4gICAgICB7XG4gICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgIHNpZ25hbDogdGhpcy5zaWduYWxcbiAgICAgIH1cbiAgICApO1xuICB9XG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICogQWJvcnQgdGhlIGFib3J0IGNvbnRyb2xsZXIgYW5kIGV4ZWN1dGUgYWxsIGBvbkludmFsaWRhdGVkYCBsaXN0ZW5lcnMuXG4gICAqL1xuICBub3RpZnlJbnZhbGlkYXRlZCgpIHtcbiAgICB0aGlzLmFib3J0KFwiQ29udGVudCBzY3JpcHQgY29udGV4dCBpbnZhbGlkYXRlZFwiKTtcbiAgICBsb2dnZXIuZGVidWcoXG4gICAgICBgQ29udGVudCBzY3JpcHQgXCIke3RoaXMuY29udGVudFNjcmlwdE5hbWV9XCIgY29udGV4dCBpbnZhbGlkYXRlZGBcbiAgICApO1xuICB9XG4gIHN0b3BPbGRTY3JpcHRzKCkge1xuICAgIHdpbmRvdy5wb3N0TWVzc2FnZShcbiAgICAgIHtcbiAgICAgICAgdHlwZTogQ29udGVudFNjcmlwdENvbnRleHQuU0NSSVBUX1NUQVJURURfTUVTU0FHRV9UWVBFLFxuICAgICAgICBjb250ZW50U2NyaXB0TmFtZTogdGhpcy5jb250ZW50U2NyaXB0TmFtZSxcbiAgICAgICAgbWVzc2FnZUlkOiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgyKVxuICAgICAgfSxcbiAgICAgIFwiKlwiXG4gICAgKTtcbiAgfVxuICB2ZXJpZnlTY3JpcHRTdGFydGVkRXZlbnQoZXZlbnQpIHtcbiAgICBjb25zdCBpc1NjcmlwdFN0YXJ0ZWRFdmVudCA9IGV2ZW50LmRhdGE/LnR5cGUgPT09IENvbnRlbnRTY3JpcHRDb250ZXh0LlNDUklQVF9TVEFSVEVEX01FU1NBR0VfVFlQRTtcbiAgICBjb25zdCBpc1NhbWVDb250ZW50U2NyaXB0ID0gZXZlbnQuZGF0YT8uY29udGVudFNjcmlwdE5hbWUgPT09IHRoaXMuY29udGVudFNjcmlwdE5hbWU7XG4gICAgY29uc3QgaXNOb3REdXBsaWNhdGUgPSAhdGhpcy5yZWNlaXZlZE1lc3NhZ2VJZHMuaGFzKGV2ZW50LmRhdGE/Lm1lc3NhZ2VJZCk7XG4gICAgcmV0dXJuIGlzU2NyaXB0U3RhcnRlZEV2ZW50ICYmIGlzU2FtZUNvbnRlbnRTY3JpcHQgJiYgaXNOb3REdXBsaWNhdGU7XG4gIH1cbiAgbGlzdGVuRm9yTmV3ZXJTY3JpcHRzKG9wdGlvbnMpIHtcbiAgICBsZXQgaXNGaXJzdCA9IHRydWU7XG4gICAgY29uc3QgY2IgPSAoZXZlbnQpID0+IHtcbiAgICAgIGlmICh0aGlzLnZlcmlmeVNjcmlwdFN0YXJ0ZWRFdmVudChldmVudCkpIHtcbiAgICAgICAgdGhpcy5yZWNlaXZlZE1lc3NhZ2VJZHMuYWRkKGV2ZW50LmRhdGEubWVzc2FnZUlkKTtcbiAgICAgICAgY29uc3Qgd2FzRmlyc3QgPSBpc0ZpcnN0O1xuICAgICAgICBpc0ZpcnN0ID0gZmFsc2U7XG4gICAgICAgIGlmICh3YXNGaXJzdCAmJiBvcHRpb25zPy5pZ25vcmVGaXJzdEV2ZW50KSByZXR1cm47XG4gICAgICAgIHRoaXMubm90aWZ5SW52YWxpZGF0ZWQoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGNiKTtcbiAgICB0aGlzLm9uSW52YWxpZGF0ZWQoKCkgPT4gcmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgY2IpKTtcbiAgfVxufVxuIiwiY29uc3QgbnVsbEtleSA9IFN5bWJvbCgnbnVsbCcpOyAvLyBgb2JqZWN0SGFzaGVzYCBrZXkgZm9yIG51bGxcblxubGV0IGtleUNvdW50ZXIgPSAwO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYW55S2V5c01hcCBleHRlbmRzIE1hcCB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl9vYmplY3RIYXNoZXMgPSBuZXcgV2Vha01hcCgpO1xuXHRcdHRoaXMuX3N5bWJvbEhhc2hlcyA9IG5ldyBNYXAoKTsgLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvZWNtYTI2Mi9pc3N1ZXMvMTE5NFxuXHRcdHRoaXMuX3B1YmxpY0tleXMgPSBuZXcgTWFwKCk7XG5cblx0XHRjb25zdCBbcGFpcnNdID0gYXJndW1lbnRzOyAvLyBNYXAgY29tcGF0XG5cdFx0aWYgKHBhaXJzID09PSBudWxsIHx8IHBhaXJzID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIHBhaXJzW1N5bWJvbC5pdGVyYXRvcl0gIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IodHlwZW9mIHBhaXJzICsgJyBpcyBub3QgaXRlcmFibGUgKGNhbm5vdCByZWFkIHByb3BlcnR5IFN5bWJvbChTeW1ib2wuaXRlcmF0b3IpKScpO1xuXHRcdH1cblxuXHRcdGZvciAoY29uc3QgW2tleXMsIHZhbHVlXSBvZiBwYWlycykge1xuXHRcdFx0dGhpcy5zZXQoa2V5cywgdmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cdF9nZXRQdWJsaWNLZXlzKGtleXMsIGNyZWF0ZSA9IGZhbHNlKSB7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGtleXMpKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUga2V5cyBwYXJhbWV0ZXIgbXVzdCBiZSBhbiBhcnJheScpO1xuXHRcdH1cblxuXHRcdGNvbnN0IHByaXZhdGVLZXkgPSB0aGlzLl9nZXRQcml2YXRlS2V5KGtleXMsIGNyZWF0ZSk7XG5cblx0XHRsZXQgcHVibGljS2V5O1xuXHRcdGlmIChwcml2YXRlS2V5ICYmIHRoaXMuX3B1YmxpY0tleXMuaGFzKHByaXZhdGVLZXkpKSB7XG5cdFx0XHRwdWJsaWNLZXkgPSB0aGlzLl9wdWJsaWNLZXlzLmdldChwcml2YXRlS2V5KTtcblx0XHR9IGVsc2UgaWYgKGNyZWF0ZSkge1xuXHRcdFx0cHVibGljS2V5ID0gWy4uLmtleXNdOyAvLyBSZWdlbmVyYXRlIGtleXMgYXJyYXkgdG8gYXZvaWQgZXh0ZXJuYWwgaW50ZXJhY3Rpb25cblx0XHRcdHRoaXMuX3B1YmxpY0tleXMuc2V0KHByaXZhdGVLZXksIHB1YmxpY0tleSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtwcml2YXRlS2V5LCBwdWJsaWNLZXl9O1xuXHR9XG5cblx0X2dldFByaXZhdGVLZXkoa2V5cywgY3JlYXRlID0gZmFsc2UpIHtcblx0XHRjb25zdCBwcml2YXRlS2V5cyA9IFtdO1xuXHRcdGZvciAobGV0IGtleSBvZiBrZXlzKSB7XG5cdFx0XHRpZiAoa2V5ID09PSBudWxsKSB7XG5cdFx0XHRcdGtleSA9IG51bGxLZXk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGhhc2hlcyA9IHR5cGVvZiBrZXkgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBrZXkgPT09ICdmdW5jdGlvbicgPyAnX29iamVjdEhhc2hlcycgOiAodHlwZW9mIGtleSA9PT0gJ3N5bWJvbCcgPyAnX3N5bWJvbEhhc2hlcycgOiBmYWxzZSk7XG5cblx0XHRcdGlmICghaGFzaGVzKSB7XG5cdFx0XHRcdHByaXZhdGVLZXlzLnB1c2goa2V5KTtcblx0XHRcdH0gZWxzZSBpZiAodGhpc1toYXNoZXNdLmhhcyhrZXkpKSB7XG5cdFx0XHRcdHByaXZhdGVLZXlzLnB1c2godGhpc1toYXNoZXNdLmdldChrZXkpKTtcblx0XHRcdH0gZWxzZSBpZiAoY3JlYXRlKSB7XG5cdFx0XHRcdGNvbnN0IHByaXZhdGVLZXkgPSBgQEBta20tcmVmLSR7a2V5Q291bnRlcisrfUBAYDtcblx0XHRcdFx0dGhpc1toYXNoZXNdLnNldChrZXksIHByaXZhdGVLZXkpO1xuXHRcdFx0XHRwcml2YXRlS2V5cy5wdXNoKHByaXZhdGVLZXkpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeShwcml2YXRlS2V5cyk7XG5cdH1cblxuXHRzZXQoa2V5cywgdmFsdWUpIHtcblx0XHRjb25zdCB7cHVibGljS2V5fSA9IHRoaXMuX2dldFB1YmxpY0tleXMoa2V5cywgdHJ1ZSk7XG5cdFx0cmV0dXJuIHN1cGVyLnNldChwdWJsaWNLZXksIHZhbHVlKTtcblx0fVxuXG5cdGdldChrZXlzKSB7XG5cdFx0Y29uc3Qge3B1YmxpY0tleX0gPSB0aGlzLl9nZXRQdWJsaWNLZXlzKGtleXMpO1xuXHRcdHJldHVybiBzdXBlci5nZXQocHVibGljS2V5KTtcblx0fVxuXG5cdGhhcyhrZXlzKSB7XG5cdFx0Y29uc3Qge3B1YmxpY0tleX0gPSB0aGlzLl9nZXRQdWJsaWNLZXlzKGtleXMpO1xuXHRcdHJldHVybiBzdXBlci5oYXMocHVibGljS2V5KTtcblx0fVxuXG5cdGRlbGV0ZShrZXlzKSB7XG5cdFx0Y29uc3Qge3B1YmxpY0tleSwgcHJpdmF0ZUtleX0gPSB0aGlzLl9nZXRQdWJsaWNLZXlzKGtleXMpO1xuXHRcdHJldHVybiBCb29sZWFuKHB1YmxpY0tleSAmJiBzdXBlci5kZWxldGUocHVibGljS2V5KSAmJiB0aGlzLl9wdWJsaWNLZXlzLmRlbGV0ZShwcml2YXRlS2V5KSk7XG5cdH1cblxuXHRjbGVhcigpIHtcblx0XHRzdXBlci5jbGVhcigpO1xuXHRcdHRoaXMuX3N5bWJvbEhhc2hlcy5jbGVhcigpO1xuXHRcdHRoaXMuX3B1YmxpY0tleXMuY2xlYXIoKTtcblx0fVxuXG5cdGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpIHtcblx0XHRyZXR1cm4gJ01hbnlLZXlzTWFwJztcblx0fVxuXG5cdGdldCBzaXplKCkge1xuXHRcdHJldHVybiBzdXBlci5zaXplO1xuXHR9XG59XG4iLCJpbXBvcnQgTWFueUtleXNNYXAgZnJvbSAnbWFueS1rZXlzLW1hcCc7XG5pbXBvcnQgeyBkZWZ1IH0gZnJvbSAnZGVmdSc7XG5pbXBvcnQgeyBpc0V4aXN0IH0gZnJvbSAnLi9kZXRlY3RvcnMubWpzJztcblxuY29uc3QgZ2V0RGVmYXVsdE9wdGlvbnMgPSAoKSA9PiAoe1xuICB0YXJnZXQ6IGdsb2JhbFRoaXMuZG9jdW1lbnQsXG4gIHVuaWZ5UHJvY2VzczogdHJ1ZSxcbiAgZGV0ZWN0b3I6IGlzRXhpc3QsXG4gIG9ic2VydmVDb25maWdzOiB7XG4gICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgIHN1YnRyZWU6IHRydWUsXG4gICAgYXR0cmlidXRlczogdHJ1ZVxuICB9LFxuICBzaWduYWw6IHZvaWQgMCxcbiAgY3VzdG9tTWF0Y2hlcjogdm9pZCAwXG59KTtcbmNvbnN0IG1lcmdlT3B0aW9ucyA9ICh1c2VyU2lkZU9wdGlvbnMsIGRlZmF1bHRPcHRpb25zKSA9PiB7XG4gIHJldHVybiBkZWZ1KHVzZXJTaWRlT3B0aW9ucywgZGVmYXVsdE9wdGlvbnMpO1xufTtcblxuY29uc3QgdW5pZnlDYWNoZSA9IG5ldyBNYW55S2V5c01hcCgpO1xuZnVuY3Rpb24gY3JlYXRlV2FpdEVsZW1lbnQoaW5zdGFuY2VPcHRpb25zKSB7XG4gIGNvbnN0IHsgZGVmYXVsdE9wdGlvbnMgfSA9IGluc3RhbmNlT3B0aW9ucztcbiAgcmV0dXJuIChzZWxlY3Rvciwgb3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHRhcmdldCxcbiAgICAgIHVuaWZ5UHJvY2VzcyxcbiAgICAgIG9ic2VydmVDb25maWdzLFxuICAgICAgZGV0ZWN0b3IsXG4gICAgICBzaWduYWwsXG4gICAgICBjdXN0b21NYXRjaGVyXG4gICAgfSA9IG1lcmdlT3B0aW9ucyhvcHRpb25zLCBkZWZhdWx0T3B0aW9ucyk7XG4gICAgY29uc3QgdW5pZnlQcm9taXNlS2V5ID0gW1xuICAgICAgc2VsZWN0b3IsXG4gICAgICB0YXJnZXQsXG4gICAgICB1bmlmeVByb2Nlc3MsXG4gICAgICBvYnNlcnZlQ29uZmlncyxcbiAgICAgIGRldGVjdG9yLFxuICAgICAgc2lnbmFsLFxuICAgICAgY3VzdG9tTWF0Y2hlclxuICAgIF07XG4gICAgY29uc3QgY2FjaGVkUHJvbWlzZSA9IHVuaWZ5Q2FjaGUuZ2V0KHVuaWZ5UHJvbWlzZUtleSk7XG4gICAgaWYgKHVuaWZ5UHJvY2VzcyAmJiBjYWNoZWRQcm9taXNlKSB7XG4gICAgICByZXR1cm4gY2FjaGVkUHJvbWlzZTtcbiAgICB9XG4gICAgY29uc3QgZGV0ZWN0UHJvbWlzZSA9IG5ldyBQcm9taXNlKFxuICAgICAgLy8gYmlvbWUtaWdub3JlIGxpbnQvc3VzcGljaW91cy9ub0FzeW5jUHJvbWlzZUV4ZWN1dG9yOiBhdm9pZCBuZXN0aW5nIHByb21pc2VcbiAgICAgIGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKHNpZ25hbD8uYWJvcnRlZCkge1xuICAgICAgICAgIHJldHVybiByZWplY3Qoc2lnbmFsLnJlYXNvbik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihcbiAgICAgICAgICBhc3luYyAobXV0YXRpb25zKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IF8gb2YgbXV0YXRpb25zKSB7XG4gICAgICAgICAgICAgIGlmIChzaWduYWw/LmFib3J0ZWQpIHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29uc3QgZGV0ZWN0UmVzdWx0MiA9IGF3YWl0IGRldGVjdEVsZW1lbnQoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yLFxuICAgICAgICAgICAgICAgIHRhcmdldCxcbiAgICAgICAgICAgICAgICBkZXRlY3RvcixcbiAgICAgICAgICAgICAgICBjdXN0b21NYXRjaGVyXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBpZiAoZGV0ZWN0UmVzdWx0Mi5pc0RldGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZGV0ZWN0UmVzdWx0Mi5yZXN1bHQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICBzaWduYWw/LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgXCJhYm9ydFwiLFxuICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgIHJldHVybiByZWplY3Qoc2lnbmFsLnJlYXNvbik7XG4gICAgICAgICAgfSxcbiAgICAgICAgICB7IG9uY2U6IHRydWUgfVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBkZXRlY3RSZXN1bHQgPSBhd2FpdCBkZXRlY3RFbGVtZW50KHtcbiAgICAgICAgICBzZWxlY3RvcixcbiAgICAgICAgICB0YXJnZXQsXG4gICAgICAgICAgZGV0ZWN0b3IsXG4gICAgICAgICAgY3VzdG9tTWF0Y2hlclxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGRldGVjdFJlc3VsdC5pc0RldGVjdGVkKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUoZGV0ZWN0UmVzdWx0LnJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXQsIG9ic2VydmVDb25maWdzKTtcbiAgICAgIH1cbiAgICApLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgdW5pZnlDYWNoZS5kZWxldGUodW5pZnlQcm9taXNlS2V5KTtcbiAgICB9KTtcbiAgICB1bmlmeUNhY2hlLnNldCh1bmlmeVByb21pc2VLZXksIGRldGVjdFByb21pc2UpO1xuICAgIHJldHVybiBkZXRlY3RQcm9taXNlO1xuICB9O1xufVxuYXN5bmMgZnVuY3Rpb24gZGV0ZWN0RWxlbWVudCh7XG4gIHRhcmdldCxcbiAgc2VsZWN0b3IsXG4gIGRldGVjdG9yLFxuICBjdXN0b21NYXRjaGVyXG59KSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBjdXN0b21NYXRjaGVyID8gY3VzdG9tTWF0Y2hlcihzZWxlY3RvcikgOiB0YXJnZXQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gIHJldHVybiBhd2FpdCBkZXRlY3RvcihlbGVtZW50KTtcbn1cbmNvbnN0IHdhaXRFbGVtZW50ID0gY3JlYXRlV2FpdEVsZW1lbnQoe1xuICBkZWZhdWx0T3B0aW9uczogZ2V0RGVmYXVsdE9wdGlvbnMoKVxufSk7XG5cbmV4cG9ydCB7IGNyZWF0ZVdhaXRFbGVtZW50LCBnZXREZWZhdWx0T3B0aW9ucywgd2FpdEVsZW1lbnQgfTtcbiJdLCJuYW1lcyI6WyJkZWZpbml0aW9uIiwidGhpcyIsIm1vZHVsZSIsInByb3h5VGFyZ2V0IiwidmFsdWUiLCJyZXN1bHQiLCJtZXNzYWdlIiwiRmllbGRUeXBlIiwicHJpbnQiLCJsb2dnZXIiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQU8sV0FBUyxvQkFBb0JBLGFBQVk7QUFDOUMsV0FBT0E7QUFBQSxFQUNUOzs7Ozs7Ozs7OztBQ0ZBLE9BQUMsU0FBVSxRQUFR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V0FBVztBQUFBO2dCQUViLE9BQU87QUFBQSxrQkFDTCxXQUFXO0FBQUEsa0JBQ1gsV0FBVztBQUFBO2dCQUViLGNBQWM7QUFBQSxrQkFDWixXQUFXO0FBQUEsa0JBQ1gsV0FBVztBQUFBO2dCQUViLFdBQVc7QUFBQSxrQkFDVCxXQUFXO0FBQUEsa0JBQ1gsV0FBVztBQUFBO2dCQUViLG1CQUFtQjtBQUFBLGtCQUNqQixXQUFXO0FBQUEsa0JBQ1gsV0FBVztBQUFBO2dCQUViLFVBQVU7QUFBQSxrQkFDUixXQUFXO0FBQUEsa0JBQ1gsV0FBVztBQUFBO2dCQUViLGFBQWE7QUFBQSxrQkFDWCxXQUFXO0FBQUEsa0JBQ1gsV0FBVztBQUFBO2dCQUViLGFBQWE7QUFBQSxrQkFDWCxXQUFXO0FBQUEsa0JBQ1gsV0FBVztBQUFBO2dCQUViLGFBQWE7QUFBQSxrQkFDWCxXQUFXO0FBQUEsa0JBQ1gsV0FBVztBQUFBO2dCQUViLFFBQVE7QUFBQSxrQkFDTixXQUFXO0FBQUEsa0JBQ1gsV0FBVztBQUFBO2dCQUViLFNBQVM7QUFBQSxrQkFDUCxXQUFXO0FBQUEsa0JBQ1gsV0FBVztBQUFBO2dCQUViLFVBQVU7QUFBQSxrQkFDUixXQUFXO0FBQUEsa0JBQ1gsV0FBVztBQUFBO2dCQUViLFVBQVU7QUFBQSxrQkFDUixXQUFXO0FBQUEsa0JBQ1gsV0FBVztBQUFBO2dCQUViLGFBQWE7QUFBQSxrQkFDWCxXQUFXO0FBQUEsa0JBQ1gsV0FBVztBQUFBO2dCQUViLGVBQWU7QUFBQSxrQkFDYixXQUFXO0FBQUEsa0JBQ1gsV0FBVztBQUFBO2dCQUViLFdBQVc7QUFBQSxrQkFDVCxXQUFXO0FBQUEsa0JBQ1gsV0FBVztBQUFBO2dCQUViLG1CQUFtQjtBQUFBLGtCQUNqQixXQUFXO0FBQUEsa0JBQ1gsV0FBVztBQUFBO2dCQUViLFVBQVU7QUFBQSxrQkFDUixXQUFXO0FBQUEsa0JBQ1gsV0FBVztBQUFBLGdCQUN2QjtBQUFBO2NBRVEsWUFBWTtBQUFBLGdCQUNWLE9BQU87QUFBQSxrQkFDTCxXQUFXO0FBQUEsa0JBQ1gsV0FB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R0FBRyxJQUFJO0FBQ3BCLGFBQUssWUFBWSxJQUFJLFlBQVksU0FBUztBQUFBLE1BQzNDO0FBRUEsYUFBTyxFQUFDLFlBQVksVUFBUztBQUFBLElBQzlCO0FBQUEsSUFFQSxlQUFlLE1BQU0sU0FBUyxPQUFPO0FBQ3BDLFlBQU0sY0FBYyxDQUFBO0FBQ3BCLGVBQVMsT0FBTyxNQUFNO0FBQ3JCLFlBQUksUUFBUSxNQUFNO0FBQ2pCLGdCQUFNO0FBQUEsUUFDUDtBQUVBLGNBQU0sU0FBUyxPQUFPLFFBQVEsWUFBWSxPQUFPLFFBQVEsYUFBYSxrQkFBbUIsT0FBTyxRQUFRLFdBQVcsa0JBQWtCO0FBRXJJLFlBQUksQ0FBQyxRQUFRO0FBQ1osc0JBQVksS0FBSyxHQUFHO0FBQUEsUUFDckIsV0FBVyxLQUFLLE1BQU0sRUFBRSxJQUFJLEdBQUcsR0FBRztBQUNqQyxzQkFBWSxLQUFLLEtBQUssTUFBTSxFQUFFLElBQUksR0FBRyxDQUFDO0FBQUEsUUFDdkMsV0FBVyxRQUFRO0FBQ2xCLGdCQUFNLGFBQWEsYUFBYSxZQUFZO0FBQzVDLGVBQUssTUFBTSxFQUFFLElBQUksS0FBSyxVQUFVO0FBQ2hDLHNCQUFZLEtBQUssVUFBVTtBQUFBLFFBQzVCLE9BQU87QUFDTixpQkFBTztBQUFBLFFBQ1I7QUFBQSxNQUNEO0FBRUEsYUFBTyxLQUFLLFVBQVUsV0FBVztBQUFBLElBQ2xDO0FBQUEsSUFFQSxJQUFJLE1BQU0sT0FBTztBQUNoQixZQUFNLEVBQUMsVUFBUyxJQUFJLEtBQUssZUFBZSxNQUFNLElBQUk7QUFDbEQsYUFBTyxNQUFNLElBQUksV0FBVyxLQUFLO0FBQUEsSUFDbEM7QUFBQSxJQUVBLElBQUksTUFBTTtBQUNULFlBQU0sRUFBQyxVQUFTLElBQUksS0FBSyxlQUFlLElBQUk7QUFDNUMsYUFBTyxNQUFNLElBQUksU0FBUztBQUFBLElBQzNCO0FBQUEsSUFFQSxJQUFJLE1BQU07QUFDVCxZQUFNLEVBQUMsVUFBUyxJQUFJLEtBQUssZUFBZSxJQUFJO0FBQzVDLGFBQU8sTUFBTSxJQUFJLFNBQVM7QUFBQSxJQUMzQjtBQUFBLElBRUEsT0FBTyxNQUFNO0FBQ1osWUFBTSxFQUFDLFdBQVcsV0FBVSxJQUFJLEtBQUssZUFBZSxJQUFJO0FBQ3hELGFBQU8sUUFBUSxhQUFhLE1BQU0sT0FBTyxTQUFTLEtBQUssS0FBSyxZQUFZLE9BQU8sVUFBVSxDQUFDO0FBQUEsSUFDM0Y7QUFBQSxJQUVBLFFBQVE7QUFDUCxZQUFNLE1BQUs7QUFDWCxXQUFLLGNBQWMsTUFBSztBQUN4QixXQUFLLFlBQVksTUFBSztBQUFBLElBQ3ZCO0FBQUEsSUFFQSxLQUFLLE9BQU8sV0FBVyxJQUFJO0FBQzFCLGFBQU87QUFBQSxJQUNSO0FBQUEsSUFFQSxJQUFJLE9BQU87QUFDVixhQUFPLE1BQU07QUFBQSxJQUNkO0FBQUEsRUFDRDtBQ2xGbUIsTUFBSSxZQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzAsMSwyLDExLDEyLDEzLDE0LDE1LDE2XX0=
