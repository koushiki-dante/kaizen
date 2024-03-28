![Cover](./.github/cover.png)

# User Search 

A GitHub user search app using the [GitHub users API](https://docs.github.com/en/rest/users?apiVersion=2022-11-28#get-a-user).

## Run
Clone the repository, install the dependencies and run the app.

```bash
# Step 1. Clone the repository.

# You can use this one-line command to clone the repository:
git clone --depth=1 --filter=tree:0 --no-checkout https://github.com/koushiki-dante/kaizen.git && cd kaizen && git sparse-checkout set --no-cone github-user-search && git checkout && cd github-user-search 

# Or, if you wish, you can do it step by step:
git clone --depth=1 --filter=tree:0 --no-checkout https://github.com/koushiki-dante/kaizen.git
cd kaizen
git sparse-checkout set --no-cone github-user-search 
git checkout
cd github-user-search

# Step 2. Install the dependencies and run the app.
npm install
npm run dev
```
Visit http://localhost:5173 to view the app.
