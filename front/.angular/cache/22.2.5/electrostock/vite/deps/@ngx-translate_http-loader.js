import { U as InjectionToken, la as ɵɵdefineInjectable, wr as inject } from "./_resource-chunk-_hotzT1w.js";
import { Ai as setClassMetadata, xn as Injectable } from "./core-DdaWCEkT.js";
import { An as throwError, Lt as catchError, cn as forkJoin, jn as of, un as defer, vn as map } from "./esm5-Doa4YBQt.js";
import { c as HttpBackend, l as HttpClient } from "./http-DBT1LI3V.js";
import { TranslateLoader, mergeDeep } from "./@ngx-translate_core.js";
// node_modules/@ngx-translate/http-loader/fesm2022/ngx-translate-http-loader.mjs
var DOT_SEGMENT = /^\.{1,2}$/;
var TRANSLATE_HTTP_LOADER_CONFIG = new InjectionToken("TRANSLATE_HTTP_LOADER_CONFIG");
var TranslateHttpLoader = class TranslateHttpLoader {
	http;
	config;
	constructor() {
		this.config = {
			resources: [],
			enforceLoading: false,
			useHttpBackend: false,
			...inject(TRANSLATE_HTTP_LOADER_CONFIG)
		};
		this.http = this.config.useHttpBackend ? new HttpClient(inject(HttpBackend)) : inject(HttpClient);
	}
	getTranslation(lang) {
		const cacheBuster = this.config.enforceLoading ? `?enforceLoading=${Date.now()}` : "";
		const requests = this.config.resources.map((resource) => {
			let url;
			return defer(() => {
				const langSegment = encodeURIComponent(lang);
				url = `${typeof resource === "string" ? `${resource}${langSegment}.json` : `${resource.prefix}${langSegment}${resource.suffix ?? ".json"}`}${cacheBuster}`;
				return DOT_SEGMENT.test(lang) ? throwError(() => /* @__PURE__ */ new Error(`"${lang}" is a path segment, not a language`)) : this.http.get(url);
			}).pipe(catchError((error) => {
				this.reportError({
					lang,
					resource,
					url,
					error
				});
				return this.config.failOnError ? throwError(() => error) : of({});
			}));
		});
		if (requests.length === 0) return of({});
		return forkJoin(requests).pipe(map((response) => response.reduce((acc, curr) => this.config.flatten ? {
			...acc,
			...flattenTranslations(curr ?? {})
		} : mergeDeep(acc, curr), {})));
	}
	reportError(failure) {
		if (this.config.onLoadError) try {
			this.config.onLoadError(failure);
		} catch (error) {
			console.warn("@ngx-translate/http-loader: onLoadError callback failed:", error);
		}
		else if (!this.config.failOnError) console.warn(`@ngx-translate/http-loader: error loading translation for ${failure.lang}:`, failure.error);
	}
	static ɵfac = function TranslateHttpLoader_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || TranslateHttpLoader)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineInjectable({
		token: TranslateHttpLoader,
		factory: TranslateHttpLoader.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TranslateHttpLoader, [{ type: Injectable }], () => [], null);
})();
function flattenTranslations(translations) {
	return Object.fromEntries(Object.entries(translations).flatMap(([key, value]) => value !== null && typeof value === "object" && !Array.isArray(value) && Object.keys(value).length ? Object.entries(flattenTranslations(value)).map(([child, translation]) => [`${key}.${child}`, translation]) : [[key, value]]));
}
function provideTranslateHttpLoader(config = {}) {
	if ("resources" in config && config.resources) return provideTranslateMultiHttpLoader(config);
	const singleConfig = config;
	return provideTranslateMultiHttpLoader({
		enforceLoading: singleConfig.enforceLoading ?? false,
		useHttpBackend: singleConfig.useHttpBackend ?? false,
		failOnError: singleConfig.failOnError ?? false,
		flatten: singleConfig.flatten ?? false,
		onLoadError: singleConfig.onLoadError,
		resources: [{
			prefix: singleConfig.prefix ?? "/assets/i18n/",
			suffix: singleConfig.suffix ?? ".json"
		}]
	});
}
function provideTranslateMultiHttpLoader(config = {}) {
	return [{
		provide: TRANSLATE_HTTP_LOADER_CONFIG,
		useValue: {
			resources: ["/assets/i18n/"],
			...config
		}
	}, {
		provide: TranslateLoader,
		useClass: TranslateHttpLoader
	}];
}
export { TRANSLATE_HTTP_LOADER_CONFIG, TranslateHttpLoader, provideTranslateHttpLoader, provideTranslateMultiHttpLoader };
