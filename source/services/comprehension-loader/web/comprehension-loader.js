"use strict";(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f();}else if(typeof define==="function"&&define.amd){define([],f);}else{var g;if(typeof window!=="undefined"){g=window;}else if(typeof global!=="undefined"){g=global;}else if(typeof self!=="undefined"){g=self;}else{g=this;}g.comprehensionLoader=f();}})(function(){var define,module,exports;return function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a;}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r);},p,p.exports,r,e,n,t);}return n[i].exports;}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o;}return r;}()({1:[function(require,module,exports){module.exports={"name":"fable-serviceproviderbase","version":"3.0.19","description":"Simple base classes for fable services.","main":"source/Fable-ServiceProviderBase.js","scripts":{"start":"node source/Fable-ServiceProviderBase.js","test":"npx quack test","tests":"npx quack test -g","coverage":"npx quack coverage","build":"npx quack build","types":"tsc -p ./tsconfig.build.json","check":"tsc -p . --noEmit"},"types":"types/source/Fable-ServiceProviderBase.d.ts","mocha":{"diff":true,"extension":["js"],"package":"./package.json","reporter":"spec","slow":"75","timeout":"5000","ui":"tdd","watch-files":["source/**/*.js","test/**/*.js"],"watch-ignore":["lib/vendor"]},"repository":{"type":"git","url":"https://github.com/stevenvelozo/fable-serviceproviderbase.git"},"keywords":["entity","behavior"],"author":"Steven Velozo <steven@velozo.com> (http://velozo.com/)","license":"MIT","bugs":{"url":"https://github.com/stevenvelozo/fable-serviceproviderbase/issues"},"homepage":"https://github.com/stevenvelozo/fable-serviceproviderbase","devDependencies":{"@types/mocha":"^10.0.10","fable":"^3.1.62","quackage":"^1.0.58","typescript":"^5.9.3"}};},{}],2:[function(require,module,exports){/**
* Fable Service Base
* @author <steven@velozo.com>
*/const libPackage=require('../package.json');class FableServiceProviderBase{/**
	 * The constructor can be used in two ways:
	 * 1) With a fable, options object and service hash (the options object and service hash are optional)a
	 * 2) With an object or nothing as the first parameter, where it will be treated as the options object
	 *
	 * @param {import('fable')|Record<string, any>} [pFable] - (optional) The fable instance, or the options object if there is no fable
	 * @param {Record<string, any>|string} [pOptions] - (optional) The options object, or the service hash if there is no fable
	 * @param {string} [pServiceHash] - (optional) The service hash to identify this service instance
	 */constructor(pFable,pOptions,pServiceHash){/** @type {import('fable')} */this.fable;/** @type {string} */this.UUID;/** @type {Record<string, any>} */this.options;/** @type {Record<string, any>} */this.services;/** @type {Record<string, any>} */this.servicesMap;// Check if a fable was passed in; connect it if so
if(typeof pFable==='object'&&pFable.isFable){this.connectFable(pFable);}else{this.fable=false;}// Initialize the services map if it wasn't passed in
/** @type {Record<string, any>} */this._PackageFableServiceProvider=libPackage;// initialize options and UUID based on whether the fable was passed in or not.
if(this.fable){this.UUID=pFable.getUUID();this.options=typeof pOptions==='object'?pOptions:{};}else{// With no fable, check to see if there was an object passed into either of the first two
// Parameters, and if so, treat it as the options object
this.options=typeof pFable==='object'&&!pFable.isFable?pFable:typeof pOptions==='object'?pOptions:{};this.UUID=`CORE-SVC-${Math.floor(Math.random()*(99999-10000)+10000)}`;}// It's expected that the deriving class will set this
this.serviceType=`Unknown-${this.UUID}`;// The service hash is used to identify the specific instantiation of the service in the services map
this.Hash=typeof pServiceHash==='string'?pServiceHash:!this.fable&&typeof pOptions==='string'?pOptions:`${this.UUID}`;}/**
	 * @param {import('fable')} pFable
	 */connectFable(pFable){if(typeof pFable!=='object'||!pFable.isFable){let tmpErrorMessage=`Fable Service Provider Base: Cannot connect to Fable, invalid Fable object passed in.  The pFable parameter was a [${typeof pFable}].}`;console.log(tmpErrorMessage);return new Error(tmpErrorMessage);}if(!this.fable){this.fable=pFable;}if(!this.log){this.log=this.fable.Logging;}if(!this.services){this.services=this.fable.services;}if(!this.servicesMap){this.servicesMap=this.fable.servicesMap;}return true;}static isFableService=true;}module.exports=FableServiceProviderBase;// This is left here in case we want to go back to having different code/base class for "core" services
module.exports.CoreServiceProviderBase=FableServiceProviderBase;},{"../package.json":1}],3:[function(require,module,exports){module.exports={"name":"pict-application","version":"1.0.34","description":"Application base class for a pict view-based application","main":"source/Pict-Application.js","scripts":{"test":"npx quack test","start":"node source/Pict-Application.js","coverage":"npx quack coverage","build":"npx quack build","docker-dev-build":"docker build ./ -f Dockerfile_LUXURYCode -t pict-application-image:local","docker-dev-run":"docker run -it -d --name pict-application-dev -p 30001:8080 -p 38086:8086 -v \"$PWD/.config:/home/coder/.config\"  -v \"$PWD:/home/coder/pict-application\" -u \"$(id -u):$(id -g)\" -e \"DOCKER_USER=$USER\" pict-application-image:local","docker-dev-shell":"docker exec -it pict-application-dev /bin/bash","tests":"npx quack test -g","lint":"eslint source/**","types":"tsc -p ."},"types":"types/source/Pict-Application.d.ts","repository":{"type":"git","url":"git+https://github.com/stevenvelozo/pict-application.git"},"author":"steven velozo <steven@velozo.com>","license":"MIT","bugs":{"url":"https://github.com/stevenvelozo/pict-application/issues"},"homepage":"https://github.com/stevenvelozo/pict-application#readme","devDependencies":{"@eslint/js":"^9.28.0","browser-env":"^3.3.0","eslint":"^9.28.0","pict":"^1.0.348","pict-docuserve":"^0.1.5","pict-provider":"^1.0.10","pict-view":"^1.0.66","quackage":"^1.1.0","typescript":"^5.9.3"},"mocha":{"diff":true,"extension":["js"],"package":"./package.json","reporter":"spec","slow":"75","timeout":"5000","ui":"tdd","watch-files":["source/**/*.js","test/**/*.js"],"watch-ignore":["lib/vendor"]},"dependencies":{"fable-serviceproviderbase":"^3.0.19"}};},{}],4:[function(require,module,exports){const libFableServiceBase=require('fable-serviceproviderbase');const libPackage=require('../package.json');const defaultPictSettings={Name:'DefaultPictApplication',// The main "viewport" is the view that is used to host our application
MainViewportViewIdentifier:'Default-View',MainViewportRenderableHash:false,MainViewportDestinationAddress:false,MainViewportDefaultDataAddress:false,// Whether or not we should automatically render the main viewport and other autorender views after we initialize the pict application
AutoSolveAfterInitialize:true,AutoRenderMainViewportViewAfterInitialize:true,AutoRenderViewsAfterInitialize:false,AutoLoginAfterInitialize:false,AutoLoadDataAfterLogin:false,ConfigurationOnlyViews:[],Manifests:{},// The prefix to prepend on all template destination hashes
IdentifierAddressPrefix:'PICT-'};/**
 * Base class for pict applications.
 */class PictApplication extends libFableServiceBase{/**
	 * @param {import('fable')} pFable
	 * @param {Record<string, any>} [pOptions]
	 * @param {string} [pServiceHash]
	 */constructor(pFable,pOptions,pServiceHash){let tmpCarryOverConfiguration=typeof pFable.settings.PictApplicationConfiguration==='object'?pFable.settings.PictApplicationConfiguration:{};let tmpOptions=Object.assign({},JSON.parse(JSON.stringify(defaultPictSettings)),tmpCarryOverConfiguration,pOptions);super(pFable,tmpOptions,pServiceHash);/** @type {any} */this.options;/** @type {any} */this.log;/** @type {import('pict') & import('fable')} */this.fable;/** @type {string} */this.UUID;/** @type {string} */this.Hash;/**
		 * @type {{ [key: string]: any }}
		 */this.servicesMap;this.serviceType='PictApplication';/** @type {Record<string, any>} */this._Package=libPackage;// Convenience and consistency naming
this.pict=this.fable;// Wire in the essential Pict state
/** @type {Record<string, any>} */this.AppData=this.fable.AppData;/** @type {Record<string, any>} */this.Bundle=this.fable.Bundle;/** @type {number} */this.initializeTimestamp;/** @type {number} */this.lastSolvedTimestamp;/** @type {number} */this.lastLoginTimestamp;/** @type {number} */this.lastMarshalFromViewsTimestamp;/** @type {number} */this.lastMarshalToViewsTimestamp;/** @type {number} */this.lastAutoRenderTimestamp;/** @type {number} */this.lastLoadDataTimestamp;// Load all the manifests for the application
let tmpManifestKeys=Object.keys(this.options.Manifests);if(tmpManifestKeys.length>0){for(let i=0;i<tmpManifestKeys.length;i++){// Load each manifest
let tmpManifestKey=tmpManifestKeys[i];this.fable.instantiateServiceProvider('Manifest',this.options.Manifests[tmpManifestKey],tmpManifestKey);}}}/* -------------------------------------------------------------------------- *//*                     Code Section: Solve All Views                          *//* -------------------------------------------------------------------------- *//**
	 * @return {boolean}
	 */onPreSolve(){if(this.pict.LogNoisiness>3){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onPreSolve:`);}return true;}/**
	 * @param {(error?: Error) => void} fCallback
	 */onPreSolveAsync(fCallback){this.onPreSolve();return fCallback();}/**
	 * @return {boolean}
	 */onBeforeSolve(){if(this.pict.LogNoisiness>3){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onBeforeSolve:`);}return true;}/**
	 * @param {(error?: Error) => void} fCallback
	 */onBeforeSolveAsync(fCallback){this.onBeforeSolve();return fCallback();}/**
	 * @return {boolean}
	 */onSolve(){if(this.pict.LogNoisiness>3){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onSolve:`);}return true;}/**
	 * @param {(error?: Error) => void} fCallback
	 */onSolveAsync(fCallback){this.onSolve();return fCallback();}/**
	 * @return {boolean}
	 */solve(){if(this.pict.LogNoisiness>2){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} executing solve() function...`);}// Walk through any loaded providers and solve them as well.
let tmpLoadedProviders=Object.keys(this.pict.providers);let tmpProvidersToSolve=[];for(let i=0;i<tmpLoadedProviders.length;i++){let tmpProvider=this.pict.providers[tmpLoadedProviders[i]];if(tmpProvider.options.AutoSolveWithApp){tmpProvidersToSolve.push(tmpProvider);}}// Sort the providers by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
tmpProvidersToSolve.sort((a,b)=>{return a.options.AutoSolveOrdinal-b.options.AutoSolveOrdinal;});for(let i=0;i<tmpProvidersToSolve.length;i++){tmpProvidersToSolve[i].solve(tmpProvidersToSolve[i]);}this.onBeforeSolve();// Now walk through any loaded views and initialize them as well.
let tmpLoadedViews=Object.keys(this.pict.views);let tmpViewsToSolve=[];for(let i=0;i<tmpLoadedViews.length;i++){let tmpView=this.pict.views[tmpLoadedViews[i]];if(tmpView.options.AutoInitialize){tmpViewsToSolve.push(tmpView);}}// Sort the views by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
tmpViewsToSolve.sort((a,b)=>{return a.options.AutoInitializeOrdinal-b.options.AutoInitializeOrdinal;});for(let i=0;i<tmpViewsToSolve.length;i++){tmpViewsToSolve[i].solve();}this.onSolve();this.onAfterSolve();this.lastSolvedTimestamp=this.fable.log.getTimeStamp();return true;}/**
	 * @param {(error?: Error) => void} fCallback
	 */solveAsync(fCallback){let tmpAnticipate=this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');tmpAnticipate.anticipate(this.onBeforeSolveAsync.bind(this));// Allow the callback to be passed in as the last parameter no matter what
let tmpCallback=typeof fCallback==='function'?fCallback:false;if(!tmpCallback){this.log.warn(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} solveAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions.`);tmpCallback=pError=>{if(pError){this.log.error(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} solveAsync Auto Callback Error: ${pError}`,pError);}};}// Walk through any loaded providers and solve them as well.
let tmpLoadedProviders=Object.keys(this.pict.providers);let tmpProvidersToSolve=[];for(let i=0;i<tmpLoadedProviders.length;i++){let tmpProvider=this.pict.providers[tmpLoadedProviders[i]];if(tmpProvider.options.AutoSolveWithApp){tmpProvidersToSolve.push(tmpProvider);}}// Sort the providers by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
tmpProvidersToSolve.sort((a,b)=>{return a.options.AutoSolveOrdinal-b.options.AutoSolveOrdinal;});for(let i=0;i<tmpProvidersToSolve.length;i++){tmpAnticipate.anticipate(tmpProvidersToSolve[i].solveAsync.bind(tmpProvidersToSolve[i]));}// Walk through any loaded views and solve them as well.
let tmpLoadedViews=Object.keys(this.pict.views);let tmpViewsToSolve=[];for(let i=0;i<tmpLoadedViews.length;i++){let tmpView=this.pict.views[tmpLoadedViews[i]];if(tmpView.options.AutoSolveWithApp){tmpViewsToSolve.push(tmpView);}}// Sort the views by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
tmpViewsToSolve.sort((a,b)=>{return a.options.AutoSolveOrdinal-b.options.AutoSolveOrdinal;});for(let i=0;i<tmpViewsToSolve.length;i++){tmpAnticipate.anticipate(tmpViewsToSolve[i].solveAsync.bind(tmpViewsToSolve[i]));}tmpAnticipate.anticipate(this.onSolveAsync.bind(this));tmpAnticipate.anticipate(this.onAfterSolveAsync.bind(this));tmpAnticipate.wait(pError=>{if(this.pict.LogNoisiness>2){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} solveAsync() complete.`);}this.lastSolvedTimestamp=this.fable.log.getTimeStamp();return tmpCallback(pError);});}/**
	 * @return {boolean}
	 */onAfterSolve(){if(this.pict.LogNoisiness>3){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onAfterSolve:`);}return true;}/**
	 * @param {(error?: Error) => void} fCallback
	 */onAfterSolveAsync(fCallback){this.onAfterSolve();return fCallback();}/* -------------------------------------------------------------------------- *//*                     Code Section: Application Login                        *//* -------------------------------------------------------------------------- *//**
	 * @param {(error?: Error) => void} fCallback
	 */onBeforeLoginAsync(fCallback){if(this.pict.LogNoisiness>3){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onBeforeLoginAsync:`);}return fCallback();}/**
	 * @param {(error?: Error) => void} fCallback
	 */onLoginAsync(fCallback){if(this.pict.LogNoisiness>3){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onLoginAsync:`);}return fCallback();}/**
	 * @param {(error?: Error) => void} fCallback
	 */loginAsync(fCallback){const tmpAnticipate=this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');let tmpCallback=fCallback;if(typeof tmpCallback!=='function'){this.log.warn(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} loginAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions.`);tmpCallback=pError=>{if(pError){this.log.error(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} loginAsync Auto Callback Error: ${pError}`,pError);}};}tmpAnticipate.anticipate(this.onBeforeLoginAsync.bind(this));tmpAnticipate.anticipate(this.onLoginAsync.bind(this));tmpAnticipate.anticipate(this.onAfterLoginAsync.bind(this));// check and see if we should automatically trigger a data load
if(this.options.AutoLoadDataAfterLogin){tmpAnticipate.anticipate(fNext=>{if(!this.isLoggedIn()){return fNext();}if(this.pict.LogNoisiness>1){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} auto loading data after login...`);}//TODO: should data load errors funnel here? this creates a weird coupling between login and data load callbacks
this.loadDataAsync(pError=>{fNext(pError);});});}tmpAnticipate.wait(pError=>{if(this.pict.LogNoisiness>2){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} loginAsync() complete.`);}this.lastLoginTimestamp=this.fable.log.getTimeStamp();return tmpCallback(pError);});}/**
	 * Check if the application state is logged in. Defaults to true. Override this method in your application based on login requirements.
	 *
	 * @return {boolean}
	 */isLoggedIn(){return true;}/**
	 * @param {(error?: Error) => void} fCallback
	 */onAfterLoginAsync(fCallback){if(this.pict.LogNoisiness>3){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onAfterLoginAsync:`);}return fCallback();}/* -------------------------------------------------------------------------- *//*                     Code Section: Application LoadData                     *//* -------------------------------------------------------------------------- *//**
	 * @param {(error?: Error) => void} fCallback
	 */onBeforeLoadDataAsync(fCallback){if(this.pict.LogNoisiness>3){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onBeforeLoadDataAsync:`);}return fCallback();}/**
	 * @param {(error?: Error) => void} fCallback
	 */onLoadDataAsync(fCallback){if(this.pict.LogNoisiness>3){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onLoadDataAsync:`);}return fCallback();}/**
	 * @param {(error?: Error) => void} fCallback
	 */loadDataAsync(fCallback){const tmpAnticipate=this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');let tmpCallback=fCallback;if(typeof tmpCallback!=='function'){this.log.warn(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} loadDataAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions.`);tmpCallback=pError=>{if(pError){this.log.error(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} loadDataAsync Auto Callback Error: ${pError}`,pError);}};}tmpAnticipate.anticipate(this.onBeforeLoadDataAsync.bind(this));// Walk through any loaded providers and load their data as well.
let tmpLoadedProviders=Object.keys(this.pict.providers);let tmpProvidersToLoadData=[];for(let i=0;i<tmpLoadedProviders.length;i++){let tmpProvider=this.pict.providers[tmpLoadedProviders[i]];if(tmpProvider.options.AutoLoadDataWithApp){tmpProvidersToLoadData.push(tmpProvider);}}// Sort the providers by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
tmpProvidersToLoadData.sort((a,b)=>{return a.options.AutoLoadDataOrdinal-b.options.AutoLoadDataOrdinal;});for(const tmpProvider of tmpProvidersToLoadData){tmpAnticipate.anticipate(tmpProvider.onBeforeLoadDataAsync.bind(tmpProvider));}tmpAnticipate.anticipate(this.onLoadDataAsync.bind(this));//TODO: think about ways to parallelize these
for(const tmpProvider of tmpProvidersToLoadData){tmpAnticipate.anticipate(tmpProvider.onLoadDataAsync.bind(tmpProvider));}tmpAnticipate.anticipate(this.onAfterLoadDataAsync.bind(this));for(const tmpProvider of tmpProvidersToLoadData){tmpAnticipate.anticipate(tmpProvider.onAfterLoadDataAsync.bind(tmpProvider));}tmpAnticipate.wait(/** @param {Error} [pError] */pError=>{if(this.pict.LogNoisiness>2){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} loadDataAsync() complete.`);}this.lastLoadDataTimestamp=this.fable.log.getTimeStamp();return tmpCallback(pError);});}/**
	 * @param {(error?: Error) => void} fCallback
	 */onAfterLoadDataAsync(fCallback){if(this.pict.LogNoisiness>3){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onAfterLoadDataAsync:`);}return fCallback();}/* -------------------------------------------------------------------------- *//*                     Code Section: Application SaveData                     *//* -------------------------------------------------------------------------- *//**
	 * @param {(error?: Error) => void} fCallback
	 */onBeforeSaveDataAsync(fCallback){if(this.pict.LogNoisiness>3){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onBeforeSaveDataAsync:`);}return fCallback();}/**
	 * @param {(error?: Error) => void} fCallback
	 */onSaveDataAsync(fCallback){if(this.pict.LogNoisiness>3){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onSaveDataAsync:`);}return fCallback();}/**
	 * @param {(error?: Error) => void} fCallback
	 */saveDataAsync(fCallback){const tmpAnticipate=this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');let tmpCallback=fCallback;if(typeof tmpCallback!=='function'){this.log.warn(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} saveDataAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions.`);tmpCallback=pError=>{if(pError){this.log.error(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} saveDataAsync Auto Callback Error: ${pError}`,pError);}};}tmpAnticipate.anticipate(this.onBeforeSaveDataAsync.bind(this));// Walk through any loaded providers and load their data as well.
let tmpLoadedProviders=Object.keys(this.pict.providers);let tmpProvidersToSaveData=[];for(let i=0;i<tmpLoadedProviders.length;i++){let tmpProvider=this.pict.providers[tmpLoadedProviders[i]];if(tmpProvider.options.AutoSaveDataWithApp){tmpProvidersToSaveData.push(tmpProvider);}}// Sort the providers by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
tmpProvidersToSaveData.sort((a,b)=>{return a.options.AutoSaveDataOrdinal-b.options.AutoSaveDataOrdinal;});for(const tmpProvider of tmpProvidersToSaveData){tmpAnticipate.anticipate(tmpProvider.onBeforeSaveDataAsync.bind(tmpProvider));}tmpAnticipate.anticipate(this.onSaveDataAsync.bind(this));//TODO: think about ways to parallelize these
for(const tmpProvider of tmpProvidersToSaveData){tmpAnticipate.anticipate(tmpProvider.onSaveDataAsync.bind(tmpProvider));}tmpAnticipate.anticipate(this.onAfterSaveDataAsync.bind(this));for(const tmpProvider of tmpProvidersToSaveData){tmpAnticipate.anticipate(tmpProvider.onAfterSaveDataAsync.bind(tmpProvider));}tmpAnticipate.wait(/** @param {Error} [pError] */pError=>{if(this.pict.LogNoisiness>2){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} saveDataAsync() complete.`);}this.lastSaveDataTimestamp=this.fable.log.getTimeStamp();return tmpCallback(pError);});}/**
	 * @param {(error?: Error) => void} fCallback
	 */onAfterSaveDataAsync(fCallback){if(this.pict.LogNoisiness>3){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onAfterSaveDataAsync:`);}return fCallback();}/* -------------------------------------------------------------------------- *//*                     Code Section: Initialize Application                   *//* -------------------------------------------------------------------------- *//**
	 * @return {boolean}
	 */onBeforeInitialize(){if(this.pict.LogNoisiness>3){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onBeforeInitialize:`);}return true;}/**
	 * @param {(error?: Error) => void} fCallback
	 */onBeforeInitializeAsync(fCallback){this.onBeforeInitialize();return fCallback();}/**
	 * @return {boolean}
	 */onInitialize(){if(this.pict.LogNoisiness>3){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onInitialize:`);}return true;}/**
	 * @param {(error?: Error) => void} fCallback
	 */onInitializeAsync(fCallback){this.onInitialize();return fCallback();}/**
	 * @return {boolean}
	 */initialize(){if(this.pict.LogControlFlow){this.log.trace(`PICT-ControlFlow APPLICATION [${this.UUID}]::[${this.Hash}] ${this.options.Name} initialize:`);}if(!this.initializeTimestamp){this.onBeforeInitialize();if('ConfigurationOnlyViews'in this.options){// Load all the configuration only views
for(let i=0;i<this.options.ConfigurationOnlyViews.length;i++){let tmpViewIdentifier=typeof this.options.ConfigurationOnlyViews[i].ViewIdentifier==='undefined'?`AutoView-${this.fable.getUUID()}`:this.options.ConfigurationOnlyViews[i].ViewIdentifier;this.log.info(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} adding configuration only view: ${tmpViewIdentifier}`);this.pict.addView(tmpViewIdentifier,this.options.ConfigurationOnlyViews[i]);}}this.onInitialize();// Walk through any loaded providers and initialize them as well.
let tmpLoadedProviders=Object.keys(this.pict.providers);let tmpProvidersToInitialize=[];for(let i=0;i<tmpLoadedProviders.length;i++){let tmpProvider=this.pict.providers[tmpLoadedProviders[i]];if(tmpProvider.options.AutoInitialize){tmpProvidersToInitialize.push(tmpProvider);}}// Sort the providers by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
tmpProvidersToInitialize.sort((a,b)=>{return a.options.AutoInitializeOrdinal-b.options.AutoInitializeOrdinal;});for(let i=0;i<tmpProvidersToInitialize.length;i++){tmpProvidersToInitialize[i].initialize();}// Now walk through any loaded views and initialize them as well.
let tmpLoadedViews=Object.keys(this.pict.views);let tmpViewsToInitialize=[];for(let i=0;i<tmpLoadedViews.length;i++){let tmpView=this.pict.views[tmpLoadedViews[i]];if(tmpView.options.AutoInitialize){tmpViewsToInitialize.push(tmpView);}}// Sort the views by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
tmpViewsToInitialize.sort((a,b)=>{return a.options.AutoInitializeOrdinal-b.options.AutoInitializeOrdinal;});for(let i=0;i<tmpViewsToInitialize.length;i++){tmpViewsToInitialize[i].initialize();}this.onAfterInitialize();if(this.options.AutoSolveAfterInitialize){if(this.pict.LogNoisiness>1){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} auto solving after initialization...`);}// Solve the template synchronously
this.solve();}// Now check and see if we should automatically render as well
if(this.options.AutoRenderMainViewportViewAfterInitialize){if(this.pict.LogNoisiness>1){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} auto rendering after initialization...`);}// Render the template synchronously
this.render();}this.initializeTimestamp=this.fable.log.getTimeStamp();this.onCompletionOfInitialize();return true;}else{this.log.warn(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} initialize called but initialization is already completed.  Aborting.`);return false;}}/**
	 * @param {(error?: Error) => void} fCallback
	 */initializeAsync(fCallback){if(this.pict.LogControlFlow){this.log.trace(`PICT-ControlFlow APPLICATION [${this.UUID}]::[${this.Hash}] ${this.options.Name} initializeAsync:`);}// Allow the callback to be passed in as the last parameter no matter what
let tmpCallback=typeof fCallback==='function'?fCallback:false;if(!tmpCallback){this.log.warn(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} initializeAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions.`);tmpCallback=pError=>{if(pError){this.log.error(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} initializeAsync Auto Callback Error: ${pError}`,pError);}};}if(!this.initializeTimestamp){let tmpAnticipate=this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');if(this.pict.LogNoisiness>3){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} beginning initialization...`);}if('ConfigurationOnlyViews'in this.options){// Load all the configuration only views
for(let i=0;i<this.options.ConfigurationOnlyViews.length;i++){let tmpViewIdentifier=typeof this.options.ConfigurationOnlyViews[i].ViewIdentifier==='undefined'?`AutoView-${this.fable.getUUID()}`:this.options.ConfigurationOnlyViews[i].ViewIdentifier;this.log.info(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} adding configuration only view: ${tmpViewIdentifier}`);this.pict.addView(tmpViewIdentifier,this.options.ConfigurationOnlyViews[i]);}}tmpAnticipate.anticipate(this.onBeforeInitializeAsync.bind(this));tmpAnticipate.anticipate(this.onInitializeAsync.bind(this));// Walk through any loaded providers and solve them as well.
let tmpLoadedProviders=Object.keys(this.pict.providers);let tmpProvidersToInitialize=[];for(let i=0;i<tmpLoadedProviders.length;i++){let tmpProvider=this.pict.providers[tmpLoadedProviders[i]];if(tmpProvider.options.AutoInitialize){tmpProvidersToInitialize.push(tmpProvider);}}// Sort the providers by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
tmpProvidersToInitialize.sort((a,b)=>{return a.options.AutoInitializeOrdinal-b.options.AutoInitializeOrdinal;});for(let i=0;i<tmpProvidersToInitialize.length;i++){tmpAnticipate.anticipate(tmpProvidersToInitialize[i].initializeAsync.bind(tmpProvidersToInitialize[i]));}// Now walk through any loaded views and initialize them as well.
// TODO: Some optimization cleverness could be gained by grouping them into a parallelized async operation, by ordinal.
let tmpLoadedViews=Object.keys(this.pict.views);let tmpViewsToInitialize=[];for(let i=0;i<tmpLoadedViews.length;i++){let tmpView=this.pict.views[tmpLoadedViews[i]];if(tmpView.options.AutoInitialize){tmpViewsToInitialize.push(tmpView);}}// Sort the views by their priority
// If they are all the default priority 0, it will end up being add order due to JSON Object Property Key order stuff
tmpViewsToInitialize.sort((a,b)=>{return a.options.AutoInitializeOrdinal-b.options.AutoInitializeOrdinal;});for(let i=0;i<tmpViewsToInitialize.length;i++){let tmpView=tmpViewsToInitialize[i];tmpAnticipate.anticipate(tmpView.initializeAsync.bind(tmpView));}tmpAnticipate.anticipate(this.onAfterInitializeAsync.bind(this));if(this.options.AutoLoginAfterInitialize){if(this.pict.LogNoisiness>1){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} auto login (asynchronously) after initialization...`);}tmpAnticipate.anticipate(this.loginAsync.bind(this));}if(this.options.AutoSolveAfterInitialize){if(this.pict.LogNoisiness>1){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} auto solving (asynchronously) after initialization...`);}tmpAnticipate.anticipate(this.solveAsync.bind(this));}if(this.options.AutoRenderMainViewportViewAfterInitialize){if(this.pict.LogNoisiness>1){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} auto rendering (asynchronously) after initialization...`);}tmpAnticipate.anticipate(this.renderMainViewportAsync.bind(this));}tmpAnticipate.wait(pError=>{if(pError){this.log.error(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} initializeAsync Error: ${pError.message||pError}`,{stack:pError.stack});}this.initializeTimestamp=this.fable.log.getTimeStamp();if(this.pict.LogNoisiness>2){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} initialization complete.`);}return tmpCallback();});}else{this.log.warn(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} async initialize called but initialization is already completed.  Aborting.`);// TODO: Should this be an error?
return this.onCompletionOfInitializeAsync(tmpCallback);}}/**
	 * @return {boolean}
	 */onAfterInitialize(){if(this.pict.LogNoisiness>3){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onAfterInitialize:`);}return true;}/**
	 * @param {(error?: Error) => void} fCallback
	 */onAfterInitializeAsync(fCallback){this.onAfterInitialize();return fCallback();}/**
	 * @return {boolean}
	 */onCompletionOfInitialize(){if(this.pict.LogNoisiness>3){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onCompletionOfInitialize:`);}return true;}/**
	 * @param {(error?: Error) => void} fCallback
	 */onCompletionOfInitializeAsync(fCallback){this.onCompletionOfInitialize();return fCallback();}/* -------------------------------------------------------------------------- *//*                     Code Section: Marshal Data From All Views              *//* -------------------------------------------------------------------------- *//**
	 * @return {boolean}
	 */onBeforeMarshalFromViews(){if(this.pict.LogNoisiness>3){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onBeforeMarshalFromViews:`);}return true;}/**
	 * @param {(error?: Error) => void} fCallback
	 */onBeforeMarshalFromViewsAsync(fCallback){this.onBeforeMarshalFromViews();return fCallback();}/**
	 * @return {boolean}
	 */onMarshalFromViews(){if(this.pict.LogNoisiness>3){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onMarshalFromViews:`);}return true;}/**
	 * @param {(error?: Error) => void} fCallback
	 */onMarshalFromViewsAsync(fCallback){this.onMarshalFromViews();return fCallback();}/**
	 * @return {boolean}
	 */marshalFromViews(){if(this.pict.LogNoisiness>2){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} executing marshalFromViews() function...`);}this.onBeforeMarshalFromViews();// Now walk through any loaded views and initialize them as well.
let tmpLoadedViews=Object.keys(this.pict.views);let tmpViewsToMarshalFromViews=[];for(let i=0;i<tmpLoadedViews.length;i++){let tmpView=this.pict.views[tmpLoadedViews[i]];tmpViewsToMarshalFromViews.push(tmpView);}for(let i=0;i<tmpViewsToMarshalFromViews.length;i++){tmpViewsToMarshalFromViews[i].marshalFromView();}this.onMarshalFromViews();this.onAfterMarshalFromViews();this.lastMarshalFromViewsTimestamp=this.fable.log.getTimeStamp();return true;}/**
	 * @param {(error?: Error) => void} fCallback
	 */marshalFromViewsAsync(fCallback){let tmpAnticipate=this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');// Allow the callback to be passed in as the last parameter no matter what
let tmpCallback=typeof fCallback==='function'?fCallback:false;if(!tmpCallback){this.log.warn(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} marshalFromViewsAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions.`);tmpCallback=pError=>{if(pError){this.log.error(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} marshalFromViewsAsync Auto Callback Error: ${pError}`,pError);}};}tmpAnticipate.anticipate(this.onBeforeMarshalFromViewsAsync.bind(this));// Walk through any loaded views and marshalFromViews them as well.
let tmpLoadedViews=Object.keys(this.pict.views);let tmpViewsToMarshalFromViews=[];for(let i=0;i<tmpLoadedViews.length;i++){let tmpView=this.pict.views[tmpLoadedViews[i]];tmpViewsToMarshalFromViews.push(tmpView);}for(let i=0;i<tmpViewsToMarshalFromViews.length;i++){tmpAnticipate.anticipate(tmpViewsToMarshalFromViews[i].marshalFromViewAsync.bind(tmpViewsToMarshalFromViews[i]));}tmpAnticipate.anticipate(this.onMarshalFromViewsAsync.bind(this));tmpAnticipate.anticipate(this.onAfterMarshalFromViewsAsync.bind(this));tmpAnticipate.wait(pError=>{if(this.pict.LogNoisiness>2){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} marshalFromViewsAsync() complete.`);}this.lastMarshalFromViewsTimestamp=this.fable.log.getTimeStamp();return tmpCallback(pError);});}/**
	 * @return {boolean}
	 */onAfterMarshalFromViews(){if(this.pict.LogNoisiness>3){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onAfterMarshalFromViews:`);}return true;}/**
	 * @param {(error?: Error) => void} fCallback
	 */onAfterMarshalFromViewsAsync(fCallback){this.onAfterMarshalFromViews();return fCallback();}/* -------------------------------------------------------------------------- *//*                     Code Section: Marshal Data To All Views                *//* -------------------------------------------------------------------------- *//**
	 * @return {boolean}
	 */onBeforeMarshalToViews(){if(this.pict.LogNoisiness>3){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onBeforeMarshalToViews:`);}return true;}/**
	 * @param {(error?: Error) => void} fCallback
	 */onBeforeMarshalToViewsAsync(fCallback){this.onBeforeMarshalToViews();return fCallback();}/**
	 * @return {boolean}
	 */onMarshalToViews(){if(this.pict.LogNoisiness>3){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onMarshalToViews:`);}return true;}/**
	 * @param {(error?: Error) => void} fCallback
	 */onMarshalToViewsAsync(fCallback){this.onMarshalToViews();return fCallback();}/**
	 * @return {boolean}
	 */marshalToViews(){if(this.pict.LogNoisiness>2){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} executing marshalToViews() function...`);}this.onBeforeMarshalToViews();// Now walk through any loaded views and initialize them as well.
let tmpLoadedViews=Object.keys(this.pict.views);let tmpViewsToMarshalToViews=[];for(let i=0;i<tmpLoadedViews.length;i++){let tmpView=this.pict.views[tmpLoadedViews[i]];tmpViewsToMarshalToViews.push(tmpView);}for(let i=0;i<tmpViewsToMarshalToViews.length;i++){tmpViewsToMarshalToViews[i].marshalToView();}this.onMarshalToViews();this.onAfterMarshalToViews();this.lastMarshalToViewsTimestamp=this.fable.log.getTimeStamp();return true;}/**
	 * @param {(error?: Error) => void} fCallback
	 */marshalToViewsAsync(fCallback){let tmpAnticipate=this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');// Allow the callback to be passed in as the last parameter no matter what
let tmpCallback=typeof fCallback==='function'?fCallback:false;if(!tmpCallback){this.log.warn(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} marshalToViewsAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions.`);tmpCallback=pError=>{if(pError){this.log.error(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} marshalToViewsAsync Auto Callback Error: ${pError}`,pError);}};}tmpAnticipate.anticipate(this.onBeforeMarshalToViewsAsync.bind(this));// Walk through any loaded views and marshalToViews them as well.
let tmpLoadedViews=Object.keys(this.pict.views);let tmpViewsToMarshalToViews=[];for(let i=0;i<tmpLoadedViews.length;i++){let tmpView=this.pict.views[tmpLoadedViews[i]];tmpViewsToMarshalToViews.push(tmpView);}for(let i=0;i<tmpViewsToMarshalToViews.length;i++){tmpAnticipate.anticipate(tmpViewsToMarshalToViews[i].marshalToViewAsync.bind(tmpViewsToMarshalToViews[i]));}tmpAnticipate.anticipate(this.onMarshalToViewsAsync.bind(this));tmpAnticipate.anticipate(this.onAfterMarshalToViewsAsync.bind(this));tmpAnticipate.wait(pError=>{if(this.pict.LogNoisiness>2){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} marshalToViewsAsync() complete.`);}this.lastMarshalToViewsTimestamp=this.fable.log.getTimeStamp();return tmpCallback(pError);});}/**
	 * @return {boolean}
	 */onAfterMarshalToViews(){if(this.pict.LogNoisiness>3){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onAfterMarshalToViews:`);}return true;}/**
	 * @param {(error?: Error) => void} fCallback
	 */onAfterMarshalToViewsAsync(fCallback){this.onAfterMarshalToViews();return fCallback();}/* -------------------------------------------------------------------------- *//*                     Code Section: Render View                              *//* -------------------------------------------------------------------------- *//**
	 * @return {boolean}
	 */onBeforeRender(){if(this.pict.LogNoisiness>3){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onBeforeRender:`);}return true;}/**
	 * @param {(error?: Error) => void} fCallback
	 */onBeforeRenderAsync(fCallback){this.onBeforeRender();return fCallback();}/**
	 * @param {string} [pViewIdentifier] - The hash of the view to render. By default, the main viewport view is rendered.
	 * @param {string} [pRenderableHash] - The hash of the renderable to render.
	 * @param {string} [pRenderDestinationAddress] - The address where the renderable will be rendered.
	 * @param {string} [pTemplateDataAddress] - The address where the data for the template is stored.
	 *
	 * TODO: Should we support objects for pTemplateDataAddress for parity with pict-view?
	 */render(pViewIdentifier,pRenderableHash,pRenderDestinationAddress,pTemplateDataAddress){let tmpViewIdentifier=typeof pViewIdentifier!=='string'?this.options.MainViewportViewIdentifier:pViewIdentifier;let tmpRenderableHash=typeof pRenderableHash!=='string'?this.options.MainViewportRenderableHash:pRenderableHash;let tmpRenderDestinationAddress=typeof pRenderDestinationAddress!=='string'?this.options.MainViewportDestinationAddress:pRenderDestinationAddress;let tmpTemplateDataAddress=typeof pTemplateDataAddress!=='string'?this.options.MainViewportDefaultDataAddress:pTemplateDataAddress;if(this.pict.LogControlFlow){this.log.trace(`PICT-ControlFlow APPLICATION [${this.UUID}]::[${this.Hash}] ${this.options.Name} VIEW Renderable[${tmpRenderableHash}] Destination[${tmpRenderDestinationAddress}] TemplateDataAddress[${tmpTemplateDataAddress}] render:`);}this.onBeforeRender();// Now get the view (by hash) from the loaded views
let tmpView=typeof tmpViewIdentifier==='string'?this.servicesMap.PictView[tmpViewIdentifier]:false;if(!tmpView){this.log.error(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} could not render from View ${tmpViewIdentifier} because it is not a valid view.`);return false;}this.onRender();tmpView.render(tmpRenderableHash,tmpRenderDestinationAddress,tmpTemplateDataAddress);this.onAfterRender();return true;}/**
	 * @return {boolean}
	 */onRender(){if(this.pict.LogNoisiness>3){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onRender:`);}return true;}/**
	 * @param {(error?: Error) => void} fCallback
	 */onRenderAsync(fCallback){this.onRender();return fCallback();}/**
	 * @param {string|((error?: Error) => void)} pViewIdentifier - The hash of the view to render. By default, the main viewport view is rendered. (or the callback)
	 * @param {string|((error?: Error) => void)} [pRenderableHash] - The hash of the renderable to render. (or the callback)
	 * @param {string|((error?: Error) => void)} [pRenderDestinationAddress] - The address where the renderable will be rendered. (or the callback)
	 * @param {string|((error?: Error) => void)} [pTemplateDataAddress] - The address where the data for the template is stored. (or the callback)
	 * @param {(error?: Error) => void} [fCallback] - The callback, if all other parameters are provided.
	 *
	 * TODO: Should we support objects for pTemplateDataAddress for parity with pict-view?
	 */renderAsync(pViewIdentifier,pRenderableHash,pRenderDestinationAddress,pTemplateDataAddress,fCallback){let tmpViewIdentifier=typeof pViewIdentifier!=='string'?this.options.MainViewportViewIdentifier:pViewIdentifier;let tmpRenderableHash=typeof pRenderableHash!=='string'?this.options.MainViewportRenderableHash:pRenderableHash;let tmpRenderDestinationAddress=typeof pRenderDestinationAddress!=='string'?this.options.MainViewportDestinationAddress:pRenderDestinationAddress;let tmpTemplateDataAddress=typeof pTemplateDataAddress!=='string'?this.options.MainViewportDefaultDataAddress:pTemplateDataAddress;// Allow the callback to be passed in as the last parameter no matter what
let tmpCallback=typeof fCallback==='function'?fCallback:typeof pTemplateDataAddress==='function'?pTemplateDataAddress:typeof pRenderDestinationAddress==='function'?pRenderDestinationAddress:typeof pRenderableHash==='function'?pRenderableHash:typeof pViewIdentifier==='function'?pViewIdentifier:false;if(!tmpCallback){this.log.warn(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} renderAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions.`);tmpCallback=pError=>{if(pError){this.log.error(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} renderAsync Auto Callback Error: ${pError}`,pError);}};}if(this.pict.LogControlFlow){this.log.trace(`PICT-ControlFlow APPLICATION [${this.UUID}]::[${this.Hash}] ${this.options.Name} VIEW Renderable[${tmpRenderableHash}] Destination[${tmpRenderDestinationAddress}] TemplateDataAddress[${tmpTemplateDataAddress}] renderAsync:`);}let tmpRenderAnticipate=this.fable.newAnticipate();tmpRenderAnticipate.anticipate(this.onBeforeRenderAsync.bind(this));let tmpView=typeof tmpViewIdentifier==='string'?this.servicesMap.PictView[tmpViewIdentifier]:false;if(!tmpView){let tmpErrorMessage=`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} could not asynchronously render from View ${tmpViewIdentifier} because it is not a valid view.`;if(this.pict.LogNoisiness>3){this.log.error(tmpErrorMessage);}return tmpCallback(new Error(tmpErrorMessage));}tmpRenderAnticipate.anticipate(this.onRenderAsync.bind(this));tmpRenderAnticipate.anticipate(fNext=>{tmpView.renderAsync.call(tmpView,tmpRenderableHash,tmpRenderDestinationAddress,tmpTemplateDataAddress,fNext);});tmpRenderAnticipate.anticipate(this.onAfterRenderAsync.bind(this));return tmpRenderAnticipate.wait(tmpCallback);}/**
	 * @return {boolean}
	 */onAfterRender(){if(this.pict.LogNoisiness>3){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} onAfterRender:`);}return true;}/**
	 * @param {(error?: Error) => void} fCallback
	 */onAfterRenderAsync(fCallback){this.onAfterRender();return fCallback();}/**
	 * @return {boolean}
	 */renderMainViewport(){if(this.pict.LogControlFlow){this.log.trace(`PICT-ControlFlow APPLICATION [${this.UUID}]::[${this.Hash}] ${this.options.Name} renderMainViewport:`);}return this.render();}/**
	 * @param {(error?: Error) => void} fCallback
	 */renderMainViewportAsync(fCallback){if(this.pict.LogControlFlow){this.log.trace(`PICT-ControlFlow APPLICATION [${this.UUID}]::[${this.Hash}] ${this.options.Name} renderMainViewportAsync:`);}return this.renderAsync(fCallback);}/**
	 * @return {void}
	 */renderAutoViews(){if(this.pict.LogNoisiness>0){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} beginning renderAutoViews...`);}// Now walk through any loaded views and sort them by the AutoRender ordinal
let tmpLoadedViews=Object.keys(this.pict.views);// Sort the views by their priority
// If they are all the default priority 0, it will end up being add order due to JSON Object Property Key order stuff
tmpLoadedViews.sort((a,b)=>{return this.pict.views[a].options.AutoRenderOrdinal-this.pict.views[b].options.AutoRenderOrdinal;});for(let i=0;i<tmpLoadedViews.length;i++){let tmpView=this.pict.views[tmpLoadedViews[i]];if(tmpView.options.AutoRender){tmpView.render();}}if(this.pict.LogNoisiness>0){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} renderAutoViewsAsync complete.`);}}/**
	 * @param {(error?: Error) => void} fCallback
	 */renderAutoViewsAsync(fCallback){let tmpAnticipate=this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');// Allow the callback to be passed in as the last parameter no matter what
let tmpCallback=typeof fCallback==='function'?fCallback:false;if(!tmpCallback){this.log.warn(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} renderAutoViewsAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions.`);tmpCallback=pError=>{if(pError){this.log.error(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} renderAutoViewsAsync Auto Callback Error: ${pError}`,pError);}};}if(this.pict.LogNoisiness>0){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} beginning renderAutoViewsAsync...`);}// Now walk through any loaded views and sort them by the AutoRender ordinal
// TODO: Some optimization cleverness could be gained by grouping them into a parallelized async operation, by ordinal.
let tmpLoadedViews=Object.keys(this.pict.views);// Sort the views by their priority
// If they are all the default priority 0, it will end up being add order due to JSON Object Property Key order stuff
tmpLoadedViews.sort((a,b)=>{return this.pict.views[a].options.AutoRenderOrdinal-this.pict.views[b].options.AutoRenderOrdinal;});for(let i=0;i<tmpLoadedViews.length;i++){let tmpView=this.pict.views[tmpLoadedViews[i]];if(tmpView.options.AutoRender){tmpAnticipate.anticipate(tmpView.renderAsync.bind(tmpView));}}tmpAnticipate.wait(pError=>{this.lastAutoRenderTimestamp=this.fable.log.getTimeStamp();if(this.pict.LogNoisiness>0){this.log.trace(`PictApp [${this.UUID}]::[${this.Hash}] ${this.options.Name} renderAutoViewsAsync complete.`);}return tmpCallback(pError);});}/**
	 * @return {boolean}
	 */get isPictApplication(){return true;}}module.exports=PictApplication;},{"../package.json":3,"fable-serviceproviderbase":2}],5:[function(require,module,exports){/**
 * Pict Provider: Theme
 *
 * Runtime theme manager for Pict applications.  Registers theme bundles
 * (token maps + CSS + SVG + image assets) and applies them by injecting
 * CSS custom properties into a single <style id="pict-theme"> element.
 *
 * Themes can be:
 *   - Single-mode (Modes.Strategy = "single")
 *   - Paired light/dark (Modes.Strategy = "paired")
 *   - System-aware (Modes.Strategy = "system" — paired + auto-pick)
 *
 * Mode is reflected as `theme-light` / `theme-dark` class on <html>.
 *
 * Token resolution path examples:
 *   provider.token('Tokens.Color.Background.Primary') -> raw current value
 *   provider.cssVar('Color.Background.Primary')       -> 'var(--theme-color-background-primary)'
 *   provider.asset('SVG', 'Logo')                     -> SVG string
 *   provider.image('Hero')                            -> image URL / data URL
 *
 * Template expressions registered (when pict has addTemplate):
 *   {~Theme:Tokens.Color.Background.Primary~}    raw value
 *   {~ThemeVar:Color.Background.Primary~}        var(--theme-...) reference
 *   {~ThemeAsset:SVG.Logo~}                      asset content
 *   {~ThemeImage:Hero~}                          image URL
 *
 * Stateless: this provider does not persist anything.  Host applications
 * decide what to apply at boot (from localStorage, server config, etc.).
 *
 * @author Steven Velozo <steven@velozo.com>
 * @license MIT
 */const libPictProvider=require('pict-provider');const libDiagramAdapter=require('./Theme-Diagram-Adapter.js');const _ProviderConfiguration={ProviderIdentifier:'Theme',AutoInitialize:true,AutoInitializeOrdinal:0};const STYLE_ELEMENT_ID='pict-theme';const HTML_CLASS_LIGHT='theme-light';const HTML_CLASS_DARK='theme-dark';const CSS_VAR_PREFIX='--theme-';class PictProviderTheme extends libPictProvider{constructor(pFable,pOptions,pServiceHash){super(pFable,pOptions,pServiceHash);this.serviceType='PictProviderTheme';this._themes={};this._themeOrder=[];this._activeHash=null;this._activeMode=null;this._resolvedMode=null;this._registeredCSSHashes=[];this._applyListeners=[];// Diagram adapter: helper API for plugging Mermaid (and any
// future SVG-baking diagram engine) into the theme lifecycle.
// Exposes the same functions as the standalone require, plus
// `adaptMermaid(mermaid, options)` bound to this provider.
let tmpSelf=this;this.diagram={MERMAID_TOKEN_MAP:libDiagramAdapter.MERMAID_TOKEN_MAP,readCSSVar:libDiagramAdapter.readCSSVar,getMermaidTokenMap:libDiagramAdapter.getMermaidTokenMap,buildMermaidThemeVariables:libDiagramAdapter.buildMermaidThemeVariables,initializeMermaid:libDiagramAdapter.initializeMermaid,stashMermaidSource:libDiagramAdapter.stashMermaidSource,refreshMermaidDiagrams:libDiagramAdapter.refreshMermaidDiagrams,stripMermaidStyleImportance:libDiagramAdapter.stripMermaidStyleImportance,adaptMermaid:function(pMermaid,pOptions){return libDiagramAdapter.adaptMermaid(tmpSelf,pMermaid,pOptions);}};// Auto-register the four theme template expressions if the host pict
// supports addTemplate.  In bare-fable/test contexts this is skipped.
if(this.pict&&typeof this.pict.addTemplate==='function'){try{this.pict.addTemplate(require('./templates/Pict-Template-Theme.js'));this.pict.addTemplate(require('./templates/Pict-Template-ThemeVar.js'));this.pict.addTemplate(require('./templates/Pict-Template-ThemeAsset.js'));this.pict.addTemplate(require('./templates/Pict-Template-ThemeImage.js'));}catch(pError){if(this.log)this.log.warn('PictProviderTheme: template registration skipped: '+pError.message);}}}// ================================================================
// Theme registration
// ================================================================
/**
	 * Register a theme bundle.  Bundle is the compiled JSON shape (see
	 * the manifest schema documented in the module README and example themes).
	 *
	 * @param {object} pBundle - parsed manifest object
	 * @returns {boolean} true on success
	 */registerTheme(pBundle){if(!pBundle||typeof pBundle!=='object'){if(this.log)this.log.warn('PictProviderTheme.registerTheme: bundle is not an object');return false;}if(!pBundle.Hash||typeof pBundle.Hash!=='string'){if(this.log)this.log.warn('PictProviderTheme.registerTheme: bundle missing required string Hash');return false;}if(!this._themes[pBundle.Hash]){this._themeOrder.push(pBundle.Hash);}this._themes[pBundle.Hash]=pBundle;return true;}/**
	 * Get an array of registered theme metadata for building UIs.
	 * @returns {Array<{Hash, Name, Version, Strategy, DefaultMode, Comprehensive}>}
	 */listThemes(){let tmpList=[];for(let i=0;i<this._themeOrder.length;i++){let tmpHash=this._themeOrder[i];let tmpTheme=this._themes[tmpHash];let tmpModes=tmpTheme.Modes||{};tmpList.push({Hash:tmpTheme.Hash,Name:tmpTheme.Name||tmpTheme.Hash,Version:tmpTheme.Version||null,Strategy:tmpModes.Strategy||'single',DefaultMode:tmpModes.Default||'light',Comprehensive:tmpTheme.Comprehensive!==false});}return tmpList;}/**
	 * Get the raw stored bundle for a hash.
	 */getTheme(pHash){return this._themes[pHash]||null;}// ================================================================
// Apply / unapply
// ================================================================
/**
	 * Apply a theme by hash.  Optionally specify mode ('light', 'dark', 'system').
	 * If pMode is omitted, the theme's Modes.Default is used.
	 *
	 * @param {string} pHash
	 * @param {string} [pMode]
	 * @returns {boolean}
	 */applyTheme(pHash,pMode){let tmpTheme=this._themes[pHash];if(!tmpTheme){if(this.log)this.log.warn(`PictProviderTheme.applyTheme: unknown theme hash [${pHash}]`);return false;}// Resolve the effective theme bundle (handle BasedOn inheritance).
let tmpEffective=this._resolveBundle(tmpTheme);let tmpStrategy=tmpEffective.Modes&&tmpEffective.Modes.Strategy||'single';let tmpDefaultMode=tmpEffective.Modes&&tmpEffective.Modes.Default||'light';let tmpMode=pMode||tmpDefaultMode;// Single-mode themes cannot be put into dark/light/system; clamp.
if(tmpStrategy==='single'){tmpMode=tmpDefaultMode;}this._activeHash=pHash;this._activeMode=tmpMode;// Build CSS once, regardless of mode (paired themes emit both blocks
// and rely on the html class to switch between them).
let tmpCSS=this._buildThemeCSS(tmpEffective);this._injectStyleElement(tmpCSS);// Register any auxiliary CSS files declared in the bundle through the
// Pict CSS cascade so they participate in injectCSS().
this._registerAuxiliaryCSS(tmpEffective);// Set the html class to drive paired-theme variable resolution.
this._applyMode(tmpMode,tmpStrategy);// Notify subscribers (e.g. apps that need to re-color SVG icon palettes
// from a bundle.IconColors block, swap chart palettes, etc.).
this._fireApplyListeners(tmpEffective);return true;}/**
	 * Change mode without reapplying the theme.  No-op if no theme is active
	 * or active theme is single-mode.
	 *
	 * @param {string} pMode - 'light' | 'dark' | 'system'
	 */setMode(pMode){if(!this._activeHash)return false;let tmpTheme=this._resolveBundle(this._themes[this._activeHash]);let tmpStrategy=tmpTheme.Modes&&tmpTheme.Modes.Strategy||'single';if(tmpStrategy==='single')return false;this._activeMode=pMode;this._applyMode(pMode,tmpStrategy);this._fireApplyListeners(tmpTheme);return true;}// ================================================================
// Listener subscription
// ================================================================
/**
	 * Subscribe to theme apply / mode-change events.  The callback is
	 * invoked with the effective (BasedOn-resolved) bundle and a context
	 * object: { Hash, Mode, ResolvedMode }.
	 *
	 * Apps use this to re-color SVG icon palettes, swap chart colors,
	 * push tokens into non-CSS consumers (canvas, WebGL), etc.
	 *
	 * Returns a dispose function for symmetry with offApply().
	 */onApply(fCallback){if(typeof fCallback!=='function')return function(){};this._applyListeners.push(fCallback);let tmpSelf=this;return function(){tmpSelf.offApply(fCallback);};}offApply(fCallback){let tmpIdx=this._applyListeners.indexOf(fCallback);if(tmpIdx>=0)this._applyListeners.splice(tmpIdx,1);}_fireApplyListeners(pBundle){if(this._applyListeners.length===0)return;let tmpContext={Hash:this._activeHash,Mode:this._activeMode,ResolvedMode:this._resolvedMode};for(let i=0;i<this._applyListeners.length;i++){try{this._applyListeners[i](pBundle,tmpContext);}catch(pError){if(this.log)this.log.warn('PictProviderTheme: onApply listener threw: '+pError.message);}}}/**
	 * Remove the injected style element, html class, and any auxiliary CSS.
	 */unapplyTheme(){if(typeof document!=='undefined'){let tmpStyleEl=document.getElementById(STYLE_ELEMENT_ID);if(tmpStyleEl&&tmpStyleEl.parentNode){tmpStyleEl.parentNode.removeChild(tmpStyleEl);}if(document.documentElement&&document.documentElement.classList){document.documentElement.classList.remove(HTML_CLASS_LIGHT);document.documentElement.classList.remove(HTML_CLASS_DARK);}}// Unregister any auxiliary CSS we added.
if(this.pict&&this.pict.CSSMap&&typeof this.pict.CSSMap.removeCSS==='function'){for(let i=0;i<this._registeredCSSHashes.length;i++){this.pict.CSSMap.removeCSS(this._registeredCSSHashes[i]);}}this._registeredCSSHashes=[];this._activeHash=null;this._activeMode=null;this._resolvedMode=null;return true;}getActiveTheme(){// Live-read ResolvedMode so callers in system mode get the current OS
// preference without the provider having to subscribe to media-query
// changes.  Snapshot mode (explicit light/dark) returns as-is.
return{Hash:this._activeHash,Mode:this._activeMode,ResolvedMode:this._activeHash?this._currentResolvedMode():null};}// ================================================================
// Token / asset accessors
// ================================================================
/**
	 * Resolve a token by dot path against the active theme bundle.  Walks
	 * the entire bundle root, so paths can address Tokens, Brand, etc.
	 *
	 * If the value is paired ({Light, Dark}), returns the value at the
	 * currently resolved mode.
	 *
	 * @param {string} pPath - e.g. 'Tokens.Color.Background.Primary'
	 * @returns {string|number|null}
	 */token(pPath){if(!this._activeHash)return null;let tmpTheme=this._resolveBundle(this._themes[this._activeHash]);let tmpValue=this._walkPath(tmpTheme,pPath);return this._resolveModedValue(tmpValue);}/**
	 * Returns a CSS `var(--theme-...)` reference for a token under Tokens.
	 * Path is given without the Tokens prefix:
	 *   cssVar('Color.Background.Primary') -> 'var(--theme-color-background-primary)'
	 *
	 * @param {string} pTokenPath
	 * @returns {string}
	 */cssVar(pTokenPath){return'var('+this._cssVarName(pTokenPath)+')';}/**
	 * Look up a named asset under SVG, optionally nested (e.g. 'Icons.Foo').
	 * @param {string} pCategory - 'SVG' | 'Image'
	 * @param {string} pName
	 */asset(pCategory,pName){if(!this._activeHash)return null;let tmpTheme=this._resolveBundle(this._themes[this._activeHash]);let tmpRoot=tmpTheme[pCategory];if(!tmpRoot)return null;return this._walkPath(tmpRoot,pName);}image(pName){return this.asset('Image',pName);}svg(pName){return this.asset('SVG',pName);}// ================================================================
// Internals
// ================================================================
/**
	 * Resolve a bundle's BasedOn chain into a single effective bundle by
	 * deep-merging this bundle onto its base.  Cycle-safe.
	 */_resolveBundle(pBundle){let tmpChain=[];let tmpCurrent=pBundle;let tmpSeen={};while(tmpCurrent){if(tmpSeen[tmpCurrent.Hash])break;tmpSeen[tmpCurrent.Hash]=true;tmpChain.unshift(tmpCurrent);let tmpBaseHash=tmpCurrent.BasedOn;tmpCurrent=tmpBaseHash?this._themes[tmpBaseHash]:null;}if(tmpChain.length===1)return tmpChain[0];let tmpResult={};for(let i=0;i<tmpChain.length;i++){tmpResult=this._deepMerge(tmpResult,tmpChain[i]);}return tmpResult;}_deepMerge(pTarget,pSource){let tmpResult=Object.assign({},pTarget);let tmpKeys=Object.keys(pSource);for(let i=0;i<tmpKeys.length;i++){let tmpKey=tmpKeys[i];let tmpVal=pSource[tmpKey];if(tmpVal!==null&&typeof tmpVal==='object'&&!Array.isArray(tmpVal)&&tmpResult[tmpKey]!==null&&typeof tmpResult[tmpKey]==='object'&&!Array.isArray(tmpResult[tmpKey])){tmpResult[tmpKey]=this._deepMerge(tmpResult[tmpKey],tmpVal);}else{tmpResult[tmpKey]=tmpVal;}}return tmpResult;}/**
	 * Walk a dot-path from a starting object.  Returns null if any segment
	 * is missing.  Path segments are matched case-sensitively as authored.
	 */_walkPath(pRoot,pPath){if(!pRoot||!pPath)return null;let tmpSegments=pPath.split('.');let tmpNode=pRoot;for(let i=0;i<tmpSegments.length;i++){if(tmpNode===null||typeof tmpNode!=='object')return null;tmpNode=tmpNode[tmpSegments[i]];if(typeof tmpNode==='undefined')return null;}return tmpNode;}/**
	 * If pValue is a paired-mode object {Light, Dark}, pick the value matching
	 * the current resolved mode.  Otherwise return as-is.
	 *
	 * For system mode this re-reads the OS preference on every call so the
	 * value is always live-correct — no JS listener required to keep it in
	 * sync.  Explicit modes use the snapshotted `_resolvedMode`.
	 */_resolveModedValue(pValue){if(this._isPairedValue(pValue)){let tmpMode=this._currentResolvedMode();let tmpKey=tmpMode==='dark'?'Dark':'Light';return pValue[tmpKey];}return pValue;}_isPairedValue(pValue){return pValue!==null&&typeof pValue==='object'&&!Array.isArray(pValue)&&Object.keys(pValue).length>0&&Object.keys(pValue).every(k=>k==='Light'||k==='Dark');}/**
	 * Build the CSS string for a theme.
	 *
	 * Single-mode themes emit one `:root { ... }` block.
	 *
	 * Paired themes emit four blocks, ordered so the CSS cascade resolves
	 * to the right mode without any JS listeners:
	 *
	 *   1) `:root { ...light... }`                                — baseline
	 *   2) `@media (prefers-color-scheme: dark) { :root { ...dark... } }`
	 *                                                            — OS-driven
	 *   3) `.theme-light { ...light... }`                         — explicit override
	 *   4) `.theme-dark  { ...dark... }`                          — explicit override
	 *
	 * Mode = 'system' is "no class on <html>" — the @media rule drives.
	 * Mode = 'light'/'dark' adds the matching class which wins on tie via
	 * source order (same specificity as :root, but later in the file).
	 *
	 * The result: OS toggle moves the page via CSS alone, no DOM listener
	 * needed, no class flipping.  Explicit setMode() flips the class to
	 * lock the page to one mode regardless of OS preference.
	 *
	 * Only values under bundle.Tokens become CSS custom properties.
	 */_buildThemeCSS(pTheme){let tmpTokens=pTheme.Tokens||{};let tmpFlat=this._flattenTokens(tmpTokens,'');let tmpStrategy=pTheme.Modes&&pTheme.Modes.Strategy||'single';let tmpHasPaired=tmpFlat.some(tmpEntry=>this._isPairedValue(tmpEntry.Value));let tmpAliasLines=this._buildAliasLines(pTheme.Aliases);if(tmpStrategy==='single'||!tmpHasPaired){let tmpCSS=':root {\n';for(let i=0;i<tmpFlat.length;i++){let tmpEntry=tmpFlat[i];let tmpVal=this._isPairedValue(tmpEntry.Value)?tmpEntry.Value.Light:tmpEntry.Value;tmpCSS+='\t'+this._cssVarName(tmpEntry.Path)+': '+this._formatCSSValue(tmpVal)+';\n';}tmpCSS+=tmpAliasLines;tmpCSS+='}\n';return tmpCSS;}// Paired theme: emit the four-block cascade.
let tmpLightLines='';let tmpDarkLines='';let tmpFixedLines='';for(let i=0;i<tmpFlat.length;i++){let tmpEntry=tmpFlat[i];let tmpVarName=this._cssVarName(tmpEntry.Path);if(this._isPairedValue(tmpEntry.Value)){if(typeof tmpEntry.Value.Light!=='undefined'){tmpLightLines+='\t'+tmpVarName+': '+this._formatCSSValue(tmpEntry.Value.Light)+';\n';}if(typeof tmpEntry.Value.Dark!=='undefined'){tmpDarkLines+='\t'+tmpVarName+': '+this._formatCSSValue(tmpEntry.Value.Dark)+';\n';}}else{// Non-paired tokens (spacing, typography, etc.) live in :root only.
tmpFixedLines+='\t'+tmpVarName+': '+this._formatCSSValue(tmpEntry.Value)+';\n';}}// Block 1: :root holds light values + every non-paired token + aliases.
// Aliases use var() indirection, so they resolve to the active mode
// automatically without being duplicated in the dark blocks.
let tmpCSS=':root {\n'+tmpLightLines+tmpFixedLines+tmpAliasLines+'}\n';// Block 2: @media (prefers-color-scheme: dark) — OS-driven dark override.
// Only the paired tokens need to flip; fixed tokens and aliases stay
// the same.  Indented one level for readability.
let tmpMediaInner='';let tmpDarkLinesIndented=tmpDarkLines.replace(/^\t/gm,'\t\t');tmpMediaInner+='\t:root {\n'+tmpDarkLinesIndented+'\t}\n';tmpCSS+='@media (prefers-color-scheme: dark) {\n'+tmpMediaInner+'}\n';// Block 3: .theme-light — explicit override that locks light regardless of OS.
tmpCSS+='.'+HTML_CLASS_LIGHT+' {\n'+tmpLightLines+'}\n';// Block 4: .theme-dark — explicit override that locks dark regardless of OS.
tmpCSS+='.'+HTML_CLASS_DARK+' {\n'+tmpDarkLines+'}\n';return tmpCSS;}/**
	 * Emit alias lines for legacy CSS variable names that map to token paths
	 * under Tokens.  Each alias becomes:
	 *   --legacy-name: var(--theme-color-...);
	 * Indirection-via-var means paired-mode swap propagates without
	 * needing alias entries duplicated in the .theme-dark block.
	 *
	 * Authored as: { "--legacy-name": "Color.Background.Primary", ... }
	 */_buildAliasLines(pAliases){if(!pAliases||typeof pAliases!=='object')return'';let tmpKeys=Object.keys(pAliases);let tmpOut='';for(let i=0;i<tmpKeys.length;i++){let tmpAlias=tmpKeys[i];let tmpTarget=pAliases[tmpAlias];if(typeof tmpTarget!=='string'||tmpTarget.length===0)continue;tmpOut+='\t'+tmpAlias+': var('+this._cssVarName(tmpTarget)+');\n';}return tmpOut;}/**
	 * Walk an arbitrary nested token tree and produce a flat list of
	 * { Path: 'color.background.primary', Value: <leaf> } entries.
	 *
	 * Paired-mode objects ({Light, Dark}) and primitive values are leaves.
	 */_flattenTokens(pNode,pPathPrefix){let tmpResults=[];if(pNode===null||typeof pNode!=='object'||Array.isArray(pNode)){if(pPathPrefix){tmpResults.push({Path:pPathPrefix,Value:pNode});}return tmpResults;}if(this._isPairedValue(pNode)){tmpResults.push({Path:pPathPrefix,Value:pNode});return tmpResults;}let tmpKeys=Object.keys(pNode);for(let i=0;i<tmpKeys.length;i++){let tmpKey=tmpKeys[i];let tmpChildPath=pPathPrefix?pPathPrefix+'.'+tmpKey:tmpKey;let tmpChild=pNode[tmpKey];tmpResults=tmpResults.concat(this._flattenTokens(tmpChild,tmpChildPath));}return tmpResults;}/**
	 * 'Color.Background.Primary' -> '--theme-color-background-primary'
	 */_cssVarName(pTokenPath){return CSS_VAR_PREFIX+pTokenPath.toLowerCase().replace(/\./g,'-');}_formatCSSValue(pValue){if(pValue===null||typeof pValue==='undefined')return'';if(typeof pValue==='number')return String(pValue);return String(pValue);}_injectStyleElement(pCSS){if(typeof document==='undefined')return;let tmpStyleEl=document.getElementById(STYLE_ELEMENT_ID);if(!tmpStyleEl){tmpStyleEl=document.createElement('style');tmpStyleEl.id=STYLE_ELEMENT_ID;document.head.appendChild(tmpStyleEl);}tmpStyleEl.textContent=pCSS;}_registerAuxiliaryCSS(pTheme){// Clear previously registered auxiliary CSS so stale entries don't pile
// up when switching themes.
if(this.pict&&this.pict.CSSMap&&typeof this.pict.CSSMap.removeCSS==='function'){for(let i=0;i<this._registeredCSSHashes.length;i++){this.pict.CSSMap.removeCSS(this._registeredCSSHashes[i]);}}this._registeredCSSHashes=[];if(!Array.isArray(pTheme.CSS))return;if(!this.pict||!this.pict.CSSMap||typeof this.pict.CSSMap.addCSS!=='function')return;for(let i=0;i<pTheme.CSS.length;i++){let tmpEntry=pTheme.CSS[i];if(!tmpEntry||!tmpEntry.Hash||typeof tmpEntry.Content!=='string')continue;let tmpPriority=typeof tmpEntry.Priority==='number'?tmpEntry.Priority:500;this.pict.CSSMap.addCSS(tmpEntry.Hash,tmpEntry.Content,tmpPriority);this._registeredCSSHashes.push(tmpEntry.Hash);}}/**
	 * Apply the requested mode by adjusting the class on <html>.
	 *
	 *   - 'light' / 'dark': the matching class is added so the explicit
	 *     `.theme-light` / `.theme-dark` block in the injected stylesheet
	 *     overrides the @media (prefers-color-scheme) rule.
	 *   - 'system': both classes are cleared so the @media rule drives
	 *     the cascade from the OS preference, with no JS listener needed.
	 *
	 * `_resolvedMode` is snapshotted at apply time so synchronous reads
	 * via `token()` / `getActiveTheme()` return a consistent value.  In
	 * system mode it falls back to `_currentResolvedMode()` for callers
	 * that want a live read on each call.
	 */_applyMode(pMode,pStrategy){if(pMode==='system'){this._resolvedMode=this._readSystemPreference();this._clearHTMLClass();}else{this._resolvedMode=pMode==='dark'?'dark':'light';this._writeHTMLClass(this._resolvedMode);}}_writeHTMLClass(pResolvedMode){if(typeof document==='undefined'||!document.documentElement||!document.documentElement.classList)return;let tmpList=document.documentElement.classList;if(pResolvedMode==='dark'){tmpList.remove(HTML_CLASS_LIGHT);tmpList.add(HTML_CLASS_DARK);}else{tmpList.remove(HTML_CLASS_DARK);tmpList.add(HTML_CLASS_LIGHT);}}_clearHTMLClass(){if(typeof document==='undefined'||!document.documentElement||!document.documentElement.classList)return;let tmpList=document.documentElement.classList;tmpList.remove(HTML_CLASS_LIGHT);tmpList.remove(HTML_CLASS_DARK);}_readSystemPreference(){if(typeof window==='undefined'||typeof window.matchMedia!=='function')return'light';try{return window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}catch(pError){return'light';}}/**
	 * The mode currently driving the page.  Mirrors what the user sees:
	 * explicit modes return their literal value; 'system' reads the OS
	 * preference fresh so token() / getActiveTheme() never report a
	 * stale value when the OS toggles between calls.
	 *
	 * @returns {'light'|'dark'}
	 */_currentResolvedMode(){if(this._activeMode==='system'){return this._readSystemPreference();}return this._resolvedMode==='dark'?'dark':'light';}}PictProviderTheme.default_configuration=_ProviderConfiguration;module.exports=PictProviderTheme;module.exports.STYLE_ELEMENT_ID=STYLE_ELEMENT_ID;module.exports.HTML_CLASS_LIGHT=HTML_CLASS_LIGHT;module.exports.HTML_CLASS_DARK=HTML_CLASS_DARK;module.exports.CSS_VAR_PREFIX=CSS_VAR_PREFIX;module.exports.DiagramAdapter=libDiagramAdapter;},{"./Theme-Diagram-Adapter.js":6,"./templates/Pict-Template-Theme.js":7,"./templates/Pict-Template-ThemeAsset.js":8,"./templates/Pict-Template-ThemeImage.js":9,"./templates/Pict-Template-ThemeVar.js":10,"pict-provider":12}],6:[function(require,module,exports){/**
 * Theme Diagram Adapter
 *
 * Helper utilities for plugging diagram renderers (Mermaid today,
 * Excalidraw / chart libraries next) into the pict-provider-theme
 * lifecycle.
 *
 * Why this exists:
 *   Diagram engines like Mermaid bake colors into the SVG at render
 *   time. Once rendered, CSS alone cannot recolor node fills, cluster
 *   backgrounds, or edge stroke ends — those are inline attributes on
 *   <rect>, <path>, <polygon>, etc.  Switching light/dark requires
 *   the engine to re-render with a fresh themeVariables block.
 *
 *   Pre-adapter, every view that hosted a Mermaid block had to:
 *     - read every CSS custom property by hand
 *     - mirror a 20+ key themeVariables object
 *     - wire its own onApply subscription
 *     - stash diagram source on the DOM
 *     - clear data-processed + re-run on theme change
 *
 *   The adapter centralizes all of that.  Section views call
 *   `adapter.adaptMermaid(mermaid, options)` and stop caring about the
 *   token list, the listener, and the refresh dance.
 *
 *  Public API:
 *     buildMermaidThemeVariables(pOverrides)        - read fresh tokens, return mermaid themeVariables
 *     getMermaidTokenMap()                          - canonical {mermaidKey: cssVarName} map
 *     initializeMermaid(mermaid, pOverrides)        - mermaid.initialize() with the right base + themeVariables
 *     refreshMermaidDiagrams(pSelectorOrRoot)       - restore source, clear data-processed, re-run mermaid.run
 *     stashMermaidSource(pNodes)                    - cache source on data-mermaid-source before first run
 *     adaptMermaid(provider, mermaid, pOptions)     - one-shot: initialize + subscribe + return handle
 *     readCSSVar(pName, pFallback, pRoot)           - fresh getComputedStyle read with fallback
 *
 *  All helpers are stateless and safe to call repeatedly.  Subscriptions
 *  return a dispose function the caller can hold onto for teardown.
 *
 * @author Steven Velozo <steven@velozo.com>
 * @license MIT
 */// Canonical mapping: mermaid themeVariables key -> CSS custom property name -> fallback.
// Fallbacks match the pict-default LIGHT palette so unthemed apps look like
// the default theme rather than a third unrelated palette.
const MERMAID_TOKEN_MAP=[// Primary surfaces (node fills + cluster background)
{Key:'primaryColor',Var:'--theme-color-background-panel',Fallback:'#ffffff'},{Key:'primaryTextColor',Var:'--theme-color-text-primary',Fallback:'#1a1a1a'},{Key:'primaryBorderColor',Var:'--theme-color-brand-primary',Fallback:'#3357c7'},// Secondary (alt rows, alternate nodes, sequence actor bg)
{Key:'secondaryColor',Var:'--theme-color-background-secondary',Fallback:'#f5f5f5'},{Key:'secondaryTextColor',Var:'--theme-color-text-secondary',Fallback:'#454545'},{Key:'secondaryBorderColor',Var:'--theme-color-border-default',Fallback:'#d6d6d6'},// Tertiary (clusters, accent groups)
{Key:'tertiaryColor',Var:'--theme-color-background-tertiary',Fallback:'#ebebeb'},{Key:'tertiaryTextColor',Var:'--theme-color-text-secondary',Fallback:'#454545'},{Key:'tertiaryBorderColor',Var:'--theme-color-border-light',Fallback:'#e9e9e9'},// Page-level + line + note
{Key:'background',Var:'--theme-color-background-panel',Fallback:'#ffffff'},{Key:'mainBkg',Var:'--theme-color-background-panel',Fallback:'#ffffff'},{Key:'secondBkg',Var:'--theme-color-background-secondary',Fallback:'#f5f5f5'},{Key:'lineColor',Var:'--theme-color-text-secondary',Fallback:'#454545'},{Key:'textColor',Var:'--theme-color-text-primary',Fallback:'#1a1a1a'},{Key:'noteBkgColor',Var:'--theme-color-background-tertiary',Fallback:'#ebebeb'},{Key:'noteTextColor',Var:'--theme-color-text-primary',Fallback:'#1a1a1a'},{Key:'noteBorderColor',Var:'--theme-color-border-default',Fallback:'#d6d6d6'},// Status (Mermaid uses these for error/warning highlights)
{Key:'errorBkgColor',Var:'--theme-color-status-error',Fallback:'#b62828'},{Key:'errorTextColor',Var:'--theme-color-text-on-brand',Fallback:'#ffffff'},// Typography
{Key:'fontFamily',Var:'--theme-typography-family-sans',Fallback:'inherit'}];/**
 * Read a CSS custom property off pRoot (default: documentElement).
 * Always issues a fresh getComputedStyle so the value reflects the
 * current class state on <html> (theme-light / theme-dark).
 *
 * @param {string} pName     - variable name including '--' prefix
 * @param {string} [pFallback] - returned when the variable is unset/empty
 * @param {Element} [pRoot]  - element to compute style against
 * @returns {string}
 */function readCSSVar(pName,pFallback,pRoot){if(typeof window==='undefined'||typeof document==='undefined'){return pFallback||'';}let tmpRoot=pRoot||document.documentElement;if(!tmpRoot){return pFallback||'';}let tmpVal=(getComputedStyle(tmpRoot).getPropertyValue(pName)||'').trim();return tmpVal||pFallback||'';}/**
 * Returns the canonical {mermaidKey: cssVarName} mapping.  Useful for
 * apps that need to inspect or extend the token list (e.g. to add
 * gantt / sequence / pie-specific tokens for a custom diagram type).
 *
 * @returns {Array<{Key, Var, Fallback}>}
 */function getMermaidTokenMap(){// Defensive copy so callers can't mutate the canonical list.
return MERMAID_TOKEN_MAP.map(tmpEntry=>({Key:tmpEntry.Key,Var:tmpEntry.Var,Fallback:tmpEntry.Fallback}));}/**
 * Read every token in the mermaid map off the current document and
 * return an object suitable for mermaid.initialize({themeVariables}).
 *
 * @param {object} [pOverrides] - extra themeVariables keys to merge on top
 * @returns {object}
 */function buildMermaidThemeVariables(pOverrides){let tmpVars={};for(let i=0;i<MERMAID_TOKEN_MAP.length;i++){let tmpEntry=MERMAID_TOKEN_MAP[i];tmpVars[tmpEntry.Key]=readCSSVar(tmpEntry.Var,tmpEntry.Fallback);}if(pOverrides&&typeof pOverrides==='object'){let tmpKeys=Object.keys(pOverrides);for(let j=0;j<tmpKeys.length;j++){tmpVars[tmpKeys[j]]=pOverrides[tmpKeys[j]];}}return tmpVars;}/**
 * Call mermaid.initialize() with the canonical pict theme bindings.
 * Safe to call repeatedly; mermaid simply merges new config.
 *
 * @param {object} mermaid - the mermaid module / global
 * @param {object} [pOverrides] - extra themeVariables keys, or { config: ... }
 *                                to override startOnLoad / securityLevel / theme
 * @returns {boolean} true if initialize ran, false if no mermaid available
 */function initializeMermaid(mermaid,pOverrides){if(!mermaid||typeof mermaid.initialize!=='function'){return false;}let tmpOverrides=pOverrides||{};let tmpThemeOverrides=tmpOverrides.themeVariables;let tmpConfigOverrides=tmpOverrides.config||{};let tmpVars=buildMermaidThemeVariables(tmpThemeOverrides);let tmpConfig=Object.assign({startOnLoad:false,theme:'base',securityLevel:'loose'},tmpConfigOverrides,{themeVariables:tmpVars});mermaid.initialize(tmpConfig);return true;}/**
 * Cache each diagram's source text on data-mermaid-source so a later
 * refresh can restore it.  Mermaid replaces textContent with the
 * rendered SVG during run(); without this stash there's no way to
 * re-run.
 *
 * @param {NodeList|Array<Element>} pNodes
 */function stashMermaidSource(pNodes){if(!pNodes||pNodes.length<1){return;}for(let i=0;i<pNodes.length;i++){let tmpEl=pNodes[i];if(!tmpEl||typeof tmpEl.getAttribute!=='function'){continue;}if(!tmpEl.hasAttribute('data-mermaid-source')){tmpEl.setAttribute('data-mermaid-source',tmpEl.textContent);}}}/**
 * Restore each pre.mermaid[data-mermaid-source] element to its source
 * text, drop the data-processed flag (mermaid skips elements with that
 * flag set), strip the mermaid-rendered helper class if present, and
 * re-run mermaid against them.
 *
 * @param {string|Element|Document} [pSelectorOrRoot]
 *   - string: querySelectorAll target (defaults to whole document)
 *   - Element: scoped root to search inside
 *   - omitted: whole document
 * @returns {Promise|null} the mermaid.run() promise, or null if no work
 */function refreshMermaidDiagrams(pSelectorOrRoot){if(typeof document==='undefined'){return null;}let tmpMermaid=typeof mermaid!=='undefined'?mermaid:null;if(!tmpMermaid||typeof tmpMermaid.run!=='function'){return null;}let tmpRendered=_resolveMermaidNodes(pSelectorOrRoot);if(!tmpRendered||tmpRendered.length<1){return null;}for(let i=0;i<tmpRendered.length;i++){let tmpEl=tmpRendered[i];let tmpSrc=tmpEl.getAttribute('data-mermaid-source');if(tmpSrc!==null){tmpEl.textContent=tmpSrc;}tmpEl.removeAttribute('data-processed');if(tmpEl.classList&&typeof tmpEl.classList.remove==='function'){tmpEl.classList.remove('mermaid-rendered');}}try{let tmpResult=tmpMermaid.run({nodes:tmpRendered});// After mermaid finishes drawing, strip the !important flags it
// bakes into per-node inline fill/stroke styles. See
// stripMermaidStyleImportance() docs for the why.
if(tmpResult&&typeof tmpResult.then==='function'){return tmpResult.then(function(){stripMermaidStyleImportance(tmpRendered);return tmpResult;});}// Synchronous fallback (older mermaid versions).
stripMermaidStyleImportance(tmpRendered);return tmpResult;}catch(pError){// Surface to the caller; they're already wrapping in try/catch in
// most cases.  Return a rejected promise so .catch() consumers fire.
return Promise.reject(pError);}}/**
 * Mermaid 11's flowchart `style X fill:#...` directive emits the fill
 * and stroke inline with `!important`:
 *
 *   <rect class="basic label-container"
 *         style="fill:#e8f5e9 !important;stroke:#43a047 !important"/>
 *
 * Inline `!important` beats external `!important` via specificity, so
 * any theme-aware CSS we write (e.g. `.theme-dark ... { fill: theme-bg
 * !important }`) silently loses no matter how strong its selector.
 * Diagrams keep their Material pastels even in dark themes — light
 * fills with light text = unreadable.
 *
 * Strip just the `!important` flag off mermaid-emitted inline styles
 * after every render.  The fill/stroke values themselves stay intact,
 * so light mode keeps the author-intended palette; in dark mode the
 * external `.theme-dark` CSS now reaches the rect and recolors to a
 * theme-aware background.
 *
 * Must run after every mermaid render — initial + every re-render
 * triggered by a theme change.  `refreshMermaidDiagrams` calls it on
 * re-renders; the initial render in pict-section-content's view calls
 * it via the provider's `diagram.stripMermaidStyleImportance` handle.
 *
 * @param {string|Element|NodeList|Array} [pTarget]
 *   - omitted: scan the whole document
 *   - string: querySelector scope (e.g. '#Pict-Content-Body')
 *   - Element: scan within this element
 *   - NodeList/Array of `pre.mermaid` elements: scan within each
 * @returns {number} count of shapes that had !important stripped
 */function stripMermaidStyleImportance(pTarget){if(typeof document==='undefined'){return 0;}let tmpMermaids;if(!pTarget){tmpMermaids=document.querySelectorAll('pre.mermaid');}else if(typeof pTarget==='string'){let tmpScope=document.querySelector(pTarget);tmpMermaids=tmpScope?tmpScope.querySelectorAll('pre.mermaid'):[];}else if(pTarget.length!==undefined){// NodeList or Array of pre.mermaid elements
tmpMermaids=pTarget;}else if(pTarget.querySelectorAll){tmpMermaids=pTarget.querySelectorAll('pre.mermaid');}else{return 0;}let tmpStripped=0;for(let i=0;i<tmpMermaids.length;i++){let tmpMerm=tmpMermaids[i];if(!tmpMerm||!tmpMerm.querySelectorAll){continue;}let tmpShapes=tmpMerm.querySelectorAll('.node rect[style*="!important"], '+'.node polygon[style*="!important"], '+'.node circle[style*="!important"], '+'.node ellipse[style*="!important"], '+'.node path[style*="!important"], '+'.cluster rect[style*="!important"]');for(let j=0;j<tmpShapes.length;j++){let tmpEl=tmpShapes[j];let tmpStyle=tmpEl.getAttribute('style')||'';if(tmpStyle.indexOf('!important')<0){continue;}tmpEl.setAttribute('style',tmpStyle.replace(/\s*!important\s*/gi,''));tmpStripped++;}}return tmpStripped;}function _resolveMermaidNodes(pSelectorOrRoot){let tmpSelector='pre.mermaid[data-mermaid-source]';if(!pSelectorOrRoot){return document.querySelectorAll(tmpSelector);}if(typeof pSelectorOrRoot==='string'){// Treat the string as a scope selector; collect mermaid nodes inside it.
let tmpScope=document.querySelector(pSelectorOrRoot);if(!tmpScope){return[];}return tmpScope.querySelectorAll(tmpSelector);}if(pSelectorOrRoot.querySelectorAll){return pSelectorOrRoot.querySelectorAll(tmpSelector);}return[];}/**
 * One-shot: initialize mermaid against the active theme, subscribe to
 * theme apply events, and return a handle the caller can use for
 * teardown / manual refresh.
 *
 *   let tmpHandle = adaptMermaid(pict.providers.Theme, mermaid, {
 *       refreshScope: '#Pict-Content-Body'
 *   });
 *   // ... later, on unload:
 *   tmpHandle.dispose();
 *
 * @param {object} pProvider - pict-provider-theme instance
 * @param {object} pMermaid  - the mermaid module / global
 * @param {object} [pOptions]
 *   @param {string|Element} [pOptions.refreshScope] - passed to refreshMermaidDiagrams
 *   @param {object} [pOptions.themeOverrides]       - extra themeVariables keys
 *   @param {object} [pOptions.configOverrides]      - extra mermaid.initialize() top-level keys
 *   @param {function} [pOptions.onBeforeRefresh]    - called before each refresh; signature (pContext)
 *   @param {function} [pOptions.onAfterRefresh]     - called after each refresh resolves; signature (pContext)
 * @returns {{ dispose: function, refresh: function, reinitialize: function, subscribed: boolean }}
 */function adaptMermaid(pProvider,pMermaid,pOptions){let tmpOptions=pOptions||{};let tmpInitOverrides={themeVariables:tmpOptions.themeOverrides,config:tmpOptions.configOverrides};// Always initialize, even if no provider — the static base theme should
// still pick up whatever CSS variables the page does have.
initializeMermaid(pMermaid,tmpInitOverrides);let tmpRefresh=function(pContext){if(typeof tmpOptions.onBeforeRefresh==='function'){try{tmpOptions.onBeforeRefresh(pContext||{});}catch(e){/* swallow; refresh must not be gated on listener errors */}}initializeMermaid(pMermaid,tmpInitOverrides);let tmpResult=refreshMermaidDiagrams(tmpOptions.refreshScope);if(tmpResult&&typeof tmpResult.then==='function'&&typeof tmpOptions.onAfterRefresh==='function'){tmpResult.then(()=>{try{tmpOptions.onAfterRefresh(pContext||{});}catch(e){/* swallow */}},()=>{/* error path: onAfterRefresh still fires so the UI can drop spinners */try{tmpOptions.onAfterRefresh(pContext||{});}catch(e){/* swallow */}});}return tmpResult;};let tmpDispose=function(){};let tmpSubscribed=false;if(pProvider&&typeof pProvider.onApply==='function'){tmpDispose=pProvider.onApply(function(pBundle,pContext){tmpRefresh(pContext||{});});tmpSubscribed=true;}return{dispose:function(){if(typeof tmpDispose==='function'){tmpDispose();}},refresh:tmpRefresh,reinitialize:function(){initializeMermaid(pMermaid,tmpInitOverrides);},subscribed:tmpSubscribed};}module.exports={MERMAID_TOKEN_MAP:MERMAID_TOKEN_MAP,readCSSVar:readCSSVar,getMermaidTokenMap:getMermaidTokenMap,buildMermaidThemeVariables:buildMermaidThemeVariables,initializeMermaid:initializeMermaid,stashMermaidSource:stashMermaidSource,refreshMermaidDiagrams:refreshMermaidDiagrams,stripMermaidStyleImportance:stripMermaidStyleImportance,adaptMermaid:adaptMermaid};},{}],7:[function(require,module,exports){/**
 * Pict template expression: {~Theme:Path~}
 *
 * Resolves a token path against the active theme bundle and returns the
 * raw value at the currently resolved mode.  Walks from the bundle root,
 * so paths like 'Tokens.Color.Background.Primary' or 'Brand.Name' work.
 *
 * Returns an empty string if no theme is active or the path is missing.
 */const libPictTemplate=require('pict-template');class PictTemplateTheme extends libPictTemplate{constructor(pFable,pOptions,pServiceHash){super(pFable,pOptions,pServiceHash);this.addPattern('{~Theme:','~}');}render(pTemplateHash){let tmpPath=(pTemplateHash||'').trim();if(!tmpPath)return'';let tmpProvider=this._findThemeProvider();if(!tmpProvider)return'';let tmpValue=tmpProvider.token(tmpPath);if(tmpValue===null||typeof tmpValue==='undefined')return'';return String(tmpValue);}_findThemeProvider(){if(!this.pict||!this.pict.providers)return null;return this.pict.providers['Theme']||null;}}module.exports=PictTemplateTheme;},{"pict-template":87}],8:[function(require,module,exports){/**
 * Pict template expression: {~ThemeAsset:Category.Name~}
 *
 * Returns the contents of a named SVG (or other) asset from the active
 * theme bundle.  The first path segment is treated as the category
 * (e.g. SVG), the rest as the asset's path within that category.
 *
 *   {~ThemeAsset:SVG.Logo~}        -> bundle.SVG.Logo
 *   {~ThemeAsset:SVG.Icons.Foo~}   -> bundle.SVG.Icons.Foo
 */const libPictTemplate=require('pict-template');class PictTemplateThemeAsset extends libPictTemplate{constructor(pFable,pOptions,pServiceHash){super(pFable,pOptions,pServiceHash);this.addPattern('{~ThemeAsset:','~}');}render(pTemplateHash){let tmpPath=(pTemplateHash||'').trim();if(!tmpPath)return'';let tmpDot=tmpPath.indexOf('.');if(tmpDot<0)return'';let tmpCategory=tmpPath.substring(0,tmpDot);let tmpName=tmpPath.substring(tmpDot+1);let tmpProvider=this._findThemeProvider();if(!tmpProvider)return'';let tmpValue=tmpProvider.asset(tmpCategory,tmpName);if(tmpValue===null||typeof tmpValue==='undefined')return'';return String(tmpValue);}_findThemeProvider(){if(!this.pict||!this.pict.providers)return null;return this.pict.providers['Theme']||null;}}module.exports=PictTemplateThemeAsset;},{"pict-template":87}],9:[function(require,module,exports){/**
 * Pict template expression: {~ThemeImage:Name~}
 *
 * Returns the URL or data URL stored at bundle.Image[Name] in the active
 * theme bundle.  Convenience over {~ThemeAsset:Image.Name~}.
 */const libPictTemplate=require('pict-template');class PictTemplateThemeImage extends libPictTemplate{constructor(pFable,pOptions,pServiceHash){super(pFable,pOptions,pServiceHash);this.addPattern('{~ThemeImage:','~}');}render(pTemplateHash){let tmpName=(pTemplateHash||'').trim();if(!tmpName)return'';let tmpProvider=this._findThemeProvider();if(!tmpProvider)return'';let tmpValue=tmpProvider.image(tmpName);if(tmpValue===null||typeof tmpValue==='undefined')return'';return String(tmpValue);}_findThemeProvider(){if(!this.pict||!this.pict.providers)return null;return this.pict.providers['Theme']||null;}}module.exports=PictTemplateThemeImage;},{"pict-template":87}],10:[function(require,module,exports){/**
 * Pict template expression: {~ThemeVar:Path~}
 *
 * Returns a CSS `var(--theme-...)` reference for a token path under
 * Tokens.  E.g. {~ThemeVar:Color.Background.Primary~} ->
 * `var(--theme-color-background-primary)`.
 *
 * Useful inside style attributes and in CSS-in-JS contexts where you want
 * the live custom-property reference rather than the resolved value.
 */const libPictTemplate=require('pict-template');class PictTemplateThemeVar extends libPictTemplate{constructor(pFable,pOptions,pServiceHash){super(pFable,pOptions,pServiceHash);this.addPattern('{~ThemeVar:','~}');}render(pTemplateHash){let tmpPath=(pTemplateHash||'').trim();if(!tmpPath)return'';let tmpProvider=this._findThemeProvider();if(!tmpProvider)return'';return tmpProvider.cssVar(tmpPath);}_findThemeProvider(){if(!this.pict||!this.pict.providers)return null;return this.pict.providers['Theme']||null;}}module.exports=PictTemplateThemeVar;},{"pict-template":87}],11:[function(require,module,exports){module.exports={"name":"pict-provider","version":"1.0.13","description":"Pict Provider Base Class","main":"source/Pict-Provider.js","scripts":{"start":"node source/Pict-Provider.js","test":"npx quack test","tests":"npx quack test -g","coverage":"npx quack coverage","build":"npx quack build","docker-dev-build":"docker build ./ -f Dockerfile_LUXURYCode -t pict-provider-image:local","docker-dev-run":"docker run -it -d --name pict-provider-dev -p 24125:8080 -p 30027:8086 -v \"$PWD/.config:/home/coder/.config\"  -v \"$PWD:/home/coder/pict-provider\" -u \"$(id -u):$(id -g)\" -e \"DOCKER_USER=$USER\" pict-provider-image:local","docker-dev-shell":"docker exec -it pict-provider-dev /bin/bash","lint":"eslint source/**","types":"tsc -p ."},"types":"types/source/Pict-Provider.d.ts","repository":{"type":"git","url":"git+https://github.com/stevenvelozo/pict-provider.git"},"author":"steven velozo <steven@velozo.com>","license":"MIT","bugs":{"url":"https://github.com/stevenvelozo/pict-provider/issues"},"homepage":"https://github.com/stevenvelozo/pict-provider#readme","devDependencies":{"@eslint/js":"^9.39.1","eslint":"^9.39.1","pict":"^1.0.351","pict-docuserve":"^0.1.5","quackage":"^1.1.0","typescript":"^5.9.3"},"dependencies":{"fable-serviceproviderbase":"^3.0.19"},"mocha":{"diff":true,"extension":["js"],"package":"./package.json","reporter":"spec","slow":"75","timeout":"5000","ui":"tdd","watch-files":["source/**/*.js","test/**/*.js"],"watch-ignore":["lib/vendor"]}};},{}],12:[function(require,module,exports){const libFableServiceBase=require('fable-serviceproviderbase');const libPackage=require('../package.json');const defaultPictProviderSettings={ProviderIdentifier:false,// If this is set to true, when the App initializes this will.
// After the App initializes, initialize will be called as soon as it's added.
AutoInitialize:true,AutoInitializeOrdinal:0,AutoLoadDataWithApp:true,AutoLoadDataOrdinal:0,AutoSolveWithApp:true,AutoSolveOrdinal:0,Manifests:{},Templates:[]};class PictProvider extends libFableServiceBase{/**
	 * @param {import('fable')} pFable - The Fable instance.
	 * @param {Record<string, any>} [pOptions] - The options for the provider.
	 * @param {string} [pServiceHash] - The service hash for the provider.
	 */constructor(pFable,pOptions,pServiceHash){// Intersect default options, parent constructor, service information
let tmpOptions=Object.assign({},JSON.parse(JSON.stringify(defaultPictProviderSettings)),pOptions);super(pFable,tmpOptions,pServiceHash);/** @type {import('fable') & import('pict') & { instantiateServiceProviderWithoutRegistration(pServiceType: string, pOptions?: Record<string, any>, pCustomServiceHash?: string): any }} */this.fable;/** @type {import('fable') & import('pict') & { instantiateServiceProviderWithoutRegistration(pServiceType: string, pOptions?: Record<string, any>, pCustomServiceHash?: string): any }} */this.pict;/** @type {any} */this.log;/** @type {Record<string, any>} */this.options;/** @type {string} */this.UUID;/** @type {string} */this.Hash;if(!this.options.ProviderIdentifier){this.options.ProviderIdentifier=`AutoProviderID-${this.fable.getUUID()}`;}this.serviceType='PictProvider';/** @type {Record<string, any>} */this._Package=libPackage;// Convenience and consistency naming
this.pict=this.fable;// Wire in the essential Pict application state
/** @type {Record<string, any>} */this.AppData=this.pict.AppData;/** @type {Record<string, any>} */this.Bundle=this.pict.Bundle;this.initializeTimestamp=false;this.lastSolvedTimestamp=false;for(let i=0;i<this.options.Templates.length;i++){let tmpDefaultTemplate=this.options.Templates[i];if(!tmpDefaultTemplate.hasOwnProperty('Postfix')||!tmpDefaultTemplate.hasOwnProperty('Template')){this.log.error(`PictProvider [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} could not load Default Template ${i} in the options array.`,tmpDefaultTemplate);}else{if(!tmpDefaultTemplate.Source){tmpDefaultTemplate.Source=`PictProvider [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} options object.`;}this.pict.TemplateProvider.addDefaultTemplate(tmpDefaultTemplate.Prefix,tmpDefaultTemplate.Postfix,tmpDefaultTemplate.Template,tmpDefaultTemplate.Source);}}}/* -------------------------------------------------------------------------- *//*                        Code Section: Initialization                        *//* -------------------------------------------------------------------------- */onBeforeInitialize(){if(this.pict.LogNoisiness>3){this.log.trace(`PictProvider [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} onBeforeInitialize:`);}return true;}/**
	 * @param {(pError?: Error) => void} fCallback - The callback to call after pre-pinitialization.
	 *
	 * @return {void}
	 */onBeforeInitializeAsync(fCallback){this.onBeforeInitialize();return fCallback();}onInitialize(){if(this.pict.LogNoisiness>3){this.log.trace(`PictProvider [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} onInitialize:`);}return true;}/**
	 * @param {(pError?: Error) => void} fCallback - The callback to call after initialization.
	 *
	 * @return {void}
	 */onInitializeAsync(fCallback){this.onInitialize();return fCallback();}initialize(){if(this.pict.LogControlFlow){this.log.trace(`PICT-ControlFlow PROVIDER [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} initialize:`);}if(!this.initializeTimestamp){this.onBeforeInitialize();this.onInitialize();this.onAfterInitialize();this.initializeTimestamp=this.pict.log.getTimeStamp();return true;}else{this.log.warn(`PictProvider [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} initialize called but initialization is already completed.  Aborting.`);return false;}}/**
	 * @param {(pError?: Error) => void} fCallback - The callback to call after initialization.
	 *
	 * @return {void}
	 */initializeAsync(fCallback){if(this.pict.LogControlFlow){this.log.trace(`PICT-ControlFlow PROVIDER [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} initializeAsync:`);}if(!this.initializeTimestamp){let tmpAnticipate=this.pict.instantiateServiceProviderWithoutRegistration('Anticipate');if(this.pict.LogNoisiness>0){this.log.info(`PictProvider [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} beginning initialization...`);}tmpAnticipate.anticipate(this.onBeforeInitializeAsync.bind(this));tmpAnticipate.anticipate(this.onInitializeAsync.bind(this));tmpAnticipate.anticipate(this.onAfterInitializeAsync.bind(this));tmpAnticipate.wait(pError=>{this.initializeTimestamp=this.pict.log.getTimeStamp();if(pError){this.log.error(`PictProvider [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} initialization failed: ${pError.message||pError}`,{Stack:pError.stack});}else if(this.pict.LogNoisiness>0){this.log.info(`PictProvider [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} initialization complete.`);}return fCallback();});}else{this.log.warn(`PictProvider [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} async initialize called but initialization is already completed.  Aborting.`);// TODO: Should this be an error?
return fCallback();}}onAfterInitialize(){if(this.pict.LogNoisiness>3){this.log.trace(`PictProvider [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} onAfterInitialize:`);}return true;}/**
	 * @param {(pError?: Error) => void} fCallback - The callback to call after initialization.
	 *
	 * @return {void}
	 */onAfterInitializeAsync(fCallback){this.onAfterInitialize();return fCallback();}onPreRender(){if(this.pict.LogNoisiness>3){this.log.trace(`PictProvider [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} onPreRender:`);}return true;}/**
	 * @param {(pError?: Error) => void} fCallback - The callback to call after pre-render.
	 *
	 * @return {void}
	 */onPreRenderAsync(fCallback){this.onPreRender();return fCallback();}render(){return this.onPreRender();}/**
	 * @param {(pError?: Error) => void} fCallback - The callback to call after render.
	 *
	 * @return {void}
	 */renderAsync(fCallback){this.onPreRender();return fCallback();}onPreSolve(){if(this.pict.LogNoisiness>3){this.log.trace(`PictProvider [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} onPreSolve:`);}return true;}/**
	 * @param {(pError?: Error) => void} fCallback - The callback to call after pre-solve.
	 *
	 * @return {void}
	 */onPreSolveAsync(fCallback){this.onPreSolve();return fCallback();}solve(){return this.onPreSolve();}/**
	 * @param {(pError?: Error) => void} fCallback - The callback to call after solve.
	 *
	 * @return {void}
	 */solveAsync(fCallback){this.onPreSolve();return fCallback();}/**
	 * @param {(pError?: Error) => void} fCallback - The callback to call after the data pre-load.
	 */onBeforeLoadDataAsync(fCallback){return fCallback();}/**
	 * Hook to allow the provider to load data during application data load.
	 *
	 * @param {(pError?: Error) => void} fCallback - The callback to call after the data load.
	 */onLoadDataAsync(fCallback){if(this.pict.LogNoisiness>3){this.log.trace(`PictProvider [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} onLoadDataAsync:`);}return fCallback();}/**
	 * @param {(pError?: Error) => void} fCallback - The callback to call after the data post-load.
	 */onAfterLoadDataAsync(fCallback){return fCallback();}/**
	 * @param {(pError?: Error) => void} fCallback - The callback to call after the data pre-load.
	 *
	 * @return {void}
	 */onBeforeSaveDataAsync(fCallback){return fCallback();}/**
	 * Hook to allow the provider to load data during application data load.
	 *
	 * @param {(pError?: Error) => void} fCallback - The callback to call after the data load.
	 *
	 * @return {void}
	 */onSaveDataAsync(fCallback){if(this.pict.LogNoisiness>3){this.log.trace(`PictProvider [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} onSaveDataAsync:`);}return fCallback();}/**
	 * @param {(pError?: Error) => void} fCallback - The callback to call after the data post-load.
	 *
	 * @return {void}
	 */onAfterSaveDataAsync(fCallback){return fCallback();}}module.exports=PictProvider;},{"../package.json":11,"fable-serviceproviderbase":2}],13:[function(require,module,exports){module.exports={"RenderOnLoad":true,"DefaultRenderable":"Histogram-Wrap","DefaultDestinationAddress":"#Histogram-Container-Div","Templates":[{"Hash":"Histogram-Container","Template":"<!-- Histogram Container Rendering Soon -->"}],"Renderables":[{"RenderableHash":"Histogram-Wrap","TemplateHash":"Histogram-Container","DestinationAddress":"#Histogram-Container-Div"}],"TargetElementAddress":"#Histogram-Container-Div",// --- Data Configuration ---
// Address in AppData (or other Pict address space) for the histogram bins
// Expected format: Array of objects with at least { Label, Value } properties
// e.g. [{ Label: "2020", Value: 15 }, { Label: "2021", Value: 42 }]
"DataAddress":false,// Alternatively, provide bins directly (used if DataAddress is not set)
"Bins":[],// Property names within each bin object
"LabelProperty":"Label","ValueProperty":"Value",// --- Layout Configuration ---
// "vertical" = bars grow upward; "horizontal" = bars grow rightward
"Orientation":"vertical",// The rendering mode: "browser", "consoleui", or "cli"
// "browser" renders HTML/CSS/SVG; "consoleui" renders via blessed widgets;
// "cli" renders ANSI text to stdout
"RenderMode":"browser",// Maximum height in pixels (browser vertical) or characters (cli/consoleui)
"MaxBarSize":200,// Bar thickness in pixels (browser) or characters (cli/consoleui)
"BarThickness":30,// Gap between bars in pixels (browser) or characters (cli/consoleui)
"BarGap":4,// When true, bar groups expand to fill the container width (vertical) or
// height (horizontal) using CSS flex-grow instead of a fixed BarThickness.
// Labels and values overflow their column so they remain readable even when
// bars are very narrow.  Best suited for time-series or dense histograms.
"FillContainer":false,// Whether to show value labels on/above bars
"ShowValues":true,// Whether to show bin labels (x-axis for vertical, y-axis for horizontal)
"ShowLabels":true,// In FillContainer mode, controls label density in the separate label row.
// 0 = auto-compute (space labels approximately 80px apart based on container
// width), N > 0 = show a label every N bars starting from index 0.
// Ignored when FillContainer is false (every bar shows its own label).
"LabelInterval":0,// Color of the bars (CSS color for browser, ANSI color name for cli/consoleui)
"BarColor":"#4A90D9",// Color of selected bars
"SelectedBarColor":"#2ECC71",// Color of bars in the selection range
"SelectionRangeColor":"#85C1E9",// --- Selection Configuration ---
// Enable selection mode
"Selectable":false,// Selection mode: "single", "multiple", "range"
// "single" - click to select one bar
// "multiple" - click to toggle individual bars
// "range" - drag sliders to select a contiguous range of bins
"SelectionMode":"range",// Address in AppData to write selection state
// Will contain { SelectedIndices: [], RangeStart: N, RangeEnd: N } or similar
"SelectionDataAddress":false,// Initial selection (array of indices or { Start, End } for range mode)
"InitialSelection":null,// --- CLI/ConsoleUI Configuration ---
// Characters used for rendering in text mode
"BarCharacter":"\u2588","BarPartialCharacters":[" ","\u2581","\u2582","\u2583","\u2584","\u2585","\u2586","\u2587","\u2588"],"EmptyCharacter":" ","SliderCharacter":"\u2502","SliderHandleCharacter":"\u25C6",// Width of the histogram in characters (cli/consoleui)
"TextWidth":60,// Height of the histogram in characters (cli/consoleui vertical)
"TextHeight":15,// --- CSS ---
"CSS":`.pict-histogram-container
{
	display: inline-block;
	position: relative;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	font-size: 12px;
	user-select: none;
}
.pict-histogram-chart
{
	display: flex;
	align-items: flex-end;
	position: relative;
}
.pict-histogram-container.pict-histogram-horizontal
{
	display: inline-flex;
	flex-direction: row;
	align-items: stretch;
}
.pict-histogram-chart.pict-histogram-horizontal
{
	flex-direction: column;
	align-items: flex-start;
}
.pict-histogram-bar-group
{
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: default;
	flex-shrink: 0;
}
.pict-histogram-horizontal .pict-histogram-bar-group
{
	flex-direction: row;
	align-items: center;
}
.pict-histogram-bar
{
	transition: background-color 0.15s ease, height 0.2s ease, width 0.2s ease;
	border-radius: 2px 2px 0 0;
	min-width: 1px;
	min-height: 1px;
}
.pict-histogram-horizontal .pict-histogram-bar
{
	border-radius: 0 2px 2px 0;
}
.pict-histogram-bar.pict-histogram-selectable
{
	cursor: pointer;
}
.pict-histogram-bar.pict-histogram-selectable:hover
{
	opacity: 0.8;
}
.pict-histogram-bar.pict-histogram-selected
{
	box-shadow: 0 0 0 2px rgba(46, 204, 113, 0.4);
}
.pict-histogram-bar.pict-histogram-in-range
{
	opacity: 0.9;
}
.pict-histogram-value-label
{
	text-align: center;
	color: var(--theme-color-text-secondary, #666);
	font-size: 11px;
	padding: 2px 0;
	white-space: nowrap;
}
.pict-histogram-horizontal .pict-histogram-value-label
{
	padding: 0 4px;
}
.pict-histogram-bin-label
{
	text-align: center;
	color: var(--theme-color-text-primary, #333);
	font-size: 11px;
	padding: 4px 2px 0 2px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.pict-histogram-horizontal .pict-histogram-bin-label
{
	padding: 0 4px 0 0;
	text-align: right;
	min-width: 40px;
}
.pict-histogram-range-slider-container
{
	position: relative;
	width: 100%;
	height: 24px;
	margin-top: 4px;
}
.pict-histogram-horizontal .pict-histogram-range-slider-container
{
	width: 24px;
	height: auto;
	align-self: stretch;
	margin-top: 0;
	margin-left: 4px;
}
.pict-histogram-range-track
{
	position: absolute;
	top: 10px;
	left: 0;
	right: 0;
	height: 4px;
	background: var(--theme-color-border-default, #E0E0E0);
	border-radius: 2px;
}
.pict-histogram-horizontal .pict-histogram-range-track
{
	top: 0;
	left: 10px;
	right: auto;
	bottom: 0;
	width: 4px;
	height: auto;
}
.pict-histogram-range-fill
{
	position: absolute;
	top: 10px;
	height: 4px;
	background: var(--theme-color-brand-primary, #4A90D9);
	border-radius: 2px;
}
.pict-histogram-horizontal .pict-histogram-range-fill
{
	top: auto;
	left: 10px;
	width: 4px;
	height: auto;
}
.pict-histogram-range-handle
{
	position: absolute;
	top: 4px;
	width: 16px;
	height: 16px;
	background: var(--theme-color-background-panel, #fff);
	border: 2px solid var(--theme-color-brand-primary, #4A90D9);
	border-radius: 50%;
	cursor: grab;
	z-index: 2;
	transform: translateX(-50%);
}
.pict-histogram-horizontal .pict-histogram-range-handle
{
	top: auto;
	left: 4px;
	transform: translateY(-50%);
}
.pict-histogram-range-handle:active
{
	cursor: grabbing;
	background: var(--theme-color-brand-primary, #4A90D9);
}
.pict-histogram-range-handle:active,
.pict-histogram-range-handle:focus
{
	box-shadow: 0 0 0 3px rgba(74, 144, 217, 0.3);
	outline: none;
}
.pict-histogram-container.pict-histogram-fill
{
	display: block;
	width: 100%;
}
.pict-histogram-fill .pict-histogram-chart
{
	width: 100%;
}
.pict-histogram-fill .pict-histogram-bar-group
{
	flex: 1 1 0%;
	min-width: 0;
}
.pict-histogram-fill .pict-histogram-bar
{
	width: 100%;
}
.pict-histogram-axis-line
{
	width: 100%;
	height: 1px;
	background: var(--theme-color-border-default, #ccc);
}
.pict-histogram-label-row
{
	display: flex;
	width: 100%;
}
.pict-histogram-fill-label
{
	font-size: 10px;
	color: var(--theme-color-text-secondary, #666);
	text-align: center;
	white-space: nowrap;
	overflow: visible;
	line-height: 16px;
}
`};},{}],14:[function(require,module,exports){/**
 * Pict Section Histogram
 *
 * A histogram visualization section for the Pict MVC framework.
 *
 * Supports:
 *   - Vertical and horizontal orientation
 *   - Three render modes: browser (HTML/CSS), consoleui (blessed), cli (ANSI)
 *   - Interactive selection: single click, multi-select, or range slider
 *   - Data binding via Pict AppData addresses
 *
 * @module pict-section-histogram
 */const libPictViewClass=require('pict-view');const _DefaultConfiguration=require('./Pict-Section-Histogram-DefaultConfiguration.js');const libRendererBrowser=require('./renderers/Pict-Histogram-Renderer-Browser.js');const libRendererConsoleUI=require('./renderers/Pict-Histogram-Renderer-ConsoleUI.js');const libRendererCLI=require('./renderers/Pict-Histogram-Renderer-CLI.js');class PictSectionHistogram extends libPictViewClass{constructor(pFable,pOptions,pServiceHash){let tmpOptions=Object.assign({},_DefaultConfiguration,pOptions);super(pFable,tmpOptions,pServiceHash);this.initialRenderComplete=false;// --- Selection State ---
// Set of selected bin indices (for "single" and "multiple" modes)
this._selectedIndices=new Set();// Range bounds (for "range" mode)
this._selectionRangeStart=0;this._selectionRangeEnd=0;// Resolve the renderer for the configured mode
this._renderer=this._resolveRenderer();// Apply initial selection if provided
this._applyInitialSelection();}/**
	 * Set up the initial selection state from options.
	 */_applyInitialSelection(){if(this.options.InitialSelection){this.setSelection(this.options.InitialSelection);}else if(this.options.Selectable&&this.options.SelectionMode==='range'){// Default: select all bins
let tmpBins=this.getBins();this._selectionRangeStart=0;this._selectionRangeEnd=Math.max(0,tmpBins.length-1);this._syncSelectionFromRange();}}/**
	 * Pick the renderer module based on RenderMode option.
	 *
	 * @returns {object} The renderer module { render, wireEvents }
	 */_resolveRenderer(){switch(this.options.RenderMode){case'consoleui':return libRendererConsoleUI;case'cli':return libRendererCLI;case'browser':default:return libRendererBrowser;}}// --- Data Access ---
/**
	 * Get the current bin data array.
	 *
	 * Reads from the configured DataAddress in AppData, falling back to
	 * the static Bins option.
	 *
	 * @returns {Array} Array of bin objects
	 */getBins(){if(this.options.DataAddress){const tmpAddressSpace={Fable:this.fable,Pict:this.fable,AppData:this.AppData,Bundle:this.Bundle,Options:this.options};let tmpData=this.fable.manifest.getValueByHash(tmpAddressSpace,this.options.DataAddress);if(Array.isArray(tmpData)){return tmpData;}else{this.log.warn(`PICT-Histogram DataAddress [${this.options.DataAddress}] did not return an array.`);}}return this.options.Bins||[];}/**
	 * Set the bins programmatically (updates the Bins option).
	 *
	 * @param {Array} pBins - Array of bin objects { Label, Value, ... }
	 */setBins(pBins){if(!Array.isArray(pBins)){this.log.warn('PICT-Histogram setBins requires an array.');return;}this.options.Bins=pBins;// If we also have a DataAddress, write through
if(this.options.DataAddress){const tmpAddressSpace={Fable:this.fable,Pict:this.fable,AppData:this.AppData,Bundle:this.Bundle,Options:this.options};this.fable.manifest.setValueByHash(tmpAddressSpace,this.options.DataAddress,pBins);}}// --- Selection Logic ---
/**
	 * Check whether a bin index is currently selected.
	 *
	 * @param {number} pIndex
	 * @returns {boolean}
	 */isIndexSelected(pIndex){if(!this.options.Selectable){return false;}if(this.options.SelectionMode==='range'){return pIndex===this._selectionRangeStart||pIndex===this._selectionRangeEnd;}return this._selectedIndices.has(pIndex);}/**
	 * Check whether a bin index falls within the current range selection
	 * (but is not one of the range endpoints).
	 *
	 * @param {number} pIndex
	 * @returns {boolean}
	 */isIndexInRange(pIndex){if(!this.options.Selectable||this.options.SelectionMode!=='range'){return false;}return pIndex>this._selectionRangeStart&&pIndex<this._selectionRangeEnd;}/**
	 * Get the current selection state.
	 *
	 * @returns {object} Selection descriptor
	 */getSelection(){if(this.options.SelectionMode==='range'){let tmpBins=this.getBins();let tmpIndices=[];for(let i=this._selectionRangeStart;i<=this._selectionRangeEnd;i++){tmpIndices.push(i);}return{Mode:'range',RangeStart:this._selectionRangeStart,RangeEnd:this._selectionRangeEnd,SelectedIndices:tmpIndices,StartLabel:(tmpBins[this._selectionRangeStart]||{})[this.options.LabelProperty],EndLabel:(tmpBins[this._selectionRangeEnd]||{})[this.options.LabelProperty]};}else{return{Mode:this.options.SelectionMode,SelectedIndices:Array.from(this._selectedIndices).sort((a,b)=>a-b)};}}/**
	 * Programmatically set the selection.
	 *
	 * @param {object|Array} pSelection - For range: { Start, End }; for single/multiple: array of indices
	 */setSelection(pSelection){if(this.options.SelectionMode==='range'){if(pSelection&&typeof pSelection.Start==='number'&&typeof pSelection.End==='number'){this._selectionRangeStart=pSelection.Start;this._selectionRangeEnd=pSelection.End;this._syncSelectionFromRange();}}else if(Array.isArray(pSelection)){this._selectedIndices=new Set(pSelection);}this._writeSelectionToAddress();}/**
	 * Handle a bar click in single or multiple selection mode.
	 *
	 * @param {number} pIndex - The clicked bin index
	 */handleBarClick(pIndex){if(this.options.SelectionMode==='single'){this._selectedIndices.clear();this._selectedIndices.add(pIndex);}else if(this.options.SelectionMode==='multiple'){if(this._selectedIndices.has(pIndex)){this._selectedIndices.delete(pIndex);}else{this._selectedIndices.add(pIndex);}}this._writeSelectionToAddress();this.onSelectionChange(this.getSelection());this.renderHistogram();}/**
	 * Handle a bar click in range mode — moves the nearest handle.
	 *
	 * @param {number} pIndex - The clicked bin index
	 */handleRangeBarClick(pIndex){let tmpDistStart=Math.abs(pIndex-this._selectionRangeStart);let tmpDistEnd=Math.abs(pIndex-this._selectionRangeEnd);if(tmpDistStart<=tmpDistEnd){this._selectionRangeStart=Math.min(pIndex,this._selectionRangeEnd);}else{this._selectionRangeEnd=Math.max(pIndex,this._selectionRangeStart);}this._syncSelectionFromRange();this._writeSelectionToAddress();this.onSelectionChange(this.getSelection());this.renderHistogram();}/**
	 * Sync _selectedIndices from the range bounds (so getSelection is consistent).
	 */_syncSelectionFromRange(){this._selectedIndices.clear();for(let i=this._selectionRangeStart;i<=this._selectionRangeEnd;i++){this._selectedIndices.add(i);}}/**
	 * Write the current selection state to the configured SelectionDataAddress.
	 */_writeSelectionToAddress(){if(!this.options.SelectionDataAddress){return;}const tmpAddressSpace={Fable:this.fable,Pict:this.fable,AppData:this.AppData,Bundle:this.Bundle,Options:this.options};this.fable.manifest.setValueByHash(tmpAddressSpace,this.options.SelectionDataAddress,this.getSelection());}/**
	 * Hook for subclasses or consumers to react to selection changes.
	 *
	 * @param {object} pSelection - The new selection state
	 */onSelectionChange(pSelection){// Override in subclass or assign externally
}// --- Lifecycle Hooks ---
onBeforeInitialize(){super.onBeforeInitialize();return super.onBeforeInitialize();}onAfterRender(pRenderable){// Inject CSS
this.pict.CSSMap.injectCSS();if(!this.initialRenderComplete){this.onAfterInitialRender();this.initialRenderComplete=true;}return super.onAfterRender(pRenderable);}onAfterInitialRender(){this.renderHistogram();}/**
	 * Render the histogram using the active renderer and wire events.
	 */renderHistogram(){// Ensure CSS is injected (covers both lifecycle and direct calls)
if(this.pict.CSSMap){this.pict.CSSMap.injectCSS();}this._renderer.render(this);this._renderer.wireEvents(this);this.initialRenderComplete=true;}// --- Data Marshaling ---
marshalToView(){super.marshalToView();if(this.initialRenderComplete){this.renderHistogram();}}marshalFromView(){super.marshalFromView();this._writeSelectionToAddress();}// --- Public API ---
/**
	 * Change the orientation and re-render.
	 *
	 * @param {string} pOrientation - "vertical" or "horizontal"
	 */setOrientation(pOrientation){if(pOrientation!=='vertical'&&pOrientation!=='horizontal'){this.log.warn(`PICT-Histogram invalid orientation: ${pOrientation}`);return;}this.options.Orientation=pOrientation;if(this.initialRenderComplete){this.renderHistogram();}}/**
	 * Change the render mode and re-render.
	 *
	 * @param {string} pRenderMode - "browser", "consoleui", or "cli"
	 */setRenderMode(pRenderMode){this.options.RenderMode=pRenderMode;this._renderer=this._resolveRenderer();if(this.initialRenderComplete){this.renderHistogram();}}/**
	 * Convenience: get the text representation (useful for CLI/consoleui).
	 *
	 * @returns {string}
	 */toText(){if(this.options.Orientation==='vertical'){return libRendererConsoleUI.renderVertical(this);}else{return libRendererConsoleUI.renderHorizontal(this);}}}module.exports=PictSectionHistogram;module.exports.default_configuration=_DefaultConfiguration;module.exports.renderers={browser:libRendererBrowser,consoleui:libRendererConsoleUI,cli:libRendererCLI};},{"./Pict-Section-Histogram-DefaultConfiguration.js":13,"./renderers/Pict-Histogram-Renderer-Browser.js":15,"./renderers/Pict-Histogram-Renderer-CLI.js":16,"./renderers/Pict-Histogram-Renderer-ConsoleUI.js":17,"pict-view":89}],15:[function(require,module,exports){/**
 * Browser renderer for pict-section-histogram.
 *
 * Renders the histogram as HTML/CSS elements using the Pict ContentAssignment
 * pipeline.  Also wires up interactive selection (click, drag-slider) via
 * DOM event listeners.
 *
 * @module Pict-Histogram-Renderer-Browser
 *//**
 * Build the HTML string for a single bar group (bar + optional labels).
 *
 * @param {object} pBin          - The bin data { Label, Value, ... }
 * @param {number} pIndex        - Index of the bin
 * @param {number} pBarSize      - Computed bar size in pixels
 * @param {object} pOptions      - View options
 * @param {boolean} pIsSelected  - Whether this bin is selected
 * @param {boolean} pInRange     - Whether this bin is inside the range selection
 * @param {number} pLabelWidth   - Fixed label width in pixels (horizontal mode)
 * @returns {string} HTML fragment
 */function buildBarGroupHTML(pBin,pIndex,pBarSize,pOptions,pIsSelected,pInRange,pLabelWidth){let tmpLabel=pBin[pOptions.LabelProperty]||'';let tmpValue=pBin[pOptions.ValueProperty]||0;let tmpVertical=pOptions.Orientation==='vertical';let tmpBarColor=pIsSelected?pOptions.SelectedBarColor:pInRange?pOptions.SelectionRangeColor:pOptions.BarColor;let tmpSelectableClass=pOptions.Selectable?' pict-histogram-selectable':'';let tmpSelectedClass=pIsSelected?' pict-histogram-selected':'';let tmpInRangeClass=pInRange?' pict-histogram-in-range':'';let tmpFillMode=pOptions.FillContainer;let tmpBarStyle='';if(tmpVertical){if(tmpFillMode){tmpBarStyle=`height:${pBarSize}px;background-color:${tmpBarColor};`;}else{tmpBarStyle=`height:${pBarSize}px;width:${pOptions.BarThickness}px;background-color:${tmpBarColor};`;}}else{if(tmpFillMode){tmpBarStyle=`width:${pBarSize}px;background-color:${tmpBarColor};`;}else{tmpBarStyle=`width:${pBarSize}px;height:${pOptions.BarThickness}px;background-color:${tmpBarColor};`;}}let tmpGroupWidth=pOptions.BarThickness+pOptions.BarGap;let tmpGroupStyle='';if(tmpFillMode){// No fixed dimensions — CSS flex:1 handles sizing
tmpGroupStyle='';}else if(tmpVertical){tmpGroupStyle=`margin:0 ${pOptions.BarGap/2}px;width:${tmpGroupWidth}px;`;}else{tmpGroupStyle=`margin:${pOptions.BarGap/2}px 0;`;}let tmpHTML=`<div class="pict-histogram-bar-group" style="${tmpGroupStyle}" data-histogram-index="${pIndex}">`;if(tmpVertical){// Value label above bar (skipped in fill mode — values don't fit in narrow columns)
if(pOptions.ShowValues&&!tmpFillMode){tmpHTML+=`<div class="pict-histogram-value-label" style="width:${tmpGroupWidth}px;">${tmpValue}</div>`;}// Bar
tmpHTML+=`<div class="pict-histogram-bar${tmpSelectableClass}${tmpSelectedClass}${tmpInRangeClass}" style="${tmpBarStyle}" data-histogram-index="${pIndex}"></div>`;// Bin label below bar (skipped in fill mode — labels rendered in a separate row)
if(pOptions.ShowLabels&&!tmpFillMode){tmpHTML+=`<div class="pict-histogram-bin-label" style="width:${tmpGroupWidth}px;">${tmpLabel}</div>`;}}else{// Bin label to the left (fixed width so bars align)
if(pOptions.ShowLabels){let tmpLabelStyle=pLabelWidth?`width:${pLabelWidth}px;min-width:${pLabelWidth}px;`:'';tmpHTML+=`<div class="pict-histogram-bin-label" style="${tmpLabelStyle}">${tmpLabel}</div>`;}// Bar
tmpHTML+=`<div class="pict-histogram-bar${tmpSelectableClass}${tmpSelectedClass}${tmpInRangeClass}" style="${tmpBarStyle}" data-histogram-index="${pIndex}"></div>`;// Value label to the right
if(pOptions.ShowValues){tmpHTML+=`<div class="pict-histogram-value-label">${tmpValue}</div>`;}}tmpHTML+='</div>';return tmpHTML;}/**
 * Build the HTML for the range-slider overlay (used in "range" selection mode).
 *
 * @param {object} pView - The histogram view instance
 * @returns {string} HTML fragment
 */function buildRangeSliderHTML(pView){let tmpBins=pView.getBins();if(!tmpBins||tmpBins.length===0){return'';}let tmpRangeStart=pView._selectionRangeStart;let tmpRangeEnd=pView._selectionRangeEnd;let tmpMax=tmpBins.length-1;// Calculate percentage positions for the handles
let tmpStartPct=tmpMax>0?tmpRangeStart/tmpMax*100:0;let tmpEndPct=tmpMax>0?tmpRangeEnd/tmpMax*100:100;let tmpVertical=pView.options.Orientation==='vertical';let tmpHTML='<div class="pict-histogram-range-slider-container">';tmpHTML+='<div class="pict-histogram-range-track"></div>';if(tmpVertical){tmpHTML+=`<div class="pict-histogram-range-fill" style="left:${tmpStartPct}%;right:${100-tmpEndPct}%;"></div>`;tmpHTML+=`<div class="pict-histogram-range-handle pict-histogram-range-handle-start" tabindex="0" style="left:${tmpStartPct}%;" data-handle="start"></div>`;tmpHTML+=`<div class="pict-histogram-range-handle pict-histogram-range-handle-end" tabindex="0" style="left:${tmpEndPct}%;" data-handle="end"></div>`;}else{tmpHTML+=`<div class="pict-histogram-range-fill" style="top:${tmpStartPct}%;bottom:${100-tmpEndPct}%;"></div>`;tmpHTML+=`<div class="pict-histogram-range-handle pict-histogram-range-handle-start" tabindex="0" style="top:${tmpStartPct}%;" data-handle="start"></div>`;tmpHTML+=`<div class="pict-histogram-range-handle pict-histogram-range-handle-end" tabindex="0" style="top:${tmpEndPct}%;" data-handle="end"></div>`;}tmpHTML+='</div>';return tmpHTML;}/**
 * Build the label row for FillContainer vertical mode.
 *
 * Labels are rendered in a separate flex row below the axis line, with
 * automatic interval calculation to avoid overlap when there are many bins.
 *
 * @param {object} pView  - The histogram view instance
 * @param {Array}  pBins  - The bin data array
 * @returns {string} HTML fragment
 */function buildFillLabelRow(pView,pBins){if(!pBins||pBins.length===0){return'';}// Determine label interval: explicit setting or auto-compute
let tmpLabelInterval=pView.options.LabelInterval||0;if(tmpLabelInterval<=0){// Auto-compute: space labels approximately 80px apart
let tmpTargetElementSet=pView.services.ContentAssignment.getElement(pView.options.TargetElementAddress);let tmpContainerWidth=800;if(tmpTargetElementSet&&tmpTargetElementSet.length>0&&tmpTargetElementSet[0]){tmpContainerWidth=tmpTargetElementSet[0].clientWidth||800;}if(pBins.length>0){let tmpBarWidth=tmpContainerWidth/pBins.length;tmpLabelInterval=Math.max(1,Math.ceil(80/tmpBarWidth));}else{tmpLabelInterval=1;}}let tmpHTML='<div class="pict-histogram-label-row">';for(let i=0;i<pBins.length;i++){let tmpIsLabeled=i%tmpLabelInterval===0;if(tmpIsLabeled){let tmpLabel=pBins[i][pView.options.LabelProperty]||'';// Span covers this label and the unlabeled bars until the next label
let tmpSpan=Math.min(tmpLabelInterval,pBins.length-i);tmpHTML+=`<div class="pict-histogram-fill-label" style="flex:${tmpSpan};">${tmpLabel}</div>`;i+=tmpSpan-1;}}tmpHTML+='</div>';return tmpHTML;}/**
 * Render the full histogram into the target element.
 *
 * @param {object} pView - The histogram view instance
 */function render(pView){let tmpBins=pView.getBins();if(!tmpBins||tmpBins.length===0){pView.services.ContentAssignment.assignContent(pView.options.TargetElementAddress,'<div class="pict-histogram-container"><em>No histogram data</em></div>');return;}let tmpMaxValue=0;for(let i=0;i<tmpBins.length;i++){let tmpVal=tmpBins[i][pView.options.ValueProperty]||0;if(tmpVal>tmpMaxValue){tmpMaxValue=tmpVal;}}if(tmpMaxValue===0){tmpMaxValue=1;}let tmpVertical=pView.options.Orientation==='vertical';let tmpOrientationClass=tmpVertical?'pict-histogram-vertical':'pict-histogram-horizontal';let tmpFillClass=pView.options.FillContainer?' pict-histogram-fill':'';// For horizontal mode (non-fill), measure the longest label so all labels share the same width
let tmpLabelWidth=0;if(!tmpVertical&&pView.options.ShowLabels&&!pView.options.FillContainer){for(let i=0;i<tmpBins.length;i++){let tmpLabel=String(tmpBins[i][pView.options.LabelProperty]||'');// Approximate character width at 11px font: ~6.5px per character
let tmpEstWidth=tmpLabel.length*6.5+8;if(tmpEstWidth>tmpLabelWidth){tmpLabelWidth=tmpEstWidth;}}tmpLabelWidth=Math.max(tmpLabelWidth,40);}let tmpHTML=`<div class="pict-histogram-container ${tmpOrientationClass}${tmpFillClass}">`;tmpHTML+=`<div class="pict-histogram-chart ${tmpOrientationClass}${tmpFillClass}">`;for(let i=0;i<tmpBins.length;i++){let tmpVal=tmpBins[i][pView.options.ValueProperty]||0;let tmpBarSize=Math.round(tmpVal/tmpMaxValue*pView.options.MaxBarSize);if(tmpVal>0&&tmpBarSize<1){tmpBarSize=1;}let tmpIsSelected=pView.isIndexSelected(i);let tmpInRange=!tmpIsSelected&&pView.isIndexInRange(i);tmpHTML+=buildBarGroupHTML(tmpBins[i],i,tmpBarSize,pView.options,tmpIsSelected,tmpInRange,tmpLabelWidth);}tmpHTML+='</div>';// In FillContainer vertical mode, render axis line and label row separately
if(pView.options.FillContainer&&tmpVertical&&pView.options.ShowLabels){tmpHTML+='<div class="pict-histogram-axis-line"></div>';tmpHTML+=buildFillLabelRow(pView,tmpBins);}// Range slider for "range" selection mode
if(pView.options.Selectable&&pView.options.SelectionMode==='range'){tmpHTML+=buildRangeSliderHTML(pView);}tmpHTML+='</div>';pView.services.ContentAssignment.assignContent(pView.options.TargetElementAddress,tmpHTML);}/**
 * Wire up DOM event listeners for interactivity (click selection, range drag).
 *
 * @param {object} pView - The histogram view instance
 */function wireEvents(pView){if(!pView.options.Selectable){return;}let tmpTargetElementSet=pView.services.ContentAssignment.getElement(pView.options.TargetElementAddress);if(!tmpTargetElementSet||tmpTargetElementSet.length<1){return;}let tmpContainer=tmpTargetElementSet[0];if(!tmpContainer){return;}// --- Bar click selection (single / multiple modes) ---
if(pView.options.SelectionMode==='single'||pView.options.SelectionMode==='multiple'){let tmpBars=tmpContainer.querySelectorAll('.pict-histogram-bar[data-histogram-index]');for(let i=0;i<tmpBars.length;i++){tmpBars[i].addEventListener('click',pEvent=>{let tmpIndex=parseInt(pEvent.currentTarget.getAttribute('data-histogram-index'),10);if(isNaN(tmpIndex)){return;}pView.handleBarClick(tmpIndex);});}}// --- Range slider drag ---
if(pView.options.SelectionMode==='range'){// Also allow clicking bars to move nearest handle
let tmpBars=tmpContainer.querySelectorAll('.pict-histogram-bar[data-histogram-index]');for(let i=0;i<tmpBars.length;i++){tmpBars[i].addEventListener('click',pEvent=>{let tmpIndex=parseInt(pEvent.currentTarget.getAttribute('data-histogram-index'),10);if(isNaN(tmpIndex)){return;}pView.handleRangeBarClick(tmpIndex);});}let tmpHandles=tmpContainer.querySelectorAll('.pict-histogram-range-handle');for(let i=0;i<tmpHandles.length;i++){wireRangeHandle(pView,tmpHandles[i],tmpContainer);}}}/**
 * Wire drag behavior on a single range handle element.
 *
 * @param {object} pView        - The histogram view instance
 * @param {Element} pHandle     - The handle DOM element
 * @param {Element} pContainer  - The histogram container element
 */function wireRangeHandle(pView,pHandle,pContainer){let tmpHandleType=pHandle.getAttribute('data-handle');// "start" or "end"
let tmpVertical=pView.options.Orientation==='vertical';let tmpDragging=false;function getSliderBounds(){// Re-query from pContainer every time because renderHistogram() replaces
// the inner HTML, detaching any previously-captured slider element.
let tmpSlider=pContainer.querySelector('.pict-histogram-range-slider-container');if(!tmpSlider){return{start:0,size:1};}let tmpRect=tmpSlider.getBoundingClientRect();if(tmpVertical){return{start:tmpRect.left,size:tmpRect.width||1};}else{return{start:tmpRect.top,size:tmpRect.height||1};}}function onPointerMove(pEvent){if(!tmpDragging){return;}let tmpBins=pView.getBins();if(!tmpBins||tmpBins.length===0){return;}let tmpBounds=getSliderBounds();let tmpPos=tmpVertical?pEvent.clientX:pEvent.clientY;let tmpPct=(tmpPos-tmpBounds.start)/tmpBounds.size;tmpPct=Math.max(0,Math.min(1,tmpPct));let tmpIndex=Math.round(tmpPct*(tmpBins.length-1));if(tmpHandleType==='start'){if(tmpIndex>pView._selectionRangeEnd){tmpIndex=pView._selectionRangeEnd;}pView._selectionRangeStart=tmpIndex;}else{if(tmpIndex<pView._selectionRangeStart){tmpIndex=pView._selectionRangeStart;}pView._selectionRangeEnd=tmpIndex;}pView._syncSelectionFromRange();pView.renderHistogram();}function onPointerUp(){if(!tmpDragging){return;}tmpDragging=false;if(typeof document!=='undefined'){document.removeEventListener('mousemove',onPointerMove);document.removeEventListener('mouseup',onPointerUp);}}pHandle.addEventListener('mousedown',pEvent=>{pEvent.preventDefault();tmpDragging=true;if(typeof document!=='undefined'){document.addEventListener('mousemove',onPointerMove);document.addEventListener('mouseup',onPointerUp);}});}module.exports={render,wireEvents};},{}],16:[function(require,module,exports){(function(process){(function(){/**
 * CLI renderer for pict-section-histogram.
 *
 * Renders the histogram as ANSI-colored text written directly to stdout
 * (or through the Pict ContentAssignment pipeline if available).
 *
 * This mode is intended for command-line tools that print histogram output
 * without a full terminal UI framework.
 *
 * @module Pict-Histogram-Renderer-CLI
 */// ANSI color codes (basic 16-color)
const ANSI_COLORS={'black':'\x1b[30m','red':'\x1b[31m','green':'\x1b[32m','yellow':'\x1b[33m','blue':'\x1b[34m','magenta':'\x1b[35m','cyan':'\x1b[36m','white':'\x1b[37m','reset':'\x1b[0m','bold':'\x1b[1m','dim':'\x1b[2m'};/**
 * Map a CSS-ish color string to the nearest ANSI color.
 *
 * @param {string} pColor - A color string (name or hex)
 * @returns {string} ANSI escape code
 */function colorToAnsi(pColor){if(!pColor){return ANSI_COLORS.blue;}let tmpLower=pColor.toLowerCase();// Direct name match
if(ANSI_COLORS[tmpLower]){return ANSI_COLORS[tmpLower];}// Simple hex-to-nearest mapping
if(tmpLower.charAt(0)==='#'&&tmpLower.length>=7){let tmpR=parseInt(tmpLower.substring(1,3),16);let tmpG=parseInt(tmpLower.substring(3,5),16);let tmpB=parseInt(tmpLower.substring(5,7),16);// Pick nearest basic color
if(tmpG>tmpR&&tmpG>tmpB){return ANSI_COLORS.green;}if(tmpR>tmpG&&tmpR>tmpB){return ANSI_COLORS.red;}if(tmpB>tmpR&&tmpB>tmpG){return ANSI_COLORS.blue;}if(tmpR>200&&tmpG>200){return ANSI_COLORS.yellow;}if(tmpR>200&&tmpB>200){return ANSI_COLORS.magenta;}if(tmpG>200&&tmpB>200){return ANSI_COLORS.cyan;}}return ANSI_COLORS.blue;}/**
 * Render a vertical CLI histogram.
 *
 * @param {object} pView - The histogram view instance
 * @returns {string} The ANSI text output
 */function renderVertical(pView){let tmpBins=pView.getBins();let tmpOptions=pView.options;let tmpHeight=tmpOptions.TextHeight||15;let tmpBarChar=tmpOptions.BarCharacter;let tmpPartials=tmpOptions.BarPartialCharacters;let tmpBarColor=colorToAnsi(tmpOptions.BarColor);let tmpSelectedColor=colorToAnsi(tmpOptions.SelectedBarColor);let tmpRangeColor=colorToAnsi(tmpOptions.SelectionRangeColor);let tmpReset=ANSI_COLORS.reset;if(!tmpBins||tmpBins.length===0){return'(no data)\n';}let tmpMaxValue=0;for(let i=0;i<tmpBins.length;i++){let tmpVal=tmpBins[i][tmpOptions.ValueProperty]||0;if(tmpVal>tmpMaxValue){tmpMaxValue=tmpVal;}}if(tmpMaxValue===0){tmpMaxValue=1;}let tmpValueAxisWidth=String(tmpMaxValue).length+1;let tmpLines=[];for(let tmpRow=tmpHeight;tmpRow>=1;tmpRow--){let tmpLine='';// Axis labels
if(tmpRow===tmpHeight){tmpLine+=ANSI_COLORS.dim+padLeft(String(tmpMaxValue),tmpValueAxisWidth)+'|'+tmpReset;}else if(tmpRow===1){tmpLine+=ANSI_COLORS.dim+padLeft('0',tmpValueAxisWidth)+'|'+tmpReset;}else if(tmpRow===Math.ceil(tmpHeight/2)){tmpLine+=ANSI_COLORS.dim+padLeft(String(Math.round(tmpMaxValue/2)),tmpValueAxisWidth)+'|'+tmpReset;}else{tmpLine+=ANSI_COLORS.dim+padLeft('',tmpValueAxisWidth)+'|'+tmpReset;}for(let i=0;i<tmpBins.length;i++){let tmpVal=tmpBins[i][tmpOptions.ValueProperty]||0;let tmpBarHeight=tmpVal/tmpMaxValue*tmpHeight;let tmpFullRows=Math.floor(tmpBarHeight);let tmpFraction=tmpBarHeight-tmpFullRows;let tmpIsSelected=pView.isIndexSelected(i);let tmpInRange=!tmpIsSelected&&pView.isIndexInRange(i);let tmpColor=tmpIsSelected?tmpSelectedColor:tmpInRange?tmpRangeColor:tmpBarColor;let tmpChar=' ';if(tmpRow<=tmpFullRows){tmpChar=tmpBarChar;}else if(tmpRow===tmpFullRows+1&&tmpFraction>0){let tmpPartialIndex=Math.round(tmpFraction*(tmpPartials.length-1));tmpChar=tmpPartials[tmpPartialIndex];}if(tmpChar!==' '){tmpLine+=' '+tmpColor+tmpChar+tmpChar+tmpChar+tmpReset;}else{tmpLine+='    ';}}tmpLines.push(tmpLine);}// Bottom axis
let tmpAxisLine=ANSI_COLORS.dim+padLeft('',tmpValueAxisWidth)+'+';for(let i=0;i<tmpBins.length;i++){tmpAxisLine+='----';}tmpAxisLine+=tmpReset;tmpLines.push(tmpAxisLine);// Labels
if(tmpOptions.ShowLabels){let tmpLabelLine=padLeft('',tmpValueAxisWidth)+' ';for(let i=0;i<tmpBins.length;i++){let tmpLabel=String(tmpBins[i][tmpOptions.LabelProperty]||'');tmpLabelLine+=padCenter(tmpLabel.substring(0,4),4);}tmpLines.push(tmpLabelLine);}// Range selection info
if(tmpOptions.Selectable&&tmpOptions.SelectionMode==='range'){let tmpStart=pView._selectionRangeStart;let tmpEnd=pView._selectionRangeEnd;let tmpStartLabel=tmpBins[tmpStart]?tmpBins[tmpStart][tmpOptions.LabelProperty]:tmpStart;let tmpEndLabel=tmpBins[tmpEnd]?tmpBins[tmpEnd][tmpOptions.LabelProperty]:tmpEnd;tmpLines.push('');tmpLines.push(ANSI_COLORS.bold+'  Selection: '+tmpStartLabel+' - '+tmpEndLabel+tmpReset);}return tmpLines.join('\n')+'\n';}/**
 * Render a horizontal CLI histogram.
 *
 * @param {object} pView - The histogram view instance
 * @returns {string} The ANSI text output
 */function renderHorizontal(pView){let tmpBins=pView.getBins();let tmpOptions=pView.options;let tmpWidth=tmpOptions.TextWidth||60;let tmpBarChar=tmpOptions.BarCharacter;let tmpBarColor=colorToAnsi(tmpOptions.BarColor);let tmpSelectedColor=colorToAnsi(tmpOptions.SelectedBarColor);let tmpRangeColor=colorToAnsi(tmpOptions.SelectionRangeColor);let tmpReset=ANSI_COLORS.reset;if(!tmpBins||tmpBins.length===0){return'(no data)\n';}let tmpMaxValue=0;let tmpMaxLabelLen=0;for(let i=0;i<tmpBins.length;i++){let tmpVal=tmpBins[i][tmpOptions.ValueProperty]||0;if(tmpVal>tmpMaxValue){tmpMaxValue=tmpVal;}let tmpLabel=String(tmpBins[i][tmpOptions.LabelProperty]||'');if(tmpLabel.length>tmpMaxLabelLen){tmpMaxLabelLen=tmpLabel.length;}}if(tmpMaxValue===0){tmpMaxValue=1;}let tmpLabelWidth=Math.min(tmpMaxLabelLen,12);let tmpValueWidth=String(tmpMaxValue).length;let tmpBarWidth=tmpWidth-tmpLabelWidth-tmpValueWidth-4;if(tmpBarWidth<10){tmpBarWidth=10;}let tmpLines=[];for(let i=0;i<tmpBins.length;i++){let tmpVal=tmpBins[i][tmpOptions.ValueProperty]||0;let tmpLabel=String(tmpBins[i][tmpOptions.LabelProperty]||'');let tmpBarLen=Math.round(tmpVal/tmpMaxValue*tmpBarWidth);let tmpIsSelected=pView.isIndexSelected(i);let tmpInRange=!tmpIsSelected&&pView.isIndexInRange(i);let tmpColor=tmpIsSelected?tmpSelectedColor:tmpInRange?tmpRangeColor:tmpBarColor;let tmpBar='';for(let j=0;j<tmpBarLen;j++){tmpBar+=tmpBarChar;}let tmpLine=ANSI_COLORS.dim+padRight(tmpLabel.substring(0,tmpLabelWidth),tmpLabelWidth)+' |'+tmpReset;tmpLine+=tmpColor+tmpBar+tmpReset;tmpLine+=' '+tmpVal;if(tmpIsSelected){tmpLine+=ANSI_COLORS.bold+' *'+tmpReset;}else if(tmpInRange){tmpLine+=ANSI_COLORS.dim+' ~'+tmpReset;}tmpLines.push(tmpLine);}// Range info
if(tmpOptions.Selectable&&tmpOptions.SelectionMode==='range'){let tmpStart=pView._selectionRangeStart;let tmpEnd=pView._selectionRangeEnd;let tmpStartLabel=tmpBins[tmpStart]?tmpBins[tmpStart][tmpOptions.LabelProperty]:tmpStart;let tmpEndLabel=tmpBins[tmpEnd]?tmpBins[tmpEnd][tmpOptions.LabelProperty]:tmpEnd;tmpLines.push('');tmpLines.push(ANSI_COLORS.bold+'  Selection: '+tmpStartLabel+' - '+tmpEndLabel+tmpReset);}return tmpLines.join('\n')+'\n';}/**
 * Render in CLI mode.  Writes to ContentAssignment if available, otherwise
 * falls back to process.stdout.
 *
 * @param {object} pView - The histogram view instance
 */function render(pView){let tmpText;if(pView.options.Orientation==='vertical'){tmpText=renderVertical(pView);}else{tmpText=renderHorizontal(pView);}// Try ContentAssignment first (might be mocked in tests or bridged)
if(pView.services&&pView.services.ContentAssignment){pView.services.ContentAssignment.assignContent(pView.options.TargetElementAddress,tmpText);}else if(typeof process!=='undefined'&&process.stdout){process.stdout.write(tmpText);}}// No interactive events in CLI mode
function wireEvents(){// No-op for CLI
}// --- Utility ---
function padLeft(pStr,pLen){let tmpStr=String(pStr);while(tmpStr.length<pLen){tmpStr=' '+tmpStr;}return tmpStr;}function padRight(pStr,pLen){let tmpStr=String(pStr);while(tmpStr.length<pLen){tmpStr=tmpStr+' ';}return tmpStr;}function padCenter(pStr,pLen){let tmpStr=String(pStr);while(tmpStr.length<pLen){tmpStr=tmpStr.length%2===0?tmpStr+' ':' '+tmpStr;}return tmpStr;}module.exports={render,wireEvents,renderVertical,renderHorizontal,colorToAnsi,ANSI_COLORS};}).call(this);}).call(this,require('_process'));},{"_process":90}],17:[function(require,module,exports){/**
 * Console UI (blessed) renderer for pict-section-histogram.
 *
 * Renders the histogram as text art through the Pict ContentAssignment
 * pipeline, suitable for blessed/ncurses terminal UI widgets.
 *
 * The output is assigned via ContentAssignment so the pict-terminalui
 * bridge (customAssignFunction) can project it into blessed boxes.
 *
 * @module Pict-Histogram-Renderer-ConsoleUI
 *//**
 * Build a vertical text histogram.
 *
 * Each column is one bar.  Rows go from top (max value) to bottom (0).
 * Uses block characters for fractional rows.
 *
 * @param {object} pView - The histogram view instance
 * @returns {string} The rendered text block
 */function renderVertical(pView){let tmpBins=pView.getBins();let tmpOptions=pView.options;let tmpHeight=tmpOptions.TextHeight||15;let tmpBarChar=tmpOptions.BarCharacter;let tmpPartials=tmpOptions.BarPartialCharacters;let tmpEmptyChar=tmpOptions.EmptyCharacter;if(!tmpBins||tmpBins.length===0){return'(no data)';}let tmpMaxValue=0;for(let i=0;i<tmpBins.length;i++){let tmpVal=tmpBins[i][tmpOptions.ValueProperty]||0;if(tmpVal>tmpMaxValue){tmpMaxValue=tmpVal;}}if(tmpMaxValue===0){tmpMaxValue=1;}// Determine label width for the value axis
let tmpValueAxisWidth=String(tmpMaxValue).length+1;// Build the grid top-down
let tmpLines=[];for(let tmpRow=tmpHeight;tmpRow>=1;tmpRow--){let tmpLine='';// Value axis label (only on a few rows)
if(tmpRow===tmpHeight){tmpLine+=padLeft(String(tmpMaxValue),tmpValueAxisWidth)+'|';}else if(tmpRow===1){tmpLine+=padLeft('0',tmpValueAxisWidth)+'|';}else if(tmpRow===Math.ceil(tmpHeight/2)){tmpLine+=padLeft(String(Math.round(tmpMaxValue/2)),tmpValueAxisWidth)+'|';}else{tmpLine+=padLeft('',tmpValueAxisWidth)+'|';}for(let i=0;i<tmpBins.length;i++){let tmpVal=tmpBins[i][tmpOptions.ValueProperty]||0;let tmpBarHeight=tmpVal/tmpMaxValue*tmpHeight;let tmpFullRows=Math.floor(tmpBarHeight);let tmpFraction=tmpBarHeight-tmpFullRows;let tmpChar=tmpEmptyChar;if(tmpRow<=tmpFullRows){tmpChar=tmpBarChar;}else if(tmpRow===tmpFullRows+1&&tmpFraction>0){let tmpPartialIndex=Math.round(tmpFraction*(tmpPartials.length-1));tmpChar=tmpPartials[tmpPartialIndex];}// Mark selected bins
let tmpIsSelected=pView.isIndexSelected(i);let tmpInRange=!tmpIsSelected&&pView.isIndexInRange(i);if(tmpIsSelected&&tmpChar!==tmpEmptyChar){tmpChar='*';}else if(tmpInRange&&tmpChar!==tmpEmptyChar){tmpChar='#';}// Each bar is 3 chars wide with 1 char gap
tmpLine+=' '+tmpChar+tmpChar+tmpChar;}tmpLines.push(tmpLine);}// Bottom axis
let tmpAxisLine=padLeft('',tmpValueAxisWidth)+'+';for(let i=0;i<tmpBins.length;i++){tmpAxisLine+='----';}tmpLines.push(tmpAxisLine);// Labels row
if(tmpOptions.ShowLabels){let tmpLabelLine=padLeft('',tmpValueAxisWidth)+' ';for(let i=0;i<tmpBins.length;i++){let tmpLabel=String(tmpBins[i][tmpOptions.LabelProperty]||'');tmpLabelLine+=padCenter(tmpLabel.substring(0,4),4);}tmpLines.push(tmpLabelLine);}// Selection range indicator
if(tmpOptions.Selectable&&tmpOptions.SelectionMode==='range'){let tmpRangeLine=padLeft('',tmpValueAxisWidth)+' ';for(let i=0;i<tmpBins.length;i++){if(i===pView._selectionRangeStart){tmpRangeLine+=' [  ';}else if(i===pView._selectionRangeEnd){tmpRangeLine+=' ]  ';}else if(i>pView._selectionRangeStart&&i<pView._selectionRangeEnd){tmpRangeLine+=' -  ';}else{tmpRangeLine+='    ';}}tmpLines.push(tmpRangeLine);}return tmpLines.join('\n');}/**
 * Build a horizontal text histogram.
 *
 * Each row is one bar growing rightward.
 *
 * @param {object} pView - The histogram view instance
 * @returns {string} The rendered text block
 */function renderHorizontal(pView){let tmpBins=pView.getBins();let tmpOptions=pView.options;let tmpWidth=tmpOptions.TextWidth||60;let tmpBarChar=tmpOptions.BarCharacter;let tmpPartials=tmpOptions.BarPartialCharacters;if(!tmpBins||tmpBins.length===0){return'(no data)';}let tmpMaxValue=0;let tmpMaxLabelLen=0;for(let i=0;i<tmpBins.length;i++){let tmpVal=tmpBins[i][tmpOptions.ValueProperty]||0;if(tmpVal>tmpMaxValue){tmpMaxValue=tmpVal;}let tmpLabel=String(tmpBins[i][tmpOptions.LabelProperty]||'');if(tmpLabel.length>tmpMaxLabelLen){tmpMaxLabelLen=tmpLabel.length;}}if(tmpMaxValue===0){tmpMaxValue=1;}let tmpLabelWidth=Math.min(tmpMaxLabelLen,12);let tmpBarWidth=tmpWidth-tmpLabelWidth-2;// space for " |"
if(tmpBarWidth<10){tmpBarWidth=10;}let tmpLines=[];for(let i=0;i<tmpBins.length;i++){let tmpVal=tmpBins[i][tmpOptions.ValueProperty]||0;let tmpLabel=String(tmpBins[i][tmpOptions.LabelProperty]||'');let tmpBarLen=tmpVal/tmpMaxValue*tmpBarWidth;let tmpFullChars=Math.floor(tmpBarLen);let tmpFraction=tmpBarLen-tmpFullChars;let tmpBar='';for(let j=0;j<tmpFullChars;j++){tmpBar+=tmpBarChar;}if(tmpFraction>0&&tmpFullChars<tmpBarWidth){let tmpPartialIndex=Math.round(tmpFraction*(tmpPartials.length-1));tmpBar+=tmpPartials[tmpPartialIndex];}// Mark selected
let tmpIsSelected=pView.isIndexSelected(i);let tmpInRange=!tmpIsSelected&&pView.isIndexInRange(i);let tmpMarker=tmpIsSelected?'*':tmpInRange?'~':'';let tmpValueStr=tmpOptions.ShowValues?' '+tmpVal:'';let tmpLine=padRight(tmpLabel.substring(0,tmpLabelWidth),tmpLabelWidth)+' |'+tmpBar+tmpValueStr+tmpMarker;tmpLines.push(tmpLine);}// Range indicator for range selection
if(tmpOptions.Selectable&&tmpOptions.SelectionMode==='range'){tmpLines.push('');tmpLines.push(padRight('',tmpLabelWidth)+'  Range: ['+pView._selectionRangeStart+' - '+pView._selectionRangeEnd+']');}return tmpLines.join('\n');}/**
 * Render via ContentAssignment for consoleui mode.
 *
 * @param {object} pView - The histogram view instance
 */function render(pView){let tmpText;if(pView.options.Orientation==='vertical'){tmpText=renderVertical(pView);}else{tmpText=renderHorizontal(pView);}pView.services.ContentAssignment.assignContent(pView.options.TargetElementAddress,tmpText);}// No interactive events for consoleui — input is handled by the blessed widget layer
function wireEvents(){// No-op for consoleui
}// --- Utility ---
function padLeft(pStr,pLen){let tmpStr=String(pStr);while(tmpStr.length<pLen){tmpStr=' '+tmpStr;}return tmpStr;}function padRight(pStr,pLen){let tmpStr=String(pStr);while(tmpStr.length<pLen){tmpStr=tmpStr+' ';}return tmpStr;}function padCenter(pStr,pLen){let tmpStr=String(pStr);while(tmpStr.length<pLen){tmpStr=tmpStr.length%2===0?tmpStr+' ':' '+tmpStr;}return tmpStr;}module.exports={render,wireEvents,renderVertical,renderHorizontal};},{}],18:[function(require,module,exports){/**
 * Pict-Modal-Confirm
 *
 * Builds confirm and double-confirm dialog DOM, returns Promises.
 */class PictModalConfirm{constructor(pModal){this._modal=pModal;}/**
	 * Show a single-step confirmation dialog.
	 *
	 * @param {string} pMessage - The confirmation message
	 * @param {object} [pOptions] - Options (title, confirmLabel, cancelLabel, dangerous)
	 * @returns {Promise<boolean>}
	 */confirm(pMessage,pOptions){let tmpOptions=Object.assign({},this._modal.options.DefaultConfirmOptions,pOptions);return new Promise(fResolve=>{let tmpDialog=this._buildDialog(tmpOptions.title,pMessage,fResolve,tmpOptions);this._showDialog(tmpDialog,fResolve);});}/**
	 * Show a two-step confirmation dialog.
	 *
	 * If confirmPhrase is provided, user must type it to enable the confirm button.
	 * Otherwise, first click changes button text, second click confirms.
	 *
	 * @param {string} pMessage - The confirmation message
	 * @param {object} [pOptions] - Options (title, confirmPhrase, phrasePrompt, confirmLabel, cancelLabel)
	 * @returns {Promise<boolean>}
	 */doubleConfirm(pMessage,pOptions){let tmpOptions=Object.assign({},this._modal.options.DefaultDoubleConfirmOptions,pOptions);return new Promise(fResolve=>{let tmpDialog=this._buildDoubleConfirmDialog(tmpOptions.title,pMessage,fResolve,tmpOptions);this._showDialog(tmpDialog,fResolve);});}/**
	 * Build a standard confirm dialog element.
	 *
	 * @param {string} pTitle
	 * @param {string} pMessage
	 * @param {function} fResolve - Promise resolver
	 * @param {object} pOptions
	 * @returns {HTMLElement}
	 */_buildDialog(pTitle,pMessage,fResolve,pOptions){let tmpId=this._modal._nextId();let tmpBtnStyle=pOptions.dangerous?'danger':'primary';let tmpDialog=document.createElement('div');tmpDialog.className='pict-modal-dialog';if(pOptions.unbounded){tmpDialog.className+=' pict-modal-dialog--unbounded';}tmpDialog.id='pict-modal-'+tmpId;tmpDialog.setAttribute('role','dialog');tmpDialog.setAttribute('aria-modal','true');tmpDialog.style.width='420px';tmpDialog.innerHTML='<div class="pict-modal-dialog-header">'+'<span class="pict-modal-dialog-title">'+this._escapeHTML(pTitle)+'</span>'+'<button class="pict-modal-dialog-close" aria-label="Close">&times;</button>'+'</div>'+'<div class="pict-modal-dialog-body">'+'<p>'+this._escapeHTML(pMessage)+'</p>'+'</div>'+'<div class="pict-modal-dialog-footer">'+'<button class="pict-modal-btn" data-action="cancel">'+this._escapeHTML(pOptions.cancelLabel)+'</button>'+'<button class="pict-modal-btn pict-modal-btn--'+tmpBtnStyle+'" data-action="confirm">'+this._escapeHTML(pOptions.confirmLabel)+'</button>'+'</div>';let tmpCloseBtn=tmpDialog.querySelector('.pict-modal-dialog-close');let tmpCancelBtn=tmpDialog.querySelector('[data-action="cancel"]');let tmpConfirmBtn=tmpDialog.querySelector('[data-action="confirm"]');let tmpDismiss=pResult=>{this._dismissDialog(tmpDialog,pResult,fResolve);};tmpCloseBtn.addEventListener('click',()=>{tmpDismiss(false);});tmpCancelBtn.addEventListener('click',()=>{tmpDismiss(false);});tmpConfirmBtn.addEventListener('click',()=>{tmpDismiss(true);});tmpDialog._dismiss=tmpDismiss;tmpDialog._focusTarget=tmpCancelBtn;return tmpDialog;}/**
	 * Build a double-confirm dialog element.
	 *
	 * @param {string} pTitle
	 * @param {string} pMessage
	 * @param {function} fResolve - Promise resolver
	 * @param {object} pOptions
	 * @returns {HTMLElement}
	 */_buildDoubleConfirmDialog(pTitle,pMessage,fResolve,pOptions){let tmpId=this._modal._nextId();let tmpHasPhrase=typeof pOptions.confirmPhrase==='string'&&pOptions.confirmPhrase.length>0;let tmpDialog=document.createElement('div');tmpDialog.className='pict-modal-dialog';if(pOptions.unbounded){tmpDialog.className+=' pict-modal-dialog--unbounded';}tmpDialog.id='pict-modal-'+tmpId;tmpDialog.setAttribute('role','dialog');tmpDialog.setAttribute('aria-modal','true');tmpDialog.style.width='420px';let tmpBodyContent='<p>'+this._escapeHTML(pMessage)+'</p>';if(tmpHasPhrase){let tmpPromptText=pOptions.phrasePrompt.replace('{phrase}',pOptions.confirmPhrase);tmpBodyContent+='<div class="pict-modal-confirm-prompt">'+this._escapeHTML(tmpPromptText)+'</div>'+'<input type="text" class="pict-modal-confirm-input" autocomplete="off" spellcheck="false" />';}tmpDialog.innerHTML='<div class="pict-modal-dialog-header">'+'<span class="pict-modal-dialog-title">'+this._escapeHTML(pTitle)+'</span>'+'<button class="pict-modal-dialog-close" aria-label="Close">&times;</button>'+'</div>'+'<div class="pict-modal-dialog-body">'+tmpBodyContent+'</div>'+'<div class="pict-modal-dialog-footer">'+'<button class="pict-modal-btn" data-action="cancel">'+this._escapeHTML(pOptions.cancelLabel)+'</button>'+'<button class="pict-modal-btn pict-modal-btn--danger" data-action="confirm" disabled>'+this._escapeHTML(pOptions.confirmLabel)+'</button>'+'</div>';let tmpCloseBtn=tmpDialog.querySelector('.pict-modal-dialog-close');let tmpCancelBtn=tmpDialog.querySelector('[data-action="cancel"]');let tmpConfirmBtn=tmpDialog.querySelector('[data-action="confirm"]');let tmpDismiss=pResult=>{this._dismissDialog(tmpDialog,pResult,fResolve);};tmpCloseBtn.addEventListener('click',()=>{tmpDismiss(false);});tmpCancelBtn.addEventListener('click',()=>{tmpDismiss(false);});if(tmpHasPhrase){// Phrase-based: enable confirm button when input matches
let tmpInput=tmpDialog.querySelector('.pict-modal-confirm-input');tmpInput.addEventListener('input',()=>{tmpConfirmBtn.disabled=tmpInput.value!==pOptions.confirmPhrase;});tmpConfirmBtn.addEventListener('click',()=>{if(!tmpConfirmBtn.disabled){tmpDismiss(true);}});tmpDialog._focusTarget=tmpInput;}else{// Two-click: first click changes label, second click confirms
let tmpClickCount=0;let tmpOriginalLabel=pOptions.confirmLabel;tmpConfirmBtn.disabled=false;tmpConfirmBtn.addEventListener('click',()=>{tmpClickCount++;if(tmpClickCount===1){tmpConfirmBtn.textContent='Click again to confirm';}else{tmpDismiss(true);}});tmpDialog._focusTarget=tmpCancelBtn;}tmpDialog._dismiss=tmpDismiss;return tmpDialog;}/**
	 * Show a dialog element: append to body, show overlay, animate in.
	 *
	 * @param {HTMLElement} pDialog
	 * @param {function} fResolve - Promise resolver (for overlay click dismiss)
	 */_showDialog(pDialog,fResolve){let tmpModalEntry={element:pDialog,dismiss:pDialog._dismiss,type:'confirm'};// Show overlay
let tmpOverlayClickHandler=null;if(this._modal.options.OverlayClickDismisses){tmpOverlayClickHandler=()=>{pDialog._dismiss(false);};}this._modal._overlay.show(tmpOverlayClickHandler);// Append to body
document.body.appendChild(pDialog);// Track active modal
this._modal._activeModals.push(tmpModalEntry);// Animate in
void pDialog.offsetHeight;pDialog.classList.add('pict-modal-visible');// Focus
if(pDialog._focusTarget){pDialog._focusTarget.focus();}// Keyboard handler
pDialog._keyHandler=pEvent=>{if(pEvent.key==='Escape'){pDialog._dismiss(false);}};document.addEventListener('keydown',pDialog._keyHandler);}/**
	 * Dismiss a dialog: animate out, remove from DOM, hide overlay.
	 *
	 * @param {HTMLElement} pDialog
	 * @param {*} pResult - Value to resolve the promise with
	 * @param {function} fResolve - Promise resolver
	 */_dismissDialog(pDialog,pResult,fResolve){// Prevent double-dismiss
if(pDialog._dismissed){return;}pDialog._dismissed=true;// Remove keyboard handler
if(pDialog._keyHandler){document.removeEventListener('keydown',pDialog._keyHandler);}// Animate out
pDialog.classList.remove('pict-modal-visible');// Remove from active modals
this._modal._activeModals=this._modal._activeModals.filter(pEntry=>{return pEntry.element!==pDialog;});// Update overlay click handler to point to new topmost modal
if(this._modal._activeModals.length>0){let tmpTopModal=this._modal._activeModals[this._modal._activeModals.length-1];this._modal._overlay.updateClickHandler(this._modal.options.OverlayClickDismisses?tmpTopModal.dismiss:null);}// Hide overlay
this._modal._overlay.hide();// Remove from DOM after transition
setTimeout(()=>{if(pDialog.parentNode){pDialog.parentNode.removeChild(pDialog);}},220);// Resolve promise
fResolve(pResult);}/**
	 * Escape HTML special characters.
	 *
	 * @param {string} pText
	 * @returns {string}
	 */_escapeHTML(pText){if(typeof pText!=='string'){return'';}return pText.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}}module.exports=PictModalConfirm;},{}],19:[function(require,module,exports){/**
 * Pict-Modal-Dropdown
 *
 * Anchor-positioned menu that behaves like a dropdown / popover. Handy for:
 *   - nav menus that hang off a header link or button
 *   - "split button" style addenda (a primary action paired with a chevron
 *     that opens a list of related/alternate actions)
 *   - any "more options" affordance where a full modal would be heavy
 *
 * Differences from the modal Window helper:
 *   - No backdrop overlay — the rest of the page stays interactive.
 *   - Positioned next to the anchor element, not centered.
 *   - Auto-flips above when there isn't room below; clamps inside the viewport.
 *   - Click outside or Escape dismisses (matches native menu conventions).
 *
 * Usage:
 *     modal.dropdown(anchorEl, {
 *         items:
 *         [
 *             { Hash: 'edit',   Label: 'Edit'                    },
 *             { Hash: 'rename', Label: 'Rename...'                },
 *             { Separator: true                                   },
 *             { Hash: 'delete', Label: 'Delete', Style: 'danger'  },
 *             { Hash: 'archive',Label: 'Archive', Disabled: true,
 *               Tooltip: 'Already archived'                       }
 *         ],
 *         align: 'left'        // 'left' | 'right' (relative to anchor)
 *     }).then((pChoice) => { ... });
 *
 * Returns a Promise that resolves with `{ Hash, Item }` on selection or
 * `null` on dismiss.
 */class PictModalDropdown{constructor(pModal){this._modal=pModal;this._activeMenu=null;}/**
	 * Open a dropdown menu anchored to an element.
	 *
	 * @param {HTMLElement|string|object} pAnchor - Element, CSS selector, or
	 *   a rect-like { left, top, width, height } anchor (handy for context menus).
	 * @param {object} pOptions
	 * @param {Array}    pOptions.items     - [{ Hash, Label, Style?, Disabled?, Tooltip?, Icon?, Separator? }]
	 * @param {string}   [pOptions.ContentHTML] - Free-form HTML body for the popover, rendered
	 *   verbatim via innerHTML INSTEAD of building a menu from items[]. When set, the element is
	 *   a plain anchored popover (no role=menu / keyboard item nav); outside-click, Escape,
	 *   auto-flip and reposition still apply. Sanitize untrusted content. items is ignored.
	 * @param {string}   [pOptions.align]   - 'left'|'right'|'center' (default 'left')
	 * @param {string}   [pOptions.position]- 'auto'|'below'|'above' (default 'auto')
	 * @param {string}   [pOptions.minWidth]- CSS minWidth (default: anchor width if known, else '160px')
	 * @param {string}   [pOptions.maxWidth]- CSS maxWidth (default unset; the base menu caps at 360px,
	 *   the --content variant uncaps — set this for wide rich-content popovers)
	 * @param {string}   [pOptions.maxHeight]- CSS maxHeight (default '60vh')
	 * @param {string}   [pOptions.className]- extra class(es) for the menu element
	 * @param {boolean}  [pOptions.closeOnSelect] - default true (no-op in ContentHTML mode)
	 * @param {function} [pOptions.onSelect]- called with (Hash, Item) on selection
	 * @param {function} [pOptions.onClose] - called after dismiss
	 * @returns {Promise<{Hash: string, Item: object}|null>}
	 */dropdown(pAnchor,pOptions){let tmpOptions=Object.assign({align:'left',position:'auto',maxHeight:'60vh',closeOnSelect:true},pOptions||{});let tmpAnchorEl=this._resolveAnchor(pAnchor);let tmpAnchorRect=this._anchorRect(pAnchor,tmpAnchorEl);if(!tmpAnchorRect){return Promise.resolve(null);}// Re-opening the same menu is a no-op; closing-then-reopening is a
// caller decision (just call dismissDropdown() first).
if(this._activeMenu&&this._activeMenu.anchor===tmpAnchorEl){return this._activeMenu.promise;}// Only one dropdown at a time keeps focus / keyboard handling sane.
this.dismissAll();let tmpItems=Array.isArray(tmpOptions.items)?tmpOptions.items:[];let tmpResolveOuter;let tmpPromise=new Promise(fResolve=>{tmpResolveOuter=fResolve;});let tmpMenu=this._buildMenu(tmpItems,tmpOptions);document.body.appendChild(tmpMenu);this._positionMenu(tmpMenu,tmpAnchorRect,tmpOptions);// Animate in on the next frame.
void tmpMenu.offsetHeight;tmpMenu.classList.add('pict-modal-visible');let tmpDismiss=pResult=>{if(tmpMenu._dismissed){return;}tmpMenu._dismissed=true;document.removeEventListener('mousedown',tmpOutsideHandler,true);document.removeEventListener('keydown',tmpKeyHandler,true);window.removeEventListener('resize',tmpRepositionHandler);window.removeEventListener('scroll',tmpRepositionHandler,true);tmpMenu.classList.remove('pict-modal-visible');setTimeout(()=>{if(tmpMenu.parentNode){tmpMenu.parentNode.removeChild(tmpMenu);}},180);if(this._activeMenu&&this._activeMenu.element===tmpMenu){this._activeMenu=null;}if(typeof tmpOptions.onClose==='function'){tmpOptions.onClose(pResult);}tmpResolveOuter(pResult);};// Wire item clicks (each item element carries a data-hash; separators
// and disabled items are skipped).
let tmpItemEls=tmpMenu.querySelectorAll('[data-pict-modal-dropdown-item]');for(let i=0;i<tmpItemEls.length;i++){let tmpEl=tmpItemEls[i];tmpEl.addEventListener('click',pEvent=>{if(tmpEl.hasAttribute('data-disabled')){return;}pEvent.stopPropagation();let tmpIdx=parseInt(tmpEl.getAttribute('data-index'),10);let tmpItem=tmpItems[tmpIdx];let tmpHash=tmpEl.getAttribute('data-hash');if(typeof tmpOptions.onSelect==='function'){tmpOptions.onSelect(tmpHash,tmpItem);}if(tmpOptions.closeOnSelect!==false){tmpDismiss({Hash:tmpHash,Item:tmpItem});}});}// Click anywhere outside the menu (and outside the anchor) → dismiss.
// Use mousedown/capture so we beat any per-element click handlers.
let tmpOutsideHandler=pEvent=>{if(tmpMenu.contains(pEvent.target)){return;}if(tmpAnchorEl&&tmpAnchorEl.contains&&tmpAnchorEl.contains(pEvent.target)){return;}tmpDismiss(null);};document.addEventListener('mousedown',tmpOutsideHandler,true);// Esc dismisses; arrow keys navigate items (skipping disabled/separator).
let tmpKeyHandler=pEvent=>{if(pEvent.key==='Escape'){pEvent.stopPropagation();tmpDismiss(null);return;}if(pEvent.key==='ArrowDown'||pEvent.key==='ArrowUp'){pEvent.preventDefault();this._focusNeighbor(tmpMenu,pEvent.key==='ArrowDown'?1:-1);}else if(pEvent.key==='Enter'||pEvent.key===' '){let tmpFocused=document.activeElement;if(tmpFocused&&tmpMenu.contains(tmpFocused)&&tmpFocused.hasAttribute('data-pict-modal-dropdown-item')){pEvent.preventDefault();tmpFocused.click();}}};document.addEventListener('keydown',tmpKeyHandler,true);// Reposition on viewport resize / scroll so the menu doesn't drift
// off the anchor.
let tmpRepositionHandler=()=>{let tmpRect=this._anchorRect(pAnchor,tmpAnchorEl);if(tmpRect){this._positionMenu(tmpMenu,tmpRect,tmpOptions);}};window.addEventListener('resize',tmpRepositionHandler);window.addEventListener('scroll',tmpRepositionHandler,true);// Move keyboard focus to the first enabled item so arrows / Enter work
// without an extra click.
setTimeout(()=>{this._focusFirstEnabled(tmpMenu);},0);this._activeMenu={element:tmpMenu,anchor:tmpAnchorEl,promise:tmpPromise,dismiss:tmpDismiss};return tmpPromise;}/**
	 * Dismiss the currently-open dropdown (if any).
	 */dismissAll(){if(this._activeMenu){let tmpDismiss=this._activeMenu.dismiss;this._activeMenu=null;tmpDismiss(null);}}// ─────────────────────────────────────────────
//  Internals
// ─────────────────────────────────────────────
_resolveAnchor(pAnchor){if(!pAnchor){return null;}if(typeof pAnchor==='string'){return document.querySelector(pAnchor);}if(pAnchor.nodeType===1){return pAnchor;}// rect-like — no element to attach focus / outside-click ignore to,
// but that's fine, the caller knows what they're doing.
return null;}_anchorRect(pAnchor,pAnchorEl){if(pAnchorEl&&typeof pAnchorEl.getBoundingClientRect==='function'){return pAnchorEl.getBoundingClientRect();}if(pAnchor&&typeof pAnchor==='object'&&typeof pAnchor.left==='number'&&typeof pAnchor.top==='number'){return{left:pAnchor.left,top:pAnchor.top,width:pAnchor.width||0,height:pAnchor.height||0,right:pAnchor.left+(pAnchor.width||0),bottom:pAnchor.top+(pAnchor.height||0)};}return null;}/**
	 * True when the value is usable as ContentHTML — a primitive string or a
	 * boxed String object (some template engines hand back `new String(...)`,
	 * which is `typeof 'object'` and would otherwise slip past the guard).
	 *
	 * @param {*} pValue
	 * @returns {boolean}
	 */_isContentHTML(pValue){return typeof pValue==='string'||pValue instanceof String;}_buildMenu(pItems,pOptions){let tmpId=this._modal._nextId();let tmpMenu=document.createElement('div');tmpMenu.className='pict-modal-dropdown';// Free-form content popovers carry a modifier so the host can reset the
// menu-item chrome (padding / max-width) and style the body itself.
if(this._isContentHTML(pOptions.ContentHTML)){tmpMenu.className+=' pict-modal-dropdown--content';}if(pOptions.className){tmpMenu.className+=' '+pOptions.className;}tmpMenu.id='pict-modal-dropdown-'+tmpId;tmpMenu.style.maxHeight=pOptions.maxHeight;if(pOptions.maxWidth){tmpMenu.style.maxWidth=pOptions.maxWidth;}// ContentHTML mode: render the caller's HTML verbatim instead of building
// a menu from items[]. This is a free-form anchored popover (e.g. a rich
// info card, or a pre-rendered template menu) — not a role=menu list, so
// we skip the menu role and the per-item keyboard semantics. Outside-click
// / Escape / auto-flip / reposition all still apply from dropdown().
if(this._isContentHTML(pOptions.ContentHTML)){tmpMenu.innerHTML=pOptions.ContentHTML;return tmpMenu;}tmpMenu.setAttribute('role','menu');let tmpHtml='';for(let i=0;i<pItems.length;i++){let tmpItem=pItems[i];if(tmpItem.Separator){tmpHtml+='<div class="pict-modal-dropdown-separator" role="separator"></div>';continue;}if(tmpItem.Header){tmpHtml+='<div class="pict-modal-dropdown-header">'+this._escapeHTML(tmpItem.Header)+'</div>';continue;}let tmpCls='pict-modal-dropdown-item';if(tmpItem.Style){tmpCls+=' pict-modal-dropdown-item--'+tmpItem.Style;}if(tmpItem.Disabled){tmpCls+=' pict-modal-dropdown-item--disabled';}let tmpAttrs=''+' data-pict-modal-dropdown-item'+' data-index="'+i+'"'+' data-hash="'+this._escapeHTML(tmpItem.Hash||'')+'"'+' role="menuitem"'+' tabindex="-1"';if(tmpItem.Disabled){tmpAttrs+=' aria-disabled="true" data-disabled';}if(tmpItem.Tooltip){tmpAttrs+=' title="'+this._escapeHTML(tmpItem.Tooltip)+'"';}let tmpIcon=tmpItem.Icon?'<span class="pict-modal-dropdown-item-icon">'+tmpItem.Icon+'</span>':'';let tmpHint=tmpItem.Hint?'<span class="pict-modal-dropdown-item-hint">'+this._escapeHTML(tmpItem.Hint)+'</span>':'';tmpHtml+='<div class="'+tmpCls+'"'+tmpAttrs+'>'+tmpIcon+'<span class="pict-modal-dropdown-item-label">'+this._escapeHTML(tmpItem.Label||'')+'</span>'+tmpHint+'</div>';}tmpMenu.innerHTML=tmpHtml;return tmpMenu;}_positionMenu(pMenu,pAnchorRect,pOptions){// Apply min-width before measuring so the menu's natural size accounts
// for the constraint.
let tmpMinWidth=pOptions.minWidth||(pAnchorRect.width>=80?Math.ceil(pAnchorRect.width)+'px':'160px');pMenu.style.minWidth=tmpMinWidth;// Measure after attaching.
let tmpMenuRect=pMenu.getBoundingClientRect();let tmpVw=window.innerWidth||document.documentElement.clientWidth;let tmpVh=window.innerHeight||document.documentElement.clientHeight;let tmpGap=4;// breathing room between anchor and menu
// Vertical: prefer below; flip above when not enough room and there's
// more above. 'below'/'above' overrides force the side.
let tmpRoomBelow=tmpVh-pAnchorRect.bottom-tmpGap;let tmpRoomAbove=pAnchorRect.top-tmpGap;let tmpPlaceAbove;if(pOptions.position==='above'){tmpPlaceAbove=true;}else if(pOptions.position==='below'){tmpPlaceAbove=false;}else{tmpPlaceAbove=tmpMenuRect.height>tmpRoomBelow&&tmpRoomAbove>tmpRoomBelow;}// Cap height to whichever side we landed on so the menu can scroll
// internally instead of running off the screen.
let tmpCap=Math.max(80,(tmpPlaceAbove?tmpRoomAbove:tmpRoomBelow)-8);pMenu.style.maxHeight=tmpCap+'px';// Horizontal alignment to the anchor, then clamp inside the viewport.
let tmpLeft;if(pOptions.align==='right'){tmpLeft=pAnchorRect.right-tmpMenuRect.width;}else if(pOptions.align==='center'){tmpLeft=pAnchorRect.left+(pAnchorRect.width-tmpMenuRect.width)/2;}else{tmpLeft=pAnchorRect.left;}tmpLeft=Math.min(tmpLeft,tmpVw-tmpMenuRect.width-4);tmpLeft=Math.max(4,tmpLeft);let tmpTop;if(tmpPlaceAbove){tmpTop=Math.max(4,pAnchorRect.top-tmpMenuRect.height-tmpGap);pMenu.classList.add('pict-modal-dropdown--above');}else{tmpTop=pAnchorRect.bottom+tmpGap;pMenu.classList.remove('pict-modal-dropdown--above');}pMenu.style.left=Math.round(tmpLeft)+'px';pMenu.style.top=Math.round(tmpTop)+'px';}_focusFirstEnabled(pMenu){let tmpItems=pMenu.querySelectorAll('[data-pict-modal-dropdown-item]:not([data-disabled])');if(tmpItems.length){tmpItems[0].focus();}}_focusNeighbor(pMenu,pDirection){let tmpItems=Array.prototype.slice.call(pMenu.querySelectorAll('[data-pict-modal-dropdown-item]:not([data-disabled])'));if(!tmpItems.length){return;}let tmpActive=document.activeElement;let tmpIdx=tmpItems.indexOf(tmpActive);let tmpNext=tmpIdx===-1?pDirection>0?0:tmpItems.length-1:(tmpIdx+pDirection+tmpItems.length)%tmpItems.length;tmpItems[tmpNext].focus();}_escapeHTML(pText){if(typeof pText!=='string'){return'';}return pText.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}}module.exports=PictModalDropdown;},{}],20:[function(require,module,exports){/**
 * Pict-Modal-Overlay
 *
 * Manages a shared backdrop overlay element appended to document.body.
 * Reference-counted — created on first modal open, removed when last closes.
 */class PictModalOverlay{constructor(pModal){this._modal=pModal;this._element=null;this._refCount=0;}/**
	 * Show the overlay (incrementing reference count).
	 * Creates the DOM element on first call.
	 *
	 * @param {function} [fOnClick] - Optional click handler (e.g. dismiss topmost modal)
	 */show(fOnClick){this._refCount++;if(!this._element){this._element=document.createElement('div');this._element.className='pict-modal-overlay';document.body.appendChild(this._element);// Force reflow so the transition animates
void this._element.offsetHeight;this._element.classList.add('pict-modal-visible');}if(fOnClick){// Store the latest click handler (for the topmost modal)
this._currentClickHandler=fOnClick;this._element.onclick=pEvent=>{if(pEvent.target===this._element&&this._currentClickHandler){this._currentClickHandler();}};}}/**
	 * Update the overlay click handler (e.g. when topmost modal changes).
	 *
	 * @param {function} [fOnClick] - New click handler
	 */updateClickHandler(fOnClick){this._currentClickHandler=fOnClick||null;}/**
	 * Hide the overlay (decrementing reference count).
	 * Removes the DOM element when reference count reaches zero.
	 */hide(){this._refCount--;if(this._refCount<=0){this._refCount=0;if(this._element){this._element.classList.remove('pict-modal-visible');let tmpElement=this._element;// Remove after transition
setTimeout(()=>{if(tmpElement.parentNode){tmpElement.parentNode.removeChild(tmpElement);}},220);this._element=null;this._currentClickHandler=null;}}}/**
	 * Force-remove the overlay regardless of reference count.
	 */destroy(){this._refCount=0;if(this._element&&this._element.parentNode){this._element.parentNode.removeChild(this._element);}this._element=null;this._currentClickHandler=null;}}module.exports=PictModalOverlay;},{}],21:[function(require,module,exports){/**
 * Pict-Modal-Panel
 *
 * Adds resizable and collapsible panel behavior to any DOM element.
 * Follows the handler composition pattern used by the other modal
 * handlers (confirm, window, toast, tooltip).
 *
 * Usage:
 *   let handle = modal.panel('#my-panel', { position: 'right', width: 340 });
 *   handle.toggle();
 *   handle.destroy();
 */class PictModalPanel{constructor(pModal){this._modal=pModal;this._panels=[];}/**
	 * Attach resizable/collapsible panel behavior to an element.
	 *
	 * @param {string} pTargetSelector - CSS selector for the panel element
	 * @param {object} [pOptions] - Panel options
	 * @returns {{ collapse, expand, toggle, setWidth, destroy }} Panel handle
	 */create(pTargetSelector,pOptions){let tmpDefaults=this._modal&&this._modal.options&&this._modal.options.DefaultPanelOptions||{};let tmpOptions=Object.assign({},{position:'right',width:340,minWidth:200,maxWidth:600,collapsible:true,collapsed:false,persist:false,persistKey:'',onResize:null,onToggle:null},tmpDefaults,pOptions);if(typeof document==='undefined')return this._nullHandle();let tmpTarget=document.querySelector(pTargetSelector);if(!tmpTarget)return this._nullHandle();let tmpId=this._modal._nextId();let tmpIsRight=tmpOptions.position==='right';let tmpIsCollapsed=false;let tmpCurrentWidth=tmpOptions.width;let tmpDestroyed=false;// Restore persisted state
if(tmpOptions.persist&&tmpOptions.persistKey){try{let tmpStored=localStorage.getItem('pict-panel-'+tmpOptions.persistKey);if(tmpStored){let tmpParsed=JSON.parse(tmpStored);if(typeof tmpParsed.width==='number')tmpCurrentWidth=tmpParsed.width;if(typeof tmpParsed.collapsed==='boolean')tmpOptions.collapsed=tmpParsed.collapsed;}}catch(e){/* ignore */}}// Apply classes and initial width
tmpTarget.classList.add('pict-panel');tmpTarget.classList.add(tmpIsRight?'pict-panel-right':'pict-panel-left');tmpTarget.style.width=tmpCurrentWidth+'px';// Remove display:none if present — panel uses width collapse instead
if(tmpTarget.style.display==='none'){tmpTarget.style.display='';}// ── Create the edge container ───────────────────────
let tmpEdge=document.createElement('div');tmpEdge.className='pict-panel-edge '+(tmpIsRight?'pict-panel-edge-right':'pict-panel-edge-left');// Resize handle
let tmpResize=document.createElement('div');tmpResize.className='pict-panel-resize';tmpEdge.appendChild(tmpResize);// Collapse tab (chevron SVG)
let tmpTab=null;if(tmpOptions.collapsible){tmpTab=document.createElement('div');tmpTab.className='pict-panel-tab';tmpTab.title='Toggle panel';tmpEdge.appendChild(tmpTab);}// Insert edge as a sibling so it is not clipped by the
// panel's own overflow (e.g. overflow-y: auto for scrolling).
// Right panels: edge goes BEFORE the panel (left side).
// Left panels: edge goes AFTER the panel (right side).
if(tmpTarget.parentNode){if(tmpIsRight){tmpTarget.parentNode.insertBefore(tmpEdge,tmpTarget);}else{tmpTarget.parentNode.insertBefore(tmpEdge,tmpTarget.nextSibling);}}else{tmpTarget.insertBefore(tmpEdge,tmpTarget.firstChild);}// ── Chevron lookup via pict.providers.Icon ──────────
// Both directions come from the core registry (`{~I:ChevronLeft~}`
// / `{~I:ChevronRight~}`).  Resolved per-render so a theme that
// re-registers the chevron variant picks up automatically.  Empty
// fallback in the unlikely case pict is missing the Icon provider
// (very old pict versions; current minimum is 1.0.368).
let tmpPictHandle=typeof window!=='undefined'&&window.pict?window.pict:null;let tmpIcon=pName=>tmpPictHandle&&typeof tmpPictHandle.icon==='function'?tmpPictHandle.icon(pName):'';let tmpUpdateChevron=()=>{if(!tmpTab)return;let tmpChevronRight=tmpIcon('ChevronRight');let tmpChevronLeft=tmpIcon('ChevronLeft');if(tmpIsRight){tmpTab.innerHTML=tmpIsCollapsed?tmpChevronLeft:tmpChevronRight;}else{tmpTab.innerHTML=tmpIsCollapsed?tmpChevronRight:tmpChevronLeft;}};// ── Persist helper ──────────────────────────────────
let tmpPersist=()=>{if(!tmpOptions.persist||!tmpOptions.persistKey)return;try{localStorage.setItem('pict-panel-'+tmpOptions.persistKey,JSON.stringify({width:tmpCurrentWidth,collapsed:tmpIsCollapsed}));}catch(e){/* ignore */}};// ── Collapse / expand ───────────────────────────────
let tmpCollapse=()=>{if(tmpIsCollapsed||tmpDestroyed)return;tmpIsCollapsed=true;tmpTarget.classList.add('pict-panel-collapsed');tmpEdge.classList.add('pict-panel-edge-collapsed');tmpUpdateChevron();tmpPersist();if(typeof tmpOptions.onToggle==='function')tmpOptions.onToggle(true);};let tmpExpand=()=>{if(!tmpIsCollapsed||tmpDestroyed)return;tmpIsCollapsed=false;tmpEdge.classList.remove('pict-panel-edge-collapsed');tmpTarget.classList.remove('pict-panel-collapsed');tmpTarget.style.width=tmpCurrentWidth+'px';tmpUpdateChevron();tmpPersist();if(typeof tmpOptions.onToggle==='function')tmpOptions.onToggle(false);};let tmpToggle=()=>{if(tmpIsCollapsed)tmpExpand();else tmpCollapse();};let tmpSetWidth=pWidth=>{if(tmpDestroyed)return;let tmpWidth=Math.max(tmpOptions.minWidth,Math.min(tmpOptions.maxWidth,pWidth));tmpCurrentWidth=tmpWidth;if(!tmpIsCollapsed){tmpTarget.style.width=tmpWidth+'px';}tmpPersist();if(typeof tmpOptions.onResize==='function')tmpOptions.onResize(tmpWidth);};// ── Tab click ───────────────────────────────────────
if(tmpTab){tmpTab.addEventListener('click',pEvent=>{pEvent.stopPropagation();tmpToggle();});}// ── Resize drag ─────────────────────────────────────
let tmpOnMouseDown=pEvent=>{if(tmpIsCollapsed)return;pEvent.preventDefault();let tmpStartX=pEvent.clientX;let tmpStartWidth=tmpTarget.offsetWidth;tmpResize.classList.add('dragging');tmpTarget.style.transition='none';document.body.style.userSelect='none';document.body.style.cursor='col-resize';let tmpOnMouseMove=pMoveEvent=>{let tmpDelta=tmpIsRight?tmpStartX-pMoveEvent.clientX:pMoveEvent.clientX-tmpStartX;let tmpNewWidth=Math.max(tmpOptions.minWidth,Math.min(tmpOptions.maxWidth,tmpStartWidth+tmpDelta));tmpTarget.style.width=tmpNewWidth+'px';};let tmpOnMouseUp=pUpEvent=>{document.removeEventListener('mousemove',tmpOnMouseMove);document.removeEventListener('mouseup',tmpOnMouseUp);tmpResize.classList.remove('dragging');tmpTarget.style.transition='';document.body.style.userSelect='';document.body.style.cursor='';// Capture the final width
tmpCurrentWidth=tmpTarget.offsetWidth;tmpPersist();if(typeof tmpOptions.onResize==='function')tmpOptions.onResize(tmpCurrentWidth);};document.addEventListener('mousemove',tmpOnMouseMove);document.addEventListener('mouseup',tmpOnMouseUp);};tmpResize.addEventListener('mousedown',tmpOnMouseDown);// ── Initial state ───────────────────────────────────
tmpUpdateChevron();if(tmpOptions.collapsed){tmpIsCollapsed=true;tmpTarget.classList.add('pict-panel-collapsed');tmpEdge.classList.add('pict-panel-edge-collapsed');tmpUpdateChevron();}// ── Destroy ─────────────────────────────────────────
let tmpDestroy=()=>{if(tmpDestroyed)return;tmpDestroyed=true;tmpResize.removeEventListener('mousedown',tmpOnMouseDown);if(tmpEdge.parentNode)tmpEdge.remove();tmpTarget.classList.remove('pict-panel','pict-panel-right','pict-panel-left','pict-panel-collapsed');tmpTarget.style.width='';tmpTarget.style.transition='';let tmpIdx=this._panels.indexOf(tmpHandle);if(tmpIdx>=0)this._panels.splice(tmpIdx,1);};// ── Return handle ───────────────────────────────────
let tmpHandle={id:tmpId,collapse:tmpCollapse,expand:tmpExpand,toggle:tmpToggle,setWidth:tmpSetWidth,destroy:tmpDestroy};this._panels.push(tmpHandle);return tmpHandle;}/**
	 * Return a no-op handle for server-side or missing-element cases.
	 */_nullHandle(){return{id:0,collapse:()=>{},expand:()=>{},toggle:()=>{},setWidth:()=>{},destroy:()=>{}};}/**
	 * Destroy all active panels.
	 */destroyAll(){let tmpPanels=this._panels.slice();for(let i=0;i<tmpPanels.length;i++){tmpPanels[i].destroy();}}}module.exports=PictModalPanel;},{}],22:[function(require,module,exports){/**
 * Pict-Modal-Shell — viewport-managing layout system for top / right /
 * bottom / left panels around a center.
 *
 * # What this is for
 *
 * Most apps grow a chrome of stacked bars: a topbar, sometimes a
 * sub-nav, sometimes a bottom status bar, often a left sidebar, maybe
 * a right inspector. Each one has its own collapse / resize / persist
 * concerns, and apps end up reinventing the layout glue + the chrome
 * controls per-app.
 *
 * The Shell solves this once. The host calls `modal.shell(viewport)`,
 * adds panels in the order they should stack from each edge, and the
 * Shell manages:
 *
 *   - DOM structure (a flex tree wrapping the viewport)
 *   - Layout placement (multiple panels per side, each in registration order)
 *   - Collapse / expand chrome (a thin tab strip when collapsed)
 *   - Resize chrome (drag handle on the inner edge)
 *   - Pinned (in-flow) vs overlay (absolutely-positioned) panels
 *   - Persistence (per-panel collapsed + size, scoped by host or custom key)
 *   - Center destination (the workspace area between all panels)
 *
 * # Usage
 *
 *   let tmpShell = modal.shell('#App-Container', { PersistenceKey: 'my-app' });
 *
 *   tmpShell.addPanel({
 *       Hash: 'topbar', Side: 'top', Mode: 'fixed', Size: 60,
 *       ContentDestinationId: 'App-TopBar'
 *   });
 *   tmpShell.addPanel({
 *       Hash: 'statusbar', Side: 'bottom', Mode: 'fixed', Size: 28,
 *       ContentDestinationId: 'App-StatusBar'
 *   });
 *   tmpShell.addPanel({
 *       Hash: 'sidebar', Side: 'left', Mode: 'resizable', Size: 280,
 *       MinSize: 180, MaxSize: 480, Title: 'Modules',
 *       ContentDestinationId: 'App-Sidebar'
 *   });
 *
 *   let tmpCenter = tmpShell.center({ ContentDestinationId: 'App-Workspace' });
 *
 *   // Render into the destinations the same way as any other Pict view.
 *   pict.ContentAssignment.assignContent('#App-Sidebar', tmpHTML);
 *
 * # Panel options
 *
 *   Hash:                 unique id within the shell (auto-generated if omitted).
 *                         Used as the localStorage key suffix and for getPanel().
 *   Side:                 'top' | 'right' | 'bottom' | 'left'.
 *   Mode:                 'fixed' (no chrome), 'collapsible' (collapse tab),
 *                         'resizable' (collapse tab + drag handle).
 *   Position:             'pinned' (default; takes layout space) or 'overlay'
 *                         (absolutely positioned over the center / siblings).
 *   Scope:                'shell' (default) | 'center'.
 *                         When 'shell', the panel mounts in one of the
 *                         outer rows / side stacks (Side decides which).
 *                         When 'center', the panel mounts INSIDE the
 *                         center column instead — useful for bars that
 *                         should align with the content area only, not
 *                         span across the sidebars.  Only Side='top' and
 *                         Side='bottom' are supported with Scope='center'.
 *                         The center auto-switches to a flex-column
 *                         layout so the content destination + inner
 *                         panels stack vertically.
 *   Size:                 initial px (height for top/bottom, width for left/right).
 *                         Default: 200 for sides, 60 for top/bottom.
 *   MinSize, MaxSize:     drag clamp for resizable panels.
 *   Collapsed:            initial state. Persisted state overrides this.
 *   CollapsedSize:        px the panel becomes when collapsed (default 24).
 *   Title:                shown in the collapse tab.
 *   Icon:                 optional inline SVG / HTML for the collapse tab.
 *   ContentDestinationId: id given to the inner content div so the host can
 *                         reach it via #ContentDestinationId selectors.
 *   ContentView:          ViewIdentifier (string) of a registered Pict view
 *                         that owns this panel's content. When set, the
 *                         shell auto-renders the view once at panel creation
 *                         (so the destination is filled before the user
 *                         opens the panel) AND again on every expand
 *                         transition (so freshly-streamed state shows up).
 *                         Centralises the "I created a panel — now I have
 *                         to remember to render the view into it" boilerplate.
 *   Persist:              default true; pass false to skip save/load for this
 *                         panel even when the shell has persistence enabled.
 *   Hidden:               default false. When true, the collapsed state has
 *                         NO visible chrome — no collapse tab, no edge
 *                         affordance, the panel root is display: none. The
 *                         only way to reveal it is a programmatic
 *                         expand()/toggle() from elsewhere (e.g. a topbar
 *                         gear). Mode still controls the EXPANDED chrome —
 *                         pass Mode: 'resizable' to keep the drag handle
 *                         while open, then vanish on collapse.
 *   OnExpand, OnCollapse: callbacks that fire ONLY on transitions
 *                         (collapsed→expanded or expanded→collapsed).
 *                         Cleaner than OnToggle which fires for both
 *                         directions and forces callers to inspect the
 *                         bool. OnToggle is kept for back-compat.
 *
 * # Persistence
 *
 *   Storage key:  'pict-modal-shell:' + <PersistenceKey or hostname or 'default'>
 *   Value shape:  { Version: 1, Panels: { <hash>: { Collapsed: bool, Size: number } } }
 */const STORAGE_PREFIX='pict-modal-shell:';const SCHEMA_VERSION=1;const DEFAULT_COLLAPSED_SIZE=24;const DEFAULT_SIZE_SIDE=240;const DEFAULT_SIZE_TOPBOTTOM=60;class PictModalShell{constructor(pModalSection,pViewportEl,pOptions){this._modal=pModalSection;this._viewport=pViewportEl;this._options=pOptions||{};this._panels=[];this._panelsByHash={};this._centerDestinationEl=null;this._idCounter=0;this._activeDrag=null;this._persistenceEnabled=this._options.Persistence!==false;this._persistenceKey=this._persistenceEnabled?this._resolvePersistenceKey(this._options.PersistenceKey):null;// Build the wrapper DOM inside the viewport.
this._buildSkeleton();}// ────────────────────────────────────────────────────────────────
//  Public API
// ────────────────────────────────────────────────────────────────
addPanel(pConfig){let tmpPanel=new ShellPanel(this,pConfig||{});this._panels.push(tmpPanel);this._panelsByHash[tmpPanel.Hash]=tmpPanel;this._mountPanel(tmpPanel);// Render the bound ContentView once now so the destination has
// content even before the user opens the panel. This is the
// "create" half of the unified create-and-popup pattern — hosts
// no longer need to chase down each panel and call view.render()
// manually after addPanel().
tmpPanel._renderContentView();return tmpPanel;}getPanel(pHash){return this._panelsByHash[pHash]||null;}getPanels(){return this._panels.slice();}/**
	 * Convenience for cross-view popup triggers. Equivalent to
	 * `shell.getPanel(hash).popup()`. Silently no-ops when the hash
	 * doesn't match a registered panel (so callers don't have to
	 * null-check during boot races).
	 */openPanel(pHash){let tmpPanel=this._panelsByHash[pHash];if(tmpPanel){tmpPanel.popup();}return tmpPanel||null;}/**
	 * Configure the center area. Optional; if never called, the center
	 * still exists but has no host-supplied destination id (host can
	 * still reach it via .pict-modal-shell-center).
	 */center(pOptions){pOptions=pOptions||{};if(pOptions.ContentDestinationId){// Remove any previously-created destination so center() is
// idempotent across reconfigurations.  We don't blow away
// the whole center via innerHTML='' anymore: Scope:'center'
// panels mounted by earlier addPanel() calls need to stay
// in place.  Find the right insertion point so the
// destination sits between any top-scoped panels and any
// bottom-scoped panels.
if(this._centerDestinationEl&&this._centerDestinationEl.parentNode===this._centerEl){this._centerEl.removeChild(this._centerDestinationEl);}let tmpInner=document.createElement('div');tmpInner.id=pOptions.ContentDestinationId;tmpInner.className='pict-modal-shell-center-content';let tmpFirstBottomScoped=null;let tmpChildren=this._centerEl.children;for(let i=0;i<tmpChildren.length;i++){let tmpCandidate=tmpChildren[i];if(tmpCandidate.classList&&tmpCandidate.classList.contains('pict-modal-shell-panel-bottom')){tmpFirstBottomScoped=tmpCandidate;break;}}if(tmpFirstBottomScoped){this._centerEl.insertBefore(tmpInner,tmpFirstBottomScoped);}else{this._centerEl.appendChild(tmpInner);}this._centerDestinationEl=tmpInner;}return this._centerEl;}getCenterEl(){return this._centerEl;}destroy(){for(let i=0;i<this._panels.length;i++){this._panels[i].destroy(true);}this._panels=[];this._panelsByHash={};if(this._wrapperEl&&this._wrapperEl.parentNode){this._wrapperEl.parentNode.removeChild(this._wrapperEl);}this._detachDragHandlers();}// ────────────────────────────────────────────────────────────────
//  Persistence
// ────────────────────────────────────────────────────────────────
_resolvePersistenceKey(pUserKey){if(typeof pUserKey==='string'&&pUserKey.length>0)return STORAGE_PREFIX+pUserKey;try{if(typeof window!=='undefined'&&window.location&&window.location.hostname){return STORAGE_PREFIX+window.location.hostname;}}catch(pErr){/* fall through */}return STORAGE_PREFIX+'default';}_loadState(){if(!this._persistenceKey)return null;try{let tmpStore=typeof window!=='undefined'?window.localStorage:null;if(!tmpStore)return null;let tmpRaw=tmpStore.getItem(this._persistenceKey);if(!tmpRaw)return null;let tmpParsed=JSON.parse(tmpRaw);if(!tmpParsed||tmpParsed.Version!==SCHEMA_VERSION)return null;return tmpParsed.Panels&&typeof tmpParsed.Panels==='object'?tmpParsed.Panels:{};}catch(pErr){return null;}}_loadPanelState(pHash){let tmpAll=this._loadState();if(!tmpAll)return null;return tmpAll[pHash]||null;}_savePanelState(pHash,pState){if(!this._persistenceKey)return;try{let tmpStore=typeof window!=='undefined'?window.localStorage:null;if(!tmpStore)return;let tmpAll=this._loadState()||{};tmpAll[pHash]=pState;tmpStore.setItem(this._persistenceKey,JSON.stringify({Version:SCHEMA_VERSION,Panels:tmpAll,SavedAt:new Date().toISOString()}));}catch(pErr){/* swallow */}}// ────────────────────────────────────────────────────────────────
//  DOM scaffolding
// ────────────────────────────────────────────────────────────────
_buildSkeleton(){// Wipe whatever was inside the viewport — the host opted into
// the shell taking ownership of layout.
this._viewport.innerHTML='';this._viewport.classList.add('pict-modal-shell-host');this._wrapperEl=document.createElement('div');this._wrapperEl.className='pict-modal-shell';this._topRow=document.createElement('div');this._topRow.className='pict-modal-shell-row pict-modal-shell-row-top';this._wrapperEl.appendChild(this._topRow);this._middleRow=document.createElement('div');this._middleRow.className='pict-modal-shell-row pict-modal-shell-row-middle';this._wrapperEl.appendChild(this._middleRow);this._leftStack=document.createElement('div');this._leftStack.className='pict-modal-shell-side pict-modal-shell-side-left';this._middleRow.appendChild(this._leftStack);this._centerEl=document.createElement('div');this._centerEl.className='pict-modal-shell-center';this._middleRow.appendChild(this._centerEl);this._rightStack=document.createElement('div');this._rightStack.className='pict-modal-shell-side pict-modal-shell-side-right';this._middleRow.appendChild(this._rightStack);this._bottomRow=document.createElement('div');this._bottomRow.className='pict-modal-shell-row pict-modal-shell-row-bottom';this._wrapperEl.appendChild(this._bottomRow);// Overlay layer for overlay-position panels (absolute over middle row)
this._overlayLayer=document.createElement('div');this._overlayLayer.className='pict-modal-shell-overlay-layer';this._middleRow.appendChild(this._overlayLayer);this._viewport.appendChild(this._wrapperEl);}_mountPanel(pPanel){if(pPanel.Position==='overlay'){this._overlayLayer.appendChild(pPanel.El);return;}if(pPanel.Scope==='center'){// Center-scoped panels mount inside the center column.
// The column switches to flex-column so the content
// destination + the panel(s) stack vertically.
this._centerEl.classList.add('pict-modal-shell-center-with-inner-panel');if(pPanel.Side==='top'){// Top-scoped panels go above the content destination.
// If center() hasn't run yet, this still works — we
// insert before whatever's first (or just append to an
// empty center, which leaves us above any subsequent
// content destination).
this._centerEl.insertBefore(pPanel.El,this._centerEl.firstChild);}else{// Side === 'bottom' (the Scope guard already filtered
// left/right).  Append to the bottom of the center.
this._centerEl.appendChild(pPanel.El);}return;}let tmpHost;if(pPanel.Side==='top')tmpHost=this._topRow;else if(pPanel.Side==='bottom')tmpHost=this._bottomRow;else if(pPanel.Side==='left')tmpHost=this._leftStack;else if(pPanel.Side==='right')tmpHost=this._rightStack;else tmpHost=this._wrapperEl;tmpHost.appendChild(pPanel.El);}// ────────────────────────────────────────────────────────────────
//  Drag (resize) machinery — shared across all resizable panels.
// ────────────────────────────────────────────────────────────────
_attachDragStart(pPanel,pEvent){pEvent.preventDefault();let tmpAxis=pPanel.Side==='top'||pPanel.Side==='bottom'?'y':'x';this._activeDrag={Panel:pPanel,Axis:tmpAxis,StartCoord:tmpAxis==='x'?pEvent.clientX:pEvent.clientY,StartSize:pPanel.Size,Direction:pPanel.Side==='left'||pPanel.Side==='top'?1:-1,PendingSize:null,RAFId:0};document.body.classList.add(tmpAxis==='x'?'pict-modal-shell-dragging-x':'pict-modal-shell-dragging-y');// Suppress the panel's collapse/expand width/height transition for
// the duration of the drag — without this, every pointermove kicks
// off a fresh 140ms transition that stacks up and renders the
// resize as visibly laggy ("choppy"). With the transition off the
// panel snaps to each new size in the same frame as the pointer.
pPanel.El.classList.add('pict-modal-shell-panel-resizing');// Capture the pointer so dragging works even when the cursor leaves
// the resize handle (otherwise the user has to keep the cursor
// exactly on the 6 px strip — feels twitchy).
try{pEvent.target.setPointerCapture&&pEvent.target.setPointerCapture(pEvent.pointerId);}catch(pErr){/* not supported in old browsers — fine */}document.addEventListener('pointermove',this._onDragMove);document.addEventListener('pointerup',this._onDragEnd);}// Pointer events fire at the device's input rate (often 240 Hz+ on
// modern trackpads / mice) but we only paint at the display's refresh
// rate (60–120 Hz). Coalesce multiple pointermoves per frame into a
// single setSize() call via requestAnimationFrame — this drops the
// per-frame work to one DOM mutation regardless of pointer rate.
_onDragMove=pEvent=>{if(!this._activeDrag)return;let tmpD=this._activeDrag;let tmpCoord=tmpD.Axis==='x'?pEvent.clientX:pEvent.clientY;let tmpDelta=(tmpCoord-tmpD.StartCoord)*tmpD.Direction;tmpD.PendingSize=tmpD.StartSize+tmpDelta;if(!tmpD.RAFId){let tmpSelf=this;tmpD.RAFId=typeof window!=='undefined'&&window.requestAnimationFrame?window.requestAnimationFrame(function(){tmpSelf._flushDrag();}):setTimeout(function(){tmpSelf._flushDrag();},16);}};_flushDrag(){let tmpD=this._activeDrag;if(!tmpD)return;tmpD.RAFId=0;if(tmpD.PendingSize!==null){tmpD.Panel.setSize(tmpD.PendingSize);tmpD.PendingSize=null;}}_onDragEnd=()=>{if(!this._activeDrag)return;let tmpD=this._activeDrag;// Flush any pending pointermove that hadn't painted yet so the
// final size matches the actual cursor position, not the last
// rAF-aligned value.
if(tmpD.PendingSize!==null){this._flushDrag();}if(tmpD.RAFId&&typeof window!=='undefined'&&window.cancelAnimationFrame){window.cancelAnimationFrame(tmpD.RAFId);}document.body.classList.remove('pict-modal-shell-dragging-x');document.body.classList.remove('pict-modal-shell-dragging-y');tmpD.Panel.El.classList.remove('pict-modal-shell-panel-resizing');document.removeEventListener('pointermove',this._onDragMove);document.removeEventListener('pointerup',this._onDragEnd);// Persist final size.
tmpD.Panel._persist();this._activeDrag=null;};_detachDragHandlers(){document.removeEventListener('pointermove',this._onDragMove);document.removeEventListener('pointerup',this._onDragEnd);}}// ════════════════════════════════════════════════════════════════════
//  ShellPanel — one panel within a Shell
// ════════════════════════════════════════════════════════════════════
class ShellPanel{constructor(pShell,pConfig){this._shell=pShell;this._config=pConfig;this.Hash=pConfig.Hash||'panel-'+ ++pShell._idCounter;this.Side=pConfig.Side==='right'||pConfig.Side==='bottom'||pConfig.Side==='left'?pConfig.Side:'top';this.Mode=pConfig.Mode==='collapsible'||pConfig.Mode==='resizable'?pConfig.Mode:'fixed';this.Position=pConfig.Position==='overlay'?'overlay':'pinned';// Scope: 'center' opts the panel into the center column instead
// of the shell's outer rows.  Only valid for Side='top'/'bottom'
// (left/right inside center would need a separate axis we don't
// support).  Invalid combinations silently fall back to 'shell'.
this.Scope=pConfig.Scope==='center'&&(this.Side==='top'||this.Side==='bottom')?'center':'shell';this.Title=pConfig.Title||'';this.Icon=pConfig.Icon||'';this.MinSize=typeof pConfig.MinSize==='number'?pConfig.MinSize:40;this.MaxSize=typeof pConfig.MaxSize==='number'?pConfig.MaxSize:1200;// `Hidden: true` is a panel that has NO visible chrome in its collapsed
// state — no collapse tab sliver, no resize handle, no edge marker, and
// (via CSS) display: none on the panel root. The only way to reveal it
// is a programmatic expand()/toggle() called from elsewhere in the app
// (e.g. a gear button in the topbar). Useful when the host wants a
// fully-shaped panel but doesn't want an always-visible affordance for
// discovering it. The Mode is still honoured for the EXPANDED state —
// pass Mode: 'resizable' to keep the drag handle while the panel is
// open, while still vanishing entirely when collapsed.
this.Hidden=!!pConfig.Hidden;this.CollapsedSize=typeof pConfig.CollapsedSize==='number'?pConfig.CollapsedSize:this.Hidden?0:DEFAULT_COLLAPSED_SIZE;this.PersistEnabled=pShell._persistenceEnabled&&pConfig.Persist!==false;let tmpDefaultSize=this.Side==='left'||this.Side==='right'?DEFAULT_SIZE_SIDE:DEFAULT_SIZE_TOPBOTTOM;this.Size=typeof pConfig.Size==='number'?pConfig.Size:tmpDefaultSize;this.Collapsed=!!pConfig.Collapsed;// Persisted state overrides initial Size/Collapsed.
if(this.PersistEnabled){let tmpSaved=pShell._loadPanelState(this.Hash);if(tmpSaved){if(typeof tmpSaved.Size==='number')this.Size=tmpSaved.Size;if(typeof tmpSaved.Collapsed==='boolean')this.Collapsed=tmpSaved.Collapsed;}}this._clampSize();// Build the panel DOM.
this._buildEl(pConfig);this._applySize();this._applyCollapsedClass();// Responsive drawer — at narrow viewports, flip a docked side
// panel into a "top drawer" by adding a class to the middle row
// that toggles flex-direction from row to column. The panel
// stretches to full width and trades its inline `width` for a
// configurable drawer `height`. The user's collapse/expand
// keeps working: collapsed in drawer mode just gives the panel
// height: 0 (so only the collapse tab remains visible at the
// top of the content), expanded restores the drawer height.
// Pass `0` or omit to disable. Mirrors retold-remote's
// `.content-editor-body { flex-direction: column }` pattern.
this.ResponsiveDrawer=typeof pConfig.ResponsiveDrawer==='number'&&pConfig.ResponsiveDrawer>0?pConfig.ResponsiveDrawer:0;// Drawer height — applied as `height` to the panel in drawer
// mode. CSS units (px / vh / %) accepted. Default 33vh which
// gives the panel roughly a third of the viewport height and
// leaves comfortable room for the workspace below.
this.DrawerHeight=typeof pConfig.DrawerHeight==='string'&&pConfig.DrawerHeight?pConfig.DrawerHeight:'33vh';this._mediaQuery=null;this._mediaQueryHandler=null;if(this.ResponsiveDrawer>0){this._wireResponsiveDrawer();}}// ───────────── public ─────────────
getContentEl(){return this._contentEl;}/**
	 * Returns the currently-bound ContentView Pict view instance, or
	 * null if no ContentView is configured / the view isn't registered
	 * yet.
	 */getContentView(){if(!this._config.ContentView)return null;let tmpPict=this._shell._modal&&this._shell._modal.pict;if(!tmpPict||!tmpPict.views)return null;return tmpPict.views[this._config.ContentView]||null;}collapse(){this._setCollapsed(true);}expand(){this._setCollapsed(false);}toggle(){this._setCollapsed(!this.Collapsed);}/**
	 * Unified "show this panel" affordance — this is the shared
	 * codepath every popup trigger should funnel through. Behavior:
	 *
	 *   - If collapsed → expand (which fires OnExpand + re-renders the
	 *     ContentView via the shared transition machinery).
	 *   - If already open → re-render the ContentView (so any newly-
	 *     streamed state is visible) AND briefly flash the panel
	 *     border so the user notices that the existing panel just
	 *     received attention. Avoids the "I clicked a button but
	 *     nothing happened" feeling when the panel was already open.
	 *
	 * Idempotent — safe to call from any number of triggers without
	 * stacking effects.
	 */popup(){if(this.Collapsed){this._setCollapsed(false);}else{// Already open — refresh content + flash for attention.
this._renderContentView();this._flash();}}setSize(pSize){if(typeof pSize!=='number'||!isFinite(pSize))return;this.Size=pSize;this._clampSize();this._applySize();}destroy(pSkipFromShell){this._unwireResponsiveDrawer();if(this.El&&this.El.parentNode)this.El.parentNode.removeChild(this.El);if(!pSkipFromShell){let tmpIdx=this._shell._panels.indexOf(this);if(tmpIdx>=0)this._shell._panels.splice(tmpIdx,1);delete this._shell._panelsByHash[this.Hash];}}// ───────────── internals ─────────────
_clampSize(){if(this.Size<this.MinSize)this.Size=this.MinSize;if(this.Size>this.MaxSize)this.Size=this.MaxSize;}// Responsive drawer — sets up a matchMedia listener for
// `(max-width: <ResponsiveDrawer>px)`. Each crossing flips the
// shell's middle row between row layout (wide) and column layout
// (narrow) by toggling the `pict-modal-shell-drawer-active` class
// on the middle row. The matching CSS makes side panels expand to
// full width with a fixed `DrawerHeight`, becoming top/bottom
// drawers above/below the workspace center. Collapsed in drawer
// mode collapses to height: 0, leaving only the collapse tab.
//
// This pattern is the conventional "responsive sidebar" approach
// (used by retold-remote's content editor) — the user keeps their
// sidebar accessible at narrow widths but it gives the workspace
// room to breathe.
_wireResponsiveDrawer(){if(typeof window==='undefined'||!window.matchMedia)return;this._mediaQuery=window.matchMedia('(max-width: '+this.ResponsiveDrawer+'px)');// Apply the drawer height as a CSS variable on the panel
// element so the static CSS rules can read it. Doing this once
// here avoids per-event JS style writes.
if(this.El){this.El.style.setProperty('--pict-modal-drawer-height',this.DrawerHeight);}let tmpSelf=this;this._mediaQueryHandler=function(pEvent){let tmpNarrow=pEvent&&typeof pEvent.matches==='boolean'?pEvent.matches:tmpSelf._mediaQuery.matches;tmpSelf._setDrawerMode(tmpNarrow);};// Apply the current state immediately (handles the case where the
// page loads already-narrow). Newer browsers use addEventListener;
// older ones use addListener.
if(this._mediaQuery.addEventListener){this._mediaQuery.addEventListener('change',this._mediaQueryHandler);}else if(this._mediaQuery.addListener){this._mediaQuery.addListener(this._mediaQueryHandler);}this._mediaQueryHandler({matches:this._mediaQuery.matches});// Belt + suspenders: also listen to window resize and re-sync.
// `matchMedia.change` is supposed to be reliable on every
// boundary crossing, but in real-world testing (esp. when the
// user is dragging DevTools to resize the inner viewport, or
// going through fast successive crossings) we've seen the
// change event silently miss. A plain resize listener is
// cheap and the handler is idempotent — if matches state
// hasn't actually changed the body of `_setDrawerMode` is a
// no-op (it short-circuits when classes are already correct).
this._resizeHandler=function(){tmpSelf._setDrawerMode(tmpSelf._mediaQuery.matches);};window.addEventListener('resize',this._resizeHandler);}_unwireResponsiveDrawer(){if(this._resizeHandler&&typeof window!=='undefined'){window.removeEventListener('resize',this._resizeHandler);this._resizeHandler=null;}if(!this._mediaQuery||!this._mediaQueryHandler)return;if(this._mediaQuery.removeEventListener){this._mediaQuery.removeEventListener('change',this._mediaQueryHandler);}else if(this._mediaQuery.removeListener){this._mediaQuery.removeListener(this._mediaQueryHandler);}this._mediaQuery=null;this._mediaQueryHandler=null;}// Toggle drawer mode by adding / removing a class on the shell's
// middle row. The CSS rule for `.pict-modal-shell-drawer-active`
// flips flex-direction column, makes side panels full-width, and
// applies the panel's `--pict-modal-drawer-height` for sizing.
// Also tags the panel itself so per-panel CSS can target it.
// Re-applies the inline size at the end so the wide-mode crossing
// gets a clean width back (drawer mode forced width: 100% via CSS
// !important; the inline style was stale).
_setDrawerMode(pDrawer){if(!this._shell||!this._shell._middleRow)return;// Idempotent — short-circuit when the panel's drawer state
// already matches the target. Keeps the resize-event fallback
// (which fires constantly during drag-resize) from doing
// pointless DOM thrash + style re-application every frame.
let tmpCurrentlyDrawer=!!(this.El&&this.El.classList.contains('pict-modal-shell-panel-drawer'));if(tmpCurrentlyDrawer===!!pDrawer)return;if(pDrawer){this._shell._middleRow.classList.add('pict-modal-shell-drawer-active');if(this.El){this.El.classList.add('pict-modal-shell-panel-drawer');}}else{// Only remove the row-level class if NO other panel still
// wants drawer mode. Multi-panel hosts can safely each opt
// in independently this way.
let tmpStillNarrow=false;let tmpPanels=this._shell._panels||[];for(let i=0;i<tmpPanels.length;i++){let tmpP=tmpPanels[i];if(tmpP!==this&&tmpP._mediaQuery&&tmpP._mediaQuery.matches&&tmpP.ResponsiveDrawer>0){tmpStillNarrow=true;break;}}if(!tmpStillNarrow){this._shell._middleRow.classList.remove('pict-modal-shell-drawer-active');}if(this.El){this.El.classList.remove('pict-modal-shell-panel-drawer');}}// Re-apply inline size. In drawer mode the CSS !important
// rule overrides this anyway, but on the wide crossing we
// need the inline width to be correct so the panel shows up
// at its proper docked / collapsed-docked size rather than
// inheriting any stale state.
this._applySize();}_buildEl(pConfig){let tmpRoot=document.createElement('div');tmpRoot.className='pict-modal-shell-panel pict-modal-shell-panel-'+this.Side+' pict-modal-shell-panel-mode-'+this.Mode+(this.Position==='overlay'?' pict-modal-shell-panel-overlay':'')+(this.Hidden?' pict-modal-shell-panel-hidden':'');tmpRoot.setAttribute('data-shell-panel-hash',this.Hash);tmpRoot.setAttribute('data-shell-panel-side',this.Side);tmpRoot.setAttribute('data-shell-panel-mode',this.Mode);// Content area — hosts render their stuff into the inner #id div.
let tmpContentWrap=document.createElement('div');tmpContentWrap.className='pict-modal-shell-panel-content';this._contentEl=document.createElement('div');if(pConfig.ContentDestinationId){this._contentEl.id=pConfig.ContentDestinationId;}this._contentEl.className='pict-modal-shell-panel-content-inner';tmpContentWrap.appendChild(this._contentEl);tmpRoot.appendChild(tmpContentWrap);// Collapse tab — shown when collapsible / resizable. Lives at the
// inner edge so it's always reachable when the panel is collapsed.
// Hidden panels skip the tab entirely — the only path back from
// collapsed → expanded is a programmatic expand() / toggle() call
// from the host (e.g. a topbar gear button).
if((this.Mode==='collapsible'||this.Mode==='resizable')&&!this.Hidden){this._collapseTab=document.createElement('button');this._collapseTab.type='button';this._collapseTab.className='pict-modal-shell-panel-collapse-tab';this._collapseTab.setAttribute('aria-label',this.Title?'Toggle '+this.Title:'Toggle panel');this._collapseTab.title=this.Title||'Toggle';this._collapseTab.innerHTML=''+(this.Icon?'<span class="pict-modal-shell-panel-collapse-tab-icon">'+this.Icon+'</span>':'')+(this.Title?'<span class="pict-modal-shell-panel-collapse-tab-title">'+this._escape(this.Title)+'</span>':'');let tmpSelf=this;this._collapseTab.addEventListener('click',function(){tmpSelf.toggle();});tmpRoot.appendChild(this._collapseTab);}// Resize handle — only when resizable. Positioned via CSS based
// on side.
if(this.Mode==='resizable'){this._resizeHandle=document.createElement('div');this._resizeHandle.className='pict-modal-shell-panel-resize-handle';this._resizeHandle.setAttribute('aria-hidden','true');let tmpSelf=this;this._resizeHandle.addEventListener('pointerdown',function(pEvent){if(tmpSelf.Collapsed)return;tmpSelf._shell._attachDragStart(tmpSelf,pEvent);});tmpRoot.appendChild(this._resizeHandle);}this.El=tmpRoot;}_applySize(){let tmpEffective=this.Collapsed?this.CollapsedSize:this.Size;if(this.Side==='left'||this.Side==='right'){this.El.style.width=tmpEffective+'px';this.El.style.height='';}else{this.El.style.height=tmpEffective+'px';this.El.style.width='';}}_applyCollapsedClass(){if(this.Collapsed)this.El.classList.add('pict-modal-shell-panel-collapsed');else this.El.classList.remove('pict-modal-shell-panel-collapsed');}_setCollapsed(pBool){if(this.Collapsed===!!pBool)return;let tmpWasCollapsed=this.Collapsed;this.Collapsed=!!pBool;this._applyCollapsedClass();this._applySize();this._persist();// Transition-specific hooks fire BEFORE OnToggle so OnExpand
// callers can mutate state (e.g. set focus, re-fetch data) and
// have it reflected by any OnToggle observer that runs after.
if(tmpWasCollapsed&&!this.Collapsed){// collapsed → expanded. Render the bound ContentView so
// freshly-streamed state shows up the moment the panel
// becomes visible (replaces the manual view.render() dance
// hosts used to do in their own runAction-style helpers).
this._renderContentView();this._fireHook('OnExpand');}else if(!tmpWasCollapsed&&this.Collapsed){this._fireHook('OnCollapse');}// Back-compat: OnToggle still fires for both directions.
this._fireHook('OnToggle',this.Collapsed);}_fireHook(pName,pArg){let tmpFn=this._config[pName];if(typeof tmpFn!=='function')return;try{if(typeof pArg!=='undefined'){tmpFn(pArg,this);}else{tmpFn(this);}}catch(pErr){/* host hook failure must not break the panel */}}/**
	 * Render the bound ContentView (if any) into this panel's
	 * destination. Called by the shell on panel creation + on every
	 * collapsed→expanded transition + by popup() when re-flashing an
	 * already-open panel. Silently no-ops when no ContentView is
	 * configured or the view isn't registered yet (boot races).
	 */_renderContentView(){let tmpView=this.getContentView();if(tmpView&&typeof tmpView.render==='function'){try{tmpView.render();}catch(pErr){/* view render failure shouldn't break the panel chrome */}}}/**
	 * Briefly highlight the panel — used by popup() when called on an
	 * already-open panel so the user sees that their click landed.
	 * The class is removed after the CSS animation completes; safe to
	 * re-trigger (timeouts overlap, last one wins on the trailing edge).
	 */_flash(){if(!this.El)return;this.El.classList.add('pict-modal-shell-panel-flash');let tmpSelf=this;clearTimeout(this._flashTimer);this._flashTimer=setTimeout(function(){if(tmpSelf.El)tmpSelf.El.classList.remove('pict-modal-shell-panel-flash');},700);}_persist(){if(!this.PersistEnabled)return;this._shell._savePanelState(this.Hash,{Collapsed:this.Collapsed,Size:this.Size});}_escape(pStr){return String(pStr||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}}// ════════════════════════════════════════════════════════════════════
//  Module exports — used internally by Pict-Section-Modal.shell()
// ════════════════════════════════════════════════════════════════════
class PictModalShellManager{constructor(pModalSection){this._modal=pModalSection;this._shellsByViewport=new WeakMap();}/**
	 * Idempotent — calling shell() twice with the same viewport returns
	 * the same instance.
	 */shell(pViewportSelectorOrEl,pOptions){let tmpEl=typeof pViewportSelectorOrEl==='string'?document.querySelector(pViewportSelectorOrEl):pViewportSelectorOrEl;if(!tmpEl){throw new Error('Pict-Modal-Shell.shell: viewport not found for '+pViewportSelectorOrEl);}let tmpExisting=this._shellsByViewport.get(tmpEl);if(tmpExisting)return tmpExisting;let tmpShell=new PictModalShell(this._modal,tmpEl,pOptions);this._shellsByViewport.set(tmpEl,tmpShell);return tmpShell;}}module.exports=PictModalShellManager;module.exports.PictModalShell=PictModalShell;module.exports.ShellPanel=ShellPanel;module.exports.STORAGE_PREFIX=STORAGE_PREFIX;module.exports.SCHEMA_VERSION=SCHEMA_VERSION;},{}],23:[function(require,module,exports){/**
 * Pict-Modal-Toast
 *
 * Manages toast notification elements with auto-dismiss and stacking.
 */class PictModalToast{constructor(pModal){this._modal=pModal;this._containers={};}/**
	 * Show a toast notification.
	 *
	 * @param {string} pMessage - Toast message text
	 * @param {object} [pOptions] - Options (type, duration, position, dismissible, allowHTML)
	 * @param {boolean} [pOptions.allowHTML=false] - When true, render pMessage as raw HTML instead of escaping it. Only pass trusted markup.
	 * @returns {{ dismiss: function }} Handle with dismiss method
	 */toast(pMessage,pOptions){let tmpOptions=Object.assign({},this._modal.options.DefaultToastOptions,pOptions);let tmpContainer=this._getContainer(tmpOptions.position);let tmpId=this._modal._nextId();let tmpToast=document.createElement('div');tmpToast.className='pict-modal-toast pict-modal-toast--'+tmpOptions.type;tmpToast.id='pict-modal-toast-'+tmpId;// Escape by default; render raw markup only when the caller opts in with allowHTML (trusted content).
let tmpMessageMarkup=tmpOptions.allowHTML===true?pMessage:this._escapeHTML(pMessage);let tmpContent='<span class="pict-modal-toast-message">'+tmpMessageMarkup+'</span>';if(tmpOptions.dismissible){tmpContent+='<button class="pict-modal-toast-dismiss" aria-label="Dismiss">&times;</button>';}tmpToast.innerHTML=tmpContent;// Create handle
let tmpDismissed=false;let tmpTimeoutHandle=null;let tmpDismiss=()=>{if(tmpDismissed){return;}tmpDismissed=true;if(tmpTimeoutHandle){clearTimeout(tmpTimeoutHandle);}// Exit animation
tmpToast.classList.remove('pict-modal-visible');tmpToast.classList.add('pict-modal-toast-exit');// Remove from active list
this._modal._activeToasts=this._modal._activeToasts.filter(pEntry=>{return pEntry.element!==tmpToast;});// Remove from DOM after transition
setTimeout(()=>{if(tmpToast.parentNode){tmpToast.parentNode.removeChild(tmpToast);}this._cleanupContainer(tmpOptions.position);},220);};let tmpHandle={dismiss:tmpDismiss};// Wire dismiss button
if(tmpOptions.dismissible){let tmpDismissBtn=tmpToast.querySelector('.pict-modal-toast-dismiss');if(tmpDismissBtn){tmpDismissBtn.addEventListener('click',tmpDismiss);}}// Append to container
tmpContainer.appendChild(tmpToast);// Track
let tmpEntry={element:tmpToast,dismiss:tmpDismiss,handle:tmpHandle};this._modal._activeToasts.push(tmpEntry);// Animate in
void tmpToast.offsetHeight;tmpToast.classList.add('pict-modal-visible');// Auto-dismiss
if(tmpOptions.duration>0){tmpTimeoutHandle=setTimeout(tmpDismiss,tmpOptions.duration);}return tmpHandle;}/**
	 * Get or create a toast container for the given position.
	 *
	 * @param {string} pPosition - Position key (e.g. 'top-right')
	 * @returns {HTMLElement}
	 */_getContainer(pPosition){if(this._containers[pPosition]){return this._containers[pPosition];}let tmpContainer=document.createElement('div');tmpContainer.className='pict-modal-toast-container pict-modal-toast-container--'+pPosition;document.body.appendChild(tmpContainer);this._containers[pPosition]=tmpContainer;return tmpContainer;}/**
	 * Remove a container if it has no more toasts.
	 *
	 * @param {string} pPosition
	 */_cleanupContainer(pPosition){let tmpContainer=this._containers[pPosition];if(tmpContainer&&tmpContainer.children.length===0){if(tmpContainer.parentNode){tmpContainer.parentNode.removeChild(tmpContainer);}delete this._containers[pPosition];}}/**
	 * Dismiss all active toasts.
	 */dismissAll(){let tmpToasts=this._modal._activeToasts.slice();for(let i=0;i<tmpToasts.length;i++){tmpToasts[i].dismiss();}}/**
	 * Destroy all containers.
	 */destroy(){this.dismissAll();let tmpPositions=Object.keys(this._containers);for(let i=0;i<tmpPositions.length;i++){let tmpContainer=this._containers[tmpPositions[i]];if(tmpContainer&&tmpContainer.parentNode){tmpContainer.parentNode.removeChild(tmpContainer);}}this._containers={};}/**
	 * Escape HTML special characters.
	 *
	 * @param {string} pText
	 * @returns {string}
	 */_escapeHTML(pText){if(typeof pText!=='string'){return'';}return pText.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}}module.exports=PictModalToast;},{}],24:[function(require,module,exports){/**
 * Pict-Modal-Tooltip
 *
 * Manages simple text and rich HTML tooltips with positioning and auto-flip.
 */class PictModalTooltip{constructor(pModal){this._modal=pModal;}/**
	 * Attach a simple text tooltip to an element.
	 *
	 * @param {HTMLElement} pElement - Target element
	 * @param {string} pText - Tooltip text
	 * @param {object} [pOptions] - Options (position, delay, maxWidth)
	 * @returns {{ destroy: function }} Handle to remove the tooltip
	 */tooltip(pElement,pText,pOptions){let tmpOptions=Object.assign({},this._modal.options.DefaultTooltipOptions,pOptions);return this._attachTooltip(pElement,pText,false,tmpOptions);}/**
	 * Attach a rich HTML tooltip to an element.
	 *
	 * @param {HTMLElement} pElement - Target element
	 * @param {string} pHTMLContent - HTML content for the tooltip
	 * @param {object} [pOptions] - Options (position, delay, maxWidth, interactive)
	 * @returns {{ destroy: function }} Handle to remove the tooltip
	 */richTooltip(pElement,pHTMLContent,pOptions){let tmpOptions=Object.assign({},this._modal.options.DefaultTooltipOptions,pOptions);return this._attachTooltip(pElement,pHTMLContent,true,tmpOptions);}/**
	 * Attach a pinnable rich HTML tooltip to an element.
	 *
	 * Behaves like richTooltip() on hover/focus, but a click on the element
	 * toggles a pinned state: while pinned the tooltip stays open (it does not
	 * hide on mouseleave/focusout) and follows its anchor on scroll/resize.
	 * This is opt-in sugar over richTooltip() with `{ pinnable: true }` — the
	 * default tooltip()/richTooltip() behavior is unchanged.
	 *
	 * @param {HTMLElement} pElement - Target element
	 * @param {string} pHTMLContent - HTML content for the tooltip
	 * @param {object} [pOptions] - Options (position, delay, maxWidth, interactive, startPinned, onPinChange)
	 * @returns {{ destroy: function, pin: function, unpin: function, isPinned: function }} Handle
	 */pinnableTooltip(pElement,pHTMLContent,pOptions){let tmpOptions=Object.assign({},this._modal.options.DefaultTooltipOptions,pOptions,{pinnable:true});return this._attachTooltip(pElement,pHTMLContent,true,tmpOptions);}/**
	 * Internal: attach tooltip event listeners to an element.
	 *
	 * @param {HTMLElement} pElement
	 * @param {string} pContent
	 * @param {boolean} pIsHTML
	 * @param {object} pOptions
	 * @returns {{ destroy: function }}
	 */_attachTooltip(pElement,pContent,pIsHTML,pOptions){let tmpTooltipElement=null;let tmpShowTimeout=null;let tmpHideTimeout=null;let tmpDestroyed=false;let tmpId=this._modal._nextId();// Pin state — only meaningful when pOptions.pinnable is set. A pinned
// tooltip stays visible (transient hide is suppressed) and follows its
// anchor on scroll/resize.
let tmpPinned=false;let tmpShow=()=>{if(tmpDestroyed||tmpTooltipElement){return;}tmpTooltipElement=document.createElement('div');tmpTooltipElement.className='pict-modal-tooltip pict-modal-tooltip--'+pOptions.position;tmpTooltipElement.id='pict-modal-tooltip-'+tmpId;tmpTooltipElement.setAttribute('role','tooltip');tmpTooltipElement.style.maxWidth=pOptions.maxWidth;if(pOptions.interactive){tmpTooltipElement.classList.add('pict-modal-tooltip-interactive');}// Optional consumer-supplied class(es) on the tooltip element, e.g.
// to theme the bubble + arrow by overriding the --pict-modal-tooltip-*
// custom properties for a specific tooltip.
if(pOptions.className){let tmpExtraClasses=String(pOptions.className).split(/\s+/);for(let i=0;i<tmpExtraClasses.length;i++){if(tmpExtraClasses[i]){tmpTooltipElement.classList.add(tmpExtraClasses[i]);}}}// Arrow
let tmpArrow=document.createElement('div');tmpArrow.className='pict-modal-tooltip-arrow';// Content
let tmpContentDiv=document.createElement('div');if(pIsHTML){tmpContentDiv.innerHTML=pContent;}else{tmpContentDiv.textContent=pContent;}tmpTooltipElement.appendChild(tmpArrow);tmpTooltipElement.appendChild(tmpContentDiv);document.body.appendChild(tmpTooltipElement);// Set aria-describedby on target
pElement.setAttribute('aria-describedby',tmpTooltipElement.id);// Position
this._positionTooltip(tmpTooltipElement,pElement,pOptions.position);// Animate in — but only paint when the anchor is actually rendered.
// A pinned / startPinned tooltip whose anchor lives in a hidden
// container (e.g. an inactive tab panel) would otherwise show at the
// clamped corner as an orphan. It is revealed later by tmpReposition
// once the anchor gains a layout box (see the ResizeObserver below).
void tmpTooltipElement.offsetHeight;if(this._isElementRendered(pElement)){tmpTooltipElement.classList.add('pict-modal-visible');}// Track
this._modal._activeTooltips.push({element:tmpTooltipElement,targetElement:pElement,destroy:tmpDestroy});// For interactive tooltips, allow hovering over the tooltip itself
if(pOptions.interactive&&tmpTooltipElement){tmpTooltipElement.addEventListener('mouseenter',()=>{if(tmpHideTimeout){clearTimeout(tmpHideTimeout);tmpHideTimeout=null;}});tmpTooltipElement.addEventListener('mouseleave',()=>{if(!tmpPinned){tmpHide();}});}// Reflect pinned state on a freshly-(re)created element.
if(tmpPinned&&tmpTooltipElement){tmpTooltipElement.classList.add('pict-modal-tooltip-pinned');}};let tmpHide=()=>{if(!tmpTooltipElement){return;}tmpTooltipElement.classList.remove('pict-modal-visible');let tmpEl=tmpTooltipElement;tmpTooltipElement=null;// Remove aria
pElement.removeAttribute('aria-describedby');// Remove from tracking
this._modal._activeTooltips=this._modal._activeTooltips.filter(pEntry=>{return pEntry.element!==tmpEl;});setTimeout(()=>{if(tmpEl.parentNode){tmpEl.parentNode.removeChild(tmpEl);}},220);};let tmpOnMouseEnter=()=>{if(tmpHideTimeout){clearTimeout(tmpHideTimeout);tmpHideTimeout=null;}tmpShowTimeout=setTimeout(tmpShow,pOptions.delay);};let tmpOnMouseLeave=()=>{if(tmpShowTimeout){clearTimeout(tmpShowTimeout);tmpShowTimeout=null;}// A pinned tooltip stays open regardless of pointer.
if(tmpPinned){return;}// Small delay before hiding to allow moving to interactive tooltip
if(pOptions.interactive){tmpHideTimeout=setTimeout(tmpHide,100);}else{tmpHide();}};let tmpOnFocusIn=()=>{tmpShowTimeout=setTimeout(tmpShow,pOptions.delay);};let tmpOnFocusOut=()=>{if(tmpShowTimeout){clearTimeout(tmpShowTimeout);tmpShowTimeout=null;}// A pinned tooltip stays open regardless of focus.
if(tmpPinned){return;}tmpHide();};// -- Pin lifecycle (opt-in via pOptions.pinnable) --
// Keep a pinned tooltip glued to its anchor as the page scrolls/resizes.
// The element is position:fixed and portaled to <body>, so it does not
// move with the document on its own. When the anchor scrolls out of the
// viewport we fade the tooltip out (without dropping the pin) and bring
// it back when the anchor returns.
let tmpResizeObserver=null;let tmpReposition=()=>{if(!tmpTooltipElement){return;}let tmpRect=pElement.getBoundingClientRect();// Rendered (has a layout box) AND within the viewport. A hidden anchor
// (display:none, or inside a hidden tab panel) has no box, so the
// tooltip is hidden rather than stranded at the clamped corner.
let tmpInView=this._isElementRendered(pElement)&&tmpRect.bottom>0&&tmpRect.top<window.innerHeight&&tmpRect.right>0&&tmpRect.left<window.innerWidth;if(tmpInView){this._positionTooltip(tmpTooltipElement,pElement,pOptions.position);tmpTooltipElement.classList.add('pict-modal-visible');}else{tmpTooltipElement.classList.remove('pict-modal-visible');}};let tmpAddRepositionListeners=()=>{// `true` (capture) so scrolls inside any nested container reposition too.
window.addEventListener('scroll',tmpReposition,true);window.addEventListener('resize',tmpReposition);// A ResizeObserver on the anchor catches it being shown/hidden (e.g. a
// tab panel toggling display) — transitions the window scroll/resize
// listeners miss — so a pinned tooltip appears the moment its anchor
// gains a layout box and hides again when it loses one.
if(typeof ResizeObserver!=='undefined'){tmpResizeObserver=new ResizeObserver(()=>tmpReposition());tmpResizeObserver.observe(pElement);}};let tmpRemoveRepositionListeners=()=>{window.removeEventListener('scroll',tmpReposition,true);window.removeEventListener('resize',tmpReposition);if(tmpResizeObserver){tmpResizeObserver.disconnect();tmpResizeObserver=null;}};let tmpPin=()=>{if(tmpPinned||tmpDestroyed){return;}tmpPinned=true;if(!tmpTooltipElement){tmpShow();}if(tmpTooltipElement){tmpTooltipElement.classList.add('pict-modal-tooltip-pinned');}tmpAddRepositionListeners();if(typeof pOptions.onPinChange==='function'){pOptions.onPinChange(true,pElement);}};let tmpUnpin=()=>{if(!tmpPinned){return;}tmpPinned=false;tmpRemoveRepositionListeners();if(tmpTooltipElement){tmpTooltipElement.classList.remove('pict-modal-tooltip-pinned');}tmpHide();if(typeof pOptions.onPinChange==='function'){pOptions.onPinChange(false,pElement);}};let tmpOnClick=pEvent=>{if(pEvent){pEvent.preventDefault();pEvent.stopPropagation();}if(tmpPinned){tmpUnpin();}else{tmpPin();}};// Attach listeners
pElement.addEventListener('mouseenter',tmpOnMouseEnter);pElement.addEventListener('mouseleave',tmpOnMouseLeave);pElement.addEventListener('focusin',tmpOnFocusIn);pElement.addEventListener('focusout',tmpOnFocusOut);if(pOptions.pinnable){pElement.addEventListener('click',tmpOnClick);}let tmpDestroy=()=>{if(tmpDestroyed){return;}tmpDestroyed=true;if(tmpShowTimeout){clearTimeout(tmpShowTimeout);}if(tmpHideTimeout){clearTimeout(tmpHideTimeout);}tmpRemoveRepositionListeners();tmpPinned=false;tmpHide();pElement.removeEventListener('mouseenter',tmpOnMouseEnter);pElement.removeEventListener('mouseleave',tmpOnMouseLeave);pElement.removeEventListener('focusin',tmpOnFocusIn);pElement.removeEventListener('focusout',tmpOnFocusOut);if(pOptions.pinnable){pElement.removeEventListener('click',tmpOnClick);}};// Optionally render already-pinned (explicit consumer opt-in).
if(pOptions.pinnable&&pOptions.startPinned){tmpPin();}return{destroy:tmpDestroy,pin:tmpPin,unpin:tmpUnpin,isPinned:()=>{return tmpPinned;}};}/**
	 * Position a tooltip element relative to the target element.
	 * Flips direction if the tooltip would overflow the viewport.
	 *
	 * @param {HTMLElement} pTooltip
	 * @param {HTMLElement} pTarget
	 * @param {string} pPosition - 'top', 'bottom', 'left', 'right'
	 */_positionTooltip(pTooltip,pTarget,pPosition){let tmpTargetRect=pTarget.getBoundingClientRect();let tmpTooltipRect=pTooltip.getBoundingClientRect();let tmpGap=8;let tmpPosition=pPosition;// Flip if needed
if(tmpPosition==='top'&&tmpTargetRect.top<tmpTooltipRect.height+tmpGap){tmpPosition='bottom';}else if(tmpPosition==='bottom'&&window.innerHeight-tmpTargetRect.bottom<tmpTooltipRect.height+tmpGap){tmpPosition='top';}else if(tmpPosition==='left'&&tmpTargetRect.left<tmpTooltipRect.width+tmpGap){tmpPosition='right';}else if(tmpPosition==='right'&&window.innerWidth-tmpTargetRect.right<tmpTooltipRect.width+tmpGap){tmpPosition='left';}// Update class for arrow direction
pTooltip.className=pTooltip.className.replace(/pict-modal-tooltip--\w+/,'pict-modal-tooltip--'+tmpPosition);let tmpTop=0;let tmpLeft=0;switch(tmpPosition){case'top':tmpTop=tmpTargetRect.top-tmpTooltipRect.height-tmpGap;tmpLeft=tmpTargetRect.left+tmpTargetRect.width/2-tmpTooltipRect.width/2;break;case'bottom':tmpTop=tmpTargetRect.bottom+tmpGap;tmpLeft=tmpTargetRect.left+tmpTargetRect.width/2-tmpTooltipRect.width/2;break;case'left':tmpTop=tmpTargetRect.top+tmpTargetRect.height/2-tmpTooltipRect.height/2;tmpLeft=tmpTargetRect.left-tmpTooltipRect.width-tmpGap;break;case'right':tmpTop=tmpTargetRect.top+tmpTargetRect.height/2-tmpTooltipRect.height/2;tmpLeft=tmpTargetRect.right+tmpGap;break;}// Clamp to viewport
tmpLeft=Math.max(4,Math.min(tmpLeft,window.innerWidth-tmpTooltipRect.width-4));tmpTop=Math.max(4,Math.min(tmpTop,window.innerHeight-tmpTooltipRect.height-4));pTooltip.style.top=tmpTop+'px';pTooltip.style.left=tmpLeft+'px';}/**
	 * Whether an element is currently rendered (has a layout box). Returns false
	 * for a display:none element or one inside a display:none ancestor (e.g. an
	 * inactive tab panel) — in which case a pinned tooltip should stay hidden
	 * until the anchor reappears.
	 *
	 * @param {HTMLElement} pElement
	 * @returns {boolean}
	 */_isElementRendered(pElement){return!!(pElement&&typeof pElement.getClientRects==='function'&&pElement.getClientRects().length>0);}/**
	 * Dismiss all active tooltips.
	 */dismissAll(){let tmpTooltips=this._modal._activeTooltips.slice();for(let i=0;i<tmpTooltips.length;i++){tmpTooltips[i].destroy();}}}module.exports=PictModalTooltip;},{}],25:[function(require,module,exports){/**
 * Pict-Modal-Window
 *
 * Builds custom floating modal windows with arbitrary content and buttons.
 */class PictModalWindow{constructor(pModal){this._modal=pModal;}/**
	 * Show a custom modal window.
	 *
	 * @param {object} [pOptions] - Options
	 * @param {string} [pOptions.title] - Dialog title
	 * @param {string} [pOptions.content] - HTML content for the body
	 * @param {Array} [pOptions.buttons] - Array of { Hash, Label, Style }
	 * @param {boolean} [pOptions.closeable] - Whether the close button and overlay dismiss are enabled
	 * @param {string} [pOptions.width] - CSS width value
	 * @param {boolean} [pOptions.unbounded] - If true, removes the default 90vh/90vw viewport cap. The dialog will grow with its content and may extend beyond the viewport.
	 * @param {function} [pOptions.onOpen] - Called after dialog is shown, receives dialog element
	 * @param {function} [pOptions.onClose] - Called after dialog is dismissed
	 * @returns {Promise<string|null>} Resolves with clicked button Hash, or null on close
	 */show(pOptions){let tmpOptions=Object.assign({},this._modal.options.DefaultModalOptions,pOptions);return new Promise(fResolve=>{let tmpDialog=this._buildDialog(tmpOptions,fResolve);this._showDialog(tmpDialog,tmpOptions,fResolve);});}/**
	 * Build the modal dialog element.
	 *
	 * @param {object} pOptions
	 * @param {function} fResolve
	 * @returns {HTMLElement}
	 */_buildDialog(pOptions,fResolve){let tmpId=this._modal._nextId();let tmpDialog=document.createElement('div');tmpDialog.className='pict-modal-dialog';if(pOptions.unbounded){tmpDialog.className+=' pict-modal-dialog--unbounded';}tmpDialog.id='pict-modal-'+tmpId;tmpDialog.setAttribute('role','dialog');tmpDialog.setAttribute('aria-modal','true');tmpDialog.style.width=pOptions.width;// Header
let tmpHeaderHTML='';if(pOptions.title||pOptions.closeable){tmpHeaderHTML='<div class="pict-modal-dialog-header">';tmpHeaderHTML+='<span class="pict-modal-dialog-title">'+this._escapeHTML(pOptions.title)+'</span>';if(pOptions.closeable){tmpHeaderHTML+='<button class="pict-modal-dialog-close" aria-label="Close">&times;</button>';}tmpHeaderHTML+='</div>';}// Body
let tmpBodyHTML='<div class="pict-modal-dialog-body">'+(pOptions.content||'')+'</div>';// Footer with buttons
let tmpFooterHTML='';if(pOptions.buttons&&pOptions.buttons.length>0){tmpFooterHTML='<div class="pict-modal-dialog-footer">';for(let i=0;i<pOptions.buttons.length;i++){let tmpButton=pOptions.buttons[i];let tmpBtnClass='pict-modal-btn';if(tmpButton.Style){tmpBtnClass+=' pict-modal-btn--'+tmpButton.Style;}tmpFooterHTML+='<button class="'+tmpBtnClass+'" data-hash="'+this._escapeHTML(tmpButton.Hash)+'">'+this._escapeHTML(tmpButton.Label)+'</button>';}tmpFooterHTML+='</div>';}tmpDialog.innerHTML=tmpHeaderHTML+tmpBodyHTML+tmpFooterHTML;let tmpDismiss=pResult=>{this._dismissDialog(tmpDialog,pResult,fResolve,pOptions);};// Wire close button
if(pOptions.closeable){let tmpCloseBtn=tmpDialog.querySelector('.pict-modal-dialog-close');if(tmpCloseBtn){tmpCloseBtn.addEventListener('click',()=>{tmpDismiss(null);});}}// Wire action buttons
let tmpActionButtons=tmpDialog.querySelectorAll('[data-hash]');for(let i=0;i<tmpActionButtons.length;i++){let tmpBtn=tmpActionButtons[i];tmpBtn.addEventListener('click',()=>{tmpDismiss(tmpBtn.getAttribute('data-hash'));});}tmpDialog._dismiss=tmpDismiss;return tmpDialog;}/**
	 * Show the dialog: append to body, show overlay, animate in.
	 *
	 * @param {HTMLElement} pDialog
	 * @param {object} pOptions
	 * @param {function} fResolve
	 */_showDialog(pDialog,pOptions,fResolve){let tmpModalEntry={element:pDialog,dismiss:pDialog._dismiss,type:'window'};// Show overlay
let tmpOverlayClickHandler=null;if(this._modal.options.OverlayClickDismisses&&pOptions.closeable){tmpOverlayClickHandler=()=>{pDialog._dismiss(null);};}this._modal._overlay.show(tmpOverlayClickHandler);// Append to body
document.body.appendChild(pDialog);// Track
this._modal._activeModals.push(tmpModalEntry);// Animate in
void pDialog.offsetHeight;pDialog.classList.add('pict-modal-visible');// Focus first button or close button
let tmpFocusTarget=pDialog.querySelector('.pict-modal-btn')||pDialog.querySelector('.pict-modal-dialog-close');if(tmpFocusTarget){tmpFocusTarget.focus();}// Keyboard handler
pDialog._keyHandler=pEvent=>{if(pEvent.key==='Escape'&&pOptions.closeable){pDialog._dismiss(null);}};document.addEventListener('keydown',pDialog._keyHandler);// onOpen callback
if(typeof pOptions.onOpen==='function'){pOptions.onOpen(pDialog);}}/**
	 * Dismiss the dialog: animate out, remove from DOM, hide overlay.
	 *
	 * @param {HTMLElement} pDialog
	 * @param {*} pResult
	 * @param {function} fResolve
	 * @param {object} pOptions
	 */_dismissDialog(pDialog,pResult,fResolve,pOptions){if(pDialog._dismissed){return;}pDialog._dismissed=true;if(pDialog._keyHandler){document.removeEventListener('keydown',pDialog._keyHandler);}pDialog.classList.remove('pict-modal-visible');this._modal._activeModals=this._modal._activeModals.filter(pEntry=>{return pEntry.element!==pDialog;});if(this._modal._activeModals.length>0){let tmpTopModal=this._modal._activeModals[this._modal._activeModals.length-1];this._modal._overlay.updateClickHandler(this._modal.options.OverlayClickDismisses?tmpTopModal.dismiss:null);}this._modal._overlay.hide();setTimeout(()=>{if(pDialog.parentNode){pDialog.parentNode.removeChild(pDialog);}},220);if(typeof pOptions.onClose==='function'){pOptions.onClose(pResult);}fResolve(pResult);}/**
	 * Escape HTML special characters.
	 *
	 * @param {string} pText
	 * @returns {string}
	 */_escapeHTML(pText){if(typeof pText!=='string'){return'';}return pText.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}}module.exports=PictModalWindow;},{}],26:[function(require,module,exports){module.exports={"AutoInitialize":true,"AutoRender":false,"AutoSolveWithApp":false,"ViewIdentifier":"Pict-Section-Modal","OverlayClickDismisses":true,"DefaultConfirmOptions":{"title":"Confirm","confirmLabel":"OK","cancelLabel":"Cancel","dangerous":false,"unbounded":false},"DefaultDoubleConfirmOptions":{"title":"Are you sure?","confirmLabel":"Confirm","cancelLabel":"Cancel","phrasePrompt":"Type \"{phrase}\" to confirm:","confirmPhrase":"","unbounded":false},"DefaultModalOptions":{"title":"","content":"","buttons":[],"closeable":true,"width":"480px","unbounded":false},"DefaultTooltipOptions":{"position":"top","delay":200,"maxWidth":"300px","interactive":false,"pinnable":false,"startPinned":false},"DefaultToastOptions":{"type":"info","duration":3000,"position":"top-right","dismissible":true,"allowHTML":false},"DefaultPanelOptions":{"position":"right","width":340,"minWidth":200,"maxWidth":600,"collapsible":true,"collapsed":false,"persist":false,"persistKey":""},"Templates":[],"Renderables":[],"CSS":/*css*/`
/* pict-section-modal */
.pict-modal-root
{
	/* Defaults are routed through pict-provider-theme tokens so apps
	   using the theme provider get themed modals automatically.  Each
	   var() carries its original hex as the fallback so apps that don't
	   install pict-provider-theme look exactly as before.  Apps may
	   still override any --pict-modal-* var directly to layer over the
	   theme-driven defaults. */

	/* Overlay */
	--pict-modal-overlay-bg: rgba(0, 0, 0, 0.5);

	/* Dialog */
	--pict-modal-bg:                  var(--theme-color-background-panel,  #ffffff);
	--pict-modal-fg:                  var(--theme-color-text-primary,      #1a1a1a);
	--pict-modal-border:              var(--theme-color-border-default,    #e0e0e0);
	--pict-modal-border-radius:       8px;
	--pict-modal-shadow:              0 4px 24px rgba(0, 0, 0, 0.15);
	--pict-modal-header-bg:           var(--theme-color-background-secondary, #f5f5f5);
	--pict-modal-header-fg:           var(--theme-color-text-primary,      #1a1a1a);
	--pict-modal-header-border:       var(--theme-color-border-default,    #e0e0e0);

	/* Buttons */
	--pict-modal-btn-bg:              var(--theme-color-background-secondary, #e0e0e0);
	--pict-modal-btn-fg:              var(--theme-color-text-primary,      #1a1a1a);
	--pict-modal-btn-hover-bg:        var(--theme-color-background-hover,  #d0d0d0);
	--pict-modal-btn-primary-bg:      var(--theme-color-brand-primary,     #2563eb);
	--pict-modal-btn-primary-fg:      var(--theme-color-text-on-brand,     #ffffff);
	--pict-modal-btn-primary-hover-bg:var(--theme-color-brand-primary-hover,#1d4ed8);
	--pict-modal-btn-danger-bg:       var(--theme-color-status-error,      #dc2626);
	--pict-modal-btn-danger-fg:       var(--theme-color-text-on-brand,     #ffffff);
	--pict-modal-btn-danger-hover-bg: var(--theme-color-status-error,      #b91c1c);
	--pict-modal-btn-border-radius:   4px;

	/* Toast */
	--pict-modal-toast-bg:            var(--theme-color-background-panel,  #333333);
	--pict-modal-toast-fg:            var(--theme-color-text-primary,      #ffffff);
	--pict-modal-toast-success-bg:    var(--theme-color-status-success,    #16a34a);
	--pict-modal-toast-warning-bg:    var(--theme-color-status-warning,    #d97706);
	--pict-modal-toast-error-bg:      var(--theme-color-status-error,      #dc2626);
	--pict-modal-toast-info-bg:       var(--theme-color-status-info,       #2563eb);
	--pict-modal-toast-border-radius: 6px;
	--pict-modal-toast-shadow:        0 2px 12px rgba(0, 0, 0, 0.15);

	/* Tooltip */
	--pict-modal-tooltip-bg:          var(--theme-color-background-tertiary,#1a1a1a);
	--pict-modal-tooltip-fg:          var(--theme-color-text-primary,      #ffffff);
	--pict-modal-tooltip-border-radius:4px;
	--pict-modal-tooltip-shadow:      0 2px 8px rgba(0, 0, 0, 0.15);
	--pict-modal-tooltip-pinned-ring: var(--theme-color-brand-primary, #2E7D74);

	/* Dropdown */
	--pict-modal-dropdown-bg:                 var(--theme-color-background-panel,  #ffffff);
	--pict-modal-dropdown-fg:                 var(--theme-color-text-primary,      #1a1a1a);
	--pict-modal-dropdown-border:             var(--theme-color-border-default,    #e0e0e0);
	--pict-modal-dropdown-border-radius:      6px;
	--pict-modal-dropdown-shadow:             0 6px 18px rgba(0, 0, 0, 0.18);
	--pict-modal-dropdown-item-hover-bg:      var(--theme-color-background-hover,  rgba(37, 99, 235, 0.10));
	--pict-modal-dropdown-item-hover-fg:      var(--theme-color-text-primary,      #1a1a1a);
	--pict-modal-dropdown-item-disabled-fg:   var(--theme-color-text-muted,        #9aa0a6);
	--pict-modal-dropdown-separator:          var(--theme-color-border-light,      #e8e8e8);
	--pict-modal-dropdown-header-fg:          var(--theme-color-text-secondary,    #6b7280);
	--pict-modal-dropdown-danger-fg:          var(--theme-color-status-error,      #dc2626);
	--pict-modal-dropdown-primary-fg:         var(--theme-color-brand-primary,     #2563eb);

	/* Typography */
	--pict-modal-font-family:         var(--theme-typography-family-sans,  system-ui, -apple-system, sans-serif);
	--pict-modal-font-size:           14px;
	--pict-modal-title-font-size:     16px;

	/* Animation */
	--pict-modal-transition-duration: 200ms;
}

/* Overlay */
.pict-modal-overlay
{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1000;
	background: var(--pict-modal-overlay-bg);
	opacity: 0;
	transition: opacity var(--pict-modal-transition-duration) ease;
}

.pict-modal-overlay.pict-modal-visible
{
	opacity: 1;
}

/* Dialog */
.pict-modal-dialog
{
	position: fixed;
	z-index: 1010;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%) translateY(-20px);
	opacity: 0;
	transition: opacity var(--pict-modal-transition-duration) ease,
	            transform var(--pict-modal-transition-duration) ease;

	max-width: 90vw;
	max-height: 90vh;
	display: flex;
	flex-direction: column;

	background: var(--pict-modal-bg);
	color: var(--pict-modal-fg);
	border: 1px solid var(--pict-modal-border);
	border-radius: var(--pict-modal-border-radius);
	box-shadow: var(--pict-modal-shadow);
	font-family: var(--pict-modal-font-family);
	font-size: var(--pict-modal-font-size);
}

.pict-modal-dialog.pict-modal-visible
{
	opacity: 1;
	transform: translate(-50%, -50%) translateY(0);
}

/* Unbounded modifier — lets callers opt out of the 90vh/90vw viewport cap.
   Use with caution: content taller than the viewport will push buttons
   below the fold. */
.pict-modal-dialog.pict-modal-dialog--unbounded
{
	max-height: none;
	max-width: none;
}

.pict-modal-dialog-header
{
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 12px 16px;
	background: var(--pict-modal-header-bg);
	color: var(--pict-modal-header-fg);
	border-bottom: 1px solid var(--pict-modal-header-border);
	border-radius: var(--pict-modal-border-radius) var(--pict-modal-border-radius) 0 0;
}

.pict-modal-dialog-title
{
	font-size: var(--pict-modal-title-font-size);
	font-weight: 600;
}

.pict-modal-dialog-close
{
	background: none;
	border: none;
	font-size: 20px;
	cursor: pointer;
	color: var(--pict-modal-fg);
	padding: 0 4px;
	line-height: 1;
	opacity: 0.6;
}

.pict-modal-dialog-close:hover
{
	opacity: 1;
}

.pict-modal-dialog-body
{
	padding: 16px;
	overflow-y: auto;
	flex: 1;
}

.pict-modal-dialog-footer
{
	display: flex;
	justify-content: flex-end;
	gap: 8px;
	padding: 12px 16px;
	border-top: 1px solid var(--pict-modal-border);
}

/* Buttons */
.pict-modal-btn
{
	padding: 8px 16px;
	border: none;
	border-radius: var(--pict-modal-btn-border-radius);
	font-family: var(--pict-modal-font-family);
	font-size: var(--pict-modal-font-size);
	cursor: pointer;
	background: var(--pict-modal-btn-bg);
	color: var(--pict-modal-btn-fg);
	transition: background var(--pict-modal-transition-duration) ease;
}

.pict-modal-btn:hover
{
	background: var(--pict-modal-btn-hover-bg);
}

.pict-modal-btn:disabled
{
	opacity: 0.5;
	cursor: not-allowed;
}

.pict-modal-btn--primary
{
	background: var(--pict-modal-btn-primary-bg);
	color: var(--pict-modal-btn-primary-fg);
}

.pict-modal-btn--primary:hover
{
	background: var(--pict-modal-btn-primary-hover-bg);
}

.pict-modal-btn--danger
{
	background: var(--pict-modal-btn-danger-bg);
	color: var(--pict-modal-btn-danger-fg);
}

.pict-modal-btn--danger:hover
{
	background: var(--pict-modal-btn-danger-hover-bg);
}

/* Double confirm input */
.pict-modal-confirm-input
{
	width: 100%;
	padding: 8px 12px;
	margin-top: 12px;
	border: 1px solid var(--pict-modal-border);
	border-radius: var(--pict-modal-btn-border-radius);
	font-family: var(--pict-modal-font-family);
	font-size: var(--pict-modal-font-size);
	box-sizing: border-box;
}

.pict-modal-confirm-input:focus
{
	outline: 2px solid var(--pict-modal-btn-primary-bg);
	outline-offset: -1px;
}

.pict-modal-confirm-prompt
{
	margin-top: 12px;
	font-size: 13px;
	color: var(--pict-modal-fg);
	opacity: 0.7;
}

/* Toast container */
.pict-modal-toast-container
{
	position: fixed;
	z-index: 1030;
	display: flex;
	flex-direction: column;
	gap: 8px;
	pointer-events: none;
	max-width: 400px;
}

.pict-modal-toast-container--top-right
{
	top: 16px;
	right: 16px;
}

.pict-modal-toast-container--top-left
{
	top: 16px;
	left: 16px;
}

.pict-modal-toast-container--bottom-right
{
	bottom: 16px;
	right: 16px;
}

.pict-modal-toast-container--bottom-left
{
	bottom: 16px;
	left: 16px;
}

.pict-modal-toast-container--top-center
{
	top: 16px;
	left: 50%;
	transform: translateX(-50%);
}

.pict-modal-toast-container--bottom-center
{
	bottom: 16px;
	left: 50%;
	transform: translateX(-50%);
}

/* Toast */
.pict-modal-toast
{
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 12px 16px;
	border-radius: var(--pict-modal-toast-border-radius);
	box-shadow: var(--pict-modal-toast-shadow);
	font-family: var(--pict-modal-font-family);
	font-size: var(--pict-modal-font-size);
	background: var(--pict-modal-toast-bg);
	color: var(--pict-modal-toast-fg);
	pointer-events: auto;
	opacity: 0;
	transform: translateX(100%);
	transition: opacity var(--pict-modal-transition-duration) ease,
	            transform var(--pict-modal-transition-duration) ease;
}

.pict-modal-toast.pict-modal-visible
{
	opacity: 1;
	transform: translateX(0);
}

.pict-modal-toast.pict-modal-toast-exit
{
	opacity: 0;
	transform: translateX(100%);
}

.pict-modal-toast--info
{
	background: var(--pict-modal-toast-info-bg);
}

.pict-modal-toast--success
{
	background: var(--pict-modal-toast-success-bg);
}

.pict-modal-toast--warning
{
	background: var(--pict-modal-toast-warning-bg);
}

.pict-modal-toast--error
{
	background: var(--pict-modal-toast-error-bg);
}

.pict-modal-toast-message
{
	flex: 1;
}

.pict-modal-toast-dismiss
{
	background: none;
	border: none;
	color: inherit;
	font-size: 18px;
	cursor: pointer;
	padding: 0 2px;
	line-height: 1;
	opacity: 0.7;
}

.pict-modal-toast-dismiss:hover
{
	opacity: 1;
}

/* Tooltip */
.pict-modal-tooltip
{
	position: fixed;
	z-index: 1020;
	padding: 6px 10px;
	border-radius: var(--pict-modal-tooltip-border-radius);
	box-shadow: var(--pict-modal-tooltip-shadow);
	background: var(--pict-modal-tooltip-bg);
	color: var(--pict-modal-tooltip-fg);
	font-family: var(--pict-modal-font-family);
	font-size: 13px;
	pointer-events: none;
	opacity: 0;
	transition: opacity var(--pict-modal-transition-duration) ease;
	white-space: normal;
	word-wrap: break-word;
}

.pict-modal-tooltip.pict-modal-tooltip-interactive
{
	pointer-events: auto;
}

.pict-modal-tooltip.pict-modal-visible
{
	opacity: 1;
}

/* Pinned tooltips stay open and can be interacted with; a subtle ring
   distinguishes a pinned tooltip from a transient hover tooltip. */
.pict-modal-tooltip.pict-modal-tooltip-pinned
{
	pointer-events: auto;
	box-shadow: var(--pict-modal-tooltip-shadow), 0 0 0 1px var(--pict-modal-tooltip-pinned-ring);
}

.pict-modal-tooltip-arrow
{
	position: absolute;
	width: 8px;
	height: 8px;
	background: var(--pict-modal-tooltip-bg);
	transform: rotate(45deg);
}

.pict-modal-tooltip--top .pict-modal-tooltip-arrow
{
	bottom: -4px;
	left: 50%;
	margin-left: -4px;
}

.pict-modal-tooltip--bottom .pict-modal-tooltip-arrow
{
	top: -4px;
	left: 50%;
	margin-left: -4px;
}

.pict-modal-tooltip--left .pict-modal-tooltip-arrow
{
	right: -4px;
	top: 50%;
	margin-top: -4px;
}

.pict-modal-tooltip--right .pict-modal-tooltip-arrow
{
	left: -4px;
	top: 50%;
	margin-top: -4px;
}

/* ── Dropdown ─────────────────────────────────────────────────────────
   Anchor-positioned menu (no overlay). Used for nav menus and
   "split button" addenda — see Pict-Modal-Dropdown.js.
*/
.pict-modal-dropdown
{
	position: fixed;
	z-index: 1025;
	min-width: 160px;
	max-width: 360px;
	max-height: 60vh;
	overflow-y: auto;
	background: var(--pict-modal-dropdown-bg);
	color: var(--pict-modal-dropdown-fg);
	border: 1px solid var(--pict-modal-dropdown-border);
	border-radius: var(--pict-modal-dropdown-border-radius);
	box-shadow: var(--pict-modal-dropdown-shadow);
	font-family: var(--pict-modal-font-family);
	font-size: var(--pict-modal-font-size);
	padding: 4px 0;
	opacity: 0;
	transform: translateY(-4px);
	transition: opacity var(--pict-modal-transition-duration) ease,
	            transform var(--pict-modal-transition-duration) ease;
}

/* Free-form content popovers keep the dropdown chrome (bg / border / shadow /
   flip / dismiss) but hand sizing + inner padding to the injected content, so a
   pre-rendered template menu or a wide rich card isn't boxed by the menu
   defaults. Cap width per-call via the maxWidth option. */
.pict-modal-dropdown.pict-modal-dropdown--content
{
	max-width: none;
	padding: 0;
}

.pict-modal-dropdown.pict-modal-dropdown--above { transform: translateY(4px); }

.pict-modal-dropdown.pict-modal-visible
{
	opacity: 1;
	transform: translateY(0);
}

.pict-modal-dropdown-item
{
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 7px 14px;
	cursor: pointer;
	user-select: none;
	color: inherit;
	outline: none;
}

.pict-modal-dropdown-item:hover,
.pict-modal-dropdown-item:focus
{
	background: var(--pict-modal-dropdown-item-hover-bg);
	color: var(--pict-modal-dropdown-item-hover-fg);
}

.pict-modal-dropdown-item--disabled
{
	cursor: not-allowed;
	color: var(--pict-modal-dropdown-item-disabled-fg);
}

.pict-modal-dropdown-item--disabled:hover,
.pict-modal-dropdown-item--disabled:focus
{
	background: transparent;
	color: var(--pict-modal-dropdown-item-disabled-fg);
}

.pict-modal-dropdown-item--primary { color: var(--pict-modal-dropdown-primary-fg); }
.pict-modal-dropdown-item--danger  { color: var(--pict-modal-dropdown-danger-fg); }

.pict-modal-dropdown-item-icon
{
	flex: 0 0 auto;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 16px;
	height: 16px;
}

.pict-modal-dropdown-item-icon svg { width: 100%; height: 100%; display: block; }

.pict-modal-dropdown-item-label { flex: 1 1 auto; min-width: 0; }

.pict-modal-dropdown-item-hint
{
	flex: 0 0 auto;
	font-size: 11px;
	opacity: 0.6;
	margin-left: 12px;
}

.pict-modal-dropdown-separator
{
	height: 1px;
	background: var(--pict-modal-dropdown-separator);
	margin: 4px 0;
}

.pict-modal-dropdown-header
{
	padding: 6px 14px 2px;
	font-size: 11px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.04em;
	color: var(--pict-modal-dropdown-header-fg);
}

/* ── Resizable / Collapsible Panels ──────────────── */
.pict-panel
{
	position: relative;
	transition: width 0.2s ease;
	flex-shrink: 0;
	overflow: visible;
}
.pict-panel-collapsed
{
	width: 0 !important;
	min-width: 0 !important;
	overflow: visible;
}
.pict-panel-collapsed > *:not(.pict-panel-edge)
{
	display: none;
}

/* Edge container — zero-width flex sibling of the panel.
   Sits next to the panel in the flex layout; children
   use absolute positioning to overlap the panel boundary. */
.pict-panel-edge
{
	position: relative;
	width: 0;
	flex-shrink: 0;
	z-index: 50;
	overflow: visible;
}

/* Resize handle — thin strip on the panel boundary */
.pict-panel-resize
{
	position: absolute;
	top: 0;
	bottom: 0;
	width: 4px;
	cursor: col-resize;
	background: transparent;
	transition: background 0.15s, width 0.15s;
}
.pict-panel-edge-right .pict-panel-resize
{
	right: 0;
	border-right: 1px solid var(--pict-panel-border, #DDD6CA);
}
.pict-panel-edge-left .pict-panel-resize
{
	left: 0;
	border-left: 1px solid var(--pict-panel-border, #DDD6CA);
}
.pict-panel-resize:hover,
.pict-panel-edge:hover .pict-panel-resize
{
	width: 5px;
	background: var(--pict-panel-accent, #2E7D74);
	opacity: 0.5;
}
.pict-panel-resize.dragging
{
	width: 5px;
	background: var(--pict-panel-accent, #2E7D74);
	opacity: 1;
	transition: none;
}
.pict-panel-edge-collapsed .pict-panel-resize
{
	display: none;
}

/* Collapse tab — tucked sliver at rest, slides out on hover */
.pict-panel-tab
{
	position: absolute;
	top: 8px;
	width: 8px;
	height: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	background: var(--pict-panel-border, #DDD6CA);
	border: 1px solid var(--pict-panel-border, #DDD6CA);
	cursor: pointer;
	color: var(--pict-panel-fg, #8A7F72);
	font-size: 10px;
	line-height: 1;
	opacity: 0.5;
	transition: opacity 0.25s, width 0.2s ease, height 0.2s ease, left 0.2s ease, right 0.2s ease, background 0.2s;
	z-index: 51;
}
.pict-panel-edge:hover .pict-panel-tab,
.pict-panel-tab:hover
{
	width: 20px;
	height: 32px;
	opacity: 1;
	overflow: visible;
	background: var(--pict-panel-bg, #FAF8F4);
}
/* Right panel: tab to the left of the edge */
.pict-panel-edge-right .pict-panel-tab
{
	right: 0;
	border-right: none;
	border-radius: 4px 0 0 4px;
}
.pict-panel-edge-right:hover .pict-panel-tab,
.pict-panel-edge-right .pict-panel-tab:hover
{
	right: 0;
}
/* Left panel: tab to the right of the edge */
.pict-panel-edge-left .pict-panel-tab
{
	left: 0;
	border-left: none;
	border-radius: 0 4px 4px 0;
}
.pict-panel-edge-left:hover .pict-panel-tab,
.pict-panel-edge-left .pict-panel-tab:hover
{
	left: 0;
}
/* When collapsed — more visible */
.pict-panel-edge-collapsed .pict-panel-tab
{
	width: 10px;
	height: 28px;
	opacity: 0.6;
}
.pict-panel-edge-collapsed .pict-panel-tab:hover,
.pict-panel-edge-collapsed:hover .pict-panel-tab
{
	width: 20px;
	height: 32px;
	opacity: 1;
	overflow: visible;
	background: var(--pict-panel-bg, #FAF8F4);
}

/* ───────────────────────────────────────────────────────────────────
 *  Pict-Modal-Shell — viewport-managing layout for top / right /
 *  bottom / left panels around a center.
 * ───────────────────────────────────────────────────────────────── */

.pict-modal-shell-host { display: block; height: 100%; min-height: 0; }
.pict-modal-shell
{
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	min-height: 0;
	position: relative;
	color: var(--pict-modal-fg, var(--theme-color-text-primary, #1a1a1a));
	background: var(--theme-color-background-primary, transparent);
}
.pict-modal-shell-row { display: flex; min-width: 0; min-height: 0; }
/* "First added = at the edge" convention is held by reversing the
   flex-direction on the bottom row + right side. That way, for ALL
   four sides, calling addPanel() N times stacks panel #1 against
   the viewport edge, panel #2 just inside it, panel #3 further in,
   and so on. Without these reverses, top + left worked that way but
   bottom + right inverted (first-added at content side, last-added
   at edge), which surprised callers. */
.pict-modal-shell-row-top    { flex: 0 0 auto; flex-direction: column; }
.pict-modal-shell-row-bottom { flex: 0 0 auto; flex-direction: column-reverse; }
.pict-modal-shell-row-middle
{
	flex: 1 1 0;
	flex-direction: row;
	min-height: 0;
	position: relative;
}
.pict-modal-shell-side
{
	display: flex;
	flex: 0 0 auto;
	min-height: 0;
}
.pict-modal-shell-side-left  { flex-direction: row; }
.pict-modal-shell-side-right { flex-direction: row-reverse; }
.pict-modal-shell-center
{
	flex: 1 1 0;
	min-width: 0;
	min-height: 0;
	overflow: auto;
	position: relative;
}
.pict-modal-shell-center-content
{
	min-height: 100%;
}
/* Center column gains this class when at least one Scope:'center'
   panel is added.  The center stops scrolling internally — that job
   moves to the content destination — and switches to a vertical flex
   so the destination and any inner panels stack cleanly. */
.pict-modal-shell-center.pict-modal-shell-center-with-inner-panel
{
	display: flex;
	flex-direction: column;
	overflow: hidden;
}
.pict-modal-shell-center.pict-modal-shell-center-with-inner-panel > .pict-modal-shell-center-content
{
	flex: 1 1 0;
	min-height: 0;
	overflow: auto;
}
.pict-modal-shell-center.pict-modal-shell-center-with-inner-panel > .pict-modal-shell-panel
{
	flex: 0 0 auto;
	width: 100%;
}

/* Panels — base */
.pict-modal-shell-panel
{
	/* How far the collapse-tab's panel-bg "merge bar" extends INTO
	   the panel past the tab's geometric edge. Painted via box-shadow
	   on the tab (no DOM impact), it masks any 1px theme border on an
	   inner element, content padding offset, or resize-handle hover
	   bleed in the strip between the tab's panel-facing edge and the
	   first real pixel of panel content. Consumers can bump this for
	   themes with thicker (2+px) inner borders. */
	--pict-modal-collapse-tab-merge: 2px;
	position: relative;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	background: var(--pict-modal-bg, var(--theme-color-background-panel, #ffffff));
	color: inherit;
	min-width: 0;
	min-height: 0;
	transition: width 140ms ease, height 140ms ease;
}
.pict-modal-shell-panel-content
{
	flex: 1 1 auto;
	min-width: 0;
	min-height: 0;
	overflow: auto;
}
/* Fixed-mode panels are pure chrome (topbars, status rows). Their
   content should fit the configured Size exactly — never scroll. The
   1px border that .pict-modal-shell-panel-mode-fixed adds on the
   inner edge shaves 1px off the content's available height, which
   then triggers a sliver-scrollbar on any inner widget with
   min-height matching the panel Size. overflow:hidden here suppresses
   that without affecting resizable/collapsible panels (sidebars,
   drawers) where scrollable content is the whole point. */
.pict-modal-shell-panel-mode-fixed > .pict-modal-shell-panel-content
{
	overflow: hidden;
}
.pict-modal-shell-panel-content-inner
{
	min-height: 100%;
}
/* Panel boundary — fixed-mode panels get a hairline border for explicit
   demarcation. Collapsible / resizable panels DROP the boundary border
   (background contrast separates them from the center anyway) so the
   collapse tab can pull out cleanly without a hairline cutting across
   it. The host stylesheet still gets full control via the panel's own
   background. */
.pict-modal-shell-panel-mode-fixed.pict-modal-shell-panel-top    { border-bottom: 1px solid var(--pict-modal-border, var(--theme-color-border-default, #e0e0e0)); }
.pict-modal-shell-panel-mode-fixed.pict-modal-shell-panel-bottom { border-top:    1px solid var(--pict-modal-border, var(--theme-color-border-default, #e0e0e0)); }
.pict-modal-shell-panel-mode-fixed.pict-modal-shell-panel-left   { border-right:  1px solid var(--pict-modal-border, var(--theme-color-border-default, #e0e0e0)); }
.pict-modal-shell-panel-mode-fixed.pict-modal-shell-panel-right  { border-left:   1px solid var(--pict-modal-border, var(--theme-color-border-default, #e0e0e0)); }

/* Resize handle — absolute on the inner edge of each panel. */
.pict-modal-shell-panel-resize-handle
{
	position: absolute;
	background: transparent;
	z-index: 5;
	transition: background-color 120ms ease;
}
/* Resize handle hover — use the active brand's mode-aware primary
   color (set by pict-section-theme's Brand provider as
   --brand-color-primary-mode) so the resize affordance picks up the
   app's wordmark color. Falls back to the theme's brand-primary
   token if no brand is registered. */
.pict-modal-shell-panel-resize-handle:hover
{
	background: var(--brand-color-primary-mode, var(--theme-color-brand-primary, #2563eb));
	opacity: 0.4;
}
.pict-modal-shell-panel-left   .pict-modal-shell-panel-resize-handle { right: -3px; top: 0; bottom: 0; width: 6px; cursor: col-resize; }
.pict-modal-shell-panel-right  .pict-modal-shell-panel-resize-handle { left:  -3px; top: 0; bottom: 0; width: 6px; cursor: col-resize; }
.pict-modal-shell-panel-top    .pict-modal-shell-panel-resize-handle { bottom:-3px; left: 0; right: 0; height: 6px; cursor: row-resize; }
.pict-modal-shell-panel-bottom .pict-modal-shell-panel-resize-handle { top:   -3px; left: 0; right: 0; height: 6px; cursor: row-resize; }

/* Collapse tab — slim sliver flush on the panel's OUTER boundary
   (where the resize handle sits), modelled on retold-content-system's
   sidebar tab. At rest it's a 6×28 px sliver; hover expands to
   18×36 px without overlapping the panel's own content. The tab is
   positioned with its center on the boundary so half pokes into the
   adjacent area — the only place we can safely take over without
   stepping on app UI inside the panel. Title text only renders in the
   collapsed state where there's room for it. */
.pict-modal-shell-panel-collapse-tab
{
	position: absolute;
	display: flex;            /* not inline-flex — avoids baseline alignment quirks */
	align-items: center;
	justify-content: center;
	overflow: hidden;
	border: 1px solid var(--pict-modal-border, var(--theme-color-border-default, #d0d7de));
	background: var(--pict-modal-bg, var(--theme-color-background-panel, #ffffff));
	color: var(--theme-color-text-muted, #6b7280);
	font: inherit;
	font-size: 10px;
	letter-spacing: 0.4px;
	text-transform: uppercase;
	cursor: pointer;
	z-index: 50;
	opacity: 0.55;
	padding: 0;
	box-sizing: border-box;
	line-height: 0;          /* keep child boxes from inflating around the rotated chevron */
	/* Geometry (width/height/right/left) is intentionally NOT animated.
	   Sliding the tab's outer edge inward on hover-out makes it look like
	   the tab is "sliding into" the panel content — weird visual.
	   Snapping the size change instead, and animating only the appearance
	   (opacity/color/shadow), gives a clean fade-in/out with no boundary
	   weirdness. */
	transition: opacity 160ms ease,
	            background-color 160ms ease, color 160ms ease,
	            border-color 160ms ease, box-shadow 160ms ease;
}
/* Hover state pulls accent color from the active brand (mode-aware,
   so it's legible in both light + dark) with theme brand-primary as
   fallback. The whole point of brand colors is that they show up
   across the app's chrome. */
.pict-modal-shell-panel-collapse-tab:hover,
.pict-modal-shell-panel:hover > .pict-modal-shell-panel-collapse-tab
{
	opacity: 1;
	color:        var(--brand-color-primary-mode, var(--theme-color-brand-primary, #2563eb));
	border-color: var(--brand-color-primary-mode, var(--theme-color-brand-primary, #2563eb));
}
/* Drop shadow casts AWAY from the panel so the tab feels pulled out
   (extension of the panel) rather than floating across the boundary.
   The tab itself is now positioned fully OUTSIDE the panel boundary
   (see the per-side rules below), so we don't need a merge-bar shadow
   to mask any in-panel overlap — only the drop shadow remains. */
.pict-modal-shell-panel-left:hover    > .pict-modal-shell-panel-collapse-tab,
.pict-modal-shell-panel-left    > .pict-modal-shell-panel-collapse-tab:hover
{
	box-shadow: 3px 0 6px -2px rgba(0, 0, 0, 0.18);
}
.pict-modal-shell-panel-right:hover   > .pict-modal-shell-panel-collapse-tab,
.pict-modal-shell-panel-right   > .pict-modal-shell-panel-collapse-tab:hover
{
	box-shadow: -3px 0 6px -2px rgba(0, 0, 0, 0.18);
}
.pict-modal-shell-panel-top:hover     > .pict-modal-shell-panel-collapse-tab,
.pict-modal-shell-panel-top     > .pict-modal-shell-panel-collapse-tab:hover
{
	box-shadow: 0 3px 6px -2px rgba(0, 0, 0, 0.18);
}
.pict-modal-shell-panel-bottom:hover  > .pict-modal-shell-panel-collapse-tab,
.pict-modal-shell-panel-bottom  > .pict-modal-shell-panel-collapse-tab:hover
{
	box-shadow: 0 -3px 6px -2px rgba(0, 0, 0, 0.18);
}

/* Per-side base positioning — the tab lives entirely OUTSIDE the
   panel's outer boundary.  Its panel-facing edge touches the boundary
   (offset = -tabThickness) and the rest of the tab pokes out into the
   adjacent area (center / sibling panel).  Border on the panel-facing
   edge is dropped so the tab looks attached to the panel rather than
   floating beside it.
   Why fully-outside?  Earlier iterations had the tab straddling the
   boundary (1px inside + 4px outside) with a panel-bg-colored merge-bar
   masking the in-panel half — that worked geometrically but visually
   read as "tab pinned into the panel," and any rendering inside the
   panel (especially custom borders or hover bleeds) could clip against
   the in-panel half.  Fully-external positioning eliminates the overlap
   class of bugs and lets the tab live entirely in the adjacent area
   where there's no app content to step on. */
.pict-modal-shell-panel-left  > .pict-modal-shell-panel-collapse-tab
{
	right: -6px; top: 14px; width: 6px; height: 28px;
	border-radius: 0 4px 4px 0;
	border-left: 0;
}
.pict-modal-shell-panel-right > .pict-modal-shell-panel-collapse-tab
{
	left:  -6px; top: 14px; width: 6px; height: 28px;
	border-radius: 4px 0 0 4px;
	border-right: 0;
}
.pict-modal-shell-panel-top    > .pict-modal-shell-panel-collapse-tab
{
	bottom: -6px; right: 14px; width: 28px; height: 6px;
	border-radius: 0 0 4px 4px;
	border-top: 0;
}
.pict-modal-shell-panel-bottom > .pict-modal-shell-panel-collapse-tab
{
	top:    -6px; right: 14px; width: 28px; height: 6px;
	border-radius: 4px 4px 0 0;
	border-bottom: 0;
}

/* Hover: tab grows OUTWARD into the adjacent area.  The panel-facing
   edge stays glued to the boundary (offset = -tabThickness), so the
   tab still looks attached on hover — only its outer dimension grows.
   For side panels the height also grows (28 → 36) downward; for top
   /bottom panels the width grows (28 → 36) — see the next block for
   the perpendicular-axis offsets. */
.pict-modal-shell-panel-left:hover  > .pict-modal-shell-panel-collapse-tab,
.pict-modal-shell-panel-left  > .pict-modal-shell-panel-collapse-tab:hover
{
	width: 18px; height: 36px; right: -18px;
}
.pict-modal-shell-panel-right:hover > .pict-modal-shell-panel-collapse-tab,
.pict-modal-shell-panel-right > .pict-modal-shell-panel-collapse-tab:hover
{
	width: 18px; height: 36px; left: -18px;
}
.pict-modal-shell-panel-top:hover    > .pict-modal-shell-panel-collapse-tab,
.pict-modal-shell-panel-top    > .pict-modal-shell-panel-collapse-tab:hover
{
	width: 36px; height: 18px; bottom: -18px;
}
.pict-modal-shell-panel-bottom:hover > .pict-modal-shell-panel-collapse-tab,
.pict-modal-shell-panel-bottom > .pict-modal-shell-panel-collapse-tab:hover
{
	width: 36px; height: 18px; top: -18px;
}

.pict-modal-shell-panel-collapse-tab-title { display: none; white-space: nowrap; }

/* Auto-generated chevron glyph inside the tab — only visible once the
   tab is wide / tall enough to show it (i.e. hover state, or when the
   panel is collapsed). Direction follows side + state.
   Sized 5×5 (down from 6) so even with rotation the visual stays
   well clear of the tab's overflow:hidden bounds at 18×36 hover and
   the 24px collapsed tab strip width. flex-shrink:0 ensures the
   pseudo never collapses to zero in tight tab dimensions. */
.pict-modal-shell-panel-collapse-tab::before
{
	content: '';
	display: block;
	width: 5px; height: 5px;
	flex-shrink: 0;
	opacity: 0;
	border-right: 1.5px solid currentColor;
	border-bottom: 1.5px solid currentColor;
	transform: rotate(135deg);
	transform-origin: center center;
	transition: opacity 160ms ease, transform 160ms ease;
}
.pict-modal-shell-panel:hover > .pict-modal-shell-panel-collapse-tab::before,
.pict-modal-shell-panel-collapse-tab:hover::before,
.pict-modal-shell-panel-collapsed > .pict-modal-shell-panel-collapse-tab::before
{
	opacity: 1;
}
.pict-modal-shell-panel-right                                       > .pict-modal-shell-panel-collapse-tab::before { transform: rotate(-45deg); }
.pict-modal-shell-panel-top                                         > .pict-modal-shell-panel-collapse-tab::before { transform: rotate(-135deg); }
.pict-modal-shell-panel-bottom                                      > .pict-modal-shell-panel-collapse-tab::before { transform: rotate(45deg); }
.pict-modal-shell-panel-left.pict-modal-shell-panel-collapsed       > .pict-modal-shell-panel-collapse-tab::before { transform: rotate(-45deg); }
.pict-modal-shell-panel-right.pict-modal-shell-panel-collapsed      > .pict-modal-shell-panel-collapse-tab::before { transform: rotate(135deg); }
.pict-modal-shell-panel-top.pict-modal-shell-panel-collapsed        > .pict-modal-shell-panel-collapse-tab::before { transform: rotate(45deg); }
.pict-modal-shell-panel-bottom.pict-modal-shell-panel-collapsed     > .pict-modal-shell-panel-collapse-tab::before { transform: rotate(-135deg); }

/* Collapsed state — content disappears, only the collapse tab remains. */
.pict-modal-shell-panel-collapsed > .pict-modal-shell-panel-content
{
	display: none;
}
.pict-modal-shell-panel-collapsed > .pict-modal-shell-panel-resize-handle
{
	display: none;
}
.pict-modal-shell-panel-left.pict-modal-shell-panel-collapsed,
.pict-modal-shell-panel-right.pict-modal-shell-panel-collapsed
{
	/* When collapsed, side panels rotate the title for vertical reading. */
	overflow: hidden;
}
/* When collapsed: the entire panel becomes the tab strip — full width
   for sides, full height for top/bottom — with the title visible
   vertically (sides) or horizontally (top/bottom). The little sliver
   tab on the boundary disappears (we don't need it anymore — clicking
   anywhere on the panel toggles it back open). */
.pict-modal-shell-panel-left.pict-modal-shell-panel-collapsed,
.pict-modal-shell-panel-right.pict-modal-shell-panel-collapsed,
.pict-modal-shell-panel-top.pict-modal-shell-panel-collapsed,
.pict-modal-shell-panel-bottom.pict-modal-shell-panel-collapsed
{
	overflow: hidden;
}
.pict-modal-shell-panel-collapsed > .pict-modal-shell-panel-collapse-tab
{
	/* Promote the tab to FILL the collapsed panel (not just hug its
	   content) so the centered chevron + title group sits in the middle
	   of the panel. Without explicit width/height: 100%, the position:
	   absolute element shrinks to its natural content size and the
	   group ends up flush at the top of the panel — where the chevron
	   gets clipped by the topbar. */
	position: absolute !important;
	top: 0 !important; right: 0 !important; bottom: 0 !important; left: 0 !important;
	width: 100% !important;
	height: 100% !important;
	border: 0;
	border-radius: 0;
	background: transparent;
	opacity: 0.85;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	padding: 12px 4px;        /* keeps chevron + title clear of edges */
	box-shadow: none;
	color: var(--theme-color-text-muted, #6b7280);
	box-sizing: border-box;
	overflow: hidden;
}
.pict-modal-shell-panel-collapsed > .pict-modal-shell-panel-collapse-tab:hover
{
	background: var(--theme-color-background-hover, var(--pict-modal-bg, #fff));
	color: var(--brand-color-primary-mode, var(--theme-color-brand-primary, #2563eb));
	box-shadow: none;
}
/* Side panels (collapsed): rotate the title for vertical reading. */
.pict-modal-shell-panel-left.pict-modal-shell-panel-collapsed   > .pict-modal-shell-panel-collapse-tab,
.pict-modal-shell-panel-right.pict-modal-shell-panel-collapsed  > .pict-modal-shell-panel-collapse-tab
{
	writing-mode: vertical-rl;
	text-orientation: mixed;
}
.pict-modal-shell-panel-collapsed .pict-modal-shell-panel-collapse-tab-title
{
	display: inline;
}

/* Hidden panels — when Hidden:true is passed to addPanel, the collapsed
   state has zero footprint: no collapse tab (the tab is never built),
   the panel root is display:none, and the resize handle vanishes. The
   only path to the open state is a programmatic expand()/toggle() from
   somewhere else in the app (e.g. a topbar gear button). When expanded,
   the panel renders normally — so resize/drag handles continue to work
   while the panel is open. */
.pict-modal-shell-panel-hidden.pict-modal-shell-panel-collapsed
{
	display: none !important;
}

/* Overlay panels — float over the middle row instead of taking layout
   space. The overlay layer is positioned absolutely inside the middle
   row; individual overlay panels stack with positive z-index. */
.pict-modal-shell-overlay-layer
{
	position: absolute;
	inset: 0;
	pointer-events: none;
	z-index: 10;
}
.pict-modal-shell-overlay-layer .pict-modal-shell-panel
{
	pointer-events: auto;
	position: absolute;
	box-shadow: 0 4px 24px rgba(0, 0, 0, 0.18);
}
.pict-modal-shell-overlay-layer .pict-modal-shell-panel-left   { left:   0; top: 0; bottom: 0; }
.pict-modal-shell-overlay-layer .pict-modal-shell-panel-right  { right:  0; top: 0; bottom: 0; }
.pict-modal-shell-overlay-layer .pict-modal-shell-panel-top    { top:    0; left: 0; right: 0; }
.pict-modal-shell-overlay-layer .pict-modal-shell-panel-bottom { bottom: 0; left: 0; right: 0; }

/* ─────────────────────────────────────────────────────────────────
   Responsive drawer mode — .pict-modal-shell-drawer-active toggles
   onto the middle row when any panel with ResponsiveDrawer crosses
   below its breakpoint. Flips the row's flex-direction from row to
   column, stacking side panels above the center and stretching them
   to full width. Each opted-in panel itself gets the
   .pict-modal-shell-panel-drawer class so per-panel rules below
   target only the drawer-mode panels (right + non-drawer panels in
   the same row are unaffected). The drawer height is read from a
   per-panel --pict-modal-drawer-height CSS variable (default
   33vh, set in JS from the DrawerHeight option).
   ───────────────────────────────────────────────────────────────── */
.pict-modal-shell-row-middle.pict-modal-shell-drawer-active
{
	flex-direction: column;
	/* The drawer tab lives outside the drawer's bottom edge — ancestor
	   chain MUST allow it to escape clip. */
	overflow: visible;
}
.pict-modal-shell-row-middle.pict-modal-shell-drawer-active .pict-modal-shell-side
{
	/* Side stacks stretch full-width and lay out their panels as a
	   horizontal row of stacked drawers (so two drawers from the same
	   side don't end up overlapping). overflow: visible so the
	   per-panel tab can extend below the side stack into the workspace. */
	width: 100% !important;
	flex-direction: column;
	overflow: visible;
}
/* The drawer-tagged panel itself: kill the inline width set by
   _applySize (we override with !important since the inline style has
   higher specificity than a class selector), then size by height
   from the CSS variable. Resize handle is hidden in drawer mode
   because horizontal dragging doesn't translate to vertical sizing
   and the user already has the collapse tab to dismiss / restore.

   padding-bottom reserves an 18px strip at the bottom of the panel
   for the tab. The tab sits INSIDE the drawer's footprint — never
   below it — so the workspace header below the drawer is never in
   the same vertical band as the tab. (Previously the tab hung
   below the drawer's bottom edge into the workspace's top padding;
   that made the tab visually compete with the workspace header,
   even when the tab box-model bounds technically cleared the
   header.) box-sizing: border-box so the padding eats from the
   33vh, not adding to it. */
.pict-modal-shell-panel-drawer
{
	width: 100% !important;
	max-width: 100% !important;
	height: var(--pict-modal-drawer-height, 33vh);
	transition: height 140ms ease;
	padding-bottom: 18px;
	box-sizing: border-box;
	overflow: visible !important;
	/* Clip the panel bg to its CONTENT area only — the 18px
	   padding-bottom reserve (where the tab lives) becomes
	   transparent, so the middle row's primary background shows
	   through. Without this the reserve would render with the
	   panel's chrome bg, creating a visible "strip" between the
	   drawer content above and the workspace below — the tab would
	   look like it's sitting on its own miscoloured band rather
	   than at the seam between drawer and workspace. */
	background-clip: content-box;
}
.pict-modal-shell-panel-drawer.pict-modal-shell-panel-collapsed
{
	/* Collapsed = "just the tab strip is visible". 18px matches the
	   panel's tab reserve so the height is consistent across states.
	   When this is 0 the tab would have nowhere to render and the
	   user couldn't reopen the drawer. */
	height: 18px !important;
	padding-bottom: 0 !important;
	/* Drop the panel's bg in collapsed state — without this the 18px
	   strip shows the --pict-modal-bg (panel chrome) which doesn't
	   match the workspace --theme-color-background-primary below it,
	   creating a visible "drawer band" around the tab that breaks the
	   illusion of the tab belonging to the workspace area. With
	   transparent bg the middle row's primary background shows
	   through, the strip blends with the workspace, and the tab pill
	   reads as a free-floating handle. */
	background: transparent !important;
}
.pict-modal-shell-panel-drawer > .pict-modal-shell-panel-resize-handle
{
	display: none;
}
/* The drawer's collapse tab is a horizontal pill protruding from the
   bottom of the drawer (rather than the inner edge of a side panel).
   Override the side-panel positioning rules from above so the tab
   always sits at the drawer's bottom-center seam, in both expanded
   and collapsed states. The expand-from-zero affordance: when
   collapsed (height: 0), the tab still hangs below "where the
   drawer would be" — a small handle the user can click to pull
   the drawer back down. */
.pict-modal-shell-panel-drawer > .pict-modal-shell-panel-collapse-tab,
.pict-modal-shell-panel-drawer.pict-modal-shell-panel-collapsed > .pict-modal-shell-panel-collapse-tab
{
	position: absolute !important;
	/* Anchored to the panel's BOTTOM edge — the tab lives INSIDE the
	   drawer's footprint (in the 18px reserve at the bottom), never
	   below it into the workspace. This means the workspace below
	   the drawer is never sharing a vertical band with the tab, so
	   the workspace header doesn't optically compete with it.
	   bottom: 4px aligns the tab's top edge exactly with the panel's
	   CONTENT-AREA bottom (panel.height − padding-bottom 18px). With
	   border-top: 0 on the tab, the seam between the drawer content
	   above and the tab body is invisible — they share --pict-modal-bg
	   and merge into one shape, the tab reading as a labelled
	   extension of the drawer hanging downward. Collapsed state
	   keeps the smaller offset (overridden below) because its panel
	   has no padding-bottom, so the math doesn't apply. */
	top: auto !important;
	bottom: 4px !important;
	left: 50% !important;
	right: auto !important;
	transform: translate(-50%, 0) !important;
	width: 64px !important;
	height: 14px !important;
	/* CRITICAL: border-box + padding: 0 — the collapsed-state base
	   rule inherits "padding: 12px 4px" (so the chevron clears the
	   edges of a tab that fills a 24px-wide side strip). In drawer
	   mode the tab is a 14px tall pill, NOT a strip-fill, so that
	   12px vertical padding would balloon the tab's outer height to
	   ~38px and crash into the workspace header text. The chevron
	   is centered via flex anyway. */
	box-sizing: border-box !important;
	padding: 0 !important;
	/* Rounded BOTTOM corners + no top border — the tab looks like a
	   traditional drawer-handle/tab hanging from above. Its rounded
	   bottom curves face the workspace (the "open downward" affordance
	   for a top drawer). border-top: 0 lets the tab visually merge
	   with whatever's directly above it inside the panel (sidebar
	   content when expanded, the panel background when collapsed). */
	border-radius: 0 0 8px 8px;
	border: 1px solid var(--pict-modal-border, var(--theme-color-border-default, #cfd5dd));
	border-top: 0;
	background: var(--pict-modal-bg, var(--theme-color-background-panel, #fff));
	opacity: 0.95;
	z-index: 20;
	/* The default side-panel hover-grow values would yank the tab off
	   to the wrong spot in drawer mode — neutralise. */
	display: flex;
	align-items: center;
	justify-content: center;
}
.pict-modal-shell-panel-drawer > .pict-modal-shell-panel-collapse-tab:hover,
.pict-modal-shell-panel-drawer.pict-modal-shell-panel-collapsed > .pict-modal-shell-panel-collapse-tab:hover
{
	opacity: 1;
	width: 96px !important;
	/* height stays at 14px — the tab is anchored with bottom, so any
	   height growth would push the tab's TOP edge UPWARD past the
	   space available above it. In EXPANDED state that crashes into
	   the drawer content above; in COLLAPSED state it crashes into
	   the topbar's brand stripes. Width-only growth (64 to 96, +50%)
	   still gives the "tab is reaching toward me" affordance without
	   the encroachment. */
	color: var(--brand-color-primary-mode, var(--theme-color-brand-primary, #2563eb));
	border-color: var(--brand-color-primary-mode, var(--theme-color-brand-primary, #2563eb));
	box-shadow: 0 3px 6px -2px rgba(0, 0, 0, 0.18);
}
/* Collapsed-state bottom-offset override. Expanded panels have an
   18px padding-bottom reserve, and "bottom: 4px" anchors the tab's
   top edge exactly at the content-area boundary (so it merges
   visually with the drawer above). Collapsed panels have
   padding-bottom: 0 and a total height of 18px — "bottom: 4px"
   there would put the tab's top at the panel's actual top edge,
   crashing the (border-top: 0) tab into the topbar. The smaller
   "bottom: 2px" keeps the 14px tab vertically centered in the 18px
   strip with 2px margins on either side. */
.pict-modal-shell-panel-drawer.pict-modal-shell-panel-collapsed > .pict-modal-shell-panel-collapse-tab
{
	bottom: 2px !important;
}
/* Chevron inside the tab: point UP when expanded (the drawer
   collapses UP / out of view, so the arrow indicates "click me to
   send the drawer up"), DOWN when collapsed (the drawer expands DOWN
   into view). Rotations come from the existing top-panel chevron
   table: rotate(-135deg) → UP arrow, rotate(45deg) → DOWN arrow. */
.pict-modal-shell-panel-drawer > .pict-modal-shell-panel-collapse-tab::before
{
	transform: rotate(-135deg) !important;
}
.pict-modal-shell-panel-drawer.pict-modal-shell-panel-collapsed > .pict-modal-shell-panel-collapse-tab::before
{
	transform: rotate(45deg) !important;
}
/* The collapse tab's existing title-text span is hidden when reduced
   to a pill — there's no horizontal room. The chevron alone reads
   correctly. */
.pict-modal-shell-panel-drawer > .pict-modal-shell-panel-collapse-tab .pict-modal-shell-panel-collapse-tab-title,
.pict-modal-shell-panel-drawer > .pict-modal-shell-panel-collapse-tab .pict-modal-shell-panel-collapse-tab-icon
{
	display: none;
}

/* Drag-active state — disable text selection + change cursor globally
   so resize feels solid even when the cursor briefly leaves the handle. */
.pict-modal-shell-dragging-x, .pict-modal-shell-dragging-y { user-select: none; }
.pict-modal-shell-dragging-x * { cursor: col-resize !important; }
.pict-modal-shell-dragging-y * { cursor: row-resize !important; }

/* Per-panel resize-active state — kills the panel's collapse/expand
   width/height transition for the duration of a drag. Without this,
   every pointermove starts a fresh 140 ms transition and the resize
   visibly lags behind the cursor ("choppy"). With it disabled the
   panel snaps to the new size on the same frame as the pointer, which
   feels native. */
.pict-modal-shell-panel-resizing { transition: none !important; }
.pict-modal-shell-panel-resizing > .pict-modal-shell-panel-resize-handle
{
	background: var(--brand-color-primary-mode, var(--theme-color-brand-primary, #2563eb));
	opacity: 0.5;
}

/* Panel popup-attention flash — fires when popup() is called on an
   already-open panel. Brief brand-colored inset glow so the user sees
   that their click landed even though the panel didn't change shape.
   Class is added by the shell, auto-removed after ~700 ms. */
@keyframes pict-modal-shell-panel-flash
{
	0%   { box-shadow: inset 0 0 0 0 transparent; }
	30%  { box-shadow: inset 0 0 0 3px var(--brand-color-primary-mode, var(--theme-color-brand-primary, #2563eb)); }
	100% { box-shadow: inset 0 0 0 0 transparent; }
}
.pict-modal-shell-panel-flash
{
	animation: pict-modal-shell-panel-flash 600ms ease-out;
}
`};},{}],27:[function(require,module,exports){const libPictViewClass=require('pict-view');const libPictModalOverlay=require('./Pict-Modal-Overlay.js');const libPictModalConfirm=require('./Pict-Modal-Confirm.js');const libPictModalWindow=require('./Pict-Modal-Window.js');const libPictModalToast=require('./Pict-Modal-Toast.js');const libPictModalTooltip=require('./Pict-Modal-Tooltip.js');const libPictModalPanel=require('./Pict-Modal-Panel.js');const libPictModalDropdown=require('./Pict-Modal-Dropdown.js');const libPictModalShell=require('./Pict-Modal-Shell.js');const _DefaultConfiguration=require('./Pict-Section-Modal-DefaultConfiguration.js');class PictSectionModal extends libPictViewClass{constructor(pFable,pOptions,pServiceHash){let tmpOptions=Object.assign({},_DefaultConfiguration,pOptions);super(pFable,tmpOptions,pServiceHash);this._activeModals=[];this._activeTooltips=[];this._activeToasts=[];this._idCounter=0;this._overlay=new libPictModalOverlay(this);this._confirm=new libPictModalConfirm(this);this._window=new libPictModalWindow(this);this._toast=new libPictModalToast(this);this._tooltip=new libPictModalTooltip(this);this._panel=new libPictModalPanel(this);this._dropdown=new libPictModalDropdown(this);this._shell=new libPictModalShell(this);}onBeforeInitialize(){super.onBeforeInitialize();// Ensure the root class is on the body for CSS variable scoping
if(typeof document!=='undefined'&&document.body){if(!document.body.classList.contains('pict-modal-root')){document.body.classList.add('pict-modal-root');}}return super.onBeforeInitialize();}/**
	 * Generate a unique ID for DOM elements.
	 *
	 * @returns {number}
	 */_nextId(){this._idCounter++;return this._idCounter;}// -- Confirm API --
/**
	 * Show a confirmation dialog.
	 *
	 * @param {string} pMessage - The confirmation message
	 * @param {object} [pOptions] - Options { title, confirmLabel, cancelLabel, dangerous }
	 * @returns {Promise<boolean>}
	 */confirm(pMessage,pOptions){return this._confirm.confirm(pMessage,pOptions);}/**
	 * Show a two-step confirmation dialog.
	 *
	 * If confirmPhrase is set, the user must type it to enable the confirm button.
	 * If no confirmPhrase, the first click changes the button text and the second click confirms.
	 *
	 * @param {string} pMessage - The confirmation message
	 * @param {object} [pOptions] - Options { title, confirmPhrase, phrasePrompt, confirmLabel, cancelLabel }
	 * @returns {Promise<boolean>}
	 */doubleConfirm(pMessage,pOptions){return this._confirm.doubleConfirm(pMessage,pOptions);}// -- Modal Window API --
/**
	 * Show a custom modal window.
	 *
	 * @param {object} [pOptions] - Options { title, content, buttons, closeable, width, onOpen, onClose }
	 * @returns {Promise<string|null>} Resolves with the clicked button Hash, or null on close
	 */show(pOptions){return this._window.show(pOptions);}// -- Tooltip API --
/**
	 * Attach a simple text tooltip to an element.
	 *
	 * @param {HTMLElement} pElement - Target element
	 * @param {string} pText - Tooltip text
	 * @param {object} [pOptions] - Options { position, delay, maxWidth }
	 * @returns {{ destroy: function }}
	 */tooltip(pElement,pText,pOptions){return this._tooltip.tooltip(pElement,pText,pOptions);}/**
	 * Attach a rich HTML tooltip to an element.
	 *
	 * @param {HTMLElement} pElement - Target element
	 * @param {string} pHTMLContent - HTML content
	 * @param {object} [pOptions] - Options { position, delay, maxWidth, interactive }
	 * @returns {{ destroy: function }}
	 */richTooltip(pElement,pHTMLContent,pOptions){return this._tooltip.richTooltip(pElement,pHTMLContent,pOptions);}/**
	 * Attach a pinnable rich HTML tooltip to an element. Hover/focus behaves
	 * like richTooltip(); a click on the element toggles a pinned state that
	 * keeps the tooltip open and follows the anchor on scroll/resize.
	 *
	 * @param {HTMLElement} pElement - Target element
	 * @param {string} pHTMLContent - HTML content
	 * @param {object} [pOptions] - Options { position, delay, maxWidth, interactive, startPinned, onPinChange }
	 * @returns {{ destroy: function, pin: function, unpin: function, isPinned: function }}
	 */pinnableTooltip(pElement,pHTMLContent,pOptions){return this._tooltip.pinnableTooltip(pElement,pHTMLContent,pOptions);}// -- Toast API --
/**
	 * Show a toast notification.
	 *
	 * @param {string} pMessage - Toast message
	 * @param {object} [pOptions] - Options { type, duration, position, dismissible }
	 * @returns {{ dismiss: function }}
	 */toast(pMessage,pOptions){return this._toast.toast(pMessage,pOptions);}// -- Dropdown API --
/**
	 * Open an anchor-positioned dropdown menu (no backdrop, click-outside
	 * dismisses). Useful for nav menus and split-button addenda. Pass
	 * `ContentHTML` instead of `items` to render a free-form anchored popover
	 * (rich card, pre-rendered template menu) with the same dismiss/flip behavior.
	 *
	 * @param {HTMLElement|string|object} pAnchor - Element, CSS selector, or
	 *   { left, top, width, height } rect for context-menu style anchoring.
	 * @param {object} pOptions - { items | ContentHTML, align, position, minWidth,
	 *   maxWidth, maxHeight, className, closeOnSelect, onSelect, onClose }
	 * @returns {Promise<{Hash, Item}|null>} Selection or null on dismiss
	 *   (always resolves null in ContentHTML mode).
	 */dropdown(pAnchor,pOptions){return this._dropdown.dropdown(pAnchor,pOptions);}/**
	 * Dismiss any open dropdown.
	 */dismissDropdowns(){this._dropdown.dismissAll();}// -- Panel API --
/**
	 * Attach resizable/collapsible panel behavior to a DOM element.
	 *
	 * @param {string} pTargetSelector - CSS selector for the panel element
	 * @param {object} [pOptions] - Options { position, width, minWidth, maxWidth, collapsible, collapsed, persist, persistKey, onResize, onToggle }
	 * @returns {{ collapse, expand, toggle, setWidth, destroy }} Panel handle
	 */panel(pTargetSelector,pOptions){return this._panel.create(pTargetSelector,pOptions);}// -- Shell API --
/**
	 * Get (or create) a layout shell for a viewport. Idempotent.
	 *
	 * The shell takes ownership of the viewport's contents and manages
	 * top / right / bottom / left panel placement plus a center area.
	 * See Pict-Modal-Shell.js for full panel-config semantics.
	 *
	 * @param {string|HTMLElement} pViewport - selector or element of the
	 *   container the shell should fill (commonly the app's root div).
	 * @param {object} [pOptions]
	 * @param {boolean} [pOptions.Persistence=true]   - autosave panel state to localStorage
	 * @param {string}  [pOptions.PersistenceKey=null]- override scope (default: hostname)
	 * @returns {PictModalShell}
	 */shell(pViewport,pOptions){return this._shell.shell(pViewport,pOptions);}// -- Cleanup API --
/**
	 * Dismiss all open modals.
	 */dismissModals(){let tmpModals=this._activeModals.slice();for(let i=tmpModals.length-1;i>=0;i--){tmpModals[i].dismiss(null);}}/**
	 * Dismiss all active tooltips.
	 */dismissTooltips(){this._tooltip.dismissAll();}/**
	 * Dismiss all active toasts.
	 */dismissToasts(){this._toast.dismissAll();}/**
	 * Dismiss everything: modals, tooltips, and toasts.
	 */dismissAll(){this.dismissModals();this.dismissTooltips();this.dismissToasts();this.dismissDropdowns();}/**
	 * Clean up all DOM elements when the view is destroyed.
	 *//**
	 * Destroy all active panels.
	 */destroyPanels(){this._panel.destroyAll();}destroy(){this.dismissAll();this.destroyPanels();this._overlay.destroy();this._toast.destroy();if(typeof super.destroy==='function'){return super.destroy();}}}module.exports=PictSectionModal;module.exports.default_configuration=_DefaultConfiguration;},{"./Pict-Modal-Confirm.js":18,"./Pict-Modal-Dropdown.js":19,"./Pict-Modal-Overlay.js":20,"./Pict-Modal-Panel.js":21,"./Pict-Modal-Shell.js":22,"./Pict-Modal-Toast.js":23,"./Pict-Modal-Tooltip.js":24,"./Pict-Modal-Window.js":25,"./Pict-Section-Modal-DefaultConfiguration.js":26,"pict-view":89}],28:[function(require,module,exports){/**
 * pict-section-theme — entry point.
 *
 * Bundles every Retold-ecosystem theme and exposes five reusable views:
 *
 *   - Theme-Picker      : a custom dropdown listing every registered theme,
 *                         grouped by category, with inline SVG mode-glyphs.
 *                         Switches the active theme on change.
 *   - Theme-ModeToggle  : a 3-button toggle for Light / Dark / System mode.
 *                         Disables itself when the active theme is single-mode.
 *   - Theme-ScaleSelect : a dropdown of viewport scale presets (75% – 200%).
 *                         Independent of theme bundles — applied via CSS
 *                         `zoom` on <html> + a `--theme-scale` custom prop.
 *   - Theme-Button      : an embeddable SVG topbar button that, when clicked,
 *                         opens a pict-section-modal containing the picker,
 *                         the mode toggle, and the scale select. Designed to
 *                         drop into any application chrome.
 *   - Theme-BrandStrip  : the per-app brand signature (icon + name + two
 *                         color stripes). Driven by libThemeBrand which the
 *                         host configures via the `Brand` option.
 *
 * # Recommended consumption (Pict provider)
 *
 * Add the section as a Pict provider — it self-bootstraps on construction:
 *
 *     const libPictSectionTheme = require('pict-section-theme');
 *
 *     pict.addProvider('Theme-Section',
 *     {
 *         ApplyDefault: 'retold-default',
 *         DefaultMode:  'system',
 *         DefaultScale: 1.0,
 *         Brand:        libRetoldManagerBrand
 *     }, libPictSectionTheme);
 *
 * That single addProvider call:
 *   - Ensures `pict.providers.Theme` (the underlying pict-provider-theme
 *     runtime) exists.
 *   - Registers every theme in the runtime registry — bundled starter set
 *     plus anything the host registered via `Catalog.register()`.
 *   - Adds Theme-Picker / Theme-ModeToggle / Theme-ScaleSelect /
 *     Theme-Button / Theme-BrandStrip to `pict.views[...]`.
 *   - Hydrates persisted choices from localStorage; otherwise applies the
 *     supplied `ApplyDefault` / `DefaultMode` / `DefaultScale`.
 *   - Wires the `onApply` save handler so subsequent user picks persist.
 *   - Applies the supplied Brand block if one was provided.
 *
 * # Runtime theme registration
 *
 * The bundled starter set lives in `themes/_catalog.js`. To add custom
 * themes (e.g. a host app's own brand palette, or a remote bundle from
 * a "theme garden") use the registry:
 *
 *     const libCatalog = require('pict-section-theme').Catalog;
 *     libCatalog.register({ Hash: 'my-theme', Bundle: require('./mine.json'), Category: 'App' });
 *     // Or, async, from a URL:
 *     await libCatalog.registerFromURL('https://garden.example.com/themes/foo.json');
 *
 * Themes registered before `addProvider()` runs are picked up
 * automatically. Themes registered after must be manually pushed via
 * `pict.providers.Theme.registerTheme(bundle)`.
 *
 * # Persistence
 *
 * Persisting active theme + mode + scale to localStorage is on by
 * default. Storage key is scoped to `window.location.hostname` so apps
 * on different hosts keep independent state. Override with
 * `PersistenceKey: 'my-app'`. Pass `Persistence: false` to disable.
 *
 * A saved entry takes precedence over `ApplyDefault` — once a user has
 * picked a theme, reloads honour that pick instead of the host's
 * default. If the saved theme hash is no longer in the registry (theme
 * removed, app downgraded), the bootstrap falls back to `ApplyDefault`
 * cleanly.
 *
 * # Legacy API
 *
 * `install(pict, options)` and `registerCatalog(pict)` are still
 * exported as thin shims that delegate to the provider — existing apps
 * keep working without changes.
 */'use strict';const libPictProvider=require('pict-provider');const libPictProviderTheme=require('pict-provider-theme');const libPickerView=require('./views/PictView-Theme-Picker.js');const libModeToggleView=require('./views/PictView-Theme-ModeToggle.js');const libScaleSelectView=require('./views/PictView-Theme-ScaleSelect.js');const libButtonView=require('./views/PictView-Theme-Button.js');const libBrandStripView=require('./views/PictView-Theme-BrandStrip.js');const libBrandMarkView=require('./views/PictView-Theme-Brand-Mark.js');const libTopBarView=require('./views/PictView-Theme-TopBar.js');const libBottomBarView=require('./views/PictView-Theme-BottomBar.js');const libThemePersistence=require('./Theme-Persistence.js');const libThemeScale=require('./Theme-Scale.js');const libThemeBrand=require('./Theme-Brand.js');// Theme-Logo (the deterministic name → SVG generator) is intentionally
// NOT required here. It's a build-time tool used by
// `pict-section-theme-brand` to precompute brand blocks into a host's
// package.json — there's no reason for it to ride along in the runtime
// bundle every host ships. Hosts that want runtime generation can
// `require('pict-section-theme/source/Theme-Logo.js')` directly; that
// keeps the import explicit and the cost opt-in.
const libCatalog=require('./themes/_catalog.js');// View registry: short-name → { lib, hash } where hash is the
// ViewIdentifier the view registers under in pict.views[...].
const _Views={Picker:{lib:libPickerView,hash:'Theme-Picker'},ModeToggle:{lib:libModeToggleView,hash:'Theme-ModeToggle'},ScaleSelect:{lib:libScaleSelectView,hash:'Theme-ScaleSelect'},Button:{lib:libButtonView,hash:'Theme-Button'},BrandStrip:{lib:libBrandStripView,hash:'Theme-BrandStrip'},BrandMark:{lib:libBrandMarkView,hash:'Theme-Brand-Mark'},TopBar:{lib:libTopBarView,hash:'Theme-TopBar'},BottomBar:{lib:libBottomBarView,hash:'Theme-BottomBar'}};const _ProviderConfiguration={ProviderIdentifier:'Theme-Section',// Don't auto-fire the standard pict-provider initialize chain — we do
// our setup work synchronously in the constructor so consumers can
// use the views immediately after addProvider() returns.
AutoInitialize:false,// Bootstrap config — same shape as the legacy install() options.
ApplyDefault:null,// theme hash to apply at boot
DefaultMode:null,// 'light' | 'dark' | 'system' | null (theme's default)
DefaultScale:null,// 0.75 .. 2.0 — viewport scale
Persistence:true,PersistenceKey:null,// null → window.location.hostname
RegisterCatalog:true,Views:null,// null → all views; or array of short-names
ViewOptions:null,// { Picker: { ... }, ... } per-view overrides
Brand:null,// { Name, Icon, Colors: { Primary, ... } }
ProviderOptions:null// pict-provider-theme overrides if a host wants them
};// ── Helpers ──────────────────────────────────────────────────────────────
/**
 * Iterate the runtime registry and call provider.registerTheme() for each
 * entry. Safe to call before or after addProvider — the runtime's
 * registerTheme is idempotent on repeat hashes.
 *
 * @param {object} pPict - a Pict instance with the Theme runtime attached
 * @returns {number} count of themes registered
 */function registerCatalog(pPict){if(!pPict||!pPict.providers||!pPict.providers.Theme){if(pPict&&pPict.log&&pPict.log.warn){pPict.log.warn('pict-section-theme.registerCatalog: pict.providers.Theme not found — register the runtime first');}return 0;}let tmpProvider=pPict.providers.Theme;let tmpEntries=libCatalog.list();let tmpCount=0;for(let i=0;i<tmpEntries.length;i++){if(tmpProvider.registerTheme(tmpEntries[i].Bundle)){tmpCount++;}}return tmpCount;}/**
 * Return the registry as picker-friendly metadata (no Bundle payload).
 *
 * @returns {Array<{Hash, Name, Category, Strategy, DefaultMode, IsDefault}>}
 */function listCatalog(){let tmpEntries=libCatalog.list();let tmpList=[];for(let i=0;i<tmpEntries.length;i++){let tmpEntry=tmpEntries[i];let tmpBundle=tmpEntry.Bundle||{};let tmpModes=tmpBundle.Modes||{};tmpList.push({Hash:tmpEntry.Hash,Name:tmpBundle.Name||tmpEntry.Hash,Category:tmpEntry.Category||'Other',Strategy:tmpModes.Strategy||'single',DefaultMode:tmpModes.Default||'light',IsDefault:!!tmpEntry.IsDefault});}return tmpList;}// Resolve the canonical fallback theme hash from the catalog: the entry
// flagged IsDefault, or — if no entry is flagged — the first registered
// entry, or null if the catalog is empty. Used as the last-resort boot
// theme when nothing else resolved (no ApplyDefault, no saved state, or
// a saved hash that's been removed from the catalog).
function _resolveCatalogDefault(){let tmpEntries=libCatalog.list();if(!tmpEntries||tmpEntries.length===0)return null;for(let i=0;i<tmpEntries.length;i++){if(tmpEntries[i].IsDefault)return tmpEntries[i].Hash;}return tmpEntries[0].Hash;}// ── Bootstrap routine ────────────────────────────────────────────────────
// Shared between the provider class (new path) and the install() function
// (legacy path). Performs the actual wiring against a Pict instance.
function _bootstrap(pPict,pOptions){if(!pPict||typeof pPict.addProvider!=='function'){throw new Error('pict-section-theme: requires a Pict instance');}let tmpOptions=pOptions||{};// 1. Theme runtime — only add if not already attached (hosts with
//    a custom runtime, e.g. retold-remote's V2 bridge, pre-register).
if(!pPict.providers||!pPict.providers.Theme){let tmpRuntimeOpts=Object.assign({},libPictProviderTheme.default_configuration,tmpOptions.ProviderOptions||{});pPict.addProvider('Theme',tmpRuntimeOpts,libPictProviderTheme);}// 2. Catalog — every entry from the runtime registry, unless the host
//    asked to skip (RegisterCatalog: false).
if(tmpOptions.RegisterCatalog!==false){registerCatalog(pPict);}// 3. Views — default all five; pass an array to subset.
let tmpViewNames=Array.isArray(tmpOptions.Views)?tmpOptions.Views:Object.keys(_Views);for(let i=0;i<tmpViewNames.length;i++){let tmpEntry=_Views[tmpViewNames[i]];if(!tmpEntry){if(pPict.log&&pPict.log.warn){pPict.log.warn('pict-section-theme: unknown view name "'+tmpViewNames[i]+'" — skipped');}continue;}if(pPict.views&&pPict.views[tmpEntry.hash]){// Already registered — skip silently.
continue;}let tmpViewOpts=Object.assign({},tmpEntry.lib.default_configuration,tmpOptions.ViewOptions&&tmpOptions.ViewOptions[tmpViewNames[i]]||{});pPict.addView(tmpEntry.hash,tmpViewOpts,tmpEntry.lib);}// 4. Persistence + initial apply.
let tmpProvider=pPict.providers.Theme;let tmpPersistenceEnabled=tmpOptions.Persistence!==false;let tmpPersistenceKey=null;let tmpBootHash=tmpOptions.ApplyDefault||null;let tmpBootMode=tmpOptions.DefaultMode||null;let tmpBootScale=typeof tmpOptions.DefaultScale==='number'?tmpOptions.DefaultScale:null;if(tmpPersistenceEnabled&&tmpProvider){tmpPersistenceKey=libThemePersistence.resolveKey(tmpOptions.PersistenceKey);let tmpSaved=libThemePersistence.load(tmpPersistenceKey);if(tmpSaved&&tmpSaved.ThemeHash&&typeof tmpProvider.getTheme==='function'&&tmpProvider.getTheme(tmpSaved.ThemeHash)){tmpBootHash=tmpSaved.ThemeHash;if(tmpSaved.Mode){tmpBootMode=tmpSaved.Mode;}if(tmpSaved.Scale){tmpBootScale=tmpSaved.Scale;}}else if(tmpSaved&&tmpSaved.Scale){tmpBootScale=tmpSaved.Scale;}// Single save snapshot — both the provider listener and the scale
// listener call this so any change persists the full set.
let tmpSaveCurrent=function(){let tmpActive=typeof tmpProvider.getActiveTheme==='function'?tmpProvider.getActiveTheme():{Hash:null,Mode:null};libThemePersistence.save(tmpPersistenceKey,{ThemeHash:tmpActive.Hash,Mode:tmpActive.Mode,Scale:libThemeScale.getActive()});};tmpProvider.onApply(tmpSaveCurrent);libThemeScale.onChange(tmpSaveCurrent);}// If nothing resolved a theme hash (no ApplyDefault, no saved state, or
// a saved hash that's no longer in the registry), fall back to the
// catalog's canonical default (IsDefault: true) so the host always
// boots with CSS variables populated. Without this fallback an app
// configured without ApplyDefault — or one whose ApplyDefault hash
// was removed — paints unstyled (token references resolve to their
// inline fallback colors, which are intentionally bland) until the
// user manually picks something from the picker.
if(tmpProvider&&(!tmpBootHash||typeof tmpProvider.getTheme==='function'&&!tmpProvider.getTheme(tmpBootHash))){let tmpFallback=_resolveCatalogDefault();if(tmpFallback){tmpBootHash=tmpFallback;if(pPict.log&&pPict.log.info){pPict.log.info('pict-section-theme: no theme resolved at boot — falling back to catalog default "'+tmpFallback+'"');}}}if(tmpBootHash&&tmpProvider){tmpProvider.applyTheme(tmpBootHash,tmpBootMode);}if(tmpBootScale!==null){libThemeScale.applyScale(tmpBootScale);}// 5. Brand — host-supplied app identity. Apply LAST so the BrandStrip
//    view's first paint sees the CSS custom properties.
if(tmpOptions.Brand){libThemeBrand.applyBrand(tmpOptions.Brand);}// Stash the resolved key on the provider for debugging + so the host
// can clear it via clearPersistence() for a "reset to defaults"
// affordance.
if(tmpProvider&&tmpPersistenceKey){tmpProvider._persistenceKey=tmpPersistenceKey;}return tmpProvider;}// ── PictProvider class ───────────────────────────────────────────────────
// The recommended entry point. `pict.addProvider('Theme-Section',
// options, PictSectionThemeProvider)` self-bootstraps the whole module
// (runtime + catalog + views + persistence + apply + brand) inside the
// constructor — no follow-up install() call required.
class PictSectionThemeProvider extends libPictProvider{constructor(pFable,pOptions,pServiceHash){super(pFable,pOptions,pServiceHash);this.serviceType='PictSectionTheme';// pict-provider sets `this.pict` for us via super() above. Run the
// bootstrap synchronously so the views, theme runtime, and applied
// theme are all in place before addProvider() returns.
_bootstrap(this.pict,this.options);}/**
	 * Embed theme controls into a host-supplied container.
	 *
	 * The Theme-Button view ships a popover that hosts the picker + mode
	 * toggle + scale select — convenient for "drop a theme menu in the
	 * topbar" but not for apps that already have a settings surface and
	 * want the controls inline there. `mount()` writes the destination
	 * divs each theme view expects into the supplied container, then
	 * calls render() on each requested view.
	 *
	 * Important: each theme view has a SINGLE default destination id
	 * (e.g. `#Theme-Picker`). Mounting overrides where the view paints —
	 * once mount() is called, the picker / toggle / scale destinations
	 * live inside the supplied container. Combining a mount() with a
	 * Theme-Button popover that ALSO hosts these views causes duplicate
	 * destination ids and undefined behaviour; pick one host per view.
	 *
	 * @param {object} pOptions
	 * @param {string|HTMLElement} pOptions.Container - CSS selector or element
	 * @param {Array<string>} [pOptions.Views] - short names; default ['Picker','ModeToggle','ScaleSelect']
	 * @param {string} [pOptions.WrapperClass] - class added to the outer wrapper div
	 * @returns {object|null} { container, viewsRendered } on success, null if the container can't be resolved
	 */mount(pOptions){let tmpOpts=pOptions||{};let tmpContainer=tmpOpts.Container;if(!tmpContainer){return null;}let tmpEl=typeof tmpContainer==='string'?this.pict&&this.pict.ContentAssignment?this.pict.ContentAssignment.getElement(tmpContainer):document.querySelector(tmpContainer):tmpContainer;// ContentAssignment.getElement returns an array-like; normalise to one node.
if(tmpEl&&tmpEl.length&&!tmpEl.tagName){tmpEl=tmpEl[0];}if(!tmpEl){if(this.pict&&this.pict.log&&this.pict.log.warn){this.pict.log.warn('pict-section-theme.mount: container not found for '+tmpContainer);}return null;}let tmpRequested=Array.isArray(tmpOpts.Views)&&tmpOpts.Views.length?tmpOpts.Views:['Picker','ModeToggle','ScaleSelect'];// Build a wrapper that carries one row per requested view; each row
// contains the destination div the view's render() will write into.
let tmpRows=[];let tmpRendered=[];for(let i=0;i<tmpRequested.length;i++){let tmpEntry=_Views[tmpRequested[i]];if(!tmpEntry){continue;}let tmpDestSel=tmpEntry.lib.default_configuration.DefaultDestinationAddress||'';let tmpDestId=tmpDestSel.replace(/^#/,'');if(!tmpDestId){continue;}tmpRows.push('<div class="pict-theme-mount-row pict-theme-mount-row-'+tmpEntry.hash.toLowerCase()+'">'+'<div id="'+tmpDestId+'"></div>'+'</div>');tmpRendered.push(tmpEntry.hash);}let tmpWrapperClass='pict-theme-mount'+(tmpOpts.WrapperClass?' '+tmpOpts.WrapperClass:'');tmpEl.innerHTML='<div class="'+tmpWrapperClass+'">'+tmpRows.join('')+'</div>';// Render each requested view. Each render() targets the destination
// id we just stamped into the wrapper.
for(let i=0;i<tmpRendered.length;i++){let tmpView=this.pict.views[tmpRendered[i]];if(tmpView&&typeof tmpView.render==='function'){try{tmpView.render();}catch(pErr){/* a view render failure shouldn't break the host */}}}return{container:tmpEl,viewsRendered:tmpRendered};}}// ── Legacy install() ─────────────────────────────────────────────────────
// Thin shim for apps that already call install(); delegates to the same
// bootstrap routine the provider runs.
function install(pPict,pOptions){if(!pPict||typeof pPict.addProvider!=='function'){throw new Error('pict-section-theme.install: first arg must be a Pict instance');}return _bootstrap(pPict,pOptions||{});}/**
 * Drop the saved theme state for this app's storage key. The next
 * install() (or page reload / addProvider) falls back to ApplyDefault.
 *
 * @param {object} pPict - the pict instance
 * @returns {boolean} true if anything was cleared
 */function clearPersistence(pPict){let tmpKey=pPict&&pPict.providers&&pPict.providers.Theme&&pPict.providers.Theme._persistenceKey||libThemePersistence.resolveKey(null);return libThemePersistence.clear(tmpKey);}// ── Exports ──────────────────────────────────────────────────────────────
// Default export = the provider class so apps can do:
//   pict.addProvider('Theme-Section', { ... }, libPictSectionTheme);
//
// Named exports preserved so legacy callers keep working unchanged.
module.exports=PictSectionThemeProvider;module.exports.default_configuration=_ProviderConfiguration;module.exports.Provider=libPictProviderTheme;// the runtime class
module.exports.PictSectionThemeProvider=PictSectionThemeProvider;module.exports.PickerView=libPickerView;module.exports.ModeToggleView=libModeToggleView;module.exports.ButtonView=libButtonView;module.exports.ScaleSelectView=libScaleSelectView;module.exports.BrandStripView=libBrandStripView;module.exports.BrandMarkView=libBrandMarkView;module.exports.TopBarView=libTopBarView;module.exports.BottomBarView=libBottomBarView;module.exports.Catalog=libCatalog;// the registry singleton
module.exports.Brand=libThemeBrand;// the brand helper module
module.exports.Scale=libThemeScale;// the scale helper module
module.exports.Persistence=libThemePersistence;// the persistence helper module
// Theme-Logo is exposed as a sub-module path, not a top-level field —
// see the comment near the imports above.
module.exports.registerCatalog=registerCatalog;module.exports.listCatalog=listCatalog;module.exports.install=install;module.exports.clearPersistence=clearPersistence;},{"./Theme-Brand.js":29,"./Theme-Persistence.js":31,"./Theme-Scale.js":32,"./themes/_catalog.js":36,"./views/PictView-Theme-BottomBar.js":78,"./views/PictView-Theme-Brand-Mark.js":79,"./views/PictView-Theme-BrandStrip.js":80,"./views/PictView-Theme-Button.js":81,"./views/PictView-Theme-ModeToggle.js":82,"./views/PictView-Theme-Picker.js":83,"./views/PictView-Theme-ScaleSelect.js":84,"./views/PictView-Theme-TopBar.js":85,"pict-provider":12,"pict-provider-theme":5}],29:[function(require,module,exports){/**
 * Theme-Brand — app-level brand identity (icon + colors) that overlays
 * the active theme.
 *
 * # What this is for
 *
 * The active *theme* describes how UI surfaces look (panel colors,
 * borders, text, status). The active *brand* describes which APP the
 * user is in. retold-facto, retold-manager, and ultravisor can share
 * the same theme but each carries its own visual signature: a small
 * icon and two brand colors that show up in a stripe under the nav
 * (and optionally tinge link underlines, header accents, etc. when
 * the active theme opts to reference them).
 *
 * Brand is host-supplied (passed to pict-section-theme.install() as
 * `Brand: {...}` or applied later via this module's `applyBrand()`)
 * and NOT user-pickable — it's the app's wordmark. It's also not
 * persisted; the host config drives it on every boot.
 *
 * # Brand shape
 *
 * Two equivalent forms — pick whichever reads better in your app.
 *
 * ## Recommended: nested form
 *
 *   {
 *     Hash:    'retold-manager',
 *     Name:    'Retold Manager',
 *     Icon:    '<svg ...>...</svg>',
 *     Colors: {
 *       Primary:   { Light: '#0044cc', Dark: '#6b8eff' },   // both required
 *       Secondary: { Light: '#c75033', Dark: '#ff8a6b' }    // both required
 *     },
 *     Tagline: 'Optional short tagline'
 *   }
 *
 * This mirrors how theme JSONs already structure their Tokens.Color.*
 * trees, makes the "explicit light + dark variants" contract obvious,
 * and means your brand and your theme look consistent in source.
 *
 * ## Legacy: flat form
 *
 *   {
 *     Hash:    'retold-manager',
 *     Name:    'Retold Manager',
 *     Icon:    '<svg ...>...</svg>',
 *     Colors: {
 *       Primary:        '#0066ff',                // required
 *       Secondary:      '#ff6600',                // required
 *       PrimaryLight:   '#3388ff',                // optional, light-mode tint
 *       PrimaryDark:    '#0044cc',                // optional, dark-mode tint
 *       SecondaryLight: '#ff8833',
 *       SecondaryDark:  '#cc4400'
 *     }
 *   }
 *
 * The flat form's `Primary` / `Secondary` are mode-agnostic constants
 * (used for the `--brand-color-primary` / `-secondary` CSS variables);
 * the *Light / *Dark fields drive the mode-aware variants. When the
 * Light / Dark fields are omitted, the base Primary / Secondary
 * doubles for both modes. Both forms land on the same six output CSS
 * variables — see "CSS variables emitted" below.
 *
 * Icon shape: inline SVG markup, OR a data URL, OR a remote / app-served
 * URL. IconType is optional and auto-detected from the value.
 *
 * # CSS variables emitted
 *
 *   :root {
 *     --brand-color-primary:           <Primary>
 *     --brand-color-secondary:         <Secondary>
 *     --brand-color-primary-light:     <PrimaryLight or Primary>
 *     --brand-color-primary-dark:      <PrimaryDark or Primary>
 *     --brand-color-secondary-light:   <SecondaryLight or Secondary>
 *     --brand-color-secondary-dark:    <SecondaryDark or Secondary>
 *     --brand-color-primary-mode:      <Primary OR PrimaryLight in :root>
 *     --brand-color-secondary-mode:    <Secondary OR SecondaryLight in :root>
 *     --brand-name:                    "<Name>"
 *   }
 *   .theme-dark {
 *     --brand-color-primary-mode:      <PrimaryDark or Primary>
 *     --brand-color-secondary-mode:    <SecondaryDark or Secondary>
 *   }
 *
 * The `*-mode` variables are the ones theme/host CSS should reach for
 * when they want a brand color that automatically swaps for dark mode
 * (parallel to how --theme-color-* works). The plain Primary/Secondary
 * are constants that ignore the mode toggle — useful for the brand
 * stripe itself, where the brand should look the same in both modes.
 *
 * # Listener pattern
 *
 * Mirrors Theme-Scale: subscribe via `onBrandChange(cb)`, dispose by
 * calling the returned function. The BrandStrip view uses this to
 * re-render when the host changes brand at runtime (rare, but used by
 * test harnesses + multi-tenant hosts).
 */const STYLE_ELEMENT_ID='pict-brand';const FAVICON_LINK_ID='pict-brand-favicon';const FAVICON_DARK_LINK_ID='pict-brand-favicon-dark';let _activeBrand=null;let _listeners=[];function _isInlineSVG(pIcon){return typeof pIcon==='string'&&/^\s*<svg[\s>]/i.test(pIcon);}function _isImageURL(pIcon){if(typeof pIcon!=='string')return false;return /^(data:|https?:|\/|\.\.?\/)/.test(pIcon);}function _detectIconType(pBrand){if(pBrand&&typeof pBrand.IconType==='string')return pBrand.IconType;if(!pBrand||!pBrand.Icon)return null;if(_isInlineSVG(pBrand.Icon))return'svg';if(_isImageURL(pBrand.Icon))return'image';return null;}// Resolve a "color slot" to { Light, Dark, Base } regardless of input
// shape. Supported inputs:
//   - "string"                        → all three equal that string
//   - { Light, Dark }                 → Base = Light, others as given
//   - { Light, Dark, Base }           → Base explicit
//   - missing                         → null (caller decides how to fail)
function _resolveColorSlot(pSlot){if(typeof pSlot==='string'&&pSlot.length>0){return{Light:pSlot,Dark:pSlot,Base:pSlot};}if(pSlot&&typeof pSlot==='object'){let tmpLight=typeof pSlot.Light==='string'&&pSlot.Light.length>0?pSlot.Light:null;let tmpDark=typeof pSlot.Dark==='string'&&pSlot.Dark.length>0?pSlot.Dark:null;// Need at least one variant present.
if(!tmpLight&&!tmpDark)return null;// Fill missing variant from the other side. Base defaults to
// the light variant (matches the legacy flat-form semantics).
tmpLight=tmpLight||tmpDark;tmpDark=tmpDark||tmpLight;let tmpBase=typeof pSlot.Base==='string'&&pSlot.Base.length>0?pSlot.Base:tmpLight;return{Light:tmpLight,Dark:tmpDark,Base:tmpBase};}return null;}function _normalize(pBrand){if(!pBrand||typeof pBrand!=='object')return null;let tmpColors=pBrand.Colors||{};// Brand colors accept TWO forms — flat or nested:
//
//   FLAT (legacy):
//     Colors: {
//       Primary:        '#e54b1e',     // required (the mode-agnostic value)
//       Secondary:      '#1e9aa0',     // required
//       PrimaryLight:   '#e54b1e',     // optional fallback to Primary
//       PrimaryDark:    '#ff7a4a',     // optional fallback to Primary
//       SecondaryLight: '#1e9aa0',     // optional fallback to Secondary
//       SecondaryDark:  '#5fc5cb'      // optional fallback to Secondary
//     }
//
//   NESTED (recommended):
//     Colors: {
//       Primary:   { Light: '#e54b1e', Dark: '#ff7a4a' },  // both required
//       Secondary: { Light: '#1e9aa0', Dark: '#5fc5cb' }   // both required
//     }
//
// The nested form mirrors how themes already structure their
// Tokens.Color.* trees and makes the "this brand needs explicit
// light + dark variants" contract obvious. Either form lands on
// the same six --brand-color-* CSS variables.
let tmpPriSlot=_resolveColorSlot(tmpColors.Primary);let tmpSecSlot=_resolveColorSlot(tmpColors.Secondary);if(!tmpPriSlot||!tmpSecSlot)return null;// Legacy flat-form fields override the resolved slot's Light/Dark
// (so a host passing both forms gets the most explicit one).
let tmpPriLight=tmpColors.PrimaryLight||tmpPriSlot.Light;let tmpPriDark=tmpColors.PrimaryDark||tmpPriSlot.Dark;let tmpSecLight=tmpColors.SecondaryLight||tmpSecSlot.Light;let tmpSecDark=tmpColors.SecondaryDark||tmpSecSlot.Dark;return{Hash:pBrand.Hash||'brand',Name:pBrand.Name||pBrand.Hash||'Brand',Icon:pBrand.Icon||null,IconType:_detectIconType(pBrand),Tagline:typeof pBrand.Tagline==='string'?pBrand.Tagline:null,// Optional favicon assets. Each can be: inline `<svg>` markup, a
// data URL, or a regular URL. When both Favicon and FaviconDark
// are supplied, paired light/dark <link rel="icon"> tags are
// emitted with prefers-color-scheme media queries; otherwise a
// single <link> covers both modes.
Favicon:pBrand.Favicon||null,FaviconDark:pBrand.FaviconDark||null,Colors:{Primary:tmpPriSlot.Base,Secondary:tmpSecSlot.Base,PrimaryLight:tmpPriLight,PrimaryDark:tmpPriDark,SecondaryLight:tmpSecLight,SecondaryDark:tmpSecDark}};}// Encode an inline `<svg>` blob into a data URL safe for an <img src> /
// <link href> attribute. Falls through if the input already looks like
// a URL (data:, http:, /, ./, ../).
function _faviconHref(pIcon){if(!pIcon||typeof pIcon!=='string')return null;if(_isInlineSVG(pIcon)){// percent-encode SVG markup. Don't encode '#' or '&' minimally;
// the safe path is to encode aggressively then unescape spaces.
let tmpEncoded=encodeURIComponent(pIcon).replace(/'/g,'%27').replace(/"/g,'%22');return'data:image/svg+xml;charset=utf-8,'+tmpEncoded;}if(_isImageURL(pIcon))return pIcon;return null;}function _removeFaviconLinks(){if(typeof document==='undefined')return;[FAVICON_LINK_ID,FAVICON_DARK_LINK_ID].forEach(pID=>{let tmpEl=document.getElementById(pID);if(tmpEl&&tmpEl.parentNode)tmpEl.parentNode.removeChild(tmpEl);});}function _injectFaviconLinks(pBrand){if(typeof document==='undefined')return;_removeFaviconLinks();let tmpLight=_faviconHref(pBrand.Favicon);let tmpDark=_faviconHref(pBrand.FaviconDark);if(!tmpLight&&!tmpDark)return;let tmpHasPair=!!(tmpLight&&tmpDark);if(tmpLight){let tmpLink=document.createElement('link');tmpLink.id=FAVICON_LINK_ID;tmpLink.rel='icon';tmpLink.href=tmpLight;if(/^data:image\/svg\+xml/.test(tmpLight))tmpLink.type='image/svg+xml';if(tmpHasPair)tmpLink.media='(prefers-color-scheme: light)';document.head.appendChild(tmpLink);}if(tmpDark){let tmpLink=document.createElement('link');tmpLink.id=FAVICON_DARK_LINK_ID;tmpLink.rel='icon';tmpLink.href=tmpDark;if(/^data:image\/svg\+xml/.test(tmpDark))tmpLink.type='image/svg+xml';// If we have a light variant, the dark link's media query handles
// the swap; otherwise it serves both modes.
if(tmpHasPair)tmpLink.media='(prefers-color-scheme: dark)';document.head.appendChild(tmpLink);}}function _injectStyleElement(pCSS){if(typeof document==='undefined')return;let tmpStyleEl=document.getElementById(STYLE_ELEMENT_ID);if(!tmpStyleEl){tmpStyleEl=document.createElement('style');tmpStyleEl.id=STYLE_ELEMENT_ID;document.head.appendChild(tmpStyleEl);}tmpStyleEl.textContent=pCSS;}// Escape so the brand name can ride along inside the CSS `content`-style
// `--brand-name` value as a quoted string.
function _cssQuote(pStr){return'"'+String(pStr||'').replace(/\\/g,'\\\\').replace(/"/g,'\\"')+'"';}function _buildCSS(pBrand){let tmpC=pBrand.Colors;let tmpRoot=':root {\n'+'\t--brand-color-primary:         '+tmpC.Primary+';\n'+'\t--brand-color-secondary:       '+tmpC.Secondary+';\n'+'\t--brand-color-primary-light:   '+tmpC.PrimaryLight+';\n'+'\t--brand-color-primary-dark:    '+tmpC.PrimaryDark+';\n'+'\t--brand-color-secondary-light: '+tmpC.SecondaryLight+';\n'+'\t--brand-color-secondary-dark:  '+tmpC.SecondaryDark+';\n'+'\t--brand-color-primary-mode:    '+tmpC.PrimaryLight+';\n'+'\t--brand-color-secondary-mode:  '+tmpC.SecondaryLight+';\n'+'\t--brand-name:                  '+_cssQuote(pBrand.Name)+';\n'+'}\n';// Dark-mode overrides for the *-mode variables only.
let tmpDark='.theme-dark {\n'+'\t--brand-color-primary-mode:    '+tmpC.PrimaryDark+';\n'+'\t--brand-color-secondary-mode:  '+tmpC.SecondaryDark+';\n'+'}\n';return tmpRoot+tmpDark;}/**
 * Apply (or replace) the active brand. Pass `null` to clear.
 *
 * @param {object|null} pBrand
 * @returns {object|null} the normalized active brand (or null on clear)
 */function applyBrand(pBrand){let tmpPrev=_activeBrand;if(pBrand===null){_activeBrand=null;if(typeof document!=='undefined'){let tmpStyleEl=document.getElementById(STYLE_ELEMENT_ID);if(tmpStyleEl&&tmpStyleEl.parentNode)tmpStyleEl.parentNode.removeChild(tmpStyleEl);}_removeFaviconLinks();_fireChange(null,tmpPrev);return null;}let tmpNorm=_normalize(pBrand);if(!tmpNorm){// Bad input — keep current brand, no-op.
if(typeof console!=='undefined'&&console.warn){console.warn('Theme-Brand.applyBrand: bad brand object — needs Colors.Primary + Colors.Secondary as strings.');}return _activeBrand;}_activeBrand=tmpNorm;_injectStyleElement(_buildCSS(tmpNorm));_injectFaviconLinks(tmpNorm);_fireChange(tmpNorm,tmpPrev);return tmpNorm;}function getActive(){return _activeBrand;}function onChange(fCallback){if(typeof fCallback!=='function')return function(){};_listeners.push(fCallback);return function(){offChange(fCallback);};}function offChange(fCallback){let tmpIdx=_listeners.indexOf(fCallback);if(tmpIdx>=0)_listeners.splice(tmpIdx,1);}function _fireChange(pNew,pOld){for(let i=0;i<_listeners.length;i++){try{_listeners[i](pNew,pOld);}catch(pErr){/* swallow — listener failure must not break callers */}}}/**
 * Reset to no-brand state and detach the injected style. Tests use this;
 * runtime hosts rarely need it.
 */function reset(){applyBrand(null);_listeners=[];}module.exports={applyBrand:applyBrand,getActive:getActive,onChange:onChange,offChange:offChange,reset:reset,STYLE_ELEMENT_ID:STYLE_ELEMENT_ID,FAVICON_LINK_ID:FAVICON_LINK_ID,FAVICON_DARK_LINK_ID:FAVICON_DARK_LINK_ID};},{}],30:[function(require,module,exports){/**
 * Theme-Icons — single source of truth for the inline SVG glyphs the
 * theme section uses (sun, moon, system / monitor, plus a chevron for
 * dropdown triggers).
 *
 * Every icon:
 *   - Is a self-contained SVG string suitable for direct DOM insertion
 *     (innerHTML, template substitution, or pict-section-modal's
 *     `Icon: <html>` field on dropdown items).
 *   - Uses `currentColor` for stroke so it picks up the surrounding
 *     text colour from the active theme (light + dark both look right
 *     without per-mode swaps).
 *   - Has `aria-hidden="true"` so screen readers ignore the decorative
 *     glyph and rely on the surrounding label / aria-label instead.
 *
 * The shapes are intentionally line-art (stroke-based, fill="none") so
 * they read at very small sizes (12–16 px) without going muddy. The
 * "system" icon is a stylised display (rectangle + stand) rather than
 * the unicode 🖥 to keep visual weight consistent with sun + moon.
 *
 * Need a different size? Pass `pSizePx` to any of the iconXxx() helpers
 * and the wrapper SVG's width/height are emitted with that value. The
 * default is 14 px which matches the mode toggle's existing visual.
 */const _DEFAULT_SIZE_PX=14;function _wrap(pSizePx,pInner){let tmpSize=typeof pSizePx==='number'&&pSizePx>0?pSizePx:_DEFAULT_SIZE_PX;return'<svg class="pict-theme-icon"'+' width="'+tmpSize+'" height="'+tmpSize+'"'+' viewBox="0 0 24 24" fill="none"'+' stroke="currentColor" stroke-width="2"'+' stroke-linecap="round" stroke-linejoin="round"'+' aria-hidden="true">'+pInner+'</svg>';}/**
 * Sun glyph — central disc + 8 radial rays. Communicates "light mode"
 * universally. Slightly chunkier disc than the typical Feather sun so
 * it still reads at 12 px.
 */function iconSun(pSizePx){return _wrap(pSizePx,'<circle cx="12" cy="12" r="4"/>'+'<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>');}/**
 * Moon glyph — clean crescent (one continuous filled-look path drawn
 * as a stroke). Avoids the brittle thin-crescent unicode characters
 * that fall back to weird outline glyphs in some system fonts.
 */function iconMoon(pSizePx){return _wrap(pSizePx,'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>');}/**
 * System / display glyph — a small monitor with a stand. Communicates
 * "follow the OS preference" without ambiguity (a monitor is universal
 * UI for system settings, more than the gear icon would be).
 */function iconSystem(pSizePx){return _wrap(pSizePx,'<rect x="2" y="4" width="20" height="14" rx="2"/>'+'<path d="M8 21h8M12 18v3"/>');}/**
 * Composite: a sun + moon side-by-side, sized so the two icons fit in
 * the same horizontal footprint as a single icon. Used in the picker
 * to indicate a paired (Light + Dark) theme without needing two
 * separate visual columns.
 */function iconPaired(pSizePx){let tmpSize=typeof pSizePx==='number'&&pSizePx>0?pSizePx:_DEFAULT_SIZE_PX;// Each half uses currentColor; the sun is rendered slightly smaller
// in the left half and the moon in the right half by abusing the
// viewBox width.
return'<svg class="pict-theme-icon pict-theme-icon-paired"'+' width="'+tmpSize*1.6+'" height="'+tmpSize+'"'+' viewBox="0 0 38 24" fill="none"'+' stroke="currentColor" stroke-width="2"'+' stroke-linecap="round" stroke-linejoin="round"'+' aria-hidden="true">'// Sun on the left (centred at 8,12, radius 3)
+'<circle cx="8" cy="12" r="3"/>'+'<path d="M8 4v1.5M8 18.5V20M2.5 12H4M12 12h1.5M4.1 7.1l1 1M11.1 7.1l-1 1M4.1 16.9l1-1M11.1 16.9l-1-1"/>'// Moon on the right (mirrored crescent, centred near x=28)
+'<path d="M33 13.5A6.5 6.5 0 1 1 26 6a5 5 0 0 0 7 7.5z"/>'+'</svg>';}/**
 * Down-chevron used by dropdown triggers. Sized to sit alongside body
 * text (10 px default).
 */function iconChevronDown(pSizePx){let tmpSize=typeof pSizePx==='number'&&pSizePx>0?pSizePx:10;return'<svg class="pict-theme-icon pict-theme-icon-chevron"'+' width="'+tmpSize+'" height="'+tmpSize+'"'+' viewBox="0 0 12 12" fill="none"'+' stroke="currentColor" stroke-width="1.6"'+' stroke-linecap="round" stroke-linejoin="round"'+' aria-hidden="true">'+'<path d="M3 4.5l3 3 3-3"/>'+'</svg>';}/**
 * Pick the right capability icon for a theme based on its mode strategy.
 * Returns the composite paired glyph for paired themes, sun for light-only,
 * moon for dark-only.
 *
 * @param {string} pStrategy - 'single' or 'system'/'paired'
 * @param {string} pDefaultMode - 'light' or 'dark' (only consulted for single)
 * @param {number} [pSizePx]
 */function iconForTheme(pStrategy,pDefaultMode,pSizePx){if(pStrategy==='single'){return pDefaultMode==='dark'?iconMoon(pSizePx):iconSun(pSizePx);}return iconPaired(pSizePx);}module.exports={iconSun:iconSun,iconMoon:iconMoon,iconSystem:iconSystem,iconPaired:iconPaired,iconChevronDown:iconChevronDown,iconForTheme:iconForTheme,DEFAULT_SIZE_PX:_DEFAULT_SIZE_PX};},{}],31:[function(require,module,exports){/**
 * Theme-Persistence — reads and writes the user's selected theme + mode
 * to the browser's localStorage so a reload restores the same look.
 *
 * pict-provider-theme is intentionally stateless — host applications
 * decide what to apply at boot. This module is the small, opt-out-able
 * layer that pict-section-theme.install() uses to make "remember my
 * theme" the default behaviour without forcing every consumer to wire
 * it themselves.
 *
 * # Storage shape
 *
 * Every entry is a single JSON object under one key:
 *
 *   localStorage["pict-section-theme:<scope>"] =
 *     {
 *       Version:   1,
 *       ThemeHash: "retold-manager",
 *       Mode:      "dark",
 *       Scale:     1.25,
 *       SavedAt:   "2026-05-09T21:00:00.000Z"
 *     }
 *
 * Version-tagged so future schema changes can be migrated cleanly;
 * mismatched versions are treated as "no saved entry" and the host
 * application's defaults take over. Older entries that pre-date the
 * Scale field are still valid — Scale is optional and load() returns
 * null for it when absent (caller defaults to 1.0).
 *
 * # Scope (the <scope> portion of the key)
 *
 * Determined in this priority order:
 *   1. The string the host passed in (`PersistenceKey: 'my-app'`) —
 *      use this when one host serves multiple logical apps from the
 *      same origin and they shouldn't share theme state.
 *   2. window.location.hostname when running in a browser.
 *   3. The literal 'default' as a last-ditch fallback (Node, sandbox,
 *      mid-SSR, etc.).
 *
 * # Failure modes
 *
 * - localStorage missing (SSR, Safari private mode, blocked) →
 *   load() returns null, save() returns false, no exception.
 * - Quota exceeded → save() returns false silently; the in-memory
 *   active theme is unaffected.
 * - JSON parse error or version mismatch → load() returns null so the
 *   caller falls back to ApplyDefault.
 *
 * Nothing here throws — persistence failures must NEVER crash the host
 * application's boot path.
 */const STORAGE_PREFIX='pict-section-theme:';const SCHEMA_VERSION=1;function _getStorage(){try{if(typeof window!=='undefined'&&window.localStorage){return window.localStorage;}}catch(pErr){/* SecurityError in some contexts */}return null;}function _autoScope(){try{if(typeof window!=='undefined'&&window.location&&window.location.hostname){return window.location.hostname;}}catch(pErr){/* fall through */}return'default';}/**
 * Resolve the full localStorage key for this app's theme state.
 *
 * @param {string|null} pUserKey - Host-supplied scope override; falsy
 *   values trigger the auto-scope fallback (hostname → 'default').
 * @returns {string} the fully-qualified localStorage key.
 */function resolveKey(pUserKey){let tmpScope=typeof pUserKey==='string'&&pUserKey.length>0?pUserKey:_autoScope();return STORAGE_PREFIX+tmpScope;}/**
 * Read the saved theme state for a key.  Returns null if nothing is
 * stored, the storage is unavailable, or the entry's schema version
 * doesn't match.
 *
 * @param {string} pKey - the resolved storage key
 * @returns {{ThemeHash: string, Mode: string|null, Scale: number|null}|null}
 */function load(pKey){let tmpStore=_getStorage();if(!tmpStore)return null;let tmpRaw;try{tmpRaw=tmpStore.getItem(pKey);}catch(pErr){return null;}if(!tmpRaw)return null;let tmpParsed;try{tmpParsed=JSON.parse(tmpRaw);}catch(pErr){return null;}if(!tmpParsed||typeof tmpParsed!=='object')return null;if(tmpParsed.Version!==SCHEMA_VERSION)return null;if(typeof tmpParsed.ThemeHash!=='string'||tmpParsed.ThemeHash.length===0)return null;let tmpScale=null;if(typeof tmpParsed.Scale==='number'&&isFinite(tmpParsed.Scale)&&tmpParsed.Scale>0){tmpScale=tmpParsed.Scale;}return{ThemeHash:tmpParsed.ThemeHash,Mode:typeof tmpParsed.Mode==='string'&&tmpParsed.Mode.length>0?tmpParsed.Mode:null,Scale:tmpScale};}/**
 * Persist the active theme + mode for this key.  No-ops gracefully
 * when storage is unavailable or quota is exceeded.
 *
 * @param {string} pKey
 * @param {{ThemeHash: string, Mode?: string, Scale?: number}} pState
 * @returns {boolean} true on success, false otherwise
 */function save(pKey,pState){let tmpStore=_getStorage();if(!tmpStore)return false;if(!pState||typeof pState.ThemeHash!=='string'||pState.ThemeHash.length===0)return false;let tmpEntry={Version:SCHEMA_VERSION,ThemeHash:pState.ThemeHash,Mode:typeof pState.Mode==='string'&&pState.Mode.length>0?pState.Mode:null,Scale:typeof pState.Scale==='number'&&isFinite(pState.Scale)&&pState.Scale>0?pState.Scale:null,SavedAt:new Date().toISOString()};try{tmpStore.setItem(pKey,JSON.stringify(tmpEntry));return true;}catch(pErr){return false;}}/**
 * Remove the saved theme state for a key.  Useful for "reset to
 * defaults" actions.
 */function clear(pKey){let tmpStore=_getStorage();if(!tmpStore)return false;try{tmpStore.removeItem(pKey);return true;}catch(pErr){return false;}}module.exports={resolveKey:resolveKey,load:load,save:save,clear:clear,STORAGE_PREFIX:STORAGE_PREFIX,SCHEMA_VERSION:SCHEMA_VERSION};},{}],32:[function(require,module,exports){/**
 * Theme-Scale — viewport scale (zoom) selector independent of theme bundles.
 *
 * Scale is a *user preference*, not a property of any particular theme:
 * the user might want Cyberpunk-at-1.25x or Retold-Manager-at-0.85x.
 * Pict-provider-theme is intentionally bundle-shaped (Tokens / SVG /
 * Image), so scale lives here at the section layer alongside Mode.
 *
 * # Apply mechanism
 *
 * Two outputs feed cooperating CSS:
 *
 *   1. `html { zoom: <scale>; }` — works for legacy stylesheets that
 *      use `px` everywhere (most Retold apps including retold-manager).
 *      Browsers (Chromium-based + Firefox 126+ + Safari) all honour
 *      `zoom` on root.
 *
 *   2. `:root { --theme-scale: <scale>; }` — exposed for stylesheets
 *      that want to opt into explicit `calc(... * var(--theme-scale))`
 *      sizing. Keeps the value addressable from JS too via
 *      `getComputedStyle(document.documentElement).getPropertyValue(...)`.
 *
 * Both are written into a single `<style id="pict-theme-scale">` element
 * appended to `<head>` after the theme provider's own style element so
 * scale wins last. Re-applying just rewrites this one element's text.
 *
 * # Listener pattern
 *
 * Mirrors pict-provider-theme.onApply(): subscribers receive the new
 * scale value plus the previous value and a return-able `dispose`
 * function. The persistence wiring in pict-section-theme.install()
 * uses this to autosave whenever the scale changes.
 *
 * # Stateless across instances
 *
 * No singleton state — each browser window has one DOM, so the module
 * tracks active scale via a module-level variable, but exposes
 * `getActive()` for callers that want to query it. `applyScale()` is
 * idempotent: applying the same value re-injects the same CSS (cheap
 * no-op).
 */const STYLE_ELEMENT_ID='pict-theme-scale';const CSS_VAR_NAME='--theme-scale';const DEFAULT_SCALE=1.0;const MIN_SCALE=0.5;const MAX_SCALE=3.0;// Curated list of presets. Hosts that want a different range can pass
// a custom `Presets` array to the ScaleSelect view; this default covers
// the readability common cases without overwhelming the dropdown.
const PRESETS=[{Value:0.75,Label:'Tiny (75%)'},{Value:0.85,Label:'Small (85%)'},{Value:1.00,Label:'Default (100%)'},{Value:1.15,Label:'Comfortable (115%)'},{Value:1.25,Label:'Large (125%)'},{Value:1.50,Label:'Huge (150%)'},{Value:1.75,Label:'Extra Huge (175%)'},{Value:2.00,Label:'Massive (200%)'}];let _activeScale=DEFAULT_SCALE;let _listeners=[];function _clamp(pValue){let tmpNum=Number(pValue);if(!isFinite(tmpNum)||tmpNum<=0)return DEFAULT_SCALE;if(tmpNum<MIN_SCALE)return MIN_SCALE;if(tmpNum>MAX_SCALE)return MAX_SCALE;return tmpNum;}function _injectStyleElement(pCSS){if(typeof document==='undefined')return;let tmpStyleEl=document.getElementById(STYLE_ELEMENT_ID);if(!tmpStyleEl){tmpStyleEl=document.createElement('style');tmpStyleEl.id=STYLE_ELEMENT_ID;document.head.appendChild(tmpStyleEl);}tmpStyleEl.textContent=pCSS;}function _buildCSS(pScale){// `zoom` on <html> scales everything (px + rem + layout). The
// `--theme-scale` custom property exposes the same value to any CSS
// that wants to react explicitly via calc().
return':root {\n'+'\t'+CSS_VAR_NAME+': '+pScale+';\n'+'}\n'+'html {\n'+'\tzoom: '+pScale+';\n'+'}\n';}/**
 * Apply a viewport scale.
 *
 * @param {number} pScale - desired multiplier (e.g. 1.0, 1.25). Values
 *   outside [MIN_SCALE, MAX_SCALE] are clamped; non-finite values
 *   reset to DEFAULT_SCALE.
 * @returns {number} the actually-applied scale (after clamping).
 */function applyScale(pScale){let tmpPrev=_activeScale;let tmpNext=_clamp(pScale);_activeScale=tmpNext;_injectStyleElement(_buildCSS(tmpNext));if(tmpPrev!==tmpNext){_fireChange(tmpNext,tmpPrev);}return tmpNext;}function getActive(){return _activeScale;}function onChange(fCallback){if(typeof fCallback!=='function')return function(){};_listeners.push(fCallback);return function(){offChange(fCallback);};}function offChange(fCallback){let tmpIdx=_listeners.indexOf(fCallback);if(tmpIdx>=0)_listeners.splice(tmpIdx,1);}function _fireChange(pNewScale,pOldScale){for(let i=0;i<_listeners.length;i++){try{_listeners[i](pNewScale,pOldScale);}catch(pErr){/* listener failures must not break callers */}}}/**
 * Reset to default scale and remove the injected style element. Useful
 * for tests + "reset to defaults" affordances.
 */function reset(){_activeScale=DEFAULT_SCALE;if(typeof document!=='undefined'){let tmpStyleEl=document.getElementById(STYLE_ELEMENT_ID);if(tmpStyleEl&&tmpStyleEl.parentNode)tmpStyleEl.parentNode.removeChild(tmpStyleEl);}_listeners=[];}module.exports={applyScale:applyScale,getActive:getActive,onChange:onChange,offChange:offChange,reset:reset,PRESETS:PRESETS,DEFAULT_SCALE:DEFAULT_SCALE,MIN_SCALE:MIN_SCALE,MAX_SCALE:MAX_SCALE,STYLE_ELEMENT_ID:STYLE_ELEMENT_ID,CSS_VAR_NAME:CSS_VAR_NAME};},{}],33:[function(require,module,exports){module.exports={"Hash":"1970s-console","Name":"1970s Console","Category":"Fun","Version":"0.0.1","Description":"Amber phosphor on brown-black Ported from RetoldRemote-ThemeDefinitions.js to the pict-provider-theme manifest format.","Comprehensive":true,"Modes":{"Strategy":"single","Default":"dark"},"Tokens":{"Color":{"Background":{"Primary":"#1A1000","Secondary":"#140C00","Tertiary":"#1E1400","Panel":"#1C1200","Viewer":"#100A00","Hover":"#2A1C00","Selected":"#3A2800","Thumb":"#140C00"},"Text":{"Primary":"#FFAA00","Secondary":"#DD8800","Muted":"#AA6600","Dim":"#884400","Placeholder":"#663300"},"Brand":{"Accent":"#FFCC00","AccentHover":"#FFDD44"},"Border":{"Default":"#2A1800","Light":"#3A2200"},"Status":{"Danger":"#FF4400","DangerMuted":"#AA3300"},"Scrollbar":{"Track":"#2A1800","Hover":"#3A2800"},"Selection":{"Background":"rgba(255, 204, 0, 0.2)"},"Focus":{"Outline":"#FFCC00"},"Syntax":{"Keyword":"#FFB000","String":"#FFD080","Number":"#FFB000","Comment":"#806020","Operator":"#FFB000","Punctuation":"#FFD080","Function":"#FFB000","Variable":"#FFE090","Type":"#FFB000","Builtin":"#FFB000","Property":"#FF6E40","Tag":"#FF6E40","AttrName":"#FFB000","AttrValue":"#FFD080"}},"Typography":{"Family":{"Sans":"'Courier New', 'Lucida Console', monospace","Mono":"'Courier New', 'Lucida Console', monospace"}}},"Aliases":{"--retold-bg-primary":"Color.Background.Primary","--retold-bg-secondary":"Color.Background.Secondary","--retold-bg-tertiary":"Color.Background.Tertiary","--retold-bg-panel":"Color.Background.Panel","--retold-bg-viewer":"Color.Background.Viewer","--retold-bg-hover":"Color.Background.Hover","--retold-bg-selected":"Color.Background.Selected","--retold-bg-thumb":"Color.Background.Thumb","--retold-text-primary":"Color.Text.Primary","--retold-text-secondary":"Color.Text.Secondary","--retold-text-muted":"Color.Text.Muted","--retold-text-dim":"Color.Text.Dim","--retold-text-placeholder":"Color.Text.Placeholder","--retold-accent":"Color.Brand.Accent","--retold-accent-hover":"Color.Brand.AccentHover","--retold-border":"Color.Border.Default","--retold-border-light":"Color.Border.Light","--retold-danger":"Color.Status.Danger","--retold-danger-muted":"Color.Status.DangerMuted","--retold-scrollbar":"Color.Scrollbar.Track","--retold-scrollbar-hover":"Color.Scrollbar.Hover","--retold-selection-bg":"Color.Selection.Background","--retold-focus-outline":"Color.Focus.Outline","--retold-font-family":"Typography.Family.Sans","--retold-font-mono":"Typography.Family.Mono"},"IconColors":{"Primary":"#DD8800","Accent":"#FFCC00","Muted":"#884400","Light":"#1E1400","WarmBeige":"#201800","TealTint":"#1A1000","Lavender":"#1C1200","AmberTint":"#221800","PdfFill":"#201000","PdfText":"#FF4400"},"CSS":[],"SVG":{},"Image":{},"CompiledAt":"2026-05-03T18:12:53.405Z","CompilerVersion":1};},{}],34:[function(require,module,exports){module.exports={"Hash":"1980s-console","Name":"1980s Console","Category":"Fun","Version":"0.0.1","Description":"Green phosphor on black Ported from RetoldRemote-ThemeDefinitions.js to the pict-provider-theme manifest format.","Comprehensive":true,"Modes":{"Strategy":"single","Default":"dark"},"Tokens":{"Color":{"Background":{"Primary":"#001200","Secondary":"#000E00","Tertiary":"#001600","Panel":"#001400","Viewer":"#000A00","Hover":"#002200","Selected":"#003800","Thumb":"#000E00"},"Text":{"Primary":"#00FF00","Secondary":"#00CC00","Muted":"#009900","Dim":"#006600","Placeholder":"#004400"},"Brand":{"Accent":"#00FF66","AccentHover":"#44FF88"},"Border":{"Default":"#002A00","Light":"#003A00"},"Status":{"Danger":"#FF0000","DangerMuted":"#AA0000"},"Scrollbar":{"Track":"#002A00","Hover":"#004400"},"Selection":{"Background":"rgba(0, 255, 102, 0.2)"},"Focus":{"Outline":"#00FF66"},"Syntax":{"Keyword":"#00FF00","String":"#90FF90","Number":"#FFFF00","Comment":"#208020","Operator":"#00FF00","Punctuation":"#90FF90","Function":"#00FF00","Variable":"#C0FFC0","Type":"#FFFF00","Builtin":"#FFFF00","Property":"#FF4040","Tag":"#FF4040","AttrName":"#FFFF00","AttrValue":"#90FF90"}},"Typography":{"Family":{"Sans":"'Courier New', monospace","Mono":"'Courier New', monospace"}}},"Aliases":{"--retold-bg-primary":"Color.Background.Primary","--retold-bg-secondary":"Color.Background.Secondary","--retold-bg-tertiary":"Color.Background.Tertiary","--retold-bg-panel":"Color.Background.Panel","--retold-bg-viewer":"Color.Background.Viewer","--retold-bg-hover":"Color.Background.Hover","--retold-bg-selected":"Color.Background.Selected","--retold-bg-thumb":"Color.Background.Thumb","--retold-text-primary":"Color.Text.Primary","--retold-text-secondary":"Color.Text.Secondary","--retold-text-muted":"Color.Text.Muted","--retold-text-dim":"Color.Text.Dim","--retold-text-placeholder":"Color.Text.Placeholder","--retold-accent":"Color.Brand.Accent","--retold-accent-hover":"Color.Brand.AccentHover","--retold-border":"Color.Border.Default","--retold-border-light":"Color.Border.Light","--retold-danger":"Color.Status.Danger","--retold-danger-muted":"Color.Status.DangerMuted","--retold-scrollbar":"Color.Scrollbar.Track","--retold-scrollbar-hover":"Color.Scrollbar.Hover","--retold-selection-bg":"Color.Selection.Background","--retold-focus-outline":"Color.Focus.Outline","--retold-font-family":"Typography.Family.Sans","--retold-font-mono":"Typography.Family.Mono"},"IconColors":{"Primary":"#00CC00","Accent":"#00FF66","Muted":"#006600","Light":"#001600","WarmBeige":"#001A00","TealTint":"#001200","Lavender":"#001400","AmberTint":"#001800","PdfFill":"#140000","PdfText":"#FF0000"},"CSS":[],"SVG":{},"Image":{},"CompiledAt":"2026-05-03T18:12:53.406Z","CompilerVersion":1};},{}],35:[function(require,module,exports){module.exports={"Hash":"1990s-website","Name":"1990s Web Site","Category":"Fun","Version":"0.0.1","Description":"Blue links on grey, beveled Ported from RetoldRemote-ThemeDefinitions.js to the pict-provider-theme manifest format.","Comprehensive":true,"Modes":{"Strategy":"single","Default":"light"},"Tokens":{"Color":{"Background":{"Primary":"#C0C0C0","Secondary":"#B0B0B0","Tertiary":"#A8A8A8","Panel":"#B8B8B8","Viewer":"#D0D0D0","Hover":"#B8B8D0","Selected":"#000080","Thumb":"#B0B0B0"},"Text":{"Primary":"#000000","Secondary":"#000080","Muted":"#404040","Dim":"#606060","Placeholder":"#808080"},"Brand":{"Accent":"#0000FF","AccentHover":"#0000CC"},"Border":{"Default":"#808080","Light":"#A0A0A0"},"Status":{"Danger":"#FF0000","DangerMuted":"#990000"},"Scrollbar":{"Track":"#808080","Hover":"#606060"},"Selection":{"Background":"rgba(0, 0, 128, 0.3)"},"Focus":{"Outline":"#0000FF"},"Syntax":{"Keyword":"#0000FF","String":"#008000","Number":"#A52A2A","Comment":"#808080","Operator":"#000080","Punctuation":"#000000","Function":"#0000A0","Variable":"#000000","Type":"#A52A2A","Builtin":"#A52A2A","Property":"#800080","Tag":"#800080","AttrName":"#A52A2A","AttrValue":"#008000"}},"Typography":{"Family":{"Sans":"'Times New Roman', Times, serif","Mono":"'Courier New', Courier, monospace"}}},"Aliases":{"--retold-bg-primary":"Color.Background.Primary","--retold-bg-secondary":"Color.Background.Secondary","--retold-bg-tertiary":"Color.Background.Tertiary","--retold-bg-panel":"Color.Background.Panel","--retold-bg-viewer":"Color.Background.Viewer","--retold-bg-hover":"Color.Background.Hover","--retold-bg-selected":"Color.Background.Selected","--retold-bg-thumb":"Color.Background.Thumb","--retold-text-primary":"Color.Text.Primary","--retold-text-secondary":"Color.Text.Secondary","--retold-text-muted":"Color.Text.Muted","--retold-text-dim":"Color.Text.Dim","--retold-text-placeholder":"Color.Text.Placeholder","--retold-accent":"Color.Brand.Accent","--retold-accent-hover":"Color.Brand.AccentHover","--retold-border":"Color.Border.Default","--retold-border-light":"Color.Border.Light","--retold-danger":"Color.Status.Danger","--retold-danger-muted":"Color.Status.DangerMuted","--retold-scrollbar":"Color.Scrollbar.Track","--retold-scrollbar-hover":"Color.Scrollbar.Hover","--retold-selection-bg":"Color.Selection.Background","--retold-focus-outline":"Color.Focus.Outline","--retold-font-family":"Typography.Family.Sans","--retold-font-mono":"Typography.Family.Mono"},"IconColors":{"Primary":"#000080","Accent":"#0000FF","Muted":"#606060","Light":"#A8A8A8","WarmBeige":"#B0B0B0","TealTint":"#A0A0A0","Lavender":"#ABABD0","AmberTint":"#B8B0A0","PdfFill":"#C0A0A0","PdfText":"#FF0000"},"CSS":[],"SVG":{},"Image":{},"CompiledAt":"2026-05-03T18:12:53.406Z","CompilerVersion":1};},{}],36:[function(require,module,exports){/**
 * Theme Registry — runtime registry of every theme available to
 * pict-section-theme.
 *
 * Bundled "starter set" themes are pre-registered at module load time
 * via static `require()` so browserify can resolve and inline each JSON
 * at bundle time. Beyond the starter set, consumers can register
 * additional theme bundles at runtime — useful for:
 *
 *   - Loading themes the host app authored (e.g. an app's own brand
 *     palette that isn't shipped with this module).
 *   - Pulling themes from a remote "theme garden" via
 *     `registerFromURL()` (CDN-hosted curated bundles).
 *   - Tooling / playgrounds that mutate the registry as the user
 *     iterates.
 *
 * Module exports a singleton instance, so all consumers operate on the
 * same set. Use `register({Hash, Bundle, Category, IsDefault})` to add
 * themes, `list()` to enumerate them, `get(hash)` for direct lookup,
 * `unregister(hash)` to remove.
 *
 * Each entry shape:
 *
 *   {
 *     Hash:       <string>      // matches bundle.Hash; used by the picker
 *     Bundle:     <object>      // theme JSON, ready for provider.registerTheme()
 *     Category:   <string>      // grouping label for the picker UI
 *     IsDefault:  <bool?>       // true for the canonical ecosystem default
 *     Source:     <string?>     // 'starter' | URL | host-supplied tag
 *   }
 *
 * Backwards-compat:
 *   - The instance is iterable (Symbol.iterator), exposes `.length`,
 *     and supports numeric indexing `[i]` so legacy code that treated
 *     the catalog as an array continues to work without changes.
 */'use strict';class ThemeRegistry{constructor(){this._themes=new Map();// Hash → entry, insertion-ordered
this._loadStarterSet();}// ── Bundled starter set ──────────────────────────────────────────────
// Each `require()` is a literal string so browserify inlines the JSON
// at build time. Adding a new bundled theme: drop the JSON in this
// folder and append a row here. Runtime additions go via register()
// from anywhere else in the codebase.
_loadStarterSet(){const STARTER=[// Framework defaults
// retold-default is the canonical ecosystem default (IsDefault).
// pict-default is retained for backwards compatibility with any
// consumer that explicitly opts in by Hash; it's no longer the
// default theme returned when the picker resolves "the default".
{Hash:'retold-default',Category:'Default',IsDefault:true,Bundle:require('./retold-default.json')},{Hash:'pict-default',Category:'Default',Bundle:require('./pict-default.json')},{Hash:'retold-mono',Category:'Default',Bundle:require('./retold-mono.json')},// App-extracted themes (named after their host app)
{Hash:'retold-manager',Category:'App',Bundle:require('./retold-manager.json')},{Hash:'retold-content-system',Category:'App',Bundle:require('./retold-content-system.json')},{Hash:'retold-labs',Category:'App',Bundle:require('./retold-labs.json')},{Hash:'retold-labs-cyberpunk',Category:'App',Bundle:require('./retold-labs-cyberpunk.json')},{Hash:'retold-labs-retro',Category:'App',Bundle:require('./retold-labs-retro.json')},{Hash:'ultravisor-desert-dusk',Category:'App',Bundle:require('./ultravisor-desert-dusk.json')},{Hash:'ultravisor-desert-day',Category:'App',Bundle:require('./ultravisor-desert-day.json')},{Hash:'ultravisor-desert-sunset',Category:'App',Bundle:require('./ultravisor-desert-sunset.json')},{Hash:'ultravisor-professional-light',Category:'App',Bundle:require('./ultravisor-professional-light.json')},{Hash:'ultravisor-professional-dark',Category:'App',Bundle:require('./ultravisor-professional-dark.json')},{Hash:'ultravisor-desert-canyon',Category:'App',Bundle:require('./ultravisor-desert-canyon.json')},// Paired light/dark themes
{Hash:'ocean',Category:'Paired',Bundle:require('./ocean.json')},{Hash:'playground-corp',Category:'Paired',Bundle:require('./playground-corp.json')},// Flow themes (originally pict-section-flow's internal presets; now first-class
// pict-section-theme entries so other apps can adopt the same color identity)
{Hash:'flow-modern',Category:'Flow',Bundle:require('./flow-modern.json')},{Hash:'flow-sketch',Category:'Flow',Bundle:require('./flow-sketch.json')},{Hash:'flow-blueprint',Category:'Flow',Bundle:require('./flow-blueprint.json')},{Hash:'flow-mono',Category:'Flow',Bundle:require('./flow-mono.json')},{Hash:'flow-retro-80s',Category:'Flow',Bundle:require('./flow-retro-80s.json')},{Hash:'flow-retro-90s',Category:'Flow',Bundle:require('./flow-retro-90s.json')},{Hash:'flow-whiteboard',Category:'Flow',Bundle:require('./flow-whiteboard.json')},// Greys (low-light single-mode themes)
{Hash:'twilight',Category:'Grey',Bundle:require('./twilight.json')},{Hash:'night',Category:'Grey',Bundle:require('./night.json')},{Hash:'evening',Category:'Grey',Bundle:require('./evening.json')},{Hash:'afternoon',Category:'Grey',Bundle:require('./afternoon.json')},{Hash:'daylight',Category:'Grey',Bundle:require('./daylight.json')},// Fun / period palettes
{Hash:'cyberpunk',Category:'Fun',Bundle:require('./cyberpunk.json')},{Hash:'synthwave',Category:'Fun',Bundle:require('./synthwave.json')},{Hash:'neo-tokyo',Category:'Fun',Bundle:require('./neo-tokyo.json')},{Hash:'solarized-dark',Category:'Fun',Bundle:require('./solarized-dark.json')},{Hash:'forest',Category:'Fun',Bundle:require('./forest.json')},{Hash:'hotdog',Category:'Fun',Bundle:require('./hotdog.json')},{Hash:'1970s-console',Category:'Fun',Bundle:require('./1970s-console.json')},{Hash:'1980s-console',Category:'Fun',Bundle:require('./1980s-console.json')},{Hash:'1990s-website',Category:'Fun',Bundle:require('./1990s-website.json')},{Hash:'early-2000s',Category:'Fun',Bundle:require('./early-2000s.json')},// Retro workstation palettes — extracted from retold-databeacon's
// original built-in theme set; period-platform-themed pairs.
{Hash:'databeacon-nineteen-97',Category:'Retro',Bundle:require('./databeacon-nineteen-97.json')},{Hash:'databeacon-mac-classic',Category:'Retro',Bundle:require('./databeacon-mac-classic.json')},{Hash:'databeacon-next',Category:'Retro',Bundle:require('./databeacon-next.json')},{Hash:'databeacon-beos',Category:'Retro',Bundle:require('./databeacon-beos.json')},{Hash:'databeacon-sgi',Category:'Retro',Bundle:require('./databeacon-sgi.json')},// Diagnostics / utility
{Hash:'mobile-debug',Category:'Debug',Bundle:require('./mobile-debug.json')}];for(let i=0;i<STARTER.length;i++){let tmpEntry=Object.assign({},STARTER[i],{Source:STARTER[i].Source||'starter'});this._themes.set(tmpEntry.Hash,tmpEntry);}}// ── Public API ───────────────────────────────────────────────────────
/**
	 * Register a theme. Re-registering an existing hash overwrites cleanly.
	 *
	 * @param {{Hash, Bundle, Category?, IsDefault?, Source?}} pEntry
	 * @returns {object} the stored entry
	 */register(pEntry){if(!pEntry||typeof pEntry!=='object'){throw new Error('ThemeRegistry.register: entry must be an object');}if(typeof pEntry.Hash!=='string'||pEntry.Hash.length===0){throw new Error('ThemeRegistry.register: entry.Hash is required');}if(!pEntry.Bundle||typeof pEntry.Bundle!=='object'){throw new Error('ThemeRegistry.register: entry.Bundle is required');}let tmpStored=Object.assign({Source:'host'},pEntry);this._themes.set(pEntry.Hash,tmpStored);return tmpStored;}/**
	 * Remove a theme by hash. Returns true if anything was removed.
	 * @param {string} pHash
	 * @returns {boolean}
	 */unregister(pHash){return this._themes.delete(pHash);}/**
	 * Look up a single theme entry by hash.
	 * @param {string} pHash
	 * @returns {object|undefined}
	 */get(pHash){return this._themes.get(pHash);}has(pHash){return this._themes.has(pHash);}/**
	 * Snapshot of every registered entry, in registration order.
	 * @returns {Array<object>}
	 */list(){return Array.from(this._themes.values());}/**
	 * Drop every registered entry. Mostly useful in tests; production
	 * consumers should prefer `unregister()` per hash.
	 */clear(){this._themes.clear();}/**
	 * Re-load the bundled starter set. No-op if the starter set is
	 * already registered (re-registering replaces, so this is safe to
	 * call any time).
	 */loadStarterSet(){this._loadStarterSet();}/**
	 * Number of registered themes.
	 * @returns {number}
	 */get count(){return this._themes.size;}/**
	 * Async fetch + register from a URL. Used by the future "online theme
	 * garden" — the URL must serve a JSON bundle compatible with
	 * pict-provider-theme's `registerTheme()` shape.
	 *
	 * @param {string} pURL
	 * @param {{Category?, IsDefault?, Hash?}} [pMetadata] - override metadata
	 * @returns {Promise<object>} the registered entry
	 */async registerFromURL(pURL,pMetadata){if(typeof fetch!=='function'){throw new Error('ThemeRegistry.registerFromURL: fetch is not available in this environment');}let tmpResponse=await fetch(pURL);if(!tmpResponse.ok){throw new Error('ThemeRegistry.registerFromURL: HTTP '+tmpResponse.status+' for '+pURL);}let tmpBundle=await tmpResponse.json();if(!tmpBundle||typeof tmpBundle!=='object'||typeof tmpBundle.Hash!=='string'){throw new Error('ThemeRegistry.registerFromURL: payload missing Hash');}let tmpMeta=pMetadata||{};return this.register({Hash:tmpMeta.Hash||tmpBundle.Hash,Bundle:tmpBundle,Category:tmpMeta.Category||'Garden',IsDefault:!!tmpMeta.IsDefault,Source:pURL});}// ── Array-like compatibility ─────────────────────────────────────────
// Older code iterated the catalog as an array (`for (let i = 0; i <
// CATALOG.length; i++) ... CATALOG[i]`). Preserve those usages without
// requiring a refactor: the iterator + length + numeric proxy give
// `Array.isArray(registry)` returns false, but everything that reads
// keeps working. New code should prefer `list()` / `get()`.
get length(){return this._themes.size;}[Symbol.iterator](){return this._themes.values();}}// Singleton — every consumer gets the same registry.
const _Registry=new ThemeRegistry();// Numeric-index proxy: `registry[0]` returns the first entry, matching
// the legacy "catalog as array" shape. Wraps the singleton so existing
// `tmpEntry = _CATALOG[i]` loops keep working.
const _IndexedRegistry=new Proxy(_Registry,{get(pTarget,pProp,pReceiver){if(typeof pProp==='string'&&/^\d+$/.test(pProp)){let tmpIdx=parseInt(pProp,10);let tmpList=pTarget.list();return tmpList[tmpIdx];}return Reflect.get(pTarget,pProp,pReceiver);},has(pTarget,pProp){if(typeof pProp==='string'&&/^\d+$/.test(pProp)){return parseInt(pProp,10)<pTarget.length;}return Reflect.has(pTarget,pProp);}});module.exports=_IndexedRegistry;module.exports.ThemeRegistry=ThemeRegistry;},{"./1970s-console.json":33,"./1980s-console.json":34,"./1990s-website.json":35,"./afternoon.json":37,"./cyberpunk.json":38,"./databeacon-beos.json":39,"./databeacon-mac-classic.json":40,"./databeacon-next.json":41,"./databeacon-nineteen-97.json":42,"./databeacon-sgi.json":43,"./daylight.json":44,"./early-2000s.json":45,"./evening.json":46,"./flow-blueprint.json":47,"./flow-modern.json":48,"./flow-mono.json":49,"./flow-retro-80s.json":50,"./flow-retro-90s.json":51,"./flow-sketch.json":52,"./flow-whiteboard.json":53,"./forest.json":54,"./hotdog.json":55,"./mobile-debug.json":56,"./neo-tokyo.json":57,"./night.json":58,"./ocean.json":59,"./pict-default.json":60,"./playground-corp.json":61,"./retold-content-system.json":62,"./retold-default.json":63,"./retold-labs-cyberpunk.json":64,"./retold-labs-retro.json":65,"./retold-labs.json":66,"./retold-manager.json":67,"./retold-mono.json":68,"./solarized-dark.json":69,"./synthwave.json":70,"./twilight.json":71,"./ultravisor-desert-canyon.json":72,"./ultravisor-desert-day.json":73,"./ultravisor-desert-dusk.json":74,"./ultravisor-desert-sunset.json":75,"./ultravisor-professional-dark.json":76,"./ultravisor-professional-light.json":77}],37:[function(require,module,exports){module.exports={"Hash":"afternoon","Name":"Afternoon","Category":"Grey","Version":"0.0.1","Description":"Warm light grey, softer contrast Ported from RetoldRemote-ThemeDefinitions.js to the pict-provider-theme manifest format.","Comprehensive":true,"Modes":{"Strategy":"single","Default":"light"},"Tokens":{"Color":{"Background":{"Primary":"#E8E4E0","Secondary":"#DAD6D2","Tertiary":"#D0CCC8","Panel":"#DDD9D5","Viewer":"#F0ECE8","Hover":"#CCC8C4","Selected":"#B8B4B0","Thumb":"#DAD6D2"},"Text":{"Primary":"#2A2A2A","Secondary":"#404040","Muted":"#707070","Dim":"#909090","Placeholder":"#B0B0B0"},"Brand":{"Accent":"#555555","AccentHover":"#333333"},"Border":{"Default":"#C0BCB8","Light":"#D0CCC8"},"Status":{"Danger":"#AA3333","DangerMuted":"#886655"},"Scrollbar":{"Track":"#B8B4B0","Hover":"#A0A09C"},"Selection":{"Background":"rgba(85, 85, 85, 0.2)"},"Focus":{"Outline":"#555555"},"Syntax":{"Keyword":"#7038A0","String":"#2E7A3A","Number":"#A86B00","Comment":"#888888","Operator":"#1F6FB5","Punctuation":"#666666","Function":"#3357C7","Variable":"#222222","Type":"#A86B00","Builtin":"#A86B00","Property":"#B62828","Tag":"#B62828","AttrName":"#A86B00","AttrValue":"#2E7A3A"}},"Typography":{"Family":{"Sans":"Georgia, 'Times New Roman', serif","Mono":"'Courier New', Courier, monospace"}}},"Aliases":{"--retold-bg-primary":"Color.Background.Primary","--retold-bg-secondary":"Color.Background.Secondary","--retold-bg-tertiary":"Color.Background.Tertiary","--retold-bg-panel":"Color.Background.Panel","--retold-bg-viewer":"Color.Background.Viewer","--retold-bg-hover":"Color.Background.Hover","--retold-bg-selected":"Color.Background.Selected","--retold-bg-thumb":"Color.Background.Thumb","--retold-text-primary":"Color.Text.Primary","--retold-text-secondary":"Color.Text.Secondary","--retold-text-muted":"Color.Text.Muted","--retold-text-dim":"Color.Text.Dim","--retold-text-placeholder":"Color.Text.Placeholder","--retold-accent":"Color.Brand.Accent","--retold-accent-hover":"Color.Brand.AccentHover","--retold-border":"Color.Border.Default","--retold-border-light":"Color.Border.Light","--retold-danger":"Color.Status.Danger","--retold-danger-muted":"Color.Status.DangerMuted","--retold-scrollbar":"Color.Scrollbar.Track","--retold-scrollbar-hover":"Color.Scrollbar.Hover","--retold-selection-bg":"Color.Selection.Background","--retold-focus-outline":"Color.Focus.Outline","--retold-font-family":"Typography.Family.Sans","--retold-font-mono":"Typography.Family.Mono"},"IconColors":{"Primary":"#404040","Accent":"#555555","Muted":"#909090","Light":"#D0CCC8","WarmBeige":"#DAD6D2","TealTint":"#CCC8C4","Lavender":"#D2D0CE","AmberTint":"#D8D2C8","PdfFill":"#D8C8C0","PdfText":"#AA3333"},"CSS":[],"SVG":{},"Image":{},"CompiledAt":"2026-05-03T18:12:53.406Z","CompilerVersion":1};},{}],38:[function(require,module,exports){module.exports={"Hash":"cyberpunk","Name":"Cyberpunk","Category":"Fun","Version":"0.0.1","Description":"Electric green on black Ported from RetoldRemote-ThemeDefinitions.js to the pict-provider-theme manifest format.","Comprehensive":true,"Modes":{"Strategy":"single","Default":"dark"},"Tokens":{"Color":{"Background":{"Primary":"#0A0E0A","Secondary":"#060806","Tertiary":"#0E120E","Panel":"#0C100C","Viewer":"#040604","Hover":"#142014","Selected":"#1A3A1A","Thumb":"#060806"},"Text":{"Primary":"#C8FFC8","Secondary":"#A0D8A0","Muted":"#608860","Dim":"#406040","Placeholder":"#305030"},"Brand":{"Accent":"#00FF41","AccentHover":"#44FF77"},"Border":{"Default":"#1A2A1A","Light":"#224022"},"Status":{"Danger":"#FF3333","DangerMuted":"#AA2222"},"Scrollbar":{"Track":"#1A2A1A","Hover":"#2A4A2A"},"Selection":{"Background":"rgba(0, 255, 65, 0.2)"},"Focus":{"Outline":"#00FF41"},"Syntax":{"Keyword":"#FF00FF","String":"#00FF41","Number":"#FFFF00","Comment":"#406040","Operator":"#00FFFF","Punctuation":"#A0D8A0","Function":"#FF00FF","Variable":"#C8FFC8","Type":"#FFFF00","Builtin":"#FFFF00","Property":"#FF3333","Tag":"#FF3333","AttrName":"#FFFF00","AttrValue":"#00FF41"}},"Typography":{"Family":{"Sans":"'Lucida Console', 'Courier New', monospace","Mono":"'Lucida Console', 'Courier New', monospace"}}},"Aliases":{"--retold-bg-primary":"Color.Background.Primary","--retold-bg-secondary":"Color.Background.Secondary","--retold-bg-tertiary":"Color.Background.Tertiary","--retold-bg-panel":"Color.Background.Panel","--retold-bg-viewer":"Color.Background.Viewer","--retold-bg-hover":"Color.Background.Hover","--retold-bg-selected":"Color.Background.Selected","--retold-bg-thumb":"Color.Background.Thumb","--retold-text-primary":"Color.Text.Primary","--retold-text-secondary":"Color.Text.Secondary","--retold-text-muted":"Color.Text.Muted","--retold-text-dim":"Color.Text.Dim","--retold-text-placeholder":"Color.Text.Placeholder","--retold-accent":"Color.Brand.Accent","--retold-accent-hover":"Color.Brand.AccentHover","--retold-border":"Color.Border.Default","--retold-border-light":"Color.Border.Light","--retold-danger":"Color.Status.Danger","--retold-danger-muted":"Color.Status.DangerMuted","--retold-scrollbar":"Color.Scrollbar.Track","--retold-scrollbar-hover":"Color.Scrollbar.Hover","--retold-selection-bg":"Color.Selection.Background","--retold-focus-outline":"Color.Focus.Outline","--retold-font-family":"Typography.Family.Sans","--retold-font-mono":"Typography.Family.Mono"},"IconColors":{"Primary":"#A0D8A0","Accent":"#00FF41","Muted":"#406040","Light":"#0E120E","WarmBeige":"#101610","TealTint":"#0C140C","Lavender":"#0E120E","AmberTint":"#141810","PdfFill":"#181010","PdfText":"#FF3333"},"CSS":[],"SVG":{},"Image":{},"CompiledAt":"2026-05-03T18:12:53.406Z","CompilerVersion":1};},{}],39:[function(require,module,exports){module.exports={"Hash":"databeacon-beos","Name":"DataBeacon \u2014 BeOS","Version":"0.0.1","Description":"BeOS palette \u2014 cool teals with orange accents. Light: sky-blue desktop. Dark: deep ocean panels with cyan highlights.","Comprehensive":true,"Modes":{"Strategy":"system","Default":"system"},"Tokens":{"Color":{"Background":{"Primary":{"Light":"#e0e8ec","Dark":"#0a1a22"},"Secondary":{"Light":"#c8d6de","Dark":"#102530"},"Tertiary":{"Light":"#d4dfe5","Dark":"#0d1f29"},"Panel":{"Light":"#f0f4f6","Dark":"#142430"},"Input":{"Light":"#ffffff","Dark":"#1b313f"},"Hover":{"Light":"#d7dee2","Dark":"#091820"},"Selected":{"Light":"#c2d4da","Dark":"#19353e"}},"Text":{"Primary":{"Light":"#101820","Dark":"#b0d0e0"},"Secondary":{"Light":"#40525e","Dark":"#7a98a8"},"Muted":{"Light":"#6e828e","Dark":"#556a78"},"Placeholder":{"Light":"#95a5ae","Dark":"#3a4e59"},"OnBrand":{"Light":"#ffffff","Dark":"#0a1a22"}},"Brand":{"Primary":{"Light":"#3a7a8a","Dark":"#60b0c0"},"PrimaryHover":{"Light":"#4e98aa","Dark":"#80ccdc"},"Accent":{"Light":"#3a7a8a","Dark":"#60b0c0"},"AccentHover":{"Light":"#4e98aa","Dark":"#80ccdc"}},"Border":{"Default":{"Light":"#8ba3b0","Dark":"#466070"},"Light":{"Light":"#b5c5ce","Dark":"#283d49"},"Strong":{"Light":"#6f828c","Dark":"#384c59"}},"Status":{"Success":{"Light":"#2a7a4a","Dark":"#4ac06a"},"Warning":{"Light":"#cc9930","Dark":"#ffc860"},"Error":{"Light":"#cc5530","Dark":"#ff8060"},"Info":{"Light":"#3a7a8a","Dark":"#60b0c0"}},"Scrollbar":{"Track":{"Light":"#c8d6de","Dark":"#102530"},"Thumb":{"Light":"#7c929f","Dark":"#4d6574"},"Hover":{"Light":"#6e828e","Dark":"#556a78"}},"Selection":{"Background":{"Light":"#aac4cc","Dark":"#254a54"},"Text":{"Light":"#101820","Dark":"#b0d0e0"}},"Focus":{"Outline":{"Light":"#3a7a8a","Dark":"#60b0c0"}},"Shadow":{"Color":{"Light":"rgba(0, 0, 0, 0.12)","Dark":"rgba(0, 0, 0, 0.55)"}},"Syntax":{"Keyword":{"Light":"#cc5530","Dark":"#ff8060"},"String":{"Light":"#2a7a4a","Dark":"#4ac06a"},"Number":{"Light":"#cc9930","Dark":"#ffc860"},"Comment":{"Light":"#6e828e","Dark":"#556a78"},"Operator":{"Light":"#3a7a8a","Dark":"#60b0c0"},"Punctuation":{"Light":"#40525e","Dark":"#7a98a8"},"Function":{"Light":"#3a7a8a","Dark":"#60b0c0"},"Variable":{"Light":"#101820","Dark":"#b0d0e0"},"Type":{"Light":"#cc9930","Dark":"#ffc860"},"Builtin":{"Light":"#cc9930","Dark":"#ffc860"},"Property":{"Light":"#cc5530","Dark":"#ff8060"},"Tag":{"Light":"#cc5530","Dark":"#ff8060"},"AttrName":{"Light":"#cc9930","Dark":"#ffc860"},"AttrValue":{"Light":"#2a7a4a","Dark":"#4ac06a"}}},"Typography":{"Family":{"Sans":"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif","Serif":"Georgia, Cambria, 'Times New Roman', Times, serif","Mono":"'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'Courier New', monospace"},"Size":{"XS":"0.75rem","SM":"0.875rem","MD":"1rem","LG":"1.125rem","XL":"1.375rem","XXL":"1.75rem"},"Weight":{"Regular":"400","Medium":"500","Bold":"700"},"LineHeight":{"Tight":"1.2","Normal":"1.5","Loose":"1.7"}},"Spacing":{"XS":"4px","SM":"8px","MD":"12px","LG":"16px","XL":"24px","XXL":"32px"},"Radius":{"None":"0","SM":"2px","MD":"4px","LG":"8px","XL":"12px","Pill":"999px"},"Layout":{"SidebarWidth":"220px","TopbarHeight":"48px","StatusbarHeight":"28px"}},"Brand":{"Name":"BeOS","Tagline":"Connect, introspect, and expose remote databases"}};},{}],40:[function(require,module,exports){module.exports={"Hash":"databeacon-mac-classic","Name":"DataBeacon \u2014 Mac Classic","Version":"0.0.1","Description":"Mac OS 8/9 Platinum palette \u2014 soft greys with sky blue accents. Light: classic Mac platinum. Dark: charcoal panels with the same blue accent family.","Comprehensive":true,"Modes":{"Strategy":"system","Default":"system"},"Tokens":{"Color":{"Background":{"Primary":{"Light":"#dddddd","Dark":"#202020"},"Secondary":{"Light":"#cccccc","Dark":"#2a2a2a"},"Tertiary":{"Light":"#d4d4d4","Dark":"#252525"},"Panel":{"Light":"#f0f0f0","Dark":"#2e2e2e"},"Input":{"Light":"#ffffff","Dark":"#3a3a3a"},"Hover":{"Light":"#d4d4d4","Dark":"#1e1e1e"},"Selected":{"Light":"#c0cce3","Dark":"#2b3748"}},"Text":{"Primary":{"Light":"#000000","Dark":"#dddddd"},"Secondary":{"Light":"#444444","Dark":"#b0b0b0"},"Muted":{"Light":"#777777","Dark":"#777777"},"Placeholder":{"Light":"#9a9a9a","Dark":"#585858"},"OnBrand":{"Light":"#ffffff","Dark":"#0a0a0a"}},"Brand":{"Primary":{"Light":"#4080ff","Dark":"#60a0ff"},"PrimaryHover":{"Light":"#60a0ff","Dark":"#80b8ff"},"Accent":{"Light":"#4080ff","Dark":"#60a0ff"},"AccentHover":{"Light":"#60a0ff","Dark":"#80b8ff"}},"Border":{"Default":{"Light":"#999999","Dark":"#555555"},"Light":{"Light":"#bbbbbb","Dark":"#3a3a3a"},"Strong":{"Light":"#7a7a7a","Dark":"#444444"}},"Status":{"Success":{"Light":"#339933","Dark":"#60cc60"},"Warning":{"Light":"#cc6600","Dark":"#ff9933"},"Error":{"Light":"#cc0000","Dark":"#ff4060"},"Info":{"Light":"#4080ff","Dark":"#60a0ff"}},"Scrollbar":{"Track":{"Light":"#cccccc","Dark":"#2a2a2a"},"Thumb":{"Light":"#888888","Dark":"#666666"},"Hover":{"Light":"#777777","Dark":"#777777"}},"Selection":{"Background":{"Light":"#aabfe7","Dark":"#344867"},"Text":{"Light":"#000000","Dark":"#dddddd"}},"Focus":{"Outline":{"Light":"#4080ff","Dark":"#60a0ff"}},"Shadow":{"Color":{"Light":"rgba(0, 0, 0, 0.12)","Dark":"rgba(0, 0, 0, 0.55)"}},"Syntax":{"Keyword":{"Light":"#cc0000","Dark":"#ff4060"},"String":{"Light":"#339933","Dark":"#60cc60"},"Number":{"Light":"#cc6600","Dark":"#ff9933"},"Comment":{"Light":"#777777","Dark":"#777777"},"Operator":{"Light":"#4080ff","Dark":"#60a0ff"},"Punctuation":{"Light":"#444444","Dark":"#b0b0b0"},"Function":{"Light":"#4080ff","Dark":"#60a0ff"},"Variable":{"Light":"#000000","Dark":"#dddddd"},"Type":{"Light":"#cc6600","Dark":"#ff9933"},"Builtin":{"Light":"#cc6600","Dark":"#ff9933"},"Property":{"Light":"#cc0000","Dark":"#ff4060"},"Tag":{"Light":"#cc0000","Dark":"#ff4060"},"AttrName":{"Light":"#cc6600","Dark":"#ff9933"},"AttrValue":{"Light":"#339933","Dark":"#60cc60"}}},"Typography":{"Family":{"Sans":"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif","Serif":"Georgia, Cambria, 'Times New Roman', Times, serif","Mono":"'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'Courier New', monospace"},"Size":{"XS":"0.75rem","SM":"0.875rem","MD":"1rem","LG":"1.125rem","XL":"1.375rem","XXL":"1.75rem"},"Weight":{"Regular":"400","Medium":"500","Bold":"700"},"LineHeight":{"Tight":"1.2","Normal":"1.5","Loose":"1.7"}},"Spacing":{"XS":"4px","SM":"8px","MD":"12px","LG":"16px","XL":"24px","XXL":"32px"},"Radius":{"None":"0","SM":"2px","MD":"4px","LG":"8px","XL":"12px","Pill":"999px"},"Layout":{"SidebarWidth":"220px","TopbarHeight":"48px","StatusbarHeight":"28px"}},"Brand":{"Name":"Mac Classic","Tagline":"Connect, introspect, and expose remote databases"}};},{}],41:[function(require,module,exports){module.exports={"Hash":"databeacon-next","Name":"DataBeacon \u2014 NeXT","Version":"0.0.1","Description":"NeXTSTEP palette \u2014 stone backgrounds with rich purple accents. Light: warm stone. Dark: deep aubergine with lavender highlights.","Comprehensive":true,"Modes":{"Strategy":"system","Default":"system"},"Tokens":{"Color":{"Background":{"Primary":{"Light":"#e8e6dd","Dark":"#1a1420"},"Secondary":{"Light":"#d6d3c8","Dark":"#221a2c"},"Tertiary":{"Light":"#dfdcd2","Dark":"#1e1726"},"Panel":{"Light":"#f5f3ed","Dark":"#251c2e"},"Input":{"Light":"#ffffff","Dark":"#2f253a"},"Hover":{"Light":"#dedcd4","Dark":"#18131e"},"Selected":{"Light":"#d1c7d2","Dark":"#352a42"}},"Text":{"Primary":{"Light":"#1e1a26","Dark":"#e8e6dd"},"Secondary":{"Light":"#4c465a","Dark":"#b8b4c6"},"Muted":{"Light":"#7a7488","Dark":"#7a7488"},"Placeholder":{"Light":"#a09ba5","Dark":"#585263"},"OnBrand":{"Light":"#ffffff","Dark":"#1a1420"}},"Brand":{"Primary":{"Light":"#6a3fa0","Dark":"#b090e0"},"PrimaryHover":{"Light":"#8557c0","Dark":"#c8aef0"},"Accent":{"Light":"#6a3fa0","Dark":"#b090e0"},"AccentHover":{"Light":"#8557c0","Dark":"#c8aef0"}},"Border":{"Default":{"Light":"#9a96a6","Dark":"#5e5468"},"Light":{"Light":"#c1bec1","Dark":"#3c3444"},"Strong":{"Light":"#7b7884","Dark":"#4b4353"}},"Status":{"Success":{"Light":"#3a7a3a","Dark":"#7acc7a"},"Warning":{"Light":"#b88a00","Dark":"#ffcf4a"},"Error":{"Light":"#aa2c3a","Dark":"#ff6a80"},"Info":{"Light":"#6a3fa0","Dark":"#b090e0"}},"Scrollbar":{"Track":{"Light":"#d6d3c8","Dark":"#221a2c"},"Thumb":{"Light":"#8a8597","Dark":"#6c6478"},"Hover":{"Light":"#7a7488","Dark":"#7a7488"}},"Selection":{"Background":{"Light":"#bfb0c9","Dark":"#4a3b5d"},"Text":{"Light":"#1e1a26","Dark":"#e8e6dd"}},"Focus":{"Outline":{"Light":"#6a3fa0","Dark":"#b090e0"}},"Shadow":{"Color":{"Light":"rgba(0, 0, 0, 0.12)","Dark":"rgba(0, 0, 0, 0.55)"}},"Syntax":{"Keyword":{"Light":"#aa2c3a","Dark":"#ff6a80"},"String":{"Light":"#3a7a3a","Dark":"#7acc7a"},"Number":{"Light":"#b88a00","Dark":"#ffcf4a"},"Comment":{"Light":"#7a7488","Dark":"#7a7488"},"Operator":{"Light":"#6a3fa0","Dark":"#b090e0"},"Punctuation":{"Light":"#4c465a","Dark":"#b8b4c6"},"Function":{"Light":"#6a3fa0","Dark":"#b090e0"},"Variable":{"Light":"#1e1a26","Dark":"#e8e6dd"},"Type":{"Light":"#b88a00","Dark":"#ffcf4a"},"Builtin":{"Light":"#b88a00","Dark":"#ffcf4a"},"Property":{"Light":"#aa2c3a","Dark":"#ff6a80"},"Tag":{"Light":"#aa2c3a","Dark":"#ff6a80"},"AttrName":{"Light":"#b88a00","Dark":"#ffcf4a"},"AttrValue":{"Light":"#3a7a3a","Dark":"#7acc7a"}}},"Typography":{"Family":{"Sans":"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif","Serif":"Georgia, Cambria, 'Times New Roman', Times, serif","Mono":"'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'Courier New', monospace"},"Size":{"XS":"0.75rem","SM":"0.875rem","MD":"1rem","LG":"1.125rem","XL":"1.375rem","XXL":"1.75rem"},"Weight":{"Regular":"400","Medium":"500","Bold":"700"},"LineHeight":{"Tight":"1.2","Normal":"1.5","Loose":"1.7"}},"Spacing":{"XS":"4px","SM":"8px","MD":"12px","LG":"16px","XL":"24px","XXL":"32px"},"Radius":{"None":"0","SM":"2px","MD":"4px","LG":"8px","XL":"12px","Pill":"999px"},"Layout":{"SidebarWidth":"220px","TopbarHeight":"48px","StatusbarHeight":"28px"}},"Brand":{"Name":"NeXT","Tagline":"Connect, introspect, and expose remote databases"}};},{}],42:[function(require,module,exports){module.exports={"Hash":"databeacon-nineteen-97","Name":"DataBeacon \u2014 1997 (Win95/98)","Version":"0.0.1","Description":"Windows 95/98 retro palette \u2014 beige + navy + maroon. Light: classic Win95 desktop. Dark: indigo-grey background with sky/coral accents.","Comprehensive":true,"Modes":{"Strategy":"system","Default":"system"},"Tokens":{"Color":{"Background":{"Primary":{"Light":"#ece9d8","Dark":"#1e1e2e"},"Secondary":{"Light":"#d8d3b8","Dark":"#26263a"},"Tertiary":{"Light":"#e2dec8","Dark":"#222234"},"Panel":{"Light":"#fffbf0","Dark":"#2a2a3a"},"Input":{"Light":"#ffffff","Dark":"#343450"},"Hover":{"Light":"#e2dfcf","Dark":"#1c1c2c"},"Selected":{"Light":"#c1bfc8","Dark":"#2f3553"}},"Text":{"Primary":{"Light":"#1a1a1a","Dark":"#ece9d8"},"Secondary":{"Light":"#4a4a4a","Dark":"#b8b6a8"},"Muted":{"Light":"#7a7a7a","Dark":"#7e7c70"},"Placeholder":{"Light":"#a1a09a","Dark":"#5c5b58"},"OnBrand":{"Light":"#ffffff","Dark":"#1a1a1a"}},"Brand":{"Primary":{"Light":"#000080","Dark":"#80a0ff"},"PrimaryHover":{"Light":"#0000cc","Dark":"#a0b8ff"},"Accent":{"Light":"#000080","Dark":"#80a0ff"},"AccentHover":{"Light":"#0000cc","Dark":"#a0b8ff"}},"Border":{"Default":{"Light":"#808080","Dark":"#4e4e68"},"Light":{"Light":"#b6b4ac","Dark":"#36364b"},"Strong":{"Light":"#666666","Dark":"#3e3e53"}},"Status":{"Success":{"Light":"#008000","Dark":"#80ff80"},"Warning":{"Light":"#808000","Dark":"#ffcc00"},"Error":{"Light":"#800000","Dark":"#ff8080"},"Info":{"Light":"#000080","Dark":"#80c0ff"}},"Scrollbar":{"Track":{"Light":"#d8d3b8","Dark":"#26263a"},"Thumb":{"Light":"#7d7d7d","Dark":"#66656c"},"Hover":{"Light":"#7a7a7a","Dark":"#7e7c70"}},"Selection":{"Background":{"Light":"#a09ebb","Dark":"#3d4770"},"Text":{"Light":"#1a1a1a","Dark":"#ece9d8"}},"Focus":{"Outline":{"Light":"#000080","Dark":"#80a0ff"}},"Shadow":{"Color":{"Light":"rgba(0, 0, 0, 0.12)","Dark":"rgba(0, 0, 0, 0.55)"}},"Syntax":{"Keyword":{"Light":"#800000","Dark":"#ff8080"},"String":{"Light":"#008000","Dark":"#80ff80"},"Number":{"Light":"#808000","Dark":"#ffcc00"},"Comment":{"Light":"#7a7a7a","Dark":"#7e7c70"},"Operator":{"Light":"#000080","Dark":"#80a0ff"},"Punctuation":{"Light":"#4a4a4a","Dark":"#b8b6a8"},"Function":{"Light":"#000080","Dark":"#80c0ff"},"Variable":{"Light":"#1a1a1a","Dark":"#ece9d8"},"Type":{"Light":"#808000","Dark":"#ffcc00"},"Builtin":{"Light":"#808000","Dark":"#ffcc00"},"Property":{"Light":"#800000","Dark":"#ff8080"},"Tag":{"Light":"#800000","Dark":"#ff8080"},"AttrName":{"Light":"#808000","Dark":"#ffcc00"},"AttrValue":{"Light":"#008000","Dark":"#80ff80"}}},"Typography":{"Family":{"Sans":"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif","Serif":"Georgia, Cambria, 'Times New Roman', Times, serif","Mono":"'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'Courier New', monospace"},"Size":{"XS":"0.75rem","SM":"0.875rem","MD":"1rem","LG":"1.125rem","XL":"1.375rem","XXL":"1.75rem"},"Weight":{"Regular":"400","Medium":"500","Bold":"700"},"LineHeight":{"Tight":"1.2","Normal":"1.5","Loose":"1.7"}},"Spacing":{"XS":"4px","SM":"8px","MD":"12px","LG":"16px","XL":"24px","XXL":"32px"},"Radius":{"None":"0","SM":"2px","MD":"4px","LG":"8px","XL":"12px","Pill":"999px"},"Layout":{"SidebarWidth":"220px","TopbarHeight":"48px","StatusbarHeight":"28px"}},"Brand":{"Name":"1997 (Win95/98)","Tagline":"Connect, introspect, and expose remote databases"}};},{}],43:[function(require,module,exports){module.exports={"Hash":"databeacon-sgi","Name":"DataBeacon \u2014 SGI","Version":"0.0.1","Description":"SGI Indy / IRIX palette \u2014 magenta with cyan highlights. Light: signature SGI grey. Dark: deep workstation black with the same hot magenta.","Comprehensive":true,"Modes":{"Strategy":"system","Default":"system"},"Tokens":{"Color":{"Background":{"Primary":{"Light":"#c8c8c8","Dark":"#1a1a1a"},"Secondary":{"Light":"#b8b8b8","Dark":"#232323"},"Tertiary":{"Light":"#c0c0c0","Dark":"#1e1e1e"},"Panel":{"Light":"#dcdcdc","Dark":"#252525"},"Input":{"Light":"#ffffff","Dark":"#2e2e2e"},"Hover":{"Light":"#c0c0c0","Dark":"#181818"},"Selected":{"Light":"#c8a9bb","Dark":"#432635"}},"Text":{"Primary":{"Light":"#202020","Dark":"#e0e0e0"},"Secondary":{"Light":"#4a4a4a","Dark":"#a8a8a8"},"Muted":{"Light":"#6e6e6e","Dark":"#707070"},"Placeholder":{"Light":"#8d8d8d","Dark":"#515151"},"OnBrand":{"Light":"#ffffff","Dark":"#0a0a0a"}},"Brand":{"Primary":{"Light":"#c82080","Dark":"#ff60b0"},"PrimaryHover":{"Light":"#e040a0","Dark":"#ff80c8"},"Accent":{"Light":"#c82080","Dark":"#ff60b0"},"AccentHover":{"Light":"#e040a0","Dark":"#ff80c8"}},"Border":{"Default":{"Light":"#808080","Dark":"#505050"},"Light":{"Light":"#a4a4a4","Dark":"#353535"},"Strong":{"Light":"#666666","Dark":"#404040"}},"Status":{"Success":{"Light":"#208040","Dark":"#50d080"},"Warning":{"Light":"#e8a818","Dark":"#ffd050"},"Error":{"Light":"#e83018","Dark":"#ff6060"},"Info":{"Light":"#3080c0","Dark":"#60c0ff"}},"Scrollbar":{"Track":{"Light":"#b8b8b8","Dark":"#232323"},"Thumb":{"Light":"#777777","Dark":"#606060"},"Hover":{"Light":"#6e6e6e","Dark":"#707070"}},"Selection":{"Background":{"Light":"#c892b0","Dark":"#63304a"},"Text":{"Light":"#202020","Dark":"#e0e0e0"}},"Focus":{"Outline":{"Light":"#c82080","Dark":"#ff60b0"}},"Shadow":{"Color":{"Light":"rgba(0, 0, 0, 0.12)","Dark":"rgba(0, 0, 0, 0.55)"}},"Syntax":{"Keyword":{"Light":"#e83018","Dark":"#ff6060"},"String":{"Light":"#208040","Dark":"#50d080"},"Number":{"Light":"#e8a818","Dark":"#ffd050"},"Comment":{"Light":"#6e6e6e","Dark":"#707070"},"Operator":{"Light":"#c82080","Dark":"#ff60b0"},"Punctuation":{"Light":"#4a4a4a","Dark":"#a8a8a8"},"Function":{"Light":"#3080c0","Dark":"#60c0ff"},"Variable":{"Light":"#202020","Dark":"#e0e0e0"},"Type":{"Light":"#e8a818","Dark":"#ffd050"},"Builtin":{"Light":"#e8a818","Dark":"#ffd050"},"Property":{"Light":"#e83018","Dark":"#ff6060"},"Tag":{"Light":"#e83018","Dark":"#ff6060"},"AttrName":{"Light":"#e8a818","Dark":"#ffd050"},"AttrValue":{"Light":"#208040","Dark":"#50d080"}}},"Typography":{"Family":{"Sans":"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif","Serif":"Georgia, Cambria, 'Times New Roman', Times, serif","Mono":"'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'Courier New', monospace"},"Size":{"XS":"0.75rem","SM":"0.875rem","MD":"1rem","LG":"1.125rem","XL":"1.375rem","XXL":"1.75rem"},"Weight":{"Regular":"400","Medium":"500","Bold":"700"},"LineHeight":{"Tight":"1.2","Normal":"1.5","Loose":"1.7"}},"Spacing":{"XS":"4px","SM":"8px","MD":"12px","LG":"16px","XL":"24px","XXL":"32px"},"Radius":{"None":"0","SM":"2px","MD":"4px","LG":"8px","XL":"12px","Pill":"999px"},"Layout":{"SidebarWidth":"220px","TopbarHeight":"48px","StatusbarHeight":"28px"}},"Brand":{"Name":"SGI","Tagline":"Connect, introspect, and expose remote databases"}};},{}],44:[function(require,module,exports){module.exports={"Hash":"daylight","Name":"Daylight","Category":"Grey","Version":"0.0.1","Description":"Bright white, dark text Ported from RetoldRemote-ThemeDefinitions.js to the pict-provider-theme manifest format.","Comprehensive":true,"Modes":{"Strategy":"single","Default":"light"},"Tokens":{"Color":{"Background":{"Primary":"#FFFFFF","Secondary":"#F0F0F0","Tertiary":"#E8E8E8","Panel":"#F5F5F5","Viewer":"#FAFAFA","Hover":"#E0E0E0","Selected":"#C8C8C8","Thumb":"#F0F0F0"},"Text":{"Primary":"#1A1A1A","Secondary":"#333333","Muted":"#666666","Dim":"#888888","Placeholder":"#AAAAAA"},"Brand":{"Accent":"#444444","AccentHover":"#222222"},"Border":{"Default":"#D0D0D0","Light":"#E0E0E0"},"Status":{"Danger":"#CC0000","DangerMuted":"#884444"},"Scrollbar":{"Track":"#C0C0C0","Hover":"#A0A0A0"},"Selection":{"Background":"rgba(68, 68, 68, 0.2)"},"Focus":{"Outline":"#444444"},"Syntax":{"Keyword":"#7038A0","String":"#2E7A3A","Number":"#A86B00","Comment":"#888888","Operator":"#1F6FB5","Punctuation":"#444444","Function":"#3357C7","Variable":"#222222","Type":"#A86B00","Builtin":"#A86B00","Property":"#B62828","Tag":"#B62828","AttrName":"#A86B00","AttrValue":"#2E7A3A"}},"Typography":{"Family":{"Sans":"'Segoe UI', system-ui, -apple-system, sans-serif","Mono":"'SF Mono', 'Fira Code', 'Consolas', monospace"}}},"Aliases":{"--retold-bg-primary":"Color.Background.Primary","--retold-bg-secondary":"Color.Background.Secondary","--retold-bg-tertiary":"Color.Background.Tertiary","--retold-bg-panel":"Color.Background.Panel","--retold-bg-viewer":"Color.Background.Viewer","--retold-bg-hover":"Color.Background.Hover","--retold-bg-selected":"Color.Background.Selected","--retold-bg-thumb":"Color.Background.Thumb","--retold-text-primary":"Color.Text.Primary","--retold-text-secondary":"Color.Text.Secondary","--retold-text-muted":"Color.Text.Muted","--retold-text-dim":"Color.Text.Dim","--retold-text-placeholder":"Color.Text.Placeholder","--retold-accent":"Color.Brand.Accent","--retold-accent-hover":"Color.Brand.AccentHover","--retold-border":"Color.Border.Default","--retold-border-light":"Color.Border.Light","--retold-danger":"Color.Status.Danger","--retold-danger-muted":"Color.Status.DangerMuted","--retold-scrollbar":"Color.Scrollbar.Track","--retold-scrollbar-hover":"Color.Scrollbar.Hover","--retold-selection-bg":"Color.Selection.Background","--retold-focus-outline":"Color.Focus.Outline","--retold-font-family":"Typography.Family.Sans","--retold-font-mono":"Typography.Family.Mono"},"IconColors":{"Primary":"#333333","Accent":"#444444","Muted":"#888888","Light":"#E8E8E8","WarmBeige":"#F0F0F0","TealTint":"#E0E0E0","Lavender":"#EBEBEB","AmberTint":"#F0EDE8","PdfFill":"#F0E0E0","PdfText":"#CC0000"},"CSS":[],"SVG":{},"Image":{},"CompiledAt":"2026-05-03T18:12:53.407Z","CompilerVersion":1};},{}],45:[function(require,module,exports){module.exports={"Hash":"early-2000s","Name":"Early 2000s Web","Category":"Fun","Version":"0.0.1","Description":"Teal and silver, Web 2.0 Ported from RetoldRemote-ThemeDefinitions.js to the pict-provider-theme manifest format.","Comprehensive":true,"Modes":{"Strategy":"single","Default":"light"},"Tokens":{"Color":{"Background":{"Primary":"#E8F4F8","Secondary":"#D0E8EE","Tertiary":"#C0DDE6","Panel":"#D8EEF2","Viewer":"#F0F8FA","Hover":"#B0D4E0","Selected":"#88C4D8","Thumb":"#D0E8EE"},"Text":{"Primary":"#1A3A4A","Secondary":"#2A4A5A","Muted":"#5A7A8A","Dim":"#7A9AAA","Placeholder":"#9ABACA"},"Brand":{"Accent":"#0099CC","AccentHover":"#00AADD"},"Border":{"Default":"#A0C8D8","Light":"#B8D8E4"},"Status":{"Danger":"#CC3300","DangerMuted":"#994422"},"Scrollbar":{"Track":"#A0C8D8","Hover":"#88B8CC"},"Selection":{"Background":"rgba(0, 153, 204, 0.2)"},"Focus":{"Outline":"#0099CC"},"Syntax":{"Keyword":"#1A4080","String":"#2E7A3A","Number":"#A86B00","Comment":"#888888","Operator":"#1F6FB5","Punctuation":"#333333","Function":"#3357C7","Variable":"#222222","Type":"#A86B00","Builtin":"#A86B00","Property":"#B62828","Tag":"#B62828","AttrName":"#A86B00","AttrValue":"#2E7A3A"}},"Typography":{"Family":{"Sans":"Verdana, Geneva, Tahoma, sans-serif","Mono":"'Lucida Console', Monaco, monospace"}}},"Aliases":{"--retold-bg-primary":"Color.Background.Primary","--retold-bg-secondary":"Color.Background.Secondary","--retold-bg-tertiary":"Color.Background.Tertiary","--retold-bg-panel":"Color.Background.Panel","--retold-bg-viewer":"Color.Background.Viewer","--retold-bg-hover":"Color.Background.Hover","--retold-bg-selected":"Color.Background.Selected","--retold-bg-thumb":"Color.Background.Thumb","--retold-text-primary":"Color.Text.Primary","--retold-text-secondary":"Color.Text.Secondary","--retold-text-muted":"Color.Text.Muted","--retold-text-dim":"Color.Text.Dim","--retold-text-placeholder":"Color.Text.Placeholder","--retold-accent":"Color.Brand.Accent","--retold-accent-hover":"Color.Brand.AccentHover","--retold-border":"Color.Border.Default","--retold-border-light":"Color.Border.Light","--retold-danger":"Color.Status.Danger","--retold-danger-muted":"Color.Status.DangerMuted","--retold-scrollbar":"Color.Scrollbar.Track","--retold-scrollbar-hover":"Color.Scrollbar.Hover","--retold-selection-bg":"Color.Selection.Background","--retold-focus-outline":"Color.Focus.Outline","--retold-font-family":"Typography.Family.Sans","--retold-font-mono":"Typography.Family.Mono"},"IconColors":{"Primary":"#2A4A5A","Accent":"#0099CC","Muted":"#7A9AAA","Light":"#C0DDE6","WarmBeige":"#D0E8EE","TealTint":"#B0D8E4","Lavender":"#C8DCE6","AmberTint":"#D8E0D0","PdfFill":"#E0C8C0","PdfText":"#CC3300"},"CSS":[],"SVG":{},"Image":{},"CompiledAt":"2026-05-03T18:12:53.407Z","CompilerVersion":1};},{}],46:[function(require,module,exports){module.exports={"Hash":"evening","Name":"Evening","Category":"Grey","Version":"0.0.1","Description":"Medium grey, transitional Ported from RetoldRemote-ThemeDefinitions.js to the pict-provider-theme manifest format.","Comprehensive":true,"Modes":{"Strategy":"single","Default":"dark"},"Tokens":{"Color":{"Background":{"Primary":"#484848","Secondary":"#3C3C3C","Tertiary":"#424242","Panel":"#454545","Viewer":"#363636","Hover":"#525252","Selected":"#606060","Thumb":"#3C3C3C"},"Text":{"Primary":"#E0E0E0","Secondary":"#D0D0D0","Muted":"#A0A0A0","Dim":"#888888","Placeholder":"#707070"},"Brand":{"Accent":"#C0C0C0","AccentHover":"#E0E0E0"},"Border":{"Default":"#585858","Light":"#606060"},"Status":{"Danger":"#FF6666","DangerMuted":"#AA6666"},"Scrollbar":{"Track":"#585858","Hover":"#686868"},"Selection":{"Background":"rgba(192, 192, 192, 0.25)"},"Focus":{"Outline":"#C0C0C0"},"Syntax":{"Keyword":"#B894FF","String":"#A8D8B0","Number":"#FFB880","Comment":"#8A8A8A","Operator":"#7EC0FF","Punctuation":"#BBBBBB","Function":"#FFCC80","Variable":"#DDDDDD","Type":"#FFB880","Builtin":"#FFB880","Property":"#FF9494","Tag":"#FF9494","AttrName":"#FFB880","AttrValue":"#A8D8B0"}},"Typography":{"Family":{"Sans":"system-ui, -apple-system, sans-serif","Mono":"'SF Mono', 'Fira Code', 'Consolas', monospace"}}},"Aliases":{"--retold-bg-primary":"Color.Background.Primary","--retold-bg-secondary":"Color.Background.Secondary","--retold-bg-tertiary":"Color.Background.Tertiary","--retold-bg-panel":"Color.Background.Panel","--retold-bg-viewer":"Color.Background.Viewer","--retold-bg-hover":"Color.Background.Hover","--retold-bg-selected":"Color.Background.Selected","--retold-bg-thumb":"Color.Background.Thumb","--retold-text-primary":"Color.Text.Primary","--retold-text-secondary":"Color.Text.Secondary","--retold-text-muted":"Color.Text.Muted","--retold-text-dim":"Color.Text.Dim","--retold-text-placeholder":"Color.Text.Placeholder","--retold-accent":"Color.Brand.Accent","--retold-accent-hover":"Color.Brand.AccentHover","--retold-border":"Color.Border.Default","--retold-border-light":"Color.Border.Light","--retold-danger":"Color.Status.Danger","--retold-danger-muted":"Color.Status.DangerMuted","--retold-scrollbar":"Color.Scrollbar.Track","--retold-scrollbar-hover":"Color.Scrollbar.Hover","--retold-selection-bg":"Color.Selection.Background","--retold-focus-outline":"Color.Focus.Outline","--retold-font-family":"Typography.Family.Sans","--retold-font-mono":"Typography.Family.Mono"},"IconColors":{"Primary":"#D0D0D0","Accent":"#C0C0C0","Muted":"#888888","Light":"#424242","WarmBeige":"#484848","TealTint":"#3E3E3E","Lavender":"#444444","AmberTint":"#4A4640","PdfFill":"#4A3C3C","PdfText":"#FF6666"},"CSS":[],"SVG":{},"Image":{},"CompiledAt":"2026-05-03T18:12:53.407Z","CompilerVersion":1};},{}],47:[function(require,module,exports){module.exports={"Hash":"flow-blueprint","Name":"Flow Blueprint","Version":"0.0.1","Description":"Technical-drawing aesthetic — white-on-navy with yellow selection. Single-mode (always dark blueprint).","Comprehensive":true,"Modes":{"Strategy":"single","Default":"dark"},"Tokens":{"Color":{"Background":{"Primary":"#1a3a6a","Secondary":"#142e54","Tertiary":"rgba(255,255,255,0.1)","Panel":"#1a3a6a","Hover":"rgba(255,255,255,0.06)","Selected":"rgba(255,221,68,0.18)"},"Text":{"Primary":"#ffffff","Secondary":"rgba(255,255,255,0.7)","Muted":"rgba(255,255,255,0.5)","OnBrand":"#0d2244"},"Brand":{"Primary":"#ffdd44","PrimaryHover":"#ffe978","Accent":"#88ffbb"},"Border":{"Default":"rgba(255,255,255,0.6)","Light":"rgba(255,255,255,0.15)","Strong":"#ffffff"},"Status":{"Success":"#88ffbb","Warning":"#ffdd44","Error":"#ff8888","Info":"#88bbff"},"Scrollbar":{"Track":"rgba(255,255,255,0.05)","Thumb":"rgba(255,255,255,0.3)","Hover":"rgba(255,255,255,0.5)"},"Focus":{"Outline":"#ffdd44"},"Shadow":{"Color":"rgba(0, 0, 0, 0.4)"}}},"Brand":{"Name":"Flow Blueprint","Tagline":"Technical drawing on navy"}};},{}],48:[function(require,module,exports){module.exports={"Hash":"flow-modern","Name":"Flow Modern","Version":"0.0.1","Description":"The default modern look for pict-section-flow — clean, theme-neutral. Paired light/dark.","Comprehensive":true,"Modes":{"Strategy":"system","Default":"light"},"Tokens":{"Color":{"Background":{"Primary":{"Light":"#ffffff","Dark":"#1a1a1a"},"Secondary":{"Light":"#f5f5f5","Dark":"#242424"},"Tertiary":{"Light":"#ecf0f1","Dark":"#2e2e2e"},"Panel":{"Light":"#ffffff","Dark":"#222222"},"Hover":{"Light":"#eef3f7","Dark":"#2a2a2a"},"Selected":{"Light":"#dde7f3","Dark":"#2a3550"}},"Text":{"Primary":{"Light":"#2c3e50","Dark":"#ededed"},"Secondary":{"Light":"#7f8c8d","Dark":"#bdbdbd"},"Muted":{"Light":"#95a5a6","Dark":"#888888"},"OnBrand":{"Light":"#ffffff","Dark":"#1a1a1a"}},"Brand":{"Primary":{"Light":"#2255aa","Dark":"#5b8aff"},"PrimaryHover":{"Light":"#1a4488","Dark":"#7ba4ff"},"Accent":{"Light":"#1abc9c","Dark":"#4fd1b5"}},"Border":{"Default":{"Light":"#bdc3c7","Dark":"#3a3a3a"},"Light":{"Light":"#ecf0f1","Dark":"#2c2c2c"},"Strong":{"Light":"#95a5a6","Dark":"#5a5a5a"}},"Status":{"Success":{"Light":"#27ae60","Dark":"#5fc377"},"Warning":{"Light":"#f39c12","Dark":"#f0b84a"},"Error":{"Light":"#e74c3c","Dark":"#ff7373"},"Info":{"Light":"#3498db","Dark":"#5fb4ff"}},"Scrollbar":{"Track":{"Light":"#ecf0f1","Dark":"#1f1f1f"},"Thumb":{"Light":"#bdc3c7","Dark":"#3f3f3f"},"Hover":{"Light":"#95a5a6","Dark":"#5a5a5a"}},"Focus":{"Outline":{"Light":"#2255aa","Dark":"#5b8aff"}},"Shadow":{"Color":{"Light":"rgba(0, 0, 0, 0.12)","Dark":"rgba(0, 0, 0, 0.55)"}}}},"Brand":{"Name":"Flow Modern","Tagline":"Clean modern flow editor look"}};},{}],49:[function(require,module,exports){module.exports={"Hash":"flow-mono","Name":"Flow Mono","Version":"0.0.1","Description":"High-contrast monochrome flow editor look. Paired light/dark — pure black on white or white on black.","Comprehensive":true,"Modes":{"Strategy":"system","Default":"light"},"Tokens":{"Color":{"Background":{"Primary":{"Light":"#ffffff","Dark":"#000000"},"Secondary":{"Light":"#f0f0f0","Dark":"#1a1a1a"},"Tertiary":{"Light":"#e0e0e0","Dark":"#262626"},"Panel":{"Light":"#ffffff","Dark":"#000000"},"Hover":{"Light":"#eeeeee","Dark":"#1f1f1f"},"Selected":{"Light":"#dddddd","Dark":"#333333"}},"Text":{"Primary":{"Light":"#000000","Dark":"#ffffff"},"Secondary":{"Light":"#444444","Dark":"#cccccc"},"Muted":{"Light":"#888888","Dark":"#888888"},"OnBrand":{"Light":"#ffffff","Dark":"#000000"}},"Brand":{"Primary":{"Light":"#444444","Dark":"#bbbbbb"},"PrimaryHover":{"Light":"#222222","Dark":"#dddddd"},"Accent":{"Light":"#666666","Dark":"#999999"}},"Border":{"Default":{"Light":"#000000","Dark":"#ffffff"},"Light":{"Light":"#cccccc","Dark":"#333333"},"Strong":{"Light":"#000000","Dark":"#ffffff"}},"Status":{"Success":{"Light":"#000000","Dark":"#ffffff"},"Warning":{"Light":"#000000","Dark":"#ffffff"},"Error":{"Light":"#000000","Dark":"#ffffff"},"Info":{"Light":"#000000","Dark":"#ffffff"}},"Scrollbar":{"Track":{"Light":"#f0f0f0","Dark":"#1a1a1a"},"Thumb":{"Light":"#888888","Dark":"#888888"},"Hover":{"Light":"#444444","Dark":"#cccccc"}},"Focus":{"Outline":{"Light":"#000000","Dark":"#ffffff"}},"Shadow":{"Color":{"Light":"rgba(0, 0, 0, 0.25)","Dark":"rgba(255, 255, 255, 0.25)"}}}},"Brand":{"Name":"Flow Mono","Tagline":"Monochrome ink-on-paper"}};},{}],50:[function(require,module,exports){module.exports={"Hash":"flow-retro-80s","Name":"Flow Retro 80s","Version":"0.0.1","Description":"Neon-on-purple synthwave aesthetic for the flow editor. Single-mode (always dark) — '80s arcade glow.","Comprehensive":true,"Modes":{"Strategy":"single","Default":"dark"},"Tokens":{"Color":{"Background":{"Primary":"#0a0015","Secondary":"#1a0a2e","Tertiary":"#2a0a4e","Panel":"#1a0a2e","Hover":"#2a0a4e","Selected":"#3a1466"},"Text":{"Primary":"#00ffff","Secondary":"#ff66ff","Muted":"#9966cc","OnBrand":"#0a0015"},"Brand":{"Primary":"#ff00ff","PrimaryHover":"#ff66ff","Accent":"#00ffff"},"Border":{"Default":"#ff00ff","Light":"#2a0a4e","Strong":"#ff00ff"},"Status":{"Success":"#00ff66","Warning":"#ffdd44","Error":"#ff4477","Info":"#00ffff"},"Scrollbar":{"Track":"#1a0a2e","Thumb":"#ff00ff","Hover":"#ff66ff"},"Focus":{"Outline":"#00ffff"},"Shadow":{"Color":"rgba(255, 0, 255, 0.4)"}}},"Brand":{"Name":"Flow Retro 80s","Tagline":"Neon synthwave glow"}};},{}],51:[function(require,module,exports){module.exports={"Hash":"flow-retro-90s","Name":"Flow Retro 90s","Version":"0.0.1","Description":"Windows-95 aesthetic — gray panels, navy title bars, teal desktop. Single-mode (always its specific palette).","Comprehensive":true,"Modes":{"Strategy":"single","Default":"light"},"Tokens":{"Color":{"Background":{"Primary":"#008080","Secondary":"#c0c0c0","Tertiary":"#d0d0d0","Panel":"#c0c0c0","Hover":"#d0d0d0","Selected":"#a8c8e0"},"Text":{"Primary":"#000000","Secondary":"#404040","Muted":"#606060","OnBrand":"#ffffff"},"Brand":{"Primary":"#000080","PrimaryHover":"#0000a0","Accent":"#008000"},"Border":{"Default":"#808080","Light":"#a0a0a0","Strong":"#404040"},"Status":{"Success":"#008000","Warning":"#808000","Error":"#800000","Info":"#000080"},"Scrollbar":{"Track":"#c0c0c0","Thumb":"#808080","Hover":"#404040"},"Focus":{"Outline":"#008080"},"Shadow":{"Color":"#404040"}}},"Brand":{"Name":"Flow Retro 90s","Tagline":"Workstation chrome from the 90s"}};},{}],52:[function(require,module,exports){module.exports={"Hash":"flow-sketch","Name":"Flow Sketch","Version":"0.0.1","Description":"Warm-paper sketch aesthetic for the flow editor. Single-mode (always light) — sketches live on paper.","Comprehensive":true,"Modes":{"Strategy":"single","Default":"light"},"Tokens":{"Color":{"Background":{"Primary":"#fffef5","Secondary":"#faf8ed","Tertiary":"#f0ece0","Panel":"#fffef5","Hover":"#f4f0e2","Selected":"#e8dfc8"},"Text":{"Primary":"#333333","Secondary":"#555555","Muted":"#888888","OnBrand":"#ffffff"},"Brand":{"Primary":"#2255aa","PrimaryHover":"#1a4488","Accent":"#c47b5a"},"Border":{"Default":"#444444","Light":"#ccccaa","Strong":"#222222"},"Status":{"Success":"#55aa77","Warning":"#d4a040","Error":"#c44836","Info":"#5577bb"},"Scrollbar":{"Track":"#f0ece0","Thumb":"#c5c0a8","Hover":"#9e9a82"},"Focus":{"Outline":"#2255aa"},"Shadow":{"Color":"rgba(0, 0, 0, 0.08)"}}},"Brand":{"Name":"Flow Sketch","Tagline":"Hand-drawn paper aesthetic"}};},{}],53:[function(require,module,exports){module.exports={"Hash":"flow-whiteboard","Name":"Flow Whiteboard","Version":"0.0.1","Description":"Minimal whiteboard aesthetic — transparent fills with colored brackets per node type. Single-mode (light).","Comprehensive":true,"Modes":{"Strategy":"single","Default":"light"},"Tokens":{"Color":{"Background":{"Primary":"#ffffff","Secondary":"#fafafa","Tertiary":"#f5f5f5","Panel":"#ffffff","Hover":"#f0f0f0","Selected":"#e0eaff"},"Text":{"Primary":"#333333","Secondary":"#555555","Muted":"#999999","OnBrand":"#ffffff"},"Brand":{"Primary":"#2255aa","PrimaryHover":"#1a4488","Accent":"#1abc9c"},"Border":{"Default":"#888888","Light":"#cccccc","Strong":"#555555"},"Status":{"Success":"#27ae60","Warning":"#f39c12","Error":"#e74c3c","Info":"#3498db"},"Scrollbar":{"Track":"#f5f5f5","Thumb":"#cccccc","Hover":"#888888"},"Focus":{"Outline":"#2255aa"},"Shadow":{"Color":"rgba(0, 0, 0, 0.06)"}}},"Brand":{"Name":"Flow Whiteboard","Tagline":"Minimal whiteboard sketching"}};},{}],54:[function(require,module,exports){module.exports={"Hash":"forest","Name":"Forest","Category":"Fun","Version":"0.0.1","Description":"Deep greens and earth browns Ported from RetoldRemote-ThemeDefinitions.js to the pict-provider-theme manifest format.","Comprehensive":true,"Modes":{"Strategy":"single","Default":"dark"},"Tokens":{"Color":{"Background":{"Primary":"#1A2018","Secondary":"#141A12","Tertiary":"#1E2620","Panel":"#1C221A","Viewer":"#101410","Hover":"#283828","Selected":"#344834","Thumb":"#141A12"},"Text":{"Primary":"#D0DCC8","Secondary":"#B0C4A8","Muted":"#809878","Dim":"#607858","Placeholder":"#486040"},"Brand":{"Accent":"#6AAF5C","AccentHover":"#88CC78"},"Border":{"Default":"#2A3A28","Light":"#3A4A38"},"Status":{"Danger":"#CC4422","DangerMuted":"#884422"},"Scrollbar":{"Track":"#2A3A28","Hover":"#3A4A38"},"Selection":{"Background":"rgba(106, 175, 92, 0.25)"},"Focus":{"Outline":"#6AAF5C"},"Syntax":{"Keyword":"#D4E157","String":"#A5D6A7","Number":"#FFB74D","Comment":"#5D6F58","Operator":"#80CBC4","Punctuation":"#A8C8A0","Function":"#FFCC80","Variable":"#C8E6C9","Type":"#FFB74D","Builtin":"#FFB74D","Property":"#FF8A65","Tag":"#FF8A65","AttrName":"#FFB74D","AttrValue":"#A5D6A7"}},"Typography":{"Family":{"Sans":"'Palatino Linotype', 'Book Antiqua', Palatino, serif","Mono":"'Courier New', monospace"}}},"Aliases":{"--retold-bg-primary":"Color.Background.Primary","--retold-bg-secondary":"Color.Background.Secondary","--retold-bg-tertiary":"Color.Background.Tertiary","--retold-bg-panel":"Color.Background.Panel","--retold-bg-viewer":"Color.Background.Viewer","--retold-bg-hover":"Color.Background.Hover","--retold-bg-selected":"Color.Background.Selected","--retold-bg-thumb":"Color.Background.Thumb","--retold-text-primary":"Color.Text.Primary","--retold-text-secondary":"Color.Text.Secondary","--retold-text-muted":"Color.Text.Muted","--retold-text-dim":"Color.Text.Dim","--retold-text-placeholder":"Color.Text.Placeholder","--retold-accent":"Color.Brand.Accent","--retold-accent-hover":"Color.Brand.AccentHover","--retold-border":"Color.Border.Default","--retold-border-light":"Color.Border.Light","--retold-danger":"Color.Status.Danger","--retold-danger-muted":"Color.Status.DangerMuted","--retold-scrollbar":"Color.Scrollbar.Track","--retold-scrollbar-hover":"Color.Scrollbar.Hover","--retold-selection-bg":"Color.Selection.Background","--retold-focus-outline":"Color.Focus.Outline","--retold-font-family":"Typography.Family.Sans","--retold-font-mono":"Typography.Family.Mono"},"IconColors":{"Primary":"#B0C4A8","Accent":"#6AAF5C","Muted":"#607858","Light":"#1E2620","WarmBeige":"#22281E","TealTint":"#1A221A","Lavender":"#1E2420","AmberTint":"#262218","PdfFill":"#261A18","PdfText":"#CC4422"},"CSS":[],"SVG":{},"Image":{},"CompiledAt":"2026-05-03T18:12:53.407Z","CompilerVersion":1};},{}],55:[function(require,module,exports){module.exports={"Hash":"hotdog","Name":"Hotdog","Category":"Fun","Version":"0.0.1","Description":"Red and mustard yellow, garish Ported from RetoldRemote-ThemeDefinitions.js to the pict-provider-theme manifest format.","Comprehensive":true,"Modes":{"Strategy":"single","Default":"dark"},"Tokens":{"Color":{"Background":{"Primary":"#8B0000","Secondary":"#6B0000","Tertiary":"#7B0000","Panel":"#750000","Viewer":"#550000","Hover":"#AA1111","Selected":"#BB3300","Thumb":"#6B0000"},"Text":{"Primary":"#FFD700","Secondary":"#FFC000","Muted":"#CC9900","Dim":"#AA7700","Placeholder":"#886600"},"Brand":{"Accent":"#FFD700","AccentHover":"#FFEE44"},"Border":{"Default":"#AA2222","Light":"#BB3333"},"Status":{"Danger":"#FFFF00","DangerMuted":"#CCCC00"},"Scrollbar":{"Track":"#AA2222","Hover":"#CC3333"},"Selection":{"Background":"rgba(255, 215, 0, 0.3)"},"Focus":{"Outline":"#FFD700"},"Syntax":{"Keyword":"#FFD800","String":"#FFFFFF","Number":"#FFD800","Comment":"#9C2828","Operator":"#FFD800","Punctuation":"#FFFFFF","Function":"#FFD800","Variable":"#FFFFFF","Type":"#FFD800","Builtin":"#FFD800","Property":"#FFD800","Tag":"#FFD800","AttrName":"#FFD800","AttrValue":"#FFFFFF"}},"Typography":{"Family":{"Sans":"Impact, 'Arial Black', sans-serif","Mono":"'Courier New', monospace"}}},"Aliases":{"--retold-bg-primary":"Color.Background.Primary","--retold-bg-secondary":"Color.Background.Secondary","--retold-bg-tertiary":"Color.Background.Tertiary","--retold-bg-panel":"Color.Background.Panel","--retold-bg-viewer":"Color.Background.Viewer","--retold-bg-hover":"Color.Background.Hover","--retold-bg-selected":"Color.Background.Selected","--retold-bg-thumb":"Color.Background.Thumb","--retold-text-primary":"Color.Text.Primary","--retold-text-secondary":"Color.Text.Secondary","--retold-text-muted":"Color.Text.Muted","--retold-text-dim":"Color.Text.Dim","--retold-text-placeholder":"Color.Text.Placeholder","--retold-accent":"Color.Brand.Accent","--retold-accent-hover":"Color.Brand.AccentHover","--retold-border":"Color.Border.Default","--retold-border-light":"Color.Border.Light","--retold-danger":"Color.Status.Danger","--retold-danger-muted":"Color.Status.DangerMuted","--retold-scrollbar":"Color.Scrollbar.Track","--retold-scrollbar-hover":"Color.Scrollbar.Hover","--retold-selection-bg":"Color.Selection.Background","--retold-focus-outline":"Color.Focus.Outline","--retold-font-family":"Typography.Family.Sans","--retold-font-mono":"Typography.Family.Mono"},"IconColors":{"Primary":"#FFC000","Accent":"#FFD700","Muted":"#AA7700","Light":"#7B0000","WarmBeige":"#800000","TealTint":"#6B0000","Lavender":"#780000","AmberTint":"#7A1000","PdfFill":"#6B0000","PdfText":"#FFFF00"},"CSS":[],"SVG":{},"Image":{},"CompiledAt":"2026-05-03T18:12:53.407Z","CompilerVersion":1};},{}],56:[function(require,module,exports){module.exports={"Hash":"mobile-debug","Name":"Mobile Container Debug","Category":"Debug","Version":"0.0.1","Description":"Unique color per container for layout debugging Ported from RetoldRemote-ThemeDefinitions.js to the pict-provider-theme manifest format.","Comprehensive":true,"Modes":{"Strategy":"single","Default":"light"},"Tokens":{"Color":{"Background":{"Primary":"#FF0000","Secondary":"#00CCCC","Tertiary":"#00AA00","Panel":"#FFAA00","Viewer":"#333333","Hover":"rgba(255, 255, 255, 0.2)","Selected":"rgba(255, 255, 255, 0.3)","Thumb":"#AA00AA"},"Text":{"Primary":"#FFFFFF","Secondary":"#EEEEEE","Muted":"#CCCCCC","Dim":"#AAAAAA","Placeholder":"#888888"},"Brand":{"Accent":"#FFFF00","AccentHover":"#FFFF88"},"Border":{"Default":"#FFFFFF","Light":"#CCCCCC"},"Status":{"Danger":"#FF0000","DangerMuted":"#CC4444"},"Scrollbar":{"Track":"#888888","Hover":"#AAAAAA"},"Selection":{"Background":"rgba(255, 255, 0, 0.3)"},"Focus":{"Outline":"#FFFF00"},"Syntax":{"Keyword":"#A626A4","String":"#50A14F","Number":"#986801","Comment":"#A0A1A7","Operator":"#0184BC","Punctuation":"#383A42","Function":"#4078F2","Variable":"#383A42","Type":"#C18401","Builtin":"#986801","Property":"#E45649","Tag":"#E45649","AttrName":"#986801","AttrValue":"#50A14F"}},"Typography":{"Family":{"Sans":"system-ui, -apple-system, sans-serif","Mono":"'SF Mono', 'Consolas', monospace"}}},"Aliases":{"--retold-bg-primary":"Color.Background.Primary","--retold-bg-secondary":"Color.Background.Secondary","--retold-bg-tertiary":"Color.Background.Tertiary","--retold-bg-panel":"Color.Background.Panel","--retold-bg-viewer":"Color.Background.Viewer","--retold-bg-hover":"Color.Background.Hover","--retold-bg-selected":"Color.Background.Selected","--retold-bg-thumb":"Color.Background.Thumb","--retold-text-primary":"Color.Text.Primary","--retold-text-secondary":"Color.Text.Secondary","--retold-text-muted":"Color.Text.Muted","--retold-text-dim":"Color.Text.Dim","--retold-text-placeholder":"Color.Text.Placeholder","--retold-accent":"Color.Brand.Accent","--retold-accent-hover":"Color.Brand.AccentHover","--retold-border":"Color.Border.Default","--retold-border-light":"Color.Border.Light","--retold-danger":"Color.Status.Danger","--retold-danger-muted":"Color.Status.DangerMuted","--retold-scrollbar":"Color.Scrollbar.Track","--retold-scrollbar-hover":"Color.Scrollbar.Hover","--retold-selection-bg":"Color.Selection.Background","--retold-focus-outline":"Color.Focus.Outline","--retold-font-family":"Typography.Family.Sans","--retold-font-mono":"Typography.Family.Mono"},"IconColors":{"Primary":"#FFFFFF","Accent":"#FFFF00","Muted":"#CCCCCC","Light":"#333333","WarmBeige":"#FFAA00","TealTint":"#00CCCC","Lavender":"#AA00AA","AmberTint":"#FFAA00","PdfFill":"#FF4444","PdfText":"#FFFFFF"},"CSS":[],"SVG":{},"Image":{},"CompiledAt":"2026-05-03T18:12:53.408Z","CompilerVersion":1};},{}],57:[function(require,module,exports){module.exports={"Hash":"neo-tokyo","Name":"Neo-Tokyo","Category":"Fun","Version":"0.0.1","Description":"Neon pink on dark navy Ported from RetoldRemote-ThemeDefinitions.js to the pict-provider-theme manifest format.","Comprehensive":true,"Modes":{"Strategy":"single","Default":"dark"},"Tokens":{"Color":{"Background":{"Primary":"#0D0D2B","Secondary":"#080820","Tertiary":"#121235","Panel":"#0F0F28","Viewer":"#060615","Hover":"#1A1A42","Selected":"#2A1845","Thumb":"#080820"},"Text":{"Primary":"#E8E0F0","Secondary":"#D0C8E0","Muted":"#9088A8","Dim":"#6860A0","Placeholder":"#504888"},"Brand":{"Accent":"#FF2D8A","AccentHover":"#FF5AA0"},"Border":{"Default":"#2A2050","Light":"#382868"},"Status":{"Danger":"#FF4466","DangerMuted":"#AA3355"},"Scrollbar":{"Track":"#2A2050","Hover":"#3A3068"},"Selection":{"Background":"rgba(255, 45, 138, 0.25)"},"Focus":{"Outline":"#FF2D8A"},"Syntax":{"Keyword":"#FF4E9F","String":"#A1FFCE","Number":"#FFD93D","Comment":"#807A9E","Operator":"#7DF9FF","Punctuation":"#C0BCEB","Function":"#FFCC80","Variable":"#E0D8FF","Type":"#FFD93D","Builtin":"#FFD93D","Property":"#FF6E6E","Tag":"#FF6E6E","AttrName":"#FFD93D","AttrValue":"#A1FFCE"}},"Typography":{"Family":{"Sans":"'Courier New', monospace","Mono":"'Courier New', monospace"}}},"Aliases":{"--retold-bg-primary":"Color.Background.Primary","--retold-bg-secondary":"Color.Background.Secondary","--retold-bg-tertiary":"Color.Background.Tertiary","--retold-bg-panel":"Color.Background.Panel","--retold-bg-viewer":"Color.Background.Viewer","--retold-bg-hover":"Color.Background.Hover","--retold-bg-selected":"Color.Background.Selected","--retold-bg-thumb":"Color.Background.Thumb","--retold-text-primary":"Color.Text.Primary","--retold-text-secondary":"Color.Text.Secondary","--retold-text-muted":"Color.Text.Muted","--retold-text-dim":"Color.Text.Dim","--retold-text-placeholder":"Color.Text.Placeholder","--retold-accent":"Color.Brand.Accent","--retold-accent-hover":"Color.Brand.AccentHover","--retold-border":"Color.Border.Default","--retold-border-light":"Color.Border.Light","--retold-danger":"Color.Status.Danger","--retold-danger-muted":"Color.Status.DangerMuted","--retold-scrollbar":"Color.Scrollbar.Track","--retold-scrollbar-hover":"Color.Scrollbar.Hover","--retold-selection-bg":"Color.Selection.Background","--retold-focus-outline":"Color.Focus.Outline","--retold-font-family":"Typography.Family.Sans","--retold-font-mono":"Typography.Family.Mono"},"IconColors":{"Primary":"#D0C8E0","Accent":"#FF2D8A","Muted":"#6860A0","Light":"#121235","WarmBeige":"#141438","TealTint":"#100E30","Lavender":"#141232","AmberTint":"#1A1228","PdfFill":"#1A1028","PdfText":"#FF4466"},"CSS":[],"SVG":{},"Image":{},"CompiledAt":"2026-05-03T18:12:53.408Z","CompilerVersion":1};},{}],58:[function(require,module,exports){module.exports={"Hash":"night","Name":"Night","Category":"Grey","Version":"0.0.1","Description":"Near-black, minimal contrast Ported from RetoldRemote-ThemeDefinitions.js to the pict-provider-theme manifest format.","Comprehensive":true,"Modes":{"Strategy":"single","Default":"dark"},"Tokens":{"Color":{"Background":{"Primary":"#0A0A0A","Secondary":"#060606","Tertiary":"#0E0E0E","Panel":"#0C0C0C","Viewer":"#040404","Hover":"#161616","Selected":"#252525","Thumb":"#060606"},"Text":{"Primary":"#888888","Secondary":"#707070","Muted":"#555555","Dim":"#444444","Placeholder":"#333333"},"Brand":{"Accent":"#666666","AccentHover":"#808080"},"Border":{"Default":"#1A1A1A","Light":"#222222"},"Status":{"Danger":"#AA4444","DangerMuted":"#663333"},"Scrollbar":{"Track":"#1A1A1A","Hover":"#2A2A2A"},"Selection":{"Background":"rgba(102, 102, 102, 0.2)"},"Focus":{"Outline":"#666666"},"Syntax":{"Keyword":"#C28FFF","String":"#B0E0B0","Number":"#FFA070","Comment":"#888888","Operator":"#80C8FF","Punctuation":"#BBBBBB","Function":"#FFD080","Variable":"#DDDDDD","Type":"#FFB870","Builtin":"#FFB870","Property":"#FF9090","Tag":"#FF9090","AttrName":"#FFB870","AttrValue":"#B0E0B0"}},"Typography":{"Family":{"Sans":"system-ui, -apple-system, sans-serif","Mono":"'SF Mono', 'Fira Code', 'Consolas', monospace"}}},"Aliases":{"--retold-bg-primary":"Color.Background.Primary","--retold-bg-secondary":"Color.Background.Secondary","--retold-bg-tertiary":"Color.Background.Tertiary","--retold-bg-panel":"Color.Background.Panel","--retold-bg-viewer":"Color.Background.Viewer","--retold-bg-hover":"Color.Background.Hover","--retold-bg-selected":"Color.Background.Selected","--retold-bg-thumb":"Color.Background.Thumb","--retold-text-primary":"Color.Text.Primary","--retold-text-secondary":"Color.Text.Secondary","--retold-text-muted":"Color.Text.Muted","--retold-text-dim":"Color.Text.Dim","--retold-text-placeholder":"Color.Text.Placeholder","--retold-accent":"Color.Brand.Accent","--retold-accent-hover":"Color.Brand.AccentHover","--retold-border":"Color.Border.Default","--retold-border-light":"Color.Border.Light","--retold-danger":"Color.Status.Danger","--retold-danger-muted":"Color.Status.DangerMuted","--retold-scrollbar":"Color.Scrollbar.Track","--retold-scrollbar-hover":"Color.Scrollbar.Hover","--retold-selection-bg":"Color.Selection.Background","--retold-focus-outline":"Color.Focus.Outline","--retold-font-family":"Typography.Family.Sans","--retold-font-mono":"Typography.Family.Mono"},"IconColors":{"Primary":"#707070","Accent":"#666666","Muted":"#444444","Light":"#0E0E0E","WarmBeige":"#121212","TealTint":"#0C0C0C","Lavender":"#101010","AmberTint":"#141210","PdfFill":"#141010","PdfText":"#AA4444"},"CSS":[],"SVG":{},"Image":{},"CompiledAt":"2026-05-03T18:12:53.408Z","CompilerVersion":1};},{}],59:[function(require,module,exports){module.exports={"Hash":"ocean","Name":"Ocean","Version":"0.0.1","Description":"Cool blue-greens (180-235°) with warm coral / amber punctuation (5-30°). Paired light/dark; feels like sea + sun on the horizon.","Comprehensive":true,"Modes":{"Strategy":"system","Default":"light"},"Tokens":{"Color":{"Background":{"Primary":{"Light":"#f4f9fb","Dark":"#0e1820"},"Secondary":{"Light":"#e8f1f5","Dark":"#15212b"},"Tertiary":{"Light":"#dde9ee","Dark":"#1f2c38"},"Panel":{"Light":"#ffffff","Dark":"#1a2632"},"Hover":{"Light":"#e0eef3","Dark":"#26323f"},"Selected":{"Light":"#c8e1ea","Dark":"#1e3a48"}},"Text":{"Primary":{"Light":"#0e2832","Dark":"#e1ecf0"},"Secondary":{"Light":"#3a5662","Dark":"#a8c0c8"},"Muted":{"Light":"#6c828b","Dark":"#7a8e96"},"Placeholder":{"Light":"#90a4ad","Dark":"#5a6e76"}},"Brand":{"Primary":{"Light":"#0e7c8a","Dark":"#4dc4d4"},"PrimaryHover":{"Light":"#0a6371","Dark":"#6dd4e2"},"Accent":{"Light":"#e8a050","Dark":"#f0b878"}},"Border":{"Default":{"Light":"#c0d5dc","Dark":"#2c3d49"},"Light":{"Light":"#d8e6ec","Dark":"#1f2c38"},"Strong":{"Light":"#90b0bc","Dark":"#4a6470"}},"Status":{"Success":{"Light":"#1f8a52","Dark":"#4dc97a"},"Warning":{"Light":"#d68910","Dark":"#f0b020"},"Error":{"Light":"#c93a3a","Dark":"#ff6464"},"Info":{"Light":"#0e7c8a","Dark":"#4dc4d4"}},"Data":{"1":{"Light":"#0e7c8a","Dark":"#4dc4d4"},"2":{"Light":"#e8a050","Dark":"#f0b878"},"3":{"Light":"#1f8a52","Dark":"#4dc97a"},"4":{"Light":"#c93a3a","Dark":"#ff6464"},"5":{"Light":"#b07bac","Dark":"#cda6cf"},"6":{"Light":"#d68910","Dark":"#f0b020"},"7":{"Light":"#5a7f9e","Dark":"#82a0c4"},"8":{"Light":"#6c828b","Dark":"#a8c0c8"}},"Scrollbar":{"Track":{"Light":"#dde9ee","Dark":"#15212b"},"Thumb":{"Light":"#a8c2cc","Dark":"#324658"},"Hover":{"Light":"#7a99a4","Dark":"#506876"}},"Selection":{"Background":{"Light":"#c8e1ea","Dark":"#1e3a48"},"Text":{"Light":"#0e2832","Dark":"#e1ecf0"}},"Focus":{"Outline":{"Light":"#0e7c8a","Dark":"#4dc4d4"}},"Shadow":{"Color":{"Light":"rgba(14, 40, 50, 0.12)","Dark":"rgba(0, 0, 0, 0.55)"}},"Syntax":{"Keyword":{"Light":"#0e7c8a","Dark":"#4dc4d4"},"String":{"Light":"#1f8a52","Dark":"#4dc97a"},"Number":{"Light":"#d68910","Dark":"#f0b020"},"Comment":{"Light":"#90a4ad","Dark":"#5a6e76"},"Operator":{"Light":"#3a5662","Dark":"#a8c0c8"},"Punctuation":{"Light":"#3a5662","Dark":"#a8c0c8"},"Function":{"Light":"#0e7c8a","Dark":"#4dc4d4"},"Variable":{"Light":"#0e2832","Dark":"#e1ecf0"},"Type":{"Light":"#e8a050","Dark":"#f0b878"},"Builtin":{"Light":"#d68910","Dark":"#f0b020"},"Property":{"Light":"#c93a3a","Dark":"#ff6464"},"Tag":{"Light":"#c93a3a","Dark":"#ff6464"},"AttrName":{"Light":"#d68910","Dark":"#f0b020"},"AttrValue":{"Light":"#1f8a52","Dark":"#4dc97a"}},"Editor":{"LineNumberBackground":{"Light":"#e8f1f5","Dark":"#15212b"},"LineNumberText":{"Light":"#90a4ad","Dark":"#5a6e76"},"CurrentLineHighlight":{"Light":"#e0eef3","Dark":"#26323f"},"SelectionBackground":{"Light":"#c8e1ea","Dark":"#1e3a48"},"GutterBorder":{"Light":"#d8e6ec","Dark":"#1f2c38"}}},"Typography":{"Family":{"Sans":"system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif","Serif":"Georgia, Cambria, Times New Roman, Times, serif","Mono":"ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"},"Size":{"XS":"0.75rem","SM":"0.875rem","MD":"1rem","LG":"1.125rem","XL":"1.375rem","XXL":"1.75rem"},"Weight":{"Regular":"400","Medium":"500","Bold":"700"},"LineHeight":{"Tight":"1.2","Normal":"1.45","Loose":"1.7"}},"Spacing":{"XS":"4px","SM":"8px","MD":"12px","LG":"16px","XL":"24px","XXL":"32px"},"Radius":{"None":"0","SM":"2px","MD":"4px","LG":"8px","XL":"12px","Pill":"999px"},"Shadow":{"SM":"0 1px 2px var(--theme-color-shadow-color)","MD":"0 2px 6px var(--theme-color-shadow-color)","LG":"0 6px 18px var(--theme-color-shadow-color)"},"ZIndex":{"Base":"0","Dropdown":"100","Sticky":"200","Overlay":"900","Modal":"1000","Toast":"2000","Tooltip":"3000"},"Duration":{"Fast":"100ms","Normal":"200ms","Slow":"400ms"}},"Brand":{"Name":"Ocean","Tagline":"Cool waters, warm sun"}};},{}],60:[function(require,module,exports){module.exports={"Hash":"pict-default","Name":"Pict Default","Version":"0.0.1","Description":"The reference paired light/dark theme for pict-based applications. Neutral palette suitable for any app; dark mode is mid-grey rather than pure black to reduce eye strain.","Comprehensive":true,"Modes":{"Strategy":"system","Default":"light"},"Tokens":{"Color":{"Background":{"Primary":{"Light":"#ffffff","Dark":"#1a1a1a"},"Secondary":{"Light":"#f5f5f5","Dark":"#242424"},"Tertiary":{"Light":"#ebebeb","Dark":"#2e2e2e"},"Panel":{"Light":"#ffffff","Dark":"#222222"},"Hover":{"Light":"#f0f0f0","Dark":"#2a2a2a"},"Selected":{"Light":"#e0eaff","Dark":"#2a3550"}},"Text":{"Primary":{"Light":"#1a1a1a","Dark":"#ededed"},"Secondary":{"Light":"#454545","Dark":"#bdbdbd"},"Muted":{"Light":"#6b6b6b","Dark":"#888888"},"Placeholder":{"Light":"#9a9a9a","Dark":"#6a6a6a"}},"Brand":{"Primary":{"Light":"#3357c7","Dark":"#6b8eff"},"PrimaryHover":{"Light":"#2848b3","Dark":"#88a4ff"},"Accent":{"Light":"#c75033","Dark":"#ff8a6b"}},"Border":{"Default":{"Light":"#d6d6d6","Dark":"#3a3a3a"},"Light":{"Light":"#e9e9e9","Dark":"#2c2c2c"},"Strong":{"Light":"#a0a0a0","Dark":"#5a5a5a"}},"Status":{"Success":{"Light":"#2e7a3a","Dark":"#5fc377"},"Warning":{"Light":"#a86b00","Dark":"#f0b84a"},"Error":{"Light":"#b62828","Dark":"#ff7373"},"Info":{"Light":"#1f6fb5","Dark":"#5fb4ff"}},"Data":{"1":{"Light":"#3357c7","Dark":"#6b8eff"},"2":{"Light":"#c75033","Dark":"#ff8a6b"},"3":{"Light":"#2e7a3a","Dark":"#5fc377"},"4":{"Light":"#a86b00","Dark":"#f0b84a"},"5":{"Light":"#6b3aac","Dark":"#b08eff"},"6":{"Light":"#1f6fb5","Dark":"#5fb4ff"},"7":{"Light":"#c63a8e","Dark":"#ff7fb6"},"8":{"Light":"#6b6b6b","Dark":"#bdbdbd"}},"Scrollbar":{"Track":{"Light":"#ebebeb","Dark":"#1f1f1f"},"Thumb":{"Light":"#c2c2c2","Dark":"#3f3f3f"},"Hover":{"Light":"#a0a0a0","Dark":"#5a5a5a"}},"Selection":{"Background":{"Light":"#bcd2ff","Dark":"#3a4f7a"},"Text":{"Light":"#1a1a1a","Dark":"#ededed"}},"Focus":{"Outline":{"Light":"#3357c7","Dark":"#6b8eff"}},"Shadow":{"Color":{"Light":"rgba(0, 0, 0, 0.12)","Dark":"rgba(0, 0, 0, 0.55)"}},"Syntax":{"Keyword":{"Light":"#a626a4","Dark":"#c678dd"},"String":{"Light":"#50a14f","Dark":"#98c379"},"Number":{"Light":"#986801","Dark":"#d19a66"},"Comment":{"Light":"#a0a1a7","Dark":"#7f848e"},"Operator":{"Light":"#0184bc","Dark":"#56b6c2"},"Punctuation":{"Light":"#383a42","Dark":"#abb2bf"},"Function":{"Light":"#4078f2","Dark":"#61afef"},"Variable":{"Light":"#383a42","Dark":"#e06c75"},"Type":{"Light":"#c18401","Dark":"#e5c07b"},"Builtin":{"Light":"#986801","Dark":"#d19a66"},"Property":{"Light":"#e45649","Dark":"#e06c75"},"Tag":{"Light":"#e45649","Dark":"#e06c75"},"AttrName":{"Light":"#986801","Dark":"#d19a66"},"AttrValue":{"Light":"#50a14f","Dark":"#98c379"}},"Editor":{"LineNumberBackground":{"Light":"#f5f5f5","Dark":"#1f1f1f"},"LineNumberText":{"Light":"#9a9a9a","Dark":"#6a6a6a"},"CurrentLineHighlight":{"Light":"#f0f0f0","Dark":"#2a2a2a"},"SelectionBackground":{"Light":"#bcd2ff","Dark":"#3a4f7a"},"GutterBorder":{"Light":"#e9e9e9","Dark":"#2c2c2c"}}},"Typography":{"Family":{"Sans":"system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif","Serif":"Georgia, Cambria, Times New Roman, Times, serif","Mono":"ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"},"Size":{"XS":"0.75rem","SM":"0.875rem","MD":"1rem","LG":"1.125rem","XL":"1.375rem","XXL":"1.75rem"},"Weight":{"Regular":"400","Medium":"500","Bold":"700"},"LineHeight":{"Tight":"1.2","Normal":"1.45","Loose":"1.7"}},"Spacing":{"XS":"4px","SM":"8px","MD":"12px","LG":"16px","XL":"24px","XXL":"32px"},"Radius":{"None":"0","SM":"2px","MD":"4px","LG":"8px","XL":"12px","Pill":"999px"},"Shadow":{"SM":"0 1px 2px var(--theme-color-shadow-color)","MD":"0 2px 6px var(--theme-color-shadow-color)","LG":"0 6px 18px var(--theme-color-shadow-color)"},"ZIndex":{"Base":"0","Dropdown":"100","Sticky":"200","Overlay":"900","Modal":"1000","Toast":"2000","Tooltip":"3000"},"Duration":{"Fast":"100ms","Normal":"200ms","Slow":"400ms"}},"Brand":{"Name":"Pict","Tagline":"A JavaScript MVC framework for building web applications."},"CSS":[{"Hash":"pict-default-brand-accents","Priority":600,"Content":"/* pict-default — subtle brand-aware accents.\n   Falls back gracefully to theme-color tokens when no brand is registered,\n   so non-branded apps still look right. */\na { text-decoration-color: var(--brand-color-primary-mode, var(--theme-color-brand-primary, currentColor)); text-decoration-thickness: 2px; text-underline-offset: 3px; }\nh1 { border-bottom: 2px solid var(--brand-color-primary-mode, var(--theme-color-border-default, transparent)); padding-bottom: 6px; }\nh2 { border-bottom: 1px solid var(--brand-color-secondary-mode, var(--theme-color-border-light, transparent)); padding-bottom: 4px; }"}]};},{}],61:[function(require,module,exports){module.exports={"Hash":"playground-corp","Name":"Playground Corp","Version":"0.0.1","Description":"A different paired starter — corporate teal palette, rounder corners.","Comprehensive":true,"Modes":{"Strategy":"system","Default":"light"},"Tokens":{"Color":{"Background":{"Primary":{"Light":"#fbfbfd","Dark":"#0e1416"},"Secondary":{"Light":"#eef3f6","Dark":"#152024"},"Tertiary":{"Light":"#dde7ec","Dark":"#1e2c30"},"Panel":{"Light":"#ffffff","Dark":"#162126"},"Hover":{"Light":"#e5edf1","Dark":"#1d292e"}},"Text":{"Primary":{"Light":"#0a1d22","Dark":"#e3edf0"},"Secondary":{"Light":"#3a5b65","Dark":"#a8c0c8"},"Muted":{"Light":"#647e87","Dark":"#7a929a"},"OnBrand":{"Light":"#ffffff","Dark":"#ffffff"}},"Brand":{"Primary":{"Light":"#117a8b","Dark":"#3ec0d4"},"PrimaryHover":{"Light":"#0e6271","Dark":"#5fd0e0"},"Accent":{"Light":"#d97706","Dark":"#fb923c"}},"Border":{"Default":{"Light":"#cfdce1","Dark":"#2c3a3f"},"Strong":{"Light":"#86a3ac","Dark":"#4d5e64"}},"Status":{"Success":{"Light":"#0f7a52","Dark":"#34d399"},"Warning":{"Light":"#b45309","Dark":"#fbbf24"},"Error":{"Light":"#9f1239","Dark":"#fb7185"},"Info":{"Light":"#1e6fbe","Dark":"#60a5fa"}},"Syntax":{"Keyword":{"Light":"#a626a4","Dark":"#c678dd"},"String":{"Light":"#50a14f","Dark":"#98c379"},"Number":{"Light":"#986801","Dark":"#d19a66"},"Comment":{"Light":"#a0a1a7","Dark":"#7f848e"},"Operator":{"Light":"#0184bc","Dark":"#56b6c2"},"Punctuation":{"Light":"#383a42","Dark":"#abb2bf"},"Function":{"Light":"#4078f2","Dark":"#61afef"},"Variable":{"Light":"#383a42","Dark":"#e06c75"},"Type":{"Light":"#c18401","Dark":"#e5c07b"},"Builtin":{"Light":"#986801","Dark":"#d19a66"},"Property":{"Light":"#e45649","Dark":"#e06c75"},"Tag":{"Light":"#e45649","Dark":"#e06c75"},"AttrName":{"Light":"#986801","Dark":"#d19a66"},"AttrValue":{"Light":"#50a14f","Dark":"#98c379"}}},"Typography":{"Family":{"Sans":"Inter, system-ui, sans-serif","Mono":"ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"},"Size":{"SM":"0.875rem","MD":"1rem","LG":"1.25rem"},"Weight":{"Regular":"400","Bold":"700"}},"Spacing":{"XS":"4px","SM":"8px","MD":"14px","LG":"20px","XL":"28px"},"Radius":{"SM":"4px","MD":"10px","LG":"16px"}},"Brand":{"Name":"Corp"},"Aliases":{"--pict-modal-overlay-bg":"Color.Background.Tertiary","--pict-modal-bg":"Color.Background.Panel","--pict-modal-fg":"Color.Text.Primary","--pict-modal-border":"Color.Border.Default","--pict-modal-shadow":"Color.Border.Strong","--pict-modal-header-bg":"Color.Background.Secondary","--pict-modal-header-fg":"Color.Text.Primary","--pict-modal-header-border":"Color.Border.Default","--pict-modal-btn-bg":"Color.Background.Secondary","--pict-modal-btn-fg":"Color.Text.Primary","--pict-modal-btn-hover-bg":"Color.Background.Hover","--pict-modal-btn-primary-bg":"Color.Brand.Primary","--pict-modal-btn-primary-fg":"Color.Text.OnBrand","--pict-modal-btn-primary-hover-bg":"Color.Brand.PrimaryHover","--pict-modal-btn-danger-bg":"Color.Status.Error","--pict-modal-btn-danger-fg":"Color.Text.OnBrand","--pict-modal-btn-danger-hover-bg":"Color.Status.Error","--pict-modal-toast-bg":"Color.Background.Panel","--pict-modal-toast-fg":"Color.Text.Primary","--pict-modal-toast-shadow":"Color.Border.Strong","--pict-modal-toast-success-bg":"Color.Status.Success","--pict-modal-toast-error-bg":"Color.Status.Error","--pict-modal-toast-warning-bg":"Color.Status.Warning","--pict-modal-toast-info-bg":"Color.Status.Info","--pict-modal-tooltip-bg":"Color.Background.Tertiary","--pict-modal-tooltip-fg":"Color.Text.Primary","--pict-modal-font-family":"Typography.Family.Sans","--pict-um-bg":"Color.Background.Panel","--pict-um-fg":"Color.Text.Primary","--pict-um-muted":"Color.Text.Muted","--pict-um-accent":"Color.Brand.Primary","--pict-um-border":"Color.Border.Default","--pict-um-border-soft":"Color.Border.Light","--pict-um-input-bg":"Color.Background.Primary","--pict-um-pill-bg":"Color.Background.Tertiary","--pict-um-font":"Typography.Family.Sans"}};},{}],62:[function(require,module,exports){module.exports={"Hash":"retold-content-system","Name":"Retold Content System","Version":"0.0.1","Description":"Default palette for the Retold Content System editor — warm beige with teal accents. Light side preserves the original retold-content-system.css palette verbatim; dark side keeps the teal accent and warms the backgrounds into a deep walnut/charcoal range so dark mode reads as the same family of values rather than a generic dark theme.","Comprehensive":true,"Modes":{"Strategy":"system","Default":"system"},"Tokens":{"Color":{"Background":{"Primary":{"Light":"#F5F3EE","Dark":"#1F1B17"},"Secondary":{"Light":"#FAF8F4","Dark":"#2A251F"},"Tertiary":{"Light":"#F0EDE8","Dark":"#332D26"},"Panel":{"Light":"#FFFFFF","Dark":"#26221C"},"Hover":{"Light":"#EDE9E3","Dark":"#383028"},"Selected":{"Light":"#DCE9E7","Dark":"#1E3833"}},"Text":{"Primary":{"Light":"#3D3229","Dark":"#E8DCC8"},"Secondary":{"Light":"#5E5549","Dark":"#C0B5A4"},"Muted":{"Light":"#8A7F72","Dark":"#8E8478"},"Placeholder":{"Light":"#A89E91","Dark":"#6E6457"},"OnBrand":{"Light":"#FFFFFF","Dark":"#1F1B17"}},"Brand":{"Primary":{"Light":"#2E7D74","Dark":"#4FB3A6"},"PrimaryHover":{"Light":"#3A9E92","Dark":"#65CBBE"},"Accent":{"Light":"#2E7D74","Dark":"#4FB3A6"},"AccentHover":{"Light":"#3A9E92","Dark":"#65CBBE"}},"Border":{"Default":{"Light":"#DDD6CA","Dark":"#3F362C"},"Light":{"Light":"#E8E2D7","Dark":"#33291F"},"Strong":{"Light":"#C4BDB0","Dark":"#5A4F40"}},"Status":{"Success":{"Light":"#7BC47F","Dark":"#8FD493"},"Warning":{"Light":"#E8A94D","Dark":"#F0BE6E"},"Error":{"Light":"#D9534F","Dark":"#E87B78"},"Info":{"Light":"#5DA6C7","Dark":"#7FBDD8"}},"Data":{"1":{"Light":"#2E7D74","Dark":"#4FB3A6"},"2":{"Light":"#E8A94D","Dark":"#F0BE6E"},"3":{"Light":"#7BC47F","Dark":"#8FD493"},"4":{"Light":"#D9534F","Dark":"#E87B78"},"5":{"Light":"#A07ACC","Dark":"#BCA0DC"},"6":{"Light":"#5DA6C7","Dark":"#7FBDD8"},"7":{"Light":"#C46B8A","Dark":"#D8919E"},"8":{"Light":"#8A7F72","Dark":"#B8AFA4"}},"Scrollbar":{"Track":{"Light":"#F5F0E8","Dark":"#26221C"},"Thumb":{"Light":"#C4BDB0","Dark":"#4A4036"},"Hover":{"Light":"#8A7F72","Dark":"#6A5F50"}},"Selection":{"Background":{"Light":"#CDE3E0","Dark":"#2E5B55"},"Text":{"Light":"#3D3229","Dark":"#E8DCC8"}},"Focus":{"Outline":{"Light":"#2E7D74","Dark":"#4FB3A6"}},"Shadow":{"Color":{"Light":"rgba(61, 50, 41, 0.12)","Dark":"rgba(0, 0, 0, 0.55)"}},"Syntax":{"Keyword":{"Light":"#A0532E","Dark":"#E89A6E"},"String":{"Light":"#3F8A52","Dark":"#8FD493"},"Number":{"Light":"#A86B00","Dark":"#E8A94D"},"Comment":{"Light":"#8A7F72","Dark":"#8E8478"},"Operator":{"Light":"#2E7D74","Dark":"#4FB3A6"},"Punctuation":{"Light":"#5E5549","Dark":"#C0B5A4"},"Function":{"Light":"#2E5E96","Dark":"#7FBDD8"},"Variable":{"Light":"#3D3229","Dark":"#E8DCC8"},"Type":{"Light":"#A86B00","Dark":"#E8A94D"},"Builtin":{"Light":"#A86B00","Dark":"#E8A94D"},"Property":{"Light":"#A0532E","Dark":"#E89A6E"},"Tag":{"Light":"#A0532E","Dark":"#E89A6E"},"AttrName":{"Light":"#A86B00","Dark":"#E8A94D"},"AttrValue":{"Light":"#3F8A52","Dark":"#8FD493"}}},"Typography":{"Family":{"Sans":"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif","Serif":"Georgia, Cambria, 'Times New Roman', Times, serif","Mono":"'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'Courier New', monospace"},"Size":{"XS":"0.75rem","SM":"0.875rem","MD":"1rem","LG":"1.125rem","XL":"1.375rem","XXL":"1.75rem"},"Weight":{"Regular":"400","Medium":"500","Bold":"700"},"LineHeight":{"Tight":"1.2","Normal":"1.5","Loose":"1.7"}},"Spacing":{"XS":"4px","SM":"8px","MD":"12px","LG":"16px","XL":"24px","XXL":"32px"},"Radius":{"None":"0","SM":"2px","MD":"4px","LG":"8px","XL":"12px","Pill":"999px"},"Layout":{"SidebarWidth":"250px","TopbarHeight":"48px","StatusbarHeight":"28px"}},"Brand":{"Name":"Retold Content","Tagline":"Author content for the Retold ecosystem."}};},{}],63:[function(require,module,exports){module.exports={"Hash":"retold-default","Name":"Retold Default","Version":"0.0.1","Description":"The canonical paired light/dark theme for the Retold ecosystem. Neutral palette suitable for any retold-based app; dark mode is mid-grey rather than pure black to reduce eye strain.","Comprehensive":true,"Modes":{"Strategy":"system","Default":"light"},"Tokens":{"Color":{"Background":{"Primary":{"Light":"#ffffff","Dark":"#1a1a1a"},"Secondary":{"Light":"#f5f5f5","Dark":"#242424"},"Tertiary":{"Light":"#ebebeb","Dark":"#2e2e2e"},"Panel":{"Light":"#ffffff","Dark":"#222222"},"Hover":{"Light":"#f0f0f0","Dark":"#2a2a2a"},"Selected":{"Light":"#e0eaff","Dark":"#2a3550"}},"Text":{"Primary":{"Light":"#1a1a1a","Dark":"#ededed"},"Secondary":{"Light":"#454545","Dark":"#bdbdbd"},"Muted":{"Light":"#6b6b6b","Dark":"#888888"},"Placeholder":{"Light":"#9a9a9a","Dark":"#6a6a6a"}},"Brand":{"Primary":{"Light":"#3357c7","Dark":"#6b8eff"},"PrimaryHover":{"Light":"#2848b3","Dark":"#88a4ff"},"Accent":{"Light":"#c75033","Dark":"#ff8a6b"}},"Border":{"Default":{"Light":"#d6d6d6","Dark":"#3a3a3a"},"Light":{"Light":"#e9e9e9","Dark":"#2c2c2c"},"Strong":{"Light":"#a0a0a0","Dark":"#5a5a5a"}},"Status":{"Success":{"Light":"#2e7a3a","Dark":"#5fc377"},"Warning":{"Light":"#a86b00","Dark":"#f0b84a"},"Error":{"Light":"#b62828","Dark":"#ff7373"},"Info":{"Light":"#1f6fb5","Dark":"#5fb4ff"}},"Data":{"1":{"Light":"#3357c7","Dark":"#6b8eff"},"2":{"Light":"#c75033","Dark":"#ff8a6b"},"3":{"Light":"#2e7a3a","Dark":"#5fc377"},"4":{"Light":"#a86b00","Dark":"#f0b84a"},"5":{"Light":"#6b3aac","Dark":"#b08eff"},"6":{"Light":"#1f6fb5","Dark":"#5fb4ff"},"7":{"Light":"#c63a8e","Dark":"#ff7fb6"},"8":{"Light":"#6b6b6b","Dark":"#bdbdbd"}},"Scrollbar":{"Track":{"Light":"#ebebeb","Dark":"#1f1f1f"},"Thumb":{"Light":"#c2c2c2","Dark":"#3f3f3f"},"Hover":{"Light":"#a0a0a0","Dark":"#5a5a5a"}},"Selection":{"Background":{"Light":"#bcd2ff","Dark":"#3a4f7a"},"Text":{"Light":"#1a1a1a","Dark":"#ededed"}},"Focus":{"Outline":{"Light":"#3357c7","Dark":"#6b8eff"}},"Shadow":{"Color":{"Light":"rgba(0, 0, 0, 0.12)","Dark":"rgba(0, 0, 0, 0.55)"}},"Syntax":{"Keyword":{"Light":"#a626a4","Dark":"#c678dd"},"String":{"Light":"#50a14f","Dark":"#98c379"},"Number":{"Light":"#986801","Dark":"#d19a66"},"Comment":{"Light":"#a0a1a7","Dark":"#7f848e"},"Operator":{"Light":"#0184bc","Dark":"#56b6c2"},"Punctuation":{"Light":"#383a42","Dark":"#abb2bf"},"Function":{"Light":"#4078f2","Dark":"#61afef"},"Variable":{"Light":"#383a42","Dark":"#e06c75"},"Type":{"Light":"#c18401","Dark":"#e5c07b"},"Builtin":{"Light":"#986801","Dark":"#d19a66"},"Property":{"Light":"#e45649","Dark":"#e06c75"},"Tag":{"Light":"#e45649","Dark":"#e06c75"},"AttrName":{"Light":"#986801","Dark":"#d19a66"},"AttrValue":{"Light":"#50a14f","Dark":"#98c379"}},"Editor":{"LineNumberBackground":{"Light":"#f5f5f5","Dark":"#1f1f1f"},"LineNumberText":{"Light":"#9a9a9a","Dark":"#6a6a6a"},"CurrentLineHighlight":{"Light":"#f0f0f0","Dark":"#2a2a2a"},"SelectionBackground":{"Light":"#bcd2ff","Dark":"#3a4f7a"},"GutterBorder":{"Light":"#e9e9e9","Dark":"#2c2c2c"}}},"Typography":{"Family":{"Sans":"system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif","Serif":"Georgia, Cambria, Times New Roman, Times, serif","Mono":"ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"},"Size":{"XS":"0.75rem","SM":"0.875rem","MD":"1rem","LG":"1.125rem","XL":"1.375rem","XXL":"1.75rem"},"Weight":{"Regular":"400","Medium":"500","Bold":"700"},"LineHeight":{"Tight":"1.2","Normal":"1.45","Loose":"1.7"}},"Spacing":{"XS":"4px","SM":"8px","MD":"12px","LG":"16px","XL":"24px","XXL":"32px"},"Radius":{"None":"0","SM":"2px","MD":"4px","LG":"8px","XL":"12px","Pill":"999px"},"Shadow":{"SM":"0 1px 2px var(--theme-color-shadow-color)","MD":"0 2px 6px var(--theme-color-shadow-color)","LG":"0 6px 18px var(--theme-color-shadow-color)"},"ZIndex":{"Base":"0","Dropdown":"100","Sticky":"200","Overlay":"900","Modal":"1000","Toast":"2000","Tooltip":"3000"},"Duration":{"Fast":"100ms","Normal":"200ms","Slow":"400ms"}},"Brand":{"Name":"Retold","Tagline":"What is software if not a tool to tell stories."},"CSS":[{"Hash":"retold-default-brand-accents","Priority":600,"Content":"/* pict-default \u2014 subtle brand-aware accents.\n   Falls back gracefully to theme-color tokens when no brand is registered,\n   so non-branded apps still look right. */\na { text-decoration-color: var(--brand-color-primary-mode, var(--theme-color-brand-primary, currentColor)); text-decoration-thickness: 2px; text-underline-offset: 3px; }\nh1 { border-bottom: 2px solid var(--brand-color-primary-mode, var(--theme-color-border-default, transparent)); padding-bottom: 6px; }\nh2 { border-bottom: 1px solid var(--brand-color-secondary-mode, var(--theme-color-border-light, transparent)); padding-bottom: 4px; }"}]};},{}],64:[function(require,module,exports){module.exports={"Hash":"retold-labs-cyberpunk","Name":"Retold Labs Cyberpunk","Version":"0.0.1","Description":"retold-labs’ neon \"cyberpunk\" identity — cyan/magenta on near-black (dark) or violet on light. Preserves the original cyberpunk-light / cyberpunk-dark palettes verbatim.","Comprehensive":true,"Modes":{"Strategy":"system","Default":"system"},"Tokens":{"Color":{"Background":{"Primary":{"Light":"#eae8f0","Dark":"#0a0a12"},"Secondary":{"Light":"#ddd8ea","Dark":"#12101e"},"Tertiary":{"Light":"#ddd8ea","Dark":"#12101e"},"Panel":{"Light":"#f4f2fa","Dark":"#1a1628"},"Sidebar":{"Light":"#1e1430","Dark":"#06060e"},"Hover":{"Light":"rgba(130, 0, 200, 0.06)","Dark":"rgba(0, 255, 255, 0.08)"},"Selected":{"Light":"rgba(138, 0, 212, 0.10)","Dark":"rgba(0, 229, 255, 0.12)"}},"Text":{"Primary":{"Light":"#1a1028","Dark":"#e8e0f0"},"Secondary":{"Light":"#4a3868","Dark":"#b0a8c8"},"Muted":{"Light":"#7a6a98","Dark":"#6a6488"},"Placeholder":{"Light":"#7a6a98","Dark":"#6a6488"},"OnBrand":{"Light":"#d0c8e0","Dark":"#d0c8e0"}},"Brand":{"Primary":{"Light":"#8a00d4","Dark":"#00e5ff"},"PrimaryHover":{"Light":"#b040f0","Dark":"#60f0ff"},"Accent":{"Light":"#8a00d4","Dark":"#00e5ff"},"AccentHover":{"Light":"#b040f0","Dark":"#60f0ff"}},"Border":{"Default":{"Light":"#c8c0d8","Dark":"#2a2440"},"Light":{"Light":"#c8c0d8","Dark":"#2a2440"},"Strong":{"Light":"#2a2040","Dark":"#1a1430"}},"Status":{"Success":{"Light":"#00a050","Dark":"#39ff14"},"Warning":{"Light":"#d41878","Dark":"#ff2ec4"},"Error":{"Light":"#c82050","Dark":"#ff3860"},"Info":{"Light":"#8a00d4","Dark":"#00e5ff"}},"Scrollbar":{"Track":{"Light":"#ddd8ea","Dark":"#12101e"},"Thumb":{"Light":"#c8c0d8","Dark":"#2a2440"},"Hover":{"Light":"#7a6a98","Dark":"#6a6488"}},"Selection":{"Background":{"Light":"rgba(138, 0, 212, 0.10)","Dark":"rgba(0, 229, 255, 0.12)"},"Text":{"Light":"#1a1028","Dark":"#e8e0f0"}},"Focus":{"Outline":{"Light":"#8a00d4","Dark":"#00e5ff"}},"Shadow":{"Color":{"Light":"rgba(26, 16, 40, 0.12)","Dark":"rgba(0, 0, 0, 0.55)"}},"Syntax":{"Keyword":{"Light":"#8a00d4","Dark":"#00e5ff"},"String":{"Light":"#00a050","Dark":"#39ff14"},"Number":{"Light":"#d41878","Dark":"#ff2ec4"},"Comment":{"Light":"#7a6a98","Dark":"#6a6488"},"Operator":{"Light":"#8a00d4","Dark":"#00e5ff"},"Punctuation":{"Light":"#4a3868","Dark":"#b0a8c8"},"Function":{"Light":"#8a00d4","Dark":"#00e5ff"},"Variable":{"Light":"#1a1028","Dark":"#e8e0f0"},"Type":{"Light":"#d41878","Dark":"#ff2ec4"},"Builtin":{"Light":"#d41878","Dark":"#ff2ec4"},"Property":{"Light":"#c82050","Dark":"#ff3860"},"Tag":{"Light":"#8a00d4","Dark":"#00e5ff"},"AttrName":{"Light":"#d41878","Dark":"#ff2ec4"},"AttrValue":{"Light":"#00a050","Dark":"#39ff14"}}},"Typography":{"Family":{"Sans":"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif","Serif":"Georgia, Cambria, 'Times New Roman', Times, serif","Mono":"'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'Courier New', monospace"},"Size":{"XS":"0.75rem","SM":"0.875rem","MD":"1rem","LG":"1.125rem","XL":"1.375rem","XXL":"1.75rem"},"Weight":{"Regular":"400","Medium":"500","Bold":"700"},"LineHeight":{"Tight":"1.2","Normal":"1.5","Loose":"1.7"}},"Spacing":{"XS":"4px","SM":"8px","MD":"12px","LG":"16px","XL":"24px","XXL":"32px"},"Radius":{"None":"0","SM":"2px","MD":"4px","LG":"8px","XL":"12px","Pill":"999px"},"Layout":{"SidebarWidth":"230px","TopbarHeight":"52px","StatusbarHeight":"28px"}},"Brand":{"Name":"Retold Labs","Tagline":"Run, compare, and distribute ML experiments across the mesh"}};},{}],65:[function(require,module,exports){module.exports={"Hash":"retold-labs-retro","Name":"Retold Labs Retro","Version":"0.0.1","Description":"retold-labs’ \"retro\" identity — amber/green phosphor on dark or sepia/olive on light. Preserves the original retro-light / retro-dark palettes verbatim.","Comprehensive":true,"Modes":{"Strategy":"system","Default":"system"},"Tokens":{"Color":{"Background":{"Primary":{"Light":"#f5f0e0","Dark":"#0c0c08"},"Secondary":{"Light":"#ebe4d0","Dark":"#161610"},"Tertiary":{"Light":"#ebe4d0","Dark":"#161610"},"Panel":{"Light":"#faf6e8","Dark":"#1e1e14"},"Sidebar":{"Light":"#3a3020","Dark":"#080804"},"Hover":{"Light":"rgba(140, 80, 20, 0.06)","Dark":"rgba(255, 176, 0, 0.08)"},"Selected":{"Light":"rgba(140, 80, 20, 0.10)","Dark":"rgba(255, 176, 0, 0.12)"}},"Text":{"Primary":{"Light":"#2e2418","Dark":"#d0c8a0"},"Secondary":{"Light":"#5c4a30","Dark":"#a09870"},"Muted":{"Light":"#8a7450","Dark":"#706848"},"Placeholder":{"Light":"#8a7450","Dark":"#706848"},"OnBrand":{"Light":"#d8c8a0","Dark":"#c8b870"}},"Brand":{"Primary":{"Light":"#8c5014","Dark":"#ffb000"},"PrimaryHover":{"Light":"#b06820","Dark":"#ffc840"},"Accent":{"Light":"#8c5014","Dark":"#ffb000"},"AccentHover":{"Light":"#b06820","Dark":"#ffc840"}},"Border":{"Default":{"Light":"#d0c4a8","Dark":"#2a2a1e"},"Light":{"Light":"#d0c4a8","Dark":"#2a2a1e"},"Strong":{"Light":"#4a4030","Dark":"#1a1a10"}},"Status":{"Success":{"Light":"#2e7830","Dark":"#40c850"},"Warning":{"Light":"#2e7830","Dark":"#40c850"},"Error":{"Light":"#a03020","Dark":"#e04030"},"Info":{"Light":"#8c5014","Dark":"#ffb000"}},"Scrollbar":{"Track":{"Light":"#ebe4d0","Dark":"#161610"},"Thumb":{"Light":"#d0c4a8","Dark":"#2a2a1e"},"Hover":{"Light":"#8a7450","Dark":"#706848"}},"Selection":{"Background":{"Light":"rgba(140, 80, 20, 0.10)","Dark":"rgba(255, 176, 0, 0.12)"},"Text":{"Light":"#2e2418","Dark":"#d0c8a0"}},"Focus":{"Outline":{"Light":"#8c5014","Dark":"#ffb000"}},"Shadow":{"Color":{"Light":"rgba(46, 36, 24, 0.12)","Dark":"rgba(0, 0, 0, 0.55)"}},"Syntax":{"Keyword":{"Light":"#8c5014","Dark":"#ffb000"},"String":{"Light":"#2e7830","Dark":"#40c850"},"Number":{"Light":"#2e7830","Dark":"#40c850"},"Comment":{"Light":"#8a7450","Dark":"#706848"},"Operator":{"Light":"#8c5014","Dark":"#ffb000"},"Punctuation":{"Light":"#5c4a30","Dark":"#a09870"},"Function":{"Light":"#8c5014","Dark":"#ffb000"},"Variable":{"Light":"#2e2418","Dark":"#d0c8a0"},"Type":{"Light":"#2e7830","Dark":"#40c850"},"Builtin":{"Light":"#2e7830","Dark":"#40c850"},"Property":{"Light":"#a03020","Dark":"#e04030"},"Tag":{"Light":"#8c5014","Dark":"#ffb000"},"AttrName":{"Light":"#2e7830","Dark":"#40c850"},"AttrValue":{"Light":"#2e7830","Dark":"#40c850"}}},"Typography":{"Family":{"Sans":"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif","Serif":"Georgia, Cambria, 'Times New Roman', Times, serif","Mono":"'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'Courier New', monospace"},"Size":{"XS":"0.75rem","SM":"0.875rem","MD":"1rem","LG":"1.125rem","XL":"1.375rem","XXL":"1.75rem"},"Weight":{"Regular":"400","Medium":"500","Bold":"700"},"LineHeight":{"Tight":"1.2","Normal":"1.5","Loose":"1.7"}},"Spacing":{"XS":"4px","SM":"8px","MD":"12px","LG":"16px","XL":"24px","XXL":"32px"},"Radius":{"None":"0","SM":"2px","MD":"4px","LG":"8px","XL":"12px","Pill":"999px"},"Layout":{"SidebarWidth":"230px","TopbarHeight":"52px","StatusbarHeight":"28px"}},"Brand":{"Name":"Retold Labs","Tagline":"Run, compare, and distribute ML experiments across the mesh"}};},{}],66:[function(require,module,exports){module.exports={"Hash":"retold-labs","Name":"Retold Labs","Version":"0.0.1","Description":"retold-labs’ original \"professional\" identity — warm beige with teal accents and a deep teal sidebar. Light side preserves professional-light verbatim; dark side preserves professional-dark.","Comprehensive":true,"Modes":{"Strategy":"system","Default":"system"},"Tokens":{"Color":{"Background":{"Primary":{"Light":"#faf6f0","Dark":"#14201e"},"Secondary":{"Light":"#f0ebe2","Dark":"#1a2c2a"},"Tertiary":{"Light":"#f0ebe2","Dark":"#1a2c2a"},"Panel":{"Light":"#ffffff","Dark":"#1e3532"},"Sidebar":{"Light":"#1a3a3a","Dark":"#0e1a18"},"Hover":{"Light":"rgba(13, 138, 138, 0.06)","Dark":"rgba(45, 212, 191, 0.08)"},"Selected":{"Light":"rgba(13, 138, 138, 0.10)","Dark":"rgba(45, 212, 191, 0.12)"}},"Text":{"Primary":{"Light":"#2c2416","Dark":"#e0ebe8"},"Secondary":{"Light":"#5c4f3d","Dark":"#a8bfb8"},"Muted":{"Light":"#8a7d6b","Dark":"#6a8a82"},"Placeholder":{"Light":"#8a7d6b","Dark":"#6a8a82"},"OnBrand":{"Light":"#c8dcd8","Dark":"#c8dcd8"}},"Brand":{"Primary":{"Light":"#0d8a8a","Dark":"#2dd4bf"},"PrimaryHover":{"Light":"#14b8a6","Dark":"#5eead4"},"Accent":{"Light":"#0d8a8a","Dark":"#2dd4bf"},"AccentHover":{"Light":"#14b8a6","Dark":"#5eead4"}},"Border":{"Default":{"Light":"#ddd5c8","Dark":"#2a4a44"},"Light":{"Light":"#ddd5c8","Dark":"#2a4a44"},"Strong":{"Light":"#2a5454","Dark":"#1e3a36"}},"Status":{"Success":{"Light":"#2e9e5a","Dark":"#4ade80"},"Warning":{"Light":"#e07830","Dark":"#f59e4a"},"Error":{"Light":"#c9442e","Dark":"#f87171"},"Info":{"Light":"#0d8a8a","Dark":"#2dd4bf"}},"Scrollbar":{"Track":{"Light":"#f0ebe2","Dark":"#1a2c2a"},"Thumb":{"Light":"#ddd5c8","Dark":"#2a4a44"},"Hover":{"Light":"#8a7d6b","Dark":"#6a8a82"}},"Selection":{"Background":{"Light":"rgba(13, 138, 138, 0.10)","Dark":"rgba(45, 212, 191, 0.12)"},"Text":{"Light":"#2c2416","Dark":"#e0ebe8"}},"Focus":{"Outline":{"Light":"#0d8a8a","Dark":"#2dd4bf"}},"Shadow":{"Color":{"Light":"rgba(44, 36, 22, 0.12)","Dark":"rgba(0, 0, 0, 0.45)"}},"Syntax":{"Keyword":{"Light":"#0d8a8a","Dark":"#2dd4bf"},"String":{"Light":"#2e9e5a","Dark":"#4ade80"},"Number":{"Light":"#e07830","Dark":"#f59e4a"},"Comment":{"Light":"#8a7d6b","Dark":"#6a8a82"},"Operator":{"Light":"#0d8a8a","Dark":"#2dd4bf"},"Punctuation":{"Light":"#5c4f3d","Dark":"#a8bfb8"},"Function":{"Light":"#0d8a8a","Dark":"#2dd4bf"},"Variable":{"Light":"#2c2416","Dark":"#e0ebe8"},"Type":{"Light":"#e07830","Dark":"#f59e4a"},"Builtin":{"Light":"#e07830","Dark":"#f59e4a"},"Property":{"Light":"#c9442e","Dark":"#f87171"},"Tag":{"Light":"#0d8a8a","Dark":"#2dd4bf"},"AttrName":{"Light":"#e07830","Dark":"#f59e4a"},"AttrValue":{"Light":"#2e9e5a","Dark":"#4ade80"}}},"Typography":{"Family":{"Sans":"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif","Serif":"Georgia, Cambria, 'Times New Roman', Times, serif","Mono":"'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'Courier New', monospace"},"Size":{"XS":"0.75rem","SM":"0.875rem","MD":"1rem","LG":"1.125rem","XL":"1.375rem","XXL":"1.75rem"},"Weight":{"Regular":"400","Medium":"500","Bold":"700"},"LineHeight":{"Tight":"1.2","Normal":"1.5","Loose":"1.7"}},"Spacing":{"XS":"4px","SM":"8px","MD":"12px","LG":"16px","XL":"24px","XXL":"32px"},"Radius":{"None":"0","SM":"2px","MD":"4px","LG":"8px","XL":"12px","Pill":"999px"},"Layout":{"SidebarWidth":"230px","TopbarHeight":"52px","StatusbarHeight":"28px"}},"Brand":{"Name":"Retold Labs","Tagline":"Run, compare, and distribute ML experiments across the mesh"}};},{}],67:[function(require,module,exports){module.exports={"Hash":"retold-manager","Name":"Retold Manager","Description":"Default palette for the Retold Manager application — GitHub-style dark on slate with a parallel light variant. Dark side mirrors retold-manager.css's original colors verbatim; light side is a sympathetic translation tuned for daytime use. The retold-manager.css :root block proxies its --color-* names through these --theme-color-* tokens (with the original hexes as fallbacks), so this theme drives the whole app cleanly and other catalog themes still skin most of it.","Comprehensive":true,"Modes":{"Strategy":"system","Default":"system"},"Tokens":{"Color":{"Background":{"Primary":{"Light":"#f6f8fa","Dark":"#0e1116"},"Secondary":{"Light":"#eef1f4","Dark":"#161b22"},"Tertiary":{"Light":"#e4e8ec","Dark":"#1c2128"},"Panel":{"Light":"#ffffff","Dark":"#161b22"},"PanelAlt":{"Light":"#f0f3f6","Dark":"#1c2128"},"Hover":{"Light":"#eaeef2","Dark":"#1c2128"},"Selected":{"Light":"#dbe7ff","Dark":"#243454"}},"Border":{"Default":{"Light":"#d0d7de","Dark":"#30363d"},"Light":{"Light":"#e1e4e8","Dark":"#21262d"},"Strong":{"Light":"#a8b1bb","Dark":"#484f58"}},"Brand":{"Primary":{"Light":"#0969da","Dark":"#2f81f7"},"PrimaryHover":{"Light":"#0550ae","Dark":"#1f6feb"},"Accent":{"Light":"#0969da","Dark":"#2f81f7"},"AccentHover":{"Light":"#0550ae","Dark":"#1f6feb"}},"Text":{"Primary":{"Light":"#1f2328","Dark":"#e6edf3"},"Secondary":{"Light":"#3b424a","Dark":"#c9d1d9"},"Muted":{"Light":"#656d76","Dark":"#8b949e"},"Placeholder":{"Light":"#8c959f","Dark":"#6e7681"},"OnBrand":{"Light":"#ffffff","Dark":"#ffffff"}},"Status":{"Success":{"Light":"#1a7f37","Dark":"#3fb950"},"Danger":{"Light":"#cf222e","Dark":"#f85149"},"Warning":{"Light":"#9a6700","Dark":"#d29922"},"Error":{"Light":"#cf222e","Dark":"#f85149"},"Info":{"Light":"#0969da","Dark":"#2f81f7"}},"Data":{"1":{"Light":"#0969da","Dark":"#2f81f7"},"2":{"Light":"#cf222e","Dark":"#f85149"},"3":{"Light":"#1a7f37","Dark":"#3fb950"},"4":{"Light":"#9a6700","Dark":"#d29922"},"5":{"Light":"#8250df","Dark":"#a371f7"},"6":{"Light":"#bf3989","Dark":"#db61a2"},"7":{"Light":"#1b7c83","Dark":"#39c5cf"},"8":{"Light":"#656d76","Dark":"#8b949e"}},"Scrollbar":{"Track":{"Light":"#eef1f4","Dark":"#161b22"},"Thumb":{"Light":"#c1c8cf","Dark":"#30363d"},"Hover":{"Light":"#a8b1bb","Dark":"#484f58"}},"Selection":{"Background":{"Light":"#cfe6ff","Dark":"#243454"},"Text":{"Light":"#1f2328","Dark":"#e6edf3"}},"Focus":{"Outline":{"Light":"#0969da","Dark":"#2f81f7"}},"Syntax":{"Keyword":{"Light":"#cf222e","Dark":"#ff7b72"},"String":{"Light":"#0a3069","Dark":"#a5d6ff"},"Number":{"Light":"#0550ae","Dark":"#79c0ff"},"Comment":{"Light":"#6e7781","Dark":"#8b949e"},"Operator":{"Light":"#cf222e","Dark":"#ff7b72"},"Punctuation":{"Light":"#24292f","Dark":"#c9d1d9"},"Function":{"Light":"#8250df","Dark":"#d2a8ff"},"Variable":{"Light":"#24292f","Dark":"#c9d1d9"},"Type":{"Light":"#953800","Dark":"#ffa657"},"Builtin":{"Light":"#0550ae","Dark":"#79c0ff"},"Property":{"Light":"#0550ae","Dark":"#79c0ff"},"Tag":{"Light":"#116329","Dark":"#7ee787"},"AttrName":{"Light":"#8250df","Dark":"#d2a8ff"},"AttrValue":{"Light":"#0a3069","Dark":"#a5d6ff"}}},"Typography":{"Family":{"Sans":"-apple-system, BlinkMacSystemFont, \"SF Pro\", \"Segoe UI\", sans-serif","Mono":"ui-monospace, \"SF Mono\", Menlo, Monaco, \"Courier New\", monospace"}},"Layout":{"SidebarWidth":"280px","TopbarHeight":"44px","StatusbarHeight":"28px"}}};},{}],68:[function(require,module,exports){module.exports={"Hash":"retold-mono","Name":"Retold Mono","Version":"0.0.2","Description":"High-contrast monochrome theme — black on white in light mode, white on black in dark mode. Useful for print, simple admin tooling, and as a paired-mode reference theme that proves the toggle works on something visually unmistakable.","Comprehensive":true,"Modes":{"Strategy":"system","Default":"system"},"Tokens":{"Color":{"Background":{"Primary":{"Light":"#ffffff","Dark":"#000000"},"Secondary":{"Light":"#f0f0f0","Dark":"#101010"},"Tertiary":{"Light":"#e2e2e2","Dark":"#1c1c1c"},"Panel":{"Light":"#ffffff","Dark":"#000000"},"Hover":{"Light":"#ebebeb","Dark":"#1a1a1a"},"Selected":{"Light":"#d6d6d6","Dark":"#2a2a2a"}},"Text":{"Primary":{"Light":"#000000","Dark":"#ffffff"},"Secondary":{"Light":"#222222","Dark":"#dddddd"},"Muted":{"Light":"#555555","Dark":"#aaaaaa"},"Placeholder":{"Light":"#888888","Dark":"#777777"}},"Brand":{"Primary":{"Light":"#000000","Dark":"#ffffff"},"PrimaryHover":{"Light":"#222222","Dark":"#dddddd"},"Accent":{"Light":"#444444","Dark":"#bbbbbb"}},"Border":{"Default":{"Light":"#888888","Dark":"#666666"},"Light":{"Light":"#cccccc","Dark":"#333333"},"Strong":{"Light":"#000000","Dark":"#ffffff"}},"Status":{"Success":{"Light":"#000000","Dark":"#ffffff"},"Warning":{"Light":"#000000","Dark":"#ffffff"},"Error":{"Light":"#000000","Dark":"#ffffff"},"Info":{"Light":"#000000","Dark":"#ffffff"}},"Data":{"1":{"Light":"#000000","Dark":"#ffffff"},"2":{"Light":"#262626","Dark":"#e0e0e0"},"3":{"Light":"#404040","Dark":"#c0c0c0"},"4":{"Light":"#595959","Dark":"#a0a0a0"},"5":{"Light":"#737373","Dark":"#808080"},"6":{"Light":"#8c8c8c","Dark":"#737373"},"7":{"Light":"#a6a6a6","Dark":"#595959"},"8":{"Light":"#bfbfbf","Dark":"#404040"}},"Scrollbar":{"Track":{"Light":"#e0e0e0","Dark":"#101010"},"Thumb":{"Light":"#888888","Dark":"#666666"},"Hover":{"Light":"#444444","Dark":"#bbbbbb"}},"Selection":{"Background":{"Light":"#000000","Dark":"#ffffff"},"Text":{"Light":"#ffffff","Dark":"#000000"}},"Focus":{"Outline":{"Light":"#000000","Dark":"#ffffff"}},"Shadow":{"Color":{"Light":"rgba(0, 0, 0, 0.18)","Dark":"rgba(255, 255, 255, 0.18)"}},"Syntax":{"Keyword":{"Light":"#000000","Dark":"#ffffff"},"String":{"Light":"#555555","Dark":"#cccccc"},"Number":{"Light":"#000000","Dark":"#ffffff"},"Comment":{"Light":"#888888","Dark":"#888888"},"Operator":{"Light":"#000000","Dark":"#ffffff"},"Punctuation":{"Light":"#444444","Dark":"#bbbbbb"},"Function":{"Light":"#000000","Dark":"#ffffff"},"Variable":{"Light":"#000000","Dark":"#ffffff"},"Type":{"Light":"#222222","Dark":"#dddddd"},"Builtin":{"Light":"#222222","Dark":"#dddddd"},"Property":{"Light":"#444444","Dark":"#bbbbbb"},"Tag":{"Light":"#000000","Dark":"#ffffff"},"AttrName":{"Light":"#444444","Dark":"#bbbbbb"},"AttrValue":{"Light":"#555555","Dark":"#cccccc"}}},"Typography":{"Family":{"Sans":"Helvetica, Arial, sans-serif","Serif":"Georgia, Times New Roman, serif","Mono":"ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"},"Size":{"XS":"0.75rem","SM":"0.875rem","MD":"1rem","LG":"1.125rem","XL":"1.375rem","XXL":"1.75rem"},"Weight":{"Regular":"400","Medium":"600","Bold":"700"},"LineHeight":{"Tight":"1.15","Normal":"1.4","Loose":"1.65"}},"Spacing":{"XS":"4px","SM":"8px","MD":"12px","LG":"16px","XL":"24px","XXL":"32px"},"Radius":{"None":"0","SM":"0","MD":"0","LG":"0","XL":"0","Pill":"999px"},"Shadow":{"SM":"0 1px 0 var(--theme-color-shadow-color)","MD":"0 2px 0 var(--theme-color-shadow-color)","LG":"0 4px 0 var(--theme-color-shadow-color)"},"ZIndex":{"Base":"0","Dropdown":"100","Sticky":"200","Overlay":"900","Modal":"1000","Toast":"2000","Tooltip":"3000"},"Duration":{"Fast":"0ms","Normal":"0ms","Slow":"0ms"}},"Brand":{"Name":"Retold Mono","Tagline":"Black on white. White on black. Nothing else."},"CSS":[{"Hash":"retold-mono-brand-accents","Priority":600,"Content":"/* retold-mono — keeps the all-monochrome aesthetic but lets brand colors\n   in for narrow accent moments. The thick rule under H1 is brand primary;\n   the hair rule under H2 is brand secondary. Without a brand registered\n   they fall back to mono black/grey. */\na { text-decoration-color: var(--brand-color-primary-mode, currentColor); text-decoration-thickness: 2px; text-underline-offset: 3px; }\nh1 { border-bottom: 3px solid var(--brand-color-primary-mode, var(--theme-color-text-primary, #000)); padding-bottom: 6px; }\nh2 { border-bottom: 1px solid var(--brand-color-secondary-mode, var(--theme-color-border-default, #888)); padding-bottom: 4px; }"}]};},{}],69:[function(require,module,exports){module.exports={"Hash":"solarized-dark","Name":"Solarized Dark","Category":"Fun","Version":"0.0.1","Description":"Schoonover's classic palette Ported from RetoldRemote-ThemeDefinitions.js to the pict-provider-theme manifest format.","Comprehensive":true,"Modes":{"Strategy":"single","Default":"dark"},"Tokens":{"Color":{"Background":{"Primary":"#002B36","Secondary":"#073642","Tertiary":"#003B4A","Panel":"#00303C","Viewer":"#001E28","Hover":"#0A4858","Selected":"#155868","Thumb":"#073642"},"Text":{"Primary":"#FDF6E3","Secondary":"#EEE8D5","Muted":"#93A1A1","Dim":"#839496","Placeholder":"#657B83"},"Brand":{"Accent":"#268BD2","AccentHover":"#45A0E0"},"Border":{"Default":"#0A4050","Light":"#125868"},"Status":{"Danger":"#DC322F","DangerMuted":"#AA2A28"},"Scrollbar":{"Track":"#0A4050","Hover":"#125868"},"Selection":{"Background":"rgba(38, 139, 210, 0.25)"},"Focus":{"Outline":"#268BD2"},"Syntax":{"Keyword":"#859900","String":"#2AA198","Number":"#D33682","Comment":"#586E75","Operator":"#268BD2","Punctuation":"#93A1A1","Function":"#B58900","Variable":"#FDF6E3","Type":"#B58900","Builtin":"#CB4B16","Property":"#268BD2","Tag":"#268BD2","AttrName":"#B58900","AttrValue":"#2AA198"}},"Typography":{"Family":{"Sans":"'Source Code Pro', 'Fira Code', monospace","Mono":"'Source Code Pro', 'Fira Code', monospace"}}},"Aliases":{"--retold-bg-primary":"Color.Background.Primary","--retold-bg-secondary":"Color.Background.Secondary","--retold-bg-tertiary":"Color.Background.Tertiary","--retold-bg-panel":"Color.Background.Panel","--retold-bg-viewer":"Color.Background.Viewer","--retold-bg-hover":"Color.Background.Hover","--retold-bg-selected":"Color.Background.Selected","--retold-bg-thumb":"Color.Background.Thumb","--retold-text-primary":"Color.Text.Primary","--retold-text-secondary":"Color.Text.Secondary","--retold-text-muted":"Color.Text.Muted","--retold-text-dim":"Color.Text.Dim","--retold-text-placeholder":"Color.Text.Placeholder","--retold-accent":"Color.Brand.Accent","--retold-accent-hover":"Color.Brand.AccentHover","--retold-border":"Color.Border.Default","--retold-border-light":"Color.Border.Light","--retold-danger":"Color.Status.Danger","--retold-danger-muted":"Color.Status.DangerMuted","--retold-scrollbar":"Color.Scrollbar.Track","--retold-scrollbar-hover":"Color.Scrollbar.Hover","--retold-selection-bg":"Color.Selection.Background","--retold-focus-outline":"Color.Focus.Outline","--retold-font-family":"Typography.Family.Sans","--retold-font-mono":"Typography.Family.Mono"},"IconColors":{"Primary":"#EEE8D5","Accent":"#268BD2","Muted":"#839496","Light":"#003B4A","WarmBeige":"#073642","TealTint":"#004050","Lavender":"#003848","AmberTint":"#0A3A30","PdfFill":"#0A3028","PdfText":"#DC322F"},"CSS":[],"SVG":{},"Image":{},"CompiledAt":"2026-05-03T18:12:53.408Z","CompilerVersion":1};},{}],70:[function(require,module,exports){module.exports={"Hash":"synthwave","Name":"Synthwave","Category":"Fun","Version":"0.0.1","Description":"Purple and pink neon Ported from RetoldRemote-ThemeDefinitions.js to the pict-provider-theme manifest format.","Comprehensive":true,"Modes":{"Strategy":"single","Default":"dark"},"Tokens":{"Color":{"Background":{"Primary":"#1A0A2E","Secondary":"#140824","Tertiary":"#200E38","Panel":"#1C0C32","Viewer":"#100620","Hover":"#2A1848","Selected":"#3A2060","Thumb":"#140824"},"Text":{"Primary":"#E8C0F8","Secondary":"#D0A8E8","Muted":"#9878B8","Dim":"#7858A8","Placeholder":"#584088"},"Brand":{"Accent":"#FF71CE","AccentHover":"#FF99DD"},"Border":{"Default":"#302050","Light":"#402868"},"Status":{"Danger":"#FF4488","DangerMuted":"#AA3366"},"Scrollbar":{"Track":"#302050","Hover":"#402868"},"Selection":{"Background":"rgba(255, 113, 206, 0.25)"},"Focus":{"Outline":"#FF71CE"},"Syntax":{"Keyword":"#FF6AD5","String":"#FFE066","Number":"#FF6AD5","Comment":"#9C8AC1","Operator":"#26F0F1","Punctuation":"#C8B6E2","Function":"#26F0F1","Variable":"#FFE0FF","Type":"#FFD93D","Builtin":"#FFD93D","Property":"#FF477E","Tag":"#FF477E","AttrName":"#FFD93D","AttrValue":"#FFE066"}},"Typography":{"Family":{"Sans":"'Trebuchet MS', sans-serif","Mono":"'Courier New', monospace"}}},"Aliases":{"--retold-bg-primary":"Color.Background.Primary","--retold-bg-secondary":"Color.Background.Secondary","--retold-bg-tertiary":"Color.Background.Tertiary","--retold-bg-panel":"Color.Background.Panel","--retold-bg-viewer":"Color.Background.Viewer","--retold-bg-hover":"Color.Background.Hover","--retold-bg-selected":"Color.Background.Selected","--retold-bg-thumb":"Color.Background.Thumb","--retold-text-primary":"Color.Text.Primary","--retold-text-secondary":"Color.Text.Secondary","--retold-text-muted":"Color.Text.Muted","--retold-text-dim":"Color.Text.Dim","--retold-text-placeholder":"Color.Text.Placeholder","--retold-accent":"Color.Brand.Accent","--retold-accent-hover":"Color.Brand.AccentHover","--retold-border":"Color.Border.Default","--retold-border-light":"Color.Border.Light","--retold-danger":"Color.Status.Danger","--retold-danger-muted":"Color.Status.DangerMuted","--retold-scrollbar":"Color.Scrollbar.Track","--retold-scrollbar-hover":"Color.Scrollbar.Hover","--retold-selection-bg":"Color.Selection.Background","--retold-focus-outline":"Color.Focus.Outline","--retold-font-family":"Typography.Family.Sans","--retold-font-mono":"Typography.Family.Mono"},"IconColors":{"Primary":"#D0A8E8","Accent":"#FF71CE","Muted":"#7858A8","Light":"#200E38","WarmBeige":"#221040","TealTint":"#1A0C30","Lavender":"#1E0E36","AmberTint":"#241028","PdfFill":"#241020","PdfText":"#FF4488"},"CSS":[],"SVG":{},"Image":{},"CompiledAt":"2026-05-03T18:12:53.408Z","CompilerVersion":1};},{}],71:[function(require,module,exports){module.exports={"Hash":"twilight","Name":"Twilight","Category":"Grey","Version":"0.0.1","Description":"Dark grey, low light. Ported from RetoldRemote-ThemeDefinitions.js to the pict-provider-theme manifest format. Single-mode (no light/dark bifurcation). Aliases preserve the legacy `--retold-*` variable names so existing CSS keeps working through the migration.","Comprehensive":true,"Modes":{"Strategy":"single","Default":"dark"},"Tokens":{"Color":{"Background":{"Primary":"#1E1E1E","Secondary":"#181818","Tertiary":"#252525","Panel":"#202020","Viewer":"#141414","Hover":"#2E2E2E","Selected":"#404040","Thumb":"#181818"},"Text":{"Primary":"#E0E0E0","Secondary":"#C8C8C8","Muted":"#909090","Dim":"#707070","Placeholder":"#585858"},"Brand":{"Accent":"#A0A0A0","AccentHover":"#C0C0C0"},"Border":{"Default":"#333333","Light":"#404040"},"Status":{"Danger":"#FF6666","DangerMuted":"#AA6666"},"Scrollbar":{"Track":"#404040","Hover":"#505050"},"Selection":{"Background":"rgba(160, 160, 160, 0.25)"},"Focus":{"Outline":"#A0A0A0"},"Syntax":{"Keyword":"#B58FFF","String":"#9CDFB0","Number":"#FFB870","Comment":"#6E6E6E","Operator":"#7CC5FF","Punctuation":"#C0C0C0","Function":"#FFD080","Variable":"#E0E0E0","Type":"#FFB870","Builtin":"#FFB870","Property":"#FF8B8B","Tag":"#FF8B8B","AttrName":"#FFB870","AttrValue":"#9CDFB0"}},"Typography":{"Family":{"Sans":"system-ui, -apple-system, sans-serif","Mono":"'SF Mono', 'Fira Code', 'Consolas', monospace"}}},"Aliases":{"--retold-bg-primary":"Color.Background.Primary","--retold-bg-secondary":"Color.Background.Secondary","--retold-bg-tertiary":"Color.Background.Tertiary","--retold-bg-panel":"Color.Background.Panel","--retold-bg-viewer":"Color.Background.Viewer","--retold-bg-hover":"Color.Background.Hover","--retold-bg-selected":"Color.Background.Selected","--retold-bg-thumb":"Color.Background.Thumb","--retold-text-primary":"Color.Text.Primary","--retold-text-secondary":"Color.Text.Secondary","--retold-text-muted":"Color.Text.Muted","--retold-text-dim":"Color.Text.Dim","--retold-text-placeholder":"Color.Text.Placeholder","--retold-accent":"Color.Brand.Accent","--retold-accent-hover":"Color.Brand.AccentHover","--retold-border":"Color.Border.Default","--retold-border-light":"Color.Border.Light","--retold-danger":"Color.Status.Danger","--retold-danger-muted":"Color.Status.DangerMuted","--retold-scrollbar":"Color.Scrollbar.Track","--retold-scrollbar-hover":"Color.Scrollbar.Hover","--retold-selection-bg":"Color.Selection.Background","--retold-focus-outline":"Color.Focus.Outline","--retold-font-family":"Typography.Family.Sans","--retold-font-mono":"Typography.Family.Mono"},"IconColors":{"Primary":"#C8C8C8","Accent":"#A0A0A0","Muted":"#707070","Light":"#252525","WarmBeige":"#2A2A2A","TealTint":"#222222","Lavender":"#282828","AmberTint":"#2E2A24","PdfFill":"#2E2224","PdfText":"#E06060"},"CSS":[],"SVG":{},"Image":{},"CompiledAt":"2026-05-03T18:12:53.408Z","CompilerVersion":1};},{}],72:[function(require,module,exports){module.exports={"Hash":"ultravisor-desert-canyon","Name":"Ultravisor — Desert Canyon","Version":"0.0.1","Description":"Vibrant desert palette — orange brand and teal accents on deep canyon-brown backgrounds. Single-mode dark.","Comprehensive":true,"Modes":{"Strategy":"single","Default":"dark"},"Tokens":{"Color":{"Background":{"Primary":"#18120e","Secondary":"#221a14","Tertiary":"#2e2018","Panel":"#221a14","Hover":"#3a2a1e","Selected":"#3a2a1e"},"Text":{"Primary":"#d8c8b0","Secondary":"#e8d8c0","Muted":"#a09080","Placeholder":"#685040","OnBrand":"#18120e"},"Brand":{"Primary":"#e8943a","PrimaryHover":"#f0a44a","Accent":"#18a0a0","AccentHover":"#30b0b0"},"Border":{"Default":"#3a2a1e","Light":"#2e2018","Strong":"#4a3a2e"},"Status":{"Success":"#18a0a0","Warning":"#e0c870","Error":"#e05830","Info":"#18a0a0"},"Scrollbar":{"Track":"#221a14","Thumb":"#3a2a1e","Hover":"#4a3a2e"},"Selection":{"Background":"#3a2a1e","Text":"#e8d8c0"},"Focus":{"Outline":"#e8943a"},"Shadow":{"Color":"rgba(0, 0, 0, 0.30)"},"Syntax":{"Keyword":"#E89A6E","String":"#8FD493","Number":"#E8A94D","Comment":"#8E8478","Operator":"#4FB3A6","Punctuation":"#C0B5A4","Function":"#7FBDD8","Variable":"#E8DCC8","Type":"#E8A94D","Builtin":"#E8A94D","Property":"#E89A6E","Tag":"#E89A6E","AttrName":"#E8A94D","AttrValue":"#8FD493"},"Editor":{"LineNumberBackground":"#221a14","LineNumberText":"#685040","CurrentLineHighlight":"#2e2018","SelectionBackground":"#3a2a1e","GutterBorder":"#2e2018"}},"Typography":{"Family":{"Sans":"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif","Serif":"Georgia, Cambria, 'Times New Roman', Times, serif","Mono":"'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'Courier New', monospace"}},"Layout":{"SidebarWidth":"260px","TopbarHeight":"56px","StatusbarHeight":"28px"}},"Brand":{"Name":"Ultravisor","Tagline":"Process supervision and workflow automation"}};},{}],73:[function(require,module,exports){module.exports={"Hash":"ultravisor-desert-day","Name":"Ultravisor — Desert Day","Version":"0.0.1","Description":"Ultravisor's warm light palette — cream backgrounds, deep walnut text, teal accents. Single-mode light.","Comprehensive":true,"Modes":{"Strategy":"single","Default":"light"},"Tokens":{"Color":{"Background":{"Primary":"#faf6f0","Secondary":"#f0e6d6","Tertiary":"#e8ddd0","Panel":"#ffffff","Hover":"#f0e6d6","Selected":"#e8ddd0"},"Text":{"Primary":"#3d2b1f","Secondary":"#2e1e14","Muted":"#8a7560","Placeholder":"#a09080","OnBrand":"#ffffff"},"Brand":{"Primary":"#5c3d2e","PrimaryHover":"#7a5040","Accent":"#3a8a8c","AccentHover":"#2a7070"},"Border":{"Default":"#e0d0b8","Light":"#e8ddd0","Strong":"#c8b8a0"},"Status":{"Success":"#5a7a30","Warning":"#b08020","Error":"#a03040","Info":"#3a8a8c"},"Scrollbar":{"Track":"#f0e6d6","Thumb":"#d0c0a8","Hover":"#c0b098"},"Selection":{"Background":"#e8ddd0","Text":"#2e1e14"},"Focus":{"Outline":"#c2703e"},"Shadow":{"Color":"rgba(92, 61, 46, 0.10)"},"Syntax":{"Keyword":"#A0532E","String":"#3F8A52","Number":"#A86B00","Comment":"#8A7F72","Operator":"#2E7D74","Punctuation":"#5E5549","Function":"#2E5E96","Variable":"#3D3229","Type":"#A86B00","Builtin":"#A86B00","Property":"#A0532E","Tag":"#A0532E","AttrName":"#A86B00","AttrValue":"#3F8A52"},"Editor":{"LineNumberBackground":"#f0e6d6","LineNumberText":"#a09080","CurrentLineHighlight":"#f5ede0","SelectionBackground":"#e8ddd0","GutterBorder":"#e0d0b8"}},"Typography":{"Family":{"Sans":"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif","Serif":"Georgia, Cambria, 'Times New Roman', Times, serif","Mono":"'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'Courier New', monospace"}},"Layout":{"SidebarWidth":"260px","TopbarHeight":"56px","StatusbarHeight":"28px"}},"Brand":{"Name":"Ultravisor","Tagline":"Process supervision and workflow automation"}};},{}],74:[function(require,module,exports){module.exports={"Hash":"ultravisor-desert-dusk","Name":"Ultravisor — Desert Dusk","Version":"0.0.1","Description":"Ultravisor's original default — warm tan brand on muted dark desert backgrounds. Single-mode dark.","Comprehensive":true,"Modes":{"Strategy":"single","Default":"dark"},"Tokens":{"Color":{"Background":{"Primary":"#1a1714","Secondary":"#252018","Tertiary":"#302818","Panel":"#252018","Hover":"#3a3028","Selected":"#3a3028"},"Text":{"Primary":"#c8b8a0","Secondary":"#d8c8a8","Muted":"#907860","Placeholder":"#706050","OnBrand":"#FFFFFF"},"Brand":{"Primary":"#c4956a","PrimaryHover":"#d4a57a","Accent":"#4a9090","AccentHover":"#5aacac"},"Border":{"Default":"#3a3028","Light":"#302818","Strong":"#4a4038"},"Status":{"Success":"#8a9a5a","Warning":"#c0a050","Error":"#b04050","Info":"#4a9090"},"Scrollbar":{"Track":"#252018","Thumb":"#3a3028","Hover":"#4a4038"},"Selection":{"Background":"#3a3028","Text":"#d8c8a8"},"Focus":{"Outline":"#c4956a"},"Shadow":{"Color":"rgba(0, 0, 0, 0.30)"},"Syntax":{"Keyword":"#E89A6E","String":"#8FD493","Number":"#E8A94D","Comment":"#8E8478","Operator":"#4FB3A6","Punctuation":"#C0B5A4","Function":"#7FBDD8","Variable":"#E8DCC8","Type":"#E8A94D","Builtin":"#E8A94D","Property":"#E89A6E","Tag":"#E89A6E","AttrName":"#E8A94D","AttrValue":"#8FD493"},"Editor":{"LineNumberBackground":"#252018","LineNumberText":"#706050","CurrentLineHighlight":"#302818","SelectionBackground":"#3a3028","GutterBorder":"#302818"}},"Typography":{"Family":{"Sans":"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif","Serif":"Georgia, Cambria, 'Times New Roman', Times, serif","Mono":"'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'Courier New', monospace"}},"Layout":{"SidebarWidth":"260px","TopbarHeight":"56px","StatusbarHeight":"28px"}},"Brand":{"Name":"Ultravisor","Tagline":"Process supervision and workflow automation"}};},{}],75:[function(require,module,exports){module.exports={"Hash":"ultravisor-desert-sunset","Name":"Ultravisor — Desert Sunset","Version":"0.0.1","Description":"Ultravisor's golden-hour palette — orange brand on rust-warmed dark backgrounds. Single-mode dark.","Comprehensive":true,"Modes":{"Strategy":"single","Default":"dark"},"Tokens":{"Color":{"Background":{"Primary":"#1e1610","Secondary":"#2a2018","Tertiary":"#342818","Panel":"#2a2018","Hover":"#3a2e22","Selected":"#3a2e22"},"Text":{"Primary":"#d4c4aa","Secondary":"#e0d0b8","Muted":"#8a7560","Placeholder":"#6a5840","OnBrand":"#1e1610"},"Brand":{"Primary":"#e8943a","PrimaryHover":"#f0a44a","Accent":"#2a8a8a","AccentHover":"#3a9a9a"},"Border":{"Default":"#3a2e22","Light":"#342818","Strong":"#4a3e32"},"Status":{"Success":"#6a9a3a","Warning":"#d4a46a","Error":"#c44e2a","Info":"#2a8a8a"},"Scrollbar":{"Track":"#2a2018","Thumb":"#3a2e22","Hover":"#4a3e32"},"Selection":{"Background":"#3a2e22","Text":"#e0d0b8"},"Focus":{"Outline":"#e8943a"},"Shadow":{"Color":"rgba(0, 0, 0, 0.30)"},"Syntax":{"Keyword":"#E89A6E","String":"#8FD493","Number":"#E8A94D","Comment":"#8E8478","Operator":"#4FB3A6","Punctuation":"#C0B5A4","Function":"#7FBDD8","Variable":"#E8DCC8","Type":"#E8A94D","Builtin":"#E8A94D","Property":"#E89A6E","Tag":"#E89A6E","AttrName":"#E8A94D","AttrValue":"#8FD493"},"Editor":{"LineNumberBackground":"#2a2018","LineNumberText":"#6a5840","CurrentLineHighlight":"#342818","SelectionBackground":"#3a2e22","GutterBorder":"#342818"}},"Typography":{"Family":{"Sans":"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif","Serif":"Georgia, Cambria, 'Times New Roman', Times, serif","Mono":"'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'Courier New', monospace"}},"Layout":{"SidebarWidth":"260px","TopbarHeight":"56px","StatusbarHeight":"28px"}},"Brand":{"Name":"Ultravisor","Tagline":"Process supervision and workflow automation"}};},{}],76:[function(require,module,exports){module.exports={"Hash":"ultravisor-professional-dark","Name":"Ultravisor — Professional Dark","Version":"0.0.1","Description":"Dark modern palette — slate-blue text on inky surfaces, sky-blue brand. Single-mode dark.","Comprehensive":true,"Modes":{"Strategy":"single","Default":"dark"},"Tokens":{"Color":{"Background":{"Primary":"#111318","Secondary":"#1a1d24","Tertiary":"#22252e","Panel":"#1a1d24","Hover":"#282c34","Selected":"#282c34"},"Text":{"Primary":"#c8cdd5","Secondary":"#e0e4ea","Muted":"#8b92a0","Placeholder":"#5a6070","OnBrand":"#ffffff"},"Brand":{"Primary":"#60a5fa","PrimaryHover":"#93c5fd","Accent":"#60a5fa","AccentHover":"#93c5fd"},"Border":{"Default":"#282c34","Light":"#22252e","Strong":"#3a3f4a"},"Status":{"Success":"#34d399","Warning":"#fbbf24","Error":"#f87171","Info":"#60a5fa"},"Scrollbar":{"Track":"#1a1d24","Thumb":"#282c34","Hover":"#3a3f4a"},"Selection":{"Background":"#1e2230","Text":"#e0e4ea"},"Focus":{"Outline":"#60a5fa"},"Shadow":{"Color":"rgba(0, 0, 0, 0.30)"},"Syntax":{"Keyword":"#E89A6E","String":"#8FD493","Number":"#E8A94D","Comment":"#8E8478","Operator":"#4FB3A6","Punctuation":"#C0B5A4","Function":"#7FBDD8","Variable":"#E8DCC8","Type":"#E8A94D","Builtin":"#E8A94D","Property":"#E89A6E","Tag":"#E89A6E","AttrName":"#E8A94D","AttrValue":"#8FD493"},"Editor":{"LineNumberBackground":"#1a1d24","LineNumberText":"#5a6070","CurrentLineHighlight":"#22252e","SelectionBackground":"#1e2230","GutterBorder":"#22252e"}},"Typography":{"Family":{"Sans":"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif","Serif":"Georgia, Cambria, 'Times New Roman', Times, serif","Mono":"'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'Courier New', monospace"}},"Layout":{"SidebarWidth":"260px","TopbarHeight":"56px","StatusbarHeight":"28px"}},"Brand":{"Name":"Ultravisor","Tagline":"Process supervision and workflow automation"}};},{}],77:[function(require,module,exports){module.exports={"Hash":"ultravisor-professional-light","Name":"Ultravisor — Professional Light","Version":"0.0.1","Description":"Bright modern palette — slate text on near-white backgrounds, royal-blue brand. Single-mode light.","Comprehensive":true,"Modes":{"Strategy":"single","Default":"light"},"Tokens":{"Color":{"Background":{"Primary":"#f5f6f8","Secondary":"#ffffff","Tertiary":"#e4e7ec","Panel":"#ffffff","Hover":"#f0f1f4","Selected":"#e4e7ec"},"Text":{"Primary":"#2d3748","Secondary":"#1a202c","Muted":"#6b7280","Placeholder":"#9ca3af","OnBrand":"#ffffff"},"Brand":{"Primary":"#3b82f6","PrimaryHover":"#2563eb","Accent":"#3b82f6","AccentHover":"#2563eb"},"Border":{"Default":"#e2e5ea","Light":"#eceef2","Strong":"#c8cdd5"},"Status":{"Success":"#10b981","Warning":"#f59e0b","Error":"#ef4444","Info":"#3b82f6"},"Scrollbar":{"Track":"#f0f1f4","Thumb":"#d1d5db","Hover":"#b0b5bd"},"Selection":{"Background":"#dbeafe","Text":"#1a202c"},"Focus":{"Outline":"#3b82f6"},"Shadow":{"Color":"rgba(0, 0, 0, 0.06)"},"Syntax":{"Keyword":"#A0532E","String":"#3F8A52","Number":"#A86B00","Comment":"#8A7F72","Operator":"#2E7D74","Punctuation":"#5E5549","Function":"#2E5E96","Variable":"#3D3229","Type":"#A86B00","Builtin":"#A86B00","Property":"#A0532E","Tag":"#A0532E","AttrName":"#A86B00","AttrValue":"#3F8A52"},"Editor":{"LineNumberBackground":"#f5f6f8","LineNumberText":"#9ca3af","CurrentLineHighlight":"#f0f1f4","SelectionBackground":"#dbeafe","GutterBorder":"#e2e5ea"}},"Typography":{"Family":{"Sans":"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif","Serif":"Georgia, Cambria, 'Times New Roman', Times, serif","Mono":"'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'Courier New', monospace"}},"Layout":{"SidebarWidth":"260px","TopbarHeight":"56px","StatusbarHeight":"28px"}},"Brand":{"Name":"Ultravisor","Tagline":"Process supervision and workflow automation"}};},{}],78:[function(require,module,exports){/**
 * Theme-BottomBar — standard application footer row.
 *
 * The bottom-row counterpart to Theme-TopBar: a thin status / chrome bar
 * that sits at the absolute bottom of the application shell. Three
 * zones — status text on the left, info indicators in the middle, and
 * action buttons / toggles on the right.
 *
 *   ┌────────────────────────────────────────────────────────────────┐
 *   │ Status text          [── Info slot (flex) ──]      [actions]   │
 *   └────────────────────────────────────────────────────────────────┘
 *
 * Renders into `#Theme-BottomBar` by default.
 *
 * Three slots host views drop content into:
 *   - `#Theme-BottomBar-Status`  — short status / state line (left)
 *   - `#Theme-BottomBar-Info`    — center info: connection, version,
 *                                  ambient indicators
 *   - `#Theme-BottomBar-Actions` — log toggle, debug controls, etc.
 *
 * Top border uses `--brand-color-secondary-mode` so the bottombar gets
 * a brand-tinted edge that's visually distinct from the topbar's
 * primary-color stripe.
 */const libPictView=require('pict-view');const _ViewConfiguration={ViewIdentifier:'Theme-BottomBar',AutoInitialize:true,AutoRender:false,DefaultDestinationAddress:'#Theme-BottomBar',DefaultRenderable:'Theme-BottomBar-Renderable',// ViewIdentifier of a host view that fills #Theme-BottomBar-Status.
StatusView:null,// ViewIdentifier of a host view that fills #Theme-BottomBar-Info.
InfoView:null,// ViewIdentifier of a host view that fills #Theme-BottomBar-Actions.
ActionsView:null,// Height of the bar in pixels. Drives the min-height on the chrome
// row so it fills the panel cleanly even when the parent chain
// (pict-section-modal shell uses min-height: 100% on its panel
// content destination, which doesn't resolve through plain
// height: 100% chains) doesn't establish a determinate height.
// Hosts should match this to whatever Size they use on the panel
// addPanel() call so the chrome and panel agree on the row size.
Height:32,Templates:[{Hash:'Theme-BottomBar-Template',Template:/*html*/`
<div class="pict-theme-bottombar">
	<div class="pict-theme-bottombar-status" id="Theme-BottomBar-Status"></div>
	<div class="pict-theme-bottombar-info" id="Theme-BottomBar-Info"></div>
	<div class="pict-theme-bottombar-actions" id="Theme-BottomBar-Actions"></div>
</div>`}],Renderables:[{RenderableHash:'Theme-BottomBar-Renderable',TemplateHash:'Theme-BottomBar-Template',ContentDestinationAddress:'#Theme-BottomBar',RenderMethod:'replace'}],CSS:/*css*/`
.pict-theme-bottombar {
	display: flex;
	align-items: center;
	gap: 14px;
	/* The min-height is rewritten per-instance in onAfterRender from the
	   Height option (default 32). A fixed px value avoids the
	   percent-height resolution trap the pict-section-modal shell sets
	   up — see the comment on Theme-TopBar's CSS for the full story. */
	min-height: 32px;
	padding: 0 14px;
	box-sizing: border-box;
	background: var(--theme-color-background-secondary, transparent);
	font-size: var(--theme-typography-size-xs, 12px);
	color: var(--theme-color-text-secondary, #4a5568);
	/* Single medium brand-primary stripe at the top of the bottombar.
	   The topbar carries the full two-stripe identifier; on the
	   bottombar (which is only 32px tall) a single 2px primary line is
	   enough to seat the brand colour at the bottom of the page
	   without competing for visual weight against the content row. */
	border-top: 2px solid var(--brand-color-primary-mode, var(--theme-color-brand-primary, #2563eb));
}
.pict-theme-bottombar-status {
	flex: 0 0 auto;
	display: flex;
	align-items: center;
	gap: 6px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 50%;
}
.pict-theme-bottombar-info {
	flex: 1 1 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 12px;
	min-width: 0;
	overflow: hidden;
}
.pict-theme-bottombar-actions {
	flex: 0 0 auto;
	display: flex;
	align-items: center;
	gap: 6px;
}`,CSSPriority:500};class PictViewThemeBottomBar extends libPictView{constructor(pFable,pOptions,pServiceHash){super(pFable,pOptions,pServiceHash);}onAfterRender(pRenderable,pAddress,pRecord,pContent){this.pict.CSSMap.injectCSS();// Apply the configured Height to the rendered .pict-theme-bottombar
// — see the matching block in Theme-TopBar's onAfterRender for why.
if(typeof document!=='undefined'&&this.options.Height){let tmpRoot=document.querySelector('.pict-theme-bottombar');if(tmpRoot){tmpRoot.style.minHeight=this.options.Height+'px';}}let tmpRenderSlot=pIdentifier=>{if(!pIdentifier)return;let tmpView=this.pict.views[pIdentifier];if(tmpView){tmpView.render();}else if(this.log&&this.log.warn){this.log.warn('Theme-BottomBar: slot view "'+pIdentifier+'" not registered');}};tmpRenderSlot(this.options.StatusView);tmpRenderSlot(this.options.InfoView);tmpRenderSlot(this.options.ActionsView);return super.onAfterRender?super.onAfterRender(pRenderable,pAddress,pRecord,pContent):undefined;}// ─── Per-route slot swapping ──────────────────────────────────────────
// Mirrors Theme-TopBar's setNavView / setUserView — call from a
// router callback to swap the bottom bar's slot content as the
// route changes (different status formats per page, etc.).
setStatusView(pViewIdentifier){this._setSlotView('StatusView','#Theme-BottomBar-Status',pViewIdentifier);}setInfoView(pViewIdentifier){this._setSlotView('InfoView','#Theme-BottomBar-Info',pViewIdentifier);}setActionsView(pViewIdentifier){this._setSlotView('ActionsView','#Theme-BottomBar-Actions',pViewIdentifier);}_setSlotView(pOptionKey,pDestSelector,pViewIdentifier){this.options[pOptionKey]=pViewIdentifier||null;if(typeof document!=='undefined'){let tmpDest=document.querySelector(pDestSelector);if(tmpDest){tmpDest.innerHTML='';}}if(!pViewIdentifier){return;}let tmpView=this.pict.views[pViewIdentifier];if(tmpView){tmpView.render();}else if(this.log&&this.log.warn){this.log.warn('Theme-BottomBar: view "'+pViewIdentifier+'" not registered');}}}module.exports=PictViewThemeBottomBar;module.exports.default_configuration=_ViewConfiguration;},{"pict-view":89}],79:[function(require,module,exports){/**
 * Theme-Brand-Mark — single-row inline brand mark (icon + name).
 *
 * The drop-in counterpart to Theme-BrandStrip for apps that put the
 * brand wordmark *inside* their topbar (next to action buttons) rather
 * than as a multi-row chrome below the nav.
 *
 * Layout:
 *
 *   ┌─────────────────────────┐
 *   │ [icon]  App Name        │
 *   └─────────────────────────┘
 *
 * Colors come from the brand's primary/secondary; the icon (when SVG
 * with `stroke="currentColor"`) inherits `--brand-color-primary-mode`,
 * which auto-swaps between PrimaryLight (default mode) and PrimaryDark
 * (`.theme-dark`).
 *
 * Reads from libThemeBrand and re-renders on `onChange`. Renders an
 * empty span when no brand is registered.
 *
 * Drop-in destination: `<div id="Theme-Brand-Mark"></div>`.
 */const libPictView=require('pict-view');const libThemeBrand=require('../Theme-Brand.js');const _ViewConfiguration={ViewIdentifier:'Theme-Brand-Mark',AutoInitialize:true,AutoRender:false,DefaultDestinationAddress:'#Theme-Brand-Mark',DefaultRenderable:'Theme-Brand-Mark-Renderable',// Optional: when false the icon is omitted (text-only wordmark).
ShowIcon:true,// Optional: when false the name is omitted (icon-only mark).
ShowName:true,Templates:[{Hash:'Theme-Brand-Mark-Template',Template:/*html*/`{~TS:Theme-Brand-Mark-Body-Template:AppData.PictSectionTheme.BrandMark.BodySlot~}`},{Hash:'Theme-Brand-Mark-Body-Template',Template:/*html*/`
<span class="pict-theme-brand-mark" title="{~D:Record.Tooltip~}">
	{~TS:Theme-Brand-Mark-IconSVG-Template:Record.IconSVGSlot~}
	{~TS:Theme-Brand-Mark-IconImg-Template:Record.IconImgSlot~}
	{~TS:Theme-Brand-Mark-Name-Template:Record.NameSlot~}
</span>`},{// Inline SVG: trusted markup; let it ride. SVG icons that
// reference `currentColor` inherit `--brand-color-primary-mode`.
Hash:'Theme-Brand-Mark-IconSVG-Template',Template:/*html*/`<span class="pict-theme-brand-mark-icon">{~D:Record.IconHTML~}</span>`},{Hash:'Theme-Brand-Mark-IconImg-Template',Template:/*html*/`<span class="pict-theme-brand-mark-icon"><img src="{~D:Record.IconURL~}" alt=""></span>`},{Hash:'Theme-Brand-Mark-Name-Template',Template:/*html*/`<span class="pict-theme-brand-mark-name">{~D:Record.Name~}</span>`}],Renderables:[{RenderableHash:'Theme-Brand-Mark-Renderable',TemplateHash:'Theme-Brand-Mark-Template',ContentDestinationAddress:'#Theme-Brand-Mark',RenderMethod:'replace'}],CSS:/*css*/`
.pict-theme-brand-mark {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	/* line-height: 1 collapses the inherited ~1.2 line-box around the
	   name glyphs. Without this the inline-flex container is taller
	   than its visible content, the line-box adds asymmetric space
	   above the caps, and the whole mark looks pushed up vs.
	   neighbouring buttons that sit on standard 12px-text baselines. */
	line-height: 1;
	color: var(--brand-color-primary-mode, var(--theme-color-text-primary, #1a1a1a));
	user-select: none;
}
.pict-theme-brand-mark-icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 22px;
	height: 22px;
	color: currentColor;
}
.pict-theme-brand-mark-icon img,
.pict-theme-brand-mark-icon svg {
	width: 100%;
	height: 100%;
	display: block;
}
.pict-theme-brand-mark-name {
	/* Font size dropped from 15 → 14 so the brand name reads closer
	   to the typical 12px action-button text height; bigger glyphs
	   reaching higher into the row are why the mark looked optically
	   high. The 2px brand-secondary underline keeps the mark feeling
	   distinctly branded; padding-bottom: 1px was an asymmetric nudge
	   that shifted the visual center up — removed. */
	font-size: 14px;
	font-weight: 600;
	letter-spacing: 0.4px;
	border-bottom: 2px solid var(--brand-color-secondary-mode, transparent);
	white-space: nowrap;
}
/* Compact form — at narrow viewports the brand mark collapses to
   icon-only. The icon alone still reads as the brand (the deterministic
   logo is designed to be recognisable without the wordmark) and freeing
   up the wordmark's width keeps the nav buttons reachable on tablet /
   small-laptop widths. The threshold matches the topbar's compact
   breakpoint in Theme-TopBar. */
@media (max-width: 720px) {
	.pict-theme-brand-mark-name {
		display: none;
	}
}`,CSSPriority:500};class PictViewThemeBrandMark extends libPictView{constructor(pFable,pOptions,pServiceHash){super(pFable,pOptions,pServiceHash);this._unsubscribeFromBrand=null;}onAfterInitialize(){this._subscribeToBrand();return super.onAfterInitialize?super.onAfterInitialize():undefined;}onBeforeRender(pRenderable){this._refreshAppData();return super.onBeforeRender?super.onBeforeRender(pRenderable):undefined;}onAfterRender(pRenderable,pAddress,pRecord,pContent){this.pict.CSSMap.injectCSS();return super.onAfterRender?super.onAfterRender(pRenderable,pAddress,pRecord,pContent):undefined;}_subscribeToBrand(){if(this._unsubscribeFromBrand)return;let tmpSelf=this;this._unsubscribeFromBrand=libThemeBrand.onChange(function(){tmpSelf.render();});}_refreshAppData(){let tmpBrand=libThemeBrand.getActive();this.pict.AppData.PictSectionTheme=this.pict.AppData.PictSectionTheme||{};if(!tmpBrand){this.pict.AppData.PictSectionTheme.BrandMark={BodySlot:[]};return;}// Single-element array slot drives the {~TS:~} render. Empty
// slots for icon-img/icon-svg/name suppress those sub-templates.
let tmpShowIcon=this.options.ShowIcon!==false;let tmpShowName=this.options.ShowName!==false;let tmpIconSVGSlot=tmpShowIcon&&tmpBrand.IconType==='svg'&&tmpBrand.Icon?[{IconHTML:tmpBrand.Icon}]:[];let tmpIconImgSlot=tmpShowIcon&&tmpBrand.IconType==='image'&&tmpBrand.Icon?[{IconURL:tmpBrand.Icon}]:[];let tmpNameSlot=tmpShowName&&tmpBrand.Name?[{Name:tmpBrand.Name}]:[];this.pict.AppData.PictSectionTheme.BrandMark={BodySlot:[{Tooltip:tmpBrand.Tagline||tmpBrand.Name||'',IconSVGSlot:tmpIconSVGSlot,IconImgSlot:tmpIconImgSlot,NameSlot:tmpNameSlot}]};}}module.exports=PictViewThemeBrandMark;module.exports.default_configuration=_ViewConfiguration;},{"../Theme-Brand.js":29,"pict-view":89}],80:[function(require,module,exports){/**
 * Theme-BrandStrip — the subtle two-line brand signature that sits
 * under the application's navigation.
 *
 * Layout:
 *
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │ [icon]  App Name                                            │
 *   │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │  ← primary stripe (3× tall)
 *   │ ─────────────────────────────────────────────────────────── │  ← secondary stripe (1× tall)
 *   └─────────────────────────────────────────────────────────────┘
 *
 * The icon + name row is colored using the brand's primary color (and
 * the secondary as an underline accent on the name). Clicking the row
 * does nothing by default — hosts that want it to navigate or open a
 * dropdown can pass an `OnClickName` hook in the view options.
 *
 * Reads the active brand from libThemeBrand. Subscribes to
 * libThemeBrand.onChange so swapping the brand at runtime updates the
 * strip immediately. Renders nothing (an empty span) when no brand is
 * registered.
 *
 * Drop-in destination: `<div id="Theme-BrandStrip"></div>`.
 */const libPictView=require('pict-view');const libThemeBrand=require('../Theme-Brand.js');const _ViewConfiguration={ViewIdentifier:'Theme-BrandStrip',AutoInitialize:true,AutoRender:false,DefaultDestinationAddress:'#Theme-BrandStrip',DefaultRenderable:'Theme-BrandStrip-Renderable',// Stripe heights in pixels. Primary is conventionally 3× secondary,
// per the design brief, but exposed here so hosts can tune.
PrimaryStripeHeight:3,SecondaryStripeHeight:1,// When false, the icon + name row is omitted and only the two
// stripes render. Useful for very tight chrome where the brand
// name is already in the topbar.
ShowName:true,Templates:[{Hash:'Theme-BrandStrip-Template',Template:/*html*/`
{~TS:Theme-BrandStrip-Body-Template:AppData.PictSectionTheme.BrandStrip.BodySlot~}`},{Hash:'Theme-BrandStrip-Body-Template',Template:/*html*/`
<div class="pict-theme-brandstrip" title="{~D:Record.Tooltip~}">
	{~TS:Theme-BrandStrip-NameRow-Template:Record.NameRowSlot~}
	<div class="pict-theme-brandstrip-stripes">
		<div class="pict-theme-brandstrip-stripe pict-theme-brandstrip-stripe-primary"
		     style="height: {~D:Record.PrimaryHeight~}px;"></div>
		<div class="pict-theme-brandstrip-stripe pict-theme-brandstrip-stripe-secondary"
		     style="height: {~D:Record.SecondaryHeight~}px;"></div>
	</div>
</div>`},{Hash:'Theme-BrandStrip-NameRow-Template',Template:/*html*/`
<div class="pict-theme-brandstrip-row">
	{~TS:Theme-BrandStrip-IconSVG-Template:Record.IconSVGSlot~}
	{~TS:Theme-BrandStrip-IconImg-Template:Record.IconImgSlot~}
	<span class="pict-theme-brandstrip-name">{~D:Record.Name~}</span>
</div>`},{// SVG icon: leading <svg> markup is trusted (host-supplied,
// not user-supplied) so we let it through verbatim. Theme-Icons
// SVGs use stroke="currentColor" so they pick up the brand
// primary color from the row's `color: var(--brand-color-primary)`.
Hash:'Theme-BrandStrip-IconSVG-Template',Template:/*html*/`<span class="pict-theme-brandstrip-icon">{~D:Record.IconHTML~}</span>`},{// <img> icon: src can be a data URL or a regular URL.
Hash:'Theme-BrandStrip-IconImg-Template',Template:/*html*/`<span class="pict-theme-brandstrip-icon"><img src="{~D:Record.IconURL~}" alt=""></span>`}],Renderables:[{RenderableHash:'Theme-BrandStrip-Renderable',TemplateHash:'Theme-BrandStrip-Template',ContentDestinationAddress:'#Theme-BrandStrip',RenderMethod:'replace'}],CSS:/*css*/`
.pict-theme-brandstrip {
	display: flex;
	flex-direction: column;
	gap: 4px;
	user-select: none;
}
.pict-theme-brandstrip-row {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	padding: 6px 12px 4px;
	font-size: 12px;
	font-weight: 600;
	letter-spacing: 0.4px;
	text-transform: uppercase;
	color: var(--brand-color-primary, var(--theme-color-text-muted, #6b6b6b));
}
.pict-theme-brandstrip-name {
	border-bottom: 2px solid var(--brand-color-secondary, transparent);
	padding-bottom: 1px;
}
.pict-theme-brandstrip-icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 16px; height: 16px;
	color: var(--brand-color-primary, currentColor);
}
.pict-theme-brandstrip-icon img,
.pict-theme-brandstrip-icon svg {
	width: 100%; height: 100%;
	display: block;
}
.pict-theme-brandstrip-stripes {
	display: flex;
	flex-direction: column;
	width: 100%;
}
.pict-theme-brandstrip-stripe {
	width: 100%;
}
.pict-theme-brandstrip-stripe-primary {
	background: var(--brand-color-primary, transparent);
}
.pict-theme-brandstrip-stripe-secondary {
	background: var(--brand-color-secondary, transparent);
}`,CSSPriority:500};class PictViewThemeBrandStrip extends libPictView{constructor(pFable,pOptions,pServiceHash){super(pFable,pOptions,pServiceHash);this._unsubscribeFromBrand=null;}onAfterInitialize(){this._subscribeToBrand();return super.onAfterInitialize?super.onAfterInitialize():undefined;}onBeforeRender(pRenderable){this._refreshAppData();return super.onBeforeRender?super.onBeforeRender(pRenderable):undefined;}onAfterRender(pRenderable,pAddress,pRecord,pContent){this.pict.CSSMap.injectCSS();return super.onAfterRender?super.onAfterRender(pRenderable,pAddress,pRecord,pContent):undefined;}_subscribeToBrand(){if(this._unsubscribeFromBrand)return;let tmpSelf=this;this._unsubscribeFromBrand=libThemeBrand.onChange(function(){tmpSelf.render();});}_refreshAppData(){let tmpBrand=libThemeBrand.getActive();this.pict.AppData.PictSectionTheme=this.pict.AppData.PictSectionTheme||{};// No brand → empty BodySlot → renderable emits nothing.
if(!tmpBrand){this.pict.AppData.PictSectionTheme.BrandStrip={BodySlot:[]};return;}let tmpShowName=this.options.ShowName!==false;// Pick the right per-icon-type slot. Only one of these will be
// non-empty so the template renders the right element.
let tmpIconSVGSlot=[];let tmpIconImgSlot=[];if(tmpBrand.IconType==='svg'&&tmpBrand.Icon){tmpIconSVGSlot=[{IconHTML:tmpBrand.Icon}];}else if(tmpBrand.IconType==='image'&&tmpBrand.Icon){tmpIconImgSlot=[{IconURL:tmpBrand.Icon}];}let tmpNameRowSlot=tmpShowName?[{Name:tmpBrand.Name,IconSVGSlot:tmpIconSVGSlot,IconImgSlot:tmpIconImgSlot}]:[];let tmpTooltip=tmpBrand.Name+(tmpBrand.Tagline?' — '+tmpBrand.Tagline:'');this.pict.AppData.PictSectionTheme.BrandStrip={BodySlot:[{Tooltip:tmpTooltip,NameRowSlot:tmpNameRowSlot,PrimaryHeight:this.options.PrimaryStripeHeight||3,SecondaryHeight:this.options.SecondaryStripeHeight||1}]};}}PictViewThemeBrandStrip.default_configuration=_ViewConfiguration;module.exports=PictViewThemeBrandStrip;},{"../Theme-Brand.js":29,"pict-view":89}],81:[function(require,module,exports){/**
 * Theme-Button — an embeddable SVG button (sun/moon glyph) suitable for
 * application top bars. Clicking it opens a pict-section-modal popup
 * containing the Theme-Picker dropdown and the Theme-ModeToggle.
 *
 * Drop-in destination: `<div id="Theme-Button"></div>`. The button itself
 * is a tiny self-contained SVG that picks its color from the theme via
 * `currentColor` so it inherits the surrounding text color.
 *
 * Requires `pict-section-modal` to be registered (under the view hash
 * `Pict-Section-Modal` by default). If it isn't, clicking the button
 * falls back to a `console.warn` and a no-op.
 */const libPictView=require('pict-view');const libThemeIcons=require('../Theme-Icons.js');const _ViewConfiguration={ViewIdentifier:'Theme-Button',AutoInitialize:true,AutoRender:false,DefaultDestinationAddress:'#Theme-Button',DefaultRenderable:'Theme-Button-Renderable',ProviderHash:'Theme',ModalViewHash:'Pict-Section-Modal',// Identifiers of the picker / toggle / scale views that the popup
// will mount. Each one is optional — if a view isn't registered the
// matching row is silently skipped (no broken DOM placeholders).
PickerViewHash:'Theme-Picker',ModeToggleViewHash:'Theme-ModeToggle',ScaleSelectViewHash:'Theme-ScaleSelect',// Visible button label / title (tooltip).
Title:'Theme',AriaLabel:'Open theme menu',// Modal title.
ModalTitle:'Theme',// Modal width (CSS).
ModalWidth:'320px',Templates:[{Hash:'Theme-Button-Template',// SVG sourced from the shared Theme-Icons module so the
// topbar glyph matches the picker + mode toggle exactly.
Template:/*html*/`
<button type="button"
        class="pict-theme-button"
        aria-label="{~D:AppData.PictSectionTheme.Button.AriaLabel~}"
        title="{~D:AppData.PictSectionTheme.Button.Title~}"
        onclick="_Pict.views['Theme-Button'].openMenu();">
	${libThemeIcons.iconSun(16)}
</button>`},{Hash:'Theme-Button-Modal-Template',Template:/*html*/`
<div class="pict-theme-button-menu">
	<div class="pict-theme-button-menu-row">
		<label class="pict-theme-button-menu-label">Theme</label>
		<div id="Theme-Picker"></div>
	</div>
	<div class="pict-theme-button-menu-row">
		<label class="pict-theme-button-menu-label">Mode</label>
		<div id="Theme-ModeToggle"></div>
	</div>
	<div class="pict-theme-button-menu-row">
		<label class="pict-theme-button-menu-label">Scale</label>
		<div id="Theme-ScaleSelect"></div>
	</div>
</div>`}],Renderables:[{RenderableHash:'Theme-Button-Renderable',TemplateHash:'Theme-Button-Template',ContentDestinationAddress:'#Theme-Button',RenderMethod:'replace'}],CSS:/*css*/`
.pict-theme-button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	/* Sized to match a typical 12px-font / 6px-12px-padding text button
	   (~28px tall) so this drops cleanly into a topbar row alongside
	   action buttons without standing taller and crashing the row's
	   visual rhythm. Squareish — width matches height for the icon. */
	width: 28px;
	height: 28px;
	padding: 0;
	border-radius: 6px;
	border: 1px solid var(--theme-color-border-default, #cfd5dd);
	background: var(--theme-color-background-secondary, #fbfbfc);
	color: var(--theme-color-text-secondary, #4a5568);
	cursor: pointer;
	transition: background-color 120ms ease, color 120ms ease, border-color 120ms ease;
}
.pict-theme-button:hover {
	background: var(--theme-color-background-hover, #f0f0f0);
	color: var(--theme-color-brand-primary, #2563eb);
	border-color: var(--theme-color-brand-primary, #2563eb);
}
.pict-theme-button-icon { width: 16px; height: 16px; }
.pict-theme-button-menu { display: flex; flex-direction: column; gap: 14px; }
.pict-theme-button-menu-row { display: flex; flex-direction: column; gap: 6px; }
.pict-theme-button-menu-label {
	font-size: 11px;
	font-weight: 600;
	letter-spacing: 0.4px;
	text-transform: uppercase;
	color: var(--theme-color-text-muted, #6b6b6b);
}`,CSSPriority:500};class PictViewThemeButton extends libPictView{onBeforeRender(pRenderable){this._refreshAppData();return super.onBeforeRender?super.onBeforeRender(pRenderable):undefined;}onAfterRender(pRenderable,pAddress,pRecord,pContent){this.pict.CSSMap.injectCSS();return super.onAfterRender?super.onAfterRender(pRenderable,pAddress,pRecord,pContent):undefined;}/**
	 * onclick handler — open the theme menu in a modal.
	 */openMenu(){let tmpModal=this._modal();if(!tmpModal){if(typeof console!=='undefined'){console.warn('Theme-Button: pict-section-modal view not found at "'+(this.options.ModalViewHash||'Pict-Section-Modal')+'" — cannot open theme menu.');}return null;}let tmpHTML=this.pict.parseTemplateByHash('Theme-Button-Modal-Template',{});let tmpSelf=this;return tmpModal.show({title:this.options.ModalTitle||'Theme',content:tmpHTML,width:this.options.ModalWidth||'320px',closeable:true,buttons:[],onOpen:function(){// Mount the picker + toggle into the freshly-created
// modal DOM. The views look up their own destinations
// so a simple render() is enough.
tmpSelf._mountSubViews();}});}// ================================================================
// Internals
// ================================================================
_modal(){let tmpHash=this.options.ModalViewHash||'Pict-Section-Modal';return this.pict&&this.pict.views&&this.pict.views[tmpHash];}_mountSubViews(){let tmpPicker=this.pict.views[this.options.PickerViewHash||'Theme-Picker'];if(tmpPicker){tmpPicker.render();}let tmpToggle=this.pict.views[this.options.ModeToggleViewHash||'Theme-ModeToggle'];if(tmpToggle){tmpToggle.render();}let tmpScale=this.pict.views[this.options.ScaleSelectViewHash||'Theme-ScaleSelect'];if(tmpScale){tmpScale.render();}}_refreshAppData(){this.pict.AppData.PictSectionTheme=this.pict.AppData.PictSectionTheme||{};this.pict.AppData.PictSectionTheme.Button={Title:this.options.Title||'Theme',AriaLabel:this.options.AriaLabel||'Open theme menu'};}}PictViewThemeButton.default_configuration=_ViewConfiguration;module.exports=PictViewThemeButton;},{"../Theme-Icons.js":30,"pict-view":89}],82:[function(require,module,exports){/**
 * Theme-ModeToggle — three-segment toggle for Light / Dark / System mode.
 *
 * Calls `provider.setMode(...)` on click. Greys itself out (and the
 * Dark / System buttons) when the active theme is single-mode (since
 * single-mode themes ignore mode requests internally).
 *
 * Like the Picker, subscribes to `provider.onApply` so the active button
 * highlight stays in sync with theme changes from elsewhere.
 *
 * Drop-in destination: `<div id="Theme-ModeToggle"></div>`.
 */const libPictView=require('pict-view');const libThemeIcons=require('../Theme-Icons.js');const _ViewConfiguration={ViewIdentifier:'Theme-ModeToggle',AutoInitialize:true,AutoRender:false,DefaultDestinationAddress:'#Theme-ModeToggle',DefaultRenderable:'Theme-ModeToggle-Renderable',ProviderHash:'Theme',// Allow hosts to relabel buttons (i18n). Order is fixed.
Labels:{Light:'Light',Dark:'Dark',System:'System'},// Show the inline sun / moon / monitor SVG icons next to the labels.
ShowIcons:true,Templates:[{Hash:'Theme-ModeToggle-Template',Template:/*html*/`
<div class="pict-theme-modetoggle-wrap">
	<div class="pict-theme-modetoggle{~NE:AppData.PictSectionTheme.ModeToggle.Disabled^ pict-theme-modetoggle-disabled~}"
	     role="group" aria-label="Color mode"
	     title="{~D:AppData.PictSectionTheme.ModeToggle.WrapTitle~}">
		{~TS:Theme-ModeToggle-Button-Template:AppData.PictSectionTheme.ModeToggle.Buttons~}
	</div>
	{~TS:Theme-ModeToggle-LockedNote-Template:AppData.PictSectionTheme.ModeToggle.LockedNoteSlot~}
</div>`},{Hash:'Theme-ModeToggle-Button-Template',Template:/*html*/`
<button type="button"
        class="pict-theme-modetoggle-btn{~NE:Record.Active^ pict-theme-modetoggle-btn-active~}{~NE:Record.LockedOut^ pict-theme-modetoggle-btn-lockedout~}"
        title="{~D:Record.Title~}"
        aria-pressed="{~D:Record.Active~}"
        aria-disabled="{~D:Record.LockedOut~}"
        onclick="_Pict.views['Theme-ModeToggle'].pickMode('{~D:Record.Mode~}');">
	{~TS:Theme-ModeToggle-Icon-Light:Record.IconLight~}{~TS:Theme-ModeToggle-Icon-Dark:Record.IconDark~}{~TS:Theme-ModeToggle-Icon-System:Record.IconSystem~}<span class="pict-theme-modetoggle-label">{~D:Record.Label~}</span>
</button>`},{Hash:'Theme-ModeToggle-LockedNote-Template',Template:/*html*/`
<div class="pict-theme-modetoggle-locked-note" role="note">
	<svg class="pict-theme-modetoggle-locked-icon" viewBox="0 0 24 24" fill="none"
	     stroke="currentColor" stroke-width="2" stroke-linecap="round"
	     stroke-linejoin="round" aria-hidden="true">
		<rect x="4" y="11" width="16" height="9" rx="2"/>
		<path d="M8 11V7a4 4 0 0 1 8 0v4"/>
	</svg>
	<span>{~D:Record.Message~}</span>
</div>`},// Icon templates pull SVG markup from the shared Theme-Icons
// module so the picker, toggle, and topbar button stay visually
// consistent — change the glyph in one place, every consumer
// updates.
{Hash:'Theme-ModeToggle-Icon-Light',Template:libThemeIcons.iconSun()},{Hash:'Theme-ModeToggle-Icon-Dark',Template:libThemeIcons.iconMoon()},{Hash:'Theme-ModeToggle-Icon-System',Template:libThemeIcons.iconSystem()}],Renderables:[{RenderableHash:'Theme-ModeToggle-Renderable',TemplateHash:'Theme-ModeToggle-Template',ContentDestinationAddress:'#Theme-ModeToggle',RenderMethod:'replace'}],CSS:/*css*/`
.pict-theme-modetoggle-wrap { display: inline-flex; flex-direction: column; gap: 6px; }
.pict-theme-modetoggle {
	display: inline-flex;
	border: 1px solid var(--theme-color-border-default, #cfd5dd);
	border-radius: 6px;
	overflow: hidden;
	background: var(--theme-color-background-secondary, #fbfbfc);
	font-size: 12px;
}
.pict-theme-modetoggle-btn {
	display: inline-flex;
	align-items: center;
	gap: 4px;
	padding: 4px 10px;
	border: 0;
	background: transparent;
	color: var(--theme-color-text-secondary, #4a5568);
	cursor: pointer;
	border-right: 1px solid var(--theme-color-border-default, #cfd5dd);
	transition: background-color 120ms ease, color 120ms ease;
}
.pict-theme-modetoggle-btn:last-child { border-right: 0; }
.pict-theme-modetoggle-btn:hover {
	background: var(--theme-color-background-hover, #f0f0f0);
	color: var(--theme-color-text-primary, #1f2933);
}
.pict-theme-modetoggle-btn-active {
	background: var(--theme-color-brand-primary, #2563eb);
	color: var(--theme-color-text-on-brand, #ffffff);
}
.pict-theme-modetoggle-btn-active:hover {
	background: var(--theme-color-brand-primary-hover, #1e54cc);
	color: var(--theme-color-text-on-brand, #ffffff);
}
/* When the active theme is single-mode the entire group becomes
   non-interactive. The locked-out buttons (the ones the theme cannot
   switch to) get a strikethrough so the cause is unmistakable; the
   active button stays styled normally so users can still see which
   mode the theme IS using. */
.pict-theme-modetoggle-disabled .pict-theme-modetoggle-btn {
	pointer-events: none;
	cursor: not-allowed;
}
.pict-theme-modetoggle-disabled .pict-theme-modetoggle-btn-lockedout {
	opacity: 0.45;
	text-decoration: line-through;
	text-decoration-thickness: 1.5px;
}
/* Icons come from Theme-Icons.js with explicit width/height baked into
   the <svg>. We only need to nudge their vertical alignment with the
   button label. */
.pict-theme-modetoggle .pict-theme-icon {
	display: inline-block; vertical-align: -2px;
}
.pict-theme-modetoggle-label { line-height: 1; }
.pict-theme-modetoggle-locked-note {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	font-size: 11px;
	line-height: 1.3;
	color: var(--theme-color-text-muted, #6b6b6b);
	padding: 0 2px;
}
.pict-theme-modetoggle-locked-icon {
	width: 12px; height: 12px;
	flex: 0 0 12px;
	color: var(--theme-color-text-muted, #6b6b6b);
}`,CSSPriority:500};// The icon SVGs themselves live as templates above (Theme-ModeToggle-Icon-*).
// Per CLAUDE.md "AppData stores data, not HTML" — we drive icon selection
// with one-or-zero element arrays (`Record.IconLight = [{}]` to render the
// Light icon, `[]` to skip it). Each template is keyed off `Record.Mode`.
class PictViewThemeModeToggle extends libPictView{constructor(pFable,pOptions,pServiceHash){super(pFable,pOptions,pServiceHash);this._unsubscribeFromProvider=null;}onAfterInitialize(){this._subscribeToProvider();return super.onAfterInitialize?super.onAfterInitialize():undefined;}onBeforeRender(pRenderable){this._refreshAppData();return super.onBeforeRender?super.onBeforeRender(pRenderable):undefined;}onAfterRender(pRenderable,pAddress,pRecord,pContent){this.pict.CSSMap.injectCSS();return super.onAfterRender?super.onAfterRender(pRenderable,pAddress,pRecord,pContent):undefined;}/**
	 * onclick handler — flip mode on the active theme. Single-mode themes
	 * silently ignore (the toggle is shown disabled in that case anyway).
	 */pickMode(pMode){let tmpProvider=this._provider();if(!tmpProvider)return false;let tmpOk=tmpProvider.setMode(pMode);if(tmpOk&&typeof this.options.OnModeChange==='function'){try{this.options.OnModeChange(pMode);}catch(pErr){/* host hook failure */}}// setMode fires onApply listeners which trigger our own re-render.
// If single-mode rejected the change, force a re-render so the UI
// state is still consistent.
if(!tmpOk){this.render();}return tmpOk;}// ================================================================
// Internals
// ================================================================
_subscribeToProvider(){if(this._unsubscribeFromProvider)return;let tmpProvider=this._provider();if(!tmpProvider||typeof tmpProvider.onApply!=='function')return;let tmpSelf=this;this._unsubscribeFromProvider=tmpProvider.onApply(function(){tmpSelf.render();});}_provider(){let tmpHash=this.options.ProviderHash||'Theme';return this.pict&&this.pict.providers&&this.pict.providers[tmpHash];}_refreshAppData(){let tmpProvider=this._provider();let tmpActive=tmpProvider?tmpProvider.getActiveTheme():null;let tmpActiveMode=tmpActive&&tmpActive.Mode||'light';// Detect single-mode (Strategy === 'single') so we can lock the
// toggle and surface the reason the buttons aren't responding.
let tmpDisabled=false;let tmpLockedToMode=null;let tmpThemeName=null;if(tmpActive&&tmpActive.Hash&&tmpProvider&&typeof tmpProvider.getTheme==='function'){let tmpBundle=tmpProvider.getTheme(tmpActive.Hash);let tmpStrategy=tmpBundle&&tmpBundle.Modes&&tmpBundle.Modes.Strategy||'single';tmpDisabled=tmpStrategy==='single';if(tmpDisabled){tmpLockedToMode=tmpBundle.Modes&&tmpBundle.Modes.Default||tmpActiveMode||'light';tmpThemeName=tmpBundle.Name||tmpBundle.Hash||'this theme';}}let tmpLabels=this.options.Labels||_ViewConfiguration.Labels;let tmpShowIcons=this.options.ShowIcons!==false;// Use one-or-zero element arrays to drive each icon template so
// the icon SVG never gets stuffed into AppData as a raw string.
let tmpModeRows=[{Mode:'light',Label:tmpLabels.Light||'Light'},{Mode:'dark',Label:tmpLabels.Dark||'Dark'},{Mode:'system',Label:tmpLabels.System||'System'}];let tmpButtons=[];for(let i=0;i<tmpModeRows.length;i++){let tmpRow=tmpModeRows[i];let tmpIsActive=tmpActiveMode===tmpRow.Mode;// "Locked out" = single-mode theme AND this button is not the
// mode the theme is fixed to. The active button keeps normal
// styling so users can still see which mode is in use.
let tmpLockedOut=tmpDisabled&&tmpRow.Mode!==tmpLockedToMode;let tmpTitle;if(tmpLockedOut){let tmpLockedLabel=tmpLockedToMode.charAt(0).toUpperCase()+tmpLockedToMode.slice(1);tmpTitle=tmpThemeName+' is fixed to '+tmpLockedLabel+' mode — pick a different theme to switch.';}else{tmpTitle=tmpRow.Label+' mode';}tmpButtons.push({Mode:tmpRow.Mode,Label:tmpRow.Label,Title:tmpTitle,Active:tmpIsActive,LockedOut:tmpLockedOut,IconLight:tmpShowIcons&&tmpRow.Mode==='light'?[{}]:[],IconDark:tmpShowIcons&&tmpRow.Mode==='dark'?[{}]:[],IconSystem:tmpShowIcons&&tmpRow.Mode==='system'?[{}]:[]});}// One-or-zero element array drives the locked-note template
// (per CLAUDE.md "single-element-array trick"). Empty array →
// note skipped entirely.
let tmpLockedNoteSlot=[];let tmpWrapTitle='';if(tmpDisabled){let tmpLockedLabel=tmpLockedToMode.charAt(0).toUpperCase()+tmpLockedToMode.slice(1);let tmpMessage=tmpThemeName+' is fixed to '+tmpLockedLabel+' mode';tmpLockedNoteSlot=[{Message:tmpMessage}];tmpWrapTitle=tmpMessage+' — pick a different theme to switch modes.';}this.pict.AppData.PictSectionTheme=this.pict.AppData.PictSectionTheme||{};this.pict.AppData.PictSectionTheme.ModeToggle={ActiveMode:tmpActiveMode,Disabled:tmpDisabled,LockedToMode:tmpLockedToMode,ThemeName:tmpThemeName,Buttons:tmpButtons,LockedNoteSlot:tmpLockedNoteSlot,WrapTitle:tmpWrapTitle};}}PictViewThemeModeToggle.default_configuration=_ViewConfiguration;module.exports=PictViewThemeModeToggle;},{"../Theme-Icons.js":30,"pict-view":89}],83:[function(require,module,exports){/**
 * Theme-Picker — a custom dropdown that lists every theme registered
 * with the Theme provider, grouped by category.
 *
 * Renders as a trigger button showing the active theme name + a chevron.
 * Click → opens a `pict-section-modal` dropdown menu where each row is
 * the theme name plus an inline SVG glyph indicating the modes the
 * theme supports (sun for light-only, moon for dark-only, sun+moon for
 * paired). This is why we ditched the native <select>: option elements
 * can't render SVG, only plain text, and the unicode crescent
 * substitutes that earlier looked like dental glyphs.
 *
 * Subscribes to `provider.onApply` so a theme switch from elsewhere
 * (the modal-tucked picker, a hotkey, persistence restore) keeps the
 * trigger button in sync.
 *
 * Drop-in destination: `<div id="Theme-Picker"></div>`.
 *
 * # Modal section dependency
 *
 * Requires pict-section-modal to be registered (the dropdown popover
 * is a modal-section feature, not a hand-rolled DOM widget). When
 * pict-section-theme.install() is used, the host always has the modal
 * section available because Theme-Button needs it too. If you add this
 * view manually without the modal section, the trigger button will
 * still render but clicking it logs a warning and no-ops.
 */const libPictView=require('pict-view');const libThemeIcons=require('../Theme-Icons.js');// AppData address used to surface picker state to templates.
const APPDATA_ADDRESS='PictSectionTheme.Picker';const _ViewConfiguration={ViewIdentifier:'Theme-Picker',AutoInitialize:true,AutoRender:false,DefaultDestinationAddress:'#Theme-Picker',DefaultRenderable:'Theme-Picker-Renderable',ProviderHash:'Theme',ModalViewHash:'Pict-Section-Modal',// Optional categories block — array describing the optgroup order.
// If omitted we discover categories from the provider's themes in
// first-seen order.
Categories:null,// Show the per-row mode-capability glyph (sun / moon / sun+moon) as
// the leading icon on each dropdown item. Default on. Pass false if
// you want a plainer menu.
ShowModeIcons:true,Templates:[{Hash:'Theme-Picker-Template',// Trigger button that mirrors a native <select>'s look but
// can carry SVG content. Clicking opens the modal dropdown.
Template:/*html*/`
<button type="button" class="pict-theme-picker"
        title="{~D:AppData.PictSectionTheme.Picker.TriggerTooltip~}"
        onclick="_Pict.views['Theme-Picker'].openMenu(this);">
	{~TS:Theme-Picker-Trigger-Glyph:AppData.PictSectionTheme.Picker.TriggerGlyphSlot~}
	<span class="pict-theme-picker-name">{~D:AppData.PictSectionTheme.Picker.ActiveLabel~}</span>
	<span class="pict-theme-picker-chevron">{~D:AppData.PictSectionTheme.Picker.ChevronHTML~}</span>
</button>`},{// Wrapped in a 1-or-0 element array so the trigger glyph is
// optional (ShowModeIcons: false → empty slot, no leading
// icon). Per CLAUDE.md "AppData stores data, not HTML".
Hash:'Theme-Picker-Trigger-Glyph',Template:/*html*/`<span class="pict-theme-picker-trigger-glyph">{~D:Record.IconHTML~}</span>`}],Renderables:[{RenderableHash:'Theme-Picker-Renderable',TemplateHash:'Theme-Picker-Template',ContentDestinationAddress:'#Theme-Picker',RenderMethod:'replace'}],CSS:/*css*/`
.pict-theme-picker {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	min-width: 200px;
	max-width: 100%;
	padding: 6px 10px;
	border-radius: 6px;
	font: inherit;
	font-size: 13px;
	background: var(--theme-color-background-secondary, #fbfbfc);
	color: var(--theme-color-text-primary, #1f2933);
	border: 1px solid var(--theme-color-border-default, #cfd5dd);
	cursor: pointer;
	text-align: left;
	transition: border-color 120ms ease, box-shadow 120ms ease;
}
.pict-theme-picker:hover { border-color: var(--theme-color-text-muted, #6b6b6b); }
.pict-theme-picker:focus, .pict-theme-picker:focus-visible {
	outline: none;
	border-color: var(--theme-color-brand-primary, #2563eb);
	box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}
.pict-theme-picker .pict-theme-picker-name {
	flex: 1;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.pict-theme-picker .pict-theme-picker-chevron {
	color: var(--theme-color-text-muted, #6b6b6b);
	display: inline-flex;
	align-items: center;
}
.pict-theme-picker-trigger-glyph {
	display: inline-flex; align-items: center;
	color: var(--theme-color-text-muted, #6b6b6b);
}

/* Skin the modal-dropdown items with cleaner spacing for our glyphs. */
.pict-theme-picker-menu .pict-modal-dropdown-item-icon {
	width: 28px;
	display: inline-flex;
	align-items: center;
	justify-content: flex-start;
	color: var(--theme-color-text-muted, #6b6b6b);
}
.pict-theme-picker-menu .pict-modal-dropdown-item--active {
	background: var(--theme-color-background-selected, #e0eaff);
	color: var(--theme-color-brand-primary, #2563eb);
}
.pict-theme-picker-menu .pict-modal-dropdown-item--active .pict-modal-dropdown-item-icon {
	color: var(--theme-color-brand-primary, #2563eb);
}`,CSSPriority:500};class PictViewThemePicker extends libPictView{constructor(pFable,pOptions,pServiceHash){super(pFable,pOptions,pServiceHash);this._unsubscribeFromProvider=null;}onAfterInitialize(){this._subscribeToProvider();return super.onAfterInitialize?super.onAfterInitialize():undefined;}onBeforeRender(pRenderable){// Defensive resubscribe: onAfterInitialize attempts this once, but if the
// Theme provider wasn't yet registered at that moment (a real race when
// docuserve wires the Theme-Section after some views have already been
// instantiated), the initial subscribe silently no-ops and the picker
// never re-renders on applyTheme.  The internal guard makes this cheap
// when we're already subscribed.
this._subscribeToProvider();this._refreshAppData();return super.onBeforeRender?super.onBeforeRender(pRenderable):undefined;}onAfterRender(pRenderable,pAddress,pRecord,pContent){this.pict.CSSMap.injectCSS();return super.onAfterRender?super.onAfterRender(pRenderable,pAddress,pRecord,pContent):undefined;}/**
	 * onclick handler — open the rich dropdown menu via pict-section-modal.
	 * @param {HTMLElement} pAnchor - the trigger button (click target)
	 */openMenu(pAnchor){let tmpModal=this._modal();if(!tmpModal){if(typeof console!=='undefined'&&console.warn){console.warn('Theme-Picker: pict-section-modal not registered — cannot open menu.');}return null;}let tmpItems=this._buildMenuItems();let tmpSelf=this;return tmpModal.dropdown(pAnchor,{items:tmpItems,align:'left',minWidth:'260px',maxHeight:'60vh',className:'pict-theme-picker-menu',closeOnSelect:true,onSelect:function(pHash){tmpSelf.pick(pHash);}});}/**
	 * Apply the picked theme. Public so external callers can drive the
	 * picker programmatically too (hotkeys, tests, etc.).
	 */pick(pHash){let tmpProvider=this._provider();if(!tmpProvider)return false;// Preserve the current user-facing mode if the new theme
// supports modes. Single-mode themes will clamp internally.
let tmpActive=tmpProvider.getActiveTheme();let tmpMode=tmpActive?tmpActive.Mode:null;let tmpOk=tmpProvider.applyTheme(pHash,tmpMode);if(tmpOk&&typeof this.options.OnPick==='function'){try{this.options.OnPick(pHash);}catch(pErr){/* host hook failure */}}return tmpOk;}// ================================================================
// Internals
// ================================================================
_subscribeToProvider(){if(this._unsubscribeFromProvider)return;let tmpProvider=this._provider();if(!tmpProvider||typeof tmpProvider.onApply!=='function')return;let tmpSelf=this;this._unsubscribeFromProvider=tmpProvider.onApply(function(){tmpSelf.render();});}_provider(){let tmpHash=this.options.ProviderHash||'Theme';return this.pict&&this.pict.providers&&this.pict.providers[tmpHash];}_modal(){let tmpHash=this.options.ModalViewHash||'Pict-Section-Modal';return this.pict&&this.pict.views&&this.pict.views[tmpHash];}/**
	 * Build the modal-dropdown `items` array from the registered themes
	 * + the catalog's category metadata. One Header row per category,
	 * one item per theme with a leading SVG capability glyph.
	 */_buildMenuItems(){let tmpProvider=this._provider();let tmpThemes=tmpProvider?tmpProvider.listThemes():[];let tmpActive=tmpProvider?tmpProvider.getActiveTheme():{Hash:null};let tmpActiveHash=tmpActive&&tmpActive.Hash||null;let tmpCatalog=this._loadCatalog();let tmpCategoryByHash={};let tmpCategoryOrder=[];if(Array.isArray(this.options.Categories)){tmpCategoryOrder=this.options.Categories.slice();}for(let i=0;i<tmpCatalog.length;i++){let tmpEntry=tmpCatalog[i];let tmpCat=tmpEntry.Category||'Other';tmpCategoryByHash[tmpEntry.Hash]=tmpCat;if(tmpCategoryOrder.indexOf(tmpCat)<0)tmpCategoryOrder.push(tmpCat);}let tmpBuckets={};for(let i=0;i<tmpThemes.length;i++){let tmpTheme=tmpThemes[i];let tmpCat=tmpCategoryByHash[tmpTheme.Hash]||'Other';if(!tmpBuckets[tmpCat]){tmpBuckets[tmpCat]=[];if(tmpCategoryOrder.indexOf(tmpCat)<0)tmpCategoryOrder.push(tmpCat);}tmpBuckets[tmpCat].push(tmpTheme);}let tmpShowIcons=this.options.ShowModeIcons!==false;let tmpItems=[];for(let i=0;i<tmpCategoryOrder.length;i++){let tmpCat=tmpCategoryOrder[i];if(!tmpBuckets[tmpCat]||tmpBuckets[tmpCat].length===0)continue;tmpItems.push({Header:tmpCat});for(let j=0;j<tmpBuckets[tmpCat].length;j++){let tmpTheme=tmpBuckets[tmpCat][j];let tmpIcon=tmpShowIcons?libThemeIcons.iconForTheme(tmpTheme.Strategy,tmpTheme.DefaultMode,14):'';tmpItems.push({Hash:tmpTheme.Hash,Label:tmpTheme.Name||tmpTheme.Hash,Icon:tmpIcon,Style:tmpTheme.Hash===tmpActiveHash?'active':null,Tooltip:this._capabilityLabel(tmpTheme)});}}return tmpItems;}_capabilityLabel(pTheme){let tmpStrategy=pTheme.Strategy||'single';if(tmpStrategy==='single'){let tmpMode=pTheme.DefaultMode||'light';return(pTheme.Name||pTheme.Hash)+' — '+(tmpMode==='dark'?'dark only':'light only');}return(pTheme.Name||pTheme.Hash)+' — light + dark';}_refreshAppData(){let tmpProvider=this._provider();let tmpThemes=tmpProvider?tmpProvider.listThemes():[];let tmpActive=tmpProvider?tmpProvider.getActiveTheme():{Hash:null};let tmpActiveHash=tmpActive&&tmpActive.Hash||null;// Find the active theme's metadata for the trigger glyph.
let tmpActiveTheme=null;for(let i=0;i<tmpThemes.length;i++){if(tmpThemes[i].Hash===tmpActiveHash){tmpActiveTheme=tmpThemes[i];break;}}let tmpShowIcons=this.options.ShowModeIcons!==false;let tmpTriggerGlyphSlot=[];if(tmpShowIcons&&tmpActiveTheme){tmpTriggerGlyphSlot=[{IconHTML:libThemeIcons.iconForTheme(tmpActiveTheme.Strategy,tmpActiveTheme.DefaultMode,14)}];}this.pict.AppData.PictSectionTheme=this.pict.AppData.PictSectionTheme||{};this.pict.AppData.PictSectionTheme.Picker={ActiveHash:tmpActiveHash,ActiveLabel:tmpActiveTheme?tmpActiveTheme.Name||tmpActiveTheme.Hash:'Choose a theme',TriggerTooltip:tmpActiveTheme?this._capabilityLabel(tmpActiveTheme)+' — click to change':'Choose a theme',TriggerGlyphSlot:tmpTriggerGlyphSlot,ChevronHTML:libThemeIcons.iconChevronDown(10)};this.pict.AppData.PictSectionTheme.AllThemes=tmpThemes;}_loadCatalog(){try{return require('../themes/_catalog.js');}catch(pError){return[];}}}PictViewThemePicker.default_configuration=_ViewConfiguration;PictViewThemePicker.APPDATA_ADDRESS=APPDATA_ADDRESS;module.exports=PictViewThemePicker;},{"../Theme-Icons.js":30,"../themes/_catalog.js":36,"pict-view":89}],84:[function(require,module,exports){/**
 * Theme-ScaleSelect — dropdown that picks a viewport scale (zoom).
 *
 * Independent of the active theme bundle: scale is a per-user
 * preference stored alongside ThemeHash + Mode in localStorage. Reads
 * presets from the Theme-Scale helper (or a host-supplied `Presets`
 * array). Subscribes to Theme-Scale.onChange so external scale changes
 * (the persisted boot apply, hotkeys, other code) keep the dropdown's
 * selected option in sync.
 *
 * Drop-in destination: `<div id="Theme-ScaleSelect"></div>`.
 */const libPictView=require('pict-view');const libThemeScale=require('../Theme-Scale.js');const _ViewConfiguration={ViewIdentifier:'Theme-ScaleSelect',AutoInitialize:true,AutoRender:false,DefaultDestinationAddress:'#Theme-ScaleSelect',DefaultRenderable:'Theme-ScaleSelect-Renderable',// Optional override of the preset list. Each entry: { Value: <number>, Label: <string> }.
// When omitted we use libThemeScale.PRESETS.
Presets:null,Templates:[{Hash:'Theme-ScaleSelect-Template',Template:/*html*/`
<select class="pict-theme-scaleselect"
        title="{~D:AppData.PictSectionTheme.ScaleSelect.Tooltip~}"
        onchange="_Pict.views['Theme-ScaleSelect'].pickScale(parseFloat(this.value));">
	{~TS:Theme-ScaleSelect-Option-Template:AppData.PictSectionTheme.ScaleSelect.Options~}
</select>`},{Hash:'Theme-ScaleSelect-Option-Template',Template:/*html*/`
<option value="{~D:Record.Value~}"{~NE:Record.Selected^ selected~}>{~D:Record.Label~}</option>`}],Renderables:[{RenderableHash:'Theme-ScaleSelect-Renderable',TemplateHash:'Theme-ScaleSelect-Template',ContentDestinationAddress:'#Theme-ScaleSelect',RenderMethod:'replace'}],CSS:/*css*/`
.pict-theme-scaleselect {
	min-width: 180px;
	padding: 6px 10px;
	border-radius: 6px;
	font: inherit;
	font-size: 13px;
	background: var(--theme-color-background-secondary, #fbfbfc);
	color: var(--theme-color-text-primary, #1f2933);
	border: 1px solid var(--theme-color-border-default, #cfd5dd);
	cursor: pointer;
}
.pict-theme-scaleselect:focus {
	outline: none;
	border-color: var(--theme-color-brand-primary, #2563eb);
	box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}`,CSSPriority:500};class PictViewThemeScaleSelect extends libPictView{constructor(pFable,pOptions,pServiceHash){super(pFable,pOptions,pServiceHash);this._unsubscribeFromScale=null;}onAfterInitialize(){this._subscribeToScale();return super.onAfterInitialize?super.onAfterInitialize():undefined;}onBeforeRender(pRenderable){this._refreshAppData();return super.onBeforeRender?super.onBeforeRender(pRenderable):undefined;}onAfterRender(pRenderable,pAddress,pRecord,pContent){this.pict.CSSMap.injectCSS();return super.onAfterRender?super.onAfterRender(pRenderable,pAddress,pRecord,pContent):undefined;}/**
	 * onchange handler — apply a new scale and let the listener re-render.
	 * @param {number} pScale
	 */pickScale(pScale){let tmpApplied=libThemeScale.applyScale(pScale);if(typeof this.options.OnScaleChange==='function'){try{this.options.OnScaleChange(tmpApplied);}catch(pErr){/* host hook failure */}}return tmpApplied;}// ================================================================
// Internals
// ================================================================
_subscribeToScale(){if(this._unsubscribeFromScale)return;let tmpSelf=this;this._unsubscribeFromScale=libThemeScale.onChange(function(){tmpSelf.render();});}_refreshAppData(){let tmpPresets=Array.isArray(this.options.Presets)?this.options.Presets:libThemeScale.PRESETS;let tmpActive=libThemeScale.getActive();// "Closest" match — the saved scale may be a custom value (e.g.
// 1.10 from a hotkey nudge) that doesn't exactly equal any preset.
// We highlight the nearest option so the dropdown still reflects
// roughly where the user is.
let tmpClosestIdx=0;let tmpClosestDelta=Infinity;for(let i=0;i<tmpPresets.length;i++){let tmpDelta=Math.abs(tmpPresets[i].Value-tmpActive);if(tmpDelta<tmpClosestDelta){tmpClosestDelta=tmpDelta;tmpClosestIdx=i;}}let tmpOptions=[];for(let i=0;i<tmpPresets.length;i++){let tmpEntry=tmpPresets[i];tmpOptions.push({Value:tmpEntry.Value,Label:tmpEntry.Label,Selected:i===tmpClosestIdx});}let tmpTooltip='Viewport scale — currently '+Math.round(tmpActive*100)+'%';this.pict.AppData.PictSectionTheme=this.pict.AppData.PictSectionTheme||{};this.pict.AppData.PictSectionTheme.ScaleSelect={ActiveScale:tmpActive,Tooltip:tmpTooltip,Options:tmpOptions};}}PictViewThemeScaleSelect.default_configuration=_ViewConfiguration;module.exports=PictViewThemeScaleSelect;},{"../Theme-Scale.js":32,"pict-view":89}],85:[function(require,module,exports){/**
 * Theme-TopBar — standard application chrome row.
 *
 * Provides the boilerplate every Pict / retold app remakes: a flex row
 * with three zones — brand mark on the left, navigation in the middle,
 * configuration / user widgets on the right (with the theme button
 * pinned at the far edge).
 *
 *   ┌────────────────────────────────────────────────────────────────┐
 *   │ [Brand-Mark]   [── Nav slot (flex-grow) ──]   [User-slot] [⚙]  │
 *   └────────────────────────────────────────────────────────────────┘
 *
 * Auto-mounts:
 *   - Theme-Brand-Mark in the brand slot (skip via MountBrandMark: false)
 *   - Theme-Button at the far right of the user area (skip via
 *     MountThemeButton: false)
 *
 * Host fills two empty slots via standard Pict view destinations:
 *   - `#Theme-TopBar-Nav`  — primary navigation / action buttons
 *   - `#Theme-TopBar-User` — app-specific user-area widgets (account,
 *                            log toggle, custom indicators)
 *
 * Renders into `#Theme-TopBar` by default. The host's layout shell
 * provides that destination — typically the top panel of a
 * pict-section-modal Shell.
 *
 * The bottom border uses `--brand-color-primary-mode` so the topbar
 * carries a thin brand stripe that auto-swaps with light/dark mode.
 *
 * Each app's nav / user-area views can stay app-specific; this view
 * eliminates the chrome boilerplate around them.
 */const libPictView=require('pict-view');const _ViewConfiguration={ViewIdentifier:'Theme-TopBar',AutoInitialize:true,AutoRender:false,DefaultDestinationAddress:'#Theme-TopBar',DefaultRenderable:'Theme-TopBar-Renderable',// When false, the host is responsible for mounting Theme-Brand-Mark
// itself (or skipping the brand entirely).
MountBrandMark:true,// When false, Theme-Button is not auto-mounted into the user slot.
// Useful when the host wants to position the button somewhere else
// or when no theme picker is desired.
MountThemeButton:true,// ViewIdentifier of a host-supplied view that fills the nav slot
// (#Theme-TopBar-Nav). Typical convention: a small per-app view
// rendering primary action buttons / nav links / breadcrumbs.
NavView:null,// ViewIdentifier of a host-supplied view that fills the user-area
// slot (#Theme-TopBar-User). Theme-Button still auto-mounts at the
// far edge — this view fills the slot before it.
UserView:null,// Height of the bar in pixels. Drives the min-height on the
// chrome row so it fills the panel cleanly even when the parent
// chain (pict-section-modal shell uses min-height: 100% on its
// panel content destination, which doesn't resolve through plain
// height: 100% chains) doesn't establish a determinate height.
// Hosts should match this to whatever Size they use on the panel
// addPanel() call so the chrome and panel agree on the row size.
Height:56,// Horizontal alignment of items inside the nav slot. The slot
// itself stretches (flex: 1) between brand mark and user area;
// this option controls where the nav content sits within that
// stretched space. Default 'right' so action buttons hug the
// user-area / theme button cluster (the convention every
// retold-* app converged on). Override to 'left' to put the nav
// flush against the brand, or 'center' to centre it across the
// row. Maps to justify-content: flex-end / flex-start / center.
NavAlign:'right',// Viewport width (px) below which the topbar collapses to compact
// mode: nav + user-area widgets hide, a burger button shows in
// their place. Clicking the burger opens a pict-section-modal
// popup with a clone of the nav + user DOM, so every action stays
// reachable.
//
// Default 900px — the conventional "narrow desktop / small laptop"
// cut-off where a topbar with ~4 nav buttons + a brand mark + a
// user-area cluster genuinely starts crowding. Most users will
// resize a window to this range (drag a split-pane, dock a window
// next to another app, etc.); 600px would only trigger at true
// mobile widths most desktop users never hit.
//
// Conventional ladder for picking a value:
//   ~1024px  large breakpoint — nav-heavy apps with 6+ buttons
//    ~900px  default — "narrow desktop window" (recommended)
//    ~768px  tablet portrait — minimal-nav apps
//    ~600px  mobile-only — single-button toolbars
//        0   disable compact mode entirely
CompactBreakpoint:900,Templates:[{Hash:'Theme-TopBar-Template',// The burger button is hidden by default and the regular nav /
// user-slot are visible — flipped by the media query in CSS
// at the CompactBreakpoint (default 600px). On click the
// burger opens a pict-section-modal popup containing a clone
// of the existing #Theme-TopBar-Nav + #Theme-TopBar-User DOM
// — host apps don't need to provide a separate burger view.
Template:/*html*/`
<div class="pict-theme-topbar">
	<div class="pict-theme-topbar-mark"><div id="Theme-Brand-Mark"></div></div>
	<div class="pict-theme-topbar-nav" id="Theme-TopBar-Nav"></div>
	<div class="pict-theme-topbar-user">
		<div class="pict-theme-topbar-user-slot" id="Theme-TopBar-User"></div>
		<div class="pict-theme-topbar-user-button"><div id="Theme-Button"></div></div>
		<button type="button" class="pict-theme-topbar-burger"
			aria-label="More navigation"
			title="Menu"
			onclick="_Pict.views['Theme-TopBar'].openBurgerMenu();">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none"
				stroke="currentColor" stroke-width="2"
				stroke-linecap="round" stroke-linejoin="round"
				aria-hidden="true">
				<path d="M3 6h18M3 12h18M3 18h18"/>
			</svg>
		</button>
	</div>
</div>`}],Renderables:[{RenderableHash:'Theme-TopBar-Renderable',TemplateHash:'Theme-TopBar-Template',ContentDestinationAddress:'#Theme-TopBar',RenderMethod:'replace'}],CSS:/*css*/`
.pict-theme-topbar {
	display: flex;
	align-items: center;
	gap: 14px;
	/* The min-height is rewritten per-instance in onAfterRender from the
	   Height option (default 56). Avoids the percent-height resolution
	   trap: pict-section-modal's panel destination uses min-height: 100%
	   on its inner div, which means a child's height: 100% / min-height:
	   100% resolves against the parent's *property* (auto), not its
	   resolved size — and collapses the row to its content. A fixed px
	   value gives align-items: center real space to centre into. */
	min-height: 56px;
	padding: 0 14px;
	box-sizing: border-box;
	background: var(--theme-color-background-panel, transparent);
	/* Brand stripes are drawn by .pict-theme-topbar::after as an absolute
	   element overlaying the bottom 5px of the row. Using ::after rather
	   than border-bottom + box-shadow lets us put a transparent gap
	   between the two stripes (border / box-shadow can't draw gaps).
	   Position relative so the ::after positions to this row. */
	position: relative;
}
/* Two-stripe brand identifier at the bottom of the topbar:
     4px brand-primary (thicker — the dominant identifier)
     2px transparent gap (clearly readable separation)
     3px brand-secondary (thinner than primary but still substantial)
   Earlier iterations used 1–2px stripes; both read clearly at light
   mode but dark-mode secondary colors are often desaturated (lifted)
   so the eye can miss a thin band against a dark background. The
   current sizes push the secondary above the perception threshold
   regardless of palette. Stripes overlay the bottom 9px of the row;
   content (which centres in the full row via align-items: center)
   keeps its visual position. */
.pict-theme-topbar::after {
	content: '';
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	height: 9px;
	pointer-events: none;
	background: linear-gradient(
		to bottom,
		var(--brand-color-primary-mode, var(--theme-color-brand-primary, #2563eb)) 0,
		var(--brand-color-primary-mode, var(--theme-color-brand-primary, #2563eb)) 4px,
		transparent 4px,
		transparent 6px,
		var(--brand-color-secondary-mode, var(--theme-color-brand-secondary, transparent)) 6px,
		var(--brand-color-secondary-mode, var(--theme-color-brand-secondary, transparent)) 9px
	);
}
.pict-theme-topbar-mark {
	flex: 0 0 auto;
	display: flex;
	align-items: center;
}
.pict-theme-topbar-nav {
	flex: 1 1 auto;
	display: flex;
	align-items: center;
	/* Default to right-aligning nav items inside the stretched slot —
	   the convention retold-* apps converged on. Overridden per-instance
	   from the NavAlign option in onAfterRender. */
	justify-content: flex-end;
	gap: 8px;
	min-width: 0;
	/* Horizontally scrollable when the nav overflows (narrow viewports
	   with many buttons) — better than overflow:hidden which would
	   silently clip buttons offscreen. The vertical axis stays clipped
	   so a tall accidental child doesn't blow up the row height. A
	   proper overflow menu is a future enhancement; this gets us safe
	   degradation today. */
	overflow-x: auto;
	overflow-y: hidden;
	/* Hide the scrollbar by default; modern browsers pick up the
	   trackpad scroll without it. Apps wanting a visible scrollbar
	   can override at higher specificity. */
	scrollbar-width: none;
}
.pict-theme-topbar-nav::-webkit-scrollbar { display: none; }
/* Active-route indicator. The convention every host app should follow:
   put aria-current="page" on the button (or anchor) representing the
   current route. The W3C-standard attribute reads correctly to screen
   readers and gets a brand-tinted highlight here. Apps that already
   ship their own active styling can override these rules — they're
   keyed off attribute selectors so no class collision is possible. */
.pict-theme-topbar-nav [aria-current="page"],
.pict-theme-topbar-user [aria-current="page"] {
	color: var(--brand-color-primary-mode, var(--theme-color-brand-primary, #2563eb));
	border-color: var(--brand-color-primary-mode, var(--theme-color-brand-primary, #2563eb));
	background: var(--theme-color-background-hover, rgba(37, 99, 235, 0.08));
}
.pict-theme-topbar-user {
	flex: 0 0 auto;
	display: flex;
	align-items: center;
	gap: 8px;
}
.pict-theme-topbar-user-slot {
	display: flex;
	align-items: center;
	gap: 8px;
}
.pict-theme-topbar-user-button {
	display: flex;
	align-items: center;
}
/* Burger button — hidden by default; the media query (or the inline
   per-instance JS that swaps it via CompactBreakpoint) shows it once
   the viewport drops below the host's compact threshold. Sized to
   match Theme-Button (28×28) so the row's rhythm is preserved. */
.pict-theme-topbar-burger {
	display: none;
	align-items: center;
	justify-content: center;
	width: 28px;
	height: 28px;
	padding: 0;
	border-radius: 6px;
	border: 1px solid var(--theme-color-border-default, #cfd5dd);
	background: var(--theme-color-background-secondary, #fbfbfc);
	color: var(--theme-color-text-secondary, #4a5568);
	cursor: pointer;
	transition: background-color 120ms ease, color 120ms ease, border-color 120ms ease;
}
.pict-theme-topbar-burger:hover {
	background: var(--theme-color-background-hover, #f0f0f0);
	color: var(--brand-color-primary-mode, var(--theme-color-brand-primary, #2563eb));
	border-color: var(--brand-color-primary-mode, var(--theme-color-brand-primary, #2563eb));
}
/* Burger menu popup — applied to the cloned nav + user DOM inside
   pict-section-modal. The cloned children inherit their original
   styling (action buttons, badges, etc.) so the popup looks visually
   consistent with what was on the topbar. */
.pict-theme-burger-menu {
	display: flex;
	flex-direction: column;
	gap: 6px;
}
.pict-theme-burger-menu-section {
	display: flex;
	flex-direction: column;
	gap: 6px;
}
/* Cloned children render as a vertical stack inside the popup — flip
   the horizontal flex layouts to column so each button takes a full
   row instead of cramming side-by-side at narrow width. */
.pict-theme-burger-menu .rm-topbar-nav,
.pict-theme-burger-menu .rm-topbar-user,
.pict-theme-burger-menu [class*="-topbar-nav"],
.pict-theme-burger-menu [class*="-topbar-user"] {
	display: flex;
	flex-direction: column;
	align-items: stretch;
	gap: 6px;
}
.pict-theme-burger-menu button { width: 100%; text-align: left; }
.pict-theme-burger-menu .rm-topbar-nav-divider,
.pict-theme-burger-menu [class*="divider"] { display: none; }
/* Compact mode — defaults to a 900px breakpoint. The onAfterRender
   handler injects a per-instance <style> rule when the host passes a
   different CompactBreakpoint, so this @media block is the fallback
   for hosts that accept the default. */
@media (max-width: 900px) {
	.pict-theme-topbar-nav            { display: none !important; }
	.pict-theme-topbar-user-slot      { display: none !important; }
	.pict-theme-topbar-burger         { display: inline-flex; }
	/* In wide mode the flex-1 nav slot pushes the user-area to the
	   right edge. With the nav hidden the user-area would collapse
	   left of the now-empty middle; the auto-margin re-creates the
	   "push right" effect so the theme button + burger stay flush
	   against the right edge of the topbar. */
	.pict-theme-topbar-user           { margin-left: auto; }
}`,CSSPriority:500};class PictViewThemeTopBar extends libPictView{constructor(pFable,pOptions,pServiceHash){super(pFable,pOptions,pServiceHash);}onAfterRender(pRenderable,pAddress,pRecord,pContent){this.pict.CSSMap.injectCSS();// Apply the configured Height to the rendered .pict-theme-topbar.
// Using inline style so each instance can carry its own size
// (different apps will pick different heights) without us having
// to inject per-instance <style> blocks.
if(typeof document!=='undefined'&&this.options.Height){let tmpRoot=document.querySelector('.pict-theme-topbar');if(tmpRoot){tmpRoot.style.minHeight=this.options.Height+'px';}}// Per-instance CompactBreakpoint. CSS @media rules can't reference
// JS option values, so when the host overrides the default 600px
// we inject a single-rule <style> with the chosen breakpoint and
// !important to win over the static media query. Set to 0 to
// disable compact mode entirely (the burger stays hidden).
this._applyCompactBreakpoint();// Translate NavAlign ('left' | 'right' | 'center') to the matching
// justify-content. Right is the default (and already in the static
// CSS), but the inline style wins so an explicit option always
// takes precedence over the cached stylesheet.
if(typeof document!=='undefined'&&this.options.NavAlign){let tmpJustify={left:'flex-start',right:'flex-end',center:'center'}[this.options.NavAlign];if(tmpJustify){let tmpNav=document.querySelector('.pict-theme-topbar-nav');if(tmpNav){tmpNav.style.justifyContent=tmpJustify;}}}// Auto-mount the standard pieces. Host can opt out via the view
// options (MountBrandMark / MountThemeButton).
if(this.options.MountBrandMark!==false){let tmpBrandMark=this.pict.views['Theme-Brand-Mark'];if(tmpBrandMark){tmpBrandMark.render();}}if(this.options.NavView){let tmpNavView=this.pict.views[this.options.NavView];if(tmpNavView){tmpNavView.render();}else if(this.log&&this.log.warn){this.log.warn('Theme-TopBar: NavView "'+this.options.NavView+'" not registered');}}if(this.options.UserView){let tmpUserView=this.pict.views[this.options.UserView];if(tmpUserView){tmpUserView.render();}else if(this.log&&this.log.warn){this.log.warn('Theme-TopBar: UserView "'+this.options.UserView+'" not registered');}}if(this.options.MountThemeButton!==false){let tmpThemeButton=this.pict.views['Theme-Button'];if(tmpThemeButton){tmpThemeButton.render();}}return super.onAfterRender?super.onAfterRender(pRenderable,pAddress,pRecord,pContent):undefined;}// ─── Per-route slot swapping ──────────────────────────────────────────
// Apps with chrome that morphs between routes (e.g. breadcrumb-style
// navigation that differs by section) call setNavView / setUserView
// from their router callback. The new view is rendered into the
// matching slot and the option is persisted so subsequent re-renders
// of the topbar (theme switches, etc.) keep the new view mounted.
/**
	 * Swap the NavView (slot at `#Theme-TopBar-Nav`) at runtime.
	 * @param {string|null} pViewIdentifier
	 *   View hash to mount, or null to clear the slot.
	 */setNavView(pViewIdentifier){this.options.NavView=pViewIdentifier||null;this._mountSlot('#Theme-TopBar-Nav',this.options.NavView);}/**
	 * Swap the UserView (slot at `#Theme-TopBar-User`) at runtime.
	 * @param {string|null} pViewIdentifier
	 */setUserView(pViewIdentifier){this.options.UserView=pViewIdentifier||null;this._mountSlot('#Theme-TopBar-User',this.options.UserView);}_mountSlot(pDestSelector,pViewIdentifier){// Clear the slot first — handles both the clear-only case
// (pViewIdentifier is null) and the swap case (gives the
// new view a clean slate when its renderable doesn't use
// `replace` mode).
if(typeof document!=='undefined'){let tmpDest=document.querySelector(pDestSelector);if(tmpDest){tmpDest.innerHTML='';}}if(!pViewIdentifier){return;}let tmpView=this.pict.views[pViewIdentifier];if(tmpView){tmpView.render();}else if(this.log&&this.log.warn){this.log.warn('Theme-TopBar: view "'+pViewIdentifier+'" not registered');}}// ─── Compact mode + burger menu ──────────────────────────────────────
// At narrow widths the nav + user-area slots collapse into a single
// burger button that opens a pict-section-modal popup with the
// cloned nav + user DOM. The default breakpoint is 600px; hosts that
// want a different value pass CompactBreakpoint in ViewOptions.
_applyCompactBreakpoint(){if(typeof document==='undefined')return;// Default value of 900 lives in the static CSS @media block; we
// only need to inject when the host explicitly overrode it.
let tmpBreakpoint=this.options.CompactBreakpoint;if(tmpBreakpoint===undefined||tmpBreakpoint===null)return;if(tmpBreakpoint===900)return;// matches default — no override needed
let tmpStyleId='pict-theme-topbar-compact-'+this.UUID;let tmpStyleEl=document.getElementById(tmpStyleId);if(!tmpStyleEl){tmpStyleEl=document.createElement('style');tmpStyleEl.id=tmpStyleId;document.head.appendChild(tmpStyleEl);}// 0 (or any non-positive value) disables compact mode by emitting
// a never-matching media rule. The static CSS still has the 600px
// rule, so we override it with a more-specific selector + the
// chosen breakpoint. Specificity-wise the inline rule wins
// because it's emitted after the static CSS and has !important
// matching the static rule's importance.
if(typeof tmpBreakpoint!=='number'||tmpBreakpoint<=0){// Disable: force compact selectors to never apply by giving
// the burger display: none unconditionally at all widths.
tmpStyleEl.textContent='.pict-theme-topbar-nav            { display: flex !important; }\n'+'.pict-theme-topbar-user-slot      { display: flex !important; }\n'+'.pict-theme-topbar-burger         { display: none !important; }\n'+'.pict-theme-topbar-user           { margin-left: 0 !important; }\n';}else{tmpStyleEl.textContent='@media (max-width: '+tmpBreakpoint+'px) {\n'+'\t.pict-theme-topbar-nav            { display: none !important; }\n'+'\t.pict-theme-topbar-user-slot      { display: none !important; }\n'+'\t.pict-theme-topbar-burger         { display: inline-flex !important; }\n'+'\t.pict-theme-topbar-user           { margin-left: auto !important; }\n'+'}\n'+'@media (min-width: '+(tmpBreakpoint+1)+'px) {\n'+'\t.pict-theme-topbar-nav            { display: flex !important; }\n'+'\t.pict-theme-topbar-user-slot      { display: flex !important; }\n'+'\t.pict-theme-topbar-burger         { display: none !important; }\n'+'\t.pict-theme-topbar-user           { margin-left: 0 !important; }\n'+'}\n';}}/**
	 * Open the burger / overflow menu. Clones the current contents of
	 * `#Theme-TopBar-Nav` and `#Theme-TopBar-User` into a
	 * pict-section-modal popup so every action stays reachable at narrow
	 * widths. The cloned buttons keep their inline `onclick` handlers
	 * (those reference globals like `_Pict.PictApplication.*`, which
	 * resolve at click-time regardless of where the DOM lives).
	 *
	 * Override on the instance (`view.openBurgerMenu = function() {...}`)
	 * to customise the popup contents — e.g. emit a per-app menu view
	 * instead of cloning the topbar DOM.
	 */openBurgerMenu(){if(typeof document==='undefined')return null;let tmpModal=this.pict.views['Pict-Section-Modal'];if(!tmpModal||typeof tmpModal.show!=='function'){if(typeof console!=='undefined'&&console.warn){console.warn('Theme-TopBar: pict-section-modal not registered — burger menu unavailable.');}return null;}let tmpSections=[];let tmpNav=document.querySelector('#Theme-TopBar-Nav');let tmpUser=document.querySelector('#Theme-TopBar-User');if(tmpNav&&tmpNav.innerHTML.trim()){tmpSections.push('<div class="pict-theme-burger-menu-section">'+tmpNav.innerHTML+'</div>');}if(tmpUser&&tmpUser.innerHTML.trim()){tmpSections.push('<div class="pict-theme-burger-menu-section">'+tmpUser.innerHTML+'</div>');}if(tmpSections.length===0){tmpSections.push('<div class="pict-theme-burger-menu-empty">No menu items configured.</div>');}let tmpHTML='<div class="pict-theme-burger-menu">'+tmpSections.join('')+'</div>';return tmpModal.show({title:'Menu',content:tmpHTML,width:'280px',closeable:true,buttons:[]});}}module.exports=PictViewThemeTopBar;module.exports.default_configuration=_ViewConfiguration;},{"pict-view":89}],86:[function(require,module,exports){module.exports={"name":"pict-template","version":"1.0.15","description":"Pict Template Base Class","main":"source/Pict-Template.js","scripts":{"start":"node source/Pict-Template.js","test":"npx quack test","tests":"npx quack test -g","coverage":"npx quack coverage","build":"npx quack build","types":"tsc -p ."},"types":"types/source/Pict-Template.d.ts","repository":{"type":"git","url":"git+https://github.com/stevenvelozo/pict-view.git"},"author":"steven velozo <steven@velozo.com>","license":"MIT","bugs":{"url":"https://github.com/stevenvelozo/pict-view/issues"},"homepage":"https://github.com/stevenvelozo/pict-view#readme","devDependencies":{"pict":"^1.0.348","quackage":"^1.0.58","typescript":"^5.9.3"},"mocha":{"diff":true,"extension":["js"],"package":"./package.json","reporter":"spec","slow":"75","timeout":"5000","ui":"tdd","watch-files":["source/**/*.js","test/**/*.js"],"watch-ignore":["lib/vendor"]},"dependencies":{"fable-serviceproviderbase":"^3.0.19"}};},{}],87:[function(require,module,exports){const libFableServiceBase=require('fable-serviceproviderbase');const libPackage=require('../package.json');/** @typedef {import('pict') & {
 *     [key: string]: any, // represent services for now as a workaround
 * }} Pict *//**
 * @class PictTemplateExpression
 * @classdesc The PictTemplateExpression class is a service provider for the pict anti-framework that provides template rendering services.
 */class PictTemplateExpression extends libFableServiceBase{/**
	 * @param {Pict} pFable - The Fable Framework instance
	 * @param {Record<string, any>} [pOptions] - The options for the service
	 * @param {string} [pServiceHash] - The hash of the service
	 */constructor(pFable,pOptions,pServiceHash){super(pFable,pOptions,pServiceHash);/** @type {Pict} */this.fable;/** @type {Pict} */this.pict=this.fable;this.serviceType='PictTemplate';/** @type {Record<string, any>} */this._Package=libPackage;}/**
	 * Render a template expression, returning a string with the resulting content.
	 *
	 * @param {string} pTemplateHash - The hash contents of the template (what's between the template start and stop tags)
	 * @param {any} pRecord - The json object to be used as the Record for the template render
	 * @param {Array<any>} pContextArray - An array of context objects accessible from the template; safe to leave empty
	 * @param {any} [pScope] - A sticky scope that can be used to carry state and simplify template
	 * @param {any} [pState] - A catchall state object for plumbing data through template processing.
	 *
	 * @return {string} The rendered template
	 */render(pTemplateHash,pRecord,pContextArray,pScope,pState){return'';}/**
	 * Render a template expression, deliver a string with the resulting content to a callback function.
	 *
	 * @param {string} pTemplateHash - The hash contents of the template (what's between the template start and stop tags)
	 * @param {any} pRecord - The json object to be used as the Record for the template render
	 * @param {(error?: Error, content?: String) => void} fCallback - callback function invoked with the rendered template, or an error
	 * @param {Array<any>} pContextArray - An array of context objects accessible from the template; safe to leave empty
	 * @param {any} [pScope] - A sticky scope that can be used to carry state and simplify template
	 * @param {any} [pState] - A catchall state object for plumbing data through template processing.
	 *
	 * @return {void}
	 */renderAsync(pTemplateHash,pRecord,fCallback,pContextArray,pScope,pState){return fCallback(null,this.render(pTemplateHash,pRecord,pContextArray,pScope,pState));}/**
	 * Provide a match criteria for a template expression.  Anything between these two values is returned as the template hash.
	 *
	 * @param {string} pMatchStart - The string pattern to start a match in the template trie
	 * @param {string} pMatchEnd  - The string pattern to stop a match in the trie acyclic graph
	 *
	 * @return {void}
	 */addPattern(pMatchStart,pMatchEnd){return this.pict.MetaTemplate.addPatternBoth(pMatchStart,pMatchEnd,this.render,this.renderAsync,this);}/**
	 * Read a value from a nested object using a dot notation string.
	 *
	 * @param {string} pAddress - The address to resolve
	 * @param {Record<string, any>} pRecord - The record to resolve
	 * @param {Array<any>} [pContextArray] - The context array to resolve (optional)
	 * @param {Record<string, any>} [pRootDataObject] - The root data object to resolve (optional)
	 * @param {any} [pScope] - A sticky scope that can be used to carry state and simplify template
	 * @param {any} [pState] - A catchall state object for plumbing data through template processing.
	 *
	 * @return {any} The value at the given address, or undefined
	 */resolveStateFromAddress(pAddress,pRecord,pContextArray,pRootDataObject,pScope,pState){return this.pict.resolveStateFromAddress(pAddress,pRecord,pContextArray,pRootDataObject,pScope,pState);}}module.exports=PictTemplateExpression;module.exports.template_hash='Default';},{"../package.json":86,"fable-serviceproviderbase":2}],88:[function(require,module,exports){module.exports={"name":"pict-view","version":"1.0.68","description":"Pict View Base Class","main":"source/Pict-View.js","scripts":{"test":"npx quack test","tests":"npx quack test -g","start":"node source/Pict-View.js","coverage":"npx quack coverage","build":"npx quack build","docker-dev-build":"docker build ./ -f Dockerfile_LUXURYCode -t pict-view-image:local","docker-dev-run":"docker run -it -d --name pict-view-dev -p 30001:8080 -p 38086:8086 -v \"$PWD/.config:/home/coder/.config\"  -v \"$PWD:/home/coder/pict-view\" -u \"$(id -u):$(id -g)\" -e \"DOCKER_USER=$USER\" pict-view-image:local","docker-dev-shell":"docker exec -it pict-view-dev /bin/bash","types":"tsc -p .","lint":"eslint source/**"},"types":"types/source/Pict-View.d.ts","repository":{"type":"git","url":"git+https://github.com/stevenvelozo/pict-view.git"},"author":"steven velozo <steven@velozo.com>","license":"MIT","bugs":{"url":"https://github.com/stevenvelozo/pict-view/issues"},"homepage":"https://github.com/stevenvelozo/pict-view#readme","devDependencies":{"@eslint/js":"^9.39.1","browser-env":"^3.3.0","eslint":"^9.39.1","pict":"^1.0.363","quackage":"^1.0.65","typescript":"^5.9.3"},"mocha":{"diff":true,"extension":["js"],"package":"./package.json","reporter":"spec","slow":"75","timeout":"5000","ui":"tdd","watch-files":["source/**/*.js","test/**/*.js"],"watch-ignore":["lib/vendor"]},"dependencies":{"fable":"^3.1.67","fable-serviceproviderbase":"^3.0.19"}};},{}],89:[function(require,module,exports){const libFableServiceBase=require('fable-serviceproviderbase');const libPackage=require('../package.json');const defaultPictViewSettings={DefaultRenderable:false,DefaultDestinationAddress:false,DefaultTemplateRecordAddress:false,ViewIdentifier:false,// If this is set to true, when the App initializes this will.
// After the App initializes, initialize will be called as soon as it's added.
AutoInitialize:true,AutoInitializeOrdinal:0,// If this is set to true, when the App autorenders (on load) this will.
// After the App initializes, render will be called as soon as it's added.
AutoRender:true,AutoRenderOrdinal:0,AutoSolveWithApp:true,AutoSolveOrdinal:0,CSSHash:false,CSS:false,CSSProvider:false,CSSPriority:500,Templates:[],DefaultTemplates:[],Renderables:[],Manifests:{}};/** @typedef {(error?: Error) => void} ErrorCallback *//** @typedef {number | boolean} PictTimestamp *//**
 * @typedef {'replace' | 'append' | 'prepend' | 'append_once' | 'virtual-assignment'} RenderMethod
 *//**
 * @typedef {Object} Renderable
 *
 * @property {string} RenderableHash - A unique hash for the renderable.
 * @property {string} TemplateHash - The hash of the template to use for rendering this renderable.
 * @property {string} [DefaultTemplateRecordAddress] - The default address for resolving the data record for this renderable.
 * @property {string} [ContentDestinationAddress] - The default address (DOM CSS selector) for rendering the content of this renderable.
 * @property {RenderMethod} [RenderMethod=replace] - The method to use when projecting the renderable to the DOM ('replace', 'append', 'prepend', 'append_once', 'virtual-assignment').
 * @property {string} [TestAddress] - The address to use for testing the renderable.
 * @property {string} [TransactionHash] - The transaction hash for the root renderable.
 * @property {string} [RootRenderableViewHash] - The hash of the root renderable.
 * @property {string} [Content] - The rendered content for this renderable, if applicable.
 *//**
 * Represents a view in the Pict ecosystem.
 */class PictView extends libFableServiceBase{/**
	 * @param {any} pFable - The Fable object that this service is attached to.
	 * @param {any} [pOptions] - (optional) The options for this service.
	 * @param {string} [pServiceHash] - (optional) The hash of the service.
	 */constructor(pFable,pOptions,pServiceHash){// Intersect default options, parent constructor, service information
let tmpOptions=Object.assign({},JSON.parse(JSON.stringify(defaultPictViewSettings)),pOptions);super(pFable,tmpOptions,pServiceHash);//FIXME: add types to fable and ancillaries
/** @type {any} */this.fable;/** @type {any} */this.options;/** @type {String} */this.UUID;/** @type {String} */this.Hash;/** @type {any} */this.log;const tmpHashIsUUID=this.Hash===this.UUID;//NOTE: since many places are using the view UUID as the HTML element ID, we prefix it to avoid starting with a number
this.UUID=`V-${this.UUID}`;if(tmpHashIsUUID){this.Hash=this.UUID;}if(!this.options.ViewIdentifier){this.options.ViewIdentifier=`AutoViewID-${this.fable.getUUID()}`;}this.serviceType='PictView';/** @type {Record<string, any>} */this._Package=libPackage;// Convenience and consistency naming
/** @type {import('pict') & { log: any, instantiateServiceProviderWithoutRegistration: (hash: String) => any, instantiateServiceProviderIfNotExists: (hash: string) => any, TransactionTracking: import('pict/types/source/services/Fable-Service-TransactionTracking') }} */this.pict=this.fable;// Wire in the essential Pict application state
this.AppData=this.pict.AppData;this.Bundle=this.pict.Bundle;/** @type {PictTimestamp} */this.initializeTimestamp=false;/** @type {PictTimestamp} */this.lastSolvedTimestamp=false;/** @type {PictTimestamp} */this.lastRenderedTimestamp=false;/** @type {PictTimestamp} */this.lastMarshalFromViewTimestamp=false;/** @type {PictTimestamp} */this.lastMarshalToViewTimestamp=false;this.pict.instantiateServiceProviderIfNotExists('TransactionTracking');// Load all templates from the array in the options
// Templates are in the form of {Hash:'Some-Template-Hash',Template:'Template content',Source:'TemplateSource'}
for(let i=0;i<this.options.Templates.length;i++){let tmpTemplate=this.options.Templates[i];if(!('Hash'in tmpTemplate)||!('Template'in tmpTemplate)){this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} could not load Template ${i} in the options array.`,tmpTemplate);}else{if(!tmpTemplate.Source){tmpTemplate.Source=`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} options object.`;}this.pict.TemplateProvider.addTemplate(tmpTemplate.Hash,tmpTemplate.Template,tmpTemplate.Source);}}// Load all default templates from the array in the options
// Templates are in the form of {Prefix:'',Postfix:'-List-Row',Template:'Template content',Source:'TemplateSourceString'}
for(let i=0;i<this.options.DefaultTemplates.length;i++){let tmpDefaultTemplate=this.options.DefaultTemplates[i];if(!('Postfix'in tmpDefaultTemplate)||!('Template'in tmpDefaultTemplate)){this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} could not load Default Template ${i} in the options array.`,tmpDefaultTemplate);}else{if(!tmpDefaultTemplate.Source){tmpDefaultTemplate.Source=`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} options object.`;}this.pict.TemplateProvider.addDefaultTemplate(tmpDefaultTemplate.Prefix,tmpDefaultTemplate.Postfix,tmpDefaultTemplate.Template,tmpDefaultTemplate.Source);}}// Load the CSS if it's available
if(this.options.CSS){let tmpCSSHash=this.options.CSSHash?this.options.CSSHash:`View-${this.options.ViewIdentifier}`;let tmpCSSProvider=this.options.CSSProvider?this.options.CSSProvider:tmpCSSHash;this.pict.CSSMap.addCSS(tmpCSSHash,this.options.CSS,tmpCSSProvider,this.options.CSSPriority);}// Load all renderables
// Renderables are launchable renderable instructions with templates
// They look as such: {Identifier:'ContentEntry', TemplateHash:'Content-Entry-Section-Main', ContentDestinationAddress:'#ContentSection', RecordAddress:'AppData.Content.DefaultText', ManifestTransformation:'ManyfestHash', ManifestDestinationAddress:'AppData.Content.DataToTransformContent'}
// The only parts that are necessary are Identifier and Template
// A developer can then do render('ContentEntry') and it just kinda works.  Or they can override the ContentDestinationAddress
/** @type {Record<String, Renderable>} */this.renderables={};for(let i=0;i<this.options.Renderables.length;i++){/** @type {Renderable} */let tmpRenderable=this.options.Renderables[i];this.addRenderable(tmpRenderable);}}/**
	 * Adds a renderable to the view.
	 *
	 * @param {string | Renderable} pRenderableHash - The hash of the renderable, or a renderable object.
	 * @param {string} [pTemplateHash] - (optional) The hash of the template for the renderable.
	 * @param {string} [pDefaultTemplateRecordAddress] - (optional) The default data address for the template.
	 * @param {string} [pDefaultDestinationAddress] - (optional) The default destination address for the renderable.
	 * @param {RenderMethod} [pRenderMethod=replace] - (optional) The method to use when rendering the renderable (ex. 'replace').
	 */addRenderable(pRenderableHash,pTemplateHash,pDefaultTemplateRecordAddress,pDefaultDestinationAddress,pRenderMethod){/** @type {Renderable} */let tmpRenderable;if(typeof pRenderableHash=='object'){// The developer passed in the renderable as an object.
// Use theirs instead!
tmpRenderable=pRenderableHash;}else{/** @type {RenderMethod} */let tmpRenderMethod=typeof pRenderMethod!=='string'?pRenderMethod:'replace';tmpRenderable={RenderableHash:pRenderableHash,TemplateHash:pTemplateHash,DefaultTemplateRecordAddress:pDefaultTemplateRecordAddress,ContentDestinationAddress:pDefaultDestinationAddress,RenderMethod:tmpRenderMethod};}if(typeof tmpRenderable.RenderableHash!='string'||typeof tmpRenderable.TemplateHash!='string'){this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} could not load Renderable; RenderableHash or TemplateHash are invalid.`,tmpRenderable);}else{if(this.pict.LogNoisiness>0){this.log.trace(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} adding renderable [${tmpRenderable.RenderableHash}] pointed to template ${tmpRenderable.TemplateHash}.`);}this.renderables[tmpRenderable.RenderableHash]=tmpRenderable;}}/* -------------------------------------------------------------------------- *//*                        Code Section: Initialization                        *//* -------------------------------------------------------------------------- *//**
	 * Lifecycle hook that triggers before the view is initialized.
	 */onBeforeInitialize(){if(this.pict.LogNoisiness>3){this.log.trace(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} onBeforeInitialize:`);}return true;}/**
	 * Lifecycle hook that triggers before the view is initialized (async flow).
	 *
	 * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
	 */onBeforeInitializeAsync(fCallback){this.onBeforeInitialize();return fCallback();}/**
	 * Lifecycle hook that triggers when the view is initialized.
	 */onInitialize(){if(this.pict.LogNoisiness>3){this.log.trace(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} onInitialize:`);}return true;}/**
	 * Lifecycle hook that triggers when the view is initialized (async flow).
	 *
	 * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
	 */onInitializeAsync(fCallback){this.onInitialize();return fCallback();}/**
	 * Performs view initialization.
	 */initialize(){if(this.pict.LogControlFlow){this.log.trace(`PICT-ControlFlow VIEW [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} initialize:`);}if(!this.initializeTimestamp){this.onBeforeInitialize();this.onInitialize();this.onAfterInitialize();this.initializeTimestamp=this.pict.log.getTimeStamp();return true;}else{this.log.warn(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} initialize called but initialization is already completed.  Aborting.`);return false;}}/**
	 * Performs view initialization (async flow).
	 *
	 * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
	 */initializeAsync(fCallback){if(this.pict.LogControlFlow){this.log.trace(`PICT-ControlFlow VIEW [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} initializeAsync:`);}if(!this.initializeTimestamp){let tmpAnticipate=this.pict.instantiateServiceProviderWithoutRegistration('Anticipate');if(this.pict.LogNoisiness>0){this.log.info(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} beginning initialization...`);}tmpAnticipate.anticipate(this.onBeforeInitializeAsync.bind(this));tmpAnticipate.anticipate(this.onInitializeAsync.bind(this));tmpAnticipate.anticipate(this.onAfterInitializeAsync.bind(this));tmpAnticipate.wait(/** @param {Error} pError */pError=>{if(pError){this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} initialization failed: ${pError.message||pError}`,{stack:pError.stack});}this.initializeTimestamp=this.pict.log.getTimeStamp();if(this.pict.LogNoisiness>0){this.log.info(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} initialization complete.`);}return fCallback();});}else{this.log.warn(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} async initialize called but initialization is already completed.  Aborting.`);// TODO: Should this be an error?
return fCallback();}}onAfterInitialize(){if(this.pict.LogNoisiness>3){this.log.trace(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} onAfterInitialize:`);}return true;}/**
	 * Lifecycle hook that triggers after the view is initialized (async flow).
	 *
	 * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
	 */onAfterInitializeAsync(fCallback){this.onAfterInitialize();return fCallback();}/* -------------------------------------------------------------------------- *//*                            Code Section: Render                            *//* -------------------------------------------------------------------------- *//**
	 * Lifecycle hook that triggers before the view is rendered.
	 *
	 * @param {Renderable} pRenderable - The renderable that will be rendered.
	 */onBeforeRender(pRenderable){// Overload this to mess with stuff before the content gets generated from the template
if(this.pict.LogNoisiness>3){this.log.trace(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} onBeforeRender:`);}return true;}/**
	 * Lifecycle hook that triggers before the view is rendered (async flow).
	 *
	 * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
	 * @param {Renderable} pRenderable - The renderable that will be rendered.
	 */onBeforeRenderAsync(fCallback,pRenderable){this.onBeforeRender(pRenderable);return fCallback();}/**
	 * Lifecycle hook that triggers before the view is projected into the DOM.
	 *
	 * @param {Renderable} pRenderable - The renderable that will be projected.
	 */onBeforeProject(pRenderable){// Overload this to mess with stuff before the content gets generated from the template
if(this.pict.LogNoisiness>3){this.log.trace(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} onBeforeProject:`);}return true;}/**
	 * Lifecycle hook that triggers before the view is projected into the DOM (async flow).
	 *
	 * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
	 * @param {Renderable} pRenderable - The renderable that will be projected.
	 */onBeforeProjectAsync(fCallback,pRenderable){this.onBeforeProject(pRenderable);return fCallback();}/**
	 * Builds the render options for a renderable.
	 *
	 * For DRY purposes on the three flavors of render.
	 *
	 * @param {string|ErrorCallback} [pRenderableHash] - The hash of the renderable to render.
	 * @param {string|ErrorCallback} [pRenderDestinationAddress] - The address where the renderable will be rendered.
	 * @param {string|object|ErrorCallback} [pTemplateRecordAddress] - The address of (or actual obejct) where the data for the template is stored.
	 */buildRenderOptions(pRenderableHash,pRenderDestinationAddress,pTemplateRecordAddress){let tmpRenderOptions={Valid:true};tmpRenderOptions.RenderableHash=typeof pRenderableHash==='string'?pRenderableHash:typeof this.options.DefaultRenderable=='string'?this.options.DefaultRenderable:false;if(!tmpRenderOptions.RenderableHash){this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} could not find a suitable RenderableHash ${tmpRenderOptions.RenderableHash} (param ${pRenderableHash}because it is not a valid renderable.`);tmpRenderOptions.Valid=false;}tmpRenderOptions.Renderable=this.renderables[tmpRenderOptions.RenderableHash];if(!tmpRenderOptions.Renderable){this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} could not render ${tmpRenderOptions.RenderableHash} (param ${pRenderableHash}) because it does not exist.`);tmpRenderOptions.Valid=false;}tmpRenderOptions.DestinationAddress=typeof pRenderDestinationAddress==='string'?pRenderDestinationAddress:typeof tmpRenderOptions.Renderable.ContentDestinationAddress==='string'?tmpRenderOptions.Renderable.ContentDestinationAddress:typeof this.options.DefaultDestinationAddress==='string'?this.options.DefaultDestinationAddress:false;if(!tmpRenderOptions.DestinationAddress){this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} could not render ${tmpRenderOptions.RenderableHash} (param ${pRenderableHash}) because it does not have a valid destination address (param ${pRenderDestinationAddress}).`);tmpRenderOptions.Valid=false;}if(typeof pTemplateRecordAddress==='object'){tmpRenderOptions.RecordAddress='Passed in as object';tmpRenderOptions.Record=pTemplateRecordAddress;}else{tmpRenderOptions.RecordAddress=typeof pTemplateRecordAddress==='string'?pTemplateRecordAddress:typeof tmpRenderOptions.Renderable.DefaultTemplateRecordAddress==='string'?tmpRenderOptions.Renderable.DefaultTemplateRecordAddress:typeof this.options.DefaultTemplateRecordAddress==='string'?this.options.DefaultTemplateRecordAddress:false;tmpRenderOptions.Record=typeof tmpRenderOptions.RecordAddress==='string'?this.pict.DataProvider.getDataByAddress(tmpRenderOptions.RecordAddress):undefined;}return tmpRenderOptions;}/**
	 * Assigns the content to the destination address.
	 *
	 * For DRY purposes on the three flavors of render.
	 *
	 * @param {Renderable} pRenderable - The renderable to render.
	 * @param {string} pRenderDestinationAddress - The address where the renderable will be rendered.
	 * @param {string} pContent - The content to render.
	 * @returns {boolean} - Returns true if the content was assigned successfully.
	 * @memberof PictView
	 */assignRenderContent(pRenderable,pRenderDestinationAddress,pContent){return this.pict.ContentAssignment.projectContent(pRenderable.RenderMethod,pRenderDestinationAddress,pContent,pRenderable.TestAddress);}/**
	 * Render a renderable from this view.
	 *
	 * @param {string} [pRenderableHash] - The hash of the renderable to render.
	 * @param {string} [pRenderDestinationAddress] - The address where the renderable will be rendered.
	 * @param {string|object} [pTemplateRecordAddress] - The address where the data for the template is stored.
	 * @param {Renderable} [pRootRenderable] - The root renderable for the render operation, if applicable.
	 * @return {boolean}
	 */render(pRenderableHash,pRenderDestinationAddress,pTemplateRecordAddress,pRootRenderable){return this.renderWithScope(this,pRenderableHash,pRenderDestinationAddress,pTemplateRecordAddress,pRootRenderable);}/**
	 * Render a renderable from this view, providing a specifici scope for the template.
	 *
	 * @param {any} pScope - The scope to use for the template rendering.
	 * @param {string} [pRenderableHash] - The hash of the renderable to render.
	 * @param {string} [pRenderDestinationAddress] - The address where the renderable will be rendered.
	 * @param {string|object} [pTemplateRecordAddress] - The address where the data for the template is stored.
	 * @param {Renderable} [pRootRenderable] - The root renderable for the render operation, if applicable.
	 * @return {boolean}
	 */renderWithScope(pScope,pRenderableHash,pRenderDestinationAddress,pTemplateRecordAddress,pRootRenderable){let tmpRenderableHash=typeof pRenderableHash==='string'?pRenderableHash:typeof this.options.DefaultRenderable=='string'?this.options.DefaultRenderable:false;if(!tmpRenderableHash){this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} could not render ${tmpRenderableHash} (param ${pRenderableHash}) because it is not a valid renderable.`);return false;}/** @type {Renderable} */let tmpRenderable;if(tmpRenderableHash=='__Virtual'){tmpRenderable={RenderableHash:'__Virtual',TemplateHash:this.renderables[this.options.DefaultRenderable].TemplateHash,ContentDestinationAddress:typeof pRenderDestinationAddress==='string'?pRenderDestinationAddress:typeof tmpRenderable.ContentDestinationAddress==='string'?tmpRenderable.ContentDestinationAddress:typeof this.options.DefaultDestinationAddress==='string'?this.options.DefaultDestinationAddress:null,RenderMethod:'virtual-assignment',TransactionHash:pRootRenderable&&pRootRenderable.TransactionHash,RootRenderableViewHash:pRootRenderable&&pRootRenderable.RootRenderableViewHash};}else{tmpRenderable=Object.assign({},this.renderables[tmpRenderableHash]);tmpRenderable.ContentDestinationAddress=typeof pRenderDestinationAddress==='string'?pRenderDestinationAddress:typeof tmpRenderable.ContentDestinationAddress==='string'?tmpRenderable.ContentDestinationAddress:typeof this.options.DefaultDestinationAddress==='string'?this.options.DefaultDestinationAddress:null;}if(!tmpRenderable.TransactionHash){tmpRenderable.TransactionHash=`ViewRender-V-${this.options.ViewIdentifier}-R-${tmpRenderableHash}-U-${this.pict.getUUID()}`;tmpRenderable.RootRenderableViewHash=this.Hash;this.pict.TransactionTracking.registerTransaction(tmpRenderable.TransactionHash);}if(!tmpRenderable){this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} could not render ${tmpRenderableHash} (param ${pRenderableHash}) because it does not exist.`);return false;}if(!tmpRenderable.ContentDestinationAddress){this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} could not render ${tmpRenderableHash} (param ${pRenderableHash}) because it does not have a valid destination address.`);return false;}let tmpRecordAddress;let tmpRecord;if(typeof pTemplateRecordAddress==='object'){tmpRecord=pTemplateRecordAddress;tmpRecordAddress='Passed in as object';}else{tmpRecordAddress=typeof pTemplateRecordAddress==='string'?pTemplateRecordAddress:typeof tmpRenderable.DefaultTemplateRecordAddress==='string'?tmpRenderable.DefaultTemplateRecordAddress:typeof this.options.DefaultTemplateRecordAddress==='string'?this.options.DefaultTemplateRecordAddress:false;tmpRecord=typeof tmpRecordAddress==='string'?this.pict.DataProvider.getDataByAddress(tmpRecordAddress):undefined;}// Execute the developer-overridable pre-render behavior
this.onBeforeRender(tmpRenderable);if(this.pict.LogControlFlow){this.log.trace(`PICT-ControlFlow VIEW [${this.UUID}]::[${this.Hash}] Renderable[${tmpRenderableHash}] Destination[${tmpRenderable.ContentDestinationAddress}] TemplateRecordAddress[${tmpRecordAddress}] render:`);}if(this.pict.LogNoisiness>0){this.log.trace(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} Beginning Render of Renderable[${tmpRenderableHash}] to Destination [${tmpRenderable.ContentDestinationAddress}]...`);}// Generate the content output from the template and data
tmpRenderable.Content=this.pict.parseTemplateByHash(tmpRenderable.TemplateHash,tmpRecord,null,[this],pScope,{RootRenderable:typeof pRootRenderable==='object'?pRootRenderable:tmpRenderable});if(this.pict.LogNoisiness>0){this.log.trace(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} Assigning Renderable[${tmpRenderableHash}] content length ${tmpRenderable.Content.length} to Destination [${tmpRenderable.ContentDestinationAddress}] using render method [${tmpRenderable.RenderMethod}].`);}this.onBeforeProject(tmpRenderable);this.onProject(tmpRenderable);if(tmpRenderable.RenderMethod!=='virtual-assignment'){this.onAfterProject(tmpRenderable);// Execute the developer-overridable post-render behavior
this.onAfterRender(tmpRenderable);}return true;}/**
	 * Render a renderable from this view.
	 *
	 * @param {string|ErrorCallback} [pRenderableHash] - The hash of the renderable to render.
	 * @param {string|ErrorCallback} [pRenderDestinationAddress] - The address where the renderable will be rendered.
	 * @param {string|object|ErrorCallback} [pTemplateRecordAddress] - The address where the data for the template is stored.
	 * @param {Renderable|ErrorCallback} [pRootRenderable] - The root renderable for the render operation, if applicable.
	 * @param {ErrorCallback} [fCallback] - The callback to call when the async operation is complete.
	 *
	 * @return {void}
	 */renderAsync(pRenderableHash,pRenderDestinationAddress,pTemplateRecordAddress,pRootRenderable,fCallback){return this.renderWithScopeAsync(this,pRenderableHash,pRenderDestinationAddress,pTemplateRecordAddress,pRootRenderable,fCallback);}/**
	 * Render a renderable from this view.
	 *
	 * @param {any} pScope - The scope to use for the template rendering.
	 * @param {string|ErrorCallback} [pRenderableHash] - The hash of the renderable to render.
	 * @param {string|ErrorCallback} [pRenderDestinationAddress] - The address where the renderable will be rendered.
	 * @param {string|object|ErrorCallback} [pTemplateRecordAddress] - The address where the data for the template is stored.
	 * @param {Renderable|ErrorCallback} [pRootRenderable] - The root renderable for the render operation, if applicable.
	 * @param {ErrorCallback} [fCallback] - The callback to call when the async operation is complete.
	 *
	 * @return {void}
	 */renderWithScopeAsync(pScope,pRenderableHash,pRenderDestinationAddress,pTemplateRecordAddress,pRootRenderable,fCallback){let tmpRenderableHash=typeof pRenderableHash==='string'?pRenderableHash:typeof this.options.DefaultRenderable=='string'?this.options.DefaultRenderable:false;// Allow the callback to be passed in as the last parameter no matter what
/** @type {ErrorCallback} */let tmpCallback=typeof fCallback==='function'?fCallback:typeof pTemplateRecordAddress==='function'?pTemplateRecordAddress:typeof pRenderDestinationAddress==='function'?pRenderDestinationAddress:typeof pRenderableHash==='function'?pRenderableHash:typeof pRootRenderable==='function'?pRootRenderable:null;if(!tmpCallback){this.log.warn(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.Name} renderAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions.`);tmpCallback=pError=>{if(pError){this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.Name} renderAsync Auto Callback Error: ${pError}`,pError);}};}if(!tmpRenderableHash){this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} could not asynchronously render ${tmpRenderableHash} (param ${pRenderableHash}because it is not a valid renderable.`);return tmpCallback(new Error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} could not asynchronously render ${tmpRenderableHash} (param ${pRenderableHash}because it is not a valid renderable.`));}/** @type {Renderable} */let tmpRenderable;if(tmpRenderableHash=='__Virtual'){tmpRenderable={RenderableHash:'__Virtual',TemplateHash:this.renderables[this.options.DefaultRenderable].TemplateHash,ContentDestinationAddress:typeof pRenderDestinationAddress==='string'?pRenderDestinationAddress:typeof this.options.DefaultDestinationAddress==='string'?this.options.DefaultDestinationAddress:null,RenderMethod:'virtual-assignment',TransactionHash:pRootRenderable&&typeof pRootRenderable!=='function'&&pRootRenderable.TransactionHash,RootRenderableViewHash:pRootRenderable&&typeof pRootRenderable!=='function'&&pRootRenderable.RootRenderableViewHash};}else{tmpRenderable=Object.assign({},this.renderables[tmpRenderableHash]);tmpRenderable.ContentDestinationAddress=typeof pRenderDestinationAddress==='string'?pRenderDestinationAddress:typeof tmpRenderable.ContentDestinationAddress==='string'?tmpRenderable.ContentDestinationAddress:typeof this.options.DefaultDestinationAddress==='string'?this.options.DefaultDestinationAddress:null;}if(!tmpRenderable.TransactionHash){tmpRenderable.TransactionHash=`ViewRender-V-${this.options.ViewIdentifier}-R-${tmpRenderableHash}-U-${this.pict.getUUID()}`;tmpRenderable.RootRenderableViewHash=this.Hash;this.pict.TransactionTracking.registerTransaction(tmpRenderable.TransactionHash);}if(!tmpRenderable){this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} could not render ${tmpRenderableHash} (param ${pRenderableHash}) because it does not exist.`);return tmpCallback(new Error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} could not render ${tmpRenderableHash} (param ${pRenderableHash}) because it does not exist.`));}if(!tmpRenderable.ContentDestinationAddress){this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} could not render ${tmpRenderableHash} (param ${pRenderableHash}) because it does not have a valid destination address.`);return tmpCallback(new Error(`Could not render ${tmpRenderableHash}`));}let tmpRecordAddress;let tmpRecord;if(typeof pTemplateRecordAddress==='object'){tmpRecord=pTemplateRecordAddress;tmpRecordAddress='Passed in as object';}else{tmpRecordAddress=typeof pTemplateRecordAddress==='string'?pTemplateRecordAddress:typeof tmpRenderable.DefaultTemplateRecordAddress==='string'?tmpRenderable.DefaultTemplateRecordAddress:typeof this.options.DefaultTemplateRecordAddress==='string'?this.options.DefaultTemplateRecordAddress:false;tmpRecord=typeof tmpRecordAddress==='string'?this.pict.DataProvider.getDataByAddress(tmpRecordAddress):undefined;}if(this.pict.LogControlFlow){this.log.trace(`PICT-ControlFlow VIEW [${this.UUID}]::[${this.Hash}] Renderable[${tmpRenderableHash}] Destination[${tmpRenderable.ContentDestinationAddress}] TemplateRecordAddress[${tmpRecordAddress}] renderAsync:`);}if(this.pict.LogNoisiness>2){this.log.trace(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} Beginning Asynchronous Render (callback-style)...`);}let tmpAnticipate=this.fable.newAnticipate();tmpAnticipate.anticipate(fOnBeforeRenderCallback=>{this.onBeforeRenderAsync(fOnBeforeRenderCallback,tmpRenderable);});tmpAnticipate.anticipate(fAsyncTemplateCallback=>{// Render the template (asynchronously)
this.pict.parseTemplateByHash(tmpRenderable.TemplateHash,tmpRecord,(pError,pContent)=>{if(pError){this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} could not render (asynchronously) ${tmpRenderableHash} (param ${pRenderableHash}) because it did not parse the template.`,pError);return fAsyncTemplateCallback(pError);}tmpRenderable.Content=pContent;return fAsyncTemplateCallback();},[this],pScope,{RootRenderable:typeof pRootRenderable==='object'?pRootRenderable:tmpRenderable});});tmpAnticipate.anticipate(fNext=>{this.onBeforeProjectAsync(fNext,tmpRenderable);});tmpAnticipate.anticipate(fNext=>{this.onProjectAsync(fNext,tmpRenderable);});if(tmpRenderable.RenderMethod!=='virtual-assignment'){tmpAnticipate.anticipate(fNext=>{this.onAfterProjectAsync(fNext,tmpRenderable);});// Execute the developer-overridable post-render behavior
tmpAnticipate.anticipate(fNext=>{this.onAfterRenderAsync(fNext,tmpRenderable);});}tmpAnticipate.wait(tmpCallback);}/**
	 * Renders the default renderable.
	 *
	 * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
	 */renderDefaultAsync(fCallback){// Render the default renderable
this.renderAsync(fCallback);}/**
	 * @param {string} [pRenderableHash] - The hash of the renderable to render.
	 * @param {string} [pRenderDestinationAddress] - The address where the renderable will be rendered.
	 * @param {string|object} [pTemplateRecordAddress] - The address of (or actual obejct) where the data for the template is stored.
	 */basicRender(pRenderableHash,pRenderDestinationAddress,pTemplateRecordAddress){return this.basicRenderWithScope(this,pRenderableHash,pRenderDestinationAddress,pTemplateRecordAddress);}/**
	 * @param {any} pScope - The scope to use for the template rendering.
	 * @param {string} [pRenderableHash] - The hash of the renderable to render.
	 * @param {string} [pRenderDestinationAddress] - The address where the renderable will be rendered.
	 * @param {string|object} [pTemplateRecordAddress] - The address of (or actual obejct) where the data for the template is stored.
	 */basicRenderWithScope(pScope,pRenderableHash,pRenderDestinationAddress,pTemplateRecordAddress){let tmpRenderOptions=this.buildRenderOptions(pRenderableHash,pRenderDestinationAddress,pTemplateRecordAddress);if(tmpRenderOptions.Valid){this.assignRenderContent(tmpRenderOptions.Renderable,tmpRenderOptions.DestinationAddress,this.pict.parseTemplateByHash(tmpRenderOptions.Renderable.TemplateHash,tmpRenderOptions.Record,null,[this],pScope,{RootRenderable:tmpRenderOptions.Renderable}));return true;}else{this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} could not perform a basic render of ${tmpRenderOptions.RenderableHash} because it is not valid.`);return false;}}/**
	 * @param {string|ErrorCallback} [pRenderableHash] - The hash of the renderable to render.
	 * @param {string|ErrorCallback} [pRenderDestinationAddress] - The address where the renderable will be rendered.
	 * @param {string|Object|ErrorCallback} [pTemplateRecordAddress] - The address of (or actual obejct) where the data for the template is stored.
	 * @param {ErrorCallback} [fCallback] - The callback to call when the async operation is complete.
	 */basicRenderAsync(pRenderableHash,pRenderDestinationAddress,pTemplateRecordAddress,fCallback){return this.basicRenderWithScopeAsync(this,pRenderableHash,pRenderDestinationAddress,pTemplateRecordAddress,fCallback);}/**
	 * @param {any} pScope - The scope to use for the template rendering.
	 * @param {string|ErrorCallback} [pRenderableHash] - The hash of the renderable to render.
	 * @param {string|ErrorCallback} [pRenderDestinationAddress] - The address where the renderable will be rendered.
	 * @param {string|Object|ErrorCallback} [pTemplateRecordAddress] - The address of (or actual obejct) where the data for the template is stored.
	 * @param {ErrorCallback} [fCallback] - The callback to call when the async operation is complete.
	 */basicRenderWithScopeAsync(pScope,pRenderableHash,pRenderDestinationAddress,pTemplateRecordAddress,fCallback){// Allow the callback to be passed in as the last parameter no matter what
/** @type {ErrorCallback} */let tmpCallback=typeof fCallback==='function'?fCallback:typeof pTemplateRecordAddress==='function'?pTemplateRecordAddress:typeof pRenderDestinationAddress==='function'?pRenderDestinationAddress:typeof pRenderableHash==='function'?pRenderableHash:null;if(!tmpCallback){this.log.warn(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.Name} basicRenderAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions.`);tmpCallback=pError=>{if(pError){this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.Name} basicRenderAsync Auto Callback Error: ${pError}`,pError);}};}const tmpRenderOptions=this.buildRenderOptions(pRenderableHash,pRenderDestinationAddress,pTemplateRecordAddress);if(tmpRenderOptions.Valid){this.pict.parseTemplateByHash(tmpRenderOptions.Renderable.TemplateHash,tmpRenderOptions.Record,/**
				 * @param {Error} [pError] - The error that occurred during template parsing.
				 * @param {string} [pContent] - The content that was rendered from the template.
				 */(pError,pContent)=>{if(pError){this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} could not render (asynchronously) ${tmpRenderOptions.RenderableHash} because it did not parse the template.`,pError);return tmpCallback(pError);}this.assignRenderContent(tmpRenderOptions.Renderable,tmpRenderOptions.DestinationAddress,pContent);return tmpCallback();},[this],pScope,{RootRenderable:tmpRenderOptions.Renderable});}else{let tmpErrorMessage=`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} could not perform a basic render of ${tmpRenderOptions.RenderableHash} because it is not valid.`;this.log.error(tmpErrorMessage);return tmpCallback(new Error(tmpErrorMessage));}}/**
	 * @param {Renderable} pRenderable - The renderable that was rendered.
	 */onProject(pRenderable){if(this.pict.LogNoisiness>3){this.log.trace(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} onProject:`);}if(pRenderable.RenderMethod==='virtual-assignment'){this.pict.TransactionTracking.pushToTransactionQueue(pRenderable.TransactionHash,{ViewHash:this.Hash,Renderable:pRenderable},'Deferred-Post-Content-Assignment');}if(this.pict.LogNoisiness>0){this.log.trace(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} Assigning Renderable[${pRenderable.RenderableHash}] content length ${pRenderable.Content.length} to Destination [${pRenderable.ContentDestinationAddress}] using Async render method ${pRenderable.RenderMethod}.`);}// Assign the content to the destination address
this.pict.ContentAssignment.projectContent(pRenderable.RenderMethod,pRenderable.ContentDestinationAddress,pRenderable.Content,pRenderable.TestAddress);this.lastRenderedTimestamp=this.pict.log.getTimeStamp();}/**
	 * Lifecycle hook that triggers after the view is projected into the DOM (async flow).
	 *
	 * @param {(error?: Error, content?: string) => void} fCallback - The callback to call when the async operation is complete.
	 * @param {Renderable} pRenderable - The renderable that is being projected.
	 */onProjectAsync(fCallback,pRenderable){this.onProject(pRenderable);return fCallback();}/**
	 * Lifecycle hook that triggers after the view is rendered.
	 *
	 * @param {Renderable} pRenderable - The renderable that was rendered.
	 */onAfterRender(pRenderable){if(this.pict.LogNoisiness>3){this.log.trace(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} onAfterRender:`);}if(pRenderable&&pRenderable.RootRenderableViewHash===this.Hash){const tmpTransactionQueue=this.pict.TransactionTracking.clearTransactionQueue(pRenderable.TransactionHash)||[];for(const tmpEvent of tmpTransactionQueue){const tmpView=this.pict.views[tmpEvent.Data.ViewHash];if(!tmpView){this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} onAfterRender: Could not find view for transaction hash ${pRenderable.TransactionHash} and ViewHash ${tmpEvent.Data.ViewHash}.`);continue;}tmpView.onAfterProject();// Execute the developer-overridable post-render behavior
tmpView.onAfterRender(tmpEvent.Data.Renderable);}// Queue is drained and nested child renders have each cleaned up
// their own transactions; remove this root render's entry from
// the tracking map so it does not leak.
this.pict.TransactionTracking.unregisterTransaction(pRenderable.TransactionHash);}return true;}/**
	 * Lifecycle hook that triggers after the view is rendered (async flow).
	 *
	 * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
	 * @param {Renderable} pRenderable - The renderable that was rendered.
	 */onAfterRenderAsync(fCallback,pRenderable){// NOTE: this.onAfterRender(pRenderable) will itself clear the
// transaction queue and unregister the transaction if this view is
// the root renderable - see onAfterRender above. So by the time the
// loop below runs, the queue is already empty and there is nothing
// to drain. Keeping the async queue walk here defensively in case
// future subclasses override onAfterRender in ways that skip the
// drain, but the common path is now "sync drain, async no-op".
this.onAfterRender(pRenderable);const tmpAnticipate=this.fable.newAnticipate();const tmpIsRootRenderable=pRenderable&&pRenderable.RootRenderableViewHash===this.Hash;if(tmpIsRootRenderable){const queue=this.pict.TransactionTracking.clearTransactionQueue(pRenderable.TransactionHash)||[];for(const event of queue){/** @type {PictView} */const tmpView=this.pict.views[event.Data.ViewHash];if(!tmpView){this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} onAfterRenderAsync: Could not find view for transaction hash ${pRenderable.TransactionHash} and ViewHash ${event.Data.ViewHash}.`);continue;}tmpAnticipate.anticipate(tmpView.onAfterProjectAsync.bind(tmpView));tmpAnticipate.anticipate(fNext=>{tmpView.onAfterRenderAsync(fNext,event.Data.Renderable);});// Execute the developer-overridable post-render behavior
}}return tmpAnticipate.wait(pError=>{// Nested virtual-assignment children have now settled their own
// onAfterRenderAsync chains (and unregistered their own
// transactions along the way). Ensure this root render's entry
// is also gone - unregisterTransaction is a no-op if the sync
// onAfterRender above already removed it, so this is safe to
// call unconditionally on the root path.
if(tmpIsRootRenderable&&pRenderable&&pRenderable.TransactionHash){this.pict.TransactionTracking.unregisterTransaction(pRenderable.TransactionHash);}return fCallback(pError);});}/**
	 * Lifecycle hook that triggers after the view is projected into the DOM.
	 *
	 * @param {Renderable} pRenderable - The renderable that was projected.
	 */onAfterProject(pRenderable){if(this.pict.LogNoisiness>3){this.log.trace(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} onAfterProject:`);}return true;}/**
	 * Lifecycle hook that triggers after the view is projected into the DOM (async flow).
	 *
	 * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
	 * @param {Renderable} pRenderable - The renderable that was projected.
	 */onAfterProjectAsync(fCallback,pRenderable){return fCallback();}/* -------------------------------------------------------------------------- *//*                            Code Section: Solver                            *//* -------------------------------------------------------------------------- *//**
	 * Lifecycle hook that triggers before the view is solved.
	 */onBeforeSolve(){if(this.pict.LogNoisiness>3){this.log.trace(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} onBeforeSolve:`);}return true;}/**
	 * Lifecycle hook that triggers before the view is solved (async flow).
	 *
	 * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
	 */onBeforeSolveAsync(fCallback){this.onBeforeSolve();return fCallback();}/**
	 * Lifecycle hook that triggers when the view is solved.
	 */onSolve(){if(this.pict.LogNoisiness>3){this.log.trace(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} onSolve:`);}return true;}/**
	 * Lifecycle hook that triggers when the view is solved (async flow).
	 *
	 * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
	 */onSolveAsync(fCallback){this.onSolve();return fCallback();}/**
	 * Performs view solving and triggers lifecycle hooks.
	 *
	 * @return {boolean} - True if the view was solved successfully, false otherwise.
	 */solve(){if(this.pict.LogNoisiness>2){this.log.trace(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} executing solve() function...`);}this.onBeforeSolve();this.onSolve();this.onAfterSolve();this.lastSolvedTimestamp=this.pict.log.getTimeStamp();return true;}/**
	 * Performs view solving and triggers lifecycle hooks (async flow).
	 *
	 * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
	 */solveAsync(fCallback){let tmpAnticipate=this.pict.instantiateServiceProviderWithoutRegistration('Anticipate');/** @type {ErrorCallback} */let tmpCallback=typeof fCallback==='function'?fCallback:null;if(!tmpCallback){this.log.warn(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.Name} solveAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions.`);tmpCallback=pError=>{if(pError){this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.Name} solveAsync Auto Callback Error: ${pError}`,pError);}};}tmpAnticipate.anticipate(this.onBeforeSolveAsync.bind(this));tmpAnticipate.anticipate(this.onSolveAsync.bind(this));tmpAnticipate.anticipate(this.onAfterSolveAsync.bind(this));tmpAnticipate.wait(pError=>{if(this.pict.LogNoisiness>2){this.log.trace(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} solveAsync() complete.`);}this.lastSolvedTimestamp=this.pict.log.getTimeStamp();return tmpCallback(pError);});}/**
	 * Lifecycle hook that triggers after the view is solved.
	 */onAfterSolve(){if(this.pict.LogNoisiness>3){this.log.trace(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} onAfterSolve:`);}return true;}/**
	 * Lifecycle hook that triggers after the view is solved (async flow).
	 *
	 * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
	 */onAfterSolveAsync(fCallback){this.onAfterSolve();return fCallback();}/* -------------------------------------------------------------------------- *//*                     Code Section: Marshal From View                        *//* -------------------------------------------------------------------------- *//**
	 * Lifecycle hook that triggers before data is marshaled from the view.
	 *
	 * @return {boolean} - True if the operation was successful, false otherwise.
	 */onBeforeMarshalFromView(){if(this.pict.LogNoisiness>3){this.log.trace(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} onBeforeMarshalFromView:`);}return true;}/**
	 * Lifecycle hook that triggers before data is marshaled from the view (async flow).
	 *
	 * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
	 */onBeforeMarshalFromViewAsync(fCallback){this.onBeforeMarshalFromView();return fCallback();}/**
	 * Lifecycle hook that triggers when data is marshaled from the view.
	 */onMarshalFromView(){if(this.pict.LogNoisiness>3){this.log.trace(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} onMarshalFromView:`);}return true;}/**
	 * Lifecycle hook that triggers when data is marshaled from the view (async flow).
	 *
	 * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
	 */onMarshalFromViewAsync(fCallback){this.onMarshalFromView();return fCallback();}/**
	 * Marshals data from the view.
	 *
	 * @return {boolean} - True if the operation was successful, false otherwise.
	 */marshalFromView(){if(this.pict.LogNoisiness>2){this.log.trace(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} executing solve() function...`);}this.onBeforeMarshalFromView();this.onMarshalFromView();this.onAfterMarshalFromView();this.lastMarshalFromViewTimestamp=this.pict.log.getTimeStamp();return true;}/**
	 * Marshals data from the view (async flow).
	 *
	 * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
	 */marshalFromViewAsync(fCallback){let tmpAnticipate=this.pict.instantiateServiceProviderWithoutRegistration('Anticipate');/** @type {ErrorCallback} */let tmpCallback=typeof fCallback==='function'?fCallback:null;if(!tmpCallback){this.log.warn(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.Name} marshalFromViewAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions.`);tmpCallback=pError=>{if(pError){this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.Name} marshalFromViewAsync Auto Callback Error: ${pError}`,pError);}};}tmpAnticipate.anticipate(this.onBeforeMarshalFromViewAsync.bind(this));tmpAnticipate.anticipate(this.onMarshalFromViewAsync.bind(this));tmpAnticipate.anticipate(this.onAfterMarshalFromViewAsync.bind(this));tmpAnticipate.wait(pError=>{if(this.pict.LogNoisiness>2){this.log.trace(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} marshalFromViewAsync() complete.`);}this.lastMarshalFromViewTimestamp=this.pict.log.getTimeStamp();return tmpCallback(pError);});}/**
	 * Lifecycle hook that triggers after data is marshaled from the view.
	 */onAfterMarshalFromView(){if(this.pict.LogNoisiness>3){this.log.trace(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} onAfterMarshalFromView:`);}return true;}/**
	 * Lifecycle hook that triggers after data is marshaled from the view (async flow).
	 *
	 * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
	 */onAfterMarshalFromViewAsync(fCallback){this.onAfterMarshalFromView();return fCallback();}/* -------------------------------------------------------------------------- *//*                     Code Section: Marshal To View                          *//* -------------------------------------------------------------------------- *//**
	 * Lifecycle hook that triggers before data is marshaled into the view.
	 */onBeforeMarshalToView(){if(this.pict.LogNoisiness>3){this.log.trace(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} onBeforeMarshalToView:`);}return true;}/**
	 * Lifecycle hook that triggers before data is marshaled into the view (async flow).
	 *
	 * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
	 */onBeforeMarshalToViewAsync(fCallback){this.onBeforeMarshalToView();return fCallback();}/**
	 * Lifecycle hook that triggers when data is marshaled into the view.
	 */onMarshalToView(){if(this.pict.LogNoisiness>3){this.log.trace(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} onMarshalToView:`);}return true;}/**
	 * Lifecycle hook that triggers when data is marshaled into the view (async flow).
	 *
	 * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
	 */onMarshalToViewAsync(fCallback){this.onMarshalToView();return fCallback();}/**
	 * Marshals data into the view.
	 *
	 * @return {boolean} - True if the operation was successful, false otherwise.
	 */marshalToView(){if(this.pict.LogNoisiness>2){this.log.trace(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} executing solve() function...`);}this.onBeforeMarshalToView();this.onMarshalToView();this.onAfterMarshalToView();this.lastMarshalToViewTimestamp=this.pict.log.getTimeStamp();return true;}/**
	 * Marshals data into the view (async flow).
	 *
	 * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
	 */marshalToViewAsync(fCallback){let tmpAnticipate=this.pict.instantiateServiceProviderWithoutRegistration('Anticipate');/** @type {ErrorCallback} */let tmpCallback=typeof fCallback==='function'?fCallback:null;if(!tmpCallback){this.log.warn(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.Name} marshalToViewAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions.`);tmpCallback=pError=>{if(pError){this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.Name} marshalToViewAsync Auto Callback Error: ${pError}`,pError);}};}tmpAnticipate.anticipate(this.onBeforeMarshalToViewAsync.bind(this));tmpAnticipate.anticipate(this.onMarshalToViewAsync.bind(this));tmpAnticipate.anticipate(this.onAfterMarshalToViewAsync.bind(this));tmpAnticipate.wait(pError=>{if(this.pict.LogNoisiness>2){this.log.trace(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} marshalToViewAsync() complete.`);}this.lastMarshalToViewTimestamp=this.pict.log.getTimeStamp();return tmpCallback(pError);});}/**
	 * Lifecycle hook that triggers after data is marshaled into the view.
	 */onAfterMarshalToView(){if(this.pict.LogNoisiness>3){this.log.trace(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} onAfterMarshalToView:`);}return true;}/**
	 * Lifecycle hook that triggers after data is marshaled into the view (async flow).
	 *
	 * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
	 */onAfterMarshalToViewAsync(fCallback){this.onAfterMarshalToView();return fCallback();}/** @return {boolean} - True if the object is a PictView. */get isPictView(){return true;}}module.exports=PictView;},{"../package.json":88,"fable-serviceproviderbase":2}],90:[function(require,module,exports){// shim for using process in browser
var process=module.exports={};// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
var cachedSetTimeout;var cachedClearTimeout;function defaultSetTimout(){throw new Error('setTimeout has not been defined');}function defaultClearTimeout(){throw new Error('clearTimeout has not been defined');}(function(){try{if(typeof setTimeout==='function'){cachedSetTimeout=setTimeout;}else{cachedSetTimeout=defaultSetTimout;}}catch(e){cachedSetTimeout=defaultSetTimout;}try{if(typeof clearTimeout==='function'){cachedClearTimeout=clearTimeout;}else{cachedClearTimeout=defaultClearTimeout;}}catch(e){cachedClearTimeout=defaultClearTimeout;}})();function runTimeout(fun){if(cachedSetTimeout===setTimeout){//normal enviroments in sane situations
return setTimeout(fun,0);}// if setTimeout wasn't available but was latter defined
if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout){cachedSetTimeout=setTimeout;return setTimeout(fun,0);}try{// when when somebody has screwed with setTimeout but no I.E. maddness
return cachedSetTimeout(fun,0);}catch(e){try{// When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
return cachedSetTimeout.call(null,fun,0);}catch(e){// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
return cachedSetTimeout.call(this,fun,0);}}}function runClearTimeout(marker){if(cachedClearTimeout===clearTimeout){//normal enviroments in sane situations
return clearTimeout(marker);}// if clearTimeout wasn't available but was latter defined
if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout){cachedClearTimeout=clearTimeout;return clearTimeout(marker);}try{// when when somebody has screwed with setTimeout but no I.E. maddness
return cachedClearTimeout(marker);}catch(e){try{// When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
return cachedClearTimeout.call(null,marker);}catch(e){// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
// Some versions of I.E. have different rules for clearTimeout vs setTimeout
return cachedClearTimeout.call(this,marker);}}}var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){if(!draining||!currentQueue){return;}draining=false;if(currentQueue.length){queue=currentQueue.concat(queue);}else{queueIndex=-1;}if(queue.length){drainQueue();}}function drainQueue(){if(draining){return;}var timeout=runTimeout(cleanUpNextTick);draining=true;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){if(currentQueue){currentQueue[queueIndex].run();}}queueIndex=-1;len=queue.length;}currentQueue=null;draining=false;runClearTimeout(timeout);}process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i];}}queue.push(new Item(fun,args));if(queue.length===1&&!draining){runTimeout(drainQueue);}};// v8 likes predictible objects
function Item(fun,array){this.fun=fun;this.array=array;}Item.prototype.run=function(){this.fun.apply(null,this.array);};process.title='browser';process.browser=true;process.env={};process.argv=[];process.version='';// empty string to avoid regexp issues
process.versions={};function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.prependListener=noop;process.prependOnceListener=noop;process.listeners=function(name){return[];};process.binding=function(name){throw new Error('process.binding is not supported');};process.cwd=function(){return'/';};process.chdir=function(dir){throw new Error('process.chdir is not supported');};process.umask=function(){return 0;};},{}],91:[function(require,module,exports){module.exports={"name":"retold-data-service","version":"2.1.8","description":"Serve up a whole model!","main":"source/Retold-Data-Service.js","bin":{"retold-data-service-clone":"bin/retold-data-service-clone.js"},"scripts":{"start":"node bin/retold-data-service-clone.js","coverage":"npx quack coverage","test":"npx quack test","brand":"node node_modules/pict-section-theme/bin/pict-section-theme-brand.js --manifest ../../../Retold-Modules-Manifest.json --module retold-data-service --favicons source/services/comprehension-loader/web/favicons && cp -r source/services/comprehension-loader/web/favicons source/services/data-cloner/web/favicons","build":"node build-all.js","build:cloner":"npx quack build","build:loader":"node -e \"require('fs').writeFileSync('.quackage.json', require('fs').readFileSync('.quackage-comprehension-loader.json', 'utf8'))\" && npx quack build","prepublishOnly":"npm run build","build-test-model":"cd test && npx stricture -i model/ddl/BookStore.ddl","docker-dev-build":"docker build ./ -f Dockerfile_LUXURYCode -t retold-data-service-image:local","docker-dev-run":"docker run -it -d --name retold-data-service-dev -p 44444:8080 -p 43306:3306 -p 48086:8086 -v \"$PWD/.config:/home/coder/.config\"  -v \"$PWD:/home/coder/retold-data-service\" -u \"$(id -u):$(id -g)\" -e \"DOCKER_USER=$USER\" retold-data-service-image:local","docker-dev-shell":"docker exec -it retold-data-service-dev /bin/bash","docker-service-build":"docker build ./ -f Dockerfile_Service -t retold-data-service-server-image:local","docker-service-run-test":"docker run -it --init -d --name retold-data-service -p 8086:8086 -p 43306:3306 -v \"$(pwd):/retold-data-service:z\" -u \"$(id -u):$(id -g)\" retold-data-service-server-image:local","docker-service-run":"docker run -it --init -d --name retold-data-service -p 8086:8086 -p 43306:3306 -v \"$(pwd):/retold-data-service:z\" retold-data-service-server-image:local","docker-service-shell":"docker exec -it retold-data-service /bin/bash","test:integration":"node test/run-integration-tests.js","test:integration:no-browser":"node test/run-integration-tests.js --skip-puppeteer","test:all":"npx quack test && node test/run-integration-tests.js --skip-puppeteer","postversion":"npx quack release postversion","postpublish":"npx quack release postpublish","publish:docker":"npx quack release publish --image","release:patch":"npx quack release patch","release:minor":"npx quack release minor","release:major":"npx quack release major","release:patch:image":"npx quack release patch --image","release:minor:image":"npx quack release minor --image","release:major:image":"npx quack release major --image"},"mocha":{"spec":["test/RetoldDataService_tests.js","test/Bundles_smoke_tests.js","test/ComprehensionLoader_smoke_tests.js","test/DataCloner_smoke_tests.js"],"diff":true,"extension":["js"],"package":"./package.json","reporter":"spec","slow":"75","timeout":"5000","ui":"tdd","watch-files":["source/**/*.js","test/**/*.js"],"watch-ignore":["lib/vendor"]},"repository":{"type":"git","url":"https://github.com/fable-retold/retold-data-service.git"},"keywords":["entity","behavior","api"],"author":"Steven Velozo <steven@velozo.com> (http://velozo.com/)","license":"MIT","bugs":{"url":"https://github.com/fable-retold/retold-data-service/issues"},"homepage":"https://github.com/fable-retold/retold-data-service","devDependencies":{"chai":"^4.5.0","jsdom":"^25.0.1","meadow-connection-sqlite":"^1.0.22","mocha":"^11.8.0","pict-docuserve":"^1.4.19","puppeteer":"^24.40.0","quackage":"^1.3.0","stricture":"^4.0.6","supertest":"^7.2.2"},"dependencies":{"bibliograph":"^1.0.0","fable":"^3.1.82","fable-serviceproviderbase":"^3.0.19","meadow":"^2.0.53","meadow-connection-manager":"^1.1.5","meadow-connection-mysql":"^1.0.21","meadow-endpoints":"^4.1.8","meadow-integration":"^1.1.7","meadow-migrationmanager":"^1.0.5","orator":"^6.1.3","orator-http-proxy":"^1.0.5","orator-serviceserver-restify":"^2.0.12","orator-static-server":"^2.1.4","pict":"^1.0.398","pict-provider-theme":"^1.1.2","pict-section-connection-form":"^1.0.0","pict-section-histogram":"^1.0.1","pict-section-modal":"^1.3.2","pict-section-theme":"^1.1.1","pict-sessionmanager":"^1.0.2","stricture":"^4.0.6"},"retold":{"brand":{"Hash":"retold-data-service","Name":"Retold Data Service","Tagline":"Schema-driven data movement and comprehension","Palette":"ocean","Icon":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 96 96\" width=\"96\" height=\"96\">\n\t\t<defs>\n\t\t\t<clipPath id=\"frame-retold-data-service-filled-light\">\n\t\t\t\t<path d=\"M 48.00 2.00 L 87.84 25.00 L 87.84 71.00 L 48.00 94.00 L 8.16 71.00 L 8.16 25.00 Z\"/>\n\t\t\t</clipPath>\n\t\t</defs>\n\t\t<path d=\"M 48.00 2.00 L 87.84 25.00 L 87.84 71.00 L 48.00 94.00 L 8.16 71.00 L 8.16 25.00 Z\" fill=\"#23a6c7\"/>\n\t\t<g clip-path=\"url(#frame-retold-data-service-filled-light)\"><rect x=\"20\" y=\"20\" width=\"56\" height=\"56\" rx=\"8\" fill=\"rgba(255,255,255,0.18)\"/>\n\t\t\t\t\t<path d=\"M 48 30 L 70 48 L 48 66 L 26 48 Z\" fill=\"#e36b59\"/></g>\n\t\t<text x=\"48\" y=\"50\" text-anchor=\"middle\" dominant-baseline=\"central\"\n\t\t\tfont-family=\"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif\"\n\t\t\tfont-size=\"28\" font-weight=\"600\"\n\t\t\tfill=\"#ffffff\" letter-spacing=\"-1\">RDS</text>\n\t</svg>","IconType":"svg","Favicon":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 96 96\" width=\"96\" height=\"96\">\n\t\t<defs>\n\t\t\t<clipPath id=\"fav-retold-data-service-light\">\n\t\t\t\t<path d=\"M 48.00 2.00 L 87.84 25.00 L 87.84 71.00 L 48.00 94.00 L 8.16 71.00 L 8.16 25.00 Z\"/>\n\t\t\t</clipPath>\n\t\t</defs>\n\t\t<path d=\"M 48.00 2.00 L 87.84 25.00 L 87.84 71.00 L 48.00 94.00 L 8.16 71.00 L 8.16 25.00 Z\" fill=\"#23a6c7\"/>\n\t\t<g clip-path=\"url(#fav-retold-data-service-light)\"><rect x=\"16\" y=\"16\" width=\"64\" height=\"64\" rx=\"10\" fill=\"rgba(255,255,255,0.22)\"/></g>\n\t\t<text x=\"48\" y=\"50\" text-anchor=\"middle\" dominant-baseline=\"central\"\n\t\t\tfont-family=\"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif\"\n\t\t\tfont-size=\"60\" font-weight=\"800\"\n\t\t\tfill=\"#ffffff\" letter-spacing=\"-1\">R</text>\n\t</svg>","FaviconDark":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 96 96\" width=\"96\" height=\"96\">\n\t\t<defs>\n\t\t\t<clipPath id=\"fav-retold-data-service-dark\">\n\t\t\t\t<path d=\"M 48.00 2.00 L 87.84 25.00 L 87.84 71.00 L 48.00 94.00 L 8.16 71.00 L 8.16 25.00 Z\"/>\n\t\t\t</clipPath>\n\t\t</defs>\n\t\t<path d=\"M 48.00 2.00 L 87.84 25.00 L 87.84 71.00 L 48.00 94.00 L 8.16 71.00 L 8.16 25.00 Z\" fill=\"#67c6de\"/>\n\t\t<g clip-path=\"url(#fav-retold-data-service-dark)\"><rect x=\"16\" y=\"16\" width=\"64\" height=\"64\" rx=\"10\" fill=\"rgba(255,255,255,0.22)\"/></g>\n\t\t<text x=\"48\" y=\"50\" text-anchor=\"middle\" dominant-baseline=\"central\"\n\t\t\tfont-family=\"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif\"\n\t\t\tfont-size=\"60\" font-weight=\"800\"\n\t\t\tfill=\"#101418\" letter-spacing=\"-1\">R</text>\n\t</svg>","Colors":{"Primary":"#23a6c7","Secondary":"#e36b59","PrimaryLight":"#23a6c7","PrimaryDark":"#67c6de","SecondaryLight":"#e36b59","SecondaryDark":"#edb3aa"}}}};},{}],92:[function(require,module,exports){'use strict';// Located at source/services/. Apps live one level deeper at
// source/services/<app>/pict-app/. The package.json is two levels up.
const tmpPackage=require('../../package.json');if(!tmpPackage.retold||!tmpPackage.retold.brand){throw new Error('retold-data-service: package.json is missing retold.brand — '+'run `npm run brand` (which calls pict-section-theme-brand) before building');}module.exports=tmpPackage.retold.brand;},{"../../package.json":91}],93:[function(require,module,exports){module.exports={"Name":"Retold Comprehension Loader","Hash":"ComprehensionLoader","MainViewportViewIdentifier":"ComprehensionLoader-Layout","MainViewportDestinationAddress":"#ComprehensionLoader-Application-Container","MainViewportDefaultDataAddress":"AppData.ComprehensionLoader","pict_configuration":{"Product":"ComprehensionLoader"},"AutoRenderMainViewportViewAfterInitialize":false};},{}],94:[function(require,module,exports){const libPictApplication=require('pict-application');const libProvider=require('./providers/Pict-Provider-ComprehensionLoader.js');const libViewLayout=require('./views/PictView-ComprehensionLoader-Layout.js');const libViewSession=require('./views/PictView-ComprehensionLoader-Session.js');const libViewSchema=require('./views/PictView-ComprehensionLoader-Schema.js');const libViewSource=require('./views/PictView-ComprehensionLoader-Source.js');const libViewLoad=require('./views/PictView-ComprehensionLoader-Load.js');const libViewHistogram=require('pict-section-histogram');const libPictSectionModal=require('pict-section-modal');const libPictSectionTheme=require('pict-section-theme');const libBrand=require('../../RetoldDataService-Brand.js');const libViewShell=require('./views/PictView-ComprehensionLoader-Shell.js');const libViewTopBarNav=require('./views/PictView-ComprehensionLoader-TopBar-Nav.js');const libViewTopBarUser=require('./views/PictView-ComprehensionLoader-TopBar-User.js');const libViewStatusBar=require('./views/PictView-ComprehensionLoader-StatusBar.js');const libViewStatusDetail=require('./views/PictView-ComprehensionLoader-StatusDetail.js');const libViewSettings=require('./views/PictView-ComprehensionLoader-SettingsPanel.js');class ComprehensionLoaderApplication extends libPictApplication{constructor(pFable,pOptions,pServiceHash){super(pFable,pOptions,pServiceHash);// 1. Modal section (provides shell + panels + modal API).
this.pict.addView('Pict-Section-Modal',libPictSectionModal.default_configuration,libPictSectionModal);// 2. Provider + existing section views.
this.pict.addProvider('ComprehensionLoader',libProvider.default_configuration,libProvider);this.pict.addView('ComprehensionLoader-Layout',libViewLayout.default_configuration,libViewLayout);this.pict.addView('ComprehensionLoader-Session',libViewSession.default_configuration,libViewSession);this.pict.addView('ComprehensionLoader-Schema',libViewSchema.default_configuration,libViewSchema);this.pict.addView('ComprehensionLoader-Source',libViewSource.default_configuration,libViewSource);this.pict.addView('ComprehensionLoader-Load',libViewLoad.default_configuration,libViewLoad);this.pict.addView('ComprehensionLoader-StatusHistogram',{ViewIdentifier:'ComprehensionLoader-StatusHistogram',TargetElementAddress:'#ComprehensionLoader-Throughput-Histogram',DefaultDestinationAddress:'#ComprehensionLoader-Throughput-Histogram',RenderOnLoad:false,Selectable:false,Orientation:'vertical',FillContainer:true,ShowValues:false,ShowLabels:true,MaxBarSize:80,BarColor:'var(--theme-color-brand-primary, #4a90d9)',Bins:[]},libViewHistogram);// 3. Shell host + slot views + status bar / detail + settings panel.
this.pict.addView('ComprehensionLoader-Shell',libViewShell.default_configuration,libViewShell);this.pict.addView('ComprehensionLoader-TopBar-Nav',libViewTopBarNav.default_configuration,libViewTopBarNav);this.pict.addView('ComprehensionLoader-TopBar-User',libViewTopBarUser.default_configuration,libViewTopBarUser);this.pict.addView('ComprehensionLoader-StatusBar',libViewStatusBar.default_configuration,libViewStatusBar);this.pict.addView('ComprehensionLoader-StatusDetail',libViewStatusDetail.default_configuration,libViewStatusDetail);this.pict.addView('ComprehensionLoader-SettingsPanel',libViewSettings.default_configuration,libViewSettings);// 4. Theme-Section provider — registered LAST so it can find the slot views.
this.pict.addProvider('Theme-Section',{ApplyDefault:'pict-default',DefaultMode:'system',DefaultScale:1.0,Brand:libBrand,Views:['Picker','ModeToggle','ScaleSelect','BrandMark','TopBar','BottomBar'],ViewOptions:{TopBar:{NavView:'ComprehensionLoader-TopBar-Nav',UserView:'ComprehensionLoader-TopBar-User',Height:56},BottomBar:{StatusView:'ComprehensionLoader-StatusBar',Height:36}}},libPictSectionTheme);}onAfterInitializeAsync(fCallback){// Centralized state
this.pict.AppData.ComprehensionLoader={FetchedEntities:[],LastReport:null,ServerBusyAtLoad:false,LoadPollTimer:null,LiveStatusTimer:null,StatusDetailExpanded:false,StatusDetailTimer:null,StatusDetailData:null,LastLiveStatus:null,PersistFields:['serverURL','authMethod','authURI','checkURI','cookieName','cookieValueAddr','cookieValueTemplate','loginMarker','userName','password','schemaURL','comprehensionSourceMode','comprehensionURL']};// Make pict available for inline onclick handlers
window.pict=this.pict;// Render the shell first — creates panel destination divs.
this.pict.views['ComprehensionLoader-Shell'].render();// Render the layout (which chains child view renders via onAfterRender)
// into the shell's #ComprehensionLoader-Workspace destination.
this.pict.views['ComprehensionLoader-Layout'].render();// Render the StatusBar into the BottomBar slot — provider's polling
// updates this by id in-place, so we only need the initial paint.
this.pict.views['ComprehensionLoader-StatusBar'].render();// Post-render initialization (unchanged)
this.pict.providers.ComprehensionLoader.initPersistence();this.pict.providers.ComprehensionLoader.startLiveStatusPolling();this.pict.providers.ComprehensionLoader.initAccordionPreviews();this.pict.providers.ComprehensionLoader.updateAllPreviews();this.pict.views['ComprehensionLoader-Layout'].collapseAllSections();this.pict.providers.ComprehensionLoader.initAutoProcess();return fCallback();}}module.exports=ComprehensionLoaderApplication;module.exports.default_configuration=require('./Pict-Application-ComprehensionLoader-Configuration.json');},{"../../RetoldDataService-Brand.js":92,"./Pict-Application-ComprehensionLoader-Configuration.json":93,"./providers/Pict-Provider-ComprehensionLoader.js":96,"./views/PictView-ComprehensionLoader-Layout.js":97,"./views/PictView-ComprehensionLoader-Load.js":98,"./views/PictView-ComprehensionLoader-Schema.js":99,"./views/PictView-ComprehensionLoader-Session.js":100,"./views/PictView-ComprehensionLoader-SettingsPanel.js":101,"./views/PictView-ComprehensionLoader-Shell.js":102,"./views/PictView-ComprehensionLoader-Source.js":103,"./views/PictView-ComprehensionLoader-StatusBar.js":104,"./views/PictView-ComprehensionLoader-StatusDetail.js":105,"./views/PictView-ComprehensionLoader-TopBar-Nav.js":106,"./views/PictView-ComprehensionLoader-TopBar-User.js":107,"pict-application":4,"pict-section-histogram":14,"pict-section-modal":27,"pict-section-theme":28}],95:[function(require,module,exports){module.exports={ComprehensionLoaderApplication:require('./Pict-Application-ComprehensionLoader.js')};if(typeof window!=='undefined'){window.ComprehensionLoaderApplication=module.exports.ComprehensionLoaderApplication;}},{"./Pict-Application-ComprehensionLoader.js":94}],96:[function(require,module,exports){const libPictProvider=require('pict-provider');class ComprehensionLoaderProvider extends libPictProvider{constructor(pFable,pOptions,pServiceHash){super(pFable,pOptions,pServiceHash);}// ================================================================
// API Helper
// ================================================================
api(pMethod,pPath,pBody){let tmpOpts={method:pMethod,headers:{}};if(pBody){tmpOpts.headers['Content-Type']='application/json';tmpOpts.body=JSON.stringify(pBody);}return fetch(pPath,tmpOpts).then(function(pResponse){return pResponse.json();});}setStatus(pElementId,pMessage,pType){let tmpEl=document.getElementById(pElementId);if(!tmpEl)return;tmpEl.className='status '+(pType||'info');tmpEl.textContent=pMessage;tmpEl.style.display='block';}escapeHtml(pStr){let tmpDiv=document.createElement('div');tmpDiv.appendChild(document.createTextNode(pStr));return tmpDiv.innerHTML;}// ================================================================
// Phase status indicators
// ================================================================
setSectionPhase(pSection,pState){let tmpEl=document.getElementById('phase'+pSection);if(!tmpEl)return;tmpEl.className='accordion-phase';if(pState==='ok'){tmpEl.innerHTML='&#10003;';tmpEl.classList.add('visible','accordion-phase-ok');}else if(pState==='error'){tmpEl.innerHTML='&#10007;';tmpEl.classList.add('visible','accordion-phase-error');}else if(pState==='busy'){tmpEl.innerHTML='<span class="phase-spinner"></span>';tmpEl.classList.add('visible','accordion-phase-busy');}else{tmpEl.innerHTML='';}}// ================================================================
// Accordion Previews
// ================================================================
updateAllPreviews(){// Section 1 — Remote Session
let tmpServerURL=document.getElementById('serverURL');if(!tmpServerURL)return;tmpServerURL=tmpServerURL.value;let tmpUserName=document.getElementById('userName').value;if(tmpServerURL){let tmpPreview1=tmpServerURL;if(tmpUserName)tmpPreview1+=' as '+tmpUserName;document.getElementById('preview1').textContent=tmpPreview1;}else{document.getElementById('preview1').textContent='Configure remote server URL and credentials';}// Section 2 — Remote Schema
let tmpEntities=this.pict.AppData.ComprehensionLoader.FetchedEntities||[];if(tmpEntities.length>0){document.getElementById('preview2').textContent=tmpEntities.length+' entit'+(tmpEntities.length===1?'y':'ies')+' discovered';}else{let tmpSchemaURL=document.getElementById('schemaURL').value;if(tmpSchemaURL){document.getElementById('preview2').textContent='Schema from '+tmpSchemaURL;}else{document.getElementById('preview2').textContent='Fetch entity schema from the remote server';}}// Section 3 — Comprehension Source
let tmpSourceMode=document.querySelector('input[name="comprehensionSourceMode"]:checked');let tmpModeName=tmpSourceMode?tmpSourceMode.value:'url';if(tmpModeName==='url'){let tmpURL=document.getElementById('comprehensionURL').value;if(tmpURL){document.getElementById('preview3').textContent='URL: '+tmpURL;}else{document.getElementById('preview3').textContent='Provide a comprehension JSON URL or upload files';}}else{document.getElementById('preview3').textContent='File upload mode';}// Section 4 — Load
let tmpPreview4El=document.getElementById('preview4');if(tmpPreview4El){tmpPreview4El.textContent='Push comprehension data to the remote server';}}initAccordionPreviews(){let tmpSelf=this;let tmpPreviewFields=['serverURL','userName','schemaURL','comprehensionURL'];let tmpHandler=function(){tmpSelf.updateAllPreviews();};for(let i=0;i<tmpPreviewFields.length;i++){let tmpEl=document.getElementById(tmpPreviewFields[i]);if(tmpEl){tmpEl.addEventListener('input',tmpHandler);tmpEl.addEventListener('change',tmpHandler);}}document.querySelectorAll('input[name="comprehensionSourceMode"]').forEach(function(pEl){pEl.addEventListener('change',tmpHandler);});}// ================================================================
// LocalStorage Persistence
// ================================================================
saveField(pFieldId){let tmpEl=document.getElementById(pFieldId);if(tmpEl){localStorage.setItem('comprehensionLoader_'+pFieldId,tmpEl.value);}}restoreFields(){let tmpPersistFields=this.pict.AppData.ComprehensionLoader.PersistFields;for(let i=0;i<tmpPersistFields.length;i++){let tmpId=tmpPersistFields[i];let tmpSaved=localStorage.getItem('comprehensionLoader_'+tmpId);if(tmpSaved!==null){let tmpEl=document.getElementById(tmpId);if(tmpEl)tmpEl.value=tmpSaved;}}// Restore source mode radio
let tmpSourceMode=localStorage.getItem('comprehensionLoader_comprehensionSourceMode');if(tmpSourceMode==='file'){let tmpFileRadio=document.getElementById('sourceMode_file');if(tmpFileRadio)tmpFileRadio.checked=true;}}initPersistence(){let tmpSelf=this;this.restoreFields();let tmpPersistFields=this.pict.AppData.ComprehensionLoader.PersistFields;for(let i=0;i<tmpPersistFields.length;i++){(function(pId){let tmpEl=document.getElementById(pId);if(tmpEl){tmpEl.addEventListener('input',function(){tmpSelf.saveField(pId);});tmpEl.addEventListener('change',function(){tmpSelf.saveField(pId);});}})(tmpPersistFields[i]);}// Persist source mode radio
document.querySelectorAll('input[name="comprehensionSourceMode"]').forEach(function(pEl){pEl.addEventListener('change',function(){localStorage.setItem('comprehensionLoader_comprehensionSourceMode',this.value);});});// Persist auto-process checkboxes
let tmpAutoIds=['auto1','auto2','auto3','auto4'];for(let a=0;a<tmpAutoIds.length;a++){(function(pId){let tmpEl=document.getElementById(pId);if(tmpEl){let tmpSaved=localStorage.getItem('comprehensionLoader_'+pId);if(tmpSaved!==null)tmpEl.checked=tmpSaved==='true';tmpEl.addEventListener('change',function(){localStorage.setItem('comprehensionLoader_'+pId,this.checked);});}})(tmpAutoIds[a]);}}// ================================================================
// Live Status Indicator
// ================================================================
startLiveStatusPolling(){let tmpAppData=this.pict.AppData.ComprehensionLoader;if(tmpAppData.LiveStatusTimer)clearInterval(tmpAppData.LiveStatusTimer);this.pollLiveStatus();let tmpSelf=this;tmpAppData.LiveStatusTimer=setInterval(function(){tmpSelf.pollLiveStatus();},1500);}pollLiveStatus(){let tmpSelf=this;this.api('GET','/comprehension_load/load/live-status').then(function(pData){tmpSelf.renderLiveStatus(pData);}).catch(function(){tmpSelf.renderLiveStatus({Phase:'disconnected',Message:'Cannot reach server',TotalPushed:0,TotalRecords:0});});}renderLiveStatus(pData){// Cache the live status data for the detail view
this.pict.AppData.ComprehensionLoader.LastLiveStatus=pData;let tmpBar=document.getElementById('liveStatusBar');let tmpMsg=document.getElementById('liveStatusMessage');let tmpMeta=document.getElementById('liveStatusMeta');let tmpProgressFill=document.getElementById('liveStatusProgressFill');if(!tmpBar)return;// Update phase class (preserve expanded class if present)
let tmpWasExpanded=tmpBar.classList.contains('expanded');tmpBar.className='live-status-bar phase-'+(pData.Phase||'idle');if(tmpWasExpanded)tmpBar.classList.add('expanded');// Update message
tmpMsg.textContent=pData.Message||'Idle';// Update meta info
let tmpMetaParts=[];if(pData.Phase==='loading'||pData.Phase==='stopping'){if(pData.Elapsed){tmpMetaParts.push('<span class="live-status-meta-item">\u23F1 '+pData.Elapsed+'</span>');}if(pData.ETA){tmpMetaParts.push('<span class="live-status-meta-item">~'+pData.ETA+' remaining</span>');}if(pData.TotalEntities>0){tmpMetaParts.push('<span class="live-status-meta-item"><strong>'+pData.Completed+'</strong> / '+pData.TotalEntities+' entities</span>');}if(pData.TotalPushed>0){let tmpPushed=pData.TotalPushed.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');if(pData.TotalRecords>0){let tmpTotal=pData.TotalRecords.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');tmpMetaParts.push('<span class="live-status-meta-item"><strong>'+tmpPushed+'</strong> / '+tmpTotal+' records</span>');}else{tmpMetaParts.push('<span class="live-status-meta-item"><strong>'+tmpPushed+'</strong> records</span>');}}if(pData.Errors>0){tmpMetaParts.push('<span class="live-status-meta-item" style="color:#dc3545"><strong>'+pData.Errors+'</strong> error'+(pData.Errors===1?'':'s')+'</span>');}}else if(pData.Phase==='complete'){if(pData.TotalPushed>0){let tmpPushed=pData.TotalPushed.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');tmpMetaParts.push('<span class="live-status-meta-item"><strong>'+tmpPushed+'</strong> records pushed</span>');}}tmpMeta.innerHTML=tmpMetaParts.join('');// Update progress bar
let tmpPct=0;if(pData.Phase==='loading'&&pData.TotalRecords>0&&pData.TotalPushed>0){tmpPct=Math.min(pData.TotalPushed/pData.TotalRecords*100,99.9);}else if(pData.Phase==='loading'&&pData.TotalEntities>0){tmpPct=pData.Completed/pData.TotalEntities*100;}else if(pData.Phase==='complete'){tmpPct=100;}tmpProgressFill.style.width=Math.min(100,Math.round(tmpPct))+'%';// Auto-expand the detail view when load starts
if((pData.Phase==='loading'||pData.Phase==='stopping')&&!this.pict.AppData.ComprehensionLoader.StatusDetailExpanded){let tmpLayoutView=this.pict.views['ComprehensionLoader-Layout'];if(tmpLayoutView&&typeof tmpLayoutView.toggleStatusDetail==='function'){tmpLayoutView.toggleStatusDetail();}}// If the detail view is expanded, re-render it with fresh data
if(this.pict.AppData.ComprehensionLoader.StatusDetailExpanded){this.renderStatusDetail();}// Auto-fetch the load report when we detect a completed load but haven't loaded the report yet
if(pData.Phase==='complete'&&!this.pict.AppData.ComprehensionLoader.LastReport){let tmpSelf=this;this.api('GET','/comprehension_load/load/report').then(function(pReportData){if(pReportData&&pReportData.ReportVersion){tmpSelf.pict.AppData.ComprehensionLoader.LastReport=pReportData;if(tmpSelf.pict.AppData.ComprehensionLoader.StatusDetailExpanded){tmpSelf.renderStatusDetail();}}}).catch(function(){/* ignore fetch errors */});}}// ================================================================
// Status Detail Expansion
// ================================================================
onStatusDetailExpanded(){let tmpAppData=this.pict.AppData.ComprehensionLoader;tmpAppData.StatusDetailExpanded=true;// Immediate render from whatever data we have
this.renderStatusDetail();// Start detail polling (poll /load/status for per-entity data)
if(tmpAppData.StatusDetailTimer)clearInterval(tmpAppData.StatusDetailTimer);let tmpSelf=this;tmpAppData.StatusDetailTimer=setInterval(function(){tmpSelf.pollStatusDetail();},2000);this.pollStatusDetail();}onStatusDetailCollapsed(){let tmpAppData=this.pict.AppData.ComprehensionLoader;tmpAppData.StatusDetailExpanded=false;if(tmpAppData.StatusDetailTimer){clearInterval(tmpAppData.StatusDetailTimer);tmpAppData.StatusDetailTimer=null;}}pollStatusDetail(){let tmpSelf=this;this.api('GET','/comprehension_load/load/status').then(function(pData){tmpSelf.pict.AppData.ComprehensionLoader.StatusDetailData=pData;tmpSelf.renderStatusDetail();}).catch(function(){/* ignore poll errors */});}renderStatusDetail(){let tmpContainer=document.getElementById('ComprehensionLoader-StatusDetail-Container');if(!tmpContainer)return;let tmpAppData=this.pict.AppData.ComprehensionLoader;let tmpLiveStatus=tmpAppData.LastLiveStatus;let tmpStatusData=tmpAppData.StatusDetailData;let tmpReport=tmpAppData.LastReport;// Determine data source: live during load, report after load
let tmpEntities={};let tmpThroughputSamples=[];let tmpIsLive=false;if(tmpLiveStatus&&(tmpLiveStatus.Phase==='loading'||tmpLiveStatus.Phase==='stopping')){tmpIsLive=true;if(tmpStatusData&&tmpStatusData.Entities)tmpEntities=tmpStatusData.Entities;if(tmpLiveStatus.ThroughputSamples)tmpThroughputSamples=tmpLiveStatus.ThroughputSamples;}else if(tmpReport&&tmpReport.ReportVersion){// Build entities object from report
for(let i=0;i<tmpReport.Entities.length;i++){let tmpE=tmpReport.Entities[i];tmpEntities[tmpE.Name]=tmpE;}tmpThroughputSamples=tmpReport.ThroughputSamples||[];}else if(tmpStatusData&&tmpStatusData.Entities){tmpEntities=tmpStatusData.Entities;if(tmpLiveStatus&&tmpLiveStatus.ThroughputSamples){tmpThroughputSamples=tmpLiveStatus.ThroughputSamples;}}// Categorize entities
let tmpRunning=[];let tmpPending=[];let tmpCompleted=[];let tmpErrors=[];let tmpEntityNames=Object.keys(tmpEntities);for(let i=0;i<tmpEntityNames.length;i++){let tmpName=tmpEntityNames[i];let tmpE=tmpEntities[tmpName];if(tmpE.Status==='Pushing'){tmpRunning.push({Name:tmpName,Data:tmpE});}else if(tmpE.Status==='Pending'){tmpPending.push(tmpName);}else if(tmpE.Status==='Complete'){tmpCompleted.push({Name:tmpName,Data:tmpE});}else if(tmpE.Status==='Error'){tmpErrors.push({Name:tmpName,Data:tmpE});}}let tmpHtml='';// === Section 1: Running Operations ===
if(tmpRunning.length>0||tmpPending.length>0){tmpHtml+='<div class="status-detail-section">';tmpHtml+='<div class="status-detail-section-title">Running</div>';for(let i=0;i<tmpRunning.length;i++){let tmpOp=tmpRunning[i];let tmpPct=tmpOp.Data.Total>0?Math.round(tmpOp.Data.Pushed/tmpOp.Data.Total*100):0;let tmpPushedFmt=this.formatNumber(tmpOp.Data.Pushed||0);let tmpTotalFmt=this.formatNumber(tmpOp.Data.Total||0);tmpHtml+='<div class="running-op-row">';tmpHtml+='  <div class="running-op-name">'+this.escapeHtml(tmpOp.Name)+'</div>';tmpHtml+='  <div class="running-op-bar"><div class="running-op-bar-fill" style="width:'+tmpPct+'%"></div></div>';tmpHtml+='  <div class="running-op-count">'+tmpPushedFmt+' / '+tmpTotalFmt+' ('+tmpPct+'%)</div>';tmpHtml+='</div>';}if(tmpPending.length>0){tmpHtml+='<div class="running-op-pending">'+tmpPending.length+' entit'+(tmpPending.length===1?'y':'ies')+' waiting</div>';}tmpHtml+='</div>';}// === Section 2: Completed Operations ===
if(tmpCompleted.length>0){tmpHtml+='<div class="status-detail-section">';tmpHtml+='<div class="status-detail-section-title">Completed ('+tmpCompleted.length+')</div>';for(let i=0;i<tmpCompleted.length;i++){let tmpOp=tmpCompleted[i];let tmpPushedFmt=this.formatNumber(tmpOp.Data.Pushed||tmpOp.Data.Total||0);tmpHtml+='<div class="completed-op-row">';tmpHtml+='<div class="completed-op-header">';tmpHtml+='  <span class="completed-op-checkmark">\u2713</span>';tmpHtml+='  <span class="completed-op-name">'+this.escapeHtml(tmpOp.Name)+'</span>';tmpHtml+='  <span class="completed-op-stats">'+tmpPushedFmt+' records</span>';tmpHtml+='</div>';tmpHtml+='</div>';}tmpHtml+='</div>';}// === Section 3: Errors ===
if(tmpErrors.length>0){tmpHtml+='<div class="status-detail-section">';tmpHtml+='<div class="status-detail-section-title">Errors ('+tmpErrors.length+')</div>';for(let i=0;i<tmpErrors.length;i++){let tmpOp=tmpErrors[i];let tmpPushedFmt=this.formatNumber(tmpOp.Data.Pushed||0);let tmpTotalFmt=this.formatNumber(tmpOp.Data.Total||0);tmpHtml+='<div class="error-op-row">';tmpHtml+='<div class="error-op-header">';tmpHtml+='  <span style="color:#dc3545">\u2717</span>';tmpHtml+='  <span class="error-op-name">'+this.escapeHtml(tmpOp.Name)+'</span>';tmpHtml+='  <span class="error-op-status">'+tmpPushedFmt+' / '+tmpTotalFmt+'</span>';tmpHtml+='</div>';if(tmpOp.Data.ErrorMessage){tmpHtml+='<div class="error-op-message">'+this.escapeHtml(tmpOp.Data.ErrorMessage)+'</div>';}tmpHtml+='</div>';}tmpHtml+='</div>';}if(tmpHtml===''){if(tmpIsLive){tmpHtml='<div style="font-size:0.9em; color:var(--theme-color-text-muted, #888); padding:8px 0">Load in progress, waiting for entity data\u2026</div>';}else{tmpHtml='<div style="font-size:0.9em; color:var(--theme-color-text-muted, #888); padding:8px 0">No load data available. Run a load to see operation details here.</div>';}}tmpContainer.innerHTML=tmpHtml;// Update the throughput histogram
this.updateThroughputHistogram(tmpThroughputSamples);}updateThroughputHistogram(pSamples){let tmpHistContainer=document.getElementById('ComprehensionLoader-Throughput-Histogram');if(!tmpHistContainer)return;if(!pSamples||pSamples.length<2){tmpHistContainer.style.display='none';return;}// Compute raw deltas per interval
let tmpRawDeltas=[];for(let i=1;i<pSamples.length;i++){let tmpDelta=pSamples[i].pushed-pSamples[i-1].pushed;if(tmpDelta<0)tmpDelta=0;tmpRawDeltas.push({delta:tmpDelta,t:pSamples[i].t});}// Downsample if too many bars
let tmpContainerWidth=tmpHistContainer.clientWidth||800;let tmpMaxBars=Math.max(20,Math.floor(tmpContainerWidth/6));let tmpAggregated=tmpRawDeltas;if(tmpRawDeltas.length>tmpMaxBars){let tmpBucketSize=Math.ceil(tmpRawDeltas.length/tmpMaxBars);tmpAggregated=[];for(let i=0;i<tmpRawDeltas.length;i+=tmpBucketSize){let tmpSum=0;let tmpLastT=0;for(let j=i;j<Math.min(i+tmpBucketSize,tmpRawDeltas.length);j++){tmpSum+=tmpRawDeltas[j].delta;tmpLastT=tmpRawDeltas[j].t;}tmpAggregated.push({delta:tmpSum,t:tmpLastT});}}// Check for data
let tmpHasData=false;for(let i=0;i<tmpAggregated.length;i++){if(tmpAggregated[i].delta>0){tmpHasData=true;break;}}if(!tmpHasData){tmpHistContainer.style.display='none';return;}// Build bins
let tmpStartT=pSamples[0].t;let tmpBins=[];for(let i=0;i<tmpAggregated.length;i++){let tmpElapsedSec=Math.round((tmpAggregated[i].t-tmpStartT)/1000);tmpBins.push({Label:this.formatElapsed(tmpElapsedSec),Value:tmpAggregated[i].delta});}// Update the histogram view
tmpHistContainer.style.display='';let tmpHistView=this.pict.views['ComprehensionLoader-StatusHistogram'];if(tmpHistView){tmpHistView.setBins(tmpBins);tmpHistView.renderHistogram();}}formatElapsed(pSec){if(pSec<60)return pSec+'s';if(pSec<3600){let tmpM=Math.floor(pSec/60);let tmpS=pSec%60;return tmpM+':'+(tmpS<10?'0':'')+tmpS;}let tmpH=Math.floor(pSec/3600);let tmpM=Math.floor(pSec%3600/60);return tmpH+'h'+(tmpM<10?'0':'')+tmpM;}formatCompact(pNum){if(pNum>=1000000)return(pNum/1000000).toFixed(1)+'M';if(pNum>=10000)return(pNum/1000).toFixed(0)+'K';if(pNum>=1000)return(pNum/1000).toFixed(1)+'K';return pNum.toString();}formatNumber(pNum){return pNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');}// ================================================================
// Auto-Process
// ================================================================
initAutoProcess(){let tmpSelf=this;this.api('GET','/comprehension_load/load/live-status').then(function(pData){if(pData.Phase==='loading'||pData.Phase==='stopping'){tmpSelf.pict.AppData.ComprehensionLoader.ServerBusyAtLoad=true;tmpSelf.setSectionPhase(4,'busy');tmpSelf.pict.views['ComprehensionLoader-Load'].startPolling();return;}tmpSelf.runAutoProcessChain();}).catch(function(){// Server unreachable — don't auto-process
});}runAutoProcessChain(){let tmpSelf=this;let tmpDelay=0;let tmpStepDelay=2000;if(document.getElementById('auto1')&&document.getElementById('auto1').checked){setTimeout(function(){tmpSelf.pict.views['ComprehensionLoader-Session'].goAction();},tmpDelay);tmpDelay+=tmpStepDelay+1500;}if(document.getElementById('auto2')&&document.getElementById('auto2').checked){setTimeout(function(){tmpSelf.pict.views['ComprehensionLoader-Schema'].fetchSchema();},tmpDelay);tmpDelay+=tmpStepDelay;}if(document.getElementById('auto3')&&document.getElementById('auto3').checked){setTimeout(function(){tmpSelf.pict.views['ComprehensionLoader-Source'].goAction();},tmpDelay);tmpDelay+=tmpStepDelay;}if(document.getElementById('auto4')&&document.getElementById('auto4').checked){setTimeout(function(){tmpSelf.pict.views['ComprehensionLoader-Load'].startLoad();},tmpDelay);}}}module.exports=ComprehensionLoaderProvider;module.exports.default_configuration={ProviderIdentifier:'ComprehensionLoader',AutoInitialize:true,AutoInitializeOrdinal:0};},{"pict-provider":12}],97:[function(require,module,exports){const libPictView=require('pict-view');class ComprehensionLoaderLayoutView extends libPictView{constructor(pFable,pOptions,pServiceHash){super(pFable,pOptions,pServiceHash);}onAfterRender(){// Render all section views into their containers
this.pict.views['ComprehensionLoader-Session'].render();this.pict.views['ComprehensionLoader-Schema'].render();this.pict.views['ComprehensionLoader-Source'].render();this.pict.views['ComprehensionLoader-Load'].render();this.pict.CSSMap.injectCSS();}toggleSection(pSectionId){let tmpCard=document.getElementById(pSectionId);if(!tmpCard)return;tmpCard.classList.toggle('open');}expandAllSections(){let tmpCards=document.querySelectorAll('.accordion-card');for(let i=0;i<tmpCards.length;i++){tmpCards[i].classList.add('open');}}collapseAllSections(){let tmpCards=document.querySelectorAll('.accordion-card');for(let i=0;i<tmpCards.length;i++){tmpCards[i].classList.remove('open');}}}module.exports=ComprehensionLoaderLayoutView;module.exports.default_configuration={ViewIdentifier:'ComprehensionLoader-Layout',DefaultRenderable:'ComprehensionLoader-Layout',DefaultDestinationAddress:'#ComprehensionLoader-Workspace',CSS:/*css*/`
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: var(--theme-color-background-secondary, #f5f5f5); color: var(--theme-color-text-primary, #333); padding: 20px; }
h1 { margin-bottom: 20px; color: var(--theme-color-text-primary, #1a1a1a); }
h2 { margin-bottom: 12px; color: var(--theme-color-text-secondary, #444); font-size: 1.2em; border-bottom: 2px solid var(--theme-color-border-default, #ddd); padding-bottom: 6px; }

.section { background: var(--theme-color-background-panel, #fff); border-radius: 8px; padding: 20px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }

/* Accordion layout */
.accordion-row { display: flex; gap: 0; margin-bottom: 16px; align-items: stretch; }
.accordion-number {
	flex: 0 0 48px; display: flex; align-items: flex-start; justify-content: center;
	padding-top: 16px; font-size: 1.6em; font-weight: 700; color: var(--theme-color-brand-primary, #4a90d9);
	user-select: none;
}
.accordion-card {
	flex: 1; background: var(--theme-color-background-panel, #fff); border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);
	overflow: hidden; min-width: 0;
}
.accordion-header {
	display: flex; align-items: center; padding: 14px 20px; cursor: pointer;
	user-select: none; gap: 12px; transition: background 0.15s; line-height: 1.4;
}
.accordion-header:hover { background: var(--theme-color-background-secondary, #fafafa); }
.accordion-title { font-weight: 600; color: var(--theme-color-text-primary, #333); font-size: 1.05em; white-space: nowrap; }
.accordion-preview { flex: 1; font-style: italic; color: var(--theme-color-text-muted, #888); font-size: 0.9em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
.accordion-toggle {
	flex: 0 0 20px; display: flex; align-items: center; justify-content: center;
	border-radius: 4px; transition: background 0.15s, transform 0.25s; font-size: 0.7em; color: var(--theme-color-text-muted, #888);
}
.accordion-header:hover .accordion-toggle { background: var(--theme-color-border-light, #eee); color: var(--theme-color-text-secondary, #555); }
.accordion-card.open .accordion-toggle { transform: rotate(180deg); }
.accordion-body { padding: 0 20px 20px; display: none; }
.accordion-card.open .accordion-body { display: block; }
.accordion-card.open .accordion-header { border-bottom: 1px solid var(--theme-color-border-light, #eee); }
.accordion-card.open .accordion-preview { display: none; }

/* Action controls (go link + auto checkbox) */
.accordion-actions { display: flex; align-items: baseline; gap: 8px; flex-shrink: 0; }
.accordion-card.open .accordion-actions { display: none; }
.accordion-go {
	font-size: 0.82em; color: var(--theme-color-brand-primary, #4a90d9); cursor: pointer; text-decoration: none;
	font-weight: 500; white-space: nowrap; padding: 2px 6px; border-radius: 3px;
	transition: background 0.15s;
}
.accordion-go:hover { background: var(--theme-color-background-hover, #e8f0fe); text-decoration: underline; }
.accordion-auto {
	font-size: 0.82em; color: var(--theme-color-text-muted, #999); white-space: nowrap; cursor: pointer;
}
.accordion-auto .auto-label { display: none; }
.accordion-auto:hover .auto-label { display: inline; }
.accordion-auto input[type="checkbox"] { width: auto; margin: 0; cursor: pointer; vertical-align: middle; position: relative; top: 0px; opacity: 0.75; transition: opacity 0.15s; }
.accordion-auto:hover input[type="checkbox"] { opacity: 1; }
.accordion-auto:hover { color: var(--theme-color-text-secondary, #666); }

/* Phase status indicator */
.accordion-phase {
	flex: 0 0 auto; display: none; align-items: center; justify-content: center;
	font-size: 0.85em; line-height: 1;
}
.accordion-phase.visible { display: flex; }
.accordion-phase-ok { color: var(--theme-color-status-success, #28a745); }
.accordion-phase-error { color: var(--theme-color-status-error, #dc3545); }
.accordion-phase-busy { color: var(--theme-color-status-success, #28a745); }
.accordion-phase-busy .phase-spinner {
	display: inline-block; width: 14px; height: 14px;
	border: 2px solid var(--theme-color-status-success, #28a745); border-top-color: transparent; border-radius: 50%;
	animation: phase-spin 0.8s linear infinite; vertical-align: middle;
}
@keyframes phase-spin {
	to { transform: rotate(360deg); }
}

.accordion-controls {
	display: flex; gap: 8px; margin-bottom: 12px; justify-content: flex-end;
}
.accordion-controls button {
	padding: 4px 10px; font-size: 0.82em; font-weight: 500; background: none;
	border: 1px solid var(--theme-color-border-default, #ccc); border-radius: 4px; color: var(--theme-color-text-secondary, #666); cursor: pointer; margin: 0;
}
.accordion-controls button:hover { background: var(--theme-color-background-tertiary, #f0f0f0); border-color: var(--theme-color-text-muted, #aaa); color: var(--theme-color-text-primary, #333); }

label { display: block; font-weight: 600; margin-bottom: 4px; font-size: 0.9em; }
input[type="text"], input[type="password"], input[type="number"] {
	width: 100%; padding: 8px 12px; border: 1px solid var(--theme-color-border-default, #ccc); border-radius: 4px;
	font-size: 0.95em; margin-bottom: 10px;
}
input[type="text"]:focus, input[type="password"]:focus, input[type="number"]:focus {
	outline: none; border-color: var(--theme-color-brand-primary, #4a90d9);
}

button {
	padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;
	font-size: 0.9em; font-weight: 600; margin-right: 8px; margin-bottom: 8px;
}
button.primary { background: var(--theme-color-brand-primary, #4a90d9); color: var(--theme-color-background-panel, #fff); }
button.primary:hover { background: var(--theme-color-brand-primary-hover, #357abd); }
button.secondary { background: var(--theme-color-text-secondary, #6c757d); color: var(--theme-color-background-panel, #fff); }
button.secondary:hover { background: #5a6268; }
button.danger { background: var(--theme-color-status-error, #dc3545); color: var(--theme-color-background-panel, #fff); }
button.danger:hover { background: #c82333; }
button.success { background: var(--theme-color-status-success, #28a745); color: var(--theme-color-background-panel, #fff); }
button.success:hover { background: #218838; }
button:disabled { opacity: 0.5; cursor: not-allowed; }

.status { padding: 8px 12px; border-radius: 4px; margin-top: 10px; font-size: 0.9em; }
.status.ok { background: #d4edda; color: #155724; }
.status.error { background: #f8d7da; color: #721c24; }
.status.info { background: #d1ecf1; color: #0c5460; }
.status.warn { background: #fff3cd; color: #856404; }

.inline-group { display: flex; gap: 8px; align-items: flex-end; margin-bottom: 10px; }
.inline-group > div { flex: 1; }

a { color: var(--theme-color-brand-primary, #4a90d9); }

select { background: var(--theme-color-background-panel, #fff); width: 100%; padding: 8px 12px; border: 1px solid var(--theme-color-border-default, #ccc); border-radius: 4px; font-size: 0.95em; margin-bottom: 10px; }

.checkbox-row { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
.checkbox-row input[type="checkbox"] { width: auto; margin: 0; }
.checkbox-row label { display: inline; margin: 0; font-weight: normal; cursor: pointer; }

/* Live Status Bar */
.live-status-bar {
	background: var(--theme-color-background-panel, #fff); border-radius: 8px; margin-bottom: 16px;
	box-shadow: 0 1px 3px rgba(0,0,0,0.1);
	position: sticky; top: 0; z-index: 100; border-left: 4px solid var(--theme-color-text-secondary, #6c757d);
}
.live-status-bar.phase-idle { border-left-color: var(--theme-color-text-secondary, #6c757d); }
.live-status-bar.phase-disconnected { border-left-color: var(--theme-color-status-error, #dc3545); }
.live-status-bar.phase-ready { border-left-color: var(--theme-color-brand-primary, #4a90d9); }
.live-status-bar.phase-loading { border-left-color: var(--theme-color-status-success, #28a745); }
.live-status-bar.phase-stopping { border-left-color: var(--theme-color-status-warning, #ffc107); }
.live-status-bar.phase-complete { border-left-color: var(--theme-color-status-success, #28a745); }

.live-status-dot {
	width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0;
	background: var(--theme-color-text-secondary, #6c757d);
}
.live-status-bar.phase-idle .live-status-dot { background: var(--theme-color-text-secondary, #6c757d); }
.live-status-bar.phase-disconnected .live-status-dot { background: var(--theme-color-status-error, #dc3545); }
.live-status-bar.phase-ready .live-status-dot { background: var(--theme-color-brand-primary, #4a90d9); }
.live-status-bar.phase-loading .live-status-dot {
	background: var(--theme-color-status-success, #28a745);
	animation: live-pulse 1.5s ease-in-out infinite;
}
.live-status-bar.phase-stopping .live-status-dot {
	background: var(--theme-color-status-warning, #ffc107);
	animation: live-pulse 0.8s ease-in-out infinite;
}
.live-status-bar.phase-complete .live-status-dot { background: var(--theme-color-status-success, #28a745); }

@keyframes live-pulse {
	0%, 100% { opacity: 1; transform: scale(1); }
	50% { opacity: 0.4; transform: scale(0.8); }
}

.live-status-message { flex: 1; font-size: 0.92em; color: var(--theme-color-text-primary, #333); line-height: 1.4; }

.live-status-meta {
	display: flex; gap: 16px; flex-shrink: 0; font-size: 0.82em; color: var(--theme-color-text-secondary, #666);
}
.live-status-meta-item { white-space: nowrap; }
.live-status-meta-item strong { color: var(--theme-color-text-primary, #333); }

.live-status-progress-bar {
	height: 3px; background: var(--theme-color-background-tertiary, #e9ecef); border-radius: 2px; overflow: hidden;
	position: absolute; bottom: 0; left: 0; right: 0;
}
.live-status-progress-fill {
	height: 100%; background: var(--theme-color-status-success, #28a745); transition: width 1s ease;
}
/* Expandable status bar */
.live-status-header {
	display: flex; align-items: center; gap: 14px; cursor: pointer;
	padding: 14px 20px; user-select: none;
}
.live-status-bar.expanded .live-status-header {
	border-bottom: 1px solid var(--theme-color-background-tertiary, #e9ecef); padding-bottom: 10px;
}
.live-status-expand-toggle {
	flex: 0 0 20px; display: flex; align-items: center; justify-content: center;
	font-size: 0.7em; color: var(--theme-color-text-muted, #888); transition: transform 0.25s;
}
.live-status-bar.expanded .live-status-expand-toggle { transform: rotate(180deg); }

.live-status-detail {
	padding: 12px 20px 16px; max-height: 60vh; overflow-y: auto;
}

/* Status Detail Sections */
.status-detail-section { margin-bottom: 14px; }
.status-detail-section:last-child { margin-bottom: 0; }
.status-detail-section-title {
	font-size: 0.85em; font-weight: 600; color: var(--theme-color-text-secondary, #555); text-transform: uppercase;
	letter-spacing: 0.5px; margin-bottom: 8px; padding-bottom: 4px;
	border-bottom: 1px solid var(--theme-color-border-light, #eee);
}

/* Running Operations */
.running-op-row {
	display: flex; align-items: center; gap: 12px; padding: 6px 0;
	font-size: 0.9em;
}
.running-op-name { font-weight: 600; min-width: 180px; }
.running-op-bar {
	flex: 1; height: 8px; background: var(--theme-color-background-tertiary, #e9ecef); border-radius: 4px; overflow: hidden;
	min-width: 120px;
}
.running-op-bar-fill { height: 100%; background: var(--theme-color-brand-primary, #4a90d9); transition: width 0.5s ease; }
.running-op-count { font-size: 0.85em; color: var(--theme-color-text-secondary, #666); white-space: nowrap; }
.running-op-pending { color: var(--theme-color-text-muted, #888); font-size: 0.85em; font-style: italic; padding: 4px 0; }

/* Completed Operations */
.completed-op-row { padding: 8px 0; border-bottom: 1px solid var(--theme-color-background-tertiary, #f0f0f0); }
.completed-op-row:last-child { border-bottom: none; }
.completed-op-header {
	display: flex; align-items: center; gap: 10px; font-size: 0.9em; margin-bottom: 4px;
}
.completed-op-name { font-weight: 600; }
.completed-op-stats { color: var(--theme-color-text-secondary, #666); font-size: 0.85em; }
.completed-op-checkmark { color: var(--theme-color-status-success, #28a745); }

/* Error Operations */
.error-op-row { padding: 6px 0; border-bottom: 1px solid var(--theme-color-background-tertiary, #f0f0f0); font-size: 0.9em; }
.error-op-row:last-child { border-bottom: none; }
.error-op-header { display: flex; align-items: center; gap: 8px; }
.error-op-name { font-weight: 600; color: var(--theme-color-status-error, #dc3545); }
.error-op-status { font-size: 0.82em; color: var(--theme-color-status-error, #dc3545); }
.error-op-message { font-size: 0.82em; color: var(--theme-color-text-muted, #888); margin-top: 2px; padding-left: 18px; }
`,Templates:[{Hash:'ComprehensionLoader-Layout',Template:/*html*/`
<h1>Retold Comprehension Loader</h1>

<!-- Expand / Collapse All -->
<div class="accordion-controls">
	<button onclick="pict.views['ComprehensionLoader-Layout'].expandAllSections()">Expand All</button>
	<button onclick="pict.views['ComprehensionLoader-Layout'].collapseAllSections()">Collapse All</button>
</div>

<!-- Section containers -->
<div id="ComprehensionLoader-Section-Session"></div>
<div id="ComprehensionLoader-Section-Schema"></div>
<div id="ComprehensionLoader-Section-Source"></div>
<div id="ComprehensionLoader-Section-Load"></div>
`}],Renderables:[{RenderableHash:'ComprehensionLoader-Layout',TemplateHash:'ComprehensionLoader-Layout',DestinationAddress:'#ComprehensionLoader-Workspace'}]};},{"pict-view":89}],98:[function(require,module,exports){const libPictView=require('pict-view');class ComprehensionLoaderLoadView extends libPictView{constructor(pFable,pOptions,pServiceHash){super(pFable,pOptions,pServiceHash);}startLoad(){this.pict.providers.ComprehensionLoader.setSectionPhase(4,'busy');this.pict.providers.ComprehensionLoader.setStatus('loadStatus','Starting load...','info');// Clear previous report
this.pict.AppData.ComprehensionLoader.LastReport=null;let tmpSelf=this;this.pict.providers.ComprehensionLoader.api('POST','/comprehension_load/load/start').then(function(pData){if(pData.Success){let tmpMsg='Load started for '+pData.Entities.length+' entities ('+tmpSelf.pict.providers.ComprehensionLoader.formatNumber(pData.TotalRecords)+' records).';tmpSelf.pict.providers.ComprehensionLoader.setStatus('loadStatus',tmpMsg,'ok');tmpSelf.startPolling();}else{tmpSelf.pict.providers.ComprehensionLoader.setStatus('loadStatus','Load start failed: '+(pData.Error||'Unknown error'),'error');tmpSelf.pict.providers.ComprehensionLoader.setSectionPhase(4,'error');}}).catch(function(pError){tmpSelf.pict.providers.ComprehensionLoader.setStatus('loadStatus','Request failed: '+pError.message,'error');tmpSelf.pict.providers.ComprehensionLoader.setSectionPhase(4,'error');});}stopLoad(){let tmpSelf=this;this.pict.providers.ComprehensionLoader.api('POST','/comprehension_load/load/stop').then(function(pData){tmpSelf.pict.providers.ComprehensionLoader.setStatus('loadStatus','Load stop requested.','warn');}).catch(function(pError){tmpSelf.pict.providers.ComprehensionLoader.setStatus('loadStatus','Request failed: '+pError.message,'error');});}startPolling(){if(this.pict.AppData.ComprehensionLoader.LoadPollTimer)clearInterval(this.pict.AppData.ComprehensionLoader.LoadPollTimer);let tmpSelf=this;this.pict.AppData.ComprehensionLoader.LoadPollTimer=setInterval(function(){tmpSelf.pollLoadStatus();},2000);this.pollLoadStatus();}stopPolling(){if(this.pict.AppData.ComprehensionLoader.LoadPollTimer){clearInterval(this.pict.AppData.ComprehensionLoader.LoadPollTimer);this.pict.AppData.ComprehensionLoader.LoadPollTimer=null;}}pollLoadStatus(){let tmpSelf=this;this.pict.providers.ComprehensionLoader.api('GET','/comprehension_load/load/status').then(function(pData){tmpSelf.renderLoadProgress(pData);if(!pData.Running){tmpSelf.stopPolling();let tmpEntities=pData.Entities||{};let tmpNames=Object.keys(tmpEntities);if(tmpNames.length>0){let tmpHasErrors=false;for(let i=0;i<tmpNames.length;i++){if(tmpEntities[tmpNames[i]].Status==='Error')tmpHasErrors=true;}if(tmpHasErrors){tmpSelf.pict.providers.ComprehensionLoader.setStatus('loadStatus','Load finished with errors.','error');tmpSelf.pict.providers.ComprehensionLoader.setSectionPhase(4,'error');}else{tmpSelf.pict.providers.ComprehensionLoader.setStatus('loadStatus','Load complete.','ok');tmpSelf.pict.providers.ComprehensionLoader.setSectionPhase(4,'ok');}// Fetch the structured report
tmpSelf.fetchLoadReport();}}}).catch(function(pError){// Silently ignore poll errors
});}fetchLoadReport(){let tmpSelf=this;this.pict.providers.ComprehensionLoader.api('GET','/comprehension_load/load/report').then(function(pData){if(pData&&pData.ReportVersion){tmpSelf.pict.AppData.ComprehensionLoader.LastReport=pData;tmpSelf.renderLoadReport(pData);}}).catch(function(pError){// Ignore report fetch errors
});}renderLoadReport(pReport){let tmpSection=document.getElementById('loadReportSection');if(!tmpSection)return;tmpSection.style.display='';let tmpCardsContainer=document.getElementById('reportSummaryCards');let tmpOutcomeClass='outcome-'+pReport.Outcome.toLowerCase();let tmpOutcomeColor={Success:'var(--theme-color-status-success, #28a745)',Partial:'var(--theme-color-status-warning, #ffc107)',Error:'var(--theme-color-status-error, #dc3545)',Stopped:'var(--theme-color-text-secondary, #6c757d)'}[pReport.Outcome]||'var(--theme-color-text-secondary, #666)';let tmpDurationSec=pReport.RunTimestamps.DurationSeconds||0;let tmpDurationStr=tmpDurationSec<60?tmpDurationSec+'s':Math.floor(tmpDurationSec/60)+'m '+tmpDurationSec%60+'s';let tmpTotalPushed=this.pict.providers.ComprehensionLoader.formatNumber(pReport.Summary.TotalPushed);let tmpTotalRecords=this.pict.providers.ComprehensionLoader.formatNumber(pReport.Summary.TotalRecords);tmpCardsContainer.innerHTML=''+'<div class="report-card '+tmpOutcomeClass+'">'+'  <div class="card-label">Outcome</div>'+'  <div class="card-value" style="color:'+tmpOutcomeColor+'">'+pReport.Outcome+'</div>'+'</div>'+'<div class="report-card">'+'  <div class="card-label">Duration</div>'+'  <div class="card-value">'+tmpDurationStr+'</div>'+'</div>'+'<div class="report-card">'+'  <div class="card-label">Entities</div>'+'  <div class="card-value">'+pReport.Summary.Complete+' / '+pReport.Summary.TotalEntities+'</div>'+'</div>'+'<div class="report-card">'+'  <div class="card-label">Records Pushed</div>'+'  <div class="card-value">'+tmpTotalPushed+'</div>'+'  <div style="font-size:0.75em; color:var(--theme-color-text-muted, #888)">of '+tmpTotalRecords+'</div>'+'</div>';// Anomalies
let tmpAnomalyContainer=document.getElementById('reportAnomalies');if(pReport.Anomalies.length===0){tmpAnomalyContainer.innerHTML='<div style="color:var(--theme-color-status-success, #28a745); font-weight:600; font-size:0.9em">No anomalies detected.</div>';}else{let tmpHtml='<h4 style="margin:0 0 8px; color:var(--theme-color-status-error, #dc3545); font-size:0.95em">Anomalies ('+pReport.Anomalies.length+')</h4>';tmpHtml+='<table class="progress-table">';tmpHtml+='<tr><th>Entity</th><th>Type</th><th>Message</th></tr>';for(let i=0;i<pReport.Anomalies.length;i++){let tmpAnomaly=pReport.Anomalies[i];let tmpTypeColor=tmpAnomaly.Type==='Error'?'var(--theme-color-status-error, #dc3545)':'var(--theme-color-text-secondary, #6c757d)';tmpHtml+='<tr>';tmpHtml+='<td><strong>'+this.pict.providers.ComprehensionLoader.escapeHtml(tmpAnomaly.Entity)+'</strong></td>';tmpHtml+='<td style="color:'+tmpTypeColor+'">'+tmpAnomaly.Type+'</td>';tmpHtml+='<td>'+this.pict.providers.ComprehensionLoader.escapeHtml(tmpAnomaly.Message)+'</td>';tmpHtml+='</tr>';}tmpHtml+='</table>';tmpAnomalyContainer.innerHTML=tmpHtml;}// Entity details
let tmpEntityContainer=document.getElementById('reportEntityDetails');if(pReport.Entities&&pReport.Entities.length>0){let tmpHtml='<h4 style="margin:0 0 8px; font-size:0.95em; color:var(--theme-color-text-secondary, #444)">Entity Details</h4>';tmpHtml+='<table class="progress-table">';tmpHtml+='<tr><th>Entity</th><th>Duration</th><th>Records</th><th>Status</th></tr>';for(let i=0;i<pReport.Entities.length;i++){let tmpEntity=pReport.Entities[i];let tmpDur=tmpEntity.DurationSeconds<60?tmpEntity.DurationSeconds+'s':Math.floor(tmpEntity.DurationSeconds/60)+'m '+tmpEntity.DurationSeconds%60+'s';let tmpRecs=this.pict.providers.ComprehensionLoader.formatNumber(tmpEntity.Pushed);let tmpStatusColor={Complete:'var(--theme-color-status-success, #28a745)',Error:'var(--theme-color-status-error, #dc3545)'}[tmpEntity.Status]||'var(--theme-color-text-secondary, #666)';tmpHtml+='<tr>';tmpHtml+='<td><strong>'+this.pict.providers.ComprehensionLoader.escapeHtml(tmpEntity.Name)+'</strong></td>';tmpHtml+='<td>'+tmpDur+'</td>';tmpHtml+='<td>'+tmpRecs+'</td>';tmpHtml+='<td style="color:'+tmpStatusColor+'">'+tmpEntity.Status+'</td>';tmpHtml+='</tr>';}tmpHtml+='</table>';tmpEntityContainer.innerHTML=tmpHtml;}}downloadReport(){if(!this.pict.AppData.ComprehensionLoader.LastReport){this.pict.providers.ComprehensionLoader.setStatus('reportStatus','No report available.','warn');return;}let tmpJson=JSON.stringify(this.pict.AppData.ComprehensionLoader.LastReport,null,'\t');let tmpBlob=new Blob([tmpJson],{type:'application/json'});let tmpAnchor=document.createElement('a');tmpAnchor.href=URL.createObjectURL(tmpBlob);let tmpTimestamp=new Date().toISOString().replace(/[:.]/g,'-').slice(0,19);tmpAnchor.download='ComprehensionLoader-Report-'+tmpTimestamp+'.json';tmpAnchor.click();URL.revokeObjectURL(tmpAnchor.href);this.pict.providers.ComprehensionLoader.setStatus('reportStatus','Report downloaded.','ok');}copyReport(){if(!this.pict.AppData.ComprehensionLoader.LastReport){this.pict.providers.ComprehensionLoader.setStatus('reportStatus','No report available.','warn');return;}let tmpJson=JSON.stringify(this.pict.AppData.ComprehensionLoader.LastReport,null,'\t');let tmpSelf=this;navigator.clipboard.writeText(tmpJson).then(function(){tmpSelf.pict.providers.ComprehensionLoader.setStatus('reportStatus','Report copied to clipboard.','ok');});}renderLoadProgress(pData){let tmpContainer=document.getElementById('loadProgress');let tmpEntities=pData.Entities||{};let tmpEntityNames=Object.keys(tmpEntities);if(tmpEntityNames.length===0){tmpContainer.innerHTML='';return;}let tmpPushing=[];let tmpPending=[];let tmpCompleted=[];let tmpErrors=[];for(let i=0;i<tmpEntityNames.length;i++){let tmpName=tmpEntityNames[i];let tmpEntity=tmpEntities[tmpName];if(tmpEntity.Status==='Pushing'){tmpPushing.push({Name:tmpName,Data:tmpEntity});}else if(tmpEntity.Status==='Pending'){tmpPending.push({Name:tmpName,Data:tmpEntity});}else if(tmpEntity.Status==='Complete'){tmpCompleted.push({Name:tmpName,Data:tmpEntity});}else{tmpErrors.push({Name:tmpName,Data:tmpEntity});}}let tmpHtml='';let tmpSelf=this;let fRenderRow=function(pName,pEntity){let tmpPct=0;if(pEntity.Total===0&&pEntity.Status==='Complete'){tmpPct=100;}else if(pEntity.Total>0){tmpPct=Math.round(pEntity.Pushed/pEntity.Total*100);}let tmpBarColor='var(--theme-color-status-success, #28a745)';if(pEntity.Status==='Error')tmpBarColor='var(--theme-color-status-error, #dc3545)';else if(pEntity.Status==='Pushing')tmpBarColor='var(--theme-color-brand-primary, #4a90d9)';else if(pEntity.Status==='Pending')tmpBarColor='var(--theme-color-text-muted, #adb5bd)';let tmpRow='<tr>';tmpRow+='<td><strong>'+pName+'</strong></td>';tmpRow+='<td>'+pEntity.Status+'</td>';tmpRow+='<td>';tmpRow+='<div class="progress-bar-container"><div class="progress-bar-fill" style="width:'+tmpPct+'%; background:'+tmpBarColor+'"></div></div>';tmpRow+=' '+tmpPct+'%';tmpRow+='</td>';tmpRow+='<td>'+(pEntity.Pushed||0)+' / '+(pEntity.Total||0)+'</td>';tmpRow+='</tr>';return tmpRow;};if(tmpPushing.length>0){tmpHtml+='<div class="sync-section-header">Pushing</div>';tmpHtml+='<table class="progress-table">';tmpHtml+='<tr><th>Entity</th><th>Status</th><th>Progress</th><th>Pushed</th></tr>';for(let i=0;i<tmpPushing.length;i++){tmpHtml+=fRenderRow(tmpPushing[i].Name,tmpPushing[i].Data);}tmpHtml+='</table>';}if(tmpPending.length>0){tmpHtml+='<div class="sync-section-header">Next Up <span class="sync-section-count">'+tmpPending.length+'</span></div>';let tmpShowCount=Math.min(8,tmpPending.length);tmpHtml+='<table class="progress-table progress-table-muted">';for(let i=0;i<tmpShowCount;i++){tmpHtml+='<tr><td>'+tmpPending[i].Name+'</td>';if(tmpPending[i].Data.Total>0){tmpHtml+='<td class="sync-pending-count">'+tmpSelf.pict.providers.ComprehensionLoader.formatNumber(tmpPending[i].Data.Total)+' records</td>';}else{tmpHtml+='<td class="sync-pending-count">\u2014</td>';}tmpHtml+='</tr>';}tmpHtml+='</table>';if(tmpPending.length>tmpShowCount){tmpHtml+='<div class="sync-section-overflow">+ '+(tmpPending.length-tmpShowCount)+' more</div>';}}if(tmpErrors.length>0){tmpHtml+='<div class="sync-section-header sync-section-header-error">Errors <span class="sync-section-count">'+tmpErrors.length+'</span></div>';tmpHtml+='<table class="progress-table">';tmpHtml+='<tr><th>Entity</th><th>Status</th><th>Progress</th><th>Pushed</th></tr>';for(let i=0;i<tmpErrors.length;i++){tmpHtml+=fRenderRow(tmpErrors[i].Name,tmpErrors[i].Data);}tmpHtml+='</table>';}if(tmpCompleted.length>0){tmpHtml+='<div class="sync-section-header sync-section-header-ok">Completed <span class="sync-section-count">'+tmpCompleted.length+'</span></div>';tmpHtml+='<table class="progress-table">';tmpHtml+='<tr><th>Entity</th><th>Status</th><th>Progress</th><th>Pushed</th></tr>';for(let i=0;i<tmpCompleted.length;i++){tmpHtml+=fRenderRow(tmpCompleted[i].Name,tmpCompleted[i].Data);}tmpHtml+='</table>';}tmpContainer.innerHTML=tmpHtml;}}module.exports=ComprehensionLoaderLoadView;module.exports.default_configuration={ViewIdentifier:'ComprehensionLoader-Load',DefaultRenderable:'ComprehensionLoader-Load',DefaultDestinationAddress:'#ComprehensionLoader-Section-Load',CSS:/*css*/`
.progress-table { width: 100%; border-collapse: collapse; margin-top: 4px; margin-bottom: 4px; }
.progress-table th, .progress-table td { text-align: left; padding: 6px 12px; border-bottom: 1px solid var(--theme-color-border-light, #eee); font-size: 0.9em; }
.progress-table th { background: var(--theme-color-background-secondary, #f8f9fa); font-weight: 600; }
.progress-table-muted td { color: var(--theme-color-text-muted, #888); padding: 3px 12px; font-size: 0.85em; border-bottom: 1px solid var(--theme-color-background-secondary, #f4f5f6); }
.progress-bar-container { width: 120px; height: 16px; background: var(--theme-color-background-tertiary, #e9ecef); border-radius: 8px; overflow: hidden; display: inline-block; vertical-align: middle; }
.progress-bar-fill { height: 100%; background: var(--theme-color-status-success, #28a745); transition: width 0.3s; }
.sync-section-header { font-size: 0.8em; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--theme-color-brand-primary, #4a90d9); padding: 10px 0 2px 0; margin-top: 6px; border-top: 1px solid var(--theme-color-border-default, #e0e0e0); }
.sync-section-header:first-child { border-top: none; margin-top: 10px; }
.sync-section-header-error { color: var(--theme-color-status-error, #dc3545); }
.sync-section-header-ok { color: var(--theme-color-status-success, #28a745); }
.sync-section-count { font-weight: 400; color: var(--theme-color-text-muted, #999); font-size: 0.95em; }
.sync-section-overflow { font-size: 0.8em; color: var(--theme-color-text-muted, #aaa); padding: 2px 12px 6px; }
.sync-pending-count { text-align: right; color: var(--theme-color-text-muted, #aaa); font-size: 0.85em; }
.report-card { background: var(--theme-color-background-secondary, #f8f9fa); border-radius: 8px; padding: 12px 16px; min-width: 140px; text-align: center; border: 1px solid var(--theme-color-background-tertiary, #e9ecef); }
.report-card .card-label { font-size: 0.8em; color: var(--theme-color-text-secondary, #666); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
.report-card .card-value { font-size: 1.4em; font-weight: 700; }
.report-card.outcome-success { border-left: 4px solid var(--theme-color-status-success, #28a745); }
.report-card.outcome-partial { border-left: 4px solid var(--theme-color-status-warning, #ffc107); }
.report-card.outcome-error { border-left: 4px solid var(--theme-color-status-error, #dc3545); }
.report-card.outcome-stopped { border-left: 4px solid var(--theme-color-text-secondary, #6c757d); }
`,Templates:[{Hash:'ComprehensionLoader-Load',Template:/*html*/`
<div class="accordion-row">
	<div class="accordion-number">4</div>
	<div class="accordion-card" id="section4" data-section="4">
		<div class="accordion-header" onclick="pict.views['ComprehensionLoader-Layout'].toggleSection('section4')">
			<div class="accordion-title">Load</div>
			<span class="accordion-phase" id="phase4"></span>
			<div class="accordion-preview" id="preview4">Push comprehension data to the remote server</div>
			<div class="accordion-actions">
				<span class="accordion-go" onclick="event.stopPropagation(); pict.views['ComprehensionLoader-Load'].startLoad()">go</span>
				<label class="accordion-auto" onclick="event.stopPropagation()"><input type="checkbox" id="auto4"> <span class="auto-label">auto</span></label>
			</div>
			<div class="accordion-toggle">&#9660;</div>
		</div>
		<div class="accordion-body">
			<div style="display:flex; gap:8px; margin-bottom:10px">
				<button class="success" style="margin:0" onclick="pict.views['ComprehensionLoader-Load'].startLoad()">Start Load</button>
				<button class="danger" style="margin:0" onclick="pict.views['ComprehensionLoader-Load'].stopLoad()">Stop Load</button>
			</div>

			<div id="loadStatus"></div>
			<div id="loadProgress"></div>

			<!-- Load Report (appears after load completes) -->
			<div id="loadReportSection" style="display:none; margin-top:16px; padding-top:16px; border-top:2px solid var(--theme-color-border-default, #ddd)">
				<h3 style="margin:0 0 12px; font-size:1.1em">Load Report</h3>

				<div id="reportSummaryCards" style="display:flex; gap:12px; flex-wrap:wrap; margin-bottom:16px"></div>
				<div id="reportAnomalies" style="margin-bottom:16px"></div>
				<div id="reportEntityDetails" style="margin-bottom:16px"></div>

				<div style="display:flex; gap:8px">
					<button class="secondary" onclick="pict.views['ComprehensionLoader-Load'].downloadReport()">Download Report JSON</button>
					<button class="secondary" onclick="pict.views['ComprehensionLoader-Load'].copyReport()">Copy Report</button>
				</div>
				<div id="reportStatus"></div>
			</div>
		</div>
	</div>
</div>
`}],Renderables:[{RenderableHash:'ComprehensionLoader-Load',TemplateHash:'ComprehensionLoader-Load',DestinationAddress:'#ComprehensionLoader-Section-Load'}]};},{"pict-view":89}],99:[function(require,module,exports){const libPictView=require('pict-view');class ComprehensionLoaderSchemaView extends libPictView{constructor(pFable,pOptions,pServiceHash){super(pFable,pOptions,pServiceHash);}fetchSchema(){let tmpSchemaURL=document.getElementById('schemaURL').value.trim();let tmpBody={};if(tmpSchemaURL){tmpBody.SchemaURL=tmpSchemaURL;}this.pict.providers.ComprehensionLoader.setSectionPhase(2,'busy');this.pict.providers.ComprehensionLoader.setStatus('schemaStatus','Fetching schema...','info');this.pict.providers.ComprehensionLoader.api('POST','/comprehension_load/schema/fetch',tmpBody).then(pData=>{if(pData.Success){this.pict.AppData.ComprehensionLoader.FetchedEntities=pData.Entities||[];this.pict.providers.ComprehensionLoader.setStatus('schemaStatus','Fetched schema with '+pData.EntityCount+' entities from '+pData.SchemaURL,'ok');this.pict.providers.ComprehensionLoader.setSectionPhase(2,'ok');this.renderEntityList();this.pict.providers.ComprehensionLoader.updateAllPreviews();}else{this.pict.providers.ComprehensionLoader.setStatus('schemaStatus','Fetch failed: '+(pData.Error||'Unknown error'),'error');this.pict.providers.ComprehensionLoader.setSectionPhase(2,'error');}}).catch(pError=>{this.pict.providers.ComprehensionLoader.setStatus('schemaStatus','Request failed: '+pError.message,'error');this.pict.providers.ComprehensionLoader.setSectionPhase(2,'error');});}renderEntityList(){let tmpEntities=this.pict.AppData.ComprehensionLoader.FetchedEntities||[];let tmpContainer=document.getElementById('entityList');if(!tmpContainer)return;if(tmpEntities.length===0){tmpContainer.innerHTML='<div style="color:var(--theme-color-text-muted, #888); font-size:0.9em">No entities found.</div>';return;}let tmpHtml='<div style="font-size:0.9em; color:var(--theme-color-text-secondary, #555)">';for(let i=0;i<tmpEntities.length;i++){tmpHtml+='<span style="display:inline-block; background:var(--theme-color-background-tertiary, #f0f0f0); border-radius:4px; padding:2px 8px; margin:2px 4px 2px 0; font-size:0.9em">';tmpHtml+=this.pict.providers.ComprehensionLoader.escapeHtml(tmpEntities[i]);tmpHtml+='</span>';}tmpHtml+='</div>';tmpContainer.innerHTML=tmpHtml;}}module.exports=ComprehensionLoaderSchemaView;module.exports.default_configuration={ViewIdentifier:'ComprehensionLoader-Schema',DefaultRenderable:'ComprehensionLoader-Schema',DefaultDestinationAddress:'#ComprehensionLoader-Section-Schema',Templates:[{Hash:'ComprehensionLoader-Schema',Template:/*html*/`
<div class="accordion-row">
	<div class="accordion-number">2</div>
	<div class="accordion-card" id="section2" data-section="2">
		<div class="accordion-header" onclick="pict.views['ComprehensionLoader-Layout'].toggleSection('section2')">
			<div class="accordion-title">Remote Schema</div>
			<span class="accordion-phase" id="phase2"></span>
			<div class="accordion-preview" id="preview2">Fetch entity schema from the remote server</div>
			<div class="accordion-actions">
				<span class="accordion-go" onclick="event.stopPropagation(); pict.views['ComprehensionLoader-Schema'].fetchSchema()">go</span>
				<label class="accordion-auto" onclick="event.stopPropagation()"><input type="checkbox" id="auto2"> <span class="auto-label">auto</span></label>
			</div>
			<div class="accordion-toggle">&#9660;</div>
		</div>
		<div class="accordion-body">
			<label for="schemaURL">Schema URL (leave blank for default: ServerURL + Retold/Models)</label>
			<input type="text" id="schemaURL" placeholder="http://remote-server:8086/1.0/Retold/Models">

			<button class="primary" onclick="pict.views['ComprehensionLoader-Schema'].fetchSchema()">Fetch Schema</button>
			<div id="schemaStatus"></div>

			<div id="entityList" style="margin-top:12px"></div>
		</div>
	</div>
</div>
`}],Renderables:[{RenderableHash:'ComprehensionLoader-Schema',TemplateHash:'ComprehensionLoader-Schema',DestinationAddress:'#ComprehensionLoader-Section-Schema'}]};},{"pict-view":89}],100:[function(require,module,exports){const libPictView=require('pict-view');class ComprehensionLoaderSessionView extends libPictView{constructor(pFable,pOptions,pServiceHash){super(pFable,pOptions,pServiceHash);}configureSession(){let tmpServerURL=document.getElementById('serverURL').value.trim();if(!tmpServerURL){this.pict.providers.ComprehensionLoader.setStatus('sessionConfigStatus','Server URL is required.','error');return;}let tmpBody={ServerURL:tmpServerURL.replace(/\/+$/,'')+'/1.0/'};let tmpAuthMethod=document.getElementById('authMethod').value.trim();if(tmpAuthMethod){tmpBody.AuthenticationMethod=tmpAuthMethod;}let tmpAuthURI=document.getElementById('authURI').value.trim();if(tmpAuthURI){tmpBody.AuthenticationURITemplate=tmpAuthURI;}let tmpCheckURI=document.getElementById('checkURI').value.trim();if(tmpCheckURI){tmpBody.CheckSessionURITemplate=tmpCheckURI;}let tmpCookieName=document.getElementById('cookieName').value.trim();if(tmpCookieName){tmpBody.CookieName=tmpCookieName;}let tmpCookieValueAddr=document.getElementById('cookieValueAddr').value.trim();if(tmpCookieValueAddr){tmpBody.CookieValueAddress=tmpCookieValueAddr;}let tmpCookieValueTemplate=document.getElementById('cookieValueTemplate').value.trim();if(tmpCookieValueTemplate){tmpBody.CookieValueTemplate=tmpCookieValueTemplate;}let tmpLoginMarker=document.getElementById('loginMarker').value.trim();if(tmpLoginMarker){tmpBody.CheckSessionLoginMarker=tmpLoginMarker;}this.pict.providers.ComprehensionLoader.setStatus('sessionConfigStatus','Configuring session...','info');this.pict.providers.ComprehensionLoader.api('POST','/comprehension_load/session/configure',tmpBody).then(pData=>{if(pData.Success){this.pict.providers.ComprehensionLoader.setStatus('sessionConfigStatus','Session configured for '+pData.ServerURL+' (domain: '+pData.DomainMatch+')','ok');}else{this.pict.providers.ComprehensionLoader.setStatus('sessionConfigStatus','Configuration failed: '+(pData.Error||'Unknown error'),'error');}}).catch(pError=>{this.pict.providers.ComprehensionLoader.setStatus('sessionConfigStatus','Request failed: '+pError.message,'error');});}authenticate(){let tmpUserName=document.getElementById('userName').value.trim();let tmpPassword=document.getElementById('password').value.trim();if(!tmpUserName||!tmpPassword){this.pict.providers.ComprehensionLoader.setStatus('sessionAuthStatus','Username and password are required.','error');this.pict.providers.ComprehensionLoader.setSectionPhase(1,'error');return;}this.pict.providers.ComprehensionLoader.setSectionPhase(1,'busy');this.pict.providers.ComprehensionLoader.setStatus('sessionAuthStatus','Authenticating...','info');this.pict.providers.ComprehensionLoader.api('POST','/comprehension_load/session/authenticate',{UserName:tmpUserName,Password:tmpPassword}).then(pData=>{if(pData.Success&&pData.Authenticated){this.pict.providers.ComprehensionLoader.setStatus('sessionAuthStatus','Authenticated successfully.','ok');this.pict.providers.ComprehensionLoader.setSectionPhase(1,'ok');}else{this.pict.providers.ComprehensionLoader.setStatus('sessionAuthStatus','Authentication failed: '+(pData.Error||'Not authenticated'),'error');this.pict.providers.ComprehensionLoader.setSectionPhase(1,'error');}}).catch(pError=>{this.pict.providers.ComprehensionLoader.setStatus('sessionAuthStatus','Request failed: '+pError.message,'error');this.pict.providers.ComprehensionLoader.setSectionPhase(1,'error');});}checkSession(){this.pict.providers.ComprehensionLoader.setStatus('sessionAuthStatus','Checking session...','info');this.pict.providers.ComprehensionLoader.api('GET','/comprehension_load/session/check').then(pData=>{if(pData.Authenticated){this.pict.providers.ComprehensionLoader.setStatus('sessionAuthStatus','Session is active. Server: '+(pData.ServerURL||'N/A'),'ok');}else if(pData.Configured){this.pict.providers.ComprehensionLoader.setStatus('sessionAuthStatus','Session configured but not authenticated.','warn');}else{this.pict.providers.ComprehensionLoader.setStatus('sessionAuthStatus','No session configured.','warn');}}).catch(pError=>{this.pict.providers.ComprehensionLoader.setStatus('sessionAuthStatus','Request failed: '+pError.message,'error');});}deauthenticate(){this.pict.providers.ComprehensionLoader.api('POST','/comprehension_load/session/deauthenticate').then(pData=>{this.pict.providers.ComprehensionLoader.setStatus('sessionAuthStatus','Session deauthenticated.','info');this.pict.providers.ComprehensionLoader.setSectionPhase(1,'');}).catch(pError=>{this.pict.providers.ComprehensionLoader.setStatus('sessionAuthStatus','Request failed: '+pError.message,'error');});}goAction(){// Two-step: configure session, then authenticate after delay
this.pict.providers.ComprehensionLoader.setSectionPhase(1,'busy');this.configureSession();setTimeout(()=>{this.authenticate();},1500);}}module.exports=ComprehensionLoaderSessionView;module.exports.default_configuration={ViewIdentifier:'ComprehensionLoader-Session',DefaultRenderable:'ComprehensionLoader-Session',DefaultDestinationAddress:'#ComprehensionLoader-Section-Session',Templates:[{Hash:'ComprehensionLoader-Session',Template:/*html*/`
<div class="accordion-row">
	<div class="accordion-number">1</div>
	<div class="accordion-card" id="section1" data-section="1">
		<div class="accordion-header" onclick="pict.views['ComprehensionLoader-Layout'].toggleSection('section1')">
			<div class="accordion-title">Remote Session</div>
			<span class="accordion-phase" id="phase1"></span>
			<div class="accordion-preview" id="preview1">Configure remote server URL and credentials</div>
			<div class="accordion-actions">
				<span class="accordion-go" onclick="event.stopPropagation(); pict.views['ComprehensionLoader-Session'].goAction()">go</span>
				<label class="accordion-auto" onclick="event.stopPropagation()"><input type="checkbox" id="auto1"> <span class="auto-label">auto</span></label>
			</div>
			<div class="accordion-toggle">&#9660;</div>
		</div>
		<div class="accordion-body">
			<div class="inline-group">
				<div style="flex:2">
					<label for="serverURL">Remote Server URL</label>
					<input type="text" id="serverURL" placeholder="http://remote-server:8086" value="">
				</div>
				<div style="flex:1">
					<label for="authMethod">Auth Method</label>
					<input type="text" id="authMethod" placeholder="get" value="get">
				</div>
			</div>

			<details style="margin-bottom:10px">
				<summary style="cursor:pointer; font-size:0.9em; color:var(--theme-color-text-secondary, #666)">Advanced Session Options</summary>
				<div style="padding:10px 0">
					<label for="authURI">Authentication URI Template (leave blank for default)</label>
					<input type="text" id="authURI" placeholder="Authenticate/{~D:Record.UserName~}/{~D:Record.Password~}">
					<label for="checkURI">Check Session URI Template</label>
					<input type="text" id="checkURI" placeholder="CheckSession">
					<label for="cookieName">Cookie Name</label>
					<input type="text" id="cookieName" placeholder="SessionID" value="SessionID">
					<label for="cookieValueAddr">Cookie Value Address</label>
					<input type="text" id="cookieValueAddr" placeholder="SessionID" value="SessionID">
					<label for="cookieValueTemplate">Cookie Value Template (overrides Address if set)</label>
					<input type="text" id="cookieValueTemplate" placeholder="{~D:Record.SessionID~}">
					<label for="loginMarker">Login Marker</label>
					<input type="text" id="loginMarker" placeholder="LoggedIn" value="LoggedIn">
				</div>
			</details>

			<button class="primary" onclick="pict.views['ComprehensionLoader-Session'].configureSession()">Configure Session</button>
			<div id="sessionConfigStatus"></div>

			<hr style="margin:16px 0; border:none; border-top:1px solid var(--theme-color-border-light, #eee)">

			<div class="inline-group">
				<div>
					<label for="userName">Username</label>
					<input type="text" id="userName" placeholder="username">
				</div>
				<div>
					<label for="password">Password</label>
					<input type="password" id="password" placeholder="password">
				</div>
			</div>

			<button class="success" onclick="pict.views['ComprehensionLoader-Session'].authenticate()">Authenticate</button>
			<button class="secondary" onclick="pict.views['ComprehensionLoader-Session'].checkSession()">Check Session</button>
			<button class="danger" onclick="pict.views['ComprehensionLoader-Session'].deauthenticate()">Deauthenticate</button>
			<div id="sessionAuthStatus"></div>
		</div>
	</div>
</div>
`}],Renderables:[{RenderableHash:'ComprehensionLoader-Session',TemplateHash:'ComprehensionLoader-Session',DestinationAddress:'#ComprehensionLoader-Section-Session'}]};},{"pict-view":89}],101:[function(require,module,exports){'use strict';const libPictView=require('pict-view');class ComprehensionLoaderSettingsPanelView extends libPictView{onAfterRender(pRenderable,pAddress,pRecord,pContent){if(this.pict.CSSMap){this.pict.CSSMap.injectCSS();}// Re-mount theme controls on every render — the template wipes the destination div.
let tmpTheme=this.pict.providers&&this.pict.providers['Theme-Section'];if(tmpTheme&&typeof tmpTheme.mount==='function'){tmpTheme.mount({Container:'#ComprehensionLoader-Settings-Theme',Views:['Picker','ModeToggle','ScaleSelect']});}return super.onAfterRender(pRenderable,pAddress,pRecord,pContent);}}module.exports=ComprehensionLoaderSettingsPanelView;module.exports.default_configuration={ViewIdentifier:'ComprehensionLoader-SettingsPanel',DefaultRenderable:'ComprehensionLoader-SettingsPanel',DefaultDestinationAddress:'#ComprehensionLoader-Settings-Panel',AutoRender:false,CSS:/*css*/`
		.rds-settings-body {
			padding: 12px;
			display: flex; flex-direction: column; gap: 16px;
			color: var(--theme-color-text-primary, #333333);
		}
		.rds-settings-section { display: flex; flex-direction: column; gap: 6px; }
		.rds-settings-label {
			font-size: 0.85em;
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: 0.04em;
			color: var(--theme-color-text-secondary, #555555);
		}
	`,Templates:[{Hash:'ComprehensionLoader-SettingsPanel',Template:/*html*/`
<div class="rds-settings-body">
	<div class="rds-settings-section">
		<div class="rds-settings-label">Appearance</div>
		<div id="ComprehensionLoader-Settings-Theme"></div>
	</div>
</div>`}],Renderables:[{RenderableHash:'ComprehensionLoader-SettingsPanel',TemplateHash:'ComprehensionLoader-SettingsPanel',DestinationAddress:'#ComprehensionLoader-Settings-Panel'}]};},{"pict-view":89}],102:[function(require,module,exports){'use strict';const libPictView=require('pict-view');class ComprehensionLoaderShellView extends libPictView{constructor(pFable,pOptions,pServiceHash){super(pFable,pOptions,pServiceHash);this._shellPanelsBuilt=false;}onAfterRender(pRenderable,pAddress,pRecord,pContent){if(this.pict.CSSMap){this.pict.CSSMap.injectCSS();}if(!this._shellPanelsBuilt){this._buildShell();this._shellPanelsBuilt=true;}return super.onAfterRender(pRenderable,pAddress,pRecord,pContent);}_buildShell(){let tmpModal=this.pict.views['Pict-Section-Modal'];let tmpMount=document.getElementById('ComprehensionLoader-Shell-Mount');if(!tmpModal||typeof tmpModal.shell!=='function'||!tmpMount){this.log.warn('ComprehensionLoader-Shell: Pict-Section-Modal or mount not available; shell not built.');return;}this._shell=tmpModal.shell(tmpMount,{PersistenceKey:'comprehension-loader-shell'});// Top — Theme-TopBar (BrandMark + Nav + User slots)
this._shell.addPanel({Hash:'topbar',Side:'top',Mode:'fixed',Size:56,ContentDestinationId:'Theme-TopBar',ContentView:'Theme-TopBar'});// Bottom — Theme-BottomBar (StatusView slot)
this._shell.addPanel({Hash:'bottombar',Side:'bottom',Mode:'fixed',Size:36,ContentDestinationId:'Theme-BottomBar',ContentView:'Theme-BottomBar'});// Bottom (hidden overlay) — status detail expansion
this._shell.addPanel({Hash:'status-detail',Side:'bottom',Mode:'resizable',Position:'overlay',Size:320,MinSize:200,MaxSize:480,Hidden:true,Collapsed:true,Title:'Status Detail',ContentDestinationId:'ComprehensionLoader-StatusDetail-Panel',ContentView:'ComprehensionLoader-StatusDetail'});// Right (hidden overlay) — settings
this._shell.addPanel({Hash:'settings',Side:'right',Mode:'resizable',Position:'overlay',Size:360,MinSize:280,MaxSize:540,Hidden:true,Collapsed:true,Title:'Settings',ContentDestinationId:'ComprehensionLoader-Settings-Panel',ContentView:'ComprehensionLoader-SettingsPanel'});// Center — the workspace (existing Layout renders here)
this._shell.center({ContentDestinationId:'ComprehensionLoader-Workspace'});}getSettingsPanel(){return this._shell?this._shell.getPanel('settings'):null;}getStatusDetailPanel(){return this._shell?this._shell.getPanel('status-detail'):null;}toggleSettingsPanel(){let tmpPanel=this.getSettingsPanel();if(tmpPanel){tmpPanel.toggle();}}toggleStatusDetail(){let tmpPanel=this.getStatusDetailPanel();if(!tmpPanel){return;}tmpPanel.toggle();// Notify the provider so it can start/stop the higher-frequency detail poll.
let tmpProvider=this.pict.providers.ComprehensionLoader;let tmpOpen=!tmpPanel.Collapsed;if(tmpProvider&&tmpOpen&&typeof tmpProvider.onStatusDetailExpanded==='function'){tmpProvider.onStatusDetailExpanded();}else if(tmpProvider&&!tmpOpen&&typeof tmpProvider.onStatusDetailCollapsed==='function'){tmpProvider.onStatusDetailCollapsed();}}renderTopBar(){let tmpNav=this.pict.views['ComprehensionLoader-TopBar-Nav'];let tmpUser=this.pict.views['ComprehensionLoader-TopBar-User'];if(tmpNav){tmpNav.render();}if(tmpUser){tmpUser.render();}}}module.exports=ComprehensionLoaderShellView;module.exports.default_configuration={ViewIdentifier:'ComprehensionLoader-Shell',DefaultRenderable:'ComprehensionLoader-Shell',DefaultDestinationAddress:'#ComprehensionLoader-Application-Container',AutoRender:false,CSS:/*css*/`
		html, body { height: 100%; margin: 0; padding: 0; }
		body {
			background:  var(--theme-color-background-primary,   #f5f5f5);
			color:       var(--theme-color-text-primary,         #333333);
			font-family: var(--theme-typography-family-sans,
				-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif);
		}
		#ComprehensionLoader-Application-Container { height: 100%; min-height: 0; overflow: hidden; }
		.pict-modal-shell-host    { height: 100%; }
		.pict-modal-shell         { background: var(--theme-color-background-primary, #f5f5f5); }
		.pict-modal-shell-panel   { background: var(--theme-color-background-panel,   #ffffff); }
		.pict-modal-shell-center  {
			background: var(--theme-color-background-primary, #f5f5f5);
			overflow: auto;
			padding: 20px;
		}
	`,Templates:[{Hash:'ComprehensionLoader-Shell',Template:/*html*/`<div id="ComprehensionLoader-Shell-Mount" style="height:100%"></div>`}],Renderables:[{RenderableHash:'ComprehensionLoader-Shell',TemplateHash:'ComprehensionLoader-Shell',DestinationAddress:'#ComprehensionLoader-Application-Container'}]};},{"pict-view":89}],103:[function(require,module,exports){const libPictView=require('pict-view');class ComprehensionLoaderSourceView extends libPictView{constructor(pFable,pOptions,pServiceHash){super(pFable,pOptions,pServiceHash);}onAfterRender(){// Restore source mode and toggle UI
let tmpSourceMode=localStorage.getItem('comprehensionLoader_comprehensionSourceMode');if(tmpSourceMode==='file'){let tmpFileRadio=document.getElementById('sourceMode_file');if(tmpFileRadio)tmpFileRadio.checked=true;}this.onSourceModeChange();}onSourceModeChange(){let tmpMode=document.querySelector('input[name="comprehensionSourceMode"]:checked');let tmpModeName=tmpMode?tmpMode.value:'url';let tmpURLSection=document.getElementById('sourceURLSection');let tmpFileSection=document.getElementById('sourceFileSection');if(tmpURLSection)tmpURLSection.style.display=tmpModeName==='url'?'':'none';if(tmpFileSection)tmpFileSection.style.display=tmpModeName==='file'?'':'none';this.pict.providers.ComprehensionLoader.updateAllPreviews();}fetchFromURL(){let tmpURL=document.getElementById('comprehensionURL').value.trim();if(!tmpURL){this.pict.providers.ComprehensionLoader.setStatus('sourceStatus','Comprehension URL is required.','error');return;}this.pict.providers.ComprehensionLoader.setSectionPhase(3,'busy');this.pict.providers.ComprehensionLoader.setStatus('sourceStatus','Fetching comprehension...','info');let tmpSelf=this;// Try browser fetch first, fall back to server proxy on CORS failure
fetch(tmpURL).then(function(pResponse){if(!pResponse.ok)throw new Error('HTTP '+pResponse.status);return pResponse.json();}).then(function(pData){tmpSelf.sendComprehensionToServer(pData);}).catch(function(pError){// CORS or network error — try server-side proxy
tmpSelf.pict.providers.ComprehensionLoader.setStatus('sourceStatus','Direct fetch failed ('+pError.message+'), trying server proxy...','info');tmpSelf.pict.providers.ComprehensionLoader.api('POST','/comprehension_load/comprehension/proxy-fetch',{URL:tmpURL}).then(function(pProxyData){if(pProxyData.Success){tmpSelf.pict.providers.ComprehensionLoader.setStatus('sourceStatus','Loaded via proxy: '+pProxyData.EntityCount+' entities, '+tmpSelf.pict.providers.ComprehensionLoader.formatNumber(pProxyData.TotalRecords)+' records.','ok');tmpSelf.pict.providers.ComprehensionLoader.setSectionPhase(3,'ok');tmpSelf.renderComprehensionSummary(pProxyData);}else{tmpSelf.pict.providers.ComprehensionLoader.setStatus('sourceStatus','Proxy fetch failed: '+(pProxyData.Error||'Unknown error'),'error');tmpSelf.pict.providers.ComprehensionLoader.setSectionPhase(3,'error');}}).catch(function(pProxyError){tmpSelf.pict.providers.ComprehensionLoader.setStatus('sourceStatus','Proxy request failed: '+pProxyError.message,'error');tmpSelf.pict.providers.ComprehensionLoader.setSectionPhase(3,'error');});});}loadFromFiles(){let tmpFileInput=document.getElementById('comprehensionFiles');if(!tmpFileInput||tmpFileInput.files.length===0){this.pict.providers.ComprehensionLoader.setStatus('sourceStatus','Please select one or more JSON files.','error');return;}this.pict.providers.ComprehensionLoader.setSectionPhase(3,'busy');this.pict.providers.ComprehensionLoader.setStatus('sourceStatus','Reading files...','info');let tmpSelf=this;let tmpFiles=tmpFileInput.files;let tmpMergedData={};let tmpFilesRead=0;for(let i=0;i<tmpFiles.length;i++){(function(pFile){let tmpReader=new FileReader();tmpReader.onload=function(pEvent){try{let tmpParsed=JSON.parse(pEvent.target.result);// Merge entity keys from this file into the merged data
let tmpKeys=Object.keys(tmpParsed);for(let k=0;k<tmpKeys.length;k++){let tmpKey=tmpKeys[k];if(Array.isArray(tmpParsed[tmpKey])){if(!tmpMergedData[tmpKey]){tmpMergedData[tmpKey]=[];}tmpMergedData[tmpKey]=tmpMergedData[tmpKey].concat(tmpParsed[tmpKey]);}else{tmpMergedData[tmpKey]=tmpParsed[tmpKey];}}}catch(pParseError){tmpSelf.pict.providers.ComprehensionLoader.setStatus('sourceStatus','Error parsing '+pFile.name+': '+pParseError.message,'error');tmpSelf.pict.providers.ComprehensionLoader.setSectionPhase(3,'error');return;}tmpFilesRead++;if(tmpFilesRead===tmpFiles.length){// All files read — send merged comprehension to server
tmpSelf.sendComprehensionToServer(tmpMergedData);}};tmpReader.onerror=function(){tmpSelf.pict.providers.ComprehensionLoader.setStatus('sourceStatus','Error reading '+pFile.name,'error');tmpSelf.pict.providers.ComprehensionLoader.setSectionPhase(3,'error');};tmpReader.readAsText(pFile);})(tmpFiles[i]);}}sendComprehensionToServer(pData){let tmpSelf=this;this.pict.providers.ComprehensionLoader.api('POST','/comprehension_load/comprehension/receive',{Comprehension:pData}).then(function(pResult){if(pResult.Success){tmpSelf.pict.providers.ComprehensionLoader.setStatus('sourceStatus','Loaded: '+pResult.EntityCount+' entities, '+tmpSelf.pict.providers.ComprehensionLoader.formatNumber(pResult.TotalRecords)+' records.','ok');tmpSelf.pict.providers.ComprehensionLoader.setSectionPhase(3,'ok');tmpSelf.renderComprehensionSummary(pResult);}else{tmpSelf.pict.providers.ComprehensionLoader.setStatus('sourceStatus','Failed: '+(pResult.Error||'Unknown error'),'error');tmpSelf.pict.providers.ComprehensionLoader.setSectionPhase(3,'error');}}).catch(function(pError){tmpSelf.pict.providers.ComprehensionLoader.setStatus('sourceStatus','Request failed: '+pError.message,'error');tmpSelf.pict.providers.ComprehensionLoader.setSectionPhase(3,'error');});}renderComprehensionSummary(pResult){let tmpContainer=document.getElementById('comprehensionSummary');if(!tmpContainer)return;let tmpHtml='<table style="width:100%; border-collapse:collapse; margin-top:8px; font-size:0.9em">';tmpHtml+='<thead><tr><th style="text-align:left; padding:6px 12px; border-bottom:2px solid var(--theme-color-border-default, #ddd)">Entity</th>';tmpHtml+='<th style="text-align:right; padding:6px 12px; border-bottom:2px solid var(--theme-color-border-default, #ddd)">Records</th></tr></thead>';tmpHtml+='<tbody>';let tmpEntityList=pResult.EntityList||[];let tmpRecordCounts=pResult.RecordCounts||{};for(let i=0;i<tmpEntityList.length;i++){let tmpName=tmpEntityList[i];let tmpCount=tmpRecordCounts[tmpName]||0;tmpHtml+='<tr>';tmpHtml+='<td style="padding:4px 12px; border-bottom:1px solid var(--theme-color-background-tertiary, #f0f0f0)">'+this.pict.providers.ComprehensionLoader.escapeHtml(tmpName)+'</td>';tmpHtml+='<td style="padding:4px 12px; border-bottom:1px solid var(--theme-color-background-tertiary, #f0f0f0); text-align:right; font-variant-numeric:tabular-nums">'+this.pict.providers.ComprehensionLoader.formatNumber(tmpCount)+'</td>';tmpHtml+='</tr>';}tmpHtml+='</tbody>';tmpHtml+='<tfoot><tr>';tmpHtml+='<td style="padding:6px 12px; font-weight:600">Total</td>';tmpHtml+='<td style="padding:6px 12px; text-align:right; font-weight:600; font-variant-numeric:tabular-nums">'+this.pict.providers.ComprehensionLoader.formatNumber(pResult.TotalRecords)+'</td>';tmpHtml+='</tr></tfoot>';tmpHtml+='</table>';tmpContainer.innerHTML=tmpHtml;tmpContainer.style.display='';}clearComprehension(){let tmpSelf=this;this.pict.providers.ComprehensionLoader.api('POST','/comprehension_load/comprehension/clear').then(function(pData){if(pData.Success){tmpSelf.pict.providers.ComprehensionLoader.setStatus('sourceStatus','Comprehension data cleared.','info');tmpSelf.pict.providers.ComprehensionLoader.setSectionPhase(3,'');let tmpContainer=document.getElementById('comprehensionSummary');if(tmpContainer){tmpContainer.innerHTML='';tmpContainer.style.display='none';}}}).catch(function(pError){tmpSelf.pict.providers.ComprehensionLoader.setStatus('sourceStatus','Request failed: '+pError.message,'error');});}goAction(){let tmpMode=document.querySelector('input[name="comprehensionSourceMode"]:checked');let tmpModeName=tmpMode?tmpMode.value:'url';if(tmpModeName==='url'){this.fetchFromURL();}else{this.loadFromFiles();}}}module.exports=ComprehensionLoaderSourceView;module.exports.default_configuration={ViewIdentifier:'ComprehensionLoader-Source',DefaultRenderable:'ComprehensionLoader-Source',DefaultDestinationAddress:'#ComprehensionLoader-Section-Source',Templates:[{Hash:'ComprehensionLoader-Source',Template:/*html*/`
<div class="accordion-row">
	<div class="accordion-number">3</div>
	<div class="accordion-card" id="section3" data-section="3">
		<div class="accordion-header" onclick="pict.views['ComprehensionLoader-Layout'].toggleSection('section3')">
			<div class="accordion-title">Comprehension Source</div>
			<span class="accordion-phase" id="phase3"></span>
			<div class="accordion-preview" id="preview3">Provide a comprehension JSON URL or upload files</div>
			<div class="accordion-actions">
				<span class="accordion-go" onclick="event.stopPropagation(); pict.views['ComprehensionLoader-Source'].goAction()">go</span>
				<label class="accordion-auto" onclick="event.stopPropagation()"><input type="checkbox" id="auto3"> <span class="auto-label">auto</span></label>
			</div>
			<div class="accordion-toggle">&#9660;</div>
		</div>
		<div class="accordion-body">
			<div style="margin-bottom:12px">
				<label style="margin-bottom:6px">Source Mode</label>
				<div style="display:flex; gap:16px; align-items:center">
					<label style="font-weight:normal; margin:0; cursor:pointer">
						<input type="radio" name="comprehensionSourceMode" id="sourceMode_url" value="url" checked onchange="pict.views['ComprehensionLoader-Source'].onSourceModeChange()"> URL
						<span style="color:var(--theme-color-text-muted, #888); font-size:0.85em">(fetch from a URL)</span>
					</label>
					<label style="font-weight:normal; margin:0; cursor:pointer">
						<input type="radio" name="comprehensionSourceMode" id="sourceMode_file" value="file" onchange="pict.views['ComprehensionLoader-Source'].onSourceModeChange()"> File Upload
						<span style="color:var(--theme-color-text-muted, #888); font-size:0.85em">(load JSON from local files)</span>
					</label>
				</div>
			</div>

			<div id="sourceURLSection">
				<label for="comprehensionURL">Comprehension JSON URL</label>
				<input type="text" id="comprehensionURL" placeholder="http://example.com/comprehension.json">
				<button class="primary" onclick="pict.views['ComprehensionLoader-Source'].fetchFromURL()">Fetch Comprehension</button>
			</div>

			<div id="sourceFileSection" style="display:none">
				<label for="comprehensionFiles">Comprehension JSON File(s)</label>
				<input type="file" id="comprehensionFiles" multiple accept=".json" style="margin-bottom:10px">
				<div style="font-size:0.8em; color:var(--theme-color-text-muted, #888); margin-bottom:10px">Multiple files will be merged (entity keys combined).</div>
				<button class="primary" onclick="pict.views['ComprehensionLoader-Source'].loadFromFiles()">Load Files</button>
			</div>

			<button class="secondary" onclick="pict.views['ComprehensionLoader-Source'].clearComprehension()" style="margin-left:0">Clear Comprehension</button>
			<div id="sourceStatus"></div>

			<div id="comprehensionSummary" style="display:none"></div>
		</div>
	</div>
</div>
`}],Renderables:[{RenderableHash:'ComprehensionLoader-Source',TemplateHash:'ComprehensionLoader-Source',DestinationAddress:'#ComprehensionLoader-Section-Source'}]};},{"pict-view":89}],104:[function(require,module,exports){'use strict';const libPictView=require('pict-view');/**
 * StatusBar — renders into Theme-BottomBar's #Theme-BottomBar-Status slot.
 *
 * Markup preserves the same element ids (#liveStatusBar, #liveStatusMessage,
 * #liveStatusMeta, #liveStatusProgressFill) that the provider's existing
 * renderLiveStatus() poll handler manipulates by id — so the provider's
 * imperative DOM update flow keeps working untouched.
 */class ComprehensionLoaderStatusBarView extends libPictView{onAfterRender(pRenderable,pAddress,pRecord,pContent){if(this.pict.CSSMap){this.pict.CSSMap.injectCSS();}return super.onAfterRender(pRenderable,pAddress,pRecord,pContent);}}module.exports=ComprehensionLoaderStatusBarView;module.exports.default_configuration={ViewIdentifier:'ComprehensionLoader-StatusBar',DefaultRenderable:'ComprehensionLoader-StatusBar',DefaultDestinationAddress:'#Theme-BottomBar-Status',AutoRender:false,CSS:/*css*/`
		.rds-status-bar {
			display: flex; align-items: center; gap: 12px;
			height: 100%; padding: 0 12px;
			color: var(--theme-color-text-primary, #333333);
			font-size: 0.88em;
			border-top: 1px solid var(--theme-color-border-light, #e9e9e9);
			border-left: 3px solid var(--theme-color-text-secondary, #6c757d);
			position: relative;
		}
		.rds-status-bar.phase-idle         { border-left-color: var(--theme-color-text-secondary, #6c757d); }
		.rds-status-bar.phase-disconnected { border-left-color: var(--theme-color-status-error,   #dc3545); }
		.rds-status-bar.phase-ready        { border-left-color: var(--theme-color-brand-primary,  #4a90d9); }
		.rds-status-bar.phase-loading      { border-left-color: var(--theme-color-status-success, #28a745); }
		.rds-status-bar.phase-stopping     { border-left-color: var(--theme-color-status-warning, #ffc107); }
		.rds-status-bar.phase-complete     { border-left-color: var(--theme-color-status-success, #28a745); }

		.rds-status-dot {
			width: 10px; height: 10px; border-radius: 50%;
			flex-shrink: 0;
			background: var(--theme-color-text-secondary, #6c757d);
		}
		.rds-status-bar.phase-idle         .rds-status-dot { background: var(--theme-color-text-secondary, #6c757d); }
		.rds-status-bar.phase-disconnected .rds-status-dot { background: var(--theme-color-status-error,   #dc3545); }
		.rds-status-bar.phase-ready        .rds-status-dot { background: var(--theme-color-brand-primary,  #4a90d9); }
		.rds-status-bar.phase-loading      .rds-status-dot {
			background: var(--theme-color-status-success, #28a745);
			animation: rds-status-pulse 1.5s ease-in-out infinite;
		}
		.rds-status-bar.phase-stopping     .rds-status-dot {
			background: var(--theme-color-status-warning, #ffc107);
			animation: rds-status-pulse 0.8s ease-in-out infinite;
		}
		.rds-status-bar.phase-complete     .rds-status-dot { background: var(--theme-color-status-success, #28a745); }

		@keyframes rds-status-pulse {
			0%, 100% { opacity: 1; transform: scale(1); }
			50%      { opacity: 0.4; transform: scale(0.8); }
		}

		.rds-status-message { flex: 1; line-height: 1.2; }
		.rds-status-meta {
			display: flex; gap: 12px; flex-shrink: 0;
			font-size: 0.92em; color: var(--theme-color-text-secondary, #666);
		}
		.rds-status-meta .live-status-meta-item { white-space: nowrap; }
		.rds-status-meta .live-status-meta-item strong { color: var(--theme-color-text-primary, #333); }

		.rds-status-detail-btn {
			padding: 2px 8px;
			background: transparent;
			border: 1px solid var(--theme-color-border-default, #ccc);
			border-radius: 3px;
			color: var(--theme-color-text-secondary, #666);
			cursor: pointer;
			font-size: 0.92em;
			line-height: 1;
		}
		.rds-status-detail-btn:hover {
			background: var(--theme-color-background-hover, #f0f0f0);
			color: var(--theme-color-text-primary, #333);
		}

		.rds-status-progress-bar {
			position: absolute; left: 0; right: 0; bottom: 0;
			height: 2px;
			background: var(--theme-color-background-tertiary, #e9ecef);
			overflow: hidden;
		}
		.rds-status-progress-fill {
			height: 100%;
			background: var(--theme-color-status-success, #28a745);
			transition: width 1s ease;
		}
	`,Templates:[{Hash:'ComprehensionLoader-StatusBar',Template:/*html*/`
<div id="liveStatusBar" class="rds-status-bar phase-idle">
	<div class="rds-status-dot live-status-dot"></div>
	<div id="liveStatusMessage" class="rds-status-message live-status-message">Idle</div>
	<div id="liveStatusMeta" class="rds-status-meta live-status-meta"></div>
	<button class="rds-status-detail-btn"
		onclick="_Pict.views['ComprehensionLoader-Shell'].toggleStatusDetail()"
		title="Show detail">Detail</button>
	<div class="rds-status-progress-bar live-status-progress-bar">
		<div id="liveStatusProgressFill" class="rds-status-progress-fill live-status-progress-fill" style="width:0%"></div>
	</div>
</div>`}],Renderables:[{RenderableHash:'ComprehensionLoader-StatusBar',TemplateHash:'ComprehensionLoader-StatusBar',DestinationAddress:'#Theme-BottomBar-Status'}]};},{"pict-view":89}],105:[function(require,module,exports){'use strict';const libPictView=require('pict-view');/**
 * StatusDetail — content for the expandable bottom overlay panel.
 *
 * Renders the throughput histogram slot and the running-ops / completed-ops /
 * errors detail container, both of which the existing provider populates by
 * direct DOM manipulation. The element ids (#X-Throughput-Histogram,
 * #X-StatusDetail-Container) are preserved so the provider keeps working.
 */class ComprehensionLoaderStatusDetailView extends libPictView{onAfterRender(pRenderable,pAddress,pRecord,pContent){if(this.pict.CSSMap){this.pict.CSSMap.injectCSS();}return super.onAfterRender(pRenderable,pAddress,pRecord,pContent);}}module.exports=ComprehensionLoaderStatusDetailView;module.exports.default_configuration={ViewIdentifier:'ComprehensionLoader-StatusDetail',DefaultRenderable:'ComprehensionLoader-StatusDetail',DefaultDestinationAddress:'#ComprehensionLoader-StatusDetail-Panel',AutoRender:false,CSS:/*css*/`
		.rds-status-detail-body {
			padding: 12px 20px 16px;
			max-height: 100%;
			overflow-y: auto;
			color: var(--theme-color-text-primary, #333);
		}
		.rds-status-detail-section { margin-bottom: 14px; }
		.rds-status-detail-section:last-child { margin-bottom: 0; }
		.rds-status-detail-section-title {
			font-size: 0.85em; font-weight: 600;
			color: var(--theme-color-text-secondary, #555);
			text-transform: uppercase; letter-spacing: 0.5px;
			margin-bottom: 8px; padding-bottom: 4px;
			border-bottom: 1px solid var(--theme-color-border-light, #eee);
		}
		.running-op-row { display: flex; align-items: center; gap: 12px; padding: 6px 0; font-size: 0.9em; }
		.running-op-name { font-weight: 600; min-width: 180px; }
		.running-op-bar {
			flex: 1; height: 8px;
			background: var(--theme-color-background-tertiary, #e9ecef);
			border-radius: 4px; overflow: hidden; min-width: 120px;
		}
		.running-op-bar-fill {
			height: 100%;
			background: var(--theme-color-brand-primary, #4a90d9);
			transition: width 0.5s ease;
		}
		.running-op-count { font-size: 0.85em; color: var(--theme-color-text-secondary, #666); white-space: nowrap; }
		.running-op-pending { color: var(--theme-color-text-muted, #888); font-size: 0.85em; font-style: italic; padding: 4px 0; }
		.completed-op-row { padding: 8px 0; border-bottom: 1px solid var(--theme-color-background-tertiary, #f0f0f0); }
		.completed-op-row:last-child { border-bottom: none; }
		.completed-op-header { display: flex; align-items: center; gap: 10px; font-size: 0.9em; margin-bottom: 4px; }
		.completed-op-name { font-weight: 600; }
		.completed-op-stats { color: var(--theme-color-text-secondary, #666); font-size: 0.85em; }
		.completed-op-checkmark { color: var(--theme-color-status-success, #28a745); }
		.error-op-row { padding: 6px 0; border-bottom: 1px solid var(--theme-color-background-tertiary, #f0f0f0); font-size: 0.9em; }
		.error-op-row:last-child { border-bottom: none; }
		.error-op-header { display: flex; align-items: center; gap: 8px; }
		.error-op-name { font-weight: 600; color: var(--theme-color-status-error, #dc3545); }
		.error-op-status { font-size: 0.82em; color: var(--theme-color-status-error, #dc3545); }
		.error-op-message { font-size: 0.82em; color: var(--theme-color-text-muted, #888); margin-top: 2px; padding-left: 18px; }
	`,Templates:[{Hash:'ComprehensionLoader-StatusDetail',Template:/*html*/`
<div class="rds-status-detail-body">
	<div class="rds-status-detail-section">
		<div class="rds-status-detail-section-title">Throughput</div>
		<div id="ComprehensionLoader-Throughput-Histogram" style="height:120px"></div>
	</div>
	<div id="ComprehensionLoader-StatusDetail-Container"></div>
</div>`}],Renderables:[{RenderableHash:'ComprehensionLoader-StatusDetail',TemplateHash:'ComprehensionLoader-StatusDetail',DestinationAddress:'#ComprehensionLoader-StatusDetail-Panel'}]};},{"pict-view":89}],106:[function(require,module,exports){'use strict';const libPictView=require('pict-view');class ComprehensionLoaderTopBarNavView extends libPictView{onAfterRender(pRenderable,pAddress,pRecord,pContent){if(this.pict.CSSMap){this.pict.CSSMap.injectCSS();}return super.onAfterRender(pRenderable,pAddress,pRecord,pContent);}}module.exports=ComprehensionLoaderTopBarNavView;module.exports.default_configuration={ViewIdentifier:'ComprehensionLoader-TopBar-Nav',DefaultRenderable:'ComprehensionLoader-TopBar-Nav',DefaultDestinationAddress:'#Theme-TopBar-Nav',AutoRender:false,CSS:/*css*/`
		.rds-nav {
			display: flex; align-items: center; height: 100%;
			padding: 0 12px; gap: 8px;
			color: var(--theme-color-text-on-brand,
				   var(--theme-color-text-primary, #1a1a1a));
			font-weight: 500;
		}
		.rds-nav-sep { opacity: 0.5; font-weight: 400; margin: 0 2px; }
		.rds-nav-app { font-weight: 600; opacity: 0.95; }
	`,Templates:[{Hash:'ComprehensionLoader-TopBar-Nav',Template:/*html*/`<div class="rds-nav"><span class="rds-nav-sep">·</span><span class="rds-nav-app">Comprehension Loader</span></div>`}],Renderables:[{RenderableHash:'ComprehensionLoader-TopBar-Nav',TemplateHash:'ComprehensionLoader-TopBar-Nav',DestinationAddress:'#Theme-TopBar-Nav'}]};},{"pict-view":89}],107:[function(require,module,exports){'use strict';const libPictView=require('pict-view');class ComprehensionLoaderTopBarUserView extends libPictView{onAfterRender(pRenderable,pAddress,pRecord,pContent){if(this.pict.CSSMap){this.pict.CSSMap.injectCSS();}return super.onAfterRender(pRenderable,pAddress,pRecord,pContent);}}module.exports=ComprehensionLoaderTopBarUserView;module.exports.default_configuration={ViewIdentifier:'ComprehensionLoader-TopBar-User',DefaultRenderable:'ComprehensionLoader-TopBar-User',DefaultDestinationAddress:'#Theme-TopBar-User',AutoRender:false,CSS:/*css*/`
		.rds-user { display: flex; align-items: center; height: 100%; gap: 8px; padding: 0 12px; }
		.rds-user-btn {
			padding: 4px 8px;
			border: 1px solid var(--theme-color-border-default, #5E5549);
			background: transparent;
			color: var(--theme-color-text-on-brand,
				   var(--theme-color-text-secondary, #1a1a1a));
			border-radius: 4px;
			cursor: pointer;
			display: inline-flex; align-items: center; justify-content: center;
			font-size: 1em; line-height: 1;
		}
		.rds-user-btn:hover {
			background: var(--theme-color-background-hover, rgba(255,255,255,0.08));
		}
	`,Templates:[{Hash:'ComprehensionLoader-TopBar-User',Template:/*html*/`<div class="rds-user"><button class="rds-user-btn" onclick="_Pict.views['ComprehensionLoader-Shell'].toggleSettingsPanel()" title="Settings" aria-label="Settings">{~I:Settings~}</button></div>`}],Renderables:[{RenderableHash:'ComprehensionLoader-TopBar-User',TemplateHash:'ComprehensionLoader-TopBar-User',DestinationAddress:'#Theme-TopBar-User'}]};},{"pict-view":89}]},{},[95])(95);});
//# sourceMappingURL=comprehension-loader.js.map
