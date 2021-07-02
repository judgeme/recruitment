# Judge.me Coding Challenge - Full-stack Engineer

## 1. Challenges
This challenge is about dealing with reviews. We have prepared for you 3 models: `Review`, `Product`, and `Shop` and some legacy code which you need to discover it yourself. Your challenges are:

1. Follow this [design](https://www.figma.com/file/d9raNQDcOgKWvhUKNsbIi6/RoR-assignments?node-id=0%3A1) to build a page (with URL `/reviews/new`) to submit a new review for a specific shop & product (using their ID), and the review creation should be run in background (async).
2. Follow this [design](https://www.figma.com/file/d9raNQDcOgKWvhUKNsbIi6/RoR-assignments?node-id=0%3A1) to build a page (with URL `/reviews`) to show a list of products (optionally of a selected shop) with pagination. And in each product, show its reviews with AJAX pagination. Bonus, use AJAX pagination for the list of products as well. Note: for product images, you can use the first character in the product title wrapped in a circle.
3. Build a page to show the change of average ratings (in the scale of 5) of 2 consecutive months of a shop in the last 3 months. For simplicity, the design of this page is not important and it can be text base.
*For example:
We are currently in October, and the average ratings of September, August and July are `4.2`, `3.5`, `4.8` respectively.
Therefore the expected output are: `-1.3` (3.5 - 4.8) and `0.7` (4.2 - 3.5)*

## 2. Expectations

### Rails:
- Build the functionality to create reviews in background with sidekiq
- Build the functionality to query products and reviews, efficiently
- Read and improve legacy code

### HTML + CSS
- Build the 2 HTML pages with CSS, following the mockup design.

### JavaScript
- Build review and product paginations on the 2nd page `/reviews` with AJAX.

### Prioritization and Maintainability:
- Estimated time is 4-5 hours so time it wisely. You should work on more important parts first. E.g. functionalities -> styling/UI -> refactor.
- Please follow best practices and conventions (e.g. use SCSS, 2 spaces indentation, BEM format when naming CSS classes, service objects).
- Please write codes in a way [that others](https://github.com/judgeme-careers/interview-code-challenge/blob/master/app/assets/images/always-code-as-if-the-person-who-will-maintain-your-code-is-a-maniac-serial-killer-knows-where-you-live.jpg?raw=true) and you in the future can understand.
- You can google anything. You can use JavaScript or CSS libraries but choose wisely.

### GitHub flow:
- Pull this GitHub project, create a new branch, commit your codes, push to GitHub and [open an new Pull Request](https://github.com/judgeme-careers/interview-code-challenge-rails-full-stack/compare/master...develop).
- Write understandable and meaningful commit messages [that others](/app/assets/images/always-code-as-if-the-person-who-will-maintain-your-code-is-a-maniac-serial-killer-knows-where-you-live.jpg?raw=true) and you in the future can understand.

## TIPS:
+ It's okay and don't feel bad if you can't finish 100%. We check based on HOW rather than WHAT you approach to the solution.
+ You can change `.ruby-version` to match the version in your machine to save time from setting up project.

## 3. Instructions
This project is very simple so the setup steps should be as simple as:

(If you already have `rvm` and `ruby-3.x.x`, you can change `.ruby-version` to match the version in your machine and skip steps 2-6)

```bash
# 1. To pull this project
git clone https://github.com/judgeme-careers/interview-code-challenge-rails-full-stack.git && cd interview-code-challenge-rails-full-stack

# 2. To install RVM - https://rvm.io/rvm/install#installation)
\curl -sSL https://get.rvm.io | bash -s stable

# 3. To install Ruby
rvm install ruby-3.0.0

# 4. Go out and back to the repo to refresh gemset
cd .. && cd interview-code-challenge-rails-full-stack

# 5. To install bundler
gem install bundler

# 6. Install all necessary gems
bundle

# 7. Init DB
rake db:create db:migrate

# 8. Seed, restore DB
pg_restore --verbose --clean --no-acl --no-owner -h localhost -d challenge_development db/challenge_development.dump # Or you can run `rake db:seed`

# 9. Start server
rails s

# 10. Start Sidekiq in another terminal session
sidekiq
```
11. Please open a new Issue if this is not clear
12. Once finishing, please commit, push to GitHub and open a new Pull Request

If you have any question or need to clarify the requirements, feel free to talk to us.

## Notes
- Legacy code in this coding challenge is intentionally bad, while our actual codebase is not that bad, hopefully.
- To make the challenge more interesting, there are at least 4 hidden easter eggs (i.e. bugs or slow code) in this challenge, ranging from easy to very hard. They are optional but should be fun to find and fix. Tips: they are all in the controller or `app/views/reviews/index.slim` file.

If you have any question or need to clarify the requirements, feel free to talk to us.

**Good luck and happy coding!**
