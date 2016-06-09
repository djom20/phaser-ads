declare module Fabrique {
    module Plugins {
        interface AdGame extends Phaser.Game {
            ads: Fabrique.Plugins.AdManager;
        }
        class AdManager extends Phaser.Plugin {
            onContentPaused: Phaser.Signal;
            onContentResumed: Phaser.Signal;
            onAdClicked: Phaser.Signal;
            private provider;
            constructor(game: AdGame, parent: PIXI.DisplayObject);
            setAdProvider(provider: AdProvider.IProvider): void;
            requestAd(...args: any[]): void;
            preloadAd(...args: any[]): void;
            destroyAd(...args: any[]): void;
            hideAd(...args: any[]): void;
        }
    }
}
declare module Fabrique {
    module AdProvider {
        enum HeyzapAdTypes {
            Interstitial = 0,
            Video = 1,
            Rewarded = 2,
            Banner = 3,
        }
        class CordovaHeyzap implements IProvider {
            adManager: AdManager;
            private adsEnabled;
            constructor(game: Phaser.Game, publisherId: string);
            setManager(manager: AdManager): void;
            requestAd(adType: HeyzapAdTypes, bannerAdPositions?: string): void;
            preloadAd(adType: HeyzapAdTypes): void;
            destroyAd(adType: HeyzapAdTypes): void;
            hideAd(adType: HeyzapAdTypes): void;
        }
    }
}
import AdManager = Fabrique.Plugins.AdManager;
declare module Fabrique {
    module AdProvider {
        interface IProvider {
            adManager: AdManager;
            setManager(manager: AdManager): void;
            requestAd(...args: any[]): void;
            preloadAd(...args: any[]): void;
            destroyAd(...args: any[]): void;
            hideAd(...args: any[]): void;
        }
    }
}
declare module Fabrique {
    module AdProvider {
        interface ICustomParams {
            [name: string]: string | number | any[];
        }
        class Ima3 implements IProvider {
            private gameContent;
            private adContent;
            private adDisplay;
            private adLoader;
            private adsManager;
            private googleEnabled;
            private canPlayAds;
            private adTagUrl;
            private game;
            private adRequested;
            adManager: AdManager;
            private fauxVideoElement;
            private gameOverlay;
            constructor(game: Phaser.Game, adTagUrl: string);
            setManager(manager: AdManager): void;
            /**
             * Doing an ad request, if anything is wrong with the lib (missing ima3, failed request) we just dispatch the contentResumed event
             * Otherwise we display an ad
             */
            requestAd(customParams?: ICustomParams): void;
            preloadAd(): void;
            destroyAd(): void;
            hideAd(): void;
            /**
             * Called when the ads manager was loaded.
             * We register all ad related events here, and initialize the manager with the game width/height
             *
             * @param adsManagerLoadedEvent
             */
            private onAdManagerLoader(adsManagerLoadedEvent);
            /**
             * Generic ad events are handled here
             * @param adEvent
             */
            private onAdEvent(adEvent);
            private onAdError();
            /**
             * When the ad starts playing, and the game should be paused
             */
            private onContentPauseRequested();
            /**
             * When the ad is finished and the game should be resumed
             */
            private onContentResumeRequested();
            private parseCustomParams(customParams);
        }
    }
}
