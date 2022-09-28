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
//import { fromScene } from "../tools";
var decorators_1 = require("../decorators");
var BallComponent = /** @class */ (function (_super) {
    __extends(BallComponent, _super);
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    function BallComponent() {
        var _this = this;
        _this._startPosition = null;
        _this._startHeight = 0;
        return _this;
    }
    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    BallComponent.prototype.onInitialize = function () {
        this.physicsImpostor = new core_1.PhysicsImpostor(this, core_1.PhysicsImpostor.SphereImpostor, { mass: 1, friction: 0, restitution: 1 });
        this.physicsImpostor.sleep();
        // Create a particle system
        var particleSystem = new core_1.ParticleSystem("particles", 2000, this._scene);
        //Texture of each particle
        particleSystem.particleTexture = new core_1.Texture("./scenes/scene/files/flare.png", this._scene);
        // Where the particles come from
        particleSystem.emitter = this; // the starting object, the emitter
        particleSystem.minEmitBox = new core_1.Vector3(-1, 0, 0); // Starting all from
        particleSystem.maxEmitBox = new core_1.Vector3(1, 0, 0); // To...
        // Colors of all particles
        particleSystem.color1 = new core_1.Color4(0.7, 0.8, 1.0, 1.0);
        particleSystem.color2 = new core_1.Color4(0.2, 0.5, 1.0, 1.0);
        particleSystem.colorDead = new core_1.Color4(0, 0, 0.2, 0.0);
        // Size of each particle (random between...
        particleSystem.minSize = 0.1;
        particleSystem.maxSize = 0.8;
        // Life time of each particle (random between...
        particleSystem.minLifeTime = 0.3;
        particleSystem.maxLifeTime = 1.5;
        // Emission rate
        particleSystem.emitRate = 3000;
        // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
        particleSystem.blendMode = core_1.ParticleSystem.BLENDMODE_ONEONE;
        // Set the gravity of all particles
        particleSystem.gravity = new core_1.Vector3(0, -9.81, 0);
        // Direction of each particle after it has been emitted
        particleSystem.direction1 = new core_1.Vector3(-7, 8, 3);
        particleSystem.direction2 = new core_1.Vector3(7, 8, -3);
        // Angular speed, in radians
        particleSystem.minAngularSpeed = 0;
        particleSystem.maxAngularSpeed = Math.PI;
        // Speed
        particleSystem.minEmitPower = 1;
        particleSystem.maxEmitPower = 3;
        particleSystem.updateSpeed = 0.005;
        // Start the particle system
        particleSystem.start();
    };
    /**
     * Called on the scene starts.
     */
    BallComponent.prototype.onStart = function () {
        this._startPosition = this.position.clone();
        this._startHeight = this.position.y;
    };
    /**
     * Called each frame.
     */
    BallComponent.prototype.onUpdate = function () {
        this.position.y = this._startHeight;
        if (this.position.x < -30) {
            this._scene.retry();
        }
    };
    /**
     * Resets the ball component. Called typically when the player loses the ball.
     */
    BallComponent.prototype.reset = function () {
        //this.position.copyFrom(this._startPosition);
        this.position.copyFrom(this._player.getAbsolutePosition());
        this.physicsImpostor.setAngularVelocity(core_1.Vector3.Zero());
        this.physicsImpostor.setLinearVelocity(core_1.Vector3.Zero());
        this.physicsImpostor.sleep();
    };
    /**
     * Applies the start impulse. This is called on the game is started when the user presses
     * the space key on the keyboard.
     */
    BallComponent.prototype.applyStartImpulse = function () {
        this.physicsImpostor.wakeUp();
        this.applyImpulse(new core_1.Vector3(45, 0, 45), this.getAbsolutePosition());
    };
    __decorate([
        (0, decorators_1.fromScene)("player")
    ], BallComponent.prototype, "_player", void 0);
    return BallComponent;
}(core_1.Mesh));
exports.default = BallComponent;
//# sourceMappingURL=ball.js.map