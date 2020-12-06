/* eslint-disable no-useless-constructor */
/* eslint-disable max-classes-per-file */

/**
 * The vanilla Error class
 */
export class PieceError extends Error {
    constructor(obj, ...params) {
        super(...params);
        this.obj = obj;
    }
}

/**
 * This Error is thrown when a piece is not included into another
 */
export class PieceNotIncludedError extends PieceError {
    constructor(obj, message) {
        super(obj, message || 'This piece was never added to the piece container of the parent');
    }
}

/**
 * This Error is thrown when an object is not an instance of piece class
 */
export class ItIsNotPieceError extends PieceError {
    constructor(obj, message) {
        super(obj, message || 'This is not a piece');
    }
}

/**
 * This Error is thrown when the node parent is not defined
 */
export class NodeParentNotDefinedError extends PieceError {
    constructor(obj, message) {
        super(obj, message || 'The node parent is not defined');
    }
}

/**
 * This Error is thrown when a modal is not defined yet
 */
export class ModalNotDefinedError extends PieceError {
    constructor(obj, message) {
        super(obj, message || 'The modal is not defined');
    }
}
