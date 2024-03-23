import {AudioAtlas, FrameTriggerSystem, Game, Log, LogLevel, Scene, SpriteSheet, TimerSystem} from 'lagom-engine';
import WebFont from 'webfontloader';
import muteButtonSpr from "./art/mute_button.png";
import {SoundManager} from "./util/SoundManager.ts";

class MainScene extends Scene
{
    onAdded() {
        super.onAdded();

        this.addGUIEntity(new SoundManager());
        this.addGlobalSystem(new TimerSystem());
        this.addGlobalSystem(new FrameTriggerSystem());
    }
}

export class GameTemplate extends Game
{
    static GAME_WIDTH = 512;
    static GAME_HEIGHT = 512;

    static muted = false;
    static musicPlaying = false;
    static audioAtlas: AudioAtlas = new AudioAtlas();

    constructor()
    {
        super({
            width: GameTemplate.GAME_WIDTH,
            height: GameTemplate.GAME_HEIGHT,
            resolution: 1,
            backgroundColor: 0x200140
        });

        // Set the global log level
        Log.logLevel = LogLevel.DEBUG;

        this.addResource("mute_button", new SpriteSheet(muteButtonSpr, 16, 16));

        // Load an empty scene while we async load the resources for the main one
        this.setScene(new Scene(this));

        // Import sounds and set their properties
        // const music = GameTemplate.audioAtlas.load("music", "ADD_ME")
        //     .loop(true)
        //     .volume(0.3);

        // Import fonts
        WebFont.load({
            custom: {
                families: ["myPixelFont", "myPixelFont2"]
            }
        });

        // Wait for all resources to be loaded and then start the main scene.
        this.resourceLoader.loadAll().then(
            () => {
                this.setScene(new MainScene(this));
            }
        )

    }
}
