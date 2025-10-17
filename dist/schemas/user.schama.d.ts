export declare class Customers {
    name: string;
    email: string;
    phone: string;
    isEmail: boolean;
    isPhone: boolean;
}
export declare const CustomersSchema: import("mongoose").Schema<Customers, import("mongoose").Model<Customers, any, any, any, import("mongoose").Document<unknown, any, Customers, any, {}> & Customers & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Customers, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Customers>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Customers> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
