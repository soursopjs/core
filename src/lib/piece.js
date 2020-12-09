import {
    PieceNotIncludedError,
    ItIsNotPieceError,
} from './errors';

export default class Piece {
    /**
     * A piece
     */
    constructor() {
        this.subpieces = [];
        this.container = null;
    }

    get length() { return this.subpieces.length; }

    /**
     * Add a piece into this
     * @param {Piece} piece another Piece object
     */
    add(piece) {
        if (!(piece instanceof Piece)) {
            throw new ItIsNotPieceError(piece);
        }
        this.subpieces.push(piece);
        if (this.container) this.container.appendChild(piece.dom);
        return this;
    }

    /**
     * Remove a piece
     * @param {Piece} piece a Piece object
     */
    remove(piece) {
        const index = this.subpieces.indexOf(piece);
        if (index < 0) {
            throw new PieceNotIncludedError(piece);
        }
        this.subpieces.splice(index, 1);
        if (this.container) this.container.removeChild(piece.dom);
        return this;
    }
}
