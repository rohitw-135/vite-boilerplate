export type AddWordBodyType = {
    word?: string;
    definition?: string;
};

export type EditWordBodyType = {
    id?: string;
    definition?: string | null;
};
