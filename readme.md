# ts-server

This is an small node backend written in Typescript, that uses Postgres through `TypeORM`, ACL with `role-acl`, and JWT auth.

To run,

```bash
docker-compose up -d
npm run migrations:run
npm run seed
docker-compose up -d // sometimes pgweb starts up too early and crashes
```

The app runs on port `2667`, and pgweb runs on port `8081`.
