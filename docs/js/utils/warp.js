const { sign } = Math;

/**
 * Warps the value `x` between `min` and `max`.
 * @param {number} x The value to warp.
 * @param {number} min The left most value.
 * @param {number} max The right most value.
 * @returns The warped value.
 */
function warp(x, min, max) {
    //Bounds the function between min and max.
    const _x = x - min;
    const length = max - min;
    //======================

    // Avoids repetition and makes the equation more clean.
    const f = length / 2;
    const m = _x % length;
    //============================

    // warp(x, n) = sign(x) * ((x % n) - n / 2) + n / 2;
    return sign(_x) * (m - f) + f;
}

export default warp;