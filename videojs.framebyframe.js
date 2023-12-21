// videojs-framebyframe-plugin
import videojs from 'video.js'

var VjsButton = videojs.getComponent('Button');
const Component = videojs.getComponent('Component');

class FBFButton extends Component {
    constructor(player, options) {
        super(player, options);
        this.player = player;
        this.frameTime = 1 / options.fps;
        this.step_size = options.value;
        this.on('click', this.onClick);
    }

    onClick() {
        this.player.pause();
        var dist = this.frameTime * this.step_size;
        this.player.currentTime(this.player.currentTime() + dist);
    }
}

videojs.registerComponent('FBFButton', FBFButton);


function framebyframe(options) {
    var player = this,
        frameTime = 1 / 30; // assume 30 fps

        player.ready(() => {
            options.steps.forEach((opt) => {
                const b = player.controlBar.addChild(
                    new FBFButton(player, {
                        el: videojs.dom.createEl(
                            'button',
                            {
                                className: 'vjs-res-button vjs-control',
                                innerHTML: `<div class="vjs-control-content"><span class="vjs-fbf">${opt.text}</span></div>`
                            },
                            {
                                role: 'button'
                            }
                        ),
                        value: opt.step,
                        fps: options.fps,
                    }),
                    {}, opt.index
                );
        
                let referenceElement = player.controlBar.remainingTimeDisplay ?
                                       player.controlBar.remainingTimeDisplay.el().nextElementSibling :
                                       player.controlBar.seekToLive ?
                                       player.controlBar.seekToLive.el().nextElementSibling :
                                       null;
        
                if (referenceElement) {
                    player.controlBar.el().insertBefore(b.el(), referenceElement);
                }
            });
        });
}

// Cross-compatibility for Video.js 5 and 6.
var registerPlugin = videojs.registerPlugin || videojs.plugin;

registerPlugin('framebyframe', framebyframe);
