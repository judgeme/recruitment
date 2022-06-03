# Judge.me Coding Challenge - Full-stack Engineer (Generic version)

This is the generic version of instruction for those who are not familiar with Rails. In this generic version, you can use any language and framework that you like to complete the challenge.
If you are familiar with Rails, please go to file `README.md` for the instruction for Rails instead.

## 1. Challenges
The challenges are about dealing with reviews. Your challenges are:

1. Set up, initialize a new codebase:
    - Your codebase should use a database (you can choose whichever database you want, e.g. PostgreSQL, MySQL, MongoDB, etc.).
    - Then your codebase should have 3 tables and models: `Review`, `Product`, and `Shop`.
    - Your codebase should also have a background processing to run some code in the background.
    - You should delete all of the files in this repo, except for the Git files and the 2 README files, since these files are for Rails only.
1. Follow this [design](https://www.figma.com/file/d9raNQDcOgKWvhUKNsbIi6/RoR-assignments?node-id=0%3A1) to build a page (with URL `/reviews/new`) to submit a new review for a specific shop & product (using their ID), and the review creation should be run in background (async).
1. Follow this [design](https://www.figma.com/file/d9raNQDcOgKWvhUKNsbIi6/RoR-assignments?node-id=0%3A1) to build a page (with URL `/reviews`) to show a list of products (optionally of a selected shop) with pagination. And in each product, show its reviews with AJAX pagination. Bonus, use AJAX pagination for the list of products as well. Note: for product images, you can use the first character in the product title wrapped in a circle.
1. Build a page to show the change of average ratings (in the scale of 5) of 2 consecutive months of a shop in the last 3 months. For simplicity, the design of this page is not important and it can be text base.
    - *For example: We are currently in October, and the average ratings of September, August and July are `4.2`, `3.5`, `4.8` respectively.
Therefore the expected output are: `-1.3` (3.5 - 4.8) and `0.7` (4.2 - 3.5)*

## 2. Expectations

### Backend:
- Build the functionality to create reviews in background
- Build the functionality to query products and reviews, efficiently

### HTML + CSS
- Build the 2 HTML pages with CSS, following the mockup design.

### JavaScript
- Build review and product paginations on the 2nd page `/reviews` with AJAX.

### Prioritization and Maintainability:
- Estimated time is 4-5 hours so time it wisely. You should work on more important parts first. E.g. functionalities -> styling/UI -> refactor -> write tests.
- Please follow best practices and conventions (e.g. use SCSS, 2 spaces indentation, BEM format when naming CSS classes, service objects).
- Please write codes in a way [that others](https://pub-images.judge.me/judgeme/always-code-as-if-the-person-who-will-maintain-your-code-is-a-maniac-serial-killer-knows-where-you-live.jpg) and you in the future can understand.
- You can google anything. You can use any libraries but choose wisely.

### Tests:
- Please write some tests to cover basic cases of the functionalities of the 3 pages (review submission, listing reviews, and simple average rating report page)

### GitHub flow:
- Pull this GitHub project, create a new branch `develop`, commit your codes, push to GitHub and [open an new Pull Request](https://github.com/judgeme-careers/full-stack--your-name/compare/master...develop).
- Write understandable and meaningful commit messages [that others](https://pub-images.judge.me/judgeme/always-code-as-if-the-person-who-will-maintain-your-code-is-a-maniac-serial-killer-knows-where-you-live.jpg) and you in the future can understand.

## 3. TIPS:
+ It's okay and don't feel bad if you can't finish 100%. We check based on HOW rather than WHAT you approach to the solution.

## 4. Instructions
- Unfortunately there are no instructions to set up the project since you can use any language/framework.
- To get started, you can delete all of the files in this repo, except for the Git files and the 2 README files.
- Please open a new Issue, or email us if something is not clear.
- Once finishing, please commit, push to GitHub and open a new Pull Request and ping `damhonglinh`.

## 5. Notes
- To make the challenge more interesting, there are at least 4 hidden easter eggs (i.e. bugs or slow code) in this challenge, ranging from easy to very hard. However, unfortunately these easter eggs are in the Rails code only so this generic version doesn't have them.

If you have any question or need to clarify the requirements, feel free to talk to us.

**Good luck and happy coding!**
