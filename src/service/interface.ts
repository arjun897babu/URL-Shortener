export interface IURLService {

}
export interface IStaticsService {
    get(shortURL: string): Promise<any>
    create(): Promise<any>
    delete(): Promise<any>
}