import { scaleFactor } from '../../constants';

export const tvVideo = (k, map, spawnpoints) => {
    k.loadSprite('ztmTrailer', './ztm_trailer.png', {
        sliceX: 3,
        sliceY: 1,
        anims: {
            idle: { from: 0, to: 1, loop: false },
            run: { from: 0, to: 2, loop: true, speed: 1 },
        },
    });

    const [tv_main_room] = map.query({ include: 'tv_main_room' });
    const tvSprite = k.sprite('ztmTrailer', { anim: 'run' });

    return k.make([
        tvSprite,
        k.area({
            shape: new k.Rect(
                k.vec2(0, 0),
                tv_main_room.width,
                tv_main_room.height
            ),
        }),
        k.body(),
        k.pos(
            (tv_main_room.pos.x + 2) * scaleFactor,
            (tv_main_room.pos.y + 13) * scaleFactor
        ),
        k.scale(scaleFactor - 0.63),
        k.body({ isStatic: true }),
        `tv_video`,
        'map_start',
    ]);
};
