import { Document } from 'mongoose';
export declare class AccesLogs extends Document {
    count: number;
    ip: string;
    origin: string;
    host: string;
}
export declare const AccesLogsSchema: import("mongoose").Schema<AccesLogs, import("mongoose").Model<AccesLogs, any, any, any, Document<unknown, any, AccesLogs, any, {}> & AccesLogs & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AccesLogs, Document<unknown, {}, import("mongoose").FlatRecord<AccesLogs>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<AccesLogs> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
