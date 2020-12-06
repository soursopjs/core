import {
    PieceNotIncludedError,
    ItIsNotPieceError,
} from './errors';

export default class Piece {
    constructor() {
        this.subpieces = [];
        this.container = null;
    }

    get length() { return this.subpieces.length; }

    add(piece) {
        if (!(piece instanceof Piece)) {
            throw new ItIsNotPieceError(piece);
        }
        this.subpieces.push(piece);
        if (this.container) this.container.appendChild(piece.dom);
        return this;
    }

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
