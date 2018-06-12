
export class CodeBaseModel {
    public _id;

    constructor(
        private title = '',
        private description = '',
        private price= 0,
        private tags: string[] = [],
        private imageUrl = ''
    ) {}
}
