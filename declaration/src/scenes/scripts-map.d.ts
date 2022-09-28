import { ScriptMap } from "./tools";
/**
 * Defines the interface that exposes all exported scripts in this project.
 */
export interface ISceneScriptMap {
    "src/scenes/scene/ball.ts": ScriptMap;
    "src/scenes/scene/block.ts": ScriptMap;
    "src/scenes/scene/game.ts": ScriptMap;
    "src/scenes/scene/player.ts": ScriptMap;
    "src/scenes/scene/wall.ts": ScriptMap;
}
/**
 * Defines the map of all available scripts in the project.
 */
export declare const scriptsMap: ISceneScriptMap;
