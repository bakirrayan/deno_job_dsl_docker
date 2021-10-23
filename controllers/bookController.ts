import { Context } from "https://deno.land/x/abc@v1.3.3/mod.ts";
import { Book } from "../models/bookModel.ts"
import { v4 } from "https://deno.land/std@0.109.0/uuid/mod.ts"

let books: Book[] = [
    { id: '1', title: 'my book 1', author: 'rayan', pages: 500 },
    { id: '2', title: 'my book 2', author: 'rayanb', pages: 400 },
    { id: '3', title: 'my book 3', author: 'b.rayan', pages: 300 },
];

export const get_all_books = (ctx: Context) => {
    return ctx.json(books, 200);
}

export const get_book = (ctx: Context) => {
    const { id } = ctx.params;
    const book = books.find((b: Book) => b.id === id);
    if (book){
        return ctx.json(book, 200);
    }
    return ctx.string("there is no book with this id", 404);
}

export const delete_book = (ctx: Context) => {
    const { id } = ctx.params;
    const book = books.find((b: Book) => b.id === id);

    if (book){
        books = books.filter((b: Book) => b.id !== id);
        return ctx.json(book, 200);
    }
    return ctx.string('no book with this id', 404);
}