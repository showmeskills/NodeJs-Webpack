/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/web/components/addpage/addpage.css":
/*!************************************************!*\
  !*** ./src/web/components/addpage/addpage.css ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://demo/./src/web/components/addpage/addpage.css?");

/***/ }),

/***/ "./src/web/components/navigate/navigate.css":
/*!**************************************************!*\
  !*** ./src/web/components/navigate/navigate.css ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://demo/./src/web/components/navigate/navigate.css?");

/***/ }),

/***/ "./src/web/components/addpage/addpage.js":
/*!***********************************************!*\
  !*** ./src/web/components/addpage/addpage.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _addpage_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addpage.css */ \"./src/web/components/addpage/addpage.css\");\n\r\nclass Addpage{\r\n    init(){\r\n        console.log('addpage ====>>>>', 'addpage');\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Addpage);\n\n//# sourceURL=webpack://demo/./src/web/components/addpage/addpage.js?");

/***/ }),

/***/ "./src/web/components/navigate/navigate.js":
/*!*************************************************!*\
  !*** ./src/web/components/navigate/navigate.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _navigate_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./navigate.css */ \"./src/web/components/navigate/navigate.css\");\n\r\nclass Navigate{\r\n    init(){\r\n        console.log('navigate ====>>>>', 'navigate');\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Navigate);\n\n//# sourceURL=webpack://demo/./src/web/components/navigate/navigate.js?");

/***/ }),

/***/ "./src/web/views/books/books-addpage.entry.js":
/*!****************************************************!*\
  !*** ./src/web/views/books/books-addpage.entry.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_addpage_addpage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/addpage/addpage */ \"./src/web/components/addpage/addpage.js\");\n/* harmony import */ var _components_navigate_navigate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/navigate/navigate */ \"./src/web/components/navigate/navigate.js\");\n\r\n\r\nconst addpage = new _components_addpage_addpage__WEBPACK_IMPORTED_MODULE_0__.default();\r\nconst navigate = new _components_navigate_navigate__WEBPACK_IMPORTED_MODULE_1__.default();\r\naddpage.init();\r\nnavigate.init();\n\n//# sourceURL=webpack://demo/./src/web/views/books/books-addpage.entry.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/web/views/books/books-addpage.entry.js");
/******/ 	
/******/ })()
;