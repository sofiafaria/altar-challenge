export default interface Payments{
    id: number,
    payment: string,
    amount: number,
    code?: string,
    matrix?: string[][]

}