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
export const scriptsMap: ISceneScriptMap = {
	"src/scenes/scene/ball.ts": require("./scene/ball"),
	"src/scenes/scene/block.ts": require("./scene/block"),
	"src/scenes/scene/game.ts": require("./scene/game"),
	"src/scenes/scene/player.ts": require("./scene/player"),
	"src/scenes/scene/wall.ts": require("./scene/wall"),
}
