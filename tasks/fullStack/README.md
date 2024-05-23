# Judge.me Coding Challenge - Full-stack Engineer

This assessment is quite lengthy, but we ask that you don’t spend more than 5 hours working on it (you don’t have to do it all in one go!) If you don’t finish in that time, that’s absolutely fine - we want to see how you prioritise!

## Not familiar with Rails?

If you are not familiar with Rails, we have a generic version of the challenge so you can choose any language and framework that you like. Please see file `README-generic.md` for the generic version of the instruction.

## 1. Challenges

This challenge is about dealing with reviews. We have prepared for you 3 models: `Review`, `Product`, and `Shop` and some legacy code which you need to discover it yourself. Your challenges are:

1. Follow this [design](https://www.figma.com/file/d9raNQDcOgKWvhUKNsbIi6/RoR-assignments?node-id=0%3A1) to build a page (with URL `/reviews/new`) to submit a new review for a specific shop & product (using their ID), and the review creation should be run in background (async).
2. Follow this [design](https://www.figma.com/file/d9raNQDcOgKWvhUKNsbIi6/RoR-assignments?node-id=0%3A1) to build a page (with URL `/reviews`) to show a list of products (optionally of a selected shop) with pagination. And in each product, show its reviews with AJAX pagination. Bonus, use AJAX pagination for the list of products as well. Note: for product images, you can use the first character in the product title wrapped in a circle.
3. Build a page to show the change of average ratings (in the scale of 5) of 2 consecutive months of a shop in the last 3 months. For simplicity, the design of this page is not important and it can be text base.
   _For example:
   We are currently in October, and the average ratings of September, August and July are `4.2`, `3.5`, `4.8` respectively.
   Therefore the expected output are: `-1.3` (3.5 - 4.8) and `0.7` (4.2 - 3.5)_

## 2. Expectations

(In descending order of importance)

### Rails:

- Build the functionality to create reviews in background with Sidekiq
- Build the functionality to query products and reviews, efficiently
- Read and improve legacy code

### HTML + CSS

- Build the 2 HTML pages with CSS, following the mockup design.

### JavaScript

- Build review and product paginations on the 2nd page `/reviews` with AJAX.

### Prioritization

- Estimated time is 4-5 hours. It's possible, albeit highly difficult, to complete everything this within that time. So you'd need to prioritize more important parts first. E.g. functionalities -> styling/UI -> write tests -> refactor for readability -> optimize for performance.
- If you can't finish 100% (which is totally fine) within the time frame, please include one sentence in the PR description to briefly explain your prioritization.
- You can google anything. You can use any libraries (e.g. Ruby gems, JavaScript or CSS libraries).
  - You can also use a frontend framework library (e.g. Vue or React) if you prefer, but setting it up may take sometime.

### Maintainability:

- Please follow best practices and conventions (e.g. use SCSS, 2 spaces indentation, BEM format in CSS naming, service objects, RESTful).
- Please write codes in a way [that others](https://pub-images.judge.me/judgeme/always-code-as-if-the-person-who-will-maintain-your-code-is-a-maniac-serial-killer-knows-where-you-live.jpg) and you in the future can understand.

### RSpec test:

- Please write tests using Capybara and RSpec, to cover functionalities of the 3 pages (review submission, listing reviews, and simple average rating report page)

### Performance (bonus):

- Imagine now that we have millions of products, millions of reviews, and tens of thousands of shops. How can we optimize (e.g. queries, DB structure, or applying some techs)?
- If there is not enough time to code the optimization, some explanation, either in code comments or PR description, is already sufficient.

## 3. TIPS:

- It's okay and don't feel bad if you can't finish 100%. We check based on HOW rather than WHAT you approach to the solution.
- You can change `.ruby-version` to match the version in your machine to save time from setting up project.

## 4. Instructions

This project is "simple" so the setup steps should be as "simple" as:

(If you already have `rvm` and `ruby-3.x.x`, you can change `.ruby-version` to match the version in your machine and skip steps 2-6)

```bash
# 1. To pull this project
git clone https://github.com/judgeme-careers/full-stack--your-name.git && cd full-stack--your-name

# 2. To install RVM - https://rvm.io/rvm/install#installation)
\curl -sSL https://get.rvm.io | bash -s stable

# 3. To install Ruby
rvm install ruby-3.0.0

# 4. Go out and back to the repo to refresh gemset
cd .. && cd full-stack--your-name

# 5. To install bundler
gem install bundler

# 7. Install all necessary gems and JS libraries. This can take a few minutes.
bundle
yarn

# 7. Init DB
bundle exec rake db:create db:migrate

# 8. Seed, restore DB
# You can run `bundle exec rake db:seed`, or do the step below to restore the DB:
# Download DB dump file from Google Drive https://drive.google.com/file/d/1qpp82e_SiKPltnUHDyWItAerGs4rwQxy/view?usp=sharing to `db/challenge_development.dump`, and then run:
pg_restore --verbose --clean --no-acl --no-owner -h localhost -d challenge_development db/challenge_development.dump

# 9. Start server
rails s

# 10. Start Sidekiq in another terminal session
bundle exec sidekiq

# 11. Start Webpack dev server (also in another terminal session)
bin/webpack-dev-server
```

12. Please open a new Issue, or email us if something is not clear
13. Once finishing, please commit, push to GitHub and open a new Pull Request

## Notes

- Legacy code in this coding challenge is intentionally bad, while our actual codebase is not that bad, hopefully.
- To make the challenge more interesting, there are at least 4 hidden easter eggs (i.e. bugs or slow code) in this challenge, ranging from easy to very hard. They are optional but should be fun to find and fix. Tips: they are all in the controller or `app/views/reviews/index.slim` file.

If you have any question or need to clarify the requirements, feel free to talk to us (via GitHub Issue, or via email).

**Good luck and happy coding!**

A note on my solution. it is not fully complete but I had planned to use turbo frames to hook up the `products/reviews#index` to `product#index` but unfortunately was unable to install turbo-rails.
