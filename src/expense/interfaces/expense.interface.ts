export interface ICreateExpense{
    amount: number
    category: 'food' | 'transportation' | 'clothes' | 'accommodation' | 'entertainment'
}