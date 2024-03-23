import {AudioAtlas, Game, Log, LogLevel, Scene} from 'lagom-engine';
import WebFont from 'webfontloader';

class MainScene extends Scene
{

}

class DummyScene extends Scene
{
}

export class GameTemplate extends Game
{

    static muted = false;
    static musicPlaying = false;
    static audioAtlas: AudioAtlas = new AudioAtlas();

    constructor()
    {
        super({
            width: 512,
            height: 512,
            resolution: 1,
            backgroundColor: 0x200140
        });

        // Set the global log level
        Log.logLevel = LogLevel.WARN;


        this.setScene(new MainScene(this));

        // Import sounds and set their properties
        const music = GameTemplate.audioAtlas.load("music", "ADD_ME")
            .loop(true)
            .volume(0.3);

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
