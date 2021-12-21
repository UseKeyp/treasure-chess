# Infinite Scroll Pagination in Redwood + Prisma 2

First you must understand the difference between `offset` and `cursor` pagination. The offset method is the simpler option, however it doesn't scale for large data. The cursor method is more work to implement, but is faster and allows for infinite scrolling. Read more about the differences [here](https://www.prisma.io/docs/concepts/components/prisma-client/pagination).

Resources:

- https://medium.com/@smallbee/super-fast-offset-pagination-with-prisma2-21db93e5cc90
- https://artsy.github.io/blog/2020/01/21/graphql-relay-windowed-pagination/
- https://www.prisma.io/docs/concepts/components/prisma-client/pagination

## Discussion

One of the major drawbacks of cursor pagination is you must sort by your cursor, which has to be a unique, sequential column. For example, if I want to sort my data by price low-to-high, not all items have a unique price, so ordering will not be deterministic, and the curso

```bash
yarn workspace web add prisma-offset-pagination
```
