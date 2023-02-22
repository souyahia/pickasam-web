# Pick a Sam Web
This repository is the Webapp for "Pick a Sam". Pick a Sam is a fun personal project that is aimed at helping me
choose the best looking pictures for my dating apps. Even you can participate in this project by going to
[https://www.pickasam.com/](https://www.pickasam.com/) and voting for your favorite pictures.

If you're looking for the API source code, please go to [this repository](https://github.com/souyahia/pickasam-api).

# How does it work ?
Pick a Sam is a Single Page Web Application that is connected to this server. When landing on the webapp, the users are
shown two random pictures of me, and are asked to choose their favorite one. Once they do, their choice is recorded, and
they are shown two other random pictures. This continues until the user is tired and leaves the webapp.

In the background, I've implemented an elo rating system that assigns a numerical ranking to each picture. When pictures
"battle" each other, the winner gets an increase in rating while the looser get its rating decreased. The difference
in ratings between two pictures influences the rating gains and losses : a low rated picture battling against a high
rated picture will gain a lot of points in case of a win and will lose very few points in case of a loss. For more
technical explanation of the elo rating system, please see the dedicated section below.

# How to view the results ?
For now, only I can check the results by manually querying the database. I might add a page on the website to visualize
the live rankings, but not any time soon.

# The elo rating system
The rating system I used is modeled on the elo rating system created by Arpad Elo for chess tournaments. Most of the
implementation was made using [this wikipedia article](https://en.wikipedia.org/wiki/Elo_rating_system). Pictures start
with a rating of `1400`, and the new ratings after each "battle" are calculated using these two equations :


**Expected score (= probability of win) of picture A when battling picture B :**

> `Ea = 1 / (1 + B^((Rb - Ra) / S))`

with :
- `B` : The exponent factor, set to `10` for this project
- `Rb` : Picture B's rating
- `Ra` : Picture A's rating
- `S` : The scale factor, set to `400` for this project

**Picture A's next rating after battling against picture B :**

> `R'a = Ra + K * (Sa - Ea)`

with :
- `Ra` : Picture A's rating
- `K` : The K factor, set to `32` for this project
- `Sa` : Picture A's score (`1` for a win, `0` for a loose)
- `Ea` : The expected score of picture A against picture B (see equation above)

