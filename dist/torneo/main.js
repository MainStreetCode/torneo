"use strict";
(self["webpackChunktorneo"] = self["webpackChunktorneo"] || []).push([["main"],{

/***/ 158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _components_player_game_player_detail_game_player_detail_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/player/game-player-detail/game-player-detail.component */ 4790);
/* harmony import */ var _components_player_game_players_game_players_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/player/game-players/game-players.component */ 3243);
/* harmony import */ var _components_game_game_configuration_game_configuration_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/game/game-configuration/game-configuration.component */ 8478);
/* harmony import */ var _components_game_games_games_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/game/games/games.component */ 1060);
/* harmony import */ var _components_user_login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/user/login/login.component */ 3663);
/* harmony import */ var _components_game_game_dashboard_game_dashboard_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/game/game-dashboard/game-dashboard.component */ 270);
/* harmony import */ var _components_round_rounds_rounds_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/round/rounds/rounds.component */ 8453);
/* harmony import */ var _components_round_round_detail_round_detail_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/round/round-detail/round-detail.component */ 3737);
/* harmony import */ var _components_user_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/user/user-profile/user-profile.component */ 9630);
/* harmony import */ var _components_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/dashboard/dashboard.component */ 619);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 2560);













const routes = [
    { path: '', component: _components_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_9__.DashboardComponent },
    { path: 'login', component: _components_user_login_login_component__WEBPACK_IMPORTED_MODULE_4__.LoginComponent },
    { path: 'games', component: _components_game_games_games_component__WEBPACK_IMPORTED_MODULE_3__.GamesComponent },
    { path: 'gamePlayers', component: _components_player_game_players_game_players_component__WEBPACK_IMPORTED_MODULE_1__.GamePlayersComponent },
    { path: 'game/:gameId/player/:playerId', component: _components_player_game_player_detail_game_player_detail_component__WEBPACK_IMPORTED_MODULE_0__.GamePlayerDetailComponent },
    { path: 'game/:gameId', component: _components_game_game_dashboard_game_dashboard_component__WEBPACK_IMPORTED_MODULE_5__.GameDashboardComponent },
    { path: 'game/:gameId/dashboard', component: _components_game_game_dashboard_game_dashboard_component__WEBPACK_IMPORTED_MODULE_5__.GameDashboardComponent },
    { path: 'game/:gameId/configuration', component: _components_game_game_configuration_game_configuration_component__WEBPACK_IMPORTED_MODULE_2__.GameConfigurationComponent },
    { path: 'game/:gameId/rounds', component: _components_round_rounds_rounds_component__WEBPACK_IMPORTED_MODULE_6__.RoundsComponent },
    { path: 'game/:gameId/round/:roundId', component: _components_round_round_detail_round_detail_component__WEBPACK_IMPORTED_MODULE_7__.RoundDetailComponent },
    { path: 'userProfile', component: _components_user_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_8__.UserProfileComponent }
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjector"]({ imports: [_angular_router__WEBPACK_IMPORTED_MODULE_11__.RouterModule.forRoot(routes), _angular_router__WEBPACK_IMPORTED_MODULE_11__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_11__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_11__.RouterModule] }); })();


/***/ }),

/***/ 5041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/compat/app */ 8427);
/* harmony import */ var _components_user_login_login_dialog_login_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/user/login/login-dialog/login-dialog-component */ 8562);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _services_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/auth/auth.service */ 1228);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ 1484);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/toolbar */ 2543);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ 7822);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ 4522);











function AppComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div")(1, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AppComponent_div_8_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r4);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r3.login());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Login");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
}

function AppComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div")(1, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AppComponent_div_10_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r6);
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r5.logout());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Logout");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
}

function AppComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div")(1, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AppComponent_div_12_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r8);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r7.userProfile());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "mat-icon", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "account_circle");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
}

class AppComponent {
  constructor(router, authService, dialog) {
    this.router = router;
    this.authService = authService;
    this.dialog = dialog;
    this.title = 'Torneo';
    this.subscriptions = [];
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  login() {
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(_components_user_login_login_dialog_login_dialog_component__WEBPACK_IMPORTED_MODULE_1__.LoginDialogComponent, {
      panelClass: 'dialog-container' // data: { null }

    });
    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    }));
  }

  logout() {
    firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__["default"].auth().signOut();
    this.goHome();
  }

  goHome() {
    this.router.navigateByUrl('');
  }

  userProfile() {
    this.router.navigateByUrl('userProfile');
  }

}

AppComponent.ɵfac = function AppComponent_Factory(t) {
  return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialog));
};

AppComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: AppComponent,
  selectors: [["app-root"]],
  decls: 15,
  vars: 10,
  consts: [[1, "background-pattern"], [1, "center", "main-content"], ["color", "primary", 1, "header"], [1, "title"], [3, "click"], [4, "ngIf"], ["mat-raised-button", "", "color", "accent", 3, "click"], ["mat-icon-button", "", "color", "primary", "aria-label", "User profile", 3, "click"], ["color", "accent"]],
  template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "mat-toolbar", 2)(3, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "bar_chart");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 3)(6, "span", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AppComponent_Template_span_click_6_listener() {
        return ctx.goHome();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, AppComponent_div_8_Template, 3, 0, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](9, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, AppComponent_div_10_Template, 3, 0, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](11, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](12, AppComponent_div_12_Template, 4, 0, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](13, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](14, "router-outlet");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](9, 4, ctx.isLoggedIn$) === false);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](11, 6, ctx.isLoggedIn$));
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](13, 8, ctx.isLoggedIn$));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterOutlet, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_7__.MatToolbar, _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatButton, _angular_common__WEBPACK_IMPORTED_MODULE_6__.AsyncPipe],
  styles: [".header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;  \n}\n\n.title[_ngcontent-%COMP%] {\n  flex-grow: 10;\n}\n\nnav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  padding: 1rem;\n  text-decoration: none;\n  margin: .5rem;\n  display: inline-block;\n  background-color: #e8e8e8;\n  color: #3d3d3d;\n  border-radius: 4px;\n}\n\nnav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: white;\n  background-color: #42545C;\n}\n\nnav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:active {\n  background-color: black;\n}\n\n.main-content[_ngcontent-%COMP%] {\n  background-color: white;\n  \n  box-shadow: 0px 10px 10px 10px #888888;\n}\n\n.background-pattern[_ngcontent-%COMP%] {\n  background-image: url('aces-falling.jpg');\n  background-size: auto;\n}\n\n.center[_ngcontent-%COMP%] {\n  margin: auto;\n  max-width: 1024px; \n  padding: 0 0 1rem 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGFBQWE7RUFDYixxQkFBcUI7RUFDckIsYUFBYTtFQUNiLHFCQUFxQjtFQUNyQix5QkFBeUI7RUFDekIsY0FBYztFQUNkLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFlBQVk7RUFDWix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSx1QkFBdUI7RUFDdkIsd0NBQXdDO0VBQ3hDLHNDQUFzQztBQUN4Qzs7QUFFQTtFQUNFLHlDQUFtRDtFQUNuRCxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLG1CQUFtQjtBQUNyQiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyOyAgXG59XG5cbi50aXRsZSB7XG4gIGZsZXgtZ3JvdzogMTA7XG59XG5cbm5hdiBhIHtcbiAgcGFkZGluZzogMXJlbTtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBtYXJnaW46IC41cmVtO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlOGU4ZTg7XG4gIGNvbG9yOiAjM2QzZDNkO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG59XG5cbm5hdiBhOmhvdmVyIHtcbiAgY29sb3I6IHdoaXRlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDI1NDVDO1xufVxuXG5uYXYgYTphY3RpdmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcbn1cblxuLm1haW4tY29udGVudCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAvKiBoLW9mZnNldCB2LW9mZnNldCBibHVyIHNwcmVhZCBjb2xvciAqL1xuICBib3gtc2hhZG93OiAwcHggMTBweCAxMHB4IDEwcHggIzg4ODg4ODtcbn1cblxuLmJhY2tncm91bmQtcGF0dGVybiB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnLi4vYXNzZXRzL2FjZXMtZmFsbGluZy5qcGcnKTtcbiAgYmFja2dyb3VuZC1zaXplOiBhdXRvO1xufVxuXG4uY2VudGVyIHtcbiAgbWFyZ2luOiBhdXRvO1xuICBtYXgtd2lkdGg6IDEwMjRweDsgXG4gIHBhZGRpbmc6IDAgMCAxcmVtIDA7XG59XG4iXX0= */"]
});

/***/ }),

/***/ 6747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ 5041);
/* harmony import */ var _components_player_game_players_game_players_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/player/game-players/game-players.component */ 3243);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _components_player_game_player_detail_game_player_detail_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/player/game-player-detail/game-player-detail.component */ 4790);
/* harmony import */ var _components_system_messages_system_messages_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/system-messages/system-messages.component */ 5200);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-routing.module */ 158);
/* harmony import */ var _components_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/dashboard/dashboard.component */ 619);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var _components_player_player_search_player_search_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/player/player-search/player-search.component */ 4896);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/toolbar */ 2543);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/icon */ 7822);
/* harmony import */ var _angular_fire_compat__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! @angular/fire/compat */ 1879);
/* harmony import */ var _angular_fire_compat_firestore__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! @angular/fire/compat/firestore */ 2393);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/environments/environment */ 2340);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/material/card */ 2156);
/* harmony import */ var angularx_qrcode__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! angularx-qrcode */ 9180);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/material/slide-toggle */ 4714);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/material/input */ 8611);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/material/button */ 4522);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @angular/material/tabs */ 5892);
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @angular/material/divider */ 1528);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @angular/material/progress-spinner */ 1708);
/* harmony import */ var _components_game_game_configuration_game_configuration_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/game/game-configuration/game-configuration.component */ 8478);
/* harmony import */ var _components_game_games_games_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/game/games/games.component */ 1060);
/* harmony import */ var _components_user_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/user/user-profile/user-profile.component */ 9630);
/* harmony import */ var _components_user_login_login_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/user/login/login.component */ 3663);
/* harmony import */ var _components_game_game_dashboard_game_dashboard_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/game/game-dashboard/game-dashboard.component */ 270);
/* harmony import */ var _components_round_rounds_rounds_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/round/rounds/rounds.component */ 8453);
/* harmony import */ var _components_round_round_detail_round_detail_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/round/round-detail/round-detail.component */ 3737);
/* harmony import */ var _components_table_table_detail_table_detail_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/table/table-detail/table-detail.component */ 5833);
/* harmony import */ var _components_team_team_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/team/team.component */ 1157);
/* harmony import */ var _components_team_player_team_player_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/team-player/team-player.component */ 2874);
/* harmony import */ var _components_user_login_login_dialog_login_dialog_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/user/login/login-dialog/login-dialog-component */ 8562);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/dialog */ 1484);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! @angular/platform-browser/animations */ 7146);
/* harmony import */ var _components_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/confirm-dialog/confirm-dialog.component */ 4949);
/* harmony import */ var _components_table_tables_tables_tables_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components/table/tables/tables/tables.component */ 8811);
/* harmony import */ var _components_round_round_card_round_card_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/round/round-card/round-card.component */ 1885);
/* harmony import */ var _components_player_player_card_player_card_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./components/player/player-card/player-card.component */ 4273);
/* harmony import */ var _components_section_header_section_header_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./components/section-header/section-header.component */ 1702);
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! @angular/flex-layout */ 2681);
/* harmony import */ var _components_progress_dialog_progress_dialog_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./components/progress-dialog/progress-dialog.component */ 6097);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/core */ 2560);














































class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵdefineInjector"]({ providers: [
        { provide: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_26__.MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
    ], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_27__.BrowserModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_28__.FormsModule,
        _app_routing_module__WEBPACK_IMPORTED_MODULE_4__.AppRoutingModule,
        _angular_common_http__WEBPACK_IMPORTED_MODULE_29__.HttpClientModule,
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_30__.MatToolbarModule,
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_31__.MatIconModule,
        _angular_material_card__WEBPACK_IMPORTED_MODULE_32__.MatCardModule,
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_26__.MatDialogModule,
        _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_33__.MatSlideToggleModule,
        _angular_material_button__WEBPACK_IMPORTED_MODULE_34__.MatButtonModule,
        _angular_material_input__WEBPACK_IMPORTED_MODULE_35__.MatInputModule,
        _angular_material_tabs__WEBPACK_IMPORTED_MODULE_36__.MatTabsModule,
        _angular_material_divider__WEBPACK_IMPORTED_MODULE_37__.MatDividerModule,
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_38__.MatProgressSpinnerModule,
        _angular_fire_compat__WEBPACK_IMPORTED_MODULE_39__.AngularFireModule.initializeApp(src_environments_environment__WEBPACK_IMPORTED_MODULE_7__.environment.firebase),
        _angular_fire_compat_firestore__WEBPACK_IMPORTED_MODULE_40__.AngularFirestoreModule,
        angularx_qrcode__WEBPACK_IMPORTED_MODULE_41__.QRCodeModule,
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_42__.BrowserAnimationsModule,
        _angular_flex_layout__WEBPACK_IMPORTED_MODULE_43__.FlexLayoutModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_28__.ReactiveFormsModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent,
        _components_player_game_players_game_players_component__WEBPACK_IMPORTED_MODULE_1__.GamePlayersComponent,
        _components_player_game_player_detail_game_player_detail_component__WEBPACK_IMPORTED_MODULE_2__.GamePlayerDetailComponent,
        _components_system_messages_system_messages_component__WEBPACK_IMPORTED_MODULE_3__.SystemMessagesComponent,
        _components_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_5__.DashboardComponent,
        _components_player_player_search_player_search_component__WEBPACK_IMPORTED_MODULE_6__.PlayerSearchComponent,
        _components_game_games_games_component__WEBPACK_IMPORTED_MODULE_9__.GamesComponent,
        _components_game_game_configuration_game_configuration_component__WEBPACK_IMPORTED_MODULE_8__.GameConfigurationComponent,
        _components_user_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_10__.UserProfileComponent,
        _components_user_login_login_component__WEBPACK_IMPORTED_MODULE_11__.LoginComponent,
        _components_game_game_dashboard_game_dashboard_component__WEBPACK_IMPORTED_MODULE_12__.GameDashboardComponent,
        _components_round_rounds_rounds_component__WEBPACK_IMPORTED_MODULE_13__.RoundsComponent,
        _components_round_round_detail_round_detail_component__WEBPACK_IMPORTED_MODULE_14__.RoundDetailComponent,
        _components_table_table_detail_table_detail_component__WEBPACK_IMPORTED_MODULE_15__.TableDetailComponent,
        _components_team_team_component__WEBPACK_IMPORTED_MODULE_16__.TeamComponent,
        _components_team_player_team_player_component__WEBPACK_IMPORTED_MODULE_17__.TeamPlayerComponent,
        _components_user_login_login_dialog_login_dialog_component__WEBPACK_IMPORTED_MODULE_18__.LoginDialogComponent,
        _components_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_19__.ConfirmDialogComponent,
        _components_table_tables_tables_tables_component__WEBPACK_IMPORTED_MODULE_20__.TablesComponent,
        _components_round_round_card_round_card_component__WEBPACK_IMPORTED_MODULE_21__.RoundCardComponent,
        _components_player_player_card_player_card_component__WEBPACK_IMPORTED_MODULE_22__.PlayerCardComponent,
        _components_section_header_section_header_component__WEBPACK_IMPORTED_MODULE_23__.SectionHeaderComponent,
        _components_progress_dialog_progress_dialog_component__WEBPACK_IMPORTED_MODULE_24__.ProgressDialogComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_27__.BrowserModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_28__.FormsModule,
        _app_routing_module__WEBPACK_IMPORTED_MODULE_4__.AppRoutingModule,
        _angular_common_http__WEBPACK_IMPORTED_MODULE_29__.HttpClientModule,
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_30__.MatToolbarModule,
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_31__.MatIconModule,
        _angular_material_card__WEBPACK_IMPORTED_MODULE_32__.MatCardModule,
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_26__.MatDialogModule,
        _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_33__.MatSlideToggleModule,
        _angular_material_button__WEBPACK_IMPORTED_MODULE_34__.MatButtonModule,
        _angular_material_input__WEBPACK_IMPORTED_MODULE_35__.MatInputModule,
        _angular_material_tabs__WEBPACK_IMPORTED_MODULE_36__.MatTabsModule,
        _angular_material_divider__WEBPACK_IMPORTED_MODULE_37__.MatDividerModule,
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_38__.MatProgressSpinnerModule, _angular_fire_compat__WEBPACK_IMPORTED_MODULE_39__.AngularFireModule, _angular_fire_compat_firestore__WEBPACK_IMPORTED_MODULE_40__.AngularFirestoreModule,
        angularx_qrcode__WEBPACK_IMPORTED_MODULE_41__.QRCodeModule,
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_42__.BrowserAnimationsModule,
        _angular_flex_layout__WEBPACK_IMPORTED_MODULE_43__.FlexLayoutModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_28__.ReactiveFormsModule] }); })();


/***/ }),

/***/ 4949:
/*!***********************************************************************!*\
  !*** ./src/app/components/confirm-dialog/confirm-dialog.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConfirmDialogComponent": () => (/* binding */ ConfirmDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ 1484);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/toolbar */ 2543);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 7822);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 4522);
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/divider */ 1528);








function ConfirmDialogComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-divider");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 7)(3, "div", 1)(4, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConfirmDialogComponent_div_11_Template_button_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r1.cancel()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 1)(7, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConfirmDialogComponent_div_11_Template_button_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r3.confirm()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.cancelButtonText);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.confirmButtonText);
} }
class ConfirmDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.title = 'Confirm Dialog';
        this.message = '';
        this.confirmButtonText = 'Ok';
        this.cancelButtonText = 'Cancel';
        this.showActionButtons = true;
    }
    ngOnInit() {
        if (this.data.title) {
            this.title = this.data.title;
        }
        if (this.data.message) {
            this.message = this.data.message;
        }
        if (this.data.confirmButtonText) {
            this.confirmButtonText = this.data.confirmButtonText;
        }
        if (this.data.cancelButtonText) {
            this.cancelButtonText = this.data.cancelButtonText;
        }
        if (this.data.showActionButtons !== undefined) {
            this.showActionButtons = this.data.showActionButtons;
        }
    }
    cancel() {
        this.dialogRef.close(false);
    }
    confirm() {
        this.dialogRef.close(true);
    }
}
ConfirmDialogComponent.ɵfac = function ConfirmDialogComponent_Factory(t) { return new (t || ConfirmDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MAT_DIALOG_DATA)); };
ConfirmDialogComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ConfirmDialogComponent, selectors: [["app-confirm-dialog"]], decls: 12, vars: 3, consts: [["color", "primary", 1, "header"], [1, "flex-box-item"], ["mat-dialog-title", ""], ["mat-icon-button", "", "aria-label", "close", 3, "click"], [1, "content"], [1, "mat-body"], [4, "ngIf"], [1, "content", "flex-box-rows"], ["mat-raised-button", "", "color", "warn", 1, "full-width", 3, "click"], ["mat-raised-button", "", "color", "primary", 1, "full-width", 3, "click"]], template: function ConfirmDialogComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-toolbar", 0)(1, "div", 1)(2, "h1", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div")(5, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConfirmDialogComponent_Template_button_click_5_listener() { return ctx.cancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "close");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 4)(9, "p", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, ConfirmDialogComponent_div_11_Template, 9, 2, "div", 6);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.message);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showActionButtons);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_3__.MatToolbar, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIcon, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogTitle, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButton, _angular_material_divider__WEBPACK_IMPORTED_MODULE_6__.MatDivider], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb25maXJtLWRpYWxvZy5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ 619:
/*!*************************************************************!*\
  !*** ./src/app/components/dashboard/dashboard.component.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DashboardComponent": () => (/* binding */ DashboardComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/game/game.service */ 1437);
/* harmony import */ var _game_games_games_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game/games/games.component */ 1060);



class DashboardComponent {
    constructor(gameService) {
        this.gameService = gameService;
        this.players = [];
    }
    ngOnInit() {
        this.gameService.games$.subscribe({
            next: (games) => {
                this.games = games;
            }
        });
    }
}
DashboardComponent.ɵfac = function DashboardComponent_Factory(t) { return new (t || DashboardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_0__.GameService)); };
DashboardComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: DashboardComponent, selectors: [["app-dashboard"]], decls: 1, vars: 0, template: function DashboardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "app-games");
    } }, dependencies: [_game_games_games_component__WEBPACK_IMPORTED_MODULE_1__.GamesComponent], styles: ["h2[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\n.player-list-menu[_ngcontent-%COMP%] {\n  padding: 0;\n  margin: auto;\n  max-width: 1000px;\n\n  \n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: space-around;\n  align-content: flex-start;\n  align-items: flex-start;\n}\n\na[_ngcontent-%COMP%] {\n  background-color: #3f525c;\n  border-radius: 2px;\n  padding: 1rem;\n  font-size: 1.2rem;\n  text-decoration: none;\n  display: inline-block;\n  color: #fff;\n  text-align: center;\n  width: 100%;\n  min-width: 70px;\n  margin: .5rem auto;\n  box-sizing: border-box;\n\n  \n  order: 0;\n  flex: 0 1 auto;\n  align-self: auto;\n}\n\n@media (min-width: 600px) {\n  a[_ngcontent-%COMP%] {\n    width: 18%;\n    box-sizing: content-box;\n  }\n}\n\na[_ngcontent-%COMP%]:hover {\n  background-color: #000;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhc2hib2FyZC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDRDQUE0Qzs7QUFFNUM7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsWUFBWTtFQUNaLGlCQUFpQjs7RUFFakIsWUFBWTtFQUNaLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsZUFBZTtFQUNmLDZCQUE2QjtFQUM3Qix5QkFBeUI7RUFDekIsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsaUJBQWlCO0VBQ2pCLHFCQUFxQjtFQUNyQixxQkFBcUI7RUFDckIsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixzQkFBc0I7O0VBRXRCLFlBQVk7RUFDWixRQUFRO0VBQ1IsY0FBYztFQUNkLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFO0lBQ0UsVUFBVTtJQUNWLHVCQUF1QjtFQUN6QjtBQUNGOztBQUVBO0VBQ0Usc0JBQXNCO0FBQ3hCIiwiZmlsZSI6ImRhc2hib2FyZC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyogRGFzaGJvYXJkQ29tcG9uZW50J3MgcHJpdmF0ZSBDU1Mgc3R5bGVzICovXG5cbmgyIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4ucGxheWVyLWxpc3QtbWVudSB7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogYXV0bztcbiAgbWF4LXdpZHRoOiAxMDAwcHg7XG5cbiAgLyogZmxleGJveCAqL1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICBhbGlnbi1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbn1cblxuYSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMzZjUyNWM7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgcGFkZGluZzogMXJlbTtcbiAgZm9udC1zaXplOiAxLjJyZW07XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBjb2xvcjogI2ZmZjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3aWR0aDogMTAwJTtcbiAgbWluLXdpZHRoOiA3MHB4O1xuICBtYXJnaW46IC41cmVtIGF1dG87XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cbiAgLyogZmxleGJveCAqL1xuICBvcmRlcjogMDtcbiAgZmxleDogMCAxIGF1dG87XG4gIGFsaWduLXNlbGY6IGF1dG87XG59XG5cbkBtZWRpYSAobWluLXdpZHRoOiA2MDBweCkge1xuICBhIHtcbiAgICB3aWR0aDogMTglO1xuICAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xuICB9XG59XG5cbmE6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xufSJdfQ== */"] });


/***/ }),

/***/ 8478:
/*!************************************************************************************!*\
  !*** ./src/app/components/game/game-configuration/game-configuration.component.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameConfigurationComponent": () => (/* binding */ GameConfigurationComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 2340);
/* harmony import */ var _progress_dialog_progress_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../progress-dialog/progress-dialog.component */ 6097);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/game/game.service */ 1437);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/dialog */ 1484);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ 4522);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/form-field */ 5074);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/input */ 8611);
/* harmony import */ var angularx_qrcode__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! angularx-qrcode */ 9180);
/* harmony import */ var _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/flex-layout/extended */ 3704);
/* harmony import */ var _player_game_players_game_players_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../player/game-players/game-players.component */ 3243);
/* harmony import */ var _section_header_section_header_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../section-header/section-header.component */ 1702);

















function GameConfigurationComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "You do not have access to this page");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}

function GameConfigurationComponent_div_2_qrcode_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "qrcode", 15);
  }

  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("qrdata", ctx_r2.gameURL)("width", 256)("errorCorrectionLevel", "M");
  }
}

function GameConfigurationComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "app-section-header", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "div", 2)(3, "div", 3)(4, "div", 2)(5, "div", 4)(6, "div", 5)(7, "div", 6)(8, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](9, "Game Id: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "div", 6)(13, "mat-form-field", 8)(14, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](15, "Game name");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "input", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function GameConfigurationComponent_div_2_Template_input_ngModelChange_16_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r4);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r3.game.name = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "div", 6)(18, "mat-form-field", 8)(19, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](20, "Number of rounds");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](21, "input", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function GameConfigurationComponent_div_2_Template_input_ngModelChange_21_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r4);
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r5.game.numberOfRounds = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](22, "div", 6)(23, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function GameConfigurationComponent_div_2_Template_button_click_23_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r4);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r6.save());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](24, " Save ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](25, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](26, GameConfigurationComponent_div_2_qrcode_26_Template, 1, 3, "qrcode", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](27, "div", 13)(28, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function GameConfigurationComponent_div_2_Template_button_click_28_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r4);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r7.startGame());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](29, " Start Game ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](30, "app-game-players", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("sectionName", ctx_r1.sectionName);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r1.game.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx_r1.game.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx_r1.game.numberOfRounds);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r1.gameURL);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("game", ctx_r1.game);
  }
}

class GameConfigurationComponent {
  constructor(router, route, gameService, location, dialog) {
    this.router = router;
    this.route = route;
    this.gameService = gameService;
    this.location = location;
    this.dialog = dialog;
    this.isAdmin$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(false);
    this.subscriptions = [];
  }

  ngOnInit() {
    this.getGame();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getGame() {
    this.gameId = this.route.snapshot.paramMap.get('gameId');

    if (!this.gameId) {
      return;
    }

    this.gameURL = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url}/game/${this.gameId}`;
    const dialogRef = this.dialog.open(_progress_dialog_progress_dialog_component__WEBPACK_IMPORTED_MODULE_1__.ProgressDialogComponent, {});
    this.subscriptions.push(this.gameService.getGame(this.gameId).subscribe({
      next: game => {
        this.game = game;
        this.isAdmin$ = this.gameService.isCurrentUserAdmin(this.game.id);
        this.sectionName = `${game.name.toUpperCase()} Configuration`;
        dialogRef.close();
      }
    }));
  }

  goBack() {
    this.location.back();
  }

  save() {
    if (this.game) {
      this.gameService.updateGame(this.game);
    }
  }

  startGame() {
    this.router.navigateByUrl(`/game/${this.game.id}/dashboard?selectedTab=1`);
  }

}

GameConfigurationComponent.ɵfac = function GameConfigurationComponent_Factory(t) {
  return new (t || GameConfigurationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_2__.GameService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_8__.Location), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__.MatDialog));
};

GameConfigurationComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
  type: GameConfigurationComponent,
  selectors: [["app-game-configuration"]],
  decls: 4,
  vars: 6,
  consts: [[4, "ngIf"], [3, "sectionName"], [1, "flex-box-rows", "justify-content-center"], [1, "flex-box-columns", "justify-content-center"], ["ngClass.gt-xs", "flex-box-rows content mat-typography", "ngClass.lt-sm", "flex-box-columns content mat-typography"], [1, "flex-box-columns"], [1, "flex-box-item"], [1, "mat-h3"], ["appearance", "fill", 1, "full-width"], ["id", "game-name", "matInput", "", "placeholder", "Angela's Euchre Tournament", 3, "ngModel", "ngModelChange"], ["id", "game-rounds", "matInput", "", "placeholder", "8", 3, "ngModel", "ngModelChange"], ["mat-raised-button", "", "color", "primary", "aria-label", "Back", "title", "Back", 1, "full-width", 3, "click"], [3, "qrdata", "width", "errorCorrectionLevel", 4, "ngIf"], [1, "flex-box-item", "content"], [3, "game"], [3, "qrdata", "width", "errorCorrectionLevel"]],
  template: function GameConfigurationComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](0, GameConfigurationComponent_div_0_Template, 2, 0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](1, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, GameConfigurationComponent_div_2_Template, 31, 6, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](3, "async");
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](1, 2, ctx.isAdmin$) === false);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.game && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](3, 4, ctx.isAdmin$));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgModel, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_13__.MatInput, angularx_qrcode__WEBPACK_IMPORTED_MODULE_14__.QRCodeComponent, _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_15__.DefaultClassDirective, _player_game_players_game_players_component__WEBPACK_IMPORTED_MODULE_3__.GamePlayersComponent, _section_header_section_header_component__WEBPACK_IMPORTED_MODULE_4__.SectionHeaderComponent, _angular_common__WEBPACK_IMPORTED_MODULE_8__.AsyncPipe],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJnYW1lLWNvbmZpZ3VyYXRpb24uY29tcG9uZW50LmNzcyJ9 */"]
});

/***/ }),

/***/ 3184:
/*!**********************************************************************!*\
  !*** ./src/app/components/game/game-dashboard/game-dashboard-tab.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameDashboardTab": () => (/* binding */ GameDashboardTab)
/* harmony export */ });
var GameDashboardTab;
(function (GameDashboardTab) {
    GameDashboardTab["Players"] = "players";
    GameDashboardTab["Rounds"] = "rounds";
})(GameDashboardTab || (GameDashboardTab = {}));


/***/ }),

/***/ 270:
/*!****************************************************************************!*\
  !*** ./src/app/components/game/game-dashboard/game-dashboard.component.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameDashboardComponent": () => (/* binding */ GameDashboardComponent)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 2340);
/* harmony import */ var _game_dashboard_tab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game-dashboard-tab */ 3184);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/game/game.service */ 1437);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/icon */ 7822);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/tabs */ 5892);
/* harmony import */ var angularx_qrcode__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! angularx-qrcode */ 9180);
/* harmony import */ var _player_game_players_game_players_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../player/game-players/game-players.component */ 3243);
/* harmony import */ var _round_rounds_rounds_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../round/rounds/rounds.component */ 8453);
/* harmony import */ var _section_header_section_header_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../section-header/section-header.component */ 1702);












function GameDashboardComponent_div_0_qrcode_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "qrcode", 10);
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("qrdata", ctx_r1.gameURL)("width", 256)("errorCorrectionLevel", "M");
} }
function GameDashboardComponent_div_0_ng_template_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "mat-icon", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "group");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, " Players ");
} }
function GameDashboardComponent_div_0_ng_template_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "mat-icon", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "table_bar");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, " Rounds ");
} }
function GameDashboardComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "app-section-header", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6, "Game Id: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "div", 4)(10, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11, "Rounds: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](15, GameDashboardComponent_div_0_qrcode_15_Template, 1, 3, "qrcode", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "mat-tab-group", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("selectedIndexChange", function GameDashboardComponent_div_0_Template_mat_tab_group_selectedIndexChange_16_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r4.selectTab($event)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "mat-tab");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](18, GameDashboardComponent_div_0_ng_template_18_Template, 3, 0, "ng-template", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](19, "app-game-players", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](20, "mat-tab");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](21, GameDashboardComponent_div_0_ng_template_21_Template, 3, 0, "ng-template", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](22, "app-rounds", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    let tmp_2_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("sectionName", ctx_r0.sectionName);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r0.game.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"]((tmp_2_0 = ctx_r0.game.numberOfRounds) !== null && tmp_2_0 !== undefined ? tmp_2_0 : 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.gameURL);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("selectedIndex", ctx_r0.selectedTab);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("game", ctx_r0.game);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("game", ctx_r0.game);
} }
class GameDashboardComponent {
    constructor(route, gameService, location, router) {
        this.route = route;
        this.gameService = gameService;
        this.location = location;
        this.router = router;
        this.selectedTab = _game_dashboard_tab__WEBPACK_IMPORTED_MODULE_1__.GameDashboardTab.Players;
        this.playersTab = _game_dashboard_tab__WEBPACK_IMPORTED_MODULE_1__.GameDashboardTab.Players;
        this.roundsTab = _game_dashboard_tab__WEBPACK_IMPORTED_MODULE_1__.GameDashboardTab.Rounds;
        this.subscriptions = [];
    }
    ngOnInit() {
        this.getGame();
        this.parseURLParams();
    }
    ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
    parseURLParams() {
        this.route.queryParams
            .subscribe(params => {
            const tab = params.selectedTab;
            if (tab) {
                this.selectedTab = tab;
            }
        });
    }
    getGame() {
        const id = this.route.snapshot.paramMap.get('gameId');
        if (!id) {
            return;
        }
        this.subscriptions.push(this.gameService.getGame(id).subscribe({
            next: (game) => {
                this.game = game;
                this.gameURL = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url}/game/${this.game.id}/dashboard`;
                this.sectionName = `${this.game.name.toUpperCase()} Dashboard`;
                console.log(this.gameURL);
            }
        }));
    }
    selectTab(tabNumber) {
        this.selectedTab = tabNumber;
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
                selectedTab: this.selectedTab
            },
            queryParamsHandling: 'merge',
            // preserve the existing query params in the route
            skipLocationChange: false
            // do not trigger navigation
        });
    }
    goBack() {
        this.location.back();
    }
}
GameDashboardComponent.ɵfac = function GameDashboardComponent_Factory(t) { return new (t || GameDashboardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_2__.GameService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_8__.Location), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router)); };
GameDashboardComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: GameDashboardComponent, selectors: [["app-game-dashboard"]], inputs: { game: "game" }, decls: 1, vars: 1, consts: [[4, "ngIf"], [3, "sectionName"], [1, "flex-box-rows", "justify-content-center"], [1, "flex-box-columns"], [1, "flex-box-item"], [1, "mat-h3"], [3, "qrdata", "width", "errorCorrectionLevel", 4, "ngIf"], ["mat-stretch-tabs", "", 3, "selectedIndex", "selectedIndexChange"], ["mat-tab-label", ""], [3, "game"], [3, "qrdata", "width", "errorCorrectionLevel"], [1, "example-tab-icon"]], template: function GameDashboardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](0, GameDashboardComponent_div_0_Template, 23, 7, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.game);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__.MatIcon, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_10__.MatTabGroup, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_10__.MatTabLabel, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_10__.MatTab, angularx_qrcode__WEBPACK_IMPORTED_MODULE_11__.QRCodeComponent, _player_game_players_game_players_component__WEBPACK_IMPORTED_MODULE_3__.GamePlayersComponent, _round_rounds_rounds_component__WEBPACK_IMPORTED_MODULE_4__.RoundsComponent, _section_header_section_header_component__WEBPACK_IMPORTED_MODULE_5__.SectionHeaderComponent], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJnYW1lLWRhc2hib2FyZC5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ 1060:
/*!**********************************************************!*\
  !*** ./src/app/components/game/games/games.component.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GamesComponent": () => (/* binding */ GamesComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var _progress_dialog_progress_dialog_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../progress-dialog/progress-dialog.component */ 6097);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ 1484);
/* harmony import */ var src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/game/game.service */ 1437);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var src_app_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/auth/auth.service */ 1228);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/toolbar */ 2543);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/icon */ 7822);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/card */ 2156);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ 4522);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/form-field */ 5074);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/input */ 8611);















function GamesComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 6)(1, "div")(2, "mat-form-field", 7)(3, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "Game name");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](5, "input", 8, 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div")(8, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function GamesComponent_div_6_Template_button_click_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r5);

      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](6);

      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      ctx_r4.add(_r3.value);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](_r3.value = "");
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "add");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "span", 11)(12, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "Create game");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
  }

  if (rf & 2) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](6);

    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", !_r3.value);
  }
}

function GamesComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Login to start creating games! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}

function GamesComponent_mat_card_14_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div")(1, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function GamesComponent_mat_card_14_div_4_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10);
      const game_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r8.configuration(game_r6));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function GamesComponent_mat_card_14_div_4_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10);
      const game_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r11.delete(game_r6));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
}

function GamesComponent_mat_card_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-card", 13)(1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function GamesComponent_mat_card_14_Template_div_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r14);
      const game_r6 = restoredCtx.$implicit;
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r13.dashboard(game_r6));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function GamesComponent_mat_card_14_Template_button_click_2_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r14);
      const game_r6 = restoredCtx.$implicit;
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r15.dashboard(game_r6));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, GamesComponent_mat_card_14_div_4_Template, 7, 0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const game_r6 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](game_r6.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r2.gameAdminMap.get(game_r6.id));
  }
}

class GamesComponent {
  constructor(dialog, gameService, router, authService) {
    this.dialog = dialog;
    this.gameService = gameService;
    this.router = router;
    this.authService = authService;
    this.games = [];
    this.gameAdminMap = new Map();
    this.isLoggedIn$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(false);
    this.subscriptions = [];
  }

  ngOnInit() {
    this.getGames();
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getGames() {
    const dialogRef = this.dialog.open(_progress_dialog_progress_dialog_component__WEBPACK_IMPORTED_MODULE_0__.ProgressDialogComponent, {});
    this.subscriptions.push(this.gameService.games$.subscribe({
      next: games => {
        this.games = games;
        this.games.map(game => {
          this.gameAdminMap.set(game.id, this.isGameAdmin(game));
        });
        dialogRef.close();
      }
    }));
  }

  add(name) {
    name = name.trim();
    const currentUser = this.authService.getCurrentUser();

    if (!name || !currentUser) {
      return;
    }

    this.subscriptions.push(this.gameService.addGame({
      name
    }, currentUser.uid).subscribe({
      next: game => {
        if (game) {
          this.configuration(game);
        }
      }
    }));
  }

  delete(game) {
    this.gameService.deleteGame(game.id);
  }

  dashboard(game) {
    this.router.navigateByUrl(`/game/${game.id}/dashboard`);
  }

  configuration(game) {
    this.router.navigateByUrl(`/game/${game.id}/configuration`);
  }

  isGameAdmin(game) {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser && game.adminIds.find(adminId => adminId === currentUser.uid)) {
      return true;
    }

    return false;
  }

}

GamesComponent.ɵfac = function GamesComponent_Factory(t) {
  return new (t || GamesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_1__.GameService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService));
};

GamesComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: GamesComponent,
  selectors: [["app-games"]],
  decls: 15,
  vars: 7,
  consts: [["color", "secondary", 1, "mat-h1"], ["color", "accent"], ["class", "content flex-box-rows", 4, "ngIf"], ["class", "content", 4, "ngIf"], [1, "games"], ["class", "mdc-card card", 4, "ngFor", "ngForOf"], [1, "content", "flex-box-rows"], ["appearance", "fill", 1, "example-full-width"], ["matInput", "", "id", "new-game", "placeholder", "Angela's Euchre Tournament", "value", ""], ["gameName", ""], ["mat-raised-button", "", "color", "primary", 3, "disabled", "click"], [1, "mdc-button__label"], [1, "content"], [1, "mdc-card", "card"], ["tabindex", "0", 1, "mdc-card__primary-action", "details", 3, "click"], ["mat-button", "", 3, "click"], [4, "ngIf"], ["mat-icon-button", "", "color", "primary", "aria-label", "game details", "title", "game details", 3, "click"], ["mat-icon-button", "", "color", "primary", "aria-label", "delete game", "title", "delete details", 3, "click"]],
  template: function GamesComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div")(1, "mat-toolbar", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Games");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "mat-toolbar", 1)(4, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Add new game");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, GamesComponent_div_6_Template, 14, 1, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](7, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, GamesComponent_div_8_Template, 2, 0, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](9, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "mat-toolbar", 1)(11, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, "Game List");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](14, GamesComponent_mat_card_14_Template, 5, 2, "mat-card", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](7, 3, ctx.isLoggedIn$));
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](9, 5, ctx.isLoggedIn$) === false);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.games);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__.MatToolbar, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__.MatIcon, _angular_material_card__WEBPACK_IMPORTED_MODULE_10__.MatCard, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_13__.MatInput, _angular_common__WEBPACK_IMPORTED_MODULE_7__.AsyncPipe],
  styles: [".games[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%] {    \n  padding: 1rem;\n}\n\n.games[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin: 1rem;\n}\n\n.games[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%] {\n  flex-grow: 10;\n}\n\n.games[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-size: small;\n  color: white;\n  padding: 0.8em 0.7em 0 0.7em;\n  background-color: #405061;\n  line-height: 1em;\n  position: relative;\n  left: -1px;\n  top: -4px;\n  height: 1.8em;\n  min-width: 16px;\n  text-align: right;\n  margin-right: .8em;\n  border-radius: 4px 0 0 4px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdhbWVzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQixnQkFBZ0I7RUFDaEIsWUFBWTtFQUNaLDRCQUE0QjtFQUM1Qix5QkFBeUI7RUFDekIsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFQUNsQixVQUFVO0VBQ1YsU0FBUztFQUNULGFBQWE7RUFDYixlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQiwwQkFBMEI7QUFDNUIiLCJmaWxlIjoiZ2FtZXMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5nYW1lcyAuY29udGVudCB7ICAgIFxuICBwYWRkaW5nOiAxcmVtO1xufVxuXG4uZ2FtZXMgLmNhcmQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtYXJnaW46IDFyZW07XG59XG5cbi5nYW1lcyAuZGV0YWlscyB7XG4gIGZsZXgtZ3JvdzogMTA7XG59XG5cbi5nYW1lcyAuYmFkZ2Uge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGZvbnQtc2l6ZTogc21hbGw7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgcGFkZGluZzogMC44ZW0gMC43ZW0gMCAwLjdlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQwNTA2MTtcbiAgbGluZS1oZWlnaHQ6IDFlbTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBsZWZ0OiAtMXB4O1xuICB0b3A6IC00cHg7XG4gIGhlaWdodDogMS44ZW07XG4gIG1pbi13aWR0aDogMTZweDtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gIG1hcmdpbi1yaWdodDogLjhlbTtcbiAgYm9yZGVyLXJhZGl1czogNHB4IDAgMCA0cHg7XG59Il19 */"]
});

/***/ }),

/***/ 4790:
/*!**************************************************************************************!*\
  !*** ./src/app/components/player/game-player-detail/game-player-detail.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GamePlayerDetailComponent": () => (/* binding */ GamePlayerDetailComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var src_app_services_gamePlayer_game_player_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/gamePlayer/game-player.service */ 9595);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/game/game.service */ 1437);
/* harmony import */ var src_app_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/auth/auth.service */ 1228);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/toolbar */ 2543);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/slide-toggle */ 4714);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ 4522);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/form-field */ 5074);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/input */ 8611);
/* harmony import */ var _section_header_section_header_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../section-header/section-header.component */ 1702);













function GamePlayerDetailComponent_div_0_div_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 11)(1, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const roundPoints_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("Round: ", roundPoints_r2.roundNumber, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" - Points: ", roundPoints_r2.points, "");
} }
function GamePlayerDetailComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "app-section-header", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 2)(3, "div", 3)(4, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Player Id: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 3)(9, "mat-form-field", 5)(10, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11, "Player Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "input", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function GamePlayerDetailComponent_div_0_Template_input_ngModelChange_12_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r4.player.displayName = $event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "div", 3)(14, "mat-slide-toggle", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function GamePlayerDetailComponent_div_0_Template_mat_slide_toggle_click_14_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r6.toggleIsAdmin()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](15, "Admin");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "div", 3)(17, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function GamePlayerDetailComponent_div_0_Template_button_click_17_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r7.save()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](18, "Save");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "mat-toolbar", 9)(20, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](21, "Points");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](22, GamePlayerDetailComponent_div_0_div_22_Template, 5, 2, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("sectionName", ctx_r0.sectionName);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r0.player.uid);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx_r0.isDisabled)("ngModel", ctx_r0.player.displayName);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("checked", ctx_r0.isAdmin)("disabled", !ctx_r0.isCurrentUserAdmin);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx_r0.isDisabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r0.player.pointsForRound);
} }
class GamePlayerDetailComponent {
    constructor(route, playerService, location, gameService, authService) {
        this.route = route;
        this.playerService = playerService;
        this.location = location;
        this.gameService = gameService;
        this.authService = authService;
        this.isAdmin = false;
        this.isDisabled = true;
        this.isCurrentUserAdmin = false;
    }
    ngOnInit() {
        this.getPlayer();
        this.setDisabledState();
    }
    getPlayer() {
        this.gameId = this.route.snapshot.paramMap.get('gameId');
        const playerId = this.route.snapshot.paramMap.get('playerId');
        this.playerService.getPlayer(playerId, this.gameId).subscribe({
            next: (player) => {
                this.player = player;
                this.sectionName = `${player.displayName.toUpperCase()} Details`;
            }
        });
        this.gameService.getGame(this.gameId).subscribe({
            next: (game) => {
                if (game.adminIds && game.adminIds.find((adminId) => adminId === playerId)) {
                    this.isAdmin = true;
                }
                else {
                    this.isAdmin = false;
                }
            }
        });
    }
    goBack() {
        this.location.back();
    }
    save() {
        if (this.player) {
            this.playerService.updatePlayer(this.player, this.gameId);
        }
    }
    toggleIsAdmin() {
        if (!this.isCurrentUserAdmin) {
            return;
        }
        // if isAdmin was true, then delete player as admin
        if (this.isAdmin) {
            this.gameService.deleteAdmin(this.gameId, this.player.uid);
        }
        else {
            // else isAdmin was false, add player as admin
            this.gameService.addAdmin(this.gameId, this.player.uid);
        }
    }
    setDisabledState() {
        this.gameService.isCurrentUserAdmin(this.gameId).subscribe({
            next: (isGameAdmin) => {
                const currentUser = this.authService.getCurrentUser();
                this.isCurrentUserAdmin = isGameAdmin;
                // if current user is game admin or is this player then isDisabled = false
                if (currentUser && currentUser.uid === this.player.uid || isGameAdmin) {
                    this.isDisabled = false;
                }
            }
        });
    }
}
GamePlayerDetailComponent.ɵfac = function GamePlayerDetailComponent_Factory(t) { return new (t || GamePlayerDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_services_gamePlayer_game_player_service__WEBPACK_IMPORTED_MODULE_0__.GamePlayerService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_6__.Location), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_1__.GameService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService)); };
GamePlayerDetailComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: GamePlayerDetailComponent, selectors: [["app-game-player-detail"]], inputs: { player: "player", gameId: "gameId" }, decls: 1, vars: 1, consts: [[4, "ngIf"], [3, "sectionName"], [1, "content", "flex-box-columns", "mat-typography"], [1, "flex-box-item"], [1, "mat-h3"], ["appearance", "fill"], ["matInput", "", "placeholder", "Player Name", 3, "disabled", "ngModel", "ngModelChange"], [3, "checked", "disabled", "click"], ["mat-raised-button", "", "color", "primary", 3, "disabled", "click"], ["color", "accent"], ["class", "content", 4, "ngFor", "ngForOf"], [1, "content"]], template: function GamePlayerDetailComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, GamePlayerDetailComponent_div_0_Template, 23, 8, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.player);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__.MatToolbar, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_9__.MatSlideToggle, _angular_material_button__WEBPACK_IMPORTED_MODULE_10__.MatButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_12__.MatInput, _section_header_section_header_component__WEBPACK_IMPORTED_MODULE_3__.SectionHeaderComponent], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJnYW1lLXBsYXllci1kZXRhaWwuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ 3243:
/*!**************************************************************************!*\
  !*** ./src/app/components/player/game-players/game-players.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GamePlayersComponent": () => (/* binding */ GamePlayersComponent)
/* harmony export */ });
/* harmony import */ var _confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../confirm-dialog/confirm-dialog.component */ 4949);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var _user_login_login_dialog_login_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../user/login/login-dialog/login-dialog-component */ 8562);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var src_app_services_gamePlayer_game_player_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/gamePlayer/game-player.service */ 9595);
/* harmony import */ var src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/game/game.service */ 1437);
/* harmony import */ var src_app_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/auth/auth.service */ 1228);
/* harmony import */ var src_app_services_round_round_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/round/round.service */ 1939);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/dialog */ 1484);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/toolbar */ 2543);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ 7822);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ 4522);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/form-field */ 5074);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/input */ 8611);
/* harmony import */ var _player_card_player_card_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../player-card/player-card.component */ 4273);

















function GamePlayersComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div")(1, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function GamePlayersComponent_div_5_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r4);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r3.joinGame());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, "Join Game");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
}

function GamePlayersComponent_app_player_card_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "app-player-card", 9);
  }

  if (rf & 2) {
    const player_r5 = ctx.$implicit;
    const i_r6 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("player", player_r5)("position", i_r6 + 1);
  }
}

function GamePlayersComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div")(1, "mat-toolbar", 5)(2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3, "Add new player");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "div", 10)(5, "div")(6, "mat-form-field", 11)(7, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](8, "Player name");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](9, "input", 12, 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](11, "div")(12, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function GamePlayersComponent_div_12_Template_button_click_12_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r9);

      const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](10);

      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      ctx_r8.add(_r7.value);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](_r7.value = "");
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](13, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](14, "add");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](15, "span", 15)(16, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](17, "Add player");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()()()();
  }

  if (rf & 2) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](10);

    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("disabled", !_r7.value);
  }
}

class GamePlayersComponent {
  constructor(playerService, gameService, authService, roundService, dialog) {
    this.playerService = playerService;
    this.gameService = gameService;
    this.authService = authService;
    this.roundService = roundService;
    this.dialog = dialog;
    this.players = [];
    this.isAdmin$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.of)(false);
    this.isGameJoinable$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.of)(true);
    this.subscriptions = [];
  }

  ngOnInit() {
    if (!this.game?.id) {
      return;
    }

    this.currentUser = this.authService.getCurrentUser();
    this.isAdmin$ = this.gameService.isCurrentUserAdmin(this.game.id);
    this.getPlayers();
    this.subscriptions.push(this.authService.isLoggedIn$.subscribe({
      next: loggedIn => {
        if (loggedIn) {
          this.checkIsGameJoinable();
        }
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getPlayers() {
    this.subscriptions.push(this.playerService.playersForGame(this.game.id).subscribe({
      next: players => {
        this.players = players.sort((a, b) => {
          const playerAPoints = this.calculateTotalPoints(a);
          const playerBPoints = this.calculateTotalPoints(b);
          return playerBPoints - playerAPoints;
        });
        this.checkIsGameJoinable();
      }
    }));
  }

  checkIsGameJoinable() {
    this.currentUser = this.authService.getCurrentUser(); // if the current user is one of the players in the game, then disable the join button

    if (this.currentUser && this.players.find(player => player.uid === this.currentUser.uid)) {
      this.isGameJoinable$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.of)(false);
    } // if the game has already started, then the game is not joinable


    this.subscriptions.push(this.roundService.roundsForGame(this.game.id).subscribe({
      next: rounds => {
        if (rounds.length > 0) {
          this.isGameJoinable$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.of)(false);
        }
      }
    }));
  }

  calculateTotalPoints(player) {
    let totalPoints = 0;

    if (player.pointsForRound) {
      player.pointsForRound.forEach(roundPoints => {
        totalPoints += roundPoints.points;
      });
    }

    return totalPoints;
  }

  add(displayName) {
    displayName = displayName.trim();

    if (!displayName) {
      return;
    }

    this.addPlayerToGame({
      displayName
    });
  }

  addPlayerToGame(player) {
    if (this.game) {
      this.playerService.addPlayer(player, this.game.id);
    }
  }

  joinGame() {
    this.subscriptions.push(this.authService.isLoggedIn$.subscribe({
      next: loggedIn => {
        // if user is logged in then add player to game
        if (loggedIn) {
          this.createPlayerFromCurrentUser();
        } else {
          this.showJoinDialog();
        }
      }
    }));
  }

  createPlayerFromCurrentUser() {
    this.subscriptions.push(this.authService.currentUser$.subscribe({
      next: currentUser => {
        if (currentUser) {
          const newPlayer = {
            uid: currentUser.uid,
            displayName: currentUser.displayName
          };
          this.addPlayerToGame(newPlayer);
        }
      }
    }));
  }

  showJoinDialog() {
    const dialogRef = this.dialog.open(_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_0__.ConfirmDialogComponent, {
      panelClass: 'dialog-container',
      data: {
        title: 'Join Game',
        message: 'Before you can join a game, you must login first',
        confirmButtonText: 'Login'
      }
    });
    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoginDialog();
      }
    }));
  }

  showLoginDialog() {
    const dialogRef = this.dialog.open(_user_login_login_dialog_login_dialog_component__WEBPACK_IMPORTED_MODULE_1__.LoginDialogComponent, {
      panelClass: 'dialog-container'
    });
    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    }));
  }

}

GamePlayersComponent.ɵfac = function GamePlayersComponent_Factory(t) {
  return new (t || GamePlayersComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_app_services_gamePlayer_game_player_service__WEBPACK_IMPORTED_MODULE_2__.GamePlayerService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_3__.GameService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_app_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_4__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_app_services_round_round_service__WEBPACK_IMPORTED_MODULE_5__.RoundService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__.MatDialog));
};

GamePlayersComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
  type: GamePlayersComponent,
  selectors: [["app-game-players"]],
  inputs: {
    game: "game"
  },
  decls: 14,
  vars: 8,
  consts: [[1, "players"], [1, "flex-box-rows"], ["color", "accent"], [1, "flex-box-item"], [4, "ngIf"], ["color", "secondary"], [1, "player-list"], [3, "player", "position", 4, "ngFor", "ngForOf"], ["mat-raised-button", "", "color", "primary", 3, "click"], [3, "player", "position"], [1, "content", "flex-box-rows"], ["appearance", "fill", 1, "example-full-width"], ["matInput", "", "id", "new-player", "placeholder", "Player Name", "value", ""], ["playerName", ""], ["mat-raised-button", "", "color", "primary", 3, "disabled", "click"], [1, "mdc-button__label"]],
  template: function GamePlayersComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "mat-toolbar", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4, "Players");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](5, GamePlayersComponent_div_5_Template, 3, 0, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](6, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "mat-toolbar", 5)(8, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](10, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](11, GamePlayersComponent_app_player_card_11_Template, 1, 2, "app-player-card", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](12, GamePlayersComponent_div_12_Template, 18, 1, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](13, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](6, 4, ctx.isGameJoinable$));
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("Player List (", ctx.players.length, ")");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx.players);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](13, 6, ctx.isAdmin$));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_11__.MatToolbar, _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_15__.MatInput, _player_card_player_card_component__WEBPACK_IMPORTED_MODULE_6__.PlayerCardComponent, _angular_common__WEBPACK_IMPORTED_MODULE_10__.AsyncPipe],
  styles: [".players[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%] {    \n  padding: 1rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdhbWUtcGxheWVycy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBYTtBQUNmIiwiZmlsZSI6ImdhbWUtcGxheWVycy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnBsYXllcnMgLmNvbnRlbnQgeyAgICBcbiAgcGFkZGluZzogMXJlbTtcbn1cbiJdfQ== */"]
});

/***/ }),

/***/ 4273:
/*!************************************************************************!*\
  !*** ./src/app/components/player/player-card/player-card.component.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlayerCardComponent": () => (/* binding */ PlayerCardComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var _confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../confirm-dialog/confirm-dialog.component */ 4949);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var src_app_services_gamePlayer_game_player_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/gamePlayer/game-player.service */ 9595);
/* harmony import */ var src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/game/game.service */ 1437);
/* harmony import */ var src_app_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/auth/auth.service */ 1228);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/dialog */ 1484);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/icon */ 7822);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/card */ 2156);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ 4522);













function PlayerCardComponent_span_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "(you)");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}

function PlayerCardComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div")(1, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function PlayerCardComponent_div_10_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r3);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r2.view(ctx_r2.player));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, "edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function PlayerCardComponent_div_10_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r3);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r4.delete(ctx_r4.player));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
}

class PlayerCardComponent {
  constructor(playerService, gameService, authService, route, dialog, router) {
    this.playerService = playerService;
    this.gameService = gameService;
    this.authService = authService;
    this.route = route;
    this.dialog = dialog;
    this.router = router;
    this.isAdmin$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(false);
    this.totalPoints = 0;
  }

  ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    this.currentUser = this.authService.getCurrentUser();
    this.isAdmin$ = this.gameService.isCurrentUserAdmin(this.gameId);
    this.calculatePoints();
  }

  delete(player) {
    const dialogRef = this.dialog.open(_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_0__.ConfirmDialogComponent, {
      panelClass: 'dialog-container',
      data: {
        title: 'Delete Player',
        message: 'Are you sure you want to delete this player?',
        confirmButtonText: 'Yes'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.playerService.deletePlayer(player.uid, this.gameId);
      }
    });
  }

  view(player) {
    this.router.navigateByUrl(`/game/${this.gameId}/player/${player.uid}`);
  }

  calculatePoints() {
    this.totalPoints = 0;

    if (this.player.pointsForRound) {
      this.player.pointsForRound.forEach(roundPoints => {
        this.totalPoints += roundPoints.points;
      });
    }
  }

}

PlayerCardComponent.ɵfac = function PlayerCardComponent_Factory(t) {
  return new (t || PlayerCardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_services_gamePlayer_game_player_service__WEBPACK_IMPORTED_MODULE_1__.GamePlayerService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_2__.GameService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_3__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router));
};

PlayerCardComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
  type: PlayerCardComponent,
  selectors: [["app-player-card"]],
  inputs: {
    player: "player",
    position: "position"
  },
  decls: 12,
  vars: 7,
  consts: [[1, "mdc-card", "card"], ["tabindex", "0", 1, "mdc-card__primary-action", "details", 3, "click"], [1, "flex-box-rows"], [1, "mdc-button__label", "position", "flex-box-item"], [1, "mdc-button__label", "name", "flex-box-item"], [4, "ngIf"], [1, "mdc-button__label", "score"], ["mat-icon-button", "", "color", "primary", "aria-label", "game details", "title", "player details", 3, "click"], ["mat-icon-button", "", "color", "primary", "aria-label", "delete game", "title", "delete player", 3, "click"]],
  template: function PlayerCardComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-card", 0)(1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function PlayerCardComponent_Template_div_click_1_listener() {
        return ctx.view(ctx.player);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, PlayerCardComponent_span_7_Template, 2, 0, "span", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](10, PlayerCardComponent_div_10_Template, 7, 0, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](11, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.position);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx.player.displayName, " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.currentUser && ctx.player.uid === ctx.currentUser.uid);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.totalPoints);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](11, 5, ctx.isAdmin$));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__.MatIcon, _angular_material_card__WEBPACK_IMPORTED_MODULE_10__.MatCard, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatButton, _angular_common__WEBPACK_IMPORTED_MODULE_8__.AsyncPipe],
  styles: [".card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin: 1rem;\n}\n  \n.details[_ngcontent-%COMP%] {\n  flex-grow: 10;    \n  cursor: pointer; \n}\n  \n.position[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n  \n.name[_ngcontent-%COMP%] {\n  flex-grow: 9;\n  flex-basis: 0;\n}\n  \n.score[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n  \n.players[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-size: small;\n  color: white;\n  padding: 0.8em 0.7em 0 0.7em;\n  background-color: #405061;\n  line-height: 1em;\n  position: relative;\n  left: -1px;\n  top: -4px;\n  height: 1.8em;\n  min-width: 16px;\n  text-align: right;\n  margin-right: .8em;\n  border-radius: 4px 0 0 4px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsYXllci1jYXJkLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsZ0JBQWdCO0VBQ2hCLFlBQVk7RUFDWiw0QkFBNEI7RUFDNUIseUJBQXlCO0VBQ3pCLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLFNBQVM7RUFDVCxhQUFhO0VBQ2IsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsMEJBQTBCO0FBQzVCIiwiZmlsZSI6InBsYXllci1jYXJkLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcbi5jYXJkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWFyZ2luOiAxcmVtO1xufVxuICBcbi5kZXRhaWxzIHtcbiAgZmxleC1ncm93OiAxMDsgICAgXG4gIGN1cnNvcjogcG9pbnRlcjsgXG59XG4gIFxuLnBvc2l0aW9uIHtcbiAgZmxleC1ncm93OiAxO1xufVxuXG4ubmFtZSB7XG4gIGZsZXgtZ3JvdzogOTtcbiAgZmxleC1iYXNpczogMDtcbn1cblxuLnNjb3JlIHtcbiAgZmxleC1ncm93OiAxO1xufVxuXG4ucGxheWVycyAuYmFkZ2Uge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGZvbnQtc2l6ZTogc21hbGw7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgcGFkZGluZzogMC44ZW0gMC43ZW0gMCAwLjdlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQwNTA2MTtcbiAgbGluZS1oZWlnaHQ6IDFlbTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBsZWZ0OiAtMXB4O1xuICB0b3A6IC00cHg7XG4gIGhlaWdodDogMS44ZW07XG4gIG1pbi13aWR0aDogMTZweDtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gIG1hcmdpbi1yaWdodDogLjhlbTtcbiAgYm9yZGVyLXJhZGl1czogNHB4IDAgMCA0cHg7XG59Il19 */"]
});

/***/ }),

/***/ 4896:
/*!****************************************************************************!*\
  !*** ./src/app/components/player/player-search/player-search.component.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlayerSearchComponent": () => (/* binding */ PlayerSearchComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 228);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 1989);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 8977);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 2673);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var src_app_services_gamePlayer_game_player_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/gamePlayer/game-player.service */ 9595);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 124);







function PlayerSearchComponent_li_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "li")(1, "a", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const player_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate1"]("routerLink", "/detail/", player_r2.uid, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", player_r2.displayName, " ");
  }
}

class PlayerSearchComponent {
  constructor(playerService) {
    this.playerService = playerService;
    this.searchTerms = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
  } // Push a search term into the observable stream.


  search(term) {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.players$ = this.searchTerms.pipe( // wait 300ms after each keystroke before considering the term
    (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.debounceTime)(300), // ignore new term if same as previous term
    (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.distinctUntilChanged)(), // switch to new search observable each time the term changes
    (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.switchMap)(term => this.playerService.searchPlayers(term)));
  }

}

PlayerSearchComponent.ɵfac = function PlayerSearchComponent_Factory(t) {
  return new (t || PlayerSearchComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_gamePlayer_game_player_service__WEBPACK_IMPORTED_MODULE_0__.GamePlayerService));
};

PlayerSearchComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: PlayerSearchComponent,
  selectors: [["app-player-search"]],
  decls: 8,
  vars: 3,
  consts: [["id", "search-component"], ["for", "search-box"], ["id", "search-box", 3, "input"], ["searchBox", ""], [1, "search-result"], [4, "ngFor", "ngForOf"], [3, "routerLink"]],
  template: function PlayerSearchComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "label", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Player Search");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "input", 2, 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("input", function PlayerSearchComponent_Template_input_input_3_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);

        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](4);

        return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx.search(_r0.value));
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "ul", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, PlayerSearchComponent_li_6_Template, 3, 2, "li", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](7, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](7, 1, ctx.players$));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLinkWithHref, _angular_common__WEBPACK_IMPORTED_MODULE_6__.AsyncPipe],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwbGF5ZXItc2VhcmNoLmNvbXBvbmVudC5jc3MifQ== */"]
});

/***/ }),

/***/ 6097:
/*!*************************************************************************!*\
  !*** ./src/app/components/progress-dialog/progress-dialog.component.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProgressDialogComponent": () => (/* binding */ ProgressDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ 1484);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/progress-spinner */ 1708);




class ProgressDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.message = 'Loading';
    }
    ngOnInit() {
        if (this.data?.message) {
            this.message = this.data.message;
        }
    }
}
ProgressDialogComponent.ɵfac = function ProgressDialogComponent_Factory(t) { return new (t || ProgressDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MAT_DIALOG_DATA)); };
ProgressDialogComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProgressDialogComponent, selectors: [["app-progress-dialog"]], decls: 4, vars: 1, consts: [[1, "mat-body", "progress-dialog-message"]], template: function ProgressDialogComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-spinner");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.message, " ");
    } }, dependencies: [_angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_2__.MatProgressSpinner], styles: [".progress-dialog-message[_ngcontent-%COMP%] {\n    padding-top: 1rem;\n    text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2dyZXNzLWRpYWxvZy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksaUJBQWlCO0lBQ2pCLGtCQUFrQjtBQUN0QiIsImZpbGUiOiJwcm9ncmVzcy1kaWFsb2cuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wcm9ncmVzcy1kaWFsb2ctbWVzc2FnZSB7XG4gICAgcGFkZGluZy10b3A6IDFyZW07XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xufSJdfQ== */"] });


/***/ }),

/***/ 1885:
/*!*********************************************************************!*\
  !*** ./src/app/components/round/round-card/round-card.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RoundCardComponent": () => (/* binding */ RoundCardComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var _confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../confirm-dialog/confirm-dialog.component */ 4949);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/game/game.service */ 1437);
/* harmony import */ var src_app_services_round_mediator_round_mediator_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/round-mediator/round-mediator.service */ 4180);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ 1484);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ 7822);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/card */ 2156);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ 4522);












function RoundCardComponent_mat_icon_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-icon", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "checkmark");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}

function RoundCardComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div")(1, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function RoundCardComponent_div_7_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r2.delete(ctx_r2.round));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
}

class RoundCardComponent {
  constructor(gameService, roundMediatorService, dialog, router) {
    this.gameService = gameService;
    this.roundMediatorService = roundMediatorService;
    this.dialog = dialog;
    this.router = router;
    this.isAdmin$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(false);
    this.allTablesPointsConfirmed$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(false);
    this.subscriptions = [];
  }

  ngOnInit() {
    this.allTablesPointsConfirmed$ = this.roundMediatorService.allTablesConfirmed(this.round.id, this.gameId);
    this.isAdmin$ = this.gameService.isCurrentUserAdmin(this.gameId);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  delete(round) {
    const dialogRef = this.dialog.open(_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_0__.ConfirmDialogComponent, {
      panelClass: 'dialog-container',
      data: {
        title: 'Delete Round',
        message: 'Are you sure you want to delete this round?',
        confirmButtonText: 'Yes'
      }
    });
    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.roundMediatorService.deleteRound(round.id, this.gameId);
      }
    }));
  }

  view(round) {
    this.router.navigateByUrl(`/game/${this.gameId}/round/${round.id}`);
  }

  configuration() {
    this.router.navigateByUrl(`/game/${this.gameId}/configuration`);
  }

}

RoundCardComponent.ɵfac = function RoundCardComponent_Factory(t) {
  return new (t || RoundCardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_1__.GameService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_round_mediator_round_mediator_service__WEBPACK_IMPORTED_MODULE_2__.RoundMediatorService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router));
};

RoundCardComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: RoundCardComponent,
  selectors: [["app-round-card"]],
  inputs: {
    round: "round",
    gameId: "gameId"
  },
  decls: 9,
  vars: 7,
  consts: [[1, "mdc-card", "card"], ["tabindex", "0", 1, "mdc-card__primary-action", "details", 3, "click"], [1, "flex-box-rows"], [1, "mdc-button__label", "name", "flex-box-item"], ["color", "accent", "title", "All Points Confirmed", 4, "ngIf"], [4, "ngIf"], ["color", "accent", "title", "All Points Confirmed"], ["mat-icon-button", "", "color", "primary", "aria-label", "delete round", "title", "delete round", 3, "click"]],
  template: function RoundCardComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-card", 0)(1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function RoundCardComponent_Template_div_click_1_listener() {
        return ctx.view(ctx.round);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, RoundCardComponent_mat_icon_5_Template, 2, 0, "mat-icon", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](6, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](7, RoundCardComponent_div_7_Template, 4, 0, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](8, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" Round ", ctx.round.number, " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](6, 3, ctx.allTablesPointsConfirmed$));
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](8, 5, ctx.isAdmin$));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__.MatIcon, _angular_material_card__WEBPACK_IMPORTED_MODULE_9__.MatCard, _angular_material_button__WEBPACK_IMPORTED_MODULE_10__.MatButton, _angular_common__WEBPACK_IMPORTED_MODULE_7__.AsyncPipe],
  styles: [".content[_ngcontent-%COMP%] {    \n    padding: 1rem;\n  }\n  \n.card[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    margin: 1rem;\n}\n  \n.details[_ngcontent-%COMP%] {\n    flex-grow: 10;\n    cursor: pointer; \n}\n  \n.actions[_ngcontent-%COMP%] {\n    flex-grow: 1;\n}\n  \n.badge[_ngcontent-%COMP%] {\n    display: inline-block;\n    font-size: small;\n    color: white;\n    padding: 0.8em 0.7em 0 0.7em;\n    background-color: #405061;\n    line-height: 1em;\n    position: relative;\n    left: -1px;\n    top: -4px;\n    height: 1.8em;\n    min-width: 16px;\n    text-align: right;\n    margin-right: .8em;\n    border-radius: 4px 0 0 4px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdW5kLWNhcmQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGFBQWE7RUFDZjs7QUFFRjtJQUNJLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixlQUFlO0FBQ25COztBQUVBO0lBQ0ksWUFBWTtBQUNoQjs7QUFFQTtJQUNJLHFCQUFxQjtJQUNyQixnQkFBZ0I7SUFDaEIsWUFBWTtJQUNaLDRCQUE0QjtJQUM1Qix5QkFBeUI7SUFDekIsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsU0FBUztJQUNULGFBQWE7SUFDYixlQUFlO0lBQ2YsaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQiwwQkFBMEI7QUFDOUIiLCJmaWxlIjoicm91bmQtY2FyZC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRlbnQgeyAgICBcbiAgICBwYWRkaW5nOiAxcmVtO1xuICB9XG4gIFxuLmNhcmQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBtYXJnaW46IDFyZW07XG59XG5cbi5kZXRhaWxzIHtcbiAgICBmbGV4LWdyb3c6IDEwO1xuICAgIGN1cnNvcjogcG9pbnRlcjsgXG59XG5cbi5hY3Rpb25zIHtcbiAgICBmbGV4LWdyb3c6IDE7XG59XG5cbi5iYWRnZSB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIGZvbnQtc2l6ZTogc21hbGw7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIHBhZGRpbmc6IDAuOGVtIDAuN2VtIDAgMC43ZW07XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzQwNTA2MTtcbiAgICBsaW5lLWhlaWdodDogMWVtO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBsZWZ0OiAtMXB4O1xuICAgIHRvcDogLTRweDtcbiAgICBoZWlnaHQ6IDEuOGVtO1xuICAgIG1pbi13aWR0aDogMTZweDtcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICBtYXJnaW4tcmlnaHQ6IC44ZW07XG4gICAgYm9yZGVyLXJhZGl1czogNHB4IDAgMCA0cHg7XG59Il19 */"]
});

/***/ }),

/***/ 3737:
/*!*************************************************************************!*\
  !*** ./src/app/components/round/round-detail/round-detail.component.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RoundDetailComponent": () => (/* binding */ RoundDetailComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 9295);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 2673);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var src_app_services_round_round_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/round/round.service */ 1939);
/* harmony import */ var src_app_services_table_table_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/table/table.service */ 5148);
/* harmony import */ var src_app_services_round_mediator_round_mediator_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/round-mediator/round-mediator.service */ 4180);
/* harmony import */ var src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/game/game.service */ 1437);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/button */ 4522);
/* harmony import */ var _table_tables_tables_tables_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../table/tables/tables/tables.component */ 8811);
/* harmony import */ var _section_header_section_header_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../section-header/section-header.component */ 1702);













function RoundDetailComponent_div_0_span_11_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, ", ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}

function RoundDetailComponent_div_0_span_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, RoundDetailComponent_div_0_span_11_span_1_Template, 2, 0, "span", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const player_r6 = ctx.$implicit;
    const i_r7 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", i_r7 > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](player_r6.displayName);
  }
}

function RoundDetailComponent_div_0_span_16_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, ", ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}

function RoundDetailComponent_div_0_span_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, RoundDetailComponent_div_0_span_16_span_1_Template, 2, 0, "span", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const table_r9 = ctx.$implicit;
    const i_r10 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", i_r10 > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("Table ", table_r9.number, "");
  }
}

function RoundDetailComponent_div_0_span_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " All Table's Points Confirmed ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}

function RoundDetailComponent_div_0_div_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 3)(1, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RoundDetailComponent_div_0_div_20_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r13);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r12.endRound());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, " End Round ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](2, 1, ctx_r4.allTablesPointsConfirmed$) === false);
  }
}

function RoundDetailComponent_div_0_app_tables_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "app-tables", 9);
  }

  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("tables", ctx_r5.tables);
  }
}

function RoundDetailComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "app-section-header", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "div", 2)(3, "div", 3)(4, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "Round Id: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "div", 3)(9, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](11, RoundDetailComponent_div_0_span_11_Template, 4, 2, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "div", 3)(13, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](15, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](16, RoundDetailComponent_div_0_span_16_Template, 4, 2, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](17, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](18, RoundDetailComponent_div_0_span_18_Template, 2, 0, "span", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](19, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](20, RoundDetailComponent_div_0_div_20_Template, 4, 3, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](21, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](22, RoundDetailComponent_div_0_app_tables_22_Template, 1, 1, "app-tables", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    let tmp_4_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("sectionName", ctx_r0.sectionName);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r0.round.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("Byes (", ctx_r0.round.byes.length, "): ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r0.round.byes);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("Tables with unconfirmed Points (", (tmp_4_0 = (tmp_4_0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](15, 9, ctx_r0.unConfirmedTables$)) == null ? null : tmp_4_0.length) !== null && tmp_4_0 !== undefined ? tmp_4_0 : 0, "): ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](17, 11, ctx_r0.unConfirmedTables$));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](19, 13, ctx_r0.allTablesPointsConfirmed$));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](21, 15, ctx_r0.isAdmin$));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.tables);
  }
}

class RoundDetailComponent {
  constructor(router, route, roundService, tableService, roundMediatorService, gameService, location) {
    this.router = router;
    this.route = route;
    this.roundService = roundService;
    this.tableService = tableService;
    this.roundMediatorService = roundMediatorService;
    this.gameService = gameService;
    this.location = location;
    this.unConfirmedTables$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.of)([]);
    this.allTablesPointsConfirmed$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.of)(false);
    this.isAdmin$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.of)(false);
    this.subscriptions = [];
  }

  ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    this.roundId = this.route.snapshot.paramMap.get('roundId');
    this.getRound();
    this.getTables();
    this.allTablesPointsConfirmed$ = this.roundMediatorService.allTablesConfirmed(this.roundId, this.gameId);
    this.unConfirmedTables$ = this.roundMediatorService.unconfirmedTables(this.roundId, this.gameId);
    this.isAdmin$ = this.gameService.isCurrentUserAdmin(this.gameId);
    return;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  endRound() {
    this.subscriptions.push(this.allTablesPointsConfirmed$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.switchMap)(confirmed => {
      if (confirmed) {
        return this.roundMediatorService.updatePlayerPoints(this.roundId, this.gameId, this.round.number);
      }
    })).subscribe({
      next: () => {
        this.roundMediatorService.updateByePlayerPoints(this.roundId, this.gameId).subscribe({
          complete: () => {
            // TODO: add points calculated property?
            this.router.navigateByUrl(`/game/${this.gameId}/dashboard`);
          }
        });
      }
    }));
  }

  getRound() {
    this.subscriptions.push(this.roundService.getRound(this.roundId, this.gameId).subscribe({
      next: round => {
        this.round = round;
        this.sectionName = `Round ${round.number}`;
      }
    }));
  }

  getTables() {
    this.subscriptions.push(this.tableService.getTablesForRound(this.roundId, this.gameId).subscribe({
      next: tables => {
        if (tables) {
          this.tables = tables;
        }
      }
    }));
  }

  goBack() {
    this.location.back();
  }

}

RoundDetailComponent.ɵfac = function RoundDetailComponent_Factory(t) {
  return new (t || RoundDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_services_round_round_service__WEBPACK_IMPORTED_MODULE_0__.RoundService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_services_table_table_service__WEBPACK_IMPORTED_MODULE_1__.TableService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_services_round_mediator_round_mediator_service__WEBPACK_IMPORTED_MODULE_2__.RoundMediatorService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_3__.GameService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_11__.Location));
};

RoundDetailComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: RoundDetailComponent,
  selectors: [["app-round-detail"]],
  decls: 1,
  vars: 1,
  consts: [[4, "ngIf"], [3, "sectionName"], [1, "content", "flex-box-columns", "mat-typography"], [1, "flex-box-item"], [1, "mat-h3"], [4, "ngFor", "ngForOf"], ["class", "flex-box-item", 4, "ngIf"], [3, "tables", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", "aria-label", "Back", "title", "Back", 1, "full-width", 3, "disabled", "click"], [3, "tables"]],
  template: function RoundDetailComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](0, RoundDetailComponent_div_0_Template, 23, 17, "div", 0);
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.round);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _angular_material_button__WEBPACK_IMPORTED_MODULE_12__.MatButton, _table_tables_tables_tables_component__WEBPACK_IMPORTED_MODULE_4__.TablesComponent, _section_header_section_header_component__WEBPACK_IMPORTED_MODULE_5__.SectionHeaderComponent, _angular_common__WEBPACK_IMPORTED_MODULE_11__.AsyncPipe],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyb3VuZC1kZXRhaWwuY29tcG9uZW50LmNzcyJ9 */"]
});

/***/ }),

/***/ 8453:
/*!*************************************************************!*\
  !*** ./src/app/components/round/rounds/rounds.component.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RoundsComponent": () => (/* binding */ RoundsComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 6562);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 591);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 9295);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 2673);
/* harmony import */ var _confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../confirm-dialog/confirm-dialog.component */ 4949);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var src_app_services_round_round_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/round/round.service */ 1939);
/* harmony import */ var src_app_services_round_mediator_round_mediator_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/round-mediator/round-mediator.service */ 4180);
/* harmony import */ var src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/game/game.service */ 1437);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/dialog */ 1484);
/* harmony import */ var src_app_services_gamePlayer_game_player_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/gamePlayer/game-player.service */ 9595);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/toolbar */ 2543);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/button */ 4522);
/* harmony import */ var _round_card_round_card_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../round-card/round-card.component */ 1885);














function RoundsComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div")(1, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RoundsComponent_div_4_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r4.startRound(ctx_r4.rounds.length + 1)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" Start Round ", ctx_r0.rounds.length + 1, " ");
} }
function RoundsComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " There are no rounds.\n");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} }
function RoundsComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " Number of rounds is set to 0. Edit the game configuration. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RoundsComponent_div_6_Template_button_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r6.configuration()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, " Configuration ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
} }
function RoundsComponent_div_7_app_round_card_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "app-round-card", 9);
} if (rf & 2) {
    const round_r9 = ctx.$implicit;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("round", round_r9)("gameId", ctx_r8.game.id);
} }
function RoundsComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, RoundsComponent_div_7_app_round_card_1_Template, 1, 2, "app-round-card", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r3.rounds);
} }
class RoundsComponent {
    constructor(roundService, roundMediatorService, gameService, router, dialog, playerService) {
        this.roundService = roundService;
        this.roundMediatorService = roundMediatorService;
        this.gameService = gameService;
        this.router = router;
        this.dialog = dialog;
        this.playerService = playerService;
        this.rounds = [];
        this.isUserAdmin = false;
        this.allTablesPointsConfirmed$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.of)(false);
        this.subscriptions = [];
    }
    ngOnInit() {
        this.getRounds();
        this.subscriptions.push(this.gameService.isCurrentUserAdmin(this.game.id).subscribe({
            next: (isAdmin) => {
                this.isUserAdmin = isAdmin;
            }
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
    getRounds() {
        this.subscriptions.push(this.roundService.roundsForGame(this.game.id).subscribe({
            next: (rounds) => {
                if (rounds.length === 0) {
                    this.rounds = [];
                    return;
                }
                this.rounds = rounds.sort((a, b) => a.number - b.number);
                const lastRound = this.rounds[this.rounds.length - 1];
                this.allTablesPointsConfirmed$ = this.roundMediatorService.allTablesConfirmed(lastRound.id, this.game.id);
            }
        }));
    }
    startRound(roundNumber) {
        this.subscriptions.push((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.combineLatest)([
            this.allTablesPointsConfirmed$,
            this.playerService.playersForGame(this.game.id).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.take)(1))
        ]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.switchMap)(([allPointsConfirmed, players]) => {
            if (roundNumber > 1 && !allPointsConfirmed) {
                this.showErrorDialog('Start Round', `Please confirm all points for round ${roundNumber - 1} first`);
                return rxjs__WEBPACK_IMPORTED_MODULE_11__.EMPTY;
            }
            if (players && players.length < 4) {
                this.showErrorDialog('Start Round', 'You need to have at least 4 players to start a round');
                return rxjs__WEBPACK_IMPORTED_MODULE_11__.EMPTY;
            }
            if (roundNumber <= this.game.numberOfRounds) {
                return this.roundMediatorService.createRound(this.game.id);
            }
        })).subscribe({
            next: (tables) => {
                if (tables) {
                    const lastRoundId = this.rounds[this.rounds.length - 1].id;
                    this.router.navigateByUrl(`/game/${this.game.id}/round/${lastRoundId}`);
                }
            }
        }));
    }
    configuration() {
        this.router.navigateByUrl(`/game/${this.game.id}/configuration`);
    }
    showErrorDialog(title, message) {
        const dialogRef = this.dialog.open(_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_0__.ConfirmDialogComponent, {
            panelClass: 'dialog-container',
            data: {
                title,
                message,
                showActionButtons: false
            }
        });
        this.subscriptions.push(dialogRef.afterClosed().subscribe());
    }
}
RoundsComponent.ɵfac = function RoundsComponent_Factory(t) { return new (t || RoundsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_services_round_round_service__WEBPACK_IMPORTED_MODULE_1__.RoundService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_services_round_mediator_round_mediator_service__WEBPACK_IMPORTED_MODULE_2__.RoundMediatorService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_3__.GameService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_12__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_13__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_services_gamePlayer_game_player_service__WEBPACK_IMPORTED_MODULE_4__.GamePlayerService)); };
RoundsComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: RoundsComponent, selectors: [["app-rounds"]], inputs: { game: "game" }, decls: 8, vars: 4, consts: [[1, "flex-box-rows"], ["color", "accent"], [1, "flex-box-item"], [4, "ngIf"], ["class", "rounds", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", "aria-label", "start round", "title", "start round", 3, "click"], ["mat-raised-button", "", "color", "primary", "aria-label", "Configuration", "title", "Configuration", 3, "click"], [1, "rounds"], [3, "round", "gameId", 4, "ngFor", "ngForOf"], [3, "round", "gameId"]], template: function RoundsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0)(1, "mat-toolbar", 1)(2, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "Rounds");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, RoundsComponent_div_4_Template, 3, 1, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, RoundsComponent_div_5_Template, 2, 0, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, RoundsComponent_div_6_Template, 4, 0, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, RoundsComponent_div_7_Template, 2, 1, "div", 4);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.isUserAdmin && (ctx.game.numberOfRounds > 0 && ctx.rounds.length === 0 || ctx.rounds.length < ctx.game.numberOfRounds));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.rounds.length === 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", (!ctx.game.numberOfRounds || ctx.game.numberOfRounds === 0) && ctx.isUserAdmin);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.rounds.length > 0);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_15__.MatToolbar, _angular_material_button__WEBPACK_IMPORTED_MODULE_16__.MatButton, _round_card_round_card_component__WEBPACK_IMPORTED_MODULE_5__.RoundCardComponent], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyb3VuZHMuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ 1702:
/*!***********************************************************************!*\
  !*** ./src/app/components/section-header/section-header.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SectionHeaderComponent": () => (/* binding */ SectionHeaderComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/toolbar */ 2543);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ 4522);




class SectionHeaderComponent {
    constructor(location) {
        this.location = location;
    }
    goBack() {
        this.location.back();
    }
}
SectionHeaderComponent.ɵfac = function SectionHeaderComponent_Factory(t) { return new (t || SectionHeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_1__.Location)); };
SectionHeaderComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SectionHeaderComponent, selectors: [["app-section-header"]], inputs: { sectionName: "sectionName" }, decls: 8, vars: 1, consts: [[1, "flex-box-rows"], ["color", "accent"], [1, "flex-box-item"], ["mat-raised-button", "", "color", "primary", "aria-label", "Back", "title", "Back", 3, "click"]], template: function SectionHeaderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "mat-toolbar", 1)(2, "div", 2)(3, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div")(6, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SectionHeaderComponent_Template_button_click_6_listener() { return ctx.goBack(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " Back ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.sectionName);
    } }, dependencies: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_2__.MatToolbar, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButton], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZWN0aW9uLWhlYWRlci5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ 5200:
/*!*************************************************************************!*\
  !*** ./src/app/components/system-messages/system-messages.component.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SystemMessagesComponent": () => (/* binding */ SystemMessagesComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var src_app_services_message_message_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/message/message.service */ 7849);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 4666);



function SystemMessagesComponent_div_0_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const message_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", message_r2, " ");
} }
function SystemMessagesComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div")(1, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Messages");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function SystemMessagesComponent_div_0_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r3.messageService.clear()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Clear messages");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, SystemMessagesComponent_div_0_div_5_Template, 2, 1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.messageService.messages);
} }
class SystemMessagesComponent {
    constructor(messageService) {
        this.messageService = messageService;
    }
}
SystemMessagesComponent.ɵfac = function SystemMessagesComponent_Factory(t) { return new (t || SystemMessagesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_message_message_service__WEBPACK_IMPORTED_MODULE_0__.MessageService)); };
SystemMessagesComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: SystemMessagesComponent, selectors: [["app-system-messages"]], decls: 1, vars: 1, consts: [[4, "ngIf"], ["type", "button", 1, "clear", 3, "click"], [4, "ngFor", "ngForOf"]], template: function SystemMessagesComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, SystemMessagesComponent_div_0_Template, 6, 1, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.messageService.messages.length);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzeXN0ZW0tbWVzc2FnZXMuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ 5833:
/*!*************************************************************************!*\
  !*** ./src/app/components/table/table-detail/table-detail.component.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TableDetailComponent": () => (/* binding */ TableDetailComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 6562);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 9295);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var src_app_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/auth/auth.service */ 1228);
/* harmony import */ var src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/game/game.service */ 1437);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var src_app_services_team_team_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/team/team.service */ 790);
/* harmony import */ var src_app_services_table_table_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/table/table.service */ 5148);
/* harmony import */ var src_app_services_round_mediator_round_mediator_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/round-mediator/round-mediator.service */ 4180);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/toolbar */ 2543);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ 7822);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ 4522);
/* harmony import */ var _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/flex-layout/extended */ 3704);
/* harmony import */ var _team_team_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../team/team.component */ 1157);















function TableDetailComponent_div_3_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function TableDetailComponent_div_3_button_2_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2); return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r4.toggleConfirmPoints(true)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "check");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, " Confirm Points ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", ctx_r2.isDisabled);
} }
function TableDetailComponent_div_3_button_3_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function TableDetailComponent_div_3_button_3_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2); return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r6.toggleConfirmPoints(false)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, " Change Points ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", ctx_r3.isDisabled);
} }
function TableDetailComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div")(1, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, TableDetailComponent_div_3_button_2_Template, 4, 1, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, TableDetailComponent_div_3_button_3_Template, 4, 1, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r0.pointsConfirmed);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.pointsConfirmed);
} }
function TableDetailComponent_app_team_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "app-team", 7);
} if (rf & 2) {
    const team_r8 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("team", team_r8)("table", ctx_r1.table);
} }
class TableDetailComponent {
    constructor(authService, gameService, route, teamService, tableService, roundMediatorService) {
        this.authService = authService;
        this.gameService = gameService;
        this.route = route;
        this.teamService = teamService;
        this.tableService = tableService;
        this.roundMediatorService = roundMediatorService;
        this.pointsConfirmed = false;
        this.isDisabled = false;
        this.subscriptions = [];
        this.isCurrentUserAdmin = false;
    }
    ngOnInit() {
        this.gameId = this.route.snapshot.paramMap.get('gameId');
        this.roundId = this.route.snapshot.paramMap.get('roundId');
        this.getTeams();
        this.subscriptions.push((0,rxjs__WEBPACK_IMPORTED_MODULE_7__.combineLatest)([
            this.gameService.isCurrentUserAdmin(this.gameId),
            this.roundMediatorService.allTablesConfirmed(this.roundId, this.gameId)
        ]).subscribe({
            next: ([isAdmin, confirmed]) => {
                this.isCurrentUserAdmin = isAdmin;
                if (!isAdmin && confirmed) {
                    this.isDisabled = true;
                }
                else {
                    this.isDisabled = false;
                }
            }
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
    getTeams() {
        const currentUser = this.authService.getCurrentUser();
        if (!currentUser) {
            return;
        }
        this.subscriptions.push((0,rxjs__WEBPACK_IMPORTED_MODULE_7__.combineLatest)([
            this.gameService.isUserAdmin(currentUser.uid, this.gameId),
            this.teamService.getTeamsForTable(this.table.id, this.roundId, this.gameId)
        ]).subscribe({
            next: ([isAdmin, updatedTeams]) => {
                if (updatedTeams) {
                    // if teams is already defined, then update local data
                    if (this.teams) {
                        updatedTeams.forEach((updatedTeam) => {
                            const existingTeam = this.teams.find((et) => et.id === updatedTeam.id);
                            if (existingTeam) {
                                existingTeam.points = updatedTeam.points;
                                existingTeam.teamPlayers = updatedTeam.teamPlayers;
                            }
                        });
                    }
                    else {
                        this.teams = updatedTeams;
                    }
                    updatedTeams.forEach((team) => {
                        const updatedCurrentPlayer = team.teamPlayers.find((teamPlayer) => teamPlayer.player.uid === currentUser.uid);
                        if (updatedCurrentPlayer) {
                            this.currentTeamPlayer = updatedCurrentPlayer;
                        }
                    });
                    this.checkPointsConfirmed(isAdmin);
                }
            }
        }));
    }
    toggleConfirmPoints(confirm) {
        const currentUser = this.authService.getCurrentUser();
        this.subscriptions.push(this.gameService.isUserAdmin(currentUser.uid, this.gameId).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.take)(1)).subscribe({
            next: (isAdmin) => {
                // if current user is admin, then set all team players points confirmed
                if (isAdmin) {
                    this.teams.forEach((team) => {
                        team.teamPlayers.forEach((teamPlayer) => {
                            teamPlayer.isPointsConfirmed = confirm;
                        });
                        this.teamService.updateTeam(team, this.table.id, this.roundId, this.gameId).subscribe({
                            next: () => {
                                this.checkPointsConfirmed(isAdmin);
                            }
                        });
                    });
                }
                else if (this.currentTeamPlayer) {
                    // else if user is a team player, then only set their points confirmed value
                    // find the team to update
                    this.teams.forEach((team) => {
                        const teamPlayer = team.teamPlayers.find((tp) => tp.player.uid === currentUser.uid);
                        // if current user is on this team, then update it
                        if (teamPlayer) {
                            team.teamPlayers.forEach((tp) => {
                                tp.isPointsConfirmed = confirm;
                            });
                            this.teamService.updateTeam(team, this.table.id, this.roundId, this.gameId).subscribe({
                                next: () => {
                                    this.checkPointsConfirmed(isAdmin);
                                }
                            });
                        }
                    });
                }
            }
        }));
    }
    checkPointsConfirmed(isAdmin) {
        let confirmCounter = 0;
        this.teams.forEach((team) => {
            team.teamPlayers.forEach((teamPlayer) => {
                if (teamPlayer.isPointsConfirmed) {
                    confirmCounter++;
                }
            });
        });
        const allPlayersConfirmed = confirmCounter === 4;
        if (isAdmin) {
            this.pointsConfirmed = allPlayersConfirmed;
        }
        else {
            this.pointsConfirmed = confirmCounter > 0;
        }
        if (this.table.pointsConfirmed !== allPlayersConfirmed) {
            this.table.pointsConfirmed = allPlayersConfirmed;
            this.tableService.updateTable(this.table, this.roundId, this.gameId);
        }
    }
}
TableDetailComponent.ɵfac = function TableDetailComponent_Factory(t) { return new (t || TableDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_1__.GameService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_services_team_team_service__WEBPACK_IMPORTED_MODULE_2__.TeamService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_services_table_table_service__WEBPACK_IMPORTED_MODULE_3__.TableService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_services_round_mediator_round_mediator_service__WEBPACK_IMPORTED_MODULE_4__.RoundMediatorService)); };
TableDetailComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: TableDetailComponent, selectors: [["app-table-detail"]], inputs: { table: "table" }, decls: 6, vars: 5, consts: [["color", "secondary", 1, "flex-box-rows"], [1, "flex-box-item"], [4, "ngIf"], [3, "ngClass.gt-xs", "ngClass.lt-sm"], ["class", "flex-box-item", 3, "team", "table", 4, "ngFor", "ngForOf"], ["mat-raised-button", "", "color", "primary", 3, "disabled", "click", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", 3, "disabled", "click"], [1, "flex-box-item", 3, "team", "table"]], template: function TableDetailComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "mat-toolbar", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, TableDetailComponent_div_3_Template, 4, 2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, TableDetailComponent_app_team_5_Template, 1, 2, "app-team", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("Table ", ctx.table.number, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.isCurrentUserAdmin);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass.gt-xs", "flex-box-rows")("ngClass.lt-sm", "flex-box-columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx.teams);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_11__.MatToolbar, _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButton, _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_14__.DefaultClassDirective, _team_team_component__WEBPACK_IMPORTED_MODULE_5__.TeamComponent], styles: [".teams[_ngcontent-%COMP%] {\n    overflow-y: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhYmxlLWRldGFpbC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksZ0JBQWdCO0FBQ3BCIiwiZmlsZSI6InRhYmxlLWRldGFpbC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRlYW1zIHtcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xufSJdfQ== */"] });


/***/ }),

/***/ 8811:
/*!********************************************************************!*\
  !*** ./src/app/components/table/tables/tables/tables.component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TablesComponent": () => (/* binding */ TablesComponent)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 9295);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var src_app_services_table_table_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/table/table.service */ 5148);
/* harmony import */ var src_app_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/auth/auth.service */ 1228);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var src_app_services_gamePlayer_game_player_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/gamePlayer/game-player.service */ 9595);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/toolbar */ 2543);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ 4522);
/* harmony import */ var _table_detail_table_detail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../table-detail/table-detail.component */ 5833);










function TablesComponent_div_3_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function TablesComponent_div_3_button_2_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2); return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r4.filterTables()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Show All Tables");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function TablesComponent_div_3_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function TablesComponent_div_3_button_4_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2); return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r6.filterTables()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Show My Table");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function TablesComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div")(1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, TablesComponent_div_3_button_2_Template, 2, 0, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, TablesComponent_div_3_button_4_Template, 2, 0, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.isDataFiltered);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx_r0.isDataFiltered);
} }
function TablesComponent_app_table_detail_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "app-table-detail", 7);
} if (rf & 2) {
    const table_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("table", table_r8);
} }
class TablesComponent {
    constructor(tableService, authService, route, gamePlayerService) {
        this.tableService = tableService;
        this.authService = authService;
        this.route = route;
        this.gamePlayerService = gamePlayerService;
        this.isDataFiltered = false;
        this.isUserPlayer = true;
        this.subscriptions = [];
    }
    ngOnInit() {
        this.currentUser = this.authService.getCurrentUser();
        this.gameId = this.route.snapshot.paramMap.get('gameId');
        this.roundId = this.route.snapshot.paramMap.get('roundId');
        this.filteredTables = this.tables.sort((a, b) => a.number - b.number);
        this.checkCurrentUserIsPlayer();
    }
    ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
    filterTables() {
        this.isDataFiltered = !this.isDataFiltered;
        if (this.currentUser && this.isDataFiltered) {
            this.subscriptions.push(this.tableService.getTableForPlayer(this.currentUser.uid, this.roundId, this.gameId).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.take)(1)).subscribe({
                next: (playerTable) => {
                    if (playerTable) {
                        this.filterString = playerTable.id;
                    }
                    else {
                        this.filterString = undefined;
                    }
                    this.filteredTables = this.filterString ? this.tables.filter((table) => table.id === this.filterString) : this.tables;
                }
            }));
        }
        else {
            this.filteredTables = this.tables;
        }
        this.filteredTables.sort((a, b) => a.number - b.number);
    }
    checkCurrentUserIsPlayer() {
        if (!this.currentUser) {
            this.isUserPlayer = false;
            return;
        }
        this.subscriptions.push(this.gamePlayerService.getPlayer(this.currentUser.uid, this.gameId).subscribe({
            next: (player) => {
                if (player) {
                    this.isUserPlayer = true;
                    this.filterTables();
                }
                else {
                    this.isUserPlayer = false;
                }
            }
        }));
    }
}
TablesComponent.ɵfac = function TablesComponent_Factory(t) { return new (t || TablesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_services_table_table_service__WEBPACK_IMPORTED_MODULE_0__.TableService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_services_gamePlayer_game_player_service__WEBPACK_IMPORTED_MODULE_2__.GamePlayerService)); };
TablesComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: TablesComponent, selectors: [["app-tables"]], inputs: { tables: "tables" }, decls: 5, vars: 2, consts: [["color", "accent", 1, "flex-box-rows"], [1, "flex-box-item", "flex-box-item-large"], [4, "ngIf"], [3, "table", 4, "ngFor", "ngForOf"], [1, "flex-box-item"], ["mat-raised-button", "", "color", "primary", 3, "click", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", 3, "click"], [3, "table"]], template: function TablesComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-toolbar", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "Tables");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, TablesComponent_div_3_Template, 5, 2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, TablesComponent_app_table_detail_4_Template, 1, 1, "app-table-detail", 3);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.isUserPlayer);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.filteredTables);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__.MatToolbar, _angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatButton, _table_detail_table_detail_component__WEBPACK_IMPORTED_MODULE_3__.TableDetailComponent], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0YWJsZXMuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ 2874:
/*!*****************************************************************!*\
  !*** ./src/app/components/team-player/team-player.component.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TeamPlayerComponent": () => (/* binding */ TeamPlayerComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var src_app_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/auth/auth.service */ 1228);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/icon */ 7822);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/card */ 2156);





function TeamPlayerComponent_span_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " (you)");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function TeamPlayerComponent_mat_icon_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "checkmark");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
class TeamPlayerComponent {
    constructor(authService) {
        this.authService = authService;
        this.isCurrentUserTeamPlayer = false;
    }
    ngOnInit() {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser && this.teamPlayer.player.uid === currentUser.uid) {
            this.isCurrentUserTeamPlayer = true;
        }
        else {
            this.isCurrentUserTeamPlayer = false;
        }
    }
}
TeamPlayerComponent.ɵfac = function TeamPlayerComponent_Factory(t) { return new (t || TeamPlayerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService)); };
TeamPlayerComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: TeamPlayerComponent, selectors: [["app-team-player"]], inputs: { teamPlayer: "teamPlayer" }, decls: 5, vars: 3, consts: [[1, "mdc-card", "team-player-card"], [1, "flex-box-item"], [4, "ngIf"]], template: function TeamPlayerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-card", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, TeamPlayerComponent_span_3_Template, 2, 0, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, TeamPlayerComponent_mat_icon_4_Template, 2, 0, "mat-icon", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.teamPlayer.player.displayName, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isCurrentUserTeamPlayer);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.teamPlayer.isPointsConfirmed);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__.MatIcon, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCard], styles: [".team-player-card[_ngcontent-%COMP%] {\n    margin: 1rem 0;\n    display: flex;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlYW0tcGxheWVyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxjQUFjO0lBQ2QsYUFBYTtBQUNqQiIsImZpbGUiOiJ0ZWFtLXBsYXllci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRlYW0tcGxheWVyLWNhcmQge1xuICAgIG1hcmdpbjogMXJlbSAwO1xuICAgIGRpc3BsYXk6IGZsZXg7XG59Il19 */"] });


/***/ }),

/***/ 1157:
/*!***************************************************!*\
  !*** ./src/app/components/team/team.component.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TeamComponent": () => (/* binding */ TeamComponent)
/* harmony export */ });
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/auth */ 3628);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 8977);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 1989);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 9295);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 6562);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/game/game.service */ 1437);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var src_app_services_team_team_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/team/team.service */ 790);
/* harmony import */ var src_app_services_round_mediator_round_mediator_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/round-mediator/round-mediator.service */ 4180);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/card */ 2156);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/form-field */ 5074);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/input */ 8611);
/* harmony import */ var _team_player_team_player_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../team-player/team-player.component */ 2874);















function TeamComponent_app_team_player_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "app-team-player", 4);
} if (rf & 2) {
    const teamPlayer_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("teamPlayer", teamPlayer_r1);
} }
class TeamComponent {
    constructor(gameService, route, teamService, roundMediatorService) {
        this.gameService = gameService;
        this.route = route;
        this.teamService = teamService;
        this.roundMediatorService = roundMediatorService;
        this.teamPointsFormControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControl({ value: 0, disabled: false });
        this.auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_0__.getAuth)();
        this.pointsConfirmed = false;
        this.isEditable = true;
        this.subscriptions = [];
        this.teamPlayers = [];
    }
    ngOnInit() {
        this.gameId = this.route.snapshot.paramMap.get('gameId');
        this.roundId = this.route.snapshot.paramMap.get('roundId');
        // this.canEditPoints();
        this.subscriptions.push(this.teamPointsFormControl.valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.distinctUntilChanged)(), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.debounceTime)(1000)).subscribe({
            next: (points) => {
                this.pointsChanged(points);
            }
        }), this.teamService.getTeam(this.team.id, this.table.id, this.roundId, this.gameId).subscribe({
            next: (currentTeam) => {
                if (currentTeam) {
                    this.team = currentTeam;
                    this.teamPointsFormControl.setValue(currentTeam.points);
                    this.pointsConfirmed = false;
                    this.teamPlayers = currentTeam.teamPlayers;
                    currentTeam.teamPlayers.forEach((teamPlayer) => {
                        if (teamPlayer.isPointsConfirmed) {
                            this.pointsConfirmed = true;
                        }
                    });
                    this.canEditPoints();
                }
            }
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
    pointsChanged(points) {
        if (this.team.points === points) {
            return;
        }
        console.log('pointsChanged: ' + points);
        this.team.points = points;
        this.subscriptions.push(this.teamService.updateTeam(this.team, this.table.id, this.roundId, this.gameId).subscribe());
    }
    canEditPoints() {
        const currentUser = this.auth.currentUser;
        if (!currentUser) {
            this.isEditable = false;
            this.teamPointsFormControl.disable();
            return;
        }
        this.subscriptions.push((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.combineLatest)([
            this.roundMediatorService.allTablesConfirmed(this.roundId, this.gameId),
            this.gameService.isUserAdmin(currentUser.uid, this.gameId)
        ])
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.take)(1)).subscribe({
            next: ([allTablesConfirmed, isAdmin]) => {
                const isTeamPlayer = this.team.teamPlayers.find((teamPlayer) => teamPlayer.player.uid === currentUser.uid);
                if (allTablesConfirmed) {
                    this.isEditable = false;
                    this.teamPointsFormControl.disable();
                }
                else if ((isAdmin || isTeamPlayer) && !this.pointsConfirmed) {
                    this.isEditable = true;
                    this.teamPointsFormControl.enable();
                }
                else {
                    this.isEditable = false;
                    this.teamPointsFormControl.disable();
                }
            }
        }));
    }
}
TeamComponent.ɵfac = function TeamComponent_Factory(t) { return new (t || TeamComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_1__.GameService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_services_team_team_service__WEBPACK_IMPORTED_MODULE_2__.TeamService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_services_round_mediator_round_mediator_service__WEBPACK_IMPORTED_MODULE_3__.RoundMediatorService)); };
TeamComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: TeamComponent, selectors: [["app-team"]], inputs: { team: "team", table: "table" }, decls: 10, vars: 2, consts: [[1, "mdc-card", "card", "team-card"], [3, "teamPlayer", 4, "ngFor", "ngForOf"], ["appearance", "fill", 1, "full-width"], ["matInput", "", "id", "teamPoints", "placeholder", "0", "type", "number", "pattern", "\\d*", "onclick", "this.select()", 3, "formControl"], [3, "teamPlayer"]], template: function TeamComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-card", 0)(1, "div")(2, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "Team:");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, TeamComponent_app_team_player_4_Template, 1, 1, "app-team-player", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "div")(6, "mat-form-field", 2)(7, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8, "Points");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](9, "input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.teamPlayers);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("formControl", ctx.teamPointsFormControl);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgForOf, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.PatternValidator, _angular_material_card__WEBPACK_IMPORTED_MODULE_13__.MatCard, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_15__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControlDirective, _team_player_team_player_component__WEBPACK_IMPORTED_MODULE_4__.TeamPlayerComponent], styles: [".team-card[_ngcontent-%COMP%] {\n    margin: 1rem 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlYW0uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGNBQWM7QUFDbEIiLCJmaWxlIjoidGVhbS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRlYW0tY2FyZCB7XG4gICAgbWFyZ2luOiAxcmVtIDA7XG59XG4iXX0= */"] });


/***/ }),

/***/ 8562:
/*!******************************************************************************!*\
  !*** ./src/app/components/user/login/login-dialog/login-dialog-component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginDialogComponent": () => (/* binding */ LoginDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ 1484);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/toolbar */ 2543);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 7822);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 4522);
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../login.component */ 3663);







/**
 * @title Dialog Overview
 */
class LoginDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    onNoClick() {
        this.dialogRef.close();
    }
    close() {
        this.dialogRef.close();
    }
}
LoginDialogComponent.ɵfac = function LoginDialogComponent_Factory(t) { return new (t || LoginDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MAT_DIALOG_DATA)); };
LoginDialogComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: LoginDialogComponent, selectors: [["app-login-dialog"]], decls: 9, vars: 0, consts: [["color", "primary", 1, "header"], [1, "flex-box-item"], ["mat-dialog-title", ""], ["mat-icon-button", "", "aria-label", "close", 3, "click"]], template: function LoginDialogComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-toolbar", 0)(1, "div", 1)(2, "h1", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Login");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div")(5, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function LoginDialogComponent_Template_button_click_5_listener() { return ctx.close(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "close");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "app-login");
    } }, dependencies: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_3__.MatToolbar, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIcon, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogTitle, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButton, _login_component__WEBPACK_IMPORTED_MODULE_0__.LoginComponent], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsb2dpbi1kaWFsb2ctY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ 3663:
/*!**********************************************************!*\
  !*** ./src/app/components/user/login/login.component.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginComponent": () => (/* binding */ LoginComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var src_app_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/auth/auth.service */ 1228);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ 1484);





function LoginComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 2)(1, "h1", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "You are now logged in");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}

class LoginComponent {
  constructor(authService) {
    this.authService = authService;
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.subscription = this.isLoggedIn$.subscribe({
      next: loggedIn => {
        if (!loggedIn) {
          this.authService.showLogin('#firebaseui-auth-container');
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

LoginComponent.ɵfac = function LoginComponent_Factory(t) {
  return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService));
};

LoginComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: LoginComponent,
  selectors: [["app-login"]],
  decls: 3,
  vars: 3,
  consts: [["id", "firebaseui-auth-container", 1, "auth-container"], ["class", "content", 4, "ngIf"], [1, "content"], ["mat-dialog-title", ""]],
  template: function LoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, LoginComponent_div_1_Template, 3, 0, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "async");
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 1, ctx.isLoggedIn$));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogTitle, _angular_common__WEBPACK_IMPORTED_MODULE_2__.AsyncPipe],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsb2dpbi5jb21wb25lbnQuY3NzIn0= */"]
});

/***/ }),

/***/ 9630:
/*!************************************************************************!*\
  !*** ./src/app/components/user/user-profile/user-profile.component.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserProfileComponent": () => (/* binding */ UserProfileComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var src_app_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/auth/auth.service */ 1228);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 4666);



class UserProfileComponent {
    constructor(authService, location) {
        this.authService = authService;
        this.location = location;
    }
    ngOnInit() {
        this.currentUser = this.authService.getCurrentUser();
        if (this.currentUser) {
            this.displayName = this.currentUser.displayName;
            this.email = this.currentUser.email;
        }
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
    save() {
        // this.gamePlayerService.updatePlayer()
    }
    back() {
        this.location.back();
    }
}
UserProfileComponent.ɵfac = function UserProfileComponent_Factory(t) { return new (t || UserProfileComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_2__.Location)); };
UserProfileComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: UserProfileComponent, selectors: [["app-user"]], decls: 10, vars: 2, consts: [[1, "flex-box-rows"], [1, "mdc-button", "mdc-button--raised", 3, "click"], [1, "mdc-button__ripple"], [1, "mdc-button__label"]], template: function UserProfileComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 0)(5, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function UserProfileComponent_Template_button_click_5_listener() { return ctx.back(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "span", 3)(8, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Back");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" Display Name: ", ctx.displayName, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" Email: ", ctx.email, " ");
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ1c2VyLXByb2ZpbGUuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ 1228:
/*!***********************************************!*\
  !*** ./src/app/services/auth/auth.service.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthService": () => (/* binding */ AuthService)
/* harmony export */ });
/* harmony import */ var firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/compat/app */ 8427);
/* harmony import */ var firebaseui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebaseui */ 3175);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/auth */ 3628);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 6317);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ 2340);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_fire_compat_auth__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/fire/compat/auth */ 5873);








class AuthService {
    constructor(afAuth) {
        this.afAuth = afAuth;
        this.isLoggedInSubject = new rxjs__WEBPACK_IMPORTED_MODULE_4__.BehaviorSubject(false);
        this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
        firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__["default"].initializeApp(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment.firebase);
        this.ui = new firebaseui__WEBPACK_IMPORTED_MODULE_1__.auth.AuthUI(firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__["default"].auth());
        firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__["default"].auth().onAuthStateChanged((user) => {
            this.currentUser$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(user);
            if (user) {
                this.isLoggedInSubject.next(true);
            }
            else {
                this.isLoggedInSubject.next(false);
            }
        });
    }
    getCurrentUser() {
        return firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__["default"].auth().currentUser;
    }
    showLogin(container) {
        const uiConfig = {
            signInOptions: [
                // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                {
                    provider: firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__["default"].auth.EmailAuthProvider.PROVIDER_ID,
                    // signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
                }
            ],
            callbacks: {
                signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this)
            }
        };
        this.ui.start(container, uiConfig);
    }
    onLoginSuccessful() {
    }
}
AuthService.ɵfac = function AuthService_Factory(t) { return new (t || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_fire_compat_auth__WEBPACK_IMPORTED_MODULE_7__.AngularFireAuth)); };
AuthService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 3341:
/*!****************************************!*\
  !*** ./src/app/services/collection.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Collection": () => (/* binding */ Collection)
/* harmony export */ });
var Collection;
(function (Collection) {
    Collection["Games"] = "games";
    Collection["GamePlayers"] = "gamePlayers";
    Collection["Admins"] = "admins";
    Collection["Rounds"] = "rounds";
    Collection["Tables"] = "tables";
    Collection["Teams"] = "team";
})(Collection || (Collection = {}));


/***/ }),

/***/ 1437:
/*!***********************************************!*\
  !*** ./src/app/services/game/game.service.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameService": () => (/* binding */ GameService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 9346);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 635);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 9295);
/* harmony import */ var _collection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../collection */ 3341);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ 3628);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _message_message_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../message/message.service */ 7849);
/* harmony import */ var _angular_fire_compat_firestore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/fire/compat/firestore */ 2393);







class GameService {
    constructor(messageService, store) {
        this.messageService = messageService;
        this.store = store;
        this.games$ = this.store.collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Games).valueChanges({ idField: 'id' });
    }
    getGame(id) {
        return this.games$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)((games) => {
            return games.find((game) => game.id === id);
        }));
    }
    addGame(game, userId) {
        game.adminIds = [];
        game.byePool = [];
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.from)(this.store.collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Games)
            .add(game).then((newGame) => {
            game.id = newGame.id;
            this.log(`added game w/ id=${newGame.id}`);
            this.addAdmin(newGame.id, userId);
            return game;
        }, err => this.log(`addGame ${err}`)));
    }
    updateGame(game) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.from)(this.store.collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Games).doc(game.id).update(game).then(() => {
            this.log(`updated game w/ id=${game.id}`);
            return game;
        }, err => this.log(`updateGame ${err}`)));
    }
    deleteGame(id) {
        this.store.collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Games).doc(id).delete()
            .then(() => {
            this.log(`deleted game w/ id=${id}`);
        }, err => this.log(`deleteGame ${err}`));
    }
    addAdmin(gameId, userId) {
        this.getGame(gameId).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.take)(1)).subscribe({
            next: (game) => {
                if (game) {
                    game.adminIds.push(userId);
                    this.log(`adding game admin w/ id=${userId}`);
                    this.updateGame(game);
                }
            }
        });
    }
    deleteAdmin(gameId, userId) {
        this.getGame(gameId).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.take)(1)).subscribe({
            next: (game) => {
                if (game) {
                    const filteredAdminIds = game.adminIds.filter((adminId) => adminId !== userId);
                    game.adminIds = filteredAdminIds;
                    this.log(`deleteAdmin w/ id=${userId}`);
                    this.updateGame(game);
                }
            }
        });
    }
    getAdmins(gameId) {
        return this.getGame(gameId).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.take)(1)).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)((game) => {
            return game?.adminIds ?? [];
        }));
    }
    isCurrentUserAdmin(gameId) {
        return this.getGame(gameId).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.take)(1)).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)((game) => {
            if (!game) {
                return false;
            }
            const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)();
            const currentUser = auth.currentUser;
            if (!currentUser) {
                return false;
            }
            return !!game.adminIds.find((adminId) => adminId === currentUser.uid);
        }));
    }
    isUserAdmin(playerId, gameId) {
        return this.getGame(gameId).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.take)(1)).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)((game) => {
            return !!game.adminIds.find((adminId) => adminId === playerId);
        }));
    }
    log(message) {
        this.messageService.add(`GameService: ${message}`);
    }
}
GameService.ɵfac = function GameService_Factory(t) { return new (t || GameService)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_message_message_service__WEBPACK_IMPORTED_MODULE_2__.MessageService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_fire_compat_firestore__WEBPACK_IMPORTED_MODULE_7__.AngularFirestore)); };
GameService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({ token: GameService, factory: GameService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 9595:
/*!************************************************************!*\
  !*** ./src/app/services/gamePlayer/game-player.service.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GamePlayerService": () => (/* binding */ GamePlayerService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 9346);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var _collection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../collection */ 3341);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 635);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _message_message_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../message/message.service */ 7849);
/* harmony import */ var _angular_fire_compat_firestore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/fire/compat/firestore */ 2393);






class GamePlayerService {
    constructor(messageService, store) {
        this.messageService = messageService;
        this.store = store;
    }
    playersForGame(gameId) {
        return this.store.collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Games)
            .doc(gameId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.GamePlayers)
            .valueChanges({ idField: 'uid' });
    }
    getPlayer(playerId, gameId) {
        return this.playersForGame(gameId).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)((players) => players.find((player) => player.uid === playerId)));
    }
    addPlayer(player, gameId) {
        // if player already has an ID, then use set instead of add
        if (player.uid) {
            this.store.collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Games).doc(gameId).collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.GamePlayers).doc(player.uid).set(player).then(() => {
                this.log(`addPlayerToGame w/ id=${gameId} ${player.displayName}`);
            }, err => this.handleError('addPlayerToGame'));
        }
        else {
            this.store.collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Games).doc(gameId).collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.GamePlayers).add(player).then(() => {
                this.log(`addPlayerToGame w/ id=${gameId} ${player.displayName}`);
            }, err => this.handleError('addPlayerToGame'));
        }
    }
    updatePlayer(player, gameId) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.from)(this.store.collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Games).doc(gameId).collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.GamePlayers).doc(player.uid).update(player).then(() => {
            this.log(`updatePlayer id: ${player.uid} name: ${player.displayName}`);
            return player;
        }, err => this.log(`updatePlayer ${err}`)));
    }
    deletePlayer(playerId, gameId) {
        this.store.collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Games)
            .doc(gameId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.GamePlayers)
            .doc(playerId).delete().then(() => {
            this.log(`deleted player w/ id=${playerId}`);
        }, err => this.handleError('deletePlayer'));
    }
    /* GET players whose name contains search term */
    searchPlayers(term) {
        if (!term.trim()) {
            // if not search term, return empty hero array.
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)([]);
        }
        // return this.http.get<Player[]>(`${this.playersUrl}/?name=${term}`).pipe(
        //   tap(x => x.length ?
        //     this.log(`found Players matching "${term}"`) :
        //     this.log(`no Players matching "${term}"`)),
        //   catchError(this.handleError<Player[]>('searchPlayers', []))
        // );
    }
    log(message) {
        this.messageService.add(`PlayerService: ${message}`);
    }
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     *
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    handleError(operation = 'operation', result) {
        return (error) => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);
            // Let the app keep running by returning an empty result.
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(result);
        };
    }
}
GamePlayerService.ɵfac = function GamePlayerService_Factory(t) { return new (t || GamePlayerService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_message_message_service__WEBPACK_IMPORTED_MODULE_1__.MessageService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_fire_compat_firestore__WEBPACK_IMPORTED_MODULE_6__.AngularFirestore)); };
GamePlayerService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({ token: GamePlayerService, factory: GamePlayerService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 7849:
/*!*****************************************************!*\
  !*** ./src/app/services/message/message.service.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MessageService": () => (/* binding */ MessageService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2560);

class MessageService {
    constructor() {
        this.messages = [];
    }
    add(message) {
        console.log(message);
        this.messages.push(message);
    }
    clear() {
        this.messages = [];
    }
}
MessageService.ɵfac = function MessageService_Factory(t) { return new (t || MessageService)(); };
MessageService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: MessageService, factory: MessageService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 4180:
/*!*******************************************************************!*\
  !*** ./src/app/services/round-mediator/round-mediator.service.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RoundMediatorService": () => (/* binding */ RoundMediatorService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 6562);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 591);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 635);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 1353);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 2673);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 9295);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _game_game_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../game/game.service */ 1437);
/* harmony import */ var _round_round_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../round/round.service */ 1939);
/* harmony import */ var _gamePlayer_game_player_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../gamePlayer/game-player.service */ 9595);
/* harmony import */ var _message_message_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../message/message.service */ 7849);
/* harmony import */ var _team_team_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../team/team.service */ 790);
/* harmony import */ var _table_table_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../table/table.service */ 5148);









class RoundMediatorService {
    constructor(gameService, roundService, gamePlayerService, messageService, teamService, tableService) {
        this.gameService = gameService;
        this.roundService = roundService;
        this.gamePlayerService = gamePlayerService;
        this.messageService = messageService;
        this.teamService = teamService;
        this.tableService = tableService;
        this.byes = [];
        this.subscriptions = [];
    }
    allTablesConfirmed(roundId, gameId) {
        return this.tableService.getTablesForRound(roundId, gameId).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)((tables) => {
            let confirmCounter = 0;
            tables.map((table) => {
                if (table.pointsConfirmed) {
                    confirmCounter++;
                }
            });
            const allConfirmed = confirmCounter === tables.length;
            return allConfirmed;
        }));
    }
    unconfirmedTables(roundId, gameId) {
        return this.tableService.getTablesForRound(roundId, gameId).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)((tables) => {
            const unconfirmedTables = [];
            tables.map((table) => {
                if (!table.pointsConfirmed) {
                    unconfirmedTables.push(table);
                }
            });
            return unconfirmedTables;
        }));
    }
    getTeamPlayersForRound(roundId, gameId) {
        const teamPlayers$ = this.tableService.getTablesForRound(roundId, gameId).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.mergeMap)((tables) => {
            const teamsForTables$ = tables.map((table) => this.teamService.getTeamsForTable(table.id, roundId, gameId));
            const teams$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.combineLatest)(teamsForTables$).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.switchMap)((arrayOfTeams) => {
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.of)(arrayOfTeams.flat());
            }));
            return teams$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.switchMap)((teams) => {
                const teamPlayers = teams.map((team) => {
                    return team.teamPlayers.map((teamPlayer) => {
                        teamPlayer.points = team.points;
                        return teamPlayer;
                    }).flat();
                }).flat();
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.of)(teamPlayers);
            }));
        }));
        return teamPlayers$;
    }
    updatePlayerPoints(roundId, gameId, roundNumber) {
        const teamPlayers$ = this.getTeamPlayersForRound(roundId, gameId).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.take)(1));
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.combineLatest)([
            this.gamePlayerService.playersForGame(gameId).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.take)(1)),
            teamPlayers$
        ]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.switchMap)(([gamePlayers, teamPlayers]) => {
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.combineLatest)(teamPlayers.map((teamPlayer) => {
                const teamGamePlayer = teamPlayer.player;
                if (!teamGamePlayer.pointsForRound) {
                    teamGamePlayer.pointsForRound = [];
                }
                const gamePlayer = gamePlayers.find((gp) => gp.uid === teamGamePlayer.uid);
                let gamePlayerPointsForRound;
                if (gamePlayer.pointsForRound) {
                    gamePlayerPointsForRound = gamePlayer.pointsForRound.find((roundPoints) => roundPoints.roundId === roundId);
                }
                // check game player points to see if they already have points to prevent extra call to update
                if (gamePlayer && gamePlayerPointsForRound) {
                    if (gamePlayerPointsForRound.points === teamPlayer.points) {
                        return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.of)(teamGamePlayer);
                    }
                    gamePlayerPointsForRound.points = teamPlayer.points;
                }
                else {
                    const newRoundPoints = {
                        roundId,
                        roundNumber,
                        points: teamPlayer.points
                    };
                    teamGamePlayer.pointsForRound.push(newRoundPoints);
                }
                return this.gamePlayerService.updatePlayer(teamGamePlayer, gameId);
            }));
        }));
    }
    updateByePlayerPoints(roundId, gameId) {
        if (!roundId) {
            return rxjs__WEBPACK_IMPORTED_MODULE_12__.EMPTY;
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.combineLatest)([
            this.gamePlayerService.playersForGame(gameId).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.take)(1)),
            this.roundService.getRound(roundId, gameId).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.take)(1))
        ]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.switchMap)(([gamePlayers, round]) => {
            this.log('updateByePlayerPoints');
            const byePlayers = round.byes;
            const byePlayerIds = round.byes.map((bye) => bye.uid);
            const roundNumber = round.number;
            if (byePlayerIds && byePlayerIds.length > 0) {
                const lastRoundPlayers = gamePlayers.filter((gamePlayer) => {
                    const isByePlayer = byePlayerIds.find((byePlayerId) => byePlayerId === gamePlayer.uid);
                    return !isByePlayer;
                });
                // get sum of all points for all players in last round
                let totalPoints = 0;
                lastRoundPlayers.forEach((lastRoundPlayer) => {
                    if (lastRoundPlayer.pointsForRound) {
                        const lastRoundPoints = lastRoundPlayer.pointsForRound.find((pointsForRound) => pointsForRound.roundId === roundId);
                        if (lastRoundPoints) {
                            totalPoints += lastRoundPoints.points;
                        }
                    }
                });
                // get average and update the bye players with the average
                const averagePoints = Math.round(totalPoints / lastRoundPlayers.length);
                const newRoundPoints = {
                    roundId,
                    roundNumber,
                    points: averagePoints
                };
                byePlayers.forEach((byePlayer) => {
                    const gamePlayer = gamePlayers.find((player) => player.uid === byePlayer.uid);
                    if (!gamePlayer.pointsForRound) {
                        gamePlayer.pointsForRound = [];
                    }
                    const roundPoints = gamePlayer.pointsForRound.find((pfr) => pfr.roundId === roundId);
                    // if roundPoints already exists, then update the points
                    if (roundPoints) {
                        if (roundPoints.points === averagePoints) {
                            return;
                        }
                        roundPoints.points = averagePoints;
                    }
                    else {
                        gamePlayer.pointsForRound.push(newRoundPoints);
                    }
                    this.gamePlayerService.updatePlayer(gamePlayer, gameId).subscribe();
                });
            }
            return rxjs__WEBPACK_IMPORTED_MODULE_12__.EMPTY;
        }));
    }
    selectByes(gameId) {
        this.byes = [];
        // get byes from bye pool
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.combineLatest)([
            this.gameService.getGame(gameId),
            this.gamePlayerService.playersForGame(gameId)
        ]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.switchMap)(([game, players]) => {
            this.log('selectByes');
            const numberOfByes = players.length % 4;
            // randomly select players from the bye pool
            for (let i = 0; i < numberOfByes; i++) {
                // if there are no byes in the pool, add all players to the pool
                if (!game.byePool || game.byePool?.length === 0) {
                    game.byePool = [...players];
                }
                const randomNumber = Math.floor(Math.random() * game.byePool.length);
                const byePlayer = game.byePool.splice(randomNumber, 1);
                this.byes.push(byePlayer[0]);
            }
            return this.gameService.updateGame(game);
        }));
    }
    deleteRound(roundId, gameId) {
        this.subscriptions.push(this.gamePlayerService.playersForGame(gameId).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.take)(1)).subscribe({
            next: (gamePlayers) => {
                this.log('deleteRound for roundId:' + roundId);
                // delete the points for the round for each player
                gamePlayers.forEach((gamePlayer) => {
                    if (gamePlayer.pointsForRound) {
                        const filteredRoundPoints = gamePlayer.pointsForRound.filter((round) => round.roundId !== roundId);
                        gamePlayer.pointsForRound = filteredRoundPoints;
                        this.gamePlayerService.updatePlayer(gamePlayer, gameId).subscribe();
                    }
                });
                this.roundService.deleteRound(roundId, gameId);
            }
        }));
    }
    createRound(gameId) {
        return this.selectByes(gameId).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.switchMap)((game) => {
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.combineLatest)([
                this.roundService.roundsForGame(gameId),
                this.gamePlayerService.playersForGame(gameId)
            ]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.switchMap)(([rounds, players]) => {
                if (!game || !rounds || !players) {
                    return rxjs__WEBPACK_IMPORTED_MODULE_12__.EMPTY;
                }
                this.log('createRound');
                let filteredPlayers = [...players];
                if (this.byes.length > 0) {
                    filteredPlayers = players.filter((player) => {
                        const isByePlayer = this.byes.find((byePlayer) => byePlayer.uid === player.uid);
                        return !isByePlayer;
                    });
                }
                const tablesData = this.assignPlayersToTables(filteredPlayers);
                const newRound = {
                    number: rounds.length + 1,
                    byes: this.byes
                };
                // create round
                return this.roundService.addRound(newRound, gameId).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.switchMap)((round) => {
                    if (!round) {
                        return rxjs__WEBPACK_IMPORTED_MODULE_12__.EMPTY;
                    }
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.combineLatest)(tablesData.map((tableData) => {
                        // get all the playerIds for this table
                        let tablePlayerIds = [];
                        tableData.teams.map((team) => {
                            tablePlayerIds = tablePlayerIds.concat(team.teamPlayers.map((teamPlayer) => teamPlayer.player.uid));
                        });
                        // create tables
                        const newTable = {
                            number: tableData.number,
                            playerIds: tablePlayerIds
                        };
                        return this.tableService.addTable(newTable, round.id, gameId).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.switchMap)((addedTable) => {
                            if (!addedTable) {
                                return rxjs__WEBPACK_IMPORTED_MODULE_12__.EMPTY;
                            }
                            // create teams
                            tableData.teams.forEach((team) => {
                                this.teamService.addTeam(team, newTable.id, round.id, gameId);
                            });
                            return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.of)(addedTable);
                        }));
                    }));
                }));
            }));
        }));
    }
    assignPlayersToTables(players) {
        const numberOfTables = Math.floor(players.length / 4);
        const tables = [];
        const teams = this.assignPlayersToTeams(players, numberOfTables * 2);
        const unassignedTeams = teams;
        for (let i = 0; i < numberOfTables; i++) {
            const tableTeams = [];
            for (let j = 0; j < 2; j++) {
                const randomIndex = Math.floor(Math.random() * unassignedTeams.length);
                const randomTeam = teams[randomIndex];
                unassignedTeams.splice(randomIndex, 1);
                tableTeams.push(randomTeam);
            }
            const newTable = {
                teams: tableTeams,
                number: i + 1
            };
            tables.push(newTable);
        }
        return tables;
    }
    assignPlayersToTeams(players, numberOfTeams) {
        const teams = [];
        for (let i = 0; i < numberOfTeams; i++) {
            const teamPlayers = [];
            for (let j = 0; j < 2; j++) {
                const randomIndex = Math.floor(Math.random() * players.length);
                const teamPlayer = {
                    player: players[randomIndex]
                };
                players.splice(randomIndex, 1);
                teamPlayers.push(teamPlayer);
            }
            const newTeam = {
                teamPlayers,
                points: 0
            };
            teams.push(newTeam);
        }
        return teams;
    }
    log(message) {
        this.messageService.add(`RoundMediatorService: ${message}`);
    }
}
RoundMediatorService.ɵfac = function RoundMediatorService_Factory(t) { return new (t || RoundMediatorService)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_game_game_service__WEBPACK_IMPORTED_MODULE_0__.GameService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_round_round_service__WEBPACK_IMPORTED_MODULE_1__.RoundService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_gamePlayer_game_player_service__WEBPACK_IMPORTED_MODULE_2__.GamePlayerService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_message_message_service__WEBPACK_IMPORTED_MODULE_3__.MessageService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_team_team_service__WEBPACK_IMPORTED_MODULE_4__.TeamService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_table_table_service__WEBPACK_IMPORTED_MODULE_5__.TableService)); };
RoundMediatorService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineInjectable"]({ token: RoundMediatorService, factory: RoundMediatorService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 1939:
/*!*************************************************!*\
  !*** ./src/app/services/round/round.service.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RoundService": () => (/* binding */ RoundService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 9346);
/* harmony import */ var _collection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../collection */ 3341);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _message_message_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../message/message.service */ 7849);
/* harmony import */ var _angular_fire_compat_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/fire/compat/firestore */ 2393);





class RoundService {
    constructor(messageService, store) {
        this.messageService = messageService;
        this.store = store;
    }
    roundsForGame(gameId) {
        return this.store.collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Games)
            .doc(gameId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Rounds)
            .valueChanges({ idField: 'id' });
    }
    getRound(roundId, gameId) {
        return this.store.collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Games)
            .doc(gameId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Rounds)
            .doc(roundId)
            .valueChanges({ idField: 'id' });
    }
    addRound(round, gameId) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.from)(this.store.collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Games)
            .doc(gameId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Rounds)
            .add(round).then((docRef) => {
            this.log(`add round to game w/ id=${gameId} ${docRef.id}`);
            round.id = docRef.id;
            return round;
        }, err => this.log(`Error addRound w/ id=${gameId}`)));
    }
    updateRound(round, gameId) {
        this.store.collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Games)
            .doc(gameId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Rounds)
            .doc(round.id).update(round).then(() => {
            this.log(`update round w/ game id=${gameId} roundId = ${round.id}`);
        }, err => this.log(`Error updateRound w/ id=${gameId}`));
    }
    deleteRound(roundId, gameId) {
        this.store.collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Games)
            .doc(gameId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Rounds)
            .doc(roundId).delete().then(() => {
            this.log(`deleted round w/ id=${roundId}`);
        }, err => this.log(`ERROR deleteRound w/ id=${roundId}`));
    }
    log(message) {
        this.messageService.add(`RoundService: ${message}`);
    }
}
RoundService.ɵfac = function RoundService_Factory(t) { return new (t || RoundService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_message_message_service__WEBPACK_IMPORTED_MODULE_1__.MessageService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_fire_compat_firestore__WEBPACK_IMPORTED_MODULE_4__.AngularFirestore)); };
RoundService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: RoundService, factory: RoundService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 5148:
/*!*************************************************!*\
  !*** ./src/app/services/table/table.service.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TableService": () => (/* binding */ TableService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 9346);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 2673);
/* harmony import */ var _collection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../collection */ 3341);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _message_message_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../message/message.service */ 7849);
/* harmony import */ var _angular_fire_compat_firestore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/fire/compat/firestore */ 2393);
/* harmony import */ var _team_team_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../team/team.service */ 790);







class TableService {
    constructor(messageService, store, teamService) {
        this.messageService = messageService;
        this.store = store;
        this.teamService = teamService;
    }
    addTable(table, roundId, gameId) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.from)(this.store.collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Games)
            .doc(gameId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Rounds)
            .doc(roundId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Tables)
            .add(table).then((docRef) => {
            this.log(`addTable w/ id=${gameId} ${docRef.id}`);
            table.id = docRef.id;
            return table;
        }, err => this.log(`ERROR addTable w/ id=${table.id}`)));
    }
    getTable(tableId, roundId, gameId) {
        return this.store.collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Games)
            .doc(gameId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Rounds)
            .doc(roundId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Tables)
            .doc(tableId)
            .valueChanges({ idField: 'id' });
    }
    getTablesForRound(roundId, gameId) {
        return this.store.collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Games)
            .doc(gameId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Rounds)
            .doc(roundId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Tables)
            .valueChanges({ idField: 'id' });
    }
    getTableForPlayer(playerId, roundId, gameId) {
        const tables$ = this.getTablesForRound(roundId, gameId);
        return tables$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.switchMap)((tables) => {
            let returnTable;
            tables.map((table) => {
                if (table.playerIds.find((tablePlayerId) => tablePlayerId === playerId)) {
                    returnTable = table;
                }
            });
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(returnTable);
        }));
    }
    updateTable(table, roundId, gameId) {
        this.store.collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Games)
            .doc(gameId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Rounds)
            .doc(roundId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Tables)
            .doc(table.id)
            .update(table).then(() => {
            this.log(`updateTable w/ id=${gameId} ${table.id}`);
        }, err => this.log(`ERROR updateTable w/ id=${table.id}`));
    }
    deleteTable(tableId, roundId, gameId) {
        this.store.collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Games)
            .doc(gameId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Rounds)
            .doc(roundId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Tables)
            .doc(tableId)
            .delete().then(() => {
            this.log(`deleteTable w/ id=${gameId} ${tableId}`);
        }, err => this.log(`ERROR deleteTable w/ id=${tableId}`));
    }
    log(message) {
        this.messageService.add(`TableService: ${message}`);
    }
}
TableService.ɵfac = function TableService_Factory(t) { return new (t || TableService)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_message_message_service__WEBPACK_IMPORTED_MODULE_1__.MessageService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_fire_compat_firestore__WEBPACK_IMPORTED_MODULE_7__.AngularFirestore), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_team_team_service__WEBPACK_IMPORTED_MODULE_2__.TeamService)); };
TableService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({ token: TableService, factory: TableService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 790:
/*!***********************************************!*\
  !*** ./src/app/services/team/team.service.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TeamService": () => (/* binding */ TeamService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 9346);
/* harmony import */ var _collection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../collection */ 3341);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _message_message_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../message/message.service */ 7849);
/* harmony import */ var _angular_fire_compat_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/fire/compat/firestore */ 2393);





class TeamService {
    constructor(messageService, store) {
        this.messageService = messageService;
        this.store = store;
    }
    addTeam(team, tableId, roundId, gameId) {
        this.store.collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Games)
            .doc(gameId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Rounds)
            .doc(roundId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Tables)
            .doc(tableId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Teams)
            .add(team).then((docRef) => {
            this.log(`addTeam w/ id=${gameId} ${docRef.id}`);
            team.id = docRef.id;
            return team;
        }, err => this.log(`ERROR addTeam w/ id=${team.id}`));
    }
    getTeam(teamId, tableId, roundId, gameId) {
        return this.store.collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Games)
            .doc(gameId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Rounds)
            .doc(roundId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Tables)
            .doc(tableId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Teams)
            .doc(teamId)
            .valueChanges({ idField: 'id' });
    }
    getTeamsForTable(tableId, roundId, gameId) {
        return this.store.collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Games)
            .doc(gameId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Rounds)
            .doc(roundId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Tables)
            .doc(tableId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Teams)
            .valueChanges({ idField: 'id' });
    }
    updateTeam(team, tableId, roundId, gameId) {
        this.log('updateTeam');
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.from)(this.store.collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Games)
            .doc(gameId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Rounds)
            .doc(roundId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Tables)
            .doc(tableId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Teams)
            .doc(team.id)
            .update(team).then((docRef) => {
            this.log(`updateTeam w/ id=${gameId} ${team.id}`);
            return docRef;
        }, err => this.log(`ERROR updateTeam w/ id=${team.id}`)));
    }
    deleteTeam(teamId, tableId, roundId, gameId) {
        this.store.collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Games)
            .doc(gameId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Rounds)
            .doc(roundId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Tables)
            .doc(tableId)
            .collection(_collection__WEBPACK_IMPORTED_MODULE_0__.Collection.Teams)
            .doc(teamId)
            .delete().then(() => {
            this.log(`deleteTeam w/ id=${gameId} ${teamId}`);
        }, err => this.log(`ERROR deleteTeam w/ id=${teamId}`));
    }
    log(message) {
        this.messageService.add(`TeamService: ${message}`);
    }
}
TeamService.ɵfac = function TeamService_Factory(t) { return new (t || TeamService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_message_message_service__WEBPACK_IMPORTED_MODULE_1__.MessageService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_fire_compat_firestore__WEBPACK_IMPORTED_MODULE_4__.AngularFirestore)); };
TeamService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: TeamService, factory: TeamService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 2340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    // url: 'https://torneo.com',
    url: 'http://192.168.0.44:4200',
    firebase: {
        apiKey: "AIzaSyBXfstBvichb-xN3QAYd4Xx_03-j3FMaxA",
        authDomain: "tourney-84ede.firebaseapp.com",
        projectId: "tourney-84ede",
        storageBucket: "tourney-84ede.appspot.com",
        messagingSenderId: "720024685972",
        appId: "1:720024685972:web:27d438c5628bc965749381",
        measurementId: "G-DJDJLLFS6V"
    }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ 4431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 6747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 2340);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
    .catch(err => console.error(err));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map