FROM denoland/deno:latest

EXPOSE 7700

WORKDIR /app

USER deno

COPY app.ts .

ADD . .

CMD ["run", "--allow-net", "--allow-read", "app.ts"]