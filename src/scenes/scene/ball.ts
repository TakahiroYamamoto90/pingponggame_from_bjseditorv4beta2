import { Mesh, PhysicsImpostor, Vector3, Scene, ParticleSystem, Color4, Texture } from "@babylonjs/core";
import GameComponent from "./game";
//import { fromScene } from "../tools";
import { fromScene } from "../decorators";

export default class BallComponent extends Mesh {
    /**
     * Redefine the scene as GameComponent as the scene as a script attached to it.
     * @override
     */
    public _scene: GameComponent;

    private _startPosition: Vector3 = null;
    private _startHeight: number = 0;

    @fromScene("player")
    private _player: Mesh;

    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    protected constructor() { }

    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    public onInitialize(): void {
        this.physicsImpostor = new PhysicsImpostor(this, PhysicsImpostor.SphereImpostor, { mass: 1, friction: 0, restitution: 1 });
        this.physicsImpostor.sleep();

        // Create a particle system
        var particleSystem = new ParticleSystem("particles", 2000, this._scene);

        //Texture of each particle
        particleSystem.particleTexture = new Texture("./scenes/scene/files/flare.png", this._scene);

        // Where the particles come from
        particleSystem.emitter = this; // the starting object, the emitter
        particleSystem.minEmitBox = new Vector3(-1, 0, 0); // Starting all from
        particleSystem.maxEmitBox = new Vector3(1, 0, 0); // To...

        // Colors of all particles
        particleSystem.color1 = new Color4(0.7, 0.8, 1.0, 1.0);
        particleSystem.color2 = new Color4(0.2, 0.5, 1.0, 1.0);
        particleSystem.colorDead = new Color4(0, 0, 0.2, 0.0);

        // Size of each particle (random between...
        particleSystem.minSize = 0.1;
        particleSystem.maxSize = 0.8;

        // Life time of each particle (random between...
        particleSystem.minLifeTime = 0.3;
        particleSystem.maxLifeTime = 1.5;

        // Emission rate
        particleSystem.emitRate = 3000;

        // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
        particleSystem.blendMode = ParticleSystem.BLENDMODE_ONEONE;

        // Set the gravity of all particles
        particleSystem.gravity = new Vector3(0, -9.81, 0);

        // Direction of each particle after it has been emitted
        particleSystem.direction1 = new Vector3(-7, 8, 3);
        particleSystem.direction2 = new Vector3(7, 8, -3);

        // Angular speed, in radians
        particleSystem.minAngularSpeed = 0;
        particleSystem.maxAngularSpeed = Math.PI;

        // Speed
        particleSystem.minEmitPower = 1;
        particleSystem.maxEmitPower = 3;
        particleSystem.updateSpeed = 0.005;

        // Start the particle system
        particleSystem.start();

    }

    /**
     * Called on the scene starts.
     */
    public onStart(): void {
        this._startPosition = this.position.clone();
        this._startHeight = this.position.y;
    }

    /**
     * Called each frame.
     */
    public onUpdate(): void {
        this.position.y = this._startHeight;

        if (this.position.x < -30) {
            this._scene.retry();
        }
    }

    /**
     * Resets the ball component. Called typically when the player loses the ball.
     */
    public reset(): void {
        //this.position.copyFrom(this._startPosition);
        this.position.copyFrom(this._player.getAbsolutePosition());
        this.physicsImpostor.setAngularVelocity(Vector3.Zero());
        this.physicsImpostor.setLinearVelocity(Vector3.Zero());
        this.physicsImpostor.sleep();
    }

    /**
     * Applies the start impulse. This is called on the game is started when the user presses
     * the space key on the keyboard.
     */
    public applyStartImpulse(): void {
        this.physicsImpostor.wakeUp();
        this.applyImpulse(new Vector3(45, 0, 45), this.getAbsolutePosition());
    }
}
