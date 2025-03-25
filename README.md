## 1 Database Choice & Justification
For me, a language-learning app needs to use postgres. In that kind of application the data is sure to be highly structured with clear relationships (e.g., users, levels, lessons, activities, progress). Here’s why PostgreSQL is the better choice:

Data Relationships: The platform will have strong relationships between entities (e.g., a lesson belongs to a level, an activity belongs to a lesson, and also there is progress update for each user and lesson). SQL databases excel at handling such relationships through foreign keys and JOIN operations.

Query Patterns: Expected queries will involve complex joins (e.g., fetching all activities for a specific lesson, or all lessons for a specific level). SQL databases are optimized for such operations.

Scalability: While NoSQL databases like MongoDB are often praised for horizontal scalability, PostgreSQL can also scale easily, especially with tools like partitioning and others. For a structured, relational dataset, PostgreSQL is more suitable.

Consistency: Language-learning platforms require strong consistency (e.g., ensuring that a user’s progress is accurately tracked). PostgreSQL’s ACID compliance ensures data integrity.


# 2 Schema Implementation with TypeORM
Check implementation for the coding part. 
And to make sure the database and queries is more optimize, the following practice and steps was followed:
Indexing: Indexes are added on foreign key columns (level_id, lesson_id) to speed up JOIN operations.
Relationships: Proper use of @ManyToOne and @OneToMany ensures efficient querying and data integrity.
Scalability: The schema is designed to be easily extendable, allowing for future modifications like adding new entities or relationships.


# 3 Data Model Improvements
Potential Issues:

Denormalization: If the data model becomes too normalized, it could lead to performance issues due to excessive JOINs. For example, fetching all activities for a user might require multiple joins across levels, lessons, and activities.

Lack of Caching: Frequent queries (e.g., fetching lesson progress) could benefit from caching mechanisms to reduce database load. 

To avoid this issues:
We can use redis for caching. I would have implement caching in my code implementation. But decide to leave that out for this assessment.
I can also denormalise data so JOINs are minimize and we are able to have data like progress on a different table.
We can also partition data for large dataset for performance optimisation.


# 4 Handling Large Datasets
Strategies like indexing, to ensure all frequently queried columns are indexed.
We can avoid querying data with things like SELECT * and instead fetch data that we need
We can also use pagination to limit the number of data we can quesry from the database at time 
Caching with redis for example is also handy here.


# 5 Migration Strategy:

For data easier data migrations I usually use prisma. It allows for easier migration of data from one database to another. We can easily switch between databases like from MOngoDb to Postgres and vice versa or to others.

Analysis: We can analyze the existing schema and map it to a another schema in another database.

There are also other ways we can migrate database.


# 6 Bonus Question: API Structure with NestJS
API Structure:

RESTful API: I can use RESTful principles to structure the API. For example:

GET /levels - Fetch all levels

GET /levels/:levelId/lessons - Fetch all lessons for a specific level

GET /lessons/:lessonId/activities - Fetch all activities for a specific lesson

POST /users/:userId/progress - Update user progress


# 7 Handling Concurrent Updates:

Optimistic Locking: We can use versioning or timestamps to handle concurrent updates. If two users try to update the same lesson progress, the second update will fail if the data has changed since it was last read. This was demonstrated in the progress entity in the entity folder inside progress.

Transactions: I also use database transactions to ensure atomicity when updating related data (e.g., updating user progress and lesson completion status). This make sure the transaction completely happens or not.

# Addition Statements
Thanks for this opportunity I will be looking forward to your favorable response



  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ yarn install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
