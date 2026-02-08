import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface TripForm {
    duration: bigint;
    travelType: string;
    numPersons: bigint;
    useRental: boolean;
    budget: bigint;
    location: string;
}
export interface backendInterface {
    planTrip(form: TripForm): Promise<string>;
}
