# FLOW

## SETUP GIT

- create new project

- create new repository on github

- push an existing repository
```
git init
git remote add origin https://github.com/user/repository.git
git branch -M main
git add
git commit
git push -u origin main
```

## SETUP DATABASE
 
- create new database

- create prisma orm project
```
npx prisma init
```

- setup **datasource db** in **schema.prisma**
```
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

- setup **DATABASE_URL** in **.env**
```
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
```

## CREATE MODEL

- create **new model** in **schema.prisma**

- prisma migrate / create new table in database
```
npx prisma migrate dev --create-only --name create_new_model

npx prisma migrate dev
```

> **INFO :**
> create relationships between tables according to your needs.