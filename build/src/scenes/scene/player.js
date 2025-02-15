"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@babylonjs/core");
//import { onKeyboardEvent,fromScene } from "../tools";
var decorators_1 = require("../decorators");
var PlayerComponent = /** @class */ (function (_super) {
    __extends(PlayerComponent, _super);
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    function PlayerComponent() {
        var _this = this;
        return _this;
    }
    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    PlayerComponent.prototype.onInitialize = function () {
        // ...
    };
    /**
     * Called on the scene starts.
     */
    PlayerComponent.prototype.onStart = function () {
        this.physicsImpostor = new core_1.PhysicsImpostor(this, core_1.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 1 });
    };
    /**
     * Called each frame.
     */
    PlayerComponent.prototype.onUpdate = function () {
        // ...
    };
    /**
     * Moves the player on the left
     */
    PlayerComponent.prototype.moveLeft = function () {
        if (this.intersectsMesh(this._wall_left)) {
        }
        else {
            this.position.z += 5;
        }
    };
    /**
     * Moves the player on the right.
     */
    PlayerComponent.prototype.moveRight = function () {
        if (this.intersectsMesh(this._wall_right)) {
        }
        else {
            this.position.z -= 5;
        }
    };
    __decorate([
        (0, decorators_1.fromScene)("wall_left")
    ], PlayerComponent.prototype, "_wall_left", void 0);
    __decorate([
        (0, decorators_1.fromScene)("wall_right")
    ], PlayerComponent.prototype, "_wall_right", void 0);
    __decorate([
        (0, decorators_1.onKeyboardEvent)(65, core_1.KeyboardEventTypes.KEYDOWN)
    ], PlayerComponent.prototype, "moveLeft", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)(68, core_1.KeyboardEventTypes.KEYDOWN)
    ], PlayerComponent.prototype, "moveRight", null);
    return PlayerComponent;
}(core_1.Mesh));
exports.default = PlayerComponent;
//# sourceMappingURL=player.js.map