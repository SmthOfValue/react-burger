export type TOrder = {
    readonly ingredients: ReadonlyArray<string>;
    readonly _id: string;
    readonly status: "done" | "pending" | "created";
    readonly number: number;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly name: string;
};

export type TUser = {
    readonly name: string;
    readonly email: string;
};

export type TTokens = {
    readonly accessToken: string;
    readonly refreshToken: string;
};

export type TIngredient = {
    readonly _id: string;
    readonly name: string;
    readonly type: "bun" | "main" | "sauce";
    readonly proteins: number;
    readonly fat: number;
    readonly carbohydrates: number;
    readonly calories: number;
    readonly price: number;
    readonly image: string;
    readonly image_mobile: string;
    readonly image_large: string;
    __v: number;
}

export type TConstructorIngredient = TIngredient & {constructorId: string};