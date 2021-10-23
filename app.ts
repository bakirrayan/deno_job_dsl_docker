import { Application, Context } from "https://deno.land/x/abc@v1.3.3/mod.ts";
import { get_all_books, get_book, delete_book } from "./controllers/bookController.ts"

const app = new Application();

console.log("server is up");

app.static('/', './public');

app.get("/", async (ctx: Context) => { await ctx.file("./public/index.html")});

app
    .get('/books', get_all_books)
    .get('/books/:id', get_book)
    .delete('/books/:id', delete_book);

app.start({ port: 7700 });